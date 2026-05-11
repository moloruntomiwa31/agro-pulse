"use client";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";

export default function PaymentDistribution() {
  const { total } = useCheckoutStore();
  const currentTotal = total();

  return (
    <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
      <h2 className="text-lg font-bold text-forest-950 mb-5">Payment Distribution</h2>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Split Payment Logic</span>
        <span className="text-xs font-bold text-stone-700">Total Escrow: ₦{currentTotal.toLocaleString()}</span>
      </div>
      
      {/* Progress bar representing split */}
      <div className="h-3 rounded-full flex overflow-hidden mb-5">
        <div className="bg-forest-900" style={{ width: '75%' }}></div>
        <div className="bg-emerald-600" style={{ width: '15%' }}></div>
        <div className="bg-amber-700" style={{ width: '10%' }}></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="p-3 border border-stone-200 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-forest-900"></div>
            <span className="text-xs font-bold text-stone-700">Farmer</span>
          </div>
          <div className="text-lg font-black text-forest-950">₦{(currentTotal * 0.75).toLocaleString()}</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Produce & Labor</div>
        </div>
        <div className="p-3 border border-stone-200 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
            <span className="text-xs font-bold text-stone-700">Transporter</span>
          </div>
          <div className="text-lg font-black text-forest-950">₦{(currentTotal * 0.15).toLocaleString()}</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Logistics Fee</div>
        </div>
        <div className="p-3 border border-stone-200 rounded-xl">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-2 h-2 rounded-full bg-amber-700"></div>
            <span className="text-xs font-bold text-stone-700">Cooperative</span>
          </div>
          <div className="text-lg font-black text-forest-950">₦{(currentTotal * 0.10).toLocaleString()}</div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Platform & Admin</div>
        </div>
      </div>
    </section>
  );
}
