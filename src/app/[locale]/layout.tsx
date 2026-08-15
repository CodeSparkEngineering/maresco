import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Inter, Fraunces } from "next/font/google";
import "../globals.css";
import { getContent } from "@/lib/content";
import { ContentProvider } from "@/lib/content-context";
import {
  htmlLang,
  isLocale,
  locales,
  ogLocale,
  type Locale,
} from "@/i18n/config";

/**
 * This is the root layout: every route on the site lives under /[locale], so
 * <html lang> can be set from the URL and the whole page — copy, metadata and
 * structured data — is resolved once per language on the server.
 */

/** Interface / body face — clean, modern, neutral. */
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/** Editorial display face — high-contrast serif for luxury headlines. */
const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

type LayoutParams = { params: Promise<{ locale: string }> };

/** Pre-render one static shell per language at build time. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const { site } = getContent(locale);
  const title = `${site.name} — ${site.tagline}`;

  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s · ${site.name}` },
    description: site.description,
    applicationName: site.name,
    keywords: [
      "marisqueira",
      "sushi",
      "seafood",
      "restaurante",
      "Póvoa de Varzim",
      "marisco",
      "sushi bar",
      site.name,
    ],
    authors: [{ name: site.legalName }],
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      url: `${site.url}/${locale}`,
      siteName: site.name,
      title,
      description: site.description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
    },
    robots: { index: true, follow: true },
    alternates: {
      canonical: `${site.url}/${locale}`,
      // hreflang — tells search engines these three pages are the same page.
      languages: Object.fromEntries([
        ...locales.map((l) => [htmlLang[l], `${site.url}/${l}`]),
        ["x-default", `${site.url}/${locales[0]}`],
      ]),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

/** Schema.org Restaurant — helps search engines render rich results. */
function buildJsonLd(locale: Locale) {
  const { site, contact } = getContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.legalName,
    alternateName: site.name,
    description: site.description,
    url: `${site.url}/${locale}`,
    inLanguage: htmlLang[locale],
    servesCuisine: ["Seafood", "Portuguese", "Sushi", "Japanese"],
    priceRange: "€€€",
    acceptsReservations: true,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address[0],
      addressLocality: site.city,
      postalCode: "4490-588",
      addressCountry: "PT",
    },
    openingHoursSpecification: [
      { opens: "12:00", closes: "15:00" },
      { opens: "19:00", closes: "23:00" },
    ].map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      ...slot,
    })),
    sameAs: contact.social.map((s) => s.href),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getContent(locale);

  return (
    <html lang={htmlLang[locale]} className={`${sans.variable} ${serif.variable}`}>
      <body>
        <ContentProvider locale={locale} content={content}>
          {children}
        </ContentProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)) }}
        />
      </body>
    </html>
  );
}
