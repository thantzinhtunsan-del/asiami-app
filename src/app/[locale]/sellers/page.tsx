import { useTranslations } from 'next-intl';
import SellerCard from '@/components/seller/SellerCard';

const ALL_SELLERS = [
  { id: 's1000000-0000-0000-0000-000000000001', storeName: 'Yangon Grocery', description: 'Authentic Myanmar groceries, spices, and snacks. We bring the tastes of Yangon to Japan.', photoUrl: null, nationality: 'Myanmar', badgeName: 'Myanmar-owned', badgeFlag: '🇲🇲', averageRating: 4.8, totalProducts: 5, approved: true },
  { id: 's1000000-0000-0000-0000-000000000002', storeName: 'Saigon Kitchen', description: 'Fresh Vietnamese ingredients, bánh mì supplies, and pho essentials delivered across Japan.', photoUrl: null, nationality: 'Vietnam', badgeName: 'Vietnamese-owned', badgeFlag: '🇻🇳', averageRating: 4.6, totalProducts: 5, approved: true },
  { id: 's1000000-0000-0000-0000-000000000003', storeName: 'Himalayan Treasures', description: 'Nepali cultural items, spices, handicrafts, and tea from the Himalayas.', photoUrl: null, nationality: 'Nepal', badgeName: 'Nepali-owned', badgeFlag: '🇳🇵', averageRating: 4.9, totalProducts: 5, approved: true },
];

export default function SellersPage() {
  const t = useTranslations('sellers');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="section-title mb-2">{t('viewAll')}</h1>
      <p className="text-brand-navy/60 mb-8">Discover community-verified Asian sellers across Japan</p>

      {/* Community filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['🇲🇲 Myanmar','🇻🇳 Vietnam','🇳🇵 Nepal','🇨🇳 China','🇹🇭 Thailand','🇮🇩 Indonesia','🇵🇭 Philippines'].map(c => (
          <button key={c} className="px-3 py-1.5 rounded-full text-sm bg-white border border-brand-cream-dark text-brand-navy hover:border-brand-orange hover:text-brand-orange transition-colors">
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {ALL_SELLERS.map(s => <SellerCard key={s.id} {...s} />)}
      </div>
    </div>
  );
}
