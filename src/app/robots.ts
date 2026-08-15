import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { defaultLocale } from "@/i18n/config";

export default function robots(): MetadataRoute.Robots {
  const { site } = getContent(defaultLocale);

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
