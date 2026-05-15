export type OrderStatus = "PENDING" | "PAID" | "PROCESSING" | "IN_TRANSIT" | "COMPLETED" | "CANCELLED";
export type DeliveryType = "PICKUP" | "DELIVERY";

export interface Order {
  id: string;
  buyer: string;
  buyer_business_name?: string;
  buyer_email?: string;
  farmer: string;
  farmer_farm_name?: string;
  farmer_user_email?: string;
  total: string;
  order_status: OrderStatus;
  delivery_type: DeliveryType;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderInput {
  buyer: string;
  farmer: string;
  total: string;
  delivery_type: DeliveryType;
}

export interface UpdateOrderStatusInput {
  order_status: OrderStatus;
}

export interface OrderFilters {
  buyer?: string;
  farmer?: string;
  order_status?: OrderStatus;
  delivery_type?: DeliveryType;
  search?: string;
  ordering?: string;
}

/** API returns a plain array */
export type OrderListResponse = Order[];
