'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { X, ArrowRight } from 'lucide-react';

export default function TrustBanner() {
  const t = useTranslations('trust');
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-brand-navy border-b border-white/10 text-white text-sm py-2 px-4 flex items-center justify-center gap-3 relative">
      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
      <span className="text-white/80 font-medium leading-tight text-center">
        {t('banner')}
      </span>
      <Link
        href="/seller/register"
        className="hidden sm:inline-flex items-center gap-1 text-brand-orange font-semibold text-xs hover:gap-1.5 transition-all"
      >
        Start selling <ArrowRight size={11} />
      </Link>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full transition-colors"
        aria-label="Dismiss"
      >
        <X size={13} className="text-white/50" />
      </button>
    </div>
  );
}
