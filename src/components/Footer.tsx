"use client";

import { useContent } from "@/lib/content-context";
import LocaleSwitcher from "./LocaleSwitcher";

/**
 * Minimal footer. Structured, quiet, generous line-height. Holds the practical
 * facts — where, when, how to reach and book — without visual weight.
 */
export default function Footer() {
  const { site, contact, ui } = useContent();
  const year = 2026; // static to avoid hydration drift; bump or wire to build time

  const maps = contact.social.find((s) => s.label === "Google Maps");

  return (
    <footer className="relative border-t border-ink/10 bg-sand-warm px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#top" className="font-serif text-3xl tracking-tightest text-ink">
              {site.name}
            </a>
            <p className="mt-2 text-[11px] uppercase tracking-wide2 text-bone-faint">
              {site.wordmark}
            </p>
            <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-bone-faint">
              {site.tagline}
            </p>
            <div className="mt-6">
              <LocaleSwitcher />
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="mb-4 text-[11px] uppercase tracking-wide2 text-bone-muted">
              {ui.footer.location}
            </h3>
            <address className="not-italic text-sm leading-relaxed text-ink/75">
              {contact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            {maps && (
              <a
                href={maps.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-[11px] uppercase tracking-wide2 text-gold-deep transition-colors hover:text-ink"
              >
                {ui.footer.maps} ↗
              </a>
            )}
          </div>

          {/* Hours */}
          <div>
            <h3 className="mb-4 text-[11px] uppercase tracking-wide2 text-bone-muted">
              {ui.footer.hours}
            </h3>
            <ul className="space-y-2 text-sm text-ink/75">
              {contact.hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span className="text-ink">{h.day}</span>
                  <span className="text-bone-muted">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / social */}
          <div>
            <h3 className="mb-4 text-[11px] uppercase tracking-wide2 text-bone-muted">
              {ui.footer.contact}
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-words text-ink/75 transition-colors hover:text-ink"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                  className="text-ink/75 transition-colors hover:text-ink"
                >
                  {contact.phone}
                </a>
              </li>
              {contact.social
                .filter((s) => s.label !== "Google Maps")
                .map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="group inline-flex items-center gap-1 text-ink/75 transition-colors hover:text-ink"
                    >
                      {s.label}
                      <span className="text-bone-muted transition-transform group-hover:translate-x-0.5">
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-4 border-t border-ink/10 pt-8 text-[11px] uppercase tracking-wide2 text-bone-faint md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}. {ui.footer.rights}
          </p>
          <div className="flex flex-wrap gap-6">
            {contact.legal.map((l) => (
              <a
                key={l.id}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
