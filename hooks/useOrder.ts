import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderApi from "@/lib/api/order";
import type { OrderFilters, CreateOrderInput, UpdateOrderStatusInput, Order } from "@/types/order";

export function useOrders(filters?: OrderFilters) {
  return useQuery({
    queryKey: ["orders", filters],
    queryFn: () => orderApi.getOrders(filters),
  });
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ["order", id],
    queryFn: () => orderApi.getOrder(id),
    enabled: !!id,
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ["orders", "my_orders"],
    queryFn: () => orderApi.getMyOrders(),
  });
}

export function usePendingOrders() {
  return useQuery({
    queryKey: ["orders", "pending"],
    queryFn: () => orderApi.getPendingOrders(),
  });
}

export function useOrdersByStatus(status: string) {
  return useQuery({
    queryKey: ["orders", "status", status],
    queryFn: () => orderApi.getOrdersByStatus(status),
    enabled: !!status,
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderInput) => orderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) => orderApi.updateOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

export function usePartialUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Order> }) => orderApi.partialUpdateOrder(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrderStatusInput }) => orderApi.updateOrderStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", variables.id] });
    },
  });
}
