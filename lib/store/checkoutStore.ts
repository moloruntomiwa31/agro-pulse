import { create } from 'zustand';

export type CartItem = {
  id: string;
  name: string;
  farm: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
  farmerId?: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'In Transit' | 'Delivered' | 'Payment Secured' | 'Harvested & Packed';
};

export type SubscriptionOption = 'none' | 'daily' | 'weekly' | 'monthly';

interface CheckoutState {
  items: CartItem[];
  orders: Order[];
  shipping: number;
  serviceFee: number;
  subscriptionOption: SubscriptionOption;
  
  // Computed
  subtotal: () => number;
  total: () => number;
  
  // Actions
  setSubscriptionOption: (option: SubscriptionOption) => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  items: [],
  orders: [],
  shipping: 12500,
  serviceFee: 5000,
  subscriptionOption: 'none',

  subtotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
  total: () => get().subtotal() + get().shipping + get().serviceFee,

  setSubscriptionOption: (option) => set({ subscriptionOption: option }),
  
  clearCart: () => set({ items: [] }),
  
  placeOrder: () => set((state) => {
    if (state.items.length === 0) return state;
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 100000)}`,
      items: [...state.items],
      total: get().total(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'In Transit'
    };
    return {
      orders: [newOrder, ...state.orders],
      items: [],
    };
  }),

  addItem: (item) => set((state) => {
    const existing = state.items.find(i => i.id === item.id);
    if (existing) {
      return {
        items: state.items.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
        )
      };
    }
    return { items: [...state.items, { ...item, quantity: item.quantity || 1 }] };
  }),
  
  removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
  
  updateQuantity: (id, quantity) => set((state) => ({
    items: quantity <= 0 
      ? state.items.filter(i => i.id !== id)
      : state.items.map(i => i.id === id ? { ...i, quantity } : i)
  })),
}));
