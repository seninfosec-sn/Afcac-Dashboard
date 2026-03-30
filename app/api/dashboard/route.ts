import { NextRequest, NextResponse } from "next/server";
import { getDashboardData, saveDashboardData, appendUpdateLog } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import type { DashboardData } from "@/lib/types";

export async function GET() {
  try {
    const data = getDashboardData();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/dashboard error:", err);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<DashboardData> & { targetsUpdated?: number };

    if (!body.kpis || !body.actions || !body.countries || !body.targets) {
      return NextResponse.json(
        { error: "Missing required fields: kpis, actions, countries, targets" },
        { status: 400 }
      );
    }

    saveDashboardData(body as DashboardData);

    // Log the update with the authenticated user
    const session = await getServerSession();
    const username = session?.username ?? "admin";
    const targetsUpdated = body.targetsUpdated ?? body.targets.filter((t) => t.pct > 0).length;

    appendUpdateLog({
      username,
      date: new Date().toISOString(),
      targetsUpdated,
    });

    return NextResponse.json({ success: true, message: "Dashboard updated successfully" });
  } catch (err) {
    console.error("POST /api/dashboard error:", err);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
