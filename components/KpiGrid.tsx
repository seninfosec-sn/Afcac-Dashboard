import type { KpiData, ExpertStat, UpdateLog } from "@/lib/types";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import TopExpertsCard from "./TopExpertsCard";

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
  bottomNote?: JSX.Element | null | false;
}

function KpiCard({ icon, iconBg, value, valueColor, label, trend, trendClass, colorClass, delay, bottomNote }: KpiCardProps) {
  return (
    <div className={`kpi-card ${colorClass}`} style={delay ? { animationDelay: delay } : {}}>
      <div className="kpi-icon-wrap" style={{ background: iconBg }}>{icon}</div>
      <div className="kpi-val" style={valueColor ? { color: valueColor } : {}}>{value}</div>
      <div className="kpi-label">{label}</div>
      <div className={`kpi-trend ${trendClass}`}>{trend}</div>
      {bottomNote && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(0,0,0,0.07)", fontSize: 10, color: "var(--ink3)", display: "flex", alignItems: "center", gap: 5 }}>
          {bottomNote}
        </div>
      )}
    </div>
  );
}

export default function KpiGrid({ kpis, experts, locale = "en", lastCountryUpdate, isCountryProfile = false, globalPctCompleted = 0, connectedUsers = 0 }: { kpis: KpiData; experts: ExpertStat[]; locale?: Locale; lastCountryUpdate?: UpdateLog | null; isCountryProfile?: boolean; globalPctCompleted?: number; connectedUsers?: number }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        colorClass="k-teal" icon="🌍" iconBg="#e8f5ee"
        value={String(kpis.totalCountries)} label={t(locale, "totalCountries")}
        trend={kpis.totalCountriesTrend ? `▲ ${kpis.totalCountriesTrend}` : ""}
        trendClass={kpis.totalCountriesTrend ? "trend-up" : "trend-flat"} delay=".05s"
      />
      <KpiCard
        colorClass="k-blue" icon="📋" iconBg="#e8f0f8"
        value={String(kpis.totalActions)} label={t(locale, "totalActions")}
        trend={kpis.totalActionsTrend ? `▲ ${kpis.totalActionsTrend}` : ""}
        trendClass={kpis.totalActionsTrend ? "trend-up" : "trend-flat"} delay=".1s"
      />
      <KpiCard
        colorClass="k-green" icon="✅" iconBg="#d4f0e0"
        value={`${kpis.pctCompleted}%`} valueColor="#2d9d5e"
        label={t(locale, "pctCompleted")}
        trend={`▲ ${kpis.pctCompletedTrend}`} trendClass="trend-up" delay=".15s"
      />
      <KpiCard
        colorClass="k-amber" icon="⏳" iconBg="#fff0e0"
        value={`${kpis.pctInProgress}%`} valueColor="#f0a500"
        label={t(locale, "pctInProgress")}
        trend={`▲ ${kpis.pctInProgressTrend}`} trendClass="trend-up" delay=".2s"
      />
      {isCountryProfile ? (
        <KpiCard
          colorClass="k-red" icon="⏸" iconBg="#fdecea"
          value={`${kpis.pctNotStarted}%`} valueColor="#95a5a6"
          label={t(locale, "pctNotStarted")}
          trend={`▼ ${kpis.pctNotStartedTrend}`} trendClass="trend-down" delay=".25s"
        />
      ) : (
        <KpiCard
          colorClass="k-teal" icon="⏱" iconBg="#e8f2f8"
          value={String(kpis.avgDurationWeeks)} label={t(locale, "avgDuration")}
          trend={t(locale, "monthsAvg")} trendClass="trend-flat" delay=".25s"
        />
      )}
      {isCountryProfile ? (
        <KpiCard
          colorClass="k-green" icon="🌍" iconBg="#d4f0e0"
          value={`${globalPctCompleted}%`} valueColor="#2d9d5e"
          label={t(locale, "continentalProgress")}
          trend={t(locale, "continentalSub")} trendClass="trend-flat" delay=".3s"
        />
      ) : (
        <KpiCard
          colorClass="k-blue" icon="👥" iconBg="#eee8f8"
          value={String(kpis.expertsPlanned)} label={t(locale, "expertsPlanned")}
          trend={t(locale, "afcacExperts")} trendClass="trend-flat" delay=".3s"
          bottomNote={connectedUsers > 0 ? <><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2d9d5e", display: "inline-block" }} /><span><strong style={{ color: "var(--ink)" }}>{connectedUsers}</strong> utilisateur{connectedUsers > 1 ? "s" : ""} connecté{connectedUsers > 1 ? "s" : ""}</span></> : undefined}
        />
      )}
      <TopExpertsCard experts={experts} locale={locale} lastCountryUpdate={lastCountryUpdate} />
    </div>
  );
}
