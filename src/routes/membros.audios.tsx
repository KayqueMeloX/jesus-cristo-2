import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { DAILY_PRAYERS } from "../lib/content";

export const Route = createFileRoute("/membros/audios")({
  component: MembrosAudios,
});

function MembrosAudios() {
  const bgmRef = useRef<HTMLAudioElement | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    setSpeechSupported("speechSynthesis" in window);
    return () => stopAudio();
  }, []);

  const stopAudio = () => {
    window.speechSynthesis?.cancel();
    bgmRef.current?.pause();
    setPlayingId(null);
  };

  const playBlessing = (id: string, text: string) => {
    stopAudio();

    if (!bgmRef.current) {
      bgmRef.current = new Audio("/quiz/bgm.mp3");
      bgmRef.current.loop = true;
      bgmRef.current.volume = 0.25;
    }
    bgmRef.current.play().catch(() => {});

    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = "en-US";
      utter.rate = 0.85;
      utter.pitch = 0.9;
      utter.onend = () => {
        bgmRef.current?.pause();
        setPlayingId(null);
      };
      utter.onerror = () => {
        bgmRef.current?.pause();
        setPlayingId(null);
      };
      window.speechSynthesis.speak(utter);
    }
    setPlayingId(id);
  };

  return (
    <div className="mb-wrap">
      <h1 className="mb-h1">Sanctuary of Blessings</h1>
      <p className="mb-sub">
        Guided blessings with heavenly music. Use headphones for a deeper moment.
      </p>

      {!speechSupported && (
        <p className="mb-err" style={{ color: "#ffc107", marginTop: 8 }}>
          Your device doesn't support spoken audio — you can still read each blessing below.
        </p>
      )}

      <div style={{ height: 14 }} />

      {DAILY_PRAYERS.map((item) => {
        const isPlaying = playingId === item.id;
        return (
          <article key={item.id} className="mb-card">
            <div className="mb-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span className="mb-sub" style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: "1px" }}>
                  {item.moment}
                </span>
                <div style={{ fontWeight: 600, fontSize: 17, marginTop: 2 }}>{item.title}</div>
              </div>
              <button
                className="mb-btn-ghost"
                aria-label={isPlaying ? `Stop ${item.title}` : `Play ${item.title}`}
                onClick={() => (isPlaying ? stopAudio() : playBlessing(item.id, item.text))}
                style={{
                  background: isPlaying ? "var(--mb-gold)" : "transparent",
                  color: isPlaying ? "#0a0f1e" : "var(--mb-gold)",
                  fontWeight: 600,
                }}
              >
                {isPlaying ? "⏸ Stop" : "▶ Play"}
              </button>
            </div>
            <p className="mb-p" style={{ marginTop: 14, lineHeight: 1.6, fontSize: 15, opacity: 0.9 }}>
              {item.text}
            </p>
          </article>
        );
      })}
    </div>
  );
}

export default MembrosAudios;
