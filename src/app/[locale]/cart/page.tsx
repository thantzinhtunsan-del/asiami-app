'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const t = useTranslations('cart');
  const { items, removeItem, updateQuantity, total } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={64} className="text-brand-cream-dark mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-brand-navy mb-2">{t('empty')}</h1>
        <p className="text-brand-navy/50 mb-6">Add some amazing Asian products to get started!</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          {t('continueShopping')}
          <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">{t('title')}</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Items */}
        <div className="md:col-span-2 space-y-3">
          {items.map(item => (
            <div key={item.productId} className="bg-white rounded-2xl p-4 flex gap-4 items-center">
              <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream">
                <Image
                  src={item.image || `https://picsum.photos/seed/${item.productId}/200/200`}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.productId}`}>
                  <h3 className="font-semibold text-brand-navy text-sm hover:text-brand-orange transition-colors line-clamp-2">{item.title}</h3>
                </Link>
                <p className="text-xs text-brand-navy/50 mb-2">{item.sellerName}</p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 bg-brand-cream rounded-lg p-0.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="w-7 h-7 rounded-md bg-white text-brand-navy font-bold text-sm hover:bg-brand-orange hover:text-white transition-colors"
                    >−</button>
                    <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="w-7 h-7 rounded-md bg-white text-brand-navy font-bold text-sm hover:bg-brand-orange hover:text-white transition-colors"
                    >+</button>
                  </div>
                  <span className="font-bold text-brand-orange">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>

              <button
                onClick={() => removeItem(item.productId)}
                className="p-2 rounded-xl hover:bg-red-50 text-brand-navy/30 hover:text-red-400 transition-colors flex-shrink-0"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-5 sticky top-24">
            <h2 className="font-bold text-brand-navy mb-4">Order Summary</h2>

            <div className="space-y-2 mb-4 text-sm">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-brand-navy/60">
                  <span className="truncate mr-2">{item.title} ×{item.quantity}</span>
                  <span className="flex-shrink-0">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-brand-cream-dark pt-3 mb-5">
              <div className="flex justify-between font-bold text-brand-navy text-lg">
                <span>{t('total')}</span>
                <span className="text-brand-orange">{formatPrice(total())}</span>
              </div>
              <p className="text-xs text-brand-navy/40 mt-1">+ shipping calculated at checkout</p>
            </div>

            <Link
              href="/checkout"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {t('checkout')}
              <ArrowRight size={18} />
            </Link>

            <Link href="/products" className="block text-center text-sm text-brand-navy/50 hover:text-brand-orange mt-3 transition-colors">
              {t('continueShopping')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
