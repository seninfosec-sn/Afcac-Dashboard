import { getDashboardData, getTopExperts, getAllCountryTargets } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import HeaderControls from "@/components/HeaderControls";
import KpiGrid from "@/components/KpiGrid";
import StatusBar from "@/components/StatusBar";
import ActionTable from "@/components/ActionTable";
import BreakdownTable from "@/components/BreakdownTable";
import TargetGrid from "@/components/TargetGrid";
import AfricaMap from "@/components/AfricaMap";
import StatusDonut from "@/components/StatusDonut";

export const dynamic = "force-dynamic"; // always fresh data

export default async function DashboardPage() {
  const [{ kpis, actions, countries, targets }, experts, countryTargets, session] = await Promise.all([
    getDashboardData(),
    getTopExperts(3),
    getAllCountryTargets(),
    getServerSession(),
  ]);
  const isAdmin = session?.role === "admin";

  return (
    <>
      {/* ── HEADER ── */}
      <header className="db-header">
        <div className="db-header-inner">
          <div className="db-emblem">✈</div>
          <div className="db-title-wrap">
            <div className="db-title">AFCAC Revised Abuja Safety Targets</div>
            <div className="db-sub">
              Multi-State Monitoring Dashboard · Revised Abuja Safety Targets
            </div>
          </div>
          <div className="db-controls">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="status-dot" />
              <span className="live-label">Live</span>
            </div>
            <div className="hctl">
              📅 <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}>{kpis.reportPeriod}</span>
            </div>
            <HeaderControls session={session} />
          </div>
        </div>
      </header>

      {/* ── MAIN CANVAS ── */}
      <div className="canvas">

        {/* Section 1: KPI Summary */}
        <div className="section-label">Executive Summary</div>
        <KpiGrid kpis={kpis} experts={experts} />

        {/* Section 2: Status + Action Table */}
        <div className="section-label">Status Overview</div>
        <div className="row-wide">
          <StatusDonut kpis={kpis} isAdmin={isAdmin} />
          <ActionTable actions={actions} targets={targets} countryTargets={countryTargets} isAdmin={isAdmin} />
        </div>

        {/* Section 3: Map + Status Bar */}
        <div className="section-label">Geographic &amp; Status Overview</div>
        <div className="row-map">
          <AfricaMap countries={countries} isAdmin={isAdmin} />
          <StatusBar kpis={kpis} isAdmin={isAdmin} />
        </div>

        {/* Section 4: Country Breakdown */}
        <div className="section-label">Action Plan Country Breakdown</div>
        <BreakdownTable countries={countries} isAdmin={isAdmin} />

        {/* Section 5: Safety Targets */}
        <div className="section-label">AFCAC Safety Targets — Questionnaire Progress</div>
        <TargetGrid targets={targets} isAdmin={isAdmin} />

      </div>

      {/* ── FOOTER ── */}
      <footer className="db-footer">
        <span>
          <strong>Revised Abuja Safety Targets Dashboard</strong> ·{" "}
          Last updated: {kpis.lastUpdated}
        </span>
        <span>Data source: AFCAC Safety Unit via Countries Focal Point · © AFCAC</span>
      </footer>
    </>
  );
}
