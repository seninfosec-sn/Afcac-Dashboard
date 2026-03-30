"use client";
import { useState } from "react";
import type { CountryRow } from "@/lib/types";

const STATUS_COLORS: Record<string, string> = {
  completed:  "#2d9d5e",
  inprogress: "#f0a500",
  delayed:    "#e07b39",
  onhold:     "#c0392b",
  notstarted: "#95a5a6",
};

// Country status derived from dominant status in countries data
function getDominantStatus(row: CountryRow): string {
  const vals = [
    { k: "completed",  v: row.completed },
    { k: "inprogress", v: row.inprogress },
    { k: "delayed",    v: row.delayed },
    { k: "onhold",     v: row.onhold },
    { k: "notstarted", v: row.notstarted },
  ];
  return vals.reduce((a, b) => (b.v > a.v ? b : a)).k;
}

interface Tooltip {
  x: number;
  y: number;
  country: string;
  data: CountryRow | null;
}

export default function AfricaMap({ countries }: { countries: CountryRow[] }) {
  const [tooltip, setTooltip] = useState<Tooltip | null>(null);

  const countryMap = Object.fromEntries(countries.map((c) => [c.country, c]));

  function getColor(name: string): string {
    const row = countryMap[name];
    if (!row) return "#b8c8c0";
    return STATUS_COLORS[getDominantStatus(row)] ?? "#b8c8c0";
  }

  function handleMouseMove(e: React.MouseEvent, name: string) {
    const rect = (e.currentTarget as SVGElement).closest("svg")!.getBoundingClientRect();
    setTooltip({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10,
      country: name,
      data: countryMap[name] ?? null,
    });
  }

  const shapes: { name: string; points: string }[] = [
    { name: "Nigeria",      points: "188,202 222,198 236,208 233,228 216,240 194,232 180,219" },
    { name: "South Africa", points: "195,400 248,390 272,402 275,428 252,455 222,458 196,440 186,420" },
    { name: "Egypt",        points: "252,78 302,76 312,102 306,136 272,144 248,130 242,100" },
    { name: "Kenya",        points: "288,248 322,242 336,260 325,288 298,296 280,275" },
    { name: "Ethiopia",     points: "292,200 338,195 352,214 340,240 312,248 286,232 278,212" },
    { name: "Algeria",      points: "182,78 252,74 258,100 244,132 210,138 176,126 168,98" },
    { name: "Morocco",      points: "144,74 182,72 182,98 168,114 144,110 130,94" },
    { name: "Ghana",        points: "166,226 192,222 196,244 180,257 160,250 155,235" },
    { name: "Tanzania",     points: "278,292 318,286 330,310 315,336 288,340 268,318" },
    { name: "Senegal",      points: "124,178 158,175 163,193 142,204 120,200 112,188" },
    { name: "Uganda",       points: "272,244 298,240 302,262 284,270 266,262" },
    { name: "Cameroon",     points: "202,220 228,216 234,238 218,252 198,245 193,228" },
    { name: "DRC",          points: "216,254 272,248 284,282 272,320 242,330 210,314 200,276" },
    { name: "Zambia",       points: "232,328 274,320 284,344 270,366 240,370 218,350" },
    { name: "Zimbabwe",     points: "246,366 274,360 280,382 264,396 240,394 234,378" },
  ];

  const passive = [
    "246,78 306,72 315,100 304,134 259,140 248,130 242,100",
    "260,136 305,130 316,164 300,195 272,200 250,185 246,156",
    "310,160 360,154 370,198 348,220 316,214 300,192",
    "168,114 200,112 208,138 190,162 164,148",
    "134,110 168,114 160,148 140,158 122,140",
    "348,220 395,214 404,248 378,265 350,256",
    "226,340 270,334 274,360 252,370 230,362",
    "180,260 216,254 200,276 210,314 192,318 170,296",
    "130,240 160,238 166,260 148,272 126,264",
    "370,268 408,265 416,295 394,310 370,304",
    "400,298 434,295 440,325 418,338 398,328",
  ];

  return (
    <div className="card" style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div className="card-head">
        <span className="card-head-title">Africa — Action Status Map</span>
        <span className="card-head-badge">Hover country for details</span>
      </div>
      <div style={{ flex: 1, minHeight: 0, display: "flex", alignItems: "stretch" }}>
        <svg className="africa-svg" viewBox="0 0 520 540" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%", display: "block" }}>
          <defs>
            <linearGradient id="oceanG" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c8e0ea" />
              <stop offset="100%" stopColor="#a8ccd8" />
            </linearGradient>
          </defs>
          <rect width="520" height="540" fill="url(#oceanG)" />

          {passive.map((pts, i) => (
            <polygon key={`p${i}`} points={pts} fill="#b8c8c0" opacity="0.5" />
          ))}

          {shapes.map((s) => (
            <polygon
              key={s.name}
              className="country-shape"
              data-country={s.name}
              points={s.points}
              fill={getColor(s.name)}
              opacity="0.88"
              onMouseMove={(e) => handleMouseMove(e, s.name)}
              onMouseLeave={() => setTooltip(null)}
            />
          ))}

          {/* Country labels */}
          {shapes.map((s) => {
            const pts = s.points.split(" ").map((p) => p.split(",").map(Number));
            const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
            const cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
            return (
              <text
                key={`lbl-${s.name}`}
                x={cx} y={cy}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: 7, fill: "white", fontWeight: 700, pointerEvents: "none", fontFamily: "Barlow Condensed, sans-serif", letterSpacing: "0.05em" }}
              >
                {s.name.length > 8 ? s.name.split(" ")[0] : s.name}
              </text>
            );
          })}
        </svg>

        {tooltip && (
          <div
            className="map-tooltip"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            <div style={{ fontWeight: 700, marginBottom: 4 }}>{tooltip.country}</div>
            {tooltip.data ? (
              <>
                <div>Actions: {tooltip.data.actions}</div>
                <div style={{ color: "#52b788" }}>✓ {tooltip.data.completed}% completed</div>
                <div style={{ color: "#f0a500" }}>⏳ {tooltip.data.inprogress}% in progress</div>
                <div style={{ color: "rgba(255,255,255,0.6)", marginTop: 3 }}>{tooltip.data.entity}</div>
              </>
            ) : (
              <div style={{ color: "rgba(255,255,255,0.5)" }}>No data</div>
            )}
          </div>
        )}

        {/* Legend */}
        <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(255,255,255,0.95)", borderRadius: 6, padding: "8px 12px", fontSize: 10, border: "1px solid var(--border)", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          {Object.entries(STATUS_COLORS).map(([k, c]) => (
            <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
              <span style={{ color: "var(--ink2)", textTransform: "capitalize" }}>{k.replace("inprogress", "In Progress").replace("notstarted", "Not Started").replace("onhold", "On Hold")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
