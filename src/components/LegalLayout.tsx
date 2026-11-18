import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { LegalFooter } from "./Footer";

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0f1e",
        color: "#fbf4df",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <header
        style={{
          padding: "16px 20px",
          borderBottom: "1px solid rgba(230,200,104,0.15)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "inherit" }}>
          <img src="/images/logo-en.png" alt="Time to Prosper" style={{ height: 36 }} />
        </Link>
        <Link to="/ultima-etapa" style={{ color: "#f3c34e", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
          ← Back to Offer
        </Link>
      </header>

      <main
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "36px 20px 60px",
          lineHeight: "1.7",
          fontSize: "15px",
        }}
      >
        {children}
      </main>

      <LegalFooter />
    </div>
  );
}

export default LegalLayout;
