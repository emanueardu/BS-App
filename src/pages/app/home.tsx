import { FloorPlanView } from "@/components/home/FloorPlanView";
import { RoomZoomView } from "@/components/home/RoomZoomView";
import { useInternalRoute } from "@/hooks/useInternalRoute";
import { demoHomeState, fallbackPlan, fetchHomeState } from "@/lib/homeService";
import { supabase } from "@/lib/supabaseClient";
import { Device, HomeState, PlanImage, Routine, Room } from "@/types/home";
import { computeBBox, getRoomStatus } from "@/utils/homeGeometry";
import { renderPdfToImage } from "@/utils/pdfPlan";
import Head from "next/head";
import { useCallback, useEffect, useMemo, useState } from "react";

const LIGHT_WATT = 12;
const AC_WATT = 1200;
const LIGHT_HOURS = 4;
const AC_HOURS = 6;

const bypassInternal =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_INTERNAL_BYPASS === "true";

type Consumption = {
  instant: number;
  daily: number;
  monthly: number;
  lightsOn: number;
  acOn: number;
};

const RoutineList = ({
  routines,
  onToggle,
  onRun,
}: {
  routines: Routine[];
  onToggle: (routineId: string, status: Routine["status"]) => void;
  onRun: (routineId: string) => void;
}) => {
  if (!routines.length) return null;

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-slate-50">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
            Rutinas
          </p>
          <h3 className="text-2xl font-semibold text-slate-900">Automatizaciones</h3>
          <p className="text-sm text-slate-600">
            Simuladas, afectan el estado virtual de luces y aires.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {routines.map((routine) => (
          <div
            key={routine.id}
            className="flex flex-col gap-2 rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-slate-900">{routine.name}</p>
                <p className="text-xs text-slate-600">{routine.description}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                  routine.status === "active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {routine.status === "active" ? "ACTIVA" : "PAUSADA"}
              </span>
            </div>
            <div className="text-[11px] text-slate-600">
              {routine.cadence && <span className="font-semibold">{routine.cadence}</span>}
              {routine.next_run_at && (
                <span className="ml-2">Próxima: {new Date(routine.next_run_at).toLocaleString()}</span>
              )}
              {routine.last_run_at && (
                <span className="ml-2">Última: {new Date(routine.last_run_at).toLocaleString()}</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() =>
                  onToggle(
                    routine.id,
                    routine.status === "active" ? "paused" : "active"
                  )
                }
                className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                {routine.status === "active" ? "Pausar" : "Activar"}
              </button>
              <button
                onClick={() => onRun(routine.id)}
                className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 transition hover:-translate-y-0.5 hover:bg-emerald-200"
              >
                Ejecutar ahora
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ConsumptionPanel = ({ consumption }: { consumption: Consumption }) => (
  <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-amber-50">
    <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
      Consumo simulado
    </p>
    <h3 className="text-2xl font-semibold text-slate-900">Vivienda</h3>
    <p className="text-sm text-slate-600">
      Calculado en base a dispositivos encendidos (luces {LIGHT_WATT}W, aires {AC_WATT}W).
    </p>
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <div className="rounded-2xl bg-slate-900 px-4 py-3 text-white shadow">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
          Potencia instantánea
        </p>
        <p className="text-3xl font-semibold">{consumption.instant.toFixed(0)} W</p>
        <p className="text-[11px] text-slate-200">
          Luces ON: {consumption.lightsOn} · Aires ON: {consumption.acOn}
        </p>
      </div>
      <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-amber-900">
        <p className="text-xs font-semibold uppercase tracking-wide">Consumo diario</p>
        <p className="text-2xl font-semibold">
          {consumption.daily.toFixed(2)} kWh
        </p>
        <p className="text-[11px]">Supone {LIGHT_HOURS}h luces · {AC_HOURS}h aires</p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Consumo mensual
        </p>
        <p className="text-2xl font-semibold">
          {consumption.monthly.toFixed(2)} kWh
        </p>
        <p className="text-[11px] text-slate-500">Proyección 30 días</p>
      </div>
    </div>
  </div>
);

export default function HomeModule() {
  const { user, session, loading, blocked, internal } = useInternalRoute();
  const [homeState, setHomeState] = useState<HomeState | null>(null);
  const [planImage, setPlanImage] = useState<PlanImage | null>(null);
  const [roomPlanImages, setRoomPlanImages] = useState<Record<string, PlanImage>>(
    {}
  );
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);
  const [togglingIds, setTogglingIds] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);

  const loadHome = useCallback(async () => {
    if (!user) return;
    setLoadingData(true);
    setError(null);
    try {
      const data = await fetchHomeState(user.id);
      if (data) {
        setHomeState(data);
        setActiveRoomId((prev) => prev ?? data.rooms[0]?.id ?? null);
      } else {
        setHomeState(demoHomeState);
        setActiveRoomId((prev) => prev ?? demoHomeState.rooms[0]?.id ?? null);
        setError("No encontramos datos en la base, mostramos el demo precargado.");
      }
    } catch (err) {
      console.warn("Home fetch error", err);
      setHomeState(demoHomeState);
      setActiveRoomId((prev) => prev ?? demoHomeState.rooms[0]?.id ?? null);
      setError("No pudimos leer Supabase, usando demo offline.");
    } finally {
      setLoadingData(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user || blocked || !internal) return;
    loadHome();
  }, [blocked, internal, loadHome, user]);

  useEffect(() => {
    if (!internal || blocked) return;
    const interval = setInterval(() => {
      loadHome();
    }, 4500);
    return () => clearInterval(interval);
  }, [blocked, internal, loadHome]);

  useEffect(() => {
    const homeId = homeState?.home.id;
    if (!homeId || homeId.startsWith("demo")) return;

    const channel = supabase
      .channel(`home-devices-${homeId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "devices", filter: `home_id=eq.${homeId}` },
        (payload) => {
          if (!payload?.new || typeof payload.new !== "object") return;
          const raw = payload.new as Partial<Device> & { id?: string | number };

          setHomeState((current) => {
            if (!current) return current;

            const mapped = current.devices.find(
              (device) => device.id === String(raw.id ?? "")
            );

            const updatedDevice: Device = {
              id: String(raw.id ?? ""),
              home_id: String(raw.home_id ?? ""),
              room_id: String(raw.room_id ?? ""),
              type: (raw.type as Device["type"]) ?? "light",
              name: raw.name ?? mapped?.name ?? "Dispositivo",
              position: raw.position ?? mapped?.position ?? { x: 0.5, y: 0.5 },
              is_on: Boolean(raw.is_on),
              last_changed_at: raw.last_changed_at,
            };

            const devices = mapped
              ? current.devices.map((device) =>
                  device.id === updatedDevice.id ? updatedDevice : device
                )
              : [...current.devices, updatedDevice];

            return { ...current, devices };
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [homeState?.home.id]);

  const loadPlan = useCallback(async () => {
    const planUrl = homeState?.home.plan_asset_url ?? fallbackPlan.url;
    if (!planUrl || typeof window === "undefined") return;
    setLoadingPlan(true);
    try {
      const image = await renderPdfToImage(planUrl, fallbackPlan.page);
      setPlanImage(image);
    } catch (err) {
      console.warn("Plan render error", err);
      setPlanImage(null);
    } finally {
      setLoadingPlan(false);
    }
  }, [homeState?.home.plan_asset_url]);

  useEffect(() => {
    if (!homeState) return;
    loadPlan();
  }, [homeState, loadPlan]);

  useEffect(() => {
    const loadRoomPlans = async () => {
      if (!homeState) return;
      const entries = await Promise.all(
        homeState.rooms.map(async (room) => {
          const asset = room.detail_image_url ?? room.plan_asset_url;
          if (!asset) return null;
          try {
            const img = await renderPdfToImage(asset);
            return [room.id, img] as const;
          } catch (err) {
            console.warn("Room plan load failed", room.name, err);
            return null;
          }
        })
      );
      const mapped = entries.filter(Boolean) as Array<[string, PlanImage]>;
      setRoomPlanImages(Object.fromEntries(mapped));
    };

    loadRoomPlans();
  }, [homeState]);

  const handleToggle = useCallback(
    async (deviceId: string, nextState: boolean) => {
      if (!homeState || !session?.access_token) return;
      setTogglingIds((prev) => [...prev, deviceId]);

      setHomeState((current) =>
        current
          ? {
              ...current,
              devices: current.devices.map((device) =>
                device.id === deviceId ? { ...device, is_on: nextState } : device
              ),
            }
          : current
      );

      if (!bypassInternal) {
        const response = await fetch("/api/home/toggle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.access_token}`,
          },
          body: JSON.stringify({
            deviceId,
            nextState,
            homeId: homeState.home.id,
          }),
        });

        if (!response.ok) {
          setHomeState((current) =>
            current
              ? {
                  ...current,
                  devices: current.devices.map((device) =>
                    device.id === deviceId
                      ? { ...device, is_on: !nextState }
                      : device
                  ),
                }
              : current
          );
        } else {
          const { device } = (await response.json()) as { device?: Device };
          if (device) {
            setHomeState((current) =>
              current
                ? {
                    ...current,
                    devices: current.devices.map((d) =>
                      d.id === device.id
                        ? { ...d, is_on: device.is_on, last_changed_at: device.last_changed_at }
                        : d
                    ),
                  }
                : current
            );
          }
        }
      }

      setTogglingIds((prev) => prev.filter((id) => id !== deviceId));
    },
    [homeState, session?.access_token]
  );

  const handleUpdateDevicePosition = useCallback(
    async (deviceId: string, position: { x: number; y: number }) => {
      if (!homeState) return;
      setHomeState((current) =>
        current
          ? {
              ...current,
              devices: current.devices.map((device) =>
                device.id === deviceId ? { ...device, position } : device
              ),
            }
          : current
      );

      if (!session?.access_token || bypassInternal) return;
      await fetch("/api/home/device", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          deviceId,
          position,
          homeId: homeState.home.id,
        }),
      });
    },
    [homeState, session?.access_token]
  );

  const handleUpdateRoomPolygon = useCallback(
    async (roomId: string, polygon: Room["polygon"]) => {
      if (!homeState) return;
      const bbox = computeBBox(polygon) ?? undefined;
      setHomeState((current) =>
        current
          ? {
              ...current,
              rooms: current.rooms.map((room) =>
                room.id === roomId ? { ...room, polygon, bbox } : room
              ),
            }
          : current
      );

      if (!session?.access_token || bypassInternal) return;
      await fetch("/api/home/room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          roomId,
          polygon,
          bbox,
          homeId: homeState.home.id,
        }),
      });
    },
    [homeState, session?.access_token]
  );

  const handleRoutineToggle = useCallback(
    async (routineId: string, status: Routine["status"]) => {
      if (!homeState) return;
      setHomeState((current) =>
        current
          ? {
              ...current,
              routines: current.routines?.map((r) =>
                r.id === routineId ? { ...r, status } : r
              ),
            }
          : current
      );

      if (!session?.access_token || bypassInternal) return;
      await fetch("/api/home/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: "toggle",
          routineId,
          status,
          homeId: homeState.home.id,
        }),
      });
    },
    [homeState, session?.access_token]
  );

  const handleRoutineRun = useCallback(
    async (routineId: string) => {
      if (!homeState) return;
      if (!session?.access_token || bypassInternal) return;
      const response = await fetch("/api/home/routines", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          action: "run",
          routineId,
          homeId: homeState.home.id,
        }),
      });
      if (response.ok) {
        const payload = (await response.json()) as Partial<HomeState>;
        setHomeState((current) => {
          if (!current) return current;
          const mergedRoutines =
            payload.routines && payload.routines.length > 0
              ? [
                  ...(current.routines?.map((r) => {
                    const updated = payload.routines?.find((pr) => pr.id === r.id);
                    return updated ?? r;
                  }) ?? []),
                  ...payload.routines.filter(
                    (pr) => !current.routines?.some((r) => r.id === pr.id)
                  ),
                ]
              : current.routines;

          return {
            ...current,
            devices: payload.devices ?? current.devices,
            routines: mergedRoutines,
          };
        });
      }
    },
    [homeState, session?.access_token]
  );

  const activeRoom = useMemo(
    () => homeState?.rooms.find((room) => room.id === activeRoomId),
    [activeRoomId, homeState?.rooms]
  );

  const activeRoomPlan =
    (activeRoom && roomPlanImages[activeRoom.id]) || planImage;

  const overallStatus = useMemo(() => {
    if (!homeState) return { lightsOn: false, acOn: false };
    const roomsWithState = homeState.rooms.map((room) =>
      getRoomStatus(room.id, homeState.devices)
    );
    return {
      lightsOn: roomsWithState.some((room) => room.lightsOn),
      acOn: roomsWithState.some((room) => room.acOn),
    };
  }, [homeState]);

  const consumption = useMemo<Consumption>(() => {
    if (!homeState) {
      return { instant: 0, daily: 0, monthly: 0, lightsOn: 0, acOn: 0 };
    }
    const lightsOn = homeState.devices.filter(
      (d) => d.type === "light" && d.is_on
    ).length;
    const acOn = homeState.devices.filter((d) => d.type === "ac" && d.is_on).length;
    const instant = lightsOn * LIGHT_WATT + acOn * AC_WATT;
    const daily =
      (lightsOn * LIGHT_WATT * LIGHT_HOURS) / 1000 +
      (acOn * AC_WATT * AC_HOURS) / 1000;
    const monthly = daily * 30;
    return { instant, daily, monthly, lightsOn, acOn };
  }, [homeState]);

  if (blocked || loading || !internal) {
    return (
      <>
        <Head>
          <title>Mi casa | BS</title>
        </Head>
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm text-slate-700">
          {loading
            ? "Cargando credenciales..."
            : "Esta sección es solo para usuarios internos."}
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Mi casa | BS</title>
      </Head>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
              Home interno
            </p>
            <h1 className="text-3xl font-semibold text-slate-900">
              {homeState?.home.name ?? "Mi casa"}
            </h1>
            <p className="text-sm text-slate-600">
              Plano con zonas por ambiente, control de luminarias / aires y rutinas simuladas.
            </p>
            {error && (
              <p className="mt-2 rounded-lg bg-orange-50 px-3 py-2 text-xs font-semibold text-orange-700">
                {error}
              </p>
            )}
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
              Luces {overallStatus.lightsOn ? "ON" : "OFF"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sky-700 ring-1 ring-sky-100">
              Aires {overallStatus.acOn ? "ON" : "OFF"}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700 ring-1 ring-slate-200">
              {loadingData ? "Actualizando..." : "Online"}
            </span>
            <button
              onClick={() => setEditMode((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold transition ${
                editMode
                  ? "bg-amber-100 text-amber-800 ring-1 ring-amber-200"
                  : "bg-slate-900 text-white hover:-translate-y-0.5"
              }`}
            >
              {editMode ? "Salir de editar" : "Editar"}
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
          <FloorPlanView
            planImage={planImage}
            planAssetUrl={homeState?.home.plan_asset_url ?? fallbackPlan.url}
            rooms={homeState?.rooms ?? []}
            devices={homeState?.devices ?? []}
            activeRoomId={activeRoomId}
            onFocusRoom={setActiveRoomId}
            loadingPlan={loadingPlan}
            onReloadPlan={loadPlan}
            editMode={editMode}
            onUpdatePolygon={handleUpdateRoomPolygon}
          />
          <ConsumptionPanel consumption={consumption} />
        </div>

        <RoomZoomView
          planImage={activeRoomPlan ?? planImage}
          room={activeRoom}
          devices={homeState?.devices ?? []}
          onClose={() => setActiveRoomId(null)}
          onToggle={handleToggle}
          togglingIds={togglingIds}
          editMode={editMode}
          onUpdateDevice={handleUpdateDevicePosition}
        />

        <RoutineList
          routines={homeState?.routines ?? []}
          onToggle={handleRoutineToggle}
          onRun={handleRoutineRun}
        />
      </div>
    </>
  );
}
