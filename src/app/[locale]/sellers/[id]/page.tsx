import { Star, Clock, Package, CheckCircle } from 'lucide-react';
import CommunityBadge from '@/components/ui/CommunityBadge';
import ProductCard from '@/components/product/ProductCard';

const SELLER_DATA: Record<string, {
  id: string; storeName: string; description: string; nationality: string;
  badgeName: string; badgeFlag: string; averageRating: number; responseTime: number;
  story: string; totalProducts: number;
}> = {
  's1000000-0000-0000-0000-000000000001': {
    id: 's1000000-0000-0000-0000-000000000001',
    storeName: 'Yangon Grocery',
    description: 'Authentic Myanmar groceries, spices, and snacks.',
    nationality: 'Myanmar',
    badgeName: 'Myanmar-owned',
    badgeFlag: '🇲🇲',
    averageRating: 4.8,
    responseTime: 12,
    story: 'We are a family from Yangon, Myanmar who moved to Tokyo in 2019. Missing the tastes of home, we started sourcing authentic Myanmar ingredients for our community. What started as sharing with friends grew into Yangon Grocery — now serving Myanmar diaspora and Japanese food enthusiasts across Japan.',
    totalProducts: 5,
  },
};

const SELLER_PRODUCTS = [
  { id: 'p1000000-0000-0000-0000-000000000001', title: 'Shrimp Paste (Ngapi)', price: 880, category: 'food_grocery', stock: 50, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000002', title: 'Laphet Thoke Mix', price: 1200, category: 'food_grocery', stock: 30, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000003', title: 'Myanmar Thanaka Powder', price: 650, category: 'beauty', stock: 100, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000004', title: 'Sticky Rice Snack Pack', price: 950, category: 'snacks', stock: 80, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
  { id: 'p1000000-0000-0000-0000-000000000005', title: 'Longyi Fabric — Blue Floral', price: 3200, category: 'fashion', stock: 20, sellerName: 'Yangon Grocery', sellerId: 's1', badgeFlag: '🇲🇲', images: [] },
];

export default function SellerStorefrontPage({ params }: { params: { id: string } }) {
  const seller = SELLER_DATA[params.id] ?? SELLER_DATA['s1000000-0000-0000-0000-000000000001'];

  return (
    <div>
      {/* Banner */}
      <div className="h-48 md:h-64 bg-gradient-to-r from-brand-navy to-brand-orange relative overflow-hidden">
        <div className="absolute inset-0 opacity-15 flex items-center justify-around text-6xl">
          {['🌸','🍜','🎋','🏮','🌺','🍡'].map((e, i) => <span key={i}>{e}</span>)}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Profile header */}
        <div className="relative -mt-12 mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
          <div className="w-24 h-24 bg-brand-orange rounded-3xl border-4 border-white shadow-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-3xl">{seller.storeName[0]}</span>
          </div>
          <div className="pb-2">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold text-brand-navy">{seller.storeName}</h1>
              <CheckCircle size={20} className="text-brand-orange" />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <CommunityBadge flagEmoji={seller.badgeFlag} name={seller.badgeName} size="sm" />
              <div className="flex items-center gap-1 text-sm text-brand-navy/60">
                <Star size={14} className="text-yellow-400 fill-yellow-400" />
                <span className="font-semibold">{seller.averageRating}</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-brand-navy/60">
                <Clock size={14} />
                <span>Replies in ~{seller.responseTime}h</span>
              </div>
              <div className="flex items-center gap-1 text-sm text-brand-navy/60">
                <Package size={14} />
                <span>{seller.totalProducts} products</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 pb-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-5 mb-4">
              <h3 className="font-bold text-brand-navy mb-3">About the Seller</h3>
              <p className="text-brand-navy/60 text-sm leading-relaxed">{seller.story}</p>
            </div>
            <div className="bg-brand-cream rounded-2xl p-5">
              <h4 className="font-semibold text-brand-navy mb-3 text-sm">Store Stats</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-navy/60">Rating</span>
                  <span className="font-semibold text-brand-navy">{seller.averageRating}/5.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-navy/60">Response time</span>
                  <span className="font-semibold text-brand-navy">~{seller.responseTime}h</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-navy/60">Products</span>
                  <span className="font-semibold text-brand-navy">{seller.totalProducts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-brand-navy/60">Community</span>
                  <span className="font-semibold text-brand-navy">{seller.badgeFlag} {seller.nationality}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="lg:col-span-3">
            <h2 className="text-xl font-bold text-brand-navy mb-5">
              Products from {seller.storeName}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SELLER_PRODUCTS.map(p => <ProductCard key={p.id} {...p} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
