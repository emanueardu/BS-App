import { ServiceDetailConfig } from "@/types/serviceDetails";

export const serviceDetailConfigs: Record<string, ServiceDetailConfig> = {
  "instalaciones-electricas": {
    metaDescription:
      "Instalaciones eléctricas residenciales con criterio técnico, materiales certificados y terminaciones prolijas para cada etapa de la obra.",
    heroDescription:
      "Realizamos instalaciones eléctricas residenciales con criterio técnico, materiales certificados y terminaciones prolijas. Seguridad, cumplimiento y previsibilidad en cada obra.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Ejecutamos instalaciones eléctricas completas y reformas para viviendas, priorizando la seguridad de las personas y la confiabilidad del sistema. Trabajamos con planificación previa, protecciones correctas, circuitos bien definidos y documentación mínima entregada. Enfoque: no hacemos “parches”; armamos un sistema eléctrico mantenible y escalable.",
      },
      {
        type: "bullets",
        title: "Qué incluye el servicio",
        bullets: [
          "Instalaciones nuevas (obra nueva)",
          "Reformas y recableados completos",
          "Ampliaciones de circuitos (tomas, iluminación, líneas dedicadas)",
          "Armado y adecuación de tableros eléctricos",
          "Protecciones: térmicas, diferencial, seccionamiento correcto",
          "Puesta a tierra y verificación de seguridad",
          "Ordenamiento, rotulado y prolijidad de instalación",
          "Pruebas básicas de funcionamiento y entrega",
        ],
      },
      {
        type: "text",
        title: "Tableros eléctricos normalizados",
        copy:
          "Un tablero bien resuelto es el corazón de la instalación. Diseñamos tableros claros, ordenados y preparados para el uso real de la vivienda.",
      },
      {
        type: "bullets",
        title: "Seguridad y cumplimiento",
        copy:
          "Trabajamos respetando buenas prácticas y reglamentación vigente, con prioridad absoluta en:",
        note:
          "No realizamos trabajos que comprometan seguridad o normas, aunque sean más rápidos o más baratos.",
        bullets: [
          "Protección de personas",
          "Protección de equipos y líneas",
          "Puesta a tierra adecuada",
          "Materiales certificados y terminaciones seguras",
          "Instalación ordenada y mantenible",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento previo: visitamos/analizamos la vivienda para entender alcance, estado actual y necesidades reales.",
          "Propuesta clara: presupuesto con alcance detallado, materiales incluidos, exclusiones y plazos realistas.",
          "Ejecución prolija: trabajo ordenado, cableado identificado, tablero limpio y accesible.",
          "Entrega y explicación: dejamos el sistema funcionando y el cliente entiende cómo operar y qué protecciones tiene.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene",
        bullets: [
          "Obra nueva o ampliación",
          "Instalación vieja sin protecciones o con fallas recurrentes",
          "Tablero desordenado o sin diferencial",
          "Reformas (cocina/baño) y aumento de consumo (aires, hornos, bombas)",
          "Necesidad de regularizar/adecuar instalación",
        ],
      },
    ],
    galleryItems: [
      {
        title: "Tablero eléctrico moderno, ordenado",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/tablero-electrico-moderno-ordenado.jpg",
      },
      {
        title: "Canalización/cableado en obra",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/canalizacion-cableado.jfif",
      },
      {
        title: "Tomas y llaves instaladas (detalle)",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/tomas-llaves-instaladas.jpg",
      },
      {
        title: "Medición/verificación (instrumentación)",
        imageSrc:
          "/images/services/Gallery/Instalaciones-electricas/medicion-verificacion.jfif",
      },
    ],
    finalCta: {
      title: "¿Querés hacer la instalación bien desde el inicio?",
      text:
        "Contanos tu proyecto y coordinamos un relevamiento para definir la mejor solución.",
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
      "Proyectos eléctricos claros y documentados para viviendas, evitando errores durante la obra y garantizando cumplimiento normativo.",
    heroDescription:
      "Desarrollamos proyectos eléctricos claros y documentados, fundamentales para una obra segura, ordenada y sin sobrecostos. Un buen proyecto evita errores durante la ejecución y problemas futuros.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Diseñamos proyectos eléctricos completos para viviendas, contemplando circuitos, cargas, protecciones y crecimiento futuro. El proyecto es la base para que la instalación sea segura, eficiente y mantenible.",
      },
      {
        type: "bullets",
        title: "Qué incluye el servicio",
        bullets: [
          "Planos eléctricos unifilares",
          "Definición y separación de circuitos",
          "Cálculo y asignación de cargas",
          "Dimensionamiento de protecciones",
          "Ubicación técnica de tomas, llaves y tableros",
          "Documentación base para ejecución de obra",
        ],
      },
      {
        type: "bullets",
        title: "Por qué es importante un buen proyecto",
        copy:
          "Un proyecto eléctrico bien definido permite:",
        bullets: [
          "Reducir errores durante la obra",
          "Evitar retrabajos y sobrecostos",
          "Facilitar la ejecución por terceros",
          "Garantizar cumplimiento normativo",
          "Dejar la instalación preparada para ampliaciones futuras",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento y análisis de necesidades.",
          "Diseño del esquema eléctrico.",
          "Revisión y ajustes con el cliente.",
          "Entrega de documentación técnica.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene contratar este servicio",
        bullets: [
          "Viviendas nuevas",
          "Reformas integrales",
          "Ampliaciones de vivienda",
          "Obras que requieren planificación previa",
          "Clientes que quieren evitar improvisaciones",
        ],
      },
    ],
    galleryItems: [
      {
        title: "Plano eléctrico unifilar",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/plano-electrico-unifilar.gif",
      },
      {
        title: "Planos sobre mesa de trabajo",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/planos-sobre-mesa-trabajo.jpg",
      },
      {
        title: "Detalle de esquema eléctrico",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/detalle-esquema-electrico.webp",
      },
      {
        title: "Documentación técnica impresa/digital",
        imageSrc:
          "/images/services/Gallery/planos-y-proyectos-electricos/documentacion-tecnica.jpg",
      },
    ],
    finalCta: {
      title: "Un buen proyecto evita problemas en la obra",
      text:
        "Consultanos y planificamos tu instalación eléctrica antes de construir o reformar.",
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
      "Acompañamos la habilitación y regularización eléctrica con relevamiento técnico, correcciones y documentación clara para avanzar sin improvisaciones.",
    heroDescription:
      "Acompañamos el proceso de alta o regularización del servicio eléctrico con relevamiento técnico, correcciones necesarias y documentación mínima. Un camino claro, sin improvisaciones.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Realizamos el relevamiento de la instalación y definimos las adecuaciones necesarias para que el sistema cumpla criterios de seguridad y reglamentos vigentes. Te acompañamos en el proceso con explicaciones claras y pasos concretos.",
      },
      {
        type: "bullets",
        title: "Qué incluye el servicio",
        bullets: [
          "Relevamiento técnico de la instalación",
          "Detección de desvíos o riesgos",
          "Adecuación de protecciones eléctricas",
          "Recomendaciones y correcciones necesarias",
          "Documentación mínima para presentar/avanzar",
          "Acompañamiento técnico durante el proceso",
        ],
      },
      {
        type: "bullets",
        title: "Qué se revisa en la instalación",
        copy:
          "Según el caso, se verifican puntos críticos que impactan en seguridad y funcionamiento.",
        bullets: [
          "Tablero eléctrico: orden, protecciones y circuitos",
          "Protección diferencial (si aplica)",
          "Termomagnéticas y dimensionamiento",
          "Puesta a tierra y continuidad",
          "Estado general de conductores y conexiones",
          "Separación de circuitos y cargas",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento previo y diagnóstico.",
          "Definición de alcance: qué hay que corregir y por qué.",
          "Ejecución de adecuaciones (si corresponde) con terminación prolija.",
          "Entrega de documentación mínima y guía de próximos pasos.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene",
        bullets: [
          "Alta de un servicio nuevo",
          "Regularización de una instalación existente",
          "Viviendas con instalación antigua",
          "Tableros sin protecciones o desordenados",
          "Antes de una reforma importante",
        ],
      },
    ],
    galleryItems: [],
    finalCta: {
      title: "Hacemos el proceso claro y seguro",
      text:
        "Contanos tu situación y te indicamos el camino correcto para habilitar o regularizar tu servicio.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Priorizamos seguridad y cumplimiento por encima de atajos.",
    },
  },
  domotica: {
    metaDescription:
      "Domótica residencial escalable para controlar iluminación, clima, audio y accesos desde un único panel inteligente.",
    heroDescription:
      "Diseñamos e implementamos sistemas de domótica residencial que integran tecnología útil al día a día. Soluciones pensadas para simplificar el uso de la vivienda, mejorar el confort y optimizar consumos.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Implementamos sistemas de domótica residencial que permiten controlar y automatizar distintos aspectos de la vivienda desde un único entorno. Cada solución se diseña según las necesidades reales del cliente y preparada para crecer en el futuro.",
      },
      {
        type: "bullets",
        title: "Qué se puede automatizar",
        bullets: [
          "Iluminación interior y exterior",
          "Escenas y rutinas personalizadas",
          "Control de tomas y circuitos eléctricos",
          "Climatización (integración con aires y sistemas existentes)",
          "Sonorización y multimedia",
          "Acceso y control remoto desde el celular",
        ],
      },
      {
        type: "bullets",
        title: "Nuestro enfoque",
        copy:
          "La domótica debe ser confiable, simple de usar y mantenible. Evitamos soluciones cerradas o experimentales que luego no puedan ampliarse o mantenerse.",
        bullets: [
          "Soluciones escalables",
          "Integración entre sistemas",
          "Tecnología probada",
          "Uso simple para el usuario",
          "Preparada para futuras ampliaciones",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento de la vivienda y hábitos de uso.",
          "Definición de funcionalidades y alcances.",
          "Selección de tecnología adecuada.",
          "Instalación, configuración y pruebas.",
          "Explicación de uso al cliente.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene implementar domótica",
        bullets: [
          "Viviendas nuevas",
          "Reformas integrales",
          "Mejora de confort y eficiencia",
          "Centralización de controles",
          "Usuarios que buscan tecnología útil, no compleja",
        ],
      },
    ],
    galleryItems: [
      { title: "Iluminación inteligente en vivienda" },
      { title: "Control domótico desde celular" },
      { title: "Panel / interfaz de control" },
      { title: "Integración de dispositivos en el hogar" },
    ],
    finalCta: {
      title: "La tecnología tiene que simplificar la vida",
      text:
        "Consultanos y diseñamos una solución de domótica adaptada a tu vivienda y a tu forma de vivir.",
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
      "Automatizamos sistemas de riego, bombas y piscina con programación y control remoto para exteriores eficientes.",
    heroDescription:
      "Diseñamos e instalamos automatizaciones para espacios exteriores: riego, bombas, válvulas y funcionamiento de piscina. Soluciones confiables para reducir trabajo manual y optimizar consumo.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Automatizamos sistemas exteriores para que funcionen de forma previsible y eficiente. Integramos control de riego y piscina, con programación por horarios y posibilidad de control remoto según el caso.",
      },
      {
        type: "bullets",
        title: "Qué podemos automatizar",
        bullets: [
          "Programación de riego por zonas",
          "Control de electroválvulas",
          "Control de bombas (encendido/apagado y tiempos)",
          "Filtrado y limpieza de piscina",
          "Temporizaciones y rutinas automáticas",
          "Integración con domótica (si aplica)",
        ],
      },
      {
        type: "bullets",
        title: "Beneficios",
        copy: "La automatización exterior mejora confort y reduce desperdicios.",
        bullets: [
          "Menor consumo de agua y energía",
          "Menos intervención manual",
          "Funcionamiento previsible",
          "Mayor vida útil de equipos por uso controlado",
          "Control centralizado y ordenado",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento del exterior y de los equipos existentes.",
          "Definición de zonas, rutinas y necesidades reales.",
          "Diseño de la solución (tablero, protecciones y control).",
          "Instalación y configuración.",
          "Pruebas y explicación de uso.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene",
        bullets: [
          "Casas con jardín y riego por sectores",
          "Piscinas con filtrado manual o poco ordenado",
          "Usuarios que quieren previsibilidad y ahorro",
          "Necesidad de centralizar control de bombas y válvulas",
          "Proyectos que buscan confort y mantenimiento simple",
        ],
      },
    ],
    galleryItems: [
      { title: "Piscina exterior moderna" },
      { title: "Riego automatizado funcionando" },
      { title: "Tablero/control exterior (detalle técnico prolijo)" },
      { title: "Control desde celular (si aplica)" },
    ],
    finalCta: {
      title: "Exteriores funcionando solos, sin complicaciones",
      text:
        "Consultanos y diseñamos una automatización confiable para tu jardín y piscina.",
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
      "Asesoramiento e instalación de sistemas de climatización eficientes en cada ambiente del hogar.",
    heroDescription:
      "Te ayudamos a definir la mejor solución de climatización para cada ambiente: asesoramiento de compra, instalación y configuración. Confort, eficiencia y una instalación prolija.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Brindamos soluciones integrales de climatización para viviendas: desde la elección del equipo hasta la instalación final. Nuestro enfoque es técnico: cada ambiente requiere un equipo adecuado, con una instalación segura y eficiente.",
      },
      {
        type: "bullets",
        title: "Qué incluye el servicio",
        bullets: [
          "Asesoramiento para selección de equipos",
          "Instalación de aires acondicionados",
          "Definición de ubicación óptima (unidad interior/exterior)",
          "Alimentación eléctrica y protecciones (si aplica)",
          "Configuración y pruebas de funcionamiento",
          "Recomendaciones de uso eficiente",
        ],
      },
      {
        type: "text",
        title: "Asesoramiento de compra",
        copy:
          "Antes de comprar, definimos qué equipo conviene según el ambiente y el uso. Esto evita sobredimensionar (más costo) o quedarse corto (bajo rendimiento).",
      },
      {
        type: "bullets",
        title: "Factores que estudiamos",
        bullets: [
          "Superficie y características del ambiente",
          "Aislación y orientación",
          "Uso real y cantidad de personas",
          "Eficiencia energética y consumo",
        ],
      },
      {
        type: "text",
        title: "Instalación prolija y segura",
        copy:
          "Una buena instalación impacta en rendimiento y vida útil del equipo. Priorizamos terminaciones prolijas, seguridad eléctrica y funcionamiento estable.",
      },
      {
        type: "bullets",
        title: "Qué garantizamos",
        bullets: [
          "Terminaciones limpias",
          "Soportes y fijaciones seguras",
          "Tendido ordenado",
          "Protecciones eléctricas cuando corresponde",
          "Pruebas y verificación final",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento del ambiente y necesidades.",
          "Recomendación de equipo (si el cliente lo solicita).",
          "Definición de ubicación y trazado de instalación.",
          "Instalación y pruebas.",
          "Explicación de uso y recomendaciones.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene",
        bullets: [
          "Instalación en vivienda nueva",
          "Recambio de equipos antiguos",
          "Ambientes que no climatizan bien",
          "Búsqueda de eficiencia y menor consumo",
          "Integración con domótica (si aplica)",
        ],
      },
    ],
    galleryItems: [
      { title: "Aire acondicionado instalado en living moderno" },
      { title: "Unidad exterior instalada prolija" },
      { title: "Detalle de instalación / terminaciones" },
      { title: "Ambiente confortable y moderno" },
    ],
    finalCta: {
      title: "Confort real, con instalación profesional",
      text: "Consultanos y definimos la mejor solución de climatización para tu casa.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Priorizamos soluciones eficientes y fáciles de mantener.",
    },
  },
  "seguridad-electronica": {
    metaDescription:
      "Diseñamos sistemas de seguridad electrónica con cámaras, alarmas y control de accesos integrados para viviendas.",
    heroDescription:
      "Diseñamos e instalamos sistemas de seguridad electrónica confiables y fáciles de usar: cámaras, alarmas y control de accesos. Priorizamos cobertura real, instalación prolija y configuración clara.",
    heroActions: [
      { label: "Consultar", href: "/contacto", variant: "primary" },
      { label: "Ver otros servicios", href: "/servicios", variant: "secondary" },
    ],
    sections: [
      {
        type: "text",
        title: "Qué hacemos",
        copy:
          "Implementamos soluciones de seguridad adaptadas a cada vivienda. Definimos puntos críticos, alcance y nivel de integración deseado, para lograr un sistema efectivo y mantenible.",
      },
      {
        type: "bullets",
        title: "Soluciones disponibles",
        bullets: [
          "Cámaras de seguridad (CCTV)",
          "Sistemas de alarma",
          "Cerraduras electrónicas y control de accesos",
          "Monitoreo y acceso remoto (si aplica)",
          "Integración con domótica (si corresponde)",
        ],
      },
      {
        type: "text",
        title: "Diseño de cobertura",
        copy:
          "La seguridad no es poner ‘una cámara’. Es diseñar cobertura: qué se ve, desde dónde y con qué calidad.",
      },
      {
        type: "bullets",
        title: "Cobertura bien pensada",
        bullets: [
          "Definición de puntos críticos",
          "Ángulos, alcance y zonas ciegas",
          "Ubicación y protección de equipos",
          "Orden y trazado de cableado/alimentación",
          "Configuración y pruebas finales",
        ],
      },
      {
        type: "text",
        title: "Instalación prolija y configuración",
        copy:
          "Una instalación prolija mejora confiabilidad y evita problemas futuros. Dejamos el sistema configurado, probado y explicado al usuario.",
      },
      {
        type: "bullets",
        title: "Qué garantizamos",
        bullets: [
          "Cableado ordenado y seguro",
          "Montaje firme y discreto",
          "Configuración de grabación/notificaciones (si aplica)",
          "Acceso y uso claro para el cliente",
          "Preparado para mantenimiento y ampliación",
        ],
      },
      {
        type: "steps",
        title: "Cómo trabajamos",
        steps: [
          "Relevamiento del lugar y objetivos del cliente.",
          "Definición de alcance y cobertura.",
          "Propuesta técnica clara.",
          "Instalación y configuración.",
          "Pruebas, ajustes y explicación de uso.",
        ],
      },
      {
        type: "bullets",
        title: "Cuándo conviene",
        bullets: [
          "Mejorar seguridad en accesos",
          "Monitoreo de perímetro y exteriores",
          "Control de ingresos/salidas",
          "Necesidad de acceso remoto",
          "Integración con domótica y automatizaciones",
        ],
      },
    ],
    galleryItems: [
      { title: "Cámara de seguridad instalada (exterior)" },
      { title: "Cerradura electrónica en puerta moderna" },
      { title: "App / monitoreo (pantalla genérica sin marcas)" },
      { title: "Instalación prolija / detalle de montaje" },
    ],
    finalCta: {
      title: "Seguridad clara, sin complejidad",
      text: "Consultanos y definimos una solución de seguridad adaptada a tu vivienda.",
      primary: { label: "Consultar", href: "/contacto", variant: "primary" },
      secondary: {
        label: "Volver a Servicios",
        href: "/servicios",
        variant: "secondary",
      },
      footnote: "Todo sistema se entrega configurado y probado, con explicación de uso.",
    },
  },
};
