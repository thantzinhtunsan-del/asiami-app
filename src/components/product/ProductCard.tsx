'use client';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { formatPrice } from '@/lib/utils';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  images?: string[];
  sellerName: string;
  sellerId: string;
  badgeFlag?: string | null;
  stock?: number;
  category?: string;
}

export default function ProductCard({
  id,
  title,
  price,
  images,
  sellerName,
  sellerId,
  badgeFlag,
  stock = 0,
}: ProductCardProps) {
  const addItem = useCartStore(s => s.addItem);
  const [added, setAdded] = useState(false);
  const image = images?.[0] ?? `https://picsum.photos/seed/${id}/400/400`;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: id,
      sellerId,
      title,
      price,
      quantity: 1,
      image,
      sellerName,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <Link href={`/products/${id}`} className="block group">
      <div className="card overflow-hidden hover:-translate-y-1 transition-transform duration-200">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-cream">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="text-brand-navy/50 font-medium text-sm">Out of Stock</span>
            </div>
          )}
          {badgeFlag && (
            <span className="absolute top-2 left-2 text-xl bg-white/90 rounded-lg px-1.5 py-0.5 shadow-sm">
              {badgeFlag}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-brand-navy text-sm leading-snug line-clamp-2 mb-1 group-hover:text-brand-orange transition-colors">
            {title}
          </h3>
          <p className="text-brand-navy/50 text-xs mb-2 truncate">{sellerName}</p>

          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-brand-orange text-base">{formatPrice(price)}</span>
            <button
              onClick={handleAddToCart}
              disabled={stock === 0}
              className={`p-2 rounded-xl transition-all duration-200 ${
                added
                  ? 'bg-green-100 text-green-600'
                  : stock === 0
                  ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                  : 'bg-brand-cream hover:bg-brand-orange hover:text-white text-brand-orange'
              }`}
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
