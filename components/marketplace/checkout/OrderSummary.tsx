"use client";
import { ShieldCheck } from "lucide-react";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";

export default function OrderSummary() {
  const { subtotal, total, shipping, serviceFee } = useCheckoutStore();

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
      <h2 className="text-lg font-bold text-forest-950 mb-5">Order Summary</h2>

      {/* Order Summary Math */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-stone-500 font-medium">Subtotal</span>
          <span className="font-mono font-medium text-stone-900">₦{subtotal().toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-stone-500 font-medium">Shipping (est.)</span>
          <span className="font-mono font-medium text-stone-900">₦{shipping.toLocaleString()}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-stone-500 font-medium">Service Fee</span>
          <span className="font-mono font-medium text-stone-900">₦{serviceFee.toLocaleString()}</span>
        </div>
      </div>
      
      <div className="flex justify-between items-end mb-6">
        <span className="text-base font-bold text-forest-950">Total Due</span>
        <span className="text-2xl font-black text-forest-950">₦{total().toLocaleString()}</span>
      </div>

      <button className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
        <ShieldCheck size={18} />
        Process Secure Payment
      </button>
      <p className="text-[10px] text-center text-stone-500 mt-3 font-medium">
        Powered by Squad API + Secure Escrow Enabled
      </p>

      {/* Trust Badge */}
      <div className="mt-6 bg-forest-100/50 border border-forest-200/60 rounded-xl p-4 flex items-start gap-3">
        <div className="bg-white rounded-full p-1 border border-forest-200 shadow-sm shrink-0">
          <ShieldCheck size={16} className="text-forest-600" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-forest-950 mb-0.5">Farm Trust Certified</h4>
          <p className="text-[10px] text-forest-800/80 leading-relaxed">
            Your payment is held in escrow until you confirm produce quality upon delivery.
          </p>
        </div>
      </div>
    </div>
  );
}
