import { getDashboardData, getTopExperts, getAllCountryTargets, findUser, filterDashboardForCountry } from "@/lib/data";
import { getServerSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import HeaderControls from "@/components/HeaderControls";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import KpiGrid from "@/components/KpiGrid";
import StatusBar from "@/components/StatusBar";
import ActionTable from "@/components/ActionTable";
import BreakdownTable from "@/components/BreakdownTable";
import TargetGrid from "@/components/TargetGrid";
import AfricaMap from "@/components/AfricaMap";
import StatusDonut from "@/components/StatusDonut";
import CountryReportCard from "@/components/CountryReportCard";

export const dynamic = "force-dynamic"; // always fresh data

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const locale: Locale = langCookie === "fr" || langCookie === "pt" ? langCookie : "en";

  const [rawData, experts, allCountryTargets, session] = await Promise.all([
    getDashboardData(),
    getTopExperts(3),
    getAllCountryTargets(),
    getServerSession(),
  ]);

  const isAdmin = session?.role === "admin";

  // Determine user country for focal_point filtering
  let userCountry: string | null = null;
  if (session && !isAdmin) {
    const appUser = await findUser(session.username);
    userCountry = appUser?.country?.trim() || null;
  }

  // Apply country filter for non-admin users with an assigned country
  const filtered = (!isAdmin && userCountry)
    ? filterDashboardForCountry(rawData, allCountryTargets, userCountry)
    : null;

  const { kpis, actions, countries, targets } = filtered ?? rawData;
  const countryTargets = filtered?.countryTargets ?? allCountryTargets;

  return (
    <>
      {/* ── HEADER ── */}
      <header className="db-header">
        <div className="db-header-inner">
          <div className="db-emblem">
            <img src="/afcac_logo.png" alt="AFCAC Logo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
          </div>
          <div className="db-title-wrap">
            <div className="db-title">{t(locale, "dashboardTitle")}</div>
            <div className="db-sub">{t(locale, "dashboardSub")}</div>
          </div>
          <div className="db-controls">
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div className="status-dot" />
              <span className="live-label">{t(locale, "live")}</span>
            </div>
            <div className="hctl">
              📅 <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }}>{kpis.reportPeriod}</span>
            </div>
            <LanguageSwitcher />
            <HeaderControls session={session} />
          </div>
        </div>
      </header>

      {/* ── MAIN CANVAS ── */}
      <div className="canvas">

        {/* Section 1: KPI Summary */}
        <div className="section-label">{t(locale, "execSummary")}</div>
        <KpiGrid kpis={kpis} experts={experts} locale={locale} />

        {/* Section 2: Status + Action Table */}
        <div className="section-label">{t(locale, "statusOverview")}</div>
        <div className="row-wide">
          <StatusDonut kpis={kpis} isAdmin={isAdmin} />
          <ActionTable actions={actions} targets={targets} countryTargets={countryTargets} isAdmin={isAdmin} canExport={!!session} />
        </div>

        {/* Section 3: Map + Status Bar */}
        <div className="section-label">{t(locale, "geoOverview")}</div>
        <div className="row-map">
          <AfricaMap countries={countries} isAdmin={isAdmin} />
          <StatusBar kpis={kpis} isAdmin={isAdmin} canExport={!!session} />
        </div>

        {/* Section 4: Country Breakdown */}
        <div className="section-label">{t(locale, "countryBreakdown")}</div>
        <BreakdownTable countries={countries} isAdmin={isAdmin} canExport={!!session} />

        {/* Section 5: Safety Targets */}
        <div className="section-label">{t(locale, "questProgress")}</div>
        <TargetGrid targets={targets} isAdmin={isAdmin} canExport={!!session} />

        {/* Section 6: Download Reports (all authenticated users) */}
        {session && (
          <>
            <div className="section-label">{t(locale, "reportSection")}</div>
            <CountryReportCard
              kpis={kpis}
              actions={actions}
              countries={countries}
              targets={targets}
              userCountry={userCountry}
            />
          </>
        )}

      </div>

      {/* ── FOOTER ── */}
      <footer className="db-footer">
        <span>
          <strong>{t(locale, "footerTitle")}</strong> ·{" "}
          {t(locale, "lastUpdated")}: {kpis.lastUpdated}
        </span>
        <span>{t(locale, "footerSource")}</span>
      </footer>
    </>
  );
}
