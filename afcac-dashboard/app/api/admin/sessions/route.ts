import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getOnlineSessions, getAllRecentSessions } from "@/lib/sessions";
import { getSessionLogs, countSessionLogs } from "@/lib/db";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const page   = Math.max(0, parseInt(url.searchParams.get("page")  ?? "0", 10));
  const limit  = Math.min(200, parseInt(url.searchParams.get("limit") ?? "100", 10));
  const offset = page * limit;

  const [online, recent, history, total] = await Promise.all([
    getOnlineSessions(10),
    getAllRecentSessions(),
    getSessionLogs(limit, offset),
    countSessionLogs(),
  ]);

  return NextResponse.json({ online, recent, history, total, page, limit });
}
