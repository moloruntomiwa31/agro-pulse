import { create } from 'zustand';

export interface InventoryItem {
  id: string;
  name: string;
  type: string;
  status: 'Available' | 'Low Stock' | 'Growing';
  qty: string;
  date: string;
  listedOnMarketplace: boolean;
}

export const INITIAL_INVENTORY: InventoryItem[] = [
  { 
    id: "INV-2801",
    name: "Organic Roma Tomatoes", 
    type: "Vegetables", 
    status: "Available", 
    qty: "1,250 kg", 
    date: "Oct 18, 2025",
    listedOnMarketplace: true
  },
  { 
    id: "INV-1592",
    name: "Hard Red Winter Wheat", 
    type: "Grains", 
    status: "Low Stock", 
    qty: "150 kg", 
    date: "In Stock",
    listedOnMarketplace: true
  },
  { 
    id: "INV-0544",
    name: "Golden Gala Apples", 
    type: "Fruits", 
    status: "Growing", 
    qty: "Est. 2,500 kg", 
    date: "Nov 02, 2025",
    listedOnMarketplace: false
  },
];

interface InventoryState {
  items: InventoryItem[];
  addItem: (item: InventoryItem) => void;
  isAddModalOpen: boolean;
  setAddModalOpen: (isOpen: boolean) => void;
}

export const useInventoryStore = create<InventoryState>((set) => ({
  items: INITIAL_INVENTORY,
  addItem: (item) => set((state) => ({ items: [item, ...state.items] })),
  isAddModalOpen: false,
  setAddModalOpen: (isOpen) => set({ isAddModalOpen: isOpen })
}));
