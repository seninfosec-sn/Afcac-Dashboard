import { kvGet, kvSet } from "./db";
import type { SessionEntry } from "./types";

const SESSION_KEY = "sessions";
const TTL_MS = 24 * 60 * 60 * 1000; // keep 24 h of history

export async function getSessions(): Promise<SessionEntry[]> {
  return (await kvGet<SessionEntry[]>(SESSION_KEY)) ?? [];
}

export async function upsertSession(entry: SessionEntry): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === entry.sessionId);
  if (idx >= 0) {
    sessions[idx] = entry;
  } else {
    sessions.push(entry);
  }
  // Prune old entries
  const cutoff = new Date(Date.now() - TTL_MS).toISOString();
  const cleaned = sessions.filter((s) => s.lastSeen >= cutoff);
  await kvSet(SESSION_KEY, cleaned);
}

export async function touchSession(sessionId: string): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx < 0) return;
  sessions[idx].lastSeen = new Date().toISOString();
  await kvSet(SESSION_KEY, sessions);
}

export async function endSession(sessionId: string): Promise<void> {
  const sessions = await getSessions();
  const idx = sessions.findIndex((s) => s.sessionId === sessionId);
  if (idx < 0) return;
  sessions[idx].logoutTime = new Date().toISOString();
  sessions[idx].lastSeen   = new Date().toISOString();
  await kvSet(SESSION_KEY, sessions);
}

/** Sessions active in the last `minutes` minutes (no logout) */
export async function getOnlineSessions(minutes = 10): Promise<SessionEntry[]> {
  const sessions = await getSessions();
  const cutoff = new Date(Date.now() - minutes * 60 * 1000).toISOString();
  return sessions
    .filter((s) => !s.logoutTime && s.lastSeen >= cutoff)
    .sort((a, b) => b.lastSeen.localeCompare(a.lastSeen));
}

/** All sessions today (with or without logout) */
export async function getAllRecentSessions(): Promise<SessionEntry[]> {
  const sessions = await getSessions();
  const cutoff = new Date(Date.now() - TTL_MS).toISOString();
  return sessions
    .filter((s) => s.loginTime >= cutoff)
    .sort((a, b) => b.loginTime.localeCompare(a.loginTime));
}
