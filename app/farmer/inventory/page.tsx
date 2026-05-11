"use client";

import { Download, Plus, Zap, Calendar, Truck, PackageOpen, LayoutGrid, CheckCircle2, TrendingUp, Search } from "lucide-react";
import { useInventoryStore } from "../../../lib/store/inventoryStore";

export default function FarmerInventory() {
  const { items, setAddModalOpen } = useInventoryStore();

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <PackageOpen size={16} className="text-forest-600" />
               <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Stock Management</span>
            </div>
            <h1 className="text-2xl font-bold text-stone-900 mb-1">Produce Inventory</h1>
            <p className="text-sm text-stone-500">Manage current stock, harvest cycles, and demand-driven supply.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl transition-colors">
              <Download size={16} /> Export CSV
            </button>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm flex items-center gap-2 text-sm"
            >
              <Plus size={16} /> Add Produce
            </button>
          </div>
        </div>

        {/* Top Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* AI Early Harvest Recommendation */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:col-span-2 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-60" />
            
            <div className="flex items-center gap-2 mb-4">
              <Zap size={16} className="text-orange-500" />
              <span className="text-[10px] font-bold text-orange-600 uppercase tracking-widest">Predictive Insight</span>
            </div>
            
            <h2 className="text-lg font-bold text-stone-900 mb-2">Early Harvest Recommendation</h2>
            <p className="text-sm text-stone-500 mb-6 max-w-lg leading-relaxed">
              Our AI engine predicts a <strong className="text-stone-900">24% demand spike</strong> for Organic Roma Tomatoes in the metropolitan area next week. We recommend adjusting your harvest schedule 2 days earlier to capture premium pricing.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-6">
               <div className="bg-orange-50 border border-orange-100 rounded-xl px-4 py-3 min-w-[140px]">
                 <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-1">Est. Revenue Increase</p>
                 <p className="text-lg font-black text-orange-700">+₦1,240,000</p>
               </div>
               <div className="bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 min-w-[140px]">
                 <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-1">Optimal Window</p>
                 <p className="text-base font-bold text-stone-900">Oct 12 - Oct 14</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-sm">
                Apply Schedule
              </button>
              <button className="text-forest-700 font-semibold text-sm hover:underline">
                View Data Basis
              </button>
            </div>
          </div>

          {/* Trust Score & Pending Stats */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex-1 flex flex-col items-center justify-center text-center">
               <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Farm Trust Score</p>
               <div className="relative w-24 h-24 mb-4">
                 <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
                   <path className="text-stone-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                   <path className="text-forest-600" strokeDasharray="90, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                 </svg>
                 <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <span className="text-3xl font-black text-stone-900 leading-none">90</span>
                   <span className="text-[10px] font-bold text-forest-600 uppercase tracking-widest mt-1">Gold</span>
                 </div>
               </div>
               <p className="text-xs font-medium text-stone-500 leading-tight">Top 5% of suppliers this month based on reliability.</p>
            </div>
            
            <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-900">Pending Orders</span>
              <span className="w-8 h-8 rounded-full bg-forest-950 text-white flex items-center justify-center text-xs font-bold">12</span>
            </div>
          </div>
        </div>

        {/* Lower Grid: Active Inventory */}
        <div className="grid grid-cols-1 gap-6">

          {/* Active Inventory */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-0 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-stone-900">Active Inventory</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-500 transition-colors">
                  <Search size={14} />
                </button>
                <button className="p-2 border border-stone-200 rounded-lg hover:bg-stone-50 text-stone-500 transition-colors">
                  <LayoutGrid size={14} />
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest py-4 px-6 bg-stone-50/50">Produce Details</th>
                    <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest py-4 px-6 bg-stone-50/50">Status</th>
                    <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest py-4 px-6 bg-stone-50/50">Quantity</th>
                    <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest py-4 px-6 bg-stone-50/50">Harvest Date</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {items.map((row, i) => {
                    const statusColors = {
                      'Available': 'bg-forest-50 text-forest-700 border-forest-200',
                      'Low Stock': 'bg-red-50 text-red-700 border-red-200',
                      'Growing': 'bg-stone-100 text-stone-700 border-stone-200'
                    };
                    const sc = statusColors[row.status] || statusColors['Growing'];

                    return (
                      <tr key={i} className="border-b border-stone-100 last:border-0 hover:bg-stone-50 transition-colors group">
                        <td className="py-4 px-6">
                          <p className="font-bold text-stone-900">{row.name}</p>
                          <p className="text-[10px] text-stone-500 mt-0.5">{row.type} • {row.id}</p>
                        </td>
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${sc}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 font-semibold text-stone-700">{row.qty}</td>
                        <td className="py-4 px-6 font-medium text-stone-500">{row.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50">
               <p className="text-xs font-medium text-stone-500">Showing 3 of 18 produce types</p>
               <div className="flex items-center gap-2">
                 <button className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 bg-white hover:bg-stone-50">Previous</button>
                 <button className="px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-semibold text-stone-600 bg-white hover:bg-stone-50">Next</button>
               </div>
            </div>
          </div>

        </div>
        
        {/* Supply Chain Workflow Tracking */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 mb-6">
           <h2 className="text-sm font-bold text-stone-900 mb-6">Supply Chain Workflow Tracking</h2>
           
           <div className="relative flex justify-between items-center px-12 max-w-3xl mx-auto">
             <div className="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-0.5 bg-stone-100 z-0" />
             <div className="absolute left-16 right-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-forest-500 z-0" />
             
             <div className="flex flex-col items-center gap-3 relative z-10">
               <div className="w-12 h-12 rounded-full bg-forest-950 text-white flex items-center justify-center shadow-[0_0_0_4px_white]">
                 <CheckCircle2 size={20} />
               </div>
               <div className="text-center">
                 <p className="text-xs font-bold text-stone-900">Inventory Listed</p>
                 <p className="text-[10px] text-stone-500 mt-0.5">Completed</p>
               </div>
             </div>

             <div className="flex flex-col items-center gap-3 relative z-10">
               <div className="w-12 h-12 rounded-full bg-forest-600 text-white flex items-center justify-center shadow-[0_0_0_4px_white]">
                 <Zap size={20} />
               </div>
               <div className="text-center">
                 <p className="text-xs font-bold text-stone-900">AI Analysis</p>
                 <p className="text-[10px] text-stone-500 mt-0.5">Optimal Ready</p>
               </div>
             </div>

             <div className="flex flex-col items-center gap-3 relative z-10">
               <div className="w-12 h-12 rounded-full bg-white border-2 border-stone-200 text-stone-400 flex items-center justify-center shadow-[0_0_0_4px_white]">
                 <Truck size={20} />
               </div>
               <div className="text-center">
                 <p className="text-xs font-bold text-stone-400">Logistics Sync</p>
                 <p className="text-[10px] text-stone-400 mt-0.5">Pending</p>
               </div>
             </div>

             <div className="flex flex-col items-center gap-3 relative z-10">
               <div className="w-12 h-12 rounded-full bg-white border-2 border-stone-200 text-stone-400 flex items-center justify-center shadow-[0_0_0_4px_white]">
                 <TrendingUp size={20} />
               </div>
               <div className="text-center">
                 <p className="text-xs font-bold text-stone-400">Settlement</p>
                 <p className="text-[10px] text-stone-400 mt-0.5">Upcoming</p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
