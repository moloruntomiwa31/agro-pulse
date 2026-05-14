import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "BUYER" | "SELLER" | "TRANSPORTER";

export interface User {
	id: string;
	full_name: string;
	email: string;
	phone_number: string;
	role: UserRole;
	is_active: boolean;
	farmer_profile: Record<string, unknown> | null;
	buyer_profile: Record<string, unknown> | null;
	transporter_profile: Record<string, unknown> | null;
	created_at: string;
	updated_at: string;
}

export interface AuthState {
	user: User | null;
	accessToken: string | null;
	refreshToken: string | null;
	isLoading: boolean;
	isAuthenticated: boolean;

	// Actions
	setUser: (user: User | null) => void;
	setTokens: (accessToken: string, refreshToken?: string) => void;
	setLoading: (loading: boolean) => void;
	logout: () => void;
	hydrate: () => void;
}

export const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			user: null,
			accessToken: null,
			refreshToken: null,
			isLoading: false,
			isAuthenticated: false,

			setUser: (user) =>
				set({
					user,
					isAuthenticated: !!user,
				}),

			setTokens: (accessToken, refreshToken) => {
				// Write to cookie so middleware can read it for route protection
				if (typeof document !== "undefined") {
					document.cookie = `auth-token=${accessToken}; path=/; SameSite=Lax; max-age=${60 * 60 * 24 * 7}`;
				}
				set({ accessToken, refreshToken: refreshToken || null });
			},

			setLoading: (isLoading) => set({ isLoading }),

			logout: () => {
				// Clear the auth cookie so middleware redirects immediately
				if (typeof document !== "undefined") {
					document.cookie = "auth-token=; path=/; max-age=0";
				}
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					isAuthenticated: false,
				});
			},

			hydrate: () => {
				// This is called after rehydration from localStorage
				// You can add additional hydration logic here if needed
			},
		}),
		{
			name: "auth-store",
			partialize: (state) => ({
				user: state.user,
				accessToken: state.accessToken,
				refreshToken: state.refreshToken,
			}),
		},
	),
);
