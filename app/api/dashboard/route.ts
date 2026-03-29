import { NextRequest, NextResponse } from "next/server";
import { getDashboardData, saveDashboardData } from "@/lib/data";
import type { DashboardData } from "@/lib/types";

// GET /api/dashboard — public, returns all dashboard data
export async function GET() {
  try {
    const data = getDashboardData();
    return NextResponse.json(data);
  } catch (err) {
    console.error("GET /api/dashboard error:", err);
    return NextResponse.json({ error: "Failed to load data" }, { status: 500 });
  }
}

// POST /api/dashboard — protected by middleware, updates dashboard data
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<DashboardData>;

    // Validate required fields exist
    if (!body.kpis || !body.actions || !body.countries || !body.targets) {
      return NextResponse.json(
        { error: "Missing required fields: kpis, actions, countries, targets" },
        { status: 400 }
      );
    }

    // Basic validation
    const kpis = body.kpis;
    if (
      typeof kpis.totalCountries !== "number" ||
      typeof kpis.totalActions !== "number" ||
      typeof kpis.totalBudget !== "number"
    ) {
      return NextResponse.json(
        { error: "Invalid KPI data types" },
        { status: 400 }
      );
    }

    saveDashboardData(body as DashboardData);

    return NextResponse.json({ success: true, message: "Dashboard updated successfully" });
  } catch (err) {
    console.error("POST /api/dashboard error:", err);
    return NextResponse.json({ error: "Failed to save data" }, { status: 500 });
  }
}
