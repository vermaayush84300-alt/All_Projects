import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Flame,
  Code2,
  BrainCircuit,
  LineChart,
  Smartphone,
  CheckCircle2,
  Menu,
  X,
  GitCommitVertical,
  Share2,
  Star,
  Zap,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import Logo from '../components/Logo';
import ContributionGrid from '../components/ContributionGrid';
import { defaultStudent, CHALLENGE_LENGTH } from '../data/student';

const steps = [
  {
    n: '01',
    icon: Code2,
    title: 'Pick your track',
    body: 'Web Dev, AI/ML, Data Science, or App Dev. Every track ships real projects, not quizzes.',
  },
  {
    n: '02',
    icon: Flame,
    title: 'Build every day',
    body: 'One focused task lands each morning with estimated time and clear requirements. No fluff.',
  },
  {
    n: '03',
    icon: Share2,
    title: 'Submit your proof',
    body: 'Push the commit. Post it on LinkedIn. Paste both links. That\'s what keeps the streak alive and visible.',
  },
];

const tracks = [
  { name: 'Web Dev', icon: Code2, desc: 'Ship UI from landing pages to dashboards.' },
  { name: 'AI / ML', icon: BrainCircuit, desc: 'Train, fine-tune, and deploy models.' },
  { name: 'Data Science', icon: LineChart, desc: 'Visualize and tell stories with data.' },
  { name: 'App Dev', icon: Smartphone, desc: 'Build mobile-first apps that run.' },
];

const builds = [
  { day: 'Day 04', title: 'Responsive Portfolio', track: 'Web Dev' },
  { day: 'Day 12', title: 'GitHub Activity Dashboard', track: 'Web Dev' },
  { day: 'Day 27', title: 'AI Resume Analyzer', track: 'AI / ML' },
  { day: 'Day 43', title: 'Internship Tracker', track: 'Web Dev' },
];

const testimonials = [
  {
    name: 'Priya Mehta',
    college: 'BITS Pilani',
    track: 'AI / ML',
    quote: 'Day 30 and I have 30 commits, 30 LinkedIn posts, and 2 interview calls. The streak is real.',
    streak: 30,
  },
  {
    name: 'Rahul Nair',
    college: 'NIT Trichy',
    track: 'Web Dev',
    quote: 'Showed my 60-day streak to a startup. They gave me an interview slot the next day.',
    streak: 58,
  },
  {
    name: 'Tanvi Sharma',
    college: 'IIIT Hyderabad',
    track: 'Full Stack',
    quote: 'LinkedIn following grew from 200 to 2K in 60 days. The daily posts did it.',
    streak: 52,
  },
];

const stats = [
  { value: '2,400+', label: 'Students building' },
  { value: '60', label: 'Days of proof' },
  { value: '120K+', label: 'Projects shipped' },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* ── Header ─────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-edge-subtle glass">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-6 md:flex">
            {['How it works', 'Tracks', 'Proof of work'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[13.5px] text-ash transition-colors hover:text-snow"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden rounded-full bg-brand px-4 py-2 text-[13px] font-semibold text-white shadow-glow-brand transition-all hover:scale-[1.02] active:scale-[0.98] sm:inline-block"
            >
              Start Challenge →
            </Link>
            <button
              type="button"
              className="grid h-9 w-9 place-items-center rounded-full text-snow md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="border-t border-edge-subtle bg-card px-4 py-3 md:hidden animate-fade-in">
            <div className="flex flex-col gap-1">
              {[
                ['#how-it-works', 'How it works'],
                ['#tracks', 'Tracks'],
                ['#proof-of-work', 'Proof of work'],
              ].map(([href, label]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-[14px] text-snow hover:bg-layer"
                >
                  {label}
                </a>
              ))}
              <Link
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="mt-2 rounded-full bg-brand px-4 py-3 text-center text-[14px] font-semibold text-white shadow-glow-brand"
              >
                Start the Challenge →
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-14 pt-10 sm:px-6 sm:pt-16">
        {/* Background glow blob */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand/8 blur-3xl" />
        <div className="pointer-events-none absolute top-20 right-0 h-48 w-48 rounded-full bg-win/5 blur-3xl" />

        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            {/* Left: Copy */}
            <div className="animate-fade-up">
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full border border-fire/30 bg-fire-soft/80 px-3 py-1 text-[12px] font-medium text-fire-light">
                <Flame size={12} /> 60-day build challenge
              </span>

              <h1 className="mt-4 font-display text-[2.6rem] font-bold leading-[1.06] tracking-tight text-snow text-balance sm:text-6xl lg:text-[3.5rem]">
                Build in Public.{' '}
                <span className="bg-gradient-to-r from-brand to-gem bg-clip-text text-transparent">
                  Get Hired.
                </span>
              </h1>

              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-ash sm:text-[16px]">
                A 60-day challenge for Indian college students. Build real projects every day, prove it on GitHub and LinkedIn, and turn consistency into a portfolio recruiters can actually see.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow-brand transition-all hover:scale-[1.02] active:scale-[0.97]"
                >
                  Start the Challenge
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-edge px-6 py-3.5 text-[15px] font-semibold text-snow transition-colors hover:bg-layer"
                >
                  See how it works
                </a>
              </div>

              <p className="mt-4 text-[12.5px] text-dusk">
                Free · No credit card · For Indian college students
              </p>
            </div>

            {/* Right: Progress card */}
            <div
              className="animate-pop rounded-2xl border border-edge bg-card p-5 shadow-card sm:p-6"
              style={{ animationDelay: '100ms' }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
                    Challenge Progress
                  </p>
                  <p className="mt-1 font-mono text-[1.4rem] font-bold text-snow">
                    Day {defaultStudent.currentDay}{' '}
                    <span className="text-dusk text-lg">/ {CHALLENGE_LENGTH}</span>
                  </p>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-fire/30 bg-fire-soft/80 px-3 py-1.5">
                  <Flame size={14} className="text-fire" />
                  <span className="font-mono text-[13px] font-bold text-fire-light">
                    {defaultStudent.currentStreak}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <ContributionGrid
                  total={CHALLENGE_LENGTH}
                  completed={defaultStudent.completedDays}
                  liveDay={defaultStudent.currentDay}
                  liveDone={false}
                />
              </div>

              <div className="mt-4 flex items-center gap-2 text-[12px] text-ash">
                <span className="rounded-md border border-win/20 bg-win/8 px-2 py-0.5 font-mono text-win">
                  Build
                </span>
                <ChevronRight size={12} className="text-dusk" />
                <span className="rounded-md border border-ice/20 bg-ice/8 px-2 py-0.5 font-mono text-ice">
                  Commit
                </span>
                <ChevronRight size={12} className="text-dusk" />
                <span className="rounded-md border border-brand/20 bg-brand/8 px-2 py-0.5 font-mono text-brand">
                  Share
                </span>
              </div>

              {/* Mini recruiter stat */}
              <div className="mt-4 flex items-center gap-2 rounded-xl border border-edge-subtle bg-layer/60 p-2.5">
                <TrendingUp size={13} className="text-win shrink-0" />
                <p className="text-[11.5px] text-ash">
                  <span className="text-snow font-medium">847 profile views</span> this week · up 23% from last week
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <section className="border-y border-edge-subtle bg-surface/50 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-2xl font-bold text-snow sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-1 text-[11.5px] text-ash sm:text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section id="how-it-works" className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-2 max-w-sm font-display text-2xl font-bold text-snow sm:text-3xl">
            Three steps. Every single day.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.n}
                className="relative rounded-2xl border border-edge bg-card p-5 shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[11px] font-bold text-dusk">{s.n}</span>
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand-soft">
                    <s.icon size={16} className="text-brand" />
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[16px] font-bold text-snow">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-ash">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tracks ─────────────────────────────────────────────────── */}
      <section id="tracks" className="border-t border-edge-subtle bg-surface/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>Tracks</Eyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-bold text-snow sm:text-3xl">
            Pick the track that matches where you want to be hired.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {tracks.map((t, i) => (
              <div
                key={t.name}
                className="group rounded-2xl border border-edge bg-card p-4 shadow-card transition-all hover:border-brand/30 hover:bg-brand-soft/30 sm:p-5 animate-pop"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand-soft group-hover:bg-brand/15 transition-colors">
                  <t.icon size={18} className="text-brand" />
                </div>
                <h3 className="mt-3 font-display text-[14px] font-bold leading-snug text-snow sm:text-[15px]">
                  {t.name}
                </h3>
                <p className="mt-1 text-[12.5px] leading-snug text-ash">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What students build ────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>What you'll build</Eyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-bold text-snow sm:text-3xl">
            Real projects. In order. With your name on them.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {builds.map((b, i) => (
              <div
                key={b.day}
                className="rounded-2xl border border-edge bg-card p-4 shadow-card animate-fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-mono text-[11px] font-semibold text-win">{b.day}</span>
                <p className="mt-2 font-display text-[14px] font-semibold leading-snug text-snow">
                  {b.title}
                </p>
                <span className="mt-2 inline-block rounded-full bg-brand/8 px-2 py-0.5 text-[10.5px] text-brand">
                  {b.track}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proof of work ──────────────────────────────────────────── */}
      <section id="proof-of-work" className="border-t border-edge-subtle bg-surface/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>Proof of work</Eyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-bold text-snow sm:text-3xl">
            No certificates. Just receipts.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: GitCommitVertical,
                label: 'GitHub Commit',
                desc: 'Your repo, your code — the platform checks it against GitHub, not just a pasted link.',
                color: 'text-ice',
                bg: 'bg-ice-soft',
              },
              {
                icon: Share2,
                label: 'LinkedIn Post',
                desc: 'Public accountability with built-in reach. Every post compounds your visibility.',
                color: 'text-brand-light',
                bg: 'bg-brand-soft',
              },
              {
                icon: Flame,
                label: 'Daily Streak',
                desc: 'A visible record of showing up. One missed day can be protected with a Streak Freeze.',
                color: 'text-fire',
                bg: 'bg-fire-soft',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-start gap-4 rounded-2xl border border-edge bg-card p-5 shadow-card"
              >
                <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${item.bg}`}>
                  <item.icon size={19} className={item.color} />
                </div>
                <div>
                  <p className="font-display text-[15px] font-bold text-snow">{item.label}</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-ash">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────────────── */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Eyebrow>Student stories</Eyebrow>
          <h2 className="mt-2 font-display text-2xl font-bold text-snow sm:text-3xl">
            Consistency, in public, is rare.
          </h2>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-3">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="min-w-[280px] rounded-2xl border border-edge bg-card p-5 shadow-card sm:min-w-0"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} className="fill-fire text-fire" />
                  ))}
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-ash">"{t.quote}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-soft to-gem-soft font-display text-[12px] font-bold text-brand-light">
                    {t.name.split(' ').map((p) => p[0]).join('')}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-snow">{t.name}</p>
                    <p className="text-[11.5px] text-dusk">
                      {t.college} · {t.track}
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1 rounded-full border border-fire/20 bg-fire-soft/80 px-2 py-0.5 text-[10.5px] font-medium text-fire">
                    <Flame size={10} /> {t.streak}d
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gem/30 bg-gem-soft/60 px-3 py-1 text-[12px] font-medium text-gem">
            <Zap size={12} /> Join 2,400+ students building in public
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-snow text-balance sm:text-5xl">
            Your next 60 days can look different.
          </h2>
          <p className="mt-4 text-[15px] text-ash sm:text-[16px]">
            Day 1 takes ten minutes to start. Day 60 takes a portfolio to explain.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-[16px] font-semibold text-white shadow-glow-brand transition-all hover:scale-[1.02] active:scale-[0.97]"
          >
            Start Building Today
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-edge-subtle py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
          <Logo />
          <p className="text-[12px] text-dusk">
            A demo build for the ABTalks 60-Day Coding Challenge · Stats are illustrative.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-brand">
      <CheckCircle2 size={12} />
      {children}
    </span>
  );
}
