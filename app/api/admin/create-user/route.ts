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
    displayName: string;
    devPassword: string;
    role: UserRole;
    country?: string;
    email?: string;
  };

  if (!body.username?.trim() || !body.displayName?.trim() || !body.devPassword?.trim()) {
    return NextResponse.json({ error: "username, displayName and password are required" }, { status: 400 });
  }

  const users = await getUsers();
  if (users.some((u) => u.username.toLowerCase() === body.username.trim().toLowerCase())) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  const newUser: AppUser = {
    username:     body.username.trim(),
    displayName:  body.displayName.trim(),
    role:         body.role ?? "focal_point",
    passwordHash: "",
    devPassword:  body.devPassword.trim(),
    email:        body.email?.trim() ?? "",
    country:      body.country?.trim() ?? "",
  };

  users.push(newUser);
  await kvSet("users", users);

  return NextResponse.json({ success: true });
}
