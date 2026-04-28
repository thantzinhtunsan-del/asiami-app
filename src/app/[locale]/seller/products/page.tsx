'use client';
import { useState } from 'react';
import { Link } from '@/i18n/navigation';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, Upload } from 'lucide-react';
import { formatPrice } from '@/lib/utils';

const PRODUCTS = [
  { id: '1', title: 'Shrimp Paste (Ngapi)', price: 880, stock: 50, category: 'food_grocery', active: true },
  { id: '2', title: 'Laphet Thoke Mix', price: 1200, stock: 30, category: 'food_grocery', active: true },
  { id: '3', title: 'Myanmar Thanaka Powder', price: 650, stock: 100, category: 'beauty', active: true },
  { id: '4', title: 'Sticky Rice Snack Pack', price: 950, stock: 80, category: 'snacks', active: true },
  { id: '5', title: 'Longyi Fabric — Blue Floral', price: 3200, stock: 20, category: 'fashion', active: false },
];

export default function SellerProductsPage() {
  const [products, setProducts] = useState(PRODUCTS);

  function toggleActive(id: string) {
    setProducts(ps => ps.map(p => p.id === id ? { ...p, active: !p.active } : p));
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-brand-navy">Product Management</h1>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 btn-secondary text-sm py-2.5 px-4">
            <Upload size={16} />
            <span className="hidden sm:inline">CSV Upload</span>
          </button>
          <Link href="/seller/products/new" className="btn-primary text-sm py-2.5 px-4 flex items-center gap-2">
            <Plus size={16} />
            Add Product
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-brand-cream text-xs text-brand-navy/50 font-medium">
                <th className="px-4 py-3 text-left">Product</th>
                <th className="px-4 py-3 text-left hidden sm:table-cell">Category</th>
                <th className="px-4 py-3 text-right">Price</th>
                <th className="px-4 py-3 text-right">Stock</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr key={p.id} className={`border-t border-brand-cream-dark text-sm ${i % 2 === 1 ? 'bg-brand-cream/20' : ''}`}>
                  <td className="px-4 py-3 font-medium text-brand-navy max-w-xs truncate">{p.title}</td>
                  <td className="px-4 py-3 text-brand-navy/60 capitalize hidden sm:table-cell">{p.category.replace('_', ' ')}</td>
                  <td className="px-4 py-3 font-bold text-brand-orange text-right">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${p.stock < 10 ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleActive(p.id)} className="transition-colors">
                      {p.active
                        ? <ToggleRight size={22} className="text-brand-orange" />
                        : <ToggleLeft size={22} className="text-brand-navy/30" />
                      }
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-brand-cream text-brand-navy/60 hover:text-brand-orange transition-colors">
                        <Edit2 size={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-brand-navy/60 hover:text-red-500 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
