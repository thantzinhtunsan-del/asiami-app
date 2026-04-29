import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const sellerId = searchParams.get('seller_id');
  const q = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') ?? '20');

  const supabase = await createClient();

  let query = supabase
    .from('products')
    .select(`
      *,
      seller_profiles (
        id, store_name, photo_url, approved,
        community_badges (id, name, flag_emoji, color)
      )
    `)
    .eq('active', true)
    .limit(limit);

  if (category) query = query.eq('category', category);
  if (sellerId) query = query.eq('seller_id', sellerId);
  if (q) query = query.ilike('title', `%${q}%`);

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ products: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, price, category, stock, images, payment_options, delivery_fee_type, delivery_fee } = body;

  if (!title || !price || !category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // Validate payment_options: must be a non-empty array containing only 'cod' and/or 'prepaid'
  const validPaymentOptions = ['cod', 'prepaid'];
  if (
    !Array.isArray(payment_options) ||
    payment_options.length === 0 ||
    payment_options.some((o: unknown) => !validPaymentOptions.includes(o as string))
  ) {
    return NextResponse.json({ error: 'Invalid payment_options' }, { status: 400 });
  }

  // Validate delivery_fee_type
  if (!['included', 'buyer_pays'].includes(delivery_fee_type)) {
    return NextResponse.json({ error: 'Invalid delivery_fee_type' }, { status: 400 });
  }

  // Get seller profile
  const { data: seller } = await supabase
    .from('seller_profiles')
    .select('id, approved')
    .eq('user_id', user.id)
    .single();

  if (!seller) return NextResponse.json({ error: 'Seller profile not found' }, { status: 404 });
  if (!seller.approved) return NextResponse.json({ error: 'Seller not yet approved' }, { status: 403 });

  const { data, error } = await supabase
    .from('products')
    .insert({
      title,
      description,
      price,
      category,
      stock: stock ?? 0,
      images: images ?? [],
      seller_id: seller.id,
      payment_options: payment_options ?? ['prepaid'],
      delivery_fee_type: delivery_fee_type ?? 'buyer_pays',
      delivery_fee: delivery_fee ?? 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ product: data }, { status: 201 });
}
