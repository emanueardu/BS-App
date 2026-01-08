import { FloorPlanView } from "@/components/home/FloorPlanView";
import { RoomZoomView } from "@/components/home/RoomZoomView";
import { useInternalRoute } from "@/hooks/useInternalRoute";
import { fetchHomeState, demoHomeState, fallbackPlan } from "@/lib/homeService";
import { supabase } from "@/lib/supabaseClient";
import { Device, HomeState, PlanImage } from "@/types/home";
import { getRoomStatus } from "@/utils/homeGeometry";
import { renderPdfToImage } from "@/utils/pdfPlan";
import { useEffect, useMemo, useState, useCallback } from "react";
import Head from "next/head";

const bypassInternal =
  typeof process !== "undefined" &&
  process.env.NEXT_PUBLIC_INTERNAL_BYPASS === "true";

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
          if (!room.plan_asset_url) return null;
          try {
            const img = await renderPdfToImage(room.plan_asset_url);
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
              Plano con zonas por ambiente y control de luminarias / aires.
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
          </div>
        </div>

        <FloorPlanView
          planImage={planImage}
          planAssetUrl={homeState?.home.plan_asset_url ?? fallbackPlan.url}
          rooms={homeState?.rooms ?? []}
          devices={homeState?.devices ?? []}
          activeRoomId={activeRoomId}
          onFocusRoom={setActiveRoomId}
          loadingPlan={loadingPlan}
          onReloadPlan={loadPlan}
        />

        <RoomZoomView
          planImage={activeRoomPlan ?? planImage}
          room={activeRoom}
          devices={homeState?.devices ?? []}
          onClose={() => setActiveRoomId(null)}
          onToggle={handleToggle}
          togglingIds={togglingIds}
        />
      </div>
    </>
  );
}
