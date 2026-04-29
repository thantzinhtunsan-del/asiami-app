'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORIES } from '@/lib/utils';

export default function CategoryGrid() {
  const t = useTranslations('categories');

  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-brand-orange text-sm font-semibold uppercase tracking-wide mb-1">
              Browse
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-brand-navy leading-tight">
              {t('title')}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {CATEGORIES.map(({ id, icon, labelKey }) => (
            <Link
              key={id}
              href={`/products?category=${id}`}
              className="group relative flex flex-col items-start gap-3 p-5 bg-[#FFF8F0] hover:bg-brand-navy rounded-2xl border border-[#F5EDDF] hover:border-brand-navy transition-all duration-200"
              style={{ boxShadow: '0 1px 3px rgba(26,43,74,0.04)' }}
            >
              <span
                className="text-2xl leading-none transition-transform duration-200 group-hover:scale-110"
                role="img"
                aria-hidden="true"
              >
                {icon}
              </span>
              <span className="text-sm font-semibold text-brand-navy group-hover:text-white transition-colors leading-tight">
                {t(labelKey as any)}
              </span>
              {/* Arrow indicator */}
              <span className="absolute top-4 right-4 text-brand-navy/20 group-hover:text-white/40 text-xs transition-colors">
                &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
