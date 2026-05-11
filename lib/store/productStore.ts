import { create } from 'zustand';
import type { Product } from '../../types/marketplace';

interface ProductState {
  products: Product[];
  searchQuery: string;
  activeFilter: string;
  setProducts: (products: Product[]) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  filteredProducts: () => Product[];
}

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Heritage Roma Tomatoes",
    farm: "Green Valley Farms, Kano (17 mi)",
    location: "Kano, NG",
    price: "₦3500",
    unit: "kg",
    badge: "AI ↑ 5%",
    badgeColor: "gold",
    harvestDate: "Dec 08, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=70",
    organic: true,
  },
  {
    id: 2,
    name: "Organic Carrots",
    farm: "Sunpower Organics",
    location: "Jos, NG",
    price: "₦1300",
    unit: "kg",
    badge: "Organic",
    badgeColor: "green",
    harvestDate: "Dec 10, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=70",
    aiTag: "High demand predicted",
  },
  {
    id: 3,
    name: "Bell Pepper Mix",
    farm: "Riverside Cooperative",
    location: "Kaduna, NG",
    price: "₦4800",
    unit: "kg",
    badge: "RESTOCKED",
    badgeColor: "blue",
    harvestDate: "Dec 12, 2025",
    available: "Limited",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=70",
  },
  {
    id: 4,
    name: "Leafy Kale Bunch",
    farm: "River Heart Harvest",
    location: "Ibadan, NG",
    price: "₦2350",
    unit: "ea",
    harvestDate: "Dec 14, 2025",
    available: "Bundles: 250g per bunch",
    image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?w=400&q=70",
    organic: true,
  },
  {
    id: 5,
    name: "Sweet Corn",
    farm: "Prairie Gold Farms",
    location: "Ogun, NG",
    price: "₦800",
    unit: "ea",
    badge: "Seasonal",
    badgeColor: "gold",
    harvestDate: "Dec 09, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&q=70",
  },
  {
    id: 6,
    name: "Zucchini",
    farm: "Hillside Gardens",
    location: "Enugu, NG",
    price: "₦2100",
    unit: "kg",
    harvestDate: "Dec 11, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?w=400&q=70",
    outOfStock: false,
  },
  {
    id: 7,
    name: "Organic Russet Potatoes",
    farm: "Green Acres Farm • Grade A",
    location: "Plateau, NG",
    price: "₦4500",
    unit: "kg",
    harvestDate: "Dec 05, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&q=70",
    organic: true,
  },
  {
    id: 8,
    name: "Red Bulb Onions",
    farm: "Valley Harvest Co-op",
    location: "Sokoto, NG",
    price: "₦1200",
    unit: "kg",
    harvestDate: "Dec 01, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&q=70",
  },
  {
    id: 9,
    name: "Fine Green Beans",
    farm: "Sunrise Orchards",
    location: "Benue, NG",
    price: "₦2100",
    unit: "kg",
    harvestDate: "Dec 12, 2025",
    available: "In stock",
    image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=70",
  },
];

export const useProductStore = create<ProductState>((set, get) => ({
  products: INITIAL_PRODUCTS,
  searchQuery: '',
  activeFilter: 'all',
  
  setProducts: (products) => set({ products }),
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
