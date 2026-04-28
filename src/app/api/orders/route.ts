import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const role = searchParams.get('role') ?? 'buyer';

  let query = supabase.from('orders').select(`
    *,
    order_items (
      *,
      products (id, title, images, price)
    ),
    seller_profiles (id, store_name, photo_url)
  `);

  if (role === 'buyer') {
    query = query.eq('buyer_id', user.id);
  } else if (role === 'seller') {
    const { data: seller } = await supabase
      .from('seller_profiles').select('id').eq('user_id', user.id).single();
    if (!seller) return NextResponse.json({ orders: [] });
    query = query.eq('seller_id', seller.id);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ orders: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { items, delivery_address, payment_method, seller_id } = body;

  if (!items?.length || !delivery_address || !payment_method || !seller_id) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const total = items.reduce((sum: number, item: { price: number; quantity: number }) =>
    sum + item.price * item.quantity, 0);

  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      buyer_id: user.id,
      seller_id,
      total,
      payment_method,
      delivery_address,
      status: 'pending',
    })
    .select()
    .single();

  if (orderError) return NextResponse.json({ error: orderError.message }, { status: 500 });

  const orderItems = items.map((item: { product_id: string; quantity: number; price: number }) => ({
    order_id: order.id,
    product_id: item.product_id,
    quantity: item.quantity,
    price_at_purchase: item.price,
  }));

  const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
  if (itemsError) return NextResponse.json({ error: itemsError.message }, { status: 500 });

  return NextResponse.json({ order }, { status: 201 });
}
