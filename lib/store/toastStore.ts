import { create } from "zustand";

export type ToastVariant = "success" | "error" | "info" | "default";

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration: number; // ms
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, "id">) => string;
  remove: (id: string) => void;
}

let counter = 0;

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) => {
    const id = `toast-${++counter}`;
    set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }));
    return id;
  },
  remove: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
