"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/**
 * A very restrained custom cursor for desktop, pointer-fine devices only.
 *
 *  - Default: a small hollow ring that trails the pointer with a soft lag.
 *  - Over anything marked `data-cursor="link"`: the ring expands into a filled
 *    disc and, if the element sets `data-cursor-label`, that word ("View",
 *    "Open", "Reserve") appears inside it.
 *
 * Completely removed on touch devices — no native cursor is ever hidden there.
 */
export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const ringRef = useRef<HTMLDivElement>(null);
  const visibleRef = useRef(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isDesktop) return;
    const ring = ringRef.current;
    if (!ring) return;

    document.documentElement.classList.add("has-custom-cursor");
    const xTo = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
    };

    const onOver = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.(
        '[data-cursor="link"], a, button'
      ) as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.getAttribute("data-cursor-label") ?? "");
      }
    };
    const onOut = (e: Event) => {
      const el = (e.target as HTMLElement)?.closest?.(
        '[data-cursor="link"], a, button'
      ) as HTMLElement | null;
      if (el) {
        setActive(false);
        setLabel("");
      }
    };
    const onLeave = () => {
      visibleRef.current = false;
      setVisible(false);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-300 ease-lux ${
          active
            ? "h-16 w-16 border-transparent bg-gold-deep/95 shadow-lg"
            : "h-8 w-8 border border-ink/35 bg-transparent"
        }`}
      >
        <span
          className={`text-[9px] font-medium uppercase tracking-wide2 text-white transition-opacity duration-200 ${
            active && label ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
