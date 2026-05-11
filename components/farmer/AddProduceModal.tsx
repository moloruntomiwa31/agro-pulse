"use client";

import { X } from "lucide-react";
import { useInventoryStore } from "../../lib/store/inventoryStore";
import QuickUploadForm from "./inventory/QuickUploadForm";

export default function AddProduceModal() {
  const { isAddModalOpen, setAddModalOpen } = useInventoryStore();

  if (!isAddModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm">
      <div className="relative w-full max-w-md">
        {/* Close button */}
        <button 
          onClick={() => setAddModalOpen(false)}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        
        {/* We reuse the QuickUploadForm here */}
        <QuickUploadForm />
      </div>
    </div>
  );
}
