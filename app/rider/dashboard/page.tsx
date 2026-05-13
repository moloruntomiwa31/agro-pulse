"use client";

import { MapPin, TrendingUp, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import DeliveryKPICards from "../../../components/rider/dashboard/DeliveryKPICards";
import RecentDeliveries from "../../../components/rider/dashboard/RecentDeliveries";
import EarningsOverview from "../../../components/rider/dashboard/EarningsOverview";

export default function TransporterDashboard() {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="flex items-end justify-between mb-2">
					<div>
						<h1 className="text-2xl font-bold text-stone-900 mb-1">
							Delivery Dashboard
						</h1>
						<p className="text-sm text-stone-500">
							Track your deliveries, earnings, and performance metrics.
						</p>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2 text-sm font-semibold text-stone-600 bg-white border border-stone-200 px-4 py-2 rounded-xl">
							Last 7 Days <ChevronDown size={14} />
						</div>
						<button className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-5 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
							Start Route
						</button>
					</div>
				</div>

				{/* Top KPI Cards */}
				<DeliveryKPICards />

				{/* Middle Section */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Route Optimization */}
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:col-span-2 relative overflow-hidden">
						<div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-50 rounded-full blur-3xl opacity-60" />

						<div className="flex items-center gap-2 mb-4">
							<MapPin size={16} className="text-forest-600" />
							<span className="text-[10px] font-bold text-forest-700 uppercase tracking-widest">
								Route Intelligence
							</span>
						</div>

						<h2 className="text-lg font-bold text-stone-900 mb-2">
							Optimized Delivery Route
						</h2>
						<p className="text-sm text-stone-500 mb-6 max-w-lg leading-relaxed">
							Your AI-optimized route will save{" "}
							<strong className="text-stone-900">12 minutes</strong> and{" "}
							<strong className="text-stone-900">2.5 km</strong> compared to
							standard routing. Complete 4 deliveries with one more stop
							efficiency.
						</p>

						<div className="flex gap-3">
							<button className="flex-1 bg-forest-950 hover:bg-forest-900 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
								Start Route
							</button>
							<button className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold px-4 py-2.5 rounded-xl transition-colors text-sm">
								View Details
							</button>
						</div>
					</div>

					{/* Quick Stats */}
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 flex flex-col gap-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">
									Rating
								</p>
								<p className="text-2xl font-bold text-stone-900">4.9⭐</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center border border-yellow-100">
								<span className="text-lg">⭐</span>
							</div>
						</div>

						<div className="border-t border-stone-100 pt-4">
							<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
								Performance
							</p>
							<div className="flex items-center gap-2">
								<div className="flex-1 bg-stone-100 rounded-full h-2">
									<div
										className="bg-green-500 h-2 rounded-full"
										style={{ width: "92%" }}
									/>
								</div>
								<span className="text-sm font-bold text-stone-900">92%</span>
							</div>
							<p className="text-xs text-stone-500 mt-2">
								Top 8% of transporters this month
							</p>
						</div>

						<div className="border-t border-stone-100 pt-4">
							<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
								Active Days
							</p>
							<p className="text-2xl font-bold text-stone-900">18 days</p>
							<p className="text-xs text-stone-500 mt-1">
								2 more to reach weekly bonus
							</p>
						</div>
					</div>
				</div>

				{/* Recent Deliveries & Earnings */}
				<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
					<div className="lg:col-span-3">
						<RecentDeliveries />
					</div>
					<div className="lg:col-span-2">
						<EarningsOverview />
					</div>
				</div>
			</div>
		</div>
	);
}
