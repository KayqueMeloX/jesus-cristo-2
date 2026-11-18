import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PRAYER_CATEGORIES } from "../lib/content";
import { speakText } from "../lib/session";

export const Route = createFileRoute("/membros/versiculos")({
  component: MembrosVersiculos,
});

function MembrosVersiculos() {
  const [selectedAreaId, setSelectedAreaId] = useState(PRAYER_CATEGORIES[0].id);
  const currentCategory =
    PRAYER_CATEGORIES.find((cat) => cat.id === selectedAreaId) ?? PRAYER_CATEGORIES[0];

  return (
    <div className="mb-wrap">
      <h1 className="mb-h1">Biblical Compass</h1>
      <p className="mb-sub">
        Choose an area of your life and receive God's promises for it.
      </p>

      <div
        className="mb-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))",
          gap: 10,
          marginTop: 14,
        }}
      >
        {PRAYER_CATEGORIES.map((cat) => {
          const isSelected = cat.id === selectedAreaId;
          return (
            <button
              key={cat.id}
              className={`mb-area ${isSelected ? "active" : ""}`}
              aria-pressed={isSelected}
              onClick={() => setSelectedAreaId(cat.id)}
              style={{
                background: isSelected ? "var(--mb-gold)" : "var(--mb-panel)",
                color: isSelected ? "#0a0f1e" : "var(--mb-ink)",
                border: "1px solid var(--mb-line)",
                borderRadius: 14,
                padding: "12px 8px",
                cursor: "pointer",
                textAlign: "center",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: 24, display: "block" }} aria-hidden="true">
                {cat.icon}
              </span>
              <span
                style={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: 13,
                  marginTop: 4,
                }}
              >
                {cat.title.split("&")[0].trim()}
              </span>
            </button>
          );
        })}
      </div>

      <h2 className="mb-h2" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span>{currentCategory.icon}</span> {currentCategory.title}
      </h2>

      <div
        className="mb-card"
        style={{
          background: "linear-gradient(135deg, rgba(230,200,104,0.15) 0%, rgba(17,25,51,0.8) 100%)",
          border: "1px solid var(--mb-gold)",
          marginBottom: 16,
        }}
      >
        <span className="mb-sub" style={{ color: "var(--mb-gold)", textTransform: "uppercase", fontSize: 12, letterSpacing: 1 }}>
          Sacred Decree
        </span>
        <p style={{ fontWeight: 600, fontSize: 16, marginTop: 4, fontStyle: "italic" }}>
          "{currentCategory.decree}"
        </p>
      </div>

      {currentCategory.verses.map((v) => (
        <article key={v.ref} className="mb-card">
          <p className="mb-verse" style={{ fontSize: 16 }}>
            "{v.text}"
          </p>
          <div
            className="mb-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <p className="mb-ref">{v.ref}</p>
            <button
              className="mb-btn-ghost"
              onClick={() => speakText(`${v.text} — ${v.ref}`)}
            >
              🔊 Listen
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}

export default MembrosVersiculos;
