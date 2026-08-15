/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTENT SHAPE — Maresco · Seafood & Sushi
 * ─────────────────────────────────────────────────────────────────────────────
 *  Two shapes live here:
 *
 *   • `Content` — what components consume. Identical in every language.
 *   • `Copy`    — what a translator fills in. Text only: no image paths, no
 *                 gradients, no prices, no phone numbers.
 *
 *  Everything non-textual lives once in ./shared.ts and is merged onto each
 *  `Copy` by ./index.ts. That split is the point: a price, a tint or a dish name
 *  can never drift between languages, because it only exists in one place.
 *
 *  Dish and ingredient NAMES are deliberately shared, not translated: the menu
 *  keeps its Portuguese names in every language (the way a Portuguese seafood
 *  house presents itself abroad) and the description carries the translation.
 *
 *  All ids below are literal unions, so a locale file that forgets a dish, an
 *  ingredient or a gallery caption fails to compile.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type NavId = "sushi" | "mar" | "cozinha" | "menu" | "galeria";

export type IngredientId =
  | "sapateira"
  | "lagosta"
  | "camarao"
  | "ostra"
  | "ameijoa"
  | "maguro"
  | "salmao"
  | "bacalhau";

export type ArtStepId = "topping" | "neta" | "nori" | "wasabi" | "shari";

export type ChefStatId = "pratos" | "cozinhas" | "servicos";

export type MenuCategoryId =
  | "entradas"
  | "sushibar"
  | "mariscos"
  | "peixe"
  | "carne"
  | "rolls"
  | "sashimi"
  | "temaki"
  | "sets";

export type MenuItemId =
  // entradas
  | "couvert"
  | "ameijoasEspanhola"
  | "zamburinas"
  | "tempuraCamarao"
  | "gambasNatural"
  | "burrataPanada"
  | "paoQueijo"
  | "trufasAlheira"
  | "ameijoasBulhaoPato"
  | "gambasAlho"
  | "ostras"
  | "sapateiraRecheada"
  | "sashimiBacalhau"
  | "bolinhoBacalhau"
  | "folhadoCabra"
  | "sopaPeixe"
  | "cremeLegumes"
  // sushi bar
  | "tacoShiro"
  | "usuzukuri"
  | "tatakiMaguro"
  | "kimchiSalmao"
  | "ceviche"
  | "tartaroMaguro"
  | "gyosas"
  // mariscos
  | "mistoSapateira"
  | "mistoQuente"
  | "arrozRico"
  | "lasanhaCaranguejo"
  | "lagostaGrelhada"
  | "mistoTigre"
  | "mistoSupremo"
  | "camaraoTigre"
  | "lavaganteGrelhado"
  // peixe
  | "peixeFresco"
  | "arrozTamboril"
  | "backToBlack"
  | "lulasGrelhadas"
  | "postaRodovalho"
  | "lomboBacalhau"
  | "espetoLulas"
  // carne & vegetariano
  | "surfTurf"
  | "fraldinha"
  | "picanhaPlumas"
  | "filetMignon"
  | "hamburguerVeg"
  // special rolls
  | "marescoRoll"
  | "unagiRoll"
  | "papperRiceRoll"
  | "marescoHotRoll"
  | "takuwan"
  | "ebiTunaRoll"
  | "hotRoll"
  // sashimi & nigiri
  | "sashimi12"
  | "sashimi20"
  | "salmao7"
  | "shiro7"
  | "atum7"
  | "otoro7"
  | "nigiri6"
  | "nigiriPremium12"
  // temaki & gunkan
  | "gunkanTrufa"
  | "gunkanChef"
  | "gunkanMaresco"
  | "temakiSalmao"
  | "temakiAtum"
  | "temakiMaresco"
  | "temakiVeg"
  // sets
  | "setPremium50"
  | "setMaresco25"
  | "setSpecial50"
  | "setVegan12"
  | "setFreestyle12";

export type GalleryId = "g1" | "g2" | "g3" | "g4" | "g5" | "g6" | "g7";

export type LegalId = "privacy" | "terms" | "complaints";

/* ── Merged, component-facing shapes ──────────────────────────────────────── */

export type NavLink = { id: NavId; label: string; href: string };

export type Ingredient = {
  id: IngredientId;
  /** Portuguese name — shared across locales. */
  name: string;
  /** Scientific or market name shown small beside it. */
  latin: string;
  tagline: string;
  description: string;
  origin: string;
  /** Optional macro photograph. Path under /public. Placeholder used if absent. */
  image?: string;
  /** Two-stop gradient used to render the placeholder + as an image tint. */
  tint: [string, string];
};

export type MenuItem = {
  id: MenuItemId;
  /** Portuguese dish name — shared across locales. */
  name: string;
  description: string;
  /** Absent when the dish is priced on the day (`ui.menu.onRequest` shows). */
  price?: string;
  /** Optional dish photograph revealed on hover (desktop). */
  image?: string;
};

export type MenuCategory = {
  id: MenuCategoryId;
  label: string;
  note?: string;
  items: MenuItem[];
};

export type GalleryItem = {
  id: GalleryId;
  caption: string;
  image?: string;
  tint: [string, string];
  /** Relative scroll speed for parallax. 1 = normal, <1 slower, >1 faster. */
  speed: number;
  /** Grid span hints for the asymmetric desktop composition. */
  span: "sm" | "md" | "lg" | "tall";
};

export type Content = {
  site: {
    name: string;
    wordmark: string;
    legalName: string;
    url: string;
    city: string;
    tagline: string;
    description: string;
  };
  nav: { links: NavLink[]; cta: { label: string; href: string } };
  hero: {
    eyebrow: string;
    headline: string[];
    subheadline: string[];
    scrollLabel: string;
  };
  film: {
    /** Shown until the sequence streams in, and on reduced-motion/slow links. */
    poster: string;
    frames: {
      desktop: { count: number; path: string };
      mobile: { count: number; path: string };
    };
    eyebrow: string;
    lines: string[];
    hint: string;
  };
  intro: { eyebrow: string; lines: string[]; body: string };
  art: {
    eyebrow: string;
    dishName: string;
    dishTagline?: string;
    title: string[];
    body: string;
    /** The finished piece, shown beside the exploded diagram. */
    image?: string;
    steps: { id: ArtStepId; label: string; note: string }[];
  };
  ingredients: { eyebrow: string; title: string[]; items: Ingredient[] };
  chef: {
    eyebrow: string;
    name: string;
    role: string;
    image: string;
    philosophy: string;
    paragraphs: string[];
    stats: { id: ChefStatId; value: string; label: string }[];
  };
  menu: { eyebrow: string; title: string[]; categories: MenuCategory[] };
  gallery: { eyebrow: string; title: string[]; items: GalleryItem[] };
  reservations: {
    eyebrow: string;
    title: string[];
    body: string;
    cta: string;
    /** External booking provider URL — set to send guests straight to WhatsApp. */
    externalUrl: string;
    times: string[];
    maxGuests: number;
  };
  finalCta: { headline: string[]; cta: string };
  contact: {
    address: string[];
    hours: { day: string; time: string }[];
    phone: string;
    whatsapp: string;
    email: string;
    social: { label: string; href: string }[];
    legal: { id: LegalId; label: string; href: string }[];
  };
  /** Interface strings that are not editorial content but still need translating. */
  ui: {
    nav: { home: string; openMenu: string; closeMenu: string; language: string };
    hero: { sectionLabel: string; scrollAria: string };
    ingredients: { note: string; kicker: string };
    chef: { kicker: string };
    menu: {
      categoriesAria: string;
      kicker: string;
      cursorLabel: string;
      onRequest: string;
    };
    gallery: { kicker: string };
    reserve: {
      cursorLabel: string;
      openAria: string;
      title: string;
      close: string;
      date: string;
      time: string;
      guests: string;
      guestOne: string;
      guestOther: string;
      submit: string;
      disclaimer: string;
      doneTitle: string;
      /** Placeholders: {guests} {date} {time} */
      doneBody: string;
      chosenDate: string;
    };
    footer: {
      location: string;
      hours: string;
      contact: string;
      maps: string;
      rights: string;
    };
    media: { placeholder: string; staticBackground: string };
  };
};

/* ── Translator-facing shape: text only ───────────────────────────────────── */

export type Copy = {
  site: Pick<Content["site"], "tagline" | "description">;
  nav: { links: Record<NavId, string>; cta: string };
  hero: Pick<Content["hero"], "eyebrow" | "headline" | "subheadline" | "scrollLabel">;
  film: Pick<Content["film"], "eyebrow" | "lines" | "hint">;
  intro: Content["intro"];
  art: {
    eyebrow: string;
    dishName: string;
    dishTagline?: string;
    title: string[];
    body: string;
    steps: Record<ArtStepId, { label: string; note: string }>;
  };
  ingredients: {
    eyebrow: string;
    title: string[];
    items: Record<IngredientId, { tagline: string; description: string; origin: string }>;
  };
  chef: {
    eyebrow: string;
    name: string;
    role: string;
    philosophy: string;
    paragraphs: string[];
    stats: Record<ChefStatId, string>;
  };
  menu: {
    eyebrow: string;
    title: string[];
    categories: Record<MenuCategoryId, { label: string; note: string }>;
    /** Description only — dish names are shared. */
    items: Record<MenuItemId, string>;
  };
  gallery: {
    eyebrow: string;
    title: string[];
    captions: Record<GalleryId, string>;
  };
  reservations: Pick<Content["reservations"], "eyebrow" | "title" | "body" | "cta">;
  finalCta: Pick<Content["finalCta"], "headline" | "cta">;
  contact: {
    hours: { day: string; time: string }[];
    legal: Record<LegalId, string>;
  };
  ui: Content["ui"];
};
