# ABTalks — 60-Day Coding Challenge

A mobile-first responsive web app for a 60-day, build-in-public coding challenge. React + TypeScript + Tailwind CSS + React Router. No backend to run — it's a static site.

## Run it locally

```bash
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional — serves the built dist/ locally to sanity-check it
```

## Deploy it (for your live URL)

This is a static site, so any static host works. Two of the fastest:

**Vercel** — easiest if you push to GitHub first:
1. Push this project to a GitHub repo.
2. Go to vercel.com → New Project → import the repo. It auto-detects Vite; leave the defaults.
3. Deploy. You'll get a URL like `https://your-project.vercel.app`.
   (`vercel.json` in this repo already handles routing so `/dashboard` and `/day/12` work on direct load and refresh.)

**Netlify** — fastest if you just want a URL right now, no GitHub needed:
1. Run `npm run build` locally.
2. Go to app.netlify.com/drop and drag the `dist/` folder in.
3. You'll get a live URL immediately.
   (`public/_redirects` in this repo already handles SPA routing, and gets copied into `dist/` automatically by the build.)

Either way, **test all three routes directly** after deploying — load `/dashboard` and `/day/12` straight from the address bar (not just by clicking through the app) and refresh each one, since that's exactly what an evaluator will do.

## Routes

| Route         | Page                                                              |
|---------------|--------------------------------------------------------------------|
| `/`           | Landing page — explains the challenge, tracks, and proof-of-work model |
| `/dashboard`  | Student dashboard — streak, today's task, stats, achievements, live GitHub widget |
| `/day/12`     | Challenge day detail — task brief, requirements, and the submission form |

`/day/:day` is generalized — mock data exists for Days 1–14, so `/day/1` through `/day/14` all render real content; other day numbers show a graceful "doesn't exist yet" state, and days beyond the student's current day show a locked state.

## Data & persistence

There's no backend or database. Student and challenge data live in `src/data/`. Submitting the proof-of-work form on `/day/12` writes to `localStorage` (`abtalks_submissions_v1`), so a completed day stays completed after a refresh. Clear that key in your browser's dev tools (Application → Local Storage) to reset the demo back to its default state (Day 12, 11-day streak, nothing submitted yet).

## Live GitHub integration

The one real external API call in the app is to GitHub's public REST API (`api.github.com`) — no key or auth required, it's CORS-open for read endpoints, so it's called straight from the browser. Two places use it:

- **Dashboard** — a "Live GitHub Activity" card fetches a real GitHub profile (avatar, public repo count, followers). Defaults to GitHub's own demo account `octocat` (see `githubUsername` in `src/data/student.ts`) so it always has real, stable data — swap in a real username to try it with your own profile.
- **Day 12 success screen** — after submitting a GitHub URL, the app parses the username out of it and looks the profile up live, showing a "Verified: @username · N public repos" badge. If the URL isn't a real profile, or GitHub's rate limit kicks in, it fails gracefully with a plain-language message and the submission is still saved.

GitHub's unauthenticated rate limit is 60 requests/hour per IP, which is comfortably enough for demoing and for judges clicking through.

## Structure

```
src/
  components/     Header, BottomNav, ContributionGrid (signature progress visual),
                   StatCard, AchievementCard, WeeklyStrip, SubmissionForm,
                   GithubActivityCard, Avatar, Logo
  data/           student.ts, challenge.ts — mock data, typed and API-ready
  lib/            useChallengeState.ts (progress + localStorage submissions),
                   github.ts / useGithubUser.ts (live GitHub lookups)
  pages/          Landing.tsx, Dashboard.tsx, ChallengeDay.tsx
  App.tsx         Route definitions

public/_redirects   Netlify SPA routing rule
vercel.json         Vercel SPA routing rule
```

## Design notes

The signature visual is a GitHub-contribution-style grid (10×6 squares, one per day) reused across the landing hero, dashboard progress card, and challenge day header — it doubles as the progress bar and as a literal nod to the GitHub-commit proof-of-work mechanic.

Palette: near-black background, blue as the primary accent (streaks, CTAs, progress), green for completed/success states. Type: Space Grotesk (display), Inter (body), JetBrains Mono (day counters, streaks, URLs).

Real-world edge cases handled in the state logic: first day with no streak yet, a missed day (streak reset without shaming language), and an empty/incomplete profile (neutral avatar with initials fallback).

## New feature: Streak Freeze

Missing a day of a 60-day challenge is exactly when students are most likely to quit — the streak resets to zero and the visual signal (a red "X") reads as failure, which discourages the very behavior the challenge is trying to build. **Streak Freeze** (Dashboard → "This week" card) borrows the mechanic Duolingo popularized for language learning and applies it here: each student gets 2 freezes a month, and can spend one to retroactively protect a missed day.

- On `/dashboard`, if the weekly strip shows a missed day, a card offers **"Use a freeze"** with the count remaining.
- Clicking it turns that day's dot from a red "X" into a blue snowflake, and the copy shifts to "Streak protected."
- If no freezes remain, the app still avoids shaming language: "no worries, build today to start a fresh streak."
- State persists in `localStorage` (`abtalks_streak_freeze_v1`) alongside submissions, so it survives a refresh.

This turns a purely punitive edge case into a supportive one — the challenge acknowledges that students have exams, illness, and bad weeks, without diluting the accountability the streak is meant to create.

## New features: Your Journey, and clickable everything

**Access from Day 1.** Previously the only way to see a past day's brief was to already know the URL. Now the Dashboard has a **"Your Journey"** strip — a horizontal scroll of cards for every day from Day 1 through today (plus a few upcoming, locked days), so a student can jump straight to any day's task and their actual submission, not just today's.

**Every card gives information on click.** Tapping a card now opens a bottom sheet (a centered modal on desktop) with real detail instead of being purely decorative:
- **Journey cards & contribution-grid squares** (Day 1 → today are all tappable) — shows the day's brief, requirements, and the actual GitHub + LinkedIn submission with the date it was submitted. A day marked complete with no saved submission link (Day 6, intentionally, in the mock data) shows an honest "no submission record" state rather than fabricating one.
- **Quick stats** — tapping "Days completed," "Current streak," "Completion," or "Your standing" explains exactly what that number means and how it's calculated.
- **Achievement badges** — tapping one explains its unlock condition and shows a progress bar toward it, whether locked or unlocked.

**New color:** a `violet` accent was added to the palette (`tailwind.config.js`) and used for the detail-sheet system and achievement UI, so "extra information" reads as a distinct, consistent visual language from the core marigold/teal/coral palette.

Submission history for Days 1–11 (used by the Journey feature) lives in `src/data/submissions.ts` — in a real backend this would come from the API; here it's typed mock data so the feature has something real to show.

## Responsive across all screen sizes

The app was built mobile-first at 390px, but every page now adapts cleanly from small phones up through large desktop monitors:

- **Navigation** — `BottomNav` (tab bar) is the primary nav below `md` (768px). At `md` and above, `AppHeader` now shows a full horizontal nav (Dashboard, Today's Challenge, Progress) so navigation isn't lost on tablet and desktop — previously the tab bar just disappeared with nothing replacing it.
- **Dashboard** — single column on phones and tablets in portrait; switches to a two-column layout (`lg:grid-cols-[1.3fr_1fr]`) at 1024px+ so stats, achievements, and the weekly card sit alongside the main progress feed instead of stretching full-width on wide screens.
- **Content width** — all pages cap their reading width (`max-w-3xl`/`max-w-5xl`/`max-w-6xl` depending on the page) and center on large monitors, rather than stretching text edge-to-edge on ultrawide displays.
- **Horizontal-scroll rows** (Journey, Achievements, contribution grid) use `overflow-x-auto` with `minmax(0,1fr)` grid tracks, so they never overflow the viewport even at the smallest supported widths (~320px) and remain touch-scrollable on tablet.
- **DetailSheet** renders as a bottom sheet on mobile and a centered modal from `sm:` up, so it works the same whether opened with a tap or a click.
