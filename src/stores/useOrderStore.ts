import { create } from "zustand";
import type { Menu } from "@/types/menu.type";

export interface OrderItem extends Menu {
  quantity: number;
  note?: string;
}

interface OrderState {
  items: OrderItem[];
  addToCart: (menu: Menu, quantity?: number, note?: string) => void;
  removeFromCart: (menuId: string, note?: string) => void;
  updateQuantity: (menuId: string, quantity: number, note?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useOrderStore = create<OrderState>((set, get) => ({
  items: [],
  addToCart: (menu, quantity = 1, note) => {
    set((state) => {
      // Find item with same ID AND same note
      const existingItem = state.items.find(
        (item) => item._id === menu._id && item.note === note
      );

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item._id === menu._id && item.note === note
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }
      return { items: [...state.items, { ...menu, quantity, note }] };
    });
  },
  removeFromCart: (menuId, note) => {
    set((state) => ({
      items: state.items.filter(
        (item) => !(item._id === menuId && item.note === note)
      ),
    }));
  },
  updateQuantity: (menuId, quantity, note) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (item) => !(item._id === menuId && item.note === note)
          ),
        };
      }
      return {
        items: state.items.map((item) =>
          item._id === menuId && item.note === note
            ? { ...item, quantity }
            : item
        ),
      };
    });
  },
  clearCart: () => set({ items: [] }),
  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));
