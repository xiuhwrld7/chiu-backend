export const RECETAS_DB = [
  // ==================== POSTRES Y DULCES ====================
  {
    id: "postre_1",
    titulo: "Plátanos Caramelizados con Mantequilla y Canela",
    momento: ["postre", "cena"],
    descripcion: "Rebanadas doraditas a la plancha con costra de azúcar y aroma a canela casera.",
    tiempo: "10 min",
    dificultad: "Muy fácil",
    tipCasero: "Usa plátanos maduros con cáscara pecosa; su azúcar natural carameliza mejor sin quemarse.",
    imagenUrl: "https://images.unsplash.com/photo-1528732263440-4dd1a18a4cc2?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "platano", cantidadPorPersona: 1, unidad: "pieza" },
      { nombre: "canela en polvo", cantidadPorPersona: 0.5, unidad: "cdita", basico: true },
      { nombre: "azúcar o miel", cantidadPorPersona: 1, unidad: "cdita", basico: true },
      { nombre: "mantequilla o aceite", cantidadPorPersona: 0.5, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Corte y preparación",
        acciones: [
          "Pela los plátanos y córtalos en rodajas de 1 centímetro de grosor o longitudinalmente en mitades.",
          "En un recipiente pequeño mezcla la canela con el azúcar."
        ]
      },
      {
        fase: "Fase 2: Caramelizado al sartén",
        acciones: [
          "Derrite la mantequilla en una sartén antiadherente a fuego medio-bajo.",
          "Coloca las rebanadas de plátano sin encimar.",
          "Cocina 2 minutos por lado hasta que se vean doradas y ligeramente translúcidas.",
          "Espolvorea la mezcla de canela encima, retira del fuego y sirve tibio."
        ]
      }
    ]
  },
  {
    id: "postre_2",
    titulo: "Hot Cakes Esponjosos de Plátano y Huevo",
    momento: ["postre", "desayuno"],
    descripcion: "Hot cakes caseros esponjosos hechos únicamente con plátano y huevo, naturalmente dulces.",
    tiempo: "15 min",
    dificultad: "Fácil",
    tipCasero: "Cocina a flama muy baja y tapado para que se cuezan por dentro sin quemar la base.",
    imagenUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "platano", cantidadPorPersona: 1, unidad: "pieza" },
      { nombre: "huevo", cantidadPorPersona: 2, unidad: "piezas" },
      { nombre: "canela", cantidadPorPersona: 0.25, unidad: "cdita", basico: true },
      { nombre: "aceite o mantequilla para sartén", cantidadPorPersona: 0.5, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Preparar la mezcla",
        acciones: [
          "En un plato hondo machaca bien el plátano con un tenedor hasta que quede como puré líquido.",
          "Agrega los huevos y una pizca de canela.",
          "Bate vigorosamente con el tenedor durante 1 minuto hasta integrar sin grumos grandes."
        ]
      },
      {
        fase: "Fase 2: Cocción en sartén",
        acciones: [
          "Engrasa ligeramente una sartén a fuego bajo.",
          "Vierte porciones medianas de la mezcla para formar círculos.",
          "Cocina 3 minutos hasta que se vean pequeñas burbujas y las orillas se despeguen solas.",
          "Voltea con una espátula ancha y dora 1 minuto del otro lado."
        ]
      }
    ]
  },
  {
    id: "postre_3",
    titulo: "Crepas Dulces Caseras de Huevo y Leche",
    momento: ["postre", "cena"],
    descripcion: "Láminas delgadas doraditas listas para rellenar con plátano picado y azúcar con canela.",
    tiempo: "15 min",
    dificultad: "Fácil",
    tipCasero: "Vierte poca masa y mueve la sartén en círculos en el aire para que queden bien delgaditas.",
    imagenUrl: "https://images.unsplash.com/photo-1519676867240-f03562e64548?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "huevo", cantidadPorPersona: 1, unidad: "pieza" },
      { nombre: "platano", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "leche o agua", cantidadPorPersona: 0.25, unidad: "taza", basico: true },
      { nombre: "mantequilla", cantidadPorPersona: 0.5, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Batido ligero",
        acciones: [
          "Bate el huevo con la leche y una pizca de azúcar hasta que quede una mezcla líquida homogénea.",
          "Corta el plátano en láminas finitas para el relleno."
        ]
      },
      {
        fase: "Fase 2: Elaboración de la crepa",
        acciones: [
          "Calienta una sartén con media cucharadita de mantequilla a fuego medio.",
          "Vierte un cucharón de mezcla inclinando la sartén para cubrir todo el fondo.",
          "Cocina 1 minuto y medio, voltea 30 segundos más.",
          "Rellena con el plátano fresco, dobla en triángulo y decora con canela."
        ]
      }
    ]
  },
  {
    id: "postre_4",
    titulo: "Plátanos con Crema Dulce Casera",
    momento: ["postre"],
    descripcion: "El clásico postre tradicional mexicano: rebanadas de plátano con crema dulce y canela.",
    tiempo: "5 min",
    dificultad: "Muy fácil",
    tipCasero: "Sirve bien frío; si dejas la crema 10 minutos en el congelador antes de armarlo queda mucho más cremosa.",
    imagenUrl: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "platano", cantidadPorPersona: 1, unidad: "pieza" },
      { nombre: "crema o yogurt", cantidadPorPersona: 2, unidad: "cucharadas", basico: true },
      { nombre: "azúcar", cantidadPorPersona: 1, unidad: "cucharadita", basico: true },
      { nombre: "canela en polvo", cantidadPorPersona: 0.25, unidad: "cdita", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Preparación de la crema",
        acciones: [
          "En un vaso mezcla la crema con la cucharadita de azúcar hasta disolverla.",
          "Pela el plátano y córtalo en rodajas medianas."
        ]
      },
      {
        fase: "Fase 2: Montaje",
        acciones: [
          "Coloca las rodajas de plátano en una copa o tazón.",
          "Baña con la crema dulce y espolvorea canela en polvo por encima.",
          "Disfruta de inmediato como antojo dulce."
        ]
      }
    ]
  },

  // ==================== DESAYUNOS ====================
  {
    id: "desayuno_1",
    titulo: "Huevos a la Mexicana Tradicionales",
    momento: ["desayuno", "almuerzo"],
    descripcion: "Huevos revueltos con jitomate, cebolla y chile picaditos.",
    tiempo: "12 min",
    dificultad: "Fácil",
    tipCasero: "Sofríe primero la verdura hasta que el jitomate suelte su jugo antes de vaciar el huevo.",
    imagenUrl: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "huevo", cantidadPorPersona: 2, unidad: "piezas" },
      { nombre: "jitomate", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "cebolla", cantidadPorPersona: 0.25, unidad: "pieza" },
      { nombre: "chile", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "aceite", cantidadPorPersona: 0.5, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Picar la verdura",
        acciones: [
          "Lava el jitomate y el chile.",
          "Pica la cebolla fina, el jitomate en cubitos y el chile en rodajas delgadas.",
          "Bate los huevos con pizca de sal en un tazón."
        ]
      },
      {
        fase: "Fase 2: Sofrito y cocción",
        acciones: [
          "Sofríe cebolla y chile en sartén con aceite por 2 minutos.",
          "Agrega el jitomate y cocina 3 minutos hasta que suelte jugo.",
          "Vierte el huevo a fuego medio-bajo y revuelve suavemente hasta cocer."
        ]
      }
    ]
  },
  {
    id: "desayuno_2",
    titulo: "Omelette Esponjoso de Cebolla y Chile",
    momento: ["desayuno", "cena"],
    descripcion: "Tortilla de huevo esponjosa y doblada, rellena de sofrito tierno.",
    tiempo: "15 min",
    dificultad: "Fácil",
    tipCasero: "Bate los huevos con tenedor justo antes de vaciar a la sartén.",
    imagenUrl: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "huevo", cantidadPorPersona: 2, unidad: "piezas" },
      { nombre: "cebolla", cantidadPorPersona: 0.25, unidad: "pieza" },
      { nombre: "chile", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "aceite", cantidadPorPersona: 0.5, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Relleno",
        acciones: [
          "Filetea la cebolla y el chile en tiras finas.",
          "Saltea en sartén con aceite a fuego medio por 3 minutos y reserva."
        ]
      },
      {
        fase: "Fase 2: Cocción y doblado",
        acciones: [
          "Vierte los huevos batidos en la sartén a fuego bajo.",
          "Cuando cuaje la base, pon el relleno en una mitad y dobla.",
          "Dora 1 minuto y sirve."
        ]
      }
    ]
  },

  // ==================== COMIDAS Y ALMUERZOS ====================
  {
    id: "comida_1",
    titulo: "Ensalada Fresca de Atún y Verduras",
    momento: ["comida", "almuerzo", "cena"],
    descripcion: "Ensalada rendidora de atún con verduras crujientes, lista en frío.",
    tiempo: "10 min",
    dificultad: "Fácil",
    tipCasero: "Drena muy bien el líquido de las latas para que no se ague la mezcla.",
    imagenUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "atun", cantidadPorPersona: 1, unidad: "lata" },
      { nombre: "elote", cantidadPorPersona: 0.5, unidad: "taza" },
      { nombre: "chicharos", cantidadPorPersona: 0.25, unidad: "taza" },
      { nombre: "zanahoria", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "mayonesa", cantidadPorPersona: 1, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Preparación",
        acciones: [
          "Drena el atún y las verduras.",
          "Ralla o pica la zanahoria en cubitos pequeños."
        ]
      },
      {
        fase: "Fase 2: Integración",
        acciones: [
          "Mezcla todo en un tazón con una cucharada de mayonesa o crema.",
          "Sazona con sal y pimienta al gusto y sirve con tostadas."
        ]
      }
    ]
  },
  {
    id: "comida_2",
    titulo: "Tortitas Doraditas de Atún",
    momento: ["comida", "almuerzo"],
    descripcion: "Tortitas crujientes doradas al sartén con atún y verduritas.",
    tiempo: "20 min",
    dificultad: "Fácil",
    tipCasero: "No las muevas al colocarlas; deja dorar 3 minutos por lado para que no se desbaraten.",
    imagenUrl: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80",
    ingredientesBase: [
      { nombre: "atun", cantidadPorPersona: 1, unidad: "lata" },
      { nombre: "huevo", cantidadPorPersona: 1, unidad: "pieza" },
      { nombre: "zanahoria", cantidadPorPersona: 0.5, unidad: "pieza" },
      { nombre: "aceite", cantidadPorPersona: 1, unidad: "cda", basico: true }
    ],
    pasos: [
      {
        fase: "Fase 1: Mezclado",
        acciones: [
          "Escurre el atún e intégralo con la zanahoria y el huevo batido.",
          "Forma tortitas compactas con las manos."
        ]
      },
      {
        fase: "Fase 2: Fritura",
        acciones: [
          "Dora en sartén con aceite a fuego medio 3 minutos por lado.",
          "Escurre en papel absorbente y sirve."
        ]
      }
    ]
  }
];