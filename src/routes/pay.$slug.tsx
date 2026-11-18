import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { getOfferBySlug, buildCheckoutUrl } from "../lib/offer-config";

export const Route = createFileRoute("/pay/$slug")({
  component: PayRedirectPage,
});

function PayRedirectPage() {
  const { slug } = Route.useParams();
  const offer = getOfferBySlug(slug);

  useEffect(() => {
    if (!offer) return;

    const meta = document.createElement("meta");
    meta.name = "referrer";
    meta.content = "no-referrer";
    document.head.appendChild(meta);

    const targetUrl = buildCheckoutUrl(offer.href, window.location.search);
    if (!targetUrl) return;

    const timer = setTimeout(() => {
      window.location.replace(targetUrl);
    }, 400);

    return () => clearTimeout(timer);
  }, [offer]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        backgroundColor: "#0a0f1e",
        color: "#fbf4df",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p style={{ fontSize: "18px", marginBottom: "8px" }}>
          {offer ? "Redirecting to secure checkout…" : "Plan not found."}
        </p>
        {offer && (
          <p style={{ fontSize: "14px", opacity: 0.7 }}>
            Please wait while we connect your blessing...
          </p>
        )}
      </div>
    </main>
  );
}

export default PayRedirectPage;
