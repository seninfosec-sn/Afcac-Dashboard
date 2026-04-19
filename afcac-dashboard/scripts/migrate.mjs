/**
 * Migration script — seeds all JSON data into Neon PostgreSQL
 * Usage: node scripts/migrate.mjs
 * Requires: DATABASE_URL environment variable or .env.local
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATA_DIR = join(ROOT, "data");

// Load .env.local manually
try {
  const env = readFileSync(join(ROOT, ".env.local"), "utf-8");
  for (const line of env.split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && !key.startsWith("#") && rest.length) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
} catch {}

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("❌  DATABASE_URL not set. Add it to .env.local");
  process.exit(1);
}

// Dynamic import of neon (must be installed)
const { neon } = await import("@neondatabase/serverless").catch(() => {
  console.error("❌  @neondatabase/serverless not found. Run: npm install");
  process.exit(1);
});

const sql = neon(DATABASE_URL);

function readJson(file) {
  return JSON.parse(readFileSync(join(DATA_DIR, file), "utf-8"));
}

async function kvSet(key, value) {
  const json = JSON.stringify(value);
  await sql`
    INSERT INTO afcac_kv (key, value, updated_at)
    VALUES (${key}, ${json}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = ${json}::jsonb, updated_at = NOW()
  `;
}

async function main() {
  console.log("🔧  Connecting to Neon...");

  // Create table
  await sql`
    CREATE TABLE IF NOT EXISTS afcac_kv (
      key        TEXT PRIMARY KEY,
      value      JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;
  console.log("✅  Table afcac_kv ready");

  const seeds = [
    { key: "kpis",            file: "kpis.json" },
    { key: "actions",         file: "actions.json" },
    { key: "countries",       file: "countries.json" },
    { key: "targets",         file: "targets.json" },
    { key: "country_targets", file: "country_targets.json" },
    { key: "updates",         file: "updates.json" },
    { key: "users",           file: "users.json" },
  ];

  for (const { key, file } of seeds) {
    try {
      const data = readJson(file);
      await kvSet(key, data);
      const count = Array.isArray(data) ? `${data.length} rows` : "1 object";
      console.log(`✅  ${key} → ${count}`);
    } catch (e) {
      console.warn(`⚠️  ${key}: ${e.message}`);
    }
  }

  console.log("\n🎉  Migration complete!");
}

main().catch((e) => { console.error("❌", e.message); process.exit(1); });
