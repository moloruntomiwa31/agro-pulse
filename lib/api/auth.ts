import { apiRequest } from "@/lib/api";
import { User, UserRole } from "@/lib/store/authStore";

export interface SignUpRequest {
	full_name: string;
	email: string;
	phone_number: string;
	password: string;
	password_confirm: string;
	role: UserRole;
	is_active?: boolean;
}

export interface LoginRequest {
	email: string;
	password: string;
}

/** Shape returned by POST /api/users/ (registration) */
export type SignUpResponse = User;

/** Shape returned by POST /api/users/login/ */
export interface TokenResponse {
	access: string;
	refresh: string;
}

/**
 * Register a new user — POST /api/users/register/
 * No auth required. Returns the created user object (no tokens).
 */
export async function signUp(data: SignUpRequest): Promise<SignUpResponse> {
	return apiRequest<SignUpResponse>("/api/users/register/", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

/**
 * Obtain JWT tokens — POST /api/users/login/
 * Returns { access, refresh }
 */
export async function login(data: LoginRequest): Promise<TokenResponse> {
	return apiRequest<TokenResponse>("/api/users/login/", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

/**
 * Refresh access token — POST /api/token/refresh/
 */
export async function refreshAccessToken(
	refreshToken: string,
): Promise<TokenResponse> {
	return apiRequest<TokenResponse>("/api/token/refresh/", {
		method: "POST",
		body: JSON.stringify({ refresh: refreshToken }),
	});
}

/**
 * Get current authenticated user — GET /api/users/{id}/
 * We retrieve the stored user id from the store to build the URL.
 */
export async function getCurrentUser(userId: string): Promise<User> {
	return apiRequest<User>(`/api/users/${userId}/`);
}

/** Logout — JWT is stateless, clear local state only */
export async function logout(): Promise<void> {
	return Promise.resolve();
}

/** Update user profile — PATCH /api/users/{id}/ */
export async function updateUser(userId: string, data: Partial<User>): Promise<User> {
	return apiRequest<User>(`/api/users/${userId}/`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});
}

