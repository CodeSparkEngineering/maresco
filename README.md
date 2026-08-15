# MARESCO — Seafood & Sushi, Póvoa de Varzim

A cinematic, trilingual site for a seafood house and sushi bar. Not a "restaurant
website" — a digital experience about the product: minimal, editorial, quiet.
Near-black palette, high-contrast serif display type, generous whitespace, and
slow, expensive-feeling motion throughout.

Available in **Portuguese, English and Spanish** at `/pt`, `/en` and `/es`.

> **The site is fully navigable with zero real assets.** Every image and video
> is optional — where a file is missing, a deliberately handsome, labelled
> placeholder renders in its place. Drop real files in and the site lights up
> with no code changes.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS** (custom cinematic theme)
- **GSAP** + **ScrollTrigger** — the complex scroll storytelling (pinning,
  horizontal scroll, the exploded-nigiri sequence, parallax, masked reveals)
- **Framer Motion** — micro-interactions and small enter animations
- **Lenis** — smooth scrolling, phase-locked to GSAP's ticker
- **lucide-react** — icons
- No i18n library: routing, language negotiation and the dictionaries are ~200
  lines of first-party code.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  → redirects to /pt, /en or /es
npm run build    # production build
npm run start    # serve the production build
```

> Note: don't run `npm run build` while `npm run dev` is running — they share
> the `.next` directory and the build will break the dev server with
> `Cannot find module './vendor-chunks/…'`. Stop one first; if it happens,
> delete `.next` and restart.

## Languages

| Piece | Where |
|-------|-------|
| Which languages exist, default, `<html lang>`, OG tags, switcher labels | [`src/i18n/config.ts`](src/i18n/config.ts) |
| Redirect `/` → visitor's language (cookie → `Accept-Language` → `pt`) | [`src/middleware.ts`](src/middleware.ts) |
| The three dictionaries | [`src/lib/content/pt.ts`](src/lib/content/pt.ts) · [`en.ts`](src/lib/content/en.ts) · [`es.ts`](src/lib/content/es.ts) |
| PT · EN · ES switcher (navbar + footer) | [`src/components/LocaleSwitcher.tsx`](src/components/LocaleSwitcher.tsx) |

Every page is statically pre-rendered once per language. Each one declares the
other two via `hreflang`, and the sitemap lists all three.

Picking a language writes a `NEXT_LOCALE` cookie, so a returning visitor landing
on the bare domain gets the language they chose rather than what their browser
guesses.

**Adding a fourth language** is three steps: add it to `locales` in
`src/i18n/config.ts`, add its `htmlLang`/`ogLocale`/`localeNames` entries, and
create `src/lib/content/<locale>.ts`. TypeScript then flags everything still
missing — including any single dish description you forgot.

## The experience, section by section

| # | Section | Motion |
|---|---------|--------|
| — | **Hero** | A photograph of the house fixed behind everything, drifting and settling as you scroll; blur→sharp headline reveal. |
| 01 | **A Casa** | Text "illuminates" word-by-word, scrubbed to scroll. |
| 02 | **O Sushi Bar** | Pinned. A CSS-drawn nigiri is disassembled into suspended layers and precisely reassembled — a controlled "exploded view", never an explosion. |
| 03 | **Do Mar** | Pinned **horizontal** film-strip on desktop (macro panels pan past); clean vertical stack on mobile. |
| 04 | **A Cozinha** | Editorial split; image reveals behind a rising clip-path curtain while it slowly scales. |
| 05 | **Menu** | Editorial list (no cards); category rail across 9 categories; cursor-following macro preview on desktop. |
| 06 | **Galeria** | Asymmetric, offset two-column composition with per-item parallax and masked reveals. |
| 07 | **Reservas** | Huge negative space; a restrained 3-field modal (date / time / people). |
| — | **Final CTA** | Near-black closing frame; headline scales imperceptibly; slow hand-off to the footer. |
| — | **Footer** | Minimal — address, hours, contact, social, legal, language. |

Plus: a discreet **custom cursor** (desktop only) that expands and shows a word
over interactive elements, and a scroll-progress hairline in the navbar.

## Editing content

Content is split so that nothing can drift between languages:

```
src/lib/content/
  shared.ts   # everything language-independent: prices, dish names, photos,
              # gradients, contacts, opening times, frame counts
  pt.ts       # text only
  en.ts       # text only
  es.ts       # text only
  types.ts    # the shape both sides must satisfy
  index.ts    # merges shared + one dictionary → the object components consume
```

- **Change a price, a photo or a dish name** → `shared.ts`, once, and all three
  languages update.
- **Change wording** → the relevant locale file.
- Components never import a locale file. They call `useContent()` and receive one
  identically-shaped object, so the same components render in any language.

Because every id is a TypeScript literal union, a locale file that forgets a
dish, an ingredient or a gallery caption **fails to build** rather than silently
falling back to another language.

Wiring this to a CMS later means replacing the dictionary imports in `index.ts`
with a fetch — components stay exactly as they are.

To send bookings to WhatsApp instead of the built-in modal, set
`reservations.externalUrl` in `shared.ts` to `contact.whatsapp`. Or wire
`onSubmit` in `ReservationSection.tsx` to a Server Action / API route.

## Adding real assets

See [`public/media/README.md`](public/media/README.md) for file names and paths.
In short: put files under `public/media/`, set the matching field in
`shared.ts`, done — for all three languages at once. Photography should be dark,
high-contrast and macro to sit naturally against the near-black UI.

## Performance & accessibility

- Statically pre-rendered per language (`●` in the build output); ~210 kB First
  Load JS.
- `next/image` with lazy loading + graceful fallback for every photo.
- **`prefers-reduced-motion` is fully respected** — Lenis is disabled, heavy
  scroll sequences fall back to static/immediate states, the background stops
  drifting, and nothing is ever left hidden.
- The background photograph is the LCP element: served through `next/image`
  with a responsive `srcset` and preloaded.
- Semantic HTML, translated `aria-label`s, keyboard-navigable, visible focus
  rings, `alt` text, modal with `Esc`-to-close and backdrop dismiss.
- SEO: per-language metadata, `hreflang` alternates, Open Graph + Twitter cards
  (with a **code-generated** OG image per language — no static asset),
  `robots.txt`, `sitemap.xml`, favicon, and **Schema.org `Restaurant`**
  structured data with the real address and opening hours.

## Project structure

```
src/
  middleware.ts             # / → /pt | /en | /es
  i18n/config.ts            # locales, default, lang tags, switcher labels
  app/
    layout.tsx              # pass-through (required by the root not-found)
    not-found.tsx           # 404 outside any language
    [locale]/
      layout.tsx            # THE root layout: <html lang>, fonts, metadata, JSON-LD
      page.tsx              # composes the whole scroll narrative
      opengraph-image.tsx   # dynamic OG/Twitter image, per language
      not-found.tsx         # 404 inside a language
    globals.css  icon.svg  robots.ts  sitemap.ts
  components/
    Navbar  Hero  IntroSection  SushiExperience  IngredientShowcase
    ChefSection  MenuSection  Gallery  ReservationSection  FinalCTA  Footer
    SmoothScroll  CustomCursor  LocaleSwitcher
    ui/  SectionTitle  RevealText  CinematicImage  Placeholder  MagneticButton
  hooks/  useMediaQuery  useReducedMotion  useScrollProgress
  lib/
    content/                # see "Editing content" above
    content-context.tsx     # useContent() / useLocale()
    gsap.ts
```

## Source of the content

Dish names, prices, contact details and opening hours were taken from the
restaurant's own site, [maresco.bardapraia.com.pt](https://maresco.bardapraia.com.pt/).
Dish **descriptions** are written for this site: accurate for the classics,
and a neutral "house creation" line where the original menu lists a name only.
Those, plus the three figures in the kitchen section, are the parts worth
confirming with the restaurant before going live.
