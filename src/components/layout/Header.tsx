'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ShoppingCart, Menu, X, User, Store } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import LanguageSwitcher from './LanguageSwitcher';
import { useState } from 'react';

interface Props {
  locale: string;
}

export default function Header({ locale }: Props) {
  const t = useTranslations('nav');
  const itemCount = useCartStore(s => s.itemCount());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-brand-cream-dark sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-9 h-9 bg-brand-orange rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg leading-none">A</span>
            </div>
            <span className="font-bold text-xl text-brand-navy">
              Asiami
              <span className="text-brand-orange ml-0.5">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-brand-navy hover:text-brand-orange hover:bg-brand-cream transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/products"
              className="px-3 py-2 rounded-lg text-sm font-medium text-brand-navy hover:text-brand-orange hover:bg-brand-cream transition-colors"
            >
              {t('products')}
            </Link>
            <Link
              href="/sellers"
              className="px-3 py-2 rounded-lg text-sm font-medium text-brand-navy hover:text-brand-orange hover:bg-brand-cream transition-colors"
            >
              {t('sellers')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-brand-cream transition-colors"
              aria-label={t('cart')}
            >
              <ShoppingCart size={22} className="text-brand-navy" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount > 9 ? '9+' : itemCount}
                </span>
              )}
            </Link>

            {/* Sell CTA */}
            <Link
              href="/seller/register"
              className="hidden md:flex items-center gap-1.5 btn-primary py-2 px-4 text-sm"
            >
              <Store size={15} />
              {t('sellOnAsiami')}
            </Link>

            {/* User */}
            <Link
              href="/dashboard/buyer"
              className="hidden md:flex p-2 rounded-lg hover:bg-brand-cream transition-colors"
              aria-label={t('dashboard')}
            >
              <User size={22} className="text-brand-navy" />
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-brand-cream transition-colors"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-brand-cream-dark px-4 py-3 space-y-1">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-brand-navy font-medium hover:bg-brand-cream"
          >
            {t('home')}
          </Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-brand-navy font-medium hover:bg-brand-cream"
          >
            {t('products')}
          </Link>
          <Link href="/sellers" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-brand-navy font-medium hover:bg-brand-cream"
          >
            {t('sellers')}
          </Link>
          <Link href="/seller/register" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-brand-orange font-semibold hover:bg-brand-cream"
          >
            {t('sellOnAsiami')}
          </Link>
          <Link href="/dashboard/buyer" onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-brand-navy font-medium hover:bg-brand-cream"
          >
            {t('dashboard')}
          </Link>
        </div>
      )}
    </header>
  );
}
