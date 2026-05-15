import { useQuery } from "@tanstack/react-query";
import * as predApi from "@/lib/api/prediction";
import type { ForecastPeriod } from "@/types/prediction";

export function useDemandForecast(produceId: string, period: ForecastPeriod = "weekly") {
  return useQuery({
    queryKey: ["predictions", "demand", produceId, period],
    queryFn: () => predApi.getDemandForecast(produceId, period),
    enabled: !!produceId,
    staleTime: 1000 * 60 * 60, // Predictions are relatively static, 1 hour cache
  });
}

export function useBuyerReturnPrediction(buyerId: string, produceId: string) {
  return useQuery({
    queryKey: ["predictions", "buyer-return", buyerId, produceId],
    queryFn: () => predApi.getBuyerReturnPrediction(buyerId, produceId),
    enabled: !!buyerId && !!produceId,
    staleTime: 1000 * 60 * 60,
  });
}

export function usePredictionSummary(buyerId: string, produceId: string, period: ForecastPeriod = "weekly") {
  return useQuery({
    queryKey: ["predictions", "summary", buyerId, produceId, period],
    queryFn: () => predApi.getPredictionSummary(buyerId, produceId, period),
    enabled: !!buyerId && !!produceId,
    staleTime: 1000 * 60 * 60,
  });
}
