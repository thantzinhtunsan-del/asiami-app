# Asiami (アジアミ) -- Pan-Asian Marketplace in Japan

A multi-vendor e-commerce platform connecting Asian diaspora sellers with buyers across Japan. Built with Next.js 14, Supabase, Stripe Connect, and Vercel.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL + RLS) |
| Auth | Supabase Auth |
| Payments | Stripe Connect |
| i18n | next-intl (8 languages) |
| State | Zustand (cart) |
| Hosting | Vercel |

---

## Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Stripe](https://stripe.com) account (Connect enabled)
- (Optional) [Vercel CLI](https://vercel.com/cli): `npm i -g vercel`

---

## Local Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd asiami
npm install
```

### 2. Environment variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

Required values:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Set up the database

In your Supabase dashboard, go to **SQL Editor** and run the following files in order:

1. `supabase/schema.sql` -- creates all 8 tables, RLS policies, indexes, and triggers
2. `supabase/seed.sql` -- inserts community badges, 3 sample sellers, 15 sample products

Or use the Supabase CLI:

```bash
supabase db push
```

### 4. Enable Supabase Auth

In your Supabase dashboard:
- Go to **Authentication > Providers**
- Enable **Email** (magic link or password)
- Set **Site URL** to `http://localhost:3000`
- Add `http://localhost:3000/api/auth/callback` to **Redirect URLs**

### 5. Set up Stripe Connect

1. In the [Stripe Dashboard](https://dashboard.stripe.com), enable **Connect**
2. Set your Connect platform settings (marketplace type)
3. For webhooks: go to **Developers > Webhooks > Add endpoint**
   - URL: `https://your-domain.com/api/webhooks/stripe`
   - Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `account.updated`
4. Copy the webhook signing secret into `STRIPE_WEBHOOK_SECRET`

For local webhook testing:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 6. Run the dev server

```bash
npm run dev
```

Open http://localhost:3000.

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage: hero, categories, featured sellers, how-it-works |
| `/products` | Product listing with category + community filters |
| `/products/[id]` | Product detail with add-to-cart |
| `/sellers` | All sellers with community badge filter |
| `/sellers/[id]` | Seller storefront |
| `/cart` | Cart with quantity controls |
| `/checkout` | Checkout: address + payment method |
| `/auth` | Login / sign up |
| `/dashboard/buyer` | Order history, saved sellers, profile settings |
| `/dashboard/seller` | GMV stats, recent orders |
| `/seller/products` | Seller product management table |
| `/seller/products/new` | Add new product form |
| `/seller/orders` | Order management with mark-as-shipped |
| `/seller/register` | 4-step seller onboarding wizard |
| `/dashboard/admin` | Platform stats, pending approvals, reported listings |
| `/dashboard/admin/approvals` | Approve / reject seller applications |

All routes are available in 8 languages: `/en`, `/ja`, `/my`, `/vi`, `/zh`, `/ne`, `/th`, `/id`.

---

## Database Tables

| Table | Purpose |
|---|---|
| `users` | Buyer / seller / admin profiles |
| `community_badges` | Nationality badge definitions |
| `seller_profiles` | Store info, Stripe account, approval status |
| `products` | Listings with category, stock, images |
| `orders` | Orders with status workflow |
| `order_items` | Line items per order |
| `reviews` | Buyer reviews for sellers/products |
| `saved_sellers` | Buyer wishlist of sellers |

Row Level Security is enabled on all tables. Buyers see their own orders; sellers see their own store data; admins see everything.

---

## Deploy to Vercel

### Option A: Vercel CLI

```bash
vercel
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add NEXT_PUBLIC_APP_URL
vercel --prod
```

### Option B: Git integration

1. Push to GitHub
2. Go to https://vercel.com/new and import the repo
3. Add all environment variables in the Vercel dashboard
4. Deploy

After deployment, update your Supabase **Site URL** and **Redirect URLs** to your Vercel production URL, and register your production webhook endpoint in Stripe.

---

## Brand

| Token | Value |
|---|---|
| Primary orange | `#E8622A` |
| Cream white | `#FFF8F0` |
| Deep navy | `#1A2B4A` |

---

## Phase 0 Notes

- Commission: **0%** (sellers keep 100% of revenue)
- Payment: **Cash on Delivery** (COD) is fully functional; Stripe and PayPay are UI-scaffolded
- Seller approval: manual admin review required before going live
- All pages use static sample data; wire to Supabase by replacing static constants with API calls
