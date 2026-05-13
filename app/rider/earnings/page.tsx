"use client";

import {
	Wallet,
	TrendingUp,
	Calendar,
	Download,
	ArrowUpRight,
	DollarSign,
	Target,
	Award,
} from "lucide-react";
import { useState } from "react";

export default function TransporterEarnings() {
	const [period, setPeriod] = useState("week");

	const earningsData = {
		week: {
			total: "₦2,850",
			deliveries: 12,
			bonus: "₦350",
			change: "+12% from last week",
			breakdown: [
				{ day: "Mon", earnings: 380, deliveries: 2 },
				{ day: "Tue", earnings: 420, deliveries: 2 },
				{ day: "Wed", earnings: 350, deliveries: 2 },
				{ day: "Thu", earnings: 480, deliveries: 2 },
				{ day: "Fri", earnings: 520, deliveries: 2 },
				{ day: "Sat", earnings: 420, deliveries: 1 },
				{ day: "Sun", earnings: 280, deliveries: 1 },
			],
		},
		month: {
			total: "₦11,200",
			deliveries: 48,
			bonus: "₦1,400",
			change: "+18% from last month",
			breakdown: [
				{ week: "Week 1", earnings: 2100, deliveries: 10 },
				{ week: "Week 2", earnings: 2950, deliveries: 12 },
				{ week: "Week 3", earnings: 2650, deliveries: 11 },
				{ week: "Week 4", earnings: 3500, deliveries: 15 },
			],
		},
	};

	const current = earningsData[period as keyof typeof earningsData];
	const isBiggest = period === "month";

	const transactions = [
		{
			id: "TXN-001",
			type: "delivery",
			description: "Fresh Mart Retail - Fresh Vegetables",
			amount: "₦250",
			date: "Today, 2:18 PM",
			status: "completed",
		},
		{
			id: "TXN-002",
			type: "bonus",
			description: "Performance Bonus - 98% Rating",
			amount: "₦50",
			date: "Today, 2:30 PM",
			status: "completed",
		},
		{
			id: "TXN-003",
			type: "delivery",
			description: "City Grocery - Organic Items",
			amount: "₦280",
			date: "Today, 1:45 PM",
			status: "completed",
		},
		{
			id: "TXN-004",
			type: "bonus",
			description: "Quick Delivery Bonus - Under 15 min",
			amount: "₦30",
			date: "Yesterday, 3:20 PM",
			status: "completed",
		},
		{
			id: "TXN-005",
			type: "withdrawal",
			description: "Payout to Bank Account",
			amount: "₦5,000",
			date: "Yesterday",
			status: "processing",
		},
	];

	const maxEarning = Math.max(
		...(isBiggest
			? (current.breakdown as any).map((d: any) => d.earnings)
			: (current.breakdown as any).map((d: any) => d.earnings)),
	);

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-6xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="flex items-end justify-between mb-2">
					<div>
						<div className="flex items-center gap-2 mb-2">
							<Wallet size={16} className="text-forest-600" />
							<span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
								Financial Overview
							</span>
						</div>
						<h1 className="text-2xl font-bold text-stone-900 mb-1">
							Earnings Report
						</h1>
						<p className="text-sm text-stone-500">
							Track your income, bonuses, and payment history.
						</p>
					</div>
					<button className="flex items-center gap-2 text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 px-4 py-2.5 rounded-xl transition-colors">
						<Download size={16} /> Download
					</button>
				</div>

				{/* Period Selector */}
				<div className="flex gap-2">
					{["week", "month"].map((p) => (
						<button
							key={p}
							onClick={() => setPeriod(p)}
							className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
								period === p
									? "bg-forest-950 text-white"
									: "bg-white text-stone-700 border border-stone-200 hover:bg-stone-50"
							}`}
						>
							{p === "week" ? "This Week" : "This Month"}
						</button>
					))}
				</div>

				{/* Top Stats */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start justify-between mb-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
									Total Earnings
								</p>
								<p className="text-2xl font-bold text-stone-900">
									{current.total}
								</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center border border-green-100">
								<DollarSign size={24} className="text-green-600" />
							</div>
						</div>
						<p className="text-xs text-green-600">{current.change}</p>
					</div>

					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start justify-between mb-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
									Deliveries
								</p>
								<p className="text-2xl font-bold text-stone-900">
									{current.deliveries}
								</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100">
								<TrendingUp size={24} className="text-orange-600" />
							</div>
						</div>
						<p className="text-xs text-stone-500">Completed successfully</p>
					</div>

					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start justify-between mb-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
									Bonus Earned
								</p>
								<p className="text-2xl font-bold text-stone-900">
									{current.bonus}
								</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center border border-yellow-100">
								<Award size={24} className="text-yellow-600" />
							</div>
						</div>
						<p className="text-xs text-stone-500">
							Performance & speed bonuses
						</p>
					</div>

					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start justify-between mb-4">
							<div>
								<p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-2">
									Available Balance
								</p>
								<p className="text-2xl font-bold text-stone-900">₦3,200</p>
							</div>
							<div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center border border-forest-100">
								<Target size={24} className="text-forest-600" />
							</div>
						</div>
						<button className="text-xs font-semibold text-forest-700 hover:text-forest-900">
							Request Withdrawal →
						</button>
					</div>
				</div>

				{/* Chart & Transaction List */}
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Earnings Chart */}
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:col-span-2">
						<div className="mb-6">
							<h2 className="text-lg font-bold text-stone-900">
								Earnings Trend
							</h2>
							<p className="text-sm text-stone-500">
								{period === "week"
									? "Daily earnings breakdown"
									: "Weekly earnings breakdown"}
							</p>
						</div>

						<div className="h-56 flex items-end justify-between gap-2 px-2 pb-4 border-b border-stone-100">
							<div className="absolute top-0 left-0 right-0 border-t border-dashed border-stone-200 mt-4" />
							<div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-stone-200" />

							{current.breakdown.map((item, i) => {
								const label = isBiggest
									? (item as any).week
									: (item as any).day;
								const height = ((item.earnings || 0) / maxEarning) * 100;

								return (
									<div
										key={i}
										className="flex-1 flex flex-col items-center gap-2"
									>
										<div
											className={`w-full rounded-t-lg transition-all duration-300 relative group ${
												i === current.breakdown.length - 1
													? "bg-forest-600"
													: "bg-stone-200 hover:bg-stone-300"
											}`}
											style={{ height: `${height}%` }}
										>
											<div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs font-bold py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 shadow-md">
												₦{item.earnings}
											</div>
										</div>
										<span className="text-[10px] font-semibold text-stone-500 text-center">
											{label}
										</span>
									</div>
								);
							})}
						</div>

						<div className="mt-6 grid grid-cols-2 gap-4">
							<div>
								<p className="text-xs text-stone-500 mb-1">Highest Earning</p>
								<p className="text-lg font-bold text-stone-900">
									₦{Math.max(...current.breakdown.map((d) => d.earnings))}
								</p>
							</div>
							<div>
								<p className="text-xs text-stone-500 mb-1">Average</p>
								<p className="text-lg font-bold text-stone-900">
									₦
									{Math.round(
										current.breakdown.reduce(
											(a, b) => a + (b.earnings || 0),
											0,
										) / current.breakdown.length,
									)}
								</p>
							</div>
						</div>
					</div>

					{/* Bonus Structure */}
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<h2 className="text-lg font-bold text-stone-900 mb-4">
							Bonus Structure
						</h2>

						<div className="space-y-3">
							<div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
								<div className="flex items-start justify-between mb-1">
									<p className="text-sm font-semibold text-stone-900">
										Delivery Bonus
									</p>
									<span className="text-xs font-bold text-green-600">
										+₦20-50
									</span>
								</div>
								<p className="text-xs text-stone-500">
									Per successful delivery
								</p>
							</div>

							<div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
								<div className="flex items-start justify-between mb-1">
									<p className="text-sm font-semibold text-stone-900">
										Speed Bonus
									</p>
									<span className="text-xs font-bold text-orange-600">
										+₦30
									</span>
								</div>
								<p className="text-xs text-stone-500">Complete under 15 min</p>
							</div>

							<div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
								<div className="flex items-start justify-between mb-1">
									<p className="text-sm font-semibold text-stone-900">
										Rating Bonus
									</p>
									<span className="text-xs font-bold text-blue-600">+₦50</span>
								</div>
								<p className="text-xs text-stone-500">Maintain 4.8+ rating</p>
							</div>

							<div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
								<div className="flex items-start justify-between mb-1">
									<p className="text-sm font-semibold text-stone-900">
										Weekly Bonus
									</p>
									<span className="text-xs font-bold text-purple-600">
										+₦200
									</span>
								</div>
								<p className="text-xs text-stone-500">10+ deliveries/week</p>
							</div>
						</div>
					</div>
				</div>

				{/* Recent Transactions */}
				<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
					<h2 className="text-lg font-bold text-stone-900 mb-4">
						Recent Transactions
					</h2>

					<div className="space-y-3">
						{transactions.map((txn) => (
							<div
								key={txn.id}
								className="flex items-center justify-between p-4 border border-stone-100 rounded-lg hover:bg-stone-50 transition-colors"
							>
								<div className="flex items-start gap-3 flex-1">
									<div
										className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
											txn.type === "delivery"
												? "bg-forest-50 text-forest-600"
												: txn.type === "bonus"
													? "bg-yellow-50 text-yellow-600"
													: "bg-red-50 text-red-600"
										}`}
									>
										{txn.type === "delivery" ? (
											<ArrowUpRight size={18} />
										) : (
											<Award size={18} />
										)}
									</div>
									<div className="flex-1">
										<p className="text-sm font-semibold text-stone-900">
											{txn.description}
										</p>
										<p className="text-xs text-stone-500 mt-1">{txn.date}</p>
									</div>
								</div>
								<div className="text-right">
									<p className="text-sm font-bold text-stone-900">
										+{txn.amount}
									</p>
									<span
										className={`text-xs font-semibold ${
											txn.status === "completed"
												? "text-green-600"
												: "text-orange-600"
										}`}
									>
										{txn.status === "completed" ? "Completed" : "Processing"}
									</span>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
