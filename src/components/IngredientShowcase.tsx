"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import CinematicImage from "./ui/CinematicImage";

/**
 * INGREDIENTS — a horizontal, cinematic film strip.
 *
 * Desktop: the section pins and the panel track translates horizontally as the
 * user scrolls vertically, so each macro ingredient glides in like a slow camera
 * pan. Each image also has a mild counter-parallax for depth.
 *
 * Mobile: the exact same content becomes a clean vertical stack of tall panels
 * with a soft reveal — no pinning, no horizontal gesture, fully touch-native.
 */
export default function IngredientShowcase() {
  const { ingredients, ui } = useContent();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = scope.current?.querySelector<HTMLElement>(".ing-track");
        if (!track) return;

        const distance = () => track.scrollWidth - window.innerWidth;

        const horizontal = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".ing-pin",
            start: "top top",
            end: () => "+=" + distance(),
            scrub: 1,
            pin: ".ing-pin",
            invalidateOnRefresh: true,
          },
        });

        // gentle parallax inside each panel image, driven by the horizontal tween
        gsap.utils.toArray<HTMLElement>(".ing-media").forEach((el) => {
          gsap.fromTo(
            el,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest(".ing-panel") as HTMLElement,
                containerAnimation: horizontal,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });
      });

      return () => mm.revert();
    },
    { scope }
  );

  return (
    <section ref={scope} id="mar" className="relative bg-sand-warm/80">
      {/* ── Desktop: pinned horizontal track ─────────────────────────────── */}
      <div className="ing-pin hidden lg:block">
        <div className="relative h-[100svh] overflow-hidden bg-sand-warm/80">
          <div className="ing-track flex h-full w-max items-stretch will-change-transform">
            {/* intro panel */}
            <div className="ing-panel flex h-full w-[46vw] flex-col justify-center px-16">
              <div className="mb-6 flex items-center gap-3">
                <span className="h-px w-8 bg-gold/50" />
                <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
                  {ingredients.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-display-sm font-light leading-[0.95] tracking-editorial text-ink">
                {ingredients.title.map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </h2>
              <p className="mt-8 max-w-xs text-sm text-bone-muted">
                {ui.ingredients.note}
              </p>
            </div>

            {ingredients.items.map((ing, i) => (
              <article
                key={ing.id}
                className="ing-panel group relative flex h-full w-[62vw] items-end p-14"
              >
                <div className="ing-media absolute inset-6 will-change-transform">
                  <CinematicImage
                    src={ing.image}
                    alt={`${ing.name} — ${ing.tagline}`}
                    tint={ing.tint}
                    kicker={ui.ingredients.kicker}
                    label={ing.name}
                    sizes="62vw"
                  />
                </div>
                {/* Bottom-up scrim. The panel photographs run from candlelit
                    (surf and turf) to bright midday (marisco no gelo, cataplana),
                    so the copy cannot rely on the image being dark underneath.
                    Sits above the media, below the text. */}
                <div className="pointer-events-none absolute inset-6 z-[5] bg-gradient-to-t from-ink/95 via-ink/55 to-transparent" />
                <div className="relative z-10 max-w-md">
                  <span className="font-serif text-6xl text-white/10">
                    0{i + 1}
                  </span>
                  <div className="mt-2 flex items-end gap-4">
                    <h3 className="font-serif text-6xl font-light tracking-editorial text-bone">
                      {ing.name}
                    </h3>
                    <span className="mb-2 text-lg text-bone/40">{ing.latin}</span>
                  </div>
                  <p className="mt-3 font-serif text-xl italic text-gold-soft">
                    {ing.tagline}
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone/75">
                    {ing.description}
                  </p>
                  <p className="mt-5 text-[11px] uppercase tracking-wide2 text-bone/55">
                    {ing.origin}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mobile / tablet: vertical stack ─────────────────────────────── */}
      <div className="lg:hidden">
        <div className="px-6 py-24">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
              {ingredients.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-display-sm font-light leading-[0.95] tracking-editorial text-ink">
            {ingredients.title.map((l, i) => (
              <span key={i} className="block">
                {l}
              </span>
            ))}
          </h2>
        </div>

        <div className="flex flex-col gap-4 px-4 pb-16">
          {ingredients.items.map((ing, i) => (
            <motion.article
              key={ing.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px" }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex min-h-[78svh] items-end overflow-hidden rounded-sm p-6"
            >
              <div className="absolute inset-0">
                <CinematicImage
                  src={ing.image}
                  alt={`${ing.name} — ${ing.tagline}`}
                  tint={ing.tint}
                  kicker={ui.ingredients.kicker}
                  label={ing.name}
                  sizes="100vw"
                />
              </div>
              {/* Same scrim as the desktop panels — see the note there. */}
              <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-ink/95 via-ink/55 to-transparent" />
              <div className="relative z-10">
                <span className="text-[11px] uppercase tracking-wide2 text-bone/60">
                  0{i + 1} · {ing.origin}
                </span>
                <div className="mt-1 flex items-end gap-3">
                  <h3 className="font-serif text-5xl font-light tracking-editorial text-bone">
                    {ing.name}
                  </h3>
                  <span className="mb-1.5 text-base text-bone/40">
                    {ing.latin}
                  </span>
                </div>
                <p className="mt-2 font-serif text-lg italic text-gold-soft">
                  {ing.tagline}
                </p>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-bone/75">
                  {ing.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
