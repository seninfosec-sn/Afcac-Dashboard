import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { touchSession } from "@/lib/sessions";

export async function POST() {
  const session = await getServerSession();
  if (session?.sessionId) {
    touchSession(session.sessionId).catch(() => {/* ignore */});
  }
  return NextResponse.json({ ok: true });
}
