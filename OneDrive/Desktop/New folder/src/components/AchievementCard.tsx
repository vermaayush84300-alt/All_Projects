import type { LucideIcon } from "lucide-react";
import { Lock } from "lucide-react";

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
    <div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
      className={`flex w-[92px] shrink-0 flex-col items-center gap-2 rounded-2xl border p-3 text-center sm:w-[104px] sm:p-3.5 ${
        onClick ? "cursor-pointer transition-transform active:scale-[0.97]" : ""
      } ${unlocked ? "border-marigold/30 bg-ink-700 shadow-card" : "border-ink-600 bg-ink-700/40"}`}
    >
      <div
        className={`grid h-11 w-11 place-items-center rounded-full ${
          unlocked ? "bg-marigold/15 text-marigold" : "bg-ink-600 text-muted"
        }`}
      >
        {unlocked ? <Icon size={20} /> : <Lock size={17} />}
      </div>
      <span className={`text-[11.5px] font-medium leading-tight ${unlocked ? "text-paper" : "text-muted"}`}>
        {label}
      </span>
    </div>
  );
}
