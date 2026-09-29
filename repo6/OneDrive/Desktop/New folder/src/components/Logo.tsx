import { Link } from 'react-router-dom';

export default function Logo({ to = '/' }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 shrink-0" aria-label="ABTalks home">
      <span className="relative grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-dim font-display font-bold text-[13px] text-white shadow-glow-brand">
        AB
      </span>
      <span className="font-display font-semibold text-[17px] tracking-tight text-snow">
        AB<span className="text-brand">Talks</span>
      </span>
    </Link>
  );
}
