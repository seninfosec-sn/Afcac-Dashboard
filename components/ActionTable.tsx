"use client";
import { useState } from "react";
import type { ActionRow, TargetRow } from "@/lib/types";

const SC: Record<string, { label: string; cls: string }> = {
  completed:  { label: "Completed",   cls: "s-completed" },
  inprogress: { label: "In Progress", cls: "s-inprogress" },
  delayed:    { label: "Delayed",     cls: "s-delayed" },
  onhold:     { label: "On Hold",     cls: "s-onhold" },
  notstarted: { label: "Not Started", cls: "s-notstarted" },
};

const PCT_COLOR: Record<number, string> = {
  0: "#95a5a6", 25: "#e07b39", 50: "#f0a500", 75: "#52b788", 100: "#2d9d5e",
};

export default function ActionTable({
  actions,
  targets = [],
}: {
  actions: ActionRow[];
  targets?: TargetRow[];
}) {
  const [sorted, setSorted] = useState<ActionRow[]>(actions);
  const [sortCol, setSortCol] = useState(-1);
  const [sortAsc, setSortAsc] = useState(true);
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const cols: { label: string; key: keyof ActionRow }[] = [
    { label: "Country",   key: "country" },
    { label: "Target ID", key: "action" },
    { label: "Section",   key: "section" },
    { label: "Status",    key: "status" },
    { label: "Start",     key: "start" },
    { label: "End",       key: "end" },
  ];

  function handleSort(idx: number, key: keyof ActionRow) {
    const asc = sortCol === idx ? !sortAsc : true;
    setSortCol(idx);
    setSortAsc(asc);
    setSorted([...sorted].sort((a, b) => {
      const av = a[key], bv = b[key];
      if (av < bv) return asc ? -1 : 1;
      if (av > bv) return asc ? 1 : -1;
      return 0;
    }));
  }

  function toggleExpand(i: number) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="card" style={{ height: "fit-content" }}>
      <div className="card-head">
        <span className="card-head-title">Action Plan — Detail</span>
        <span className="card-head-badge">{sorted.length} rows</span>
      </div>
      <div className="tbl-scroll">
        <table className="dtable">
          <thead>
            <tr>
              <th style={{ width: 32 }} />
              {cols.map((c, i) => (
                <th key={c.key} onClick={() => handleSort(i, c.key)}>
                  {c.label} {sortCol === i ? (sortAsc ? "↑" : "↓") : ""}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, i) => {
              const s = SC[row.status] ?? SC.notstarted;
              const isOpen = expanded.has(i);
              return (
                <>
                  <tr key={`row-${i}`}>
                    <td style={{ textAlign: "center", padding: "0 4px" }}>
                      <button
                        onClick={() => toggleExpand(i)}
                        style={{
                          width: 22, height: 22, borderRadius: 4,
                          border: "1.5px solid var(--border)",
                          background: isOpen ? "var(--navy)" : "var(--surface2)",
                          color: isOpen ? "#fff" : "var(--ink2)",
                          cursor: "pointer", fontSize: 14, lineHeight: 1,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 700, transition: "all .15s",
                        }}
                        title={isOpen ? "Masquer les targets" : "Voir les 15 targets"}
                      >
                        {isOpen ? "−" : "+"}
                      </button>
                    </td>
                    <td style={{ fontWeight: 600 }}>{row.country}</td>
                    <td style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{row.action}</td>
                    <td style={{ color: "var(--ink2)" }}>{row.section}</td>
                    <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                    <td>{row.start}</td>
                    <td>{row.end}</td>
                  </tr>

                  {isOpen && (
                    <tr key={`expand-${i}`}>
                      <td colSpan={7} style={{ padding: 0, background: "var(--surface2)", borderBottom: "2px solid var(--border)" }}>
                        <div style={{ padding: "12px 16px" }}>
                          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
                            Abuja Safety Targets — {row.country}
                          </div>
                          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                            <thead>
                              <tr style={{ background: "var(--surface3, #eef0f3)" }}>
                                <th style={{ padding: "5px 8px", textAlign: "left", fontWeight: 700, color: "var(--ink2)", width: 60 }}>ID</th>
                                <th style={{ padding: "5px 8px", textAlign: "left", fontWeight: 700, color: "var(--ink2)" }}>Target</th>
                                <th style={{ padding: "5px 8px", textAlign: "left", fontWeight: 700, color: "var(--ink2)", width: 80 }}>Group</th>
                                <th style={{ padding: "5px 8px", textAlign: "center", fontWeight: 700, color: "var(--ink2)", width: 60 }}>Progress</th>
                                <th style={{ padding: "5px 8px", textAlign: "left", fontWeight: 700, color: "var(--ink2)", width: 90 }}>Status</th>
                                <th style={{ padding: "5px 8px", textAlign: "left", fontWeight: 700, color: "var(--ink2)", width: 80 }}>Deadline</th>
                              </tr>
                            </thead>
                            <tbody>
                              {targets.map((t, ti) => {
                                const pctColor = PCT_COLOR[t.pct] ?? PCT_COLOR[0];
                                const ts = SC[t.status] ?? SC.notstarted;
                                return (
                                  <tr key={ti} style={{ borderTop: "1px solid var(--border2, #e8eaed)" }}>
                                    <td style={{ padding: "5px 8px", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, color: "var(--navy)" }}>{t.id}</td>
                                    <td style={{ padding: "5px 8px", color: "var(--ink1)" }}>{t.title}</td>
                                    <td style={{ padding: "5px 8px", color: "var(--ink3)", fontSize: 10 }}>{t.group}</td>
                                    <td style={{ padding: "5px 8px", textAlign: "center" }}>
                                      <div style={{ display: "flex", alignItems: "center", gap: 4, justifyContent: "center" }}>
                                        <div style={{ width: 40, height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden" }}>
                                          <div style={{ width: `${t.pct}%`, height: "100%", background: pctColor, borderRadius: 3 }} />
                                        </div>
                                        <span style={{ color: pctColor, fontWeight: 700, minWidth: 28 }}>{t.pct}%</span>
                                      </div>
                                    </td>
                                    <td style={{ padding: "5px 8px" }}><span className={`badge ${ts.cls}`}>{ts.label}</span></td>
                                    <td style={{ padding: "5px 8px", color: "var(--ink3)" }}>{t.deadline}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
