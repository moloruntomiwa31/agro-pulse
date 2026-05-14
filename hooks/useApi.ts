/**
 * Example React Query Hooks
 *
 * Follow this pattern for creating data-fetching hooks throughout the app
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/api";

// Example: Fetch products
// Replace with your actual API endpoint and type
export function useProducts(filters?: Record<string, string>) {
	return useQuery({
		queryKey: ["products", filters],
		queryFn: async () => {
			const queryString = filters
				? `?${new URLSearchParams(filters).toString()}`
				: "";
			return apiRequest(`/api/products${queryString}`);
		},
	});
}

// Example: Fetch single product
export function useProduct(productId: string) {
	return useQuery({
		queryKey: ["products", productId],
		queryFn: () => apiRequest(`/api/products/${productId}`),
		enabled: !!productId, // Only run query if productId is provided
	});
}

// Example: Create/Update mutations
export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: unknown) =>
			apiRequest("/api/products", {
				method: "POST",
				body: JSON.stringify(data),
			}),
		onSuccess: () => {
			// Invalidate and refetch products
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}

// Example: Delete mutation
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (productId: string) =>
			apiRequest(`/api/products/${productId}`, {
				method: "DELETE",
			}),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
