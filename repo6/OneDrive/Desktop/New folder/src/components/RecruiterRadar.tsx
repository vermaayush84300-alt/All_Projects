import { TrendingUp, Eye, Search, Share2, Zap } from 'lucide-react';

interface RecruiterRadarProps {
  score: number;        // 0–100
  profileViews: number;
  recruiterSearches: number;
  linkedinPosts: number;
  weeklyViewsChange: number; // percent
  streakDays: number;
}

/**
 * Recruiter Radar — the platform's key innovation.
 *
 * Translates abstract consistency metrics (streak, LinkedIn posts, GitHub commits)
 * into a concrete hiring-outcome signal that students actually care about:
 * "Is anyone in tech noticing me right now?"
 *
 * Data is mocked but emotionally real — it answers the motivating question
 * that every student has after building in public for two weeks.
 */
export default function RecruiterRadar({
  score,
  profileViews,
  recruiterSearches,
  linkedinPosts,
  weeklyViewsChange,
  streakDays,
}: RecruiterRadarProps) {
  const circumference = 2 * Math.PI * 36; // r=36
  const dashOffset = circumference - (score / 100) * circumference;

  const scoreColor =
    score >= 70 ? '#22C55E' : score >= 40 ? '#FB923C' : '#F87171';
  const scoreLabel =
    score >= 70 ? 'Strong' : score >= 40 ? 'Growing' : 'Starting';

  return (
    <section className="rounded-2xl border border-edge bg-card p-4 shadow-card sm:p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <span className="grid h-6 w-6 place-items-center rounded-lg bg-gem-soft">
          <Zap size={13} className="text-gem" />
        </span>
        <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
          Recruiter Radar
        </p>
        <span className="ml-auto rounded-full border border-gem/30 bg-gem-soft/60 px-2 py-0.5 text-[10px] font-medium text-gem">
          BETA
        </span>
      </div>

      {/* Score + ring */}
      <div className="flex items-center gap-5">
        {/* SVG Ring */}
        <div className="relative shrink-0">
          <svg width="96" height="96" viewBox="0 0 96 96" className="-rotate-90">
            {/* Track */}
            <circle
              cx="48" cy="48" r="36"
              fill="none"
              stroke="#1A2333"
              strokeWidth="8"
            />
            {/* Progress */}
            <circle
              cx="48" cy="48" r="36"
              fill="none"
              stroke={scoreColor}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{
                transition: 'stroke-dashoffset 1s ease-out',
                filter: `drop-shadow(0 0 6px ${scoreColor}88)`,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-[22px] font-bold text-snow leading-none">{score}</span>
            <span className="text-[9px] font-medium uppercase tracking-wide text-dusk">{scoreLabel}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          <StatRow icon={Eye} value={profileViews.toLocaleString()} label="Profile views" color="text-ice" />
          <StatRow icon={Search} value={String(recruiterSearches)} label="Recruiter searches" color="text-gem" />
          <StatRow icon={Share2} value={String(linkedinPosts)} label="LinkedIn posts" color="text-brand-light" />
        </div>
      </div>

      {/* Trend + explanation */}
      <div className="mt-4 rounded-xl border border-edge-subtle bg-layer/60 p-3">
        <div className="flex items-center gap-1.5 text-[12px]">
          <TrendingUp size={13} className="text-win" />
          <span className="text-win font-semibold">↑ {weeklyViewsChange}% from last week</span>
        </div>
        <p className="mt-1 text-[11.5px] leading-relaxed text-ash">
          Based on your <span className="text-snow font-medium">{streakDays}-day streak</span> and {linkedinPosts} public posts.
          Keep building — visibility compounds.
        </p>
      </div>
    </section>
  );
}

function StatRow({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={13} className={`shrink-0 ${color}`} />
      <span className="font-mono text-[13px] font-bold text-snow">{value}</span>
      <span className="text-[11px] text-dusk truncate">{label}</span>
    </div>
  );
}
