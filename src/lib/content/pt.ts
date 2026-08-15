import type { Copy } from "./types";

/**
 * PORTUGUÊS (pt-PT) — idioma principal do Maresco.
 * Apenas texto. Preços, fotografias, nomes de pratos e contactos vivem em
 * ./shared.ts e são iguais nos três idiomas.
 */
export const pt: Copy = {
  site: {
    tagline: "Venha experimentar os sabores do mar.",
    description:
      "Maresco — marisqueira e sushi bar na Póvoa de Varzim. Peixe e marisco frescos de fornecedores locais, cozinhados na brasa, e um sushi bar que trata o mesmo peixe com outra gramática.",
  },

  nav: {
    links: {
      sushi: "Sushi Bar",
      mar: "Do Mar",
      cozinha: "A Cozinha",
      menu: "Menu",
      galeria: "Galeria",
    },
    cta: "Reservar",
  },

  hero: {
    eyebrow: "Seafood & Sushi · Póvoa de Varzim",
    headline: ["Os sabores", "do mar."],
    subheadline: ["Marisqueira e sushi bar.", "Póvoa de Varzim."],
    scrollLabel: "Role",
  },

  film: {
    eyebrow: "O mar, em movimento",
    lines: ["Do mar,", "à mesa."],
    hint: "Role para reproduzir",
  },

  intro: {
    eyebrow: "01 — A Casa",
    lines: ["Não inventamos o mar.", "Servimo-lo —", "no dia em que chega."],
    body: "Peixe e marisco de fornecedores locais, cozinhados com técnica e sem adornos. Ao lado, um sushi bar que trata a mesma matéria-prima com outra gramática. Duas cozinhas, um só produto.",
  },

  art: {
    eyebrow: "02 — O Sushi Bar",
    dishName: "Nigiri Especial Maresco",
    dishTagline: "Salmão braseado · Azeite trufado · Flor de sal",
    title: ["Uma peça,", "por dentro."],
    body: "Arroz à temperatura do corpo. Um sopro de vinagre. Salmão fresco do Atlântico maçaricado na hora, flor de sal da costa portuguesa e um toque de azeite trufado. Veja o nosso Nigiri Especial desfazer-se — e voltar a fazer-se — e perceba a disciplina escondida na sua harmonia.",
    steps: {
      topping: { label: "Flor de Sal & Trufa", note: "Fio de azeite trufado, flor de sal da costa e cebolinho fresco." },
      neta: { label: "Neta (Salmão Braseado)", note: "Salmão do dia fatiado contra as fibras e braseado no ponto exacto." },
      nori: { label: "Nori & Molho Nikiri", note: "Fita de alga crocante e redução de molho nikiri tare da casa." },
      wasabi: { label: "Hon-Wasabi", note: "Ponto de wasabi fresco para equilibrar a untuosidade do peixe." },
      shari: { label: "Shari", note: "Arroz temperado com vinagre nobre, moldado à mão sem apertar." },
    },
  },

  ingredients: {
    eyebrow: "03 — Do Mar",
    title: ["Do mar", "para a", "mesa."],
    items: {
      sapateira: {
        tagline: "A rainha da lota.",
        description:
          "Carne doce e coral intenso — é ela que dá corpo a todos os nossos mistos. Aberta e recheada à mão, servida na própria carapaça.",
        origin: "Costa atlântica · Fornecedores locais",
      },
      lagosta: {
        tagline: "O luxo simples.",
        description:
          "Grelhada apenas com azeite e sal, para não roubar nada ao sabor. Não tem preço fixo: paga-se o peso do dia.",
        origin: "Costa atlântica · Preço do dia",
      },
      camarao: {
        tagline: "Fogo e brasa.",
        description:
          "Camarão tigre grelhado até a casca estalar, com alho e limão. O prato que, mais cedo ou mais tarde, toda a mesa acaba por pedir.",
        origin: "Seleção do chef · Grelhado na brasa",
      },
      ostra: {
        tagline: "O mar, puro.",
        description:
          "Aberta no momento em que sai para a mesa. Salina, mineral, sem intermediários — nem sequer um garfo, se quiser.",
        origin: "Ao natural · Por unidade",
      },
      ameijoa: {
        tagline: "À Bulhão-Pato.",
        description:
          "Coentros, alho e azeite. A entrada mais pedida da casa e, precisamente por isso, a que menos margem de erro tem.",
        origin: "Costa atlântica · Fornecedores locais",
      },
      maguro: {
        tagline: "O corte do sushi bar.",
        description:
          "Do tataki ao otoro. Selado por fora e cru no centro, ou simplesmente fatiado fino e deixado em paz.",
        origin: "Sushi bar · Corte do dia",
      },
      salmao: {
        tagline: "Seda fria.",
        description:
          "Firme e luminoso. Marinado em kimchi, curado ou fatiado para sashimi — aguenta as três leituras sem se desfazer.",
        origin: "Sushi bar · Corte do dia",
      },
      bacalhau: {
        tagline: "O nosso, de sempre.",
        description:
          "Fumado e cortado fino para sashimi, ou em lombo alto com crosta de broa e amêndoa. O mesmo peixe, dois séculos de distância.",
        origin: "Duas leituras · Fria e quente",
      },
    },
  },

  chef: {
    eyebrow: "04 — A Cozinha",
    name: "Duas cozinhas, uma mesa",
    role: "Marisqueira e sushi bar · Póvoa de Varzim",
    philosophy: "Venha experimentar os sabores do mar.",
    paragraphs: [
      "O Maresco trabalha com fornecedores locais para garantir peixe e marisco frescos todos os dias. O que entra de manhã é o que se serve à noite — e o que não entra, não se serve.",
      "Na marisqueira, técnica tradicional: brasa, panela e tempo. No sushi bar, a mesma matéria-prima lida com outra gramática — corte fino, arroz temperado, molhos discretos.",
      "É a mesma cozinha a falar duas línguas. E a mesma exigência com o produto nas duas.",
    ],
    stats: {
      pratos: "Pratos na carta",
      cozinhas: "Cozinhas na mesma casa",
      servicos: "Serviços por dia",
    },
  },

  menu: {
    eyebrow: "05 — O Menu",
    title: ["A carta", "do Maresco."],
    categories: {
      entradas: { label: "Entradas", note: "Para começar — e para partilhar." },
      sushibar: { label: "Sushi Bar", note: "Entradas frias e quentes do sushi bar." },
      mariscos: { label: "Mariscos", note: "Da lota, cozinhado na hora." },
      peixe: { label: "Peixe", note: "Fresco, grelhado na brasa." },
      carne: { label: "Carne", note: "Para quem vem pelo mar e fica pela brasa." },
      rolls: { label: "Special Rolls", note: "Criações do nosso sushi bar." },
      sashimi: { label: "Sashimi & Nigiri", note: "Cortes limpos, sem pressa." },
      temaki: { label: "Temaki & Gunkan", note: "Peça a peça." },
      sets: { label: "Sets de Sushi", note: "Para partilhar à mesa." },
    },
    // Descrições conforme publicadas pelo restaurante em
    // maresco.bardapraia.com.pt — não são texto de marketing inventado.
    items: {
      // Entradas
      couvert:
        "Vela de manteiga, tapenade de azeitona, manteiga de figo, moscatel do Douro e seleção de pães.",
      ameijoasBulhaoPato: "Salteadas em azeite, alho, vinho branco e coentros.",
      ameijoasEspanhola: "Salteadas com pimento, cebola e tomate.",
      gambasAlho: "Salteadas em azeite e alho.",
      gambasNatural: "Gambas cozidas com molho cocktail. 6 unidades.",
      tempuraCamarao: "Camarão em tempura envolto em amêndoa, molho sweet chili.",
      ostras: "Ostras frescas com cítricos. Preço por unidade.",
      zamburinas: "Com molho do chef. Preço por unidade.",
      sapateiraRecheada: "Sapateira recheada, torrada fina e azeite.",
      sashimiBacalhau: "Bacalhau fumado, puré de grão e ovo ralado.",
      bolinhoBacalhau: "Com queijo da Serra. 1 unidade.",
      burrataPanada: "Massa kataifi, molho de tomate, pesto, presunto e manjericão.",
      folhadoCabra:
        "Queijo de cabra caramelizado, compota de pimentos e pera em calda.",
      paoQueijo: "Mozzarella derretida, maionese e chouriço.",
      trufasAlheira: "Com ovo estrelado de codorniz. 4 unidades.",
      sopaPeixe: "Caldo de peixe e camarão com massa.",
      cremeLegumes: "Creme de legumes tradicional.",

      // Sushi Bar
      tatakiMaguro: "Atum selado com sésamo, alho-francês frito e molho do chef.",
      tartaroMaguro:
        "Atum, cebola roxa, kizami, mostarda Dijon, cebolinho e molho do chef.",
      tacoShiro:
        "Tacos crocantes com peixe branco, cebola roxa, abacate, pimentos e cítricos. 2 unidades.",
      usuzukuri: "Carpaccio de atum, salmão, peixe branco e vieira com molho ponzu.",
      kimchiSalmao: "Salada coreana de salmão com legumes fermentados.",
      ceviche: "Peixe branco, cebola roxa, tomate cereja e cítricos.",
      gyosas: "Dumplings de frango e legumes cozidos a vapor, molho ponzu. 5 unidades.",

      // Mariscos
      mistoSupremo:
        "Sapateira recheada, 2 camarões tigre grelhados, lagosta grelhada, amêijoas à bulhão-pato, gambas cozidas, gambas ao alho, mexilhão com vinagrete e batata palha. Para 4 pessoas.",
      mistoQuente:
        "Gambas ao alho, camarão grelhado, zamburinas, amêijoas à bulhão-pato, tempura de camarão em amêndoa e batata palha. Para 2 pessoas.",
      mistoTigre:
        "Sapateira recheada, camarão cozido, amêijoas à bulhão-pato, 1 camarão tigre grelhado, mexilhão com vinagrete e batata palha. Para 2 pessoas.",
      mistoSapateira:
        "Sapateira recheada, ostras, gambas cozidas, mexilhão com vinagrete, amêijoa, 2 camarões tigre grelhados e batata palha. Para 2 pessoas.",
      arrozRico:
        "Arroz cremoso de marisco variado com 2 camarões grelhados na brasa. Para 2 pessoas.",
      camaraoTigre:
        "Camarão tigre grelhado de aproximadamente 300 g, batata palha e salada fresca.",
      lasanhaCaranguejo: "Gratinada no forno, com salada fresca.",
      lagostaGrelhada: "Batata palha e salada fresca. Preço do dia.",
      lavaganteGrelhado: "Batata palha e salada fresca. Sob encomenda.",

      // Peixe
      postaRodovalho: "Grelhada na brasa, batata a murro e feijão-verde.",
      arrozTamboril: "Arroz rico de tamboril, gambas e coentros. Para 2 pessoas.",
      peixeFresco: "Grelhado na brasa, batata a murro e feijão-verde. Preço por quilo.",
      espetoLulas:
        "Com pimentos, molho especial do chef, batata a murro e feijão-verde. Para 2 pessoas.",
      lomboBacalhau:
        "Confitado em azeite, com broa e amêndoa, cebola caramelizada e puré de batata.",
      backToBlack: "Lombo de bacalhau confitado em azeite, puré de cebola com tinta de choco.",
      lulasGrelhadas: "Grelhadas na brasa, batata a murro e feijão-verde.",

      // Carne
      surfTurf:
        "1 camarão tigre grelhado, lombo de vaca na brasa, salada Gaslow e batata frita. Para 2 pessoas.",
      fraldinha:
        "Maturada 30 dias, na brasa, batata frita e arroz selvagem com legumes salteados. Para 2 pessoas.",
      picanhaPlumas:
        "Picanha fatiada e plumas de porco preto, chouriço grelhado, batata frita e arroz selvagem com legumes salteados. Para 2 pessoas.",
      filetMignon:
        "Grelhado na brasa, batata frita e arroz selvagem com legumes salteados.",
      hamburguerVeg: "Batata frita e arroz selvagem salteado.",

      // Special Rolls
      unagiRoll:
        "Enrolado em arroz, salmão, camarão tempura, maionese japonesa e enguia fumada.",
      marescoHotRoll:
        "Arroz, salmão, Philadelphia, cebolinho, sésamo, ovas de tobiko e molho teriyaki.",
      papperRiceRoll:
        "Enrolado em papel de arroz, camarão tempura, alface ibérica, atum, maionese japonesa e ovas de tobiko.",
      ebiTunaRoll: "Camarão cozido, abacate, atum, kizami e ovas.",
      takuwan: "Enrolado em arroz, salmão, soft shell crab e gengibre crocante.",
      hotRoll: "Arroz, salmão, camarão, Philadelphia e ovas de tobiko.",
      marescoRoll: "Enrolado em arroz, peixe variado, ovas de tobiko e cebolinho.",

      // Sashimi & Nigiri
      otoro7: "Barriga de atum. 7 peças.",
      sashimi20: "Peixe variado. 20 peças.",
      nigiriPremium12: "Sugestão do chef. 12 peças.",
      sashimi12: "Peixe variado. 12 peças.",
      atum7: "7 peças.",
      shiro7: "Peixe branco. 7 peças.",
      salmao7: "7 peças.",
      nigiri6: "Sugestão do chef. 6 peças.",

      // Temaki & Gunkan
      gunkanMaresco: "Gunkan premium, sugestão do chef. 8 peças.",
      temakiMaresco: "Sugestão do chef.",
      gunkanChef: "Gunkan de peixe branco, maçã e foie gras. 2 peças.",
      temakiAtum: "Alga nori, arroz e atum.",
      gunkanTrufa: "Ebi maki, salmão, ovo de codorniz e trufa. 2 peças.",
      temakiSalmao: "Alga nori, arroz e salmão.",
      temakiVeg: "Alga nori, arroz e legumes.",

      // Sets
      setPremium50: "50 peças.",
      setSpecial50: "50 peças.",
      setMaresco25: "25 peças.",
      setVegan12: "12 peças.",
      setFreestyle12: "12 peças.",
    },
  },

  gallery: {
    eyebrow: "06 — Galeria",
    title: ["A casa,", "por dentro."],
    // Também servem de texto alternativo da imagem — devem descrever
    // exatamente o que se vê em cada fotografia.
    captions: {
      g1: "A esplanada, sobre a areia",
      g2: "À sombra das palmeiras",
      g3: "O vento, do lado do mar",
      g4: "Mariscada, com o mar à frente",
      g5: "Fim de tarde, à mesa",
      g6: "Surf and turf, ao jantar",
      g7: "A sobremesa, ao sol",
    },
  },

  reservations: {
    eyebrow: "07 — Reservas",
    title: ["A sua mesa", "à espera."],
    body: "Almoço das 12:00 às 15:00 e jantar das 19:00 às 23:00, todos os dias. Para grupos e datas especiais, fale connosco por telefone ou WhatsApp.",
    cta: "Reservar mesa",
  },

  finalCta: {
    headline: ["Até já,", "à mesa."],
    cta: "Reservar",
  },

  contact: {
    hours: [
      { day: "Almoço", time: "Todos os dias · 12:00 – 15:00" },
      { day: "Jantar", time: "Todos os dias · 19:00 – 23:00" },
    ],
    legal: {
      privacy: "Política de Privacidade",
      terms: "Termos e Condições",
      complaints: "Livro de Reclamações",
    },
  },

  ui: {
    nav: {
      home: "início",
      openMenu: "Abrir menu",
      closeMenu: "Fechar menu",
      language: "Idioma",
    },
    hero: { sectionLabel: "Introdução", scrollAria: "Role para explorar" },
    ingredients: {
      note: "Oito produtos que definem a casa. Role para os percorrer.",
      kicker: "Fotografia macro",
    },
    chef: { kicker: "A cozinha" },
    menu: {
      categoriesAria: "Categorias do menu",
      kicker: "Prato",
      cursorLabel: "Ver",
      onRequest: "Sob consulta",
    },
    gallery: { kicker: "Galeria" },
    reserve: {
      cursorLabel: "Reservar",
      openAria: "Abrir formulário de reserva",
      title: "Reservar mesa",
      close: "Fechar",
      date: "Data",
      time: "Hora",
      guests: "Pessoas",
      guestOne: "pessoa",
      guestOther: "pessoas",
      submit: "Pedir reserva",
      disclaimer: "As reservas são confirmadas por e-mail ou telefone.",
      doneTitle: "Pedido recebido",
      doneBody:
        "Uma mesa para {guests} em {date} às {time}. Confirmamos consigo em breve.",
      chosenDate: "a data escolhida",
    },
    footer: {
      location: "Morada",
      hours: "Horário",
      contact: "Contactos",
      maps: "Google Maps",
      rights: "Todos os direitos reservados.",
    },
    media: {
      placeholder: "Imagem por colocar",
      staticBackground: "Fundo estático (dados/movimento reduzidos)",
    },
  },
};
