"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import CinematicImage from "./ui/CinematicImage";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Aspect ratios per span type — drives the asymmetric rhythm. */
const ASPECT: Record<string, string> = {
  sm: "aspect-[4/5]",
  md: "aspect-square",
  lg: "aspect-[4/3]",
  tall: "aspect-[3/4]",
};

/**
 * GALLERY — an asymmetric, cinematic composition. Two offset columns, each item
 * drifting at its own parallax speed, revealed from behind a rising mask. It
 * reads as a considered spread, not a uniform grid. On mobile it collapses to a
 * single graceful column with the same reveal.
 */
export default function Gallery() {
  const { gallery, ui } = useContent();
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const left = gallery.items.filter((_, i) => i % 2 === 0);
  const right = gallery.items.filter((_, i) => i % 2 === 1);

  useGSAP(
    () => {
      // Masked reveal for every item.
      gsap.utils.toArray<HTMLElement>(".gal-mask").forEach((el) => {
        if (reduced) {
          gsap.set(el, { clipPath: "inset(0% 0 0 0)" });
          return;
        }
        gsap.fromTo(
          el,
          { clipPath: "inset(100% 0 0 0)" },
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1.3,
            ease: "power3.inOut",
            scrollTrigger: { trigger: el, start: "top 88%" },
          }
        );
      });

      if (reduced) return;

      // Per-item parallax, only where fine-pointer / larger screens.
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".gal-item").forEach((el) => {
          const speed = parseFloat(el.dataset.speed || "1");
          gsap.fromTo(
            el.querySelector(".gal-inner"),
            { yPercent: (speed - 1) * 22 - 8 },
            {
              yPercent: (1 - speed) * 22 + 8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
      });
      return () => mm.revert();
    },
    { scope, dependencies: [reduced] }
  );

  const Column = ({ items, offset }: { items: typeof gallery.items; offset?: boolean }) => (
    <div className={`flex flex-col gap-5 md:gap-8 ${offset ? "md:mt-32" : ""}`}>
      {items.map((item) => (
        <figure key={item.id} className="gal-item group" data-speed={item.speed}>
          <div className="gal-mask overflow-hidden rounded-sm">
            <div className={`gal-inner ${ASPECT[item.span]} will-change-transform`}>
              <CinematicImage
                src={item.image}
                alt={item.caption}
                tint={item.tint}
                kicker={ui.gallery.kicker}
                label={item.caption}
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
          <figcaption className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-wide2 text-bone-faint">
            <span className="h-px w-4 bg-gold/40" />
            {item.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );

  return (
    <section ref={scope} id="galeria" className="relative bg-sand/90 px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-gold/50" />
              <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
                {gallery.eyebrow}
              </span>
            </div>
            <h2 className="font-serif text-display-sm font-light leading-[0.95] tracking-editorial text-ink">
              {gallery.title.map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
          <Column items={left} />
          <Column items={right} offset />
        </div>
      </div>
    </section>
  );
}
