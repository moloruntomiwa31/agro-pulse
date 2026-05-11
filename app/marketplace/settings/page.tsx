"use client";

import { GenericSettingsLayout, SettingsTab } from "../../../components/shared/SettingsLayout";
import { User, Bell, Shield, MapPin, CreditCard } from "lucide-react";

export default function BuyerSettings() {
  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'addresses', label: 'Delivery Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <GenericSettingsLayout 
      title="Account Settings" 
      description="Manage your profile, delivery preferences, and secure payment methods."
      tabs={tabs}
    />
  );
}
