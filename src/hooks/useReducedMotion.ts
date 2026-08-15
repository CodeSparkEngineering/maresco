"use client";

import { useMediaQuery } from "./useMediaQuery";

/**
 * Respects the OS-level "reduce motion" preference. Consumed everywhere heavy
 * scroll animation is applied so the site degrades to simple fades / no motion
 * for users who ask for it.
 */
export function useReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
