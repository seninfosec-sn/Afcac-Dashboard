import type { ExpertStat } from "@/lib/types";

const MEDALS = ["🥇", "🥈", "🥉"];

function timeAgo(isoDate: string): string {
  const diff = Date.now() - new Date(isoDate).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours   = Math.floor(diff / 3600000);
  const days    = Math.floor(diff / 86400000);
  if (minutes < 60)  return `${minutes}m ago`;
  if (hours   < 24)  return `${hours}h ago`;
  return `${days}d ago`;
}

export default function TopExpertsCard({ experts }: { experts: ExpertStat[] }) {
  return (
    <div
      className="kpi-card k-gold"
      style={{ animationDelay: ".15s", gridColumn: "span 2", cursor: "default" }}
    >
      <div className="kpi-icon-wrap" style={{ background: "#fff8e6" }}>🏆</div>
      <div
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink3)",
          marginBottom: 8,
        }}
      >
        Top Experts — Mises à Jour
      </div>

      {experts.length === 0 ? (
        <div style={{ fontSize: 11, color: "var(--ink3)", fontStyle: "italic" }}>
          Aucune mise à jour enregistrée
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {experts.map((e, i) => (
            <div
              key={e.username}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 10px",
                background: i === 0 ? "rgba(240,165,0,0.08)" : "var(--snow)",
                borderRadius: 6,
                border: i === 0 ? "1px solid rgba(240,165,0,0.25)" : "1px solid var(--border2)",
              }}
            >
              <span style={{ fontSize: 16, flexShrink: 0 }}>{MEDALS[i] ?? "🎖"}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: "var(--ink)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {e.username}
                </div>
                <div style={{ fontSize: 10, color: "var(--ink3)" }}>
                  {e.avgTargetsPerUpdate} cibles/màj · {timeAgo(e.lastUpdate)}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 18,
                  color: i === 0 ? "var(--gold)" : "var(--ink2)",
                  flexShrink: 0,
                }}
              >
                {e.totalUpdates}
                <span style={{ fontSize: 9, fontWeight: 400, color: "var(--ink3)", marginLeft: 2 }}>
                  màj
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
