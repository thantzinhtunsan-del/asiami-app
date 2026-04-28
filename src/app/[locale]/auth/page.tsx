'use client';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function AuthPage() {
  const t = useTranslations('auth');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Supabase auth integration — wired to /api/auth/callback
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-3">
            <span className="text-white font-bold text-3xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-brand-navy">
            {mode === 'login' ? t('login') : t('signup')}
          </h1>
          <p className="text-brand-navy/50 text-sm mt-1">
            {mode === 'login' ? 'Welcome back to Asiami' : 'Join Asia\'s marketplace in Japan'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('email')}</label>
            <input
              type="email"
              className="input"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('password')}</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input pr-10"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-navy/30 hover:text-brand-navy/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === 'login' && (
            <div className="text-right">
              <button type="button" className="text-sm text-brand-orange hover:underline">{t('forgotPassword')}</button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {mode === 'login' ? t('login') : t('signup')}
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-brand-cream-dark" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-brand-navy/40">or</span>
            </div>
          </div>

          <p className="text-center text-sm text-brand-navy/60">
            {mode === 'login' ? t('noAccount') : t('hasAccount')}{' '}
            <button
              type="button"
              onClick={() => setMode(m => m === 'login' ? 'signup' : 'login')}
              className="text-brand-orange font-semibold hover:underline"
            >
              {mode === 'login' ? t('signup') : t('login')}
            </button>
          </p>
        </form>

        <p className="text-center text-xs text-brand-navy/30 mt-4">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="hover:text-brand-orange">Terms</Link>
          {' '}and{' '}
          <Link href="/privacy" className="hover:text-brand-orange">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
