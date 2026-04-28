'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Check, ChevronRight, User, Store, CreditCard, Package, ArrowLeft } from 'lucide-react';
import { COMMUNITY_BADGES } from '@/lib/utils';

const STEPS = [
  { id: 1, icon: User, labelKey: 'step1' },
  { id: 2, icon: Store, labelKey: 'step2' },
  { id: 3, icon: CreditCard, labelKey: 'step3' },
  { id: 4, icon: Package, labelKey: 'step4' },
];

const NATIONALITIES = [
  'Myanmar', 'Vietnam', 'Nepal', 'China', 'Thailand', 'Indonesia', 'Philippines',
  'India', 'Bangladesh', 'Sri Lanka', 'South Korea', 'Japan', 'Other',
];

export default function SellerRegisterPage() {
  const t = useTranslations('seller');
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const [s1, setS1] = useState({ fullName: '', email: '', nationality: '', businessType: 'individual' });
  const [s2, setS2] = useState({ storeName: '', description: '', badgeId: '', photoFile: null as File | null });
  const [_s3] = useState({ stripeSetup: false });
  const [s4, setS4] = useState({ productTitle: '', productPrice: '', productCategory: '', productDescription: '' });

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  function nextStep() {
    if (step < 4) setStep(s => s + 1);
    else setSubmitted(true);
  }
  function prevStep() { if (step > 1) setStep(s => s - 1); }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={36} className="text-green-500" />
        </div>
        <h1 className="text-2xl font-bold text-brand-navy mb-3">Application Submitted!</h1>
        <p className="text-brand-navy/60 mb-2">
          Your seller application for <strong>{s2.storeName || 'your store'}</strong> has been received.
        </p>
        <p className="text-brand-navy/50 text-sm mb-6">
          Our team will review your application within 24–48 hours. You'll receive an email at <strong>{s1.email}</strong> with the decision.
        </p>
        <div className="bg-brand-cream rounded-2xl p-4 mb-6 text-left text-sm">
          <p className="font-semibold text-brand-navy mb-2">What happens next:</p>
          <ol className="space-y-1 text-brand-navy/60 list-decimal list-inside">
            <li>Admin reviews your application</li>
            <li>You receive email approval</li>
            <li>Complete Stripe Connect setup</li>
            <li>Start listing products!</li>
          </ol>
        </div>
        <Link href="/" className="btn-primary inline-flex">Return to Homepage</Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-brand-navy mb-1">{t('register')}</h1>
        <p className="text-brand-navy/60 text-sm">Join Asia's community marketplace in Japan — 0% commission</p>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          {STEPS.map(({ id, icon: Icon, labelKey }) => (
            <div key={id} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                id < step ? 'bg-brand-orange text-white' :
                id === step ? 'bg-brand-navy text-white ring-4 ring-brand-navy/20' :
                'bg-brand-cream-dark text-brand-navy/30'
              }`}>
                {id < step ? <Check size={16} strokeWidth={3} /> : <Icon size={16} />}
              </div>
              <span className={`text-[10px] text-center leading-tight ${id === step ? 'text-brand-navy font-semibold' : 'text-brand-navy/40'}`}>
                {t(labelKey as any)}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1.5 bg-brand-cream-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-orange rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-brand-navy">{t('step1')}</h2>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Full Name *</label>
            <input className="input" required value={s1.fullName} onChange={e => setS1(s => ({...s, fullName: e.target.value}))} placeholder="Your full name" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Email *</label>
            <input className="input" type="email" required value={s1.email} onChange={e => setS1(s => ({...s, email: e.target.value}))} placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('nationality')} *</label>
            <select className="input" required value={s1.nationality} onChange={e => setS1(s => ({...s, nationality: e.target.value}))}>
              <option value="">Select nationality...</option>
              {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('businessType')} *</label>
            <div className="grid grid-cols-2 gap-3">
              {['individual', 'company'].map(type => (
                <label key={type} className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-colors ${s1.businessType === type ? 'border-brand-orange bg-brand-cream' : 'border-brand-cream-dark'}`}>
                  <input type="radio" name="businessType" value={type} checked={s1.businessType === type} onChange={() => setS1(s => ({...s, businessType: type}))} className="sr-only" />
                  <span className="capitalize text-sm font-medium text-brand-navy">{type}</span>
                  {s1.businessType === type && <Check size={14} className="text-brand-orange ml-auto" />}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Store Setup */}
      {step === 2 && (
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-brand-navy">{t('step2')}</h2>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('storeName')} *</label>
            <input className="input" required value={s2.storeName} onChange={e => setS2(s => ({...s, storeName: e.target.value}))} placeholder="e.g. Yangon Grocery, Saigon Kitchen..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">{t('storeDescription')}</label>
            <textarea className="input resize-none h-24" value={s2.description} onChange={e => setS2(s => ({...s, description: e.target.value}))} placeholder="Tell buyers your story and what makes your store special..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-2">{t('communityBadge')}</label>
            <div className="grid grid-cols-2 gap-2">
              {COMMUNITY_BADGES.map(badge => (
                <label
                  key={badge.id}
                  className={`flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${s2.badgeId === badge.id ? 'border-brand-orange bg-brand-cream' : 'border-brand-cream-dark hover:border-brand-orange/50'}`}
                >
                  <input type="radio" name="badge" value={badge.id} checked={s2.badgeId === badge.id} onChange={() => setS2(s => ({...s, badgeId: badge.id}))} className="sr-only" />
                  <span className="text-xl">{badge.flag}</span>
                  <span className="text-xs font-medium text-brand-navy truncate">{badge.name}</span>
                  {s2.badgeId === badge.id && <Check size={13} className="text-brand-orange ml-auto flex-shrink-0" />}
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Store Photo</label>
            <div className="border-2 border-dashed border-brand-cream-dark rounded-xl p-8 text-center hover:border-brand-orange transition-colors cursor-pointer">
              <Store size={28} className="text-brand-navy/20 mx-auto mb-2" />
              <p className="text-sm text-brand-navy/40">Click to upload profile photo</p>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Payment Setup */}
      {step === 3 && (
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-brand-navy">{t('step3')}</h2>
          <div className="bg-brand-cream rounded-xl p-4">
            <p className="text-sm text-brand-navy/70 mb-3">
              Asiami uses <strong>Stripe Connect</strong> to securely handle payments and transfer earnings directly to your bank account.
            </p>
            <p className="text-xs text-brand-navy/50 mb-3">
              During Phase 0, Asiami takes <strong>0% commission</strong>. You keep 100% of your sales.
            </p>
          </div>

          <div className="border-2 border-dashed border-brand-orange/30 rounded-xl p-6 text-center">
            <CreditCard size={32} className="text-brand-orange/50 mx-auto mb-3" />
            <p className="font-semibold text-brand-navy mb-1">Connect Your Bank Account</p>
            <p className="text-xs text-brand-navy/50 mb-4">Powered by Stripe Connect — Bank-level security</p>
            <button
              type="button"
              className="btn-outline text-sm py-2.5 px-6 inline-flex items-center gap-2"
            >
              <CreditCard size={16} />
              Connect with Stripe
            </button>
            <p className="text-xs text-brand-navy/30 mt-2">You can complete this later after approval</p>
          </div>

          <div className="flex items-start gap-3 p-3 bg-green-50 rounded-xl">
            <Check size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-green-700">You can skip Stripe setup now and complete it after your store is approved. COD orders work without Stripe.</p>
          </div>
        </div>
      )}

      {/* Step 4: First Product */}
      {step === 4 && (
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <h2 className="font-bold text-brand-navy">{t('step4')}</h2>
          <p className="text-sm text-brand-navy/60">Add your first product listing (you can add more after approval)</p>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Product Title *</label>
            <input className="input" value={s4.productTitle} onChange={e => setS4(s => ({...s, productTitle: e.target.value}))} placeholder="e.g. Authentic Ngapi Shrimp Paste 250g" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Price (¥) *</label>
              <input className="input" type="number" value={s4.productPrice} onChange={e => setS4(s => ({...s, productPrice: e.target.value}))} placeholder="980" />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-navy mb-1">Category *</label>
              <select className="input" value={s4.productCategory} onChange={e => setS4(s => ({...s, productCategory: e.target.value}))}>
                <option value="">Select...</option>
                <option value="food_grocery">🥘 Food & Grocery</option>
                <option value="snacks">🍡 Snacks</option>
                <option value="cultural_items">🏮 Cultural Items</option>
                <option value="fashion">👘 Fashion</option>
                <option value="beauty">💄 Beauty</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-brand-navy mb-1">Description</label>
            <textarea className="input resize-none h-24" value={s4.productDescription} onChange={e => setS4(s => ({...s, productDescription: e.target.value}))} placeholder="Describe your product..." />
          </div>
          <p className="text-xs text-brand-navy/40">You can also skip this and add products after approval</p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 1 && (
          <button onClick={prevStep} className="btn-secondary flex items-center gap-2 px-5">
            <ArrowLeft size={16} />
            Back
          </button>
        )}
        <button onClick={nextStep} className="btn-primary flex-1 flex items-center justify-center gap-2">
          {step === 4 ? 'Submit Application' : 'Continue'}
          {step < 4 && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  );
}
