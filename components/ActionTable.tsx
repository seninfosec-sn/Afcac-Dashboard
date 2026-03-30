"use client";
import { useState } from "react";
import type { ActionRow } from "@/lib/types";

const SC: Record<string, { label: string; cls: string }> = {
  completed:  { label: "Completed",   cls: "s-completed" },
  inprogress: { label: "In Progress", cls: "s-inprogress" },
  delayed:    { label: "Delayed",     cls: "s-delayed" },
  onhold:     { label: "On Hold",     cls: "s-onhold" },
  notstarted: { label: "Not Started", cls: "s-notstarted" },
};

export default function ActionTable({ actions }: { actions: ActionRow[] }) {
  const [sorted, setSorted] = useState<ActionRow[]>(actions);
  const [sortCol, setSortCol] = useState(-1);
  const [sortAsc, setSortAsc] = useState(true);

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
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600 }}>{row.country}</td>
                  <td style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}>{row.action}</td>
                  <td style={{ color: "var(--ink2)" }}>{row.section}</td>
                  <td><span className={`badge ${s.cls}`}>{s.label}</span></td>
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
