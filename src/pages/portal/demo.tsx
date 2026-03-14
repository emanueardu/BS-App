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
import { useMemo, useRef, useState } from "react";
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
    title: "Canalizacion 1",
    date: "Relevamiento demo",
    image: "/images/relevamiento-demo/Canalizacion 1.jpg",
  },
  {
    title: "Canalizacion 2",
    date: "Relevamiento demo",
    image: "/images/relevamiento-demo/Canalizacion 2.jpg",
  },
  {
    title: "Canalizacion 3",
    date: "Relevamiento demo",
    image: "/images/relevamiento-demo/Canalizacion 3.jpg",
  },
  {
    title: "Diagrama electrico",
    date: "Relevamiento demo",
    image: "/images/relevamiento-demo/Diagrama electrico.jpg",
  },
  {
    title: "Tablero electrico",
    date: "Relevamiento demo",
    image: "/images/relevamiento-demo/Tablero electrico.jpg",
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
const MUSIC_ICON_POSITIONS_STORAGE_KEY = "portal_demo_music_icon_positions_v1";

const statusClass = (status: DemoDocument["status"]) => {
  if (status === "Aprobado") return "bg-emerald-100 text-emerald-700";
  if (status === "Vigente") return "bg-sky-100 text-sky-700";
  return "bg-brand-sand text-brand-copper";
};

const stageClass = (status: (typeof projectTimeline)[number]["status"]) => {
  if (status === "completado") return "bg-emerald-500";
  if (status === "en-curso") return "bg-brand-copper";
  return "bg-brand-border";
};

const getRoomCenter = (room: (typeof demoHomeState.rooms)[number]) => {
  if (room.bbox) {
    return {
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
      x: sum.x / room.polygon.length,
      y: sum.y / room.polygon.length,
    };
  }
  return { x: 0.5, y: 0.5 };
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [isMusicIconEditMode, setIsMusicIconEditMode] = useState(false);
  const [draggingMusicRoomId, setDraggingMusicRoomId] = useState<string | null>(null);
  const [musicSaveNotice, setMusicSaveNotice] = useState("");
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [musicIconPositions, setMusicIconPositions] = useState<
    Record<string, { x: number; y: number }>
  >(() => {
    const defaults = Object.fromEntries(
      musicRooms.map((room) => [room.id, getRoomCenter(room)])
    ) as Record<string, { x: number; y: number }>;

    if (typeof window === "undefined") return defaults;
    try {
      const raw = window.localStorage.getItem(MUSIC_ICON_POSITIONS_STORAGE_KEY);
      if (!raw) return defaults;
      const parsed = JSON.parse(raw) as Record<string, { x?: number; y?: number }>;
      const merged = { ...defaults };
      Object.entries(parsed).forEach(([id, pos]) => {
        if (typeof pos?.x === "number" && typeof pos?.y === "number") {
          merged[id] = { x: pos.x, y: pos.y };
        }
      });
      return merged;
    } catch {
      return defaults;
    }
  });

  const musicIndicatorRooms = useMemo(
    () =>
      demoHomeState.rooms
        .filter((room) => selectedMusicRoomIds.includes(room.id))
        .map((room) => ({
          id: room.id,
          ...((musicIconPositions[room.id] as { x: number; y: number }) ??
            getRoomCenter(room)),
        })),
    [musicIconPositions, selectedMusicRoomIds]
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

  const getMapPointerPosition = (clientX: number, clientY: number) => {
    const rect = mapContainerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    return {
      x: (clientX - rect.left) / rect.width,
      y: (clientY - rect.top) / rect.height,
    };
  };

  const updateMusicIconPosition = (roomId: string, x: number, y: number) => {
    const clampedX = Math.min(0.98, Math.max(0.02, x));
    const clampedY = Math.min(0.98, Math.max(0.02, y));
    setMusicIconPositions((prev) => ({
      ...prev,
      [roomId]: { x: clampedX, y: clampedY },
    }));
  };

  const startMusicIconDrag = (
    event: React.PointerEvent<HTMLDivElement>,
    roomId: string
  ) => {
    if (!isMusicIconEditMode) return;
    event.preventDefault();
    setDraggingMusicRoomId(roomId);

    const initial = getMapPointerPosition(event.clientX, event.clientY);
    if (initial) updateMusicIconPosition(roomId, initial.x, initial.y);

    const onMove = (moveEvent: PointerEvent) => {
      const next = getMapPointerPosition(moveEvent.clientX, moveEvent.clientY);
      if (!next) return;
      updateMusicIconPosition(roomId, next.x, next.y);
    };

    const onUp = () => {
      setDraggingMusicRoomId((current) => (current === roomId ? null : current));
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const saveMusicIconPositions = () => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(
      MUSIC_ICON_POSITIONS_STORAGE_KEY,
      JSON.stringify(musicIconPositions)
    );
    setMusicSaveNotice("Posiciones de simbolos guardadas en este navegador.");
    setIsMusicIconEditMode(false);
    setDraggingMusicRoomId(null);
  };

  return (
    <>
      <Head>
        <title>Demo Portal Cliente | SUR INGENIERÍA</title>
        <meta
          name="description"
          content="Experiencia demo del portal cliente con avance de obra, documentacion y Mi Home."
        />
      </Head>

      <section className="rounded-3xl bg-brand-surface/60 p-8 shadow-sm shadow-brand-sand backdrop-blur-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-copper">
              Demo cliente
            </p>
            <h1 className="text-3xl font-semibold text-brand-text">
              Tu portal de seguimiento de obra y hogar
            </h1>
            <p className="max-w-3xl text-sm text-brand-text-muted">
              Al ingresar con tu cuenta, vas a encontrar el estado de avance de
              tu obra, toda la documentacion disponible y el acceso a Mi Home en
              un solo lugar.
            </p>
          </div>
          <div className="w-full rounded-2xl border border-brand-border bg-brand-surface/70 p-4 shadow-sm backdrop-blur-sm lg:max-w-xs">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
              Estado global
            </p>
            <p className="mt-1 text-2xl font-semibold text-brand-text">
              {overallProgress}% completado
            </p>
            <p className="text-xs text-brand-text-muted">Proxima visita: 20 Feb 2026 - 10:00</p>
            <div className="mt-3 h-2 w-full rounded-full bg-brand-bg-alt">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-brand-copper to-brand-copper-soft"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
            <Link
              href="/login"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-copper"
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
                ? "bg-brand-navy text-brand-text-on-dark"
                : "border border-brand-border bg-brand-surface/70 text-brand-text-muted"
            }`}
          >
            Avance de obra
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("documentacion")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "documentacion"
                ? "bg-brand-navy text-brand-text-on-dark"
                : "border border-brand-border bg-brand-surface/70 text-brand-text-muted"
            }`}
          >
            Documentacion
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeTab === "home"
                ? "bg-brand-navy text-brand-text-on-dark"
                : "border border-brand-border bg-brand-surface/70 text-brand-text-muted"
            }`}
          >
            Mi Home
          </button>
        </div>
      </section>

      {activeTab === "avance" && (
        <section className="mt-8 space-y-6">
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-brand-text">
                <ChartBarIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Etapas de obra</h2>
              </div>
              <div className="mt-4 space-y-4">
                {projectTimeline.map((stage) => (
                  <div key={stage.stage}>
                    <div className="flex items-center justify-between text-sm font-semibold text-brand-text">
                      <span>{stage.stage}</span>
                      <span>{stage.progress}%</span>
                    </div>
                    <div className="mt-2 h-2 w-full rounded-full bg-brand-bg-alt">
                      <div
                        className={`h-2 rounded-full ${stageClass(stage.status)}`}
                        style={{ width: `${stage.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
              <div className="flex items-center gap-2 text-brand-text">
                <CalendarDaysIcon className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Proxima coordinacion</h2>
              </div>
              <div className="mt-4 rounded-2xl border border-brand-copper-soft bg-brand-bg-alt/60 p-4">
                <p className="text-sm font-semibold text-brand-text">Visita tecnica</p>
                <p className="text-sm text-brand-text-muted">20 Feb 2026 - 10:00</p>
                <p className="mt-2 text-xs text-brand-text-muted">
                  Objetivo: pruebas de automatizacion, revision de protecciones y
                  cierre de pendientes del checklist.
                </p>
              </div>

              <div className="mt-4 rounded-2xl border border-brand-border bg-brand-surface/70 p-4">
                <p className="text-sm font-semibold text-brand-text">Ultima actualizacion</p>
                <p className="text-xs text-brand-text-muted">
                  18 Feb 2026 - Carga de evidencia fotografica y ajuste del
                  cronograma de puesta en marcha.
                </p>
              </div>
            </article>
          </div>

          <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-brand-text">
              <CameraIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Registro fotografico</h2>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {photoLog.map((photo) => (
                <div
                  key={photo.title}
                  className="overflow-hidden rounded-2xl border border-brand-border bg-brand-surface/70"
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
                    <p className="text-sm font-semibold text-brand-text">{photo.title}</p>
                    <p className="text-xs text-brand-text-muted">{photo.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      {activeTab === "documentacion" && (
        <section className="mt-8 space-y-5 rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center gap-2 text-brand-text">
            <DocumentTextIcon className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Documentacion del proyecto</h2>
          </div>
          <p className="text-sm text-brand-text-muted">
            Incluye documentos tecnicos y administrativos que el cliente necesita
            para control de obra, habilitacion y mantenimiento.
          </p>

          {categories.map((category) => {
            const docs = demoDocuments.filter((doc) => doc.category === category);
            return (
              <div
                key={category}
                className="rounded-2xl border border-brand-border bg-brand-surface/70 p-4"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                  {category}
                </h3>
                <div className="mt-3 space-y-2">
                  {docs.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex flex-col gap-2 rounded-xl border border-brand-border bg-brand-bg/70 px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div>
                        <p className="text-sm font-semibold text-brand-text">{doc.title}</p>
                        <p className="text-xs text-brand-text-muted">
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
                          className="rounded-full border border-brand-border px-3 py-1 text-xs font-semibold text-brand-text-muted transition hover:border-brand-copper-soft hover:text-brand-copper"
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
          <article className="rounded-3xl border border-brand-border bg-brand-navy p-6 text-brand-text-on-dark shadow-lg shadow-brand-navy/30">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-sand">
                  Mi Home
                </p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {demoHomeState.home.name}
                </h2>
                <p className="text-sm text-brand-text-on-dark/85">
                  Desde aqui podes controlar luces y climatizacion por ambiente,
                  y revisar consumos y estado general de tu vivienda en tiempo
                  real.
                </p>
              </div>
              <div className="grid gap-2 text-xs sm:grid-cols-2">
                <span className="rounded-full bg-brand-surface/10 px-3 py-1">
                  Luces encendidas: {lightsOn}
                </span>
                <span className="rounded-full bg-brand-surface/10 px-3 py-1">
                  Aires activos: {acOn}
                </span>
                <span className="rounded-full bg-brand-surface/10 px-3 py-1">
                  Potencia instantanea: {consumption.instant.toFixed(0)}W
                </span>
                <span className="rounded-full bg-brand-surface/10 px-3 py-1">
                  Consumo diario: {consumption.daily.toFixed(2)} kWh
                </span>
              </div>
            </div>
          </article>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
                Luces activas
              </p>
              <p className="mt-1 text-2xl font-semibold text-brand-text">{lightsOn}</p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
                Aires activos
              </p>
              <p className="mt-1 text-2xl font-semibold text-brand-text">{acOn}</p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
                Consumo diario
              </p>
              <p className="mt-1 text-2xl font-semibold text-brand-text">
                {consumption.daily.toFixed(2)} kWh
              </p>
            </div>
            <div className="rounded-2xl border border-brand-border bg-brand-surface/60 p-4 shadow-sm backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-text-muted">
                Proyeccion mensual
              </p>
              <p className="mt-1 text-2xl font-semibold text-brand-text">
                {consumption.monthly.toFixed(1)} kWh
              </p>
            </div>
          </div>

          <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-2 text-brand-text">
                  <HomeModernIcon className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">Ambientes y dispositivos</h2>
                </div>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {roomsWithDevices.map(({ room, devices: roomDevices }) => (
                    <div
                      key={room.id}
                      className="rounded-2xl border border-brand-border bg-brand-surface/80 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-brand-text">{room.name}</p>
                          <p className="text-xs text-brand-text-muted">
                            {roomDevices.length} dispositivo(s)
                          </p>
                        </div>
                        {room.telemetry ? (
                          <span className="rounded-full bg-brand-bg-alt px-2 py-1 text-[11px] font-semibold text-brand-text-muted">
                            {room.telemetry.temperature_c ?? "-"} C
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3 space-y-2">
                        {roomDevices.map((device) => (
                          <div
                            key={device.id}
                            className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-bg/70 px-3 py-2"
                          >
                            <div>
                              <p className="text-sm font-semibold text-brand-text">
                                {device.name}
                              </p>
                              <p className="text-[11px] uppercase tracking-wide text-brand-text-muted">
                                {device.type === "ac" ? "Aire" : "Luz"}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => toggleDevice(device.id)}
                              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                                device.is_on
                                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                  : "bg-brand-bg-alt text-brand-text-muted hover:bg-brand-border"
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

              <aside className="order-1 flex h-full flex-col rounded-2xl border border-brand-border bg-brand-surface/80 p-4 lg:order-2">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-text-muted">
                  Plano con dispositivos
                </h3>
                <p className="mt-1 text-xs text-brand-text-muted">
                  Visualizacion general de todos los equipos de la vivienda.
                </p>
                <div
                  ref={mapContainerRef}
                  className="relative mt-3 h-[440px] overflow-hidden rounded-xl border border-brand-border bg-brand-bg-alt sm:h-[520px] lg:h-auto lg:flex-1"
                >
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
                      role={isMusicIconEditMode ? "button" : undefined}
                      tabIndex={isMusicIconEditMode ? 0 : -1}
                      onPointerDown={(event) => startMusicIconDrag(event, room.id)}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                        isMusicIconEditMode ? "cursor-grab" : ""
                      } ${draggingMusicRoomId === room.id ? "cursor-grabbing" : ""}`}
                      style={{
                        left: `${room.x * 100}%`,
                        top: `${room.y * 100}%`,
                      }}
                    >
                      <span className="relative inline-flex items-center justify-center">
                        <span className="music-wave wave-a" />
                        <span className="music-wave wave-b" />
                        <span
                          className="music-speaker inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-copper text-brand-text-on-dark shadow-md ring-2 ring-brand-surface/80"
                          title="Musica reproduciendose"
                        >
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                            <path
                              fill="currentColor"
                              d="M10 7.8 6.7 10H4v4h2.7L10 16.2V7.8Zm3.2 2.37a1 1 0 0 0-1.4 1.42 1.98 1.98 0 0 1 0 2.82 1 1 0 1 0 1.4 1.42 3.98 3.98 0 0 0 0-5.66Zm2.7-2.63a1 1 0 0 0-1.4 1.42 5.7 5.7 0 0 1 0 8.04 1 1 0 1 0 1.4 1.42 7.7 7.7 0 0 0 0-10.88Z"
                            />
                          </svg>
                        </span>
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
                              : "bg-brand-bg-alt/95 text-brand-text-muted ring-brand-border"
                          }`}
                          title={`${roomName} - ${device.name}`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              device.type === "ac" ? "bg-sky-500" : "bg-brand-copper"
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

          <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-brand-text">
                <h2 className="text-xl font-semibold">Música en casa</h2>
              </div>
              <span className="rounded-full bg-brand-bg-alt px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-text-muted">
                Integración simulada
              </span>
            </div>

            <div className="mt-4 grid gap-4 xl:grid-cols-[0.95fr_1.05fr]">
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                <article className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#1DB954] text-brand-text-on-dark">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path
                          fill="currentColor"
                          d="M12 1.8A10.2 10.2 0 1 0 12 22.2 10.2 10.2 0 0 0 12 1.8Zm4.73 14.7a.64.64 0 0 1-.88.2 8.7 8.7 0 0 0-8.82-.48.64.64 0 1 1-.58-1.14 9.97 9.97 0 0 1 10.13.56.64.64 0 0 1 .15.86Zm1.26-2.24a.8.8 0 0 1-1.1.25 10.77 10.77 0 0 0-10.93-.6.8.8 0 1 1-.71-1.43 12.35 12.35 0 0 1 12.57.69.8.8 0 0 1 .17 1.09Zm.1-2.36a13.17 13.17 0 0 0-13.36-.73.96.96 0 0 1-.86-1.71 15.09 15.09 0 0 1 15.31.84.96.96 0 1 1-1.1 1.6Z"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">Spotify</p>
                      <p className="text-xs text-brand-text-muted">Reproduciendo ahora</p>
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-brand-border bg-brand-surface/70 p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#FF0000] text-brand-text-on-dark">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
                        <path fill="currentColor" d="M10 8.5v7l6-3.5-6-3.5ZM12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-brand-text">YouTube Music</p>
                      <p className="text-xs text-brand-text-muted">Disponible (inactiva)</p>
                    </div>
                  </div>
                </article>
              </div>

              <article className="rounded-2xl border border-brand-border bg-brand-surface/80 p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="h-20 w-20 shrink-0 rounded-2xl bg-gradient-to-br from-emerald-300 via-cyan-300 to-sky-500 p-[1px]">
                    <div className="flex h-full w-full items-center justify-center rounded-2xl bg-brand-navy text-xs font-semibold uppercase tracking-wide text-brand-text-on-dark">
                      Album
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-brand-text">Midnight City Lights</p>
                    <p className="text-xs text-brand-text-muted">North Avenue</p>
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
                            animationPlayState: isMusicPlaying ? "running" : "paused",
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-text-muted transition hover:bg-brand-bg-alt"
                        title="Tema anterior"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                          <path fill="currentColor" d="M7 6h2v12H7V6Zm10.5 0L10 12l7.5 6V6Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsMusicPlaying((prev) => !prev)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-navy text-brand-text-on-dark transition hover:bg-brand-blue"
                        title={isMusicPlaying ? "Pausar" : "Reproducir"}
                      >
                        {isMusicPlaying ? (
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                            <path fill="currentColor" d="M8 6h3v12H8V6Zm5 0h3v12h-3V6Z" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                            <path fill="currentColor" d="M8 5v14l11-7L8 5Z" />
                          </svg>
                        )}
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-text-muted transition hover:bg-brand-bg-alt"
                        title="Siguiente tema"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                          <path fill="currentColor" d="M15 6h2v12h-2V6ZM6.5 6 14 12l-7.5 6V6Z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-text-muted transition hover:bg-brand-bg-alt"
                        title="Buscar tema"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                          <path
                            fill="currentColor"
                            d="m19.6 18.2-3.5-3.5a6.5 6.5 0 1 0-1.4 1.4l3.5 3.5a1 1 0 0 0 1.4-1.4ZM5 10.5a5.5 5.5 0 1 1 11 0 5.5 5.5 0 0 1-11 0Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-5 rounded-2xl border border-brand-border bg-brand-surface/70 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-brand-text">
                  ¿Dónde querés reproducirlo?
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsMusicIconEditMode((prev) => !prev);
                      setMusicSaveNotice("");
                      setDraggingMusicRoomId(null);
                    }}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                      isMusicIconEditMode
                        ? "bg-brand-navy text-brand-text-on-dark"
                        : "border border-brand-border bg-brand-surface text-brand-text-muted hover:bg-brand-bg-alt"
                    }`}
                  >
                    {isMusicIconEditMode ? "Cancelar ajuste" : "Ubicar simbolos"}
                  </button>
                  {isMusicIconEditMode ? (
                    <button
                      type="button"
                      onClick={saveMusicIconPositions}
                      className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-brand-text-on-dark transition hover:bg-emerald-500"
                    >
                      Guardar simbolos
                    </button>
                  ) : null}
                </div>
              </div>
              {isMusicIconEditMode ? (
                <p className="mt-2 text-xs font-semibold text-brand-copper">
                  Ajuste activo: arrastra los simbolos de musica en el plano.
                </p>
              ) : null}
              {musicSaveNotice ? (
                <p className="mt-2 text-xs font-semibold text-emerald-700">{musicSaveNotice}</p>
              ) : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {musicRooms.map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    onClick={() => toggleMusicRoom(room.id)}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      selectedMusicRoomIds.includes(room.id)
                        ? "bg-brand-navy text-brand-text-on-dark"
                        : "border border-brand-border bg-brand-surface text-brand-text-muted hover:border-emerald-300 hover:text-emerald-700"
                    }`}
                  >
                    {room.name}
                  </button>
                ))}
              </div>
            </div>
          </article>

          <article className="rounded-3xl border border-brand-border bg-brand-surface/60 p-6 shadow-sm backdrop-blur-sm">
            <div className="flex items-center gap-2 text-brand-text">
              <WrenchScrewdriverIcon className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Rutinas configuradas</h2>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {(demoHomeState.routines ?? []).map((routine) => (
                <div
                  key={routine.id}
                  className="rounded-2xl border border-brand-border bg-brand-surface/80 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-brand-text">{routine.name}</p>
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-semibold ${
                        routine.status === "active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-brand-bg-alt text-brand-text-muted"
                      }`}
                    >
                      {routine.status === "active" ? "Activa" : "Pausada"}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-brand-text-muted">{routine.description}</p>
                  {routine.cadence ? (
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-brand-text-muted">
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

        @keyframes speaker-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.7);
            opacity: 0.6;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }

        @keyframes speaker-bob {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-1px);
          }
        }

        .music-speaker {
          animation: speaker-bob 1.2s ease-in-out infinite;
        }

        .music-wave {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 18px;
          height: 18px;
          border-radius: 9999px;
          border: 1.5px solid rgba(245, 158, 11, 0.7);
          animation: speaker-pulse 1.3s linear infinite;
          pointer-events: none;
        }

        .wave-b {
          animation-delay: 0.6s;
        }
      `}</style>
    </>
  );
}
