/**
 * Pass-through root layout.
 *
 * The real root layout — the one that renders <html>, the fonts and the content
 * provider — is app/[locale]/layout.tsx, because <html lang> depends on the URL.
 * Next.js still requires a layout at the top of app/ whenever a root-level
 * not-found.tsx exists, so this file exists only to satisfy that rule and
 * deliberately renders nothing of its own.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
