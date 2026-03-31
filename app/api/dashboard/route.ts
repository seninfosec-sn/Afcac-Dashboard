import { NextRequest, NextResponse } from "next/server";
import { getDashboardData, saveDashboardData, saveTargets, appendUpdateLog } from "@/lib/data";
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
  let step = "session";
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    step = "parse_body";
    const body = (await request.json()) as Partial<DashboardData> & {
      targetsUpdated?: number;
      fullName?: string;
      updaterCountry?: string;
    };

    if (session.role === "expert") {
      if (!body.targets || !Array.isArray(body.targets)) {
        return NextResponse.json({ error: "Missing targets data" }, { status: 400 });
      }
      step = "save_targets";
      saveTargets(body.targets);
    } else {
      if (!body.kpis || !body.actions || !body.countries || !body.targets) {
        return NextResponse.json(
          { error: "Missing required fields: kpis, actions, countries, targets" },
          { status: 400 }
        );
      }
      step = "save_dashboard";
      saveDashboardData(body as DashboardData);
    }

    step = "append_log";
    try {
      const targetsUpdated =
        body.targetsUpdated ?? (body.targets?.filter((t) => t.pct > 0).length ?? 0);
      appendUpdateLog({
        username: session.username,
        date: new Date().toISOString(),
        targetsUpdated,
        fullName: body.fullName,
        country: body.updaterCountry,
      });
    } catch (logErr) {
      // Log failure is non-critical — don't block the save
      console.error("[LOG ERROR]", logErr);
    }

    return NextResponse.json({ success: true, message: "Dashboard updated successfully" });
  } catch (err) {
    console.error(`[SAVE ERROR at step=${step}]`, err);
    return NextResponse.json(
      { error: `Failed to save data (step: ${step})` },
      { status: 500 }
    );
  }
}
