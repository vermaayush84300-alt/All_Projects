import { useEffect } from 'react';
import { X } from 'lucide-react';

type Accent = 'brand' | 'win' | 'fire' | 'gem' | 'ice';

const accentBar: Record<Accent, string> = {
  brand: 'bg-gradient-to-r from-brand to-brand-dim',
  win: 'bg-gradient-to-r from-win to-win-dim',
  fire: 'bg-gradient-to-r from-fire to-fire-dim',
  gem: 'bg-gradient-to-r from-gem to-gem-dim',
  ice: 'bg-gradient-to-r from-ice to-ice-dim',
};

/**
 * Mobile-first bottom sheet, centered modal on larger screens.
 * Drag handle at top, Escape to close, backdrop click closes.
 */
export default function DetailSheet({
  open,
  onClose,
  eyebrow,
  title,
  accent = 'brand',
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  accent?: Accent;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-base/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-3xl border border-edge bg-card shadow-card animate-slide-up sm:max-w-md sm:rounded-2xl">
        {/* Accent top bar */}
        <div className={`h-[3px] w-full rounded-t-3xl sm:rounded-t-2xl ${accentBar[accent]}`} />

        {/* Drag handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-edge-strong" />
        </div>

        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {eyebrow && (
                <p className="font-mono text-[10px] uppercase tracking-widest text-dusk">
                  {eyebrow}
                </p>
              )}
              <h2 className="mt-1 font-display text-lg font-bold leading-snug text-snow sm:text-xl">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-edge text-ash transition-colors hover:border-edge-strong hover:text-snow"
            >
              <X size={15} />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
