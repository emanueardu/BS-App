import { Device, PlanImage, Room } from "@/types/home";
import { getRoomBBox, getRoomStatus, toSvgPoints } from "@/utils/homeGeometry";
import { AlertCircle, Lightbulb, Snowflake } from "lucide-react";
import { useMemo } from "react";

type Props = {
  planImage?: PlanImage | null;
  planAssetUrl: string;
  rooms: Room[];
  devices: Device[];
  activeRoomId?: string | null;
  onFocusRoom: (roomId: string) => void;
  loadingPlan?: boolean;
  onReloadPlan?: () => void;
  editMode?: boolean;
  onUpdatePolygon?: (roomId: string, polygon: Room["polygon"]) => void;
};

export const FloorPlanView = ({
  planImage,
  planAssetUrl,
  rooms,
  devices,
  activeRoomId,
  loadingPlan,
  onFocusRoom,
  onReloadPlan,
  editMode = false,
  onUpdatePolygon,
}: Props) => {
  const width = planImage?.width ?? 1200;
  const height = planImage?.height ?? 850;

  const sortedRooms = useMemo(
    () =>
      [...rooms].sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0)),
    [rooms]
  );

  const aspectRatio = width && height ? `${width} / ${height}` : "4 / 3";

  return (
    <div className="rounded-3xl border border-slate-200/70 bg-white/80 p-6 shadow-xl shadow-orange-50 backdrop-blur">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-600">
            Plano general
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">Mi casa</h2>
          <p className="text-sm text-slate-600">
            Click en un ambiente para hacer zoom y ver dispositivos.
          </p>
          {editMode && (
            <p className="text-xs font-semibold text-amber-700">
              Modo edición: Alt+click en el plano para mover el polígono del ambiente activo.
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 ring-1 ring-emerald-100">
            <Lightbulb className="h-4 w-4" />
            Luces
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-sky-700 ring-1 ring-sky-100">
            <Snowflake className="h-4 w-4" />
            Aires
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-slate-700 ring-1 ring-slate-200">
            Click = zoom
          </span>
        </div>
      </div>

      <div
        className="mt-4 relative w-full overflow-hidden rounded-2xl bg-slate-950/70"
        style={{ aspectRatio }}
      >
        {planImage ? (
          <>
            <svg
              viewBox={`0 0 ${width} ${height}`}
              className="h-full w-full"
              preserveAspectRatio="xMidYMid meet"
              onClick={(event) => {
                if (!editMode || !activeRoomId || !onUpdatePolygon) return;
                if (!event.altKey) return;
                const rect = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;
                const size = 0.15;
                const half = size / 2;
                const polygon = [
                  { x: Math.max(0, x - half), y: Math.max(0, y - half) },
                  { x: Math.min(1, x + half), y: Math.max(0, y - half) },
                  { x: Math.min(1, x + half), y: Math.min(1, y + half) },
                  { x: Math.max(0, x - half), y: Math.min(1, y + half) },
                ];
                onUpdatePolygon(activeRoomId, polygon);
              }}
            >
              <image
                href={planImage.src}
                width={width}
                height={height}
                preserveAspectRatio="xMidYMid meet"
              />

              {sortedRooms.map((room) => {
                const points = room.polygon.length
                  ? room.polygon
                  : getRoomBBox(room)
                    ? [
                        getRoomBBox(room)!.x,
                        getRoomBBox(room)!.y,
                        getRoomBBox(room)!.width,
                        getRoomBBox(room)!.height,
                      ]
                    : [];

                const { lightsOn, acOn } = getRoomStatus(room.id, devices);
                const hasActivity = lightsOn || acOn;
                const stroke = hasActivity ? "#10b981" : "#ef4444";
                const fill = hasActivity
                  ? "rgba(16,185,129,0.18)"
                  : "rgba(239,68,68,0.12)";

                if (!room.polygon.length && Array.isArray(points) && points.length === 4) {
                  const bbox = getRoomBBox(room);
                  if (!bbox) return null;
                  return (
                    <g key={room.id}>
                      <rect
                        x={bbox.x * width}
                        y={bbox.y * height}
                        width={bbox.width * width}
                        height={bbox.height * height}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={2}
                        className="cursor-pointer transition hover:opacity-80"
                        onClick={() => onFocusRoom(room.id)}
                      />
                      <text
                        x={(bbox.x + bbox.width / 2) * width}
                        y={(bbox.y + bbox.height / 2) * height}
                        textAnchor="middle"
                        className="select-none text-xs font-semibold fill-white drop-shadow"
                        style={{ pointerEvents: "none" }}
                      >
                        {room.name}
                      </text>
                    </g>
                  );
                }

                return (
                  <g key={room.id} className="cursor-pointer">
                    <polygon
                      points={toSvgPoints(room.polygon, width, height)}
                      fill={fill}
                      stroke={stroke}
                      strokeWidth={2}
                      className="transition hover:opacity-80"
                      onClick={() => onFocusRoom(room.id)}
                    />
                    <text
                      x={
                        (room.polygon.reduce((acc, p) => acc + p.x, 0) /
                          room.polygon.length) *
                        width
                      }
                      y={
                        (room.polygon.reduce((acc, p) => acc + p.y, 0) /
                          room.polygon.length) *
                        height
                      }
                      textAnchor="middle"
                      className="select-none text-xs font-semibold fill-white drop-shadow"
                      style={{ pointerEvents: "none" }}
                    >
                      {room.name}
                    </text>
                    <g
                      transform={`translate(${
                        (room.polygon.reduce((acc, p) => acc + p.x, 0) /
                          room.polygon.length) *
                        width
                      },${
                        (room.polygon.reduce((acc, p) => acc + p.y, 0) /
                          room.polygon.length +
                          0.03) *
                        height
                      })`}
                    >
                      <rect
                        x={-34}
                        y={-16}
                        width={68}
                        height={24}
                        rx={12}
                        fill="#0f172a"
                        opacity={0.8}
                      />
                      <g transform="translate(-26,-2)">
                        <Lightbulb
                          className="h-3 w-3"
                          color={lightsOn ? "#34d399" : "#f87171"}
                        />
                      </g>
                      <g transform="translate(6,-2)">
                        <Snowflake
                          className="h-3 w-3"
                          color={acOn ? "#34d399" : "#f87171"}
                        />
                      </g>
                    </g>
                  </g>
                );
              })}
            </svg>

            {activeRoomId && (
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-amber-400/80" />
            )}
          </>
        ) : (
          <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-3 text-slate-100">
            <AlertCircle className="h-10 w-10 text-amber-300" />
            <p className="text-sm font-semibold">Cargando plano...</p>
            <p className="max-w-md text-center text-xs text-slate-200/70">
              Servimos el PDF desde {planAssetUrl}. Asegurate de que el archivo exista en
              public/planos o en Supabase Storage.
            </p>
            {onReloadPlan && (
              <button
                onClick={onReloadPlan}
                disabled={loadingPlan}
                className="rounded-full bg-white/20 px-4 py-2 text-xs font-semibold text-white transition hover:bg-white/30"
              >
                {loadingPlan ? "Renderizando..." : "Reintentar"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
