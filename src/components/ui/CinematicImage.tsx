"use client";

import Image from "next/image";
import { useState } from "react";
import Placeholder from "./Placeholder";
import { useContent } from "@/lib/content-context";

/**
 * The single image primitive used across the site.
 *
 *  - No `src` (the default while there are no real assets) → renders a
 *    cinematic {@link Placeholder}. The site is fully navigable with zero files.
 *  - A `src` is provided → renders an optimized, lazy-loaded next/image with
 *    `fill`. If that file 404s or fails, it gracefully falls back to the
 *    placeholder instead of showing a broken image.
 *
 *  All images ship with a subtle scale-on-hover and a grain+vignette overlay so
 *  even real photography keeps the editorial, cinematic tone.
 */
type CinematicImageProps = {
  src?: string;
  alt: string;
  tint?: [string, string];
  label?: string;
  kicker?: string;
  sizes?: string;
  priority?: boolean;
  /** Enable the slow scale-on-hover microinteraction. */
  interactive?: boolean;
  className?: string;
  overlayClassName?: string;
};

export default function CinematicImage({
  src,
  alt,
  tint,
  label,
  kicker,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  interactive = true,
  className = "",
  overlayClassName = "",
}: CinematicImageProps) {
  const { ui } = useContent();
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div className={`relative h-full w-full overflow-hidden bg-ink-800 ${className}`}>
      <div
        className={`absolute inset-0 h-full w-full ${
          interactive
            ? "transition-transform duration-[1200ms] ease-lux will-change-transform group-hover:scale-[1.04]"
            : ""
        }`}
      >
        {showImage ? (
          <Image
            src={src as string}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            onError={() => setFailed(true)}
          />
        ) : (
          <Placeholder
            tint={tint}
            label={label}
            kicker={kicker ?? ui.media.placeholder}
          />
        )}
      </div>

      {/* Cinematic grade layer kept above the image so photos match placeholders. */}
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_40%,transparent_55%,#000000aa)] ${overlayClassName}`}
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-60" />
    </div>
  );
}
