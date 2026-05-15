import { apiRequest } from "@/lib/api";
import type {
  Order,
  OrderFilters,
  OrderListResponse,
  OrderDetail,
  CreateOrderInput,
  UpdateOrderStatusInput,
  OrderStatus,
} from "@/types/order";


export async function getOrders(filters?: OrderFilters): Promise<OrderListResponse> {

  const params = new URLSearchParams();
  if (filters?.buyer) params.set("buyer", filters.buyer);
  if (filters?.farmer) params.set("farmer", filters.farmer);
  if (filters?.order_status) params.set("order_status", filters.order_status);
  if (filters?.delivery_type) params.set("delivery_type", filters.delivery_type);
  if (filters?.search) params.set("search", filters.search);
  if (filters?.ordering) params.set("ordering", filters.ordering);
  const query = params.toString();
  return apiRequest<OrderListResponse>(`/api/orders/${query ? `?${query}` : ""}`);
}

export async function getMyOrders(): Promise<OrderListResponse> {
  return apiRequest<OrderListResponse>("/api/orders/my_orders/");
}

export async function getPendingOrders(): Promise<OrderListResponse> {
  return apiRequest<OrderListResponse>("/api/orders/pending_orders/");
}

export async function getOrdersByStatus(
  status: OrderStatus,
): Promise<OrderListResponse> {
  return apiRequest<OrderListResponse>(`/api/orders/by_status/?status=${status}`);
}

export async function getOrder(id: string): Promise<OrderDetail> {
  return apiRequest<OrderDetail>(`/api/orders/${id}/`);
}



export async function createOrder(data: CreateOrderInput): Promise<Order> {
  return apiRequest<Order>("/api/orders/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateOrderStatus(
  id: string,
  data: UpdateOrderStatusInput,
): Promise<Order> {
  return apiRequest<Order>(`/api/orders/${id}/update_status/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: string): Promise<void> {
  return apiRequest<void>(`/api/orders/${id}/`, { method: "DELETE" });
}
