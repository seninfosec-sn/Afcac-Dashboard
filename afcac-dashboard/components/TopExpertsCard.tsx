import type { ExpertStat } from "@/lib/types";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

const MEDALS = ["🥇", "🥈", "🥉"];

function timeAgo(isoDate: string, locale: Locale): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (hours < 24) return `${hours}${t(locale, "hoursAgo")}`;
  return `${days}${t(locale, "daysAgo")}`;
}

export default function TopExpertsCard({ experts, locale = "en" }: { experts: ExpertStat[]; locale?: Locale }) {
  return (
    <div className="kpi-card k-gold" style={{ animationDelay: ".35s", cursor: "default" }}>
      <div className="kpi-icon-wrap" style={{ background: "#fff8e6" }}>🏆</div>

      {experts.length > 0 ? (
        <>
          <div className="kpi-label" style={{ marginBottom: 8 }}>{t(locale, "lastUpdateBy")}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {experts.map((e, i) => (
              <div key={e.username} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: i === 0 ? 15 : 12, flexShrink: 0 }}>{MEDALS[i]}</span>
                <span style={{
                  flex: 1,
                  color: i === 0 ? "var(--gold)" : "var(--ink2)",
                  fontWeight: 700,
                  fontSize: i === 0 ? 13 : 11,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}>
                  {e.username}
                </span>
                <span style={{ color: "var(--ink3)", flexShrink: 0, fontSize: 10 }}>
                  ▲ {e.totalUpdates} {t(locale, "updates")} · {timeAgo(e.lastUpdate, locale)}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="kpi-val" style={{ color: "var(--ink3)", fontSize: 14 }}>—</div>
          <div className="kpi-label">{t(locale, "lastUpdateBy")}</div>
          <div className="kpi-trend trend-flat">{t(locale, "noUpdates")}</div>
        </>
      )}
    </div>
  );
}
