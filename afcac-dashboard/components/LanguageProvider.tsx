"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

type TranslationKey = keyof (typeof translations)["en"];

interface LangContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LangContext = createContext<LangContextValue>({
  locale: "en",
  setLocale: () => {},
  t: (key) => key,
});

export function useLanguage() {
  return useContext(LangContext);
}

function getCookieLang(): Locale {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)lang=([a-z]{2})/);
  const val = m?.[1];
  if (val === "fr" || val === "pt" || val === "en") return val;
  return "en";
}

export function LanguageProvider({
  children,
  initialLocale = "en",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // On mount, prefer cookie over server-passed value
  useEffect(() => {
    const cookieLang = getCookieLang();
    if (cookieLang !== locale) setLocaleState(cookieLang);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function setLocale(l: Locale) {
    setLocaleState(l);
    // Persist in cookie (1 year)
    document.cookie = `lang=${l};path=/;max-age=31536000;SameSite=Lax`;
  }

  function translate(key: TranslationKey): string {
    return (translations[locale][key] ?? translations["en"][key] ?? key) as string;
  }

  return (
    <LangContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LangContext.Provider>
  );
}
