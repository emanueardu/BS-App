import { Device } from "@/types/home";
import { Lightbulb, Snowflake } from "lucide-react";

type Props = {
  device: Device;
  onToggle: (id: string, next: boolean) => void;
  busy?: boolean;
};

export const DeviceMarker = ({ device, onToggle, busy }: Props) => {
  const Icon = device.type === "light" ? Lightbulb : Snowflake;
  const isOn = device.is_on;

  return (
    <button
      className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full px-3 py-2 text-xs font-semibold shadow-lg shadow-slate-900/25 backdrop-blur transition hover:-translate-y-1 hover:shadow-xl disabled:cursor-not-allowed"
      style={{
        left: `${device.position.x * 100}%`,
        top: `${device.position.y * 100}%`,
        backgroundColor: isOn ? "rgba(34,197,94,0.92)" : "rgba(239,68,68,0.92)",
        color: isOn ? "#052e16" : "#1f2937",
      }}
      onClick={() => onToggle(device.id, !isOn)}
      disabled={busy}
      title={`${device.name} • ${isOn ? "ON" : "OFF"}`}
    >
      <span className="inline-flex items-center gap-1">
        <Icon className="h-4 w-4" />
        {device.type === "light" ? "Luz" : "Aire"}
      </span>
      <span className="ml-2 rounded-full bg-black/15 px-2 py-0.5 text-[10px] font-black tracking-tight text-white">
        {isOn ? "ON" : "OFF"}
      </span>
    </button>
  );
};
