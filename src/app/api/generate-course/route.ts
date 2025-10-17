import { NextResponse } from "next/server";
// Use dynamic imports to avoid initialization errors leaking HTML responses
// and reduce cold-start issues in dev. Keep return types JSON-only.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importGenerateCourse = () => import("@/lib/ai-course-generator");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importEuropePMC = () => import("@/lib/europe-pmc");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importMcqGen = () => import("@/lib/mcq-generator");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importQuality = () => import("@/lib/quality-check");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const importStorage = () => import("@/lib/course-storage");

// Simple in-memory rate limit and cache (per topic) for demo purposes
const lastCalls: Record<string, number> = {};
const cache: Record<string, any> = {};
const WINDOW_MS = 10_000; // 10s window

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topic: string = (body?.topic ?? "").toString().trim();
    const category: string | undefined = body?.category;
    const subCategory: string | undefined = body?.subCategory;
    const targetLevel: "student" | "resident" | "practitioner" | undefined = body?.targetLevel;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    // Rate limit per topic
    const now = Date.now();
    const last = lastCalls[topic] ?? 0;
    if (now - last < WINDOW_MS) {
      // Serve from cache if exists; otherwise reject
      if (cache[topic]) {
        const cached = cache[topic];
        const hasFallback = Array.isArray(cached?.quality?.issues) && cached.quality.issues.includes("AI unavailable");
        if (!hasFallback) {
          return NextResponse.json(cached, { status: 200, headers: { "X-Cache": "HIT" } });
        }
      }
      return NextResponse.json({ error: "Rate limited. Try again shortly." }, { status: 429 });
    }

    // Cached response
    if (cache[topic]) {
      const cached = cache[topic];
      const hasFallback = Array.isArray(cached?.quality?.issues) && cached.quality.issues.includes("AI unavailable");
      if (!hasFallback) {
        lastCalls[topic] = now;
        return NextResponse.json(cached, { status: 200, headers: { "X-Cache": "HIT" } });
      }
    }

    // Generate course with robust fallback if AI/Genkit is not available
    let result: any = null;
    try {
      const { generateCourse } = await importGenerateCourse();
      result = await generateCourse({ topic, category, subCategory, targetLevel });
    } catch (e) {
      console.warn("Course generation failed; using fallback draft:", e);
      const slug = topic
        .toLowerCase()
        .replace(/[^a-z0-9\-\s]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-") || "generated-course";
      result = {
        id: slug,
        title: topic || "Generated Course",
        description: `Initial draft for ${topic || "course"}.`,
        longDescription:
          "This is a placeholder draft generated when AI is unavailable. You can still review, edit, and publish.",
        imageId: "page-courses",
        modules: [
          {
            title: "Overview",
            lessons: [
              { title: "Introduction", content: "Course overview and objectives." },
              { title: "Getting Started", content: "How to approach this course effectively." },
            ],
          },
          {
            title: "Fundamentals",
            lessons: [
              { title: "Core Concepts", content: "Key ideas and principles for the topic." },
              { title: "Next Steps", content: "Suggested readings and practice activities." },
            ],
          },
        ],
        category: category || "Clinical Medicine",
        subCategory: subCategory || "General",
        instructorId: "dr-emily-carter",
        schedule: "Self-paced",
        prerequisites: [],
        aiUnavailable: true,
      };
    }

    // Fetch references for topic via Europe PMC (no API key required)
    let references: any[] = [];
    try {
      const { fetchEuropePMCReferences } = await importEuropePMC();
      references = await fetchEuropePMCReferences(result.title || topic, 5);
    } catch (e) {
      console.warn("EuropePMC fetch failed; continuing without references:", e);
      references = [];
    }

    // Generate MCQs for each lesson
    let mcqs: any = [];
    try {
      const { generateMCQsForCourse } = await importMcqGen();
      mcqs = await generateMCQsForCourse(result as any);
    } catch (e) {
      console.warn("MCQ generation failed:", e);
    }

    // Run quality check
    let quality: any = null;
    try {
      const { checkQuality } = await importQuality();
      quality = await checkQuality(result as any);
    } catch (e) {
      console.warn("Quality check failed:", e);
      quality = { safe: true, summary: "Fallback draft created", issues: ["AI unavailable"] };
    }

    // Attach enrichments
    const enriched = { ...result, references, mcqs, quality };

    // Persist draft with durable caching via Firestore
    try {
      const { saveCourseDraft } = await importStorage();
      await saveCourseDraft(enriched as any);
    } catch (e) {
      console.warn("Draft save failed:", e);
    }

    // Only cache if result is not a fallback draft where AI was unavailable
    const isFallback = enriched?.aiUnavailable === true || (Array.isArray(enriched?.quality?.issues) && enriched.quality.issues.includes("AI unavailable"));
    if (!isFallback) {
      cache[topic] = enriched;
    }
    lastCalls[topic] = now;
    return NextResponse.json(enriched, { status: 200, headers: { "X-Cache": "MISS" } });
  } catch (err: any) {
    console.error("/api/generate-course error", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}