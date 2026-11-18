import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useMember } from "../lib/MemberContext";

export const Route = createFileRoute("/membros/mentor")({
  component: MembrosMentor,
});

interface MentorExchange {
  id: number;
  question: string;
  reply?: {
    verse: string;
    ref: string;
    prayer: string;
    step: string;
  };
  error?: string;
}

const DEFAULT_GUIDANCES = [
  {
    keywords: ["debt", "money", "financ", "lack", "job", "work", "bill"],
    verse: "And my God will supply all your needs according to His riches in glory in Christ Jesus.",
    ref: "Philippians 4:19",
    prayer:
      "Heavenly Father, remove the heavy burden of financial anxiety from my beloved child. Unlock divine strategies, open doors of ethical prosperity, and release provision beyond what human eyes can see.",
    step: "Give thanks before the breakthrough arrives, write down your next practical step, and take it with confidence.",
  },
  {
    keywords: ["fear", "anxi", "worry", "stress", "sleep", "panic"],
    verse: "Peace I leave with you; my peace I give you. Do not let your hearts be troubled and do not be afraid.",
    ref: "John 14:27",
    prayer:
      "Lord, speak peace into every storm in their heart. Quiet turbulent thoughts with the assurance that You have overcome the world and hold their future safe.",
    step: "Take three deep breaths, release control into God's hands, and speak Psalm 23 aloud three times today.",
  },
  {
    keywords: ["health", "heal", "sick", "pain", "doctor", "body"],
    verse: "I will restore you to health and heal your wounds, declares the Lord.",
    ref: "Jeremiah 30:17",
    prayer:
      "Lord Jesus, the great Physician, lay Your healing hand upon their body and spirit. Strengthen every weak area and infuse divine vitality into every cell.",
    step: "Hydrate, rest in His presence, and decree daily: 'By His stripes I am healed and renewed.'",
  },
];

function generateGuidance(question: string) {
  const lower = question.toLowerCase();
  for (const g of DEFAULT_GUIDANCES) {
    if (g.keywords.some((k) => lower.includes(k))) {
      return {
        verse: g.verse,
        ref: g.ref,
        prayer: g.prayer,
        step: g.step,
      };
    }
  }
  return {
    verse: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
    ref: "Jeremiah 29:11",
    prayer:
      "Father, meet them at their point of deepest need. Where there is confusion, bring divine clarity. Where there is weariness, pour fresh oil of strength and joy.",
    step: "Write down what God has placed on your heart, surrender the timing, and walk forward in quiet faith.",
  };
}

function MembrosMentor() {
  const { session } = useMember();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<MentorExchange[]>([
    {
      id: 1,
      question: "How can I align my life with God's purpose today?",
      reply: {
        verse: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to Him, and He will make your paths straight.",
        ref: "Proverbs 3:5-6",
        prayer:
          "Lord, quiet all competing voices so they may hear Your gentle whisper. Direct their steps, illuminate their calling, and let their faith shine.",
        step: "Spend 5 minutes in silence listening to Heaven, then do the first good deed that comes to mind.",
      },
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = input.trim();
    if (query.length < 2 || loading) return;

    const id = Date.now();
    setMessages((prev) => [...prev, { id, question: query }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const guidance = generateGuidance(query);
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, reply: guidance } : msg))
      );
      setLoading(false);
    }, 800);
  };

  return (
    <div className="mb-wrap">
      <h1 className="mb-h1">Spiritual Mentor</h1>
      <p className="mb-sub">
        Share what's on your heart. You'll receive a verse, a personal prayer and a step of faith.
      </p>

      <div style={{ marginTop: 20 }}>
        {messages.map((item) => (
          <div key={item.id} style={{ marginBottom: 24 }}>
            <div
              className="mb-bubble"
              style={{
                background: "var(--mb-panel-2)",
                border: "1px solid var(--mb-line)",
                padding: "12px 16px",
                borderRadius: "14px 14px 4px 14px",
                maxWidth: "85%",
                marginLeft: "auto",
                marginBottom: 12,
                fontSize: 15,
              }}
            >
              {item.question}
            </div>

            {!item.reply && !item.error && (
              <div
                className="mb-skel"
                style={{
                  height: 120,
                  borderRadius: 16,
                  opacity: 0.4,
                  animation: "pulse 1.5s infinite",
                }}
                aria-label="Mentor is praying for you"
              />
            )}

            {item.reply && (
              <article
                className="mb-card"
                style={{
                  background: "var(--mb-panel)",
                  border: "1px solid var(--mb-line)",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div style={{ color: "var(--mb-gold)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
                  📖 Scripture of Promise
                </div>
                <p className="mb-verse" style={{ fontSize: 16, marginTop: 4 }}>
                  "{item.reply.verse}"
                </p>
                <p className="mb-ref" style={{ marginTop: 4 }}>
                  — {item.reply.ref}
                </p>

                <div style={{ height: 12 }} />
                <div style={{ color: "var(--mb-gold)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
                  🙏 Personal Prayer
                </div>
                <p className="mb-p" style={{ fontSize: 15, lineHeight: 1.6, marginTop: 4 }}>
                  {item.reply.prayer}
                </p>

                <div style={{ height: 12 }} />
                <div style={{ color: "var(--mb-gold)", fontWeight: 600, fontSize: 13, textTransform: "uppercase", letterSpacing: 1 }}>
                  ⚡ Step of Faith
                </div>
                <p className="mb-sub" style={{ fontSize: 14, color: "var(--mb-ink)", marginTop: 4 }}>
                  {item.reply.step}
                </p>
              </article>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          gap: 8,
          position: "sticky",
          bottom: 74,
          padding: "10px 0",
          background: "linear-gradient(to top, var(--mb-night) 70%, transparent)",
        }}
      >
        <input
          className="mb-input"
          placeholder="Ask for prayer, guidance or clarity…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          style={{ flex: 1 }}
        />
        <button
          className="mb-btn"
          disabled={loading || !input.trim()}
          style={{ width: "auto", padding: "12px 20px" }}
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default MembrosMentor;
