import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "../components/LegalLayout";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#f3c34e" }}>
        Privacy Policy
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "24px" }}>
        Last updated: June 30, 2026
      </p>

      <p style={{ marginBottom: "16px" }}>
        This Privacy Policy explains how <strong>JARIK.CO</strong> ("we", "us") collects, uses,
        and protects your information when you use <strong>timetoprosperity.com</strong>.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        1. Information we collect
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We may collect: (a) information you provide, such as the name you enter and the answers you
        give during the quiz; (b) your email and order details when you make a purchase; and (c)
        technical data such as your IP address, browser, and device, collected automatically.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        2. Payment information
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We do <strong>not</strong> store your full card details. Payments are processed securely
        by our third-party payment provider, which collects and processes the data needed to
        complete your transaction.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        3. How we use your information
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We use your information to deliver the product, provide support, process payments and
        refunds, improve our content, and — where permitted — measure and improve our advertising.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        4. Cookies and tracking
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We and our partners may use cookies and tracking technologies (such as advertising pixels)
        to understand site usage and measure ad performance. You can control cookies through your
        browser settings.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        5. Sharing
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We share information only with service providers who help us operate (such as our payment
        processor and hosting/advertising partners), or where required by law. We do not sell your
        personal information.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        6. Data retention
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We keep your information only as long as necessary for the purposes described here or as
        required by law.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        7. Your rights
      </h2>
      <p style={{ marginBottom: "16px" }}>
        You may request access to, correction of, or deletion of your personal data by emailing us.
        We will respond in accordance with applicable law.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        8. Contact
      </h2>
      <p style={{ marginBottom: "16px" }}>
        For any privacy request, contact{" "}
        <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          support@timetoprosper.org
        </a>
        .
      </p>
    </LegalLayout>
  );
}

export default PrivacyPage;
