import { Bell, Home, Flame, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';
import Avatar from './Avatar';
import { defaultStudent } from '../data/student';

const navItems = [
  { label: 'Home', icon: Home, to: '/dashboard' },
  { label: 'Today', icon: Flame, to: `/day/${defaultStudent.currentDay}` },
  { label: 'Progress', icon: BarChart3, to: '/dashboard#journey' },
];

export default function AppHeader() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-30 border-b border-edge-subtle glass">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo to="/" />
          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {navItems.map(({ label, icon: Icon, to }) => {
              const path = to.split('#')[0];
              const isActive = location.pathname === path;
              return (
                <Link
                  key={label}
                  to={to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-medium transition-all ${
                    isActive
                      ? 'bg-brand/10 text-brand border border-brand/20'
                      : 'text-ash hover:bg-layer hover:text-snow'
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            className="relative grid h-9 w-9 place-items-center rounded-full text-ash transition-colors hover:bg-layer hover:text-snow"
            aria-label="Notifications"
          >
            <Bell size={17} />
            {/* Notification dot */}
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-fire" />
          </button>
          <Link to="/dashboard" aria-label="Your profile" className="flex items-center gap-2.5">
            <Avatar name={defaultStudent.name} src={defaultStudent.avatar} size="sm" />
            <span className="hidden text-[13px] font-medium text-snow lg:inline">
              {defaultStudent.name.split(' ')[0]}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
