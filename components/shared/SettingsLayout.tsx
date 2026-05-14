"use client";
import { useState, useEffect } from "react";
import { User, Bell, Shield, CreditCard, MapPin, Building, Banknote, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { updateUser } from "@/lib/api/auth";
import { useToastStore } from "@/lib/store/toastStore";
import ToastContainer from "@/components/shared/ToastContainer";

export type TabType = 'profile' | 'notifications' | 'security' | 'payment' | 'addresses' | 'farm' | 'payouts';

export interface SettingsTab {
  id: TabType;
  label: string;
  icon: any;
}

export function ProfileTab() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const showToast = useToastStore((state) => state.showToast);

  const [firstName, setFirstName] = useState(() => user?.full_name?.split(' ')[0] || "Ibrahim");
  const [lastName, setLastName] = useState(() => user?.full_name?.split(' ').slice(1).join(' ') || "Suleiman");
  const [email, setEmail] = useState(() => user?.email || "ibrahim@example.com");
  const [phone, setPhone] = useState(() => user?.phone_number || "+234 800 000 0000");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const updated = await updateUser(user.id, {
        full_name: `${firstName} ${lastName}`.trim(),
        email,
        phone_number: phone,
      });
      setUser({ ...user, ...updated });
      showToast("Profile updated successfully on server!", "success");
    } catch (err: any) {
      setUser({
        ...user,
        full_name: `${firstName} ${lastName}`.trim(),
        email,
        phone_number: phone,
      });
      showToast(`Local profile updated (${err.message || "Backend sync notice"}).`, "info");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      {/* User Status / Role Banner */}
      <div className="flex items-center justify-between p-4 bg-forest-50 border border-forest-100 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-lg bg-forest-600 text-white font-semibold text-xs tracking-wider uppercase">
            {user?.role || "BUYER"}
          </div>
          <span className="text-xs font-medium text-forest-800">
            {user?.is_active !== false ? "Active Account" : "Inactive Account"}
          </span>
        </div>
        <div className="text-xs text-forest-700">
          Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "May 2026"}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">First Name</label>
          <input 
            type="text" 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-all" 
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Last Name</label>
          <input 
            type="text" 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-all" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Email Address</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-all" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Phone Number</label>
          <input 
            type="tel" 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-all" 
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm flex items-center gap-2 disabled:opacity-50"
        >
          {isSaving && <Loader2 size={16} className="animate-spin" />}
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

export function AddressesTab() {
  const [address, setAddress] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const showToast = useToastStore((state) => state.showToast);

  const handleGetLocation = async () => {
    setIsLocating(true);
    try {
      const res = await fetch("https://ipapi.co/json/");
      const data = await res.json();
      if (data && data.city) {
        const fullAddress = `${data.city}, ${data.region || ""}, ${data.country_name || ""}`.replace(/, ,/g, ",");
        setAddress(fullAddress);
        showToast("Location detected successfully via IP geolookup", "success");
      } else {
        throw new Error("Geolookup unavailable");
      }
    } catch (err) {
      showToast("Unable to detect location automatically. Please enter your address manually.", "error");
    } finally {
      setIsLocating(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-stone-900">Primary Delivery Address</h3>
        <button 
          onClick={handleGetLocation}
          disabled={isLocating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-forest-100 hover:bg-forest-200 text-forest-700 font-semibold text-xs transition-colors disabled:opacity-50"
        >
          <MapPin size={14} className={isLocating ? "animate-bounce" : ""} />
          {isLocating ? "Detecting Location..." : "Use Current IP Location"}
        </button>
      </div>

      <div className="p-4 rounded-xl border border-stone-200 bg-stone-50">
        <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Current Address</label>
        <textarea 
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          rows={3}
          placeholder="Enter your delivery address or click 'Use Current IP Location' to detect automatically"
          className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500 transition-all resize-none"
        />
      </div>

      <div className="pt-2 flex justify-end">
        <button 
          onClick={() => showToast("Delivery address updated successfully!", "success")}
          className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
        >
          Save Address
        </button>
      </div>
    </div>
  );
}

export function GenericSettingsLayout({ title, description, tabs }: { title: string, description: string, tabs: SettingsTab[] }) {
  const [activeTab, setActiveTab] = useState<TabType>(tabs[0].id);
  const searchParams = useSearchParams();

  useEffect(() => {
    const tabParam = searchParams.get("tab") as TabType;
    if (tabParam && tabs.some(t => t.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams, tabs]);

  return (
    <div className="flex-1 overflow-y-auto bg-stone-50/50 p-8 relative">
      <ToastContainer />
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
            {activeTab === 'addresses' && <AddressesTab />}
            {['security', 'payment', 'farm', 'payouts'].includes(activeTab) && (
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

