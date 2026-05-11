import { create } from 'zustand';
import { INITIAL_PRODUCTS } from './productStore';

export type CartItem = {
  id: string;
  name: string;
  farm: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
};

export type SubscriptionOption = 'none' | 'daily' | 'weekly' | 'monthly';

interface CheckoutState {
  items: CartItem[];
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
}

// Map the products with IDs 7, 8, 9 to CartItems to match the initial mockup
const initialCheckoutItems: CartItem[] = INITIAL_PRODUCTS
  .filter(p => p.id === 7 || p.id === 8 || p.id === 9)
  .map(p => {
    // Determine a dummy quantity
    const quantity = p.id === 7 ? 10 : p.id === 8 ? 30 : 20;
    const basePrice = parseFloat(p.price.replace('₦', ''));
    
    return {
      id: p.id.toString(),
      name: p.name,
      farm: p.farm,
      price: basePrice,
      unit: p.unit || 'kg',
      quantity: quantity,
      image: p.image || '',
    };
  });

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  items: initialCheckoutItems,
  shipping: 12500,
  serviceFee: 5000,
  subscriptionOption: 'none',

  subtotal: () => get().items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
  total: () => get().subtotal() + get().shipping + get().serviceFee,

  setSubscriptionOption: (option) => set({ subscriptionOption: option }),
  
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
