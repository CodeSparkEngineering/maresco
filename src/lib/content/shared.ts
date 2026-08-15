/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  LANGUAGE-INDEPENDENT DATA — Maresco · Seafood & Sushi
 * ─────────────────────────────────────────────────────────────────────────────
 *  Assets, gradients, prices, dish names, coordinates, frame counts, layout
 *  hints — anything identical whichever language the visitor reads. It lives
 *  here exactly once, so changing a price or swapping a photograph is a single
 *  edit rather than three edits that can silently fall out of sync.
 *
 *  Contact details, prices and the dish list come from the restaurant's own
 *  site (maresco.bardapraia.com.pt). Dish names stay in Portuguese in every
 *  language; the translated description sits beside them.
 *
 *  Image/video fields are plain paths under /public. Where an asset does not yet
 *  exist the UI renders a clearly-labelled cinematic placeholder, so the site is
 *  fully navigable with zero real assets. Drop real files at the given paths to
 *  replace placeholders — no component edits required.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type {
  ArtStepId,
  ChefStatId,
  GalleryItem,
  IngredientId,
  LegalId,
  MenuCategoryId,
  MenuItemId,
  NavId,
} from "./types";

export const shared = {
  site: {
    name: "MARESCO",
    wordmark: "Seafood & Sushi",
    legalName: "Maresco — Seafood & Sushi",
    url: "https://maresco.bardapraia.com.pt",
    city: "Póvoa de Varzim",
  },

  nav: {
    links: [
      { id: "sushi", href: "#sushi" },
      { id: "mar", href: "#mar" },
      { id: "cozinha", href: "#cozinha" },
      { id: "menu", href: "#menu" },
      { id: "galeria", href: "#galeria" },
    ] as { id: NavId; href: string }[],
    cta: { href: "#reservas" },
  },

  /**
   * Scroll-driven image sequence (the "Apple recipe"): the film is exploded
   * into a WebP frame sequence with ffmpeg and scrubbed onto a fixed <canvas>
   * as you scroll, with lerp smoothing and a legibility scrim.
   *
   * Source: `/source/ocean-nigiri.mp4` — 1920x1080, 24fps, 10s, one continuous
   * take. Masters live in /source, not /public: only the frames are ever
   * served, so shipping the 12 MB video would be pure deploy weight.
   * An Atlantic wave breaks into droplets, the components of a nigiri separate
   * and hang suspended in an exploded view, then draw back together into the
   * finished piece. That arc maps onto the page on purpose: the visitor arrives
   * on open ocean and leaves with the piece composed.
   *
   * Requirements for any replacement, learned the hard way: horizontal, 1080p
   * or better, ONE continuous take with no cuts, and visible camera or subject
   * travel. Vertical phone footage cropped to a desktop viewport, or a clip cut
   * every two seconds, both break the effect.
   *
   * Regenerate with:
   *
   *   ffmpeg -i source/ocean-nigiri.mp4 -vf "fps=20,scale=1280:-2" \
   *     -c:v libwebp -quality 72 public/frames/desktop/frame_%04d.webp
   *   ffmpeg -i source/ocean-nigiri.mp4 -vf "fps=14,scale=800:-2" \
   *     -c:v libwebp -quality 68 public/frames/mobile/frame_%04d.webp
   *   ffmpeg -i source/ocean-nigiri.mp4 -frames:v 1 \
   *     -vf "scale=1600:-2" -q:v 4 public/media/hero-poster.jpg
   *
   * Keep `count` in sync with the number of files produced — the last frame is
   * requested at the very bottom of the page, so an over-count leaves the film
   * frozen short of the end.
   */
  film: {
    poster: "/media/hero-poster.jpg",
    frames: {
      desktop: { count: 200, path: "/frames/desktop" },
      mobile: { count: 140, path: "/frames/mobile" },
    },
  },

  /** Order of the exploded-nigiri callouts. Labels/notes come from the copy. */
  artSteps: ["topping", "neta", "nori", "wasabi", "shari"] as ArtStepId[],

  /**
   * The real piece, shown next to the exploded diagram — the drawn layers show
   * how it is built, the photograph shows what actually arrives at the table.
   */
  artImage: "/media/prato-sushi-flores.jpg",

  /**
   * The eight panels of the "Do Mar" strip. A photograph is only attached where
   * the product is unmistakably the subject of the frame — the caption is also
   * the image's alt text, so a loose match would be a wrong description, not
   * just a weak picture. The four still on placeholders are listed in
   * public/media/README.md.
   */
  ingredients: [
    {
      id: "sapateira",
      name: "Sapateira",
      latin: "Cancer pagurus",
      image: "/media/prato-sapateira-recheada.jpg",
      tint: ["#2e1a16", "#b56a4a"],
    },
    {
      id: "lagosta",
      name: "Lagosta",
      latin: "Palinurus elephas",
      image: "/media/prato-lagosta-grelhada.jpg",
      tint: ["#2a1214", "#c9503f"],
    },
    {
      id: "camarao",
      name: "Camarão Tigre",
      latin: "Penaeus monodon",
      image: "/media/prato-surf-and-turf.jpg",
      tint: ["#331a16", "#e0764e"],
    },
    {
      id: "ostra",
      name: "Ostra",
      latin: "Ostrea edulis",
      image: "/media/prato-marisco-gelo.jpg",
      tint: ["#16201f", "#7f9a94"],
    },
    {
      id: "ameijoa",
      name: "Amêijoa",
      latin: "Ruditapes decussatus",
      image: "/media/prato-cataplana.jpg",
      tint: ["#201d18", "#b8a888"],
    },
    {
      id: "maguro",
      name: "Atum",
      latin: "Maguro · 鮪",
      image: "/media/prato-atum-tataki.jpg",
      tint: ["#2a1418", "#a8383f"],
    },
    {
      id: "salmao",
      name: "Salmão",
      latin: "Sake · 鮭",
      image: "/media/prato-salmao-sashimi.jpg",
      tint: ["#3a2216", "#e08a4e"],
    },
    {
      id: "bacalhau",
      name: "Bacalhau",
      latin: "Gadus morhua",
      image: "/media/prato-lombo-bacalhau.jpg",
      tint: ["#1a1d20", "#9aa8ad"],
    },
  ] as {
    id: IngredientId;
    name: string;
    latin: string;
    image?: string;
    tint: [string, string];
  }[],

  chef: {
    // Wide shot of the deck in service — swap for a kitchen/team photograph
    // when one exists.
    image: "/media/ambiente-toldos-praia.jpg",
    /**
     * Figures derived from the restaurant's own menu and service hours.
     * Confirm with the client before going live.
     */
    stats: [
      { id: "pratos", value: "72" },
      { id: "cozinhas", value: "2" },
      { id: "servicos", value: "2" },
    ] as { id: ChefStatId; value: string }[],
  },

  /**
   * Category order, item order, dish names and prices — as published by the
   * restaurant. `price` omitted = priced on the day (shows ui.menu.onRequest).
   */
  menu: [
    {
      id: "entradas",
      items: [
        { id: "couvert", name: "Maresco Couvert", price: "6,50€" },
        { id: "ameijoasBulhaoPato", name: "Amêijoas à Bulhão-Pato", price: "23€" },
        { id: "ameijoasEspanhola", name: "Amêijoas à Espanhola", price: "25€" },
        { id: "gambasAlho", name: "Gambas ao Alho", price: "11,50€" },
        { id: "gambasNatural", name: "Gambas ao Natural", price: "11€" },
        { id: "tempuraCamarao", name: "Tempura de Camarão em Amêndoa", price: "15€" },
        { id: "ostras", name: "Ostras ao Natural", price: "3€" },
        { id: "zamburinas", name: "Zamburinas", price: "3€" },
        {
          id: "sapateiraRecheada",
          name: "Sapateira Recheada",
          price: "30€",
          image: "/media/prato-sapateira-recheada.jpg",
        },
        { id: "sashimiBacalhau", name: "Sashimi de Bacalhau Fumado", price: "15€" },
        { id: "bolinhoBacalhau", name: "Bolinho de Bacalhau à la Chef", price: "8€" },
        { id: "burrataPanada", name: "Burrata Panada", price: "16€" },
        { id: "folhadoCabra", name: "Folhado de Queijo de Cabra e Compota de Pimentos", price: "10,50€" },
        { id: "paoQueijo", name: "Pão Rústico com Queijo", price: "10€" },
        { id: "trufasAlheira", name: "Trufas de Alheira e Ovo Estrelado de Codorniz", price: "9€" },
        { id: "sopaPeixe", name: "Sopa de Peixe e Camarão", price: "7,50€" },
        { id: "cremeLegumes", name: "Creme de Legumes", price: "4€" },
      ],
    },
    {
      id: "sushibar",
      items: [
        {
          id: "tatakiMaguro",
          name: "Tataki Maguro",
          price: "21€",
          image: "/media/prato-atum-tataki.jpg",
        },
        { id: "tartaroMaguro", name: "Tártaro Maguro com Raiz de Lótus", price: "20€" },
        { id: "tacoShiro", name: "Taco Shiro", price: "18€" },
        { id: "usuzukuri", name: "Usuzukuri Selection", price: "18€" },
        { id: "kimchiSalmao", name: "Kimchi de Salmão", price: "17€" },
        { id: "ceviche", name: "Ceviche Maresco", price: "15€" },
        { id: "gyosas", name: "Gyosas de Frango e Vegetais", price: "10€" },
      ],
    },
    {
      id: "mariscos",
      items: [
        {
          id: "mistoSupremo",
          name: "Misto Supremo",
          price: "155€",
          image: "/media/prato-marisco-gelo.jpg",
        },
        {
          id: "mistoQuente",
          name: "Misto Quente",
          price: "80€",
          image: "/media/prato-cataplana.jpg",
        },
        { id: "mistoTigre", name: "Misto Tigre", price: "75€" },
        { id: "mistoSapateira", name: "Misto Sapateira Especial", price: "70€" },
        { id: "arrozRico", name: "Arroz Rico de Marisco com Camarão Grelhado", price: "55€" },
        { id: "camaraoTigre", name: "Camarão Tigre Grelhado", price: "43€" },
        { id: "lasanhaCaranguejo", name: "Lasanha de Caranguejo e Camarão", price: "18€" },
        {
          id: "lagostaGrelhada",
          name: "Lagosta Grelhada",
          image: "/media/prato-lagosta-grelhada.jpg",
        },
        { id: "lavaganteGrelhado", name: "Lavagante Grelhado" },
      ],
    },
    {
      id: "peixe",
      items: [
        { id: "postaRodovalho", name: "Posta de Rodovalho", price: "65€" },
        { id: "arrozTamboril", name: "Arroz de Tamboril e Gambas", price: "55€" },
        { id: "peixeFresco", name: "Peixe Fresco Grelhado", price: "50€" },
        { id: "espetoLulas", name: "Espeto de Lulas e Camarão", price: "46€" },
        {
          id: "lomboBacalhau",
          name: "Lombo de Bacalhau com Broa e Amêndoa",
          price: "27€",
          image: "/media/prato-lombo-bacalhau.jpg",
        },
        { id: "backToBlack", name: "Back to Black", price: "27€" },
        { id: "lulasGrelhadas", name: "Lulas Grelhadas", price: "19€" },
      ],
    },
    {
      id: "carne",
      items: [
        {
          id: "surfTurf",
          name: "Surf and Turf",
          price: "59€",
          image: "/media/prato-surf-and-turf-mesa.jpg",
        },
        { id: "fraldinha", name: "Fraldinha do Uruguai Maturada", price: "52,50€" },
        { id: "picanhaPlumas", name: "Picanha e Plumas de Porco Preto", price: "45€" },
        { id: "filetMignon", name: "Filet Mignon com Molho de Soja Branco", price: "27€" },
        { id: "hamburguerVeg", name: "Hamburguer Vegetariano", price: "17€" },
      ],
    },
    {
      id: "rolls",
      items: [
        { id: "unagiRoll", name: "Unagi Roll", price: "17€" },
        { id: "marescoHotRoll", name: "Maresco Hot Roll", price: "17€" },
        { id: "papperRiceRoll", name: "Papper Rice Roll", price: "17€" },
        { id: "ebiTunaRoll", name: "Ebi Tuna Roll", price: "17€" },
        { id: "takuwan", name: "Takuwan", price: "17€" },
        { id: "hotRoll", name: "Hot Roll", price: "17€" },
        { id: "marescoRoll", name: "Maresco Roll", price: "16€" },
      ],
    },
    {
      id: "sashimi",
      items: [
        { id: "otoro7", name: "Otoro · 7 peças", price: "33€" },
        { id: "sashimi20", name: "Sashimi Moriawase · 20 peças", price: "32€" },
        {
          id: "nigiriPremium12",
          name: "Premium Nigiri · 12 peças",
          price: "30€",
          image: "/media/prato-sushi-flores.jpg",
        },
        { id: "sashimi12", name: "Sashimi Moriawase · 12 peças", price: "24€" },
        {
          id: "atum7",
          name: "Atum · 7 peças",
          price: "19€",
          image: "/media/prato-atum-tataki.jpg",
        },
        { id: "shiro7", name: "Shiro · 7 peças", price: "16€" },
        {
          id: "salmao7",
          name: "Salmão · 7 peças",
          price: "14€",
          image: "/media/prato-salmao-sashimi.jpg",
        },
        { id: "nigiri6", name: "Nigiri Moriawase · 6 peças", price: "14€" },
      ],
    },
    {
      id: "temaki",
      items: [
        { id: "gunkanMaresco", name: "Gunkan Special Maresco", price: "27€" },
        { id: "temakiMaresco", name: "Temaki Special Maresco", price: "14€" },
        { id: "gunkanChef", name: "Gunkan Special Chef", price: "12€" },
        { id: "temakiAtum", name: "Temaki de Atum", price: "12€" },
        { id: "gunkanTrufa", name: "Gunkan Special com Trufa", price: "11€" },
        { id: "temakiSalmao", name: "Temaki de Salmão", price: "9€" },
        { id: "temakiVeg", name: "Temaki Vegetariano", price: "9€" },
      ],
    },
    {
      id: "sets",
      items: [
        { id: "setPremium50", name: "Maresco Premium · 50 peças", price: "90€" },
        { id: "setSpecial50", name: "Special Maresco · 50 peças", price: "70€" },
        { id: "setMaresco25", name: "Maresco · 25 peças", price: "37€" },
        { id: "setVegan12", name: "Vegan Sushi · 12 peças", price: "20€" },
        { id: "setFreestyle12", name: "Freestyle Maresco · 12 peças", price: "20€" },
      ],
    },
  ] as {
    id: MenuCategoryId;
    items: { id: MenuItemId; name: string; price?: string; image?: string }[];
  }[],

  /**
   * All seven frames carry a real photograph: the venue by day (g1–g3, g5),
   * then the food (g4, g6) and the room's own life (g7). Aspect hints are
   * matched to each source image — `lg` holds the one squarish shot.
   */
  gallery: [
    {
      id: "g1",
      image: "/media/ambiente-esplanada-mar.jpg",
      tint: ["#141a1c", "#35505a"],
      speed: 0.85,
      span: "tall",
    },
    {
      id: "g2",
      image: "/media/ambiente-palmeiras.jpg",
      tint: ["#16201f", "#4a6a62"],
      speed: 1.15,
      span: "md",
    },
    {
      id: "g3",
      image: "/media/ambiente-cortinas-mar.jpg",
      tint: ["#1a1d20", "#6a7a80"],
      speed: 0.95,
      span: "sm",
    },
    {
      id: "g4",
      image: "/media/prato-mariscada-mar.jpg",
      tint: ["#2a1618", "#8a4a4f"],
      speed: 1.25,
      span: "lg",
    },
    {
      id: "g5",
      image: "/media/ambiente-por-do-sol.jpg",
      tint: ["#2a2410", "#c39a4a"],
      speed: 0.8,
      span: "md",
    },
    {
      id: "g6",
      image: "/media/prato-surf-and-turf.jpg",
      tint: ["#241a14", "#7a5240"],
      speed: 1.1,
      span: "tall",
    },
    {
      id: "g7",
      image: "/media/sobremesa-pavlova.jpg",
      tint: ["#14181a", "#3f545a"],
      speed: 0.9,
      span: "sm",
    },
  ] as Omit<GalleryItem, "caption">[],

  reservations: {
    /**
     * Leave empty to use the built-in form. Set to the WhatsApp link below to
     * send guests straight to the restaurant's booking channel instead.
     */
    externalUrl: "",
    /** Lunch 12:00–15:00 and dinner 19:00–23:00, per the restaurant's hours. */
    times: [
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "19:00",
      "19:30",
      "20:00",
      "20:30",
      "21:00",
      "21:30",
    ],
    maxGuests: 12,
  },

  contact: {
    address: ["R. da Imprensa Regional", "4490-588 Póvoa de Varzim", "Portugal"],
    phone: "+351 914 236 815",
    whatsapp: "https://wa.me/351914236815",
    email: "geral@maresco.bardapraia.com.pt",
    social: [
      { label: "Instagram", href: "https://www.instagram.com/maresco_restaurante/" },
      { label: "Facebook", href: "https://www.facebook.com/restaurantemaresco/" },
      { label: "WhatsApp", href: "https://wa.me/351914236815" },
      { label: "Google Maps", href: "https://maps.google.com/?q=Maresco+Póvoa+de+Varzim" },
    ],
    legal: [
      { id: "privacy", href: "#" },
      { id: "terms", href: "#" },
      { id: "complaints", href: "https://www.livroreclamacoes.pt/" },
    ] as { id: LegalId; href: string }[],
  },
};
