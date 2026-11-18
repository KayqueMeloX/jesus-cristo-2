import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { OFFERS, getPayRoute } from "../lib/offer-config";
import { SupportChat } from "../components/SupportChat";
import { LegalFooter } from "../components/Footer";

export const Route = createFileRoute("/ultima-etapa")({
  validateSearch: (search: Record<string, unknown>) => ({
    nome: typeof search.nome === "string" ? search.nome : "",
    liberar: typeof search.liberar === "string" ? search.liberar : "",
  }),
  component: UltimaEtapa,
});

interface VideoPlayerProps {
  onTime: (currentTime: number) => void;
}

function VslPlayer({ onTime }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [unmuted, setUnmuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!unmuted) {
      video.currentTime = 0;
      video.muted = false;
      setUnmuted(true);
      video.play().catch(() => {});
      return;
    }
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const barWidth = Math.min(100, 100 * Math.sqrt(progressPercent / 100));

  return (
    <div
      className="vsl-player"
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={!unmuted ? "Click to listen" : isPaused ? "Play" : "Pause"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          togglePlay();
        }
      }}
    >
      <video
        ref={videoRef}
        src="https://arktrix-offer-vault.lovable.app/__l5e/assets-v1/bebf9243-0389-47fe-8460-2967565d93f7/vsl.mp4"
        poster="/vsl/poster.jpg"
        autoPlay
        muted
        playsInline
        preload="auto"
        onPlay={() => setIsPaused(false)}
        onPause={() => setIsPaused(true)}
        onTimeUpdate={(e) => {
          const v = e.currentTarget;
          if (v.duration) {
            setProgressPercent((v.currentTime / v.duration) * 100);
          }
          if (!v.muted) {
            onTime(v.currentTime);
          }
        }}
      />
      {!unmuted && (
        <div className="vsl-unmute">
          <span>Your message has begun</span>
          <svg viewBox="0 0 24 24" width="56" height="56" aria-hidden="true">
            <path
              fill="currentColor"
              d="M3 9v6h4l5 5V4L7 9H3zm13.6 3 2.7-2.7-1.4-1.4-2.7 2.7-2.7-2.7-1.4 1.4 2.7 2.7-2.7 2.7 1.4 1.4 2.7-2.7 2.7 2.7 1.4-1.4z"
            />
          </svg>
          <span>Click to listen</span>
        </div>
      )}
      {unmuted && isPaused && (
        <div className="vsl-play" aria-hidden="true">
          ▶
        </div>
      )}
      <div className="vsl-bar">
        <i style={{ width: `${barWidth}%` }} />
      </div>
    </div>
  );
}

function OfferCards({ name }: { name: string }) {
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  const handleSelectOffer = (slug: string) => {
    window.location.href = getPayRoute(slug, window.location.search);
  };

  return (
    <div className="vsl-oferta">
      <p className="vsl-choose">
        👉 Unlock your Divine Manifestation Script
        <small>
          {name && <span className="funnel-name">{name}, </span>}
          choose your seed now!
        </small>
      </p>
      <p className="vsl-reforco">
        The bigger the seed you plant today, the bigger the harvest God has prepared. Plant in faith.
      </p>
      <p className="vsl-timer">
        ⏳ Your blessing is reserved for another{" "}
        <b>
          {minutes}:{seconds}
        </b>
      </p>

      <div className="vsl-grid">
        {OFFERS.map((offer) => (
          <div
            key={offer.slug}
            className={`vsl-card ${offer.badge ? "vsl-card--glow" : ""}`}
          >
            {offer.badge && <span className="vsl-badge">{offer.badge}</span>}
            <a
              href={getPayRoute(offer.slug, "")}
              rel="noreferrer"
              referrerPolicy="no-referrer"
              aria-label={offer.label}
              onClick={(e) => {
                e.preventDefault();
                handleSelectOffer(offer.slug);
              }}
            >
              <img src={offer.image} alt="" style={{ cursor: "pointer" }} />
            </a>
            <a
              className="vsl-seed-btn"
              href={getPayRoute(offer.slug, "")}
              rel="noreferrer"
              referrerPolicy="no-referrer"
              onClick={(e) => {
                e.preventDefault();
                handleSelectOffer(offer.slug);
              }}
            >
              {offer.label}
            </a>
          </div>
        ))}
      </div>

      <p className="vsl-disc">
        Spiritual and personal development content. No promise of financial gain, healing, or results. Stories are illustrative and vary from person to person.
      </p>
    </div>
  );
}

function UltimaEtapa() {
  const { nome, liberar } = Route.useSearch();
  const [pitchUnlocked, setPitchUnlocked] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const offerSectionRef = useRef<HTMLElement | null>(null);
  const justUnlockedRef = useRef(false);

  const cleanName = (nome ?? "").trim();
  const isUnlocked = liberar === "1" || pitchUnlocked;

  useEffect(() => {
    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    try {
      if (localStorage.getItem("vsl_pitch_reached") === "1") {
        setPitchUnlocked(true);
      }
    } catch {}
  }, []);

  const handleTimeUpdate = (currentTime: number) => {
    if (pitchUnlocked || currentTime < 493) return;
    justUnlockedRef.current = true;
    setPitchUnlocked(true);
    try {
      localStorage.setItem("vsl_pitch_reached", "1");
    } catch {}
  };

  useEffect(() => {
    if (!isUnlocked || !justUnlockedRef.current) return;
    justUnlockedRef.current = false;
    const timeout = setTimeout(() => {
      window.scrollBy({
        top: Math.min(320, offerSectionRef.current?.getBoundingClientRect().top ?? 320),
        behavior: "smooth",
      });
    }, 300);
    return () => clearTimeout(timeout);
  }, [isUnlocked]);

  return (
    <div className="vsl">
      <section className="vsl-hero">
        <div className="vsl-wrap">
          <img className="vsl-logo" src="/images/logo-en.png" alt="Time to Prosper" />
          <h1 className="vsl-h1">
            {cleanName ? (
              <>
                <span className="funnel-name">{cleanName}, </span>you
              </>
            ) : (
              "You"
            )}{" "}
            made it this far… and that is no accident.
          </h1>
          <p className="vsl-date">Today is {currentDate} — the first day of your new reality.</p>
          <div className="vsl-rule" />
          <p className="vsl-watch">
            Watch the video below to <b>receive your blessing</b>.
          </p>
          <div className="vsl-video">
            <VslPlayer onTime={handleTimeUpdate} />
          </div>
          <p className="vsl-sound">🔊 Tap the video to turn on the sound.</p>
        </div>
      </section>

      <section className="vsl-dark" ref={offerSectionRef}>
        {isUnlocked ? (
          <OfferCards name={cleanName} />
        ) : (
          <p className="vsl-waiting">
            Please wait — your blessing is being prepared
            <span className="vsl-dot" />
            <span className="vsl-dot" />
            <span className="vsl-dot" />
          </p>
        )}
      </section>

      <LegalFooter />
      <SupportChat context="sales" />
    </div>
  );
}

export default UltimaEtapa;
