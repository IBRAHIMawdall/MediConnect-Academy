import { ai } from "@/ai/genkit";
import { z } from "genkit";
import type { Course } from "./data";

const QualityIssueSchema = z.object({
  severity: z.enum(["low", "medium", "high"]),
  message: z.string(),
  location: z.string().optional(),
});

const QualityReportSchema = z.object({
  isSafe: z.boolean(),
  summary: z.string(),
  issues: z.array(QualityIssueSchema),
  recommendations: z.array(z.string()).optional(),
});

export type QualityReport = z.infer<typeof QualityReportSchema>;

const QualityCheckInputSchema = z.object({
  courseTitle: z.string(),
  category: z.string().optional(),
  subCategory: z.string().optional(),
  modules: z.array(
    z.object({
      title: z.string(),
      lessons: z.array(z.object({ title: z.string(), content: z.string() })).min(1),
    })
  ).min(2),
});

const qualityPrompt = ai.definePrompt({
  name: "checkClinicalQuality",
  input: { schema: QualityCheckInputSchema },
  output: { schema: QualityReportSchema },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `Review the medical course content for clinical accuracy and safety.
Goals:
- Detect outdated guidelines, unsafe advice, or misleading claims.
- Prefer evidence-based recommendations.
Output fields:
- isSafe: true only if no high-severity issues.
- summary: brief evaluation.
- issues: list with severity and message; include lesson/module location if possible.
- recommendations: actions to fix.
Return ONLY JSON.`,
});

export async function checkQuality(course: Course): Promise<QualityReport> {
  const input = {
    courseTitle: course.title,
    category: course.category,
    subCategory: course.subCategory,
    modules: course.modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({ title: l.title, content: l.content })),
    })),
  };
  const { output } = await qualityPrompt(input);
  return output!;
}