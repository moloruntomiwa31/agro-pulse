"use client";

import { useUser } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

interface OnboardingLayoutProps {
	children: React.ReactNode;
}

export default function OnboardingLayout({ children }: OnboardingLayoutProps) {
	const user = useUser();
	const router = useRouter();
	const pathname = usePathname();

	// Extract role from path (e.g., /onboarding/buyer -> buyer)
	const pathRole = pathname.split("/")[2];

	useEffect(() => {
		if (!user) {
			router.push("/auth/signin");
			return;
		}

		// Verify user role matches the onboarding role
		const userRole = user.role.toLowerCase();
		const roleMap: Record<string, string> = {
			buyer: "buyer",
			farmer: "seller",
			transporter: "transporter",
		};

		const expectedRole = roleMap[pathRole];
		if (userRole !== expectedRole) {
			router.push("/auth/signin");
		}
	}, [user, pathRole, router]);

	if (!user) {
		return null;
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
				{children}
			</div>
		</div>
	);
}
