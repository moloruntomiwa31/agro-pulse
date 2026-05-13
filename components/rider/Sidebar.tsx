"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	LayoutDashboard,
	Car,
	Clock,
	Wallet,
	Settings,
	HelpCircle,
	Headset,
} from "lucide-react";
import type { NavItem } from "@/types/navigation";

const mainNav: NavItem[] = [
	{ label: "Dashboard", href: "/rider/dashboard", icon: LayoutDashboard },
	{
		label: "Assigned Deliveries",
		href: "/rider/assigned-deliveries",
		icon: Car,
	},
	{ label: "Delivery Status", href: "/rider/delivery-status", icon: Clock },
	{ label: "Earnings", href: "/rider/earnings", icon: Wallet },
];

const prefsNav: NavItem[] = [
	{ label: "Settings", href: "/rider/settings", icon: Settings },
];

const supportNav: NavItem[] = [
	{ label: "Help & Support", href: "/rider/support", icon: HelpCircle },
	{ label: "Contact Us", href: "/rider/contact", icon: Headset },
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

			<nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
				{mainNav.map(({ label, href, icon: Icon }) => {
					const active = pathname.startsWith(href);
					return (
						<Link
							key={href}
							href={href}
							className={`text-sm flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
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
							className={`text-sm flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
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
					Support
				</p>
				{supportNav.map(({ label, href, icon: Icon }) => {
					const active = pathname === href;
					return (
						<Link
							key={href}
							href={href}
							className={`text-sm flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
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
			</nav>

			{/* Footer */}
			<div className="px-3 py-4 border-t border-stone-200">
				<div className="px-3 py-2.5 bg-forest-50 rounded-lg border border-forest-100">
					<p className="text-xs font-bold text-forest-700 mb-1">
						Transporter Pro
					</p>
					<p className="text-[10px] text-forest-600 leading-relaxed">
						Unlock premium features and maximize your earnings.
					</p>
				</div>
			</div>
		</aside>
	);
}
