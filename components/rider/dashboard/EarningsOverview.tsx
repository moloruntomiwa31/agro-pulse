"use client";

import { TrendingUp, Calendar, Zap } from "lucide-react";

export default function EarningsOverview() {
	return (
		<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-lg font-bold text-stone-900">Earnings Overview</h2>
				<div className="flex items-center gap-2 text-sm font-semibold text-stone-600 bg-stone-50 border border-stone-200 px-4 py-2 rounded-xl">
					<Calendar size={14} /> This Week
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				<div className="bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl border border-forest-100 p-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-forest-600 mb-2">
						Weekly Earnings
					</p>
					<p className="text-lg font-bold text-forest-900">₦2,850</p>
					<p className="text-xs text-forest-700 mt-2">
						12 deliveries completed
					</p>
				</div>

				<div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-100 p-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-2">
						Bonus Earned
					</p>
					<p className="text-lg font-bold text-orange-900">₦350</p>
					<p className="text-xs text-orange-700 mt-2">
						Ratings & performance bonus
					</p>
				</div>

				<div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-100 p-4">
					<p className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">
						Available Balance
					</p>
					<p className="text-lg font-bold text-green-900">₦3,200</p>
					<p className="text-xs text-green-700 mt-2">Ready to withdraw</p>
				</div>
			</div>

			{/* Earnings Chart Placeholder */}
			<div className="bg-stone-50 rounded-xl border border-stone-100 p-6">
				<div className="flex items-center gap-2 mb-4">
					<Zap size={16} className="text-orange-500" />
					<span className="text-xs font-bold text-stone-600 uppercase tracking-widest">
						Daily Trend
					</span>
				</div>

				<div className="h-40 flex items-end justify-between gap-2 px-2 pb-4 border-b border-stone-200 relative">
					<div className="absolute top-4 left-0 right-0 border-t border-dashed border-stone-200" />
					<div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-stone-200" />

					{[35, 45, 55, 40, 70, 50, 65].map((height, i) => {
						const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
						return (
							<div key={i} className="flex-1 flex flex-col items-center gap-2">
								<div
									className={`w-full rounded-t-lg transition-all duration-300 ${
										i === 5
											? "bg-forest-950"
											: "bg-stone-200 hover:bg-stone-300"
									}`}
									style={{ height: `${height}%` }}
								/>
								<span className="text-[10px] font-semibold text-stone-500">
									{days[i]}
								</span>
							</div>
						);
					})}
				</div>

				<div className="mt-4 flex items-center justify-between text-sm">
					<p className="text-stone-600">
									<span className="font-bold text-stone-900">₦7,600</span> total
						earnings this month
					</p>
					<button className="text-forest-700 hover:text-forest-900 font-semibold flex items-center gap-1">
						<TrendingUp size={16} /> View Details
					</button>
				</div>
			</div>
		</div>
	);
}
