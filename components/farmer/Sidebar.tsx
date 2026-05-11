"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Box,
  ShoppingBag,
  ClipboardList,
  BarChart3,
  Settings,
  HelpCircle,
  Headset,
  ArrowLeftRight
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/farmer/dashboard", icon: LayoutDashboard },
  { label: "Inventory", href: "/farmer/inventory", icon: Box },
  // { label: "Analytics", href: "/farmer/analytics", icon: BarChart3 },
];

const prefsNav: NavItem[] = [
  { label: "Settings", href: "/farmer/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 flex flex-col h-screen sticky top-0 border-r border-stone-200 bg-stone-50">
      {/* Logo */}
      <div className="h-[60px] flex items-center px-6 border-b border-stone-200">
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-forest-800 to-forest-950 shadow-[0_0_20px_rgba(78,146,57,0.4)] shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8 2 4 5.5 4 10c0 3 1.5 5.5 4 7l1 5h6l1-5c2.5-1.5 4-4 4-7 0-4.5-4-8-8-8z"
                fill="#e8f7e1"
                fillOpacity="0.9"
              />
              <path
                d="M12 6v8M9 9l3-3 3 3"
                stroke="#c4ecb0"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-forest-950">
            Agro<span className="text-forest-600">Pulse</span>
          </span>
        </Link>
      </div>

      {/* Pro Badge */}
      <div className="px-4 py-4 border-b border-stone-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-forest-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
            BP
          </div>
          <div>
            <p className="text-xs font-bold text-stone-900">Babangida Poultry</p>
            <p className="text-[10px] text-stone-500">Management Suite</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {mainNav.map(({ label, href, icon: Icon }) => {
          const active = pathname.startsWith(href) && (href !== "/marketplace" || pathname === "/marketplace");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-forest-100 text-forest-800 font-bold"
                  : "font-medium text-stone-600 hover:bg-stone-200 hover:text-stone-900"
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
        {prefsNav.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                active
                  ? "bg-forest-100 text-forest-800 font-bold text-sm"
                  : "text-sm font-medium text-stone-600 hover:bg-stone-200 hover:text-stone-900"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Switch Role Button */}
      {/* <div className="px-3 mb-4">
        <Link href="/marketplace" className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-forest-950 hover:bg-forest-900 text-white text-xs font-semibold transition-colors shadow-sm">
          <ArrowLeftRight size={14} />
          Switch Role
        </Link>
      </div> */}

      <div className="px-3 pb-4 space-y-1">
        <Link
          href="/help"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-200 transition-colors"
        >
          <HelpCircle size={14} />
          Help Center
        </Link>
        {/* <Link
          href="/support"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-200 transition-colors"
        >
          <Headset size={14} />
          Support
        </Link> */}
      </div>
    </aside>
  );
}
