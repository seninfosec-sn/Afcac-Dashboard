"use client";
import { useState } from "react";
import type { KpiData, CountryRow, TargetRow } from "@/lib/types";
import { useLanguage } from "./LanguageProvider";

interface Props {
  kpis: KpiData;
  countries: CountryRow[];
  targets: TargetRow[];
  userCountry?: string | null;
}

export default function CountryReportCard({ kpis, countries, targets, userCountry }: Props) {
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
        [t("lastUpdated"), kpis.lastUpdated],
        [],
        ["Metric", "Value"],
        ["% Completed", `${kpis.pctCompleted}%`],
        ["% In Progress", `${kpis.pctInProgress}%`],
        ["% Delayed", `${kpis.pctDelayed}%`],
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

      // Sheet 3: Country Breakdown (admin / multi-country only)
      if (countries.length > 1) {
        const cHeaders = ["Country", "Region", "Actions", "Completed %", "In Progress %", "Delayed %", "Not Started %"];
        const cRows = countries.map(c => [c.country, c.region, c.actions, c.completed, c.inprogress, c.delayed, c.notstarted]);
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

      // CAFAC brand colors
      const C = {
        forest:    [1,   61,  49]  as [number,number,number], // #013d31
        forest2:   [1,  119, 100]  as [number,number,number], // #017764
        forest3:   [1,  148, 120]  as [number,number,number], // #019478
        complete:  [45, 157,  94]  as [number,number,number], // #2d9d5e
        progress:  [240, 165,   0]  as [number,number,number], // #f0a500 yellow
        delayed:   [231,  76,  60]  as [number,number,number], // #e74c3c red
        nostart:   [149, 165, 166]  as [number,number,number], // #95a5a6
        rowAlt:    [237, 247, 244]  as [number,number,number], // soft CAFAC green tint
        textMint:  [77,  184, 154]  as [number,number,number], // #4db89a
      };

      const statusColor = (s: string): [number,number,number] => {
        if (s === "completed")  return C.complete;
        if (s === "inprogress") return C.progress;
        if (s === "delayed")    return C.delayed;
        return C.nostart;
      };

      function addPageHeader(subtitle: string) {
        // Dark green gradient band
        doc.setFillColor(...C.forest);
        doc.rect(0, 0, pageW, 24, "F");
        doc.setFillColor(...C.forest2);
        doc.rect(pageW * 0.6, 0, pageW * 0.4, 24, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("AFCAC — Revised Abuja Safety Targets", 14, 10);
        doc.setFontSize(8.5);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...C.textMint);
        doc.text(subtitle, 14, 18);
        doc.setTextColor(255, 255, 255);
        doc.text(`${dateStr}`, pageW - 14, 18, { align: "right" });
      }

      // ── Page 1: KPI Summary ──
      addPageHeader(reportTitle);

      if (userCountry) {
        doc.setFillColor(...C.complete);
        doc.roundedRect(14, 28, pageW - 28, 9, 2, 2, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.text(`Country: ${userCountry}`, pageW / 2, 33.5, { align: "center" });
      }

      autoTable(doc, {
        head: [["Indicator", "Value"]],
        body: [
          ["Completed", `${kpis.pctCompleted}%`],
          ["In Progress", `${kpis.pctInProgress}%`],
          ["Delayed", `${kpis.pctDelayed}%`],
          ["Last Updated", kpis.lastUpdated],
        ],
        startY: userCountry ? 42 : 30,
        styles: { fontSize: 9, cellPadding: 3 },
        headStyles: { fillColor: C.forest, textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: C.rowAlt },
        margin: { left: 14, right: 14 },
        columnStyles: { 0: { fontStyle: "bold", cellWidth: 70 } },
        didParseCell: (data) => {
          if (data.section !== "body") return;
          const colors: [number,number,number][] = [C.complete, C.progress, C.delayed, C.forest3];
          if (data.column.index === 1 && data.row.index < 3) {
            data.cell.styles.textColor = colors[data.row.index];
            data.cell.styles.fontStyle = "bold";
          }
        },
      });

      // ── Page 2: Safety Targets ──
      doc.addPage();
      addPageHeader("Safety Targets — Progress by Sub-target");
      autoTable(doc, {
        head: [["ID", "Group", "Title", "Score", "Status", "Deadline"]],
        body: targets.map(tgt => [tgt.id, tgt.group, tgt.title, `${tgt.pct}%`, tgt.status, tgt.deadline]),
        startY: 30,
        styles: { fontSize: 7.5, cellPadding: 2.5 },
        headStyles: { fillColor: C.forest, textColor: [255, 255, 255], fontStyle: "bold" },
        alternateRowStyles: { fillColor: C.rowAlt },
        margin: { left: 14, right: 14 },
        columnStyles: {
          0: { cellWidth: 13 },
          3: { cellWidth: 14, halign: "center" as const },
          4: { cellWidth: 22 },
          5: { cellWidth: 24 },
        },
        didParseCell: (data) => {
          if (data.section !== "body") return;
          if (data.column.index === 3) {
            const pct = parseInt(String(data.cell.raw));
            if (pct >= 100)     data.cell.styles.textColor = C.complete;
            else if (pct >= 50) data.cell.styles.textColor = C.progress;
            else if (pct >= 25) data.cell.styles.textColor = C.delayed;
            else                data.cell.styles.textColor = C.nostart;
            data.cell.styles.fontStyle = "bold";
          }
          if (data.column.index === 4) {
            data.cell.styles.textColor = statusColor(String(data.cell.raw));
            data.cell.styles.fontStyle = "bold";
          }
        },
      });

      // ── Page 3: Country Breakdown (admin only) ──
      if (countries.length > 1) {
        doc.addPage();
        addPageHeader("Country Breakdown");
        autoTable(doc, {
          head: [["Country", "Region", "Actions", "Completed%", "In Progress%", "Delayed%", "Not Started%"]],
          body: countries.map(c => [c.country, c.region, c.actions, `${c.completed}%`, `${c.inprogress}%`, `${c.delayed}%`, `${c.notstarted}%`]),
          startY: 30,
          styles: { fontSize: 7.5, cellPadding: 2.5 },
          headStyles: { fillColor: C.forest, textColor: [255, 255, 255], fontStyle: "bold" },
          alternateRowStyles: { fillColor: C.rowAlt },
          margin: { left: 14, right: 14 },
          didParseCell: (data) => {
            if (data.section !== "body") return;
            const colColors: Record<number, [number,number,number]> = {
              3: C.complete, 4: C.progress, 5: C.delayed, 6: C.nostart,
            };
            if (colColors[data.column.index]) {
              data.cell.styles.textColor = colColors[data.column.index];
              data.cell.styles.fontStyle = "bold";
            }
          },
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
