import { create } from 'zustand';
import type { Product } from '../../types/marketplace';

interface ProductState {
  products: Product[];
  searchQuery: string;
  activeFilter: string;
  setProducts: (products: Product[]) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  filteredProducts: () => Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  searchQuery: '',
  activeFilter: 'all',
  
  setProducts: (products) => set({ products }),
  addProduct: (product: Omit<Product, 'id'>) => set((state) => ({
    products: [{ ...product, id: crypto.randomUUID() }, ...state.products]
  })),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setActiveFilter: (filter) => set({ activeFilter: filter }),
  
  filteredProducts: () => {
    const { products, searchQuery, activeFilter } = get();
    let filtered = products;
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.farm.toLowerCase().includes(q));
    }
    
    if (activeFilter === 'organic') {
      filtered = filtered.filter(p => p.organic);
    } else if (activeFilter === 'in_stock') {
      filtered = filtered.filter(p => !p.outOfStock);
    }
    
    return filtered;
  }
}));
