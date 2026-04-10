import fs from "fs";
import path from "path";
import type { KpiData, ActionRow, ActionStatus, CountryRow, TargetRow, DashboardData, UpdateLog, ExpertStat, AppUser } from "./types";

// On Vercel (serverless), /var/task is read-only — write to /tmp instead
const IS_SERVERLESS = process.env.VERCEL === "1" || process.env.AWS_LAMBDA_FUNCTION_NAME !== undefined;
const TMP_DIR = "/tmp/afcac-data";
const SOURCE_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

function ensureTmpDir(): void {
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
}

function readJson<T>(filename: string): T {
  if (IS_SERVERLESS) {
    ensureTmpDir();
    const tmpFile = path.join(TMP_DIR, filename);
    // If not yet in /tmp, copy from bundled source
    if (!fs.existsSync(tmpFile)) {
      const srcFile = path.join(SOURCE_DIR, filename);
      fs.copyFileSync(srcFile, tmpFile);
    }
    return JSON.parse(fs.readFileSync(tmpFile, "utf-8")) as T;
  }
  return JSON.parse(fs.readFileSync(path.join(SOURCE_DIR, filename), "utf-8")) as T;
}

function writeJson(filename: string, data: unknown): void {
  const content = JSON.stringify(data, null, 2);
  if (IS_SERVERLESS) {
    ensureTmpDir();
    fs.writeFileSync(path.join(TMP_DIR, filename), content, "utf-8");
  } else {
    fs.writeFileSync(path.join(SOURCE_DIR, filename), content, "utf-8");
  }
}

export function getKpis(): KpiData {
  return readJson<KpiData>("kpis.json");
}

export function getActions(): ActionRow[] {
  return readJson<ActionRow[]>("actions.json");
}

export function getCountries(): CountryRow[] {
  return readJson<CountryRow[]>("countries.json");
}

export function getTargets(): TargetRow[] {
  return readJson<TargetRow[]>("targets.json");
}

export function getDashboardData(): DashboardData {
  return {
    kpis: getKpis(),
    actions: getActions(),
    countries: getCountries(),
    targets: getTargets(),
  };
}

export function saveKpis(data: KpiData): void {
  writeJson("kpis.json", data);
}

export function saveActions(data: ActionRow[]): void {
  writeJson("actions.json", data);
}

export function saveCountries(data: CountryRow[]): void {
  writeJson("countries.json", data);
}

export function saveTargets(data: TargetRow[]): void {
  writeJson("targets.json", data);
}

export function saveDashboardData(data: DashboardData): void {
  saveKpis(data.kpis);
  saveActions(data.actions);
  saveCountries(data.countries);
  saveTargets(data.targets);
}

/* ── Country-specific targets ── */

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

export function getCountryTargets(country: string): TargetRow[] {
  try {
    const all = readJson<Record<string, TargetRow[]>>("country_targets.json");
    if (all[country] && all[country].length > 0) return all[country];
  } catch { /* fall through */ }
  // Return base template with pct=0
  return getTargets().map((t) => ({ ...t, pct: 0, status: "notstarted" as const }));
}

export function getAllCountryTargets(): Record<string, TargetRow[]> {
  try {
    return readJson<Record<string, TargetRow[]>>("country_targets.json");
  } catch {
    return {};
  }
}

export function saveCountryTargets(country: string, targets: TargetRow[]): void {
  // 1. Persist per-country answers
  let all: Record<string, TargetRow[]> = {};
  try { all = readJson<Record<string, TargetRow[]>>("country_targets.json"); } catch { /* empty */ }
  all[country] = targets;
  writeJson("country_targets.json", all);

  // 2. Sync this country's stats into countries.json
  syncCountryStats(country, targets);

  // 3. Sync action row in actions.json
  syncActionRow(country, targets);
}

function syncActionRow(country: string, targets: TargetRow[]): void {
  const total = targets.length;
  if (total === 0) return;

  const completed  = targets.filter((t) => t.pct === 100).length;
  const inprogress = targets.filter((t) => t.pct === 50 || t.pct === 75).length;
  const delayed    = targets.filter((t) => t.pct === 25).length;
  const notstarted = targets.filter((t) => t.pct === 0).length;

  let status: ActionStatus;
  if (completed === total)                                         status = "completed";
  else if (notstarted === total)                                   status = "notstarted";
  else if (inprogress >= delayed && inprogress >= notstarted)     status = "inprogress";
  else if (delayed > notstarted)                                   status = "delayed";
  else                                                             status = "notstarted";

  const actions = getActions();
  const idx = actions.findIndex((a) => a.country === country);
  const row = {
    country,
    action: "AST",
    section: "Safety Targets Questionnaire",
    status,
    start: 2024,
    end: 2025,
    duration: 1,
    budget: 0,
  };
  if (idx >= 0) {
    actions[idx] = { ...actions[idx], status };
  } else {
    actions.push(row);
  }
  saveActions(actions);
}

function syncCountryStats(country: string, targets: TargetRow[]): void {
  const total = targets.length;
  if (total === 0) return;

  const completed  = Math.round(targets.filter((t) => t.pct === 100).length               / total * 100);
  const inprogress = Math.round(targets.filter((t) => t.pct === 50 || t.pct === 75).length / total * 100);
  const delayed    = Math.round(targets.filter((t) => t.pct === 25).length                 / total * 100);
  const notstarted = Math.max(0, 100 - completed - inprogress - delayed);

  const countries = getCountries();
  const idx = countries.findIndex((c) => c.country === country);

  if (idx >= 0) {
    countries[idx] = { ...countries[idx], actions: total, completed, inprogress, delayed, onhold: 0, notstarted };
  } else {
    countries.push({
      country,
      region: COUNTRY_REGIONS[country] ?? "Africa",
      actions: total,
      completed,
      inprogress,
      delayed,
      onhold: 0,
      notstarted,
      budget: 0,
      entity: "CAA",
    });
  }
  saveCountries(countries);
}

/* ── Users ── */
export function getUsers(): AppUser[] {
  try {
    return readJson<AppUser[]>("users.json");
  } catch {
    return [];
  }
}

export function findUser(username: string): AppUser | null {
  return getUsers().find((u) => u.username === username) ?? null;
}

/* ── Update logs ── */
export function getUpdateLogs(): UpdateLog[] {
  try {
    return readJson<UpdateLog[]>("updates.json");
  } catch {
    return [];
  }
}

export function appendUpdateLog(log: UpdateLog): void {
  const logs = getUpdateLogs();
  logs.push(log);
  writeJson("updates.json", logs);
}

export function getTopExperts(limit = 3): ExpertStat[] {
  const logs = getUpdateLogs();
  const map: Record<string, { total: number; targetsSum: number; lastDate: string }> = {};

  for (const log of logs) {
    if (!map[log.username]) {
      map[log.username] = { total: 0, targetsSum: 0, lastDate: log.date };
    }
    map[log.username].total += 1;
    map[log.username].targetsSum += log.targetsUpdated;
    if (log.date > map[log.username].lastDate) {
      map[log.username].lastDate = log.date;
    }
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
