import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

// Read DATABASE_URL from .env.local if not in environment
if (!process.env.DATABASE_URL) {
  try {
    const env = readFileSync(".env.local", "utf-8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) process.env.DATABASE_URL = match[1].trim();
  } catch {}
}

const sql = neon(process.env.DATABASE_URL);

async function push(key, file) {
  const data = JSON.parse(readFileSync(`data/${file}`, "utf-8"));
  await sql`
    INSERT INTO afcac_kv (key, value)
    VALUES (${key}, ${JSON.stringify(data)}::jsonb)
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value
  `;
  const label = Array.isArray(data) ? `${data.length} records` : "object";
  console.log(`✓ ${key.padEnd(16)} ← ${file} (${label})`);
}

console.log("Pushing all data to Neon DB…\n");

await push("users",           "users.json");
await push("kpis",            "kpis.json");
await push("actions",         "actions.json");
await push("countries",       "countries.json");
await push("targets",         "targets.json");
await push("country_targets", "country_targets.json");
await push("updates",         "updates.json");

console.log("\nDone — Neon DB is up to date.");
