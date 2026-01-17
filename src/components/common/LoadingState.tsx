import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export default function LoadingState({
  className,
  size = "md",
  text = "ກຳລັງໂຫຼດຂໍ້ມູນ...",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] w-full gap-3",
        className
      )}
    >
      <Loader2
        className={cn(
          "text-blue-600 animate-spin",
          size === "lg" ? "w-12 h-12" : size === "md" ? "w-8 h-8" : "w-4 h-4"
        )}
      />
      {text && <p className="text-zinc-500 font-medium text-sm">{text}</p>}
    </div>
  );
}
