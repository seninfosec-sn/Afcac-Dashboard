import { readFileSync } from "fs";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  try {
    const env = readFileSync(".env.local", "utf-8");
    const match = env.match(/DATABASE_URL=(.+)/);
    if (match) process.env.DATABASE_URL = match[1].trim();
  } catch {}
}

const sql = neon(process.env.DATABASE_URL);

// Fetch users from Neon (same logic as lib/data.ts → getUsers)
const rows = await sql`SELECT value FROM afcac_kv WHERE key = 'users'`;
const users = rows[0]?.value ?? [];

console.log(`\nUsers in Neon DB: ${users.length}\n`);
console.log("=".repeat(72));

let ok = 0, warn = 0;

for (const u of users) {
  const hasHash = u.passwordHash && u.passwordHash !== "";
  const hasDevPw = u.devPassword && u.devPassword !== "";
  const canLogin = hasHash || hasDevPw;

  const status = canLogin ? "✓" : "✗";
  const method = hasHash ? "bcrypt" : hasDevPw ? `devPw: ${u.devPassword}` : "NO PASSWORD";
  const line = `${status} ${u.role.padEnd(12)} ${u.username.padEnd(30)} ${method}`;

  if (canLogin) { ok++; console.log(line); }
  else          { warn++; console.log("\x1b[31m" + line + "\x1b[0m"); }
}

console.log("=".repeat(72));
console.log(`\nResult: ${ok} can log in, ${warn} cannot.`);
if (warn > 0) console.log("⚠ Fix: run 'node scripts/push-all.mjs' then check users.json");
else          console.log("✓ All users have valid credentials.");
