import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export type BadgeStatus =
  | "success"
  | "warning"
  | "error"
  | "info"
  | "teal"
  | "blue"
  | "sky"
  | "cyan"
  | "yellow"
  | "default";

const statusStyles: Record<BadgeStatus, string> = {
  success: "bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80",
  warning: "bg-amber-100 text-amber-800 hover:bg-amber-100/80",
  error: "bg-red-100 text-red-800 hover:bg-red-100/80",
  info: "bg-sky-100 text-sky-800 hover:bg-sky-100/80",
  teal: "bg-teal-100 text-teal-800 hover:bg-teal-100/80",
  blue: "bg-blue-100 text-blue-800 hover:bg-blue-100/80",
  sky: "bg-sky-100 text-sky-800 hover:bg-sky-100/80",
  cyan: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100/80",
  yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80",
  default: "bg-zinc-100 text-zinc-800 hover:bg-zinc-100/80", // zinc used for default
};

export default function CustomBadge({
  icon,
  text,
  className,
  status = "default",
}: {
  text: string;
  icon?: React.ReactNode;
  className?: string;
  status?: BadgeStatus;
}) {
  return (
    <Badge
      variant="outline"
      className={cn(
        "px-4 py-1 rounded-[10px] flex items-center justify-center gap-1.5 border-none shadow-none text-xs font-medium pointer-events-none",
        statusStyles[status],
        className
      )}
    >
      {icon}
      {text}
    </Badge>
  );
}

export function ActiveBadge({ isActive }: { isActive: boolean }) {
  return (
    <CustomBadge
      icon={
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            isActive ? "bg-teal-500" : "bg-red-500"
          )}
        />
      }
      text={isActive ? "ເປີດໃຊ້ງານ" : "ປິດໃຊ້ງານ"}
      status={isActive ? "success" : "error"}
    />
  );
}
