import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getOnlineSessions, getAllRecentSessions } from "@/lib/sessions";

export async function GET() {
  const session = await getServerSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [online, recent] = await Promise.all([
    getOnlineSessions(10),
    getAllRecentSessions(),
  ]);

  return NextResponse.json({ online, recent });
}
