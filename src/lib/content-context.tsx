"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { Content } from "./content";

/**
 * The locale layout resolves the dictionary once on the server and hands it to
 * this provider. Every client component then reads copy with `useContent()`
 * instead of importing a module-level constant, so the same components render
 * in any language without a single prop being threaded through the tree.
 */
type ContentValue = { locale: Locale; content: Content };

const ContentContext = createContext<ContentValue | null>(null);

export function ContentProvider({
  locale,
  content,
  children,
}: ContentValue & { children: React.ReactNode }) {
  return (
    <ContentContext.Provider value={{ locale, content }}>
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): Content {
  const value = useContext(ContentContext);
  if (!value) {
    throw new Error("useContent must be used inside <ContentProvider>");
  }
  return value.content;
}

export function useLocale(): Locale {
  const value = useContext(ContentContext);
  if (!value) {
    throw new Error("useLocale must be used inside <ContentProvider>");
  }
  return value.locale;
}
