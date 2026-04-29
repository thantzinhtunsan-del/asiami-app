import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { Star, Package } from 'lucide-react';
import CommunityBadge from '@/components/ui/CommunityBadge';
import { getInitials } from '@/lib/utils';

interface SellerCardProps {
  id: string;
  storeName: string;
  description?: string | null;
  photoUrl?: string | null;
  nationality?: string | null;
  badgeName?: string | null;
  badgeFlag?: string | null;
  averageRating?: number;
  totalProducts?: number;
  approved?: boolean;
}

export default function SellerCard({
  id,
  storeName,
  description,
  photoUrl,
  nationality: _nationality,
  badgeName,
  badgeFlag,
  averageRating = 0,
  totalProducts = 0,
  approved = true,
}: SellerCardProps) {
  return (
    <Link href={`/sellers/${id}`} className="block">
      <div className="card group cursor-pointer hover:-translate-y-1 transition-transform duration-200">
        {/* Store banner */}
        <div className="h-20 bg-gradient-to-r from-brand-navy to-brand-navy/80 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="relative -mt-8 mb-3">
            {photoUrl ? (
              <Image
                src={photoUrl}
                alt={storeName}
                width={64}
                height={64}
                className="w-16 h-16 rounded-2xl border-3 border-white shadow-md object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl border-3 border-white shadow-md bg-brand-orange flex items-center justify-center">
                <span className="text-white font-bold text-xl">{getInitials(storeName)}</span>
              </div>
            )}
          </div>

          {/* Info */}
          <h3 className="font-bold text-brand-navy text-lg leading-tight mb-1 group-hover:text-brand-orange transition-colors">
            {storeName}
          </h3>

          {description && (
            <p className="text-brand-navy/60 text-sm line-clamp-2 mb-3">{description}</p>
          )}

          {/* Badge */}
          {badgeFlag && badgeName && (
            <div className="mb-3">
              <CommunityBadge
                flagEmoji={badgeFlag}
                name={badgeName}
                verified={approved}
                size="sm"
              />
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-brand-navy/70">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="font-semibold">{averageRating > 0 ? averageRating.toFixed(1) : '—'}</span>
            </div>
            <div className="flex items-center gap-1 text-brand-navy/50">
              <Package size={13} />
              <span>{totalProducts} items</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
