import type { Submission } from "../lib/useChallengeState";

/**
 * Mock proof-of-work history for days already completed by the demo student
 * (days before `currentDay` in src/data/student.ts). In the real product this
 * would come from the backend; here it lets the "Your Journey" feature on the
 * dashboard show real submission links for every past day, not just today.
 */
export const mockSubmissions: Record<number, Submission> = {
  1: {
    github: "https://github.com/octocat/dev-profile-card",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day1-abtalks-devprofile",
    submittedAt: "2026-06-01T14:32:00.000Z",
  },
  2: {
    github: "https://github.com/octocat/responsive-navbar",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day2-abtalks-navbar",
    submittedAt: "2026-06-02T18:10:00.000Z",
  },
  3: {
    github: "https://github.com/octocat/pricing-section",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day3-abtalks-pricing",
    submittedAt: "2026-06-03T13:05:00.000Z",
  },
  4: {
    github: "https://github.com/octocat/responsive-portfolio",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day4-abtalks-portfolio",
    submittedAt: "2026-06-04T20:47:00.000Z",
  },
  5: {
    github: "https://github.com/octocat/form-validation-playground",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day5-abtalks-forms",
    submittedAt: "2026-06-05T12:00:00.000Z",
  },
  // Day 6 intentionally has no submission — this is the missed day
  // reflected in the Weekly Strip / Streak Freeze feature.
  7: {
    github: "https://github.com/octocat/kanban-board",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day7-abtalks-kanban",
    submittedAt: "2026-06-07T21:14:00.000Z",
  },
  8: {
    github: "https://github.com/octocat/markdown-note-editor",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day8-abtalks-markdown",
    submittedAt: "2026-06-08T11:22:00.000Z",
  },
  9: {
    github: "https://github.com/octocat/expense-tracker",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day9-abtalks-expenses",
    submittedAt: "2026-06-09T17:38:00.000Z",
  },
  10: {
    github: "https://github.com/octocat/movie-search-app",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day10-abtalks-milestone",
    submittedAt: "2026-06-10T15:00:00.000Z",
  },
  11: {
    github: "https://github.com/octocat/dev-profile-card",
    linkedin: "https://linkedin.com/posts/arjun-sharma_day11-abtalks-readme",
    submittedAt: "2026-06-11T09:41:00.000Z",
  },
};
