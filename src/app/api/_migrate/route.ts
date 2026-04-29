import { NextResponse } from 'next/server';
import { Client } from 'pg';

// Temporary migration endpoint — DELETE THIS FILE after running once
const MIGRATION_SQL = `
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS payment_options TEXT[] DEFAULT '{prepaid}',
  ADD COLUMN IF NOT EXISTS delivery_fee_type TEXT NOT NULL DEFAULT 'buyer_pays',
  ADD COLUMN IF NOT EXISTS delivery_fee INTEGER NOT NULL DEFAULT 0;
`;

export async function POST() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    await client.query(MIGRATION_SQL);
    await client.end();
    return NextResponse.json({ ok: true, message: 'Migration applied successfully.' });
  } catch (err: unknown) {
    try { await client.end(); } catch {}
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
