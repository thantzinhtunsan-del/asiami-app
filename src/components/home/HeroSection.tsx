'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useEffect, useState } from 'react';
import { ArrowRight, Store } from 'lucide-react';

const HERO_TAGLINES = [
  { text: 'Asia\'s Market in Japan', lang: 'English' },
  { text: '日本のアジア市場', lang: '日本語' },
  { text: 'ဂျပန်ရှိ အာရှ ဈေးကွက်', lang: 'မြန်မာဘာသာ' },
  { text: 'Chợ châu Á tại Nhật Bản', lang: 'Tiếng Việt' },
  { text: '日本的亚洲集市', lang: '中文' },
  { text: 'जापानमा एशियाको बजार', lang: 'नेपाली' },
  { text: 'ตลาดเอเชียในญี่ปุ่น', lang: 'ภาษาไทย' },
  { text: 'Pasar Asia di Jepang', lang: 'Bahasa Indonesia' },
];

export default function HeroSection() {
  const t = useTranslations('hero');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setTaglineIndex(i => (i + 1) % HERO_TAGLINES.length);
        setVisible(true);
      }, 400);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="gradient-hero text-white overflow-hidden relative">
      {/* Decorative floating emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['🏮', '🌸', '🍜', '🎋', '🌺', '🏯', '🍡', '🎑'].map((emoji, i) => (
          <span
            key={i}
            className="absolute text-4xl opacity-10 animate-bounce-gentle"
            style={{
              left: `${(i * 13 + 5) % 90}%`,
              top: `${(i * 17 + 10) % 80}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${2.5 + i * 0.3}s`,
            }}
          >
            {emoji}
          </span>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28 relative">
        <div className="max-w-3xl">
          {/* Rotating tagline */}
          <div className="h-16 md:h-20 flex items-center mb-6">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-all duration-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {HERO_TAGLINES[taglineIndex].text}
            </h1>
          </div>

          {/* Language indicator */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex gap-1">
              {HERO_TAGLINES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === taglineIndex ? 'w-6 bg-brand-orange' : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
            <span className="text-white/60 text-xs">{HERO_TAGLINES[taglineIndex].lang}</span>
          </div>

          <p className="text-white/80 text-lg md:text-xl max-w-xl mb-8 leading-relaxed">
            {t('subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/products" className="btn-primary flex items-center justify-center gap-2 text-base">
              {t('shopNow')}
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/seller/register"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 border border-white/20 backdrop-blur-sm text-base"
            >
              <Store size={18} />
              {t('startSelling')}
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mt-10 pt-10 border-t border-white/10">
            {[
              { number: '0%', label: 'Commission' },
              { number: '8', label: 'Languages' },
              { number: '7+', label: 'Communities' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-brand-orange">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
