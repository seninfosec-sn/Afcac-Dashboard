import type { ExpertStat } from "@/lib/types";

const MEDALS = ["🥇", "🥈", "🥉"];

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (hours < 24)  return `${hours}h ago`;
  return `${days}j ago`;
}

export default function TopExpertsCard({ experts }: { experts: ExpertStat[] }) {
  const top = experts[0] ?? null;

  return (
    <div className="kpi-card k-gold" style={{ animationDelay: ".35s", cursor: "default" }}>
      <div className="kpi-icon-wrap" style={{ background: "#fff8e6" }}>🏆</div>

      {/* Top #1 — affichage principal */}
      {top ? (
        <>
          <div className="kpi-val" style={{ color: "var(--gold)", fontSize: 20, lineHeight: 1.1 }}>
            {top.username}
          </div>
          <div className="kpi-label">Top Expert — Mises à Jour</div>
          <div className="kpi-trend trend-up">
            ▲ {top.totalUpdates} màj · {timeAgo(top.lastUpdate)}
          </div>

          {/* #2 et #3 en compact */}
          {experts.length > 1 && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 3, borderTop: "1px solid var(--border2)", paddingTop: 7 }}>
              {experts.slice(1).map((e, i) => (
                <div key={e.username} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10 }}>
                  <span style={{ fontSize: 11 }}>{MEDALS[i + 1]}</span>
                  <span style={{ flex: 1, color: "var(--ink2)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {e.username}
                  </span>
                  <span style={{ color: "var(--ink3)", flexShrink: 0 }}>{e.totalUpdates} màj</span>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="kpi-val" style={{ color: "var(--ink3)", fontSize: 14 }}>—</div>
          <div className="kpi-label">Top Expert — Mises à Jour</div>
          <div className="kpi-trend trend-flat">● Aucune mise à jour</div>
        </>
      )}
    </div>
  );
}
