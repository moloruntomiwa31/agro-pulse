"use client";
import { Sparkles, Calendar as CalendarIcon } from "lucide-react";
import { useBuyerReturnPrediction } from "@/hooks/usePrediction";

export default function BuyerReturnCell({ buyerId, produceId }: { buyerId: string; produceId: string }) {
  const { data: prediction, isLoading } = useBuyerReturnPrediction(buyerId, produceId);

  if (isLoading) return <div className="animate-pulse h-4 w-20 bg-stone-100 rounded" />;
  if (!prediction) return <span className="text-xs text-stone-400">-</span>;

  const confidenceColor = prediction.confidence > 0.8 ? "text-forest-600" : prediction.confidence > 0.5 ? "text-amber-600" : "text-stone-400";

  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <CalendarIcon size={12} className="text-forest-600" />
        <span className="text-xs font-bold text-stone-900">
          {new Date(prediction.predicted_return_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </span>
      </div>
      <div className="flex items-center gap-1">
        <Sparkles size={10} className="text-amber-500" />
        <span className={`text-[9px] font-bold uppercase tracking-tighter ${confidenceColor}`}>
          {(prediction.confidence * 100).toFixed(0)}% Confidence
        </span>
      </div>
    </div>
  );
}
