'use client';
import { useState } from 'react';
import { Truck, Clock, CheckCircle, Eye } from 'lucide-react';
import { formatPrice, formatDate } from '@/lib/utils';
import OrderStatusTimeline from '@/components/ui/OrderStatusTimeline';
import type { OrderStatus } from '@/types/database';

const ORDERS: {
  id: string; buyer: string; items: { title: string; qty: number; price: number }[];
  total: number; status: OrderStatus; date: string; address: string; trackingNumber?: string;
}[] = [
  { id: 'ord-101', buyer: 'Tanaka M. (田中 翔)', items: [{ title: 'Shrimp Paste (Ngapi)', qty: 2, price: 880 }], total: 1760, status: 'confirmed', date: '2024-11-25', address: '渋谷区神南1-1-1, 東京都 150-0041' },
  { id: 'ord-102', buyer: 'Kim Yuna', items: [{ title: 'Laphet Thoke Mix', qty: 1, price: 1200 }], total: 1200, status: 'pending', date: '2024-11-25', address: '新宿区西新宿2-3-1, 東京都 160-0023' },
  { id: 'ord-103', buyer: 'Suzuki R. (鈴木 理沙)', items: [{ title: 'Myanmar Thanaka Powder', qty: 3, price: 650 }], total: 1950, status: 'shipped', date: '2024-11-24', address: '港区六本木1-1, 東京都 106-0032', trackingNumber: 'JP123456789' },
  { id: 'ord-104', buyer: 'Park Junho', items: [{ title: 'Sticky Rice Snack Pack', qty: 1, price: 950 }], total: 950, status: 'delivered', date: '2024-11-23', address: '台東区浅草1-1-1, 東京都 111-0032', trackingNumber: 'JP987654321' },
  { id: 'ord-105', buyer: 'Yamamoto K.', items: [{ title: 'Longyi Fabric', qty: 1, price: 3200 }, { title: 'Shrimp Paste', qty: 1, price: 880 }], total: 4080, status: 'pending', date: '2024-11-26', address: '横浜市西区北幸2-4-1, 神奈川県 220-0004' },
];

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState(ORDERS);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [trackingInputs, setTrackingInputs] = useState<Record<string, string>>({});

  function markShipped(id: string) {
    setOrders(os => os.map(o =>
      o.id === id ? { ...o, status: 'shipped' as OrderStatus, trackingNumber: trackingInputs[id] || 'PENDING' } : o
    ));
  }

  const pending = orders.filter(o => o.status === 'pending' || o.status === 'confirmed');
  const shipped = orders.filter(o => o.status === 'shipped');
  const done = orders.filter(o => o.status === 'delivered');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-brand-navy mb-2">Order Management</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'To Process', count: pending.length, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
          { label: 'In Transit', count: shipped.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: Truck },
          { label: 'Delivered', count: done.length, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
        ].map(({ label, count, color, bg, icon: Icon }) => (
          <div key={label} className={`${bg} rounded-2xl p-4 text-center`}>
            <Icon size={20} className={`${color} mx-auto mb-1`} />
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
            <p className="text-xs text-brand-navy/60">{label}</p>
          </div>
        ))}
      </div>

      {/* Orders list */}
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded-2xl overflow-hidden">
            <div
              className="flex items-start gap-4 p-4 cursor-pointer hover:bg-brand-cream/30 transition-colors"
              onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="font-mono text-xs text-brand-navy/50">#{order.id}</span>
                  <span className="font-semibold text-brand-navy text-sm">{order.buyer}</span>
                  <span className="text-xs text-brand-navy/40">{formatDate(order.date)}</span>
                </div>
                <p className="text-sm text-brand-navy/60 truncate mb-2">
                  {order.items.map(i => `${i.title} ×${i.qty}`).join(', ')}
                </p>
                <OrderStatusTimeline status={order.status} />
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-brand-orange">{formatPrice(order.total)}</p>
                <Eye size={14} className="text-brand-navy/30 ml-auto mt-1" />
              </div>
            </div>

            {/* Expanded detail */}
            {expanded === order.id && (
              <div className="px-4 pb-4 border-t border-brand-cream-dark">
                <div className="mt-3 space-y-3">
                  <div>
                    <p className="text-xs font-medium text-brand-navy/50 mb-1">DELIVERY ADDRESS</p>
                    <p className="text-sm text-brand-navy">{order.address}</p>
                  </div>
                  {order.trackingNumber && (
                    <div>
                      <p className="text-xs font-medium text-brand-navy/50 mb-1">TRACKING NUMBER</p>
                      <p className="text-sm font-mono text-brand-navy">{order.trackingNumber}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-medium text-brand-navy/50 mb-1">ITEMS</p>
                    {order.items.map(item => (
                      <div key={item.title} className="flex justify-between text-sm">
                        <span className="text-brand-navy">{item.title} ×{item.qty}</span>
                        <span className="text-brand-navy/60">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ship action */}
                  {(order.status === 'confirmed' || order.status === 'pending') && (
                    <div className="flex gap-2 pt-2">
                      <input
                        className="input flex-1 text-sm py-2"
                        placeholder="Tracking number (optional)"
                        value={trackingInputs[order.id] || ''}
                        onChange={e => setTrackingInputs(t => ({ ...t, [order.id]: e.target.value }))}
                      />
                      <button
                        onClick={() => markShipped(order.id)}
                        className="btn-primary text-sm py-2 px-4 flex items-center gap-2 flex-shrink-0"
                      >
                        <Truck size={15} />
                        Mark Shipped
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
