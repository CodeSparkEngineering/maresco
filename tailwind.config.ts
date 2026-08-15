import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Maresco Coastal Luxury — Light Palette ────────────────────
        // Warm Sand page backgrounds, White Linen cards, Charcoal Navy
        // typography, Champagne Gold accents, Royal Navy call-to-actions.

        // Page backgrounds — warm sand & linen
        sand: {
          DEFAULT: "#FAF7F2", // Warm sand — main page bg
          light: "#FDFCF9",  // Slightly lighter variant
          warm: "#F2ECE1",   // Linen bege — alternating sections
        },

        // Card / surface / elevated
        surface: {
          DEFAULT: "#FFFFFF", // Pure white for cards & menus
          frosted: "rgba(255,255,255,0.92)", // Glassmorphism
        },

        // Typography — dark ink on light backgrounds
        ink: {
          DEFAULT: "#16191E", // Charcoal Navy — primary text
          900: "#16191E",
          800: "#1E2128",
          700: "#2A2E36",
          600: "#3A3F4A",
          500: "#4A505C",
        },

        // Muted & secondary text
        bone: {
          DEFAULT: "#FAF7F2", // Legacy alias (same as sand for compat)
          muted: "#5A6578",   // Slate — secondary text & captions (5.5:1 on sand)
          // Was #8B95A5, which measured 2.8:1 on sand and 2.6:1 on linen —
          // below AA for the 10–11px captions it is used on, so they read as
          // barely-there smudges. Darkened to clear 4.5:1 on both grounds
          // while staying visibly lighter than `muted`.
          faint: "#626C7A",   // Faint slate (5.0:1 on sand, 4.5:1 on linen)
          warm: "#F2ECE1",    // Linen
        },

        // Brand primary — Champagne Gold (unchanged from Maresco identity)
        gold: {
          DEFAULT: "#C8A96A", // Maresco Brand Primary (--primary)
          soft: "#DAC59C",    // Champagne highlight / hover
          bronze: "#C19977",  // Warm Terracotta / Bronze accent
          // Gold as text on a light ground: the brand gold itself measures
          // 2.1:1 on sand, so it is an accent for rules, dots and dark
          // surfaces only — never for words. This is the readable version,
          // clearing 4.5:1 on sand, linen and white alike.
          deep: "#876325",    // Gold for text on light (5.1 sand / 4.7 linen)
        },

        // Maresco Royal Navy — premium dark accent
        ocean: {
          DEFAULT: "#1A254B", // Royal Navy for buttons & badges
          deep: "#0F1832",    // Darkest navy
          subtle: "#2C3A6E",  // Lighter navy
          light: "#3D4E8C",   // Hover state
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        editorial: "-0.03em",
        wide2: "0.18em",
        wide3: "0.32em",
      },
      fontSize: {
        // Fluid display sizes, tuned for large editorial headlines.
        "display-sm": ["clamp(2.5rem, 7vw, 4.5rem)", { lineHeight: "0.95" }],
        "display": ["clamp(3.25rem, 11vw, 9rem)", { lineHeight: "0.92" }],
        "display-lg": ["clamp(4rem, 15vw, 14rem)", { lineHeight: "0.88" }],
      },
      transitionTimingFunction: {
        // Slow, expensive-feeling easing curves.
        lux: "cubic-bezier(0.16, 1, 0.3, 1)",
        "lux-in": "cubic-bezier(0.7, 0, 0.84, 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(2%, -3%, 0) scale(1.06)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        "scroll-line": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s var(--tw-ease, cubic-bezier(0.16,1,0.3,1)) both",
        drift: "drift 22s ease-in-out infinite",
        shimmer: "shimmer 8s linear infinite",
        "scroll-line": "scroll-line 2.4s cubic-bezier(0.16,1,0.3,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
