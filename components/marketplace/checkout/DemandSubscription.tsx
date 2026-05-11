"use client";
import { Sparkles } from "lucide-react";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";

export default function DemandSubscription() {
  const { subscriptionOption, setSubscriptionOption } = useCheckoutStore();

  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-2xl p-6 border-l-4 border-amber-400 border-y border-r border-y-amber-100 border-r-amber-100 shadow-sm relative overflow-hidden">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={18} className="text-amber-500" />
        <h2 className="text-lg font-bold text-amber-900">AI Predicted Demand</h2>
      </div>
      <p className="text-sm text-stone-700 leading-relaxed mb-5 max-w-2xl">
        Based on historical data, potato demand is expected to spike by 15% in your region next week. Would you like to secure a recurring supply?
      </p>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200 flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Subscription Option</span>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-stone-900">Convert to Weekly Supply</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={subscriptionOption === 'weekly'}
              onChange={(e) => setSubscriptionOption(e.target.checked ? 'weekly' : 'none')}
            />
            <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-500"></div>
          </label>
          <span className="text-xs font-semibold text-stone-500 ml-2">Daily / Weekly / Monthly</span>
        </div>
      </div>
    </section>
  );
}
