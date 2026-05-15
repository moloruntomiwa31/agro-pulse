"use client";
import { useState } from "react";
import { Plus, ShoppingCart, Minus, Zap, AlertTriangle, X } from "lucide-react";
import type { ProductCardProps } from "../../types/marketplace";
import { useCheckoutStore } from "../../lib/store/checkoutStore";

const badgeStyles = {
  green: "bg-forest-50 text-forest-700 border-forest-200",
  gold: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function ProductCard({ product, featured, onSelect, selected }: ProductCardProps) {
  const { items, addItem, updateQuantity, clearCart } = useCheckoutStore();
  const [conflict, setConflict] = useState<{ currentFarm: string } | null>(null);

  const cartItem = items.find((i) => i.id === product.id);
  const qty = cartItem?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = addItem({
      id: product.id,
      name: product.name,
      farm: product.farm,
      farmerId: product.farmerId,
      price: product._rawPrice ?? 0,
      unit: product.unit || "unit",
      image: product.image || "",
    });

    if (!result.success && result.conflict) {
      setConflict({ currentFarm: result.currentFarm });
    }
  };

  const handleUpdateQty = (e: React.MouseEvent, newQty: number) => {
    e.stopPropagation();
    updateQuantity(product.id, newQty);
  };

  const handleSwitchFarmer = (e: React.MouseEvent) => {
    e.stopPropagation();
    clearCart();
    setConflict(null);
    addItem({
      id: product.id,
      name: product.name,
      farm: product.farm,
      farmerId: product.farmerId,
      price: product._rawPrice ?? 0,
      unit: product.unit || "unit",
      image: product.image || "",
    });
  };

  return (
    <>
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
          {product.outOfStock && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-3">
          <p className="font-semibold text-stone-900 text-sm leading-tight mb-0.5">{product.name}</p>
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

            {product.outOfStock ? null : qty === 0 ? (
              <button
                onClick={handleAdd}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-forest-600 hover:bg-forest-700 text-white text-xs font-semibold transition-colors"
              >
                <ShoppingCart size={12} />
                Add
              </button>
            ) : (
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={(e) => handleUpdateQty(e, Math.max(0, qty - 1))}
                  className="p-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors"
                >
                  <Minus size={12} />
                </button>
                <span className="text-sm font-semibold text-stone-900 w-4 text-center">{qty}</span>
                <button
                  onClick={(e) => handleUpdateQty(e, qty + 1)}
                  className="p-1 rounded-md bg-forest-600 hover:bg-forest-700 text-white transition-colors"
                >
                  <Plus size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Farmer conflict dialog */}
      {conflict && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={(e) => { e.stopPropagation(); setConflict(null); }}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50">
                  <AlertTriangle size={20} className="text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">Start a new order?</p>
                  <p className="text-xs text-stone-500 mt-0.5">You can only order from one farmer at a time</p>
                </div>
              </div>
              <button onClick={() => setConflict(null)} className="p-1 rounded-lg hover:bg-stone-100 text-stone-400">
                <X size={16} />
              </button>
            </div>

            <p className="text-sm text-stone-600 mb-5">
              Your cart has items from <span className="font-semibold text-stone-900">{conflict.currentFarm}</span>.
              Clear it and start a new order from <span className="font-semibold text-stone-900">{product.farm}</span>?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setConflict(null)}
                className="flex-1 py-2.5 rounded-xl border border-stone-200 text-sm font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
              >
                Keep current
              </button>
              <button
                onClick={handleSwitchFarmer}
                className="flex-1 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white text-sm font-semibold transition-colors"
              >
                Switch farmer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
