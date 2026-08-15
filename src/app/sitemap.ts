import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { defaultLocale, htmlLang, locales } from "@/i18n/config";

/**
 * One entry per language, each declaring the other two as alternates so search
 * engines index the right version for the right visitor.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const { site } = getContent(defaultLocale);

  const languages = Object.fromEntries(
    locales.map((locale) => [htmlLang[locale], `${site.url}/${locale}`])
  );

  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    lastModified: new Date("2026-08-15"),
    changeFrequency: "monthly",
    priority: locale === defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
