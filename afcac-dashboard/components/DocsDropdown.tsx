"use client";
import { useState, useEffect, useRef } from "react";

const DOCS = [
  { label: "Revised Abuja Safety Targets Action Plan", href: "https://www.afcac.org/wp-content/uploads/2026/02/Revised-ASTs-Action-Plan.pdf" },
  { label: "Revised Abuja Safety Targets EN",          href: "https://www.afcac.org/wp-content/uploads/2026/02/Revised-Abuja-Safety-Targets-April-2024.pdf" },
  { label: "Revised Abuja Safety Targets FR",          href: "https://www.afcac.org/wp-content/uploads/2026/02/frenchRevised-Abuja-Safety-Targets-Avril-2024.pdf" },
];

export default function DocsDropdown({ show }: { show: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  if (!show) return null;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          padding: "4px 10px",
          fontSize: 11,
          fontWeight: 600,
          cursor: "pointer",
          border: open
            ? "1.5px solid rgba(255,255,255,0.6)"
            : "1.5px solid rgba(255,255,255,0.22)",
          borderRadius: 5,
          background: open
            ? "rgba(255,255,255,0.18)"
            : "rgba(255,255,255,0.08)",
          color: open ? "#fff" : "rgba(255,255,255,0.8)",
          transition: "all .15s",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: 13 }}>📁</span>
        <span>Abuja Safety Targets Documents</span>
        <span style={{ fontSize: 9, marginLeft: 2, opacity: 0.7 }}>▾</span>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            zIndex: 200,
            minWidth: 310,
            background: "var(--forest, #013d31)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 8,
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            overflow: "hidden",
          }}
        >
          {DOCS.map((doc) => (
            <a
              key={doc.label}
              href={doc.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "10px 16px",
                fontSize: 12,
                fontWeight: 500,
                color: "rgba(255,255,255,0.88)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.07)",
                transition: "background .12s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              <span style={{ fontSize: 14 }}>📄</span>
              <span>{doc.label}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
