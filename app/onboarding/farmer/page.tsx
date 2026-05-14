"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SellerOnboardingPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleSkip = () => {
		router.push("/farmer");
	};

	const handleComplete = async () => {
		setIsLoading(true);
		// TODO: Send onboarding data to API if needed
		router.push("/farmer");
	};

	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Welcome to AgroPulse! 🌾
				</h1>
				<p className="text-lg text-gray-600">Let's set up your farm profile</p>
			</div>

			<div className="bg-white rounded-lg shadow p-6 space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Farm Name
					</label>
					<input
						type="text"
						placeholder="Your farm name"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Location
					</label>
					<input
						type="text"
						placeholder="State or region"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Primary Crops
					</label>
					<input
						type="text"
						placeholder="e.g., Tomatoes, Potatoes, Onions"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
					/>
				</div>

				<div className="flex gap-3">
					<button
						onClick={handleSkip}
						className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
					>
						Skip for now
					</button>
					<button
						onClick={handleComplete}
						disabled={isLoading}
						className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
					>
						{isLoading ? "Setting up..." : "Get Started"}
					</button>
				</div>
			</div>
		</div>
	);
}
