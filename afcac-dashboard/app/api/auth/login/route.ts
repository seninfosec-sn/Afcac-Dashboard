import { NextRequest, NextResponse } from "next/server";
import { findUser } from "@/lib/data";
import { createToken, buildSessionCookie } from "@/lib/auth";

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

    const user = findUser(username);
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Validate password
    let valid = false;
    if (!user.passwordHash || user.passwordHash === "") {
      // Dev mode: plain text comparison against devPassword
      valid = password === user.devPassword;
    } else {
      // Production: bcrypt comparison
      const bcrypt = await import("bcryptjs");
      valid = await bcrypt.compare(password, user.passwordHash);
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = await createToken(user.username, user.role);
    const cookie = buildSessionCookie(token);

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
