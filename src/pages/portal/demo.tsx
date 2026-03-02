import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  CameraIcon,
  ChartBarIcon,
  DocumentTextIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { demoHomeState } from "@/lib/homeService";

type TabId = "avance" | "documentacion" | "home";

type DemoDocument = {
  id: string;
  title: string;
  category: "Habilitacion" | "Planos" | "Obra" | "Garantias";
  extension: string;
  updatedAt: string;
  status: "Aprobado" | "Vigente" | "Revision";
};

const projectTimeline = [
  { stage: "Relevamiento tecnico", status: "completado", progress: 100 },
  { stage: "Ingenieria y aprobacion", status: "completado", progress: 100 },
  { stage: "Canalizaciones y tableros", status: "en-curso", progress: 72 },
  { stage: "Automatizacion y puesta en marcha", status: "pendiente", progress: 28 },
  { stage: "Entrega y capacitacion", status: "pendiente", progress: 0 },
] as const;

const photoLog = [
  {
    title: "Montaje de tablero principal",
    date: "12 Feb 2026",
    image: "/images/services/Gallery/Instalaciones-electricas/tablero-electrico-moderno-ordenado.jpg",
  },
  {
    title: "Canalizacion y tendido",
    date: "10 Feb 2026",
    image: "/images/services/Gallery/Instalaciones-electricas/canalizacion-cableado.jfif",
  },
  {
    title: "Mediciones y verificacion",
    date: "08 Feb 2026",
    image: "/images/services/Gallery/Instalaciones-electricas/medicion-verificacion.jfif",
  },
  {
    title: "Planificacion de proyecto",
    date: "05 Feb 2026",
    image: "/images/services/Gallery/planos-y-proyectos-electricos/planos-sobre-mesa-trabajo.jpg",
  },
];

const demoDocuments: DemoDocument[] = [
  {
    id: "doc-hab-01",
    title: "Certificado de habilitacion municipal",
    category: "Habilitacion",
    extension: "PDF",
    updatedAt: "11 Feb 2026",
    status: "Aprobado",
  },
  {
    id: "doc-hab-02",
    title: "Memoria tecnica firmada",
    category: "Habilitacion",
    extension: "PDF",
    updatedAt: "09 Feb 2026",
    status: "Vigente",
  },
  {
    id: "doc-plan-01",
    title: "Plano unifilar general",
    category: "Planos",
    extension: "PDF",
    updatedAt: "12 Feb 2026",
    status: "Vigente",
  },
  {
    id: "doc-plan-02",
    title: "Plano de domicilio - distribucion",
    category: "Planos",
    extension: "PDF",
    updatedAt: "12 Feb 2026",
    status: "Vigente",
  },
  {
    id: "doc-plan-03",
    title: "Esquema de tableros y protecciones",
    category: "Planos",
    extension: "DWG",
    updatedAt: "07 Feb 2026",
    status: "Revision",
  },
  {
    id: "doc-obra-01",
    title: "Checklist de avance por ambiente",
    category: "Obra",
    extension: "XLSX",
    updatedAt: "13 Feb 2026",
    status: "Vigente",
  },
  {
    id: "doc-obra-02",
    title: "Registro fotografico de obra",
    category: "Obra",
    extension: "ZIP",
    updatedAt: "13 Feb 2026",
    status: "Vigente",
  },
  {
    id: "doc-gar-01",
    title: "Garantias de materiales certificados",
    category: "Garantias",
    extension: "PDF",
    updatedAt: "06 Feb 2026",
    status: "Aprobado",
  },
];

const categories: DemoDocument["category"][] = [
  "Habilitacion",
  "Planos",
  "Obra",
  "Garantias",
];

const LIGHT_WATT = 12;
const AC_WATT = 1200;
const LIGHT_HOURS = 4;
const AC_HOURS = 6;

const statusClass = (status: DemoDocument["status"]) => {
  if (status === "Aprobado") return "bg-emerald-100 text-emerald-700";
  if (status === "Vigente") return "bg-sky-100 text-sky-700";
  return "bg-amber-100 text-amber-700";
};

const stageClass = (status: (typeof projectTimeline)[number]["status"]) => {
  if (status === "completado") return "bg-emerald-500";
  if (status === "en-curso") return "bg-orange-500";
  return "bg-slate-300";
};

export default function PortalDemo() {
  const [activeTab, setActiveTab] = useState<TabId>("avance");
  const [devices, setDevices] = useState(() =>
    demoHomeState.devices.map((device) => ({ ...device }))
  );

  const overallProgress = useMemo(
    () =>
      Math.round(
        projectTimeline.reduce((acc, stage) => acc + stage.progress, 0) /
          projectTimeline.length
      ),
    []
  );

  const lightsOn = useMemo(
    () => devices.filter((device) => device.type === "light" && device.is_on).length,
    [devices]
  );
  const acOn = useMemo(
    () => devices.filter((device) => device.type === "ac" && device.is_on).length,
    [devices]
  );

  const consumption = useMemo(() => {
    const instant = lightsOn * LIGHT_WATT + acOn * AC_WATT;
    const daily =
      (lightsOn * LIGHT_WATT * LIGHT_HOURS) / 1000 +
      (acOn * AC_WATT * AC_HOURS) / 1000;
    const monthly = daily * 30;
    return { instant, daily, monthly };
  }, [acOn, lightsOn]);

  const roomsWithDevices = useMemo(
    () =>
      [...demoHomeState.rooms]
        .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
        .map((room) => ({
          room,
          devices: devices.filter((device) => device.room_id === room.id),
        })),
    [devices]
  );

  const musicRooms = useMemo(
    () =>
      roomsWithDevices
        .map(({ room }) => room)
        .filter((room) => {
          const slug = (room.slug ?? "").toLowerCase();
          const name = room.name.toLowerCase();
          return !slug.includes("bano") && !slug.includes("lavadero") && !name.includes("bano");
        }),
    [roomsWithDevices]
  );

  const [selectedMusicRoomIds, setSelectedMusicRoomIds] = useState<string[]>(() =>
    musicRooms[0]?.id ? [musicRooms[0].id] : []
  );

  const musicIndicatorRooms = useMemo(
    () =>
      demoHomeState.rooms
        .filter((room) => selectedMusicRoomIds.includes(room.id))
        .map((room) => {
          if (room.bbox) {
            return {
              id: room.id,
              x: room.bbox.x + room.bbox.width / 2,
              y: room.bbox.y + room.bbox.height / 2,
            };
          }
          if (room.polygon.length > 0) {
            const sum = room.polygon.reduce(
              (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
              { x: 0, y: 0 }
            );
            return {
              id: room.id,
              x: sum.x / room.polygon.length,
              y: sum.y / room.polygon.length,
            };
          }
          return { id: room.id, x: 0.5, y: 0.5 };
        }),
    [selectedMusicRoomIds]
  );

  const roomNameById = useMemo(
    () =>
      new Map(demoHomeState.rooms.map((room) => [room.id, room.name] as const)),
    []
  );

  const toggleDevice = (deviceId: string) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, is_on: !device.is_on } : device
      )
    );
  };

  const toggleMusicRoom = (roomId: string) => {
    setSelectedMusicRoomIds((prev) =>
      prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]
    );
  };

  return (
    <>
      <Head>
        <title>Demo Portal Cliente | BS</title>
        <meta
          name="description"
          content="Experiencia demo del portal cliente con avance de obra, documentacion y Mi Home."
        />
      </Head>

      <section className="rounded-3xl bg-white/60 p-8 shadow-sm shadow-orange-100 backdrop-blur-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-orange-600">
              Demo cliente
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              Tu portal de seguimiento de obra y hogar
            </h1>
            <p className="max-w-3xl text-sm text-slate-600">
              Al ingresar con tu cuenta, vas a encontrar el estado de avance de
              tu obra, toda la documentacion disponible y el acceso a Mi Home en
              un solo lugar.
            </p>
          </div>
          <div className="w-full rounded-2xl border border-slate-300 bg-white/70 p-4 shadow-sm backdrop-blur-sm lg:max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Estado global
            </p>
            <p className="mt-1 text-2xl font-semibold text-slate-900">
              {overallProgress}% completado
            </p>
            <p className="text-xs text-slate-600">Proxima visita: 20 Feb 2026 - 10:00</p>
            <div className="mt-3 h-2 w-full rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-orange-700"
            >
              Ingresar con mi cuenta
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("avance")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "avance"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white/70 text-slate-700"
            }`}
          >
            Avance de obra
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("documentacion")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "documentacion"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white/70 text-slate-700"
            }`}
          >
            Documentacion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "home"
                ? "bg-slate-900 text-white"
                : "border border-slate-300 bg-white/70 text-slate-700"
            }`}
          >
            Mi Home
          </button>
        </div>
      </section>

      {activeTab === "avance" && (
        <section className="mt-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-900">
                <ChartBarIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Etapas de obra</h2>
              </div>
              <div className="mt-4 space-y-4">
                {projectTimeline.map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-800">
                      <span>{stage.stage}</span>
                      <span>{stage.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-slate-200">
                      <div
                        className={`h-2 rounded-full ${stageClass(stage.status)}`}
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-slate-900">
                <CalendarDaysIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Proxima coordinacion</h2>
              </div>
              <div className="mt-4 rounded-2xl border border-orange-200 bg-orange-50/60 p-4">
                <p className="text-sm font-semibold text-slate-900">Visita tecnica</p>
                <p className="text-sm text-slate-700">20 Feb 2026 - 10:00</p>
                <p className="mt-2 text-xs text-slate-600">
                  Objetivo: pruebas de automatizacion, revision de protecciones y
                  cierre de pendientes del checklist.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-slate-200 bg-white/70 p-4">
                <p className="text-sm font-semibold text-slate-900">Ultima actualizacion</p>
                <p className="text-xs text-slate-600">
                  18 Feb 2026 - Carga de evidencia fotografica y ajuste del
                  cronograma de puesta en marcha.
                </p>
              </div>
            </article>
          </div>

          <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-900">
              <CameraIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Registro fotografico</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {photoLog.map((photo) => (
                <div
                  key={photo.title}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white/70"
                >
                  <div className="relative h-36 w-full">
                    <Image
                      src={photo.image}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-slate-900">{photo.title}</p>
                    <p className="text-xs text-slate-600">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      {activeTab === "documentacion" && (
        <section className="mt-8 space-y-5 rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2 text-slate-900">
            <DocumentTextIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Documentacion del proyecto</h2>
          </div>
          <p className="text-sm text-slate-600">
            Incluye documentos tecnicos y administrativos que el cliente necesita
            para control de obra, habilitacion y mantenimiento.
          </p>

          {categories.map((category) => {
            const docs = demoDocuments.filter((doc) => doc.category === category);
            return (
              <div
                key={category}
                className="rounded-2xl border border-slate-200 bg-white/70 p-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  {category}
                </h3>
                <div className="mt-3 space-y-2">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{doc.title}</p>
                        <p className="text-xs text-slate-600">
                          {doc.extension} - Actualizado: {doc.updatedAt}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-semibold ${statusClass(
                            doc.status
                          )}`}
                        >
                          {doc.status}
                        </span>
                        <button
                          type="button"
                          className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-700"
                        >
                          Descargar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {activeTab === "home" && (
        <section className="mt-8 space-y-6">
          <article className="rounded-3xl border border-slate-300 bg-slate-900 p-6 text-white shadow-lg shadow-slate-900/30">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-200">
                  Mi Home
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {demoHomeState.home.name}
                </h2>
                <p className="text-sm text-slate-200">
                  Desde aqui podes controlar luces y climatizacion por ambiente,
                  y revisar consumos y estado general de tu vivienda en tiempo
                  real.
                </p>
              </div>
              <div className="grid gap-2 text-xs sm:grid-cols-2">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Luces encendidas: {lightsOn}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Aires activos: {acOn}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Potencia instantanea: {consumption.instant.toFixed(0)}W
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  Consumo diario: {consumption.daily.toFixed(2)} kWh
                </span>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-slate-300 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Luces activas
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{lightsOn}</p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Aires activos
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">{acOn}</p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Consumo diario
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {consumption.daily.toFixed(2)} kWh
              </p>
            </div>
            <div className="rounded-2xl border border-slate-300 bg-white/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Proyeccion mensual
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900">
                {consumption.monthly.toFixed(1)} kWh
              </p>
            </div>
          </div>

          <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 text-slate-900">
                  <HomeModernIcon className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Ambientes y dispositivos</h2>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {roomsWithDevices.map(({ room, devices: roomDevices }) => (
                    <div
                      key={room.id}
                      className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{room.name}</p>
                          <p className="text-xs text-slate-500">
                            {roomDevices.length} dispositivo(s)
                          </p>
                        </div>
                        {room.telemetry ? (
                          <span className="rounded-full bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700">
                            {room.telemetry.temperature_c ?? "-"} C
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3 space-y-2">
                        {roomDevices.map((device) => (
                          <div
                            key={device.id}
                            className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2"
                          >
                            <div>
                              <p className="text-sm font-semibold text-slate-900">
                                {device.name}
                              </p>
                              <p className="text-[11px] uppercase tracking-wide text-slate-500">
                                {device.type === "ac" ? "Aire" : "Luz"}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleDevice(device.id)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                device.is_on
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
                              }`}
                            >
                              {device.is_on ? "Encendido" : "Apagado"}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="order-1 flex h-full flex-col rounded-2xl border border-slate-200 bg-white/80 p-4 lg:order-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
                  Plano con dispositivos
                </h3>
                <p className="mt-1 text-xs text-slate-600">
                  Visualizacion general de todos los equipos de la vivienda.
                </p>
                <div className="relative mt-3 h-[440px] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 sm:h-[520px] lg:h-auto lg:flex-1">
                  <Image
                    src={demoHomeState.home.plan_asset_url}
                    alt="Plano general de la vivienda"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  {musicIndicatorRooms.map((room) => (
                    <div
                      key={`music-${room.id}`}
                      className="absolute -translate-x-1/2 -translate-y-1/2"
                      style={{
                        left: `${room.x * 100}%`,
                        top: `${room.y * 100}%`,
                      }}
                    >
                      <span
                        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-md ring-2 ring-white/80"
                        title="Musica reproduciendose"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                          <path
                            fill="currentColor"
                            d="M14 3v10.55a3.5 3.5 0 1 1-2-3.15V5h7v2h-5Z"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                  {devices.map((device) => {
                    const roomName = roomNameById.get(device.room_id) ?? "Ambiente";
                    return (
                      <div
                        key={device.id}
                        className="absolute -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `${device.position.x * 100}%`,
                          top: `${device.position.y * 100}%`,
                        }}
                      >
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ring-1 ${
                            device.is_on
                              ? "bg-emerald-100/95 text-emerald-700 ring-emerald-200"
                              : "bg-slate-100/95 text-slate-700 ring-slate-300"
                          }`}
                          title={`${roomName} - ${device.name}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              device.type === "ac" ? "bg-sky-500" : "bg-amber-500"
                            }`}
                          />
                          {device.type === "ac" ? "Aire" : "Luz"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </aside>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-slate-900">
                <h2 className="text-xl font-semibold">Música en casa</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-600">
                Integración simulada
              </span>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <article className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path
                          fill="currentColor"
                          d="M12 1.8A10.2 10.2 0 1 0 12 22.2 10.2 10.2 0 0 0 12 1.8Zm4.73 14.7a.64.64 0 0 1-.88.2 8.7 8.7 0 0 0-8.82-.48.64.64 0 1 1-.58-1.14 9.97 9.97 0 0 1 10.13.56.64.64 0 0 1 .15.86Zm1.26-2.24a.8.8 0 0 1-1.1.25 10.77 10.77 0 0 0-10.93-.6.8.8 0 1 1-.71-1.43 12.35 12.35 0 0 1 12.57.69.8.8 0 0 1 .17 1.09Zm.1-2.36a13.17 13.17 0 0 0-13.36-.73.96.96 0 0 1-.86-1.71 15.09 15.09 0 0 1 15.31.84.96.96 0 1 1-1.1 1.6Z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">Spotify</p>
                      <p className="text-xs text-slate-600">Reproduciendo ahora</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-white">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path fill="currentColor" d="M10 8.5v7l6-3.5-6-3.5ZM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">YouTube Music</p>
                      <p className="text-xs text-slate-500">Disponible (inactiva)</p>
                    </div>
                  </div>
                </article>
              </div>

              <article className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-500 p-[1px]">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-900 text-xs font-semibold uppercase tracking-wide text-white">
                      Album
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-slate-900">Midnight City Lights</p>
                    <p className="text-xs text-slate-600">North Avenue</p>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Reproduciendo ahora
                    </div>
                    <div className="mt-3 flex h-8 items-end gap-1">
                      {[0, 1, 2, 3, 4].map((index) => (
                        <span
                          key={index}
                          className="equalizer-bar w-1.5 rounded-full bg-emerald-500/90"
                          style={{
                            height: `${12 + (index % 3) * 5}px`,
                            animationDelay: `${index * 0.14}s`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-white/70 p-4">
              <p className="text-sm font-semibold text-slate-900">
                ¿Dónde querés reproducirlo?
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {musicRooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => toggleMusicRoom(room.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      selectedMusicRoomIds.includes(room.id)
                        ? "bg-slate-900 text-white"
                        : "border border-slate-300 bg-white text-slate-700 hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-slate-300 bg-white/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-slate-900">
              <WrenchScrewdriverIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Rutinas configuradas</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {(demoHomeState.routines ?? []).map((routine) => (
                <div
                  key={routine.id}
                  className="rounded-2xl border border-slate-200 bg-white/80 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-slate-900">{routine.name}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        routine.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {routine.status === "active" ? "Activa" : "Pausada"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-slate-600">{routine.description}</p>
                  {routine.cadence ? (
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Cadencia: {routine.cadence}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          </article>
        </section>
      )}
      <style jsx>{`
        @keyframes equalizer-wave {
          0%,
          100% {
            transform: scaleY(0.35);
          }
          50% {
            transform: scaleY(1);
          }
        }

        .equalizer-bar {
          transform-origin: bottom;
          animation: equalizer-wave 1s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}
