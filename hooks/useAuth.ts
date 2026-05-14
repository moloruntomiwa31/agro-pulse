import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import * as authApi from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Hook for signing up
 * POST /api/users/ returns the user object only (no tokens).
 * Redirect to signin so the user can log in.
 */
export function useSignUp() {
	const router = useRouter();

	return useMutation({
		mutationFn: authApi.signUp,
		onSuccess: () => {
			router.push("/auth/signin");
		},
	});
}

/**
 * Hook for logging in
 * 1. POST /api/users/login/ → { access, refresh }
 * 2. Store tokens immediately so apiRequest can attach Authorization header
 * 3. Decode JWT payload to get user_id
 * 4. GET /api/users/{id}/ → full user profile
 * 5. Store user in state + redirect by role
 */
export function useLogin() {
	const router = useRouter();
	const setUser = useAuthStore((state) => state.setUser);
	const setTokens = useAuthStore((state) => state.setTokens);

	return useMutation({
		mutationFn: async (credentials: { email: string; password: string }) => {
			// Step 1: get tokens
			const tokens = await authApi.login(credentials);

			// Step 2: persist tokens so the next request carries the Bearer header
			setTokens(tokens.access, tokens.refresh);

			// Step 3: decode JWT to extract user_id from payload
			const payload = JSON.parse(atob(tokens.access.split(".")[1])) as {
				user_id: string;
			};

			// Step 4: fetch full user profile
			const user = await authApi.getCurrentUser(payload.user_id);

			return { tokens, user };
		},
		onSuccess: ({ tokens, user }) => {
			// Update user state
			setUser(user);
			// Re-set tokens to ensure store is fully in sync
			setTokens(tokens.access, tokens.refresh);

			// Redirect based on role
			const roleRoutes: Record<string, string> = {
				BUYER: "/marketplace",
				SELLER: "/farmer",
				TRANSPORTER: "/rider",
			};
			router.push(roleRoutes[user.role] ?? "/");
		},
	});
}

/**
 * Hook for logging out
 */
export function useLogout() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const logout = useAuthStore((state) => state.logout);

	return useMutation({
		mutationFn: authApi.logout,
		onSuccess: () => {
			logout();
			queryClient.clear();
			router.push("/auth/signin");
		},
		onError: () => {
			// Even if logout API fails, clear local state
			logout();
			queryClient.clear();
			router.push("/auth/signin");
		},
	});
}

/**
 * Hook to re-fetch and sync the current user profile.
 * Reads the stored user id from the auth store.
 */
export function useCurrentUser() {
	const setUser = useAuthStore((state) => state.setUser);
	const accessToken = useAuthStore((state) => state.accessToken);
	const userId = useAuthStore((state) => state.user?.id);

	const query = useQuery({
		queryKey: ["currentUser", userId],
		queryFn: () => authApi.getCurrentUser(userId!),
		enabled: !!accessToken && !!userId,
	});

	useEffect(() => {
		if (query.data) {
			setUser(query.data);
		}
	}, [query.data, setUser]);

	return query;
}

/**
 * Hook for checking if user is authenticated
 */
export function useIsAuthenticated() {
	return useAuthStore((state) => state.isAuthenticated);
}

/**
 * Hook to get current user
 */
export function useUser() {
	return useAuthStore((state) => state.user);
}

/**
 * Hook to get current user role
 */
export function useUserRole() {
	return useAuthStore((state) => state.user?.role);
}
