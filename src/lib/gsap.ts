"use client";

/**
 * Single place where GSAP + plugins are registered. Importing from here keeps
 * plugin registration idempotent and avoids "already registered" noise, and
 * guarantees registration only ever runs in the browser.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Shared cinematic easing tokens, mirrored from tailwind.config `lux`. */
export const EASE = {
  lux: "power3.out",
  luxInOut: "power3.inOut",
  soft: "power2.out",
} as const;

export { gsap, ScrollTrigger };
