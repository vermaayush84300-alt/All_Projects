import type { LucideIcon } from 'lucide-react';

type Accent = 'brand' | 'win' | 'fire' | 'gem' | 'ash';

const accentMap: Record<Accent, { text: string; bg: string; bar: string }> = {
  brand: { text: 'text-brand', bg: 'bg-brand-soft', bar: 'bg-brand' },
  win:   { text: 'text-win',   bg: 'bg-win-soft',   bar: 'bg-win'   },
  fire:  { text: 'text-fire',  bg: 'bg-fire-soft',  bar: 'bg-fire'  },
  gem:   { text: 'text-gem',   bg: 'bg-gem-soft',   bar: 'bg-gem'   },
  ash:   { text: 'text-ash',   bg: 'bg-layer',      bar: 'bg-ash'   },
};

export default function StatCard({
  icon: Icon,
  value,
  label,
  accent = 'brand',
  onClick,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  accent?: Accent;
  onClick?: () => void;
}) {
  const a = accentMap[accent];

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`relative overflow-hidden rounded-2xl border border-edge bg-card p-4 shadow-card ${
        onClick ? 'cursor-pointer transition-transform active:scale-[0.97] hover:border-edge-strong' : ''
      }`}
    >
      {/* Accent bar at top */}
      <div className={`absolute inset-x-0 top-0 h-[2px] ${a.bar} opacity-70`} />
      <div className={`mb-2.5 grid h-8 w-8 place-items-center rounded-xl ${a.bg}`}>
        <Icon size={15} className={a.text} />
      </div>
      <div className="font-mono text-[1.6rem] font-bold leading-none text-snow">{value}</div>
      <div className="mt-1 text-[12px] text-ash">{label}</div>
    </div>
  );
}
