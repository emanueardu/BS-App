import { DeviceMarker } from "@/components/home/DeviceMarker";
import { Device, PlanImage, Room } from "@/types/home";
import { getRoomBBox, getRoomStatus, toSvgPoints } from "@/utils/homeGeometry";
import { Lightbulb, Snowflake, XCircle } from "lucide-react";

type Props = {
  planImage?: PlanImage | null;
  room?: Room | null;
  devices: Device[];
  onClose: () => void;
  onToggle: (id: string, next: boolean) => void;
  togglingIds?: string[];
  editMode?: boolean;
  onUpdateDevice?: (deviceId: string, position: { x: number; y: number }) => void;
};

export const RoomZoomView = ({
  planImage,
  room,
  devices,
  onClose,
  onToggle,
  togglingIds = [],
  editMode = false,
  onUpdateDevice,
}: Props) => {
  if (!room) {
    return (
      <div className="section-shell border-dashed p-6 text-sm text-brand-text-muted">
        Selecciona un ambiente en el plano para ver sus dispositivos.
      </div>
    );
  }

  const width = planImage?.width ?? 1200;
  const height = planImage?.height ?? 850;
  const aspectRatio = planImage ? `${planImage.width}/${planImage.height}` : "4/3";

  const bbox = getRoomBBox(room);
  const pad = 0.06;
  const paddedView = bbox
    ? {
        x: Math.max(0, (bbox.x - pad) * width),
        y: Math.max(0, (bbox.y - pad) * height),
        w: Math.min(width, (bbox.width + pad * 2) * width),
        h: Math.min(height, (bbox.height + pad * 2) * height),
      }
    : { x: 0, y: 0, w: width, h: height };

  const viewBox = `${paddedView.x} ${paddedView.y} ${paddedView.w} ${paddedView.h}`;
  const roomDevices = devices.filter((device) => device.room_id === room.id);
  const { lightsOn, acOn } = getRoomStatus(room.id, devices);

  return (
    <div className="section-shell p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Ambiente</p>
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-semibold text-brand-text">{room.name}</h3>
            <span className="status-pill status-pill-neutral">
              {roomDevices.length} dispositivos
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs font-semibold">
            <span className={`status-pill ${lightsOn ? "status-pill-on" : "status-pill-off"}`}>
              <Lightbulb className="h-3.5 w-3.5" />
              {lightsOn ? "Luces ON" : "Luces OFF"}
            </span>
            <span className={`status-pill ${acOn ? "status-pill-climate" : "status-pill-off"}`}>
              <Snowflake className="h-3.5 w-3.5" />
              {acOn ? "Aires ON" : "Aires OFF"}
            </span>
            {room.telemetry?.temperature_c && (
              <span className="status-pill status-pill-climate">
                {room.telemetry.temperature_c.toFixed(1)}
                {"\u00b0"}C
              </span>
            )}
            {editMode && (
              <span className="status-pill status-pill-neutral">
                Modo edición
              </span>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="btn btn-navy px-4 py-2 text-xs"
        >
          <XCircle className="h-4 w-4" />
          Salir del zoom
        </button>
      </div>

      <div
        className="relative mt-4 w-full overflow-hidden rounded-2xl border border-brand-border bg-brand-navy/88"
        style={{ aspectRatio }}
      >
        {planImage && (
          <>
            <svg
              viewBox={viewBox}
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <image
                href={planImage.src}
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid meet"
              />
              {room.polygon.length > 0 && (
                <polygon
                  points={toSvgPoints(room.polygon, width, height)}
                  fill="rgba(91,201,138,0.18)"
                  stroke="#5bc98a"
                  strokeWidth={2.5}
                />
              )}
            </svg>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-brand-copper/8" />

            <div className="absolute inset-0">
              {roomDevices.map((device) => (
                <DeviceMarker
                  key={device.id}
                  device={device}
                  onToggle={onToggle}
                  busy={togglingIds.includes(device.id)}
                  editable={editMode}
                  onMove={(pos) => onUpdateDevice?.(device.id, pos)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
