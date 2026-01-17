import { type PaymentMethod } from "./payment.type";
import { type Pagination } from "./pagination.type";
import { type Table } from "./table.type";

export interface OrderParams {
  search?: string;
  status?: string;
  orderType?: string;
  paymentMethod?: string;
  page?: number;
  limit?: number;
}

export type OrderType = "DINEIN" | "TAKEAWAY";
export type OrderStatus = "NEW" | "DONE" | "PAID" | "CANCELLED";
export type OrderItemStatus = "NEW" | "DONE" | "CANCELLED";

export interface OrderItem {
  orderItemId: string;
  menuId: string;
  menuName: string;
  quantity: number;
  price: number;
  note: string;
  subTotal: number;
  status: OrderItemStatus;
  cancelReason: string;
  createdAt: string;
  readyAt: string;
}

export interface Order {
  _id: string;
  orderId: string;
  status: OrderStatus;
  orderType: OrderType;
  totalPrice: number;
  grandTotalPrice: number;
  vatRate: number | null;
  taxAmount: number | null;
  orderItems: OrderItem[];
  paymentMethod: PaymentMethod;
  cashAmount: number;
  transferAmount: number;
  table: Table;
  cancelReason: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  orders: Order[];
  pagination: Pagination;
}
