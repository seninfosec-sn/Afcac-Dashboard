import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, createToken, buildSessionCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body as { username: string; password: string };

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
    const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";

    if (username !== expectedUsername) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // In development without a hash, allow a default password "admin123"
    let valid = false;
    if (!passwordHash || passwordHash.startsWith("$REPLACE")) {
      valid = password === "admin123";
    } else {
      valid = await verifyPassword(password, passwordHash);
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createToken(username);
    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", buildSessionCookie(token));
    return response;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
