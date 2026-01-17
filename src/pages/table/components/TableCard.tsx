import { CardData } from "@/components/common/CustomCard";
import { TableStatusBadge } from "@/components/common/Table";
import { cn } from "@/lib/utils";
import type { Table } from "@/types/table.type";
import { useNavigate } from "react-router";

const statusColors = {
  AVAILABLE: {
    bg: "bg-teal-50",
    text: "text-teal-600",
    border: "border-teal-500",
    shadow: "shadow-teal-500",
  },
  OCCUPIED: {
    bg: "bg-amber-50",
    text: "text-amber-600",
    border: "border-amber-500",
    shadow: "shadow-amber-500",
  },
  WAITING_PAYMENT: {
    bg: "bg-rose-50",
    text: "text-rose-600",
    border: "border-rose-500",
    shadow: "shadow-rose-500",
  },
  NEED_CLEANING: {
    bg: "bg-slate-50",
    text: "text-slate-600",
    border: "border-slate-500",
    shadow: "shadow-slate-500",
  },
};

export default function TableCard({ tableData }: { tableData: Table }) {
  const navigate = useNavigate();
  const colors = statusColors[tableData.status];

  return (
    <CardData
      className={cn(
        "px-6 py-4 min-h-auto rounded-[16px] shadow-[6px_0_0_0_rgba(0,0,0,0)]",
        colors.border,
        colors.shadow
      )}
    >
      <div
        onClick={() => navigate(`/table/${tableData._id}`)}
        className="flex justify-between items-center"
      >
        <span className="font-black text-lg">ໂຕະ: {tableData.name}</span>
        <TableStatusBadge status={tableData.status} />
      </div>
    </CardData>
  );
}
