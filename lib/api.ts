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
	const token = authState.accessToken;

	const existingHeaders = options?.headers
		? Object.fromEntries(new Headers(options.headers).entries())
		: {};

	const headers: Record<string, string> = {
		...existingHeaders,
	};

	if (options?.body) {
		headers["Content-Type"] = "application/json";
	}


	if (token) {
		headers.Authorization = `Bearer ${token}`;
	}

	console.log("[API] Request:", {
		endpoint,
		method: options?.method || "GET",
		url,
		body: options?.body ? JSON.parse(options.body as string) : null,
	});


	let response = await fetch(url, {
		...options,
		headers,
	});

	// If 401 Unauthorized and we have a refreshToken, attempt to refresh and retry
	if (
		response.status === 401 &&
		authState.refreshToken &&
		!endpoint.includes("/token/refresh") &&
		!isRefreshing
	) {
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
				const newRefresh =
					tokenData.refresh || tokenData.refreshToken || authState.refreshToken;

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
		let errorData: any = {};
		const responseText = await response.text();

		try {
			errorData = JSON.parse(responseText);
		} catch (e) {
			errorData = { raw: responseText };
		}

		console.error("[API] Error:", {
			endpoint,
			status: response.status,
			statusText: response.statusText,
			error: errorData,
		});

		// Extract error message from various formats
		let message = `${response.status} ${response.statusText}`;

		if (typeof errorData === "string") {
			message = errorData;
		} else if (errorData.non_field_errors) {
			message = Array.isArray(errorData.non_field_errors)
				? errorData.non_field_errors.join(", ")
				: errorData.non_field_errors;
		} else if (errorData.detail) {
			message = typeof errorData.detail === 'object' ? JSON.stringify(errorData.detail) : errorData.detail;
		} else if (errorData.message) {
			message = typeof errorData.message === 'object' ? JSON.stringify(errorData.message) : errorData.message;
		} else if (Array.isArray(errorData)) {
			message = errorData
				.map((e: any) => typeof e === 'object' ? JSON.stringify(e) : String(e))
				.join(", ");
		} else if (Object.keys(errorData).length > 0 && !errorData.raw) {
			message = Object.entries(errorData)
				.map(([field, value]: [string, any]) => {
					const val = Array.isArray(value) ? value.join(", ") : (typeof value === 'object' ? JSON.stringify(value) : String(value));
					return `${field}: ${val}`;
				})
				.join("; ");
		} else if (errorData.raw && errorData.raw.length > 0) {
			message = errorData.raw.substring(0, 200);
		}


		throw new Error(message);
	}

	const data = (await response.json()) as T;
	console.log("[API] Success:", { endpoint, status: response.status });
	return data;
}
