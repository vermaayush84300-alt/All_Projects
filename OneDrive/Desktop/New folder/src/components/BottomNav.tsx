import { Home, Flame, BarChart3, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { defaultStudent } from '../data/student';

const items = [
  { label: 'Home', icon: Home, to: '/dashboard' },
  { label: 'Challenge', icon: Flame, to: `/day/${defaultStudent.currentDay}` },
  { label: 'Progress', icon: BarChart3, to: '/dashboard' },
  { label: 'Profile', icon: User, to: '/dashboard' },
];

export default function BottomNav() {
  const location = useLocation();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-edge-subtle glass safe-bottom md:hidden"
      aria-label="Primary navigation"
    >
      <div className="mx-auto flex max-w-md items-stretch justify-between px-1">
        {items.map(({ label, icon: Icon, to }) => {
          const isActive =
            (to === '/dashboard' && location.pathname === '/dashboard') ||
            (to.startsWith('/day') && location.pathname.startsWith('/day'));
          return (
            <Link
              key={label}
              to={to}
              className="flex flex-1 flex-col items-center gap-1 py-3 text-[10.5px] font-medium transition-colors"
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`grid h-7 w-7 place-items-center rounded-xl transition-all ${
                  isActive ? 'bg-brand/15' : ''
                }`}
              >
                <Icon
                  size={19}
                  strokeWidth={isActive ? 2.5 : 1.8}
                  className={isActive ? 'text-brand' : 'text-dusk'}
                />
              </span>
              <span className={isActive ? 'text-brand' : 'text-dusk'}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
