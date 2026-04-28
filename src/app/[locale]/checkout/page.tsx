'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { CreditCard, Banknote, Smartphone, CheckCircle, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';

type PaymentMethod = 'stripe' | 'paypay' | 'cod';

export default function CheckoutPage() {
  const t = useTranslations('checkout');
  const { items, total, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', postalCode: '', prefecture: '', city: '', address: '', notes: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Simulate order placement
    await new Promise(r => setTimeout(r, 1500));
    clearCart();
    setOrderPlaced(true);
    setLoading(false);
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-brand-navy mb-2">{t('orderConfirmed')}</h1>
        <p className="text-brand-navy/60 mb-2">{t('orderNumber')}: <span className="font-mono font-bold">ASM-{Date.now().toString().slice(-8)}</span></p>
        <p className="text-brand-navy/50 text-sm mb-8">You'll receive a confirmation email shortly.</p>
        <Link href="/products" className="btn-primary inline-flex items-center gap-2">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <p className="text-brand-navy/60 mb-4">Your cart is empty.</p>
        <Link href="/products" className="btn-primary inline-flex">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/cart" className="p-2 rounded-xl hover:bg-brand-cream transition-colors">
          <ArrowLeft size={20} className="text-brand-navy" />
        </Link>
        <h1 className="text-2xl font-bold text-brand-navy">{t('title')}</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Form fields */}
          <div className="md:col-span-2 space-y-5">
            {/* Delivery */}
            <div className="bg-white rounded-2xl p-5">
              <h2 className="font-bold text-brand-navy mb-4">{t('delivery')}</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">Full Name *</label>
                  <input className="input" required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="山田 太郎" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">Phone *</label>
                  <input className="input" required value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} placeholder="090-1234-5678" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">Postal Code *</label>
                  <input className="input" required value={form.postalCode} onChange={e => setForm(f => ({...f, postalCode: e.target.value}))} placeholder="150-0001" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">Prefecture *</label>
                  <input className="input" required value={form.prefecture} onChange={e => setForm(f => ({...f, prefecture: e.target.value}))} placeholder="東京都" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">City *</label>
                  <input className="input" required value={form.city} onChange={e => setForm(f => ({...f, city: e.target.value}))} placeholder="渋谷区" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy mb-1">Street Address *</label>
                  <input className="input" required value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} placeholder="神南1-1-1" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-brand-navy mb-1">Notes (optional)</label>
                  <textarea className="input resize-none h-20" value={form.notes} onChange={e => setForm(f => ({...f, notes: e.target.value}))} placeholder="Delivery instructions..." />
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-5">
              <h2 className="font-bold text-brand-navy mb-4">{t('payment')}</h2>
              <div className="space-y-3">
                {([
                  { key: 'stripe', icon: CreditCard, label: t('stripe'), available: true },
                  { key: 'paypay', icon: Smartphone, label: t('paypay'), available: false },
                  { key: 'cod', icon: Banknote, label: t('cod'), available: true },
                ] as const).map(({ key, icon: Icon, label, available }) => (
                  <label
                    key={key}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-colors ${
                      paymentMethod === key
                        ? 'border-brand-orange bg-brand-cream'
                        : available
                        ? 'border-brand-cream-dark hover:border-brand-orange/50'
                        : 'border-brand-cream-dark opacity-50 cursor-not-allowed'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={key}
                      checked={paymentMethod === key}
                      onChange={() => available && setPaymentMethod(key)}
                      disabled={!available}
                      className="accent-brand-orange"
                    />
                    <Icon size={20} className={paymentMethod === key ? 'text-brand-orange' : 'text-brand-navy/50'} />
                    <span className={`font-medium text-sm ${paymentMethod === key ? 'text-brand-orange' : 'text-brand-navy'}`}>{label}</span>
                    {!available && <span className="ml-auto text-xs text-brand-navy/30">Coming soon</span>}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl p-5 sticky top-24">
              <h2 className="font-bold text-brand-navy mb-4">Your Order</h2>
              <div className="space-y-2 mb-4 text-sm">
                {items.map(item => (
                  <div key={item.productId} className="flex justify-between text-brand-navy/60">
                    <span className="truncate mr-2 text-xs">{item.title} ×{item.quantity}</span>
                    <span className="flex-shrink-0 text-xs">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-brand-cream-dark pt-3 mb-5">
                <div className="flex justify-between font-bold text-brand-navy">
                  <span>Total</span>
                  <span className="text-brand-orange">{formatPrice(total())}</span>
                </div>
                <p className="text-xs text-green-600 mt-1 font-medium">✓ 0% Asiami commission</p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : null}
                {loading ? 'Processing...' : t('placeOrder')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
