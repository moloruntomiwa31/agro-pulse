import type { Category } from "./produce";

export interface OrderItem {
  id: string;
  order: string;
  produce: string;
  produce_name: string;
  produce_category: Category;
  quantity: number;
  unit_price: string;
  subtotal: string;
  created_at: string;
  updated_at: string;
}

export interface CreateOrderItemInput {
  order: string;
  produce: string;
  quantity: number;
  unit_price: string;
}

export interface OrderItemFilters {
  order?: string;
  produce?: string;
  ordering?: string;
}

/** API returns a plain array */
export type OrderItemListResponse = OrderItem[];
