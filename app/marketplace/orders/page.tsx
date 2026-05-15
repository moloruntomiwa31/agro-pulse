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
	Trash2,
	ChevronDown,
	ChevronUp,
} from "lucide-react";
import { useState } from "react";
import { useMyOrders, useDeleteOrder } from "../../../hooks/useOrder";
import { useOrderItemsByOrder } from "../../../hooks/useOrderItem";
import { useInitializePayment, useMyPayments } from "../../../hooks/usePayment";
import { useToastStore } from "../../../lib/store/toastStore";
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

/** Only PENDING and CANCELLED orders can be deleted */
const DELETABLE_STATUSES: OrderStatus[] = ["PENDING", "CANCELLED"];

interface OrderCardProps {
	order: Order;
	isPaymentInitialized?: boolean;
}

function OrderCard({ order, isPaymentInitialized }: OrderCardProps) {

	const currentStep = getStepIndex(order.order_status);
	const [confirming, setConfirming] = useState(false);
	const deleteMutation = useDeleteOrder();
	const canDelete = DELETABLE_STATUSES.includes(order.order_status);

	const handleDelete = () => {
		deleteMutation.mutate(order.id, {
			onSuccess: () => setConfirming(false),
		});
	};

	const { mutateAsync: initPayment, isPending: isInitializing } = useInitializePayment();
	const showToast = useToastStore((state) => state.showToast);
	const [expanded, setExpanded] = useState(false);
	const { data: itemsResponse, isLoading: itemsLoading } = useOrderItemsByOrder(order.id);
	const items = itemsResponse || [];

	const handlePayNow = async () => {

		try {
			const res = await initPayment({ order_id: order.id });
			if (res.checkout_url) {
				window.location.href = res.checkout_url;
			}
		} catch (err: any) {
			if (err.message?.toLowerCase().includes("already paid")) {
				showToast("Order is already paid and secured.", "success");
				// Force refresh or redirect to success would be good here if we had the payment ID
				return;
			}
			showToast(err.message || "Failed to initialize payment", "error");
		}

	};


	return (
		<div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
			{/* Header */}
			<div 
				onClick={() => setExpanded(!expanded)}
				className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50 cursor-pointer hover:bg-stone-100/50 transition-colors"
			>

				<div>
					<div className="flex items-center gap-3 mb-1">
						<span className="text-sm font-bold text-stone-900">
							Order #{order.id.slice(0, 8).toUpperCase()}
						</span>
						<span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${STATUS_COLORS[order.order_status]}`}>
							{order.order_status === "PENDING" && isPaymentInitialized 
								? "Awaiting Confirmation" 
								: order.order_status.replace("_", " ")}
						</span>
						{isPaymentInitialized && order.order_status === "PENDING" && (
							<div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-100 animate-pulse">
								<div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
								<span className="text-[9px] font-bold text-amber-600 uppercase">Payment Initialized</span>
							</div>
						)}
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
				<div className="mt-4 sm:mt-0 flex items-center gap-3">
					<div className="flex items-center gap-2">
						<ShieldCheck size={16} className="text-forest-600" />
						<span className="text-xs font-semibold text-forest-700">
							{order.delivery_type === "DELIVERY" ? "Home Delivery" : "Pickup"}
						</span>
					</div>
					{order.order_status === "PAID" && (
						<div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-50 border border-forest-100">
							<ShieldCheck size={14} className="text-forest-600" />
							<span className="text-[10px] font-bold text-forest-700 uppercase tracking-wider">
								Payment Secured
							</span>
						</div>
					)}

					{order.order_status === "PENDING" && (
						<button
							onClick={(e) => {
								e.stopPropagation();
								handlePayNow();
							}}
							disabled={isInitializing}
							className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-forest-950 hover:bg-forest-900 transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
						>

							{isInitializing ? (
								<Loader2 size={14} className="animate-spin" />
							) : (
								<ShieldCheck size={14} />
							)}
							Pay Now
						</button>
					)}
					<button
						onClick={(e) => {
							e.stopPropagation();
							setExpanded(!expanded);
						}}
						className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 border border-stone-200 hover:bg-stone-50 transition-colors"
					>

						{expanded ? "Hide Items" : "View Items"}
						{expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
					</button>
					{canDelete && !confirming && (


						<button
							onClick={(e) => {
								e.stopPropagation();
								setConfirming(true);
							}}
							className="p-1.5 rounded-lg text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors"
							title="Delete order"
						>

							<Trash2 size={15} />
						</button>
					)}
				</div>
			</div>

			{/* Delete confirmation */}
			{confirming && (
				<div className="flex items-center justify-between px-6 py-3 bg-red-50 border-b border-red-100">
					<p className="text-sm text-red-700 font-medium">
						Delete order #{order.id.slice(0, 8).toUpperCase()}? This cannot be undone.
					</p>
					<div className="flex items-center gap-2 ml-4 shrink-0">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setConfirming(false);
							}}
							className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 border border-stone-200 hover:bg-stone-100 transition-colors"
						>

							Cancel
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								handleDelete();
							}}
							disabled={deleteMutation.isPending}
							className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 transition-colors flex items-center gap-1.5"
						>

							{deleteMutation.isPending ? (
								<Loader2 size={12} className="animate-spin" />
							) : (
								<Trash2 size={12} />
							)}
							Delete
						</button>
					</div>
				</div>
			)}

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

			{/* Items List */}
			{expanded && (
				<div className="border-t border-stone-100 bg-stone-50/30">
					<div className="px-6 py-4">
						<h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">
							Order Contents
						</h4>
						{itemsLoading ? (
							<div className="flex items-center justify-center py-4">
								<Loader2 size={16} className="animate-spin text-forest-500" />
							</div>
						) : items.length === 0 ? (
							<p className="text-xs text-stone-500 py-2 italic">No items found for this order.</p>
						) : (
							<div className="flex flex-col gap-3">
								{items.map((item) => (
									<div key={item.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-stone-200 shadow-sm">
										<div className="flex items-center gap-3">
											<div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center text-xl">
												{item.produce_category === "VEGETABLES" ? "🥬" : 
												 item.produce_category === "FRUITS" ? "🍎" : 
												 item.produce_category === "GRAINS" ? "🌾" : "📦"}
											</div>
											<div>
												<p className="text-sm font-bold text-stone-900">{item.produce_name}</p>
												<p className="text-[10px] text-stone-500">
													{item.quantity} units · ₦{parseFloat(item.unit_price).toLocaleString()} / unit
												</p>
											</div>
										</div>
										<div className="text-right">
											<p className="text-sm font-black text-forest-950">
												₦{parseFloat(item.subtotal).toLocaleString()}
											</p>
											<span className="inline-flex items-center gap-1 text-[9px] font-bold text-forest-600 bg-forest-50 px-1.5 py-0.5 rounded-full border border-forest-100">
												<ShieldCheck size={10} />
												AI Verified Quality
											</span>
										</div>
									</div>
								))}
								
								<div className="flex justify-between items-center pt-2 mt-1 border-t border-stone-100">
									<p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Order Total</p>
									<p className="text-base font-black text-forest-950">₦{parseFloat(order.total).toLocaleString()}</p>
								</div>
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
}


export default function OrdersPage() {
	const { data: orders, isLoading: ordersLoading, isError } = useMyOrders();
	const { data: paymentsResponse, isLoading: paymentsLoading } = useMyPayments();

	const isLoading = ordersLoading || paymentsLoading;
	const payments = paymentsResponse?.results || [];

	// Map of order IDs that have initialized payments
	const initializedOrderIds = new Set(
		payments
			.filter((p) => p.payment_status === "PENDING")
			.map((p) => p.order)
	);

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
							<OrderCard 
								key={order.id} 
								order={order} 
								isPaymentInitialized={initializedOrderIds.has(order.id)}
							/>
						))}
					</div>

				)}

				{pastOrders.length > 0 && (
					<div className="flex flex-col gap-4">
						<h2 className="text-xs font-bold uppercase tracking-widest text-stone-400">
							Past Orders ({pastOrders.length})
						</h2>
						{pastOrders.map((order) => (
							<OrderCard 
								key={order.id} 
								order={order} 
								isPaymentInitialized={initializedOrderIds.has(order.id)}
							/>
						))}
					</div>

				)}
			</div>
		</div>
	);
}
