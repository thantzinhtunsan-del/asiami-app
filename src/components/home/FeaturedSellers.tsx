import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, Star, Package } from 'lucide-react';
import { getInitials } from '@/lib/utils';

// Static featured sellers for SSG — real data pulled from Supabase in dynamic pages
const FEATURED_SELLERS = [
  {
    id: 's1000000-0000-0000-0000-000000000001',
    storeName: 'Yangon Grocery',
    description: 'Authentic Myanmar groceries, spices, and snacks. We bring the tastes of Yangon to Japan.',
    nationality: 'Myanmar',
    badgeName: 'Myanmar-owned',
    averageRating: 4.8,
    totalProducts: 5,
  },
  {
    id: 's1000000-0000-0000-0000-000000000002',
    storeName: 'Saigon Kitchen',
    description: 'Fresh Vietnamese ingredients, banh mi supplies, and pho essentials delivered across Japan.',
    nationality: 'Vietnam',
    badgeName: 'Vietnamese-owned',
    averageRating: 4.6,
    totalProducts: 5,
  },
  {
    id: 's1000000-0000-0000-0000-000000000003',
    storeName: 'Himalayan Treasures',
    description: 'Nepali cultural items, spices, handicrafts, and tea from the Himalayas.',
    nationality: 'Nepal',
    badgeName: 'Nepali-owned',
    averageRating: 4.9,
    totalProducts: 5,
  },
];

function SellerInitialAvatar({ name, size = 'lg' }: { name: string; size?: 'lg' | 'sm' }) {
  const dim = size === 'lg' ? 'w-16 h-16 text-xl' : 'w-11 h-11 text-base';
  return (
    <div className={`${dim} rounded-2xl bg-brand-orange flex items-center justify-center flex-shrink-0`}>
      <span className="text-white font-bold">{getInitials(name)}</span>
    </div>
  );
}

export default function FeaturedSellers() {
  const t = useTranslations('sellers');
  const [featured, ...rest] = FEATURED_SELLERS;

  return (
    <section className="py-14 px-4 bg-[#FFF8F0]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange text-sm font-semibold uppercase tracking-wide mb-1">
              Sellers
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy">{t('featured')}</h2>
          </div>
          <Link
            href="/sellers"
            className="flex items-center gap-1.5 text-brand-orange font-medium text-sm hover:gap-2.5 transition-all"
          >
            {t('viewAll')} <ArrowRight size={15} />
          </Link>
        </div>

        {/* Asymmetric grid: 1 large featured + 2 stacked */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Featured seller — large card */}
          <Link
            href={`/sellers/${featured.id}`}
            className="lg:col-span-3 group block bg-white rounded-2xl border border-[#F5EDDF] p-7 hover:-translate-y-1 transition-all duration-200"
            style={{ boxShadow: '0 2px 8px rgba(26,43,74,0.06)' }}
          >
            <div className="flex items-start gap-5">
              <SellerInitialAvatar name={featured.storeName} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-brand-navy text-xl group-hover:text-brand-orange transition-colors leading-tight">
                    {featured.storeName}
                  </h3>
                  <span className="flex-shrink-0 text-xs font-medium bg-[#FFF8F0] text-brand-navy/60 px-2.5 py-1 rounded-full border border-[#F5EDDF]">
                    {featured.badgeName}
                  </span>
                </div>
                <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                  {featured.description}
                </p>
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-1.5 text-brand-navy/70">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-semibold tabular-nums">{featured.averageRating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-brand-navy/50">
                    <Package size={13} />
                    <span>{featured.totalProducts} items</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          {/* Two secondary sellers stacked */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {rest.map(seller => (
              <Link
                key={seller.id}
                href={`/sellers/${seller.id}`}
                className="group flex items-start gap-4 bg-white rounded-2xl border border-[#F5EDDF] p-5 hover:-translate-y-0.5 transition-all duration-200"
                style={{ boxShadow: '0 2px 8px rgba(26,43,74,0.06)' }}
              >
                <SellerInitialAvatar name={seller.storeName} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-bold text-brand-navy text-base group-hover:text-brand-orange transition-colors truncate">
                      {seller.storeName}
                    </h3>
                    <div className="flex items-center gap-1 flex-shrink-0 text-brand-navy/60 text-xs">
                      <Star size={11} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-semibold tabular-nums">{seller.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <p className="text-brand-navy/55 text-xs leading-relaxed line-clamp-2">
                    {seller.description}
                  </p>
                </div>
              </Link>
            ))}

            {/* Become a seller CTA */}
            <Link
              href="/seller/register"
              className="flex items-center justify-between gap-3 bg-brand-navy rounded-2xl p-5 group hover:bg-brand-navy/90 transition-colors"
            >
              <div>
                <p className="text-white font-semibold text-sm">Sell on Asiami</p>
                <p className="text-white/50 text-xs mt-0.5">0% commission, free to start</p>
              </div>
              <ArrowRight size={18} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
