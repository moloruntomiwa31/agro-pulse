"use client";

import { Bell, MapPin, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function TopBar() {
	return (
		<header className="h-[60px] border-b border-stone-200 bg-white flex items-center justify-between px-8 sticky top-0 z-40">
			{/* Left - Location Status */}
			<div className="flex items-center gap-3">
				<div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
				<div>
					<p className="text-xs font-semibold uppercase tracking-widest text-stone-400">
						Active Location
					</p>
					<p className="text-sm font-bold text-stone-900">
						Downtown District - Route 2A
					</p>
				</div>
			</div>

			{/* Right - Actions */}
			<div className="flex items-center gap-4">
				<button className="relative p-2 hover:bg-stone-50 rounded-lg transition-colors group">
					<Bell size={18} className="text-stone-600" />
					<span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
					<div className="absolute right-0 top-full mt-2 hidden group-hover:block bg-white border border-stone-200 rounded-lg shadow-lg p-2 whitespace-nowrap text-xs z-50">
						2 new delivery requests
					</div>
				</button>

				<div className="w-px h-6 bg-stone-200" />

				<button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
					<Phone size={18} className="text-stone-600" />
				</button>

				<button className="p-2 hover:bg-stone-50 rounded-lg transition-colors">
					<MessageCircle size={18} className="text-stone-600" />
				</button>

				{/* Profile */}
				<div className="flex items-center gap-3 ml-4 pl-4 border-l border-stone-200">
					<div>
						<p className="text-xs font-semibold text-stone-400 uppercase">
							Transporter
						</p>
						<p className="text-sm font-bold text-stone-900">Raj Kumar</p>
					</div>
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
						RK
					</div>
				</div>
			</div>
		</header>
	);
}
