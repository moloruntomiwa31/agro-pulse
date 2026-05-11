import { create } from 'zustand';
import { INITIAL_PRODUCTS } from './productStore';

export type CartItem = {
  id: string;
  name: string;
  farm: string;
  price: number;
  weight: number;
  image: string;
};

export type PaymentMethod = 'credit_card' | 'mobile_money';

export type SubscriptionOption = 'none' | 'daily' | 'weekly' | 'monthly';

interface CheckoutState {
  items: CartItem[];
  shipping: number;
  serviceFee: number;
  paymentMethod: PaymentMethod;
  subscriptionOption: SubscriptionOption;
  
  // Computed
  subtotal: () => number;
  total: () => number;
  
  // Actions
  setPaymentMethod: (method: PaymentMethod) => void;
  setSubscriptionOption: (option: SubscriptionOption) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
}

// Map the products with IDs 7, 8, 9 to CartItems to match the initial mockup
const initialCheckoutItems: CartItem[] = INITIAL_PRODUCTS
  .filter(p => p.id === 7 || p.id === 8 || p.id === 9)
  .map(p => {
    // Determine a dummy weight and total price to match the visual design
    const weight = p.id === 7 ? 500 : p.id === 8 ? 200 : 100;
    const price = p.id === 7 ? 225.00 : p.id === 8 ? 240.00 : 210.00;
    
    return {
      id: p.id.toString(),
      name: p.name,
      farm: p.farm,
      price: price,
      weight: weight,
      image: p.image || '',
    };
  });

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  items: initialCheckoutItems,
  shipping: 12.50,
  serviceFee: 5.00,
  paymentMethod: 'credit_card',
  subscriptionOption: 'none',

  subtotal: () => get().items.reduce((acc, item) => acc + item.price, 0),
  total: () => get().subtotal() + get().shipping + get().serviceFee,

  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setSubscriptionOption: (option) => set({ subscriptionOption: option }),
  addItem: (item) => set((state) => ({ items: [...state.items, item] })),
  removeItem: (id) => set((state) => ({ items: state.items.filter(item => item.id !== id) })),
}));
