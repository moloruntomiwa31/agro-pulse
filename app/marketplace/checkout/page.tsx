"use client";

import CartSummary from "../../../components/marketplace/checkout/CartSummary";
import DemandSubscription from "../../../components/marketplace/checkout/DemandSubscription";
import PaymentDistribution from "../../../components/marketplace/checkout/PaymentDistribution";
import OrderSummary from "../../../components/marketplace/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/30 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <CartSummary />
          <DemandSubscription />
          {/* <PaymentDistribution /> */}
        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}
