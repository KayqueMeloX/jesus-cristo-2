import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "../components/LegalLayout";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

function SupportPage() {
  return (
    <LegalLayout>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#f3c34e" }}>
        Support
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "24px" }}>
        We're here to help.
      </p>

      <p style={{ marginBottom: "16px" }}>
        Have a question about your order, the product, or a payment? We'd be glad to assist.
      </p>

      <div
        style={{
          background: "rgba(243, 195, 78, 0.1)",
          border: "1px solid #f3c34e",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          lineHeight: "1.8",
        }}
      >
        <div>
          <strong style={{ color: "#f3c34e" }}>Email:</strong>{" "}
          <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
            support@timetoprosper.org
          </a>
        </div>
        <div>
          <strong style={{ color: "#f3c34e" }}>Response time:</strong> within 24–48 business hours
        </div>
        <div>
          <strong style={{ color: "#f3c34e" }}>Company:</strong> JARIK.CO
        </div>
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        Common topics
      </h2>

      <p style={{ marginBottom: "16px" }}>
        <strong>I didn't receive my product.</strong> Check your spam/promotions folder. If it's not
        there, email us with the name and email used at checkout and we'll resend it.
      </p>

      <p style={{ marginBottom: "16px" }}>
        <strong>I want a refund.</strong> See our{" "}
        <Link to="/refund" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          Refund Policy
        </Link>{" "}
        (7-day money-back guarantee) and email us to request one.
      </p>

      <p style={{ marginBottom: "16px" }}>
        <strong>I have a billing question.</strong> Email us with your order details and we'll look
        into it right away.
      </p>
    </LegalLayout>
  );
}

export default SupportPage;
