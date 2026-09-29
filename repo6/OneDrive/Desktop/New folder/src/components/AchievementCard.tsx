import type { LucideIcon } from 'lucide-react';
import { Lock } from 'lucide-react';

export default function AchievementCard({
  icon: Icon,
  label,
  unlocked,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  unlocked: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl border p-3.5 text-center transition-all active:scale-[0.96] ${
        unlocked
          ? 'border-gem/30 bg-gem-soft/60 shadow-glow-gem'
          : 'border-edge bg-card opacity-60'
      }`}
    >
      <div
        className={`relative grid h-11 w-11 place-items-center rounded-full ${
          unlocked ? 'bg-gem/15 text-gem' : 'bg-layer text-dusk'
        }`}
      >
        {unlocked ? <Icon size={20} /> : <Lock size={16} />}
        {unlocked && (
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-gem border-2 border-base" />
        )}
      </div>
      <span
        className={`text-[11px] font-medium leading-tight ${
          unlocked ? 'text-gem-light' : 'text-dusk'
        }`}
      >
        {label}
      </span>
    </button>
  );
}
