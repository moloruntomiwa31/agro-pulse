import { TrendingUp, ChevronRight } from "lucide-react";

export default function DemandAlert() {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-amber-200 bg-amber-50 mb-5">
      <div className="mt-0.5 p-1.5 rounded-lg bg-amber-100">
        <TrendingUp size={14} className="text-amber-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-amber-700 mb-0.5">
          AI DEMAND ALERT
        </p>
        <p className="text-sm text-stone-700 leading-snug">
          Demand for{" "}
          <span className="text-amber-900 font-medium underline decoration-dotted cursor-pointer">
            Organic Tomato
          </span>{" "}
          is expected to spike by 40% in your region next week. Stock up now to avoid price increases.
        </p>
      </div>
      <button className="shrink-0 mt-0.5 text-stone-400 hover:text-stone-600 transition-colors">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
