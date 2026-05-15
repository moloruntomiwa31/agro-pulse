export type SubscriptionFrequency = "DAILY" | "WEEKLY" | "MONTHLY";
export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED";

export interface Subscription {
  id: string;
  buyer: string;
  buyer_name: string;
  farmer: string;
  farmer_name: string;
  produce: string;
  produce_name: string;
  produce_price: string;
  frequency: SubscriptionFrequency;
  expected_quantity: number;
  next_expected_order_date: string;
  active: boolean;
  status: SubscriptionStatus;
  subscription_start_date: string;
  subscription_end_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionInput {
  buyer: string;
  farmer: string;
  produce: string;
  frequency: SubscriptionFrequency;
  expected_quantity: number;
  next_expected_order_date: string;
}

export interface SubscriptionOrder {
  id: string;
  subscription: string;
  scheduled_date: string;
  quantity: number;
  unit_price: string;
  total_amount: string;
  order_status: "PENDING" | "CONFIRMED" | "DELIVERED" | "FAILED" | "SKIPPED";
}

export interface SubscriptionPayment {
  id: string;
  subscription_order: string;
  payment_status: "PENDING" | "SUCCESS" | "FAILED";
  amount: string;
  transaction_reference: string;
}
