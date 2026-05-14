import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as paymentApi from "@/lib/api/payment";
import type { InitializePaymentInput } from "@/types/payment";

export function usePayments() {
  return useQuery({
    queryKey: ["payments"],
    queryFn: () => paymentApi.getPayments(),
  });
}

export function useMyPayments() {
  return useQuery({
    queryKey: ["payments", "my_payments"],
    queryFn: () => paymentApi.getMyPayments(),
  });
}

export function usePendingPayments() {
  return useQuery({
    queryKey: ["payments", "pending"],
    queryFn: () => paymentApi.getPendingPayments(),
  });
}

export function useInitializePayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: InitializePaymentInput) => paymentApi.initializePayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
}

export function useVerifyPayment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => paymentApi.verifyPayment(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      queryClient.invalidateQueries({ queryKey: ["payment", id] });
    },
  });
}
