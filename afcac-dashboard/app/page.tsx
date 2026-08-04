import { cookies } from "next/headers";
import Link from "next/link";
import { t } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const ABUJA_URL = "https://safety-dashboard-master.vercel.app/";
const WINDHOEK_URL = "https://afcac-windhoek-dashboard.vercel.app";

export default async function HomePage() {
  const cookieStore = await cookies();
  const langCookie = cookieStore.get("lang")?.value;
  const locale: Locale = langCookie === "fr" || langCookie === "pt" || langCookie === "ar" ? langCookie : "en";

  return (
    <div className="landing-page">
      <div className="landing-topbar">
        <LanguageSwitcher />
      </div>

      <div className="landing-header">
        <img src="/afcac_logo.png" alt="AFCAC Logo" className="landing-logo" />
        <h1 className="landing-heading">{t(locale, "landingHeading")}</h1>
        <p className="landing-subheading">{t(locale, "landingSubheading")}</p>
      </div>

      <div className="landing-grid">
        <Link href={ABUJA_URL} target="_blank" rel="noopener noreferrer" className="landing-card">
          <div className="landing-card-title">{t(locale, "dashboardSub")}</div>
          <span className="landing-card-cta">{t(locale, "cardEnter")}</span>
        </Link>

        <Link href={WINDHOEK_URL} target="_blank" rel="noopener noreferrer" className="landing-card">
          <div className="landing-card-title">{t(locale, "card2Title")}</div>
          <span className="landing-card-cta">{t(locale, "cardEnter")}</span>
        </Link>
      </div>
    </div>
  );
}
