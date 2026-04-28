import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight } from 'lucide-react';
import SellerCard from '@/components/seller/SellerCard';

// Static featured sellers for SSG — real data pulled from Supabase in dynamic pages
const FEATURED_SELLERS = [
  {
    id: 's1000000-0000-0000-0000-000000000001',
    storeName: 'Yangon Grocery',
    description: 'Authentic Myanmar groceries, spices, and snacks. We bring the tastes of Yangon to Japan.',
    photoUrl: null,
    nationality: 'Myanmar',
    badgeName: 'Myanmar-owned',
    badgeFlag: '🇲🇲',
    averageRating: 4.8,
    totalProducts: 5,
    approved: true,
  },
  {
    id: 's1000000-0000-0000-0000-000000000002',
    storeName: 'Saigon Kitchen',
    description: 'Fresh Vietnamese ingredients, bánh mì supplies, and pho essentials delivered across Japan.',
    photoUrl: null,
    nationality: 'Vietnam',
    badgeName: 'Vietnamese-owned',
    badgeFlag: '🇻🇳',
    averageRating: 4.6,
    totalProducts: 5,
    approved: true,
  },
  {
    id: 's1000000-0000-0000-0000-000000000003',
    storeName: 'Himalayan Treasures',
    description: 'Nepali cultural items, spices, handicrafts, and tea from the Himalayas.',
    photoUrl: null,
    nationality: 'Nepal',
    badgeName: 'Nepali-owned',
    badgeFlag: '🇳🇵',
    averageRating: 4.9,
    totalProducts: 5,
    approved: true,
  },
];

export default function FeaturedSellers() {
  const t = useTranslations('sellers');

  return (
    <section className="py-12 px-4 bg-brand-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">{t('featured')}</h2>
          <Link
            href="/sellers"
            className="flex items-center gap-1.5 text-brand-orange font-medium text-sm hover:gap-2.5 transition-all"
          >
            {t('viewAll')} <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_SELLERS.map(seller => (
            <SellerCard key={seller.id} {...seller} />
          ))}
        </div>
      </div>
    </section>
  );
}
