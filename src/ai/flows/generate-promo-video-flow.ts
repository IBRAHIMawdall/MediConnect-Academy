'use server';

/**
 * @fileOverview A flow for generating a short promotional video from a script.
 *
 * - generatePromoVideo - A function that creates a video from a text script.
 * - GeneratePromoVideoInput - The input type for the generatePromoVideo function.
 * - GeneratePromoVideoOutput - The return type for the generatePromoVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const GeneratePromoVideoInputSchema = z.object({
  script: z.string().describe('The script for the promotional video.'),
});
export type GeneratePromoVideoInput = z.infer<typeof GeneratePromoVideoInputSchema>;

const GeneratePromoVideoOutputSchema = z.object({
  videoDataUri: z.string().describe("A data URI of the generated video. Must include a MIME type and use Base64 encoding. Expected format: 'data:video/mp4;base64,<encoded_data>'."),
});
export type GeneratePromoVideoOutput = z.infer<typeof GeneratePromoVideoOutputSchema>;

export async function generatePromoVideo(
  input: GeneratePromoVideoInput
): Promise<GeneratePromoVideoOutput> {
  return generatePromoVideoFlow(input);
}

const generatePromoVideoFlow = ai.defineFlow(
  {
    name: 'generatePromoVideoFlow',
    inputSchema: GeneratePromoVideoInputSchema,
    outputSchema: GeneratePromoVideoOutputSchema,
  },
  async ({ script }) => {
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: script,
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Poll for completion
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video in the operation result');
    }

    const videoUrl = `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`;
    
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(videoUrl);

    if (!response.ok || !response.body) {
      throw new Error(`Failed to download video file: ${response.statusText}`);
    }

    const videoBuffer = await response.arrayBuffer();
    const videoBase64 = Buffer.from(videoBuffer).toString('base64');
    
    return {
      videoDataUri: `data:video/mp4;base64,${videoBase64}`,
    };
  }
);
