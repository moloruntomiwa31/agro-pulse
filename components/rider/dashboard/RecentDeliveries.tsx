"use client";

import { CheckCircle2, Clock, MapPin, Phone } from "lucide-react";

export default function RecentDeliveries() {
	const deliveries = [
		{
			id: "DEL-001",
			customer: "Fresh Mart Retail",
			items: "Fresh Tomatoes, Bell Peppers",
			location: "Downtown Market, Sector 4",
			time: "2:30 PM",
			status: "completed",
			amount: "₦250",
		},
		{
			id: "DEL-002",
			customer: "City Grocery Store",
			items: "Organic Spinach, Carrots",
			location: "Central Plaza, Sector 5",
			time: "3:15 PM",
			status: "in-progress",
			amount: "₦320",
		},
		{
			id: "DEL-003",
			customer: "Premium Vegetables Co",
			items: "Mixed Vegetables Pack",
			location: "Business District, Sector 2",
			time: "4:45 PM",
			status: "pending",
			amount: "₦280",
		},
	];

	const statusStyles = {
		completed: "bg-green-50 text-green-700 border-green-100",
		"in-progress": "bg-orange-50 text-orange-700 border-orange-100",
		pending: "bg-stone-50 text-stone-700 border-stone-100",
	};

	return (
		<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-bold text-stone-900">Recent Deliveries</h2>
				<button className="text-sm font-semibold text-forest-700 hover:text-forest-900">
					View All →
				</button>
			</div>

			<div className="space-y-4">
				{deliveries.map((delivery) => (
					<div
						key={delivery.id}
						className="border border-stone-100 rounded-xl p-4 hover:bg-stone-50 transition-colors"
					>
						<div className="flex items-start justify-between mb-3">
							<div>
								<p className="text-sm font-bold text-stone-900">
									{delivery.customer}
								</p>
								<p className="text-xs text-stone-500 mt-1">{delivery.items}</p>
							</div>
							<div className="text-right">
								<span
									className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${
										statusStyles[delivery.status as keyof typeof statusStyles]
									}`}
								>
									{delivery.status === "completed"
										? "Completed"
										: delivery.status === "in-progress"
											? "In Progress"
											: "Pending"}
								</span>
							</div>
						</div>

						<div className="flex items-center justify-between text-xs text-stone-600">
							<div className="flex items-center gap-4">
								<div className="flex items-center gap-1.5">
									<MapPin size={14} className="text-stone-400" />
									<span>{delivery.location}</span>
								</div>
								<div className="flex items-center gap-1.5">
									<Clock size={14} className="text-stone-400" />
									<span>{delivery.time}</span>
								</div>
							</div>
							<span className="font-bold text-stone-900">
								{delivery.amount}
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
