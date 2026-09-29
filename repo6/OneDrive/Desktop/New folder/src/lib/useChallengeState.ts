import { useCallback, useEffect, useState } from "react";
import { defaultStudent, CHALLENGE_LENGTH } from "../data/student";
import { mockSubmissions } from "../data/submissions";

export interface Submission {
  github: string;
  linkedin: string;
  submittedAt: string;
}

type SubmissionMap = Record<number, Submission>;

const STORAGE_KEY = "abtalks_submissions_v1";
const FREEZE_STORAGE_KEY = "abtalks_streak_freeze_v1";

interface FreezeState {
  used: boolean;
  usedAt: string | null;
}

function readFreezeStorage(): FreezeState {
  try {
    const raw = localStorage.getItem(FREEZE_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FreezeState) : { used: false, usedAt: null };
  } catch {
    return { used: false, usedAt: null };
  }
}

function writeFreezeStorage(state: FreezeState) {
  try {
    localStorage.setItem(FREEZE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — fail silently, state still works in-memory for the session
  }
}

function readStorage(): SubmissionMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as SubmissionMap) : {};
  } catch {
    return {};
  }
}

function writeStorage(map: SubmissionMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
  } catch {
    // localStorage unavailable — fail silently, state still works in-memory for the session
  }
}

/**
 * Central challenge state. Days 1..(currentDay-1) are treated as already
 * completed by the mock student. The "live" day is student.currentDay —
 * whether it's complete depends on whether a submission has been saved.
 */
export function useChallengeState() {
  const [submissions, setSubmissions] = useState<SubmissionMap>(() => readStorage());
  const [freeze, setFreeze] = useState<FreezeState>(() => readFreezeStorage());

  useEffect(() => {
    writeStorage(submissions);
  }, [submissions]);

  useEffect(() => {
    writeFreezeStorage(freeze);
  }, [freeze]);

  const baseCompleted = defaultStudent.completedDays; // days completed before the "live" day
  const liveDay = defaultStudent.currentDay;
  const liveDaySubmitted = Boolean(submissions[liveDay]);

  const completedDays = liveDaySubmitted ? baseCompleted + 1 : baseCompleted;
  const currentStreak = liveDaySubmitted
    ? defaultStudent.currentStreak + 1
    : defaultStudent.currentStreak;
  const progressPercent = Math.round((completedDays / CHALLENGE_LENGTH) * 100);

  const isDayCompleted = useCallback(
    (day: number) => {
      if (day < liveDay) return true;
      if (day === liveDay) return liveDaySubmitted;
      return false;
    },
    [liveDay, liveDaySubmitted]
  );

  // Status for the "Your Journey" list — every day from Day 1 is accessible
  // and clickable; only days after today are locked.
  const getDayStatus = useCallback(
    (day: number): "done" | "today" | "locked" => {
      if (day > liveDay) return "locked";
      if (day === liveDay) return liveDaySubmitted ? "done" : "today";
      return "done";
    },
    [liveDay, liveDaySubmitted]
  );

  const getSubmission = useCallback(
    (day: number) => submissions[day] ?? (day < liveDay ? mockSubmissions[day] : undefined),
    [submissions, liveDay]
  );

  const submitDay = useCallback((day: number, github: string, linkedin: string) => {
    setSubmissions((prev) => ({
      ...prev,
      [day]: { github, linkedin, submittedAt: new Date().toISOString() },
    }));
  }, []);

  const resetDay = useCallback((day: number) => {
    setSubmissions((prev) => {
      const next = { ...prev };
      delete next[day];
      return next;
    });
  }, []);

  // 7-day consistency strip ending "today" (the live day). One day mocked as missed
  // for realism, matching the brief's example pattern, unless the student is on day 1.
  // A used Streak Freeze converts that missed day into a "frozen" (protected) one.
  const hasMissedDayThisWeek = liveDay > 1;
  const weekly = buildWeeklyPattern(liveDay, liveDaySubmitted, freeze.used);

  const freezesRemaining = defaultStudent.streakFreezesTotal - (freeze.used ? 1 : 0);
  const canUseFreeze = hasMissedDayThisWeek && !freeze.used && freezesRemaining > 0;

  const useStreakFreeze = useCallback(() => {
    setFreeze({ used: true, usedAt: new Date().toISOString() });
  }, []);

  return {
    student: defaultStudent,
    liveDay,
    completedDays,
    currentStreak,
    longestStreak: Math.max(defaultStudent.longestStreak, currentStreak),
    progressPercent,
    challengeLength: CHALLENGE_LENGTH,
    isDayCompleted,
    getDayStatus,
    getSubmission,
    submitDay,
    resetDay,
    weekly,
    hasMissedDayThisWeek,
    freezeUsed: freeze.used,
    freezesRemaining,
    canUseFreeze,
    useStreakFreeze,
  };
}

export interface WeeklyDot {
  label: string;
  state: "done" | "missed" | "today" | "future" | "frozen";
}

function buildWeeklyPattern(liveDay: number, liveDaySubmitted: boolean, freezeUsed: boolean): WeeklyDot[] {
  const labels = ["M", "T", "W", "T", "F", "S", "S"];
  if (liveDay <= 1) {
    return labels.map((label, i) => ({
      label,
      state: i === labels.length - 1 ? (liveDaySubmitted ? "done" : "today") : "future",
    }));
  }
  return labels.map((label, i) => {
    if (i === labels.length - 1) return { label, state: liveDaySubmitted ? "done" : "today" };
    if (i === 5) return { label, state: freezeUsed ? "frozen" : "missed" };
    return { label, state: "done" };
  });
}
