import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";
import Logo from "../components/Logo";
import ContributionGrid from "../components/ContributionGrid";
import { defaultStudent, CHALLENGE_LENGTH } from "../data/student";

const steps = [
  {
    n: "01",
    title: "Pick your track",
    body: "Web Dev, AI/ML, Data Science, or App Development. Every track ships a real project, not a quiz.",
  },
  {
    n: "02",
    title: "Build every day",
    body: "One focused task lands each morning. Estimated time, requirements, nothing vague.",
  },
  {
    n: "03",
    title: "Submit your proof",
    body: "Push the commit, post it on LinkedIn, paste both links. That's what keeps the streak public.",
  },
];

const tracks = [
  { name: "Web Development", icon: Code2, desc: "Ship UI, from landing pages to dashboards." },
  { name: "AI / ML", icon: BrainCircuit, desc: "Train, fine-tune, and deploy small models." },
  { name: "Data Science", icon: LineChart, desc: "Clean, visualize, and tell stories with data." },
  { name: "App Development", icon: Smartphone, desc: "Build mobile-first apps that actually run." },
];

const builds = [
  { day: "Day 04", title: "Responsive Portfolio" },
  { day: "Day 12", title: "GitHub Activity Dashboard" },
  { day: "Day 27", title: "AI Resume Analyzer" },
  { day: "Day 43", title: "Full-stack Internship Tracker" },
];

const stats = [
  { value: "2,400+", label: "Students joined" },
  { value: "60", label: "Days of building" },
  { value: "120K+", label: "Projects shipped" },
];

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-ink-600/60 bg-ink-800/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm text-muted transition-colors hover:text-paper">How it works</a>
            <a href="#tracks" className="text-sm text-muted transition-colors hover:text-paper">Tracks</a>
            <a href="#proof" className="text-sm text-muted transition-colors hover:text-paper">Proof of work</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="hidden rounded-full bg-marigold px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:scale-[1.03] active:scale-[0.98] sm:inline-block"
            >
              Start the Challenge
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-full text-paper md:hidden"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-ink-600/60 bg-ink-800 px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-paper hover:bg-ink-700">How it works</a>
              <a href="#tracks" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-paper hover:bg-ink-700">Tracks</a>
              <a href="#proof" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2.5 text-sm text-paper hover:bg-ink-700">Proof of work</a>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="mt-2 rounded-full bg-marigold px-4 py-2.5 text-center text-sm font-semibold text-white">
                Start the Challenge
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 sm:pt-16 lg:pt-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-12">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-marigold/25 bg-marigold/10 px-3 py-1 text-[12px] font-medium text-marigold">
              <Flame size={13} /> 60-day build-in-public challenge
            </span>
            <h1 className="mt-5 font-display text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-paper text-balance sm:text-6xl lg:text-[3.6rem]">
              Build. Ship. Share.
              <br />
              For 60 Days.
            </h1>
            <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-muted sm:text-lg">
              Build real projects every day, prove your progress publicly, and turn consistency into a portfolio recruiters can actually see.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Start the 60-Day Challenge
                <ArrowRight size={17} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-500 px-6 py-3.5 text-[15px] font-semibold text-paper transition-colors hover:bg-ink-700"
              >
                See How It Works
              </a>
            </div>
            <p className="mt-5 text-[13px] text-muted">
              Free to join · No credit card · Built for Indian college students
            </p>
          </div>

          {/* Hero visual: today's progress on the signature grid */}
          <div className="animate-pop rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card sm:p-6" style={{ animationDelay: "120ms" }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono text-xs tracking-wide text-muted">CHALLENGE PROGRESS</p>
                <p className="mt-1 font-mono text-2xl font-semibold text-paper">
                  DAY {defaultStudent.currentDay} <span className="text-muted">/ {CHALLENGE_LENGTH}</span>
                </p>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-full bg-teal/15 text-teal">
                <Flame size={20} />
              </div>
            </div>

            <div className="mt-5">
              <ContributionGrid
                total={CHALLENGE_LENGTH}
                completed={defaultStudent.completedDays}
                liveDay={defaultStudent.currentDay}
                liveDone={false}
              />
            </div>

            <div className="mt-5 flex items-center gap-2 text-[13px] text-muted">
              <span className="rounded-md bg-ink-600 px-2 py-1 font-mono text-teal">Build</span>
              <ArrowRight size={13} />
              <span className="rounded-md bg-ink-600 px-2 py-1 font-mono text-teal">Commit</span>
              <ArrowRight size={13} />
              <span className="rounded-md bg-ink-600 px-2 py-1 font-mono text-teal">Share</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-ink-600/50 bg-ink-700/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionEyebrow>How it works</SectionEyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-semibold text-paper sm:text-3xl">
            Three steps. Every single night.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-2xl border border-ink-600 bg-ink-800 p-5 shadow-card">
                <span className="font-mono text-sm text-marigold">{s.n}</span>
                <h3 className="mt-3 font-display text-lg font-semibold text-paper">{s.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why 60 days */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <SectionEyebrow>Why 60 days</SectionEyebrow>
              <h2 className="mt-2 font-display text-2xl font-semibold text-paper sm:text-3xl">
                Talent is common. Consistency, in public, is not.
              </h2>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                Sixty days is long enough to build a real habit and short enough to actually finish. Every day you skip a tutorial and ship something instead — and every commit becomes evidence, not just a to-do you checked off.
              </p>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                Recruiters don't read resumes closely. A public streak, a GitHub history, and a run of LinkedIn posts do the convincing for you.
              </p>
            </div>
            <div className="rounded-2xl border border-ink-600 bg-ink-700 p-6 shadow-card">
              <p className="font-mono text-xs text-muted">60-DAY GRID · full challenge</p>
              <div className="mt-4">
                <ContributionGrid total={CHALLENGE_LENGTH} completed={22} liveDay={23} liveDone={false} />
              </div>
              <p className="mt-4 text-[13px] text-muted">Each square is one day of building — the same grid that shows up on your dashboard from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="border-t border-ink-600/50 bg-ink-700/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionEyebrow>Tracks</SectionEyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-semibold text-paper sm:text-3xl">
            Pick the track that matches where you want to be hired.
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {tracks.map((t) => (
              <div key={t.name} className="rounded-2xl border border-ink-600 bg-ink-800 p-4 shadow-card sm:p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-marigold/12 text-marigold">
                  <t.icon size={19} />
                </div>
                <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-paper sm:text-base">
                  {t.name}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-snug text-muted sm:text-[13px]">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What students build */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionEyebrow>What students build</SectionEyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-semibold text-paper sm:text-3xl">
            Real projects, in order, with your name on them.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {builds.map((b) => (
              <div key={b.day} className="rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card">
                <span className="font-mono text-xs text-teal">{b.day}</span>
                <p className="mt-2 font-display text-[15px] font-medium leading-snug text-paper">{b.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof of work */}
      <section id="proof" className="border-t border-ink-600/50 bg-ink-700/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionEyebrow>Proof of work</SectionEyebrow>
          <h2 className="mt-2 max-w-md font-display text-2xl font-semibold text-paper sm:text-3xl">
            No certificates. Just receipts.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <ProofItem icon={GitCommitVertical} label="GitHub Commit" desc="Your repo, your code — checked live against GitHub, not just a pasted link." />
            <ProofItem icon={Share2} label="LinkedIn Post" desc="Public accountability, built-in reach." />
            <ProofItem icon={Flame} label="Daily Streak" desc="A visible record of showing up." />
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl border border-ink-600 bg-ink-700 p-6 shadow-card sm:p-10">
            <p className="text-center text-[12px] font-medium uppercase tracking-wide text-muted">
              Demo community stats
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-semibold text-marigold sm:text-4xl">{s.value}</div>
                  <div className="mt-1 text-[11px] leading-tight text-muted sm:text-sm">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-semibold leading-tight text-paper text-balance sm:text-5xl">
            Your next 60 days can look different.
          </h2>
          <p className="mt-4 text-[15px] text-muted sm:text-lg">
            Day 1 takes ten minutes to start. Day 60 takes a portfolio to explain.
          </p>
          <Link
            to="/dashboard"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-marigold px-8 py-4 text-[15px] font-semibold text-white shadow-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Building
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <footer className="border-t border-ink-600/60 py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 text-center sm:px-6">
          <Logo />
          <p className="text-[12.5px] text-muted">
            A demo build for the ABTalks 60-Day Coding Challenge · All stats are illustrative.
          </p>
        </div>
      </footer>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[12px] font-medium uppercase tracking-wider text-teal">
      <CheckCircle2 size={12} />
      {children}
    </span>
  );
}

function ProofItem({
  icon: Icon,
  label,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  desc: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-ink-600 bg-ink-800 p-5 shadow-card">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal/12 text-teal">
        <Icon size={19} />
      </div>
      <div>
        <p className="font-display text-[15px] font-semibold text-paper">{label}</p>
        <p className="text-[13px] text-muted">{desc}</p>
      </div>
    </div>
  );
}
