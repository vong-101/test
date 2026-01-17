import type { Pagination } from "./pagination.type";

export interface CategoryParams {
  search?: string;
  isActive?: string | null;
  page?: number;
  limit?: number;
}

export interface Category {
  _id: string;
  categoryId: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination: Pagination;
}
