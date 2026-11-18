import { createFileRoute } from "@tanstack/react-router";
import { sendDeliveryEmail } from "@/lib/brevo-delivery";
import { normalizeWhopPayload, sendMetaPurchase, sendUtmify, verifyWhopSignature } from "@/lib/whop-webhook";

// Second offer ("jesusgod"): same flow as whop-webhook, but its own Pixel, CAPI, UTMify and secret.
const RENAMED = {
  subject: "Your Jesus God access is ready 🙏",
  items: [
    ["Daily Prayers", "/membros/oracoes"],
    ["Blessing Audios", "/membros/audios"],
    ["Scripture Declarations", "/membros/versiculos"],
    ["Spiritual Mentor", "/membros/mentor"],
  ] as [string, string][],
};

export const Route = createFileRoute("/api/public/jesusgod-webhook")({
  server: {
    handlers: {
      GET: async () => Response.json({ ok: true, service: "jesusgod-webhook" }),
      POST: async ({ request }) => {
        const secret = process.env['JG_WHOP_WEBHOOK_SECRET'] || process.env['WHOP_WEBHOOK_SECRET'];
        if (!secret) return new Response("Webhook secret not configured", { status: 500 });
        const body = await request.text();
        if (!(await verifyWhopSignature(request.headers, body, secret))) {
          return new Response("Invalid signature", { status: 401 });
        }
        let payload: unknown;
        try { payload = JSON.parse(body); } catch { return new Response("Invalid JSON", { status: 400 }); }
        const p = normalizeWhopPayload(payload);
        if (!p) return Response.json({ ok: true, ignored: "unrecognized payload" });
        const isPaid = p.event === "payment.succeeded";
        const isRefund = p.event === "payment.refunded";
        if (!isPaid && !isRefund) return Response.json({ ok: true, ignored: p.event });

        const results: Record<string, unknown> = {};
        const pixel = process.env['JG_META_PIXEL_ID'] || process.env['META_PIXEL_ID'];
        const capi = process.env['JG_META_CAPI_TOKEN'] || process.env['META_CAPI_TOKEN'];
        const utmify = process.env['JG_UTMIFY_API_TOKEN'] || process.env['UTMIFY_API_TOKEN'];
        try {
          if (isPaid && pixel && capi) results['meta'] = await sendMetaPurchase(p, pixel, capi, process.env['JG_META_TEST_EVENT_CODE']);
          const lovableKey = process.env['LOVABLE_API_KEY'];
          const brevoKey = process.env['BREVO_API_KEY'];
          if (isPaid && lovableKey && brevoKey) {
            results['email'] = await sendDeliveryEmail(p, {
              lovableKey, brevoKey,
              senderEmail: process.env['BREVO_SENDER_EMAIL'] ?? "kaiquepm0403@gmail.com",
              senderName: process.env['BREVO_SENDER_NAME'] ?? "Jesus God",
            }, RENAMED);
          }
          if (utmify) results['utmify'] = await sendUtmify(p, isPaid ? "paid" : "refunded", utmify);
        } catch (e) {
          console.error("[jesusgod-webhook] forward failed", e);
          return new Response("Forwarding failed", { status: 500 });
        }
        console.log("[jesusgod-webhook]", p.event, p.paymentId, JSON.stringify(results));
        const failed = Object.values(results).some((r) => !(r as { ok: boolean }).ok);
        return new Response(failed ? "Partial failure" : "ok", { status: failed ? 500 : 200 });
      },
    },
  },
});
