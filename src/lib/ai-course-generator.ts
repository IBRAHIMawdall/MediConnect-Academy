import { ai } from "@/ai/genkit";
import { z } from "genkit";
import type { Course, Module, Lesson, CourseCategory, SubCategory } from "./data";

// Schemas for structured outputs to ensure strong typing
const GenerateCourseInputSchema = z.object({
  topic: z.string().describe("Course topic or title to generate."),
  category: z
    .string()
    .optional()
    .describe("Optional high-level category hint (e.g., Clinical Medicine)."),
  subCategory: z.string().optional().describe("Optional subcategory hint (e.g., Cardiology)."),
  targetLevel: z
    .enum(["student", "resident", "practitioner"])
    .optional()
    .describe("Audience level to tune depth."),
});

const LessonSchema = z.object({
  title: z.string(),
  content: z.string(),
  videoUrl: z.string().optional(),
});

const ModuleSchema = z.object({
  title: z.string(),
  lessons: z.array(LessonSchema).min(2),
});

const GenerateCourseOutputSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  longDescription: z.string(),
  imageId: z.string(),
  modules: z.array(ModuleSchema).min(2),
  category: z.string(),
  subCategory: z.string(),
  tags: z.array(z.string()).optional(),
  instructorId: z.string(),
  schedule: z.string(),
  prerequisites: z.array(z.string()),
});

export type GenerateCourseInput = z.infer<typeof GenerateCourseInputSchema>;
export type GeneratedCourse = z.infer<typeof GenerateCourseOutputSchema> & Course;

// Prompt engineering: ensure JSON-only with strict schema
const generateCoursePrompt = ai.definePrompt({
  name: "generateMedicalCoursePrompt",
  input: { schema: GenerateCourseInputSchema },
  output: { schema: GenerateCourseOutputSchema },
  model: "googleai/gemini-2.0-flash-exp",
  prompt: `You are a medical curriculum architect.
Create a comprehensive course in evidence-based medical education.

Requirements:
- 4 to 6 modules; each module has 3 to 5 lessons.
- Accurate, clinically sound content; avoid hallucinations; keep scope aligned.
- Audience: {{{targetLevel}}}.
- Prefer structured, succinct lesson texts.
- Return ONLY valid JSON matching the output schema.

Metadata:
- topic: {{{topic}}}
- category hint: {{{category}}}
- subCategory hint: {{{subCategory}}}

Fields:
- id: a URL-safe slug derived from the title.
- title: concise and professional.
- description: one-liner hook.
- longDescription: 2-4 sentences, clear outcomes.
- imageId: a short slug for placeholder image use.
- modules: as specified.
- category and subCategory: match hints or pick sensible values from medical education.
- instructorId: pick from known IDs if possible (e.g., dr-emily-carter, dr-benjamin-lee, dr-sophia-rodriguez, dr-david-chen).
- schedule: e.g., "Self-paced".
- prerequisites: array.
`,
});

// Flow: orchestrate prompt and light post-processing
export async function generateCourse(input: GenerateCourseInput): Promise<GeneratedCourse> {
  const { output } = await generateCoursePrompt({
    topic: input.topic,
    category: input.category,
    subCategory: input.subCategory,
    targetLevel: input.targetLevel ?? "practitioner",
  });

  const course = output!;
  // Minimal normalization: ensure id is slugified and fields align
  course.id = course.id
    .toLowerCase()
    .replace(/[^a-z0-9\-\s]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  // Ensure category/subCategory types remain strings compatible with our Course type
  return course as GeneratedCourse;
}

// Optional helper to split generation: modules per call (for speed/cost when needed)
const GenerateModulesInputSchema = z.object({
  topic: z.string(),
  outline: z
    .array(z.object({ title: z.string() }))
    .min(4)
    .describe("Module titles to expand into lessons"),
});

const GenerateModulesOutputSchema = z.array(ModuleSchema);

const generateModulesPrompt = ai.definePrompt({
  name: "generateMedicalModulesPrompt",
  input: { schema: GenerateModulesInputSchema },
  output: { schema: GenerateModulesOutputSchema },
  model: "googleai/gemini-2.0-flash-exp",
  prompt: `Expand the following module titles into detailed modules with 3–5 lessons each.
Topic: {{{topic}}}
Outline:
{{#each outline}}
- {{title}}
{{/each}}

Return ONLY JSON array of modules.`,
});

export async function generateModules(input: z.infer<typeof GenerateModulesInputSchema>): Promise<Module[]> {
  const { output } = await generateModulesPrompt(input);
  return output! as Module[];
}