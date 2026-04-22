import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  // Try reading from .env.local
  try {
    const env = readFileSync(".env.local", "utf-8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) process.env.DATABASE_URL = match[1].trim();
  } catch {}
}

const sql = neon(process.env.DATABASE_URL);
const users = JSON.parse(readFileSync("data/users.json", "utf-8"));

await sql`INSERT INTO afcac_kv (key, value) VALUES ('users', ${JSON.stringify(users)}::jsonb)
  ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value`;

console.log(`Pushed ${users.length} users to Neon DB.`);
