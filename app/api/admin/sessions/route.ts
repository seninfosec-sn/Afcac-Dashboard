import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getOnlineSessions, getAllRecentSessions } from "@/lib/sessions";
import { getSessionLogs, countSessionLogs, setupSchema } from "@/lib/db";
import type { SessionEntry } from "@/lib/types";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const page   = Math.max(0, parseInt(url.searchParams.get("page")  ?? "0", 10));
  const limit  = Math.min(200, parseInt(url.searchParams.get("limit") ?? "100", 10));
  const offset = page * limit;

  // Ensure SQL schema exists (idempotent — safe to call every time)
  try { await setupSchema(); } catch { /* ignore if DB unavailable */ }

  const [online, recent] = await Promise.all([
    getOnlineSessions(10),
    getAllRecentSessions(),
  ]);

  // Try permanent SQL history; fall back to KV recent sessions if SQL unavailable
  let history: SessionEntry[] = [];
  let total = 0;
  try {
    const [logs, count] = await Promise.all([
      getSessionLogs(limit, offset),
      countSessionLogs(),
    ]);
    history = logs as SessionEntry[];
    total   = count;
  } catch {
    // SQL not available or table missing — serve KV sessions as fallback
    history = recent;
    total   = recent.length;
  }

  // If SQL returned 0 but KV has sessions, surface KV sessions (first page only)
  if (total === 0 && recent.length > 0 && page === 0) {
    history = recent;
    total   = recent.length;
  }

  return NextResponse.json({ online, recent, history, total, page, limit });
}
