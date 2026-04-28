import { getTranslations } from 'next-intl/server';
import { Search, SlidersHorizontal } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { CATEGORIES, COMMUNITY_BADGES } from '@/lib/utils';

const SAMPLE_PRODUCTS = [
  { id: 'p1000000-0000-0000-0000-000000000001', title: 'Shrimp Paste (Ngapi)', price: 880, category: 'food_grocery', stock: 50, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '\u{1F1F2}\u{1F1F2}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000002', title: 'Laphet Thoke Mix', price: 1200, category: 'food_grocery', stock: 30, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '\u{1F1F2}\u{1F1F2}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000003', title: 'Myanmar Thanaka Powder', price: 650, category: 'beauty', stock: 100, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '\u{1F1F2}\u{1F1F2}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000004', title: 'Sticky Rice Snack Pack', price: 950, category: 'snacks', stock: 80, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '\u{1F1F2}\u{1F1F2}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000005', title: 'Longyi Fabric', price: 3200, category: 'fashion', stock: 20, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '\u{1F1F2}\u{1F1F2}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000006', title: 'Pho Kit Beef Broth', price: 1400, category: 'food_grocery', stock: 40, sellerName: 'Saigon Kitchen', sellerId: 's2', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000007', title: 'Banh Mi Bread Set', price: 1100, category: 'food_grocery', stock: 35, sellerName: 'Saigon Kitchen', sellerId: 's2', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000008', title: 'Vietnamese Fish Sauce Premium', price: 780, category: 'food_grocery', stock: 60, sellerName: 'Saigon Kitchen', sellerId: 's2', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000009', title: 'Mung Bean Sweet Soup', price: 850, category: 'snacks', stock: 45, sellerName: 'Saigon Kitchen', sellerId: 's2', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000010', title: 'Ao Dai Scarf Silk Blend', price: 2800, category: 'fashion', stock: 15, sellerName: 'Saigon Kitchen', sellerId: 's2', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000011', title: 'Himalayan Pink Salt 1kg', price: 980, category: 'food_grocery', stock: 70, sellerName: 'Himalayan Treasures', sellerId: 's3', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000012', title: 'Masala Chai Blend', price: 760, category: 'snacks', stock: 90, sellerName: 'Himalayan Treasures', sellerId: 's3', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000013', title: 'Singing Bowl Brass 15cm', price: 4500, category: 'cultural_items', stock: 12, sellerName: 'Himalayan Treasures', sellerId: 's3', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000014', title: 'Dhaka Weave Tote Bag', price: 2200, category: 'fashion', stock: 25, sellerName: 'Himalayan Treasures', sellerId: 's3', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000015', title: 'Mandala Thangka Print', price: 1800, category: 'cultural_items', stock: 30, sellerName: 'Himalayan Treasures', sellerId: 's3', badgeFlag: '\u{1F1F3}\u{1F1F3}', images: [] },
];

interface Props {
  searchParams: Promise<{ category?: string; q?: string; badge?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { category, q, badge } = await searchParams;
  const t = await getTranslations('products');
  const catT = await getTranslations('categories');

  const filtered = SAMPLE_PRODUCTS.filter(p => {
    if (category && p.category !== category) return false;
    if (q && !p.title.toLowerCase().includes(q.toLowerCase())) return false;
    if (badge && p.badgeFlag !== badge) return false;
    return true;
  });

  const activeCat = CATEGORIES.find(c => c.id === category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/40" />
          <form method="get">
            <input
              name="q"
              defaultValue={q}
              placeholder={t('search')}
              className="input pl-10 text-sm"
            />
          </form>
        </div>
        <button className="flex items-center gap-2 btn-secondary py-3 text-sm">
          <SlidersHorizontal size={16} />
          <span className="hidden sm:inline">{t('filter')}</span>
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        <a
          href="?"
          className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
            !category ? 'bg-brand-orange text-white' : 'bg-white text-brand-navy border border-brand-cream-dark hover:border-brand-orange'
          }`}
        >
          All
        </a>
        {CATEGORIES.map(cat => (
          <a
            key={cat.id}
            href={`?category=${cat.id}`}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              category === cat.id
                ? 'bg-brand-orange text-white'
                : 'bg-white text-brand-navy border border-brand-cream-dark hover:border-brand-orange'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{catT(cat.labelKey as Parameters<typeof catT>[0])}</span>
          </a>
        ))}
      </div>

      {/* Community filter */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
        {COMMUNITY_BADGES.map(b => (
          <a
            key={b.id}
            href={`?badge=${encodeURIComponent(b.flag)}`}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              badge === b.flag
                ? 'bg-brand-navy text-white'
                : 'bg-white text-brand-navy border border-brand-cream-dark hover:border-brand-navy'
            }`}
          >
            <span>{b.flag}</span>
            <span className="hidden sm:inline">{b.name.split('-')[0]}</span>
          </a>
        ))}
      </div>

      {/* Results count */}
      <p className="text-brand-navy/50 text-sm mb-4">
        {filtered.length} products
        {activeCat && ` in ${catT(activeCat.labelKey as Parameters<typeof catT>[0])}`}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(p => (
            <ProductCard key={p.id} {...p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-brand-navy/40">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="font-medium">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
}
