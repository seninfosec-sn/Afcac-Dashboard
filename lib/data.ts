import fs from "fs";
import path from "path";
import type { KpiData, ActionRow, CountryRow, TargetRow, DashboardData } from "./types";

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(process.cwd(), "data");

function readJson<T>(filename: string): T {
  const file = path.join(DATA_DIR, filename);
  const raw = fs.readFileSync(file, "utf-8");
  return JSON.parse(raw) as T;
}

function writeJson(filename: string, data: unknown): void {
  const file = path.join(DATA_DIR, filename);
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf-8");
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
