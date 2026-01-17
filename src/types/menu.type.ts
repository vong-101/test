import type { Category } from "./category.type";
import type { Pagination } from "./pagination.type";

export interface MenusParams {
  search?: string;
  categoryId?: string;
  available?: string;
  isActive?: string;
  page?: number;
  limit?: number;
}

export interface Menu {
  _id: string;
  menuId: string;
  name: string;
  category: Category;
  price: number;
  image: string | null;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MenuResponse {
  menus: Menu[];
  pagination: Pagination;
}
