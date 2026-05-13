"use client";

import {
	Check,
	Truck,
	Package,
	MapPin,
	Phone,
	ShieldCheck,
	ClipboardList,
} from "lucide-react";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";
import EmptyState from "../../../components/shared/EmptyState";

export default function OrdersPage() {
	const { orders } = useCheckoutStore();

	if (orders.length === 0) {
		return (
			<div className="flex-1 overflow-y-auto bg-stone-50/30 p-6 flex flex-col justify-center">
				<EmptyState
					icon={ClipboardList}
					title="No Active Orders"
					description="You don't have any orders currently in transit. Check out the marketplace to start sourcing sustainable produce."
					actionLabel="Browse Marketplace"
					actionHref="/marketplace"
				/>
			</div>
		);
	}

	const activeOrder = orders[0];

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/30 p-6">
			<div className="max-w-4xl mx-auto flex flex-col gap-8">
				{/* Header */}
				<div>
					<h1 className="font-display text-2xl font-bold text-stone-900 mb-1">
						Live Order Tracking
					</h1>
					<p className="text-sm text-stone-500">
						Track your escrow-secured purchases and delivery status in
						real-time.
					</p>
				</div>

				{/* Active Order Card */}
				<div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
					{/* Order Meta */}
					<div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
						<div>
							<div className="flex items-center gap-3 mb-1">
								<span className="text-sm font-bold text-stone-900">
									Order #{activeOrder.id}
								</span>
								<span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest border border-blue-100">
									{activeOrder.status}
								</span>
							</div>
							<p className="text-xs font-medium text-stone-500">
								Placed on {activeOrder.date} • ₦
								{activeOrder.total.toLocaleString()} Total Escrow
							</p>
						</div>

						<div className="mt-4 sm:mt-0 flex items-center gap-2">
							<ShieldCheck size={16} className="text-forest-600" />
							<span className="text-xs font-semibold text-forest-700">
								Funds Secured in Escrow
							</span>
						</div>
					</div>

					<div className="p-6">
						{/* Tracking Pipeline */}
						<div className="relative mb-12 mt-4">
							<div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-stone-100 md:hidden" />

							<div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-0">
								{/* Step 1 */}
								<div className="flex md:flex-col items-center gap-4 md:gap-2 relative w-full">
									<div className="hidden md:block absolute top-4 left-1/2 right-[-50%] h-0.5 bg-forest-500" />
									<div className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
										<Check size={14} className="text-white" />
									</div>
									<div className="text-left md:text-center mt-0 md:mt-2">
										<p className="text-sm font-bold text-stone-900">
											Payment Secured
										</p>
										<p className="text-[10px] font-medium text-stone-500 uppercase tracking-widest mt-0.5">
											Completed
										</p>
									</div>
								</div>

								{/* Step 2 */}
								<div className="flex md:flex-col items-center gap-4 md:gap-2 relative w-full">
									<div className="hidden md:block absolute top-4 left-[-50%] right-1/2 h-0.5 bg-forest-500" />
									<div className="hidden md:block absolute top-4 left-1/2 right-[-50%] h-0.5 bg-forest-500" />
									<div className="w-8 h-8 rounded-full bg-forest-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
										<Package size={14} className="text-white" />
									</div>
									<div className="text-left md:text-center mt-0 md:mt-2">
										<p className="text-sm font-bold text-stone-900">
											Harvested & Packed
										</p>
										<p className="text-[10px] font-medium text-stone-500 uppercase tracking-widest mt-0.5">
											Completed
										</p>
									</div>
								</div>

								{/* Step 3 (Active) */}
								<div className="flex md:flex-col items-center gap-4 md:gap-2 relative w-full">
									<div className="hidden md:block absolute top-4 left-[-50%] right-1/2 h-0.5 bg-forest-500" />
									<div className="hidden md:block absolute top-4 left-1/2 right-[-50%] h-0.5 bg-stone-100" />
									<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white] ring-4 ring-blue-50">
										<Truck size={14} className="text-white" />
									</div>
									<div className="text-left md:text-center mt-0 md:mt-2">
										<p className="text-sm font-bold text-blue-700">
											In Transit
										</p>
										<p className="text-[10px] font-medium text-blue-500/80 uppercase tracking-widest mt-0.5">
											En Route to Buyer
										</p>
									</div>
								</div>

								{/* Step 4 (Pending) */}
								<div className="flex md:flex-col items-center gap-4 md:gap-2 relative w-full">
									<div className="hidden md:block absolute top-4 left-[-50%] right-1/2 h-0.5 bg-stone-100" />
									<div className="w-8 h-8 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center shrink-0 z-10 shadow-[0_0_0_4px_white]">
										<MapPin size={14} className="text-stone-400" />
									</div>
									<div className="text-left md:text-center mt-0 md:mt-2">
										<p className="text-sm font-bold text-stone-400">
											Delivered
										</p>
										<p className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mt-0.5">
											Pending
										</p>
									</div>
								</div>
							</div>
						</div>

						{/* Two Column Layout for Map & Info */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-stone-100 pt-6">
							{/* Delivery Details */}
							<div className="flex flex-col gap-6">
								<div>
									<h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
										Assigned Transporter
									</h3>
									<div className="flex items-center gap-4 p-3 rounded-xl border border-stone-200 bg-stone-50">
										<div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden shrink-0">
											<img
												src="https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=100&q=70"
												alt="Transporter"
												className="w-full h-full object-cover"
											/>
										</div>
										<div className="flex-1 min-w-0">
											<p className="text-sm font-bold text-stone-900 truncate">
												Ibrahim S.
											</p>
											<p className="text-xs font-medium text-stone-500">
												Toyota Hilux • KAN-891-AB
											</p>
										</div>
										<button className="w-8 h-8 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-600 hover:text-forest-600 hover:border-forest-200 transition-colors shrink-0">
											<Phone size={14} />
										</button>
									</div>
								</div>

								<div>
									<h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
										Delivery Route
									</h3>
									<div className="flex flex-col gap-4 relative">
										<div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-stone-100" />

										<div className="flex items-start gap-3 relative z-10">
											<div className="w-4 h-4 rounded-full bg-stone-200 border-2 border-white mt-0.5 shrink-0" />
											<div>
												<p className="text-xs font-bold text-stone-900">
													{activeOrder.items[0]?.farm || "Green Valley Farms"}
												</p>
												<p className="text-[10px] text-stone-500 mt-0.5">
													Pickup Location
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3 relative z-10">
											<div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white mt-0.5 shrink-0 ring-2 ring-blue-100" />
											<div>
												<p className="text-xs font-bold text-blue-700">
													Currently in Transit
												</p>
												<p className="text-[10px] text-blue-500 mt-0.5">
													Updated recently
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3 relative z-10">
											<div className="w-4 h-4 rounded-full bg-stone-200 border-2 border-white mt-0.5 shrink-0" />
											<div>
												<p className="text-xs font-bold text-stone-900">
													Your Location
												</p>
												<p className="text-[10px] text-stone-500 mt-0.5">
													Dropoff Location
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/* Map Placeholder */}
							<div className="bg-stone-100 rounded-xl border border-stone-200 overflow-hidden relative min-h-[250px]">
								{/* Abstract grid pattern representing a map */}
								<div
									className="absolute inset-0 opacity-[0.03]"
									style={{
										backgroundImage:
											"radial-gradient(#000 1px, transparent 1px)",
										backgroundSize: "16px 16px",
									}}
								/>

								{/* Route visualization curve */}
								<svg
									className="absolute inset-0 w-full h-full stroke-blue-500 stroke-2 fill-none"
									preserveAspectRatio="none"
									viewBox="0 0 100 100"
								>
									<path
										d="M 20 20 Q 50 20 50 50 T 80 80"
										strokeDasharray="4 4"
										className="opacity-50"
									/>
									<path d="M 20 20 Q 50 20 40 40" strokeWidth="3" />
								</svg>

								<div className="absolute top-[15%] left-[15%] flex flex-col items-center">
									<div className="w-3 h-3 rounded-full bg-stone-400 border-2 border-white shadow-sm" />
									<span className="text-[9px] font-bold text-stone-500 mt-1 bg-white/80 px-1 rounded">
										Origin
									</span>
								</div>

								<div className="absolute top-[35%] left-[35%]">
									<div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shadow-sm animate-pulse">
										<Truck size={14} className="text-blue-600" />
									</div>
								</div>

								<div className="absolute bottom-[15%] right-[15%] flex flex-col items-center">
									<div className="w-4 h-4 rounded-full bg-forest-500 border-2 border-white shadow-sm flex items-center justify-center">
										<MapPin size={8} className="text-white" />
									</div>
									<span className="text-[9px] font-bold text-stone-700 mt-1 bg-white/80 px-1 rounded">
										Destination
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* Items Sub-panel */}
					<div className="bg-stone-50 border-t border-stone-200 p-6">
						<h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-4">
							Shipment Manifest
						</h3>
						<div className="flex flex-col gap-3">
							{activeOrder.items.map((item) => (
								<div
									key={item.id}
									className="flex items-center justify-between"
								>
									<div className="flex items-center gap-3">
										<div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 border border-stone-200 bg-white">
											<img
												src={item.image}
												className="w-full h-full object-cover"
												alt="item"
											/>
										</div>
										<div>
											<p className="text-sm font-bold text-stone-900">
												{item.name}
											</p>
											<p className="text-[10px] text-stone-500 font-medium">
												{item.quantity} {item.unit}
											</p>
										</div>
									</div>
									<span className="text-sm font-bold text-stone-900">
										₦{(item.price * item.quantity).toLocaleString()}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
