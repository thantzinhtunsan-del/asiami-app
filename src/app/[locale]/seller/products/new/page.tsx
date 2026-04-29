'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { ImagePlus, ArrowLeft, Check, Banknote, Truck, CreditCard, Info } from 'lucide-react';
import { CATEGORIES } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import type { ProductPaymentOption, DeliveryFeeType } from '@/types/database';

type FormState = {
  title: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  images: string[];
  paymentOptions: ProductPaymentOption[];
  deliveryFeeType: DeliveryFeeType;
  deliveryFee: string;
};

export default function NewProductPage() {
  const t = useTranslations('categories');
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    images: [],
    paymentOptions: ['prepaid'],
    deliveryFeeType: 'buyer_pays',
    deliveryFee: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function field(key: 'title' | 'description' | 'price' | 'category' | 'stock' | 'deliveryFee') {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));
  }

  function togglePaymentOption(opt: ProductPaymentOption) {
    setForm(f => {
      const has = f.paymentOptions.includes(opt);
      // Must keep at least one option
      if (has && f.paymentOptions.length === 1) return f;
      return {
        ...f,
        paymentOptions: has
          ? f.paymentOptions.filter(o => o !== opt)
          : [...f.paymentOptions, opt],
      };
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: form.title,
          description: form.description || null,
          price: Number(form.price),
          category: form.category,
          stock: Number(form.stock),
          images: form.images,
          payment_options: form.paymentOptions,
          delivery_fee_type: form.deliveryFeeType,
          delivery_fee: form.deliveryFeeType === 'buyer_pays' ? Number(form.deliveryFee || 0) : 0,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error ?? 'Failed to create product. Please try again.');
        return;
      }
      router.push('/seller/products');
    } catch {
      setSubmitError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  }

  const deliveryFeeNum = parseInt(form.deliveryFee || '0', 10);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/seller/products" className="p-2 rounded-xl hover:bg-brand-cream transition-colors">
          <ArrowLeft size={20} className="text-brand-navy" />
        </Link>
        <h1 className="text-2xl font-bold text-brand-navy">Add New Product</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo upload */}
        <div className="bg-white rounded-2xl p-5">
          <h2 className="font-bold text-brand-navy mb-3">Product Photos (up to 5)</h2>
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square rounded-xl border-2 border-dashed border-brand-cream-dark hover:border-brand-orange flex items-center justify-center cursor-pointer hover:bg-brand-cream transition-colors"
              >
                <ImagePlus size={20} className="text-brand-navy/30" />
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-navy/40 mt-2">JPG, PNG up to 10MB each. First image will be the cover.</p>
        </div>

        {/* Product info */}
        <div className="bg-white rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-brand-navy">Product Details</h2>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Product Title *</label>
            <input className="input" required value={form.title} onChange={field('title')} placeholder="e.g. Shrimp Paste (Ngapi) 250g" />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Description</label>
            <textarea
              className="input resize-none h-28"
              value={form.description}
              onChange={field('description')}
              placeholder="Describe your product — ingredients, origin, how to use..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Category *</label>
              <select className="input" required value={form.category} onChange={field('category')}>
                <option value="">Select category...</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.icon} {t(c.labelKey as any)}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Price (¥) *</label>
              <input className="input" type="number" required min={1} value={form.price} onChange={field('price')} placeholder="980" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Stock Quantity *</label>
              <input className="input" type="number" required min={0} value={form.stock} onChange={field('stock')} placeholder="50" />
            </div>
          </div>
        </div>

        {/* Payment & Delivery Options */}
        <div className="bg-white rounded-2xl p-5 space-y-5">
          <div className="flex items-center gap-2">
            <h2 className="font-bold text-brand-navy">Payment &amp; Delivery Options</h2>
            <span className="text-xs text-brand-navy/40 font-normal">(shown to buyers)</span>
          </div>

          {/* Payment methods */}
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Accepted Payment Methods *
            </label>
            <p className="text-xs text-brand-navy/50 mb-3">Select all that you accept. At least one is required.</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Prepaid */}
              <button
                type="button"
                onClick={() => togglePaymentOption('prepaid')}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                  form.paymentOptions.includes('prepaid')
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-brand-cream-dark bg-white hover:border-brand-navy/30'
                }`}
              >
                <CreditCard
                  size={20}
                  className={`mt-0.5 flex-shrink-0 ${form.paymentOptions.includes('prepaid') ? 'text-brand-orange' : 'text-brand-navy/40'}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${form.paymentOptions.includes('prepaid') ? 'text-brand-orange' : 'text-brand-navy'}`}>
                    Prepaid
                  </p>
                  <p className="text-xs text-brand-navy/50 mt-0.5 leading-tight">Card / online payment</p>
                </div>
                {form.paymentOptions.includes('prepaid') && (
                  <Check size={15} className="text-brand-orange ml-auto mt-0.5 flex-shrink-0" />
                )}
              </button>

              {/* COD */}
              <button
                type="button"
                onClick={() => togglePaymentOption('cod')}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                  form.paymentOptions.includes('cod')
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-brand-cream-dark bg-white hover:border-brand-navy/30'
                }`}
              >
                <Banknote
                  size={20}
                  className={`mt-0.5 flex-shrink-0 ${form.paymentOptions.includes('cod') ? 'text-brand-orange' : 'text-brand-navy/40'}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${form.paymentOptions.includes('cod') ? 'text-brand-orange' : 'text-brand-navy'}`}>
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-brand-navy/50 mt-0.5 leading-tight">Pay when item arrives</p>
                </div>
                {form.paymentOptions.includes('cod') && (
                  <Check size={15} className="text-brand-orange ml-auto mt-0.5 flex-shrink-0" />
                )}
              </button>
            </div>
          </div>

          {/* Delivery fee */}
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">
              Delivery Fee
            </label>
            <div className="grid grid-cols-2 gap-3 mb-3">
              {/* Included */}
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, deliveryFeeType: 'included', deliveryFee: '' }))}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                  form.deliveryFeeType === 'included'
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-brand-cream-dark bg-white hover:border-brand-navy/30'
                }`}
              >
                <Truck
                  size={20}
                  className={`mt-0.5 flex-shrink-0 ${form.deliveryFeeType === 'included' ? 'text-brand-orange' : 'text-brand-navy/40'}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${form.deliveryFeeType === 'included' ? 'text-brand-orange' : 'text-brand-navy'}`}>
                    Free delivery
                  </p>
                  <p className="text-xs text-brand-navy/50 mt-0.5 leading-tight">Included in product price</p>
                </div>
                {form.deliveryFeeType === 'included' && (
                  <Check size={15} className="text-brand-orange ml-auto mt-0.5 flex-shrink-0" />
                )}
              </button>

              {/* Buyer pays */}
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, deliveryFeeType: 'buyer_pays' }))}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-150 ${
                  form.deliveryFeeType === 'buyer_pays'
                    ? 'border-brand-orange bg-brand-orange/5'
                    : 'border-brand-cream-dark bg-white hover:border-brand-navy/30'
                }`}
              >
                <Banknote
                  size={20}
                  className={`mt-0.5 flex-shrink-0 ${form.deliveryFeeType === 'buyer_pays' ? 'text-brand-orange' : 'text-brand-navy/40'}`}
                />
                <div>
                  <p className={`text-sm font-semibold ${form.deliveryFeeType === 'buyer_pays' ? 'text-brand-orange' : 'text-brand-navy'}`}>
                    Buyer pays
                  </p>
                  <p className="text-xs text-brand-navy/50 mt-0.5 leading-tight">Added at checkout</p>
                </div>
                {form.deliveryFeeType === 'buyer_pays' && (
                  <Check size={15} className="text-brand-orange ml-auto mt-0.5 flex-shrink-0" />
                )}
              </button>
            </div>

            {/* Delivery fee amount — only shown when buyer pays */}
            {form.deliveryFeeType === 'buyer_pays' && (
              <div>
                <label className="block text-sm font-medium text-brand-navy mb-1">
                  Delivery Fee Amount (¥) *
                </label>
                <input
                  className="input"
                  type="number"
                  required
                  min={0}
                  value={form.deliveryFee}
                  onChange={field('deliveryFee')}
                  placeholder="e.g. 500"
                />
                <p className="text-xs text-brand-navy/40 mt-1">This amount will be added to the order total at checkout.</p>
              </div>
            )}
          </div>

          {/* Summary preview */}
          <div className="flex items-start gap-2 bg-brand-cream rounded-xl p-3">
            <Info size={14} className="text-brand-navy/40 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-brand-navy/60 leading-relaxed">
              Buyers will see:{' '}
              <span className="font-medium text-brand-navy">
                {form.paymentOptions.includes('prepaid') && form.paymentOptions.includes('cod')
                  ? 'Prepaid or COD'
                  : form.paymentOptions.includes('cod')
                  ? 'Cash on Delivery only'
                  : 'Prepaid only'}
              </span>
              {' · '}
              <span className="font-medium text-brand-navy">
                {form.deliveryFeeType === 'included'
                  ? 'Free delivery'
                  : deliveryFeeNum > 0
                  ? `+¥${deliveryFeeNum.toLocaleString()} delivery`
                  : 'Delivery fee: enter amount above'}
              </span>
            </p>
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
            {submitError}
          </div>
        )}

        <div className="flex gap-3">
          <Link href="/seller/products" className="btn-secondary flex-1 text-center">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 flex items-center justify-center gap-2 btn-primary disabled:opacity-60 disabled:cursor-not-allowed`}
          >
            {submitting ? 'Publishing…' : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
