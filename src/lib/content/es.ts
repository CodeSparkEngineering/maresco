import type { Copy } from "./types";

/**
 * ESPAÑOL — para el visitante gallego y español, a una hora de la Póvoa.
 * Los nombres de los platos se mantienen en portugués (viven en ./shared.ts);
 * la descripción de abajo lleva la traducción.
 */
export const es: Copy = {
  site: {
    tagline: "Venga a probar los sabores del mar.",
    description:
      "Maresco — marisquería y sushi bar en Póvoa de Varzim, Portugal. Pescado y marisco frescos de proveedores locales, cocinados a la brasa, junto a un sushi bar que lee la misma materia prima en otro idioma.",
  },

  nav: {
    links: {
      sushi: "Sushi Bar",
      mar: "Del Mar",
      cozinha: "La Cocina",
      menu: "Carta",
      galeria: "Galería",
    },
    cta: "Reservar",
  },

  hero: {
    eyebrow: "Seafood & Sushi · Póvoa de Varzim",
    headline: ["Los sabores", "del mar."],
    subheadline: ["Marisquería y sushi bar.", "Póvoa de Varzim, Portugal."],
    scrollLabel: "Desliza",
  },

  film: {
    eyebrow: "El mar, en movimiento",
    lines: ["Del mar,", "a la mesa."],
    hint: "Desliza para reproducir",
  },

  intro: {
    eyebrow: "01 — La Casa",
    lines: ["No inventamos el mar.", "Lo servimos —", "el día en que llega."],
    body: "Pescado y marisco de proveedores locales, cocinados con técnica y sin adornos. Al lado, un sushi bar que trata la misma materia prima en otro idioma. Dos cocinas, un solo producto.",
  },

  art: {
    eyebrow: "02 — El Sushi Bar",
    dishName: "Nigiri Especial Maresco",
    dishTagline: "Salmón flambeado · Aceite trufado · Flor de sal",
    title: ["Una pieza,", "por dentro."],
    body: "Arroz a temperatura corporal. Un susurro de vinagre. Salmón fresco del Atlántico ligeramente flambeado, flor de sal de la costa portuguesa y un toque de aceite trufado. Observa nuestro Nigiri Especial deshacerse — y volver a unirse — revelando la precisión de cada detalle.",
    steps: {
      topping: { label: "Flor de Sal y Trufa", note: "Toque de aceite trufado, flor de sal de la costa y cebollino fresco." },
      neta: { label: "Neta (Salmón Flambeado)", note: "Salmón del día cortado a contrafibra y flambeado en el punto justo." },
      nori: { label: "Nori y Reducción Nikiri", note: "Cinta de alga crujiente y reducción nikiri tare de la casa." },
      wasabi: { label: "Hon-Wasabi", note: "Punto de wasabi fresco para equilibrar la untuosidad del corte." },
      shari: { label: "Shari", note: "Arroz avinagrado artesanal, moldeado a mano sin apretar." },
    },
  },

  ingredients: {
    eyebrow: "03 — Del Mar",
    title: ["Del mar", "a la", "mesa."],
    items: {
      sapateira: {
        tagline: "La reina de la lonja.",
        description:
          "Carne dulce y coral intenso — es ella la que da cuerpo a todas nuestras mariscadas. Abierta y rellena a mano, servida en su propio caparazón.",
        origin: "Costa atlántica · Proveedores locales",
      },
      lagosta: {
        tagline: "El lujo sencillo.",
        description:
          "A la brasa solo con aceite de oliva y sal, para no quitarle nada al sabor. Sin precio fijo: se paga el peso del día.",
        origin: "Costa atlántica · Precio del día",
      },
      camarao: {
        tagline: "Fuego y brasa.",
        description:
          "Langostino tigre a la brasa hasta que la cáscara cruje, con ajo y limón. El plato que, tarde o temprano, pide toda la mesa.",
        origin: "Selección del chef · A la brasa",
      },
      ostra: {
        tagline: "El mar, puro.",
        description:
          "Abierta en el momento en que sale a la mesa. Salina, mineral, sin intermediarios — ni siquiera un tenedor, si prefiere.",
        origin: "Al natural · Por unidad",
      },
      ameijoa: {
        tagline: "À Bulhão-Pato.",
        description:
          "Cilantro, ajo y aceite de oliva. El entrante más pedido de la casa y, justo por eso, el que menos margen de error tiene.",
        origin: "Costa atlántica · Proveedores locales",
      },
      maguro: {
        tagline: "El corte del sushi bar.",
        description:
          "Del tataki al otoro. Sellado por fuera y crudo en el centro, o simplemente cortado fino y dejado en paz.",
        origin: "Sushi bar · Corte del día",
      },
      salmao: {
        tagline: "Seda fría.",
        description:
          "Firme y luminoso. Marinado en kimchi, curado o cortado para sashimi — aguanta las tres lecturas sin deshacerse.",
        origin: "Sushi bar · Corte del día",
      },
      bacalhau: {
        tagline: "El nuestro, de siempre.",
        description:
          "Ahumado y cortado fino para sashimi, o en lomo alto con costra de pan de maíz y almendra. El mismo pescado, dos siglos de distancia.",
        origin: "Dos lecturas · Fría y caliente",
      },
    },
  },

  chef: {
    eyebrow: "04 — La Cocina",
    name: "Dos cocinas, una mesa",
    role: "Marisquería y sushi bar · Póvoa de Varzim",
    philosophy: "Venga a probar los sabores del mar.",
    paragraphs: [
      "Maresco trabaja con proveedores locales para garantizar pescado y marisco frescos cada día. Lo que entra por la mañana es lo que se sirve por la noche — y lo que no entra, no se sirve.",
      "En la marisquería, técnica tradicional: brasa, cazuela y tiempo. En el sushi bar, la misma materia prima leída en otro idioma — corte fino, arroz avinagrado, salsas discretas.",
      "Es la misma cocina hablando dos idiomas. Y la misma exigencia con el producto en ambas.",
    ],
    stats: {
      pratos: "Platos en la carta",
      cozinhas: "Cocinas bajo un mismo techo",
      servicos: "Servicios al día",
    },
  },

  menu: {
    eyebrow: "05 — La Carta",
    title: ["La carta", "de Maresco."],
    categories: {
      entradas: { label: "Entrantes", note: "Para empezar — y para compartir." },
      sushibar: { label: "Sushi Bar", note: "Entrantes fríos y calientes del sushi bar." },
      mariscos: { label: "Mariscos", note: "De la lonja, cocinado al momento." },
      peixe: { label: "Pescado", note: "Fresco, a la brasa." },
      carne: { label: "Carne", note: "Para quien viene por el mar y se queda por la brasa." },
      rolls: { label: "Special Rolls", note: "Creaciones de nuestro sushi bar." },
      sashimi: { label: "Sashimi y Nigiri", note: "Cortes limpios, sin prisa." },
      temaki: { label: "Temaki y Gunkan", note: "Pieza a pieza." },
      sets: { label: "Sets de Sushi", note: "Pensados para el centro de la mesa." },
    },
    // Traducidas de las descripciones que el restaurante publica en
    // maresco.bardapraia.com.pt — no son textos de marketing inventados.
    items: {
      // Entrantes
      couvert:
        "Vela de mantequilla, tapenade de aceituna, mantequilla de higo, moscatel del Duero y selección de panes.",
      ameijoasBulhaoPato: "Salteadas en aceite de oliva, ajo, vino blanco y cilantro.",
      ameijoasEspanhola: "Salteadas con pimiento, cebolla y tomate.",
      gambasAlho: "Salteadas en aceite de oliva y ajo.",
      gambasNatural: "Gambas cocidas con salsa cóctel. 6 unidades.",
      tempuraCamarao: "Langostino en tempura de almendra, salsa sweet chili.",
      ostras: "Ostras frescas con cítricos. Precio por unidad.",
      zamburinas: "Con salsa del chef. Precio por unidad.",
      sapateiraRecheada: "Buey de mar relleno, tosta fina y aceite de oliva.",
      sashimiBacalhau: "Bacalao ahumado, puré de garbanzo y huevo rallado.",
      bolinhoBacalhau: "Con queso de la Serra. 1 unidad.",
      burrataPanada: "Pasta kataifi, salsa de tomate, pesto, jamón y albahaca.",
      folhadoCabra:
        "Queso de cabra caramelizado, confitura de pimientos y pera en almíbar.",
      paoQueijo: "Mozzarella fundida, mayonesa y chorizo.",
      trufasAlheira: "Con huevo frito de codorniz. 4 unidades.",
      sopaPeixe: "Caldo de pescado y gamba con pasta.",
      cremeLegumes: "Crema de verduras tradicional.",

      // Sushi Bar
      tatakiMaguro: "Atún sellado con sésamo, puerro frito y salsa del chef.",
      tartaroMaguro:
        "Atún, cebolla roja, kizami, mostaza de Dijon, cebollino y salsa del chef.",
      tacoShiro:
        "Tacos crujientes con pescado blanco, cebolla roja, aguacate, pimientos y cítricos. 2 unidades.",
      usuzukuri: "Carpaccio de atún, salmón, pescado blanco y vieira con ponzu.",
      kimchiSalmao: "Ensalada coreana de salmón con verduras fermentadas.",
      ceviche: "Pescado blanco, cebolla roja, tomate cherry y cítricos.",
      gyosas: "Gyozas de pollo y verduras al vapor, salsa ponzu. 5 unidades.",

      // Mariscos
      mistoSupremo:
        "Buey de mar relleno, 2 langostinos tigre a la brasa, bogavante a la brasa, almejas à bulhão-pato, gambas cocidas, gambas al ajillo, mejillón con vinagreta y patata paja. Para 4 personas.",
      mistoQuente:
        "Gambas al ajillo, langostino a la brasa, zamburiñas, almejas à bulhão-pato, tempura de langostino en almendra y patata paja. Para 2 personas.",
      mistoTigre:
        "Buey de mar relleno, langostino cocido, almejas à bulhão-pato, 1 langostino tigre a la brasa, mejillón con vinagreta y patata paja. Para 2 personas.",
      mistoSapateira:
        "Buey de mar relleno, ostras, gambas cocidas, mejillón con vinagreta, almeja, 2 langostinos tigre a la brasa y patata paja. Para 2 personas.",
      arrozRico:
        "Arroz cremoso de marisco variado con 2 langostinos a la brasa. Para 2 personas.",
      camaraoTigre:
        "Langostino tigre a la brasa de unos 300 g, patata paja y ensalada fresca.",
      lasanhaCaranguejo: "Gratinada al horno, con ensalada fresca.",
      lagostaGrelhada: "Patata paja y ensalada fresca. Precio del día.",
      lavaganteGrelhado: "Patata paja y ensalada fresca. Bajo encargo.",

      // Pescado
      postaRodovalho: "A la brasa, patata aplastada y judías verdes.",
      arrozTamboril: "Arroz rico de rape, gambas y cilantro. Para 2 personas.",
      peixeFresco: "A la brasa, patata aplastada y judías verdes. Precio por kilo.",
      espetoLulas:
        "Con pimientos, salsa especial del chef, patata aplastada y judías verdes. Para 2 personas.",
      lomboBacalhau:
        "Confitado en aceite de oliva, con pan de maíz y almendra, cebolla caramelizada y puré de patata.",
      backToBlack:
        "Lomo de bacalao confitado en aceite de oliva, puré de cebolla con tinta de calamar.",
      lulasGrelhadas: "A la brasa, patata aplastada y judías verdes.",

      // Carne
      surfTurf:
        "1 langostino tigre a la brasa, solomillo de vaca a la brasa, ensalada Gaslow y patatas fritas. Para 2 personas.",
      fraldinha:
        "Madurado 30 días, a la brasa, patatas fritas y arroz salvaje con verduras salteadas. Para 2 personas.",
      picanhaPlumas:
        "Picaña en lonchas y plumas de cerdo ibérico, chorizo a la brasa, patatas fritas y arroz salvaje con verduras salteadas. Para 2 personas.",
      filetMignon:
        "A la brasa, patatas fritas y arroz salvaje con verduras salteadas.",
      hamburguerVeg: "Patatas fritas y arroz salvaje salteado.",

      // Special Rolls
      unagiRoll:
        "Envuelto en arroz, salmón, langostino tempura, mayonesa japonesa y anguila ahumada.",
      marescoHotRoll:
        "Arroz, salmón, Philadelphia, cebollino, sésamo, huevas de tobiko y salsa teriyaki.",
      papperRiceRoll:
        "Envuelto en papel de arroz, langostino tempura, lechuga ibérica, atún, mayonesa japonesa y huevas de tobiko.",
      ebiTunaRoll: "Langostino cocido, aguacate, atún, kizami y huevas.",
      takuwan: "Envuelto en arroz, salmón, soft shell crab y jengibre crujiente.",
      hotRoll: "Arroz, salmón, langostino, Philadelphia y huevas de tobiko.",
      marescoRoll: "Envuelto en arroz, pescado variado, huevas de tobiko y cebollino.",

      // Sashimi y Nigiri
      otoro7: "Ventresca de atún. 7 piezas.",
      sashimi20: "Pescado variado. 20 piezas.",
      nigiriPremium12: "Sugerencia del chef. 12 piezas.",
      sashimi12: "Pescado variado. 12 piezas.",
      atum7: "7 piezas.",
      shiro7: "Pescado blanco. 7 piezas.",
      salmao7: "7 piezas.",
      nigiri6: "Sugerencia del chef. 6 piezas.",

      // Temaki y Gunkan
      gunkanMaresco: "Gunkan premium, sugerencia del chef. 8 piezas.",
      temakiMaresco: "Sugerencia del chef.",
      gunkanChef: "Gunkan de pescado blanco, manzana y foie gras. 2 piezas.",
      temakiAtum: "Alga nori, arroz y atún.",
      gunkanTrufa: "Ebi maki, salmón, huevo de codorniz y trufa. 2 piezas.",
      temakiSalmao: "Alga nori, arroz y salmón.",
      temakiVeg: "Alga nori, arroz y verduras.",

      // Sets
      setPremium50: "50 piezas.",
      setSpecial50: "50 piezas.",
      setMaresco25: "25 piezas.",
      setVegan12: "12 piezas.",
      setFreestyle12: "12 piezas.",
    },
  },

  gallery: {
    eyebrow: "06 — Galería",
    title: ["La casa,", "por dentro."],
    // Sirven también de texto alternativo, así que deben describir lo que
    // muestra cada fotografía.
    captions: {
      g1: "La terraza, sobre la arena",
      g2: "A la sombra de las palmeras",
      g3: "El viento, del lado del mar",
      g4: "La mariscada, con el mar delante",
      g5: "Media tarde, en la mesa",
      g6: "Surf and turf, en la cena",
      g7: "El postre, al sol",
    },
  },

  reservations: {
    eyebrow: "07 — Reservas",
    title: ["Su mesa", "le espera."],
    body: "Comidas de 12:00 a 15:00 y cenas de 19:00 a 23:00, todos los días. Para grupos y fechas especiales, hable con nosotros por teléfono o WhatsApp.",
    cta: "Reservar mesa",
  },

  finalCta: {
    headline: ["Nos vemos", "en la mesa."],
    cta: "Reservar",
  },

  contact: {
    hours: [
      { day: "Comida", time: "Todos los días · 12:00 – 15:00" },
      { day: "Cena", time: "Todos los días · 19:00 – 23:00" },
    ],
    legal: {
      privacy: "Política de Privacidad",
      terms: "Términos y Condiciones",
      complaints: "Libro de Reclamaciones",
    },
  },

  ui: {
    nav: {
      home: "inicio",
      openMenu: "Abrir menú",
      closeMenu: "Cerrar menú",
      language: "Idioma",
    },
    hero: { sectionLabel: "Introducción", scrollAria: "Desliza para explorar" },
    ingredients: {
      note: "Ocho productos que definen la casa. Desliza para recorrerlos.",
      kicker: "Fotografía macro",
    },
    chef: { kicker: "La cocina" },
    menu: {
      categoriesAria: "Categorías de la carta",
      kicker: "Plato",
      cursorLabel: "Ver",
      onRequest: "Bajo consulta",
    },
    gallery: { kicker: "Galería" },
    reserve: {
      cursorLabel: "Reservar",
      openAria: "Abrir formulario de reserva",
      title: "Reservar mesa",
      close: "Cerrar",
      date: "Fecha",
      time: "Hora",
      guests: "Comensales",
      guestOne: "comensal",
      guestOther: "comensales",
      submit: "Solicitar reserva",
      disclaimer: "Las reservas se confirman por correo o teléfono.",
      doneTitle: "Solicitud recibida",
      doneBody:
        "Una mesa para {guests} el {date} a las {time}. Le confirmamos en breve.",
      chosenDate: "la fecha elegida",
    },
    footer: {
      location: "Dirección",
      hours: "Horario",
      contact: "Contacto",
      maps: "Google Maps",
      rights: "Todos los derechos reservados.",
    },
    media: {
      placeholder: "Imagen pendiente",
      staticBackground: "Fondo estático (datos/movimiento reducidos)",
    },
  },
};
