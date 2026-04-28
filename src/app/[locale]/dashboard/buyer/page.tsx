import { useTranslations } from 'next-intl';
import { Heart, Settings, ShoppingBag } from 'lucide-react';
import OrderStatusTimeline from '@/components/ui/OrderStatusTimeline';
import { formatPrice, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types/database';

const SAMPLE_ORDERS: {
  id: string; createdAt: string; total: number; status: OrderStatus;
  items: { title: string; qty: number }[]; sellerName: string;
}[] = [
  { id: 'ord-001', createdAt: '2024-11-15', total: 3280, status: 'delivered', items: [{ title: 'Shrimp Paste (Ngapi)', qty: 2 }, { title: 'Laphet Thoke Mix', qty: 1 }], sellerName: 'Yangon Grocery' },
  { id: 'ord-002', createdAt: '2024-11-20', total: 1400, status: 'shipped', items: [{ title: 'Pho Kit — Beef Broth', qty: 1 }], sellerName: 'Saigon Kitchen' },
  { id: 'ord-003', createdAt: '2024-11-25', total: 760, status: 'confirmed', items: [{ title: 'Masala Chai Blend', qty: 1 }], sellerName: 'Himalayan Treasures' },
];

export default function BuyerDashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-brand-navy mb-6">{t('orders')}</h1>

      {/* Quick links */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: ShoppingBag, label: 'My Orders', href: '#orders', count: SAMPLE_ORDERS.length },
          { icon: Heart, label: 'Saved Sellers', href: '#saved', count: 2 },
          { icon: Settings, label: 'Settings', href: '#settings', count: null },
        ].map(({ icon: Icon, label, href, count }) => (
          <a key={label} href={href} className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 bg-brand-cream rounded-xl flex items-center justify-center mx-auto mb-2">
              <Icon size={20} className="text-brand-orange" />
            </div>
            <p className="text-xs text-brand-navy/60 font-medium">{label}</p>
            {count !== null && <p className="text-lg font-bold text-brand-navy">{count}</p>}
          </a>
        ))}
      </div>

      {/* Order history */}
      <h2 id="orders" className="text-lg font-bold text-brand-navy mb-4">{t('recentOrders')}</h2>
      <div className="space-y-4">
        {SAMPLE_ORDERS.map(order => (
          <div key={order.id} className="bg-white rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-semibold text-brand-navy text-sm">Order #{order.id}</p>
                <p className="text-xs text-brand-navy/50">{formatDate(order.createdAt)} · {order.sellerName}</p>
                <p className="text-xs text-brand-navy/60 mt-1">{order.items.map(i => `${i.title} ×${i.qty}`).join(', ')}</p>
              </div>
              <span className="font-bold text-brand-orange text-sm flex-shrink-0">{formatPrice(order.total)}</span>
            </div>
            <OrderStatusTimeline status={order.status} />
          </div>
        ))}
      </div>

      {/* Profile settings */}
      <div id="settings" className="mt-8">
        <h2 className="text-lg font-bold text-brand-navy mb-4">Profile & Language</h2>
        <div className="bg-white rounded-2xl p-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Full Name</label>
              <input className="input" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Email</label>
              <input className="input" type="email" placeholder="email@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Preferred Language</label>
              <select className="input">
                <option value="en">English</option>
                <option value="ja">日本語</option>
                <option value="my">မြန်မာဘာသာ</option>
                <option value="vi">Tiếng Việt</option>
                <option value="zh">中文</option>
                <option value="ne">नेपाली</option>
                <option value="th">ภาษาไทย</option>
                <option value="id">Bahasa Indonesia</option>
              </select>
            </div>
          </div>
          <button className="btn-primary mt-4 text-sm py-2.5">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
