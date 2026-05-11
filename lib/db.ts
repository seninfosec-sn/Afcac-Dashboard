import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL environment variable is not set");
  return neon(url);
}

/* ── KV store ──────────────────────────────────────── */

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

/* ── Schema ────────────────────────────────────────── */

export async function setupSchema(): Promise<void> {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS afcac_kv (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS afcac_sessions (
      id           SERIAL PRIMARY KEY,
      session_id   TEXT UNIQUE NOT NULL,
      username     TEXT NOT NULL,
      display_name TEXT,
      role         TEXT,
      login_time   TIMESTAMPTZ NOT NULL,
      last_seen    TIMESTAMPTZ NOT NULL,
      logout_time  TIMESTAMPTZ,
      ip           TEXT,
      country      TEXT,
      city         TEXT,
      country_code TEXT
    )
  `;
  await sql`CREATE INDEX IF NOT EXISTS idx_afcac_sessions_login ON afcac_sessions (login_time DESC)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_afcac_sessions_user  ON afcac_sessions (username)`;
}

/* ── Session log (permanent table) ────────────────── */

type SessionRow = {
  sessionId: string; username: string; displayName: string; role: string;
  loginTime: string; lastSeen: string; logoutTime?: string;
  ip: string; country?: string; city?: string; countryCode?: string;
};

export async function insertSessionLog(e: SessionRow): Promise<void> {
  try {
    const sql = getSql();
    await sql`
      INSERT INTO afcac_sessions
        (session_id, username, display_name, role, login_time, last_seen, logout_time, ip, country, city, country_code)
      VALUES
        (${e.sessionId}, ${e.username}, ${e.displayName}, ${e.role},
         ${e.loginTime}::timestamptz, ${e.lastSeen}::timestamptz,
         ${e.logoutTime ?? null}, ${e.ip},
         ${e.country ?? null}, ${e.city ?? null}, ${e.countryCode ?? null})
      ON CONFLICT (session_id) DO NOTHING
    `;
  } catch { /* non-blocking — KV is primary */ }
}

export async function updateSessionLastSeen(sessionId: string, lastSeen: string): Promise<void> {
  try {
    const sql = getSql();
    await sql`
      UPDATE afcac_sessions SET last_seen = ${lastSeen}::timestamptz
      WHERE session_id = ${sessionId}
    `;
  } catch { /* non-blocking */ }
}

export async function setSessionLogout(sessionId: string, logoutTime: string): Promise<void> {
  try {
    const sql = getSql();
    await sql`
      UPDATE afcac_sessions
      SET logout_time = ${logoutTime}::timestamptz, last_seen = ${logoutTime}::timestamptz
      WHERE session_id = ${sessionId}
    `;
  } catch { /* non-blocking */ }
}

export async function getSessionLogs(limit = 500, offset = 0): Promise<SessionRow[]> {
  const sql = getSql();
  const rows = await sql`
    SELECT
      session_id   AS "sessionId",
      username,
      display_name AS "displayName",
      role,
      login_time   AS "loginTime",
      last_seen    AS "lastSeen",
      logout_time  AS "logoutTime",
      ip,
      country,
      city,
      country_code AS "countryCode"
    FROM afcac_sessions
    ORDER BY login_time DESC
    LIMIT ${limit} OFFSET ${offset}
  `;
  return rows.map((r) => ({
    ...r,
    loginTime:  new Date(r.loginTime  as string).toISOString(),
    lastSeen:   new Date(r.lastSeen   as string).toISOString(),
    logoutTime: r.logoutTime ? new Date(r.logoutTime as string).toISOString() : undefined,
  })) as SessionRow[];
}

export async function countSessionLogs(): Promise<number> {
  const sql = getSql();
  const rows = await sql`SELECT COUNT(*)::int AS n FROM afcac_sessions`;
  return (rows[0]?.n as number) ?? 0;
}
