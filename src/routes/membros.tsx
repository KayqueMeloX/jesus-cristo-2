import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { MemberContext } from "../lib/MemberContext";
import { getSession, saveSession, clearSession, type MemberSession } from "../lib/session";
import { SupportChat } from "../components/SupportChat";

export const Route = createFileRoute("/membros")({
  component: MembrosLayout,
});

const NAV_TABS = [
  { to: "/membros", icon: "🏠", label: "Home" },
  { to: "/membros/oracoes", icon: "📖", label: "Prayers" },
  { to: "/membros/audios", icon: "🎧", label: "Blessings" },
  { to: "/membros/versiculos", icon: "🧭", label: "Verses" },
  { to: "/membros/mentor", icon: "🕊️", label: "Mentor" },
];

function LoginForm({ onLogin }: { onLogin: (session: MemberSession) => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const namePart = email.split("@")[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const session: MemberSession = {
        token: "tok_" + Date.now(),
        name: capitalized,
        email: email.trim(),
        tier: "full",
      };
      onLogin(session);
      setLoading(false);
    }, 400);
  };

  return (
    <main className="mb">
      <div className="mb-wrap" style={{ maxWidth: 420, paddingTop: 60 }}>
        <img
          src="/images/logo-en.png"
          alt="Time to Prosper"
          style={{ height: 70, margin: "0 auto 20px", display: "block" }}
        />
        <h1 className="mb-h1" style={{ textAlign: "center" }}>
          Your Sacred Space
        </h1>
        <p className="mb-sub" style={{ textAlign: "center", marginBottom: 24 }}>
          Enter the email you used at checkout to open your members area.
        </p>
        <form onSubmit={handleSubmit} className="mb-card">
          <label
            htmlFor="mb-email"
            className="mb-sub"
            style={{ display: "block", marginBottom: 8 }}
          >
            Purchase email
          </label>
          <input
            id="mb-email"
            className="mb-input"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
          />
          <div style={{ height: 12 }} />
          <button className="mb-btn" disabled={loading}>
            {loading ? "Checking…" : "Enter"}
          </button>
          {error && (
            <p className="mb-err" role="alert" style={{ color: "#ff6b6b", marginTop: 10 }}>
              {error}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}

function MembrosLayout() {
  const [session, setSession] = useState<MemberSession | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const s = getSession();
    // Pre-populate demo session if none exists so users can explore immediately, or let them login
    if (!s) {
      const demo: MemberSession = {
        token: "demo_blessed",
        name: "Beloved",
        tier: "blessed",
        email: "member@blessed.com",
      };
      saveSession(demo);
      setSession(demo);
    } else {
      setSession(s);
    }
    setInitialized(true);
  }, []);

  const handleSignOut = () => {
    clearSession();
    setSession(null);
  };

  if (!initialized) {
    return (
      <main className="mb">
        <div className="mb-wrap">
          <div className="mb-skel" style={{ height: 200, opacity: 0.3 }} />
        </div>
      </main>
    );
  }

  if (!session) {
    return (
      <>
        <LoginForm
          onLogin={(s) => {
            saveSession(s);
            setSession(s);
          }}
        />
        <SupportChat context="members" />
      </>
    );
  }

  return (
    <MemberContext.Provider value={{ session, signOut: handleSignOut }}>
      <div className="mb">
        <Outlet />

        <nav className="mb-tabs" aria-label="Members navigation">
          {NAV_TABS.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className="mb-tab"
              activeOptions={{ exact: tab.to === "/membros" }}
            >
              <span aria-hidden="true">{tab.icon}</span>
              <span>{tab.label}</span>
            </Link>
          ))}
        </nav>

        <SupportChat context="members" />
      </div>
    </MemberContext.Provider>
  );
}

export default MembrosLayout;
