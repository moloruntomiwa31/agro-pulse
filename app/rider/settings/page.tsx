"use client";

import { GenericSettingsLayout, SettingsTab } from "../../../components/shared/SettingsLayout";
import { User, Bell, Shield, Banknote, Navigation } from "lucide-react";

export default function TransporterSettings() {
  const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'vehicle', label: 'Vehicle Details', icon: Navigation },
    { id: 'payouts', label: 'Payout Methods', icon: Banknote },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ];

  return (
    <GenericSettingsLayout 
      title="Transporter Pro Settings"
      description="Manage your profile, vehicle, payouts, and delivery preferences."
      tabs={tabs}
    />
  );
}
