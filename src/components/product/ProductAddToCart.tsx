'use client';
import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useTranslations } from 'next-intl';

interface ProductAddToCartProps {
  productId: string;
  sellerId: string;
  title: string;
  price: number;
  stock: number;
  image: string;
  sellerName: string;
}

export default function ProductAddToCart({
  productId,
  sellerId,
  title,
  price,
  stock,
  image,
  sellerName,
}: ProductAddToCartProps) {
  const t = useTranslations('products');
  const addItem = useCartStore(s => s.addItem);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem({ productId, sellerId, title, price, quantity: qty, image, sellerName });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="flex items-center gap-2 bg-brand-cream rounded-xl p-1">
        <button
          onClick={() => setQty(q => Math.max(1, q - 1))}
          className="w-8 h-8 rounded-lg bg-white text-brand-navy font-bold hover:bg-brand-orange hover:text-white transition-colors"
        >−</button>
        <span className="w-8 text-center font-semibold text-brand-navy">{qty}</span>
        <button
          onClick={() => setQty(q => Math.min(stock, q + 1))}
          className="w-8 h-8 rounded-lg bg-white text-brand-navy font-bold hover:bg-brand-orange hover:text-white transition-colors"
        >+</button>
      </div>

      <button
        onClick={handleAdd}
        disabled={stock === 0}
        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all ${
          added ? 'bg-green-500 text-white' : stock === 0 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'btn-primary'
        }`}
      >
        <ShoppingCart size={18} />
        {added ? 'Added!' : t('addToCart')}
      </button>
    </div>
  );
}
