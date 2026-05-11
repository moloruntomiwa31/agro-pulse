"use client";
import { useState } from "react";
import { User, Bell, Shield, CreditCard, MapPin, Building, Banknote } from "lucide-react";

export type TabType = 'profile' | 'notifications' | 'security' | 'payment' | 'addresses' | 'farm' | 'payouts';

export interface SettingsTab {
  id: TabType;
  label: string;
  icon: any;
}

export function ProfileTab() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center gap-6 pb-6 border-b border-stone-100">
        <div className="w-20 h-20 rounded-full bg-stone-200 border border-stone-300 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80" alt="Avatar" className="w-full h-full object-cover" />
        </div>
        <div>
          <button className="px-4 py-2 bg-stone-900 text-white text-sm font-semibold rounded-xl hover:bg-stone-800 transition-colors">
            Change Avatar
          </button>
          <p className="text-xs text-stone-500 mt-2">JPG, GIF or PNG. 1MB max.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">First Name</label>
          <input type="text" defaultValue="Ibrahim" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Last Name</label>
          <input type="text" defaultValue="Suleiman" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Email Address</label>
          <input type="email" defaultValue="ibrahim@example.com" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Phone Number</label>
          <input type="tel" defaultValue="+234 800 000 0000" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export function NotificationsTab() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <h3 className="text-sm font-bold text-stone-900 mb-2">Email Notifications</h3>
      
      <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
        <div>
          <p className="text-sm font-bold text-stone-900">Order Updates</p>
          <p className="text-xs text-stone-500">Receive emails about your order status</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" defaultChecked className="sr-only peer" />
          <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest-500"></div>
        </label>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50">
        <div>
          <p className="text-sm font-bold text-stone-900">Promotions</p>
          <p className="text-xs text-stone-500">Receive emails about new features and discounts</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" className="sr-only peer" />
          <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-forest-500"></div>
        </label>
      </div>
    </div>
  );
}

export function GenericSettingsLayout({ title, description, tabs }: { title: string, description: string, tabs: SettingsTab[] }) {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0].id);

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        
        <div>
          <h1 className="text-2xl font-bold text-stone-900 mb-1">{title}</h1>
          <p className="text-sm text-stone-500">{description}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 bg-white border border-stone-200 shadow-sm rounded-2xl p-6 min-h-[500px]">
          
          {/* Sidebar Tabs */}
          <div className="w-full md:w-56 shrink-0 flex flex-col gap-1 border-r border-stone-100 pr-6">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors text-left ${
                    active ? "bg-forest-50 text-forest-700" : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <h2 className="text-lg font-bold text-stone-900 mb-6 border-b border-stone-100 pb-4">
              {tabs.find(t => t.id === activeTab)?.label}
            </h2>

            {activeTab === 'profile' && <ProfileTab />}
            {activeTab === 'notifications' && <NotificationsTab />}
            {['security', 'payment', 'addresses', 'farm', 'payouts'].includes(activeTab) && (
               <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-stone-200 rounded-2xl">
                 <p className="text-sm font-bold text-stone-400 mb-1">Coming Soon</p>
                 <p className="text-xs text-stone-400 max-w-xs">This settings panel is currently under construction.</p>
               </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
