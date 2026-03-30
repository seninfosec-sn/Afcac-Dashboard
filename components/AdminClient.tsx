"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { DashboardData, KpiData, ActionRow, CountryRow, TargetRow, UserRole } from "@/lib/types";

/* ─── Types ──────────────────────────────────────── */
type Tab = "kpis" | "targets" | "actions" | "countries";

const STATUS_OPTIONS = ["completed", "inprogress", "delayed", "onhold", "notstarted"] as const;
const STATUS_LABELS: Record<string, string> = {
  completed: "Completed", inprogress: "In Progress",
  delayed: "Delayed", onhold: "On Hold", notstarted: "Not Started",
};
const PCT_COLORS: Record<number, string> = {
  0: "#95a5a6", 25: "#e07b39", 50: "#f0a500", 75: "#52b788", 100: "#2d9d5e",
};

/* ─── Section nav items ──────────────────────────── */
const NAV_ITEMS: { id: Tab; icon: string; label: string; sub: string }[] = [
  { id: "kpis",      icon: "📊", label: "KPI Overview",    sub: "Global indicators" },
  { id: "targets",   icon: "🎯", label: "Safety Targets",  sub: "39 AFCAC targets" },
  { id: "actions",   icon: "📋", label: "Action Plan",     sub: "15 country actions" },
  { id: "countries", icon: "🌍", label: "Country Data",    sub: "15 countries" },
];

/* ─── Toast ──────────────────────────────────────── */
function Toast({ msg, type, visible }: { msg: string; type: "ok" | "warn" | ""; visible: boolean }) {
  return (
    <div className={`toast ${visible ? "show" : ""} ${type === "ok" ? "t-ok" : type === "warn" ? "t-warn" : ""}`}>
      {msg}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════ */
export default function AdminClient({
  initialData,
  username,
  role,
}: {
  initialData: DashboardData;
  username: string;
  role: UserRole;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>(role === "admin" ? "targets" : "targets");
  const [kpis, setKpis] = useState<KpiData>(initialData.kpis);
  const [actions, setActions] = useState<ActionRow[]>(initialData.actions);
  const [countries, setCountries] = useState<CountryRow[]>(initialData.countries);
  const [targets, setTargets] = useState<TargetRow[]>(initialData.targets);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "warn" | "" }>({ msg: "", type: "" });
  const [toastVisible, setToastVisible] = useState(false);
  const [loginTime] = useState(() => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }));
  const [loginDate] = useState(() => new Date().toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }));
  const mainRef = useRef<HTMLElement>(null);

  function showToast(msg: string, type: "ok" | "warn") {
    setToast({ msg, type });
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3500);
  }

  /* ── Count modified targets ── */
  const answeredTargets = targets.filter((t) => t.pct > 0).length;

  /* ── Save ── */
  async function handleSave() {
    setSaving(true);
    try {
      const payload = role === "expert"
        ? { targets }
        : { kpis, actions, countries, targets };
      const res = await fetch("/api/dashboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erreur de sauvegarde");
      showToast("✓ Tableau de bord mis à jour avec succès", "ok");
      router.refresh();
    } catch (err) {
      showToast(`⚠ ${(err as Error).message}`, "warn");
    } finally {
      setSaving(false);
    }
  }

  /* ── Logout ── */
  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
  }

  /* ── Scroll to section ── */
  function scrollToSection(id: string) {
    setTab(id as Tab);
    setTimeout(() => {
      mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  }

  /* ── KPI updater ── */
  function updateKpi<K extends keyof KpiData>(key: K, value: KpiData[K]) {
    setKpis((p) => ({ ...p, [key]: value }));
  }

  /* ── Target updater ── */
  function updateTarget(id: string, pct: number) {
    const statusMap: Record<number, TargetRow["status"]> = {
      0: "notstarted", 25: "delayed", 50: "inprogress", 75: "inprogress", 100: "completed",
    };
    setTargets((p) =>
      p.map((t) => (t.id === id ? { ...t, pct, status: statusMap[pct] ?? "inprogress" } : t))
    );
  }

  function updateTargetField(id: string, field: keyof TargetRow, value: unknown) {
    setTargets((p) => p.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  /* ── Action updater ── */
  function updateAction(idx: number, field: keyof ActionRow, value: unknown) {
    setActions((p) => p.map((a, i) => (i === idx ? { ...a, [field]: value } : a)));
  }

  /* ── Country updater ── */
  function updateCountry(name: string, field: keyof CountryRow, value: unknown) {
    setCountries((p) => p.map((c) => (c.country === name ? { ...c, [field]: value } : c)));
  }

  /* ── Group targets ── */
  const targetGroups = targets.reduce<Record<string, TargetRow[]>>((acc, t) => {
    (acc[t.group] = acc[t.group] ?? []).push(t);
    return acc;
  }, {});

  /* ── Avatar initial ── */
  const initial = username.charAt(0).toUpperCase();

  /* ══════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════ */
  return (
    <>
      {/* ── HEADER ── */}
      <header className="db-header" style={{ position: "sticky", top: 0, zIndex: 300, height: 60, display: "flex", alignItems: "center" }}>
        <div className="db-header-inner" style={{ width: "100%", height: "100%" }}>
          <div className="db-emblem">✈</div>
          <div className="db-title-wrap">
            <div className="db-title">AFCAC — Mise à Jour du Tableau de Bord</div>
            <div className="db-sub">AASAP Dashboard Admin · Données en temps réel · Révisées Abuja Safety Targets</div>
          </div>
          <div className="db-controls">
            {/* Header progress */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>Complété</span>
              <div style={{ width: 140, height: 8, background: "rgba(255,255,255,0.15)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ height: "100%", background: "var(--gold)", borderRadius: 4, width: `${(answeredTargets / targets.length) * 100}%`, transition: "width .4s" }} />
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", fontFamily: "'Barlow Condensed', sans-serif", minWidth: 36 }}>
                {Math.round((answeredTargets / targets.length) * 100)}%
              </span>
            </div>
            <Link href="/" className="hbtn" style={{ fontSize: 11, width: "auto", padding: "0 12px", gap: 6, textDecoration: "none" }}>
              👁 Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* ── SHELL ── */}
      <div className="shell">

        {/* ══════════════════════════════════════
            SIDEBAR
        ══════════════════════════════════════ */}
        <nav className="sidebar">

          {/* Profile block */}
          <div className="profile-block">
            <div className="profile-avatar">{initial}</div>
            <div className="profile-name">{username}</div>
            <div className="profile-role">{role === "admin" ? "Administrator" : "Expert"} · AFCAC</div>
            <div className="profile-meta">
              <div className="profile-meta-row">
                <span>🗓</span>
                <span>{loginDate}</span>
              </div>
              <div className="profile-meta-row">
                <span>🕐</span>
                <span>Session: {loginTime}</span>
              </div>
              <div className="profile-meta-row">
                <span>🔒</span>
                <span>Expires in 8h</span>
              </div>
            </div>
            <div className="profile-badge">
              <div className="profile-dot" />
              Connected
            </div>
          </div>

          {/* Navigation */}
          <div className="sb-section">Sections</div>
          {NAV_ITEMS.filter((item) => role === "admin" || item.id === "targets").map((item) => (
            <div
              key={item.id}
              className={`sb-item${tab === item.id ? " active" : ""}${tab === item.id ? " done" : ""}`}
              onClick={() => scrollToSection(item.id)}
            >
              <span className="sb-num" style={{ fontSize: 18, width: 22 }}>{item.icon}</span>
              <span className="sb-text">
                <span style={{ fontWeight: 600 }}>{item.label}</span>
                <br />
                <span style={{ fontSize: 10, opacity: 0.65 }}>{item.sub}</span>
              </span>
              {tab === item.id && <span className="sb-check">▶</span>}
            </div>
          ))}

          {/* Targets navigation */}
          {tab === "targets" && (
            <>
              <div className="sb-section" style={{ marginTop: 8 }}>Groupes de cibles</div>
              {Object.entries(targetGroups).map(([group, groupTargets], gi) => {
                const answered = groupTargets.filter((t) => t.pct > 0).length;
                return (
                  <div key={group}
                    className={`sb-item${answered === groupTargets.length ? " done" : ""}`}
                    style={{ paddingTop: 5, paddingBottom: 5 }}
                  >
                    <span className="sb-num">{gi + 1}</span>
                    <span className="sb-text" style={{ fontSize: 10 }}>
                      {group.length > 28 ? group.substring(0, 28) + "…" : group}
                    </span>
                    {answered === groupTargets.length && <span className="sb-check">✓</span>}
                  </div>
                );
              })}
            </>
          )}

          {/* Footer stats + logout */}
          <div className="sb-footer">
            <div className="sb-stats">
              <div className="sb-stat">
                <div className="sb-stat-val">{answeredTargets}</div>
                <div className="sb-stat-label">Définis</div>
              </div>
              <div className="sb-stat">
                <div className="sb-stat-val">{targets.length - answeredTargets}</div>
                <div className="sb-stat-label">À compléter</div>
              </div>
            </div>
            <button className="sb-logout" onClick={handleLogout}>
              🚪 Déconnexion
            </button>
          </div>
        </nav>

        {/* ══════════════════════════════════════
            MAIN CONTENT
        ══════════════════════════════════════ */}
        <main className="form-main" ref={mainRef}>

          {/* Intro */}
          <div className="intro">
            <div className="intro-title">
              {tab === "kpis"      && "📊 KPI Overview — Indicateurs Globaux"}
              {tab === "targets"   && "🎯 AFCAC / ICAO — Revised Abuja Safety Targets · Mise à Jour des Progrès"}
              {tab === "actions"   && "📋 Plan d'Actions — Statut par Pays"}
              {tab === "countries" && "🌍 Données Pays — Répartition des Actions"}
            </div>
            <div className="intro-text">
              {tab === "kpis"      && <>Modifiez les <strong>indicateurs clés de performance</strong> globaux du dashboard. Ces valeurs sont affichées sur la page principale dans la section Executive Summary.</>}
              {tab === "targets"   && <>Ce formulaire couvre <strong>{targets.length} cibles</strong> AFCAC de sécurité réparties en {Object.keys(targetGroups).length} groupes. Pour chaque cible, sélectionnez le pourcentage de progression de <strong>0% (Non démarré)</strong> à <strong>100% (Pleinement atteint)</strong>. Les réponses mettront à jour la grille des cibles sur le dashboard.</>}
              {tab === "actions"   && <>Mettez à jour le <strong>statut de chaque action</strong> par pays. Ces données alimentent le tableau de détail et la carte Afrique sur le dashboard principal.</>}
              {tab === "countries" && <>Modifiez les <strong>données agrégées par pays</strong> : budget, actions totales, et répartition des statuts. Ces valeurs alimentent le tableau de ventilation pays.</>}
            </div>
          </div>

          {/* ─────────────────── KPIs ─────────────────── */}
          {tab === "kpis" && (
            <>
              {/* Group: Overview */}
              <div className="group-header">
                <span className="gh-title">📌 Indicateurs Principaux</span>
                <span className="gh-count">3 champs</span>
              </div>
              <div className="q-card" style={{ borderRadius: "0 0 8px 8px", borderTop: "1px solid var(--border)" }}>
                <div className="q-options">
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Pays Total</label>
                      <input className="field-input" type="number" value={kpis.totalCountries}
                        onChange={(e) => updateKpi("totalCountries", Number(e.target.value))} />
                      <input className="field-input" type="text" value={kpis.totalCountriesTrend} placeholder="Tendance"
                        onChange={(e) => updateKpi("totalCountriesTrend", e.target.value)}
                        style={{ marginTop: 6, fontSize: 11 }} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Actions Totales</label>
                      <input className="field-input" type="number" value={kpis.totalActions}
                        onChange={(e) => updateKpi("totalActions", Number(e.target.value))} />
                      <input className="field-input" type="text" value={kpis.totalActionsTrend} placeholder="Tendance"
                        onChange={(e) => updateKpi("totalActionsTrend", e.target.value)}
                        style={{ marginTop: 6, fontSize: 11 }} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Budget Total (USD)</label>
                      <input className="field-input" type="number" value={kpis.totalBudget}
                        onChange={(e) => updateKpi("totalBudget", Number(e.target.value))} />
                      <span style={{ fontSize: 11, color: "var(--ink3)", marginTop: 4 }}>
                        = ${(kpis.totalBudget / 1_000_000).toFixed(1)}M USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Group: Status */}
              <div className="group-header">
                <span className="gh-title">📌 Répartition des Statuts</span>
                <span className="gh-count">5 champs — doit totaliser ~100%</span>
              </div>
              {(["pctCompleted", "pctInProgress", "pctDelayed", "pctOnHold", "pctNotStarted"] as const).map((key, i) => {
                const meta: Record<string, { label: string; color: string; trendKey: keyof KpiData; icon: string }> = {
                  pctCompleted:  { label: "% Complété",     color: "#2d9d5e", trendKey: "pctCompletedTrend",  icon: "✅" },
                  pctInProgress: { label: "% En Cours",     color: "#f0a500", trendKey: "pctInProgressTrend", icon: "⏳" },
                  pctDelayed:    { label: "% En Retard",    color: "#e07b39", trendKey: "pctDelayedTrend",    icon: "⚠" },
                  pctOnHold:     { label: "% En Suspens",   color: "#c0392b", trendKey: "pctOnHoldTrend",     icon: "⏸" },
                  pctNotStarted: { label: "% Non Démarré",  color: "#95a5a6", trendKey: "pctNotStartedTrend", icon: "🔘" },
                };
                const m = meta[key];
                return (
                  <div key={key} className="q-card" style={i === 4 ? { borderRadius: "0 0 8px 8px" } : {}}>
                    <div className="q-head">
                      <span className="q-num">KPI {i + 1}</span>
                      <span className="q-target" style={{ background: m.color }}>{m.icon}</span>
                      <span className="q-title">{m.label}</span>
                      <span className="q-deadline">
                        <span className={`pct-pill p${kpis[key]}`}>{kpis[key]}%</span>
                      </span>
                    </div>
                    <div className="q-options">
                      <div className="q-select-wrap">
                        <div className="q-swatch" style={{ background: m.color }} />
                        <div style={{ flex: 1, display: "flex", gap: 10, alignItems: "center" }}>
                          <input className="field-input" type="number" min="0" max="100"
                            value={kpis[key]}
                            onChange={(e) => updateKpi(key, Number(e.target.value))}
                            style={{ width: 90 }}
                          />
                          <span style={{ fontSize: 11, color: "var(--ink3)" }}>%</span>
                          <input className="field-input" type="text"
                            value={kpis[m.trendKey] as string}
                            onChange={(e) => updateKpi(m.trendKey, e.target.value)}
                            placeholder="Libellé de tendance…"
                            style={{ flex: 1, fontSize: 11 }}
                          />
                        </div>
                        <div className={`q-score-badge sc-${kpis[key]}`} style={{ fontSize: 13 }}>
                          {kpis[key]}%
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Group: Metadata */}
              <div className="group-header" style={{ marginTop: 28 }}>
                <span className="gh-title">📌 Métadonnées</span>
                <span className="gh-count">4 champs</span>
              </div>
              <div className="q-card" style={{ borderRadius: "0 0 8px 8px", borderTop: "1px solid var(--border)" }}>
                <div className="q-options">
                  <div className="field-grid">
                    <div className="field-group">
                      <label className="field-label">Période du Rapport</label>
                      <input className="field-input" type="text" value={kpis.reportPeriod}
                        onChange={(e) => updateKpi("reportPeriod", e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Dernière Mise à Jour</label>
                      <input className="field-input" type="date" value={kpis.lastUpdated}
                        onChange={(e) => updateKpi("lastUpdated", e.target.value)} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Durée Moyenne (semaines)</label>
                      <input className="field-input" type="number" value={kpis.avgDurationWeeks}
                        onChange={(e) => updateKpi("avgDurationWeeks", Number(e.target.value))} />
                    </div>
                    <div className="field-group">
                      <label className="field-label">Experts Planifiés</label>
                      <input className="field-input" type="number" value={kpis.expertsPlanned}
                        onChange={(e) => updateKpi("expertsPlanned", Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ─────────────────── TARGETS ─────────────────── */}
          {tab === "targets" && (
            <>
              {Object.entries(targetGroups).map(([group, groupTargets], gi) => (
                <div key={group}>
                  <div className="group-header" style={gi === 0 ? { marginTop: 0 } : {}}>
                    <span className="gh-title">📌 {group}</span>
                    <span className="gh-count">{groupTargets.length} cible{groupTargets.length > 1 ? "s" : ""}</span>
                  </div>
                  {groupTargets.map((t, qi) => {
                    const isLast = qi === groupTargets.length - 1;
                    return (
                      <div key={t.id} className="q-card" style={isLast ? { borderRadius: "0 0 8px 8px" } : {}}>
                        <div className="q-head">
                          <span className="q-num">T{gi + 1}.{qi + 1}</span>
                          <span className="q-target">{t.id}</span>
                          <span className="q-title">{t.title}</span>
                          <span className="q-deadline">🗓 {t.deadline}</span>
                        </div>
                        <div className="q-options">
                          <div className="q-select-wrap">
                            <div className="q-swatch" style={{ background: PCT_COLORS[t.pct] ?? "var(--border)" }} />
                            <select
                              className="q-select"
                              value={t.pct}
                              style={{ borderColor: PCT_COLORS[t.pct] ?? "var(--border)" }}
                              onChange={(e) => updateTarget(t.id, Number(e.target.value))}
                            >
                              <option value={0} data-pct="0">a)   0% — Non démarré / Non applicable</option>
                              <option value={25} data-pct="25">b)  25% — Partiellement initié</option>
                              <option value={50} data-pct="50">c)  50% — En cours / Partiellement atteint</option>
                              <option value={75} data-pct="75">d)  75% — Avancé / En bonne voie</option>
                              <option value={100} data-pct="100">e) 100% — Pleinement atteint</option>
                            </select>
                            <div className={`q-score-badge sc-${t.pct}`}>
                              <span style={{ fontSize: 11, opacity: 0.7 }}>
                                {["a","b","c","d","e"][[0,25,50,75,100].indexOf(t.pct)] ?? "—"})
                              </span>
                              <br />
                              {t.pct}%
                            </div>
                          </div>
                          {/* Description */}
                          {t.pct > 0 && (
                            <div className={`q-desc-box dc-${t.pct}`} style={{ marginTop: 10 }}>
                              <strong>{t.pct}%</strong> — {
                                t.pct === 25  ? "Initié mais non finalisé" :
                                t.pct === 50  ? "Partiellement implémenté, des lacunes subsistent" :
                                t.pct === 75  ? "Implémentation avancée, quelques points en suspens" :
                                t.pct === 100 ? "Pleinement implémenté et opérationnel" :
                                               "Non démarré"
                              }
                            </div>
                          )}
                        </div>
                        {/* Deadline field */}
                        <div style={{ padding: "0 20px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                          <span style={{ fontSize: 11, color: "var(--ink3)" }}>🗓 Échéance :</span>
                          <input
                            className="field-input"
                            type="text"
                            value={t.deadline}
                            onChange={(e) => updateTargetField(t.id, "deadline", e.target.value)}
                            style={{ width: 140, fontSize: 11, padding: "5px 9px" }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {/* ─────────────────── ACTIONS ─────────────────── */}
          {tab === "actions" && (
            <>
              <div className="group-header" style={{ marginTop: 0 }}>
                <span className="gh-title">📌 Plan d'Actions — Détail par Pays</span>
                <span className="gh-count">{actions.length} actions</span>
              </div>
              {actions.map((row, idx) => {
                const statusColor: Record<string, string> = {
                  completed: "#2d9d5e", inprogress: "#f0a500", delayed: "#e07b39",
                  onhold: "#c0392b", notstarted: "#95a5a6",
                };
                const sc = statusColor[row.status] ?? "#95a5a6";
                const isLast = idx === actions.length - 1;
                return (
                  <div key={idx} className="q-card" style={isLast ? { borderRadius: "0 0 8px 8px" } : {}}>
                    <div className="q-head">
                      <span className="q-num">{idx + 1}</span>
                      <span className="q-target">{row.action}</span>
                      <span className="q-title">
                        <strong>{row.country}</strong>
                        <span style={{ fontWeight: 400, color: "var(--ink3)" }}> — {row.section}</span>
                      </span>
                      <span className="q-deadline">💰 ${row.budget.toLocaleString()}</span>
                    </div>
                    <div className="q-options">
                      <div className="q-select-wrap">
                        <div className="q-swatch" style={{ background: sc }} />
                        <select
                          className="q-select"
                          value={row.status}
                          style={{ borderColor: sc }}
                          onChange={(e) => updateAction(idx, "status", e.target.value)}
                        >
                          {STATUS_OPTIONS.map((s) => (
                            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                          ))}
                        </select>
                        <div className="q-score-badge" style={{ fontSize: 11, minWidth: 70, background: `${sc}1a`, borderColor: sc, color: sc }}>
                          {STATUS_LABELS[row.status]}
                        </div>
                      </div>
                    </div>
                    <div style={{ padding: "0 20px 14px", display: "flex", gap: 16, alignItems: "center" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "var(--ink3)" }}>Début :</span>
                        <input className="field-input" type="number" value={row.start}
                          onChange={(e) => updateAction(idx, "start", Number(e.target.value))}
                          style={{ width: 80, fontSize: 11, padding: "5px 9px" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "var(--ink3)" }}>Fin :</span>
                        <input className="field-input" type="number" value={row.end}
                          onChange={(e) => updateAction(idx, "end", Number(e.target.value))}
                          style={{ width: 80, fontSize: 11, padding: "5px 9px" }} />
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ fontSize: 11, color: "var(--ink3)" }}>Budget USD :</span>
                        <input className="field-input" type="number" value={row.budget}
                          onChange={(e) => updateAction(idx, "budget", Number(e.target.value))}
                          style={{ width: 120, fontSize: 11, padding: "5px 9px" }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* ─────────────────── COUNTRIES ─────────────────── */}
          {tab === "countries" && (
            <>
              {countries.map((row, ci) => {
                const isLast = ci === countries.length - 1;
                return (
                  <div key={row.country}>
                    <div className="group-header" style={ci === 0 ? { marginTop: 0 } : {}}>
                      <span className="gh-title">🌍 {row.country}</span>
                      <span className="gh-count">{row.region} · {row.actions} actions</span>
                    </div>
                    <div className="q-card" style={isLast ? { borderRadius: "0 0 8px 8px", borderTop: "1px solid var(--border)" } : { borderTop: "1px solid var(--border)" }}>
                      <div className="q-options">
                        <div className="field-grid">
                          <div className="field-group">
                            <label className="field-label">Actions Totales</label>
                            <input className="field-input" type="number" value={row.actions}
                              onChange={(e) => updateCountry(row.country, "actions", Number(e.target.value))} />
                          </div>
                          <div className="field-group">
                            <label className="field-label">Budget (USD)</label>
                            <input className="field-input" type="number" value={row.budget}
                              onChange={(e) => updateCountry(row.country, "budget", Number(e.target.value))} />
                          </div>
                          <div className="field-group">
                            <label className="field-label">Entité Responsable</label>
                            <input className="field-input" type="text" value={row.entity}
                              onChange={(e) => updateCountry(row.country, "entity", e.target.value)} />
                          </div>
                          <div className="field-group">
                            <label className="field-label" style={{ color: "var(--c-complete)" }}>% Complété</label>
                            <input className="field-input" type="number" min="0" max="100" value={row.completed}
                              onChange={(e) => updateCountry(row.country, "completed", Number(e.target.value))}
                              style={{ borderColor: "var(--c-complete)" }} />
                          </div>
                          <div className="field-group">
                            <label className="field-label" style={{ color: "#b07800" }}>% En Cours</label>
                            <input className="field-input" type="number" min="0" max="100" value={row.inprogress}
                              onChange={(e) => updateCountry(row.country, "inprogress", Number(e.target.value))}
                              style={{ borderColor: "var(--c-progress)" }} />
                          </div>
                          <div className="field-group">
                            <label className="field-label" style={{ color: "var(--amber)" }}>% Retardé</label>
                            <input className="field-input" type="number" min="0" max="100" value={row.delayed}
                              onChange={(e) => updateCountry(row.country, "delayed", Number(e.target.value))}
                              style={{ borderColor: "var(--c-delayed)" }} />
                          </div>
                          <div className="field-group">
                            <label className="field-label" style={{ color: "var(--crimson)" }}>% En Suspens</label>
                            <input className="field-input" type="number" min="0" max="100" value={row.onhold}
                              onChange={(e) => updateCountry(row.country, "onhold", Number(e.target.value))}
                              style={{ borderColor: "var(--c-onhold)" }} />
                          </div>
                          <div className="field-group">
                            <label className="field-label" style={{ color: "var(--slate)" }}>% Non Démarré</label>
                            <input className="field-input" type="number" min="0" max="100" value={row.notstarted}
                              onChange={(e) => updateCountry(row.country, "notstarted", Number(e.target.value))}
                              style={{ borderColor: "var(--c-nostart)" }} />
                          </div>
                        </div>
                        {/* Visual bar */}
                        <div style={{ marginTop: 14, display: "flex", gap: 2, height: 8, borderRadius: 4, overflow: "hidden" }}>
                          {[
                            { v: row.completed, c: "var(--c-complete)" },
                            { v: row.inprogress, c: "var(--c-progress)" },
                            { v: row.delayed, c: "var(--c-delayed)" },
                            { v: row.onhold, c: "var(--c-onhold)" },
                            { v: row.notstarted, c: "var(--c-nostart)" },
                          ].map((s, i) => s.v > 0 && (
                            <div key={i} style={{ width: `${s.v}%`, background: s.c, minWidth: 4 }} title={`${s.v}%`} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

        </main>
      </div>

      {/* ── BOTTOM ACTION BAR ── */}
      <div className="form-actions">
        <div className="fa-stats">
          <strong>{answeredTargets}</strong> / {targets.length} cibles renseignées
          &nbsp;·&nbsp; Onglet actif : <strong>{NAV_ITEMS.find((n) => n.id === tab)?.label}</strong>
        </div>
        <Link href="/" className="btn btn-secondary-form">
          ← Annuler
        </Link>
        <button
          className="btn btn-primary-form"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Enregistrement…" : "💾 Enregistrer les modifications"}
        </button>
      </div>

      {/* Toast */}
      <Toast msg={toast.msg} type={toast.type} visible={toastVisible} />
    </>
  );
}
