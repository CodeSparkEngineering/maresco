"use client";

import Link from "next/link";
import { LOCALE_COOKIE, localeNames, locales, type Locale } from "@/i18n/config";
import { useContent, useLocale } from "@/lib/content-context";

/**
 * PT · EN · ES. A hairline row of three, matching the navbar's typography
 * rather than announcing itself as a widget.
 *
 * Choosing a language also writes the NEXT_LOCALE cookie, so the middleware
 * honours that choice the next time the visitor arrives at the bare domain
 * instead of guessing from Accept-Language again.
 */
export default function LocaleSwitcher({
  onNavigate,
  size = "sm",
  onDark = false,
}: {
  onNavigate?: () => void;
  size?: "sm" | "lg";
  /**
   * Set while the switcher sits over the hero film rather than the sand page.
   * The navbar is transparent up there, so the light-palette inks it uses once
   * scrolled are invisible against the footage.
   */
  onDark?: boolean;
}) {
  const active = useLocale();
  const { ui } = useContent();

  const remember = (locale: Locale) => {
    // One year, site-wide. Lax is enough: this is a preference, not a session.
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    onNavigate?.();
  };

  return (
    <div
      className={`flex items-center ${size === "lg" ? "gap-4" : "gap-2.5"}`}
      role="group"
      aria-label={ui.nav.language}
    >
      {locales.map((locale, i) => (
        <span key={locale} className="flex items-center">
          {i > 0 && (
            <span
              aria-hidden="true"
              className={`${onDark ? "bg-white/25" : "bg-ink/15"} ${
                size === "lg" ? "mr-4 h-3 w-px" : "mr-2.5 h-2.5 w-px"
              }`}
            />
          )}
          <Link
            href={`/${locale}`}
            hrefLang={locale}
            onClick={() => remember(locale)}
            aria-current={locale === active ? "true" : undefined}
            data-cursor="link"
            title={localeNames[locale].full}
            className={`uppercase tracking-wide2 transition-colors duration-300 ${
              size === "lg" ? "text-sm" : "text-[11px]"
            } ${
              onDark
                ? locale === active
                  ? "text-gold"
                  : "text-white/55 hover:text-white"
                : locale === active
                  ? "text-gold-deep"
                  : "text-ink/40 hover:text-ink"
            }`}
          >
            {localeNames[locale].short}
          </Link>
        </span>
      ))}
    </div>
  );
}
