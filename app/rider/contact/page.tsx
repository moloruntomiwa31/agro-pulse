"use client";

import { Phone, Mail, MapPin, MessageSquare, Send, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactUs() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle form submission
		console.log("Form submitted:", formData);
	};

	return (
		<div className="flex-1 overflow-y-auto bg-stone-50/50 p-8">
			<div className="max-w-4xl mx-auto flex flex-col gap-6">
				{/* Header */}
				<div className="mb-2">
					<h1 className="text-2xl font-bold text-stone-900 mb-1">Contact Us</h1>
					<p className="text-sm text-stone-500">
						Get in touch with our team. We're here to help!
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
					{/* Contact Info */}
					<div className="space-y-4">
						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-xl bg-forest-50 flex items-center justify-center border border-forest-100 shrink-0">
									<Phone size={18} className="text-forest-600" />
								</div>
								<div>
									<p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
										Call Us
									</p>
									<p className="font-semibold text-stone-900 mb-1">
										+91-98765-43210
									</p>
									<p className="text-xs text-stone-500">
										Mon - Sun, 9 AM - 6 PM IST
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center border border-orange-100 shrink-0">
									<Mail size={18} className="text-orange-600" />
								</div>
								<div>
									<p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
										Email
									</p>
									<p className="font-semibold text-stone-900 mb-1">
										support@agropulse.com
									</p>
									<p className="text-xs text-stone-500">
										We'll respond within 24h
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center border border-green-100 shrink-0">
									<MapPin size={18} className="text-green-600" />
								</div>
								<div>
									<p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
										Address
									</p>
									<p className="font-semibold text-stone-900 mb-1">
										AgroPulse HQ
									</p>
									<p className="text-xs text-stone-500">
										123 Tech Park, Main Street
										<br />
										Bangalore, India - 560001
									</p>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
							<div className="flex items-start gap-4">
								<div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100 shrink-0">
									<MessageSquare size={18} className="text-blue-600" />
								</div>
								<div>
									<p className="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">
										Live Chat
									</p>
									<p className="font-semibold text-stone-900 mb-1">Available</p>
									<p className="text-xs text-stone-500">9 AM - 9 PM daily</p>
								</div>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
						<h2 className="text-lg font-bold text-stone-900 mb-4">
							Send us a Message
						</h2>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="block text-sm font-semibold text-stone-900 mb-2">
									Your Name
								</label>
								<input
									type="text"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full px-4 py-2.5 border border-stone-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
									placeholder="Raj Kumar"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-stone-900 mb-2">
									Email Address
								</label>
								<input
									type="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="w-full px-4 py-2.5 border border-stone-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
									placeholder="raj@example.com"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-stone-900 mb-2">
									Subject
								</label>
								<input
									type="text"
									required
									value={formData.subject}
									onChange={(e) =>
										setFormData({ ...formData, subject: e.target.value })
									}
									className="w-full px-4 py-2.5 border border-stone-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500"
									placeholder="How can we help?"
								/>
							</div>

							<div>
								<label className="block text-sm font-semibold text-stone-900 mb-2">
									Message
								</label>
								<textarea
									required
									rows={5}
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									className="w-full px-4 py-2.5 border border-stone-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-500 resize-none"
									placeholder="Tell us about your issue..."
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
							>
								<Send size={16} /> Send Message
							</button>
						</form>

						<div className="mt-6 pt-6 border-t border-stone-100">
							<p className="text-xs text-stone-500 flex items-center gap-2">
								<Clock size={14} /> Response time: Usually within 24 hours
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
