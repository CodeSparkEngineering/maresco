import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";

/**
 * Every page lives under a locale prefix (/pt, /en, /es). This redirects any
 * unprefixed request to the visitor's language, chosen in this order:
 *
 *   1. the NEXT_LOCALE cookie — an explicit choice made with the switcher
 *   2. the browser's Accept-Language header, by quality value
 *   3. defaultLocale (pt)
 *
 * Static files, /_next and anything with a file extension are excluded by the
 * matcher below, so the scroll-driven frame sequence under /frames and the
 * media under /media are never touched.
 */

/** Parses `pt-PT,pt;q=0.9,en;q=0.8` into our locales, best match first. */
function fromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const q = params.find((p) => p.trim().startsWith("q="));
      const quality = q ? Number.parseFloat(q.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), quality: Number.isNaN(quality) ? 0 : quality };
    })
    .filter((entry) => entry.tag.length > 0)
    .sort((a, b) => b.quality - a.quality);

  for (const { tag } of ranked) {
    // Match the primary subtag, so pt-BR and pt-PT both resolve to pt.
    const base = tag.split("-")[0];
    if (isLocale(base)) return base;
  }
  return undefined;
}

function resolveLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookie && isLocale(cookie)) return cookie;
  return fromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const locale = resolveLocale(request);
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, API routes and any path with a file
  // extension (/media/hero.mp4, /frames/desktop/frame_0001.webp, /icon.svg …).
  matcher: ["/((?!_next|api|.*\\.).*)"],
};
