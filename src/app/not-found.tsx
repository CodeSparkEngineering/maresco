import Link from "next/link";

/**
 * Global 404 — reached only by requests that never match a locale segment.
 * There is no root layout above this file (the site's root layout is
 * app/[locale]/layout.tsx), so this page has to render its own document.
 */
export default function NotFound() {
  return (
    <html lang="pt-PT">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          background: "#0a0a0b",
          color: "#f4f1ea",
          fontFamily: "Georgia, 'Times New Roman', serif",
          textAlign: "center",
          padding: "0 1.5rem",
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#8f8b83",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          404
        </p>
        <h1 style={{ margin: 0, fontSize: "clamp(2rem, 7vw, 4rem)", fontWeight: 300 }}>
          MARESCO
        </h1>
        <Link
          href="/pt"
          style={{
            marginTop: "1rem",
            border: "1px solid rgba(244,241,234,0.25)",
            borderRadius: "999px",
            padding: "0.75rem 2rem",
            fontSize: "0.7rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#f4f1ea",
            textDecoration: "none",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          Início
        </Link>
      </body>
    </html>
  );
}
