import type { KpiData, ExpertStat } from "@/lib/types";
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

export default function KpiGrid({ kpis, experts, locale = "en" }: { kpis: KpiData; experts: ExpertStat[]; locale?: Locale }) {
  return (
    <div className="kpi-grid">
      <KpiCard
        colorClass="k-teal" icon="🌍" iconBg="#e8f5ee"
        value={String(kpis.totalCountries)} label={t(locale, "totalCountries")}
        trend={`▲ ${kpis.totalCountriesTrend}`} trendClass="trend-up" delay=".05s"
      />
      <KpiCard
        colorClass="k-blue" icon="📋" iconBg="#e8f0f8"
        value={String(kpis.totalActions)} label={t(locale, "totalActions")}
        trend={`▲ ${kpis.totalActionsTrend}`} trendClass="trend-up" delay=".1s"
      />
      <KpiCard
        colorClass="k-green" icon="✅" iconBg="#d4f0e0"
        value={`${kpis.pctCompleted}%`} valueColor="var(--c-complete)"
        label={t(locale, "pctCompleted")}
        trend={`▲ ${kpis.pctCompletedTrend}`} trendClass="trend-up" delay=".15s"
      />
      <KpiCard
        colorClass="k-amber" icon="⏳" iconBg="#fff0e0"
        value={`${kpis.pctInProgress}%`} valueColor="var(--c-progress)"
        label={t(locale, "pctInProgress")}
        trend={`▲ ${kpis.pctInProgressTrend}`} trendClass="trend-up" delay=".2s"
      />
      <KpiCard
        colorClass="k-teal" icon="⏱" iconBg="#e8f2f8"
        value={String(kpis.avgDurationWeeks)} label={t(locale, "avgDuration")}
        trend={t(locale, "monthsAvg")} trendClass="trend-flat" delay=".25s"
      />
      <KpiCard
        colorClass="k-blue" icon="👥" iconBg="#eee8f8"
        value={String(kpis.expertsPlanned)} label={t(locale, "expertsPlanned")}
        trend={t(locale, "afcacExperts")} trendClass="trend-flat" delay=".3s"
      />
      <TopExpertsCard experts={experts} locale={locale} />
    </div>
  );
}
