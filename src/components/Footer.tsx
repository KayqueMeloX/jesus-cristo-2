import { Link } from "@tanstack/react-router";

export function LegalFooter() {
  return (
    <footer className="vsl-foot" aria-label="Legal" style={{ textAlign: "center", padding: "30px 16px", color: "rgba(255,255,255,0.6)", fontSize: "12px", lineHeight: "1.8" }}>
      <nav aria-label="Legal" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "12px" }}>
        <Link to="/terms" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>
          Terms of Use
        </Link>
        <span>·</span>
        <Link to="/privacy" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>
          Privacy Policy
        </Link>
        <span>·</span>
        <Link to="/refund" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>
          Refund Policy
        </Link>
        <span>·</span>
        <Link to="/support" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "underline" }}>
          Support
        </Link>
      </nav>
      <p style={{ margin: "4px 0" }}>JARIK.CO · Av. da Liberdade 245, 1250-143 Lisboa, Portugal</p>
      <p style={{ margin: "4px 0" }}>
        Support:{" "}
        <a href="mailto:support@timetoprosper.org" style={{ color: "#f3c34e", textDecoration: "underline" }}>
          support@timetoprosper.org
        </a>
      </p>
    </footer>
  );
}
export default LegalFooter;
