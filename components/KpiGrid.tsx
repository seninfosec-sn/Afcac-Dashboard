import type { KpiData } from "@/lib/types";

interface KpiCardProps {
  icon: string;
  iconBg: string;
  value: string;
  valueColor?: string;
  label: string;
  trend: string;
  trendClass: string;
  colorClass: string;
  delay?: string;
}

function KpiCard({ icon, iconBg, value, valueColor, label, trend, trendClass, colorClass, delay }: KpiCardProps) {
  return (
    <div className={`kpi-card ${colorClass}`} style={delay ? { animationDelay: delay } : {}}>
      <div className="kpi-icon-wrap" style={{ background: iconBg }}>{icon}</div>
      <div className="kpi-val" style={valueColor ? { color: valueColor } : {}}>{value}</div>
      <div className="kpi-label">{label}</div>
      <div className={`kpi-trend ${trendClass}`}>{trend}</div>
    </div>
  );
}

export default function KpiGrid({ kpis }: { kpis: KpiData }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        colorClass="k-teal" icon="🌍" iconBg="#e8f5ee"
        value={String(kpis.totalCountries)} label="Total Countries"
        trend={`▲ ${kpis.totalCountriesTrend}`} trendClass="trend-up" delay=".05s"
      />
      <KpiCard
        colorClass="k-blue" icon="📋" iconBg="#e8f0f8"
        value={String(kpis.totalActions)} label="Total Actions"
        trend={`▲ ${kpis.totalActionsTrend}`} trendClass="trend-up" delay=".1s"
      />
      <KpiCard
        colorClass="k-green" icon="✅" iconBg="#d4f0e0"
        value={`${kpis.pctCompleted}%`} valueColor="var(--c-complete)"
        label="% Completed"
        trend={`▲ ${kpis.pctCompletedTrend}`} trendClass="trend-up" delay=".15s"
      />
      <KpiCard
        colorClass="k-amber" icon="⏳" iconBg="#fff0e0"
        value={`${kpis.pctInProgress}%`} valueColor="var(--c-progress)"
        label="% In Progress"
        trend={`▲ ${kpis.pctInProgressTrend}`} trendClass="trend-up" delay=".2s"
      />
      <KpiCard
        colorClass="k-teal" icon="⏱" iconBg="#e8f2f8"
        value={String(kpis.avgDurationWeeks)} label="Avg Duration (wks)"
        trend="● 3.5 months avg." trendClass="trend-flat" delay=".25s"
      />
      <KpiCard
        colorClass="k-blue" icon="👥" iconBg="#eee8f8"
        value={String(kpis.expertsPlanned)} label="Experts Planned"
        trend="● AFCAC Experts" trendClass="trend-flat" delay=".3s"
      />
    </div>
  );
}
