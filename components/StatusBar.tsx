import type { KpiData } from "@/lib/types";

export default function StatusBar({ kpis }: { kpis: KpiData }) {
  const segs = [
    { pct: kpis.pctCompleted,   color: "var(--c-complete)", label: "Completed",   hex: "#2d9d5e" },
    { pct: kpis.pctInProgress,  color: "var(--c-progress)", label: "In Progress", hex: "#f0a500" },
    { pct: kpis.pctDelayed,     color: "var(--c-delayed)",  label: "Delayed",     hex: "#e07b39" },
    { pct: kpis.pctOnHold,      color: "var(--c-onhold)",   label: "On Hold",     hex: "#c0392b" },
    { pct: kpis.pctNotStarted,  color: "var(--c-nostart)",  label: "Not Started", hex: "#95a5a6" },
  ];

  // Gantt phases — each status maps to a timeline phase across 4 quarters
  const ganttPhases = [
    { label: "Q1 2024", start: 0,  end: 25  },
    { label: "Q2 2024", start: 25, end: 50  },
    { label: "Q3 2024", start: 50, end: 75  },
    { label: "Q4 2024", start: 75, end: 100 },
  ];

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-head">
        <span className="card-head-title">Continental Status Distribution</span>
        <span className="card-head-badge">{kpis.totalActions} Actions</span>
      </div>
      <div className="card-body" style={{ flex: 1 }}>
        {/* Stacked bar */}
        <div className="stack-bar">
          {segs.map((s) => (
            <div key={s.label} className="stack-seg"
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

        {/* Detailed bars */}
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

        {/* Gantt Chart */}
        <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border2)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 10 }}>
            Project Gantt — Status Timeline
          </div>

          {/* Quarter headers */}
          <div style={{ display: "flex", marginBottom: 6, marginLeft: 90 }}>
            {ganttPhases.map((q) => (
              <div key={q.label} style={{ flex: 1, fontSize: 9, color: "var(--ink3)", fontWeight: 700, textAlign: "center", letterSpacing: ".04em" }}>
                {q.label}
              </div>
            ))}
          </div>

          {/* Gantt rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {segs.map((s, si) => {
              // Each status has a bar that spans proportionally based on its pct
              // Bar starts at cumulative offset of previous statuses
              const cumStart = segs.slice(0, si).reduce((acc, x) => acc + x.pct, 0);
              const barLeft = cumStart;
              const barWidth = s.pct;

              return (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  {/* Row label */}
                  <div style={{ width: 88, fontSize: 10, color: "var(--ink2)", fontWeight: 600, flexShrink: 0, paddingRight: 8, textAlign: "right" }}>
                    {s.label}
                  </div>
                  {/* Track */}
                  <div style={{ flex: 1, height: 18, background: "var(--surface2)", borderRadius: 3, position: "relative", overflow: "hidden" }}>
                    {/* Grid lines */}
                    {[25, 50, 75].map((x) => (
                      <div key={x} style={{ position: "absolute", left: `${x}%`, top: 0, bottom: 0, width: 1, background: "var(--border2)", zIndex: 0 }} />
                    ))}
                    {/* Bar */}
                    {barWidth > 0 && (
                      <div style={{
                        position: "absolute",
                        left: `${barLeft}%`,
                        width: `${barWidth}%`,
                        top: 2, bottom: 2,
                        background: s.hex,
                        borderRadius: 2,
                        zIndex: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {barWidth >= 8 && (
                          <span style={{ fontSize: 9, color: "#fff", fontWeight: 700 }}>{s.pct}%</span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* X-axis ticks */}
          <div style={{ display: "flex", marginTop: 4, marginLeft: 90 }}>
            {[0, 25, 50, 75, 100].map((v) => (
              <div key={v} style={{ position: "relative", flex: v === 100 ? 0 : 1 }}>
                <span style={{ fontSize: 8, color: "var(--ink3)", position: "absolute", transform: "translateX(-50%)" }}>{v}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid var(--border2)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
            À propos de cet indicateur
          </div>
          <p style={{ fontSize: 11, color: "var(--ink2)", lineHeight: 1.6, margin: 0 }}>
            Ce graphique représente la <strong>répartition globale des statuts</strong> de l'ensemble des actions engagées dans le cadre des <strong>Revised Abuja Safety Targets</strong> (RAST) de l'AFCAC. Chaque segment correspond à une catégorie de progression :
          </p>
          <ul style={{ fontSize: 11, color: "var(--ink2)", lineHeight: 1.7, margin: "8px 0 0 0", paddingLeft: 16 }}>
            <li><strong style={{ color: "var(--c-complete)" }}>Completed</strong> — Cible pleinement atteinte (100%)</li>
            <li><strong style={{ color: "var(--c-progress)" }}>In Progress</strong> — Mise en œuvre en cours</li>
            <li><strong style={{ color: "var(--c-delayed)" }}>Delayed</strong> — Retard par rapport au calendrier prévu</li>
            <li><strong style={{ color: "var(--c-onhold)" }}>On Hold</strong> — Action suspendue temporairement</li>
            <li><strong style={{ color: "var(--c-nostart)" }}>Not Started</strong> — Action non encore initiée</li>
          </ul>
          <p style={{ fontSize: 10, color: "var(--ink3)", marginTop: 10, marginBottom: 0, fontStyle: "italic" }}>
            Source : AFCAC Safety Unit via Countries Focal Point · Données mises à jour par les points focaux nationaux.
          </p>
        </div>
      </div>
    </div>
  );
}
