import { supabase } from "@/lib/supabaseClient";
import {
  Device,
  Home,
  HomeState,
  PlanAsset,
  Room,
  RoomTelemetry,
} from "@/types/home";
import { parseBBox, parsePolygon } from "@/utils/homeGeometry";

type RoomRow = {
  id?: string | number | null;
  home_id?: string | number | null;
  name?: string | null;
  polygon?: unknown;
  bbox?: unknown;
  sort_order?: number | null;
  room_telemetry?: RoomTelemetry[] | null;
  plan_asset_url?: string | null;
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

const mapRoom = (row: RoomRow): Room => ({
  id: String(row.id ?? ""),
  home_id: String(row.home_id ?? ""),
  name: row.name ?? "Ambiente",
  polygon: parsePolygon(row.polygon ?? []),
  bbox: parseBBox(row.bbox ?? null),
  sort_order: row.sort_order ?? 0,
  plan_asset_url: row.plan_asset_url ?? undefined,
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
  url: "/planos/home-plan.jpg",
};

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
      "id,home_id,name,polygon,bbox,sort_order,plan_asset_url,room_telemetry(temperature_c,humidity,updated_at)"
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

  return {
    home,
    rooms: (roomRows as RoomRow[] | null)?.map(mapRoom) ?? [],
    devices: (deviceRows as DeviceRow[] | null)?.map(mapDevice) ?? [],
  };
};

export const demoHomeState: HomeState = {
  home: {
    id: "demo-home",
    name: "Casa demo",
    owner_user_id: "demo-user",
    plan_asset_url: fallbackPlan.url,
  },
  rooms: [
    {
      id: "room-living",
      home_id: "demo-home",
      name: "Living / Comedor",
      polygon: [
        { x: 0.05, y: 0.05 },
        { x: 0.55, y: 0.05 },
        { x: 0.55, y: 0.38 },
        { x: 0.05, y: 0.38 },
      ],
      bbox: { x: 0.05, y: 0.05, width: 0.5, height: 0.33 },
      sort_order: 1,
      telemetry: { temperature_c: 22.5, humidity: 48, updated_at: undefined },
      plan_asset_url: "/planos/living.png",
    },
    {
      id: "room-kitchen",
      home_id: "demo-home",
      name: "Cocina",
      polygon: [
        { x: 0.58, y: 0.05 },
        { x: 0.93, y: 0.05 },
        { x: 0.93, y: 0.32 },
        { x: 0.58, y: 0.32 },
      ],
      bbox: { x: 0.58, y: 0.05, width: 0.35, height: 0.27 },
      sort_order: 2,
      telemetry: { temperature_c: 24, humidity: 52, updated_at: undefined },
      plan_asset_url: "/planos/cocina.png",
    },
    {
      id: "room-master",
      home_id: "demo-home",
      name: "Dormitorio principal",
      polygon: [
        { x: 0.05, y: 0.42 },
        { x: 0.42, y: 0.42 },
        { x: 0.42, y: 0.9 },
        { x: 0.05, y: 0.9 },
      ],
      bbox: { x: 0.05, y: 0.42, width: 0.37, height: 0.48 },
      sort_order: 3,
      telemetry: { temperature_c: 21.8, humidity: 50, updated_at: undefined },
      plan_asset_url: "/planos/habitacion-leon.jpg",
    },
    {
      id: "room-bedroom2",
      home_id: "demo-home",
      name: "Dormitorio 2 / Oficina",
      polygon: [
        { x: 0.45, y: 0.45 },
        { x: 0.93, y: 0.45 },
        { x: 0.93, y: 0.9 },
        { x: 0.45, y: 0.9 },
      ],
      bbox: { x: 0.45, y: 0.45, width: 0.48, height: 0.45 },
      sort_order: 4,
      telemetry: { temperature_c: 23.1, humidity: 46, updated_at: undefined },
      plan_asset_url: "/planos/habitacion-eloy.jpg",
    },
  ],
  devices: [
    {
      id: "device-living-light-1",
      home_id: "demo-home",
      room_id: "room-living",
      type: "light",
      name: "Luz central",
      position: { x: 0.22, y: 0.16 },
      is_on: true,
    },
    {
      id: "device-living-light-2",
      home_id: "demo-home",
      room_id: "room-living",
      type: "light",
      name: "Lampara pie",
      position: { x: 0.38, y: 0.24 },
      is_on: false,
    },
    {
      id: "device-living-ac",
      home_id: "demo-home",
      room_id: "room-living",
      type: "ac",
      name: "Aire split",
      position: { x: 0.48, y: 0.18 },
      is_on: true,
    },
    {
      id: "device-kitchen-light",
      home_id: "demo-home",
      room_id: "room-kitchen",
      type: "light",
      name: "Cielorraso",
      position: { x: 0.7, y: 0.16 },
      is_on: true,
    },
    {
      id: "device-kitchen-ac",
      home_id: "demo-home",
      room_id: "room-kitchen",
      type: "ac",
      name: "Extractor / AC",
      position: { x: 0.84, y: 0.18 },
      is_on: false,
    },
    {
      id: "device-master-light",
      home_id: "demo-home",
      room_id: "room-master",
      type: "light",
      name: "Cabecera",
      position: { x: 0.24, y: 0.64 },
      is_on: false,
    },
    {
      id: "device-master-lamp",
      home_id: "demo-home",
      room_id: "room-master",
      type: "light",
      name: "Velador",
      position: { x: 0.28, y: 0.8 },
      is_on: true,
    },
    {
      id: "device-master-ac",
      home_id: "demo-home",
      room_id: "room-master",
      type: "ac",
      name: "Aire dormitorio",
      position: { x: 0.38, y: 0.68 },
      is_on: false,
    },
    {
      id: "device-bedroom2-light",
      home_id: "demo-home",
      room_id: "room-bedroom2",
      type: "light",
      name: "Luz principal",
      position: { x: 0.62, y: 0.65 },
      is_on: true,
    },
    {
      id: "device-bedroom2-ac",
      home_id: "demo-home",
      room_id: "room-bedroom2",
      type: "ac",
      name: "Aire escritorio",
      position: { x: 0.78, y: 0.72 },
      is_on: false,
    },
  ],
};
