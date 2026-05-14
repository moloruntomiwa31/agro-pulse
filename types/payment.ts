export type PaymentStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";
export type PaymentChannel = "CARD" | "USSD" | "TRANSFER" | "VIRTUAL-ACCOUNT";

export interface Payment {
  id: string;
  buyer: string;
  order: string;
  payment_status: PaymentStatus;
  amount: string;
  currency: string;
  channel?: PaymentChannel;
  checkout_url?: string;
  squad_transaction_id?: string;
  escrow_enabled: boolean;
  created_at: string;
}

export interface InitializePaymentInput {
  order_id: string;
}

export interface InitializePaymentResponse {
  payment_id: string;
  squad_transaction_id: string;
  checkout_url: string;
  amount: string;
}

export interface PaymentListResponse {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: Payment[];
}
