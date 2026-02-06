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
};
