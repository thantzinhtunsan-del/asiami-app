import { useTranslations } from 'next-intl';
import { Search, ShoppingCart, PackageCheck, Store, ImagePlus, Banknote } from 'lucide-react';

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  const buyerSteps = [
    { icon: Search, step: 1, title: t('buyerStep1'), desc: t('buyerStep1Desc') },
    { icon: ShoppingCart, step: 2, title: t('buyerStep2'), desc: t('buyerStep2Desc') },
    { icon: PackageCheck, step: 3, title: t('buyerStep3'), desc: t('buyerStep3Desc') },
  ];

  const sellerSteps = [
    { icon: Store, step: 1, title: t('sellerStep1'), desc: t('sellerStep1Desc') },
    { icon: ImagePlus, step: 2, title: t('sellerStep2'), desc: t('sellerStep2Desc') },
    { icon: Banknote, step: 3, title: t('sellerStep3'), desc: t('sellerStep3Desc') },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-12">{t('title')}</h2>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Buyers */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-brand-orange rounded" />
              <h3 className="font-bold text-lg text-brand-navy">{t('buyers')}</h3>
            </div>
            <div className="space-y-5">
              {buyerSteps.map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-brand-cream rounded-2xl flex items-center justify-center relative">
                    <Icon size={20} className="text-brand-orange" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-orange text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-1">{title}</h4>
                    <p className="text-brand-navy/60 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sellers */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-0.5 w-8 bg-brand-navy rounded" />
              <h3 className="font-bold text-lg text-brand-navy">{t('sellers')}</h3>
            </div>
            <div className="space-y-5">
              {sellerSteps.map(({ icon: Icon, step, title, desc }) => (
                <div key={step} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-11 h-11 bg-brand-navy/5 rounded-2xl flex items-center justify-center relative">
                    <Icon size={20} className="text-brand-navy" />
                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-navy text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {step}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-brand-navy mb-1">{title}</h4>
                    <p className="text-brand-navy/60 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
