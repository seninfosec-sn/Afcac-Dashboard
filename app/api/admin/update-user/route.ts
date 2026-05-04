import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getUsers } from "@/lib/data";
import { kvSet } from "@/lib/db";
import type { AppUser, UserRole } from "@/lib/types";

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const body = await request.json() as {
    username: string;
    devPassword?: string;
    role?: UserRole;
    country?: string;
    displayName?: string;
    email?: string;
  };

  if (!body.username) {
    return NextResponse.json({ error: "username required" }, { status: 400 });
  }

  const users = await getUsers();
  const idx = users.findIndex((u) => u.username.toLowerCase() === body.username.toLowerCase());
  if (idx < 0) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const updated: AppUser = { ...users[idx] };
  if (body.devPassword !== undefined && body.devPassword.trim() !== "") {
    updated.devPassword  = body.devPassword.trim();
    updated.passwordHash = "";           // reset hash — dev mode
  }
  if (body.role        !== undefined) updated.role        = body.role;
  if (body.country     !== undefined) updated.country     = body.country;
  if (body.displayName !== undefined && body.displayName.trim() !== "")
    updated.displayName = body.displayName.trim();
  if (body.email !== undefined) updated.email = body.email;

  users[idx] = updated;
  await kvSet("users", users);

  return NextResponse.json({ success: true });
}
