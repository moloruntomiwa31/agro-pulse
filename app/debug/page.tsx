"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DebugPage() {
	const router = useRouter();
	const authState = useAuthStore();
	const [storageData, setStorageData] = useState<any>(null);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		// Read localStorage directly
		if (typeof window !== "undefined") {
			const authStore = localStorage.getItem("auth-store");
			setStorageData(authStore ? JSON.parse(authStore) : null);

			console.log(
				"Auth Store Contents:",
				authStore ? JSON.parse(authStore) : null,
			);
		}
	}, []);

	if (!mounted) {
		return <div className="p-8">Loading...</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 p-8">
			<div className="max-w-2xl mx-auto">
				<h1 className="text-3xl font-bold mb-8 text-gray-900">
					🔧 Auth Debug Page
				</h1>

				{/* Auth State */}
				<div className="mb-8 bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">
						Auth Store State
					</h2>
					<div className="space-y-3">
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Authenticated:</span>
							<span
								className={
									authState.isAuthenticated
										? "text-green-600 font-bold"
										: "text-red-600 font-bold"
								}
							>
								{authState.isAuthenticated ? "✅ YES" : "❌ NO"}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">User:</span>
							<span className="text-gray-900 font-mono text-sm">
								{authState.user?.full_name || "None"}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Email:</span>
							<span className="text-gray-900 font-mono text-sm">
								{authState.user?.email || "None"}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Role:</span>
							<span className="text-gray-900 font-mono text-sm font-bold">
								{authState.user?.role || "None"}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Access Token:</span>
							<span
								className={`text-xs font-mono ${authState.accessToken ? "text-green-600" : "text-red-600"}`}
							>
								{authState.accessToken
									? `${authState.accessToken.substring(0, 20)}...`
									: "None"}
							</span>
						</div>
						<div className="flex justify-between">
							<span className="font-medium text-gray-600">Refresh Token:</span>
							<span
								className={`text-xs font-mono ${authState.refreshToken ? "text-green-600" : "text-red-600"}`}
							>
								{authState.refreshToken
									? `${authState.refreshToken.substring(0, 20)}...`
									: "None"}
							</span>
						</div>
					</div>
				</div>

				{/* LocalStorage */}
				<div className="mb-8 bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">
						localStorage['auth-store']
					</h2>
					<pre className="bg-gray-100 p-4 rounded overflow-auto text-xs text-gray-800 max-h-64">
						{storageData
							? JSON.stringify(storageData, null, 2)
							: "No data found"}
					</pre>
				</div>

				{/* Cookies */}
				<div className="mb-8 bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
					<h2 className="text-xl font-semibold mb-4 text-gray-800">Cookies</h2>
					<pre className="bg-gray-100 p-4 rounded overflow-auto text-xs text-gray-800">
						{document.cookie || "No cookies found"}
					</pre>
				</div>

				{/* Actions */}
				<div className="grid grid-cols-2 gap-4 mb-8">
					<button
						onClick={() => {
							if (authState.isAuthenticated) {
								const roleRoutes: Record<string, string> = {
									BUYER: "/marketplace",
									SELLER: "/farmer",
									TRANSPORTER: "/rider",
								};
								router.push(roleRoutes[authState.user?.role ?? "BUYER"] ?? "/");
							} else {
								router.push("/auth/signin");
							}
						}}
						className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition"
					>
						{authState.isAuthenticated ? "Go to Dashboard" : "Go to Login"}
					</button>

					<button
						onClick={() => {
							authState.logout();
							setStorageData(null);
							router.push("/auth/signin");
						}}
						className="bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 transition"
					>
						Clear Auth & Logout
					</button>
				</div>

				{/* Test Accounts Info */}
				<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
					<h2 className="text-lg font-semibold mb-4 text-yellow-900">
						📝 Test Accounts
					</h2>
					<p className="text-sm text-yellow-800 mb-4">
						To test login, you need accounts created in the backend. Try signing
						up first or use existing test accounts:
					</p>
					<div className="space-y-2 text-sm text-yellow-800 font-mono">
						<p>
							Email:{" "}
							<code className="bg-yellow-100 px-2 py-1 rounded">
								test@example.com
							</code>
						</p>
						<p>
							Password:{" "}
							<code className="bg-yellow-100 px-2 py-1 rounded">
								password123
							</code>
						</p>
					</div>
					<p className="text-xs text-yellow-700 mt-4">
						Check the browser console (F12) for detailed API logs when logging
						in.
					</p>
				</div>

				{/* Navigation */}
				<div className="mt-8 flex gap-4 justify-center text-sm">
					<Link href="/" className="text-blue-600 hover:underline">
						← Home
					</Link>
					<Link href="/auth/signin" className="text-blue-600 hover:underline">
						Login →
					</Link>
				</div>
			</div>
		</div>
	);
}
