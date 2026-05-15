import { create } from "zustand";
import type { Product } from "../../types/marketplace";

interface ProductState {
	products: Product[];
	searchQuery: string;
	activeFilter: string;
	setProducts: (products: Product[]) => void;
	addProduct: (product: Omit<Product, "id">) => void;
	setSearchQuery: (query: string) => void;
	setActiveFilter: (filter: string) => void;
}

export const useProductStore = create<ProductState>((set) => ({
	products: [],
	searchQuery: "",
	activeFilter: "all",

	setProducts: (products) => set({ products }),

	addProduct: (product) =>
		set((state) => ({
			products: [{ ...product, id: crypto.randomUUID() }, ...state.products],
		})),

	setSearchQuery: (searchQuery) => set({ searchQuery }),

	setActiveFilter: (activeFilter) => set({ activeFilter }),
}));
