export type PlanAsset = {
  url: string;
  page?: number;
};

export type PlanImage = {
  src: string;
  width: number;
  height: number;
};

export type RoomPolygonPoint = {
  x: number;
  y: number;
};

export type RoomBBox = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type RoomTelemetry = {
  temperature_c?: number | null;
  humidity?: number | null;
  updated_at?: string | null;
};

export type Room = {
  id: string;
  home_id: string;
  name: string;
  slug?: string;
  polygon: RoomPolygonPoint[];
  bbox?: RoomBBox | null;
  sort_order?: number | null;
  telemetry?: RoomTelemetry | null;
  plan_asset_url?: string | null;
  detail_image_url?: string | null;
};

export type DeviceType = "light" | "ac";

export type Device = {
  id: string;
  home_id: string;
  room_id: string;
  type: DeviceType;
  name: string;
  position: {
    x: number;
    y: number;
  };
  is_on: boolean;
  last_changed_at?: string | null;
};

export type Home = {
  id: string;
  name: string;
  owner_user_id: string;
  plan_asset_url: string;
  created_at?: string | null;
};

export type RoutineAction = {
  rooms?: string[];
  device_types?: DeviceType[];
  set_state?: boolean;
};

export type Routine = {
  id: string;
  home_id: string;
  name: string;
  description?: string | null;
  status: "active" | "paused";
  cadence?: string | null;
  next_run_at?: string | null;
  last_run_at?: string | null;
  actions?: RoutineAction[] | null;
  sort_order?: number | null;
};

export type HomeState = {
  home: Home;
  rooms: Room[];
  devices: Device[];
  routines?: Routine[];
};
