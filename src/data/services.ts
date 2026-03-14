export type Service = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  imageSrc: string;
};

// Replace each imageSrc with the real service asset located in /public/images/services (or import the asset directly).
export const services: Service[] = [
  {
    id: "instalaciones-electricas",
    slug: "instalaciones-electricas",
    title: "Instalaciones elÃ©ctricas",
    subtitle: "Instalaciones nuevas y reformas seguras, prolijas y normalizadas.",
    description:
      "Ejecutamos instalaciones completas con tableros certificados, canalizaciones ordenadas y pruebas de puesta en marcha para que todo funcione desde el primer dÃ­a.",
    bullets: [
      "Proyecto ejecutivo con planos unifilares y cuadro de cargas",
      "Montaje con cableado certificado, protecciones selectivas y etiquetado claro",
      "VerificaciÃ³n final con mediciones, pruebas de puesta en marcha y registro fotogrÃ¡fico",
    ],
    imageSrc: "/images/services/instalaciones-electricas.jpg",
  },
  {
    id: "planos-y-proyectos",
    slug: "planos-y-proyectos",
    title: "Planos y proyectos elÃ©ctricos",
    subtitle: "DiseÃ±o elÃ©ctrico profesional para viviendas nuevas y reformas.",
    description:
      "DiseÃ±amos memoria de cÃ¡lculo, planimetrÃ­a y especificaciones de materiales para que tu obra avance sin dudas ni retrabajos.",
    bullets: [
      "Diagrama elÃ©ctrico y marcos de control detallados",
      "CoordinaciÃ³n con arquitectos y equipo de obra para evitar interferencias",
      "DocumentaciÃ³n lista para permisos, distribuidora y aprobaciÃ³n AEA/IRAM",
    ],
    imageSrc: "/images/services/planos-y-proyectos.jpg",
  },
  {
    id: "habilitacion",
    slug: "habilitacion",
    title: "HabilitaciÃ³n de servicios elÃ©ctricos",
    subtitle: "Asesoramiento tÃ©cnico y adecuaciÃ³n para altas y regularizaciones.",
    description:
      "Confirmamos que tu instalaciÃ³n cumple la normativa, preparamos los expedientes y acompaÃ±amos la habilitaciÃ³n ante distribuidoras.",
    bullets: [
      "Relevamiento y reporte de estado de los tableros existentes",
      "PresentaciÃ³n tÃ©cnica con planos, memoria y listado de materiales",
      "Seguimiento del trÃ¡mite con la distribuidora y certificaciones finales",
    ],
    imageSrc: "/images/services/habilitacion.jpg",
  },
  {
    id: "domótica",
    slug: "domótica",
    title: "DomÃ³tica",
    subtitle: "Control inteligente del hogar: confort, eficiencia y tecnologÃ­a.",
    description:
      "Integramos climatizaciÃ³n, iluminaciÃ³n, accesos y escenas con paneles tÃ¡ctiles, app y asistencia remota para vivir mÃ¡s cÃ³modo.",
    bullets: [
      "ProgramaciÃ³n de escenas, horarios y escenarios personalizados",
      "IntegraciÃ³n de clima, luces y accesos en un mismo ecosistema",
      "CapacitaciÃ³n y soporte en el portal privado para ajustar parÃ¡metros",
    ],
    imageSrc: "/images/services/domótica.jpg",
  },
  {
    id: "automatizacion-exteriores",
    slug: "automatizacion-exteriores",
    title: "AutomatizaciÃ³n de exteriores",
    subtitle: "Riego y piscina automatizados, con control y programaciÃ³n.",
    description:
      "Automatizamos el riego, la piscina y los paisajes luminosos para que el exterior estÃ© listo con un solo toque.",
    bullets: [
      "ProgramaciÃ³n de sistemas de riego y fertilizaciÃ³n inteligente",
      "Control remoto de bombas, filtros y luminarias exteriores",
      "Sensores climÃ¡ticos y alarmas que reaccionan a variaciones de suelo y clima",
    ],
    imageSrc: "/images/services/automatizacion-exteriores.jpg",
  },
  {
    id: "climatizacion",
    slug: "climatizacion",
    title: "ClimatizaciÃ³n",
    subtitle: "Asesoramiento e instalaciÃ³n de aires y sistemas de climatizaciÃ³n.",
    description:
      "Dimensionamos, seleccionamos y montamos equipos para lograr confort tÃ©rmico sin desperdiciar energÃ­a.",
    bullets: [
      "CÃ¡lculo tÃ©rmico y selecciÃ³n de equipos con eficiencia energÃ©tica",
      "Montaje de ductos, rejillas y mandos con estÃ©tica cuidada",
      "Puesta en marcha con balanceo, mediciones y entrega de manuales",
    ],
    imageSrc: "/images/services/climatizacion.jpg",
  },
  {
    id: "seguridad-electronica",
    slug: "seguridad-electronica",
    title: "Seguridad electrÃ³nica",
    subtitle: "CÃ¡maras, alarmas y cerraduras electrÃ³nicas integradas.",
    description:
      "Instalamos circuitos de seguridad completos con monitoreo, notificaciones y respaldo remoto.",
    bullets: [
      "DiseÃ±o de circuitos con cÃ¡maras, sensores perimetrales y control de accesos",
      "IntegraciÃ³n con alarmas, cerraduras y monitoreo en el portal",
      "Alertas y soporte 24/7 para que la operaciÃ³n estÃ© siempre bajo control",
    ],
    imageSrc: "/images/services/seguridad-electronica.jpg",
  },
];
