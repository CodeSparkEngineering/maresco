"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import LocaleSwitcher from "./LocaleSwitcher";

/**
 * Minimal navbar. Transparent over the hero; on scroll it gains a translucent
 * near-black backdrop with blur and its content settles slightly (scale +
 * tightened padding). A hairline progress bar tracks page depth. Mobile gets a
 * full-screen editorial overlay menu instead of a cramped dropdown.
 *
 * The language switcher sits between the links and the booking CTA on desktop,
 * and at the foot of the overlay on mobile.
 */
export default function Navbar() {
  const { nav, site, ui } = useContent();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the overlay menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-lux ${
          scrolled
            ? "border-b border-ink/5 bg-sand/85 py-3 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-6 md:px-10">
          {/* Wordmark */}
          <a
            href="#top"
            data-cursor="link"
            data-cursor-label={ui.nav.home}
            className="group flex items-baseline gap-2"
            aria-label={`${site.name} — ${ui.nav.home}`}
          >
            <span
              className={`font-serif tracking-tightest transition-all duration-700 ease-lux ${
                scrolled ? "text-xl text-ink" : "text-2xl text-white"
              }`}
            >
              {site.name}
            </span>
            <span
              className={`hidden text-[11px] uppercase tracking-wide2 transition-colors group-hover:text-gold sm:inline ${
                scrolled ? "text-bone-muted" : "text-white/70"
              }`}
            >
              {site.wordmark}
            </span>
          </a>

          {/* Desktop links */}
          <div className="hidden items-center gap-9 lg:flex">
            {nav.links.map((link) => (
              <a
                key={link.id}
                href={link.href}
                data-cursor="link"
                className={`group relative text-xs uppercase tracking-wide2 transition-colors ${
                  scrolled
                    ? "text-ink/60 hover:text-ink"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold transition-all duration-500 ease-lux group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Language + CTA */}
          <div className="hidden items-center gap-7 lg:flex">
            <LocaleSwitcher onDark={!scrolled} />
            <a
              href={nav.cta.href}
              data-cursor="link"
              data-cursor-label={nav.cta.label}
              className={`group relative inline-flex overflow-hidden rounded-full border px-6 py-2.5 text-[11px] uppercase tracking-wide2 transition-colors ${
                scrolled
                  ? "border-gold-deep/40 text-gold-deep hover:border-gold-deep"
                  : "border-gold/60 text-gold hover:border-gold"
              }`}
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-[650ms] ease-lux group-hover:scale-x-100" />
              <span className="relative transition-colors duration-[650ms] ease-lux group-hover:text-ink">
                {nav.cta.label}
              </span>
            </a>
          </div>

          {/* Mobile: language stays reachable without opening the menu */}
          <div className="flex items-center gap-4 lg:hidden">
            <LocaleSwitcher onDark={!scrolled} />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={ui.nav.openMenu}
              className={`flex h-10 w-10 items-center justify-center transition-colors ${
                scrolled ? "text-ink" : "text-white"
              }`}
            >
              <Menu strokeWidth={1.2} className="h-6 w-6" />
            </button>
          </div>
        </nav>

        {/* progress hairline */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-transparent">
          <div
            className="h-full origin-left bg-gradient-to-r from-gold/0 via-gold to-gold/0"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* Mobile overlay menu. Plain conditional mount/unmount (never lingers to
          trap taps). The dark backdrop covers instantly and the links reveal via
          a pure-CSS staggered fade — no JS animation loop — so navigation is
          always visible and usable, independent of any animation runtime. */}
      {open && (
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-sand backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-6 py-6">
            <span className="font-serif text-2xl tracking-tightest text-ink">
              {site.name}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={ui.nav.closeMenu}
              className="flex h-10 w-10 items-center justify-center text-ink"
            >
              <X strokeWidth={1.2} className="h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col px-6 pb-16 pt-10">
            {nav.links.map((link, i) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setOpen(false)}
                className="animate-fade-up border-b border-ink/10 py-5 font-serif text-4xl font-light tracking-editorial text-ink"
                style={{ animationDelay: `${0.08 + i * 0.06}s`, animationDuration: "0.7s" }}
              >
                {link.label}
              </a>
            ))}
            <a
              href={nav.cta.href}
              onClick={() => setOpen(false)}
              className="animate-fade-up mt-10 inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-xs uppercase tracking-wide2 text-ink"
              style={{
                animationDelay: `${0.08 + nav.links.length * 0.06}s`,
                animationDuration: "0.7s",
              }}
            >
              {nav.cta.label}
            </a>

            <div className="mt-12 flex flex-col gap-4 border-t border-ink/10 pt-8">
              <span className="text-[11px] uppercase tracking-wide2 text-bone-muted">
                {ui.nav.language}
              </span>
              <LocaleSwitcher size="lg" onNavigate={() => setOpen(false)} />
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
