"use client";
import { ShieldCheck, Loader2 } from "lucide-react";
import { useCheckoutStore } from "../../../lib/store/checkoutStore";
import { useRouter } from "next/navigation";
import { useCreateOrder } from "@/hooks/useOrder";
import { useAuthStore } from "@/lib/store/authStore";
import { useToastStore } from "@/lib/store/toastStore";
import { useInitializePayment } from "@/hooks/usePayment";
import { useCreateOrderItem } from "@/hooks/useOrderItem";


export default function OrderSummary() {
	const { subtotal, total, shipping, serviceFee, items, clearCart, activeFarmerId } =
		useCheckoutStore();


	const router = useRouter();
	const { mutateAsync: createOrderApi, isPending: isCreatingOrder } =
		useCreateOrder();
	const { mutateAsync: initPaymentApi, isPending: isInitializingPayment } =
		useInitializePayment();
	const { mutateAsync: createOrderItemApi } = useCreateOrderItem();
	const user = useAuthStore((state) => state.user);

	const showToast = useToastStore((state) => state.showToast);

	const isPending = isCreatingOrder || isInitializingPayment;

	const handleCheckout = async () => {
		if (items.length === 0) return;
		try {
			const farmerId = activeFarmerId;

			const orderTotal = total();

			const buyerId = user?.buyer_profile?.id;

			if (!buyerId) {
				showToast(
					"Buyer profile not found. Please complete your profile before checking out.",
					"error",
				);
				return;
			}

			if (!farmerId) {
				showToast("No farmer associated with these items.", "error");
				return;
			}

			const createdOrder = await createOrderApi({
				buyer: buyerId,
				farmer: farmerId,
				total: orderTotal.toFixed(2),
				delivery_type: "DELIVERY",
			});


			if (createdOrder && createdOrder.id) {
				// Create Order Items
				await Promise.all(
					items.map((item) =>
						createOrderItemApi({
							order: createdOrder.id,
							produce: item.id,
							quantity: item.quantity,
							unit_price: item.price.toFixed(2),
						}),
					),
				);

				showToast("Order created! Initializing Squad payment...", "info");
				try {
					const paymentRes = await initPaymentApi({
						order_id: createdOrder.id,
					});
					if (paymentRes && paymentRes.checkout_url) {
						clearCart();
						window.location.href = paymentRes.checkout_url;
						return;
					}
				} catch (paymentErr: any) {
					if (paymentErr.message?.toLowerCase().includes("already paid")) {
						showToast("Payment already confirmed for this order.", "success");
					} else {
						showToast(
							"Squad payment initialization notice. Proceeding to order history.",
							"info",
						);
					}
				}

			}

			clearCart();
			showToast("Order placed successfully!", "success");
			router.push("/marketplace/orders");
		} catch (err: any) {
			console.error("[Checkout] Error:", err);
			showToast(
				`Order failed: ${err.message || "Please try again."}`,
				"error",
			);
		}


	};

	return (
		<div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm">
			<h2 className="text-lg font-bold text-forest-950 mb-5">Order Summary</h2>

			{/* Order Summary Math */}
			<div className="flex flex-col gap-2 mb-4">
				<div className="flex justify-between items-center text-sm">
					<span className="text-stone-500 font-medium">Subtotal</span>
					<span className="font-mono font-medium text-stone-900">
						₦{subtotal().toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between items-center text-sm">
					<span className="text-stone-500 font-medium">Shipping (est.)</span>
					<span className="font-mono font-medium text-stone-900">
						₦{shipping.toLocaleString()}
					</span>
				</div>
				<div className="flex justify-between items-center text-sm">
					<span className="text-stone-500 font-medium">Service Fee</span>
					<span className="font-mono font-medium text-stone-900">
						₦{serviceFee.toLocaleString()}
					</span>
				</div>
			</div>

			<div className="flex justify-between items-end mb-6">
				<span className="text-base font-bold text-forest-950">Total Due</span>
				<span className="text-2xl font-black text-forest-950">
					₦{total().toLocaleString()}
				</span>
			</div>

			<button
				onClick={handleCheckout}
				disabled={items.length === 0 || isPending}
				className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isPending ? (
					<>
						<Loader2 size={18} className="animate-spin" />
						Processing Order...
					</>
				) : (
					<>
						<ShieldCheck size={18} />
						Process Secure Payment
					</>
				)}
			</button>
			<p className="text-[10px] text-center text-stone-500 mt-3 font-medium">
				Powered by Squad API + Secure Escrow Enabled
			</p>

			{/* Trust Badge */}
			<div className="mt-6 bg-forest-100/50 border border-forest-200/60 rounded-xl p-4 flex items-start gap-3">
				<div className="bg-white rounded-full p-1 border border-forest-200 shadow-sm shrink-0">
					<ShieldCheck size={16} className="text-forest-600" />
				</div>
				<div>
					<h4 className="text-xs font-bold text-forest-950 mb-0.5">
						Farm Trust Certified
					</h4>
					<p className="text-[10px] text-forest-800/80 leading-relaxed">
						Your payment is held in escrow until you confirm produce quality
						upon delivery.
					</p>
				</div>
			</div>
		</div>
	);
}
