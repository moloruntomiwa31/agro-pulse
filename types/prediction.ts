export type ForecastPeriod = "weekly" | "biweekly" | "monthly" | "seasonal" | "quarterly";

export interface DemandForecast {
  id: string;
  produce_id: string;
  predicted_demand_volume: number;
  forecast_period: ForecastPeriod;
  demand_spike_probability: string; // e.g., "85.00"
  recommended_stock_level: number;
  generated_at: string;
}

export interface DemandForecastResponse {
  demand_forecast: DemandForecast;
}

export interface BuyerReturnPrediction {
  buyer_id: string;
  produce_id: string;
  predicted_return_date: string;
  predicted_quantity: number;
  return_probability: number;
  confidence: number;
}

export interface PredictionSummary {
  demand_forecast: DemandForecast;
  buyer_return_prediction: BuyerReturnPrediction;
}
