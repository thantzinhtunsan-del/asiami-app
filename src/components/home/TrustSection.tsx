import { useTranslations } from 'next-intl';
import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

export default function TrustSection() {
  const t = useTranslations('trust');

  const features = [
    {
      icon: ShieldCheck,
      title: t('communityVerified'),
      desc: 'Every seller is reviewed and approved by the Asiami team before listing products.',
    },
    {
      icon: CreditCard,
      title: t('safePayments'),
      desc: 'Stripe-powered payments, cash-on-delivery, and upcoming PayPay support.',
    },
    {
      icon: Zap,
      title: t('fastDelivery'),
      desc: 'Sellers ship directly — most orders delivered within 3–5 business days.',
    },
  ];

  return (
    <section className="py-16 px-4 bg-brand-navy">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <ShieldCheck size={16} />
            {t('communityVerified')}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            A marketplace built on community trust
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 bg-brand-orange/20 rounded-2xl flex items-center justify-center mb-4">
                <Icon size={22} className="text-brand-orange" />
              </div>
              <h3 className="font-bold text-white mb-2">{title}</h3>
              <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Community flags */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm mb-4">Celebrating Asian communities in Japan</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {[
              { flag: '🇲🇲', name: 'Myanmar' },
              { flag: '🇻🇳', name: 'Vietnam' },
              { flag: '🇳🇵', name: 'Nepal' },
              { flag: '🇨🇳', name: 'China' },
              { flag: '🇹🇭', name: 'Thailand' },
              { flag: '🇮🇩', name: 'Indonesia' },
              { flag: '🇵🇭', name: 'Philippines' },
            ].map(({ flag, name }) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <span className="text-3xl">{flag}</span>
                <span className="text-white/40 text-xs">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
