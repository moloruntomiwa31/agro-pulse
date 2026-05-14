"use client";
import { useToastStore } from "@/lib/store/toastStore";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const { message, type, hideToast } = useToastStore();

  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl bg-stone-900 text-white shadow-xl border border-stone-800 animate-slide-up transition-all">
      {type === 'success' && <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />}
      {type === 'error' && <AlertCircle size={18} className="text-red-400 shrink-0" />}
      {type === 'info' && <Info size={18} className="text-blue-400 shrink-0" />}
      <span className="text-sm font-medium pr-2">{message}</span>
      <button onClick={hideToast} className="text-stone-400 hover:text-white transition-colors">
        <X size={14} />
      </button>
    </div>
  );
}
