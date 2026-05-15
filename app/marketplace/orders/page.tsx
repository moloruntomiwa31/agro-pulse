"use client";

import {
	Check,
	Truck,
	Package,
	MapPin,
	ShieldCheck,
	ClipboardList,
	Loader2,
	AlertCircle,
} from "lucide-react";
import { useMyOrders } from "../../../hooks/useOrder";
import EmptyState from "../../../components/shared/EmptyState";
import type { Order, OrderStatus } from "../../../types/order";

const STATUS_STEPS: { status: OrderStatus; label: string; sub: string }[] = [
	{ status: "PENDING", label: "Order Placed", sub: "Awaiting payment" },
	{ status: "PAID", label: "Payment Secured", sub: "Funds in escrow" },
	{ status: "PROCESSING", label: "Harvested & Packed", sub: "Farmer preparing" },
	{ status: "IN_TRANSIT", label: "In Transit", sub: "En route to you" },
	{ status: "COMPLETED", label: "Delivered", sub: "Order complete" },
];

const STATUS_ORDER: OrderStatus[] = ["PENDING", "PAID", "PROCESSING", "IN_TRANSIT", "COMPLETED"];

function getStepIndex(status: OrderStatus) {
	return STATUS_ORDER.indexOf(status);
}

const STATUS_COLORS: Record<OrderStatus, string> = {
	PENDING: "bg-amber-50 text-amber-700 border-amber-200",
	PAID: "bg-blue-50 text-blue-700 border-blue-100",
	PROCESSING: "bg-purple-50 text-purple-700 border-purple-100",
	IN_TRANSIT: "bg-sky-50 text-sky-700 border-sky-100",
	COMPLETED: "bg-forest-50 text-forest-700 border-forest-100",
	CANCELLED: "bg-red-50 text-red-700 border-red-100",
};

function OrderCard({ order }: { order: Order }) {
	const currentStep = getStepIndex(order.order_status);

	return (
		<div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
			{/* Header */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
				<div>
					<div className="flex items-center gap-3 mb-1">
						<span className="text-sm font-bold text-stone-900">
							Order #{order.id.slice(0, 8).toUpperCase()}
						</span>
						<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${STATUS_COLORS[order.order_status]}`}>
							{order.order_status.replace("_", " ")}
						</span>
					</div>
					<p className="text-xs font-medium text-stone-500">
						{order.farmer_farm_name} · ₦{parseFloat(order.total).toLocaleString("en-NG")} ·{" "}
						{new Date(order.created_at).toLocaleDateString("en-NG", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</p>
				</div>
				<div className="mt-4 sm:mt-0 flex items-center gap-2">
					<ShieldCheck size={16} className="text-forest-600" />
					<span className="text-xs font-semibold text-forest-700">
						{order.delivery_type === "DELIVERY" ? "Home Delivery" : "Pickup"}
					</span>
				</div>
			</div>

			{/* Progress pipeline */}
			{order.order_status !== "CANCELLED" && (
				<div className="px-6 py-6">
					<div className="flex justify-between relative">
						{/* connector line */}
						<div className="absolute top-4 left-4 right-4 h-0.5 bg-stone-100" />
						<div
							className="absolute top-4 left-4 h-0.5 bg-forest-500 transition-all duration-500"
							style={{ width: `${(currentStep / (STATUS_STEPS.length - 1)) * 100}%` }}
						/>

						{STATUS_STEPS.map((step, i) => {
							const done = i <= currentStep;
							const active = i === currentStep;
							return (
								<div key={step.status} className="flex flex-col items-center gap-2 relative z-10">
									<div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-[0_0_0_3px_white] transition-colors ${
										done ? "bg-forest-500" : "bg-stone-100 border border-stone-200"
									} ${active ? "ring-4 ring-forest-100" : ""}`}>
										{i === 3 ? (
											<Truck size={13} className={done ? "text-white" : "text-stone-400"} />
										) : i === 2 ? (
											<Package size={13} className={done ? "text-white" : "text-stone-400"} />
										) : i === 4 ? (
											<MapPin size={13} className={done ? "text-white" : "text-stone-400"} />
										) : (
											<Check size={13} className={done ? "text-white" : "text-stone-400"} />
										)}
									</div>
									<div className="text-center hidden sm:block">
										<p className={`text-[11px] font-bold ${active ? "text-forest-700" : done ? "text-stone-700" : "text-stone-400"}`}>
											{step.label}
										</p>
										<p className={`text-[9px] uppercase tracking-wider mt-0.5 ${active ? "text-forest-500" : "text-stone-400"}`}>
											{step.sub}
										</p>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			)}
		</div>
	);
}

export default function OrdersPage() {
	const { data: orders, isLoading, isError } = useMyOrders();

	if (isLoading) {
		return (
			<div className="flex-1 flex items-center justify-center">
				<Loader2 size={28} className="animate-spin text-forest-500" />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex-1 flex items-center justify-center gap-3">
				<AlertCircle size={20} className="text-red-400" />
				<p className="text-sm text-stone-500">Failed to load orders</p>
			</div>
		);
	}

	const activeOrders = (Array.isArray(orders) ? orders : []).filter(
		(o) => o.order_status !== "COMPLETED" && o.order_status !== "CANCELLED"
	);
	const pastOrders = (Array.isArray(orders) ? orders : []).filter(
		(o) => o.order_status === "COMPLETED" || o.order_status === "CANCELLED"
	);

	if (!orders || (Array.isArray(orders) && orders.length === 0)) {
		return (
			<div className="flex-1 overflow-y-auto bg-stone-50/30 p-6 flex flex-col justify-center">
				<EmptyState
					icon={ClipboardList}
					title="No Orders Yet"
					description="You haven't placed any orders. Browse the marketplace to start sourcing fresh produce."
					actionLabel="Browse Marketplace"
					actionHref="/marketplace"
				/>
			</div>
		);
	}

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/30 p-6">
			<div className="max-w-4xl mx-auto flex flex-col gap-8">
				<div>
					<h1 className="font-display text-2xl font-bold text-stone-900 mb-1">
						Order Tracking
					</h1>
					<p className="text-sm text-stone-500">
						Track your escrow-secured purchases and delivery status.
					</p>
				</div>

				{activeOrders.length > 0 && (
					<div className="flex flex-col gap-4">
						<h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">
							Active Orders ({activeOrders.length})
						</h2>
						{activeOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				)}

				{pastOrders.length > 0 && (
					<div className="flex flex-col gap-4">
						<h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">
							Past Orders ({pastOrders.length})
						</h2>
						{pastOrders.map((order) => (
							<OrderCard key={order.id} order={order} />
						))}
					</div>
				)}
			</div>
		</div>
	);
}
