import { createFileRoute } from "@tanstack/react-router";
import { JG_OFFERS } from "../lib/jesusgod-offers";
import { buildCheckoutUrl } from "../lib/offer-config";

export const Route = createFileRoute("/jesusgod")({
  head: () => ({
    meta: [
      { title: "Jesus God — Choose your faith pack" },
      { name: "description", content: "Choose your Jesus God pack and pay securely with Apple Pay, Google Pay or card." },
      { property: "og:title", content: "Jesus God — Choose your faith pack" },
      { property: "og:description", content: "Secure checkout with Apple Pay, Google Pay or card." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: JesusGodPage,
});

function JesusGodPage() {
  const go = (href: string) => {
    const url = buildCheckoutUrl(href, window.location.search);
    if (url) window.location.href = url;
  };
  return (
    <main style={{ minHeight: "100vh", background: "#0a0f1e", color: "#fbf4df", fontFamily: "Georgia, serif", padding: "32px 16px" }}>
      <h1 style={{ textAlign: "center", color: "#f3c34e", fontSize: 30, margin: "0 0 8px" }}>Choose your pack</h1>
      <p style={{ textAlign: "center", opacity: 0.8, margin: "0 0 28px" }}>Pay with Apple Pay, Google Pay or card · secure checkout</p>
      <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", maxWidth: 1080, margin: "0 auto" }}>
        {JG_OFFERS.map((o) => (
          <article key={o.slug} style={{ background: "#121a33", border: o.badge ? "2px solid #f3c34e" : "1px solid #2a3355", borderRadius: 16, padding: 16, textAlign: "center" }}>
            {o.badge && <div style={{ color: "#f3c34e", fontWeight: 700, marginBottom: 8 }}>{o.badge}</div>}
            <img src={o.image} alt={o.name} width={400} height={400} loading="lazy" style={{ width: "100%", height: "auto", borderRadius: 12 }} />
            <h2 style={{ fontSize: 20, margin: "12px 0 4px" }}>{o.name}</h2>
            <p style={{ fontSize: 26, color: "#f3c34e", margin: "0 0 12px", fontWeight: 700 }}>{o.price}</p>
            <button type="button" disabled={!o.href} onClick={() => go(o.href)}
              style={{ width: "100%", padding: "14px", borderRadius: 10, border: 0, background: o.href ? "#f3c34e" : "#555", color: "#0a0f1e", fontWeight: 700, fontSize: 16, cursor: o.href ? "pointer" : "not-allowed" }}>
              {o.href ? "Buy now" : "Coming soon"}
            </button>
            <p style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}> Pay · G Pay · Visa · Mastercard</p>
          </article>
        ))}
      </div>
    </main>
  );
}
