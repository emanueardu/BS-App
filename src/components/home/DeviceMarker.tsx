import { Device } from "@/types/home";
import { Lightbulb, Snowflake } from "lucide-react";
import { useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type Props = {
  device: Device;
  onToggle: (id: string, next: boolean) => void;
  busy?: boolean;
  editable?: boolean;
  onMove?: (position: { x: number; y: number }) => void;
};

export const DeviceMarker = ({
  device,
  onToggle,
  busy,
  editable,
  onMove,
}: Props) => {
  const Icon = device.type === "light" ? Lightbulb : Snowflake;
  const isOn = device.is_on;
  const [dragging, setDragging] = useState(false);

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!editable) return;
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    setDragging(true);

    const handleMove = (moveEvent: PointerEvent) => {
      const container = target.parentElement;
      if (!container || !onMove) return;
      const rect = container.getBoundingClientRect();
      const x = (moveEvent.clientX - rect.left) / rect.width;
      const y = (moveEvent.clientY - rect.top) / rect.height;
      const clamped = {
        x: Math.min(0.99, Math.max(0.01, x)),
        y: Math.min(0.99, Math.max(0.01, y)),
      };
      onMove(clamped);
    };

    const handleUp = (upEvent: PointerEvent) => {
      target.releasePointerCapture(event.pointerId);
      document.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerup", handleUp);
      setDragging(false);
      handleMove(upEvent);
    };

    document.addEventListener("pointermove", handleMove);
    document.addEventListener("pointerup", handleUp);
  };

  return (
    <button
      className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold shadow-lg shadow-brand-navy/25 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed"
      style={{
        left: `${device.position.x * 100}%`,
        top: `${device.position.y * 100}%`,
        backgroundColor: isOn ? "rgba(91,201,138,0.94)" : "rgba(239,68,68,0.92)",
        color: isOn ? "#08231f" : "#fff5f5",
        opacity: dragging ? 0.85 : 1,
        cursor: editable ? "grab" : undefined,
        boxShadow: isOn
          ? "0 12px 32px -8px rgba(91,201,138,.55)"
          : "0 12px 28px -10px rgba(239,68,68,.42)",
      }}
      onClick={() => onToggle(device.id, !isOn)}
      onPointerDown={handlePointerDown}
      disabled={busy}
      title={`${device.name} | ${isOn ? "ON" : "OFF"}`}
    >
      <span className="inline-flex items-center gap-1">
        <Icon className="h-4 w-4" />
        {device.type === "light" ? "Luz" : "Aire"}
      </span>
      <span className="ml-2 rounded-full bg-black/18 px-2 py-0.5 text-[10px] font-black tracking-tight text-brand-text-on-dark">
        {isOn ? "ON" : "OFF"}
      </span>
      {editable && (
        <span className="ml-2 rounded-full bg-white/18 px-2 py-0.5 text-[10px] font-semibold text-brand-text-on-dark">
          Mover
        </span>
      )}
    </button>
  );
};
