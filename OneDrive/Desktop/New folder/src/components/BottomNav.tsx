import { Home, Flame, BarChart3, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { defaultStudent } from "../data/student";

const items = [
  { label: "Home", icon: Home, to: "/dashboard" },
  { label: "Challenge", icon: Flame, to: `/day/${defaultStudent.currentDay}` },
  { label: "Progress", icon: BarChart3, to: "/dashboard" },
  { label: "Profile", icon: User, to: "/dashboard" },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-600/70 bg-ink-800/95 backdrop-blur-md safe-bottom md:hidden"
      aria-label="Primary"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-2">
        {items.map(({ label, icon: Icon, to }) => {
          const isActive =
            (to === "/dashboard" && location.pathname === "/dashboard") ||
            (to.startsWith("/day") && location.pathname.startsWith("/day"));
          return (
            <Link
              key={label}
              to={to}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.4 : 1.8}
                className={isActive ? "text-marigold" : "text-muted"}
              />
              <span className={isActive ? "text-marigold" : "text-muted"}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
