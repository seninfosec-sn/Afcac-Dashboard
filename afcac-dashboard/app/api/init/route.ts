import { NextResponse } from "next/server";
import { setupSchema } from "@/lib/db";

// One-time endpoint to initialize Neon DB schema
// Call GET /api/init after first deployment
export async function GET() {
  try {
    await setupSchema();
    return NextResponse.json({ success: true, message: "Schema initialized (afcac_kv table ready)" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
