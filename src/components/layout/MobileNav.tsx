'use client';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Home, Search, ShoppingCart, LayoutDashboard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { cn } from '@/lib/utils';

interface Props {
  locale: string;
}

export default function MobileNav({ locale: _locale }: Props) {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const itemCount = useCartStore(s => s.itemCount());

  const links = [
    { href: '/' as const, icon: Home, label: t('home') },
    { href: '/products' as const, icon: Search, label: t('products') },
    { href: '/cart' as const, icon: ShoppingCart, label: t('cart'), badge: itemCount },
    { href: '/dashboard/buyer' as const, icon: LayoutDashboard, label: t('dashboard') },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-brand-cream-dark safe-area-pb">
      <div className="flex items-center justify-around px-2 py-2">
        {links.map(({ href, icon: Icon, label, badge }) => {
          const isActive = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors min-w-0',
                isActive ? 'text-brand-orange' : 'text-brand-navy/50'
              )}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                {badge ? (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-orange text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {badge > 9 ? '9+' : badge}
                  </span>
                ) : null}
              </div>
              <span className={cn('text-[10px] font-medium truncate max-w-[60px]', isActive && 'font-semibold')}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
