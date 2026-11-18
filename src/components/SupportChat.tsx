import { useState } from "react";

interface SupportChatProps {
  context: "sales" | "members";
}

interface ChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
}

const QUICK_QUESTIONS: Record<"sales" | "members", string[]> = {
  sales: [
    "How do I receive my book?",
    "Is payment secure?",
    "Which seed should I choose?",
  ],
  members: [
    "How do I download my PDF?",
    "How do daily missions work?",
    "I can't sign in",
  ],
};

const AUTOMATED_ANSWERS: Record<string, string> = {
  "how do i receive my book?":
    "Your Divine Manifestation Script and materials are delivered immediately to your email after purchase, and you will also receive direct access to your Sacred Members Area.",
  "is payment secure?":
    "Yes, 100% secure. Payments are encrypted with bank-level 256-bit SSL encryption through our certified payment partners.",
  "which seed should i choose?":
    "Follow your heart and prayer. The $100 seed is the full blessing with all bonuses, but choose the step of faith that resonates with your current journey.",
  "how do i download my pdf?":
    "Inside the Sacred Space, open the library tab to download your personal PDF copy at any time.",
  "how do daily missions work?":
    "Each day you receive 3 sacred practices: prayer, divine blessing audio, and scripture declaration to align your faith and grow your streak.",
  "i can't sign in":
    "Simply enter the email address you used at checkout. If you need assistance, our support team is available at support@timetoprosper.org.",
};

export function SupportChat({ context }: SupportChatProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { id: Date.now(), role: "user", content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let reply =
        "Thank you for reaching out in faith. Our support team is here to assist you. If you have any specific account or purchase questions, email us at support@timetoprosper.org.";

      for (const [key, answer] of Object.entries(AUTOMATED_ANSWERS)) {
        if (lower.includes(key) || key.includes(lower)) {
          reply = answer;
          break;
        }
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", content: reply },
      ]);
      setLoading(false);
    }, 600);
  };

  return (
    <div className={`sc ${context === "members" ? "sc-members" : ""}`}>
      {open && (
        <section className="sc-panel" role="dialog" aria-label="Support chat">
          <header className="sc-head">
            <span>🕊️ Support</span>
            <button
              type="button"
              className="sc-x"
              aria-label="Close support"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </header>
          <div className="sc-body">
            <p className="sc-a">Hello! Ask me anything — I'm here to help. 🙏</p>
            {messages.length === 0 &&
              QUICK_QUESTIONS[context].map((q) => (
                <button
                  key={q}
                  type="button"
                  className="sc-quick"
                  onClick={() => void sendMessage(q)}
                >
                  {q}
                </button>
              ))}
            {messages.map((m) => (
              <p key={m.id} className={m.role === "user" ? "sc-u" : "sc-a"}>
                {m.content}
              </p>
            ))}
            {loading && (
              <p className="sc-a sc-typing" aria-label="Typing">
                …
              </p>
            )}
          </div>
          <form
            className="sc-form"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <input
              className="sc-in"
              value={input}
              maxLength={1500}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              aria-label="Your question"
            />
            <button
              className="sc-send"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              ➤
            </button>
          </form>
        </section>
      )}
      <button
        type="button"
        className="sc-fab"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "✕" : "💬 Need help?"}
      </button>
    </div>
  );
}
export default SupportChat;
