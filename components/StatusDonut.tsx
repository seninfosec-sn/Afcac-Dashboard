"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { KpiData } from "@/lib/types";
import ExportButtons from "@/components/ExportButtons";
import { exportExcel, exportPdf } from "@/lib/exportUtils";

export default function StatusDonut({ kpis }: { kpis: KpiData }) {
  const data = [
    { name: "Completed",   value: kpis.pctCompleted,  color: "#2d9d5e" },
    { name: "In Progress", value: kpis.pctInProgress, color: "#f0a500" },
    { name: "Delayed",     value: kpis.pctDelayed,    color: "#e07b39" },
    { name: "On Hold",     value: kpis.pctOnHold,     color: "#c0392b" },
    { name: "Not Started", value: kpis.pctNotStarted, color: "#95a5a6" },
  ];

  async function handleExcel() {
    const headers = ["Status", "Percentage (%)", "Actions Count"];
    const rows = data.map(d => [d.name, d.value, Math.round(d.value * kpis.totalActions / 100)]);
    rows.push(["TOTAL", 100, kpis.totalActions]);
    await exportExcel("AFCAC_Status_Distribution", "Status Distribution", headers, rows);
  }

  async function handlePdf() {
    const headers = ["Status", "Percentage (%)", "Actions Count"];
    const rows = data.map(d => [d.name, `${d.value}%`, Math.round(d.value * kpis.totalActions / 100)]);
    rows.push(["TOTAL", "100%", kpis.totalActions]);
    await exportPdf("AFCAC_Status_Distribution", "Status Distribution", headers, rows, `Total: ${kpis.totalActions} actions`);
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">Status Distribution</span>
        <span className="card-head-badge">{kpis.totalActions} Actions</span>
        <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />
      </div>
      <div className="card-body">
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <PieChart width={200} height={200}>
            <Pie data={data} cx={95} cy={95} innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} />
          </PieChart>
        </div>
        <div className="legend-list">
          {data.map((s) => (
            <div key={s.name} className="legend-item">
              <div className="legend-swatch" style={{ background: s.color }} />
              <span className="legend-name">{s.name}</span>
              <span className="legend-pct" style={{ color: s.color }}>{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
