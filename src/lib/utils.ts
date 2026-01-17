import { clsx, type ClassValue } from "clsx";
import { format } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  date: string | Date,
  formatStr: string = "yyyy-MM-dd HH:mm"
) {
  if (!date) return "";
  try {
    return format(new Date(date), formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return "-";
  }
}

export function formatCurrency(
  amount: number,
  currency: "LAK" | "USD" | "THB" = "LAK"
) {
  switch (currency) {
    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
    case "THB":
      return new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
      }).format(amount);
    case "LAK":
    default:
      return amount.toLocaleString() + " ກີບ";
  }
}
