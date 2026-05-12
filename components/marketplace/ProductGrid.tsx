"use client";
import { Fragment, useState } from "react";
import { Plus } from "lucide-react";
import type { Product } from "../../types/marketplace";
import DemandAlert from "./DemandAlert";
import ProductCard from "./ProductCard";
import ProductDetail from "./ProductDetail";
import SubscriptionCard from "./SubscriptionCard";

import { useProductStore } from "../../lib/store/productStore";

export default function ProductGrid() {
  const [selected, setSelected] = useState<Product | null>(null);
  const { filteredProducts } = useProductStore();

  return (
    <div className="flex flex-1 min-h-0">
      {/* Main scrollable area */}
      <div className="flex-1 overflow-y-auto px-6 py-5">
        <DemandAlert />

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts().map((p, i) => {
            // Subscription card after index 3
            if (i === 4) {
              return (
              <Fragment key={`sub-${p.id}`}>
                  <SubscriptionCard />
                  <ProductCard
                    product={p}
                    onSelect={setSelected}
                    selected={selected?.id === p.id}
                  />
                </Fragment>
              );
            }
            return (
              <ProductCard
                key={p.id}
                product={p}
                featured={i === 0}
                onSelect={setSelected}
                selected={selected?.id === p.id}
              />
            );
          })}
        </div>

      </div>

      {/* Detail panel */}
      {selected && (
        <ProductDetail product={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
