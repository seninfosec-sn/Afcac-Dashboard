import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "./types";

const COOKIE_NAME = "afcac_session";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getSecret(): Uint8Array {
  const secret = process.env.JWT_SECRET ?? "afcac-dashboard-dev-secret-key-2024-change-in-prod";
  return new TextEncoder().encode(secret);
}

export async function createToken(username: string, role: UserRole, sessionId?: string): Promise<string> {
  return new SignJWT({ username, role, sessionId: sessionId ?? "" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(getSecret());
}

export async function verifyToken(
  token: string
): Promise<{ username: string; role: UserRole; sessionId: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      username:  payload.username  as string,
      role:     (payload.role      as UserRole) ?? "expert",
      sessionId: payload.sessionId as string ?? "",
    };
  } catch {
    return null;
  }
}

export async function getServerSession(): Promise<{ username: string; role: UserRole; sessionId: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function buildSessionCookie(token: string): string {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Strict${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict`;
}

export { COOKIE_NAME };
