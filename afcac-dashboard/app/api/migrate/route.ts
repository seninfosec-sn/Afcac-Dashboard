import { NextRequest, NextResponse } from "next/server";
import { setupSchema, kvSet } from "@/lib/db";
import fs from "fs";
import path from "path";

// Protect with a secret: POST /api/migrate  { secret: "MIGRATE_SECRET" }
const MIGRATE_SECRET = process.env.MIGRATE_SECRET ?? "afcac-migrate-2025";

function readJson<T>(filename: string): T {
  const dir = process.env.DATA_DIR
    ? path.resolve(process.env.DATA_DIR)
    : path.join(process.cwd(), "data");
  return JSON.parse(fs.readFileSync(path.join(dir, filename), "utf-8")) as T;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    if (body.secret !== MIGRATE_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Create schema
    await setupSchema();
    const results: Record<string, string> = { schema: "OK" };

    // 2. Seed each collection
    const seeds: Array<{ key: string; file: string }> = [
      { key: "kpis",           file: "kpis.json" },
      { key: "actions",        file: "actions.json" },
      { key: "countries",      file: "countries.json" },
      { key: "targets",        file: "targets.json" },
      { key: "country_targets",file: "country_targets.json" },
      { key: "updates",        file: "updates.json" },
      { key: "users",          file: "users.json" },
    ];

    for (const { key, file } of seeds) {
      try {
        const data = readJson(file);
        await kvSet(key, data);
        results[key] = "seeded";
      } catch (e) {
        results[key] = `skipped (${e instanceof Error ? e.message : e})`;
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
