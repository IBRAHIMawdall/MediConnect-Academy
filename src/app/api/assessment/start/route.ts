import { NextResponse } from "next/server";
import { z } from "genkit";
import { UserProfileSchema, analyzeUserProfile } from "@/lib/career-assessment";
import { saveAssessmentResult } from "@/lib/user-storage";

export const runtime = "nodejs";

// Simple in-memory rate limit and cache
const lastCalls: Record<string, number> = {};
const cache: Record<string, any> = {};
const WINDOW_MS = 10_000; // 10s per email

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parse = UserProfileSchema.safeParse(body?.userData ?? body);
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid user profile" }, { status: 400 });
    }
    const user = parse.data;
    const key = (user.email ?? "anonymous").toLowerCase();
    const now = Date.now();
    const last = lastCalls[key] ?? 0;
    if (now - last < WINDOW_MS) {
      // Serve cached if available
      if (cache[key]) {
        return NextResponse.json(cache[key], { status: 200, headers: { "X-RateLimit": "HIT" } });
      }
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const assessment = await analyzeUserProfile(user);
    const responsePayload = { success: true, recommendations: assessment };
    cache[key] = responsePayload;
    lastCalls[key] = now;

    // Persist
    await saveAssessmentResult(user.email, user, assessment).catch((e) => console.warn("assessment save error", e));

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (e) {
    console.error("/api/assessment/start error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}