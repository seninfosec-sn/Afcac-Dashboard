import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "@/lib/auth";
import { getUsers } from "@/lib/data";
import { kvSet } from "@/lib/db";

const MASTER_ADMINS = ["admin", "mohamed.wade"];

export async function POST(request: NextRequest) {
  const session = await getServerSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { username } = await request.json() as { username: string };

  if (!username?.trim()) {
    return NextResponse.json({ error: "username is required" }, { status: 400 });
  }
  if (MASTER_ADMINS.includes(username)) {
    return NextResponse.json({ error: "Cannot delete master admin" }, { status: 403 });
  }
  if (username === session.username) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 403 });
  }

  const users = await getUsers();
  const filtered = users.filter((u) => u.username !== username);
  if (filtered.length === users.length) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await kvSet("users", filtered);
  return NextResponse.json({ success: true });
}
