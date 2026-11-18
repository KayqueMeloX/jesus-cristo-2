import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMember } from "../lib/MemberContext";
import { getVerseOfTheDay, DAILY_TASKS } from "../lib/content";
import {
  getProgress,
  saveProgress,
  getTodayKey,
  calculateStreak,
  type MemberProgress,
} from "../lib/session";

export const Route = createFileRoute("/membros/")({
  component: MembrosIndex,
});

function MembrosIndex() {
  const { session, signOut } = useMember();
  const [progress, setProgress] = useState<MemberProgress>({ days: {} });
  const [todayKey, setTodayKey] = useState("");

  useEffect(() => {
    setProgress(getProgress());
    setTodayKey(getTodayKey());
  }, []);

  const verseOfDay = getVerseOfTheDay();
  const completedToday = progress.days[todayKey] ?? [];

  const toggleTask = (taskId: string) => {
    const set = new Set(completedToday);
    if (set.has(taskId)) {
      set.delete(taskId);
    } else {
      set.add(taskId);
    }
    const updated: MemberProgress = {
      days: { ...progress.days, [todayKey]: [...set] },
    };
    setProgress(updated);
    saveProgress(updated);
  };

  const streak = calculateStreak(progress);

  return (
    <div className="mb-wrap">
      <div className="mb-row">
        <div>
          <h1 className="mb-h1">
            Peace be with you{session.name ? `, ${session.name}` : ""} 🙏
          </h1>
          <p className="mb-sub">Your journey of faith continues today.</p>
        </div>
        <button className="mb-btn-ghost" onClick={signOut}>
          Sign out
        </button>
      </div>

      <div style={{ margin: "14px 0" }}>
        <span className="mb-streak">🔥 {streak} day streak</span>
      </div>

      <h2 className="mb-h2">Verse of the day</h2>
      <article className="mb-card">
        <p className="mb-verse">"{verseOfDay.text}"</p>
        <p className="mb-ref">— {verseOfDay.ref}</p>
        <div style={{ height: 10 }} />
        <p className="mb-sub" style={{ fontStyle: "italic" }}>
          💡 {verseOfDay.reflection}
        </p>
      </article>

      <h2 className="mb-h2">Daily connection</h2>
      <div className="mb-tasks">
        {DAILY_TASKS.map((task) => {
          const done = completedToday.includes(task.id);
          return (
            <div
              key={task.id}
              className={`mb-card mb-task ${done ? "mb-task-done" : ""}`}
              onClick={() => toggleTask(task.id)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <input
                type="checkbox"
                checked={done}
                onChange={() => toggleTask(task.id)}
                style={{
                  width: 20,
                  height: 20,
                  cursor: "pointer",
                  accentColor: "var(--mb-gold)",
                }}
              />
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: 600,
                    textDecoration: done ? "line-through" : "none",
                    opacity: done ? 0.7 : 1,
                  }}
                >
                  {task.title}
                </div>
                <div className="mb-sub" style={{ fontSize: 13 }}>
                  {task.hint}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MembrosIndex;
