import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  TrendingUp,
  Zap,
} from 'lucide-react';
import AppHeader from '../components/AppHeader';
import BottomNav from '../components/BottomNav';
import ContributionGrid from '../components/ContributionGrid';
import StatCard from '../components/StatCard';
import AchievementCard from '../components/AchievementCard';
import WeeklyStrip from '../components/WeeklyStrip';
import Avatar from '../components/Avatar';
import GithubActivityCard from '../components/GithubActivityCard';
import DayCard from '../components/DayCard';
import DetailSheet from '../components/DetailSheet';
import RecruiterRadar from '../components/RecruiterRadar';
import { useChallengeState } from '../lib/useChallengeState';
import { getDayData } from '../data/challenge';
import { getTimeGreeting } from '../data/student';

type Detail =
  | { kind: 'day'; day: number }
  | { kind: 'stat'; key: 'completed' | 'streak' | 'completion' | 'standing' }
  | { kind: 'achievement'; key: string };

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
  const greeting = getTimeGreeting();

  const achievements = [
    {
      key: 'first-commit',
      icon: GitCommitVertical,
      label: 'First Commit',
      unlocked: completedDays >= 1,
      description: 'Unlocks when you submit your very first day\'s proof of work.',
      goal: 1,
    },
    {
      key: 'streak-7',
      icon: Flame,
      label: '7 Day Streak',
      unlocked: currentStreak >= 7,
      description: 'Unlocks when your current streak reaches 7 consecutive days.',
      goal: 7,
    },
    {
      key: '10-shipped',
      icon: Rocket,
      label: '10 Projects',
      unlocked: completedDays >= 10,
      description: 'Unlocks after 10 total days completed — streak or not.',
      goal: 10,
    },
    {
      key: 'portfolio',
      icon: Briefcase,
      label: 'Portfolio',
      unlocked: completedDays >= 14,
      description: 'Unlocks at 14 days — you\'ve got two weeks of linked public proof.',
      goal: 14,
    },
  ];

  const journeyDays = Array.from(
    { length: Math.min(liveDay + 3, challengeLength) },
    (_, i) => i + 1
  );

  const openDay = (day: number) => setDetail({ kind: 'day', day });

  return (
    <div className="min-h-screen overflow-x-hidden pb-28 md:pb-10">
      <AppHeader />

      <main className="mx-auto max-w-5xl px-4 pt-5 sm:px-6 sm:pt-7">

        {/* ── Greeting ─────────────────────────────────────────────── */}
        <div className="mb-5 flex items-center gap-3">
          <Avatar name={student.name} src={student.avatar} size="lg" />
          <div className="min-w-0">
            <p className="text-[12.5px] text-dusk">{greeting},</p>
            <h1 className="font-display text-xl font-bold text-snow truncate">
              {student.name.split(' ')[0]} 👋
            </h1>
            <p className="text-[12px] text-ash">
              Day {liveDay} of {challengeLength} · {student.track}
            </p>
          </div>
        </div>

        <div className="grid min-w-0 gap-5 lg:grid-cols-[1.3fr_1fr]">

          {/* ── Left column ──────────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-5">

            {/* Streak hero card */}
            <section className="relative overflow-hidden rounded-2xl border border-edge bg-card p-5 shadow-card sm:p-6">
              {/* Glow blob */}
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fire/10 blur-2xl" />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
                      DAY {liveDay} OF {challengeLength}
                    </p>
                    {isFirstDay ? (
                      <p className="mt-1.5 font-display text-lg font-bold text-snow">
                        Your streak starts today 🎯
                      </p>
                    ) : currentStreak === 0 ? (
                      <p className="mt-1.5 font-display text-lg font-bold text-snow">
                        Streak reset — start fresh today
                      </p>
                    ) : (
                      <div className="mt-1.5 flex items-baseline gap-2">
                        <span className="font-mono text-[3.5rem] font-bold leading-none text-fire">
                          {currentStreak}
                        </span>
                        <div>
                          <Flame size={20} className="text-fire" />
                          <p className="font-mono text-[11px] text-fire-light">day streak</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="rounded-full border border-win/30 bg-win/10 px-3 py-1.5 text-center">
                    <p className="font-mono text-[13px] font-bold text-win">{progressPercent}%</p>
                    <p className="text-[9px] text-dusk">done</p>
                  </div>
                </div>

                {isFirstDay && (
                  <p className="mt-1.5 text-[13px] text-ash">Your first build starts here. No experience needed.</p>
                )}
                {!isFirstDay && currentStreak === 0 && (
                  <p className="mt-1 text-[13px] text-ash">
                    Missing one day doesn't erase your progress — {completedDays} days already completed.
                  </p>
                )}

                {/* Weekly strip */}
                <div className="mt-5">
                  <WeeklyStrip days={weekly} />
                </div>

                {/* Missed day / freeze section */}
                {hasMissedDayThisWeek && (
                  <div className="mt-4 border-t border-edge-subtle pt-4">
                    {freezeUsed ? (
                      <div className="flex items-start gap-2.5 rounded-xl border border-ice/20 bg-ice-soft/60 p-3">
                        <Snowflake size={15} className="mt-0.5 shrink-0 text-ice" />
                        <p className="text-[12.5px] leading-relaxed text-ash">
                          <span className="font-semibold text-snow">Streak protected.</span>{' '}
                          Saturday won't break your streak.{' '}
                          {freezesRemaining} freeze{freezesRemaining === 1 ? '' : 's'} left this month.
                        </p>
                      </div>
                    ) : canUseFreeze ? (
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <Snowflake size={14} className="mt-0.5 shrink-0 text-ice" />
                          <p className="text-[12.5px] text-ash">
                            <span className="font-medium text-snow">Missed a day?</span>{' '}
                            Use a Streak Freeze — {freezesRemaining} left.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={useStreakFreeze}
                          className="shrink-0 rounded-full border border-ice/30 bg-ice-soft/70 px-3 py-2 text-[12px] font-semibold text-ice transition-colors hover:bg-ice/10 active:scale-[0.97]"
                        >
                          Use freeze
                        </button>
                      </div>
                    ) : (
                      <p className="text-[12.5px] text-ash">
                        Out of freezes — build today to start a fresh streak.
                      </p>
                    )}
                  </div>
                )}

                {/* Progress bar */}
                <div className="mt-5">
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-edge-subtle">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand to-win transition-all duration-700"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-dusk">
                    {completedDays}/{challengeLength} days · {progressPercent}% complete
                  </p>
                </div>
              </div>
            </section>

            {/* Today's task */}
            {todayTask && (
              <section className="rounded-2xl border border-edge bg-card p-5 shadow-card sm:p-6">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
                    Today's Build
                  </p>
                  {todayDone && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-win/25 bg-win/10 px-2.5 py-1 text-[11px] font-semibold text-win">
                      <CheckCircle2 size={11} /> Done
                    </span>
                  )}
                </div>
                <h2 className="mt-2.5 font-display text-[1.25rem] font-bold leading-snug text-snow">
                  {todayTask.title}
                </h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Pill icon={Clock} color="text-ash">{todayTask.estimatedTime}</Pill>
                  <Pill icon={Target} color="text-ash">{todayTask.difficulty}</Pill>
                  <Pill icon={Puzzle} color="text-brand">{todayTask.track}</Pill>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ash line-clamp-2">
                  {todayTask.description}
                </p>
                <Link
                  to={`/day/${liveDay}`}
                  className={`mt-4 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-[14px] font-semibold transition-all active:scale-[0.97] ${
                    todayDone
                      ? 'border border-edge text-snow hover:bg-layer'
                      : 'bg-brand text-white shadow-glow-brand hover:scale-[1.01]'
                  }`}
                >
                  {todayDone ? 'View submission' : 'Continue Day ' + liveDay}
                  <ArrowRight size={15} />
                </Link>
              </section>
            )}

            {/* Streak nudge — if not done */}
            {!todayDone && !isFirstDay && (
              <section className="flex items-center justify-between gap-3 rounded-2xl border border-fire/20 bg-fire-soft/60 px-4 py-3.5">
                <div>
                  <p className="text-[14px] font-semibold text-snow">Keep the Streak Alive</p>
                  <p className="text-[12px] text-ash">1 build away from extending your streak.</p>
                </div>
                <Link
                  to={`/day/${liveDay}`}
                  className="shrink-0 text-[13px] font-semibold text-fire"
                >
                  Day {liveDay} →
                </Link>
              </section>
            )}

            {/* Your journey */}
            <section id="journey" className="min-w-0 scroll-mt-20">
              <SectionLabel icon={Compass}>Your journey</SectionLabel>
              <p className="mt-1 text-[12px] text-dusk">
                Every day from Day 1 — tap any card to see the brief.
              </p>
              <div className="mt-3 flex min-w-0 gap-2 overflow-x-auto pb-1 no-scrollbar">
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
          </div>

          {/* ── Right column ───────────────────────────────────────── */}
          <div className="flex min-w-0 flex-col gap-5">

            {/* Quick stats */}
            <section>
              <SectionLabel icon={ListChecks}>Quick stats</SectionLabel>
              <p className="mt-1 text-[12px] text-dusk">Tap a stat to learn more.</p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <StatCard
                  icon={ListChecks}
                  value={String(completedDays)}
                  label="Days completed"
                  accent="win"
                  onClick={() => setDetail({ kind: 'stat', key: 'completed' })}
                />
                <StatCard
                  icon={Flame}
                  value={String(currentStreak)}
                  label="Current streak"
                  accent="fire"
                  onClick={() => setDetail({ kind: 'stat', key: 'streak' })}
                />
                <StatCard
                  icon={Percent}
                  value={`${progressPercent}%`}
                  label="Completion"
                  accent="brand"
                  onClick={() => setDetail({ kind: 'stat', key: 'completion' })}
                />
                <StatCard
                  icon={Trophy}
                  value={`#${student.standing}`}
                  label="Standing"
                  accent="gem"
                  onClick={() => setDetail({ kind: 'stat', key: 'standing' })}
                />
              </div>
            </section>

            {/* Recruiter Radar */}
            <RecruiterRadar
              score={student.visibilityScore}
              profileViews={student.profileViews}
              recruiterSearches={student.recruiterSearches}
              linkedinPosts={student.linkedinPosts}
              weeklyViewsChange={student.weeklyViewsChange}
              streakDays={currentStreak}
            />

            {/* Achievements */}
            <section>
              <SectionLabel icon={Medal}>Achievements</SectionLabel>
              <p className="mt-1 text-[12px] text-dusk">Tap a badge to see how to unlock it.</p>
              <div className="mt-3 flex min-w-0 gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {achievements.map((a) => (
                  <AchievementCard
                    key={a.label}
                    icon={a.icon}
                    label={a.label}
                    unlocked={a.unlocked}
                    onClick={() => setDetail({ kind: 'achievement', key: a.key })}
                  />
                ))}
              </div>
            </section>

            {/* Live GitHub */}
            <GithubActivityCard username={student.githubUsername} />

            {/* Up next */}
            {nextDay && todayDone && (
              <section className="rounded-2xl border border-edge bg-card p-4 shadow-card">
                <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">Up Next</p>
                <p className="mt-1.5 font-display text-[15px] font-semibold text-snow">
                  Day {nextDay.day} — {nextDay.title}
                </p>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-dusk">
                  <TrendingUp size={11} /> Unlocks after you complete today
                </p>
              </section>
            )}

            {/* 60-day progress grid */}
            <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
                60-Day Grid
              </p>
              <p className="mt-0.5 text-[12px] text-ash">Tap any square to revisit that day.</p>
              <div className="mt-4 overflow-x-auto no-scrollbar">
                <ContributionGrid
                  total={challengeLength}
                  completed={completedDays}
                  liveDay={liveDay}
                  liveDone={todayDone}
                  onDayClick={openDay}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <BottomNav />

      {/* ── Detail sheets ──────────────────────────────────────────── */}
      {detail?.kind === 'day' && (
        <DayDetailSheet
          day={detail.day}
          status={getDayStatus(detail.day)}
          liveDay={liveDay}
          submission={getSubmission(detail.day)}
          onClose={() => setDetail(null)}
        />
      )}
      {detail?.kind === 'stat' && (
        <StatDetailSheet
          statKey={detail.key}
          values={{
            completedDays,
            currentStreak,
            progressPercent,
            standing: student.standing,
            totalStudents: student.totalStudents,
          }}
          onClose={() => setDetail(null)}
        />
      )}
      {detail?.kind === 'achievement' && (
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

/* ── Sub-components ─────────────────────────────────────────────────── */

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-dusk">
      <Icon size={12} />
      {children}
    </div>
  );
}

function Pill({
  icon: Icon,
  children,
  color = 'text-ash',
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border border-edge bg-layer px-2.5 py-1 text-[12px] font-medium ${color}`}>
      <Icon size={12} />
      {children}
    </span>
  );
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

/* ── Day detail sheet ─────────────────────────────────────────────── */
function DayDetailSheet({
  day,
  status,
  liveDay,
  submission,
  onClose,
}: {
  day: number;
  status: 'done' | 'today' | 'locked';
  liveDay: number;
  submission?: { github: string; linkedin: string; submittedAt: string };
  onClose: () => void;
}) {
  const data = getDayData(day);
  const accentMap = { done: 'win' as const, today: 'fire' as const, locked: 'brand' as const };

  return (
    <DetailSheet
      open
      onClose={onClose}
      eyebrow={`Day ${day}${status === 'today' ? ' · Today' : ''}`}
      title={data?.title ?? (status === 'locked' ? 'Not unlocked yet' : 'Untitled build')}
      accent={accentMap[status]}
    >
      {data && (
        <div className="mb-4 flex flex-wrap gap-2">
          <Pill icon={Clock} color="text-ash">{data.estimatedTime}</Pill>
          <Pill icon={Target} color="text-ash">{data.difficulty}</Pill>
          <Pill icon={Puzzle} color="text-brand">{data.track}</Pill>
        </div>
      )}

      {data ? (
        <p className="text-[14px] leading-relaxed text-ash">{data.description}</p>
      ) : (
        <p className="text-[14px] leading-relaxed text-ash">
          Content for this day hasn't been published yet — check back as the challenge continues.
        </p>
      )}

      {data && data.requirements.length > 0 && (
        <ul className="mt-4 flex flex-col gap-2">
          {data.requirements.map((r) => (
            <li key={r} className="flex items-start gap-2 text-[13px] text-snow">
              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-win" />
              {r}
            </li>
          ))}
        </ul>
      )}

      {status === 'locked' && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand/20 bg-brand-soft/60 p-3.5">
          <Lock size={14} className="mt-0.5 shrink-0 text-brand" />
          <p className="text-[13px] leading-relaxed text-ash">
            Unlocks once you finish Day {liveDay}
            {day > liveDay + 1
              ? `, and the ${day - liveDay - 1} day${day - liveDay - 1 === 1 ? '' : 's'} after it`
              : ''}.
          </p>
        </div>
      )}

      {status !== 'locked' && submission && (
        <div className="mt-5 rounded-xl border border-edge bg-layer/60 p-3.5">
          <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
            Submitted · {formatDate(submission.submittedAt)}
          </p>
          <div className="mt-2.5 flex flex-col gap-2">
            <SubmittedLink icon={GitCommitVertical} url={submission.github} />
            <SubmittedLink icon={Share2} url={submission.linkedin} />
          </div>
        </div>
      )}

      {status !== 'locked' && !submission && (
        <div className="mt-5 rounded-xl border border-edge bg-layer/60 p-3.5">
          <p className="text-[13px] text-ash">
            {status === 'today'
              ? 'Not submitted yet — you can still complete it today.'
              : 'This day is marked complete but no submission link was saved.'}
          </p>
        </div>
      )}

      {status === 'today' && (
        <Link
          to={`/day/${day}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-[14px] font-semibold text-white shadow-glow-brand"
        >
          Go to Day {day} <ArrowRight size={15} />
        </Link>
      )}
      {status === 'done' && (
        <Link
          to={`/day/${day}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-edge px-5 py-3 text-[14px] font-semibold text-snow hover:bg-layer"
        >
          Open full page <ExternalLink size={14} />
        </Link>
      )}
    </DetailSheet>
  );
}

/* ── Stat detail sheet ────────────────────────────────────────────── */
const STAT_INFO: Record<
  'completed' | 'streak' | 'completion' | 'standing',
  {
    title: string;
    body: (v: {
      completedDays: number;
      currentStreak: number;
      progressPercent: number;
      standing: number;
      totalStudents: number;
    }) => string;
  }
> = {
  completed: {
    title: 'Days completed',
    body: (v) =>
      `You've submitted proof of work for ${v.completedDays} day${v.completedDays === 1 ? '' : 's'} of the 60-day challenge. This counts every day you've submitted, streak or not.`,
  },
  streak: {
    title: 'Current streak',
    body: (v) =>
      v.currentStreak > 0
        ? `You've submitted ${v.currentStreak} day${v.currentStreak === 1 ? '' : 's'} in a row. Miss one and this resets to 0 — unless you protect it with a Streak Freeze.`
        : `Your streak is at 0. Submit today's build to start a new one — a missed day doesn't erase days you've already completed.`,
  },
  completion: {
    title: 'Completion',
    body: (v) =>
      `${v.progressPercent}% of the 60-day challenge done — that's ${v.completedDays} days completed out of 60.`,
  },
  standing: {
    title: 'Your standing',
    body: (v) =>
      `You're ranked #${v.standing} out of ${v.totalStudents.toLocaleString()} students based on days completed and streak length.`,
  },
};

function StatDetailSheet({
  statKey,
  values,
  onClose,
}: {
  statKey: 'completed' | 'streak' | 'completion' | 'standing';
  values: {
    completedDays: number;
    currentStreak: number;
    progressPercent: number;
    standing: number;
    totalStudents: number;
  };
  onClose: () => void;
}) {
  const info = STAT_INFO[statKey];
  return (
    <DetailSheet open onClose={onClose} eyebrow="Quick Stat" title={info.title} accent="brand">
      <p className="text-[14px] leading-relaxed text-ash">{info.body(values)}</p>
    </DetailSheet>
  );
}

/* ── Achievement detail sheet ────────────────────────────────────── */
function AchievementDetailSheet({
  achievement,
  completedDays,
  currentStreak,
  onClose,
}: {
  achievement: {
    label: string;
    description: string;
    unlocked: boolean;
    goal: number;
    key: string;
  };
  completedDays: number;
  currentStreak: number;
  onClose: () => void;
}) {
  const isStreakBased = achievement.key === 'streak-7';
  const progressValue = isStreakBased ? currentStreak : completedDays;
  const pct = Math.min(100, Math.round((progressValue / achievement.goal) * 100));

  return (
    <DetailSheet
      open
      onClose={onClose}
      eyebrow="Achievement"
      title={achievement.label}
      accent="gem"
    >
      <p className="text-[14px] leading-relaxed text-ash">{achievement.description}</p>
      <div className="mt-5">
        <div className="flex justify-between text-[12px] text-dusk">
          <span>{achievement.unlocked ? 'Unlocked' : 'Progress'}</span>
          <span className="font-mono">
            {Math.min(progressValue, achievement.goal)}/{achievement.goal}
          </span>
        </div>
        <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-edge-subtle">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              achievement.unlocked ? 'bg-gem' : 'bg-edge'
            }`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
      {achievement.unlocked && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-gem/25 bg-gem-soft/60 p-3">
          <Zap size={15} className="shrink-0 text-gem" />
          <p className="text-[13px] font-medium text-gem-light">Unlocked — well done.</p>
        </div>
      )}
    </DetailSheet>
  );
}

/* ── Submitted link row ────────────────────────────────────────────── */
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
      className="flex items-center gap-2.5 rounded-xl border border-edge bg-card px-3.5 py-3 text-[12.5px] text-snow transition-colors hover:border-win/30"
    >
      <Icon size={14} className="shrink-0 text-win" />
      <span className="min-w-0 flex-1 truncate">{url}</span>
      <ExternalLink size={12} className="ml-auto shrink-0 text-dusk" />
    </a>
  );
}
