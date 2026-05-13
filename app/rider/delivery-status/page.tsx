"use client";

import {
	Clock,
	Navigation,
	Download,
} from "lucide-react";
import { useState } from "react";

export default function DeliveryStatus() {
	const [selectedDelivery, setSelectedDelivery] = useState(0);

	const deliveries = [
		{
			id: "DEL-001",
			customer: "Fresh Mart Retail",
			items: "Fresh Tomatoes, Bell Peppers",
			status: "completed",
			progress: 100,
			startTime: "2:00 PM",
			endTime: "2:18 PM",
			distance: "2.3 km",
			actualTime: "18 min",
			rating: 5,
			feedback: "Excellent service, very professional",
			timeline: [
				{ time: "2:00 PM", event: "Pickup started", status: "completed" },
				{ time: "2:05 PM", event: "Loaded and confirmed", status: "completed" },
				{ time: "2:12 PM", event: "En route to delivery", status: "completed" },
				{
					time: "2:18 PM",
					event: "Delivered successfully",
					status: "completed",
				},
			],
		},
		{
			id: "DEL-002",
			customer: "City Grocery Store",
			items: "Organic Spinach, Carrots, Potatoes",
			status: "in-progress",
			progress: 65,
			startTime: "2:30 PM",
			endTime: "Arriving soon",
			distance: "3.1 km",
			actualTime: "Active",
			location: "0.8 km away",
			timeline: [
				{ time: "2:30 PM", event: "Pickup started", status: "completed" },
				{ time: "2:36 PM", event: "Loaded and confirmed", status: "completed" },
				{ time: "2:42 PM", event: "En route to delivery", status: "active" },
				{
					time: "2:55 PM",
					event: "Arriving at destination",
					status: "pending",
				},
			],
		},
		{
			id: "DEL-003",
			customer: "Premium Vegetables Co",
			items: "Mixed Vegetables Pack",
			status: "pending",
			progress: 0,
			startTime: "3:00 PM",
			endTime: "Scheduled",
			distance: "4.2 km",
			actualTime: "Awaiting pickup",
			timeline: [
				{ time: "3:00 PM", event: "Pickup scheduled", status: "pending" },
				{ time: "3:10 PM", event: "Ready for delivery", status: "pending" },
				{ time: "3:45 PM", event: "Estimated delivery", status: "pending" },
				{ time: "4:00 PM", event: "Delivery confirmation", status: "pending" },
			],
		},
	];

	const current = deliveries[selectedDelivery];

	const statusColors = {
		completed: "text-green-600 bg-green-50 border-green-100",
		"in-progress": "text-orange-600 bg-orange-50 border-orange-100",
		pending: "text-stone-600 bg-stone-50 border-stone-100",
	};

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="flex items-end justify-between mb-2">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Clock size={16} className="text-forest-600" />
							<span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
								Real-time Tracking
							</span>
						</div>
						<h1 className="text-2xl font-bold text-stone-900 mb-1">
							Delivery Status
						</h1>
						<p className="text-sm text-stone-500">
							Monitor active deliveries and view detailed delivery history.
						</p>
					</div>
					<button className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl transition-colors">
						<Download size={16} /> Export Report
					</button>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Left - Delivery List */}
					<div className="h-fit bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden flex flex-col">
						<div className="px-6 py-4 border-b border-stone-100 bg-stone-50">
							<p className="text-sm font-bold text-stone-900">
								Today's Deliveries
							</p>
						</div>

						<div className="flex-1 overflow-y-auto space-y-2 p-4">
							{deliveries.map((delivery, idx) => (
								<button
									key={delivery.id}
									onClick={() => setSelectedDelivery(idx)}
									className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
										selectedDelivery === idx
											? "bg-forest-50 border-2 border-forest-500"
											: "bg-stone-50 border border-stone-200 hover:border-stone-300"
									}`}
								>
									<div className="flex items-start justify-between mb-2">
										<p className="font-semibold text-stone-900 text-sm">
											{delivery.customer}
										</p>
										<span
											className={`px-2 py-1 rounded text-xs font-semibold border ${
												statusColors[
													delivery.status as keyof typeof statusColors
												]
											}`}
										>
											{delivery.status === "completed"
												? "✓ Done"
												: delivery.status === "in-progress"
													? "◉ Active"
													: "○ Pending"}
										</span>
									</div>
									<p className="text-xs text-stone-500 mb-2 line-clamp-1">
										{delivery.items}
									</p>
									<div className="w-full bg-stone-200 rounded-full h-1.5">
										<div
											className={`h-1.5 rounded-full transition-all ${
												delivery.status === "completed"
													? "bg-green-500"
													: delivery.status === "in-progress"
														? "bg-orange-500"
														: "bg-stone-300"
											}`}
											style={{ width: `${delivery.progress}%` }}
										/>
									</div>
								</button>
							))}
						</div>
					</div>

					{/* Right - Detailed View */}
					<div className="lg:col-span-2 space-y-6">
						{/* Status Card */}
						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<div className="flex items-start justify-between mb-4">
								<div>
									<p className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-1">
										{current.status === "completed"
											? "Completed Delivery"
											: current.status === "in-progress"
												? "Active Delivery"
												: "Pending Delivery"}
									</p>
									<h2 className="text-xl font-bold text-stone-900">
										{current.customer}
									</h2>
								</div>
								<div
									className={`px-4 py-2 rounded-lg border font-bold text-sm ${
										statusColors[current.status as keyof typeof statusColors]
									}`}
								>
									{current.status === "completed"
										? "✓ Completed"
										: current.status === "in-progress"
											? "◉ In Progress"
											: "○ Pending"}
								</div>
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-stone-100">
								<div>
									<p className="text-xs text-stone-500 mb-1">Items</p>
									<p className="text-sm font-semibold text-stone-900 line-clamp-2">
										{current.items}
									</p>
								</div>
								<div>
									<p className="text-xs text-stone-500 mb-1">Distance</p>
									<p className="text-sm font-semibold text-stone-900">
										{current.distance}
									</p>
								</div>
								<div>
									<p className="text-xs text-stone-500 mb-1">Start Time</p>
									<p className="text-sm font-semibold text-stone-900">
										{current.startTime}
									</p>
								</div>
								<div>
									<p className="text-xs text-stone-500 mb-1">
										{current.status === "completed"
											? "Completed At"
											: "Est. Delivery"}
									</p>
									<p className="text-sm font-semibold text-stone-900">
										{current.endTime}
									</p>
								</div>
							</div>

							{current.status === "in-progress" && (
								<div>
									<p className="text-xs text-stone-500 mb-2">
										Current Location
									</p>
									<div className="flex items-center gap-2 text-sm font-semibold text-stone-900 bg-stone-50 rounded-lg p-3 border border-stone-100">
										<Navigation size={14} className="text-forest-600" />
										{current.location}
									</div>
								</div>
							)}

							{current.status === "completed" && current.rating && (
								<div className="mt-4">
									<p className="text-xs text-stone-500 mb-2">Customer Rating</p>
									<div className="flex items-center gap-2 mb-2">
										<span className="text-lg font-bold text-stone-900">
											{current.rating}★
										</span>
										<span className="text-sm text-stone-500">
											{current.feedback}
										</span>
									</div>
								</div>
							)}
						</div>

						{/* Progress Timeline */}
						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<h3 className="font-bold text-stone-900 mb-4">
								Delivery Timeline
							</h3>

							<div className="space-y-4">
								{current.timeline.map((item, idx) => (
									<div key={idx} className="flex gap-4">
										<div className="flex flex-col items-center gap-2">
											<div
												className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
													item.status === "completed"
														? "bg-green-100 border-green-500 text-green-700"
														: item.status === "active"
															? "bg-orange-100 border-orange-500 text-orange-700 animate-pulse"
															: "bg-stone-100 border-stone-300 text-stone-600"
												}`}
											>
												{item.status === "completed"
													? "✓"
													: item.status === "active"
														? "●"
														: "○"}
											</div>
											{idx !== current.timeline.length - 1 && (
												<div
													className={`w-0.5 h-12 ${
														item.status === "completed" ||
														item.status === "active"
															? "bg-green-300"
															: "bg-stone-200"
													}`}
												/>
											)}
										</div>

										<div className="pt-1 pb-4 flex-1">
											<p className="text-xs font-bold text-stone-500 uppercase tracking-widest">
												{item.time}
											</p>
											<p className="text-sm font-semibold text-stone-900 mt-1">
												{item.event}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
