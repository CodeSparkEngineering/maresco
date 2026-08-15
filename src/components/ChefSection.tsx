"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import CinematicImage from "./ui/CinematicImage";
import RevealText from "./ui/RevealText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * THE CHEF — editorial portrait. A tall image reveals behind a rising clip-path
 * curtain while it slowly scales; the copy rises alongside. The layout is a
 * classic magazine split: sticky image left, text column right. Reduced motion
 * shows the image fully revealed with no clip animation.
 */
export default function ChefSection() {
  const { chef, ui } = useContent();
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".chef-reveal", { clipPath: "inset(0% 0 0 0)" });
        return;
      }
      gsap.fromTo(
        ".chef-reveal",
        { clipPath: "inset(100% 0 0 0)" },
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".chef-reveal", start: "top 82%" },
        }
      );
      gsap.fromTo(
        ".chef-img-inner",
        { scale: 1.25 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope.current,
            start: "top bottom",
            end: "bottom top",
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
      id="cozinha"
      className="relative bg-sand-warm/85 px-6 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Portrait */}
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-24">
            <div className="chef-reveal relative aspect-[3/4] w-full overflow-hidden">
              <div className="chef-img-inner absolute inset-0 will-change-transform">
                <CinematicImage
                  src={chef.image}
                  alt={`${chef.name}, ${chef.role}`}
                  tint={["#1a1614", "#4a3d33"]}
                  kicker={ui.chef.kicker}
                  label={chef.name}
                  interactive={false}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              {/* The portrait is a bright, sunlit terrace shot, so the label
                  needs its own ground rather than trusting the photograph to
                  be dark where the text lands. */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-ink/90 to-transparent" />
              <div className="absolute bottom-6 left-6 z-10">
                <p className="text-[11px] uppercase tracking-wide2 text-bone/85">
                  {chef.role}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center lg:col-span-6">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-gold/50" />
            <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
              {chef.eyebrow}
            </span>
          </div>

          <RevealText
            lines={[chef.name]}
            as="h2"
            className="font-serif text-display-sm font-light tracking-editorial text-ink"
          />

          <p className="mt-8 font-serif text-3xl font-light italic leading-tight tracking-editorial text-gold-deep md:text-4xl">
            “{chef.philosophy}”
          </p>

          <div className="mt-8 space-y-5">
            {chef.paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12% 0px" }}
                transition={{
                  duration: 0.9,
                  delay: i * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="max-w-xl text-base leading-relaxed text-bone-muted"
              >
                {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {chef.stats.map((s) => (
              <div key={s.id}>
                <p className="font-serif text-4xl font-light text-ink md:text-5xl">
                  {s.value}
                </p>
                <p className="mt-2 text-[11px] uppercase leading-snug tracking-wide2 text-bone-faint">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
