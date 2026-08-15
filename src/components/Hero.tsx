"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The opening frame — as close to 100vh as the viewport allows.
 *
 * There is no video element here anymore: the site-wide scroll-driven film
 * (ScrollFrameBackground) sits fixed behind the whole page, so the hero simply
 * shows the film's first frame through a light legibility scrim. Nothing plays
 * on its own — the film only advances as the user scrolls.
 *
 * The headline resolves from blurred + lowered to sharp + settled, one line at
 * a time. On scroll, the whole hero gently drifts up and dims — handing off to
 * the next section rather than cutting.
 */
export default function Hero() {
  const { hero, site, ui } = useContent();
  const scope = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.set(q(".hero-anim"), { opacity: 1, y: 0, filter: "blur(0px)" });
      } else {
        const tl = gsap.timeline({ delay: 0.35 });
        tl.from(q(".hero-eyebrow"), {
          opacity: 0,
          y: 20,
          duration: 1,
          ease: "power3.out",
        })
          .from(
            q(".hero-line"),
            {
              opacity: 0,
              yPercent: 120,
              filter: "blur(14px)",
              duration: 1.5,
              ease: "power4.out",
              stagger: 0.14,
            },
            "-=0.6"
          )
          .from(
            q(".hero-sub"),
            { opacity: 0, y: 24, duration: 1.2, ease: "power3.out" },
            "-=0.9"
          )
          .from(
            q(".hero-scroll"),
            { opacity: 0, y: 12, duration: 1, ease: "power2.out" },
            "-=0.7"
          );

        // Cinematic hand-off: hero content drifts up and dims on scroll out.
        gsap.to(q(".hero-parallax"), {
          yPercent: -18,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section
      ref={scope}
      id="top"
      className="relative flex h-[100svh] min-h-[600px] w-full items-center justify-center overflow-hidden"
      aria-label={ui.hero.sectionLabel}
    >
      {/* Light legibility scrim over the site-wide film (which is fixed behind).
          Kept subtle so the first frame reads through, with a stronger fade at
          top and bottom for the headline and the hand-off into the next section. */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-transparent to-[#FAF7F2]" />
      </div>

      {/* Headline block */}
      <div className="hero-parallax relative z-10 mx-auto flex w-full max-w-[1400px] flex-col items-center px-6 text-center">
        <p className="hero-anim hero-eyebrow mb-8 text-[11px] uppercase tracking-wide3 text-bone/60">
          {hero.eyebrow}
        </p>

        <h1 className="font-serif text-display font-light tracking-editorial text-bone [text-shadow:0_2px_40px_rgba(0,0,0,0.5)]">
          {hero.headline.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="hero-anim hero-line block will-change-transform">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="hero-anim hero-sub mt-8 max-w-md text-sm leading-relaxed tracking-wide text-bone/75 sm:text-base">
          {hero.subheadline.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#intro"
        aria-label={ui.hero.scrollAria}
        className="hero-anim hero-scroll absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-wide3 text-bone/60">
          {hero.scrollLabel}
        </span>
        <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
          <span className="absolute inset-0 block animate-scroll-line bg-gold" />
        </span>
      </a>

      {/* SEO / a11y: visually-hidden descriptive text */}
      <span className="sr-only">
        {site.name}. {site.description}
      </span>
    </section>
  );
}
