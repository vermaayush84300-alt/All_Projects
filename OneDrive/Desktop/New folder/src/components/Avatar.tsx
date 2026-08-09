import { initials } from '../data/student';

export default function Avatar({
  name,
  src,
  size = 'md',
}: {
  name: string | null | undefined;
  src?: string | null;
  size?: 'sm' | 'md' | 'lg';
}) {
  const sizeMap = {
    sm: 'h-8 w-8 text-[11px]',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base',
  };
  const ringMap = {
    sm: 'ring-2',
    md: 'ring-2',
    lg: 'ring-2',
  };
  const displayName = name?.trim() || 'Student';

  if (src) {
    return (
      <img
        src={src}
        alt={displayName}
        className={`${sizeMap[size]} ${ringMap[size]} rounded-full object-cover ring-edge ring-offset-2 ring-offset-[#07090F]`}
      />
    );
  }

  return (
    <div
      className={`${sizeMap[size]} ${ringMap[size]} grid place-items-center rounded-full bg-gradient-to-br from-brand-soft to-layer ring-brand/40 ring-offset-2 ring-offset-[#07090F] font-display font-bold text-brand-light`}
      aria-label={displayName}
    >
      {initials(displayName)}
    </div>
  );
}
