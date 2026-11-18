import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { PRAYER_CATEGORIES, DAILY_PRAYERS } from "../lib/content";
import { speakText } from "../lib/session";

export const Route = createFileRoute("/membros/oracoes")({
  component: MembrosOracoes,
});

interface PrayerItem {
  id: string;
  theme: string;
  title: string;
  ref: string;
  verse: string;
  prayer: string;
  declaration: string;
}

const PRAYERS_LIST: PrayerItem[] = [
  {
    id: "p1",
    theme: "Finances",
    title: "Overcoming Scarcity & Welcoming Provision",
    ref: "Philippians 4:19",
    verse: "And my God will meet all your needs according to the riches of His glory in Christ Jesus.",
    prayer:
      "Heavenly Father, I bring my finances before Your throne. Break every chain of lack and financial anxiety in my household. Open windows of opportunity and grant me wisdom to steward every resource for Your glory.",
    declaration: "Lack has no home in my life; divine abundance flows freely.",
  },
  {
    id: "p2",
    theme: "Finances",
    title: "Blessed Without Painful Toil",
    ref: "Proverbs 10:22",
    verse: "The blessing of the Lord brings wealth, without painful toil for it.",
    prayer:
      "Lord, I receive Your supernatural favor upon the work of my hands. Release the stress of striving in my own strength, and let Your grace multiply my efforts.",
    declaration: "God's favor surrounds me like a shield, multiplying my harvest.",
  },
  {
    id: "p3",
    theme: "Health",
    title: "Restoration and Vitality",
    ref: "Jeremiah 30:17",
    verse: "But I will restore you to health and heal your wounds, declares the Lord.",
    prayer:
      "Lord Jesus, touch every cell, muscle, and organ in my body. Cleanse away fatigue and disease. Renew my strength like the eagle's so I can serve You with joy.",
    declaration: "Divine health is my portion; by His stripes I am restored.",
  },
  {
    id: "p4",
    theme: "Family",
    title: "Peace and Unity Under My Roof",
    ref: "Joshua 24:15",
    verse: "As for me and my household, we will serve the Lord.",
    prayer:
      "Father, I invite Your Holy Spirit into our home. Heal broken bonds, remove harsh words, and replace friction with divine tenderness and mutual respect.",
    declaration: "My household is sanctified, guarded, and filled with heavenly harmony.",
  },
  {
    id: "p5",
    theme: "Peace",
    title: "Casting Down All Anxiety",
    ref: "Philippians 4:6-7",
    verse:
      "Do not be anxious about anything... And the peace of God, which transcends all understanding, will guard your hearts and your minds.",
    prayer:
      "Prince of Peace, quiet the storms of my thoughts. When tomorrow looks uncertain, remind me that You already stand in my future. I rest safely in Your love.",
    declaration: "God's peace guards my mind; fear and doubt must depart.",
  },
  {
    id: "p6",
    theme: "Protection",
    title: "Shield of Archangel Michael",
    ref: "Psalm 91:1-2",
    verse:
      "Whoever dwells in the shelter of the Most High will rest in the shadow of the Almighty.",
    prayer:
      "Lord of Heaven's armies, dispatch Archangel Michael and the ministering angels to encamp around my dwelling. Guard my going out and coming in from all evil.",
    declaration: "No weapon formed against me or my family shall prosper.",
  },
  {
    id: "p7",
    theme: "Wisdom",
    title: "Divine Guidance and Clear Direction",
    ref: "Proverbs 3:5-6",
    verse:
      "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.",
    prayer:
      "Holy Spirit, illuminate my path. Give me discernment in every choice, business decision, and relationship. Lead me beside quiet waters.",
    declaration: "I am led by the Spirit of God and my steps are ordered in victory.",
  },
];

function MembrosOracoes() {
  const [search, setSearch] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const themes = useMemo(
    () => ["All", ...Array.from(new Set(PRAYERS_LIST.map((p) => p.theme)))],
    []
  );

  const filteredPrayers = useMemo(() => {
    return PRAYERS_LIST.filter((p) => {
      const matchTheme = selectedTheme === "All" || p.theme === selectedTheme;
      const matchSearch =
        !search ||
        `${p.title} ${p.ref} ${p.prayer} ${p.verse}`
          .toLowerCase()
          .includes(search.toLowerCase());
      return matchTheme && matchSearch;
    });
  }, [search, selectedTheme]);

  const handleCopy = (prayer: PrayerItem) => {
    const text = `${prayer.title}\n${prayer.ref} — "${prayer.verse}"\n\nPrayer:\n${prayer.prayer}\n\nDeclaration:\n✦ ${prayer.declaration}`;
    navigator.clipboard?.writeText(text);
    setCopiedId(prayer.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="mb-wrap">
      <h1 className="mb-h1">Sacred Prayers</h1>
      <p className="mb-sub">
        {filteredPrayers.length} prayers in your library
      </p>

      <div style={{ margin: "14px 0" }}>
        <input
          className="mb-input"
          type="search"
          placeholder="Search prayers…"
          aria-label="Search prayers"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="mb-chips" role="group" aria-label="Themes" style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "10px", marginBottom: "14px" }}>
        {themes.map((theme) => (
          <button
            key={theme}
            className={`mb-chip ${selectedTheme === theme ? "active" : ""}`}
            style={{
              background: selectedTheme === theme ? "var(--mb-gold)" : "var(--mb-panel)",
              color: selectedTheme === theme ? "#0a0f1e" : "var(--mb-ink)",
              border: "1px solid var(--mb-line)",
              borderRadius: "20px",
              padding: "6px 14px",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
            onClick={() => setSelectedTheme(theme)}
          >
            {theme}
          </button>
        ))}
      </div>

      <div className="mb-list">
        {filteredPrayers.map((item, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <article key={item.id} className="mb-card">
              <button
                onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                aria-expanded={isExpanded}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  display: "block",
                  width: "100%",
                }}
              >
                <span className="mb-sub">
                  #{idx + 1} · {item.theme}
                </span>
                <span
                  style={{
                    display: "block",
                    fontWeight: 600,
                    fontSize: 17,
                    marginTop: 2,
                  }}
                >
                  {item.title}
                </span>
                <span className="mb-ref" style={{ display: "block" }}>
                  {item.ref}
                </span>
              </button>

              {isExpanded && (
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--mb-line)" }}>
                  <p className="mb-verse" style={{ fontSize: 16 }}>
                    "{item.verse}"
                  </p>
                  <p className="mb-p" style={{ marginTop: 10, lineHeight: 1.6, fontSize: 15 }}>
                    {item.prayer}
                  </p>
                  <p
                    className="mb-decl"
                    style={{
                      marginTop: 12,
                      color: "var(--mb-gold)",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    ✦ {item.declaration}
                  </p>
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <button
                      className="mb-btn-ghost"
                      onClick={() => speakText(`${item.verse} ${item.prayer} ${item.declaration}`)}
                    >
                      🔊 Listen
                    </button>
                    <button className="mb-btn-ghost" onClick={() => handleCopy(item)}>
                      {copiedId === item.id ? "✓ Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}

export default MembrosOracoes;
