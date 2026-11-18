import { createFileRoute } from "@tanstack/react-router";
import { APP_URL, sendDeliveryEmail } from "@/lib/brevo-delivery";
import { normalizeWhopPayload, sendMetaPurchase, sendUtmify, verifyWhopSignature, type NormalizedPayment } from "@/lib/whop-webhook";

// Jesusgod offer: same deliverables as the "Jeus cristo" offer (prayer PDFs + members app), sent via Brevo.
const FRONT_PDF: Record<string, [number, string]> = {
  plan_eeBhq7HZDevYH: [80, "The-80-Sacred-Prayers-Archangel-Michael.pdf"], prod_j4f1aQfR6PJy5: [80, "The-80-Sacred-Prayers-Archangel-Michael.pdf"],
  plan_LLaCJ93l2EkND: [60, "The-60-Sacred-Prayers-Archangel-Michael.pdf"], prod_6yD7NpCbTDRYd: [60, "The-60-Sacred-Prayers-Archangel-Michael.pdf"],
  plan_VhE0277poak6C: [40, "The-40-Sacred-Prayers-Archangel-Michael.pdf"], prod_idTv4nvi86ct8: [40, "The-40-Sacred-Prayers-Archangel-Michael.pdf"],
  plan_ORvGcjoWSftUj: [20, "The-20-Sacred-Prayers-Archangel-Michael.pdf"], prod_Pm3Wh0v8Fc5Ij: [20, "The-20-Sacred-Prayers-Archangel-Michael.pdf"],
};
const UPSELLS: Record<string, [string, string]> = {
  prod_0qe30ExIKHjm3: ["90-Day Faith Activation Plan", "90-Day-Faith-Activation-Plan.pdf"],
  prod_HyGJwVi8seaSN: ["Faith Daily Sanctuary App", "Faith-Daily-Sanctuary-Devotional.pdf"],
  prod_NRKJPUsnK5tHJ: ["The 7 Holy Seals — Family Prayer Study", "The-7-Holy-Seals-Family-Prayer-Study.pdf"],
};
const pdfUrl = (f: string) => `${APP_URL}/media/ebooks/${f}`;

/** Webhook payloads often lack buyer email/metadata: fetch the full payment from Whop. */
async function enrich(payload: Record<string, unknown>, p: NormalizedPayment): Promise<NormalizedPayment> {
  const lovableKey = process.env['LOVABLE_API_KEY'];
  const whopKey = process.env['UDC_WHOP_API_KEY'];
  if (!lovableKey || !whopKey) return p;
  for (let i = 0; i < 3; i++) {
    try {
      const r = await fetch(`https://connector-gateway.lovable.dev/udc_whop/v1/payments/${encodeURIComponent(p.paymentId)}`, {
        headers: { Authorization: `Bearer ${lovableKey}`, "X-Connection-Api-Key": whopKey },
      });
      if (r.ok) {
        const full = (await r.json()) as Record<string, unknown>;
        const data = { ...full, ...(payload['data'] as object), user: { ...(full['user'] as object), ...((payload['data'] as Record<string, unknown>)?.['user'] as object) }, metadata: { ...(full['metadata'] as object), ...((payload['data'] as Record<string, unknown>)?.['metadata'] as object) } };
        const np = normalizeWhopPayload({ ...payload, data }) ?? p;
        if (np.email) return np;
        p = np;
      } else console.error(`[jesusgod-webhook] whop enrich [${r.status}]: ${await r.text()}`);
    } catch (e) { console.error("[jesusgod-webhook] whop enrich failed", e); }
    await new Promise((res) => setTimeout(res, 1500));
  }
  return p;
}

export const Route = createFileRoute("/api/public/jesusgod-webhook")({
  server: {
    handlers: {
      GET: async () => Response.json({ ok: true, service: "jesusgod-webhook" }),
      POST: async ({ request }) => {
        const secret = process.env['JG_WHOP_WEBHOOK_SECRET'] || process.env['WHOP_WEBHOOK_SECRET'];
        if (!secret) return new Response("Webhook secret not configured", { status: 500 });
        const body = await request.text();
        if (!(await verifyWhopSignature(request.headers, body, secret))) {
          console.error("[jesusgod-webhook] invalid signature");
          return new Response("Invalid signature", { status: 401 });
        }
        let payload: Record<string, unknown>;
        try { payload = JSON.parse(body); } catch { return new Response("Invalid JSON", { status: 400 }); }
        let p = normalizeWhopPayload(payload);
        if (!p) return Response.json({ ok: true, ignored: "unrecognized payload" });
        const isPaid = p.event === "payment.succeeded";
        const isRefund = p.event === "payment.refunded";
        if (!isPaid && !isRefund) return Response.json({ ok: true, ignored: p.event });
        p = await enrich(payload, p);

        const results: Record<string, { ok: boolean }> = {};
        const pixel = process.env['JG_META_PIXEL_ID'] || process.env['META_PIXEL_ID'];
        const capi = process.env['JG_META_CAPI_TOKEN'] || process.env['META_CAPI_TOKEN'];
        const utmify = process.env['JG_UTMIFY_API_TOKEN'] || process.env['UTMIFY_API_TOKEN'];
        // Each integration runs independently so one failure never blocks the others.
        if (isPaid && pixel && capi) results['meta'] = await sendMetaPurchase(p, pixel, capi, process.env['JG_META_TEST_EVENT_CODE']).catch((e) => ({ ok: false, error: String(e) }));
        if (utmify) results['utmify'] = await sendUtmify(p, isPaid ? "paid" : "refunded", utmify).catch((e) => ({ ok: false, error: String(e) }));
        const lovableKey = process.env['LOVABLE_API_KEY'];
        const brevoKey = process.env['BREVO_API_KEY'];
        if (isPaid && lovableKey && brevoKey) {
          const up = UPSELLS[p.productId];
          const front = FRONT_PDF[p.planId ?? ""] ?? FRONT_PDF[p.productId] ?? FRONT_PDF['plan_ORvGcjoWSftUj']!;
          const variant = up
            ? { subject: `[Access Granted] ${up[0]} — My Faith Sanctuary`, items: [[`Download: ${up[0]} (PDF)`, `/media/ebooks/${up[1]}`], ["Open your Members App", "/membros"]] as [string, string][], attachment: { url: pdfUrl(up[1]), name: up[1] } }
            : { subject: `[Access Granted] Your ${front[0]} Sacred Prayers — My Faith Sanctuary`, items: [[`Download your ${front[0]} Prayers (PDF)`, `/media/ebooks/${front[1]}`], ["Open your Members App", "/membros"]] as [string, string][], attachment: { url: pdfUrl(front[1]), name: front[1] } };
          results['email'] = await sendDeliveryEmail(p, {
            lovableKey, brevoKey,
            senderEmail: process.env['BREVO_SENDER_EMAIL'] ?? "kaiquepm0403@gmail.com",
            senderName: process.env['BREVO_SENDER_NAME'] ?? "My Faith Sanctuary",
          }, variant).catch((e) => ({ ok: false, error: String(e) }));
        }
        console.log("[jesusgod-webhook]", p.event, p.paymentId, p.email ? "email:yes" : "email:NO", JSON.stringify(results));
        const failed = Object.values(results).some((r) => !r.ok);
        return new Response(failed ? "Partial failure" : "ok", { status: failed ? 500 : 200 });
      },
    },
  },
});
