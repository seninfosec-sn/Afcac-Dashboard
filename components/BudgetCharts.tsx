"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { CountryRow, KpiData } from "@/lib/types";

const SECTION_DATA = [
  { name: "Strategic Alignment",    value: 30, color: "#0d3b2b" },
  { name: "Safety Oversight",       value: 28, color: "#2d7d5f" },
  { name: "Infrastructure & Innov", value: 12, color: "#f0a500" },
  { name: "Capacity Building",      value: 26, color: "#52b788" },
  { name: "Legislative & Reg. Fwk", value: 12, color: "#95a5a6" },
];

function BudgetDonut({ total }: { total: string }) {
  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Budget Allocation by Section</span>
        <span className="card-head-badge">{total}</span>
      </div>
      <div className="card-body">
        <div className="donut-wrap">
          <div style={{ position: "relative", width: 160, height: 160, flexShrink: 0 }}>
            <PieChart width={160} height={160}>
              <Pie
                data={SECTION_DATA}
                cx={75} cy={75}
                innerRadius={48} outerRadius={72}
                dataKey="value" paddingAngle={2}
              >
                {SECTION_DATA.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${v}%`} />
            </PieChart>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 800, color: "var(--ink)" }}>{total}</div>
              <div style={{ fontSize: 9, color: "var(--ink3)" }}>Total</div>
            </div>
          </div>
          <div className="legend-list">
            {SECTION_DATA.map((s) => (
              <div key={s.name} className="legend-item">
                <div className="legend-swatch" style={{ background: s.color }} />
                <span className="legend-name">{s.name}</span>
                <span className="legend-pct" style={{ color: s.color }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetByCountry({ countries }: { countries: CountryRow[] }) {
  const top5 = [...countries].sort((a, b) => b.budget - a.budget).slice(0, 5);
  const max = top5[0]?.budget ?? 1;

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Budget Allocation by Country</span>
        <span className="card-head-badge">Top 5</span>
      </div>
      <div className="card-body">
        <div className="hbar-list">
          {top5.map((c) => (
            <div key={c.country} className="hbar-item">
              <div className="hbar-label">
                <span>{c.country}</span>
                <span style={{ fontWeight: 700 }}>${(c.budget / 1000).toFixed(0)}K</span>
              </div>
              <div className="hbar-track">
                <div className="hbar-fill" style={{ width: `${(c.budget / max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid var(--border2)", fontSize: 10, color: "var(--ink3)", display: "flex", gap: 14 }}>
          <span>🟢 Allocated</span>
          <span>🟡 Disbursed: 62%</span>
        </div>
      </div>
    </div>
  );
}

export default function BudgetCharts({ countries, kpis }: { countries: CountryRow[]; kpis: KpiData }) {
  const total = kpis.totalBudget >= 1_000_000
    ? `$${(kpis.totalBudget / 1_000_000).toFixed(1)}M`
    : `$${kpis.totalBudget.toLocaleString()}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="row-budget">
        <BudgetDonut total={total} />
        <BudgetByCountry countries={countries} />
      </div>
    </div>
  );
}
