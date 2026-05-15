import { apiRequest } from "@/lib/api";
import type { 
  DemandForecast, 
  DemandForecastResponse,
  BuyerReturnPrediction, 
  PredictionSummary, 
  ForecastPeriod 
} from "@/types/prediction";

/** Fetch AI demand forecast for a specific produce item */
export async function getDemandForecast(
  produceId: string, 
  period: ForecastPeriod = "weekly"
): Promise<DemandForecastResponse> {
  return apiRequest<DemandForecastResponse>(
    `/api/predictions/recommendations/demand/?produce_id=${produceId}&forecast_period=${period}`
  );
}

/** Fetch AI buyer return prediction */
export async function getBuyerReturnPrediction(
  buyerId: string, 
  produceId: string
): Promise<BuyerReturnPrediction> {
  return apiRequest<BuyerReturnPrediction>(
    `/api/predictions/recommendations/buyer-return/?buyer_id=${buyerId}&produce_id=${produceId}`
  );
}

/** Fetch summary prediction (both demand and buyer return) */
export async function getPredictionSummary(
  buyerId: string, 
  produceId: string, 
  period: ForecastPeriod = "weekly"
): Promise<PredictionSummary> {
  return apiRequest<PredictionSummary>(
    `/api/predictions/recommendations/summary/?buyer_id=${buyerId}&produce_id=${produceId}&forecast_period=${period}`
  );
}
