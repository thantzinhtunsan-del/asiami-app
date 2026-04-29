import { ShieldCheck, CreditCard, Zap } from 'lucide-react';

const COMMUNITIES = [
  'Myanmar', 'Vietnam', 'Nepal', 'China', 'Thailand', 'Indonesia', 'Philippines',
];

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Community Verified',
    desc: 'Every seller is reviewed and approved by the Asiami team before listing products.',
  },
  {
    icon: CreditCard,
    title: 'Safe Payments',
    desc: 'Stripe-powered payments with cash-on-delivery and upcoming PayPay support.',
  },
  {
    icon: Zap,
    title: 'Fast Delivery',
    desc: 'Sellers ship directly -- most orders arrive within 3-5 business days across Japan.',
  },
];

export default function TrustSection() {
  return (
    <section className="py-16 px-4 bg-brand-navy">
      <div className="max-w-7xl mx-auto">

        {/* Asymmetric header: left text + right community pills */}
        <div className="grid md:grid-cols-2 gap-8 items-start mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 text-brand-orange px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5">
              <ShieldCheck size={13} />
              Built on trust
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              A marketplace built on<br />community trust
            </h2>
          </div>

          {/* Community pills */}
          <div className="flex flex-col justify-end">
            <p className="text-white/40 text-xs font-medium uppercase tracking-wide mb-3">
              Asian communities in Japan
            </p>
            <div className="flex flex-wrap gap-2">
              {COMMUNITIES.map(name => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-full bg-white/8 border border-white/10 text-white/70 text-xs font-medium"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Feature cards -- staggered sizes, not equal 3-column */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

          {/* Wide card */}
          {(() => { const { icon: Icon, title, desc } = FEATURES[0]; return (
          <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors">
            <div className="w-11 h-11 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-5">
              <Icon size={20} className="text-brand-orange" />
            </div>
            <h3 className="font-bold text-white text-lg mb-2">{title}</h3>
            <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
          </div>
          ); })()}

          {/* Two narrower cards stacked */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {FEATURES.slice(1).map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/8 transition-colors"
              >
                <div className="w-11 h-11 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-5">
                  <Icon size={20} className="text-brand-orange" />
                </div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
