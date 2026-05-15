export enum AvailabilityStatus {
  AVAILABLE = "AVAILABLE",
  LOW_STOCK = "LOW_STOCK",
  SOLD_OUT = "SOLD_OUT",
}

export enum Category {
  VEGETABLES = "VEGETABLES",
  FRUITS = "FRUITS",
  GRAINS = "GRAINS",
  DAIRY = "DAIRY",
  MEAT = "MEAT",
  OTHER = "OTHER",
}

/** Shape returned by GET /api/produces/ (list) */
export interface Produce {
  id: string;
  farmer: string;
  farmer_farm_name: string;
  farmer_user_full_name: string;
  produce_name: string;
  category: Category;
  unit_price: string;
  quantity_available: number;
  harvest_date: string;
  availability_status: AvailabilityStatus;
  created_at: string;
  updated_at?: string;
}

/** Shape returned by GET /api/produces/{id}/ (detail) */
export interface ProduceDetail extends Omit<Produce, "farmer_farm_name" | "farmer_user_full_name"> {
  farmer_details: {
    farm_name: string;
    farm_location: string;
    farmer_name: string;
    farmer_email: string;
    farmer_phone: string;
  };
}

export interface ProduceFilters {
  category?: Category;
  availability_status?: AvailabilityStatus;
  farmer?: string;
  search?: string;
  ordering?: string;
}

export type ProduceListResponse = Produce[];

export interface CreateProduceInput {
  farmer: string;
  produce_name: string;
  category: Category | string;
  unit_price: string | number;
  quantity_available: number;
  harvest_date: string;
  availability_status?: AvailabilityStatus | string;
}

export interface UpdateProduceInput extends CreateProduceInput {}

export type PartialUpdateProduceInput = Partial<CreateProduceInput>;

