export interface Student {
  name: string;
  avatar: string | null;
  track: string;
  currentDay: number;
  completedDays: number;
  currentStreak: number;
  longestStreak: number;
  standing: number;
  totalStudents: number;
  githubUsername: string;
  streakFreezesTotal: number;
}

// Default mock student — a student mid-challenge, on day 12, with an active streak.
// githubUsername points at GitHub's own public demo account (octocat) so the
// live GitHub widget always has real, stable data to show.
export const defaultStudent: Student = {
  name: "Arjun Sharma",
  avatar: null,
  track: "Web Development",
  currentDay: 12,
  completedDays: 11,
  currentStreak: 11,
  longestStreak: 11,
  standing: 184,
  totalStudents: 2438,
  githubUsername: "octocat",
  streakFreezesTotal: 2,
};

export const CHALLENGE_LENGTH = 60;

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return "S";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
