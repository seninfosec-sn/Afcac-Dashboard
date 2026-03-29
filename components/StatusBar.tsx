import type { KpiData } from "@/lib/types";

export default function StatusBar({ kpis }: { kpis: KpiData }) {
  const segs = [
    { pct: kpis.pctCompleted,   color: "var(--c-complete)", label: "Completed" },
    { pct: kpis.pctInProgress,  color: "var(--c-progress)", label: "In Progress" },
    { pct: kpis.pctDelayed,     color: "var(--c-delayed)",  label: "Delayed" },
    { pct: kpis.pctOnHold,      color: "var(--c-onhold)",   label: "On Hold" },
    { pct: kpis.pctNotStarted,  color: "var(--c-nostart)",  label: "Not Started" },
  ];

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Global Status Distribution</span>
        <span className="card-head-badge">{kpis.totalActions} Actions</span>
      </div>
      <div className="card-body">
        <div className="stack-bar">
          {segs.map((s) => (
            <div
              key={s.label}
              className="stack-seg"
              style={{ width: `${s.pct}%`, background: s.color }}
              title={`${s.label} ${s.pct}%`}
            />
          ))}
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 6 }}>
          {segs.map((s) => (
            <span key={s.label} style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: s.color, display: "inline-block" }} />
              {s.label} {s.pct}%
            </span>
          ))}
        </div>
        {/* Mini detail bars */}
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border2)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
            Detailed Distribution
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {segs.map((s) => (
              <div key={s.label}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}>
                  <span>{s.label}</span>
                  <span style={{ color: s.color, fontWeight: 700 }}>{s.pct}%</span>
                </div>
                <div className="mini-track">
                  <div className="mini-fill" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
