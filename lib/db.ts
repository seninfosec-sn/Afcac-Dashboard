import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const sql = getSql();
  const rows = await sql`SELECT value FROM afcac_kv WHERE key = ${key}`;
  return rows.length > 0 ? (rows[0].value as T) : null;
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  const sql = getSql();
  const json = JSON.stringify(value);
  await sql`
    INSERT INTO afcac_kv (key, value, updated_at)
    VALUES (${key}, ${json}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = ${json}::jsonb, updated_at = NOW()
  `;
}

export async function kvAppend(key: string, item: unknown): Promise<void> {
  const sql = getSql();
  const json = JSON.stringify(item);
  await sql`
    INSERT INTO afcac_kv (key, value, updated_at)
    VALUES (${key}, ${JSON.stringify([item])}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET
      value = afcac_kv.value || ${json}::jsonb,
      updated_at = NOW()
  `;
}

export async function setupSchema(): Promise<void> {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS afcac_kv (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
}
