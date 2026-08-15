"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Masked line-reveal. Each line sits inside an overflow-hidden clip and slides
 * up from below as it scrolls into view, with a slow stagger. This is the
 * signature "title reveal" used for every large headline on the site.
 *
 * With reduced motion, lines are shown immediately (no transform, no clip
 * animation) so nothing is ever hidden from users who opt out.
 */
type RevealTextProps = {
  lines: readonly string[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  /** Delay before the stagger begins, in seconds. */
  delay?: number;
  stagger?: number;
  /** Start earlier/later relative to viewport. */
  start?: string;
  /** Accent a specific line index (e.g. gold italic on line 1). */
  accentIndex?: number;
  accentRender?: (line: string) => ReactNode;
};

export default function RevealText({
  lines,
  as: Tag = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.12,
  start = "top 82%",
  accentIndex,
  accentRender,
}: RevealTextProps) {
  const scope = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced) {
        gsap.set(".reveal-line-inner", { yPercent: 0, opacity: 1 });
        return;
      }
      gsap.set(".reveal-line-inner", { yPercent: 118, opacity: 0 });
      gsap.to(".reveal-line-inner", {
        yPercent: 0,
        opacity: 1,
        duration: 1.15,
        ease: "power3.out",
        stagger,
        delay,
        scrollTrigger: { trigger: scope.current, start },
      });
    },
    { scope, dependencies: [reduced] }
  );

  return (
    <Tag ref={scope as never} className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <span className="reveal-line-inner block will-change-transform">
            {accentIndex === i && accentRender ? accentRender(line) : line}
          </span>
        </span>
      ))}
    </Tag>
  );
}
