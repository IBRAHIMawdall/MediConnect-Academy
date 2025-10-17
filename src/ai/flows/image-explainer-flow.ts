'use server';
/**
 * @fileOverview An AI flow for analyzing images and providing detailed explanations.
 *
 * - explainImage - A function that analyzes an image and returns a comprehensive explanation.
 * - ExplainImageInput - The input type for the explainImage function.
 * - ExplainImageOutput - The return type for the explainImage function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ExplainImageInputSchema = z.object({
  imageData: z.string().describe('Base64 encoded image data'),
  mimeType: z.string().describe('MIME type of the image (e.g., image/jpeg, image/png)'),
  userQuery: z.string().optional().describe('Optional specific question or request about the image'),
});
export type ExplainImageInput = z.infer<typeof ExplainImageInputSchema>;

const ExplainImageOutputSchema = z.object({
  title: z.string().describe('A concise title describing what the image contains'),
  description: z.string().describe('A detailed description of the visual elements in the image'),
  textContent: z.string().describe('Any text content extracted from the image'),
  medicalContext: z.string().describe('Medical context and interpretation if applicable'),
  explanation: z.string().describe('A comprehensive explanation addressing any requests or questions about the image'),
  keyInsights: z.array(z.string()).describe('Key insights or important points identified in the image'),
  recommendations: z.string().optional().describe('Recommendations or next steps if applicable'),
});
export type ExplainImageOutput = z.infer<typeof ExplainImageOutputSchema>;

export async function explainImage(
  input: ExplainImageInput
): Promise<ExplainImageOutput> {
  return explainImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainImagePrompt',
  input: {
    schema: ExplainImageInputSchema,
  },
  output: {
    schema: ExplainImageOutputSchema,
  },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `You are an AI-powered medical education assistant with advanced image analysis capabilities. Your task is to analyze the provided image and provide a comprehensive explanation.

Image Analysis Instructions:
1. Carefully examine all visual elements in the image
2. Extract and transcribe any text content accurately
3. Identify medical diagrams, charts, screenshots, or educational content
4. Provide context-appropriate explanations for medical professionals

User Query: {{{userQuery}}}

Please provide:
1. **Title**: A clear, concise title describing the image content
2. **Description**: Detailed description of visual elements, layout, and components
3. **Text Content**: Exact transcription of any text visible in the image
4. **Medical Context**: Medical interpretation, significance, or educational value
5. **Explanation**: Comprehensive explanation addressing the content and any user queries
6. **Key Insights**: Important points, findings, or takeaways from the image
7. **Recommendations**: Suggested actions, further reading, or next steps if applicable

Focus on accuracy, clarity, and educational value. If the image contains medical information, provide appropriate context and explanations suitable for healthcare professionals.`,
});

const explainImageFlow = ai.defineFlow(
  {
    name: 'explainImageFlow',
    inputSchema: ExplainImageInputSchema,
    outputSchema: ExplainImageOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      ...input,
      // Convert base64 image data to the format expected by Gemini
      imageData: `data:${input.mimeType};base64,${input.imageData}`,
    });
    return output!;
  }
);