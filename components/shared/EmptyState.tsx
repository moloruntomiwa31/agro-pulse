import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-stone-200 shadow-sm text-center">
      <div className="w-16 h-16 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center mb-4">
        <Icon size={24} className="text-stone-400" />
      </div>
      <h3 className="text-lg font-bold text-stone-900 mb-2">{title}</h3>
      <p className="text-sm text-stone-500 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      
      {actionLabel && (
        actionHref ? (
          <Link
            href={actionHref}
            className="px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm transition-colors"
          >
            {actionLabel}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="px-6 py-2.5 rounded-xl bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm transition-colors"
          >
            {actionLabel}
          </button>
        )
      )}
    </div>
  );
}
