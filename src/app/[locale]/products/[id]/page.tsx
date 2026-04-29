'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingCart, ChevronLeft, Star, Truck, Shield, Languages, Banknote, CreditCard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import CommunityBadge from '@/components/ui/CommunityBadge';
import ProductCard from '@/components/product/ProductCard';
import type { ProductPaymentOption, DeliveryFeeType } from '@/types/database';

// Sample product data — in production fetched from Supabase
const SAMPLE_PRODUCTS: Record<string, {
  id: string; title: string; price: number; description: string;
  images: string[]; sellerName: string; sellerId: string;
  badgeFlag: string; badgeName: string; stock: number; category: string;
  paymentOptions: ProductPaymentOption[];
  deliveryFeeType: DeliveryFeeType;
  deliveryFee: number;
}> = {
  'p1000000-0000-0000-0000-000000000001': {
    id: 'p1000000-0000-0000-0000-000000000001',
    title: 'Shrimp Paste (Ngapi)',
    price: 880,
    description: 'Traditional Myanmar fermented shrimp paste, essential for authentic Myanmar cooking. This 250g jar of premium ngapi is sourced directly from coastal Myanmar. The rich, umami-packed paste is a cornerstone of Myanmar cuisine — used in everything from mohinga to tea leaf salad dressings. Produced using traditional fermentation methods passed down through generations.',
    images: [],
    sellerName: 'Yangon Grocery',
    sellerId: 's1000000-0000-0000-0000-000000000001',
    badgeFlag: '🇲🇲',
    badgeName: 'Myanmar-owned',
    stock: 50,
    category: 'food_grocery',
    paymentOptions: ['prepaid', 'cod'],
    deliveryFeeType: 'buyer_pays',
    deliveryFee: 500,
  },
};

const RELATED = [
  { id: 'p1000000-0000-0000-0000-000000000002', title: 'Laphet Thoke Mix', price: 1200, category: 'food_grocery', stock: 30, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000004', title: 'Sticky Rice Snack Pack', price: 950, category: 'snacks', stock: 80, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000003', title: 'Myanmar Thanaka Powder', price: 650, category: 'beauty', stock: 100, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000005', title: 'Longyi Fabric — Blue Floral', price: 3200, category: 'fashion', stock: 20, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
];

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const t = useTranslations('products');
  const addItem = useCartStore(s => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Fall back to first product for any unknown id
  const product = SAMPLE_PRODUCTS[params.id] ?? Object.values(SAMPLE_PRODUCTS)[0];
  const image = product.images[0] ?? `https://picsum.photos/seed/${product.id}/600/600`;

  function handleAdd() {
    addItem({
      productId: product.id,
      sellerId: product.sellerId,
      title: product.title,
      price: product.price,
      quantity: qty,
      image,
      sellerName: product.sellerName,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-brand-navy/50 mb-6">
        <Link href="/products" className="flex items-center gap-1 hover:text-brand-orange transition-colors">
          <ChevronLeft size={16} />
          {t('products' as any)}
        </Link>
        <span>/</span>
        <span className="text-brand-navy truncate max-w-xs">{product.title}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        {/* Image */}
        <div className="relative aspect-square bg-brand-cream rounded-3xl overflow-hidden">
          <Image
            src={image}
            alt={product.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Details */}
        <div>
          <div className="mb-2">
            <CommunityBadge flagEmoji={product.badgeFlag} name={product.badgeName} size="sm" />
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-brand-navy mb-3">{product.title}</h1>

          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl font-bold text-brand-orange">{formatPrice(product.price)}</span>
            <span className="text-sm text-brand-navy/50">
              {product.stock > 0 ? `${product.stock} ${t('stock')}` : 'Out of stock'}
            </span>
          </div>

          {/* Stars placeholder */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={16} className={i <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'} />
              ))}
            </div>
            <span className="text-sm text-brand-navy/50">4.8 (24 reviews)</span>
          </div>

          {/* Seller */}
          <Link
            href={`/sellers/${product.sellerId}`}
            className="flex items-center gap-3 p-3 bg-brand-cream rounded-xl mb-5 hover:bg-brand-cream-dark transition-colors group"
          >
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">YG</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-navy text-sm group-hover:text-brand-orange transition-colors">{product.sellerName}</p>
              <p className="text-xs text-brand-navy/50">{t('soldBy')} {product.sellerName}</p>
            </div>
            <span className="text-brand-orange text-xs font-medium">{t('viewStore' as any)} →</span>
          </Link>

          {/* Quantity + Add to cart */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center gap-2 bg-brand-cream rounded-xl p-1">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg bg-white text-brand-navy font-bold hover:bg-brand-orange hover:text-white transition-colors"
              >−</button>
              <span className="w-8 text-center font-semibold text-brand-navy">{qty}</span>
              <button
                onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                className="w-8 h-8 rounded-lg bg-white text-brand-navy font-bold hover:bg-brand-orange hover:text-white transition-colors"
              >+</button>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
                added ? 'bg-green-500 text-white' : product.stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'btn-primary'
              }`}
            >
              <ShoppingCart size={18} />
              {added ? 'Added!' : t('addToCart')}
            </button>
          </div>

          {/* Payment & Delivery info */}
          <div className="bg-brand-cream rounded-xl p-4 space-y-3">
            {/* Payment methods */}
            <div className="flex items-start gap-3">
              <CreditCard size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-navy mb-1">Payment</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.paymentOptions.includes('prepaid') && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-brand-cream-dark rounded-full text-xs font-medium text-brand-navy">
                      <CreditCard size={11} className="text-brand-orange" />
                      Prepaid
                    </span>
                  )}
                  {product.paymentOptions.includes('cod') && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-brand-cream-dark rounded-full text-xs font-medium text-brand-navy">
                      <Banknote size={11} className="text-brand-orange" />
                      Cash on Delivery
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Delivery fee */}
            <div className="flex items-start gap-3">
              <Truck size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-navy mb-0.5">Delivery</p>
                {product.deliveryFeeType === 'included' ? (
                  <p className="text-xs text-brand-navy/70">
                    <span className="font-semibold text-green-600">Free delivery</span> — included in price
                  </p>
                ) : (
                  <p className="text-xs text-brand-navy/70">
                    <span className="font-semibold text-brand-navy">
                      +{formatPrice(product.deliveryFee)}
                    </span>{' '}
                    delivery fee — added at checkout
                  </p>
                )}
              </div>
            </div>

            {/* Platform guarantees */}
            <div className="pt-2 border-t border-brand-cream-dark space-y-1.5">
              {[
                { icon: Shield, text: 'Buyer protection — full refund if not as described' },
                { icon: Languages, text: 'Multilingual support — ask seller in your language' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-brand-navy/55">
                  <Icon size={13} className="text-brand-orange flex-shrink-0" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-6 mb-10">
        <h2 className="text-lg font-bold text-brand-navy mb-3">Product Description</h2>
        <p className="text-brand-navy/70 leading-relaxed">{product.description}</p>
      </div>

      {/* More from seller */}
      <div>
        <h2 className="text-xl font-bold text-brand-navy mb-5">{t('moreFromSeller')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {RELATED.map(p => <ProductCard key={p.id} {...p} />)}
        </div>
      </div>
    </div>
  );
}
