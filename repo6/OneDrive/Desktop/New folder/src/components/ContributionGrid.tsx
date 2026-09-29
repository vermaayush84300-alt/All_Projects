interface ContributionGridProps {
  total: number;
  completed: number;
  liveDay: number;
  liveDone: boolean;
  size?: 'sm' | 'md';
  onDayClick?: (day: number) => void;
}

/**
 * Signature visual — a GitHub-style 60-day grid.
 * Done cells glow green. Today's cell pulses amber.
 * Clickable on the dashboard so students can revisit past days.
 */
export default function ContributionGrid({
  total,
  completed,
  liveDay,
  liveDone,
  size = 'md',
  onDayClick,
}: ContributionGridProps) {
  const cellPx = size === 'sm' ? 8 : 10;
  const gapPx = size === 'sm' ? 3 : 4;
  const cellClass = size === 'sm' ? 'h-2 w-2' : 'h-2.5 w-2.5';

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
        const isFuture = day > liveDay;

        let cls = `${cellClass} rounded-[2px] transition-all duration-300 `;

        if (isDone) {
          cls += 'bg-win shadow-[0_0_5px_rgba(34,197,94,0.6)]';
        } else if (isToday) {
          cls += 'bg-fire animate-pulse-slow shadow-[0_0_8px_rgba(251,146,60,0.7)]';
        } else if (isFuture) {
          cls += 'bg-edge-subtle';
        } else {
          cls += 'bg-edge';
        }

        const clickable = Boolean(onDayClick) && day <= liveDay;
        if (clickable) cls += ' cursor-pointer hover:scale-125 hover:z-10 relative';

        if (clickable) {
          return (
            <button
              key={day}
              type="button"
              aria-label={`Day ${day}${isDone ? ', completed' : isToday ? ', today' : ''}`}
              onClick={() => onDayClick?.(day)}
              className={cls}
              style={{ padding: 0, border: 'none' }}
            />
          );
        }
        return <span key={day} className={cls} />;
      })}
    </div>
  );
}
