"use client";

import { useCheckoutStore } from "../../../lib/store/checkoutStore";
import { Lock, ShieldCheck, Sparkles } from "lucide-react";

export default function CheckoutPage() {
  const { 
    items, 
    removeItem, 
    subtotal, 
    total, 
    shipping, 
    serviceFee, 
    paymentMethod, 
    setPaymentMethod,
    subscriptionOption,
    setSubscriptionOption
  } = useCheckoutStore();

  const formattedSubtotal = subtotal().toFixed(2);
  const formattedTotal = total().toFixed(2);
  const formattedShipping = shipping.toFixed(2);
  const formattedServiceFee = serviceFee.toFixed(2);

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/30 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Cart Summary */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-forest-950">Cart Summary</h2>
              <span className="text-sm font-medium text-stone-500">{items.length} Items Selected</span>
            </div>
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-stone-100 bg-stone-50/50">
                  <div className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-stone-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-stone-900 truncate">{item.name}</h3>
                    <p className="text-xs text-stone-500 truncate">{item.farm}</p>
                    <p className="text-xs font-semibold text-stone-600 mt-1">{item.weight}kg &times; ${(item.price / item.weight).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <span className="text-base font-bold text-forest-950">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* AI Predicted Demand */}
          <section className="bg-gradient-to-br from-amber-50 to-orange-50/30 rounded-2xl p-6 border-l-4 border-amber-400 border-y border-r border-y-amber-100 border-r-amber-100 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={18} className="text-amber-500" />
              <h2 className="text-lg font-bold text-amber-900">AI Predicted Demand</h2>
            </div>
            <p className="text-sm text-stone-700 leading-relaxed mb-5 max-w-2xl">
              Based on historical data, potato demand is expected to spike by 15% in your region next week. Would you like to secure a recurring supply?
            </p>
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-amber-200 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-500">Subscription Option</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-stone-900">Convert to Weekly Supply</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={subscriptionOption === 'weekly'}
                    onChange={(e) => setSubscriptionOption(e.target.checked ? 'weekly' : 'none')}
                  />
                  <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-forest-500"></div>
                </label>
                <span className="text-xs font-semibold text-stone-500 ml-2">Daily / Weekly / Monthly</span>
              </div>
            </div>
          </section>

          {/* Payment Distribution */}
          <section className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
            <h2 className="text-lg font-bold text-forest-950 mb-5">Payment Distribution</h2>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">Split Payment Logic</span>
              <span className="text-xs font-bold text-stone-700">Total Escrow: ${formattedTotal}</span>
            </div>
            
            {/* Progress bar representing split */}
            <div className="h-3 rounded-full flex overflow-hidden mb-5">
              <div className="bg-forest-900" style={{ width: '75%' }}></div>
              <div className="bg-emerald-600" style={{ width: '15%' }}></div>
              <div className="bg-amber-700" style={{ width: '10%' }}></div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-3 border border-stone-200 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-forest-900"></div>
                  <span className="text-xs font-bold text-stone-700">Farmer</span>
                </div>
                <div className="text-lg font-black text-forest-950">${(total() * 0.75).toFixed(2)}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Produce & Labor</div>
              </div>
              <div className="p-3 border border-stone-200 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                  <span className="text-xs font-bold text-stone-700">Transporter</span>
                </div>
                <div className="text-lg font-black text-forest-950">${(total() * 0.15).toFixed(2)}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Logistics Fee</div>
              </div>
              <div className="p-3 border border-stone-200 rounded-xl">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-amber-700"></div>
                  <span className="text-xs font-bold text-stone-700">Cooperative</span>
                </div>
                <div className="text-lg font-black text-forest-950">${(total() * 0.10).toFixed(2)}</div>
                <div className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mt-1">Platform & Admin</div>
              </div>
            </div>
          </section>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24">
            <h2 className="text-lg font-bold text-forest-950 mb-5">Payment Method</h2>
            
            <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Select Provider</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => setPaymentMethod('credit_card')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'credit_card' ? 'bg-forest-50 border-forest-500 text-forest-700 shadow-sm' : 'border-stone-200 text-stone-500 hover:bg-stone-50 hover:border-stone-300'}`}
              >
                <div className="w-6 h-4 rounded border-2 border-current opacity-80"></div>
                <span className="text-xs font-bold">Credit Card</span>
              </button>
              <button 
                onClick={() => setPaymentMethod('mobile_money')}
                className={`py-3 px-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${paymentMethod === 'mobile_money' ? 'bg-forest-50 border-forest-500 text-forest-700 shadow-sm' : 'border-stone-200 text-stone-500 hover:bg-stone-50 hover:border-stone-300'}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                <span className="text-xs font-bold">Mobile Money</span>
              </button>
            </div>

            {/* Card Form */}
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1.5">Card Holder Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-colors" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1.5">Card Number</label>
                <div className="relative">
                  <input type="text" placeholder="**** **** **** 1234" className="w-full pl-3 pr-10 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-colors font-mono" />
                  <Lock size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1.5">Expiry Date</label>
                  <input type="text" placeholder="MM/YY" className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-1.5">CVV</label>
                  <input type="text" placeholder="123" className="w-full px-3 py-2 rounded-lg border border-stone-200 text-sm focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-colors" />
                </div>
              </div>
            </div>

            <hr className="border-stone-100 mb-5" />

            {/* Order Summary Math */}
            <div className="flex flex-col gap-2 mb-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500 font-medium">Subtotal</span>
                <span className="font-mono font-medium text-stone-900">${formattedSubtotal}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500 font-medium">Shipping (est.)</span>
                <span className="font-mono font-medium text-stone-900">${formattedShipping}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-stone-500 font-medium">Service Fee</span>
                <span className="font-mono font-medium text-stone-900">${formattedServiceFee}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-6">
              <span className="text-base font-bold text-forest-950">Total Due</span>
              <span className="text-2xl font-black text-forest-950">${formattedTotal}</span>
            </div>

            <button className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98]">
              <ShieldCheck size={18} />
              Process Secure Payment
            </button>
            <p className="text-[10px] text-center text-stone-500 mt-3 font-medium">
              Powered by Squad API + Secure Escrow Enabled
            </p>

            {/* Trust Badge */}
            <div className="mt-6 bg-forest-100/50 border border-forest-200/60 rounded-xl p-4 flex items-start gap-3">
              <div className="bg-white rounded-full p-1 border border-forest-200 shadow-sm shrink-0">
                <ShieldCheck size={16} className="text-forest-600" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-forest-950 mb-0.5">Farm Trust Certified</h4>
                <p className="text-[10px] text-forest-800/80 leading-relaxed">
                  Your payment is held in escrow until you confirm produce quality upon delivery.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
