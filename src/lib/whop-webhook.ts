/**
 * Whop webhook helpers: signature verification, payload normalization,
 * and forwarding to Meta Conversions API + UTMify.
 * Pure functions (no env access) so they are testable.
 */

const enc = new TextEncoder();

function bytesToB64(buf: ArrayBuffer): string {
  let s = "";
  for (const b of new Uint8Array(buf)) s += String.fromCharCode(b);
  return btoa(s);
}
function bytesToHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}
async function hmac(key: Uint8Array<ArrayBuffer>, msg: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return crypto.subtle.sign("HMAC", k, enc.encode(msg));
}

/** Supports Standard Webhooks headers (webhook-id/timestamp/signature) and legacy x-whop-signature. */
export async function verifyWhopSignature(headers: Headers, body: string, secret: string): Promise<boolean> {
  const id = headers.get("webhook-id");
  const ts = headers.get("webhook-timestamp");
  const sig = headers.get("webhook-signature");
  if (id && ts && sig) {
    const age = Math.abs(Date.now() / 1000 - Number(ts));
    if (!Number.isFinite(age) || age > 600) return false;
    const keys: Uint8Array<ArrayBuffer>[] = [enc.encode(secret)];
    const raw = secret.startsWith("whsec_") ? secret.slice(6) : secret;
    try {
      keys.push(Uint8Array.from(atob(raw), (c) => c.charCodeAt(0)));
    } catch { /* not base64 */ }
    const provided = sig.split(" ").map((p) => p.split(",")[1] ?? "").filter(Boolean);
    for (const key of keys) {
      const expected = bytesToB64(await hmac(key, `${id}.${ts}.${body}`));
      if (provided.some((p) => safeEqual(p, expected))) return true;
    }
    return false;
  }
  const legacy = headers.get("x-whop-signature");
  if (legacy) {
    const parts = Object.fromEntries(legacy.split(",").map((p) => p.trim().split("=") as [string, string]));
    if (!parts['t'] || !parts['v1']) return false;
    const expected = bytesToHex(await hmac(enc.encode(secret), `${parts['t']}.${body}`));
    return safeEqual(parts['v1'], expected);
  }
  return false;
}

export interface NormalizedPayment {
  event: string;
  paymentId: string;
  amount: number; // major units
  currency: string;
  email?: string | undefined;
  name?: string | undefined;
  phone?: string | undefined;
  ip?: string | undefined;
  userAgent?: string | undefined;
  fbp?: string | undefined;
  fbc?: string | undefined;
  productId: string;
  productName: string;
  planId?: string | undefined;
  createdAt: Date;
  tracking: Record<"src" | "sck" | "utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "utm_term", string | null>;
}

type Obj = Record<string, unknown>;
const o = (v: unknown): Obj => (v && typeof v === "object" ? (v as Obj) : {});
const s = (v: unknown): string | undefined => (typeof v === "string" && v.trim() ? v.trim() : typeof v === "number" ? String(v) : undefined);

export function normalizeWhopPayload(payload: unknown): NormalizedPayment | null {
  const p = o(payload);
  const event = s(p['type']) ?? s(p['action']) ?? "";
  const d = o(p['data']);
  const paymentId = s(d['id']);
  if (!event || !paymentId) return null;
  const user = o(d['user']);
  const member = o(d['member']);
  const product = o(d['product']);
  const plan = o(d['plan']);
  const billing = o(d['billing_address']);
  const meta = { ...o(o(d['checkout_configuration'])['metadata']), ...o(d['metadata']) } as Obj;
  // Whop sends money either as plain numbers or as { amount: "33.21", currency } objects.
  const money = (v: unknown): number | undefined => {
    const raw = v && typeof v === "object" ? (v as Obj)['amount'] : v;
    const n = Number(raw);
    return raw !== undefined && raw !== null && raw !== "" && Number.isFinite(n) ? n : undefined;
  };
  const charged = o(d['amount_charged']);
  const li = (Array.isArray(d['line_items']) ? o((d['line_items'] as unknown[])[0]) : {}) as Obj;
  const amount = money(d['amount_charged']) ?? money(d['usd_total']) ?? money(d['total']) ?? money(d['final_amount']) ?? money(d['subtotal']) ?? 0;
  const created = s(d['paid_at']) ?? s(d['created_at']);
  const createdAt = created ? new Date(/^\d+$/.test(created) ? Number(created) * 1000 : created) : new Date();
  const pick = (k: string) => s(meta[k]) ?? null;
  return {
    event,
    paymentId,
    amount,
    currency: (s(charged['currency']) ?? s(o(d['usd_total'])['currency']) ?? s(o(d['total'])['currency']) ?? s(d['currency']) ?? "usd").toUpperCase(),
    email: s(user['email']) ?? s(member['email']) ?? s(d['email']) ?? s(d['customer_email']) ?? s(o(d['customer'])['email']) ?? s(billing['email']) ?? s(meta['email']),
    name: s(user['name']) ?? s(billing['name']) ?? s(user['username']),
    phone: s(member['phone']) ?? s(meta['phone']),
    ip: s(meta['client_ip']) ?? s(meta['ip']),
    userAgent: s(meta['user_agent']),
    fbp: s(meta['fbp']),
    fbc: s(meta['fbc']),
    productId: s(product['id']) ?? s(li['product_id']) ?? s(d['product_id']) ?? "product",
    productName: s(product['title']) ?? s(product['name']) ?? s(li['product_title']) ?? s(li['label']) ?? "Produto",
    planId: s(plan['id']) ?? s(li['variant_id']) ?? s(d['plan_id']) ?? s(d['variant_id']),
    createdAt: isNaN(createdAt.getTime()) ? new Date() : createdAt,
    tracking: {
      src: pick("src"), sck: pick("sck"),
      utm_source: pick("utm_source"), utm_medium: pick("utm_medium"),
      utm_campaign: pick("utm_campaign"), utm_content: pick("utm_content"), utm_term: pick("utm_term"),
    },
  };
}

async function sha256(v: string): Promise<string> {
  return bytesToHex(await crypto.subtle.digest("SHA-256", enc.encode(v.trim().toLowerCase())));
}

/** Meta CAPI Purchase. event_id = Whop payment id → dedupes with browser pixel and retries. */
export async function sendMetaPurchase(p: NormalizedPayment, pixelId: string, token: string, testCode?: string) {
  const user_data: Obj = {};
  if (p['email']) user_data['em'] = [await sha256(p['email'])];
  if (p['phone']) user_data['ph'] = [await sha256(p['phone'].replace(/\D/g, ""))];
  if (p['name']) {
    const [fn, ...rest] = p['name'].split(/\s+/);
    user_data['fn'] = [await sha256(fn ?? "")];
    if (rest.length) user_data['ln'] = [await sha256(rest.join(" "))];
  }
  user_data['external_id'] = [await sha256(p['email'] ?? p.paymentId)];
  if (p['ip']) user_data['client_ip_address'] = p['ip'];
  if (p.userAgent) user_data['client_user_agent'] = p.userAgent;
  if (p['fbp']) user_data['fbp'] = p['fbp'];
  if (p['fbc']) user_data['fbc'] = p['fbc'];
  const body: Obj = {
    data: [{
      event_name: "Purchase",
      event_time: Math.floor(p.createdAt.getTime() / 1000),
      event_id: p.paymentId,
      action_source: "website",
      user_data,
      custom_data: { value: p.amount, currency: p['currency'], content_ids: [p.productId], content_type: "product", order_id: p.paymentId },
    }],
  };
  if (testCode) body['test_event_code'] = testCode;
  const res = await fetch(`https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(token)}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}

const fmt = (d: Date) => d.toISOString().replace("T", " ").slice(0, 19);

export function buildUtmifyOrder(p: NormalizedPayment, status: "paid" | "refunded") {
  const cents = Math.round(p.amount * 100);
  return {
    orderId: p.paymentId,
    platform: "Whop",
    paymentMethod: "credit_card",
    status,
    createdAt: fmt(p.createdAt),
    approvedDate: fmt(p.createdAt),
    refundedAt: status === "refunded" ? fmt(new Date()) : null,
    customer: { name: p['name'] ?? "Cliente", email: p['email'] ?? "", phone: p['phone'] ?? null, document: null, ip: p['ip'] ?? "0.0.0.0" },
    products: [{ id: p.productId, name: p.productName, planId: p.planId ?? null, planName: null, quantity: 1, priceInCents: cents }],
    // UTMify rejects the order unless every UTM key is present (string or null).
    trackingParameters: Object.fromEntries(["src", "sck", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"].map((k) => [k, (p.tracking as Record<string, string | null | undefined>)[k] ?? null])),
    commission: { totalPriceInCents: cents, gatewayFeeInCents: 0, userCommissionInCents: cents, currency: p['currency'] },
    isTest: false,
  };
}

export async function sendUtmify(p: NormalizedPayment, status: "paid" | "refunded", token: string) {
  const res = await fetch("https://api.utmify.com.br/api-credentials/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-token": token, "User-Agent": "Mozilla/5.0 (compatible; JesusGodWebhook/1.0)" },
    body: JSON.stringify(buildUtmifyOrder(p, status)),
  });
  return { ok: res.ok, status: res.status, body: await res.text() };
}
