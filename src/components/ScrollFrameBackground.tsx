"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/content-context";

/**
 * ── SITE-WIDE SCROLL-DRIVEN IMAGE SEQUENCE (the "Apple recipe") ────────────
 *
 * A single brand film — exploded into a WebP frame sequence with ffmpeg — is
 * the *fixed background of the entire site*. It starts on the hero (frame 0)
 * and advances as you scroll the whole page: total page scroll progress maps to
 * the frame index. Nothing autoplays; the film only ever moves when you scroll.
 *
 * The film is an exploded view: an Atlantic wave breaks into droplets, the
 * components of a nigiri separate and hang suspended, then draw back together
 * into the finished piece. That arc is deliberately mapped to the page — the
 * visitor arrives on open ocean and leaves with the piece composed.
 *
 * The recipe:
 *   1. Video → frames  — 200 WebP on desktop, 140 on mobile (chosen at runtime).
 *   2. Canvas + scrub  — page scroll progress (0 at top → 1 at bottom) → frame.
 *   3. Lerp smoothing  — the drawn frame chases the scroll target (LERP ≈ 0.14).
 *   4. cover() + DPR   — object-fit: cover math, retina-sharp via devicePixelRatio.
 *   5. Scrim           — a base grade so content on top stays legible everywhere.
 *
 * Graceful degradation (a11y + data): prefers-reduced-motion, Save-Data or a 2g
 * connection → the sequence is never downloaded, only a static poster shows. The
 * rAF loop runs only while the frame is still catching up, never at rest.
 *
 * Rendered once, fixed and behind all content (pointer-events: none). Section
 * backgrounds are translucent so this film shows through — more in the open
 * sections, dimmed behind dense ones.
 */

const LERP = 0.14;
const pad = (n: number) => String(n).padStart(4, "0");

export default function ScrollFrameBackground() {
  const { film, ui } = useContent();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ── retina backing store + object-fit: cover draw ──────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(window.innerWidth * dpr));
      canvas.height = Math.max(1, Math.round(window.innerHeight * dpr));
    };
    const cover = (img: HTMLImageElement) => {
      const cw = canvas.width;
      const ch = canvas.height;
      const ir = img.width / img.height;
      const cr = cw / ch;
      let dw: number, dh: number, dx: number, dy: number;
      if (cr > ir) {
        dw = cw;
        dh = cw / ir;
        dx = 0;
        dy = (ch - dh) / 2;
      } else {
        dh = ch;
        dw = ch * ir;
        dy = 0;
        dx = (cw - dw) / 2;
      }
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    // ── degrade gates → static poster only ─────────────────────────────────
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const conn = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    const slowNet = Boolean(
      conn && (conn.saveData || /(^|\b)(slow-)?2g$/.test(conn.effectiveType || ""))
    );

    if (prefersReduced || slowNet) {
      setDegraded(true);
      const poster = new Image();
      const paint = () => {
        resize();
        if (poster.complete && poster.naturalWidth) cover(poster);
      };
      poster.onload = paint;
      poster.src = film.poster;
      window.addEventListener("resize", paint);
      return () => window.removeEventListener("resize", paint);
    }

    // ── choose frame set for this viewport ─────────────────────────────────
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const set = isDesktop ? film.frames.desktop : film.frames.mobile;
    const count = set.count;
    const images: HTMLImageElement[] = new Array(count);

    const nearestReady = (idx: number): HTMLImageElement | undefined => {
      for (let i = idx; i >= 0; i--)
        if (images[i]?.complete && images[i].naturalWidth) return images[i];
      for (let i = idx + 1; i < count; i++)
        if (images[i]?.complete && images[i].naturalWidth) return images[i];
      return undefined;
    };

    // ── whole-page scroll → target frame, lerp-smoothed ────────────────────
    let target = 0;
    let current = 0;
    let raf = 0;
    let running = false;

    const readProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      target = p * (count - 1);
    };
    const paintFrame = () => {
      const img = nearestReady(Math.round(current));
      if (img) cover(img);
    };
    const tick = () => {
      current += (target - current) * LERP;
      if (Math.abs(target - current) < 0.05) {
        current = target;
        running = false;
      }
      paintFrame();
      if (running) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      readProgress();
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    // ── poster first, then stream the sequence in ──────────────────────────
    resize();
    const poster = new Image();
    poster.onload = () => {
      if (!nearestReady(Math.round(current))) cover(poster);
    };
    poster.src = film.poster;

    let loaded = 0;
    for (let i = 0; i < count; i++) {
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        loaded++;
        if (loaded === 1 || i === Math.round(current)) paintFrame();
      };
      img.src = `${set.path}/frame_${pad(i + 1)}.webp`;
      images[i] = img;
    }

    const onScroll = () => kick();
    const onResize = () => {
      resize();
      readProgress();
      paintFrame();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    readProgress();
    current = target;
    paintFrame();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
    // `film` is the cached content object for this locale — a stable identity,
    // so this effect runs once per language rather than on every render.
  }, [film]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 bg-sand"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/*
        Deliberately a light touch. Legibility is owned by the sections, which
        each carry their own translucent sand background (75–92%), and by the
        hero, which lays its own dark scrim over the film so cream type reads
        against it. A heavy veil here would fight both — it would wash the hero
        to grey and leave cream text on a pale ground. So this only unifies:
        a whisper of sand, lifted at the very top and bottom of the viewport.
      */}
      <div className="absolute inset-0 bg-sand/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-sand/45 via-transparent to-sand/55" />
      <div className="grain absolute inset-0 opacity-15" />
      {degraded && <span className="sr-only">{ui.media.staticBackground}</span>}
    </div>
  );
}
