import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as orderItemApi from "@/lib/api/orderItem";
import type { CreateOrderItemInput, OrderItemFilters } from "@/types/orderItem";

export function useOrderItems(filters?: OrderItemFilters) {
  return useQuery({
    queryKey: ["order-items", filters],
    queryFn: () => orderItemApi.getOrderItems(filters),
    enabled: !!(filters?.order || filters?.produce),
  });
}

export function useOrderItemsByOrder(orderId: string) {
  return useQuery({
    queryKey: ["order-items", "by_order", orderId],
    queryFn: () => orderItemApi.getOrderItemsByOrder(orderId),
    enabled: !!orderId,
  });
}

export function useOrderItem(id: string) {
  return useQuery({
    queryKey: ["order-item", id],
    queryFn: () => orderItemApi.getOrderItem(id),
    enabled: !!id,
  });
}

export function useCreateOrderItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrderItemInput) =>
      orderItemApi.createOrderItem(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["order-items", "by_order", variables.order],
      });
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
    },
  });
}

export function useUpdateOrderItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: CreateOrderItemInput }) =>
      orderItemApi.updateOrderItem(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["order-items", "by_order", data.order],
      });
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
      queryClient.invalidateQueries({ queryKey: ["order-item", data.id] });
    },
  });
}

export function usePartialUpdateOrderItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateOrderItemInput>;
    }) => orderItemApi.partialUpdateOrderItem(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["order-items", "by_order", data.order],
      });
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
      queryClient.invalidateQueries({ queryKey: ["order-item", data.id] });
    },
  });
}

export function useDeleteOrderItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => orderItemApi.deleteOrderItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order-items"] });
    },
  });
}

