import { Bell, Home, Flame, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Logo from "./Logo";
import Avatar from "./Avatar";
import { defaultStudent } from "../data/student";

const navItems = [
  { label: "Dashboard", icon: Home, to: "/dashboard" },
  { label: "Today's Challenge", icon: Flame, to: `/day/${defaultStudent.currentDay}` },
  { label: "Progress", icon: BarChart3, to: "/dashboard#journey" },
];

export default function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-600/70 bg-ink-800/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6 lg:h-16">
        <div className="flex items-center gap-8">
          <Logo to="/" />
          {/* Desktop / tablet nav — BottomNav takes over below md */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map(({ label, icon: Icon, to }) => {
              const path = to.split("#")[0];
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={to}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                    isActive ? "bg-ink-600 text-paper" : "text-muted hover:bg-ink-700 hover:text-paper"
                  }`}
                >
                  <Icon size={15} className={isActive ? "text-marigold" : ""} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-ink-600 hover:text-paper focus-visible:bg-ink-600"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </button>
          <Link to="/dashboard" aria-label="Your profile" className="flex items-center gap-2.5">
            <Avatar name={defaultStudent.name} src={defaultStudent.avatar} size="sm" />
            <span className="hidden text-[13.5px] font-medium text-paper lg:inline">{defaultStudent.name}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
