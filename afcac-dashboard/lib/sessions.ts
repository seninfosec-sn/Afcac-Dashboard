import { kvGet, kvSet, insertSessionLog, updateSessionLastSeen, setSessionLogout } from "./db";
import type { SessionEntry } from "./types";

const SESSION_KEY = "sessions";
const TTL_MS = 24 * 60 * 60 * 1000; // KV keeps 24 h for real-time view

export async function getSessions(): Promise<SessionEntry[]> {
  return (await kvGet<SessionEntry[]>(SESSION_KEY)) ?? [];
}

export async function upsertSession(entry: SessionEntry): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === entry.sessionId);
  const isNew = idx < 0;

  if (isNew) {
    sessions.push(entry);
  } else {
    sessions[idx] = entry;
  }

  // Prune KV to last 24 h
  const cutoff = new Date(Date.now() - TTL_MS).toISOString();
  const cleaned = sessions.filter((s) => s.lastSeen >= cutoff);
  await kvSet(SESSION_KEY, cleaned);

  // Persist permanently in SQL (fire-and-forget)
  if (isNew) {
    insertSessionLog(entry).catch(() => {});
  } else {
    updateSessionLastSeen(entry.sessionId, entry.lastSeen).catch(() => {});
  }
}

export async function touchSession(sessionId: string): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx < 0) return;
  const now = new Date().toISOString();
  sessions[idx].lastSeen = now;
  await kvSet(SESSION_KEY, sessions);

  updateSessionLastSeen(sessionId, now).catch(() => {});
}

export async function endSession(sessionId: string): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx < 0) return;
  const now = new Date().toISOString();
  sessions[idx].logoutTime = now;
  sessions[idx].lastSeen   = now;
  await kvSet(SESSION_KEY, sessions);

  setSessionLogout(sessionId, now).catch(() => {});
}

/** Sessions active in the last `minutes` minutes (no logout) */
export async function getOnlineSessions(minutes = 10): Promise<SessionEntry[]> {
  const sessions = await getSessions();
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString();
  return sessions
    .filter((s) => !s.logoutTime && s.lastSeen >= cutoff)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}

/** All sessions from the KV (last 24 h) — kept for backwards compat */
export async function getAllRecentSessions(): Promise<SessionEntry[]> {
  const sessions = await getSessions();
  const cutoff = new Date(Date.now() - TTL_MS).toISOString();
  return sessions
    .filter((s) => s.loginTime >= cutoff)
    .sort((a, b) => b.loginTime.localeCompare(a.loginTime));
}
