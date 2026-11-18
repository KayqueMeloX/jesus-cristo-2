/**
 * Sends the purchase delivery email (deliverables + members-area access) via Brevo.
 * Pure builder + sender: env values are passed in by the caller.
 */
import type { NormalizedPayment } from "@/lib/whop-webhook";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/brevo";
export const APP_URL = "https://jesusgod.lovable.app";

const esc = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] ?? c);

export function buildDeliveryEmail(p: Pick<NormalizedPayment, "name" | "productName">) {
  const first = esc((p.name ?? "").split(" ")[0] || "friend");
  const access = `${APP_URL}/membros`;
  const items: [string, string][] = [
    ["Daily Prayers", `${APP_URL}/membros/oracoes`],
    ["Blessing Audios", `${APP_URL}/membros/audios`],
    ["Scripture Declarations", `${APP_URL}/membros/versiculos`],
    ["Spiritual Mentor", `${APP_URL}/membros/mentor`],
  ];
  const list = items.map(([t, u]) => `<li style="margin:6px 0"><a href="${u}" style="color:#8a6d1f">${t}</a></li>`).join("");
  return {
    subject: "Your blessing is ready — access inside 🙏",
    htmlContent: `<div style="font-family:Georgia,serif;max-width:560px;margin:auto;padding:24px;color:#2b2b2b">
<h2 style="color:#8a6d1f">Welcome, ${first}!</h2>
<p>Thank you for your seed of faith. Your purchase of <b>${esc(p.productName)}</b> is confirmed.</p>
<p style="text-align:center;margin:28px 0"><a href="${access}" style="background:#8a6d1f;color:#fff;padding:14px 26px;border-radius:8px;text-decoration:none;font-weight:bold">Access the app</a></p>
<p>Your deliverables:</p><ul>${list}</ul>
<p>Save this email — use the button above anytime to return to your sanctuary.</p>
<p>God bless you.</p></div>`,
  };
}

export async function sendDeliveryEmail(
  p: NormalizedPayment,
  env: { lovableKey: string; brevoKey: string; senderEmail: string; senderName: string },
): Promise<{ ok: boolean; status?: number; body?: string; skipped?: string }> {
  if (!p.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) return { ok: true, skipped: "no valid email" };
  const { subject, htmlContent } = buildDeliveryEmail(p);
  const res = await fetch(`${GATEWAY_URL}/smtp/email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${env.lovableKey}`,
      "X-Connection-Api-Key": env.brevoKey,
    },
    body: JSON.stringify({
      sender: { name: env.senderName, email: env.senderEmail },
      to: [{ email: p.email, ...(p.name ? { name: p.name } : {}) }],
      subject,
      htmlContent,
      // Idempotency hint: same payment → same tag, visible in Brevo logs.
      tags: ["delivery", `payment_${p.paymentId}`],
    }),
  });
  const body = await res.text();
  if (!res.ok) console.error(`[brevo] send failed [${res.status}]: ${body}`);
  return { ok: res.ok, status: res.status, body };
}
