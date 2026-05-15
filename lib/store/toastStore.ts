import { create } from 'zustand';

export type ToastVariant = "success" | "error" | "info" | "default";
export type ToastType = ToastVariant;

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number;
}

interface ToastState {
  // Single toast support
  message: string | null;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;

  // Multi-toast queue support (for Toaster.tsx)
  toasts: Toast[];
  add: (message: string, variant?: ToastVariant, duration?: number) => void;
  remove: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: 'info',
  toasts: [],

  showToast: (message, type = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const safeMessage = typeof message === 'object' ? JSON.stringify(message) : String(message);
    set((state) => ({
      message: safeMessage,
      type,
      toasts: [...state.toasts, { id, message: safeMessage, variant: type, duration: 4000 }]
    }));


    setTimeout(() => {
      set((state) => ({
        message: state.message === message ? null : state.message,
        toasts: state.toasts.filter(t => t.id !== id)
      }));
    }, 4000);
  },

  hideToast: () => set({ message: null }),

  add: (message, variant = "default", duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const safeMessage = typeof message === 'object' ? JSON.stringify(message) : String(message);
    set((state) => ({
      toasts: [...state.toasts, { id, message: safeMessage, variant, duration }]
    }));


    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, duration);
  },

  remove: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
