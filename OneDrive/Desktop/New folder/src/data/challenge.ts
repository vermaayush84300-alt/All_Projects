export interface ChallengeDay {
  day: number;
  title: string;
  track: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  description: string;
  requirements: string[];
  achievementUnlock?: string;
}

export const challengeDays: ChallengeDay[] = [
  {
    day: 1,
    title: "Build Your Dev Profile Card",
    track: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "45–60 min",
    description:
      "Design and build a personal profile card component — your name, role, skills, and a link to your GitHub, all in one clean layout.",
    requirements: [
      "Show name, tagline, and avatar",
      "List at least 3 skills as tags",
      "Include a working GitHub link",
      "Fully responsive on mobile",
    ],
    achievementUnlock: "First Commit",
  },
  {
    day: 2,
    title: "Responsive Navbar",
    track: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "45–60 min",
    description:
      "Build a navigation bar that collapses into a mobile menu below 768px and stays sticky on scroll.",
    requirements: [
      "Sticky on scroll",
      "Mobile hamburger menu",
      "Active link state",
      "Keyboard accessible",
    ],
  },
  {
    day: 3,
    title: "Pricing Section",
    track: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "60 min",
    description: "Create a 3-tier pricing section with a highlighted recommended plan.",
    requirements: [
      "Three pricing tiers",
      "One tier visually highlighted",
      "Responsive card grid",
      "Clear CTA on every tier",
    ],
  },
  {
    day: 4,
    title: "Responsive Portfolio",
    track: "Web Development",
    difficulty: "Beginner",
    estimatedTime: "90 min",
    description: "Ship a single-page portfolio site with a hero, project grid, and contact section.",
    requirements: [
      "Hero with your name and role",
      "At least 3 project cards",
      "Contact section with working links",
      "No horizontal scroll on mobile",
    ],
    achievementUnlock: "7 Day Streak",
  },
  {
    day: 5,
    title: "Form Validation Playground",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "60–75 min",
    description: "Build a signup form with real-time validation and clear error messaging.",
    requirements: [
      "Validate email format",
      "Validate password strength",
      "Inline error messages",
      "Disabled state until valid",
    ],
  },
  {
    day: 6,
    title: "Weather Widget",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "75 min",
    description: "Build a weather widget with loading, error, and success states using mock data.",
    requirements: [
      "Loading skeleton state",
      "Error state with retry",
      "Clean data display",
      "Mobile-friendly layout",
    ],
  },
  {
    day: 7,
    title: "Kanban Board (Basic)",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "90 min",
    description: "Build a 3-column task board where cards can move between columns.",
    requirements: [
      "Three columns: To Do, In Progress, Done",
      "Move cards between columns",
      "Persist state locally",
      "Responsive on small screens",
    ],
  },
  {
    day: 8,
    title: "Markdown Note Editor",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "75 min",
    description: "Build a split-view markdown editor with live preview.",
    requirements: [
      "Live markdown preview",
      "Support headings, bold, lists",
      "Autosave to local storage",
      "Works on mobile (stacked view)",
    ],
  },
  {
    day: 9,
    title: "Expense Tracker",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "90 min",
    description: "Build an expense tracker with categories and a running total.",
    requirements: [
      "Add and delete expenses",
      "Group by category",
      "Show running total",
      "Empty state when no expenses",
    ],
  },
  {
    day: 10,
    title: "10 Projects Milestone Build",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "90–120 min",
    description: "A slightly bigger build to mark your 10-day milestone — a movie search app using a public API pattern.",
    requirements: [
      "Search input with debounce",
      "Grid of results with posters",
      "Loading and empty states",
      "Responsive grid layout",
    ],
    achievementUnlock: "10 Projects Shipped",
  },
  {
    day: 11,
    title: "Recruiter-Ready README",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "45 min",
    description: "Write and format a README for one of your challenge projects the way a recruiter would want to see it.",
    requirements: [
      "Clear project description",
      "Setup and run instructions",
      "Screenshot or GIF section",
      "Tech stack list",
    ],
  },
  {
    day: 12,
    title: "Build a GitHub Activity Dashboard",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "60–90 min",
    description:
      "Build a responsive dashboard that fetches or displays GitHub contribution and activity data and presents it in a clean, visual interface.",
    requirements: [
      "Display a user's GitHub activity",
      "Show contribution statistics",
      "Include a responsive layout",
      "Handle loading and empty states",
      "Work on mobile",
    ],
  },
  {
    day: 13,
    title: "Job Application Tracker",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "90 min",
    description: "Build a tracker for internship and job applications with status columns.",
    requirements: [
      "Add applications with company and role",
      "Status: Applied, Interview, Offer, Rejected",
      "Filter by status",
      "Responsive table-to-card layout on mobile",
    ],
  },
  {
    day: 14,
    title: "2-Week Milestone: Personal Analytics Page",
    track: "Web Development",
    difficulty: "Intermediate",
    estimatedTime: "90–120 min",
    description: "Build a small analytics page summarizing your first two weeks of the challenge — days completed, streak, and a simple chart.",
    requirements: [
      "Summary stats at the top",
      "One chart or graph",
      "Responsive layout",
      "Shareable-looking design",
    ],
  },
];

export function getDayData(day: number): ChallengeDay | undefined {
  return challengeDays.find((d) => d.day === day);
}
