"use client";

import { useCheckoutStore } from "@/lib/store/checkoutStore";
import EmptyState from "@/components/shared/EmptyState";
import { ClipboardList } from "lucide-react";

export default function RecentOrders() {
  const { orders } = useCheckoutStore();

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 overflow-hidden">
        <h2 className="text-lg font-bold text-stone-900 mb-6">Recent Orders & Settlements</h2>
        <EmptyState
          icon={ClipboardList}
          title="No Recent Orders"
          description="When buyers purchase your produce on the marketplace, their orders will appear here for settlement tracking."
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 overflow-hidden">
      <h2 className="text-lg font-bold text-stone-900 mb-6">Recent Orders & Settlements</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Order ID</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Produce</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Buyer</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Amount</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Status</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Settlement</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                <td className="py-4 font-mono text-xs font-semibold text-stone-500">{order.id}</td>
                <td className="py-4 font-semibold text-stone-900">{order.items[0]?.name || "Assorted Produce"}</td>
                <td className="py-4 text-stone-600 font-medium">Buyer (Anonymous)</td>
                <td className="py-4 font-bold text-stone-900">₦{order.total.toLocaleString()}</td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${order.status === "Delivered" ? "bg-forest-50 border border-forest-200 text-forest-700" : "bg-orange-50 border border-orange-200 text-orange-700"}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${order.status === "Delivered" ? "bg-forest-100 text-forest-700 border-forest-200" : "bg-orange-100 text-orange-700 border-orange-200"}`}>
                    {order.status === "Delivered" ? "Settled" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
