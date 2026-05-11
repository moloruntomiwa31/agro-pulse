"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  BarChart2,
  Settings,
  HelpCircle,
  Zap,
} from "lucide-react";

const nav = [
  { label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
  { label: "Checkout", href: "/marketplace/checkout", icon: ShoppingBag },
];

const prefs = [
  { label: "Settings", href: "/marketplace/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen sticky top-0 border-r border-stone-200 bg-stone-50">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-stone-200">
        <span className="font-display font-700 text-lg text-forest-950 tracking-tight">
          Agro<span className="text-forest-600">Pulse</span>
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href === "/marketplace" && pathname === "/marketplace");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-forest-100 text-forest-800"
                  : "text-stone-600 hover:bg-stone-200 hover:text-stone-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}

        <p className="px-3 pt-5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
          Preferences
        </p>
        {prefs.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-stone-600 hover:bg-stone-200 hover:text-stone-900 transition-colors"
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* AI Upgrade Banner */}
      <div className="mx-3 mb-4 p-3 rounded-xl bg-gradient-to-br from-forest-50 to-forest-100 border border-forest-200">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-forest-600 mb-1">
          Beta Access
        </p>
        <p className="text-xs text-forest-900 mb-2 leading-snug">
          AI Predictive Forecasting
        </p>
        <button className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold transition-colors">
          <Zap size={12} />
          Switch Now
        </button>
      </div>

      <div className="px-3 pb-4">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-500 hover:text-stone-700 transition-colors"
        >
          <HelpCircle size={16} />
          Help Center
        </Link>
      </div>
    </aside>
  );
}
