'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { CheckCircle, XCircle, ArrowLeft, User, Store, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

type Status = 'pending' | 'approved' | 'rejected';

interface PendingSeller {
  id: string; storeName: string; ownerName: string; nationality: string; badge: string;
  businessType: string; submittedAt: string; description: string; email: string;
  status: Status; rejectionReason?: string;
}

const INITIAL: PendingSeller[] = [
  { id: 'ps-001', storeName: 'Bangkok Spice Co.', ownerName: 'Somchai Phakdee', nationality: 'Thailand', badge: '🇹🇭', businessType: 'individual', submittedAt: '2024-11-25', description: 'Authentic Thai spices, curry pastes, and condiments sourced directly from Bangkok markets.', email: 'somchai@example.com', status: 'pending' },
  { id: 'ps-002', storeName: 'Dhaka Textiles', ownerName: 'Mohammed Rahim', nationality: 'Bangladesh', badge: '🇧🇩', businessType: 'company', submittedAt: '2024-11-24', description: 'Handwoven Bangladeshi textiles, jamdani sarees, and traditional fabrics.', email: 'rahim@dhaka-textiles.jp', status: 'pending' },
  { id: 'ps-003', storeName: 'Manila Delights', ownerName: 'Maria Santos', nationality: 'Philippines', badge: '🇵🇭', businessType: 'individual', submittedAt: '2024-11-23', description: 'Filipino pantry staples, snacks, and ready-to-cook kits. Bringing the flavors of Manila to Japan.', email: 'maria@example.com', status: 'pending' },
];

export default function SellerApprovalsPage() {
  const [sellers, setSellers] = useState(INITIAL);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [reasons, setReasons] = useState<Record<string, string>>({});

  function approve(id: string) {
    setSellers(ss => ss.map(s => s.id === id ? { ...s, status: 'approved' } : s));
  }

  function reject(id: string) {
    setSellers(ss => ss.map(s => s.id === id ? { ...s, status: 'rejected', rejectionReason: reasons[id] || 'Not approved at this time.' } : s));
    setRejecting(null);
  }

  const pending = sellers.filter(s => s.status === 'pending');
  const processed = sellers.filter(s => s.status !== 'pending');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/dashboard/admin" className="p-2 rounded-xl hover:bg-brand-cream transition-colors">
          <ArrowLeft size={20} className="text-brand-navy" />
        </Link>
        <h1 className="text-2xl font-bold text-brand-navy">Seller Approvals</h1>
        {pending.length > 0 && (
          <span className="w-6 h-6 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full flex items-center justify-center">
            {pending.length}
          </span>
        )}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="text-sm font-medium text-brand-navy/50 mb-3 flex items-center gap-2">
            <Clock size={14} /> PENDING REVIEW ({pending.length})
          </h2>
          <div className="space-y-4">
            {pending.map(seller => (
              <div key={seller.id} className="bg-white rounded-2xl overflow-hidden border-2 border-yellow-100">
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                      {seller.badge}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-brand-navy text-lg">{seller.storeName}</h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-brand-navy/60">
                        <span className="flex items-center gap-1"><User size={12} /> {seller.ownerName}</span>
                        <span className="flex items-center gap-1"><Store size={12} /> {seller.businessType}</span>
                        <span>{seller.nationality}</span>
                        <span>{seller.email}</span>
                      </div>
                      <p className="text-xs text-brand-navy/40 mt-1">Submitted {formatDate(seller.submittedAt)}</p>
                    </div>
                  </div>
                  <p className="text-sm text-brand-navy/70 bg-brand-cream rounded-xl p-3 mb-4">{seller.description}</p>

                  {rejecting === seller.id ? (
                    <div className="space-y-3">
                      <textarea
                        className="input resize-none h-20 text-sm"
                        placeholder="Reason for rejection (will be sent to applicant)..."
                        value={reasons[seller.id] || ''}
                        onChange={e => setReasons(r => ({ ...r, [seller.id]: e.target.value }))}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => setRejecting(null)} className="btn-secondary text-sm py-2 px-4">Cancel</button>
                        <button onClick={() => reject(seller.id)} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-xl text-sm hover:bg-red-600 transition-colors">
                          Confirm Rejection
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        onClick={() => approve(seller.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
                      >
                        <CheckCircle size={16} />
                        Approve Seller
                      </button>
                      <button
                        onClick={() => setRejecting(seller.id)}
                        className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2.5 rounded-xl transition-colors text-sm"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processed */}
      {processed.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-brand-navy/50 mb-3">RECENTLY PROCESSED</h2>
          <div className="space-y-2">
            {processed.map(seller => (
              <div key={seller.id} className={`flex items-center gap-3 p-4 rounded-xl border-2 ${seller.status === 'approved' ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                <span className="text-xl">{seller.badge}</span>
                <div className="flex-1">
                  <p className="font-semibold text-brand-navy text-sm">{seller.storeName}</p>
                  <p className="text-xs text-brand-navy/50">{seller.ownerName}</p>
                  {seller.rejectionReason && <p className="text-xs text-red-600 mt-0.5">Reason: {seller.rejectionReason}</p>}
                </div>
                {seller.status === 'approved' ? (
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
                ) : (
                  <XCircle size={20} className="text-red-400 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
