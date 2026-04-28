'use client';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { X } from 'lucide-react';

export default function TrustBanner() {
  const t = useTranslations('trust');
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-brand-orange text-white text-sm py-2.5 px-4 flex items-center justify-center gap-3 relative">
      <span className="text-center font-medium leading-tight">
        {t('banner')}
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
