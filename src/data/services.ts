export type HomeService = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imageSrc: string;
};

// Replace each imageSrc with the real service asset located in /public/images/services (or import the asset directly).
export const services: HomeService[] = [
  {
    id: "instalaciones-electricas",
    title: "Instalaciones eléctricas",
    subtitle: "Instalaciones nuevas y reformas seguras, prolijas y normalizadas.",
    description:
      "Ejecutamos instalaciones completas con tableros certificados, canalizaciones ordenadas y pruebas de puesta en marcha para que todo funcione desde el primer día.",
    bullets: [
      "Proyecto ejecutivo con planos unifilares y cuadro de cargas",
      "Montaje con cableado certificado, protecciones selectivas y etiquetado claro",
      "Verificación final con mediciones, pruebas de puesta en marcha y registro fotográfico",
    ],
    imageSrc: "/images/services/placeholder-electricidad.jpg",
  },
  {
    id: "planos-y-proyectos",
    title: "Planos y proyectos eléctricos",
    subtitle: "Diseño eléctrico profesional para viviendas nuevas y reformas.",
    description:
      "Diseñamos memoria de cálculo, planimetría y especificaciones de materiales para que tu obra avance sin dudas ni retrabajos.",
    bullets: [
      "Diagrama eléctrico y marcos de control detallados",
      "Coordinación con arquitectos y equipo de obra para evitar interferencias",
      "Documentación lista para permisos, distribuidora y aprobación AEA/IRAM",
    ],
    imageSrc: "/images/services/placeholder-planos.jpg",
  },
  {
    id: "habilitacion",
    title: "Habilitación de servicios eléctricos",
    subtitle: "Asesoramiento técnico y adecuación para altas y regularizaciones.",
    description:
      "Confirmamos que tu instalación cumple la normativa, preparamos los expedientes y acompañamos la habilitación ante distribuidoras.",
    bullets: [
      "Relevamiento y reporte de estado de los tableros existentes",
      "Presentación técnica con planos, memoria y listado de materiales",
      "Seguimiento del trámite con la distribuidora y certificaciones finales",
    ],
    imageSrc: "/images/services/placeholder-habilitacion.jpg",
  },
  {
    id: "domotica",
    title: "Domótica",
    subtitle: "Control inteligente del hogar: confort, eficiencia y tecnología.",
    description:
      "Integramos climatización, iluminación, accesos y escenas con paneles táctiles, app y asistencia remota para vivir más cómodo.",
    bullets: [
      "Programación de escenas, horarios y escenarios personalizados",
      "Integración de clima, luces y accesos en un mismo ecosistema",
      "Capacitación y soporte en el portal privado para ajustar parámetros",
    ],
    imageSrc: "/images/services/placeholder-domotica.jpg",
  },
  {
    id: "automatizacion-exteriores",
    title: "Automatización de exteriores",
    subtitle: "Riego y piscina automatizados, con control y programación.",
    description:
      "Automatizamos el riego, la piscina y los paisajes luminosos para que el exterior esté listo con un solo toque.",
    bullets: [
      "Programación de sistemas de riego y fertilización inteligente",
      "Control remoto de bombas, filtros y luminarias exteriores",
      "Sensores climáticos y alarmas que reaccionan a variaciones de suelo y clima",
    ],
    imageSrc: "/images/services/placeholder-exteriores.jpg",
  },
  {
    id: "climatizacion",
    title: "Climatización",
    subtitle: "Asesoramiento e instalación de aires y sistemas de climatización.",
    description:
      "Dimensionamos, seleccionamos y montamos equipos para lograr confort térmico sin desperdiciar energía.",
    bullets: [
      "Cálculo térmico y selección de equipos con eficiencia energética",
      "Montaje de ductos, rejillas y mandos con estética cuidada",
      "Puesta en marcha con balanceo, mediciones y entrega de manuales",
    ],
    imageSrc: "/images/services/placeholder-climatizacion.jpg",
  },
  {
    id: "seguridad-electronica",
    title: "Seguridad electrónica",
    subtitle: "Cámaras, alarmas y cerraduras electrónicas integradas.",
    description:
      "Instalamos circuitos de seguridad completos con monitoreo, notificaciones y respaldo remoto.",
    bullets: [
      "Diseño de circuitos con cámaras, sensores perimetrales y control de accesos",
      "Integración con alarmas, cerraduras y monitoreo en el portal",
      "Alertas y soporte 24/7 para que la operación esté siempre bajo control",
    ],
    imageSrc: "/images/services/placeholder-seguridad.jpg",
  },
];
