/** Post-purchase upsell funnel: front offer → activation → journey → protection → members area. */
export type UpsellKey = "activation" | "activationDiscount" | "journey" | "protection";

/** Whop checkouts (Jesusgod company). Each plan's redirect sends the buyer to the next step. */
const UPSELL_CHECKOUTS: Record<UpsellKey, string> = {
  activation: "https://whop.com/checkout/plan_x8JKenajV2lwJ",
  activationDiscount: "https://whop.com/checkout/plan_NmseHk3IW20gT",
  journey: "https://whop.com/checkout/plan_baR3DmJr4zO1R",
  protection: "https://whop.com/checkout/plan_Do8cDPJLi3equ",
};

const PURCHASE_KEY = "fs_purchase_query";
const PURCHASE_PARAMS = ["paid", "amt", "tier", "email"] as const;

/** Remembers the front-purchase params so the members area opens at the end of the funnel. */
export function rememberPurchase(search: string): void {
  try {
    const p = new URLSearchParams(search);
    if (p.get("paid") !== "true") return;
    const keep = new URLSearchParams();
    for (const k of PURCHASE_PARAMS) { const v = p.get(k); if (v) keep.set(k, v); }
    localStorage.setItem(PURCHASE_KEY, keep.toString());
  } catch { /* storage unavailable */ }
}

/** Members area URL. */
export function memberAppUrl(): string {
  return "/membros";
}

/** Whop checkout URL for an upsell, forwarding UTMs (not purchase params) as Whop metadata. */
export function upsellCheckoutUrl(plan: UpsellKey, search: string): string {
  const p = new URLSearchParams(search);
  const out = new URLSearchParams();
  p.forEach((v, k) => { if (!(PURCHASE_PARAMS as readonly string[]).includes(k) && k !== "upsell_paid") out.set(k, v); });
  const q = out.toString();
  return q ? `${UPSELL_CHECKOUTS[plan]}?${q}` : UPSELL_CHECKOUTS[plan];
}
