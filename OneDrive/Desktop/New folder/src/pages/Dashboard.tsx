import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  Trophy,
  Percent,
  ListChecks,
  ArrowRight,
  Rocket,
  GitCommitVertical,
  Briefcase,
  Medal,
  Snowflake,
  Compass,
  Share2,
  ExternalLink,
  Clock,
  Target,
  Puzzle,
  CheckCircle2,
  Lock,
} from "lucide-react";
import AppHeader from "../components/AppHeader";
import BottomNav from "../components/BottomNav";
import ContributionGrid from "../components/ContributionGrid";
import StatCard from "../components/StatCard";
import AchievementCard from "../components/AchievementCard";
import WeeklyStrip from "../components/WeeklyStrip";
import Avatar from "../components/Avatar";
import GithubActivityCard from "../components/GithubActivityCard";
import DayCard from "../components/DayCard";
import DetailSheet from "../components/DetailSheet";
import { useChallengeState } from "../lib/useChallengeState";
import { getDayData } from "../data/challenge";

type Detail =
  | { kind: "day"; day: number }
  | { kind: "stat"; key: "completed" | "streak" | "completion" | "standing" }
  | { kind: "achievement"; key: string };

export default function Dashboard() {
  const {
    student,
    liveDay,
    completedDays,
    currentStreak,
    progressPercent,
    challengeLength,
    isDayCompleted,
    getDayStatus,
    getSubmission,
    weekly,
    hasMissedDayThisWeek,
    freezeUsed,
    freezesRemaining,
    canUseFreeze,
    useStreakFreeze,
  } = useChallengeState();

  const [detail, setDetail] = useState<Detail | null>(null);

  const todayTask = getDayData(liveDay);
  const todayDone = isDayCompleted(liveDay);
  const isFirstDay = liveDay <= 1 && completedDays === 0;
  const nextDay = getDayData(liveDay + 1);

  const achievements = [
    {
      key: "first-commit",
      icon: GitCommitVertical,
      label: "First Commit",
      unlocked: completedDays >= 1,
      description: "Unlocks the moment you submit your very first day's proof of work.",
      goal: 1,
    },
    {
      key: "streak-7",
      icon: Flame,
      label: "7 Day Streak",
      unlocked: currentStreak >= 7,
      description: "Unlocks when your current streak reaches 7 days in a row. A Streak Freeze can help protect it.",
      goal: 7,
    },
    {
      key: "10-shipped",
      icon: Rocket,
      label: "10 Projects Shipped",
      unlocked: completedDays >= 10,
      description: "Unlocks after 10 total days completed — it doesn't need to be a streak, just 10 builds shipped.",
      goal: 10,
    },
    {
      key: "portfolio",
      icon: Briefcase,
      label: "Public Portfolio",
      unlocked: completedDays >= 14,
      description: "Unlocks at 14 days completed — by then you've got two weeks of public, linked proof of work.",
      goal: 14,
    },
  ];

  // "Your Journey" — every day from Day 1 is reachable here, not just today.
  // Includes a few upcoming (locked) days too, so clicking still gives
  // information about what's coming, not just what's done.
  const journeyDays = Array.from(
    { length: Math.min(liveDay + 3, challengeLength) },
    (_, i) => i + 1
  );

  const openDay = (day: number) => setDetail({ kind: "day", day });

  return (
    <div className="min-h-screen overflow-x-hidden pb-24 md:pb-12">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 sm:pt-8">
        {/* Greeting */}
        <div className="mb-5 flex items-center gap-3 sm:mb-6">
          <Avatar name={student.name} src={student.avatar} size="lg" />
          <div>
            <p className="text-[13px] text-muted">Welcome back,</p>
            <h1 className="font-display text-xl font-semibold text-paper sm:text-2xl">
              {student.name || "Student"}
            </h1>
          </div>
        </div>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex min-w-0 flex-col gap-5">
            {/* Hero progress card */}
            <section className="rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted">
                    DAY {liveDay} OF {challengeLength}
                  </p>
                  {isFirstDay ? (
                    <p className="mt-1.5 flex items-center gap-1.5 font-display text-lg font-semibold text-marigold">
                      <Flame size={18} /> Start your streak today
                    </p>
                  ) : currentStreak === 0 ? (
                    <p className="mt-1.5 font-display text-lg font-semibold text-paper">Your streak reset</p>
                  ) : (
                    <p className="mt-1.5 flex items-center gap-1.5 font-display text-lg font-semibold text-paper">
                      <Flame size={18} className="text-marigold" /> {currentStreak} DAY STREAK
                    </p>
                  )}
                </div>
                <div className="rounded-full bg-teal/12 px-3 py-1 font-mono text-sm font-semibold text-teal">
                  {progressPercent}%
                </div>
              </div>

              {!isFirstDay && currentStreak === 0 && (
                <p className="mt-1 text-[13px] leading-relaxed text-muted">
                  Missing one day doesn&apos;t erase your progress. {completedDays} days already completed — start again today.
                </p>
              )}
              {isFirstDay && (
                <p className="mt-1 text-[13px] leading-relaxed text-muted">Your first build starts here.</p>
              )}

              <div className="mt-5 min-w-0 overflow-x-auto no-scrollbar">
                <ContributionGrid
                  total={challengeLength}
                  completed={completedDays}
                  liveDay={liveDay}
                  liveDone={todayDone}
                  onDayClick={openDay}
                />
              </div>
              <p className="mt-2 text-[11.5px] text-muted">Tap any filled square to revisit that day.</p>

              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink-600">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-marigold to-teal transition-all duration-700"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-2 text-[13px] text-muted">{progressPercent}% challenge complete</p>
            </section>

            {/* Your Journey — access from Day 1, every card clickable */}
            <section id="journey" className="min-w-0 scroll-mt-20">
              <SectionHeading icon={Compass}>Your journey</SectionHeading>
              <p className="mt-1.5 text-[13px] text-muted">
                Every day from Day 1 is here — tap any card to see the brief and what you submitted.
              </p>
              <div className="mt-3 flex min-w-0 gap-2.5 overflow-x-auto pb-1 no-scrollbar sm:gap-3">
                {journeyDays.map((day) => {
                  const status = getDayStatus(day);
                  const data = getDayData(day);
                  return (
                    <DayCard
                      key={day}
                      day={day}
                      title={data?.title}
                      status={status}
                      onClick={() => openDay(day)}
                    />
                  );
                })}
              </div>
            </section>

            {/* Today's task */}
            {todayTask && (
              <section className="rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs tracking-wide text-muted">TODAY&apos;S BUILD</p>
                  {todayDone && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-semibold text-teal">
                      Completed
                    </span>
                  )}
                </div>
                <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-paper">
                  {todayTask.title}
                </h2>
                <p className="mt-1 font-mono text-[12.5px] text-muted">
                  Day {liveDay} · {todayTask.track} · {todayTask.estimatedTime}
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted">{todayTask.description}</p>
                <Link
                  to={`/day/${liveDay}`}
                  className={`mt-5 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold transition-transform active:scale-[0.98] ${
                    todayDone
                      ? "border border-ink-500 text-paper hover:bg-ink-600"
                      : "bg-marigold text-white shadow-glow hover:scale-[1.01]"
                  }`}
                >
                  {todayDone ? "View today's submission" : "Continue today's challenge"}
                  <ArrowRight size={16} />
                </Link>
              </section>
            )}

            {/* Keep the streak alive */}
            {!todayDone && (
              <section className="flex flex-col gap-3 rounded-2xl border border-marigold/25 bg-marigold/[0.06] p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:p-5">
                <div className="min-w-0">
                  <p className="font-display text-[15px] font-semibold text-paper">Keep the Streak Alive</p>
                  <p className="mt-0.5 text-[13px] text-muted">
                    You&apos;re 1 build away from extending your streak.
                  </p>
                </div>
                <Link
                  to={`/day/${liveDay}`}
                  className="shrink-0 whitespace-nowrap font-display text-[13.5px] font-semibold text-marigold"
                >
                  Continue Day {liveDay} →
                </Link>
              </section>
            )}
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            {/* Quick stats */}
            <section>
              <SectionHeading icon={ListChecks}>Quick stats</SectionHeading>
              <p className="mt-1.5 text-[13px] text-muted">Tap a stat for what it means.</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <StatCard
                  icon={ListChecks}
                  value={String(completedDays)}
                  label="Days completed"
                  accent="teal"
                  onClick={() => setDetail({ kind: "stat", key: "completed" })}
                />
                <StatCard
                  icon={Flame}
                  value={String(currentStreak)}
                  label="Current streak"
                  accent="marigold"
                  onClick={() => setDetail({ kind: "stat", key: "streak" })}
                />
                <StatCard
                  icon={Percent}
                  value={`${progressPercent}%`}
                  label="Completion"
                  accent="teal"
                  onClick={() => setDetail({ kind: "stat", key: "completion" })}
                />
                <StatCard
                  icon={Trophy}
                  value={`#${student.standing}`}
                  label="Your standing"
                  accent="coral"
                  onClick={() => setDetail({ kind: "stat", key: "standing" })}
                />
              </div>
            </section>

            {/* Weekly consistency */}
            <section className="relative overflow-hidden rounded-2xl border border-ink-600 bg-gradient-to-br from-ink-700 via-ink-700 to-frost/[0.06] p-4 shadow-card sm:p-6">
              {/* Decorative glow — purely visual, ignored by screen readers */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-frost/10 blur-3xl sm:h-40 sm:w-40 md:h-48 md:w-48"
              />
              <div className="relative">
                <SectionHeading icon={Flame}>This week</SectionHeading>
                <div className="mt-4 sm:mt-5">
                  <WeeklyStrip days={weekly} />
                </div>

                {hasMissedDayThisWeek && (
                  <div className="mt-4 border-t border-ink-600 pt-4 sm:mt-5 sm:pt-5">
                    {freezeUsed ? (
                      <div className="flex items-start gap-2.5 rounded-xl bg-frost/[0.08] p-3 sm:p-3.5">
                        <Snowflake size={16} className="mt-0.5 shrink-0 text-frost" />
                        <p className="text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                          <span className="font-semibold text-paper">Streak protected.</span> Saturday
                          won&apos;t break your streak. {freezesRemaining} freeze{freezesRemaining === 1 ? "" : "s"} left
                          this month.
                        </p>
                      </div>
                    ) : canUseFreeze ? (
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="flex items-start gap-2.5">
                          <Snowflake size={16} className="mt-0.5 shrink-0 text-frost" />
                          <p className="text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                            <span className="font-semibold text-paper">Missed a day?</span> Life happens. Use a
                            Streak Freeze to protect it — {freezesRemaining} left this month.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={useStreakFreeze}
                          className="w-full shrink-0 rounded-full border border-frost/40 bg-frost/10 px-4 py-2.5 text-[13px] font-semibold text-frost shadow-frostglow transition-colors hover:bg-frost/20 active:scale-[0.98] sm:w-auto sm:py-2"
                        >
                          Use a freeze
                        </button>
                      </div>
                    ) : (
                      <p className="text-[12.5px] leading-relaxed text-muted sm:text-[13px]">
                        Out of freezes for this month — no worries, build today to start a fresh streak.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>

            {/* Live GitHub activity — real API call, the app's one live-data feature */}
            <GithubActivityCard username={student.githubUsername} />

            {/* Achievements */}
            <section className="min-w-0">
              <SectionHeading icon={Medal}>Achievements</SectionHeading>
              <p className="mt-1.5 text-[13px] text-muted">Tap a badge to see how to unlock it.</p>
              <div className="mt-3 flex min-w-0 gap-3 overflow-x-auto pb-1 no-scrollbar">
                {achievements.map((a) => (
                  <AchievementCard
                    key={a.label}
                    icon={a.icon}
                    label={a.label}
                    unlocked={a.unlocked}
                    onClick={() => setDetail({ kind: "achievement", key: a.key })}
                  />
                ))}
              </div>
            </section>

            {nextDay && todayDone && (
              <section className="rounded-2xl border border-ink-600 bg-ink-700 p-5 shadow-card">
                <p className="font-mono text-xs text-muted">UP NEXT</p>
                <p className="mt-1.5 font-display text-[15px] font-semibold text-paper">
                  Day {nextDay.day} — {nextDay.title}
                </p>
              </section>
            )}
          </div>
        </div>
      </main>

      <BottomNav />

      {/* Detail sheet — shown for day cards, stats, and achievements */}
      {detail?.kind === "day" && (
        <DayDetailSheet
          day={detail.day}
          status={getDayStatus(detail.day)}
          liveDay={liveDay}
          submission={getSubmission(detail.day)}
          onClose={() => setDetail(null)}
        />
      )}
      {detail?.kind === "stat" && (
        <StatDetailSheet
          statKey={detail.key}
          values={{ completedDays, currentStreak, progressPercent, standing: student.standing, totalStudents: student.totalStudents }}
          onClose={() => setDetail(null)}
        />
      )}
      {detail?.kind === "achievement" && (
        <AchievementDetailSheet
          achievement={achievements.find((a) => a.key === detail.key)!}
          completedDays={completedDays}
          currentStreak={currentStreak}
          onClose={() => setDetail(null)}
        />
      )}
    </div>
  );
}

function SectionHeading({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-1.5 text-[13px] font-semibold uppercase tracking-wide text-muted">
      <Icon size={13} />
      {children}
    </div>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

function DayDetailSheet({
  day,
  status,
  liveDay,
  submission,
  onClose,
}: {
  day: number;
  status: "done" | "today" | "locked";
  liveDay: number;
  submission?: { github: string; linkedin: string; submittedAt: string };
  onClose: () => void;
}) {
  const data = getDayData(day);

  return (
    <DetailSheet
      open
      onClose={onClose}
      eyebrow={`DAY ${day}${status === "today" ? " · TODAY" : ""}`}
      title={data?.title ?? (status === "locked" ? "Not unlocked yet" : "Untitled build")}
      accent={status === "done" ? "teal" : status === "today" ? "marigold" : "violet"}
    >
      {data && (
        <div className="mb-4 flex flex-wrap gap-2">
          <InfoPill icon={Clock}>{data.estimatedTime}</InfoPill>
          <InfoPill icon={Target}>{data.difficulty}</InfoPill>
          <InfoPill icon={Puzzle}>{data.track}</InfoPill>
        </div>
      )}

      {data ? (
        <p className="text-[14px] leading-relaxed text-muted">{data.description}</p>
      ) : (
        <p className="text-[14px] leading-relaxed text-muted">
          Content for this day hasn&apos;t been published yet — check back as the challenge continues.
        </p>
      )}

      {data && data.requirements.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {data.requirements.map((r) => (
            <li key={r} className="flex items-start gap-2 text-[13.5px] text-paper">
              <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-teal" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
      )}

      {status === "locked" && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-violet/25 bg-violet/[0.07] p-3.5">
          <Lock size={15} className="mt-0.5 shrink-0 text-violet" />
          <p className="text-[13px] leading-relaxed text-muted">
            This unlocks once you finish Day {liveDay}
            {day > liveDay + 1 ? `, and the ${day - liveDay - 1} day${day - liveDay - 1 === 1 ? "" : "s"} after it` : ""}.
          </p>
        </div>
      )}

      {status !== "locked" && submission && (
        <div className="mt-5 rounded-xl border border-ink-600 bg-ink-800 p-3.5">
          <p className="font-mono text-[11px] tracking-wide text-muted">SUBMITTED · {formatDate(submission.submittedAt)}</p>
          <div className="mt-2.5 flex flex-col gap-2">
            <SubmittedLink icon={GitCommitVertical} url={submission.github} />
            <SubmittedLink icon={Share2} url={submission.linkedin} />
          </div>
        </div>
      )}

      {status !== "locked" && !submission && (
        <div className="mt-5 rounded-xl border border-ink-600 bg-ink-800 p-3.5">
          <p className="text-[13px] leading-relaxed text-muted">
            {status === "today"
              ? "Not submitted yet today — you can still complete it."
              : "This day is marked complete, but no submission link was saved for it."}
          </p>
        </div>
      )}

      {status === "today" && (
        <Link
          to={`/day/${day}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-marigold px-5 py-3 text-[14px] font-semibold text-white shadow-glow"
        >
          Go to Day {day}
          <ArrowRight size={15} />
        </Link>
      )}
      {status === "done" && (
        <Link
          to={`/day/${day}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-ink-500 px-5 py-3 text-[14px] font-semibold text-paper hover:bg-ink-600"
        >
          Open full page
          <ExternalLink size={14} />
        </Link>
      )}
    </DetailSheet>
  );
}

const STAT_INFO: Record<
  "completed" | "streak" | "completion" | "standing",
  { title: string; body: (v: { completedDays: number; currentStreak: number; progressPercent: number; standing: number; totalStudents: number }) => string }
> = {
  completed: {
    title: "Days completed",
    body: (v) => `You've submitted proof of work for ${v.completedDays} day${v.completedDays === 1 ? "" : "s"} of the 60-day challenge. This counts every day you've submitted, streak or not.`,
  },
  streak: {
    title: "Current streak",
    body: (v) =>
      v.currentStreak > 0
        ? `You've submitted ${v.currentStreak} day${v.currentStreak === 1 ? "" : "s"} in a row, ending today. Miss a day and this resets to 0 — unless you protect it with a Streak Freeze.`
        : `Your streak is at 0 right now. Submit today's build to start a new one — a missed day doesn't erase the days you've already completed.`,
  },
  completion: {
    title: "Completion",
    body: (v) => `${v.progressPercent}% of the full 60-day challenge is done — that's days completed divided by 60, rounded to the nearest percent.`,
  },
  standing: {
    title: "Your standing",
    body: (v) => `You're ranked #${v.standing} out of ${v.totalStudents.toLocaleString()} students currently in the challenge, based on days completed and streak length.`,
  },
};

function StatDetailSheet({
  statKey,
  values,
  onClose,
}: {
  statKey: "completed" | "streak" | "completion" | "standing";
  values: { completedDays: number; currentStreak: number; progressPercent: number; standing: number; totalStudents: number };
  onClose: () => void;
}) {
  const info = STAT_INFO[statKey];
  return (
    <DetailSheet open onClose={onClose} eyebrow="QUICK STAT" title={info.title} accent="teal">
      <p className="text-[14px] leading-relaxed text-muted">{info.body(values)}</p>
    </DetailSheet>
  );
}

function AchievementDetailSheet({
  achievement,
  completedDays,
  currentStreak,
  onClose,
}: {
  achievement: { label: string; description: string; unlocked: boolean; goal: number; key: string };
  completedDays: number;
  currentStreak: number;
  onClose: () => void;
}) {
  const isStreakBased = achievement.key === "streak-7";
  const progressValue = isStreakBased ? currentStreak : completedDays;
  const pct = Math.min(100, Math.round((progressValue / achievement.goal) * 100));

  return (
    <DetailSheet open onClose={onClose} eyebrow="ACHIEVEMENT" title={achievement.label} accent="violet">
      <p className="text-[14px] leading-relaxed text-muted">{achievement.description}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[12.5px] text-muted">
          <span>{achievement.unlocked ? "Unlocked" : "Progress"}</span>
          <span className="font-mono">
            {Math.min(progressValue, achievement.goal)}/{achievement.goal}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-ink-600">
          <div
            className={`h-full rounded-full transition-all duration-700 ${achievement.unlocked ? "bg-violet" : "bg-ink-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {achievement.unlocked && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-violet/25 bg-violet/[0.07] p-3">
          <Medal size={16} className="shrink-0 text-violet" />
          <p className="text-[13px] font-medium text-paper">Unlocked — nice work.</p>
        </div>
      )}
    </DetailSheet>
  );
}

function InfoPill({ icon: Icon, children }: { icon: React.ComponentType<{ size?: number; className?: string }>; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-600 bg-ink-800 px-3 py-1.5 text-[12.5px] font-medium text-paper">
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
      className="flex items-center gap-2.5 rounded-xl border border-ink-600 bg-ink-700 px-3.5 py-3 text-[13px] text-paper transition-colors hover:border-teal/40"
    >
      <Icon size={15} className="shrink-0 text-teal" />
      <span className="min-w-0 flex-1 truncate">{url}</span>
      <ExternalLink size={13} className="ml-auto shrink-0 text-muted" />
    </a>
  );
}
