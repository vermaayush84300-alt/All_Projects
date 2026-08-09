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
  // Recruiter Radar fields
  visibilityScore: number;
  profileViews: number;
  recruiterSearches: number;
  linkedinPosts: number;
  weeklyViewsChange: number; // percent change vs last week
}

// Default mock student — Day 12, active streak, mid-challenge.
// githubUsername points at octocat so the live GitHub widget always has real data.
export const defaultStudent: Student = {
  name: 'Arjun Sharma',
  avatar: null,
  track: 'Web Development',
  currentDay: 12,
  completedDays: 11,
  currentStreak: 11,
  longestStreak: 11,
  standing: 184,
  totalStudents: 2438,
  githubUsername: 'octocat',
  streakFreezesTotal: 2,
  // Recruiter Radar — mocked but emotionally real
  visibilityScore: 74,
  profileViews: 847,
  recruiterSearches: 12,
  linkedinPosts: 8,
  weeklyViewsChange: 23,
};

export const CHALLENGE_LENGTH = 60;

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0 || !parts[0]) return 'S';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getTimeGreeting(): string {
  const h = new Date().getHours();
  if (h < 5) return 'Late night hustle';
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  if (h < 21) return 'Good evening';
  return 'Building late';
}
