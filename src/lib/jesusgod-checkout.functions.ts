import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { JG_OFFERS } from "./jesusgod-offers";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/udc_whop";

/** The Meta Pixel ID is public by design (it ships in every page's pixel script). */
export const getJgPixelId = createServerFn({ method: "GET" }).handler(async () => {
  return { pixelId: process.env['JG_META_PIXEL_ID'] || process.env['META_PIXEL_ID'] || null };
});

const TRACK_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "src", "sck", "fbp", "fbc", "event_id"] as const;

const Input = z.object({
  slug: z.string().min(1).max(40),
  tracking: z.record(z.string(), z.string().max(500)),
});

/**
 * Creates a one-off Whop checkout carrying UTMs + Meta cookies as metadata,
 * so the webhook can attribute the sale (UTMify) and match the user (CAPI).
 */
export const createJgCheckout = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const offer = JG_OFFERS.find((o) => o.slug === data.slug);
    if (!offer) throw new Error("Unknown offer");
    const fallback = { url: offer.href };
    const planId = offer.href.split("/").pop();
    const lovableKey = process.env['LOVABLE_API_KEY'];
    const whopKey = process.env['UDC_WHOP_API_KEY'];
    if (!planId || !lovableKey || !whopKey) return fallback;

    const metadata: Record<string, string> = {};
    for (const k of TRACK_KEYS) {
      const v = data.tracking[k];
      if (v) metadata[k] = v;
    }
    const ip = getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim();
    const ua = getRequestHeader("user-agent");
    if (ip) metadata['client_ip'] = ip;
    if (ua) metadata['user_agent'] = ua.slice(0, 400);

    try {
      const res = await fetch(`${GATEWAY_URL}/v1/checkout_configurations`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": whopKey },
        body: JSON.stringify({ variant_id: planId, metadata }),
      });
      if (!res.ok) {
        console.error(`Whop checkout failed [${res.status}]: ${await res.text()}`);
        return fallback;
      }
      const json = (await res.json()) as { purchase_url?: string };
      return { url: json.purchase_url ?? offer.href };
    } catch (e) {
      console.error("Whop checkout error", e);
      return fallback; // never block the sale
    }
  });
