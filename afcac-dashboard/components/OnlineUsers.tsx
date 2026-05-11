"use client";
import { useState, useEffect, useCallback } from "react";
import type { SessionEntry } from "@/lib/types";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function fmt(iso: string, type: "date" | "time" | "datetime"): string {
  const d = new Date(iso);
  if (type === "date")     return d.toLocaleDateString("fr-FR",  { day: "2-digit", month: "short", year: "numeric" });
  if (type === "time")     return d.toLocaleTimeString("fr-FR",  { hour: "2-digit", minute: "2-digit" });
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

const ROLE_BADGE: Record<string, { label: string; color: string }> = {
  admin:       { label: "Admin",        color: "#1a2b3c" },
  focal_point: { label: "Focal Point",  color: "#7c3aed" },
  expert:      { label: "Expert",       color: "#1a6b3c" },
};

const pill: React.CSSProperties = {
  display: "inline-flex", alignItems: "center", gap: 4,
  padding: "2px 8px", borderRadius: 99, fontSize: 10, fontWeight: 700,
};

export default function OnlineUsers() {
  const [online,  setOnline]  = useState<SessionEntry[]>([]);
  const [history, setHistory] = useState<SessionEntry[]>([]);
  const [total,   setTotal]   = useState(0);
  const [page,    setPage]    = useState(0);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState<"online" | "history">("online");

  const LIMIT = 100;

  const load = useCallback(async (p = page) => {
    try {
      const res  = await fetch(`/api/admin/sessions?page=${p}&limit=${LIMIT}`);
      const data = await res.json();
      if (res.ok) {
        setOnline(data.online   ?? []);
        setHistory(data.history ?? []);
        setTotal(data.total     ?? 0);
        setPage(p);
      }
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    load(0);
    const interval = setInterval(() => load(page), 30_000);
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div style={{ padding: "0 0 24px" }}>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        {([
          ["online",  `🟢 En ligne (${online.length})`],
          ["history", `🕐 Historique (${total.toLocaleString()})`],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            style={{
              padding: "6px 14px", borderRadius: 6, fontSize: 11, fontWeight: 700,
              cursor: "pointer", border: "1.5px solid",
              background: tab === id ? "var(--navy)" : "var(--surface2)",
              color:      tab === id ? "#fff"        : "var(--ink2)",
              borderColor: tab === id ? "var(--navy)" : "var(--border)",
              transition: "all .15s",
            }}
          >{label}</button>
        ))}
        <button
          onClick={() => load(page)}
          style={{ marginLeft: "auto", padding: "6px 10px", borderRadius: 6, fontSize: 11, cursor: "pointer", border: "1.5px solid var(--border)", background: "var(--surface2)", color: "var(--ink2)" }}
          title="Rafraîchir"
        >↻</button>
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: 40, color: "var(--ink3)", fontSize: 12 }}>Chargement…</div>
      )}

      {/* ── Online view ───────────────────────────────── */}
      {!loading && tab === "online" && (
        online.length === 0
          ? <div style={{ textAlign: "center", padding: 40, color: "var(--ink3)", fontSize: 12 }}>Aucun utilisateur en ligne en ce moment.</div>
          : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {online.map((s) => {
                const rb = ROLE_BADGE[s.role] ?? ROLE_BADGE.expert;
                return (
                  <div key={s.sessionId} style={{
                    display: "grid", gridTemplateColumns: "36px 1fr auto",
                    gap: 12, alignItems: "center",
                    padding: "10px 14px", borderRadius: 8,
                    background: "var(--snow)", border: "1px solid var(--border2)",
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: rb.color, color: "#fff",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 14, fontWeight: 800, flexShrink: 0,
                    }}>
                      {s.displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{s.displayName}</span>
                        <span style={{ ...pill, background: rb.color + "22", color: rb.color, borderColor: "transparent" }}>{rb.label}</span>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#2d9d5e", display: "inline-block", boxShadow: "0 0 0 2px #b7f0d0" }} />
                      </div>
                      <div style={{ fontSize: 10, color: "var(--ink3)", display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <span>👤 {s.username}</span>
                        <span>🕐 Connecté le {fmt(s.loginTime, "date")} à {fmt(s.loginTime, "time")}</span>
                        <span>⏱ Actif {timeAgo(s.lastSeen)}</span>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", fontSize: 10, color: "var(--ink3)", minWidth: 120 }}>
                      {(s.city || s.country) && (
                        <div style={{ fontWeight: 600, color: "var(--ink2)", marginBottom: 2 }}>
                          📍 {[s.city, s.country].filter(Boolean).join(", ")}
                        </div>
                      )}
                      <div style={{ fontFamily: "monospace", fontSize: 9 }}>{s.ip !== "unknown" ? s.ip : ""}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )
      )}

      {/* ── History view ──────────────────────────────── */}
      {!loading && tab === "history" && (
        <>
          {history.length === 0
            ? <div style={{ textAlign: "center", padding: 40, color: "var(--ink3)", fontSize: 12 }}>Aucune session enregistrée.</div>
            : (
              <div className="tbl-scroll">
                <table className="dtable" style={{ fontSize: 11 }}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Utilisateur</th>
                      <th>Rôle</th>
                      <th>Connexion</th>
                      <th>Déconnexion</th>
                      <th>Durée</th>
                      <th>Localisation</th>
                      <th>IP</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((s, i) => {
                      const isActive = !s.logoutTime;
                      const rb = ROLE_BADGE[s.role] ?? ROLE_BADGE.expert;
                      const rowNum = page * LIMIT + i + 1;

                      let duration = "—";
                      if (s.logoutTime) {
                        const diffMs = new Date(s.logoutTime).getTime() - new Date(s.loginTime).getTime();
                        const mins = Math.floor(diffMs / 60000);
                        if (mins < 60) duration = `${mins}m`;
                        else duration = `${Math.floor(mins / 60)}h ${mins % 60}m`;
                      }

                      return (
                        <tr key={s.sessionId}>
                          <td style={{ color: "var(--ink3)", fontSize: 9 }}>{rowNum}</td>
                          <td>
                            <div style={{ fontWeight: 600 }}>{s.displayName}</div>
                            <div style={{ fontSize: 9, color: "var(--ink3)" }}>{s.username}</div>
                          </td>
                          <td><span style={{ ...pill, background: rb.color + "22", color: rb.color }}>{rb.label}</span></td>
                          <td style={{ whiteSpace: "nowrap" }}>
                            <div>{fmt(s.loginTime, "date")}</div>
                            <div style={{ color: "var(--ink3)" }}>{fmt(s.loginTime, "time")}</div>
                          </td>
                          <td style={{ color: "var(--ink3)", whiteSpace: "nowrap" }}>
                            {s.logoutTime
                              ? <><div>{fmt(s.logoutTime, "date")}</div><div>{fmt(s.logoutTime, "time")}</div></>
                              : "—"
                            }
                          </td>
                          <td style={{ color: "var(--ink3)" }}>{duration}</td>
                          <td>{[s.city, s.country].filter(Boolean).join(", ") || "—"}</td>
                          <td style={{ fontFamily: "monospace", fontSize: 9, color: "var(--ink3)" }}>{s.ip !== "unknown" ? s.ip : "—"}</td>
                          <td>
                            <span style={{
                              ...pill,
                              background: isActive ? "#e6f4ea" : "#f3f4f6",
                              color:      isActive ? "#1a6b3c" : "#6b7280",
                            }}>
                              {isActive ? "🟢 En ligne" : "⚪ Déconnecté"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )
          }

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 14 }}>
              <button
                onClick={() => load(page - 1)}
                disabled={page === 0}
                style={{ padding: "5px 12px", borderRadius: 5, fontSize: 11, cursor: page === 0 ? "default" : "pointer", border: "1.5px solid var(--border)", background: "var(--surface2)", color: page === 0 ? "var(--ink3)" : "var(--ink)", opacity: page === 0 ? 0.4 : 1 }}
              >← Précédent</button>
              <span style={{ fontSize: 11, color: "var(--ink2)" }}>
                Page {page + 1} / {totalPages} &nbsp;·&nbsp; {total.toLocaleString()} sessions
              </span>
              <button
                onClick={() => load(page + 1)}
                disabled={page >= totalPages - 1}
                style={{ padding: "5px 12px", borderRadius: 5, fontSize: 11, cursor: page >= totalPages - 1 ? "default" : "pointer", border: "1.5px solid var(--border)", background: "var(--surface2)", color: page >= totalPages - 1 ? "var(--ink3)" : "var(--ink)", opacity: page >= totalPages - 1 ? 0.4 : 1 }}
              >Suivant →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
