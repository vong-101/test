import { FileQuestion, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

interface NotFoundStateProps {
  message?: string;
  className?: string;
}

export default function NotFoundState({
  message = "ບໍ່ພົບຂໍ້ມູນທີ່ທ່ານກຳລັງຄົ້ນຫາ",
  className,
}: NotFoundStateProps) {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] w-full gap-4 text-center p-6",
        className
      )}
    >
      <div className="bg-amber-50 p-3 rounded-full">
        <FileQuestion className="w-8 h-8 text-amber-500" />
      </div>
      <div className="space-y-1">
        <p className="text-zinc-900 font-semibold">ບໍ່ພົບຂໍ້ມູນ</p>
        <p className="text-zinc-500 text-sm max-w-[300px]">{message}</p>
      </div>
      <Button
        onClick={() => navigate(-1)}
        variant="outline"
        size="sm"
        className="gap-2 mt-2 border-zinc-200 hover:bg-zinc-50"
      >
        <ArrowLeft className="w-4 h-4" />
        ກັບຄືນ
      </Button>
    </div>
  );
}
