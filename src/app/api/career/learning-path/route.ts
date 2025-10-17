import { NextResponse } from "next/server";
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
    const { RecommendedPathSchema, UserProfileSchema, generateLearningPath } = await importAssessment();

    const parsedPath = RecommendedPathSchema.safeParse(body.careerPath);
    const parsedUser = UserProfileSchema.safeParse(body.user);

    if (!parsedPath.success || !parsedUser.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: { path: parsedPath.success ? null : parsedPath.error.issues, user: parsedUser.success ? null : parsedUser.error.issues } },
        { status: 400 }
      );
    }

    const learningPath = await generateLearningPath(parsedPath.data, parsedUser.data);

    // Persist if possible - do not fail request if save fails
    try {
      const { saveLearningPath } = await importStorage();
      await saveLearningPath(parsedUser.data.email, learningPath);
    } catch (saveErr) {
      console.warn("learning path save error", saveErr);
    }

    return NextResponse.json({ learningPath });
  } catch (e) {
    console.warn("/api/career/learning-path failed:", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}