import { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
} from "lucide-react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import SubmissionForm from "../components/SubmissionForm";
import { useChallengeState } from "../lib/useChallengeState";
import { getDayData } from "../data/challenge";
import { extractGithubUsername } from "../lib/github";
import { useGithubUser } from "../lib/useGithubUser";

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

  if (!dayParam || Number.isNaN(day) || !dayData) {
    return (
      <PageShell day={day || 0} track="" percent={0} challengeLength={challengeLength}>
        <div className="rounded-2xl border border-ink-600 bg-ink-700 p-6 text-center shadow-card sm:p-8">
          <p className="font-display text-base font-semibold text-paper sm:text-lg">
            This day doesn&apos;t exist yet
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
            The challenge currently covers Days 1–14. Check back soon, or head back to your dashboard.
          </p>
          <Link
            to="/dashboard"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3 text-[14px] font-semibold text-white sm:inline-flex sm:w-auto"
          >
            Back to Dashboard
          </Link>
        </div>
      </PageShell>
    );
  }

  if (isFuture) {
    return (
      <PageShell day={day} track={dayData.track} percent={percent} challengeLength={challengeLength}>
        <div className="rounded-2xl border border-ink-600 bg-ink-700 p-6 text-center shadow-card sm:p-8">
          <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-ink-600 text-muted sm:h-12 sm:w-12">
            <Lock size={20} />
          </div>
          <p className="mt-4 font-display text-base font-semibold text-paper sm:text-lg">
            Day {day} is locked
          </p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
            Complete Day {liveDay} first — this build unlocks right after.
          </p>
          <Link
            to={`/day/${liveDay}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3 text-[14px] font-semibold text-white sm:inline-flex sm:w-auto"
          >
            Go to Day {liveDay}
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
        <CompletedNoRecordState day={day} />
      ) : (
        <>
          <TaskDetails dayData={dayData} />
          <SubmissionSection
            onSubmit={async (github, linkedin) => {
              await submitDay(day, github, linkedin); // throws on validation/network failure — SubmissionForm shows the error
              setJustSubmitted(true);
            }}
          />
        </>
      )}
    </PageShell>
  );
}

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
    <div className="min-h-screen pb-24 md:pb-12">
      <AppHeader />
      <main className="mx-auto max-w-3xl px-4 pt-4 sm:px-6 sm:pt-8">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-paper sm:text-[13.5px]"
        >
          <ArrowLeft size={15} />
          Challenge
        </Link>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate font-mono text-base font-semibold text-paper sm:text-lg">
              DAY {day || "—"} OF {challengeLength}
            </h1>
            {track && <p className="truncate text-[12.5px] text-muted sm:text-[13px]">{track}</p>}
          </div>
          {day > 0 && (
            <div className="shrink-0 text-right">
              <p className="font-mono text-[13.5px] font-semibold text-teal sm:text-sm">{percent}%</p>
            </div>
          )}
        </div>

        {day > 0 && (
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-600">
            <div
              className="h-full rounded-full bg-gradient-to-r from-marigold to-teal transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        )}

        <div className="mt-5 flex flex-col gap-4 pb-6 sm:mt-6 sm:gap-5">{children}</div>
      </main>
      <BottomNav />
    </div>
  );
}

function TaskDetails({ dayData }: { dayData: NonNullable<ReturnType<typeof getDayData>> }) {
  return (
    <>
      <section>
        <h2 className="font-display text-xl font-semibold leading-tight text-paper text-balance sm:text-2xl md:text-3xl">
          {dayData.title}
        </h2>
        <p className="mt-2.5 text-[14px] leading-relaxed text-muted sm:text-[14.5px]">{dayData.description}</p>
      </section>

      <section className="flex flex-wrap gap-2">
        <InfoPill icon={Clock}>{dayData.estimatedTime}</InfoPill>
        <InfoPill icon={Target}>{dayData.difficulty}</InfoPill>
        <InfoPill icon={Puzzle}>{dayData.track}</InfoPill>
      </section>

      <section className="rounded-2xl border border-ink-600 bg-ink-700 p-4 shadow-card sm:p-5 md:p-6">
        <p className="font-mono text-[11px] tracking-wide text-muted sm:text-xs">YOUR DASHBOARD SHOULD</p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {dayData.requirements.map((r) => (
            <li key={r} className="flex items-start gap-2.5 text-[13.5px] text-paper sm:text-[14px]">
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-teal" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="rounded-2xl border border-ink-600 bg-ink-700 p-4 shadow-card sm:p-5 md:p-6">
        <p className="font-mono text-[11px] tracking-wide text-muted sm:text-xs">WHAT TO SUBMIT</p>
        <div className="mt-3 flex flex-col gap-4">
          <div className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-600 font-mono text-[11px] font-semibold text-marigold sm:h-7 sm:w-7 sm:text-[12px]">
              1
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-paper sm:text-[14px]">GitHub</p>
              <p className="text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                Push your project and submit the repository or commit URL.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink-600 font-mono text-[11px] font-semibold text-marigold sm:h-7 sm:w-7 sm:text-[12px]">
              2
            </span>
            <div className="min-w-0">
              <p className="text-[13.5px] font-medium text-paper sm:text-[14px]">LinkedIn</p>
              <p className="text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                Share your build publicly and submit the LinkedIn post URL.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function SubmissionSection({ onSubmit }: { onSubmit: (github: string, linkedin: string) => Promise<void> }) {
  return (
    <section className="rounded-2xl border border-ink-600 bg-ink-700 p-4 shadow-card sm:p-6">
      <p className="font-mono text-[11px] tracking-wide text-muted sm:text-xs">SUBMIT PROOF OF WORK</p>
      <div className="mt-4">
        <SubmissionForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}

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
    <section className="animate-pop rounded-2xl border border-teal/30 bg-ink-700 p-5 text-center shadow-tealglow sm:p-6 md:p-8">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-teal/15 text-teal sm:h-14 sm:w-14">
        <PartyPopper size={24} className="sm:hidden" />
        <PartyPopper size={26} className="hidden sm:block" />
      </div>
      <h2 className="mt-4 font-display text-lg font-semibold text-paper sm:text-xl md:text-2xl">
        Day {day} complete!
      </h2>
      <p className="mt-1.5 text-[13.5px] text-muted sm:text-[14px]">Your proof of work has been recorded.</p>

      <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-marigold/12 px-3.5 py-1.5 font-mono text-[12.5px] font-semibold text-marigold sm:text-[13px]">
        <Flame size={14} />
        {streak} day streak
      </div>

      <div className="mt-6 flex flex-col gap-2 text-left">
        <SubmittedLink icon={GitCommitVertical} url={submission.github} />
        <SubmittedLink icon={Share2} url={submission.linkedin} />
      </div>

      <GithubVerifyBadge url={submission.github} />

      {nextDay && (
        <div className="mt-6 rounded-xl border border-ink-600 bg-ink-800 p-4 text-left">
          <p className="font-mono text-[11px] text-muted">TOMORROW</p>
          <p className="mt-1 text-[13.5px] font-medium text-paper sm:text-[14px]">
            Day {nextDay.day} — {nextDay.title}
          </p>
        </div>
      )}

      <Link
        to="/dashboard"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3.5 text-[14.5px] font-semibold text-white shadow-glow transition-transform active:scale-[0.98] sm:inline-flex sm:w-auto sm:text-[15px]"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}

function CompletedNoRecordState({ day }: { day: number }) {
  return (
    <section className="rounded-2xl border border-ink-600 bg-ink-700 p-6 text-center shadow-card sm:p-8">
      <div className="mx-auto grid h-11 w-11 place-items-center rounded-full bg-teal/15 text-teal sm:h-12 sm:w-12">
        <CheckCircle2 size={22} />
      </div>
      <p className="mt-4 font-display text-base font-semibold text-paper sm:text-lg">
        Day {day} is already complete
      </p>
      <p className="mt-2 text-[13.5px] leading-relaxed text-muted sm:text-[14px]">
        Nice work — this build is checked off your challenge history.
      </p>
      <Link
        to="/dashboard"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-6 py-3 text-[14px] font-semibold text-white sm:inline-flex sm:w-auto"
      >
        Back to Dashboard
      </Link>
    </section>
  );
}

function GithubVerifyBadge({ url }: { url: string }) {
  const username = extractGithubUsername(url);
  const state = useGithubUser(username);

  if (state.status === "loading") {
    return (
      <div className="mt-4 flex items-center justify-center gap-2 text-[12px] text-muted sm:text-[12.5px]">
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-ink-500 border-t-teal" />
        Verifying with GitHub...
      </div>
    );
  }

  if (state.status === "error") {
    return (
      <p className="mt-4 text-[11.5px] leading-relaxed text-muted sm:text-[12px]">
        Couldn&apos;t verify this GitHub link automatically — it&apos;s still saved as your submission.
      </p>
    );
  }

  return (
    <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3 py-1.5">
      <img src={state.user.avatar_url} alt="" className="h-5 w-5 shrink-0 rounded-full" />
      <span className="min-w-0 truncate text-[12px] font-medium text-teal sm:text-[12.5px]">
        Verified: @{state.user.login} · {state.user.public_repos} public repos
      </span>
    </div>
  );
}

function InfoPill({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-700 px-3 py-1.5 text-[12px] font-medium text-paper sm:text-[12.5px]">
      <Icon size={13} />
      {children}
    </span>
  );
}

function SubmittedLink({ icon: Icon, url }: { icon: React.ComponentType<{ size?: number; className?: string }>; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2.5 rounded-xl border border-ink-600 bg-ink-800 px-3 py-2.5 text-[12.5px] text-paper transition-colors hover:border-teal/40 sm:px-3.5 sm:py-3 sm:text-[13px]"
    >
      <Icon size={15} className="shrink-0 text-teal" />
      <span className="min-w-0 flex-1 truncate">{url}</span>
      <ExternalLink size={13} className="ml-auto shrink-0 text-muted" />
    </a>
  );
}
