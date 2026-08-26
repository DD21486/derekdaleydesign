import {
  Calendar,
  CheckCircle2,
  Database,
  KeyRound,
  Layers,
  Network,
  Pause,
  PenTool,
  Play,
  ScanEye,
  type LucideIcon,
} from "lucide-react";

export const hobbyIcons = {
  calendar: Calendar,
  pause: Pause,
  play: Play,
  "check-circle": CheckCircle2,
  "key-round": KeyRound,
  database: Database,
  "scan-eye": ScanEye,
  layers: Layers,
  network: Network,
  "pen-tool": PenTool,
} as const satisfies Record<string, LucideIcon>;

export type HobbyIconName = keyof typeof hobbyIcons;

type HobbyIconProps = {
  name: HobbyIconName;
  className?: string;
};

export function HobbyIcon({ name, className = "h-3.5 w-3.5" }: HobbyIconProps) {
  const Icon = hobbyIcons[name];
  return <Icon className={className} strokeWidth={1.5} aria-hidden />;
}
