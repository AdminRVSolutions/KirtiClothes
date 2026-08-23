import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: number;
  productId: number; // to allow multiple items with same product id but different variants
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (item) => set((state) => {
        // Check if item with same product, color, and size exists
        const existingItemIndex = state.items.findIndex(
          i => i.productId === item.productId && i.color === item.color && i.size === item.size
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }
        
        // Ensure unique ID for cart item
        const newItem = { ...item, id: Date.now() + Math.floor(Math.random() * 1000) };
        return { items: [...state.items, newItem] };
      }),
      removeItem: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        items: state.items.map(item => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
      })),
      clearCart: () => set({ items: [] })
    }),
    {
      name: 'kirti-cart-storage',
    }
  )
);
