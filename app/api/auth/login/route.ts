import { NextRequest, NextResponse } from "next/server";
import { findUser } from "@/lib/data";
import { createToken, buildSessionCookie } from "@/lib/auth";
import { upsertSession } from "@/lib/sessions";

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

    const user = await findUser(username.trim().toLowerCase());
    if (!user) {
      console.warn("[LOGIN] User not found:", username);
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Validate password
    let valid = false;
    const trimmedPassword = password.trim();
    if (!user.passwordHash || user.passwordHash === "") {
      valid = trimmedPassword === user.devPassword;
      console.log("[LOGIN] Dev auth for", user.username, "→", valid);
    } else {
      const bcrypt = await import("bcryptjs");
      valid = await bcrypt.compare(trimmedPassword, user.passwordHash);
    }

    if (!valid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // Generate session ID
    const sessionId = crypto.randomUUID();

    // Extract IP and location from Vercel headers
    const xff = request.headers.get("x-forwarded-for");
    const ip  = xff ? xff.split(",")[0].trim() : (request.headers.get("x-real-ip") ?? "unknown");

    const countryCode = request.headers.get("x-vercel-ip-country") ?? "";
    const city        = decodeURIComponent(request.headers.get("x-vercel-ip-city") ?? "");
    const country     = countryCodeToName(countryCode);

    const now = new Date().toISOString();

    // Record session (non-blocking — don't delay login response)
    upsertSession({
      sessionId,
      username:    user.username,
      displayName: user.displayName,
      role:        user.role,
      loginTime:   now,
      lastSeen:    now,
      ip,
      country:     country  || undefined,
      city:        city     || undefined,
      countryCode: countryCode || undefined,
    }).catch(() => {/* ignore tracking errors */});

    const token  = await createToken(user.username, user.role, sessionId);
    const cookie = buildSessionCookie(token);

    const response = NextResponse.json({ success: true });
    response.headers.set("Set-Cookie", cookie);
    return response;

  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ISO-3166-1 alpha-2 → country name */
function countryCodeToName(code: string): string {
  const map: Record<string, string> = {
    DZ:"Algeria",AO:"Angola",BJ:"Benin",BW:"Botswana",BF:"Burkina Faso",BI:"Burundi",
    CV:"Cabo Verde",CM:"Cameroon",CF:"Central African Republic",TD:"Chad",KM:"Comoros",
    CG:"Congo",CD:"DR Congo",DJ:"Djibouti",EG:"Egypt",GQ:"Equatorial Guinea",ER:"Eritrea",
    SZ:"Eswatini",ET:"Ethiopia",GA:"Gabon",GM:"Gambia",GH:"Ghana",GN:"Guinea",GW:"Guinea-Bissau",
    CI:"Ivory Coast",KE:"Kenya",LS:"Lesotho",LR:"Liberia",LY:"Libya",MG:"Madagascar",
    MW:"Malawi",ML:"Mali",MR:"Mauritania",MU:"Mauritius",MA:"Morocco",MZ:"Mozambique",
    NA:"Namibia",NE:"Niger",NG:"Nigeria",RW:"Rwanda",ST:"São Tomé & Príncipe",SN:"Senegal",
    SC:"Seychelles",SL:"Sierra Leone",SO:"Somalia",ZA:"South Africa",SS:"South Sudan",
    SD:"Sudan",TZ:"Tanzania",TG:"Togo",TN:"Tunisia",UG:"Uganda",ZM:"Zambia",ZW:"Zimbabwe",
    FR:"France",GB:"United Kingdom",US:"United States",DE:"Germany",BE:"Belgium",CH:"Switzerland",
  };
  return map[code] ?? code;
}
