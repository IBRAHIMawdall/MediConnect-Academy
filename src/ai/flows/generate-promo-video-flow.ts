'use server';

/**
 * @fileOverview A flow for generating a promotional video for MediConnect Academy.
 *
 * - generatePromoVideo - A function that creates a video based on a script.
 * - GeneratePromoVideoOutput - The return type for the generatePromoVideo function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { MediaPart } from 'genkit';

const GeneratePromoVideoOutputSchema = z.object({
  videoDataUri: z
    .string()
    .describe(
      "A data URI of the generated video. Must include a MIME type and use Base64 encoding. Expected format: 'data:video/mp4;base64,<encoded_data>'."
    ),
});
export type GeneratePromoVideoOutput = z.infer<
  typeof GeneratePromoVideoOutputSchema
>;

export async function generatePromoVideo(): Promise<GeneratePromoVideoOutput> {
  return generatePromoVideoFlow();
}

const generatePromoVideoFlow = ai.defineFlow(
  {
    name: 'generatePromoVideoFlow',
    outputSchema: GeneratePromoVideoOutputSchema,
  },
  async () => {
    let { operation } = await ai.generate({
      model: 'googleai/veo-2.0-generate-001',
      prompt: `A dynamic and professional promotional video for an e-learning platform called "MediConnect Academy".

      Scene 1: An animated logo of a heart combined with a pulse line and a graduation cap appears with the text "MediConnect Academy". Background is a clean, professional blue.

      Scene 2: A fast-paced montage of diverse healthcare professionals (doctors, nurses, researchers) looking engaged while learning on tablets and laptops. Show snippets of user interfaces with course catalogs and progress bars.

      Scene 3: An animated graphic shows a brain with glowing, connecting nodes, representing a personalized learning path. Text overlay: "AI-Powered Learning Paths."

      Scene 4: A graphic of a magnifying glass scanning through medical journals, which resolves into a concise summary on a screen. Text overlay: "AI Research Assistant."

      Scene 5: The video ends with the MediConnect Academy logo again, with the tagline: "Your Partner in Lifelong Learning."

      The video should be cinematic, modern, and inspiring, with an upbeat instrumental soundtrack.`,
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
      console.log('Checking video generation status...');
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error('Failed to generate video: ' + operation.error.message);
    }

    const video = operation.output?.message?.content.find((p) => !!p.media);
    if (!video || !video.media) {
      throw new Error('Failed to find the generated video in the operation result');
    }

    // Download video and convert to data URI
    const videoDataUri = await downloadAndEncode(video.media);

    return {
      videoDataUri,
    };
  }
);

async function downloadAndEncode(video: MediaPart): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set.');
  }

  const fetch = (await import('node-fetch')).default;
  const videoUrl = `${video.url}&key=${process.env.GEMINI_API_KEY}`;
  
  const response = await fetch(videoUrl);
  if (!response.ok || !response.body) {
    throw new Error(`Failed to fetch video: ${response.statusText}`);
  }

  const videoBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(videoBuffer).toString('base64');
  
  return `data:video/mp4;base64,${base64}`;
}
