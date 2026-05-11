import { Activity, TrendingUp, Check, Zap } from "lucide-react";
import EmptyState from "@/components/shared/EmptyState";

export default function BuyerActivity() {
  // Toggle this array to see the populated state
  const activities: any[] = [];
  
  /* 
  const activities = [
    { name: "GreenGro Retailers", action: "Viewed your organic spinach 14 times in 2h.", time: "10 mins ago", icon: TrendingUp, color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Nature's Basket", action: "Placed a recurring order for tomatoes.", time: "45 mins ago", icon: Check, color: "text-forest-600", bg: "bg-forest-50" },
    { name: "Wholesale Central", action: "Marked your farm as a 'Preferred Supplier'.", time: "2 hours ago", icon: Zap, color: "text-orange-600", bg: "bg-orange-50" }
  ];
  */

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col h-full justify-center">
        <div className="flex justify-between items-center mb-6">
           <h2 className="text-lg font-bold text-stone-900">Buyer Activity</h2>
        </div>
        <EmptyState
          icon={Activity}
          title="No Buyer Activity"
          description="Your farm hasn't received any profile views or interactions today. Listing more produce can help attract buyers."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col h-full">
      <div className="flex justify-between items-center mb-6">
         <h2 className="text-lg font-bold text-stone-900">Buyer Activity</h2>
         <span className="text-xs font-bold text-forest-600 cursor-pointer hover:underline">View All</span>
      </div>
      
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2">
        {activities.map((act, i) => (
          <div key={i} className="flex gap-4">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${act.bg} ${act.color}`}>
              <act.icon size={16} />
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">{act.name}</p>
              <p className="text-xs text-stone-500 mt-0.5 leading-relaxed">{act.action}</p>
              <p className="text-[10px] font-medium text-stone-400 mt-1">{act.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
