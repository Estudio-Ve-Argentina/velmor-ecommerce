"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  productId: number;
  variantId: number;
  name: string;
  variantName: string;
  price: number;
  quantity: number;
  image: string | null;
  maxStock: number | null;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeItem: (variantId: number) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.variantId === item.variantId
          );

          if (existingItem) {
            const newQuantity = existingItem.quantity + (item.quantity || 1);
            const maxQuantity = item.maxStock || Infinity;
            
            return {
              items: state.items.map((i) =>
                i.variantId === item.variantId
                  ? { ...i, quantity: Math.min(newQuantity, maxQuantity) }
                  : i
              ),
              isOpen: true,
            };
          }

          return {
            items: [...state.items, { ...item, quantity: item.quantity || 1 }],
            isOpen: true,
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter((i) => i.variantId !== variantId),
            };
          }

          return {
            items: state.items.map((i) => {
              if (i.variantId !== variantId) return i;
              const maxQuantity = i.maxStock || Infinity;
              return { ...i, quantity: Math.min(quantity, maxQuantity) };
            }),
          };
        });
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "velmor-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
