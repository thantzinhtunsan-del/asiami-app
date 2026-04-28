'use client';
import { usePathname, useRouter } from '@/i18n/navigation';
import { localeNames, locales, type Locale } from '@/i18n/routing';
import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface Props {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function switchLocale(locale: Locale) {
    router.replace(pathname, { locale });
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-brand-cream-dark text-brand-navy text-sm font-medium transition-colors"
      >
        <Globe size={16} className="text-brand-orange" />
        <span className="hidden sm:inline">{localeNames[currentLocale as Locale] ?? currentLocale.toUpperCase()}</span>
        <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-brand-cream-dark z-50 overflow-hidden w-48">
          {locales.map(locale => (
            <button
              key={locale}
              onClick={() => switchLocale(locale)}
              className={`w-full text-left px-4 py-2.5 text-sm hover:bg-brand-cream transition-colors flex items-center justify-between ${
                locale === currentLocale
                  ? 'text-brand-orange font-semibold bg-brand-cream'
                  : 'text-brand-navy'
              }`}
            >
              <span>{localeNames[locale]}</span>
              {locale === currentLocale && (
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
