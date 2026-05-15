"use client";

import { ChevronDown, Zap, Check } from "lucide-react";
import { useEffect, useState } from "react";
import KPICards from "../../../components/farmer/dashboard/KPICards";
import BuyerActivity from "../../../components/farmer/dashboard/BuyerActivity";
import RecentOrders from "../../../components/farmer/dashboard/RecentOrders";
import { useInventoryStore } from "../../../lib/store/inventoryStore";
import { useMyProduces } from "@/hooks/useProduce";
import { useDemandForecast } from "@/hooks/usePrediction";
import { Loader2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";



export function useDashboardUser() {
  return useAuthStore((state) => state.user);
}

export default function FarmerDashboard() {
  const [mounted, setMounted] = useState(false);
  const user = useDashboardUser();
  const { setAddModalOpen } = useInventoryStore();
  const { data: produces, isLoading: loadingProduces } = useMyProduces();
  
  // Get prediction for the first produce item if it exists
  const firstProduceId = produces?.results?.[0]?.id;
  const { data: predictionResponse, isLoading: loadingPrediction } = useDemandForecast(firstProduceId || "");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const forecast = predictionResponse?.demand_forecast;
  const spikeProb = forecast ? parseFloat(forecast.demand_spike_probability) : 0;
  const isHighDemand = spikeProb > 70;


  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-stone-900 mb-1 font-display tracking-tight">
              {user?.full_name ? `${user.full_name}'s Farm` : "Farm Performance"}
            </h1>
            <p className="text-sm text-stone-500 font-medium">
              Connected as <span className="text-forest-600 font-bold uppercase text-[10px] tracking-widest">{user?.role || "Seller"}</span> · AI-driven predictive analysis active.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-stone-600 bg-white border border-stone-200 px-4 py-2 rounded-xl">
              Last 30 Days <ChevronDown size={14} />
            </div>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
            >
              + List New Produce
            </button>
          </div>
        </div>

        {/* Top KPI Cards */}
        <KPICards />

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Demand Insights */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:col-span-2">
             <div className="flex justify-between items-center mb-6">
               <h2 className="text-lg font-bold text-stone-900">AI Demand Insights</h2>
               {forecast ? (
                 <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${isHighDemand ? 'bg-orange-50 border-orange-100 text-orange-700' : 'bg-forest-50 border-forest-100 text-forest-700'}`}>
                   <Zap size={12} className={isHighDemand ? "animate-pulse" : ""} /> {isHighDemand ? 'High Demand' : 'Stable Demand'}
                 </div>
               ) : (
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">No Active Forecast</div>
               )}
             </div>
             
             {loadingPrediction || loadingProduces ? (
               <div className="h-48 flex items-center justify-center border-b border-stone-100">
                 <Loader2 className="animate-spin text-stone-300" size={32} />
               </div>
             ) : forecast ? (
               <div className="h-48 flex items-end justify-between gap-2 px-2 pb-6 border-b border-stone-100 relative">
                 <div className="absolute top-4 left-0 right-0 border-t border-dashed border-stone-200" />
                 <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-stone-200" />
                 
                 {[40, 50, 45, 60, 95, 80, 55].map((height, i) => (
                   <div key={i} className="w-full relative group">
                     {i === 4 && (
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[10px] font-bold py-1 px-3 rounded-lg whitespace-nowrap z-10 shadow-md">
                         +{spikeProb.toFixed(0)}% Spike Prob.
                         <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
                       </div>
                     )}
                     <div 
                       className={`w-full rounded-t-lg transition-all duration-300 ${i === 4 ? (isHighDemand ? "bg-orange-500" : "bg-forest-950") : "bg-stone-100 group-hover:bg-stone-200"}`} 
                       style={{ height: `${i === 4 ? spikeProb : height}%` }}
                     />
                   </div>
                 ))}
               </div>
             ) : (
               <div className="h-48 flex flex-col items-center justify-center border-b border-stone-100 text-stone-400">
                 <Zap size={32} className="mb-2 opacity-20" />
                 <p className="text-sm font-medium">Add produce to see AI demand insights</p>
               </div>
             )}

             <div className="flex gap-4 pt-6">
               <div className="flex-1 bg-stone-50 rounded-xl p-4 border border-stone-100">
                 <div className="flex items-center gap-2 mb-2">
                   <Zap size={14} className="text-orange-500" />
                   <span className="text-xs font-bold text-stone-900 uppercase tracking-widest">Prediction</span>
                 </div>
                 <p className="text-sm font-semibold text-stone-900">
                    {forecast ? `${produces?.results?.[0]?.name} demand spike: ${spikeProb.toFixed(0)}%` : "N/A"}
                 </p>
                 <p className="text-xs text-stone-500 mt-1">
                    {forecast ? `Probability detected for this ${forecast.forecast_period}.` : "No current predictions for your inventory."}
                 </p>
               </div>
               <div className="flex-1 bg-forest-50/50 rounded-xl p-4 border border-forest-100">
                 <div className="flex items-center gap-2 mb-2">
                   <Check size={14} className="text-forest-600" />
                   <span className="text-xs font-bold text-forest-700 uppercase tracking-widest">Recommendation</span>
                 </div>
                 <p className="text-sm font-semibold text-stone-900">
                    {forecast ? `Target Stock: ${forecast.recommended_stock_level} units` : "N/A"}
                 </p>
                 <p className="text-xs text-stone-500 mt-1">
                    {forecast ? `Maintain this level to meet the predicted volume of ${forecast.predicted_demand_volume} units.` : "List your first product to get AI recommendations."}
                 </p>
               </div>
             </div>
          </div>

          {/* Buyer Activity */}
          <BuyerActivity />
        </div>

        {/* Recent Orders */}
        <RecentOrders />

      </div>
    </div>
  );
}
