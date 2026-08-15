/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LOCALE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 *  Single source of truth for which languages the site speaks. Adding a fourth
 *  locale is a three-step change: add it to `locales`, add its BCP-47 / OG tags
 *  below, and create the matching dictionary in src/lib/content/<locale>.ts.
 *  TypeScript will then flag every place that still needs it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const locales = ["pt", "en", "es"] as const;

export type Locale = (typeof locales)[number];

/** Used when the visitor's language cannot be determined. */
export const defaultLocale: Locale = "pt";

/** Full BCP-47 tag for <html lang>. European Portuguese — the house is in Póvoa de Varzim. */
export const htmlLang: Record<Locale, string> = {
  pt: "pt-PT",
  en: "en",
  es: "es",
};

/** Open Graph locale tags (underscore form). */
export const ogLocale: Record<Locale, string> = {
  pt: "pt_PT",
  en: "en_GB",
  es: "es_ES",
};

/** Labels for the language switcher — each written in its own language. */
export const localeNames: Record<Locale, { short: string; full: string }> = {
  pt: { short: "PT", full: "Português" },
  en: { short: "EN", full: "English" },
  es: { short: "ES", full: "Español" },
};

/** Cookie remembering an explicit choice, so it survives the next visit to `/`. */
export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
