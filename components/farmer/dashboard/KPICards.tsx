import { Clock, TrendingUp, AlertCircle, Check, Info } from "lucide-react";

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4">
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center col-span-1 md:col-span-1 xl:col-span-1">
         <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-2">
           <Clock size={18} />
         </div>
         <p className="text-3xl font-black text-stone-900 mb-1">12</p>
         <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Pending</p>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center col-span-1 md:col-span-1 xl:col-span-1">
         <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-2">
           <TrendingUp size={18} />
         </div>
         <p className="text-3xl font-black text-stone-900 mb-1">08</p>
         <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">In Transit</p>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-orange-200 shadow-sm flex flex-col items-center justify-center text-center col-span-1 md:col-span-1 xl:col-span-1 relative overflow-hidden">
         <div className="absolute top-0 w-full h-1 bg-orange-500" />
         <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mb-2">
           <AlertCircle size={18} />
         </div>
         <p className="text-3xl font-black text-orange-600 mb-1">03</p>
         <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Delayed</p>
      </div>
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center col-span-1 md:col-span-1 xl:col-span-1">
         <div className="w-10 h-10 rounded-full bg-forest-50 text-forest-600 flex items-center justify-center mb-2">
           <Check size={18} />
         </div>
         <p className="text-3xl font-black text-stone-900 mb-1">142</p>
         <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Delivered</p>
      </div>

      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col items-center justify-center text-center col-span-1 md:col-span-4 xl:col-span-1 relative">
        <Info size={14} className="absolute top-4 right-4 text-stone-300" />
        <p className="text-[10px] font-bold text-stone-500 uppercase tracking-widest mb-4">Farmer Trust Score</p>
        <div className="relative w-20 h-20 mb-3">
          <svg viewBox="0 0 36 36" className="w-full h-full rotate-[-90deg]">
            <path className="text-stone-100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-forest-600" strokeDasharray="94, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-2xl font-black text-stone-900 leading-none">9.4</span>
          </div>
        </div>
        <p className="text-[10px] font-medium text-stone-500 leading-tight px-2">Top 5% of suppliers in your region</p>
      </div>
    </div>
  );
}
