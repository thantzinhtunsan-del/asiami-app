import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { TrendingUp, Package, ShoppingCart, DollarSign, Clock, CheckCircle, Truck } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import type { OrderStatus } from '@/types/database';

const STATS = [
  { icon: DollarSign, label: 'GMV This Month', value: formatPrice(87400), trend: '+12%', color: 'text-green-600', bg: 'bg-green-50' },
  { icon: ShoppingCart, label: 'Orders Today', value: '4', trend: '+2 vs yesterday', color: 'text-blue-600', bg: 'bg-blue-50' },
  { icon: Package, label: 'Total Products', value: '5', trend: 'Active', color: 'text-brand-orange', bg: 'bg-brand-cream' },
  { icon: TrendingUp, label: 'Pending Shipments', value: '2', trend: 'Ship today', color: 'text-red-500', bg: 'bg-red-50' },
];

const RECENT_ORDERS: { id: string; buyer: string; items: string; total: number; status: OrderStatus; date: string }[] = [
  { id: 'ord-101', buyer: 'Tanaka M.', items: 'Shrimp Paste ×2', total: 1760, status: 'confirmed', date: '2024-11-25' },
  { id: 'ord-102', buyer: 'Kim Y.', items: 'Laphet Thoke Mix ×1', total: 1200, status: 'pending', date: '2024-11-25' },
  { id: 'ord-103', buyer: 'Suzuki R.', items: 'Thanaka Powder ×3', total: 1950, status: 'shipped', date: '2024-11-24' },
  { id: 'ord-104', buyer: 'Park J.', items: 'Sticky Rice Snack Pack ×1', total: 950, status: 'delivered', date: '2024-11-23' },
];

const STATUS_STYLES: Record<OrderStatus, { bg: string; text: string; icon: React.ElementType }> = {
  pending: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: Clock },
  confirmed: { bg: 'bg-blue-50', text: 'text-blue-700', icon: CheckCircle },
  shipped: { bg: 'bg-purple-50', text: 'text-purple-700', icon: Truck },
  delivered: { bg: 'bg-green-50', text: 'text-green-700', icon: CheckCircle },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', icon: Clock },
};

export default function SellerDashboardPage() {
  const t = useTranslations('dashboard');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">Seller Dashboard</h1>
          <p className="text-brand-navy/50 text-sm">Yangon Grocery 🇲🇲</p>
        </div>
        <Link href="/seller/products/new" className="btn-primary text-sm py-2.5 px-4">
          + Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map(({ icon: Icon, label, value, trend, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-brand-navy">{value}</p>
            <p className="text-xs text-brand-navy/60 mb-1">{label}</p>
            <p className={`text-xs font-medium ${color}`}>{trend}</p>
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[
          { label: 'Manage Products', href: '/seller/products', icon: '📦' },
          { label: 'View Orders', href: '/seller/orders', icon: '🛒' },
          { label: 'Payment Setup', href: '/seller/register', icon: '💳' },
        ].map(action => (
          <Link key={action.label} href={action.href as any}
            className="bg-white rounded-2xl p-4 text-center hover:shadow-md transition-shadow hover:border-brand-orange border-2 border-transparent"
          >
            <span className="text-2xl block mb-1">{action.icon}</span>
            <span className="text-xs font-medium text-brand-navy">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Recent orders table */}
      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-brand-cream-dark flex items-center justify-between">
          <h2 className="font-bold text-brand-navy">{t('recentOrders')}</h2>
          <Link href="/seller/orders" className="text-sm text-brand-orange hover:underline">View all</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-cream text-xs text-brand-navy/50 font-medium">
                <th className="px-4 py-3 text-left">Order</th>
                <th className="px-4 py-3 text-left">Buyer</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Items</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Total</th>
                <th className="px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order, i) => {
                const { bg, text, icon: Icon } = STATUS_STYLES[order.status];
                return (
                  <tr key={order.id} className={`border-t border-brand-cream-dark text-sm ${i % 2 === 0 ? '' : 'bg-brand-cream/30'}`}>
                    <td className="px-4 py-3 font-mono text-xs text-brand-navy/60">#{order.id}</td>
                    <td className="px-4 py-3 font-medium text-brand-navy">{order.buyer}</td>
                    <td className="px-4 py-3 text-brand-navy/60 hidden sm:table-cell">{order.items}</td>
                    <td className="px-4 py-3 text-brand-navy/60 text-xs">{formatDate(order.date)}</td>
                    <td className="px-4 py-3 font-bold text-brand-orange text-right">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <span className={`flex items-center justify-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${text}`}>
                        <Icon size={11} />
                        {order.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
