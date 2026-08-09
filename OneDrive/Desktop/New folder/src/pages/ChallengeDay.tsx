import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  Target,
  Puzzle,
  PartyPopper,
  Flame,
  Lock,
  CheckCircle2,
  ExternalLink,
  GitCommitVertical,
  Share2,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import SubmissionForm from '../components/SubmissionForm';
import { useChallengeState } from '../lib/useChallengeState';
import { getDayData } from '../data/challenge';
import { extractGithubUsername } from '../lib/github';
import { useGithubUser } from '../lib/useGithubUser';

export default function ChallengeDay() {
  const { day: dayParam } = useParams<{ day: string }>();
  const day = Number(dayParam);
  const dayData = getDayData(day);

  const {
    liveDay,
    challengeLength,
    isDayCompleted,
    getSubmission,
    submitDay,
    currentStreak,
  } = useChallengeState();

  const [justSubmitted, setJustSubmitted] = useState(false);

  const percent = Math.round((day / challengeLength) * 100);
  const completed = isDayCompleted(day);
  const submission = getSubmission(day);
  const isFuture = day > liveDay;
  const nextDay = getDayData(day + 1);

  // ── Invalid day ─────────────────────────────────────────────────────
  if (!dayParam || Number.isNaN(day) || !dayData) {
    return (
      <PageShell day={day || 0} track="" percent={0} challengeLength={challengeLength}>
        <div className="rounded-2xl border border-edge bg-card p-6 text-center shadow-card sm:p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-edge text-dusk">
            <Puzzle size={22} />
          </div>
          <p className="mt-4 font-display text-base font-bold text-snow sm:text-lg">
            This day doesn't exist yet
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ash">
            The challenge currently covers Days 1–14. Check back soon, or go back to your dashboard.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white sm:w-auto"
          >
            Back to Dashboard
          </Link>
        </div>
      </PageShell>
    );
  }

  // ── Locked (future day) ─────────────────────────────────────────────
  if (isFuture) {
    return (
      <PageShell day={day} track={dayData.track} percent={percent} challengeLength={challengeLength}>
        <div className="rounded-2xl border border-edge bg-card p-6 text-center shadow-card sm:p-8">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-edge text-dusk">
            <Lock size={22} />
          </div>
          <p className="mt-4 font-display text-base font-bold text-snow sm:text-lg">
            Day {day} is locked
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ash">
            Complete Day {liveDay} first — this build unlocks right after.
          </p>
          <Link
            to={`/day/${liveDay}`}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white sm:w-auto"
          >
            Go to Day {liveDay} <ArrowRight size={15} />
          </Link>
        </div>
      </PageShell>
    );
  }

  const showSuccess = completed && (justSubmitted || day === liveDay);

  return (
    <PageShell day={day} track={dayData.track} percent={percent} challengeLength={challengeLength}>
      {showSuccess && submission ? (
        <SuccessState
          day={day}
          streak={currentStreak}
          nextDay={nextDay}
          submission={submission}
        />
      ) : completed ? (
        <CompletedState day={day} />
      ) : (
        <>
          <TaskDetails dayData={dayData} />
          <SubmissionSection
            onSubmit={async (github, linkedin) => {
              await submitDay(day, github, linkedin);
              setJustSubmitted(true);
            }}
          />
        </>
      )}
    </PageShell>
  );
}

/* ── Page shell ─────────────────────────────────────────────────────── */
function PageShell({
  day,
  track,
  percent,
  challengeLength,
  children,
}: {
  day: number;
  track: string;
  percent: number;
  challengeLength: number;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-28 md:pb-10">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pt-4 sm:px-6 sm:pt-8">
        {/* Back nav */}
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ash transition-colors hover:text-snow"
        >
          <ArrowLeft size={15} />
          Challenge
        </Link>

        {/* Day meta + progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-mono text-[15px] font-bold text-snow sm:text-base">
                DAY {day || '—'} <span className="text-dusk">/ {challengeLength}</span>
              </h1>
              {track && (
                <p className="text-[12px] text-dusk">{track}</p>
              )}
            </div>
            {day > 0 && (
              <div className="shrink-0 text-right">
                <span className="font-mono text-[13px] font-semibold text-win">{percent}%</span>
                <p className="text-[10px] text-dusk">of challenge</p>
              </div>
            )}
          </div>
          {day > 0 && (
            <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-edge-subtle">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand to-win transition-all duration-700"
                style={{ width: `${percent}%` }}
              />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="mt-5 flex flex-col gap-4 pb-6 sm:mt-6 sm:gap-5">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}

/* ── Task details ────────────────────────────────────────────────────── */
function TaskDetails({
  dayData,
}: {
  dayData: NonNullable<ReturnType<typeof getDayData>>;
}) {
  return (
    <>
      {/* Title + description */}
      <section>
        <h2 className="font-display text-[1.5rem] font-bold leading-tight text-snow text-balance sm:text-[1.75rem]">
          {dayData.title}
        </h2>
        <p className="mt-2.5 text-[14px] leading-relaxed text-ash sm:text-[14.5px]">
          {dayData.description}
        </p>
      </section>

      {/* Meta pills */}
      <section className="flex flex-wrap gap-2">
        <InfoPill icon={Clock}>{dayData.estimatedTime}</InfoPill>
        <InfoPill icon={Target}>{dayData.difficulty}</InfoPill>
        <InfoPill icon={Puzzle}>{dayData.track}</InfoPill>
      </section>

      {/* Requirements */}
      <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
          Your build should
        </p>
        <ul className="mt-3.5 flex flex-col gap-2.5">
          {dayData.requirements.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-[13.5px] text-snow">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-win" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What to submit */}
      <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
          What to submit
        </p>
        <div className="mt-3.5 flex flex-col gap-4">
          <SubmitStep n={1} title="GitHub" sub="Push your project and paste the repository or commit URL." icon={GitCommitVertical} color="text-ice" />
          <SubmitStep n={2} title="LinkedIn" sub="Share your build publicly and paste the post URL." icon={Share2} color="text-brand-light" />
        </div>
      </section>
    </>
  );
}

function SubmitStep({
  n, title, sub, icon: Icon, color,
}: {
  n: number;
  title: string;
  sub: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 font-mono text-[11px] font-bold text-brand">
        {n}
      </span>
      <div>
        <div className="flex items-center gap-1.5">
          <Icon size={14} className={color} />
          <p className="text-[13.5px] font-semibold text-snow">{title}</p>
        </div>
        <p className="mt-0.5 text-[12.5px] text-ash">{sub}</p>
      </div>
    </div>
  );
}

/* ── Submission section ──────────────────────────────────────────────── */
function SubmissionSection({
  onSubmit,
}: {
  onSubmit: (github: string, linkedin: string) => Promise<void>;
}) {
  return (
    <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-6">
      <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
        Submit Proof of Work
      </p>
      <div className="mt-4">
        <SubmissionForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}

/* ── Success state ───────────────────────────────────────────────────── */
function SuccessState({
  day,
  streak,
  nextDay,
  submission,
}: {
  day: number;
  streak: number;
  nextDay: ReturnType<typeof getDayData>;
  submission: { github: string; linkedin: string };
}) {
  return (
    <section className="animate-pop rounded-2xl border border-win/30 bg-card p-5 text-center shadow-glow-win sm:p-8">
      {/* Icon */}
      <div className="relative mx-auto mb-1 w-fit">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-win/15 text-win">
          <PartyPopper size={26} />
        </div>
        <span className="absolute -right-1 -top-1 animate-ping-once">
          <Sparkles size={14} className="text-win" />
        </span>
      </div>

      <h2 className="mt-4 font-display text-xl font-bold text-snow sm:text-2xl">
        Day {day} complete!
      </h2>
      <p className="mt-1.5 text-[13.5px] text-ash">Your proof of work has been recorded.</p>

      {/* Streak badge */}
      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-fire/25 bg-fire-soft/80 px-4 py-2 font-mono text-[13px] font-bold text-fire">
        <Flame size={14} /> {streak} day streak
      </div>

      {/* Submitted links */}
      <div className="mt-6 flex flex-col gap-2 text-left">
        <SubmittedLink icon={GitCommitVertical} url={submission.github} />
        <SubmittedLink icon={Share2} url={submission.linkedin} />
      </div>

      {/* GitHub verify badge */}
      <GithubVerifyBadge url={submission.github} />

      {/* Up next */}
      {nextDay && (
        <div className="mt-6 rounded-xl border border-edge bg-layer/60 p-4 text-left">
          <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">Tomorrow</p>
          <p className="mt-1 text-[14px] font-medium text-snow">
            Day {nextDay.day} — {nextDay.title}
          </p>
        </div>
      )}

      <Link
        to="/dashboard"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[15px] font-semibold text-white shadow-glow-brand transition-all active:scale-[0.97] sm:w-auto"
      >
        Back to Dashboard
        <ArrowRight size={16} />
      </Link>
    </section>
  );
}

/* ── Already completed (no submission saved) ──────────────────────── */
function CompletedState({ day }: { day: number }) {
  return (
    <section className="rounded-2xl border border-edge bg-card p-6 text-center shadow-card sm:p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-win/12 text-win">
        <CheckCircle2 size={24} />
      </div>
      <p className="mt-4 font-display text-base font-bold text-snow sm:text-lg">
        Day {day} is already complete
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-ash">
        Nice work — this build is checked off your challenge history.
      </p>
      <Link
        to="/dashboard"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-[14px] font-semibold text-white sm:w-auto"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}

/* ── GitHub verify badge ──────────────────────────────────────────── */
function GithubVerifyBadge({ url }: { url: string }) {
  const username = extractGithubUsername(url);
  const state = useGithubUser(username);

  if (state.status === 'loading') {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-dusk">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-edge-strong border-t-ice" />
        Verifying with GitHub...
      </div>
    );
  }
  if (state.status === 'error') {
    return (
      <p className="mt-4 text-[11.5px] text-dusk">
        Couldn't auto-verify this GitHub link — it's still saved as your submission.
      </p>
    );
  }
  return (
    <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-ice/25 bg-ice-soft/70 px-3 py-1.5">
      <img src={state.user.avatar_url} alt="" className="h-5 w-5 shrink-0 rounded-full" />
      <span className="min-w-0 truncate text-[12px] font-medium text-ice">
        Verified: @{state.user.login} · {state.user.public_repos} public repos
      </span>
    </div>
  );
}

/* ── Info pill ────────────────────────────────────────────────────── */
function InfoPill({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-edge bg-layer px-3 py-1.5 text-[12.5px] font-medium text-ash">
      <Icon size={13} className="text-dusk" />
      {children}
    </span>
  );
}

/* ── Submitted link row ──────────────────────────────────────────── */
function SubmittedLink({
  icon: Icon,
  url,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  url: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-xl border border-edge bg-layer px-3.5 py-3 text-[12.5px] text-snow transition-colors hover:border-win/30"
    >
      <Icon size={14} className="shrink-0 text-win" />
      <span className="min-w-0 flex-1 truncate">{url}</span>
      <ExternalLink size={12} className="ml-auto shrink-0 text-dusk" />
    </a>
  );
}
