import Link from "next/link";
import { getContent } from "@/lib/content";
import { defaultLocale, isLocale } from "@/i18n/config";

/**
 * 404 inside a known language — e.g. /pt/qualquer-coisa. Rendered inside the
 * locale layout, so it keeps the site's fonts, palette and <html lang>.
 *
 * `not-found.tsx` cannot read route params, so the copy falls back to the
 * default locale. The link home is relative, which keeps the visitor in
 * whichever language they were already browsing.
 */
export default function LocaleNotFound() {
  const { site, ui } = getContent(isLocale(defaultLocale) ? defaultLocale : "pt");

  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-sand px-6 text-center">
      <p className="mb-6 text-[11px] uppercase tracking-wide3 text-bone-muted">404</p>
      <h1 className="font-serif text-display-sm font-light tracking-editorial text-ink">
        {site.name}
      </h1>
      <p className="mt-6 max-w-sm text-sm leading-relaxed text-bone-muted">
        {site.tagline}
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-gold-deep/30 px-8 py-3 text-[11px] uppercase tracking-wide2 text-gold-deep transition-colors hover:border-ocean/60"
      >
        {ui.nav.home}
      </Link>
    </main>
  );
}
