import { useEffect } from "react";
import { X } from "lucide-react";

/**
 * A mobile-first bottom sheet (centered modal on larger screens) used to show
 * "more information" whenever the student taps a card — a day in their
 * journey, a stat, an achievement. Closes on backdrop click, the X button,
 * or Escape.
 */
export default function DetailSheet({
  open,
  onClose,
  eyebrow,
  title,
  accent = "marigold",
  children,
}: {
  open: boolean;
  onClose: () => void;
  eyebrow?: string;
  title: string;
  accent?: "marigold" | "teal" | "violet" | "coral" | "frost";
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const accentClass = {
    marigold: "bg-marigold",
    teal: "bg-teal",
    violet: "bg-violet",
    coral: "bg-coral",
    frost: "bg-frost",
  }[accent];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-3xl border border-ink-600 bg-ink-700 shadow-card animate-pop sm:max-w-md sm:rounded-2xl">
        <div className={`h-1 w-full ${accentClass}`} />
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              {eyebrow && (
                <p className="font-mono text-[11px] uppercase tracking-wide text-muted">{eyebrow}</p>
              )}
              <h2 className="mt-1 font-display text-lg font-semibold leading-snug text-paper sm:text-xl">
                {title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-ink-600 hover:text-paper"
            >
              <X size={16} />
            </button>
          </div>
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
