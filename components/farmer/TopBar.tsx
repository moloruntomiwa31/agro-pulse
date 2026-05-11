"use client";
import { Search, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const pathname = usePathname();
  
  let title = "Farmer Dashboard";
  let description = "AI-driven predictive analysis and real-time logistics tracking.";
  
  if (pathname.includes("/inventory")) {
    title = "Stock Management";
    description = "Manage current stock, harvest cycles, and demand-driven supply.";
  }

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-stone-200 bg-white/80 backdrop-blur-md">

      <div className="flex items-center gap-3 ml-auto">
        {/* Search */}
        <div className="relative hidden md:block">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder={pathname.includes("inventory") ? "Search inventory..." : "Search orders..."}
            className="pl-8 pr-4 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 w-48 transition-colors"
          />
        </div>
        
        <button className="relative p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-forest-500" />
        </button>
        <button className="p-1.5 rounded-full bg-forest-100 text-forest-700 hover:bg-forest-200 transition-colors">
          <User size={15} />
        </button>
      </div>
    </header>
  );
}
