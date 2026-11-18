export interface MemberSession {
  token: string;
  name?: string;
  tier?: string;
  email?: string;
}

export interface MemberProgress {
  days: Record<string, string[]>;
}

const SESSION_KEY = "member_session_v1";
const PROGRESS_KEY = "member_progress_v1";

export function getSession(): MemberSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(session: MemberSession): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } catch {}
}

export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function getTodayKey(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

export function getProgress(): MemberProgress {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : { days: {} };
  } catch {
    return { days: {} };
  }
}

export function saveProgress(progress: MemberProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch {}
}

export function calculateStreak(progress: MemberProgress, now: Date = new Date()): number {
  let streak = 0;
  const current = new Date(now);
  if (!progress.days[getTodayKey(current)]?.length) {
    current.setDate(current.getDate() - 1);
  }
  while (progress.days[getTodayKey(current)]?.length) {
    streak++;
    current.setDate(current.getDate() - 1);
  }
  return streak;
}

export function speakText(text: string, lang = "en-US"): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 0.95;
  window.speechSynthesis.speak(utterance);
  return true;
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
