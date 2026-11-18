import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "../components/LegalLayout";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout>
      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px", color: "#f3c34e" }}>
        Terms of Use
      </h1>
      <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", marginBottom: "24px" }}>
        Last updated: June 30, 2026
      </p>

      <p style={{ marginBottom: "16px" }}>
        These Terms of Use ("Terms") govern your access to and use of the website{" "}
        <strong>timetoprosperity.com</strong> and any digital products offered through it (the
        "Service"), operated by <strong>JARIK.CO</strong> ("we", "us", "our"). By accessing the
        site or purchasing a product, you agree to these Terms.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        1. The product
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We offer a digital product (a personalized inspirational "Manifestation Script" and related
        content) delivered electronically. The product is for personal, non-commercial use.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        2. No guarantees — educational content
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Our content is provided for educational, motivational, and inspirational purposes only. It
        does <strong>not</strong> constitute financial, investment, medical, psychological, or
        professional advice, and it is <strong>not</strong> a promise or guarantee of any specific
        outcome, income, health, or result. Results vary from person to person and depend on
        factors beyond our control.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        3. Eligibility
      </h2>
      <p style={{ marginBottom: "16px" }}>
        You must be at least 18 years old (or the age of majority in your jurisdiction) to
        purchase. By purchasing, you confirm the information you provide is accurate.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        4. Payments
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Payments are processed by our third-party payment provider. Prices are shown at checkout in
        the applicable currency. You are responsible for any taxes that may apply.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        5. Refunds
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Refunds are governed by our{" "}
        <Link to="/refund" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          Refund Policy
        </Link>
        , which forms part of these Terms.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        6. Intellectual property
      </h2>
      <p style={{ marginBottom: "16px" }}>
        All content, text, graphics, and materials are owned by or licensed to JARIK.CO and are
        protected by applicable law. You may not copy, resell, or redistribute the product without
        written permission.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        7. Acceptable use
      </h2>
      <p style={{ marginBottom: "16px" }}>
        You agree not to misuse the Service, attempt to gain unauthorized access, or use the content
        in any unlawful manner.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        8. Limitation of liability
      </h2>
      <p style={{ marginBottom: "16px" }}>
        To the maximum extent permitted by law, JARIK.CO shall not be liable for any indirect,
        incidental, or consequential damages arising from the use of, or inability to use, the
        Service or product.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        9. Changes
      </h2>
      <p style={{ marginBottom: "16px" }}>
        We may update these Terms from time to time. Continued use of the Service after changes
        means you accept the updated Terms.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        10. Governing law
      </h2>
      <p style={{ marginBottom: "16px" }}>
        These Terms are governed by the laws of Portugal.
      </p>

      <h2 style={{ fontSize: "20px", fontWeight: "600", marginTop: "24px", marginBottom: "8px", color: "#f3c34e" }}>
        11. Contact
      </h2>
      <p style={{ marginBottom: "16px" }}>
        Questions? Email us at{" "}
        <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          support@timetoprosper.org
        </a>
        .
      </p>
    </LegalLayout>
  );
}

export default TermsPage;
