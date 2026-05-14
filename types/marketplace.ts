import type { Produce, ProduceDetail } from "./produce";
import { AvailabilityStatus } from "./produce";

export type { Produce, ProduceDetail };

/** UI-shaped product used by all marketplace components */
export interface Product {
  id: string;
  name: string;
  farm: string;
  location: string;
  price: string;
  unit: string;
  badge?: string;
  badgeColor?: "green" | "gold" | "blue";
  harvestDate?: string;
  available?: string;
  image: string;
  organic?: boolean;
  aiTag?: string;
  outOfStock?: boolean;
  description?: string;
  category?: string;
}

export interface ProductCardProps {
  product: Product;
  featured?: boolean;
  onSelect: (p: Product) => void;
  selected?: boolean;
}

export interface ProductDetailProps {
  product: Product;
  onClose: () => void;
}

const CATEGORY_IMAGES: Record<string, string> = {
  VEGETABLES: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=70",
  FRUITS: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400&q=70",
  GRAINS: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=70",
  DAIRY: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=70",
  MEAT: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=70",
  OTHER: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=70",
};

/** Map a list Produce response to the UI Product shape */
export function produceToProduct(p: Produce): Product {
  return {
    id: p.id,
    name: p.produce_name,
    farm: p.farmer_farm_name ?? p.farmer_user_full_name ?? "Unknown Farm",
    location: "",
    price: `₦${parseFloat(p.unit_price).toLocaleString()}`,
    unit: "kg",
    harvestDate: p.harvest_date,
    available:
      p.availability_status === AvailabilityStatus.AVAILABLE
        ? "In stock"
        : p.availability_status === AvailabilityStatus.LOW_STOCK
        ? "Limited"
        : undefined,
    image: CATEGORY_IMAGES[p.category] ?? CATEGORY_IMAGES.OTHER,
    outOfStock: p.availability_status === AvailabilityStatus.SOLD_OUT,
    category: p.category,
  };
}

/** Map a detail ProduceDetail response to the UI Product shape */
export function produceDetailToProduct(p: ProduceDetail): Product {
  return {
    id: p.id,
    name: p.produce_name,
    farm: p.farmer_details?.farm_name ?? "Unknown Farm",
    location: p.farmer_details?.farm_location ?? "",
    price: `₦${parseFloat(p.unit_price).toLocaleString()}`,
    unit: "kg",
    harvestDate: p.harvest_date,
    available:
      p.availability_status === AvailabilityStatus.AVAILABLE
        ? "In stock"
        : p.availability_status === AvailabilityStatus.LOW_STOCK
        ? "Limited"
        : undefined,
    image: CATEGORY_IMAGES[p.category] ?? CATEGORY_IMAGES.OTHER,
    outOfStock: p.availability_status === AvailabilityStatus.SOLD_OUT,
    description: undefined,
    category: p.category,
  };
}

