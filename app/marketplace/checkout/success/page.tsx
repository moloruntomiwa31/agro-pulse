"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useVerifyPayment } from "@/hooks/usePayment";
import type { Payment } from "@/types/payment";
import type { LucideProps } from "lucide-react";


import { Loader2, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useToastStore } from "@/lib/store/toastStore";

export interface SettingsTab {
	id: string;
	label: string;
	icon: React.ComponentType<LucideProps>;
}

export default function PaymentSuccessPage() {
	const searchParams = useSearchParams();
	const paymentId = searchParams.get("reference");
	const { mutateAsync: verifyPayment, isPending } = useVerifyPayment();
	const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");
	const [verifiedPayment, setVerifiedPayment] = useState<Payment | null>(null);

	const showToast = useToastStore((state) => state.showToast);
	const router = useRouter();
	const [countdown, setCountdown] = useState(5);

	useEffect(() => {

		if (paymentId) {
			verifyPayment(paymentId)
				.then((payment) => {
					if (payment.payment_status === "SUCCESS") {
						setVerifiedPayment(payment);
						setStatus("success");
						showToast("Payment verified successfully!", "success");

						
						// Start countdown for redirect
						const timer = setInterval(() => {
							setCountdown((prev) => prev - 1);
						}, 1000);

						return () => clearInterval(timer);

					} else if (payment.payment_status === "FAILED") {
						setStatus("error");
						showToast("Payment failed according to Squad.", "error");
					} else {
						setStatus("verifying");
					}
				})
				.catch((err) => {
					console.error("Verification error:", err);
					setStatus("error");
					showToast("Payment verification failed. Please contact support.", "error");
				});
		} else {
			setStatus("error");
		}
	}, [paymentId, verifyPayment, showToast]);

	// Separate effect for redirect to avoid "update during render" error
	useEffect(() => {
		if (status === "success" && countdown === 0) {
			router.push("/marketplace/orders");
		}
	}, [status, countdown, router]);



	return (
		<div className="flex-1 flex flex-col items-center justify-center p-6 bg-stone-50/30">
			<div className="w-full max-w-md bg-white rounded-3xl border border-stone-200 p-8 shadow-sm text-center">
				{status === "verifying" && (
					<div className="flex flex-col items-center gap-4 py-8">
						<Loader2 size={48} className="text-forest-500 animate-spin" />
						<h1 className="text-xl font-bold text-stone-900">Verifying Payment...</h1>
						<p className="text-sm text-stone-500 leading-relaxed">
							Please wait while we confirm your transaction with Squad.
						</p>
					</div>
				)}

				{status === "success" && (
					<div className="flex flex-col items-center gap-6 py-4">
						<div className="w-20 h-20 rounded-full bg-forest-50 flex items-center justify-center border-4 border-white shadow-sm ring-1 ring-forest-100">
							<CheckCircle2 size={40} className="text-forest-500" />
						</div>
						<div>
							<h1 className="text-2xl font-black text-forest-950 mb-2">Payment Secured</h1>
							<p className="text-sm text-stone-500 leading-relaxed px-4">
								Your funds are now held in escrow. Redirecting to your orders in {countdown}s...
							</p>
						</div>

						{verifiedPayment && (
							<div className="bg-stone-50 border border-stone-100 rounded-2xl px-4 py-3 flex items-center justify-between w-full">
								<span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Order ID</span>
								<span className="text-xs font-mono font-bold text-stone-600">
									#{verifiedPayment.order.slice(0, 8).toUpperCase()}
								</span>
							</div>
						)}



						{/* Escrow Badge */}
						<div className="w-full bg-forest-100/50 border border-forest-200/60 rounded-2xl p-4 flex items-start gap-3 text-left">
							<div className="bg-white rounded-full p-1.5 border border-forest-200 shadow-sm shrink-0">
								<ShieldCheck size={18} className="text-forest-600" />
							</div>
							<div>
								<h4 className="text-xs font-bold text-forest-950 mb-0.5">
									Escrow Protection Active
								</h4>
								<p className="text-[10px] text-forest-800/80 leading-relaxed">
									Payment will only be released to the farmer after you confirm the quality of the produce upon delivery.
								</p>
							</div>
						</div>

						<div className="w-full flex flex-col gap-3 pt-4">
							<Link
								href="/marketplace/orders"
								className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
							>
								Track Order Status
								<ArrowRight size={18} />
							</Link>
							<Link
								href="/marketplace"
								className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 rounded-xl transition-all"
							>
								Continue Shopping
							</Link>
						</div>
					</div>
				)}

				{status === "error" && (
					<div className="flex flex-col items-center gap-6 py-4">
						<div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center border-4 border-white shadow-sm ring-1 ring-red-100">
							<XCircle size={40} className="text-red-500" />
						</div>
						<div>
							<h1 className="text-2xl font-black text-red-950 mb-2">Verification Notice</h1>
							<p className="text-sm text-stone-500 leading-relaxed px-4">
								We couldn&#39;t verify your payment automatically. If you have been debited, don&#39;t worry — our system will update soon via webhook.
							</p>
						</div>
						
						<div className="w-full flex flex-col gap-3 pt-4">
							<button
								onClick={() => window.location.reload()}
								className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-3.5 rounded-xl transition-all"
							>
								Try Verifying Again
							</button>
							<Link
								href="/marketplace/orders"
								className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-3.5 rounded-xl transition-all"
							>
								Go to My Orders
							</Link>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
