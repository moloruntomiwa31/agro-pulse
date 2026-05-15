import { apiRequest } from "@/lib/api";
import type {
  OrderItem,
  OrderItemFilters,
  OrderItemListResponse,
  CreateOrderItemInput,
} from "@/types/orderItem";

export async function getOrderItems(
  filters?: OrderItemFilters,
): Promise<OrderItemListResponse> {
  const params = new URLSearchParams();
  if (filters?.order) params.set("order", filters.order);
  if (filters?.produce) params.set("produce", filters.produce);
  if (filters?.ordering) params.set("ordering", filters.ordering);
  const query = params.toString();
  return apiRequest<OrderItemListResponse>(
    `/api/order-items/${query ? `?${query}` : ""}`,
  );
}

export async function getOrderItemsByOrder(
  orderId: string,
): Promise<OrderItemListResponse> {
  return apiRequest<OrderItemListResponse>(
    `/api/order-items/by_order/?order_id=${orderId}`,
  );
}

export async function getOrderItem(id: string): Promise<OrderItem> {
  return apiRequest<OrderItem>(`/api/order-items/${id}/`);
}

export async function createOrderItem(
  data: CreateOrderItemInput,
): Promise<OrderItem> {
  return apiRequest<OrderItem>("/api/order-items/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateOrderItem(
  id: string,
  data: CreateOrderItemInput,
): Promise<OrderItem> {
  return apiRequest<OrderItem>(`/api/order-items/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function partialUpdateOrderItem(
  id: string,
  data: Partial<CreateOrderItemInput>,
): Promise<OrderItem> {
  return apiRequest<OrderItem>(`/api/order-items/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteOrderItem(id: string): Promise<void> {
  return apiRequest<void>(`/api/order-items/${id}/`, { method: "DELETE" });
}

