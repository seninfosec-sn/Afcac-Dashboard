import { NextResponse } from "next/server";
import { buildClearCookie, getServerSession } from "@/lib/auth";
import { endSession } from "@/lib/sessions";

export async function POST() {
  const session = await getServerSession();
  if (session?.sessionId) {
    endSession(session.sessionId).catch(() => {/* ignore */});
  }
  const response = NextResponse.json({ success: true });
  response.headers.set("Set-Cookie", buildClearCookie());
  return response;
}
