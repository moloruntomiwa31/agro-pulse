"use client";

import { TrendingUp, Clock, MapPin, DollarSign } from "lucide-react";

export default function DeliveryKPICards() {
	const cards = [
		{
			label: "Active Deliveries",
			value: "3",
			change: "+1 from yesterday",
			icon: MapPin,
			color: "forest",
		},
		{
			label: "Avg Delivery Time",
			value: "18 min",
			change: "-2 min vs weekly avg",
			icon: Clock,
			color: "orange",
		},
		{
			label: "Completion Rate",
			value: "98.5%",
			change: "+0.5% this month",
			icon: TrendingUp,
			color: "green",
		},
		{
			label: "Today's Earnings",
			value: "₦450",
			change: "+15% vs yesterday",
			icon: DollarSign,
			color: "amber",
		},
	];

	const colorClasses = {
		forest: "bg-forest-50 border-forest-100 text-forest-700",
		orange: "bg-orange-50 border-orange-100 text-orange-700",
		green: "bg-green-50 border-green-100 text-green-700",
		amber: "bg-amber-50 border-amber-100 text-amber-700",
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
			{cards.map((card, i) => {
				const Icon = card.icon;
				const bgClass = colorClasses[card.color as keyof typeof colorClasses];

				return (
					<div
						key={i}
						className={`rounded-2xl border shadow-sm p-6 bg-white border-stone-200`}
					>
						<div className="flex items-start justify-between mb-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
									{card.label}
								</p>
								<p className="text-2xl font-bold text-stone-900">
									{card.value}
								</p>
							</div>
							<div className={`p-3 rounded-xl border ${bgClass}`}>
								<Icon size={18} />
							</div>
						</div>
						<p className="text-xs text-stone-500">{card.change}</p>
					</div>
				);
			})}
		</div>
	);
}
