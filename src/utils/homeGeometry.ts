import { Device, Room, RoomBBox, RoomPolygonPoint } from "@/types/home";

export const parsePolygon = (raw: unknown): RoomPolygonPoint[] => {
  if (Array.isArray(raw)) {
    return raw
      .map((point) => {
        if (
          point &&
          typeof point === "object" &&
          "x" in point &&
          "y" in point &&
          typeof (point as { x?: unknown }).x === "number" &&
          typeof (point as { y?: unknown }).y === "number"
        ) {
          return { x: (point as { x: number }).x, y: (point as { y: number }).y };
        }
        return null;
      })
      .filter((item): item is RoomPolygonPoint => Boolean(item));
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return parsePolygon(parsed);
    } catch {
      return [];
    }
  }

  return [];
};

export const parseBBox = (raw: unknown): RoomBBox | null => {
  if (
    raw &&
    typeof raw === "object" &&
    "x" in raw &&
    "y" in raw &&
    "width" in raw &&
    "height" in raw
  ) {
    return {
      x: Number((raw as { x: unknown }).x),
      y: Number((raw as { y: unknown }).y),
      width: Number((raw as { width: unknown }).width),
      height: Number((raw as { height: unknown }).height),
    };
  }

  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return parseBBox(parsed);
    } catch {
      return null;
    }
  }

  return null;
};

export const computeBBox = (points: RoomPolygonPoint[]): RoomBBox | null => {
  if (!points || points.length === 0) return null;
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
};

export const getRoomBBox = (room: Room) =>
  room.bbox ?? computeBBox(room.polygon ?? []);

export const toSvgPoints = (points: RoomPolygonPoint[], width: number, height: number) =>
  points.map((p) => `${p.x * width},${p.y * height}`).join(" ");

export const toCssPolygon = (points: RoomPolygonPoint[]) =>
  points.map((p) => `${p.x * 100}% ${p.y * 100}%`).join(", ");

export const getRoomStatus = (roomId: string, devices: Device[]) => {
  const roomDevices = devices.filter((device) => device.room_id === roomId);
  const lightsOn = roomDevices.some(
    (device) => device.type === "light" && device.is_on
  );
  const acOn = roomDevices.some((device) => device.type === "ac" && device.is_on);
  return { lightsOn, acOn };
};
