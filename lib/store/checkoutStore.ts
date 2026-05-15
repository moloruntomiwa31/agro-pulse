import { create } from "zustand";
import { createOrder } from "@/lib/api/order";
import { useAuthStore } from "@/lib/store/authStore";

export type CartItem = {
  id: string;
  name: string;
  farm: string;
  farmerId: string;
  price: number;
  unit: string;
  quantity: number;
  image: string;
};

export type SubscriptionOption = "none" | "daily" | "weekly" | "monthly";

/** Returned by addItem when the cart already has items from a different farmer */
export type AddItemResult =
  | { success: true }
  | { success: false; conflict: true; currentFarm: string; currentFarmerId: string };

interface CheckoutState {
  items: CartItem[];
  shipping: number;
  serviceFee: number;
  subscriptionOption: SubscriptionOption;

  // Active farmer — all items in cart must belong to this farmer
  activeFarmerId: string | null;
  activeFarmerName: string | null;

  // Computed
  subtotal: () => number;
  total: () => number;

  // Actions
  setSubscriptionOption: (option: SubscriptionOption) => void;
  /**
   * Add an item to the cart.
   * Returns { success: false, conflict: true } if the item belongs to a different farmer.
   * Call clearCart() first if the user confirms they want to switch farmers.
   */
  addItem: (
    item: Omit<CartItem, "quantity"> & { quantity?: number }
  ) => AddItemResult;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  /** Calls POST /api/orders/ then clears the cart on success */
  placeOrder: (deliveryType: "PICKUP" | "DELIVERY") => Promise<import("@/types/order").Order>;
}

export const useCheckoutStore = create<CheckoutState>((set, get) => ({
  items: [],
  shipping: 12500,
  serviceFee: 5000,
  subscriptionOption: "none",
  activeFarmerId: null,
  activeFarmerName: null,

  subtotal: () =>
    get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
  total: () => get().subtotal() + get().shipping + get().serviceFee,

  setSubscriptionOption: (option) => set({ subscriptionOption: option }),

  clearCart: () =>
    set({ items: [], activeFarmerId: null, activeFarmerName: null }),

  addItem: (item) => {
    const state = get();
    const { activeFarmerId } = state;

    // Cart has items from a different farmer — return conflict
    if (activeFarmerId && activeFarmerId !== item.farmerId) {
      return {
        success: false,
        conflict: true,
        currentFarm: state.activeFarmerName ?? "another farmer",
        currentFarmerId: activeFarmerId,
      };
    }

    set((s) => {
      const existing = s.items.find((i) => i.id === item.id);
      const newItems = existing
        ? s.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
              : i
          )
        : [...s.items, { ...item, quantity: item.quantity ?? 1 }];

      return {
        items: newItems,
        activeFarmerId: item.farmerId,
        activeFarmerName: item.farm,
      };
    });

    return { success: true };
  },

  removeItem: (id) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.id !== id);
      return {
        items: newItems,
        activeFarmerId: newItems.length === 0 ? null : state.activeFarmerId,
        activeFarmerName: newItems.length === 0 ? null : state.activeFarmerName,
      };
    }),

  updateQuantity: (id, quantity) =>
    set((state) => {
      const newItems =
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, quantity } : i));
      return {
        items: newItems,
        activeFarmerId: newItems.length === 0 ? null : state.activeFarmerId,
        activeFarmerName: newItems.length === 0 ? null : state.activeFarmerName,
      };
    }),

  placeOrder: async (deliveryType) => {
    const state = get();
    if (state.items.length === 0 || !state.activeFarmerId) {
      throw new Error("Cart is empty or no farmer selected");
    }

    const user = useAuthStore.getState().user;
    const buyerId = (user?.buyer_profile as Record<string, unknown> | null)?.id as string | undefined;

    if (!buyerId) throw new Error("Buyer profile not found. Please complete your profile.");

    const total = get().subtotal().toFixed(2);

    const order = await createOrder({
      buyer: buyerId,
      farmer: state.activeFarmerId,
      total,
      delivery_type: deliveryType,
    });

    set({ items: [], activeFarmerId: null, activeFarmerName: null });
    return order;
  },
}));
