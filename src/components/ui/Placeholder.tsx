/**
 * A deliberately handsome placeholder. Renders a dark, cinematic two-stop
 * gradient with a soft radial "light source", film grain and a small caption
 * marking it as a stand-in. It is designed to look intentional — the site
 * reads as finished even before a single real photograph is added.
 *
 *   Drop a real file at the documented /media path and set the `image` field
 *   in src/lib/content/shared.ts to replace any placeholder — no component
 *   changes, and it applies to all three languages at once.
 */
type PlaceholderProps = {
  tint?: [string, string];
  label?: string;
  /** Small "MACRO / PHOTO" style kicker shown above the label. Translated by
   *  the caller — CinematicImage falls back to `ui.media.placeholder`. */
  kicker?: string;
  className?: string;
  rounded?: boolean;
};

export default function Placeholder({
  tint = ["#161418", "#3a3540"],
  label,
  kicker,
  className = "",
  rounded = false,
}: PlaceholderProps) {
  return (
    <div
      aria-hidden="true"
      className={`relative h-full w-full overflow-hidden ${
        rounded ? "rounded-[2px]" : ""
      } ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 30% 20%, ${tint[1]}, transparent 60%), linear-gradient(160deg, ${tint[0]}, #08080a 90%)`,
      }}
    >
      {/* soft moving light */}
      <div
        className="absolute -inset-1/4 opacity-40 animate-drift"
        style={{
          background: `radial-gradient(40% 40% at 60% 40%, ${tint[1]}55, transparent 70%)`,
        }}
      />
      {/* grain */}
      <div className="grain absolute inset-0" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_50%,transparent_55%,#000000aa)]" />

      {(kicker || label) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          {kicker && (
            <span className="text-[10px] uppercase tracking-wide3 text-white/50">
              {kicker}
            </span>
          )}
          {label && (
            <span className="font-serif text-lg italic text-white/80">
              {label}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
