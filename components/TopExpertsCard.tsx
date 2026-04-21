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
  const top = experts[0] ?? null;

  return (
    <div className="kpi-card k-gold" style={{ animationDelay: ".35s", cursor: "default" }}>
      <div className="kpi-icon-wrap" style={{ background: "#fff8e6" }}>🏆</div>

      {top ? (
        <>
          <div className="kpi-val" style={{ color: "var(--gold)", fontSize: 20, lineHeight: 1.1 }}>
            {top.username}
          </div>
          <div className="kpi-label">{t(locale, "topExpert")}</div>
          <div className="kpi-trend trend-up">
            ▲ {top.totalUpdates} {t(locale, "updates")} · {timeAgo(top.lastUpdate, locale)}
          </div>

          {experts.length > 1 && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3, borderTop: "1px solid var(--border2)", paddingTop: 7 }}>
              {experts.slice(1).map((e, i) => (
                <div key={e.username} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                  <span style={{ fontSize: 11 }}>{MEDALS[i + 1]}</span>
                  <span style={{ flex: 1, color: "var(--ink2)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.username}
                  </span>
                  <span style={{ color: "var(--ink3)", flexShrink: 0 }}>{e.totalUpdates} {t(locale, "updates")}</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="kpi-val" style={{ color: "var(--ink3)", fontSize: 14 }}>—</div>
          <div className="kpi-label">{t(locale, "topExpert")}</div>
          <div className="kpi-trend trend-flat">{t(locale, "noUpdates")}</div>
        </>
      )}
    </div>
  );
}
