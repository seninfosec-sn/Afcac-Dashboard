"use client";
import { useLanguage } from "./LanguageProvider";
import type { Locale } from "@/lib/i18n";

const LANGS: { code: Locale; flag: string; label: string }[] = [
  { code: "en", flag: "🇬🇧", label: "EN" },
  { code: "fr", flag: "🇫🇷", label: "FR" },
  { code: "pt", flag: "🇵🇹", label: "PT" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {LANGS.map(({ code, flag, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          title={label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 3,
            padding: "3px 7px",
            fontSize: 11,
            fontWeight: locale === code ? 700 : 400,
            cursor: "pointer",
            border: locale === code
              ? "1.5px solid rgba(255,255,255,0.6)"
              : "1.5px solid rgba(255,255,255,0.18)",
            borderRadius: 5,
            background: locale === code
              ? "rgba(255,255,255,0.18)"
              : "rgba(255,255,255,0.06)",
            color: locale === code ? "#fff" : "rgba(255,255,255,0.65)",
            transition: "all .15s",
          }}
        >
          <span style={{ fontSize: 13 }}>{flag}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
