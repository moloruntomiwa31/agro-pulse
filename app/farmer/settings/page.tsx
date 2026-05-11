"use client";

import { GenericSettingsLayout, SettingsTab } from "../../../components/shared/SettingsLayout";
import { User, Bell, Shield, Building, Banknote } from "lucide-react";

export default function FarmerSettings() {
  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'farm', label: 'Farm Details', icon: Building },
    { id: 'payouts', label: 'Payout Methods', icon: Banknote },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <GenericSettingsLayout 
      title="AgroPulse Pro Settings" 
      description="Manage your business profile, escrow settlements, and farm preferences."
      tabs={tabs}
    />
  );
}
