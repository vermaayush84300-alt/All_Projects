import type { LucideIcon } from "lucide-react";

export default function StatCard({
  icon: Icon,
  value,
  label,
  accent = "marigold",
  onClick,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  accent?: "marigold" | "teal" | "coral" | "muted";
  onClick?: () => void;
}) {
  const accentClass = {
    marigold: "text-marigold",
    teal: "text-teal",
    coral: "text-coral",
    muted: "text-muted",
  }[accent];

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
      className={`rounded-2xl border border-ink-600 bg-ink-700 p-4 shadow-card ${
        onClick ? "cursor-pointer transition-transform active:scale-[0.97]" : ""
      }`}
    >
      <Icon size={16} className={`${accentClass} mb-2`} />
      <div className="font-mono text-2xl font-semibold text-paper leading-none">{value}</div>
      <div className="mt-1 text-[13px] text-muted">{label}</div>
    </div>
  );
}
