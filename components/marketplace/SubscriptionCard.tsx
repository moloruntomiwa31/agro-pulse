import { Truck, Bell } from "lucide-react";

export default function SubscriptionCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-forest-200 bg-gradient-to-br from-forest-50 to-white relative">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=60')" }}
      />
      <div className="relative p-4">
        <div className="flex items-center gap-1.5 mb-2">
          <Truck size={12} className="text-forest-600" />
          <span className="text-[10px] font-semibold uppercase tracking-widest text-forest-700">
            Weekly Fresh Box
          </span>
        </div>
        <p className="text-sm font-semibold text-stone-900 mb-1 leading-snug">
          Never run out of essentials
        </p>
        <p className="text-xs text-stone-600 mb-4 leading-relaxed">
          Get a curation of seasonal produce delivered every Tuesday with 70% available at market prices.
        </p>
        <button className="w-full py-2 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold transition-colors mb-2">
          Subscribe Now
        </button>
        <button className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:bg-stone-50 transition-colors">
          <Bell size={11} />
          Learn More
        </button>
      </div>
    </div>
  );
}
