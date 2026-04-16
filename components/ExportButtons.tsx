"use client";
import { useState } from "react";

interface Props {
  onExcel: () => Promise<void>;
  onPdf:   () => Promise<void>;
}

export default function ExportButtons({ onExcel, onPdf }: Props) {
  const [loadingXls, setLoadingXls] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);

  async function handleExcel() {
    setLoadingXls(true);
    try { await onExcel(); } finally { setLoadingXls(false); }
  }

  async function handlePdf() {
    setLoadingPdf(true);
    try { await onPdf(); } finally { setLoadingPdf(false); }
  }

  const btn: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 4,
    padding: "3px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700,
    cursor: "pointer", border: "1.5px solid", transition: "opacity .15s",
    lineHeight: 1.4, letterSpacing: ".04em",
  };

  return (
    <div style={{ display: "flex", gap: 5, marginLeft: 6 }}>
      <button
        onClick={handleExcel}
        disabled={loadingXls}
        title="Download Excel"
        style={{ ...btn, background: "#e6f4ea", borderColor: "#2d9d5e", color: "#1a6b3c", opacity: loadingXls ? .5 : 1 }}
      >
        {loadingXls ? "…" : "↓ XLS"}
      </button>
      <button
        onClick={handlePdf}
        disabled={loadingPdf}
        title="Download PDF"
        style={{ ...btn, background: "#fff0ee", borderColor: "#c0392b", color: "#9b1a1a", opacity: loadingPdf ? .5 : 1 }}
      >
        {loadingPdf ? "…" : "↓ PDF"}
      </button>
    </div>
  );
}
