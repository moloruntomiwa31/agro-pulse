import { useAuthStore } from "@/lib/store/authStore";

export const API_URL =
	process.env.NEXT_PUBLIC_API_URL || "https://0dwdwtpj-8000.uks1.devtunnels.ms";

let isRefreshing = false;

export async function apiRequest<T>(
	endpoint: string,
	options?: RequestInit,
): Promise<T> {
	const url = `${API_URL}${endpoint}`;

	// Read token directly from Zustand store state (works in both client and server contexts)
	const authState = useAuthStore.getState();
	const token = authState.accessToken || "test_access_token";

	const existingHeaders = options?.headers
		? Object.fromEntries(new Headers(options.headers).entries())
		: {};

	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...existingHeaders,
	};

	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	let response = await fetch(url, {
		...options,
		headers,
	});

	// If 401 Unauthorized and we have a refreshToken, attempt to refresh and retry
	if (response.status === 401 && authState.refreshToken && !endpoint.includes("/token/refresh") && !isRefreshing) {
		isRefreshing = true;
		try {
			const refreshRes = await fetch(`${API_URL}/api/token/refresh/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ refresh: authState.refreshToken }),
			});

			if (refreshRes.ok) {
				const tokenData = await refreshRes.json();
				const newAccess = tokenData.access || tokenData.accessToken;
				const newRefresh = tokenData.refresh || tokenData.refreshToken || authState.refreshToken;

				authState.setTokens(newAccess, newRefresh);

				// Re-attach new token and retry original request
				headers.Authorization = `Bearer ${newAccess}`;
				response = await fetch(url, {
					...options,
					headers,
				});
			} else {
				authState.logout();
			}
		} catch (err) {
			authState.logout();
		} finally {
			isRefreshing = false;
		}
	}

	if (!response.ok) {
		const error = await response.json().catch(() => ({}));
		const message =
			error.detail ||
			error.message ||
			(typeof error === "string" ? error : null) ||
			`Request failed: ${response.status} ${response.statusText}`;
		throw new Error(message);
	}

	return response.json() as Promise<T>;
}