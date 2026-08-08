interface ContributionGridProps {
  total: number;
  completed: number;
  liveDay: number;
  liveDone: boolean;
  size?: "sm" | "md";
  onDayClick?: (day: number) => void;
}

/**
 * The signature visual of the product: a GitHub-contribution-style grid
 * standing in for the 60-day challenge. Each square is a day. This is the
 * one visual idea reused across the landing hero, dashboard progress card,
 * and challenge day header — it's literally what a student's proof-of-work
 * looks like, so it doubles as both metaphor and functional progress bar.
 *
 * Fully fluid by design: squares are a fixed size and `auto-fill` lets the
 * browser decide how many columns fit the *actual* container width, at any
 * viewport from a 390px phone up to an ultra-wide monitor. This avoids the
 * two failure modes of a hardcoded column count — a cramped little block on
 * wide screens, or squares spilling past the container on narrow ones.
 *
 * Squares for Day 1 through today are clickable (when onDayClick is passed),
 * giving the student access to every past day's details from Day 1 onward.
 */
export default function ContributionGrid({
  total,
  completed,
  liveDay,
  liveDone,
  size = "md",
  onDayClick,
}: ContributionGridProps) {
  const cellPx = size === "sm" ? 7 : 9;
  const gapPx = size === "sm" ? 3 : 4;
  const cell = size === "sm" ? "h-[7px] w-[7px]" : "h-[9px] w-[9px]";

  const squares = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div
      className="grid w-full content-start"
      style={{
        gridTemplateColumns: `repeat(auto-fill, ${cellPx}px)`,
        gap: `${gapPx}px`,
      }}
      role="img"
      aria-label={`${completed} of ${total} days completed`}
    >
      {squares.map((day) => {
        const isToday = day === liveDay;
        const isDone = day < liveDay || (isToday && liveDone);
        let classes = `${cell} rounded-[2px] transition-colors duration-300 `;
        if (isDone) {
          classes += "bg-teal shadow-[0_0_6px_rgba(34,197,94,0.55)]";
        } else if (isToday) {
          classes += "bg-marigold animate-pulse-slow shadow-[0_0_8px_rgba(47,125,255,0.65)]";
        } else {
          classes += "bg-ink-500";
        }

        const clickable = Boolean(onDayClick) && day <= liveDay;
        if (clickable) {
          classes += " cursor-pointer hover:scale-125 hover:z-10 relative";
        }

        if (clickable) {
          return (
            <button
              key={day}
              type="button"
              aria-label={`Day ${day}${isDone ? ", completed" : isToday ? ", today" : ""}`}
              onClick={() => onDayClick?.(day)}
              className={classes}
              style={{ padding: 0, border: "none" }}
            />
          );
        }
        return <span key={day} className={classes} />;
      })}
    </div>
  );
}
