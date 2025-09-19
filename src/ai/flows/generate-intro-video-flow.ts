'use server';

/**
 * @fileOverview A flow for generating a short introductory video using a text-to-video model.
 *
 * - generateIntroVideo - A function that creates a video from a text prompt.
 * - GenerateIntroVideoInput - The input type for the generateIntroVideo function.
 * - GenerateIntroVideoOutput - The return type for the generateIntroVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import * as fs from 'fs';
import { Readable } from 'stream';
import { MediaPart } from 'genkit';

const GenerateIntroVideoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the video from.'),
});
export type GenerateIntroVideoInput = z.infer<typeof GenerateIntroVideoInputSchema>;

const GenerateIntroVideoOutputSchema = z.object({
  videoDataUri: z.string().describe("A data URI of the generated video. Must include a MIME type and use Base64 encoding. Expected format: 'data:video/mp4;base64,<encoded_data>'."),
});
export type GenerateIntroVideoOutput = z.infer<typeof GenerateIntroVideoOutputSchema>;

export async function generateIntroVideo(
  input: GenerateIntroVideoInput
): Promise<GenerateIntroVideoOutput> {
  return generateIntroVideoFlow(input);
}

const generateIntroVideoFlow = ai.defineFlow(
  {
    name: 'generateIntroVideoFlow',
    inputSchema: GenerateIntroVideoInputSchema,
    outputSchema: GenerateIntroVideoOutputSchema,
  },
  async ({ prompt }) => {
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt,
      config: {
        durationSeconds: 8,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait until the operation completes. This may take up to a minute.
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Poll every 5 seconds
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const videoPart = operation.output?.message?.content.find((p) => !!p.media);
    if (!videoPart || !videoPart.media) {
      throw new Error('Failed to find the generated video in the operation result');
    }

    // The URL from the operation is temporary and requires an API key for access.
    // We need to fetch it and convert it to a data URI to send to the client.
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
