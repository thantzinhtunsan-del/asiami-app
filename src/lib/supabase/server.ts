import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

function makeCookieHandlers(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return {
    getAll: () => cookieStore.getAll(),
    setAll: (list: { name: string; value: string; options: Record<string, unknown> }[]) =>
      list.forEach(({ name, value, options }) => {
        try { cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2]); } catch { /* read-only context */ }
      }),
  };
}

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: makeCookieHandlers(cookieStore) }
  );
}

export async function createAdminClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: makeCookieHandlers(cookieStore) }
  );
}
