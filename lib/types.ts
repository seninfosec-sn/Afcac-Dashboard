export interface KpiData {
  totalCountries: number;
  totalCountriesTrend: string;
  totalActions: number;
  totalActionsTrend: string;
  totalBudget: number;
  pctCompleted: number;
  pctCompletedTrend: string;
  pctInProgress: number;
  pctInProgressTrend: string;
  pctDelayed: number;
  pctDelayedTrend: string;
  pctOnHold: number;
  pctOnHoldTrend: string;
  pctNotStarted: number;
  pctNotStartedTrend: string;
  avgDurationWeeks: number;
  expertsPlanned: number;
  reportPeriod: string;
  lastUpdated: string;
}

export type ActionStatus = "completed" | "inprogress" | "delayed" | "onhold" | "notstarted";

export interface ActionRow {
  country: string;
  action: string;
  section: string;
  status: ActionStatus;
  start: number;
  end: number;
  duration: number;
  budget: number;
}

export interface CountryRow {
  country: string;
  region: string;
  actions: number;
  completed: number;
  inprogress: number;
  delayed: number;
  onhold: number;
  notstarted: number;
  budget: number;
  entity: string;
}

export interface TargetRow {
  id: string;
  group: string;
  title: string;
  pct: number;
  status: ActionStatus;
  deadline: string;
}

export interface DashboardData {
  kpis: KpiData;
  actions: ActionRow[];
  countries: CountryRow[];
  targets: TargetRow[];
}

export interface UpdateLog {
  username: string;
  date: string;       // ISO string
  targetsUpdated: number;
  fullName?: string;
  country?: string;
}

export interface ExpertStat {
  username: string;
  totalUpdates: number;
  lastUpdate: string; // ISO string
  avgTargetsPerUpdate: number;
}

export type UserRole = "admin" | "expert";

export interface AppUser {
  username: string;
  displayName: string;
  role: UserRole;
  passwordHash: string;
  devPassword: string;
  email: string;
  country: string;
}
