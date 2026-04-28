'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { ImagePlus, ArrowLeft, Check } from 'lucide-react';
import { CATEGORIES } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function NewProductPage() {
  const t = useTranslations('categories');
  const [form, setForm] = useState({
    title: '', description: '', price: '', category: '', stock: '', images: [] as string[],
  });
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  function field(key: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));
  }

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

        <div className="flex gap-3">
          <Link href="/seller/products" className="btn-secondary flex-1 text-center">
            Cancel
          </Link>
          <button type="submit" className={`flex-1 flex items-center justify-center gap-2 ${saved ? 'bg-green-500 text-white rounded-xl py-3 font-semibold' : 'btn-primary'}`}>
            {saved ? <><Check size={18} /> Saved!</> : 'Publish Product'}
          </button>
        </div>
      </form>
    </div>
  );
}
