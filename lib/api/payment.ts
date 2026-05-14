import { apiRequest } from "@/lib/api";
import type { Payment, InitializePaymentInput, InitializePaymentResponse, PaymentListResponse } from "@/types/payment";

export async function getPayments(): Promise<PaymentListResponse> {
  return apiRequest<PaymentListResponse>("/api/payments/");
}

export async function initializePayment(data: InitializePaymentInput): Promise<InitializePaymentResponse> {
  return apiRequest<InitializePaymentResponse>("/api/payments/initialize_payment/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function verifyPayment(id: string): Promise<Payment> {
  return apiRequest<Payment>(`/api/payments/${id}/verify_payment/`, {
    method: "POST",
  });
}

export async function getMyPayments(): Promise<PaymentListResponse> {
  return apiRequest<PaymentListResponse>("/api/payments/my_payments/");
}

export async function getPendingPayments(): Promise<PaymentListResponse> {
  return apiRequest<PaymentListResponse>("/api/payments/pending_payments/");
}
