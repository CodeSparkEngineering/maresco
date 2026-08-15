"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import MagneticButton from "./ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The closing frame. Near-full-height, near-black, a single large line and one
 * action. The headline scales up almost imperceptibly on scroll and the whole
 * panel fades toward the footer — a slow, quiet exit rather than a hard cut.
 */
export default function FinalCTA() {
  const { finalCta, ui } = useContent();
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      gsap.fromTo(
        ".final-headline",
        { scale: 0.96, opacity: 0.7 },
        {
          scale: 1.02,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section
      ref={scope}
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-sand-warm/60 px-6 text-center"
    >
      {/* ambient warm editorial grade */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_120%,rgba(200,169,106,0.08)_0%,transparent_60%)]" />
        <div className="absolute -inset-1/4 animate-drift opacity-20 bg-[radial-gradient(40%_40%_at_50%_60%,rgba(200,169,106,0.12),transparent_70%)]" />
        <div className="grain absolute inset-0 opacity-15" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <h2 className="final-headline font-serif text-display font-light leading-[0.9] tracking-editorial text-ink will-change-transform">
          {finalCta.headline.map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </h2>
        <div className="mt-12">
          <MagneticButton
            href="#reservas"
            variant="outline"
            size="lg"
            cursorLabel={ui.reserve.cursorLabel}
          >
            {finalCta.cta}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
