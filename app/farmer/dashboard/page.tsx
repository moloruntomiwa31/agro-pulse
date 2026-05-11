"use client";

import { ChevronDown, Zap, Check } from "lucide-react";
import { useEffect, useState } from "react";
import KPICards from "../../../components/farmer/dashboard/KPICards";
import BuyerActivity from "../../../components/farmer/dashboard/BuyerActivity";
import RecentOrders from "../../../components/farmer/dashboard/RecentOrders";
import { useInventoryStore } from "../../../lib/store/inventoryStore";

export default function FarmerDashboard() {
  const [mounted, setMounted] = useState(false);
  const { setAddModalOpen } = useInventoryStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <h1 className="text-2xl font-bold text-stone-900 mb-1">Farm Performance Overview</h1>
            <p className="text-sm text-stone-500">AI-driven predictive analysis and real-time logistics tracking.</p>
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
               <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-widest">
                 <Zap size={12} /> High Demand
               </div>
             </div>
             
             <div className="h-48 flex items-end justify-between gap-2 px-2 pb-6 border-b border-stone-100 relative">
               <div className="absolute top-4 left-0 right-0 border-t border-dashed border-stone-200" />
               <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-stone-200" />
               
               {[40, 50, 45, 60, 95, 80, 55].map((height, i) => (
                 <div key={i} className="w-full relative group">
                   {i === 4 && (
                     <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs font-bold py-1 px-3 rounded-lg whitespace-nowrap z-10 shadow-md">
                       +24% Expected
                       <div className="absolute bottom-[-4px] left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
                     </div>
                   )}
                   <div 
                     className={`w-full rounded-t-lg transition-all duration-300 ${i === 4 ? "bg-forest-950" : "bg-stone-100 group-hover:bg-stone-200"}`} 
                     style={{ height: `${height}%` }}
                   />
                 </div>
               ))}
             </div>

             <div className="flex gap-4 pt-6">
               <div className="flex-1 bg-stone-50 rounded-xl p-4 border border-stone-100">
                 <div className="flex items-center gap-2 mb-2">
                   <Zap size={14} className="text-orange-500" />
                   <span className="text-xs font-bold text-stone-900 uppercase tracking-widest">Prediction</span>
                 </div>
                 <p className="text-sm font-semibold text-stone-900">Bell Peppers demand up 24%</p>
                 <p className="text-xs text-stone-500 mt-1">Retailers in Sector 4 seeking fresh harvests by Wednesday.</p>
               </div>
               <div className="flex-1 bg-forest-50/50 rounded-xl p-4 border border-forest-100">
                 <div className="flex items-center gap-2 mb-2">
                   <Check size={14} className="text-forest-600" />
                   <span className="text-xs font-bold text-forest-700 uppercase tracking-widest">Recommendation</span>
                 </div>
                 <p className="text-sm font-semibold text-stone-900">Prepare 500kg additional stock</p>
                 <p className="text-xs text-stone-500 mt-1">Suggested harvest date: Tuesday morning for maximum freshness.</p>
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
