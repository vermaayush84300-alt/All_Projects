import { Link } from "react-router-dom";

export default function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} className="flex items-center gap-2 shrink-0" aria-label="ABTalks home">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-marigold text-white font-display font-bold text-sm">
        AB
      </span>
      <span className="font-display font-semibold text-[17px] tracking-tight text-paper">
        ABTalks
      </span>
    </Link>
  );
}
