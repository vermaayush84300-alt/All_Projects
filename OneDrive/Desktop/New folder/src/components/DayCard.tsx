import { Check, Lock } from "lucide-react";

export default function DayCard({
  day,
  title,
  status,
  onClick,
}: {
  day: number;
  title?: string;
  status: "done" | "today" | "locked";
  onClick: () => void;
}) {
  const styles = {
    done: "border-teal/30 bg-ink-700",
    today: "border-marigold/40 bg-ink-700 shadow-glow",
    locked: "border-ink-600 bg-ink-700/40",
  }[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-20 shrink-0 flex-col gap-1.5 rounded-2xl border p-2.5 text-left shadow-card transition-transform active:scale-[0.97] sm:w-[88px] sm:gap-2 sm:p-3 ${styles}`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-[10px] font-semibold text-muted sm:text-[11px]">DAY {day}</span>
        {status === "done" && (
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-teal/20 text-teal sm:h-5 sm:w-5">
            <Check size={10} strokeWidth={3} />
          </span>
        )}
        {status === "today" && <span className="h-2 w-2 shrink-0 rounded-full bg-marigold animate-pulse-slow" />}
        {status === "locked" && (
          <span className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-ink-600 text-muted sm:h-5 sm:w-5">
            <Lock size={9} />
          </span>
        )}
      </div>
      <p
        className={`text-[11px] font-medium leading-snug sm:text-[12px] ${
          status === "locked" ? "text-muted" : "text-paper"
        }`}
        style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
      >
        {title ?? (status === "locked" ? "Locked" : "Untitled build")}
      </p>
    </button>
  );
}
