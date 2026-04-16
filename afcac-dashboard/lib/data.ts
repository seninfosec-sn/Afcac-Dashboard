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

export async function getActions(): Promise<ActionRow[]> {
  return dbGetOrSeed<ActionRow[]>(K.actions, "actions.json");
}

export async function getCountries(): Promise<CountryRow[]> {
  return dbGetOrSeed<CountryRow[]>(K.countries, "countries.json");
}

export async function getTargets(): Promise<TargetRow[]> {
  return dbGetOrSeed<TargetRow[]>(K.targets, "targets.json");
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
  "Ivory Coast": "West Africa",  "Kenya": "East Africa",        "Lesotho": "Southern Africa",
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
  return (await kvGet<Record<string, TargetRow[]>>(K.countryTargets)) ?? {};
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
    countries[idx] = { ...countries[idx], actions: total, completed, inprogress, delayed, onhold: 0, notstarted };
  } else {
    countries.push({ country, region: COUNTRY_REGIONS[country] ?? "Africa", actions: total, completed, inprogress, delayed, onhold: 0, notstarted, budget: 0, entity: "CAA" });
  }
  await saveCountries(countries);
}

/* ── Users (read-only from bundled file) ─────────── */

export function getUsers(): AppUser[] {
  try { return readJsonFile<AppUser[]>("users.json"); } catch { return []; }
}

export function findUser(username: string): AppUser | null {
  const normalized = username.trim().toLowerCase();
  return getUsers().find((u) => u.username.toLowerCase() === normalized) ?? null;
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

export async function getTopExperts(limit = 3): Promise<ExpertStat[]> {
  const logs = await getUpdateLogs();
  const map: Record<string, { total: number; targetsSum: number; lastDate: string }> = {};

  for (const log of logs) {
    if (!map[log.username]) map[log.username] = { total: 0, targetsSum: 0, lastDate: log.date };
    map[log.username].total += 1;
    map[log.username].targetsSum += log.targetsUpdated;
    if (log.date > map[log.username].lastDate) map[log.username].lastDate = log.date;
  }

  return Object.entries(map)
    .map(([username, s]) => ({
      username,
      totalUpdates: s.total,
      lastUpdate: s.lastDate,
      avgTargetsPerUpdate: Math.round(s.targetsSum / s.total),
    }))
    .sort((a, b) => b.totalUpdates - a.totalUpdates)
    .slice(0, limit);
}
