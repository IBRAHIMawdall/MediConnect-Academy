'use server';

/**
 * @fileOverview A flow for generating a promotional video for a course.
 *
 * - generatePromoVideo - A function that creates a short video based on a prompt.
 * - GeneratePromoVideoInput - The input type for the generatePromoVideo function.
 * - GeneratePromoVideoOutput - The return type for the generatePromoVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

const GeneratePromoVideoInputSchema = z.object({
  prompt: z.string().describe('A descriptive prompt for the video content.'),
});
export type GeneratePromoVideoInput = z.infer<
  typeof GeneratePromoVideoInputSchema
>;

const GeneratePromoVideoOutputSchema = z.object({
  videoUrl: z
    .string()
    .describe('The data URI of the generated video file.'),
  posterUrl: z
    .string()
    .describe('The data URI of the video\'s poster frame.'),
});
export type GeneratePromoVideoOutput = z.infer<
  typeof GeneratePromoVideoOutputSchema
>;

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
  async ({ prompt }) => {
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: `A cinematic, professional, and engaging promotional video for a medical course. ${prompt}`,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
        throw new Error('Expected the model to return an operation');
    }

     while (!operation.done) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
        throw new Error('failed to generate video: ' + operation.error.message);
    }
    
    const video = operation.output?.message?.content.find(p => p.media && p.media.contentType?.startsWith('video/'));
    const poster = operation.output?.message?.content.find(p => p.media && p.media.contentType?.startsWith('image/'));

    if (!video || !video.media?.url) {
        throw new Error('Failed to find the generated video in the operation result.');
    }
     if (!poster || !poster.media?.url) {
        throw new Error('Failed to find the generated poster in the operation result.');
    }

    return {
      videoUrl: video.media.url,
      posterUrl: poster.media.url,
    };
  }
);
