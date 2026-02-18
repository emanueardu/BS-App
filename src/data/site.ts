import {
  ArrowBigRight,
  BadgeCheck,
  ClipboardList,
  FileText,
  Gauge,
  Home,
  Lightbulb,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const SHOW_PROJECTS_SECTION = false;

export const icons = {
  Zap,
  Home,
  Lightbulb,
  Gauge,
  ClipboardList,
  FileText,
  ShieldCheck,
  BadgeCheck,
  ArrowBigRight,
} as const;

export type IconName = keyof typeof icons;

export type Service = {
  id: string;
  title: string;
  description: string;
  for: string[];
  includes: string[];
  excludes: string[];
  deliverables: string[];
  icon: IconName;
};

export type Step = { title: string; detail: string; icon: IconName };

export type Project = {
  id: string;
  title: string;
  category: "Electrica" | "Domotica" | "Seguridad" | "Automatizacion";
  summary: string;
  tags: string[];
};

export type Plan = {
  id: string;
  name: string;
  priceHint: string;
  includes: string[];
  excludes: string[];
  response: string;
  channels: string[];
  cta: string;
};

export const services: Service[] = [
  {
    id: "electrica",
    title: "Instalacion electrica segura",
    description:
      "Proyecto, montaje y puesta en marcha cumpliendo normativa AEA/IRAM y materiales certificados.",
    for: ["Obras nuevas", "Reformas premium", "Comercios exigentes"],
    includes: [
      "Tableros inteligentes y selectividad de protecciones",
      "Canalizaciones y tendido identificado",
      "Mediciones y checklist de puesta en marcha",
    ],
    excludes: ["Equipos no certificados", "Trabajos sin planos ni checklist"],
    deliverables: [
      "Esquema unifilar y cuadro de cargas",
      "Checklist tablero/protecciones",
      "Mediciones (si aplica)",
      "Registro fotografico as-built",
    ],
    icon: "Zap",
  },
  {
    id: "pre-domotica",
    title: "Preparacion domotica",
    description:
      "Infraestructura lista para IoT, sensores y escenarios sin rehacer obra.",
    for: ["Obras en obra gruesa", "Viviendas en reforma", "Oficinas"],
    includes: [
      "Puntos de red y baja tension",
      "Cajas y canalizacion dedicada",
      "Etiquetado y documentacion de puntos",
    ],
    excludes: ["Automatizacion final de equipos", "Equipos sin certificacion"],
    deliverables: [
      "Plano de puntos domoticos",
      "Checklist de cableado y continuidad",
      "Fotos de pases y canalizaciones",
    ],
    icon: "Home",
  },
  {
    id: "domotica",
    title: "Domotica integral",
    description:
      "Escenas, control de iluminacion, clima y accesos con monitoreo en tiempo real.",
    for: ["Viviendas premium", "Oficinas boutique", "Locales de alto estandar"],
    includes: [
      "Configuracion de escenas y horarios",
      "Integracion de accesos/clima/iluminacion",
      "Portal y soporte post-obra",
    ],
    excludes: ["Hardware no soportado", "Sistemas sin licencias"],
    deliverables: [
      "Manual de uso y accesos",
      "Planos as-built de domotica",
      "Registro de configuraciones",
    ],
    icon: "Lightbulb",
  },
];

export const differentiators = [
  {
    title: "Respuesta 24h",
    detail: "Confirmamos tu consulta y agendamos relevamiento en menos de 24h.",
    icon: "Gauge" as IconName,
  },
  {
    title: "Ingenieria + obra",
    detail: "Proyecto, montaje y puesta en marcha con un solo equipo.",
    icon: "ClipboardList" as IconName,
  },
  {
    title: "Portal cliente",
    detail: "Avances, fotos, documentos y tickets en un mismo lugar.",
    icon: "FileText" as IconName,
  },
];

export const steps: Step[] = [
  {
    title: "Relevamiento",
    detail: "Visita y toma de datos. Si no se puede hacer bien, no se hace.",
    icon: "ShieldCheck",
  },
  {
    title: "Diseno + propuesta",
    detail:
      "Opciones claras con incluye/excluye y estimacion de tiempos de obra.",
    icon: "Lightbulb",
  },
  {
    title: "Ejecucion",
    detail:
      "Montaje prolijo, materiales certificados, registros fotograficos y checklists.",
    icon: "Zap",
  },
  {
    title: "Entrega + soporte",
    detail:
      "Documentacion, manual de uso y acceso al portal para seguimiento post-obra.",
    icon: "BadgeCheck",
  },
];

export const projects: Project[] = [
  {
    id: "p1",
    title: "Vivienda inteligente en Nordelta",
    category: "Domotica",
    summary:
      "Iluminacion por escenas, clima centralizado y tablero inteligente con monitoreo.",
    tags: ["Domotica", "Residencial", "Escenas"],
  },
  {
    id: "p2",
    title: "Oficinas con eficiencia energetica",
    category: "Electrica",
    summary:
      "Tableros selectivos, mediciones y preparacion IoT para sensores de ocupacion.",
    tags: ["Electrica", "Oficinas", "Mediciones"],
  },
  {
    id: "p3",
    title: "Locales boutique con control de accesos",
    category: "Seguridad",
    summary:
      "Control de accesos, CCTV y domotica de ambiente con portal de seguimiento.",
    tags: ["Seguridad", "Accesos", "Portal"],
  },
  {
    id: "p4",
    title: "Automatizacion de showroom",
    category: "Automatizacion",
    summary:
      "Escenas de iluminacion, control de cortinas y audio integrado para presentaciones.",
    tags: ["Automatizacion", "Showroom", "Escenas"],
  },
];

export const plans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    priceHint: "Soporte horario laboral",
    includes: [
      "Portal + tickets",
      "Respuesta en 24h habiles",
      "Checklist anual",
    ],
    excludes: ["Guardia 24/7", "Intervenciones de hardware incluidas"],
    response: "24h habiles",
    channels: ["Portal", "Volti"],
    cta: "Quiero este plan",
  },
  {
    id: "care",
    name: "Care",
    priceHint: "Clientes activos",
    includes: [
      "Portal + tickets",
      "Prioridad en agenda",
      "2 visitas de calibracion al ano",
    ],
    excludes: ["Guardia 24/7", "Repuestos incluidos"],
    response: "12h habiles",
    channels: ["Portal", "Volti"],
    cta: "Quiero este plan",
  },
  {
    id: "premium",
    name: "Premium",
    priceHint: "Para criticos",
    includes: [
      "Portal + tickets",
      "Guardia extendida",
      "Visitas trimestrales",
      "Revisiones de configuracion",
    ],
    excludes: ["Obras nuevas completas"],
    response: "6h habiles",
    channels: ["Portal", "Volti"],
    cta: "Quiero este plan",
  },
];

export const portalFeatures = [
  "Avances por etapa: relevamiento, diseno, compras, obra, entrega",
  "Evidencias: fotos y checklist por ambiente",
  "Descargas: planos, cotizaciones, certificados/mediciones, manual de uso",
  "Historial de cambios y tickets de soporte",
  "Acceso a Volti para consultas rapidas",
];
