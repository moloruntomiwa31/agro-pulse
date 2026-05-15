"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/authStore";

/**
 * Client-side wrapper to ensure auth store is hydrated from localStorage
 * and auth state is available to the entire app.
 */
export function RootClientWrapper({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		// Trigger hydration from localStorage on mount
		const state = useAuthStore.getState();
		console.log("[Auth] Initialized from localStorage:", {
			isAuthenticated: state.isAuthenticated,
			user: state.user?.full_name,
			hasToken: !!state.accessToken,
		});
	}, []);

	return <>{children}</>;
}
