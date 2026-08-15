import type { Copy } from "./types";

/**
 * ENGLISH — for visitors and tourists in Póvoa de Varzim.
 * Dish names stay in Portuguese (they live in ./shared.ts); the description
 * below carries the translation.
 */
export const en: Copy = {
  site: {
    tagline: "Come and taste the sea.",
    description:
      "Maresco — seafood house and sushi bar in Póvoa de Varzim, Portugal. Fish and shellfish from local suppliers, cooked over coals, alongside a sushi bar that reads the same catch in a different language.",
  },

  nav: {
    links: {
      sushi: "Sushi Bar",
      mar: "From the Sea",
      cozinha: "The Kitchen",
      menu: "Menu",
      galeria: "Gallery",
    },
    cta: "Book",
  },

  hero: {
    eyebrow: "Seafood & Sushi · Póvoa de Varzim",
    headline: ["The flavours", "of the sea."],
    subheadline: ["Seafood house and sushi bar.", "Póvoa de Varzim, Portugal."],
    scrollLabel: "Scroll",
  },

  film: {
    eyebrow: "The sea, in motion",
    lines: ["From the sea,", "to the table."],
    hint: "Scroll to play",
  },

  intro: {
    eyebrow: "01 — The House",
    lines: ["We do not invent the sea.", "We serve it —", "the day it arrives."],
    body: "Fish and shellfish from local suppliers, cooked with technique and without ornament. Beside it, a sushi bar that treats the same catch in another language. Two kitchens, one product.",
  },

  art: {
    eyebrow: "02 — The Sushi Bar",
    dishName: "Maresco Signature Nigiri",
    dishTagline: "Torched salmon · Truffle oil · Fleur de sel",
    title: ["One piece,", "from within."],
    body: "Rice at body temperature. A whisper of vinegar. Fresh Atlantic salmon lightly torched to order, local sea salt crystals and a touch of truffle oil. Watch our signature Nigiri come apart — and back together — and discover the craft hidden inside its quiet balance.",
    steps: {
      topping: { label: "Sea Salt & Truffle", note: "Drizzle of truffle oil, Portuguese fleur de sel and fresh chives." },
      neta: { label: "Neta (Torched Salmon)", note: "Fresh salmon sliced against the grain and gently flame-seared." },
      nori: { label: "Nori & Nikiri Glaze", note: "Crisp seaweed ribbon and house-made nikiri soy reduction." },
      wasabi: { label: "Hon-Wasabi", note: "Freshly grated wasabi to balance the richness of the fish." },
      shari: { label: "Shari", note: "Artisanal vinegared rice, hand-shaped with a tender touch." },
    },
  },

  ingredients: {
    eyebrow: "03 — From the Sea",
    title: ["From", "the sea", "to the table."],
    items: {
      sapateira: {
        tagline: "Queen of the market.",
        description:
          "Sweet meat and deep coral — she is what gives body to every one of our platters. Opened and stuffed by hand, served in her own shell.",
        origin: "Atlantic coast · Local suppliers",
      },
      lagosta: {
        tagline: "Simple luxury.",
        description:
          "Grilled with nothing but olive oil and salt, so nothing is taken from the flavour. No fixed price: you pay the weight of the day.",
        origin: "Atlantic coast · Priced daily",
      },
      camarao: {
        tagline: "Fire and coals.",
        description:
          "Tiger prawns grilled until the shell crackles, with garlic and lemon. The dish every table orders sooner or later.",
        origin: "Chef's selection · Over coals",
      },
      ostra: {
        tagline: "The sea, undiluted.",
        description:
          "Shucked the moment it leaves for your table. Saline, mineral, nothing in between — not even a fork, if you prefer.",
        origin: "Raw · Per piece",
      },
      ameijoa: {
        tagline: "À Bulhão-Pato.",
        description:
          "Coriander, garlic and olive oil. The most ordered starter in the house and, for exactly that reason, the one with least room for error.",
        origin: "Atlantic coast · Local suppliers",
      },
      maguro: {
        tagline: "The sushi bar's cut.",
        description:
          "From tataki to otoro. Seared outside and raw at the centre, or simply sliced thin and left alone.",
        origin: "Sushi bar · Cut of the day",
      },
      salmao: {
        tagline: "Cold-water silk.",
        description:
          "Firm and luminous. Marinated in kimchi, cured, or sliced for sashimi — it holds all three readings without falling apart.",
        origin: "Sushi bar · Cut of the day",
      },
      bacalhau: {
        tagline: "Ours, always.",
        description:
          "Smoked and sliced thin for sashimi, or as a thick loin under a crust of cornbread and almond. The same fish, two centuries apart.",
        origin: "Two readings · Cold and hot",
      },
    },
  },

  chef: {
    eyebrow: "04 — The Kitchen",
    name: "Two kitchens, one table",
    role: "Seafood house and sushi bar · Póvoa de Varzim",
    philosophy: "Come and taste the sea.",
    paragraphs: [
      "Maresco works with local suppliers to guarantee fresh fish and shellfish every day. What comes in that morning is what is served that evening — and what does not come in is not served.",
      "In the seafood kitchen, traditional technique: coals, pot and time. At the sushi bar, the same raw material read in another language — thin cuts, seasoned rice, discreet sauces.",
      "It is one kitchen speaking two languages. And the same demand on the product in both.",
    ],
    stats: {
      pratos: "Dishes on the menu",
      cozinhas: "Kitchens under one roof",
      servicos: "Services a day",
    },
  },

  menu: {
    eyebrow: "05 — The Menu",
    title: ["The Maresco", "menu."],
    categories: {
      entradas: { label: "Starters", note: "To begin — and to share." },
      sushibar: { label: "Sushi Bar", note: "Cold and hot starters from the sushi bar." },
      mariscos: { label: "Shellfish", note: "Straight from the market, cooked to order." },
      peixe: { label: "Fish", note: "Fresh, grilled over coals." },
      carne: { label: "Meat", note: "For those who come for the sea and stay for the fire." },
      rolls: { label: "Special Rolls", note: "Creations from our sushi bar." },
      sashimi: { label: "Sashimi & Nigiri", note: "Clean cuts, no hurry." },
      temaki: { label: "Temaki & Gunkan", note: "Piece by piece." },
      sets: { label: "Sushi Sets", note: "Made for the middle of the table." },
    },
    // Translated from the descriptions the restaurant publishes at
    // maresco.bardapraia.com.pt — not invented marketing copy.
    items: {
      // Starters
      couvert:
        "Butter candle, olive tapenade, fig butter, Douro Moscatel and a selection of breads.",
      ameijoasBulhaoPato: "Sautéed in olive oil, garlic, white wine and coriander.",
      ameijoasEspanhola: "Sautéed with peppers, onion and tomato.",
      gambasAlho: "Sautéed in olive oil and garlic.",
      gambasNatural: "Boiled prawns with cocktail sauce. 6 pieces.",
      tempuraCamarao: "Prawns in almond tempura, sweet chilli sauce.",
      ostras: "Fresh oysters with citrus. Price per piece.",
      zamburinas: "Scallops with the chef's sauce. Price per piece.",
      sapateiraRecheada: "Stuffed brown crab, thin toast and olive oil.",
      sashimiBacalhau: "Smoked cod, chickpea purée and grated egg.",
      bolinhoBacalhau: "With Serra cheese. 1 piece.",
      burrataPanada: "Kataifi pastry, tomato sauce, pesto, cured ham and basil.",
      folhadoCabra: "Caramelised goat's cheese, pepper jam and pear in syrup.",
      paoQueijo: "Melted mozzarella, mayonnaise and chouriço.",
      trufasAlheira: "With a fried quail egg. 4 pieces.",
      sopaPeixe: "Fish and prawn broth with pasta.",
      cremeLegumes: "Traditional vegetable cream soup.",

      // Sushi Bar
      tatakiMaguro: "Tuna seared with sesame, fried leek and the chef's sauce.",
      tartaroMaguro:
        "Tuna, red onion, kizami, Dijon mustard, chives and the chef's sauce.",
      tacoShiro:
        "Crisp tacos with white fish, red onion, avocado, peppers and citrus. 2 pieces.",
      usuzukuri: "Carpaccio of tuna, salmon, white fish and scallop with ponzu.",
      kimchiSalmao: "Korean salmon salad with fermented vegetables.",
      ceviche: "White fish, red onion, cherry tomato and citrus.",
      gyosas: "Steamed chicken and vegetable dumplings, ponzu sauce. 5 pieces.",

      // Shellfish
      mistoSupremo:
        "Stuffed crab, 2 grilled tiger prawns, grilled lobster, bulhão-pato clams, boiled prawns, garlic prawns, mussel with vinaigrette and shoestring potatoes. For 4.",
      mistoQuente:
        "Garlic prawns, grilled prawn, scallops, bulhão-pato clams, almond prawn tempura and shoestring potatoes. For 2.",
      mistoTigre:
        "Stuffed crab, boiled prawn, bulhão-pato clams, 1 grilled tiger prawn, mussel with vinaigrette and shoestring potatoes. For 2.",
      mistoSapateira:
        "Stuffed crab, oysters, boiled prawns, mussel with vinaigrette, clam, 2 grilled tiger prawns and shoestring potatoes. For 2.",
      arrozRico:
        "Creamy mixed shellfish rice with 2 charcoal-grilled prawns. For 2.",
      camaraoTigre:
        "Grilled tiger prawn of roughly 300 g, shoestring potatoes and fresh salad.",
      lasanhaCaranguejo: "Oven-gratinated, with fresh salad.",
      lagostaGrelhada: "Shoestring potatoes and fresh salad. Priced daily.",
      lavaganteGrelhado: "Shoestring potatoes and fresh salad. To order.",

      // Fish
      postaRodovalho: "Grilled over coals, smashed potatoes and green beans.",
      arrozTamboril: "Rich monkfish rice with prawns and coriander. For 2.",
      peixeFresco:
        "Grilled over coals, smashed potatoes and green beans. Price per kilo.",
      espetoLulas:
        "With peppers, the chef's special sauce, smashed potatoes and green beans. For 2.",
      lomboBacalhau:
        "Confit in olive oil, with cornbread and almond, caramelised onion and mashed potato.",
      backToBlack: "Cod loin confit in olive oil, onion purée with squid ink.",
      lulasGrelhadas: "Grilled over coals, smashed potatoes and green beans.",

      // Meat
      surfTurf:
        "1 grilled tiger prawn, charcoal-grilled sirloin, Gaslow salad and fries. For 2.",
      fraldinha:
        "Aged 30 days, over coals, fries and wild rice with sautéed vegetables. For 2.",
      picanhaPlumas:
        "Sliced picanha and Iberian pork plumes, grilled chouriço, fries and wild rice with sautéed vegetables. For 2.",
      filetMignon:
        "Charcoal-grilled, fries and wild rice with sautéed vegetables.",
      hamburguerVeg: "Fries and sautéed wild rice.",

      // Special Rolls
      unagiRoll:
        "Rice-wrapped, salmon, tempura prawn, Japanese mayonnaise and smoked eel.",
      marescoHotRoll:
        "Rice, salmon, Philadelphia, chives, sesame, tobiko roe and teriyaki sauce.",
      papperRiceRoll:
        "Rice-paper-wrapped, tempura prawn, Iberian lettuce, tuna, Japanese mayonnaise and tobiko roe.",
      ebiTunaRoll: "Boiled prawn, avocado, tuna, kizami and roe.",
      takuwan: "Rice-wrapped, salmon, soft-shell crab and crisp ginger.",
      hotRoll: "Rice, salmon, prawn, Philadelphia and tobiko roe.",
      marescoRoll: "Rice-wrapped, mixed fish, tobiko roe and chives.",

      // Sashimi & Nigiri
      otoro7: "Tuna belly. 7 pieces.",
      sashimi20: "Mixed fish. 20 pieces.",
      nigiriPremium12: "The chef's suggestion. 12 pieces.",
      sashimi12: "Mixed fish. 12 pieces.",
      atum7: "7 pieces.",
      shiro7: "White fish. 7 pieces.",
      salmao7: "7 pieces.",
      nigiri6: "The chef's suggestion. 6 pieces.",

      // Temaki & Gunkan
      gunkanMaresco: "Premium gunkan, the chef's suggestion. 8 pieces.",
      temakiMaresco: "The chef's suggestion.",
      gunkanChef: "White fish gunkan, apple and foie gras. 2 pieces.",
      temakiAtum: "Nori seaweed, rice and tuna.",
      gunkanTrufa: "Ebi maki, salmon, quail egg and truffle. 2 pieces.",
      temakiSalmao: "Nori seaweed, rice and salmon.",
      temakiVeg: "Nori seaweed, rice and vegetables.",

      // Sets
      setPremium50: "50 pieces.",
      setSpecial50: "50 pieces.",
      setMaresco25: "25 pieces.",
      setVegan12: "12 pieces.",
      setFreestyle12: "12 pieces.",
    },
  },

  gallery: {
    eyebrow: "06 — Gallery",
    title: ["The house,", "from within."],
    // These double as the images' alt text, so they must describe what each
    // photograph actually shows.
    captions: {
      g1: "The deck, on the sand",
      g2: "In the shade of the palms",
      g3: "The wind, on the sea side",
      g4: "The shellfish platter, sea in view",
      g5: "Late afternoon, at the table",
      g6: "Surf and turf, at dinner",
      g7: "Dessert, in the sun",
    },
  },

  reservations: {
    eyebrow: "07 — Reservations",
    title: ["Your table", "is waiting."],
    body: "Lunch from 12:00 to 15:00 and dinner from 19:00 to 23:00, every day. For groups and special dates, reach us by phone or WhatsApp.",
    cta: "Book a table",
  },

  finalCta: {
    headline: ["See you", "at the table."],
    cta: "Book",
  },

  contact: {
    hours: [
      { day: "Lunch", time: "Every day · 12:00 – 15:00" },
      { day: "Dinner", time: "Every day · 19:00 – 23:00" },
    ],
    legal: {
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      complaints: "Complaints Book",
    },
  },

  ui: {
    nav: {
      home: "home",
      openMenu: "Open menu",
      closeMenu: "Close menu",
      language: "Language",
    },
    hero: { sectionLabel: "Introduction", scrollAria: "Scroll to explore" },
    ingredients: {
      note: "Eight products that define the house. Scroll to move through them.",
      kicker: "Macro photograph",
    },
    chef: { kicker: "The kitchen" },
    menu: {
      categoriesAria: "Menu categories",
      kicker: "Dish",
      cursorLabel: "View",
      onRequest: "On request",
    },
    gallery: { kicker: "Gallery" },
    reserve: {
      cursorLabel: "Book",
      openAria: "Open reservation form",
      title: "Book a table",
      close: "Close",
      date: "Date",
      time: "Time",
      guests: "Guests",
      guestOne: "guest",
      guestOther: "guests",
      submit: "Request booking",
      disclaimer: "Reservations are confirmed by email or phone.",
      doneTitle: "Request received",
      doneBody:
        "A table for {guests} on {date} at {time}. We will confirm with you shortly.",
      chosenDate: "your chosen date",
    },
    footer: {
      location: "Address",
      hours: "Opening hours",
      contact: "Contact",
      maps: "Google Maps",
      rights: "All rights reserved.",
    },
    media: {
      placeholder: "Image pending",
      staticBackground: "Static background (reduced data/motion)",
    },
  },
};
