import { NextResponse } from "next/server";
import { z } from "genkit";
import { RecommendedPathSchema, UserProfileSchema, generateLearningPath } from "@/lib/career-assessment";
import { saveLearningPath } from "@/lib/user-storage";

export const runtime = "nodejs";

const InputSchema = z.object({
  user: UserProfileSchema,
  selectedCareerPath: RecommendedPathSchema,
});

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const parse = InputSchema.safeParse(body);
    if (!parse.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { user, selectedCareerPath } = parse.data;

    const lp = await generateLearningPath(selectedCareerPath, user);
    await saveLearningPath(user.email, lp).catch((e) => console.warn("learning path save error", e));

    return NextResponse.json({ success: true, learningPath: lp, estimatedTimeline: lp.timeline ?? "6 months" }, { status: 200 });
  } catch (e) {
    console.error("/api/path/generate error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}