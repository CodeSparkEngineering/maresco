"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import RevealText from "./ui/RevealText";
import CinematicImage from "./ui/CinematicImage";

/**
 * ── THE ART OF SUSHI — Maresco Signature Nigiri Exploded Dissection ────────
 *
 * The section pins and Maresco's signature "Nigiri Especial" is disassembled
 * and reassembled along calm vectors, scrubbed to the scroll.
 *
 * Real Studio Macro Assets:
 *  1. /media/sushi/topping.webp  (Flor de sal, azeite trufado & micro-cebolinho)
 *  2. /media/sushi/neta.webp     (Salmão fresco do Atlântico levemente braseado)
 *  3. /media/sushi/nori.webp     (Fita de alga nori tostada)
 *  4. /media/sushi/wasabi.webp   (Hon-wasabi fresco ralado)
 *  5. /media/sushi/shari.webp    (Shari artesanal de arroz temperado)
 */
export default function SushiExperience() {
  const { art } = useContent();
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const build = (opts: { s: number; end: string }) => {
        const { s, end } = opts;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".art-pin",
            start: "top top",
            end,
            scrub: 1,
            pin: ".art-pin",
          },
        });

        // Explode (0 → 0.4) — smooth multi-layer separation
        tl.addLabel("assembled", 0)
          .to(".layer-topping", { yPercent: -280 * s, xPercent: 15 * s, rotate: 8, scale: 1.12, duration: 0.4 }, 0)
          .to(".layer-fish", { yPercent: -145 * s, rotate: -6, scale: 1.06, duration: 0.4 }, 0)
          .to(".layer-nori", { xPercent: -310 * s, yPercent: -20, rotate: -18, duration: 0.4 }, 0)
          .to(".layer-wasabi", { xPercent: -140 * s, yPercent: -490 * s, rotate: 14, duration: 0.4 }, 0)
          .to(".layer-rice", { yPercent: 65 * s, duration: 0.4 }, 0)
          .to(".layer-shadow", { scale: 0.5, opacity: 0.2, duration: 0.4 }, 0)
          .to(".art-label", { opacity: 1, y: 0, duration: 0.3, stagger: 0.04 }, 0.12)
          // Suspended hold (0.4 → 0.62)
          .addLabel("suspended", 0.4)
          // Reassemble (0.62 → 1)
          .to(".art-label", { opacity: 0, y: 8, duration: 0.25 }, 0.62)
          .to(".layer-topping", { yPercent: 0, xPercent: 0, rotate: 0, scale: 1, duration: 0.38 }, 0.62)
          .to(".layer-fish", { yPercent: 0, rotate: 0, scale: 1, duration: 0.38 }, 0.62)
          .to(".layer-nori", { xPercent: 0, yPercent: 0, rotate: 0, duration: 0.38 }, 0.62)
          .to(".layer-wasabi", { xPercent: 0, yPercent: 0, rotate: 0, duration: 0.38 }, 0.62)
          .to(".layer-rice", { yPercent: 0, duration: 0.38 }, 0.62)
          .to(".layer-shadow", { scale: 1, opacity: 1, duration: 0.38 }, 0.62);
      };

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".art-label", { opacity: 1, y: 0 });
      });
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () =>
        build({ s: 1, end: "+=240%" })
      );
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () =>
        build({ s: 0.66, end: "+=170%" })
      );

      return () => mm.revert();
    },
    { scope }
  );

  // Precise label coordinates corresponding to the exploded layer landing zones
  // Generous vertical and horizontal offsets to ensure zero card overlap
  const labelPositions: React.CSSProperties[] = [
    { top: "-32%", left: "96%", width: "260px" },  // 0. Topping (Flor de sal & trufa) — Top Right
    { top: "18%", left: "96%", width: "260px" },   // 1. Neta (Salmão braseado) — Mid Right
    { top: "52%", right: "96%", width: "250px" },  // 2. Nori & Molho Nikiri — Mid-Low Left
    { top: "-28%", right: "96%", width: "250px" }, // 3. Hon-Wasabi — Top Left
    { top: "72%", left: "96%", width: "260px" },   // 4. Shari (Arroz) — Bottom Right
  ];

  return (
    <section ref={scope} id="sushi" className="relative">
      <div className="art-pin relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden bg-sand-warm/85">
        {/* ambient warm spotlight */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#f5ead8_0%,#f0e4d0_45%,transparent_70%)] opacity-60" />

        {/* heading & dish signature badge */}
        <div className="relative z-20 px-6 pt-20 md:px-14 md:pt-24">
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
              {art.eyebrow}
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <RevealText
              lines={art.title}
              as="h2"
              className="font-serif text-display-sm font-light tracking-editorial text-ink"
            />

            {/* Signature Dish Pill Badge */}
            <div className="inline-flex max-w-fit items-center gap-2.5 rounded-full border border-gold/30 bg-surface/90 px-4 py-1.5 shadow-lg backdrop-blur-md">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(200,169,106,0.9)] animate-pulse" />
              <div className="flex items-center gap-2">
                <span className="font-serif text-xs tracking-wider text-ink font-medium">
                  {art.dishName}
                </span>
                {art.dishTagline && (
                  <>
                    <span className="text-gold-deep/60">·</span>
                    <span className="text-[11px] text-bone-muted/80">
                      {art.dishTagline}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* stage */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <div className="relative h-[320px] w-[360px] sm:h-[360px] sm:w-[440px]">
            {/* shadow */}
            <div className="layer-shadow absolute bottom-4 left-1/2 h-10 w-[78%] -translate-x-1/2 rounded-[100%] bg-black/80 blur-2xl" />

            {/* 1. Shari Base (Seasoned Sushi Rice) */}
            <div className="layer-rice absolute bottom-6 left-1/2 z-10 -translate-x-1/2 will-change-transform">
              <div className="nigiri-float">
                <div className="relative h-[135px] w-[310px] sm:h-[155px] sm:w-[370px]">
                  <img
                    src="/media/sushi/shari.webp"
                    alt="Shari - Arroz de sushi temperado"
                    className="h-full w-full object-contain pointer-events-none drop-shadow-[0_16px_32px_rgba(0,0,0,0.65)]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* 2. Nori Ribbon (Roasted Seaweed Band) */}
            <div className="layer-nori absolute bottom-[18px] left-1/2 z-20 -translate-x-1/2 will-change-transform">
              <div className="nigiri-float [animation-delay:-3s]">
                <div className="relative h-[145px] w-[68px] sm:h-[165px] sm:w-[78px]">
                  <img
                    src="/media/sushi/nori.webp"
                    alt="Fita de alga nori tostada"
                    className="h-full w-full object-cover rounded-[6px] pointer-events-none rotate-90 drop-shadow-[0_10px_22px_rgba(0,0,0,0.7)]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* 3. Neta (Flame-Seared Atlantic Salmon) */}
            <div className="layer-fish absolute bottom-[68px] left-1/2 z-30 -translate-x-1/2 will-change-transform sm:bottom-[82px]">
              <div className="nigiri-float [animation-delay:-1.5s]">
                <div className="relative h-[145px] w-[335px] sm:h-[165px] sm:w-[395px]">
                  <img
                    src="/media/sushi/neta.webp"
                    alt="Salmão fresco do Atlântico braseado"
                    className="h-full w-full object-contain pointer-events-none drop-shadow-[0_18px_38px_rgba(0,0,0,0.75)]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* 4. Topping (Fleur de Sel, Truffle Oil & Micro-Chives) */}
            <div className="layer-topping absolute bottom-[140px] left-1/2 z-40 -translate-x-1/2 will-change-transform sm:bottom-[158px]">
              <div className="nigiri-float [animation-delay:-2.2s]">
                <div className="relative h-[95px] w-[135px] sm:h-[110px] sm:w-[155px]">
                  <img
                    src="/media/sushi/topping.webp"
                    alt="Flor de sal da costa, azeite trufado e cebolinho"
                    className="h-full w-full object-contain pointer-events-none drop-shadow-[0_10px_24px_rgba(0,0,0,0.6)]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* 5. Hon-Wasabi (Fresh Grated Wasabi) */}
            <div className="layer-wasabi absolute bottom-[142px] left-[8%] z-45 will-change-transform sm:left-[10%]">
              <div className="nigiri-float [animation-delay:-4.5s]">
                <div className="relative h-[68px] w-[68px] sm:h-[78px] sm:w-[78px]">
                  <img
                    src="/media/sushi/wasabi.webp"
                    alt="Hon-wasabi fresco ralado"
                    className="h-full w-full object-contain pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.65)]"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Floating Labels — Desktop only */}
            {art.steps.map((step, i) => (
              <div
                key={step.id}
                className="art-label pointer-events-none absolute hidden translate-y-2 opacity-0 lg:block z-50"
                style={labelPositions[i] || { top: "0%", left: "100%" }}
              >
                <div className="flex items-start gap-3 rounded-xl border border-gold/20 bg-surface/95 p-3.5 backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_10px_rgba(200,169,106,0.9)]" />
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wide2 text-ink">
                      {step.label}
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-bone-muted">
                      {step.note}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* footer copy + mobile legend + plated dish photo */}
        <div className="relative z-20 px-6 pb-12 md:px-14 md:pb-16">
          {/* Mobile legend — replaces floating labels on small screens */}
          <ul className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:hidden">
            {art.steps.map((step) => (
              <li
                key={step.id}
                className="flex items-start gap-2.5 rounded-md border border-ink/10 bg-surface/80 p-2.5"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                <p className="text-[12px] leading-snug text-bone-muted">
                  <span className="font-medium uppercase tracking-wider text-ink">
                    {step.label}
                  </span>{" "}
                  — {step.note}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
            {art.image && (
              <figure className="group hidden w-[190px] shrink-0 lg:block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-gold/15">
                  <CinematicImage
                    src={art.image}
                    alt={art.dishName}
                    tint={["#2a1a14", "#c98a5a"]}
                    label={art.dishName}
                    sizes="190px"
                  />
                </div>
                <figcaption className="mt-2.5 flex items-center gap-2 text-[10px] uppercase tracking-wide2 text-bone-faint">
                  <span className="h-px w-4 bg-gold/40" />
                  {art.dishName}
                </figcaption>
              </figure>
            )}

            <p className="max-w-xl text-sm leading-relaxed text-bone-muted md:ml-auto">
              {art.body}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

