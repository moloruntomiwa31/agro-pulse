"use client";

import {
	MapPin,
	Clock,
	Truck,
	Phone,
	MessageSquare,
	ChevronRight,
	Filter,
	Search,
} from "lucide-react";
import { useState } from "react";

export default function AssignedDeliveries() {
	const [filter, setFilter] = useState("all");

	const deliveries = [
		{
			id: "DEL-001",
			priority: "high",
			customer: "Fresh Mart Retail",
			items: "Fresh Tomatoes, Bell Peppers",
			quantity: "50 kg",
			location: "Downtown Market, Sector 4",
			address: "123 Main Street, Market Complex",
			distance: "2.3 km",
			estimatedTime: "18 minutes",
			pickupTime: "2:00 PM",
			deliveryWindow: "2:15 PM - 2:45 PM",
			status: "pending",
			contact: "+91-98765-43210",
			specialInstructions: "Handle with care, keep temperature controlled",
		},
		{
			id: "DEL-002",
			priority: "medium",
			customer: "City Grocery Store",
			items: "Organic Spinach, Carrots, Potatoes",
			quantity: "35 kg",
			location: "Central Plaza, Sector 5",
			address: "456 Central Ave, Shopping Complex",
			distance: "3.1 km",
			estimatedTime: "24 minutes",
			pickupTime: "2:30 PM",
			deliveryWindow: "2:45 PM - 3:30 PM",
			status: "assigned",
			contact: "+91-98765-43211",
			specialInstructions: "Call before arrival",
		},
		{
			id: "DEL-003",
			priority: "low",
			customer: "Premium Vegetables Co",
			items: "Mixed Vegetables Pack",
			quantity: "25 kg",
			location: "Business District, Sector 2",
			address: "789 Business Plaza, Tower A",
			distance: "4.2 km",
			estimatedTime: "32 minutes",
			pickupTime: "3:00 PM",
			deliveryWindow: "3:30 PM - 4:30 PM",
			status: "assigned",
			contact: "+91-98765-43212",
			specialInstructions: "Gate code: 2024",
		},
		{
			id: "DEL-004",
			priority: "high",
			customer: "Metro Supermarket",
			items: "Fresh Leafy Greens, Herbs",
			quantity: "20 kg",
			location: "Shopping Center, Sector 3",
			address: "321 Metro Avenue, Level 2",
			distance: "1.8 km",
			estimatedTime: "14 minutes",
			pickupTime: "3:15 PM",
			deliveryWindow: "3:30 PM - 4:00 PM",
			status: "pending",
			contact: "+91-98765-43213",
			specialInstructions: "None",
		},
	];

	const filteredDeliveries =
		filter === "all"
			? deliveries
			: deliveries.filter((d) => d.status === filter);

	const priorityStyles = {
		high: "bg-red-50 border-red-100 text-red-700",
		medium: "bg-orange-50 border-orange-100 text-orange-700",
		low: "bg-green-50 border-green-100 text-green-700",
	};

	const statusStyles = {
		pending: "bg-stone-50 border-stone-100 text-stone-700",
		assigned: "bg-blue-50 border-blue-100 text-blue-700",
		"in-progress": "bg-orange-50 border-orange-100 text-orange-700",
		completed: "bg-green-50 border-green-100 text-green-700",
	};

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="flex items-end justify-between mb-2">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Truck size={16} className="text-forest-600" />
							<span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
								Delivery Management
							</span>
						</div>
						<h1 className="text-2xl font-bold text-stone-900 mb-1">
							Assigned Deliveries
						</h1>
						<p className="text-sm text-stone-500">
							Manage and track all assigned deliveries for today.
						</p>
					</div>
					<div className="flex items-center gap-3">
						<button className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl transition-colors">
							<Filter size={16} /> Filters
						</button>
						<button className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
							Accept Next
						</button>
					</div>
				</div>

				{/* Search & Filter Bar */}
				<div className="flex gap-3">
					<div className="flex-1 relative">
						<Search
							size={16}
							className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
						/>
						<input
							type="text"
							placeholder="Search by customer, location, or delivery ID..."
							className="w-full pl-10 pr-4 py-2.5 border border-stone-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
						/>
					</div>
				</div>

				{/* Filter Tabs */}
				<div className="flex gap-2 overflow-x-auto pb-2">
					{["all", "pending", "assigned"].map((f) => (
						<button
							key={f}
							onClick={() => setFilter(f)}
							className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors whitespace-nowrap ${
								filter === f
									? "bg-forest-950 text-white"
									: "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
							}`}
						>
							{f === "all"
								? "All Deliveries"
								: f === "pending"
									? "Pending"
									: "Assigned"}
						</button>
					))}
				</div>

				{/* Deliveries List */}
				<div className="space-y-4">
					{filteredDeliveries.map((delivery) => (
						<div
							key={delivery.id}
							className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 hover:shadow-md transition-shadow"
						>
							<div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
								{/* Left - Delivery Info */}
								<div className="lg:col-span-2">
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<div className="flex items-center gap-2 mb-2">
												<h3 className="text-lg font-bold text-stone-900">
													{delivery.customer}
												</h3>
												<span
													className={`px-3 py-1 rounded-full text-xs font-semibold border ${
														priorityStyles[
															delivery.priority as keyof typeof priorityStyles
														]
													}`}
												>
													{delivery.priority === "high"
														? "Priority"
														: delivery.priority === "medium"
															? "Medium"
															: "Low"}
												</span>
											</div>
											<p className="text-sm text-stone-600 mb-1">
												{delivery.items}
											</p>
											<p className="text-xs text-stone-500">
												{delivery.quantity}
											</p>
										</div>
										<div
											className={`px-3 py-1 rounded-full text-xs font-semibold border ${
												statusStyles[
													delivery.status as keyof typeof statusStyles
												]
											}`}
										>
											{delivery.status === "pending"
												? "Pending"
												: delivery.status === "assigned"
													? "Assigned"
													: "In Progress"}
										</div>
									</div>

									<div className="space-y-2">
										<div className="flex items-center gap-2 text-sm text-stone-600">
											<MapPin size={14} className="text-stone-400 shrink-0" />
											<span>{delivery.location}</span>
										</div>
										<div className="flex items-center gap-2 text-sm text-stone-600">
											<Clock size={14} className="text-stone-400 shrink-0" />
											<span>{delivery.deliveryWindow}</span>
										</div>
									</div>
								</div>

								{/* Middle - Route Info */}
								<div className="flex flex-col justify-between py-2">
									<div>
										<p className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3">
											Route Details
										</p>
										<div className="space-y-2">
											<div>
												<p className="text-xs text-stone-500">Distance</p>
												<p className="text-sm font-bold text-stone-900">
													{delivery.distance}
												</p>
											</div>
											<div>
												<p className="text-xs text-stone-500">Est. Time</p>
												<p className="text-sm font-bold text-stone-900">
													{delivery.estimatedTime}
												</p>
											</div>
										</div>
									</div>
								</div>

								{/* Right - Actions */}
								<div className="flex flex-col justify-between">
									<div className="space-y-2 mb-4">
										<button className="w-full flex items-center justify-center gap-2 bg-forest-50 hover:bg-forest-100 text-forest-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-forest-200">
											<MapPin size={14} /> View Route
										</button>
										<button className="w-full flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-stone-200">
											<Phone size={14} /> Call
										</button>
										<button className="w-full flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-700 font-semibold py-2 px-4 rounded-lg transition-colors text-sm border border-stone-200">
											<MessageSquare size={14} /> Message
										</button>
									</div>

									{delivery.status === "pending" && (
										<button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm">
											Accept Delivery
										</button>
									)}
									{delivery.status === "assigned" && (
										<button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 px-4 rounded-lg transition-colors text-sm">
											Start Delivery
										</button>
									)}
								</div>
							</div>

							{/* Special Instructions */}
							{delivery.specialInstructions !== "None" && (
								<div className="mt-4 pt-4 border-t border-stone-100">
									<p className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-2">
										Special Instructions
									</p>
									<p className="text-sm text-stone-700 bg-stone-50 rounded-lg p-3 border border-stone-100">
										{delivery.specialInstructions}
									</p>
								</div>
							)}
						</div>
					))}
				</div>

				{filteredDeliveries.length === 0 && (
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-12 text-center">
						<Truck size={48} className="mx-auto text-stone-300 mb-4" />
						<p className="text-lg font-bold text-stone-900 mb-2">
							No deliveries found
						</p>
						<p className="text-sm text-stone-500">
							Check back soon for new delivery assignments.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
