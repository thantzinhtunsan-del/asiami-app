'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

const HERO_TAGLINES = [
  { text: "Asia's Market in Japan",   lang: 'English'          },
  { text: '日本のアジア市場',          lang: '日本語'            },
  { text: 'ဂျပန်ရှိ အာရှ ဈေးကွက်',  lang: 'မြန်မာဘာသာ'       },
  { text: 'Chợ châu Á tại Nhật Bản',  lang: 'Tiếng Việt'       },
  { text: '日本的亚洲集市',            lang: '中文'              },
  { text: 'जापानमा एशियाको बजार',     lang: 'नेपाली'           },
  { text: 'ตลาดเอเชียในญี่ปุ่น',      lang: 'ภาษาไทย'          },
  { text: 'Pasar Asia di Jepang',      lang: 'Bahasa Indonesia' },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % HERO_TAGLINES.length);
        setVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="gradient-hero hero-grain text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative z-10">
        <div className="max-w-2xl">

          {/* Seller hook badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white/90 px-3.5 py-1.5 rounded-full text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange animate-pulse flex-shrink-0" />
            0% commission for sellers &mdash; always free to list
          </div>

          {/* Rotating headline */}
          <div className="h-14 md:h-[4.5rem] lg:h-[5.5rem] flex items-center mb-5 overflow-hidden">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 380ms ease, transform 380ms ease',
              }}
            >
              {HERO_TAGLINES[idx].text}
            </h1>
          </div>

          {/* Language progress dots */}
          <div className="flex items-center gap-2.5 mb-7">
            <div className="flex gap-1.5 items-center">
              {HERO_TAGLINES.map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === idx ? '1.5rem' : '0.375rem',
                    background: i === idx ? '#E8622A' : 'rgba(255,255,255,0.25)',
                  }}
                />
              ))}
            </div>
            <span className="text-white/50 text-xs font-medium">
              {HERO_TAGLINES[idx].lang}
            </span>
          </div>

          <p className="text-white/75 text-lg md:text-xl max-w-lg mb-9 leading-relaxed">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/products"
              className="btn-primary inline-flex items-center justify-center gap-2 text-base"
            >
              {t('shopNow')}
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/seller/register"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 backdrop-blur-sm text-base transition-all duration-200"
            >
              <Store size={17} />
              {t('startSelling')}
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 mt-11 pt-9 border-t border-white/10">
            {[
              { number: '0%', label: 'Commission'  },
              { number: '8',  label: 'Languages'   },
              { number: '7+', label: 'Communities' },
            ].map(({ number, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-brand-orange tabular-nums">{number}</div>
                <div className="text-white/55 text-sm mt-0.5">{label}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
