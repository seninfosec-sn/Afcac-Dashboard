import fs from "fs";
import path from "path";
import { kvGet, kvSet } from "./db";
import type { KpiData, ActionRow, ActionStatus, CountryRow, TargetRow, DashboardData, UpdateLog, ExpertStat, AppUser } from "./types";

// JSON files are read-only seeds (bundled at build time — readable on Vercel too)
const SOURCE_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

function readJsonFile<T>(filename: string): T {
  return JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, filename), "utf-8")) as T;
}

// DB keys
const K = {
  kpis:           "kpis",
  actions:        "actions",
  countries:      "countries",
  targets:        "targets",
  countryTargets: "country_targets",
  updates:        "updates",
} as const;

/** Read from DB; if missing, seed from the bundled JSON file and return. */
async function dbGetOrSeed<T>(key: string, filename: string): Promise<T> {
  const cached = await kvGet<T>(key);
  if (cached !== null) return cached;
  const data = readJsonFile<T>(filename);
  await kvSet(key, data);
  return data;
}

/* ── Readers ─────────────────────────────────────── */

export async function getKpis(): Promise<KpiData> {
  return dbGetOrSeed<KpiData>(K.kpis, "kpis.json");
}

const COUNTRY_RENAMES: Record<string, string> = { "Ivory Coast": "Cote D'Ivoire" };

function renameCountry(name: string): string {
  return COUNTRY_RENAMES[name] ?? name;
}

export async function getCountries(): Promise<CountryRow[]> {
  const rows = await dbGetOrSeed<CountryRow[]>(K.countries, "countries.json");
  const fixed = rows.map(r => ({ ...r, country: renameCountry(r.country) }));
  if (fixed.some((r, i) => r.country !== rows[i].country)) await kvSet(K.countries, fixed);
  return fixed;
}

export async function getActions(): Promise<ActionRow[]> {
  const rows = await dbGetOrSeed<ActionRow[]>(K.actions, "actions.json");
  const fixed = rows
    .map(r => (r.status as string) === "onhold" ? { ...r, status: "notstarted" as const } : r)
    .map(r => ({ ...r, country: renameCountry(r.country) }));
  if (fixed.some((r, i) => r.country !== rows[i].country)) await kvSet(K.actions, fixed);
  return fixed;
}

const DEADLINE_FIXES: Record<string, string> = { "Dec 2025": "May 2026" };

function fixDeadlines<T extends { deadline?: string }>(rows: T[]): T[] {
  return rows.map(r => r.deadline && DEADLINE_FIXES[r.deadline] ? { ...r, deadline: DEADLINE_FIXES[r.deadline] } : r);
}

export async function getTargets(): Promise<TargetRow[]> {
  const rows = await dbGetOrSeed<TargetRow[]>(K.targets, "targets.json");
  const fixed = fixDeadlines(rows);
  if (fixed.some((r, i) => r.deadline !== rows[i].deadline)) await kvSet(K.targets, fixed);
  return fixed;
}

export async function getDashboardData(): Promise<DashboardData> {
  const [kpis, actions, countries, targets] = await Promise.all([
    getKpis(), getActions(), getCountries(), getTargets(),
  ]);
  return { kpis, actions, countries, targets };
}

/* ── Writers ─────────────────────────────────────── */

export async function saveKpis(data: KpiData): Promise<void> {
  await kvSet(K.kpis, data);
}

export async function saveActions(data: ActionRow[]): Promise<void> {
  await kvSet(K.actions, data);
}

export async function saveCountries(data: CountryRow[]): Promise<void> {
  await kvSet(K.countries, data);
}

export async function saveTargets(data: TargetRow[]): Promise<void> {
  await kvSet(K.targets, data);
}

export async function saveDashboardData(data: DashboardData): Promise<void> {
  await Promise.all([
    saveKpis(data.kpis),
    saveActions(data.actions),
    saveCountries(data.countries),
    saveTargets(data.targets),
  ]);
}

/* ── Country-specific targets ───────────────────── */

const COUNTRY_REGIONS: Record<string, string> = {
  "Algeria": "North Africa",     "Angola": "Southern Africa",   "Benin": "West Africa",
  "Botswana": "Southern Africa", "Burkina Faso": "West Africa", "Burundi": "East Africa",
  "Cabo Verde": "West Africa",   "Cameroon": "Central Africa",  "Central African Republic": "Central Africa",
  "Chad": "Central Africa",      "Comoros": "East Africa",      "Congo (Republic)": "Central Africa",
  "DR Congo": "Central Africa",  "Djibouti": "East Africa",     "Egypt": "North Africa",
  "Equatorial Guinea": "Central Africa", "Eritrea": "East Africa", "Eswatini": "Southern Africa",
  "Ethiopia": "East Africa",     "Gabon": "Central Africa",     "Gambia": "West Africa",
  "Ghana": "West Africa",        "Guinea": "West Africa",       "Guinea-Bissau": "West Africa",
  "Cote D'Ivoire": "West Africa",  "Kenya": "East Africa",        "Lesotho": "Southern Africa",
  "Liberia": "West Africa",      "Libya": "North Africa",       "Madagascar": "East Africa",
  "Malawi": "East Africa",       "Mali": "West Africa",         "Mauritania": "North Africa",
  "Mauritius": "East Africa",    "Morocco": "North Africa",     "Mozambique": "Southern Africa",
  "Namibia": "Southern Africa",  "Niger": "West Africa",        "Nigeria": "West Africa",
  "Rwanda": "East Africa",       "São Tomé & Príncipe": "Central Africa", "Senegal": "West Africa",
  "Seychelles": "East Africa",   "Sierra Leone": "West Africa", "Somalia": "East Africa",
  "South Africa": "Southern Africa", "South Sudan": "East Africa", "Sudan": "North Africa",
  "Tanzania": "East Africa",     "Togo": "West Africa",         "Tunisia": "North Africa",
  "Uganda": "East Africa",       "Zambia": "Southern Africa",   "Zimbabwe": "Southern Africa",
};

export async function getAllCountryTargets(): Promise<Record<string, TargetRow[]>> {
  const raw = (await kvGet<Record<string, TargetRow[]>>(K.countryTargets)) ?? {};
  let dirty = false;
  const all: Record<string, TargetRow[]> = {};
  for (const country of Object.keys(raw)) {
    const newKey = renameCountry(country);
    if (newKey !== country) dirty = true;
    const original = raw[country];
    all[newKey] = fixDeadlines(original.map((t) =>
      (t.status as string) === "onhold" ? { ...t, status: "notstarted" as const } : t
    ));
    if (all[newKey].some((r, i) => r.deadline !== original[i]?.deadline)) dirty = true;
  }
  if (dirty) await kvSet(K.countryTargets, all);
  return all;
}

export async function getCountryTargets(country: string): Promise<TargetRow[]> {
  const all = await getAllCountryTargets();
  if (all[country]?.length > 0) return all[country];
  // First visit: blank template (pct=0)
  const base = await getTargets();
  return base.map((t) => ({ ...t, pct: 0, status: "notstarted" as const }));
}

export async function saveCountryTargets(country: string, targets: TargetRow[]): Promise<void> {
  // 1. Persist per-country answers
  const all = await getAllCountryTargets();
  all[country] = targets;
  await kvSet(K.countryTargets, all);

  // 2–4. Update all derived data in parallel where possible
  await Promise.all([
    syncCountryStats(country, targets),
    syncActionRow(country, targets),
  ]);
  await recomputeAggregateTargets(all);
}

async function recomputeAggregateTargets(all: Record<string, TargetRow[]>): Promise<void> {
  const submissions = Object.values(all).filter((s) => s.length > 0);
  if (submissions.length === 0) return;

  const base = await getTargets();
  const VALID = [0, 25, 50, 75, 100] as const;
  const statusMap: Record<number, TargetRow["status"]> = {
    0: "notstarted", 25: "delayed", 50: "inprogress", 75: "inprogress", 100: "completed",
  };

  const aggregate = base.map((t) => {
    const pcts = submissions.map((s) => s.find((x) => x.id === t.id)?.pct ?? 0);
    const avg = pcts.reduce((a, b) => a + b, 0) / pcts.length;
    const rounded = VALID.reduce((prev, curr) =>
      Math.abs(curr - avg) < Math.abs(prev - avg) ? curr : prev
    );
    return { ...t, pct: rounded, status: statusMap[rounded] };
  });

  await saveTargets(aggregate);
}

async function syncActionRow(country: string, targets: TargetRow[]): Promise<void> {
  const total = targets.length;
  if (total === 0) return;

  const completed  = targets.filter((t) => t.pct === 100).length;
  const inprogress = targets.filter((t) => t.pct === 50 || t.pct === 75).length;
  const delayed    = targets.filter((t) => t.pct === 25).length;
  const notstarted = targets.filter((t) => t.pct === 0).length;

  let status: ActionStatus;
  if (completed === total)                                     status = "completed";
  else if (notstarted === total)                               status = "notstarted";
  else if (inprogress >= delayed && inprogress >= notstarted) status = "inprogress";
  else if (delayed > notstarted)                              status = "delayed";
  else                                                        status = "notstarted";

  const actions = await getActions();
  const idx = actions.findIndex((a) => a.country === country);
  if (idx >= 0) {
    actions[idx] = { ...actions[idx], status };
  } else {
    actions.push({ country, action: "AST", section: "Safety Targets Questionnaire", status, start: 2024, end: 2025, duration: 1, budget: 0 });
  }
  await saveActions(actions);
}

async function syncCountryStats(country: string, targets: TargetRow[]): Promise<void> {
  const total = targets.length;
  if (total === 0) return;

  const completed  = Math.round(targets.filter((t) => t.pct === 100).length                / total * 100);
  const inprogress = Math.round(targets.filter((t) => t.pct === 50 || t.pct === 75).length / total * 100);
  const delayed    = Math.round(targets.filter((t) => t.pct === 25).length                  / total * 100);
  const notstarted = Math.max(0, 100 - completed - inprogress - delayed);

  const countries = await getCountries();
  const idx = countries.findIndex((c) => c.country === country);
  if (idx >= 0) {
    countries[idx] = { ...countries[idx], actions: total, completed, inprogress, delayed, notstarted };
  } else {
    countries.push({ country, region: COUNTRY_REGIONS[country] ?? "Africa", actions: total, completed, inprogress, delayed, notstarted, budget: 0, entity: "CAA" });
  }
  await saveCountries(countries);
}

/* ── Country-filtered dashboard ─────────────────── */

export function filterDashboardForCountry(
  data: DashboardData,
  countryTargets: Record<string, TargetRow[]>,
  country: string
): DashboardData & { countryTargets: Record<string, TargetRow[]> } {
  const actions   = data.actions.filter((a) => a.country === country);
  const countries = data.countries.filter((c) => c.country === country);
  const targets   = countryTargets[country] ?? data.targets.map((t) => ({ ...t, pct: 0, status: "notstarted" as const }));

  // All KPI percentages derived from targets (questionnaire objectives) for the country
  // profile — a single synthetic action row per country is not granular enough.
  const tTotal = targets.length || 1;
  const tPct = (fn: (t: TargetRow) => boolean) => Math.round(targets.filter(fn).length / tTotal * 100);

  const kpis: KpiData = {
    ...data.kpis,
    totalCountries:      1,
    totalCountriesTrend: "",
    totalActions:        targets.filter((t) => t.pct > 0).length,
    totalActionsTrend:   "",
    pctCompleted:        tPct((t) => t.pct === 100),
    pctInProgress:       tPct((t) => t.pct > 0 && t.pct < 100),
    pctDelayed:      0,
    pctNotStarted:   tPct((t) => t.pct === 0),
  };

  return {
    kpis,
    actions,
    countries,
    targets,
    countryTargets: { [country]: targets },
  };
}

/* ── Users (Neon DB primary, JSON file fallback) ─── */

export async function getUsers(): Promise<AppUser[]> {
  let kvUsers: AppUser[] | null = null;
  try { kvUsers = await kvGet<AppUser[]>("users"); } catch { /* ignore */ }

  let fileUsers: AppUser[] = [];
  try { fileUsers = readJsonFile<AppUser[]>("users.json"); } catch { /* ignore */ }

  if (!kvUsers || kvUsers.length === 0) return fileUsers;

  // Migrate country renames in KV
  const renamed = kvUsers.map(u => u.country ? { ...u, country: renameCountry(u.country) } : u);
  const needsRename = renamed.some((u, i) => u.country !== kvUsers![i].country);

  // Auto-sync: add any new user from users.json not yet in KV
  const kvUsernames = new Set(renamed.map((u) => u.username.toLowerCase()));
  const missing = fileUsers.filter((u) => !kvUsernames.has(u.username.toLowerCase()));

  if (needsRename || missing.length > 0) {
    const merged = [...renamed, ...missing];
    try { await kvSet("users", merged); } catch { /* ignore */ }
    return merged;
  }
  return renamed;
}

export async function findUser(username: string): Promise<AppUser | null> {
  const normalized = username.trim().toLowerCase();
  const users = await getUsers();
  return users.find((u) => u.username.toLowerCase() === normalized) ?? null;
}

/* ── Update logs ─────────────────────────────────── */

export async function getUpdateLogs(): Promise<UpdateLog[]> {
  return (await kvGet<UpdateLog[]>(K.updates)) ?? [];
}

export async function appendUpdateLog(log: UpdateLog): Promise<void> {
  const logs = await getUpdateLogs();
  logs.push(log);
  await kvSet(K.updates, logs);
}

export async function getTopExperts(limit = 3, country?: string | null): Promise<ExpertStat[]> {
  const allLogs = await getUpdateLogs();
  const logs = country ? allLogs.filter(l => l.country === country) : allLogs;
  const map: Record<string, { total: number; targetsSum: number; lastDate: string; fullName?: string }> = {};

  for (const log of logs) {
    if (!map[log.username]) map[log.username] = { total: 0, targetsSum: 0, lastDate: log.date };
    map[log.username].total += 1;
    map[log.username].targetsSum += log.targetsUpdated;
    if (log.date > map[log.username].lastDate) {
      map[log.username].lastDate = log.date;
      if (log.fullName) map[log.username].fullName = log.fullName;
    }
  }

  return Object.entries(map)
    .map(([username, s]) => ({
      username,
      fullName: s.fullName,
      totalUpdates: s.total,
      lastUpdate: s.lastDate,
      avgTargetsPerUpdate: Math.round(s.targetsSum / s.total),
    }))
    .sort((a, b) => b.totalUpdates - a.totalUpdates)
    .slice(0, limit);
}

export async function getLastCountryUpdate(country?: string | null): Promise<UpdateLog | null> {
  const logs = await getUpdateLogs();
  const filtered = country ? logs.filter(l => l.country === country) : logs;
  if (filtered.length === 0) return null;
  return filtered.reduce((latest, log) => log.date > latest.date ? log : latest);
}
