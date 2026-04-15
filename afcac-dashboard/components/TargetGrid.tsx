import type { TargetRow } from "@/lib/types";

/* ── Mapping : numéro de target → nom officiel RAST ── */
const TARGET_NAMES: Record<number, string> = {
  1:  "Safety Trend Targets",
  2:  "Safety Oversight Enhancement",
  3:  "State Safety Programme (SSP)",
  4:  "Assistance & Regional Safety Plans",
  5:  "Industry Safety Standards",
  6:  "Air Navigation Infrastructure",
  7:  "Aerodrome & ANS Gap Analysis",
  8:  "Aerodrome Certification",
  9:  "Search and Rescue (SAR)",
  10: "AIS to AIM Transition",
  11: "Performance-Based Navigation (PBN)",
  12: "Seamless Air Navigation Services",
  13: "ASBU Implementation",
  14: "CO₂ Emissions Reduction",
  15: "ANSP Peer Review & SMS Maturity",
};

/* ── Couleur selon score ── */
function barColor(pct: number): string {
  if (pct >= 100) return "var(--c-complete)";
  if (pct >= 75)  return "var(--mint)";
  if (pct >= 50)  return "var(--gold)";
  if (pct >= 25)  return "var(--amber)";
  return "var(--c-nostart)";
}

function statusLabel(pct: number): { label: string; cls: string } {
  if (pct >= 100) return { label: "Completed",   cls: "s-completed" };
  if (pct >= 75)  return { label: "In Progress", cls: "s-inprogress" };
  if (pct >= 50)  return { label: "In Progress", cls: "s-inprogress" };
  if (pct >= 25)  return { label: "Delayed",     cls: "s-delayed" };
  return           { label: "Not Started",  cls: "s-notstarted" };
}

/* ── Extrait le numéro de groupe depuis l'ID (T1.1 → 1, T13 → 13) ── */
function groupNum(id: string): number {
  return parseInt(id.replace(/^T/, "").split(".")[0], 10);
}

export default function TargetGrid({ targets }: { targets: TargetRow[] }) {
  /* Regrouper les sous-targets par numéro de target principal */
  const grouped = targets.reduce<Record<number, TargetRow[]>>((acc, t) => {
    const n = groupNum(t.id);
    if (!acc[n]) acc[n] = [];
    acc[n].push(t);
    return acc;
  }, {});

  /* Calculer le score continental moyen par groupe, trier 1 → 15 */
  const rows = Object.entries(grouped)
    .map(([n, ts]) => {
      const num    = Number(n);
      const avgPct = Math.round(ts.reduce((s, t) => s + t.pct, 0) / ts.length);
      const deadlines = [...new Set(ts.map(t => t.deadline))].join(" / ");
      return { num, name: TARGET_NAMES[num] ?? ts[0].group, avgPct, count: ts.length, deadlines };
    })
    .sort((a, b) => a.num - b.num);

  /* Score global continent (moyenne des 15 groupes) */
  const globalAvg = Math.round(rows.reduce((s, r) => s + r.avgPct, 0) / rows.length);

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">AFCAC / Abuja Safety Targets — Achievement Progress</span>
        <span className="card-head-badge">Continental Score · {globalAvg}%</span>
      </div>

      <div className="card-body">
        {/* ── En-tête colonnes ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "28px 1fr 180px 56px 80px",
          gap: 8, padding: "0 4px 8px",
          borderBottom: "1px solid var(--border2)",
          marginBottom: 6,
        }}>
          {["#", "Target", "Deadline", "Sub", "Score"].map(h => (
            <div key={h} style={{ fontSize: 9, fontWeight: 700, color: "var(--ink3)", textTransform: "uppercase", letterSpacing: ".08em" }}>
              {h}
            </div>
          ))}
        </div>

        {/* ── Lignes ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          {rows.map(r => {
            const color = barColor(r.avgPct);
            const { label, cls } = statusLabel(r.avgPct);

            return (
              <div
                key={r.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "28px 1fr 180px 56px 80px",
                  gap: 8, alignItems: "center",
                  padding: "7px 4px",
                  borderRadius: 6,
                  background: "var(--snow)",
                  border: "1px solid var(--border2)",
                  transition: "box-shadow .15s",
                }}
              >
                {/* Numéro */}
                <div style={{
                  width: 24, height: 24, borderRadius: 5,
                  background: color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11, fontWeight: 800,
                }}>
                  {r.num}
                </div>

                {/* Nom + barre */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "var(--ink)", marginBottom: 4, lineHeight: 1.3 }}>
                    {r.name}
                  </div>
                  <div style={{ height: 6, background: "var(--border2)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${r.avgPct}%`,
                      background: color, borderRadius: 3,
                      transition: "width .5s ease",
                    }} />
                  </div>
                </div>

                {/* Deadline */}
                <div style={{ fontSize: 10, color: "var(--ink3)" }}>
                  🗓 {r.deadlines}
                </div>

                {/* Nb sous-targets */}
                <div style={{ fontSize: 10, color: "var(--ink3)", textAlign: "center" }}>
                  {r.count} target{r.count > 1 ? "s" : ""}
                </div>

                {/* Score + badge */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3 }}>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color, lineHeight: 1 }}>
                    {r.avgPct}%
                  </span>
                  <span className={`badge ${cls}`} style={{ fontSize: 9 }}>{label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Score global ── */}
        <div style={{
          marginTop: 16, padding: "12px 16px",
          background: "linear-gradient(135deg, var(--forest) 0%, var(--forest2) 100%)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", textTransform: "uppercase", letterSpacing: ".1em", fontWeight: 700, marginBottom: 2 }}>
              Continental Average — All 15 Targets
            </div>
            <div style={{ height: 8, width: 220, background: "rgba(255,255,255,.15)", borderRadius: 4, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${globalAvg}%`, background: "var(--gold)", borderRadius: 4, transition: "width .5s ease" }} />
            </div>
          </div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 800, color: "var(--gold)" }}>
            {globalAvg}%
          </div>
        </div>
      </div>
    </div>
  );
}
