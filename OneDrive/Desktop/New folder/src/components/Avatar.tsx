import { initials } from "../data/student";

export default function Avatar({
  name,
  src,
  size = "md",
}: {
  name: string | null | undefined;
  src?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const dims = size === "sm" ? "h-8 w-8 text-xs" : size === "lg" ? "h-16 w-16 text-xl" : "h-10 w-10 text-sm";
  const displayName = name && name.trim() ? name : "Student";

  if (src) {
    return (
      <img
        src={src}
        alt={displayName}
        className={`${dims} rounded-full object-cover ring-2 ring-ink-600`}
      />
    );
  }

  return (
    <div
      className={`${dims} grid place-items-center rounded-full bg-ink-600 ring-2 ring-ink-500 font-display font-semibold text-marigold`}
      aria-label={displayName}
    >
      {initials(displayName)}
    </div>
  );
}
