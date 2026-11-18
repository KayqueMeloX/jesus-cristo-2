import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  component: QuizIndex,
});

const QUIZ_QUESTIONS = [
  {
    type: "number",
    text: "[NAME], if you looked at your bank account today, how much would you have available?",
    placeholder: "Numbers only (e.g. 1500)",
  },
  {
    type: "choice",
    text: "[NAME], do you feel you are living the life God dreamed for you?",
    options: [
      "Yes, but I know I can live more",
      "No, I feel far from it",
      "Sometimes I wonder about it...",
    ],
  },
  {
    type: "choice",
    text: "How often do you feel an emptiness in your chest... as if something were missing?",
    options: ["Every day", "A few times a week", "Rarely"],
  },
  {
    type: "choice",
    text: "Do you feel trapped in the same negative cycles for years?",
    options: ["Yes, it feels like a loop", "Sometimes I feel that way", "I'm not sure"],
  },
  {
    type: "choice",
    text: "If the life you live today were the direct result of your choices... would you be satisfied?",
    options: ["No, I want to change", "More or less", "Yes, but I want more"],
  },
  {
    type: "choice",
    text: "How many times have you asked God for a sign to change your life?",
    options: ["Many times", "A few times", "I don't usually ask for signs", "This is the first time"],
  },
  {
    type: "choice",
    text: "[NAME], if today were your final test of faith… what would you do now?",
    options: [
      "I would act like someone who believes in miracles",
      "I would take a small step, afraid... but I would take it",
      "I would stay still... once again... like all the other times I gave up",
    ],
  },
  {
    type: "choice",
    text: "Do you believe God can transform your life with one single decision of yours?",
    options: ["Yes, absolutely", "I have doubts", "I don't know"],
  },
  {
    type: "choice",
    text: "Are you willing to make TODAY your day of faith and responsibility for your new life?",
    options: ["Yes, I'm ready", "I need a clearer sign", "No"],
  },
  {
    type: "choice",
    text: "If God gave you the chance to win the home of your dreams… what would it be like?",
    options: [
      "Big, with several bedrooms",
      "A modern apartment",
      "A simple house, but full of peace",
      "I don't think about it much",
    ],
  },
  {
    type: "choice",
    text: "What car do you imagine parked in front of your ideal home?",
    options: ["A luxury SUV", "A comfortable sedan", "A simple, reliable car", "I don't care about cars"],
  },
  {
    type: "choice",
    text: "How is your family life today?",
    options: [
      "I feel unity is missing",
      "I miss someone special",
      "I have a good family, but we could be happier",
      "I don't think about it much",
    ],
  },
  {
    type: "choice",
    text: "If you woke up tomorrow with perfect health… what would be different?",
    options: [
      "More energy to chase my dreams",
      "Playing sports without pain",
      "Feeling good in my own body",
      "My health is good, but I want more vitality",
    ],
  },
  {
    type: "choice",
    text: "If you received a large amount of money today… what would you do first?",
    options: ["Pay off my debts", "Buy a house", "Make my family's dream come true", "Invest in my future"],
  },
  {
    type: "choice",
    text: "Imagine that in 30 days your life is 100% transformed. Which of these images represents your future?",
    options: [
      "Luxury home and financial freedom",
      "Perfect health and vitality",
      "Happy family and love",
      "Travel and new experiences",
    ],
  },
  {
    type: "choice",
    text: "Do you feel something spiritual or emotional is blocking you?",
    options: ["Yes, a weight I can't explain", "Sometimes I feel it", "No"],
  },
  {
    type: "choice",
    text: "Which of these phrases describes you best?",
    options: [
      "I feel cursed, nothing works out for me",
      "My life has never been easy",
      "I don't feel worthy",
      "I lack energy and motivation",
    ],
  },
  {
    type: "choice",
    text: "Do you accept being part of a group of people who decided to create the life of their dreams through the power of faith?",
    options: ["Yes, I accept", "I'm not sure", "I need to think"],
  },
  {
    type: "choice",
    text: "If you could change just one thing right now... what would it be?",
    options: ["My financial situation", "My relationships", "My health", "My life purpose"],
  },
  {
    type: "choice",
    text: "If God gave you the chance to start over today… would you take it?",
    options: ["Yes, without hesitating", "Yes, but with a little fear", "I'm not ready"],
  },
];

interface UnlockItem {
  name: string;
  sub: string;
  btn: string;
  img: string;
}

const UNLOCKS: Record<string, UnlockItem> = {
  mult: {
    name: "100x Multiplication",
    sub: "",
    btn: "⚡ YES! I receive 100x more!",
    img: "/quiz/mult-XvzTbWtX.webp",
  },
  future: {
    name: "I Choose My Future",
    sub: "The power to change your life is in your hands!",
    btn: "⚡ Continue Evolving",
    img: "/quiz/future-en-OQIZDLSY.jpg",
  },
  faith: {
    name: "Decision of Faith",
    sub: "🙏 Your Faith Will Move Mountains",
    btn: "⚡ Continue Evolving",
    img: "/quiz/faith-Dk3TJ6DJ.webp",
  },
  home: {
    name: "Dream Home",
    sub: "🏠 Your Dream Home Is on Its Way",
    btn: "⚡ Continue Evolving",
    img: "/quiz/home-UCjdPumC.webp",
  },
  car: {
    name: "Dream Car",
    sub: "🚗 Your Dream Car Is Reserved",
    btn: "⚡ Continue Evolving",
    img: "/quiz/car-B_dAL-b0.webp",
  },
  family: {
    name: "Happy Family",
    sub: "👨‍👩‍👧‍👦 The Happy Family You Deserve",
    btn: "⚡ Continue Evolving",
    img: "/quiz/family-en-BfJbt4gV.jpg",
  },
  health: {
    name: "Perfect Health",
    sub: "❤️ Your Perfect Health Has Been Activated",
    btn: "⚡ Continue Evolving",
    img: "/quiz/health-Chy0Nyn2.webp",
  },
  abundance: {
    name: "Abundance",
    sub: "💸 Imagine… $277,000 being deposited into your account right now!",
    btn: "⚡ YES! I believe, I receive!",
    img: "/quiz/abundance-en-DdbXTYba.jpg",
  },
  boost: {
    name: "100x Boost",
    sub: "⚡ Your Manifestation Power Has Been Multiplied by 100x",
    btn: "⚡ Continue Evolving",
    img: "/quiz/boost-CwMGnLS5.webp",
  },
  blocks: {
    name: "Blocks Broken",
    sub: "🔓 All Mental Blocks Have Been Removed",
    btn: "⚡ Continue Evolving",
    img: "/quiz/blocks-CP-AvJbZ.webp",
  },
};

const UNLOCK_MAP: Record<number, string> = {
  0: "mult",
  4: "future",
  7: "faith",
  9: "home",
  10: "car",
  11: "family",
  12: "health",
  13: "abundance",
  14: "boost",
  15: "blocks",
};

const ARCHANGEL_IMAGES = [
  "/quiz/arcanjo-k_o-bNwM.webp",
  "/quiz/arcanjo-2-DGlIGBZu.webp",
  "/quiz/arcanjo-3-DarRbyOO.webp",
  "/quiz/arcanjo-4-BK1C8mNS.webp",
  "/quiz/arcanjo-5-po0f_bQy.webp",
  "/quiz/arcanjo-6-CjN11WXb.webp",
  "/quiz/arcanjo-7-itFKkh0d.webp",
  "/quiz/arcanjo-8-DfwUznQn.webp",
];

const AUDIO_FILES: Record<string, string> = {
  bgm: "/quiz/bgm.mp3",
  v1: "/quiz/en-v1.mp3",
  v2: "/quiz/en-v2.mp3",
  v3: "/quiz/en-v3.mp3",
  v4: "/quiz/en-v4.mp3",
  v5: "/quiz/en-v5.mp3",
  v6: "/quiz/en-v6.mp3",
  v7: "/quiz/en-v7.mp3",
  v8: "/quiz/en-v8.mp3",
};

const AUDIO_TRIGGERS: Record<string, string> = {
  name: "v1",
  affirm: "v2",
  q0: "v3",
  q1: "v4",
  q6: "v5",
  q9: "v6",
  q15: "v7",
  loading: "v8",
};

const LOADING_STEPS: Array<[number, string]> = [
  [0, "Starting your transformation..."],
  [22, "Reading the desires of your heart..."],
  [45, "Aligning your energy with the divine..."],
  [68, "Breaking spiritual blocks..."],
  [85, "Writing your Sacred Script, word by word..."],
  [97, "Finishing your manifestation..."],
];

const IMAGE_INDEX_MAP = [
  [4, 1, 4, 0, 4],
  [5, 2, 5, 1, 5],
  [6, 3, 6, 1, 6],
  [7, 0, 7, 2, 7],
];

function formatCurrency(val: number): string {
  return val.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function calculateNewBalance(current: number, key: string): number {
  if (key === "mult" || key === "boost") return current * 100;
  if (key === "abundance") return current + 277000;
  return current * 2;
}

function getStageTitle(idx: number): string {
  if (idx <= 5) return "Financial Awakening";
  if (idx <= 8) return "Faith & Commitment";
  if (idx <= 14) return "Vision & Desire";
  return "Breaking Blocks";
}

const NAME_STORAGE_KEY = "hp_nome";

function QuizIndex() {
  const navigate = useNavigate();
  const [gateOpen, setGateOpen] = useState(true);
  const [stage, setStage] = useState<"name" | "affirm" | "q" | "loading">("name");
  const [name, setName] = useState("");
  const [questionIdx, setQuestionIdx] = useState(0);
  const [balance, setBalance] = useState(0);
  const [unlockedKeys, setUnlockedKeys] = useState<string[]>([]);
  const [activeUnlock, setActiveUnlock] = useState<{ key: string; money?: boolean } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [muted, setMuted] = useState(false);
  const [balanceInput, setBalanceInput] = useState("");
  const [loadProgress, setLoadProgress] = useState(0);

  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const bgmAudioRef = useRef<HTMLAudioElement | null>(null);
  const redirectTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isNavigatingRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const currentAudioKey = stage === "q" ? AUDIO_TRIGGERS[`q${questionIdx}`] : AUDIO_TRIGGERS[stage];

  useEffect(() => {
    try {
      const urlParam = new URLSearchParams(window.location.search).get("nome");
      if (urlParam) {
        setName(urlParam);
      } else {
        const stored = sessionStorage.getItem(NAME_STORAGE_KEY);
        if (stored) setName(stored);
      }
    } catch {}

    return () => {
      voiceAudioRef.current?.pause();
      bgmAudioRef.current?.pause();
      if (redirectTimerRef.current) clearTimeout(redirectTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (gateOpen) return;
    const voice = voiceAudioRef.current;
    if (!voice) return;
    const targetSrc = currentAudioKey ? AUDIO_FILES[currentAudioKey] : undefined;
    if (targetSrc && voice.src.endsWith(targetSrc)) return;

    voice.pause();
    setIsSpeaking(false);
    if (targetSrc) {
      voice.src = targetSrc;
      voice.onended = voice.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      voice.play().catch(() => setIsSpeaking(false));
    }
  }, [stage, questionIdx, gateOpen, currentAudioKey]);

  useEffect(() => {
    isNavigatingRef.current = false;
    panelRef.current?.scrollTo({ top: 0 });
  }, [questionIdx, stage]);

  useEffect(() => {
    if (stage !== "loading" || gateOpen) return;
    const startTime = performance.now();
    const interval = setInterval(() => {
      const duration = voiceAudioRef.current?.duration;
      const totalMs = duration && Number.isFinite(duration) ? duration * 1000 : 12000;
      const pct = Math.min(100, ((performance.now() - startTime) / totalMs) * 100);
      setLoadProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        redirectTimerRef.current = setTimeout(() => {
          try {
            sessionStorage.setItem(NAME_STORAGE_KEY, name);
          } catch {}
          const searchObj = Object.fromEntries(new URLSearchParams(window.location.search));
          navigate({
            to: "/ultima-etapa",
            search: { ...searchObj, nome: name },
          });
        }, 1200);
      }
    }, 160);

    return () => clearInterval(interval);
  }, [stage, gateOpen, name, navigate]);

  const handleStart = () => {
    const voice = new Audio(currentAudioKey ? AUDIO_FILES[currentAudioKey] : undefined);
    voiceAudioRef.current = voice;
    voice.onended = voice.onerror = () => setIsSpeaking(false);
    if (currentAudioKey) {
      setIsSpeaking(true);
      voice.play().catch(() => setIsSpeaking(false));
    }

    const bgm = new Audio(AUDIO_FILES["bgm"]);
    bgm.loop = true;
    bgmAudioRef.current = bgm;
    bgm.play().catch(() => {});
    setGateOpen(false);
  };

  const advanceQuestion = () => {
    if (questionIdx + 1 >= QUIZ_QUESTIONS.length) {
      setStage("loading");
    } else {
      setQuestionIdx((prev) => prev + 1);
    }
  };

  const handleAnswer = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    const unlockKey = UNLOCK_MAP[questionIdx];
    if (unlockKey) {
      setActiveUnlock({ key: unlockKey });
    } else {
      advanceQuestion();
    }
  };

  const handleDismissUnlock = () => {
    if (!activeUnlock) return;
    if (!activeUnlock.money) {
      setUnlockedKeys((prev) => (prev.includes(activeUnlock.key) ? prev : [...prev, activeUnlock.key]));
      setBalance((prev) => calculateNewBalance(prev, activeUnlock.key));
      if (activeUnlock.key === "abundance") {
        setActiveUnlock({ key: "abundance", money: true });
        return;
      }
    }
    setActiveUnlock(null);
    advanceQuestion();
  };

  const currentQ = QUIZ_QUESTIONS[questionIdx];
  if (!currentQ) return null;

  const energyPercent = Math.round(((questionIdx + 1) / QUIZ_QUESTIONS.length) * 100);
  const activeImageIdx =
    stage === "name"
      ? 3
      : stage === "affirm"
      ? 2
      : stage === "loading"
      ? 3
      : IMAGE_INDEX_MAP[Math.min(3, Math.floor(questionIdx / 5))]?.[questionIdx % 5] ?? 0;

  const revealClass = isSpeaking ? "reveal wait" : "reveal";
  const currentLoadingMsg =
    [...LOADING_STEPS].reverse().find(([threshold]) => loadProgress >= threshold)?.[1] ??
    (LOADING_STEPS[0]?.[1] ?? "");
  const isInputDisabled = isSpeaking || gateOpen;
  const displayName = name || "friend";

  return (
    <main className="miguel-quiz">
      <div className="app">
        {ARCHANGEL_IMAGES.map((imgSrc, idx) => (
          <img
            key={imgSrc}
            src={imgSrc}
            alt={idx === activeImageIdx ? "Archangel Michael" : ""}
            className={`bg ${idx === activeImageIdx ? "active" : ""}`}
            width={720}
            height={1286}
            fetchPriority={idx === activeImageIdx ? "high" : "low"}
          />
        ))}

        <div className="scrim-top" />
        <div className="scrim-bottom" />

        <progress
          className="progress"
          aria-label="Journey progress"
          max={100}
          value={stage === "loading" ? 100 : stage === "q" ? (questionIdx / QUIZ_QUESTIONS.length) * 100 : 0}
        />

        {stage === "q" && (
          <>
            <header className="hud">
              <div className="hello">Hello, {name} — your journey has begun...</div>
              <div className="bal-label">Account Balance</div>
              <div className="bal-value">{formatCurrency(balance)}</div>
              <div className="energy-row">
                <span>Your energy is aligning with the divine...</span>
                <span>{energyPercent}%</span>
              </div>
              <progress className="track" aria-label="Divine energy" max={100} value={energyPercent} />
            </header>

            <div className="strip">
              {unlockedKeys.map((key) => (
                <img key={key} src={UNLOCKS[key]?.img} alt={UNLOCKS[key]?.name} />
              ))}
            </div>
          </>
        )}

        {!gateOpen && (
          <button
            type="button"
            className="sound"
            title={muted ? "Turn on sound" : "Mute"}
            aria-label={muted ? "Turn on sound" : "Mute"}
            onClick={() => {
              const nextMuted = !muted;
              setMuted(nextMuted);
              if (voiceAudioRef.current) voiceAudioRef.current.muted = nextMuted;
              if (bgmAudioRef.current) bgmAudioRef.current.muted = nextMuted;
            }}
          >
            {muted ? "🔇" : "🔊"}
          </button>
        )}

        <div className={`panel ${stage === "q" ? "quiz-panel" : ""}`} ref={panelRef}>
          {stage === "name" && (
            <form
              className={revealClass}
              onSubmit={(e) => {
                e.preventDefault();
                const trimmed = name.trim();
                if (trimmed) {
                  setName(trimmed);
                  try {
                    sessionStorage.setItem(NAME_STORAGE_KEY, trimmed);
                  } catch {}
                  setStage("affirm");
                }
              }}
            >
              <p className="lead">
                <b>God did not bring you here by accident.</b>
                <br />
                Type your name below and step into what has been prepared for you.
              </p>
              <input
                aria-label="Your name"
                placeholder="Your name"
                autoComplete="given-name"
                maxLength={80}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isInputDisabled}
              />
              <button className="cta" type="submit" disabled={isInputDisabled}>
                BEGIN
              </button>
            </form>
          )}

          {stage === "affirm" && (
            <div className={revealClass}>
              <div className="vow">
                <div className="note">Repeat this phrase out loud:</div>
                <div className="phrase">"The life of my dreams begins with my choice."</div>
                <div className="note">Only click continue after saying it out loud.</div>
              </div>
              <button
                type="button"
                className="cta"
                disabled={isInputDisabled}
                onClick={() => setStage("q")}
              >
                Continue Journey
              </button>
            </div>
          )}

          {stage === "q" && (
            <div key={questionIdx}>
              <div className="tag">{getStageTitle(questionIdx)}</div>
              <h1 className="question">{currentQ.text.replaceAll("[NAME]", displayName)}</h1>
              <div className={revealClass}>
                {currentQ.type === "number" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!balanceInput || isNavigatingRef.current) return;
                      const num = Number(balanceInput);
                      if (!Number.isFinite(num) || num < 0) return;
                      setBalance(num * 101);
                      handleAnswer();
                    }}
                  >
                    <input
                      aria-label="Available balance"
                      inputMode="numeric"
                      placeholder={currentQ.placeholder}
                      value={balanceInput}
                      onChange={(e) =>
                        setBalanceInput(e.target.value.replace(/\D/g, "").slice(0, 12))
                      }
                      disabled={isInputDisabled}
                    />
                    <button className="cta" type="submit" disabled={isInputDisabled}>
                      Continue
                    </button>
                  </form>
                ) : (
                  <div className="options">
                    {currentQ.options?.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="opt"
                        disabled={isInputDisabled}
                        onClick={handleAnswer}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {stage === "loading" && (
            <div aria-live="polite">
              <div className="lt">{name}, your Divine Manifestation Script is being created...</div>
              <p className="lead loading-message">
                {loadProgress >= 100 ? "Your Divine Manifestation Script is ready ✦" : currentLoadingMsg}
              </p>
              <progress
                className="load-track"
                max={100}
                value={loadProgress}
                aria-label="Preparing your script"
              />
              <div className="pct">{Math.floor(loadProgress)}%</div>
            </div>
          )}
        </div>

        {isSpeaking && stage !== "loading" && (
          <div className="speaking" role="status">
            Archangel Michael is speaking <i /> <i /> <i />
          </div>
        )}

        {activeUnlock && (
          <div className="overlay">
            <section
              className="card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="unlock-title"
            >
              {activeUnlock.money ? (
                <>
                  <h2 className="top" id="unlock-title">
                    💰 Money, {name}
                  </h2>
                  <p className="sub">
                    Your manifestation potential depends on your choice. Think big to manifest big things — you are as big as your courage.
                  </p>
                  <button
                    type="button"
                    autoFocus
                    className="cta"
                    onClick={handleDismissUnlock}
                  >
                    Continue Journey
                  </button>
                </>
              ) : (
                <>
                  <div className="top">✓ UNLOCKED! ✦</div>
                  <img src={UNLOCKS[activeUnlock.key]?.img} alt={UNLOCKS[activeUnlock.key]?.name} />
                  <h2 className="name" id="unlock-title">
                    {UNLOCKS[activeUnlock.key]?.name}
                  </h2>
                  {activeUnlock.key === "mult" ? (
                    <>
                      <p className="sub">
                        {name}, today I am adding 100x more to your account — do you believe?
                      </p>
                      <p className="balbox">New Balance: {formatCurrency(balance)}</p>
                    </>
                  ) : (
                    <p className="sub">{UNLOCKS[activeUnlock.key]?.sub}</p>
                  )}
                  <button
                    type="button"
                    autoFocus
                    className="cta"
                    onClick={handleDismissUnlock}
                  >
                    {UNLOCKS[activeUnlock.key]?.btn}
                  </button>
                </>
              )}
            </section>
          </div>
        )}

        {gateOpen && (
          <div className="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
            <h1 className="gate-t" id="gate-title">
              A message from Archangel Michael is waiting for you
            </h1>
            <button type="button" className="gate-btn" onClick={handleStart}>
              ▶ TAP TO BEGIN
            </button>
            <p className="gate-s">Turn on the sound 🔊</p>
          </div>
        )}
      </div>
    </main>
  );
}
export default QuizIndex;
