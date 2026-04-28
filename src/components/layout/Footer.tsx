import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';

interface Props {
  locale: string;
}

export default function Footer({ locale }: Props) {
  const t = useTranslations('footer');

  return (
    <footer className="bg-brand-navy text-white mt-16 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="font-bold text-xl text-white">
                Asiami<span className="text-brand-orange">.</span>
              </span>
            </div>
            <p className="text-white/60 text-sm mb-4 max-w-xs">{t('tagline')}</p>

            {/* Community badges */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {['🇲🇲','🇻🇳','🇳🇵','🇨🇳','🇹🇭','🇮🇩','🇵🇭'].map(flag => (
                <span key={flag} className="text-xl">{flag}</span>
              ))}
            </div>

            <div className="mt-2">
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">{t('forBuyers')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/products" className="hover:text-brand-orange transition-colors">Browse Products</Link></li>
              <li><Link href="/sellers" className="hover:text-brand-orange transition-colors">Find Sellers</Link></li>
              <li><Link href="/dashboard/buyer" className="hover:text-brand-orange transition-colors">My Orders</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">{t('forSellers')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/seller/register" className="hover:text-brand-orange transition-colors">Start Selling</Link></li>
              <li><Link href="/dashboard/seller" className="hover:text-brand-orange transition-colors">Seller Dashboard</Link></li>
              <li><Link href="/seller/products" className="hover:text-brand-orange transition-colors">Manage Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3 text-sm">{t('aboutUs')}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><Link href="/about" className="hover:text-brand-orange transition-colors">{t('aboutUs')}</Link></li>
              <li><Link href="/contact" className="hover:text-brand-orange transition-colors">{t('contact')}</Link></li>
              <li><Link href="/terms" className="hover:text-brand-orange transition-colors">{t('terms')}</Link></li>
              <li><Link href="/privacy" className="hover:text-brand-orange transition-colors">{t('privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-xs">{t('copyright')}</p>
          <div className="flex items-center gap-2">
            <span className="text-white/40 text-xs">Phase 0 — 0% Commission for Sellers</span>
            <span className="badge bg-brand-orange/20 text-brand-orange text-xs px-2 py-0.5 rounded-full">FREE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
