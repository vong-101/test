import type { OrderItemStatus } from "@/types/order.type";
import CustomBadge, { type BadgeStatus } from "./CustomBadge";

export const orderItemStatusColors = {
  NEW: { bg: "bg-amber-50", text: "text-amber-600" },
  DONE: { bg: "bg-emerald-50", text: "text-emerald-600" },
  CANCELLED: { bg: "bg-red-50", text: "text-red-600" },
};

const statusBadges = {
  NEW: "warning",
  DONE: "success",
  CANCELLED: "error",
};

const statusText = {
  NEW: "ອໍເດີ້ໃຫມ່",
  DONE: "ສຳເລັດ",
  CANCELLED: "ຍົກເລີກ",
};

export function OrderItemStatusBadge({
  status,
  className,
}: {
  status: OrderItemStatus;
  className?: string;
}) {
  return (
    <CustomBadge
      className={className}
      text={statusText[status]}
      status={statusBadges[status] as BadgeStatus}
    />
  );
}
