"use client";
import { Plus, ShoppingCart, Minus, Zap } from "lucide-react";
import { useState } from "react";
import type { ProductCardProps } from "../../types/marketplace";

const badgeStyles = {
  green: "bg-forest-50 text-forest-700 border-forest-200",
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function ProductCard({ product, featured, onSelect, selected }: ProductCardProps) {
  const [qty, setQty] = useState(0);

  return (
    <div
      onClick={() => onSelect(product)}
      className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-200 group ${
        selected
          ? "border-forest-500 ring-1 ring-forest-500/40 shadow-sm"
          : "border-stone-200 hover:border-stone-300 hover:shadow-sm"
      } ${featured ? "bg-stone-50" : "bg-white"}`}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${featured ? "h-36" : "h-28"}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.badge && (
          <span className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${badgeStyles[product.badgeColor ?? "green"]}`}>
            {product.badge}
          </span>
        )}
        {product.organic && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-forest-100 text-forest-700 border border-forest-200">
            Organic
          </span>
        )}
        {product.outOfStock && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-3">
        <p className="text-sm font-semibold text-stone-900 leading-tight mb-0.5">{product.name}</p>
        <p className="text-[11px] text-stone-500 mb-1 truncate">{product.farm}</p>

        {product.aiTag && (
          <div className="flex items-center gap-1 mb-2">
            <Zap size={10} className="text-amber-500" />
            <span className="text-[10px] text-amber-600 font-medium">{product.aiTag}</span>
          </div>
        )}

        {product.harvestDate && (
          <p className="text-[10px] text-stone-500 mb-2">
            Harvest: <span className="text-stone-700 font-medium">{product.harvestDate}</span>
            {product.available && (
              <> · <span className="text-forest-600 font-medium">{product.available}</span></>
            )}
          </p>
        )}

        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-base font-bold text-stone-900">{product.price}</span>
            <span className="text-[11px] text-stone-500 ml-1">/{product.unit}</span>
          </div>

          {qty === 0 ? (
            <button
              onClick={(e) => { e.stopPropagation(); setQty(1); }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold transition-colors"
            >
              <ShoppingCart size={12} />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setQty(q => Math.max(0, q - 1))} className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors">
                <Minus size={12} />
              </button>
              <span className="text-sm font-semibold text-stone-900 w-4 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)} className="p-1 rounded-md bg-forest-600 hover:bg-forest-700 text-white transition-colors">
                <Plus size={12} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
