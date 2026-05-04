"use client";

/* ── Excel export (SheetJS) ─────────────────────────────── */

export async function exportExcel(
  filename: string,
  sheetName: string,
  headers: string[],
  rows: (string | number)[][],
) {
  const XLSX = await import("xlsx");
  const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

  // Auto-width columns
  const colWidths = headers.map((h, ci) =>
    Math.max(h.length, ...rows.map((r) => String(r[ci] ?? "").length)) + 2
  );
  ws["!cols"] = colWidths.map((w) => ({ wch: w }));

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, sheetName);
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

/* ── PDF export (jsPDF + autoTable) ─────────────────────── */

export async function exportPdf(
  filename: string,
  title: string,
  headers: string[],
  rows: (string | number)[][],
  subtitle?: string,
) {
  const { jsPDF } = await import("jspdf");
  const autoTable  = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: rows[0]?.length > 7 ? "landscape" : "portrait" });

  // Header band — CAFAC green
  const pageW = doc.internal.pageSize.getWidth();
  doc.setFillColor(1, 61, 49);   // #013d31
  doc.rect(0, 0, pageW, 22, "F");
  doc.setFillColor(1, 119, 100); // #017764
  doc.rect(pageW * 0.6, 0, pageW * 0.4, 22, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("AFCAC — " + title, 14, 13);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(77, 184, 154); // #4db89a mint
  const dateStr = `Generated: ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`;
  doc.text(dateStr, pageW - 14, 13, { align: "right" });

  if (subtitle) {
    doc.setFontSize(8);
    doc.setTextColor(77, 184, 154);
    doc.text(subtitle, 14, 19);
  }

  autoTable(doc, {
    head: [headers],
    body: rows.map((r) => r.map(String)),
    startY: 26,
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [1, 61, 49], textColor: [255, 255, 255], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [237, 247, 244] },
    margin: { left: 14, right: 14 },
  });

  doc.save(`${filename}.pdf`);
}
