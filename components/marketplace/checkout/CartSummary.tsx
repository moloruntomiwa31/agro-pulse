"use client";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";

export default function CartSummary() {
  const { items, updateQuantity, removeItem } = useCheckoutStore();

  return (
    <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-forest-950">Cart Summary</h2>
        <span className="text-sm font-medium text-stone-500">{items.length} Items Selected</span>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 bg-stone-50/50">
            <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-stone-200">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-stone-900 truncate">{item.name}</h3>
              <p className="text-xs text-stone-500 truncate">{item.farm}</p>
              <p className="text-xs font-semibold text-stone-600 mt-1">₦{item.price.toLocaleString()} / {item.unit}</p>
            </div>
            
            {/* Quantity Control */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-white border border-stone-200 rounded-lg p-0.5">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-1 hover:bg-stone-100 rounded-md text-stone-600 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-8 text-center text-sm font-bold text-stone-900">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-1 hover:bg-stone-100 rounded-md text-stone-600 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Price & Remove */}
            <div className="flex flex-col items-end gap-2 shrink-0 ml-2 w-20">
              <span className="text-base font-bold text-forest-950">₦{(item.price * item.quantity).toLocaleString()}</span>
              <button 
                onClick={() => removeItem(item.id)}
                className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                aria-label="Remove item"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
