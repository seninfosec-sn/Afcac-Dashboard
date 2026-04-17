"use client";
import type { KpiData } from "@/lib/types";
import ExportButtons from "@/components/ExportButtons";
import { exportExcel, exportPdf } from "@/lib/exportUtils";
import { useLanguage } from "./LanguageProvider";

export default function StatusBar({ kpis, isAdmin }: { kpis: KpiData; isAdmin?: boolean }) {
  const { t } = useLanguage();

  const segs = [
    { pct: kpis.pctCompleted,   color: "var(--c-complete)", label: t("completed"),   hex: "#2d9d5e" },
    { pct: kpis.pctInProgress,  color: "var(--c-progress)", label: t("inProgress"),  hex: "#f0a500" },
    { pct: kpis.pctDelayed,     color: "var(--c-delayed)",  label: t("delayed"),     hex: "#e07b39" },
    { pct: kpis.pctOnHold,      color: "var(--c-onhold)",   label: t("onHold"),      hex: "#c0392b" },
    { pct: kpis.pctNotStarted,  color: "var(--c-nostart)",  label: t("notStarted"),  hex: "#95a5a6" },
  ];

  async function handleExcel() {
    const headers = [t("colStatus"), "(%)", t("totalActions")];
    const rows = segs.map(s => [s.label, s.pct, Math.round(s.pct * kpis.totalActions / 100)]);
    rows.push(["TOTAL", 100, kpis.totalActions] as (string | number)[]);
    await exportExcel("AFCAC_Continental_Status", t("statusDistribution"), headers, rows);
  }

  async function handlePdf() {
    const headers = [t("colStatus"), "(%)", t("totalActions")];
    const rows = segs.map(s => [s.label, `${s.pct}%`, Math.round(s.pct * kpis.totalActions / 100)]);
    rows.push(["TOTAL", "100%", kpis.totalActions] as (string | number)[]);
    await exportPdf("AFCAC_Continental_Status", t("statusDistribution"), headers, rows, `Total: ${kpis.totalActions} ${t("actions")}`);
  }

  return (
    <div className="card" style={{ display: "flex", flexDirection: "column" }}>
      <div className="card-head">
        <span className="card-head-title">{t("statusDistribution")}</span>
        <span className="card-head-badge">{kpis.totalActions} {t("actions")}</span>
        {isAdmin && <ExportButtons onExcel={handleExcel} onPdf={handlePdf} />}
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
            {t("detailedDist")}
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

        {/* Description */}
        <div style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid var(--border2)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 8 }}>
            {t("aboutIndicator")}
          </div>
          <p style={{ fontSize: 11, color: "var(--ink2)", lineHeight: 1.6, margin: 0 }}>
            {t("statusBarDesc")}
          </p>
          <ul style={{ fontSize: 11, color: "var(--ink2)", lineHeight: 1.7, margin: "8px 0 0 0", paddingLeft: 16 }}>
            <li><strong style={{ color: "var(--c-complete)" }}>{t("completed")}</strong> {t("completedDesc")}</li>
            <li><strong style={{ color: "var(--c-progress)" }}>{t("inProgress")}</strong> {t("inProgressDesc")}</li>
            <li><strong style={{ color: "var(--c-delayed)" }}>{t("delayed")}</strong> {t("delayedDesc")}</li>
            <li><strong style={{ color: "var(--c-onhold)" }}>{t("onHold")}</strong> {t("onHoldDesc")}</li>
            <li><strong style={{ color: "var(--c-nostart)" }}>{t("notStarted")}</strong> {t("notStartedDesc")}</li>
          </ul>
          <p style={{ fontSize: 10, color: "var(--ink3)", marginTop: 10, marginBottom: 0, fontStyle: "italic" }}>
            {t("statusSource")}
          </p>
        </div>

        {/* Bar Chart */}
        <div style={{ marginTop: 24, paddingTop: 14, borderTop: "1px solid var(--border2)" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: "var(--ink3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: 14 }}>
            {t("statusDistribution")}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 130, position: "relative", paddingLeft: 28 }}>
            {[0, 25, 50, 75, 100].map((v) => (
              <div key={v} style={{
                position: "absolute", left: 28, right: 0,
                bottom: `${v}%`, height: 1,
                background: v === 0 ? "var(--border)" : "var(--border2)",
                zIndex: 0,
              }}>
                <span style={{
                  position: "absolute", left: -26, top: -6,
                  fontSize: 8, color: "var(--ink3)", fontWeight: 600,
                }}>{v}%</span>
              </div>
            ))}

            {segs.map((s) => (
              <div key={s.label} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", position: "relative", zIndex: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: s.hex, marginBottom: 3 }}>
                  {s.pct}%
                </span>
                <div style={{
                  width: "60%", height: `${s.pct}%`, minHeight: s.pct > 0 ? 4 : 0,
                  background: s.hex, borderRadius: "3px 3px 0 0",
                  transition: "height .4s ease",
                }} />
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10, paddingLeft: 28, marginTop: 6 }}>
            {segs.map((s) => (
              <div key={s.label} style={{ flex: 1, textAlign: "center", fontSize: 9, color: "var(--ink2)", fontWeight: 600, lineHeight: 1.3 }}>
                {s.label}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
