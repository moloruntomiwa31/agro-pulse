"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransporterOnboardingPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const handleSkip = () => {
		router.push("/rider");
	};

	const handleComplete = async () => {
		setIsLoading(true);
		// TODO: Send onboarding data to API if needed
		router.push("/rider");
	};

	return (
		<div className="space-y-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900 mb-2">
					Welcome to AgroPulse! 🚗
				</h1>
				<p className="text-lg text-gray-600">
					Let's set up your transporter profile
				</p>
			</div>

			<div className="bg-white rounded-lg shadow p-6 space-y-6">
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Vehicle Type
					</label>
					<select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
						<option value="">Select vehicle type</option>
						<option value="van">Van</option>
						<option value="truck">Truck</option>
						<option value="bike">Bike/Scooter</option>
						<option value="car">Car</option>
					</select>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						Location
					</label>
					<input
						type="text"
						placeholder="City or region"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700 mb-2">
						License Number
					</label>
					<input
						type="text"
						placeholder="Your license number"
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
						className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium disabled:opacity-50"
					>
						{isLoading ? "Setting up..." : "Get Started"}
					</button>
				</div>
			</div>
		</div>
	);
}
