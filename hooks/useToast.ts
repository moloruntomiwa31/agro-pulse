import { useToastStore, type ToastVariant } from "../lib/store/toastStore";

const DEFAULT_DURATION = 4000;

function fire(variant: ToastVariant) {
  return (message: string, duration = DEFAULT_DURATION) => {
    const { add, remove } = useToastStore.getState();
    const id = add({ message, variant, duration });
    setTimeout(() => remove(id), duration);
  };
}

export function useToast() {
  const toast = {
    success: fire("success"),
    error: fire("error"),
    info: fire("info"),
    default: fire("default"),
  };

  return { toast };
}
