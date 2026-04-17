"use client";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import type { KpiData } from "@/lib/types";
import ExportButtons from "@/components/ExportButtons";
import { exportExcel, exportPdf } from "@/lib/exportUtils";
import { useLanguage } from "./LanguageProvider";

export default function StatusDonut({ kpis, isAdmin }: { kpis: KpiData; isAdmin?: boolean }) {
  const { t } = useLanguage();

  const data = [
    { name: t("completed"),   value: kpis.pctCompleted,  color: "#2d9d5e" },
    { name: t("inProgress"),  value: kpis.pctInProgress, color: "#f0a500" },
    { name: t("delayed"),     value: kpis.pctDelayed,    color: "#e07b39" },
    { name: t("onHold"),      value: kpis.pctOnHold,     color: "#c0392b" },
    { name: t("notStarted"),  value: kpis.pctNotStarted, color: "#95a5a6" },
  ];

  async function handleExcel() {
    const headers = [t("colStatus"), `${t("pctCompleted").replace("% ", "")} (%)`, t("totalActions")];
    const rows = data.map(d => [d.name, d.value, Math.round(d.value * kpis.totalActions / 100)]);
    rows.push(["TOTAL", 100, kpis.totalActions]);
    await exportExcel("AFCAC_Status_Distribution", t("statusDistTitle"), headers, rows);
  }

  async function handlePdf() {
    const headers = [t("colStatus"), `${t("pctCompleted").replace("% ", "")} (%)`, t("totalActions")];
    const rows = data.map(d => [d.name, `${d.value}%`, Math.round(d.value * kpis.totalActions / 100)]);
    rows.push(["TOTAL", "100%", kpis.totalActions]);
    await exportPdf("AFCAC_Status_Distribution", t("statusDistTitle"), headers, rows, `Total: ${kpis.totalActions} ${t("actions")}`);
  }

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">{t("statusDistTitle")}</span>
        <span className="card-head-badge">{kpis.totalActions} {t("actions")}</span>
        {isAdmin && <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />}
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
