import { supabase } from "@/lib/supabaseClient";
import {
  Device,
  Home,
  HomeState,
  PlanAsset,
  Routine,
  RoutineAction,
  Room,
  RoomTelemetry,
} from "@/types/home";
import { parseBBox, parsePolygon } from "@/utils/homeGeometry";

type RoomRow = {
  id?: string | number | null;
  home_id?: string | number | null;
  name?: string | null;
  slug?: string | null;
  polygon?: unknown;
  bbox?: unknown;
  sort_order?: number | null;
  room_telemetry?: RoomTelemetry[] | null;
  plan_asset_url?: string | null;
  detail_image_url?: string | null;
};

type DeviceRow = {
  id?: string | number | null;
  home_id?: string | number | null;
  room_id?: string | number | null;
  type?: string | null;
  name?: string | null;
  position?: unknown;
  is_on?: boolean | null;
  last_changed_at?: string | null;
};

type HomeRow = {
  id?: string | number | null;
  name?: string | null;
  owner_user_id?: string | null;
  plan_asset_url?: string | null;
};

type RoutineRow = {
  id?: string | number | null;
  home_id?: string | number | null;
  name?: string | null;
  description?: string | null;
  status?: string | null;
  cadence?: string | null;
  next_run_at?: string | null;
  last_run_at?: string | null;
  actions?: unknown;
  sort_order?: number | null;
};

const mapRoom = (row: RoomRow): Room => ({
  id: String(row.id ?? ""),
  home_id: String(row.home_id ?? ""),
  name: row.name ?? "Ambiente",
  slug: row.slug ?? undefined,
  polygon: parsePolygon(row.polygon ?? []),
  bbox: parseBBox(row.bbox ?? null),
  sort_order: row.sort_order ?? 0,
  plan_asset_url: row.plan_asset_url ?? undefined,
  detail_image_url: row.detail_image_url ?? row.plan_asset_url ?? undefined,
  telemetry:
    row.room_telemetry && row.room_telemetry.length > 0
      ? row.room_telemetry[0]
      : undefined,
});

const mapDevice = (row: DeviceRow): Device => {
  const position =
    row.position && typeof row.position === "object" && "x" in row.position
      ? (row.position as { x?: number; y?: number })
      : undefined;

  return {
    id: String(row.id ?? ""),
    home_id: String(row.home_id ?? ""),
    room_id: String(row.room_id ?? ""),
    type: (row.type as Device["type"]) ?? "light",
    name: row.name ?? "Dispositivo",
    position: {
      x: Number(position?.x ?? 0.5),
      y: Number(position?.y ?? 0.5),
    },
    is_on: Boolean(row.is_on),
    last_changed_at: row.last_changed_at ?? undefined,
  };
};

export const fallbackPlan: PlanAsset = {
  url: "/planos/emanuel.s@live.com.ar/plano_general.jpg",
};

const isRoutineAction = (value: unknown): value is RoutineAction => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as RoutineAction;
  const roomsOk =
    candidate.rooms === undefined || Array.isArray(candidate.rooms);
  const deviceTypesOk =
    candidate.device_types === undefined || Array.isArray(candidate.device_types);
  const stateOk =
    candidate.set_state === undefined || typeof candidate.set_state === "boolean";
  return roomsOk && deviceTypesOk && stateOk;
};

const mapRoutine = (row: RoutineRow): Routine => ({
  id: String(row.id ?? ""),
  home_id: String(row.home_id ?? ""),
  name: row.name ?? "Rutina",
  description: row.description ?? undefined,
  status: (row.status as "active" | "paused") ?? "active",
  cadence: row.cadence ?? undefined,
  next_run_at: row.next_run_at ?? undefined,
  last_run_at: row.last_run_at ?? undefined,
  actions: Array.isArray(row.actions)
    ? row.actions.filter(isRoutineAction)
    : undefined,
  sort_order: row.sort_order ?? 0,
});

export const fetchHomeState = async (
  ownerUserId: string
): Promise<HomeState | null> => {
  const { data: homeRow, error: homeError } = await supabase
    .from("homes")
    .select("id,name,owner_user_id,plan_asset_url")
    .eq("owner_user_id", ownerUserId)
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (homeError || !homeRow) {
    return null;
  }

  const home: Home = {
    id: String((homeRow as HomeRow).id ?? ""),
    name: (homeRow as HomeRow).name ?? "Mi casa",
    owner_user_id: (homeRow as HomeRow).owner_user_id ?? ownerUserId,
    plan_asset_url:
      (homeRow as HomeRow).plan_asset_url ?? fallbackPlan.url ?? "",
  };

  const { data: roomRows } = await supabase
    .from("rooms")
    .select(
      "id,home_id,name,slug,polygon,bbox,sort_order,plan_asset_url,detail_image_url,room_telemetry(temperature_c,humidity,updated_at)"
    )
    .eq("home_id", home.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  const { data: deviceRows } = await supabase
    .from("devices")
    .select(
      "id,home_id,room_id,type,name,position,is_on,last_changed_at"
    )
    .eq("home_id", home.id);

  const { data: routineRows } = await supabase
    .from("routines")
    .select(
      "id,home_id,name,description,status,cadence,next_run_at,last_run_at,actions,sort_order"
    )
    .eq("home_id", home.id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  return {
    home,
    rooms: (roomRows as RoomRow[] | null)?.map(mapRoom) ?? [],
    devices: (deviceRows as DeviceRow[] | null)?.map(mapDevice) ?? [],
    routines: (routineRows as RoutineRow[] | null)?.map(mapRoutine) ?? [],
  };
};

export const demoHomeState: HomeState = {
  home: {
    id: "demo-home",
    name: "Casa Emanuel",
    owner_user_id: "demo-user",
    plan_asset_url: fallbackPlan.url,
  },
  rooms: [
    {
      id: "demo-room-living",
      home_id: "demo-home",
      name: "Living",
      slug: "living",
      polygon: [
        { x: 0.42, y: 0.55 },
        { x: 0.84, y: 0.55 },
        { x: 0.84, y: 0.95 },
        { x: 0.42, y: 0.95 },
      ],
      bbox: { x: 0.42, y: 0.55, width: 0.42, height: 0.4 },
      sort_order: 1,
      telemetry: { temperature_c: 23.5, humidity: 48, updated_at: undefined },
      plan_asset_url: "/planos/emanuel.s@live.com.ar/living.png",
      detail_image_url: "/planos/emanuel.s@live.com.ar/living.png",
    },
    {
      id: "demo-room-comedor",
      home_id: "demo-home",
      name: "Comedor",
      slug: "comedor",
      polygon: [
        { x: 0.52, y: 0.3 },
        { x: 0.85, y: 0.3 },
        { x: 0.85, y: 0.5 },
        { x: 0.52, y: 0.5 },
      ],
      bbox: { x: 0.52, y: 0.3, width: 0.33, height: 0.2 },
      sort_order: 2,
      telemetry: { temperature_c: 23, humidity: 50, updated_at: undefined },
      plan_asset_url: "/planos/emanuel.s@live.com.ar/comedor.png",
      detail_image_url: "/planos/emanuel.s@live.com.ar/comedor.png",
    },
    {
      id: "demo-room-cocina",
      home_id: "demo-home",
      name: "Cocina",
      slug: "cocina",
      polygon: [
        { x: 0.8, y: 0.18 },
        { x: 0.98, y: 0.18 },
        { x: 0.98, y: 0.38 },
        { x: 0.8, y: 0.38 },
      ],
      bbox: { x: 0.8, y: 0.18, width: 0.18, height: 0.2 },
      sort_order: 3,
      telemetry: { temperature_c: 24, humidity: 52, updated_at: undefined },
      plan_asset_url: "/planos/emanuel.s@live.com.ar/cocina.png",
      detail_image_url: "/planos/emanuel.s@live.com.ar/cocina.png",
    },
    {
      id: "demo-room-lavadero",
      home_id: "demo-home",
      name: "Lavadero",
      slug: "lavadero",
      polygon: [
        { x: 0.38, y: 0.05 },
        { x: 0.53, y: 0.05 },
        { x: 0.53, y: 0.19 },
        { x: 0.38, y: 0.19 },
      ],
      bbox: { x: 0.38, y: 0.05, width: 0.15, height: 0.14 },
      sort_order: 4,
      plan_asset_url: "/planos/emanuel.s@live.com.ar/lavadero.png",
      detail_image_url: "/planos/emanuel.s@live.com.ar/lavadero.png",
    },
    {
      id: "demo-room-pasillo",
      home_id: "demo-home",
      name: "Pasillo",
      slug: "pasillo",
      polygon: [
        { x: 0.36, y: 0.44 },
        { x: 0.51, y: 0.44 },
        { x: 0.51, y: 0.64 },
        { x: 0.36, y: 0.64 },
      ],
      bbox: { x: 0.36, y: 0.44, width: 0.15, height: 0.2 },
      sort_order: 5,
      plan_asset_url: "/planos/emanuel.s@live.com.ar/pasillo.png",
      detail_image_url: "/planos/emanuel.s@live.com.ar/pasillo.png",
    },
    {
      id: "demo-room-master",
      home_id: "demo-home",
      name: "Habitación Principal",
      slug: "habitacion-principal",
      polygon: [
        { x: 0.05, y: 0.62 },
        { x: 0.35, y: 0.62 },
        { x: 0.35, y: 0.93 },
        { x: 0.05, y: 0.93 },
      ],
      bbox: { x: 0.05, y: 0.62, width: 0.3, height: 0.31 },
      sort_order: 6,
      telemetry: { temperature_c: 22.5, humidity: 49, updated_at: undefined },
      plan_asset_url: "/planos/emanuel.s@live.com.ar/habitacion_leon.jpg",
      detail_image_url: "/planos/emanuel.s@live.com.ar/habitacion_leon.jpg",
    },
    {
      id: "demo-room-bedroom2",
      home_id: "demo-home",
      name: "Habitación Secundaria",
      slug: "habitacion-secundaria",
      polygon: [
        { x: 0.05, y: 0.42 },
        { x: 0.35, y: 0.42 },
        { x: 0.35, y: 0.62 },
        { x: 0.05, y: 0.62 },
      ],
      bbox: { x: 0.05, y: 0.42, width: 0.3, height: 0.2 },
      sort_order: 7,
      telemetry: { temperature_c: 22.2, humidity: 47, updated_at: undefined },
      plan_asset_url: "/planos/emanuel.s@live.com.ar/habitacion_eloy.jpg",
      detail_image_url: "/planos/emanuel.s@live.com.ar/habitacion_eloy.jpg",
    },
    {
      id: "demo-room-bano-principal",
      home_id: "demo-home",
      name: "Baño Principal",
      slug: "bano-principal",
      polygon: [
        { x: 0.33, y: 0.56 },
        { x: 0.43, y: 0.56 },
        { x: 0.43, y: 0.68 },
        { x: 0.33, y: 0.68 },
      ],
      bbox: { x: 0.33, y: 0.56, width: 0.1, height: 0.12 },
      sort_order: 8,
      plan_asset_url: "/planos/emanuel.s@live.com.ar/bano_1.jpg",
      detail_image_url: "/planos/emanuel.s@live.com.ar/bano_1.jpg",
    },
    {
      id: "demo-room-bano-secundario",
      home_id: "demo-home",
      name: "Baño Secundario",
      slug: "bano-secundario",
      polygon: [
        { x: 0.34, y: 0.22 },
        { x: 0.45, y: 0.22 },
        { x: 0.45, y: 0.34 },
        { x: 0.34, y: 0.34 },
      ],
      bbox: { x: 0.34, y: 0.22, width: 0.11, height: 0.12 },
      sort_order: 9,
      plan_asset_url: "/planos/emanuel.s@live.com.ar/bano_2.jpg",
      detail_image_url: "/planos/emanuel.s@live.com.ar/bano_2.jpg",
    },
  ],
  devices: [
    {
      id: "device-living-light-1",
      home_id: "demo-home",
      room_id: "demo-room-living",
      type: "light",
      name: "Luz central",
      position: { x: 0.325, y: 0.172 },
      is_on: true,
    },
    {
      id: "device-living-light-2",
      home_id: "demo-home",
      room_id: "demo-room-living",
      type: "light",
      name: "Lampara pie",
      position: { x: 0.618, y: 0.172 },
      is_on: false,
    },
    {
      id: "device-living-ac",
      home_id: "demo-home",
      room_id: "demo-room-living",
      type: "ac",
      name: "Aire split",
      position: { x: 0.86, y: 0.18 },
      is_on: true,
    },
    {
      id: "device-comedor-light-1",
      home_id: "demo-home",
      room_id: "demo-room-comedor",
      type: "light",
      name: "Cielorraso 1",
      position: { x: 0.332, y: 0.19 },
      is_on: true,
    },
    {
      id: "device-comedor-light-2",
      home_id: "demo-home",
      room_id: "demo-room-comedor",
      type: "light",
      name: "Cielorraso 2",
      position: { x: 0.441, y: 0.268 },
      is_on: false,
    },
    {
      id: "device-comedor-light-3",
      home_id: "demo-home",
      room_id: "demo-room-comedor",
      type: "light",
      name: "Barra",
      position: { x: 0.624, y: 0.123 },
      is_on: true,
    },
    {
      id: "device-comedor-ac",
      home_id: "demo-home",
      room_id: "demo-room-comedor",
      type: "ac",
      name: "Aire Comedor",
      position: { x: 0.82, y: 0.2 },
      is_on: false,
    },
    {
      id: "device-kitchen-light",
      home_id: "demo-home",
      room_id: "demo-room-cocina",
      type: "light",
      name: "Cocina central",
      position: { x: 0.358, y: 0.385 },
      is_on: true,
    },
    {
      id: "device-lavadero-light",
      home_id: "demo-home",
      room_id: "demo-room-lavadero",
      type: "light",
      name: "Lavadero techo",
      position: { x: 0.456, y: 0.453 },
      is_on: false,
    },
    {
      id: "device-pasillo-light",
      home_id: "demo-home",
      room_id: "demo-room-pasillo",
      type: "light",
      name: "Pasillo central",
      position: { x: 0.423, y: 0.146 },
      is_on: false,
    },
    {
      id: "device-master-light",
      home_id: "demo-home",
      room_id: "demo-room-master",
      type: "light",
      name: "Cabecera",
      position: { x: 0.409, y: 0.566 },
      is_on: false,
    },
    {
      id: "device-master-lamp",
      home_id: "demo-home",
      room_id: "demo-room-master",
      type: "light",
      name: "Velador",
      position: { x: 0.32, y: 0.65 },
      is_on: true,
    },
    {
      id: "device-master-ac",
      home_id: "demo-home",
      room_id: "demo-room-master",
      type: "ac",
      name: "Aire dormitorio",
      position: { x: 0.86, y: 0.46 },
      is_on: false,
    },
    {
      id: "device-bedroom2-light",
      home_id: "demo-home",
      room_id: "demo-room-bedroom2",
      type: "light",
      name: "Luz principal",
      position: { x: 0.427, y: 0.14 },
      is_on: true,
    },
    {
      id: "device-bano1-light",
      home_id: "demo-home",
      room_id: "demo-room-bano-principal",
      type: "light",
      name: "Baño Principal",
      position: { x: 0.475, y: 0.222 },
      is_on: false,
    },
    {
      id: "device-bano2-light",
      home_id: "demo-home",
      room_id: "demo-room-bano-secundario",
      type: "light",
      name: "Baño Secundario",
      position: { x: 0.422, y: 0.248 },
      is_on: false,
    },
  ],
  routines: [
    {
      id: "demo-routine-pool",
      home_id: "demo-home",
      name: "Limpieza de pileta",
      description: "3 veces por día · 30 minutos",
      status: "active",
      cadence: "3x/día 30m",
      next_run_at: undefined,
      last_run_at: undefined,
      actions: [{ rooms: ["lavadero"], device_types: ["light"], set_state: true }],
    },
    {
      id: "demo-routine-irrigation",
      home_id: "demo-home",
      name: "Sistema de riego",
      description: "40 minutos mañana y noche",
      status: "active",
      cadence: "2x/día 40m",
      next_run_at: undefined,
      last_run_at: undefined,
      actions: [{ rooms: ["pasillo"], device_types: ["light"], set_state: true }],
    },
    {
      id: "demo-routine-luces-exterior",
      home_id: "demo-home",
      name: "Luces exteriores",
      description: "Encender de noche, apagar de día",
      status: "active",
      cadence: "Nocturno",
      actions: [{ rooms: ["living", "comedor"], device_types: ["light"], set_state: true }],
    },
    {
      id: "demo-routine-persianas",
      home_id: "demo-home",
      name: "Persianas",
      description: "Abiertas de día · cerradas de noche",
      status: "paused",
      cadence: "Diario",
      actions: [{ rooms: ["living", "comedor"], device_types: ["light"], set_state: false }],
    },
    {
      id: "demo-routine-vacaciones",
      home_id: "demo-home",
      name: "Luces en vacaciones",
      description: "Encendido aleatorio interior",
      status: "active",
      cadence: "Aleatorio",
      actions: [
        {
          rooms: [
            "living",
            "comedor",
            "habitacion-principal",
            "habitacion-secundaria",
          ],
          device_types: ["light"],
          set_state: true,
        },
      ],
    },
    {
      id: "demo-routine-aires",
      home_id: "demo-home",
      name: "Aires acondicionados",
      description: "Apagados día · encender 16:30",
      status: "active",
      cadence: "Diario 16:30",
      actions: [
        { rooms: ["living", "habitacion-principal"], device_types: ["ac"], set_state: false },
      ],
    },
  ],
};
