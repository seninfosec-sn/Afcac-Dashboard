import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";

const COOKIE_NAME = "afcac_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? "afcac-dashboard-dev-secret-key-2024-change-in-prod";
  return new TextEncoder().encode(secret);
}

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

    // Validate password
    let valid = false;
    if (!passwordHash || passwordHash.startsWith("$REPLACE") || passwordHash === "") {
      // Dev mode: plain text comparison
      valid = password === "admin123";
    } else {
      // Production: bcrypt comparison — dynamic import to avoid bundler issues
      const bcrypt = await import("bcryptjs");
      valid = await bcrypt.compare(password, passwordHash);
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Create JWT token
    const token = await new SignJWT({ username })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(getSecret());

    // Set cookie
    const cookie = `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Strict${
      process.env.NODE_ENV === "production" ? "; Secure" : ""
    }`;

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
