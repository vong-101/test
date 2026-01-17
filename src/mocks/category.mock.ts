import { type Category } from "../types/category.type";

export const MOCK_CATEGORIES: Category[] = [
  {
    _id: "cat1",
    categoryId: "CAT-001",
    name: "กับข้าว",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cat2",
    categoryId: "CAT-002",
    name: "ต้ม/แกง",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cat3",
    categoryId: "CAT-003",
    name: "ของทานเล่น",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cat4",
    categoryId: "CAT-004",
    name: "เครื่องดื่ม",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: "cat5",
    categoryId: "CAT-005",
    name: "ของหวาน",
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
