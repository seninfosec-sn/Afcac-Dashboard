import fs from "fs";
import path from "path";
import type { KpiData, ActionRow, CountryRow, TargetRow, DashboardData, UpdateLog, ExpertStat, AppUser } from "./types";

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
