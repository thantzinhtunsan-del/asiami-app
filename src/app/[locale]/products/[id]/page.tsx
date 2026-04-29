import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { ChevronLeft, Star, Truck, Shield, Languages, Banknote, CreditCard } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice } from '@/lib/utils';
import CommunityBadge from '@/components/ui/CommunityBadge';
import ProductCard from '@/components/product/ProductCard';
import ProductAddToCart from '@/components/product/ProductAddToCart';
import type { ProductWithSeller } from '@/types/database';

interface Props {
  params: Promise<{ id: string; locale: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const t = await getTranslations('products');

  const supabase = await createClient();

  const { data: product, error } = await supabase
    .from('products')
    .select(`
      *,
      seller_profiles (
        id, store_name, photo_url, approved, user_id,
        community_badges ( id, name, flag_emoji, color )
      )
    `)
    .eq('id', id)
    .eq('active', true)
    .single<ProductWithSeller>();

  if (error || !product) {
    notFound();
  }

  const seller = product.seller_profiles;
  const badge = seller.community_badges;
  const image = product.images?.[0] ?? `https://picsum.photos/seed/${product.id}/600/600`;

  // Fetch related products from the same seller (up to 4, excluding current)
  const { data: related } = await supabase
    .from('products')
    .select(`
      id, title, price, images, stock, category,
      seller_profiles ( id, store_name, community_badges ( flag_emoji ) )
    `)
    .eq('seller_id', seller.id)
    .eq('active', true)
    .neq('id', product.id)
    .limit(4);

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
          {badge && (
            <div className="mb-2">
              <CommunityBadge flagEmoji={badge.flag_emoji} name={badge.name} size="sm" />
            </div>
          )}

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
            href={`/sellers/${seller.id}`}
            className="flex items-center gap-3 p-3 bg-brand-cream rounded-xl mb-5 hover:bg-brand-cream-dark transition-colors group"
          >
            <div className="w-10 h-10 bg-brand-orange rounded-xl flex items-center justify-center">
              {seller.photo_url ? (
                <Image src={seller.photo_url} alt={seller.store_name} width={40} height={40} className="rounded-xl object-cover" />
              ) : (
                <span className="text-white font-bold text-sm">
                  {seller.store_name.slice(0, 2).toUpperCase()}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-brand-navy text-sm group-hover:text-brand-orange transition-colors">{seller.store_name}</p>
              <p className="text-xs text-brand-navy/50">{t('soldBy')} {seller.store_name}</p>
            </div>
            <span className="text-brand-orange text-xs font-medium">{t('viewStore' as any)} →</span>
          </Link>

          {/* Qty + Add to cart (client component) */}
          <ProductAddToCart
            productId={product.id}
            sellerId={seller.id}
            title={product.title}
            price={product.price}
            stock={product.stock}
            image={image}
            sellerName={seller.store_name}
          />

          {/* Payment & Delivery info */}
          <div className="bg-brand-cream rounded-xl p-4 space-y-3">
            {/* Payment methods */}
            <div className="flex items-start gap-3">
              <CreditCard size={16} className="text-brand-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs font-semibold text-brand-navy mb-1">Payment</p>
                <div className="flex flex-wrap gap-1.5">
                  {product.payment_options.includes('prepaid') && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-brand-cream-dark rounded-full text-xs font-medium text-brand-navy">
                      <CreditCard size={11} className="text-brand-orange" />
                      Prepaid
                    </span>
                  )}
                  {product.payment_options.includes('cod') && (
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
                {product.delivery_fee_type === 'included' ? (
                  <p className="text-xs text-brand-navy/70">
                    <span className="font-semibold text-green-600">Free delivery</span> — included in price
                  </p>
                ) : (
                  <p className="text-xs text-brand-navy/70">
                    <span className="font-semibold text-brand-navy">
                      +{formatPrice(product.delivery_fee)}
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
      {related && related.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-brand-navy mb-5">{t('moreFromSeller')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map((p: any) => (
              <ProductCard
                key={p.id}
                id={p.id}
                title={p.title}
                price={p.price}
                images={p.images}
                stock={p.stock}
                category={p.category}
                sellerName={p.seller_profiles?.store_name ?? ''}
                sellerId={p.seller_profiles?.id ?? ''}
                badgeFlag={p.seller_profiles?.community_badges?.flag_emoji ?? null}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
