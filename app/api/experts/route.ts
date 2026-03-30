import { NextResponse } from "next/server";
import { getTopExperts } from "@/lib/data";

export async function GET() {
  try {
    const experts = getTopExperts(3);
    return NextResponse.json(experts);
  } catch (err) {
    console.error("GET /api/experts error:", err);
    return NextResponse.json([], { status: 500 });
  }
}
