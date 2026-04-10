import { NextRequest, NextResponse } from "next/server";
import { getDashboardData, saveDashboardData, saveTargets, saveCountryTargets, findUser, appendUpdateLog } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import type { DashboardData } from "@/lib/types";

export async function GET() {
  try {
    const data = await getDashboardData();
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
      const user = findUser(session.username);
      const country = user?.country ?? body.updaterCountry ?? "";
      if (country) {
        await saveCountryTargets(country, body.targets);
      } else {
        await saveTargets(body.targets);
      }
    } else {
      if (!body.kpis || !body.actions || !body.countries || !body.targets) {
        return NextResponse.json(
          { error: "Missing required fields: kpis, actions, countries, targets" },
          { status: 400 }
        );
      }
      step = "save_dashboard";
      await saveDashboardData(body as DashboardData);
    }

    step = "append_log";
    try {
      const targetsUpdated =
        body.targetsUpdated ?? (body.targets?.filter((t) => t.pct > 0).length ?? 0);
      await appendUpdateLog({
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
    const msg = err instanceof Error ? err.message : String(err);
    console.error(`[SAVE ERROR at step=${step}]`, err);
    return NextResponse.json(
      { error: `${step}: ${msg}` },
      { status: 500 }
    );
  }
}
