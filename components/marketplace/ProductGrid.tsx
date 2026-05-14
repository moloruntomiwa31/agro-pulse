"use client";
import { useState, useEffect, useMemo } from "react";
import { Plus, Loader2, AlertCircle } from "lucide-react";
import { useProduces } from "@/hooks/useProduce";
import { Category, AvailabilityStatus } from "@/types/produce";
import { produceToProduct, type Product } from "@/types/marketplace";
import { useProductStore } from "@/lib/store/productStore";
import DemandAlert from "./DemandAlert";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import SubscriptionCard from "./SubscriptionCard";

const CATEGORY_LABELS: Record<Category, string> = {
  [Category.VEGETABLES]: "Vegetables",
  [Category.FRUITS]: "Fruits",
  [Category.GRAINS]: "Grains",
  [Category.DAIRY]: "Dairy",
  [Category.MEAT]: "Meat",
  [Category.OTHER]: "Other",
};

export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category | undefined>(undefined);
  const [selected, setSelected] = useState<Product | null>(null);

  const { searchQuery, activeFilter, setProducts } = useProductStore();

  // Fetch produce strictly filtered by the backend API via query parameters
  const { data, isLoading, isError, error } = useProduces({
    category: activeCategory || undefined,
    availability_status: AvailabilityStatus.AVAILABLE,
    // ordering: "-created_at",
    search: searchQuery || undefined,
  });


  // Sync fetched products into the store
  useEffect(() => {
    if (data?.results) {
      setProducts(data.results.map(produceToProduct));
    }
  }, [data, setProducts]);

  const products = useMemo(() => {
    const rawList = (data?.results ?? []).map(produceToProduct);
    if (!activeCategory) return rawList;
    return rawList.filter(p => p.category === activeCategory);
  }, [data, activeCategory]);





  // Fall back to first product when nothing is explicitly selected
  const activeProduct = selected ?? products[0] ?? null;

  return (
    <div className="flex flex-1 min-h-0">
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <DemandAlert />

        {/* Category filter tabs */}
        <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1">
          <button
            onClick={() => { setActiveCategory(undefined); setSelected(null); }}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              !activeCategory
                ? "bg-[var(--color-forest-700)] text-[var(--color-forest-100)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-forest-900)]"
            }`}
          >
            All
          </button>
          {Object.values(Category).map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setSelected(null); }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[var(--color-forest-700)] text-[var(--color-forest-100)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-forest-900)]"
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 size={28} className="animate-spin text-forest-600" />
            <p className="text-sm text-[var(--color-text-muted)]">Loading live catalog...</p>
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs">
            <AlertCircle size={16} className="shrink-0 text-red-600" />
            <span>Could not load live produce: {error instanceof Error ? error.message : "Failed to load produce"}.</span>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && products.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-2">
            <p className="text-sm font-semibold text-[var(--color-text-secondary)]">No produce found</p>
            <p className="text-xs text-[var(--color-text-muted)]">Try a different category or check back later</p>
          </div>
        )}

        {/* Grid */}
        {!isLoading && products.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p, i) => {
              if (i === 4) {
                return (
                  <div key="sub-container" className="contents">
                    <SubscriptionCard key="sub" />
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelect={setSelected}
                      selected={activeProduct?.id === p.id}
                    />
                  </div>
                );
              }
              return (
                <ProductCard
                  key={p.id}
                  product={p}
                  featured={i === 0}
                  onSelect={setSelected}
                  selected={activeProduct?.id === p.id}
                />
              );
            })}
          </div>
        )}
      </div>

      {activeProduct && (
        <ProductDetail product={activeProduct} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

