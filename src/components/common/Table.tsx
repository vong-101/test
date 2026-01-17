import CustomBadge from "./CustomBadge";
import { type TableStatus } from "@/types/table.type";

function getTableStatusBadge(status: TableStatus) {
  switch (status) {
    case "AVAILABLE":
      return (
        <CustomBadge
          text="ວ່າງ"
          className="min-w-[130px] py-1.5 bg-teal-500 text-white"
        />
      );
    case "OCCUPIED":
      return (
        <CustomBadge
          text="ມີລູກຄ້າ"
          className="min-w-[130px] py-1.5 bg-amber-500 text-white"
        />
      );
    case "WAITING_PAYMENT":
      return (
        <CustomBadge
          text="ລໍຖ້າຊຳລະເງິນ"
          className="min-w-[130px] py-1.5 bg-rose-500 text-white"
        />
      );
    case "NEED_CLEANING":
      return (
        <CustomBadge
          text="ລໍຖ້າເຮັດຄວາມສະອາດ"
          className="min-w-[130px] py-1.5 bg-slate-500 text-white"
        />
      );
    default:
      return "";
  }
}

export function TableStatusBadge({ status }: { status: TableStatus }) {
  return <>{getTableStatusBadge(status)}</>;
}
