'use server';
/**
 * @fileOverview An AI flow for explaining a medical topic and generating a mind map.
 *
 * - explainTopic - A function that returns an explanation and a mind map for a given topic.
 * - ExplainTopicInput - The input type for the explainTopic function.
 * - ExplainTopicOutput - The return type for the explainTopic function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainTopicInputSchema = z.object({
  topic: z.string().describe('The medical topic to be explained.'),
});
export type ExplainTopicInput = z.infer<typeof ExplainTopicInputSchema>;

const ExplainTopicOutputSchema = z.object({
  explanation: z
    .string()
    .describe('A clear and concise explanation of the topic, suitable for a healthcare professional.'),
  mindMap: z
    .string()
    .describe('A mind map of the topic in Markdown hierarchical list format (using hyphens and indentation).'),
});
export type ExplainTopicOutput = z.infer<typeof ExplainTopicOutputSchema>;

export async function explainTopic(
  input: ExplainTopicInput
): Promise<ExplainTopicOutput> {
  return explainTopicFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainTopicPrompt',
  input: {
    schema: ExplainTopicInputSchema,
  },
  output: {
    schema: ExplainTopicOutputSchema,
  },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `You are a medical education expert. Your task is to explain a complex medical topic to a healthcare professional.

Topic: {{{topic}}}

1.  Provide a clear, concise, and accurate explanation of the topic.
2.  Generate a hierarchical mind map of the key concepts related to the topic. The mind map should be formatted as a Markdown list, using hyphens and indentation to show relationships. For example:
    - Main Concept
      - Sub-concept 1
        - Detail A
        - Detail B
      - Sub-concept 2
        - Detail C

This structure is essential for visual representation.
`,
});

const explainTopicFlow = ai.defineFlow(
  {
    name: 'explainTopicFlow',
    inputSchema: ExplainTopicInputSchema,
    outputSchema: ExplainTopicOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
