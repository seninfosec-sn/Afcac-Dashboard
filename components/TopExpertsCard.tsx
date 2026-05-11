import type { ExpertStat, UpdateLog } from "@/lib/types";
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

function formatDateTime(isoDate: string, locale: Locale): { date: string; time: string } {
  const d = new Date(isoDate);
  const langMap: Record<Locale, string> = { en: "en-GB", fr: "fr-FR", pt: "pt-PT", ar: "ar-SA" };
  const date = d.toLocaleDateString(langMap[locale], { day: "2-digit", month: "short", year: "numeric" });
  const time = d.toLocaleTimeString(langMap[locale], { hour: "2-digit", minute: "2-digit" });
  return { date, time };
}

export default function TopExpertsCard({ experts, locale = "en", lastCountryUpdate }: { experts: ExpertStat[]; locale?: Locale; lastCountryUpdate?: UpdateLog | null }) {
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

          {lastCountryUpdate && (() => {
            const { date, time } = formatDateTime(lastCountryUpdate.date, locale);
            return (
              <div style={{ marginTop: 8, borderTop: "1px solid var(--border2)", paddingTop: 7, display: "flex", flexDirection: "column", gap: 2 }}>
                <div style={{ fontSize: 9, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700 }}>
                  {t(locale, "lastUpdateBy")}
                </div>
                <div style={{ fontSize: 11, color: "var(--ink2)", fontWeight: 700, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {lastCountryUpdate.fullName ?? lastCountryUpdate.username}
                </div>
                <div style={{ fontSize: 10, color: "var(--ink3)" }}>
                  {date} {t(locale, "atTime")} {time}
                </div>
              </div>
            );
          })()}
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
