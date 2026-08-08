import { Check, X, Snowflake } from "lucide-react";
import type { WeeklyDot } from "../lib/useChallengeState";

export default function WeeklyStrip({ days }: { days: WeeklyDot[] }) {
  return (
    <div className="grid grid-cols-7 gap-1 sm:gap-2">
      {days.map((d, i) => (
        <div key={i} className="flex min-w-0 flex-col items-center gap-1 sm:gap-1.5">
          <span className="text-[10px] font-medium text-muted sm:text-[11px] md:text-xs">{d.label}</span>
          <Dot state={d.state} />
        </div>
      ))}
    </div>
  );
}

function Dot({ state }: { state: WeeklyDot["state"] }) {
  const base =
    "grid aspect-square w-full max-w-8 place-items-center rounded-full transition-transform duration-200 sm:max-w-9 md:max-w-10";

  if (state === "done") {
    return (
      <div className={`${base} bg-teal/20 text-teal ring-1 ring-teal/40`}>
        <Check size={13} strokeWidth={3} />
      </div>
    );
  }
  if (state === "missed") {
    return (
      <div className={`${base} bg-ink-600 text-muted ring-1 ring-ink-500`} aria-label="Missed">
        <X size={12} strokeWidth={2.5} />
      </div>
    );
  }
  if (state === "frozen") {
    return (
      <div
        className={`${base} bg-frost/15 text-frost ring-1 ring-frost/50`}
        aria-label="Protected with a Streak Freeze"
      >
        <Snowflake size={13} strokeWidth={2.5} />
      </div>
    );
  }
  if (state === "today") {
    return (
      <div className={`${base} bg-marigold/15 ring-2 ring-marigold animate-pulse-slow`}>
        <span className="h-1.5 w-1.5 rounded-full bg-marigold" />
      </div>
    );
  }
  return <div className={`${base} border border-dashed border-ink-500`} />;
}
