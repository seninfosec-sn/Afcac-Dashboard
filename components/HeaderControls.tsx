"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderControls({ session }: { session: { username: string; role: string } | null }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  if (!session) {
    return (
      <Link href="/login" className="hbtn" title="Admin Login" style={{ fontSize: 11, width: "auto", padding: "0 12px", gap: 6, textDecoration: "none" }}>
        🔐 Sign In
      </Link>
    );
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <Link href="/admin" className="hbtn" style={{ fontSize: 11, width: "auto", padding: "0 12px", gap: 6, textDecoration: "none", background: "rgba(255,255,255,0.12)" }}>
        ⚙ Admin
      </Link>
      <button
        onClick={handleLogout}
        className="hbtn"
        style={{ fontSize: 11, width: "auto", padding: "0 12px", gap: 6, cursor: "pointer", border: "1.5px solid rgba(255,100,100,0.5)", background: "rgba(200,50,50,0.15)", color: "#ffaaaa" }}
        title={`Déconnecter ${session.username}`}
      >
        ⏻ Log Out
      </button>
    </div>
  );
}
