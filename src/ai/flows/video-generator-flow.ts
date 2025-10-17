'use server';
/**
 * @fileOverview An AI flow for generating video scripts and content from text explanations.
 *
 * - generateVideoScript - A function that converts text explanations into structured video scripts.
 * - VideoGeneratorInput - The input type for the generateVideoScript function.
 * - VideoGeneratorOutput - The return type for the generateVideoScript function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const VideoGeneratorInputSchema = z.object({
  textContent: z.string().describe('The text content or explanation to convert into a video script'),
  topic: z.string().describe('The main topic or title for the video'),
  duration: z.enum(['short', 'medium', 'long']).default('medium').describe('Desired video duration: short (1-2 min), medium (3-5 min), long (6-10 min)'),
  style: z.enum(['educational', 'presentation', 'tutorial', 'overview']).default('educational').describe('Video style and approach'),
  targetAudience: z.enum(['students', 'professionals', 'general']).default('professionals').describe('Target audience for the video'),
});
export type VideoGeneratorInput = z.infer<typeof VideoGeneratorInputSchema>;

const VideoSceneSchema = z.object({
  sceneNumber: z.number().describe('Scene number in sequence'),
  duration: z.string().describe('Estimated duration for this scene (e.g., "30 seconds")'),
  narration: z.string().describe('Voice-over narration text for this scene'),
  visualDescription: z.string().describe('Description of visual elements, animations, or graphics to display'),
  keyPoints: z.array(z.string()).describe('Key points or concepts highlighted in this scene'),
  transitionNote: z.string().optional().describe('Notes for transition to next scene'),
});

const VideoGeneratorOutputSchema = z.object({
  title: z.string().describe('Engaging video title'),
  description: z.string().describe('Video description and summary'),
  totalDuration: z.string().describe('Estimated total video duration'),
  scenes: z.array(VideoSceneSchema).describe('Structured scenes for the video'),
  voiceOverScript: z.string().describe('Complete voice-over script with timing notes'),
  visualElements: z.array(z.string()).describe('List of visual elements, graphics, or animations needed'),
  keyTakeaways: z.array(z.string()).describe('Main learning objectives and takeaways'),
  callToAction: z.string().optional().describe('Suggested call-to-action for the end of the video'),
});
export type VideoGeneratorOutput = z.infer<typeof VideoGeneratorOutputSchema>;

export async function generateVideoScript(
  input: VideoGeneratorInput
): Promise<VideoGeneratorOutput> {
  return videoGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'videoGeneratorPrompt',
  input: {
    schema: VideoGeneratorInputSchema,
  },
  output: {
    schema: VideoGeneratorOutputSchema,
  },
  model: 'googleai/gemini-2.0-flash-exp',
  prompt: `You are an expert educational video script writer and instructional designer. Your task is to convert text explanations into engaging, structured video scripts suitable for medical education.

Input Content: {{{textContent}}}
Topic: {{{topic}}}
Duration: {{{duration}}}
Style: {{{style}}}
Target Audience: {{{targetAudience}}}

Create a comprehensive video script that includes:

1. **Engaging Title**: Create a compelling title that captures attention and clearly indicates the topic
2. **Video Description**: Write a concise description that summarizes what viewers will learn
3. **Scene Breakdown**: Structure the content into logical scenes with:
   - Clear narration for each scene
   - Detailed visual descriptions (graphics, animations, text overlays, diagrams)
   - Smooth transitions between concepts
   - Appropriate pacing for the target duration

4. **Voice-Over Script**: Complete script with:
   - Natural, conversational tone
   - Clear pronunciation guides for medical terms
   - Timing notes and pauses
   - Emphasis markers for key concepts

5. **Visual Elements**: Comprehensive list of:
   - Diagrams and illustrations needed
   - Text overlays and graphics
   - Animation suggestions
   - Color schemes and visual themes

6. **Learning Objectives**: Clear takeaways that viewers should understand after watching

Guidelines:
- Use clear, accessible language appropriate for the target audience
- Include engaging hooks and transitions
- Ensure medical accuracy and proper terminology
- Structure content for optimal learning retention
- Include interactive elements or questions where appropriate
- Make complex concepts digestible through visual storytelling

Duration Guidelines:
- Short (1-2 min): 3-4 scenes, focus on core concept
- Medium (3-5 min): 5-7 scenes, detailed explanation with examples
- Long (6-10 min): 8-12 scenes, comprehensive coverage with case studies

Style Guidelines:
- Educational: Focus on clear instruction and knowledge transfer
- Presentation: Professional, lecture-style format
- Tutorial: Step-by-step, hands-on approach
- Overview: High-level summary with key highlights`,
});

const videoGeneratorFlow = ai.defineFlow(
  {
    name: 'videoGeneratorFlow',
    inputSchema: VideoGeneratorInputSchema,
    outputSchema: VideoGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);