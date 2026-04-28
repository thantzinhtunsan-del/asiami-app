'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { CATEGORIES } from '@/lib/utils';

export default function CategoryGrid() {
  const t = useTranslations('categories');

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-8">{t('title')}</h2>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {CATEGORIES.map(({ id, icon, labelKey }) => (
            <Link
              key={id}
              href={`/products?category=${id}`}
              className="group flex flex-col items-center gap-2 p-4 bg-white rounded-2xl hover:bg-brand-orange hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <span className="text-3xl group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <span className="text-xs font-medium text-center text-brand-navy group-hover:text-white transition-colors leading-tight">
                {t(labelKey as any)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
