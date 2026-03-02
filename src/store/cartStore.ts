import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { ISku } from '@/hooks/usePriceEstimation';
import { EBillingMode, EServerType } from '@/types/enums';

export interface ICartItem {
  id: string;
  serverType: EServerType;
  sku: ISku;
  extraRamGb: number;
  extraDiskGb: number;
  billingMode: EBillingMode;
  totalPrice: number;
}

interface ICartState {
  items: ICartItem[];
  addItem: (item: Omit<ICartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<ICartState>()(
  devtools(
    persist(
      (set) => ({
        items: [],
        addItem: (item) => set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }]
        })),
        removeItem: (id) => set((state) => ({
          items: state.items.filter(item => item.id !== id)
        })),
        clearCart: () => set({ items: [] }),
      }),
      {
        name: 'server-cart-storage',
      }
    ),
    { name: 'CartStore' }
  )
);
