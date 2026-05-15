"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	ShoppingBag,
	ClipboardList,
	Settings,
	Zap,
	HelpCircle,
	LogOut,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";
import { useLogout } from "@/hooks/useAuth";

const mainNav: NavItem[] = [
	{ label: "Marketplace", href: "/marketplace", icon: ShoppingBag },
	{ label: "Orders", href: "/marketplace/orders", icon: ClipboardList },
	{ label: "Checkout", href: "/marketplace/checkout", icon: ShoppingBag },
];

const prefsNav: NavItem[] = [
	{ label: "Settings", href: "/marketplace/settings", icon: Settings },
];

export default function Sidebar() {
	const pathname = usePathname();
	const { mutate: logout, isPending: isLoggingOut } = useLogout();

	return (
		<aside className="w-56 shrink-0 flex flex-col h-screen sticky top-0 border-r border-stone-200 bg-stone-50">
			{/* Logo */}
			<div className="h-[60px] flex items-center px-6 border-b border-stone-200">
				<Link href="/" className="flex items-center gap-2.5 no-underline">
					<div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-forest-400 to-forest-600 shadow-[0_0_20px_rgba(78,146,57,0.4)] shrink-0">
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

			<nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
				{mainNav.map(({ label, href, icon: Icon }) => {
					const active =
						pathname === href ||
						(href === "/marketplace" && pathname === "/marketplace");
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

			<div className="px-3 pb-4 flex flex-col gap-1">
				<Link
					href="/help"
					className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-stone-500 hover:text-stone-700 transition-colors"
				>
					<HelpCircle size={16} />
					Help Center
				</Link>

				{/* Sign Out */}
				<button
					onClick={() => logout()}
					disabled={isLoggingOut}
					className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors disabled:opacity-50 w-full text-left"
				>
					<LogOut size={16} />
					{isLoggingOut ? "Signing out..." : "Sign Out"}
				</button>
			</div>
		</aside>
	);
}


