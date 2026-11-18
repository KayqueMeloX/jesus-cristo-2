import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "../components/LegalLayout";

export const Route = createFileRoute("/refund")({
  component: RefundPage,
});

function RefundPage() {
  return (
    <LegalLayout>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#f3c34e" }}>
        Refund Policy
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "24px" }}>
        Last updated: June 30, 2026
      </p>

      <div
        style={{
          background: "rgba(243, 195, 78, 0.1)",
          border: "1px solid #f3c34e",
          borderRadius: "12px",
          padding: "16px 20px",
          marginBottom: "24px",
          lineHeight: "1.6",
        }}
      >
        <strong style={{ color: "#f3c34e" }}>7-Day Money-Back Guarantee.</strong> If you are not
        satisfied with your purchase, you may request a full refund within{" "}
        <strong>7 days</strong> of your purchase date — no complicated process.
      </div>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        How to request a refund
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Email{" "}
        <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          support@timetoprosper.org
        </a>{" "}
        from the email address used at checkout, including your order number or the name and email
        used for the purchase, within 7 days of your purchase. You do not need to provide a reason.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        How refunds are processed
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Once approved, your refund is issued to the original payment method. Depending on your bank
        or payment provider, it may take up to 5–10 business days to appear on your statement.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        Digital product
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Because this is a digital product delivered electronically, the 7-day guarantee above is
        offered as a customer-friendly courtesy. This policy does not limit any consumer rights you
        may have under applicable law.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        Questions
      </h2>
      <p style={{ marginBottom: "16px" }}>
        If you have any questions about a payment or refund, contact us any time at{" "}
        <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          support@timetoprosper.org
        </a>{" "}
        and we will help you.
      </p>
    </LegalLayout>
  );
}

export default RefundPage;
