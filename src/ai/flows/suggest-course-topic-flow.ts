'use server';
/**
 * @fileOverview An AI flow for suggesting a course title based on a user's topic idea.
 *
 * - suggestCourseTopic - A function that returns a suggested course title.
 * - SuggestCourseTopicInput - The input type for the suggestCourseTopic function.
 * - SuggestCourseTopicOutput - The return type for the suggestCourseTopic function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SuggestCourseTopicInputSchema = z.object({
  topic: z.string().describe('The user\'s informal course topic idea.'),
});
export type SuggestCourseTopicInput = z.infer<typeof SuggestCourseTopicInputSchema>;

const SuggestCourseTopicOutputSchema = z.object({
  suggestion: z
    .string()
    .describe('A professional, engaging, and clear course title based on the user\'s topic.'),
});
export type SuggestCourseTopicOutput = z.infer<typeof SuggestCourseTopicOutputSchema>;

export async function suggestCourseTopic(
  input: SuggestCourseTopicInput
): Promise<SuggestCourseTopicOutput> {
  return suggestCourseTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCourseTopicPrompt',
  input: {
    schema: SuggestCourseTopicInputSchema,
  },
  output: {
    schema: SuggestCourseTopicOutputSchema,
  },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `You are an expert curriculum developer for a medical education platform. A user has submitted an idea for a course. Your task is to transform their informal topic into a professional and compelling course title.

  The title should be clear, concise, and accurately reflect the potential subject matter.

  User's Topic Idea: {{{topic}}}
  
  Generate one suggested course title.
`,
});

const suggestCourseTopicFlow = ai.defineFlow(
  {
    name: 'suggestCourseTopicFlow',
    inputSchema: SuggestCourseTopicInputSchema,
    outputSchema: SuggestCourseTopicOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
