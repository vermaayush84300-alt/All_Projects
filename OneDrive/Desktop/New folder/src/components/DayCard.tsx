import { Check, Lock } from 'lucide-react';

const statusConfig = {
  done: {
    border: 'border-win/25',
    bg: 'bg-win-soft/40',
    badge: 'bg-win/15 text-win',
  },
  today: {
    border: 'border-fire/35',
    bg: 'bg-fire-soft/50 shadow-glow-fire',
    badge: 'bg-fire/15 text-fire',
  },
  locked: {
    border: 'border-edge',
    bg: 'bg-card/60',
    badge: 'bg-layer text-dusk',
  },
};

export default function DayCard({
  day,
  title,
  status,
  onClick,
}: {
  day: number;
  title?: string;
  status: 'done' | 'today' | 'locked';
  onClick: () => void;
}) {
  const s = statusConfig[status];

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-[76px] shrink-0 flex-col gap-2 rounded-2xl border p-2.5 text-left shadow-card transition-all active:scale-[0.96] sm:w-[88px] sm:p-3 ${s.border} ${s.bg}`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className="font-mono text-[10px] font-semibold text-dusk">
          D{day}
        </span>
        <span className={`grid h-4 w-4 shrink-0 place-items-center rounded-full ${s.badge}`}>
          {status === 'done' && <Check size={9} strokeWidth={3} />}
          {status === 'today' && <span className="h-1.5 w-1.5 rounded-full bg-fire" />}
          {status === 'locked' && <Lock size={8} />}
        </span>
      </div>
      <p
        className={`text-[10.5px] font-medium leading-snug sm:text-[11px] ${
          status === 'locked' ? 'text-dusk' : 'text-snow'
        }`}
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {title ?? (status === 'locked' ? 'Locked' : 'Untitled')}
      </p>
    </button>
  );
}
