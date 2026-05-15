"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requiredRole?: "BUYER" | "SELLER" | "TRANSPORTER" | "ALL";
}

/**
 * Client-side route protector for protected pages
 * Redirects unauthenticated users to login
 * Redirects users to correct role-based dashboard if they visit wrong role's page
 */
export function ProtectedRoute({
	children,
	requiredRole = "ALL",
}: ProtectedRouteProps) {
	const router = useRouter();
	const { user, isAuthenticated } = useAuthStore();
	const [isChecking, setIsChecking] = useState(true);

	useEffect(() => {
		// Give auth store time to hydrate from localStorage
		const timer = setTimeout(() => {
			const state = useAuthStore.getState();

			if (!state.isAuthenticated) {
				console.log(
					"[ProtectedRoute] Not authenticated, redirecting to signin",
				);
				router.push("/auth/signin");
				return;
			}

			if (requiredRole !== "ALL" && state.user?.role !== requiredRole) {
				console.log("[ProtectedRoute] Wrong role, redirecting:", {
					required: requiredRole,
					actual: state.user?.role,
				});
				const roleRoutes: Record<string, string> = {
					BUYER: "/marketplace",
					SELLER: "/farmer",
					TRANSPORTER: "/rider",
				};
				router.push(roleRoutes[state.user?.role ?? "BUYER"] ?? "/");
				return;
			}

			setIsChecking(false);
		}, 100);

		return () => clearTimeout(timer);
	}, [requiredRole, router]);

	if (isChecking) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<Loader2 size={32} className="animate-spin text-forest-500" />
			</div>
		);
	}

	return <>{children}</>;
}
