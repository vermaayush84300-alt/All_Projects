import { Check, X, Snowflake } from 'lucide-react';
import type { WeeklyDot } from '../lib/useChallengeState';

export default function WeeklyStrip({ days }: { days: WeeklyDot[] }) {
  return (
    <div className="grid grid-cols-7 gap-1.5">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <span className="font-mono text-[10px] font-medium text-dusk">{d.label}</span>
          <Dot state={d.state} />
        </div>
      ))}
    </div>
  );
}

function Dot({ state }: { state: WeeklyDot['state'] }) {
  const base =
    'grid h-9 w-9 place-items-center rounded-full transition-all duration-200';

  if (state === 'done') {
    return (
      <div className={`${base} bg-win/15 text-win ring-1 ring-win/40`}>
        <Check size={14} strokeWidth={3} />
      </div>
    );
  }
  if (state === 'missed') {
    return (
      <div className={`${base} bg-risk/10 text-risk ring-1 ring-risk/30`} aria-label="Missed">
        <X size={13} strokeWidth={2.5} />
      </div>
    );
  }
  if (state === 'frozen') {
    return (
      <div
        className={`${base} bg-ice/10 text-ice ring-1 ring-ice/40`}
        aria-label="Protected with a Streak Freeze"
      >
        <Snowflake size={13} strokeWidth={2.5} />
      </div>
    );
  }
  if (state === 'today') {
    return (
      <div className={`${base} bg-fire/15 ring-2 ring-fire/60 animate-pulse-slow`}>
        <span className="h-2 w-2 rounded-full bg-fire" />
      </div>
    );
  }
  // future
  return <div className={`${base} border border-dashed border-edge`} />;
}
