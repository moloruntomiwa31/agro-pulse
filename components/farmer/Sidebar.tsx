"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	LayoutDashboard,
	Box,
	ShoppingBag,
	ClipboardList,
	BarChart3,
	Settings,
	HelpCircle,
	Headset,
	ArrowLeftRight,
	Menu,
	X,
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
	const [mobileOpen, setMobileOpen] = useState(false);

	const renderNav = (items: NavItem[]) =>
		items.map(({ label, href, icon: Icon }) => {
			const active = pathname === href || pathname.startsWith(href);
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
		});

	return (
		<>
			{/* Mobile header */}
			<div className="flex items-center justify-between p-4 bg-stone-50 border-b border-stone-200 md:hidden">
				<button
					onClick={() => setMobileOpen(true)}
					className="p-2 rounded-md hover:bg-stone-200"
					aria-label="Open navigation"
				>
					<Menu size={20} />
				</button>
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
				<div className="w-8" />
			</div>

			{/* Desktop sidebar */}
			<aside className="hidden md:flex md:w-56 shrink-0 flex-col h-screen sticky top-0 border-r border-stone-200 bg-stone-50">
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
					{renderNav(mainNav)}
				</nav>
				<p className="px-3 pt-5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
					Preferences
				</p>
				<nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
					{renderNav(prefsNav)}
				</nav>
				<div className="px-3 pb-4 space-y-1">
					<Link
						href="/help"
						className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-200 transition-colors"
					>
						<HelpCircle size={14} />
						Help Center
					</Link>
				</div>
			</aside>

			{/* Mobile drawer */}
			{mobileOpen && (
				<>
					<div
						className="fixed inset-0 bg-black/30 z-30"
						onClick={() => setMobileOpen(false)}
					/>
					<aside className="fixed inset-y-0 left-0 w-64 bg-stone-50 z-40 transform transition-transform translate-x-0">
						<div className="flex items-center justify-between p-4 border-b border-stone-200">
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
							<button
								onClick={() => setMobileOpen(false)}
								className="p-2 rounded-md hover:bg-stone-200"
								aria-label="Close navigation"
							>
								<X size={20} />
							</button>
						</div>
						<nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
							{renderNav(mainNav)}
						</nav>
						<p className="px-3 pt-5 pb-1 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
							Preferences
						</p>
						<nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
							{renderNav(prefsNav)}
						</nav>
						<div className="px-3 pb-4 space-y-1">
							<Link
								href="/help"
								className="flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-stone-500 hover:text-stone-700 hover:bg-stone-200 transition-colors"
							>
								<HelpCircle size={14} />
								Help Center
							</Link>
						</div>
					</aside>
				</>
			)}
		</>
	);
}
