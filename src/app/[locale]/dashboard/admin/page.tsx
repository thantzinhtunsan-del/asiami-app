import { Link } from '@/i18n/navigation';
import { Users, Store, ShoppingCart, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';

const PENDING_SELLERS = [
  { id: 'ps-001', storeName: 'Bangkok Spice Co.', ownerName: 'Somchai P.', nationality: 'Thailand', badge: '🇹🇭', submittedAt: '2024-11-25', businessType: 'individual' },
  { id: 'ps-002', storeName: 'Dhaka Textiles', ownerName: 'Rahim A.', nationality: 'Bangladesh', badge: '🇧🇩', submittedAt: '2024-11-24', businessType: 'company' },
  { id: 'ps-003', storeName: 'Manila Delights', ownerName: 'Maria S.', nationality: 'Philippines', badge: '🇵🇭', submittedAt: '2024-11-23', businessType: 'individual' },
];

const REPORTED = [
  { id: 'r-001', productTitle: 'Fake Branded Handbag', reportedBy: 'anonymous', reason: 'Counterfeit goods', date: '2024-11-24' },
];

const RECENT_ORDERS = [
  { id: 'o-001', buyer: 'Tanaka M.', seller: 'Yangon Grocery', total: 3280, date: '2024-11-25' },
  { id: 'o-002', buyer: 'Kim Y.', seller: 'Saigon Kitchen', total: 1400, date: '2024-11-25' },
  { id: 'o-003', buyer: 'Park J.', seller: 'Himalayan Treasures', total: 4500, date: '2024-11-24' },
];

export default function AdminDashboardPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Admin Dashboard</h1>
        <span className="badge bg-brand-navy text-white px-3 py-1 text-xs">Admin</span>
      </div>

      {/* Platform stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Platform GMV', value: formatPrice(238400), color: 'text-green-600', bg: 'bg-green-50' },
          { icon: Store, label: 'Active Sellers', value: '3', color: 'text-brand-orange', bg: 'bg-brand-cream' },
          { icon: Users, label: 'Active Buyers', value: '12', color: 'text-blue-600', bg: 'bg-blue-50' },
          { icon: ShoppingCart, label: "Today's Orders", value: '6', color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5">
            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon size={20} className={color} />
            </div>
            <p className="text-2xl font-bold text-brand-navy">{value}</p>
            <p className="text-xs text-brand-navy/60">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending approvals */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-cream-dark flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-yellow-500" />
              <h2 className="font-bold text-brand-navy">Pending Approvals</h2>
              {PENDING_SELLERS.length > 0 && (
                <span className="w-5 h-5 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center justify-center">
                  {PENDING_SELLERS.length}
                </span>
              )}
            </div>
            <Link href="/dashboard/admin/approvals" className="text-sm text-brand-orange hover:underline">View all</Link>
          </div>
          <div className="divide-y divide-brand-cream-dark">
            {PENDING_SELLERS.map(seller => (
              <div key={seller.id} className="px-5 py-3 flex items-center gap-3">
                <span className="text-2xl">{seller.badge}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-brand-navy text-sm truncate">{seller.storeName}</p>
                  <p className="text-xs text-brand-navy/50">{seller.ownerName} · {seller.nationality} · {seller.businessType}</p>
                  <p className="text-xs text-brand-navy/30">{formatDate(seller.submittedAt)}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    href={`/dashboard/admin/approvals?id=${seller.id}`}
                    className="px-3 py-1.5 bg-brand-cream rounded-lg text-xs text-brand-navy font-medium hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-brand-cream-dark flex items-center gap-2">
            <ShoppingCart size={18} className="text-brand-orange" />
            <h2 className="font-bold text-brand-navy">Recent Orders</h2>
          </div>
          <div className="divide-y divide-brand-cream-dark">
            {RECENT_ORDERS.map(order => (
              <div key={order.id} className="px-5 py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-brand-navy">{order.buyer} → {order.seller}</p>
                  <p className="text-xs text-brand-navy/40">{formatDate(order.date)}</p>
                </div>
                <span className="font-bold text-brand-orange text-sm">{formatPrice(order.total)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reported listings */}
        <div className="bg-white rounded-2xl overflow-hidden lg:col-span-2">
          <div className="px-5 py-4 border-b border-brand-cream-dark flex items-center gap-2">
            <AlertCircle size={18} className="text-red-500" />
            <h2 className="font-bold text-brand-navy">Reported Listings</h2>
          </div>
          {REPORTED.length > 0 ? (
            <div className="divide-y divide-brand-cream-dark">
              {REPORTED.map(r => (
                <div key={r.id} className="px-5 py-3 flex items-start gap-3">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="font-semibold text-brand-navy text-sm">{r.productTitle}</p>
                    <p className="text-xs text-brand-navy/50">Reason: {r.reason} · {formatDate(r.date)}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-medium hover:bg-red-100 transition-colors">Remove</button>
                    <button className="px-3 py-1.5 bg-brand-cream rounded-lg text-xs font-medium hover:bg-brand-cream-dark transition-colors">Dismiss</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <CheckCircle size={28} className="text-green-400 mx-auto mb-2" />
              <p className="text-sm text-brand-navy/50">No reported listings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
