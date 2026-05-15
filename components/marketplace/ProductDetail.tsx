"use client";
import { X, MapPin, Calendar, Star, Leaf, ShoppingCart, Loader2 } from "lucide-react";
import type { ProductDetailProps } from "../../types/marketplace";
import { useProduce } from "@/hooks/useProduce";
import { produceDetailToProduct } from "@/types/marketplace";
import { useCheckoutStore } from "@/lib/store/checkoutStore";
import { useRouter } from "next/navigation";
import DemandForecastSection from "./DemandForecastSection";

export default function ProductDetail({ product, onClose }: ProductDetailProps) {

  const { data: produce, isLoading } = useProduce(product.id);
  const addItem = useCheckoutStore((state) => state.addItem);
  const router = useRouter();

  // Merge fetched data over the card-level product for richer detail
  const detail = produce ? produceDetailToProduct(produce) : product;
  const description = produce?.farmer_details
    ? `Sold by ${produce.farmer_details.farmer_name} · ${produce.farmer_details.farm_name}, ${produce.farmer_details.farm_location}`
    : undefined;

  const handleConfirmOrder = () => {
    const numericPrice = typeof detail.price === 'string' ? parseFloat(detail.price.replace(/[^0-9.]/g, '')) || 5000 : detail.price;
    addItem({
      id: detail.id,
      name: detail.name,
      farm: detail.farm,
      price: numericPrice,
      unit: detail.unit,
      image: detail.image,
      farmerId: detail.farmerId,
    });

    router.push("/marketplace/checkout");
  };

  return (
    <aside className="w-72 shrink-0 flex flex-col h-[calc(100vh-57px)] sticky top-[57px] border-l border-stone-200 bg-white overflow-y-auto">
      {/* Close */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200">
        <span className="text-xs font-semibold uppercase tracking-widest text-stone-500">Product Detail</span>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-stone-100 text-stone-500 transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Hero image */}
      <div className="h-44 overflow-hidden relative">
        <img src={detail.image} alt={detail.name} className="w-full h-full object-cover" />
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
            <Loader2 size={20} className="animate-spin text-forest-600" />
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Title & rating */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h2 className="font-display font-semibold text-base text-stone-900 leading-tight">{detail.name}</h2>
            {detail.badge && (
              <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-700 border border-forest-200">
                {detail.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500">{detail.farm}</p>
          <div className="flex items-center gap-1 mt-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={11} className={i < 4 ? "fill-amber-400 text-amber-400" : "text-stone-300"} />
            ))}
            <span className="text-[11px] text-stone-500 ml-1">4.8 · 493 reviews</span>
          </div>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2">
          {detail.harvestDate && (
            <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={11} className="text-forest-600" />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Harvest Date</span>
              </div>
              <p className="text-xs font-semibold text-stone-900">{detail.harvestDate}</p>
            </div>
          )}
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200">
            <div className="flex items-center gap-1.5 mb-1">
              <MapPin size={11} className="text-forest-600" />
              <span className="text-[10px] font-semibold uppercase tracking-wider text-stone-500">Origin</span>
            </div>
            <p className="text-xs font-semibold text-stone-900">{detail.location}</p>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1.5">Description</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            {description ?? `Grown using regenerative agriculture practices. These ${detail.name.toLowerCase()} are known for their firm, thick walls and concentrated flavor.`}
          </p>
        </div>

        {detail.organic && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-forest-50 border border-forest-200">
            <Leaf size={13} className="text-forest-600" />
            <span className="text-xs text-forest-700">Certified Organic · Regenerative Farm</span>
          </div>
        )}

        <DemandForecastSection produceId={product.id} />


        <div className="mt-auto pt-2 border-t border-stone-200">
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-2xl font-bold text-stone-900">{detail.price}</span>
            <span className="text-sm text-stone-500">/{detail.unit}</span>
          </div>
          <button 
            onClick={handleConfirmOrder}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm transition-colors"
          >
            <ShoppingCart size={15} />
            Confirm Order ({detail.price}/{detail.unit})
          </button>
        </div>
      </div>
    </aside>
  );
}

