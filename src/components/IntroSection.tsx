"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { useContent } from "@/lib/content-context";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * The philosophy statement, delivered as a slow "text illumination": each word
 * begins nearly invisible and brightens as it passes through the viewport,
 * scrubbed to the scroll. It reads like a line of thought resolving — the exact
 * opposite of a punchy marketing block.
 */
export default function IntroSection() {
  const { intro } = useContent();
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const words = intro.lines.join(" \n ").split(" ");

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".intro-word", { opacity: 1 });
        return;
      }
      gsap.to(".intro-word", {
        opacity: 1,
        ease: "none",
        stagger: 0.4,
        scrollTrigger: {
          trigger: ".intro-copy",
          start: "top 78%",
          end: "bottom 60%",
          scrub: true,
        },
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <section
      ref={scope}
      id="intro"
      className="relative bg-sand/75 px-6 py-32 md:px-10 md:py-48"
    >
      <div className="mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-14 flex items-center gap-3"
        >
          <span className="h-px w-8 bg-gold/50" />
          <span className="text-[11px] uppercase tracking-wide3 text-bone-muted">
            {intro.eyebrow}
          </span>
        </motion.div>

        <p className="intro-copy font-serif text-[clamp(1.9rem,5vw,4rem)] font-light leading-[1.15] tracking-editorial text-ink">
          {words.map((word, i) =>
            word === "\n" ? (
              <br key={i} className="hidden md:block" />
            ) : (
              <span key={i} className="intro-word opacity-[0.14]">
                {word}{" "}
              </span>
            )
          )}
        </p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 max-w-xl text-base leading-relaxed text-bone-muted md:ml-auto"
        >
          {intro.body}
        </motion.p>
      </div>
    </section>
  );
}
