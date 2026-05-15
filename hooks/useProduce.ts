import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as produceApi from "@/lib/api/produce";
import type {
	ProduceFilters,
	CreateProduceInput,
	UpdateProduceInput,
	PartialUpdateProduceInput,
} from "@/types/produce";

export function useProduces(filters?: ProduceFilters) {
	return useQuery({
		queryKey: ["produces", filters],
		queryFn: () => produceApi.getProduces(filters),
	});
}

export function useProduce(id: string) {
	return useQuery({
		queryKey: ["produce", id],
		queryFn: () => produceApi.getProduce(id),
		enabled: !!id,
	});
}

export function useCreateProduce() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateProduceInput) => produceApi.createProduce(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produces"] });
		},
	});
}

export function useUpdateProduce() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdateProduceInput }) =>
			produceApi.updateProduce(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["produces"] });
			queryClient.invalidateQueries({ queryKey: ["produce", variables.id] });
		},
	});
}

export function usePartialUpdateProduce() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			id,
			data,
		}: {
			id: string;
			data: PartialUpdateProduceInput;
		}) => produceApi.partialUpdateProduce(id, data),
		onSuccess: (_, variables) => {
			queryClient.invalidateQueries({ queryKey: ["produces"] });
			queryClient.invalidateQueries({ queryKey: ["produce", variables.id] });
		},
	});
}

export function useDeleteProduce() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => produceApi.deleteProduce(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["produces"] });
		},
	});
}
