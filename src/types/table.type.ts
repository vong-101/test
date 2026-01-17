import { type Order } from "./order.type";
import { type Pagination } from "./pagination.type";

export interface TablesParams {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export type TableStatus =
  | "AVAILABLE"
  | "OCCUPIED"
  | "WAITING_PAYMENT"
  | "NEED_CLEANING";

export interface Table {
  _id: string;
  tableId: string;
  name: string;
  currentOrder: Order | null;
  createdAt: string;
  updatedAt: string;
  status: TableStatus;
}

export interface TablesResponse {
  tables: Table[];
  pagination: Pagination;
}
