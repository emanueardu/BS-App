import { ServiceDetailConfig } from "@/types/serviceDetails";

export const serviceDetailConfigs: Record<string, ServiceDetailConfig> = {
  "instalaciones-electricas": {
    metaDescription:
      "Instalaciones elÃ©ctricas residenciales con criterio tÃ©cnico, materiales certificados y terminaciones prolijas para cada etapa de la obra.",
    heroDescription:
      "Realizamos instalaciones elÃ©ctricas residenciales con criterio tÃ©cnico, materiales certificados y terminaciones prolijas. Seguridad, cumplimiento y previsibilidad en cada obra.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Ejecutamos instalaciones elÃ©ctricas completas y reformas para viviendas, priorizando la seguridad de las personas y la confiabilidad del sistema. Trabajamos con planificaciÃ³n previa, protecciones correctas, circuitos bien definidos y documentaciÃ³n mÃ­nima entregada. Enfoque: no hacemos â€œparchesâ€; armamos un sistema elÃ©ctrico mantenible y escalable.",
      },
      {
        type: "bullets",
        title: "QuÃ© incluye el servicio",
        bullets: [
          "Instalaciones nuevas (obra nueva)",
          "Reformas y recableados completos",
          "Ampliaciones de circuitos (tomas, iluminaciÃ³n, lÃ­neas dedicadas)",
          "Armado y adecuaciÃ³n de tableros elÃ©ctricos",
          "Protecciones: tÃ©rmicas, diferencial, seccionamiento correcto",
          "Puesta a tierra y verificaciÃ³n de seguridad",
          "Ordenamiento, rotulado y prolijidad de instalaciÃ³n",
          "Pruebas bÃ¡sicas de funcionamiento y entrega",
        ],
      },
      {
        type: "text",
        title: "Tableros elÃ©ctricos normalizados",
        copy:
          "Un tablero bien resuelto es el corazÃ³n de la instalaciÃ³n. DiseÃ±amos tableros claros, ordenados y preparados para el uso real de la vivienda.",
      },
      {
        type: "bullets",
        title: "Seguridad y cumplimiento",
        copy:
          "Trabajamos respetando buenas prÃ¡cticas y reglamentaciÃ³n vigente, con prioridad absoluta en:",
        note:
          "No realizamos trabajos que comprometan seguridad o normas, aunque sean mÃ¡s rÃ¡pidos o mÃ¡s baratos.",
        bullets: [
          "ProtecciÃ³n de personas",
          "ProtecciÃ³n de equipos y lÃ­neas",
          "Puesta a tierra adecuada",
          "Materiales certificados y terminaciones seguras",
          "InstalaciÃ³n ordenada y mantenible",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento previo: visitamos/analizamos la vivienda para entender alcance, estado actual y necesidades reales.",
          "Propuesta clara: presupuesto con alcance detallado, materiales incluidos, exclusiones y plazos realistas.",
          "EjecuciÃ³n prolija: trabajo ordenado, cableado identificado, tablero limpio y accesible.",
          "Entrega y explicaciÃ³n: dejamos el sistema funcionando y el cliente entiende cÃ³mo operar y quÃ© protecciones tiene.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene",
        bullets: [
          "Obra nueva o ampliaciÃ³n",
          "InstalaciÃ³n vieja sin protecciones o con fallas recurrentes",
          "Tablero desordenado o sin diferencial",
          "Reformas (cocina/baÃ±o) y aumento de consumo (aires, hornos, bombas)",
          "Necesidad de regularizar/adecuar instalaciÃ³n",
        ],
      },
    ],
    galleryItems: [
      {
        title: "Tablero elÃ©ctrico moderno, ordenado",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/tablero-electrico-moderno-ordenado.jpg",
      },
      {
        title: "CanalizaciÃ³n/cableado en obra",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/canalizacion-cableado.jfif",
      },
      {
        title: "Tomas y llaves instaladas (detalle)",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/tomas-llaves-instaladas.jpg",
      },
      {
        title: "MediciÃ³n/verificaciÃ³n (instrumentaciÃ³n)",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/medicion-verificacion.jfif",
      },
    ],
    finalCta: {
      title: "Â¿QuerÃ©s hacer la instalaciÃ³n bien desde el inicio?",
      text:
        "Contanos tu proyecto y coordinamos un relevamiento para definir la mejor soluciÃ³n.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
    },
  },
  "planos-y-proyectos": {
    metaDescription:
      "Proyectos elÃ©ctricos claros y documentados para viviendas, evitando errores durante la obra y garantizando cumplimiento normativo.",
    heroDescription:
      "Desarrollamos proyectos elÃ©ctricos claros y documentados, fundamentales para una obra segura, ordenada y sin sobrecostos. Un buen proyecto evita errores durante la ejecuciÃ³n y problemas futuros.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "DiseÃ±amos proyectos elÃ©ctricos completos para viviendas, contemplando circuitos, cargas, protecciones y crecimiento futuro. El proyecto es la base para que la instalaciÃ³n sea segura, eficiente y mantenible.",
      },
      {
        type: "bullets",
        title: "QuÃ© incluye el servicio",
        bullets: [
          "Planos elÃ©ctricos unifilares",
          "DefiniciÃ³n y separaciÃ³n de circuitos",
          "CÃ¡lculo y asignaciÃ³n de cargas",
          "Dimensionamiento de protecciones",
          "UbicaciÃ³n tÃ©cnica de tomas, llaves y tableros",
          "DocumentaciÃ³n base para ejecuciÃ³n de obra",
        ],
      },
      {
        type: "bullets",
        title: "Por quÃ© es importante un buen proyecto",
        copy:
          "Un proyecto elÃ©ctrico bien definido permite:",
        bullets: [
          "Reducir errores durante la obra",
          "Evitar retrabajos y sobrecostos",
          "Facilitar la ejecuciÃ³n por terceros",
          "Garantizar cumplimiento normativo",
          "Dejar la instalaciÃ³n preparada para ampliaciones futuras",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento y anÃ¡lisis de necesidades.",
          "DiseÃ±o del esquema elÃ©ctrico.",
          "RevisiÃ³n y ajustes con el cliente.",
          "Entrega de documentaciÃ³n tÃ©cnica.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene contratar este servicio",
        bullets: [
          "Viviendas nuevas",
          "Reformas integrales",
          "Ampliaciones de vivienda",
          "Obras que requieren planificaciÃ³n previa",
          "Clientes que quieren evitar improvisaciones",
        ],
      },
    ],
    galleryItems: [
      {
        title: "Plano elÃ©ctrico unifilar",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/plano-electrico-unifilar.gif",
      },
      {
        title: "Planos sobre mesa de trabajo",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/planos-sobre-mesa-trabajo.jpg",
      },
      {
        title: "Detalle de esquema elÃ©ctrico",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/detalle-esquema-electrico.webp",
      },
      {
        title: "DocumentaciÃ³n tÃ©cnica impresa/digital",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/documentacion-tecnica.jpg",
      },
    ],
    finalCta: {
      title: "Un buen proyecto evita problemas en la obra",
      text:
        "Consultanos y planificamos tu instalaciÃ³n elÃ©ctrica antes de construir o reformar.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
    },
  },
  habilitacion: {
    metaDescription:
      "AcompaÃ±amos la habilitaciÃ³n y regularizaciÃ³n elÃ©ctrica con relevamiento tÃ©cnico, correcciones y documentaciÃ³n clara para avanzar sin improvisaciones.",
    heroDescription:
      "AcompaÃ±amos el proceso de alta o regularizaciÃ³n del servicio elÃ©ctrico con relevamiento tÃ©cnico, correcciones necesarias y documentaciÃ³n mÃ­nima. Un camino claro, sin improvisaciones.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Realizamos el relevamiento de la instalaciÃ³n y definimos las adecuaciones necesarias para que el sistema cumpla criterios de seguridad y reglamentos vigentes. Te acompaÃ±amos en el proceso con explicaciones claras y pasos concretos.",
      },
      {
        type: "bullets",
        title: "QuÃ© incluye el servicio",
        bullets: [
          "Relevamiento tÃ©cnico de la instalaciÃ³n",
          "DetecciÃ³n de desvÃ­os o riesgos",
          "AdecuaciÃ³n de protecciones elÃ©ctricas",
          "Recomendaciones y correcciones necesarias",
          "DocumentaciÃ³n mÃ­nima para presentar/avanzar",
          "AcompaÃ±amiento tÃ©cnico durante el proceso",
        ],
      },
      {
        type: "bullets",
        title: "QuÃ© se revisa en la instalaciÃ³n",
        copy:
          "SegÃºn el caso, se verifican puntos crÃ­ticos que impactan en seguridad y funcionamiento.",
        bullets: [
          "Tablero elÃ©ctrico: orden, protecciones y circuitos",
          "ProtecciÃ³n diferencial (si aplica)",
          "TermomagnÃ©ticas y dimensionamiento",
          "Puesta a tierra y continuidad",
          "Estado general de conductores y conexiones",
          "SeparaciÃ³n de circuitos y cargas",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento previo y diagnÃ³stico.",
          "DefiniciÃ³n de alcance: quÃ© hay que corregir y por quÃ©.",
          "EjecuciÃ³n de adecuaciones (si corresponde) con terminaciÃ³n prolija.",
          "Entrega de documentaciÃ³n mÃ­nima y guÃ­a de prÃ³ximos pasos.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene",
        bullets: [
          "Alta de un servicio nuevo",
          "RegularizaciÃ³n de una instalaciÃ³n existente",
          "Viviendas con instalaciÃ³n antigua",
          "Tableros sin protecciones o desordenados",
          "Antes de una reforma importante",
        ],
      },
    ],
    galleryItems: [],
    finalCta: {
      title: "Hacemos el proceso claro y seguro",
      text:
        "Contanos tu situaciÃ³n y te indicamos el camino correcto para habilitar o regularizar tu servicio.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Priorizamos seguridad y cumplimiento por encima de atajos.",
    },
  },
  domótica: {
    metaDescription:
      "DomÃ³tica residencial escalable para controlar iluminaciÃ³n, clima, audio y accesos desde un Ãºnico panel inteligente.",
    heroDescription:
      "DiseÃ±amos e implementamos sistemas de domÃ³tica residencial que integran tecnologÃ­a Ãºtil al dÃ­a a dÃ­a. Soluciones pensadas para simplificar el uso de la vivienda, mejorar el confort y optimizar consumos.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Implementamos sistemas de domÃ³tica residencial que permiten controlar y automatizar distintos aspectos de la vivienda desde un Ãºnico entorno. Cada soluciÃ³n se diseÃ±a segÃºn las necesidades reales del cliente y preparada para crecer en el futuro.",
      },
      {
        type: "bullets",
        title: "QuÃ© se puede automatizar",
        bullets: [
          "IluminaciÃ³n interior y exterior",
          "Escenas y rutinas personalizadas",
          "Control de tomas y circuitos elÃ©ctricos",
          "ClimatizaciÃ³n (integraciÃ³n con aires y sistemas existentes)",
          "SonorizaciÃ³n y multimedia",
          "Acceso y control remoto desde el celular",
        ],
      },
      {
        type: "bullets",
        title: "Nuestro enfoque",
        copy:
          "La domÃ³tica debe ser confiable, simple de usar y mantenible. Evitamos soluciones cerradas o experimentales que luego no puedan ampliarse o mantenerse.",
        bullets: [
          "Soluciones escalables",
          "IntegraciÃ³n entre sistemas",
          "TecnologÃ­a probada",
          "Uso simple para el usuario",
          "Preparada para futuras ampliaciones",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento de la vivienda y hÃ¡bitos de uso.",
          "DefiniciÃ³n de funcionalidades y alcances.",
          "SelecciÃ³n de tecnologÃ­a adecuada.",
          "InstalaciÃ³n, configuraciÃ³n y pruebas.",
          "ExplicaciÃ³n de uso al cliente.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene implementar domÃ³tica",
        bullets: [
          "Viviendas nuevas",
          "Reformas integrales",
          "Mejora de confort y eficiencia",
          "CentralizaciÃ³n de controles",
          "Usuarios que buscan tecnologÃ­a Ãºtil, no compleja",
        ],
      },
    ],
    galleryItems: [
      { title: "IluminaciÃ³n inteligente en vivienda" },
      { title: "Control domÃ³tico desde celular" },
      { title: "Panel / interfaz de control" },
      { title: "IntegraciÃ³n de dispositivos en el hogar" },
    ],
    finalCta: {
      title: "La tecnologÃ­a tiene que simplificar la vida",
      text:
        "Consultanos y diseÃ±amos una soluciÃ³n de domÃ³tica adaptada a tu vivienda y a tu forma de vivir.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "No instalamos sistemas que no podamos mantener o escalar.",
    },
  },
  "automatizacion-exteriores": {
    metaDescription:
      "Automatizamos sistemas de riego, bombas y piscina con programaciÃ³n y control remoto para exteriores eficientes.",
    heroDescription:
      "DiseÃ±amos e instalamos automatizaciones para espacios exteriores: riego, bombas, vÃ¡lvulas y funcionamiento de piscina. Soluciones confiables para reducir trabajo manual y optimizar consumo.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Automatizamos sistemas exteriores para que funcionen de forma previsible y eficiente. Integramos control de riego y piscina, con programaciÃ³n por horarios y posibilidad de control remoto segÃºn el caso.",
      },
      {
        type: "bullets",
        title: "QuÃ© podemos automatizar",
        bullets: [
          "ProgramaciÃ³n de riego por zonas",
          "Control de electrovÃ¡lvulas",
          "Control de bombas (encendido/apagado y tiempos)",
          "Filtrado y limpieza de piscina",
          "Temporizaciones y rutinas automÃ¡ticas",
          "IntegraciÃ³n con domÃ³tica (si aplica)",
        ],
      },
      {
        type: "bullets",
        title: "Beneficios",
        copy: "La automatizaciÃ³n exterior mejora confort y reduce desperdicios.",
        bullets: [
          "Menor consumo de agua y energÃ­a",
          "Menos intervenciÃ³n manual",
          "Funcionamiento previsible",
          "Mayor vida Ãºtil de equipos por uso controlado",
          "Control centralizado y ordenado",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento del exterior y de los equipos existentes.",
          "DefiniciÃ³n de zonas, rutinas y necesidades reales.",
          "DiseÃ±o de la soluciÃ³n (tablero, protecciones y control).",
          "InstalaciÃ³n y configuraciÃ³n.",
          "Pruebas y explicaciÃ³n de uso.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene",
        bullets: [
          "Casas con jardÃ­n y riego por sectores",
          "Piscinas con filtrado manual o poco ordenado",
          "Usuarios que quieren previsibilidad y ahorro",
          "Necesidad de centralizar control de bombas y vÃ¡lvulas",
          "Proyectos que buscan confort y mantenimiento simple",
        ],
      },
    ],
    galleryItems: [
      { title: "Piscina exterior moderna" },
      { title: "Riego automatizado funcionando" },
      { title: "Tablero/control exterior (detalle tÃ©cnico prolijo)" },
      { title: "Control desde celular (si aplica)" },
    ],
    finalCta: {
      title: "Exteriores funcionando solos, sin complicaciones",
      text:
        "Consultanos y diseÃ±amos una automatizaciÃ³n confiable para tu jardÃ­n y piscina.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Todo sistema se entrega documentado y preparado para mantenimiento.",
    },
  },
  climatizacion: {
    metaDescription:
      "Asesoramiento e instalaciÃ³n de sistemas de climatizaciÃ³n eficientes en cada ambiente del hogar.",
    heroDescription:
      "Te ayudamos a definir la mejor soluciÃ³n de climatizaciÃ³n para cada ambiente: asesoramiento de compra, instalaciÃ³n y configuraciÃ³n. Confort, eficiencia y una instalaciÃ³n prolija.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Brindamos soluciones integrales de climatizaciÃ³n para viviendas: desde la elecciÃ³n del equipo hasta la instalaciÃ³n final. Nuestro enfoque es tÃ©cnico: cada ambiente requiere un equipo adecuado, con una instalaciÃ³n segura y eficiente.",
      },
      {
        type: "bullets",
        title: "QuÃ© incluye el servicio",
        bullets: [
          "Asesoramiento para selecciÃ³n de equipos",
          "InstalaciÃ³n de aires acondicionados",
          "DefiniciÃ³n de ubicaciÃ³n Ã³ptima (unidad interior/exterior)",
          "AlimentaciÃ³n elÃ©ctrica y protecciones (si aplica)",
          "ConfiguraciÃ³n y pruebas de funcionamiento",
          "Recomendaciones de uso eficiente",
        ],
      },
      {
        type: "text",
        title: "Asesoramiento de compra",
        copy:
          "Antes de comprar, definimos quÃ© equipo conviene segÃºn el ambiente y el uso. Esto evita sobredimensionar (mÃ¡s costo) o quedarse corto (bajo rendimiento).",
      },
      {
        type: "bullets",
        title: "Factores que estudiamos",
        bullets: [
          "Superficie y caracterÃ­sticas del ambiente",
          "AislaciÃ³n y orientaciÃ³n",
          "Uso real y cantidad de personas",
          "Eficiencia energÃ©tica y consumo",
        ],
      },
      {
        type: "text",
        title: "InstalaciÃ³n prolija y segura",
        copy:
          "Una buena instalaciÃ³n impacta en rendimiento y vida Ãºtil del equipo. Priorizamos terminaciones prolijas, seguridad elÃ©ctrica y funcionamiento estable.",
      },
      {
        type: "bullets",
        title: "QuÃ© garantizamos",
        bullets: [
          "Terminaciones limpias",
          "Soportes y fijaciones seguras",
          "Tendido ordenado",
          "Protecciones elÃ©ctricas cuando corresponde",
          "Pruebas y verificaciÃ³n final",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento del ambiente y necesidades.",
          "RecomendaciÃ³n de equipo (si el cliente lo solicita).",
          "DefiniciÃ³n de ubicaciÃ³n y trazado de instalaciÃ³n.",
          "InstalaciÃ³n y pruebas.",
          "ExplicaciÃ³n de uso y recomendaciones.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene",
        bullets: [
          "InstalaciÃ³n en vivienda nueva",
          "Recambio de equipos antiguos",
          "Ambientes que no climatizan bien",
          "BÃºsqueda de eficiencia y menor consumo",
          "IntegraciÃ³n con domÃ³tica (si aplica)",
        ],
      },
    ],
    galleryItems: [
      { title: "Aire acondicionado instalado en living moderno" },
      { title: "Unidad exterior instalada prolija" },
      { title: "Detalle de instalaciÃ³n / terminaciones" },
      { title: "Ambiente confortable y moderno" },
    ],
    finalCta: {
      title: "Confort real, con instalaciÃ³n profesional",
      text: "Consultanos y definimos la mejor soluciÃ³n de climatizaciÃ³n para tu casa.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Priorizamos soluciones eficientes y fÃ¡ciles de mantener.",
    },
  },
  "seguridad-electronica": {
    metaDescription:
      "DiseÃ±amos sistemas de seguridad electrÃ³nica con cÃ¡maras, alarmas y control de accesos integrados para viviendas.",
    heroDescription:
      "DiseÃ±amos e instalamos sistemas de seguridad electrÃ³nica confiables y fÃ¡ciles de usar: cÃ¡maras, alarmas y control de accesos. Priorizamos cobertura real, instalaciÃ³n prolija y configuraciÃ³n clara.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "QuÃ© hacemos",
        copy:
          "Implementamos soluciones de seguridad adaptadas a cada vivienda. Definimos puntos crÃ­ticos, alcance y nivel de integraciÃ³n deseado, para lograr un sistema efectivo y mantenible.",
      },
      {
        type: "bullets",
        title: "Soluciones disponibles",
        bullets: [
          "CÃ¡maras de seguridad (CCTV)",
          "Sistemas de alarma",
          "Cerraduras electrÃ³nicas y control de accesos",
          "Monitoreo y acceso remoto (si aplica)",
          "IntegraciÃ³n con domÃ³tica (si corresponde)",
        ],
      },
      {
        type: "text",
        title: "DiseÃ±o de cobertura",
        copy:
          "La seguridad no es poner â€˜una cÃ¡maraâ€™. Es diseÃ±ar cobertura: quÃ© se ve, desde dÃ³nde y con quÃ© calidad.",
      },
      {
        type: "bullets",
        title: "Cobertura bien pensada",
        bullets: [
          "DefiniciÃ³n de puntos crÃ­ticos",
          "Ãngulos, alcance y zonas ciegas",
          "UbicaciÃ³n y protecciÃ³n de equipos",
          "Orden y trazado de cableado/alimentaciÃ³n",
          "ConfiguraciÃ³n y pruebas finales",
        ],
      },
      {
        type: "text",
        title: "InstalaciÃ³n prolija y configuraciÃ³n",
        copy:
          "Una instalaciÃ³n prolija mejora confiabilidad y evita problemas futuros. Dejamos el sistema configurado, probado y explicado al usuario.",
      },
      {
        type: "bullets",
        title: "QuÃ© garantizamos",
        bullets: [
          "Cableado ordenado y seguro",
          "Montaje firme y discreto",
          "ConfiguraciÃ³n de grabaciÃ³n/notificaciones (si aplica)",
          "Acceso y uso claro para el cliente",
          "Preparado para mantenimiento y ampliaciÃ³n",
        ],
      },
      {
        type: "steps",
        title: "CÃ³mo trabajamos",
        steps: [
          "Relevamiento del lugar y objetivos del cliente.",
          "DefiniciÃ³n de alcance y cobertura.",
          "Propuesta tÃ©cnica clara.",
          "InstalaciÃ³n y configuraciÃ³n.",
          "Pruebas, ajustes y explicaciÃ³n de uso.",
        ],
      },
      {
        type: "bullets",
        title: "CuÃ¡ndo conviene",
        bullets: [
          "Mejorar seguridad en accesos",
          "Monitoreo de perÃ­metro y exteriores",
          "Control de ingresos/salidas",
          "Necesidad de acceso remoto",
          "IntegraciÃ³n con domÃ³tica y automatizaciones",
        ],
      },
    ],
    galleryItems: [
      { title: "CÃ¡mara de seguridad instalada (exterior)" },
      { title: "Cerradura electrÃ³nica en puerta moderna" },
      { title: "App / monitoreo (pantalla genÃ©rica sin marcas)" },
      { title: "InstalaciÃ³n prolija / detalle de montaje" },
    ],
    finalCta: {
      title: "Seguridad clara, sin complejidad",
      text: "Consultanos y definimos una soluciÃ³n de seguridad adaptada a tu vivienda.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Todo sistema se entrega configurado y probado, con explicaciÃ³n de uso.",
    },
  },
};
