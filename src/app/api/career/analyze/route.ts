import { NextResponse } from "next/server";
// Dynamic import helpers to avoid dev cold-start issues
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importAssessment = () => import("@/lib/career-assessment");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importStorage = () => import("@/lib/user-storage");

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const text = await req.text();
    if (!text) {
      return NextResponse.json({ error: "Empty body" }, { status: 400 });
    }
    let body: any = null;
    try {
      body = JSON.parse(text);
    } catch (parseErr) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    const { UserProfileSchema, analyzeUserProfile } = await importAssessment();

    // Validate input
    const parsed = UserProfileSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.issues },
        { status: 400 }
      );
    }

    const user = parsed.data;
    const assessment = await analyzeUserProfile(user);

    // Persist if possible (Firestore optional) - don't fail the request on save issues
    try {
      const { saveAssessmentResult } = await importStorage();
      const email = user.email;
      await saveAssessmentResult(email, user, assessment);
    } catch (saveErr) {
      console.warn("assessment save error", saveErr);
    }

    return NextResponse.json({ assessment });
  } catch (e: any) {
    console.warn("/api/career/analyze failed:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}