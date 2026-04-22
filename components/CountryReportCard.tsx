"use client";
import { useState } from "react";
import type { KpiData, ActionRow, CountryRow, TargetRow } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

interface Props {
  kpis: KpiData;
  actions: ActionRow[];
  countries: CountryRow[];
  targets: TargetRow[];
  userCountry?: string | null;
}

export default function CountryReportCard({ kpis, actions, countries, targets, userCountry }: Props) {
  const { t } = useLanguage();
  const [loadingXls, setLoadingXls] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  const today = new Date().toISOString().split("T")[0];
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const slug = userCountry ? userCountry.replace(/ /g, "_") : "Full";
  const reportName = `AFCAC_${slug}_Safety_Report_${today}`;
  const reportTitle = userCountry
    ? `${userCountry} — AFCAC Safety Targets Report`
    : "AFCAC — Full Safety Targets Report";

  async function handleExcel() {
    setLoadingXls(true);
    try {
      const XLSX = await import("xlsx");
      const wb = XLSX.utils.book_new();

      // Sheet 1: KPI Summary
      const wsKpi = XLSX.utils.aoa_to_sheet([
        ["AFCAC — Revised Abuja Safety Targets"],
        [t("reportCountryLabel"), userCountry ?? t("reportAllCountries")],
        [t("reportPeriodLabel"), kpis.reportPeriod],
        [t("lastUpdated"), kpis.lastUpdated],
        [],
        ["Metric", "Value"],
        ["Total Countries", kpis.totalCountries],
        ["Total Actions", kpis.totalActions],
        ["% Completed", `${kpis.pctCompleted}%`],
        ["% In Progress", `${kpis.pctInProgress}%`],
        ["% Delayed", `${kpis.pctDelayed}%`],
        ["% On Hold", `${kpis.pctOnHold}%`],
        ["% Not Started", `${kpis.pctNotStarted}%`],
      ]);
      wsKpi["!cols"] = [{ wch: 30 }, { wch: 30 }];
      XLSX.utils.book_append_sheet(wb, wsKpi, "KPI Summary");

      // Sheet 2: Safety Targets
      const tHeaders = ["ID", "Group", "Title", "Score (%)", "Status", "Deadline"];
      const tRows = targets.map(tgt => [tgt.id, tgt.group, tgt.title, tgt.pct, tgt.status, tgt.deadline]);
      const wsTargets = XLSX.utils.aoa_to_sheet([tHeaders, ...tRows]);
      wsTargets["!cols"] = tHeaders.map((h, ci) => ({
        wch: Math.max(h.length, ...tRows.map(r => String(r[ci] ?? "").length)) + 2,
      }));
      XLSX.utils.book_append_sheet(wb, wsTargets, "Safety Targets");

      // Sheet 3: Action Plan
      const aHeaders = ["Country", "Action", "Section", "Status", "Start", "End", "Duration (wks)", "Budget (USD)"];
      const aRows = actions.map(a => [a.country, a.action, a.section, a.status, a.start, a.end, a.duration, a.budget]);
      const wsActions = XLSX.utils.aoa_to_sheet([aHeaders, ...aRows]);
      wsActions["!cols"] = aHeaders.map((h, ci) => ({
        wch: Math.max(h.length, ...aRows.map(r => String(r[ci] ?? "").length)) + 2,
      }));
      XLSX.utils.book_append_sheet(wb, wsActions, "Action Plan");

      // Sheet 4: Country Breakdown (admin / multi-country only)
      if (countries.length > 1) {
        const cHeaders = ["Country", "Region", "Actions", "Completed %", "In Progress %", "Delayed %", "On Hold %", "Not Started %"];
        const cRows = countries.map(c => [c.country, c.region, c.actions, c.completed, c.inprogress, c.delayed, c.onhold, c.notstarted]);
        const wsCountries = XLSX.utils.aoa_to_sheet([cHeaders, ...cRows]);
        wsCountries["!cols"] = cHeaders.map((h, ci) => ({
          wch: Math.max(h.length, ...cRows.map(r => String(r[ci] ?? "").length)) + 2,
        }));
        XLSX.utils.book_append_sheet(wb, wsCountries, "Country Breakdown");
      }

      XLSX.writeFile(wb, `${reportName}.xlsx`);
    } finally {
      setLoadingXls(false);
    }
  }

  async function handlePdf() {
    setLoadingPdf(true);
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;
      const doc = new jsPDF({ orientation: "portrait" });
      const pageW = doc.internal.pageSize.getWidth();

      function addPageHeader(subtitle: string) {
        doc.setFillColor(26, 43, 60);
        doc.rect(0, 0, pageW, 24, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("AFCAC — Revised Abuja Safety Targets", 14, 10);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 210, 230);
        doc.text(subtitle, 14, 18);
        doc.text(`${dateStr}`, pageW - 14, 18, { align: "right" });
      }

      // ── Page 1: KPI Summary ──
      addPageHeader(reportTitle);

      if (userCountry) {
        doc.setFillColor(29, 157, 94);
        doc.roundedRect(14, 28, pageW - 28, 9, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(`Country: ${userCountry}`, pageW / 2, 33.5, { align: "center" });
      }

      autoTable(doc, {
        head: [["Indicator", "Value"]],
        body: [
          ["Total Countries", String(kpis.totalCountries)],
          ["Total Actions", String(kpis.totalActions)],
          ["Completed", `${kpis.pctCompleted}%`],
          ["In Progress", `${kpis.pctInProgress}%`],
          ["Delayed", `${kpis.pctDelayed}%`],
          ["On Hold", `${kpis.pctOnHold}%`],
          ["Not Started", `${kpis.pctNotStarted}%`],
          ["Report Period", kpis.reportPeriod],
          ["Last Updated", kpis.lastUpdated],
        ],
        startY: userCountry ? 42 : 30,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: [40, 70, 100], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 248, 252] },
        margin: { left: 14, right: 14 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 70 } },
      });

      // ── Page 2: Safety Targets ──
      doc.addPage();
      addPageHeader("Safety Targets — Progress by Sub-target");
      autoTable(doc, {
        head: [["ID", "Group", "Title", "Score", "Status", "Deadline"]],
        body: targets.map(tgt => [tgt.id, tgt.group, tgt.title, `${tgt.pct}%`, tgt.status, tgt.deadline]),
        startY: 30,
        styles: { fontSize: 7.5, cellPadding: 2.5 },
        headStyles: { fillColor: [40, 70, 100], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 248, 252] },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 13 },
          3: { cellWidth: 14, halign: "center" as const },
          4: { cellWidth: 22 },
          5: { cellWidth: 24 },
        },
        didParseCell: (data) => {
          if (data.column.index === 3 && data.section === "body") {
            const pct = parseInt(String(data.cell.raw));
            if (pct >= 100)     data.cell.styles.textColor = [29, 157, 94];
            else if (pct >= 50) data.cell.styles.textColor = [180, 120, 0];
            else if (pct >= 25) data.cell.styles.textColor = [190, 70, 0];
            else                data.cell.styles.textColor = [140, 140, 140];
          }
        },
      });

      // ── Page 3: Action Plan ──
      if (actions.length > 0) {
        doc.addPage();
        addPageHeader("Action Plan");
        autoTable(doc, {
          head: [["Country", "Action", "Section", "Status", "Start", "End"]],
          body: actions.map(a => [a.country, a.action, a.section, a.status, String(a.start), String(a.end)]),
          startY: 30,
          styles: { fontSize: 8, cellPadding: 2.5 },
          headStyles: { fillColor: [40, 70, 100], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [245, 248, 252] },
          margin: { left: 14, right: 14 },
        });
      }

      // ── Page 4: Country Breakdown (admin only) ──
      if (countries.length > 1) {
        doc.addPage();
        addPageHeader("Country Breakdown");
        autoTable(doc, {
          head: [["Country", "Region", "Actions", "Completed%", "In Progress%", "Delayed%", "Not Started%"]],
          body: countries.map(c => [c.country, c.region, c.actions, `${c.completed}%`, `${c.inprogress}%`, `${c.delayed}%`, `${c.notstarted}%`]),
          startY: 30,
          styles: { fontSize: 7.5, cellPadding: 2.5 },
          headStyles: { fillColor: [40, 70, 100], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [245, 248, 252] },
          margin: { left: 14, right: 14 },
        });
      }

      doc.save(`${reportName}.pdf`);
    } finally {
      setLoadingPdf(false);
    }
  }

  const btnBase: React.CSSProperties = {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
    padding: "18px 32px", borderRadius: 10, cursor: "pointer",
    transition: "all .15s", minWidth: 150, border: "1.5px solid",
  };

  return (
    <div className="card">
      <div className="card-head">
        <span className="card-head-title">{t("reportDownload")}</span>
        {userCountry
          ? <span className="card-head-badge">📍 {userCountry}</span>
          : <span className="card-head-badge">🌍 {t("reportAllCountries")}</span>
        }
      </div>
      <div className="card-body">
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", padding: "4px 0 8px" }}>

          {/* Excel */}
          <button
            onClick={handleExcel}
            disabled={loadingXls}
            style={{
              ...btnBase,
              background: loadingXls ? "#f4f4f4" : "#e6f4ea",
              borderColor: "#2d9d5e",
              color: "#1a6b3c",
              opacity: loadingXls ? 0.6 : 1,
            }}
          >
            <span style={{ fontSize: 32 }}>📊</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".02em" }}>
              {loadingXls ? t("reportGenerating") : t("downloadExcel")}
            </span>
            <span style={{ fontSize: 10, color: "#2d7a4a", textAlign: "center", lineHeight: 1.4 }}>
              {t("reportExcelDesc")}
            </span>
          </button>

          {/* PDF */}
          <button
            onClick={handlePdf}
            disabled={loadingPdf}
            style={{
              ...btnBase,
              background: loadingPdf ? "#f4f4f4" : "#fff0ee",
              borderColor: "#c0392b",
              color: "#9b1a1a",
              opacity: loadingPdf ? 0.6 : 1,
            }}
          >
            <span style={{ fontSize: 32 }}>📄</span>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".02em" }}>
              {loadingPdf ? t("reportGenerating") : t("downloadPdf")}
            </span>
            <span style={{ fontSize: 10, color: "#a03030", textAlign: "center", lineHeight: 1.4 }}>
              {t("reportPdfDesc")}
            </span>
          </button>
        </div>

        <div style={{ marginTop: 8, fontSize: 10, color: "var(--ink3)" }}>
          {t("reportPeriodLabel")}: <strong>{kpis.reportPeriod}</strong>
          {" · "}
          {t("lastUpdated")}: <strong>{kpis.lastUpdated}</strong>
        </div>
      </div>
    </div>
  );
}
