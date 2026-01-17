import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export default function ErrorState({
  message = "ເກີດຂໍ້ຜິດພາດໃນການໂຫຼດຂໍ້ມູນ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] w-full gap-4 text-center p-6",
        className
      )}
    >
      <div className="bg-red-50 p-3 rounded-full">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>
      <div className="space-y-1">
        <p className="text-zinc-900 font-semibold">ພົບຂໍ້ຜິດພາດ</p>
        <p className="text-zinc-500 text-sm max-w-[300px]">{message}</p>
      </div>
      {onRetry && (
        <Button
          onClick={onRetry}
          variant="outline"
          size="sm"
          className="gap-2 mt-2 border-zinc-200 hover:bg-zinc-50"
        >
          <RefreshCw className="w-4 h-4" />
          ລອງໃໝ່
        </Button>
      )}
    </div>
  );
}
