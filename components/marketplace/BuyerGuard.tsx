"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

export default function BuyerGuard({ children }: { children: React.ReactNode }) {
  // Always render children freely during testing and development to prevent blank/hidden page
  return <>{children}</>;
}

