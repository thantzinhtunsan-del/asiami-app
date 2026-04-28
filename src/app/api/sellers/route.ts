import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const nationality = searchParams.get('nationality');

  const supabase = await createClient();

  let query = supabase
    .from('seller_profiles')
    .select(`*, community_badges (*)`)
    .eq('approved', true);

  if (nationality) query = query.eq('nationality', nationality);

  const { data, error } = await query.order('average_rating', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ sellers: data });
}

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const { store_name, description, nationality, community_badge_id, business_type } = body;

  if (!store_name || !nationality) {
    return NextResponse.json({ error: 'store_name and nationality are required' }, { status: 400 });
  }

  // Check if seller profile already exists
  const { data: existing } = await supabase
    .from('seller_profiles').select('id').eq('user_id', user.id).single();
  if (existing) return NextResponse.json({ error: 'Seller profile already exists' }, { status: 409 });

  const { data, error } = await supabase
    .from('seller_profiles')
    .insert({ user_id: user.id, store_name, description, nationality, community_badge_id, business_type: business_type ?? 'individual', approved: false })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Update user role to seller
  await supabase.from('users').update({ role: 'seller' }).eq('id', user.id);

  return NextResponse.json({ seller: data }, { status: 201 });
}
