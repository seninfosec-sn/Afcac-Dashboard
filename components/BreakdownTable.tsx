"use client";
import { useState } from "react";
import type { CountryRow } from "@/lib/types";

type SortKey = keyof CountryRow;

export default function BreakdownTable({ countries }: { countries: CountryRow[] }) {
  const [sorted, setSorted] = useState<CountryRow[]>(countries);
  const [sortCol, setSortCol] = useState(-1);
  const [sortAsc, setSortAsc] = useState(true);

  const cols: { label: string; key: SortKey }[] = [
    { label: "Country",        key: "country" },
    { label: "Total Actions",  key: "actions" },
    { label: "% Completed",    key: "completed" },
    { label: "% In Progress",  key: "inprogress" },
    { label: "Budget (USD)",   key: "budget" },
    { label: "Responsible",    key: "entity" },
  ];

  function handleSort(idx: number, key: SortKey) {
    const asc = sortCol === idx ? !sortAsc : true;
    setSortCol(idx); setSortAsc(asc);
    setSorted([...sorted].sort((a, b) => {
      const av = a[key], bv = b[key];
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    }));
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Action Plan Country Breakdown</span>
        <span className="card-head-badge">{sorted.length} Countries</span>
      </div>
      <div className="tbl-scroll" style={{ maxHeight: "none" }}>
        <table className="dtable">
          <thead>
            <tr>
              {cols.map((c, i) => (
                <th key={c.key} onClick={() => handleSort(i, c.key)}>
                  {c.label} {sortCol === i ? (sortAsc ? "↑" : "↓") : ""}
                </th>
              ))}
              <th>Progress Visual</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr key={row.country}>
                <td style={{ fontWeight: 600 }}>{row.country}</td>
                <td style={{ textAlign: "center" }}>{row.actions}</td>
                <td>
                  <span style={{ color: "var(--c-complete)", fontWeight: 700 }}>{row.completed}%</span>
                </td>
                <td>
                  <span style={{ color: "#b07800", fontWeight: 700 }}>{row.inprogress}%</span>
                </td>
                <td style={{ fontWeight: 600 }}>${row.budget.toLocaleString()}</td>
                <td style={{ color: "var(--ink3)", fontSize: 11 }}>{row.entity}</td>
                <td style={{ minWidth: 120 }}>
                  <div style={{ display: "flex", gap: 2, height: 10 }}>
                    {[
                      { pct: row.completed,  color: "var(--c-complete)" },
                      { pct: row.inprogress, color: "var(--c-progress)" },
                      { pct: row.delayed,    color: "var(--c-delayed)" },
                      { pct: row.onhold,     color: "var(--c-onhold)" },
                      { pct: row.notstarted, color: "var(--c-nostart)" },
                    ].map((s, i) =>
                      s.pct > 0 ? (
                        <div
                          key={i}
                          style={{ width: `${s.pct}%`, background: s.color, borderRadius: 2, minWidth: 3 }}
                          title={`${s.pct}%`}
                        />
                      ) : null
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
