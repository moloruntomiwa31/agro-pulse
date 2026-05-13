"use client";

import {
	HelpCircle,
	Search,
	MessageSquare,
	Phone,
	Mail,
	ChevronRight,
} from "lucide-react";
import { useState } from "react";

export default function HelpSupport() {
	const [search, setSearch] = useState("");

	const faqItems = [
		{
			question: "How do I accept new deliveries?",
			answer:
				"Go to 'Assigned Deliveries' page and click 'Accept Delivery' on pending deliveries. You can set your availability status to receive new assignments.",
			category: "Deliveries",
		},
		{
			question: "How is my payment calculated?",
			answer:
				"Base pay per delivery + bonuses for speed, rating, and weekly targets. Payments are processed every week to your registered bank account.",
			category: "Payments",
		},
		{
			question: "What should I do if a delivery is delayed?",
			answer:
				"Contact the customer immediately via phone or message. Update the delivery status in the app so customers know the new ETA.",
			category: "Deliveries",
		},
		{
			question: "How can I improve my rating?",
			answer:
				"Deliver on time, handle products carefully, maintain cleanliness, and provide professional service. Good ratings lead to higher priority deliveries.",
			category: "Performance",
		},
		{
			question: "What is the refund policy for cancellations?",
			answer:
				"Cancellations within 5 minutes of acceptance are free. Late cancellations may incur a small penalty to compensate for merchant's loss.",
			category: "Policies",
		},
		{
			question: "How do I report a problem with a delivery?",
			answer:
				"Use the 'Report Issue' button in the delivery details or contact support directly with photos and details of the problem.",
			category: "Support",
		},
	];

	const filteredFAQ = faqItems.filter(
		(item) =>
			item.question.toLowerCase().includes(search.toLowerCase()) ||
			item.answer.toLowerCase().includes(search.toLowerCase()),
	);

	const categories = [
		"Deliveries",
		"Payments",
		"Performance",
		"Policies",
		"Support",
	];

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-4xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="mb-2">
					<div className="flex items-center gap-2 mb-2">
						<HelpCircle size={16} className="text-forest-600" />
						<span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">
							Support Center
						</span>
					</div>
					<h1 className="text-2xl font-bold text-stone-900 mb-1">
						Help & Support
					</h1>
					<p className="text-sm text-stone-500">
						Find answers to common questions or contact our support team.
					</p>
				</div>

				{/* Search */}
				<div className="relative">
					<Search
						size={16}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
					/>
					<input
						type="text"
						placeholder="Search help articles..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full pl-10 pr-4 py-3 border border-stone-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
					/>
				</div>

				{/* Quick Contact */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-xl bg-forest-50 flex items-center justify-center border border-forest-100 shrink-0">
								<Phone size={20} className="text-forest-600" />
							</div>
							<div className="flex-1">
								<h3 className="font-bold text-stone-900 mb-1">Call Support</h3>
								<p className="text-sm text-stone-600 mb-3">
									Available 24/7 for urgent issues
								</p>
								<a
									href="tel:+919876543210"
									className="text-sm font-semibold text-forest-700 hover:text-forest-900"
								>
									+91-98765-43210
								</a>
							</div>
						</div>
					</div>

					<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<div className="flex items-start gap-4">
							<div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
								<Mail size={20} className="text-orange-600" />
							</div>
							<div className="flex-1">
								<h3 className="font-bold text-stone-900 mb-1">Email Support</h3>
								<p className="text-sm text-stone-600 mb-3">
									Response within 24 hours
								</p>
								<a
									href="mailto:support@agropulse.com"
									className="text-sm font-semibold text-forest-700 hover:text-forest-900"
								>
									support@agropulse.com
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* FAQ */}
				<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
					<h2 className="text-lg font-bold text-stone-900 mb-4">
						Frequently Asked Questions
					</h2>

					{filteredFAQ.length > 0 ? (
						<div className="space-y-3">
							{filteredFAQ.map((item, idx) => (
								<details
									key={idx}
									className="group border border-stone-100 rounded-lg"
								>
									<summary className="flex cursor-pointer items-center justify-between p-4 font-medium text-stone-900 hover:bg-stone-50 transition-colors">
										<div>
											<p className="font-semibold">{item.question}</p>
											<p className="text-xs text-stone-500 mt-1">
												{item.category}
											</p>
										</div>
										<ChevronRight
											size={18}
											className="text-stone-400 group-open:rotate-90 transition-transform"
										/>
									</summary>
									<div className="px-4 pb-4 pt-0 text-stone-600 bg-stone-50 border-t border-stone-100 rounded-b">
										{item.answer}
									</div>
								</details>
							))}
						</div>
					) : (
						<p className="text-center py-8 text-stone-500">
							No results found. Try different keywords or contact our support
							team.
						</p>
					)}
				</div>

				{/* Live Chat */}
				<div className="bg-gradient-to-br from-forest-50 to-forest-100 rounded-2xl border border-forest-100 shadow-sm p-6 text-center">
					<MessageSquare size={32} className="mx-auto text-forest-600 mb-4" />
					<h3 className="text-lg font-bold text-stone-900 mb-2">
						Need more help?
					</h3>
					<p className="text-sm text-stone-600 mb-4">
						Chat with our support team in real-time for immediate assistance.
					</p>
					<button className="bg-forest-950 hover:bg-forest-900 text-white font-bold px-6 py-2.5 rounded-xl transition-colors text-sm">
						Start Live Chat
					</button>
				</div>
			</div>
		</div>
	);
}
