import { ai } from "@/ai/genkit";
import { z } from "genkit";
import type { Course, Module, Lesson } from "./data";

export const MCQSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).min(4),
  correctIndex: z.number().int().min(0),
  explanation: z.string().optional(),
});

export type MCQ = z.infer<typeof MCQSchema>;

const LessonMCQsSchema = z.object({
  lessonTitle: z.string(),
  mcqs: z.array(MCQSchema).min(2),
});

const ModuleMCQsSchema = z.object({
  moduleTitle: z.string(),
  lessons: z.array(LessonMCQsSchema).min(1),
});

const GenerateMCQsInputSchema = z.object({
  courseTitle: z.string(),
  modules: z.array(
    z.object({
      title: z.string(),
      lessons: z.array(z.object({ title: z.string(), content: z.string() })).min(1),
    })
  ).min(2),
});

const GenerateMCQsOutputSchema = z.array(ModuleMCQsSchema);

const generateMCQsPrompt = ai.definePrompt({
  name: "generateLessonMCQs",
  input: { schema: GenerateMCQsInputSchema },
  output: { schema: GenerateMCQsOutputSchema },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `Create clinically sound multiple-choice questions (MCQs) for each lesson.
Course: {{{courseTitle}}}
For every lesson, generate 3–4 MCQs.
Guidelines:
- Avoid trick questions; test key clinical reasoning.
- Use clear, unambiguous phrasing; include one best answer.
- Provide a short explanation for the correct answer.
Return ONLY valid JSON matching the schema.`,
});

export async function generateMCQsForCourse(course: Course): Promise<z.infer<typeof GenerateMCQsOutputSchema>> {
  const input = {
    courseTitle: course.title,
    modules: course.modules.map((m) => ({
      title: m.title,
      lessons: m.lessons.map((l) => ({ title: l.title, content: l.content })),
    })),
  };
  const { output } = await generateMCQsPrompt(input);
  return output!;
}