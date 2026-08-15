import { ImageResponse } from "next/og";
import { getContent } from "@/lib/content";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Dynamically-rendered Open Graph / Twitter share image, one per language —
 * generated at build time from code, so there is no static asset to ship or
 * keep in sync. Serves as both the OG and Twitter card image (Next reuses it
 * when no twitter-image is defined).
 */
export const alt = "Maresco — Seafood & Sushi · Póvoa de Varzim";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { site, hero } = getContent(isLocale(locale) ? locale : defaultLocale);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 100% at 20% 10%, #16262b 0%, #0b0a0c 55%, #050506 100%)",
          color: "#f4f1ea",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 40, height: 1, background: "#c8a96a" }} />
          <div
            style={{
              fontSize: 22,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#a7a39b",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            {hero.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {hero.headline.map((line) => (
            <div key={line} style={{ fontSize: 132, lineHeight: 1, letterSpacing: -4 }}>
              {line}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: 30,
              letterSpacing: 14,
              textTransform: "uppercase",
              fontFamily: "Helvetica, Arial, sans-serif",
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 24, color: "#a7a39b" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
