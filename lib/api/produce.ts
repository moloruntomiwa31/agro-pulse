import { apiRequest } from "@/lib/api";
import type {
	Produce,
	ProduceDetail,
	ProduceFilters,
	ProduceListResponse,
	CreateProduceInput,
	UpdateProduceInput,
	PartialUpdateProduceInput,
} from "@/types/produce";

export async function getProduces(
	filters?: ProduceFilters,
): Promise<ProduceListResponse> {
	const params = new URLSearchParams();

	if (filters?.category) params.set("category", filters.category);
	if (filters?.availability_status)
		params.set("availability_status", filters.availability_status);
	if (filters?.search) params.set("search", filters.search);
	if (filters?.ordering) params.set("ordering", filters.ordering);

	const query = params.toString();
	const endpoint = query ? `/api/produces/?${query}` : `/api/produces/`;
	return apiRequest<ProduceListResponse>(endpoint);
}

export async function getMyProduces(): Promise<ProduceListResponse> {
	return apiRequest<ProduceListResponse>("/api/produces/my_produces/");
}


export async function getProduce(id: string): Promise<ProduceDetail> {
	return apiRequest<ProduceDetail>(`/api/produces/${id}/`);
}

export async function createProduce(
	data: CreateProduceInput,
): Promise<Produce> {
	return apiRequest<Produce>("/api/produces/", {
		method: "POST",
		body: JSON.stringify(data),
	});
}

export async function updateProduce(
	id: string,
	data: UpdateProduceInput,
): Promise<ProduceDetail> {
	return apiRequest<ProduceDetail>(`/api/produces/${id}/`, {
		method: "PUT",
		body: JSON.stringify(data),
	});
}

export async function partialUpdateProduce(
	id: string,
	data: PartialUpdateProduceInput,
): Promise<ProduceDetail> {
	return apiRequest<ProduceDetail>(`/api/produces/${id}/`, {
		method: "PATCH",
		body: JSON.stringify(data),
	});
}

export async function deleteProduce(id: string): Promise<void> {
	return apiRequest<void>(`/api/produces/${id}/`, {
		method: "DELETE",
	});
}
