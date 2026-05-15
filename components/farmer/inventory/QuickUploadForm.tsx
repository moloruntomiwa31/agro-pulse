"use client";
import { useState } from "react";
import { LayoutGrid, Calendar } from "lucide-react";
import { useProductStore } from "@/lib/store/productStore";
import { useInventoryStore } from "@/lib/store/inventoryStore";
import { useAuthStore } from "@/lib/store/authStore";


export default function QuickUploadForm() {
  const { addProduct } = useProductStore();
  const { addItem, setAddModalOpen } = useInventoryStore();
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const category = formData.get("category") as string;
    const qty = formData.get("qty") as string;
    const price = formData.get("price") as string;
    const date = formData.get("date") as string;

    const formattedDate = new Date(date).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
    const newId = `INV-${Math.floor(Math.random() * 9000) + 1000}`;

    // Simulate network delay
    setTimeout(() => {
      // 1. Add to Marketplace
      addProduct({
        name: name,
        farm: user?.farmer_profile?.farm_name || "Babangida Poultry",
        farmerId: user?.farmer_profile?.id || "default-farmer",
        location: user?.farmer_profile?.farm_location || "Kano, NG",
        price: `₦${parseFloat(price).toLocaleString()}`,
        unit: "kg",
        badge: "NEW",
        badgeColor: "green",
        harvestDate: formattedDate,
        available: `${qty} kg total`,
        image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&q=70",
        organic: true,
      });


      // 2. Add to Inventory
      addItem({
        id: newId,
        name: name,
        type: category,
        status: "Available",
        qty: `${qty} kg`,
        date: formattedDate,
        listedOnMarketplace: true
      });

      setLoading(false);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();

      setTimeout(() => {
        setSuccess(false);
        setAddModalOpen(false); // Close modal automatically
      }, 1500);
    }, 800);
  };

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 lg:col-span-1">
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid size={18} className="text-stone-400" />
        <h2 className="text-lg font-bold text-stone-900">Quick Upload</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Produce Name</label>
          <input required name="name" type="text" placeholder="e.g. Organic Carrots" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Produce Type</label>
          <select required name="category" className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500">
            <option value="">Select Category</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Fruits">Fruits</option>
            <option value="Grains">Grains</option>
          </select>
        </div>
        
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Quantity (KG)</label>
            <input required name="qty" type="number" defaultValue={500} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
          </div>
          <div className="flex-1">
            <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Unit Price (₦)</label>
            <input required name="price" type="number" defaultValue={2500} className="w-full border border-stone-200 rounded-xl px-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-500 uppercase tracking-widest mb-1.5">Harvest Availability</label>
          <div className="relative">
            <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input required name="date" type="date" className="w-full border border-stone-200 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-stone-50 text-stone-900 focus:outline-none focus:border-forest-500 focus:ring-1 focus:ring-forest-500" />
          </div>
        </div>

        <button 
          disabled={loading || success}
          type="submit" 
          className="w-full bg-forest-950 hover:bg-forest-900 text-white font-bold py-3 rounded-xl mt-2 transition-colors shadow-sm disabled:opacity-70"
        >
          {loading ? "Uploading..." : success ? "Successfully Listed!" : "List on Marketplace"}
        </button>
      </form>
    </div>
  );
}
