"use client";
import { useMyOrders } from "@/hooks/useOrder";
import EmptyState from "@/components/shared/EmptyState";
import { ClipboardList, Loader2 } from "lucide-react";

export default function RecentOrders() {
  const { data: orders, isLoading, isError } = useMyOrders();

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-12 flex items-center justify-center">
        <Loader2 className="animate-spin text-forest-500" size={32} />
      </div>
    );
  }

  if (isError || !orders || orders.length === 0) {
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
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Buyer</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Amount</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Status</th>
              <th className="text-[10px] font-bold text-stone-400 uppercase tracking-widest pb-4 border-b border-stone-100">Settlement</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {orders.slice(0, 5).map((order) => {
              const isPaid = ["PAID", "PROCESSING", "IN_TRANSIT", "COMPLETED"].includes(order.order_status);
              return (
                <tr key={order.id} className="border-b border-stone-50 last:border-0 hover:bg-stone-50/50 transition-colors">
                  <td className="py-4 font-mono text-[10px] font-semibold text-stone-500">
                    #{order.id.slice(0, 8).toUpperCase()}
                  </td>
                  <td className="py-4 text-stone-600 font-medium">{order.buyer_business_name || "Retail Buyer"}</td>
                  <td className="py-4 font-bold text-stone-900">₦{parseFloat(order.total).toLocaleString()}</td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                      order.order_status === "COMPLETED" 
                        ? "bg-forest-50 border border-forest-200 text-forest-700" 
                        : "bg-orange-50 border border-orange-200 text-orange-700"
                    }`}>
                      {order.order_status.replace("_", " ")}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border ${
                      isPaid ? "bg-forest-100 text-forest-700 border-forest-200" : "bg-orange-100 text-orange-700 border-orange-200"
                    }`}>
                      {isPaid ? "Escrow Secured" : "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

