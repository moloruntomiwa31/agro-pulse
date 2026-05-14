"use client";

import { useIsAuthenticated, useUserRole } from "@/hooks/useAuth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface ProtectedRouteProps {
	children: ReactNode;
	requiredRole?: string;
}

/**
 * Wrapper component to protect routes that require authentication
 * Optionally restrict to specific roles
 */
export function ProtectedRoute({
	children,
	requiredRole,
}: ProtectedRouteProps) {
	const isAuthenticated = useIsAuthenticated();
	const userRole = useUserRole();

	if (!isAuthenticated) {
		redirect("/auth/signin");
	}

	if (requiredRole && userRole !== requiredRole) {
		redirect("/");
	}

	return <>{children}</>;
}
