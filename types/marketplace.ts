export interface Product {
  id: number;
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
