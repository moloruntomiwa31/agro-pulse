"use client";
import { TrendingUp, Sparkles, Box } from "lucide-react";
import { useDemandForecast } from "@/hooks/usePrediction";

export default function DemandForecastSection({ produceId }: { produceId: string }) {
  const { data: response, isLoading } = useDemandForecast(produceId);

  if (isLoading) return null;
  if (!response?.demand_forecast) return null;

  const forecast = response.demand_forecast;
  const spikeProb = parseFloat(forecast.demand_spike_probability);
  
  // Use spike probability to determine "High Demand" visual
  const isHighDemand = spikeProb > 70;
  const trendColor = isHighDemand ? "text-forest-600 bg-forest-50 border-forest-100" : "text-stone-600 bg-stone-50 border-stone-100";

  return (
		<div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex flex-col gap-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5">
					<div className="p-1.5 rounded-lg bg-white border border-stone-200 shadow-sm">
						<TrendingUp size={12} className="text-forest-600" />
					</div>
					<span className="text-[10px] font-bold uppercase text-stone-500">
						AI Market Insight
					</span>
				</div>
				<div
					className={`px-2 py-0.5 whitespace-nowrap rounded-full border font-bold flex items-center gap-1 ${trendColor}`}
				>
					<Sparkles
						size={10}
						className={isHighDemand ? "text-amber-500" : "text-stone-400"}
					/>
					<span className="text-[8px]">{isHighDemand ? "High Demand" : "Stable Demand"}</span>
				</div>
			</div>

			<div>
				<p className="text-xs text-stone-600 leading-relaxed mb-3">
					Our AI predicts a{" "}
					<span className="font-bold text-stone-900">
						{spikeProb.toFixed(0)}% chance
					</span>{" "}
					of a demand spike for this product {forecast.forecast_period}.
				</p>

				<div className="grid grid-cols-2 gap-3">
					<div className="bg-white p-2.5 rounded-xl border border-stone-100 shadow-sm">
						<div className="flex items-center gap-1.5 mb-1">
							<TrendingUp size={10} className="text-forest-600" />
							<p className="text-[8px] whitespace-nowrap font-semibold text-stone-400 uppercase">
								Predicted Vol.
							</p>
						</div>
						<p className="text-sm font-bold text-stone-900">
							{forecast.predicted_demand_volume} units
						</p>
					</div>

					<div className="bg-white p-2.5 rounded-xl border border-stone-100 shadow-sm">
						<div className="flex items-center gap-1.5 mb-1">
							<Box size={10} className="text-amber-600" />
							<p className="text-[8px] whitespace-nowrap font-semibold text-stone-400 uppercase">
								Rec. Stock
							</p>
						</div>
						<p className="text-sm font-bold text-stone-900">
							{forecast.recommended_stock_level} units
						</p>
					</div>
				</div>
			</div>

			<p className="text-[9px] text-stone-400 italic">
				Generated on {new Date(forecast.generated_at).toLocaleDateString()}
			</p>
		</div>
	);
}
