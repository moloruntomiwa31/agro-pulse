"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle, XCircle, Info, Bell, X } from "lucide-react";
import {
	useToastStore,
	type Toast,
	type ToastVariant,
} from "../../lib/store/toastStore";

/* ─── Per-variant Tailwind classes ──────────────────────────── */
const VARIANTS: Record<
	ToastVariant,
	{ wrapper: string; bar: string; icon: React.ReactNode }
> = {
	success: {
		wrapper: "bg-forest-900/90 border border-forest-400/40",
		bar: "bg-gradient-to-r from-forest-600 to-forest-400",
		icon: <CheckCircle size={18} className="text-forest-400 shrink-0" />,
	},
	error: {
		wrapper: "bg-red-950/90 border border-red-500/40",
		bar: "bg-gradient-to-r from-red-700 to-red-500",
		icon: <XCircle size={18} className="text-red-400 shrink-0" />,
	},
	info: {
		wrapper: "bg-blue-950/90 border border-blue-400/40",
		bar: "bg-gradient-to-r from-blue-700 to-blue-400",
		icon: <Info size={18} className="text-blue-400 shrink-0" />,
	},
	default: {
		wrapper: "bg-forest-800/90 border border-forest-600/25",
		bar: "bg-gradient-to-r from-forest-700 to-forest-500",
		icon: <Bell size={18} className="text-forest-300 shrink-0" />,
	},
};

/* ─── Single toast ──────────────────────────────────────────── */
function ToastItem({ toast }: { toast: Toast }) {
	const remove = useToastStore((s) => s.remove);
	const [visible, setVisible] = useState(false);
	const [progress, setProgress] = useState(100);
	const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const v = VARIANTS[toast.variant];

	// Slide-in on mount
	useEffect(() => {
		requestAnimationFrame(() => setVisible(true));
	}, []);

	// Countdown progress bar
	useEffect(() => {
		const step = 100 / (toast.duration / 50);
		intervalRef.current = setInterval(() => {
			setProgress((p) => {
				const next = p - step;
				if (next <= 0) {
					clearInterval(intervalRef.current!);
					return 0;
				}
				return next;
			});
		}, 50);
		return () => clearInterval(intervalRef.current!);
	}, [toast.duration]);

	const dismiss = () => {
		setVisible(false);
		setTimeout(() => remove(toast.id), 300);
	};

	return (
		<div
			role="alert"
			aria-live="polite"
			onClick={dismiss}
			className={[
				"relative overflow-hidden cursor-pointer select-none",
				"min-w-[280px] max-w-[380px] rounded-2xl px-4 pt-3.5 pb-4",
				"backdrop-blur-xl shadow-2xl",
				"transition-all duration-300 ease-out",
				v.wrapper,
				visible
					? "opacity-100 translate-y-0 scale-100"
					: "opacity-0 translate-y-3 scale-95",
			].join(" ")}
		>
			{/* Content row */}
			<div className="flex items-center gap-3">
				{v.icon}
				<p className="flex-1 text-sm font-medium text-forest-50 leading-snug font-display">
					{toast.message}
				</p>
				<button
					onClick={(e) => {
						e.stopPropagation();
						dismiss();
					}}
					className="shrink-0 p-0.5 text-forest-50/30 hover:text-forest-50/70 transition-colors"
					aria-label="Dismiss"
				>
					<X size={14} />
				</button>
			</div>

			{/* Progress bar */}
			<div
				className={`absolute bottom-0 left-0 h-[3px] rounded-b-2xl transition-[width] duration-75 ${v.bar}`}
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}

/* ─── Portal container ──────────────────────────────────────── */
export default function Toaster() {
	const toasts = useToastStore((s) => s.toasts);
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);
	if (!mounted) return null;

	return createPortal(
		<div
			aria-label="Notifications"
			className="fixed bottom-6 right-6 z-[99999] flex flex-col items-end gap-2.5 pointer-events-none"
		>
			{toasts.map((t) => (
				<div key={t.id} className="pointer-events-auto">
					<ToastItem toast={t} />
				</div>
			))}
		</div>,
		document.body,
	);
}
