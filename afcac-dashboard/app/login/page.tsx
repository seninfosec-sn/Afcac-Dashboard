"use client";
import { useState, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect") ?? "/admin";
  const { t } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? t("loginFailed"));
      } else {
        router.push(redirect);
        router.refresh();
      }
    } catch {
      setError(t("networkError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Language switcher at the top */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
          <LanguageSwitcher />
        </div>

        <div className="login-logo">
          <img src="/afcac_logo.png" alt="AFCAC Logo" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        </div>
        <div className="login-title">{t("loginTitle")}</div>
        <div className="login-sub">{t("loginSub")}</div>

        {error && <div className="error-msg">⚠ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="username">{t("labelUsername")}</label>
            <input
              id="username"
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={t("placeholderUsername")}
              autoComplete="username"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">{t("labelPassword")}</label>
            <input
              id="password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? t("signingIn") : t("signIn")}
          </button>
        </form>

        <div style={{ marginTop: 20, textAlign: "center", fontSize: 11, color: "var(--ink3)" }}>
          <Link href="/" style={{ color: "var(--forest2)", textDecoration: "none" }}>
            {t("backToDashboard")}
          </Link>
        </div>

        <div style={{ marginTop: 16, padding: "10px 14px", background: "var(--snow)", borderRadius: 6, fontSize: 11, color: "var(--ink3)", borderLeft: "3px solid var(--gold)" }}>
          <strong>{t("adminAccounts")}</strong>
          <ul style={{ margin: "6px 0 0 0", paddingLeft: 16, lineHeight: 1.8 }}>
            <li><code>admin</code> — password : <code>admin123</code></li>
            <li><code>agnes.aguma</code> — password : <code>Agnes2024</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="login-page"><div className="login-card">Loading…</div></div>}>
      <LoginForm />
    </Suspense>
  );
}
