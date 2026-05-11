"use client";
import { Search, Bell, User } from "lucide-react";
import { useProductStore } from "../../lib/store/productStore";
import Link from "next/link";

export default function TopBar() {
	const { searchQuery, setSearchQuery, activeFilter, setActiveFilter } =
		useProductStore();

	return (
		<header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-stone-200 bg-white/80 backdrop-blur-md">
			<div>
				<h1 className="font-display font-semibold text-lg text-stone-900">
					Sustainable Produce Marketplace
				</h1>
				<p className="text-xs text-stone-500">
					Connect directly with verified farmers. Powered by AI demand
					forecasting for the most reliable agricultural supply chains.
				</p>
			</div>

			<div className="flex items-center gap-3">
				{/* Search */}
				<div className="relative hidden md:block">
					<Search
						size={14}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
					/>
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search produce..."
						className="pl-8 pr-4 py-1.5 rounded-lg bg-stone-50 border border-stone-200 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-forest-500 w-48 transition-colors"
					/>
				</div>

				{/* Filters */}
				<select
					value={activeFilter}
					onChange={(e) => setActiveFilter(e.target.value)}
					className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 text-xs font-medium text-stone-600 bg-white hover:bg-stone-50 transition-colors focus:outline-none focus:border-forest-500"
				>
					<option value="all">All Items</option>
					<option value="organic">Organic Only</option>
					<option value="in_stock">In Stock</option>
				</select>

				<button className="relative p-2 rounded-lg hover:bg-stone-100 text-stone-600 transition-colors">
					<Bell size={16} />
					<span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-forest-500" />
				</button>
				<Link href="/marketplace/settings" className="p-1.5 rounded-full bg-forest-100 text-forest-700 hover:bg-forest-200 transition-colors">
					<User size={22} />
				</Link>
			</div>
		</header>
	);
}
