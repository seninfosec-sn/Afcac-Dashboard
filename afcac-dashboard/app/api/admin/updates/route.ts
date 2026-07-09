import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getUpdateLogs } from "@/lib/data";

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session || session.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const logs = await getUpdateLogs();
    const sorted = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    return NextResponse.json({ logs: sorted });
  } catch (err) {
    console.error("GET /api/admin/updates error:", err);
    return NextResponse.json({ error: "Failed to load update logs" }, { status: 500 });
  }
}
