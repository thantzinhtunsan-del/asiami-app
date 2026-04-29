-- Asiami Marketplace — Supabase Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Community Badges
CREATE TABLE IF NOT EXISTS community_badges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  flag_emoji TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#E8622A',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'buyer' CHECK (role IN ('buyer', 'seller', 'admin')),
  full_name TEXT,
  language_preference TEXT DEFAULT 'en',
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Seller Profiles
CREATE TABLE IF NOT EXISTS seller_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  store_name TEXT NOT NULL,
  description TEXT,
  nationality TEXT,
  community_badge_id UUID REFERENCES community_badges(id),
  photo_url TEXT,
  banner_url TEXT,
  stripe_account_id TEXT,
  approved BOOLEAN DEFAULT false,
  rejection_reason TEXT,
  business_type TEXT DEFAULT 'individual' CHECK (business_type IN ('individual', 'company')),
  response_time_hours INTEGER DEFAULT 24,
  total_sales INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('food_grocery', 'snacks', 'cultural_items', 'restaurant', 'fashion', 'beauty', 'other')),
  stock INTEGER NOT NULL DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT true,
  language TEXT DEFAULT 'en',
  -- Payment & delivery options chosen by seller
  payment_options TEXT[] DEFAULT '{prepaid}' CHECK (
    payment_options <@ ARRAY['cod','prepaid']::TEXT[] AND array_length(payment_options, 1) > 0
  ),
  delivery_fee_type TEXT NOT NULL DEFAULT 'buyer_pays' CHECK (delivery_fee_type IN ('included', 'buyer_pays')),
  delivery_fee INTEGER NOT NULL DEFAULT 0, -- in JPY; 0 when delivery_fee_type = 'included'
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Migration: add payment/delivery columns to existing products table
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS payment_options TEXT[] DEFAULT '{prepaid}',
  ADD COLUMN IF NOT EXISTS delivery_fee_type TEXT NOT NULL DEFAULT 'buyer_pays',
  ADD COLUMN IF NOT EXISTS delivery_fee INTEGER NOT NULL DEFAULT 0;

-- Orders
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES seller_profiles(id),
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'stripe' CHECK (payment_method IN ('stripe', 'paypay', 'cod')),
  payment_intent_id TEXT,
  delivery_address JSONB NOT NULL,
  tracking_number TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Order Items
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES seller_profiles(id),
  product_id UUID REFERENCES products(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Saved Sellers (buyer wishlist)
CREATE TABLE IF NOT EXISTS saved_sellers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  buyer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  seller_id UUID NOT NULL REFERENCES seller_profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(buyer_id, seller_id)
);

-- Reported Listings
CREATE TABLE IF NOT EXISTS reported_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE seller_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE community_badges ENABLE ROW LEVEL SECURITY;

-- Users: can read own, admin can read all
CREATE POLICY "Users can read own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);

-- Seller Profiles: public read, seller can update own
CREATE POLICY "Anyone can view approved sellers" ON seller_profiles FOR SELECT USING (approved = true OR auth.uid() = user_id);
CREATE POLICY "Seller can update own profile" ON seller_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Seller can insert own profile" ON seller_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Products: public read of active, seller manages own
CREATE POLICY "Anyone can view active products" ON products FOR SELECT USING (active = true);
CREATE POLICY "Seller can manage own products" ON products FOR ALL USING (
  seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
);

-- Orders: buyer sees own, seller sees their orders
CREATE POLICY "Buyer can see own orders" ON orders FOR SELECT USING (buyer_id = auth.uid());
CREATE POLICY "Seller can see own orders" ON orders FOR SELECT USING (
  seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
);
CREATE POLICY "Buyer can create orders" ON orders FOR INSERT WITH CHECK (buyer_id = auth.uid());
CREATE POLICY "Seller can update order status" ON orders FOR UPDATE USING (
  seller_id IN (SELECT id FROM seller_profiles WHERE user_id = auth.uid())
);

-- Order Items
CREATE POLICY "Visible to order participants" ON order_items FOR SELECT USING (
  order_id IN (
    SELECT id FROM orders WHERE buyer_id = auth.uid()
    UNION
    SELECT o.id FROM orders o JOIN seller_profiles sp ON o.seller_id = sp.id WHERE sp.user_id = auth.uid()
  )
);
CREATE POLICY "Buyers can insert order items" ON order_items FOR INSERT WITH CHECK (
  order_id IN (SELECT id FROM orders WHERE buyer_id = auth.uid())
);

-- Reviews: public read
CREATE POLICY "Anyone can read reviews" ON reviews FOR SELECT USING (true);
CREATE POLICY "Buyers can write reviews" ON reviews FOR INSERT WITH CHECK (buyer_id = auth.uid());

-- Community Badges: public read
CREATE POLICY "Anyone can read badges" ON community_badges FOR SELECT USING (true);

-- Saved sellers
CREATE POLICY "Buyer manages own saved sellers" ON saved_sellers FOR ALL USING (buyer_id = auth.uid());

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_seller ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(active);
CREATE INDEX IF NOT EXISTS idx_orders_buyer ON orders(buyer_id);
CREATE INDEX IF NOT EXISTS idx_orders_seller ON orders(seller_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_seller_approved ON seller_profiles(approved);
CREATE INDEX IF NOT EXISTS idx_reviews_seller ON reviews(seller_id);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (new.id, new.email, 'buyer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users insert
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Update average_rating on reviews insert
CREATE OR REPLACE FUNCTION update_seller_rating()
RETURNS trigger AS $$
BEGIN
  UPDATE seller_profiles
  SET average_rating = (
    SELECT AVG(rating)::DECIMAL(3,2) FROM reviews WHERE seller_id = NEW.seller_id
  )
  WHERE id = NEW.seller_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_review_created
  AFTER INSERT ON reviews
  FOR EACH ROW EXECUTE FUNCTION update_seller_rating();
