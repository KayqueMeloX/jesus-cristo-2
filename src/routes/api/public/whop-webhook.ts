import { createFileRoute } from "@tanstack/react-router";
import { normalizeWhopPayload, sendMetaPurchase, sendUtmify, verifyWhopSignature } from "@/lib/whop-webhook";

export const Route = createFileRoute("/api/public/whop-webhook")({
  server: {
    handlers: {
      GET: async () => Response.json({ ok: true, service: "whop-webhook" }),
      POST: async ({ request }) => {
        const secret = process.env['WHOP_WEBHOOK_SECRET'];
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
        const pixel = process.env['META_PIXEL_ID'];
        const capi = process.env['META_CAPI_TOKEN'];
        const utmify = process.env['UTMIFY_API_TOKEN'];

        try {
          if (isPaid && pixel && capi) {
            results['meta'] = await sendMetaPurchase(p, pixel, capi, process.env['META_TEST_EVENT_CODE']);
          }
          if (utmify) results['utmify'] = await sendUtmify(p, isPaid ? "paid" : "refunded", utmify);
        } catch (e) {
          console.error("[whop-webhook] forward failed", e);
          // 500 → Whop retries; event_id/orderId keep retries idempotent.
          return new Response("Forwarding failed", { status: 500 });
        }

        console.log("[whop-webhook]", p.event, p.paymentId, JSON.stringify(results));
        const failed = Object.values(results).some((r) => !(r as { ok: boolean }).ok);
        return new Response(failed ? "Partial failure" : "ok", { status: failed ? 500 : 200 });
      },
    },
  },
});
