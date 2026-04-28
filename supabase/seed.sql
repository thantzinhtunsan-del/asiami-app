-- Asiami Seed Data
-- Run AFTER schema.sql, and AFTER creating auth users manually or via Supabase dashboard

-- Community Badges
INSERT INTO community_badges (id, name, flag_emoji, color) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'Myanmar-owned', '🇲🇲', '#E8622A'),
  ('b1000000-0000-0000-0000-000000000002', 'Vietnamese-owned', '🇻🇳', '#DA251D'),
  ('b1000000-0000-0000-0000-000000000003', 'Nepali-owned', '🇳🇵', '#003893'),
  ('b1000000-0000-0000-0000-000000000004', 'Chinese-owned', '🇨🇳', '#DE2910'),
  ('b1000000-0000-0000-0000-000000000005', 'Thai-owned', '🇹🇭', '#A51931'),
  ('b1000000-0000-0000-0000-000000000006', 'Indonesian-owned', '🇮🇩', '#CE1126'),
  ('b1000000-0000-0000-0000-000000000007', 'Filipino-owned', '🇵🇭', '#0038A8')
ON CONFLICT (id) DO NOTHING;

-- NOTE: Create auth users via Supabase dashboard or API first, then run this seed
-- Placeholder user IDs (replace with real auth user IDs)
-- Seller 1: Myanmar Grocery — user_id = 'u1000000-0000-0000-0000-000000000001'
-- Seller 2: Vietnamese Restaurant — user_id = 'u1000000-0000-0000-0000-000000000002'
-- Seller 3: Nepali Cultural Shop — user_id = 'u1000000-0000-0000-0000-000000000003'
-- Buyer 1 — user_id = 'u1000000-0000-0000-0000-000000000004'
-- Buyer 2 — user_id = 'u1000000-0000-0000-0000-000000000005'

-- Seller Profiles (replace user_ids with real auth UUIDs)
INSERT INTO seller_profiles (id, user_id, store_name, description, nationality, community_badge_id, approved, average_rating) VALUES
  ('s1000000-0000-0000-0000-000000000001', 'u1000000-0000-0000-0000-000000000001',
   'Yangon Grocery', 'Authentic Myanmar groceries, spices, and snacks. We bring the tastes of Yangon to Japan.',
   'Myanmar', 'b1000000-0000-0000-0000-000000000001', true, 4.8),
  ('s1000000-0000-0000-0000-000000000002', 'u1000000-0000-0000-0000-000000000002',
   'Saigon Kitchen', 'Fresh Vietnamese ingredients, bánh mì supplies, and pho essentials delivered across Japan.',
   'Vietnam', 'b1000000-0000-0000-0000-000000000002', true, 4.6),
  ('s1000000-0000-0000-0000-000000000003', 'u1000000-0000-0000-0000-000000000003',
   'Himalayan Treasures', 'Nepali cultural items, spices, handicrafts, and tea from the Himalayas.',
   'Nepal', 'b1000000-0000-0000-0000-000000000003', true, 4.9)
ON CONFLICT (id) DO NOTHING;

-- Products — Myanmar Grocery Store
INSERT INTO products (id, seller_id, title, description, price, category, stock, active) VALUES
  ('p1000000-0000-0000-0000-000000000001', 's1000000-0000-0000-0000-000000000001',
   'Shrimp Paste (Ngapi)', 'Traditional Myanmar fermented shrimp paste, essential for authentic Myanmar cooking. 250g jar.', 880, 'food_grocery', 50, true),
  ('p1000000-0000-0000-0000-000000000002', 's1000000-0000-0000-0000-000000000001',
   'Laphet Thoke Mix', 'Fermented tea leaf salad kit with all the fixings. Serves 4 people.', 1200, 'food_grocery', 30, true),
  ('p1000000-0000-0000-0000-000000000003', 's1000000-0000-0000-0000-000000000001',
   'Myanmar Thanaka Powder', 'Natural cosmetic wood powder, used as sunscreen and skin conditioner for generations.', 650, 'beauty', 100, true),
  ('p1000000-0000-0000-0000-000000000004', 's1000000-0000-0000-0000-000000000001',
   'Sticky Rice Snack Pack', 'Assorted Myanmar sticky rice snacks — sweet, savory, and sesame. Pack of 6.', 950, 'snacks', 80, true),
  ('p1000000-0000-0000-0000-000000000005', 's1000000-0000-0000-0000-000000000001',
   'Longyi Fabric — Blue Floral', 'Traditional Myanmar longyi cotton fabric, handwoven blue floral pattern, 2m.', 3200, 'fashion', 20, true)
ON CONFLICT (id) DO NOTHING;

-- Products — Vietnamese Restaurant
INSERT INTO products (id, seller_id, title, description, price, category, stock, active) VALUES
  ('p1000000-0000-0000-0000-000000000006', 's1000000-0000-0000-0000-000000000002',
   'Pho Kit — Beef Broth', 'Ready-to-make Vietnamese pho kit with spices, star anise, cinnamon. Serves 2.', 1400, 'food_grocery', 40, true),
  ('p1000000-0000-0000-0000-000000000007', 's1000000-0000-0000-0000-000000000002',
   'Bánh Mì Bread Set', 'Vietnamese baguette starter kit — flour blend + recipe card for authentic crusty bánh mì.', 1100, 'food_grocery', 35, true),
  ('p1000000-0000-0000-0000-000000000008', 's1000000-0000-0000-0000-000000000002',
   'Vietnamese Fish Sauce Premium', 'Phú Quốc-style fish sauce, 3-year aged, 500ml. The soul of Vietnamese cooking.', 780, 'food_grocery', 60, true),
  ('p1000000-0000-0000-0000-000000000009', 's1000000-0000-0000-0000-000000000002',
   'Chè Đậu Xanh (Mung Bean Sweet Soup)', 'Traditional Vietnamese sweet mung bean dessert, ready-to-heat. 4 servings.', 850, 'snacks', 45, true),
  ('p1000000-0000-0000-0000-000000000010', 's1000000-0000-0000-0000-000000000002',
   'Áo Dài Scarf — Silk Blend', 'Elegant Vietnamese-inspired silk blend scarf with ao dai embroidery patterns.', 2800, 'fashion', 15, true)
ON CONFLICT (id) DO NOTHING;

-- Products — Nepali Cultural Shop
INSERT INTO products (id, seller_id, title, description, price, category, stock, active) VALUES
  ('p1000000-0000-0000-0000-000000000011', 's1000000-0000-0000-0000-000000000003',
   'Himalayan Pink Salt 1kg', 'Pure hand-mined Himalayan rock salt. Perfect for cooking and bath soaks.', 980, 'food_grocery', 70, true),
  ('p1000000-0000-0000-0000-000000000012', 's1000000-0000-0000-0000-000000000003',
   'Masala Chai Blend', 'Traditional Nepali mountain chai spice blend with cardamom, ginger, clove. 100g.', 760, 'snacks', 90, true),
  ('p1000000-0000-0000-0000-000000000013', 's1000000-0000-0000-0000-000000000003',
   'Singing Bowl — Brass 15cm', 'Handcrafted Nepalese brass singing bowl for meditation, with wooden striker and cushion.', 4500, 'cultural_items', 12, true),
  ('p1000000-0000-0000-0000-000000000014', 's1000000-0000-0000-0000-000000000003',
   'Dhaka Weave Tote Bag', 'Handloom Dhaka fabric tote bag — traditional Nepali geometric patterns, natural dyes.', 2200, 'fashion', 25, true),
  ('p1000000-0000-0000-0000-000000000015', 's1000000-0000-0000-0000-000000000003',
   'Mandala Thangka Print', 'Tibetan-style mandala thangka art print, A3 size, printed on rice paper.', 1800, 'cultural_items', 30, true)
ON CONFLICT (id) DO NOTHING;
