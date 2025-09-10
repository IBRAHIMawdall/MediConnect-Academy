// src/ai/flows/personalized-course-recommendations.ts
'use server';

/**
 * @fileOverview Provides personalized course recommendations based on user role and learning history.
 *
 * - personalizedCourseRecommendations - A function that returns a list of recommended courses.
 * - PersonalizedCourseRecommendationsInput - The input type for the personalizedCourseRecommendations function.
 * - PersonalizedCourseRecommendationsOutput - The return type for the personalizedCourseRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCourseRecommendationsInputSchema = z.object({
  userRole: z
    .string()
    .describe('The professional role of the user (e.g., nurse, doctor, administrator).'),
  learningHistory: z
    .string()
    .describe('A summary of the user\'s past courses and learning experiences.'),
});
export type PersonalizedCourseRecommendationsInput = z.infer<
  typeof PersonalizedCourseRecommendationsInputSchema
>;

const PersonalizedCourseRecommendationsOutputSchema = z.object({
  recommendedCourses: z
    .array(z.string())
    .describe('A list of course titles recommended for the user.'),
  reasoning: z
    .string()
    .describe('The AI\'s reasoning for recommending these specific courses.'),
});
export type PersonalizedCourseRecommendationsOutput = z.infer<
  typeof PersonalizedCourseRecommendationsOutputSchema
>;

export async function personalizedCourseRecommendations(
  input: PersonalizedCourseRecommendationsInput
): Promise<PersonalizedCourseRecommendationsOutput> {
  return personalizedCourseRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCourseRecommendationsPrompt',
  input: {
    schema: PersonalizedCourseRecommendationsInputSchema,
  },
  output: {
    schema: PersonalizedCourseRecommendationsOutputSchema,
  },
  prompt: `You are an expert medical education advisor for MediConnect Academy. Your goal is to provide highly relevant and personalized course recommendations for healthcare professionals.

  Analyze the user's role and learning history to suggest courses that align with their career path, fill knowledge gaps, and cater to their interests.

  User Role: {{{userRole}}}
  Learning History & Interests: {{{learningHistory}}}

  When recommending courses, consider:
  - The user's specific role (e.g., a nurse might need different courses than a surgeon).
  - Stated interests and past learning to suggest next steps.
  - Courses that offer clear career progression or specialization.

  Provide a concise list of recommended course titles and a clear, encouraging reasoning for your suggestions.
  `,
});

const personalizedCourseRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCourseRecommendationsFlow',
    inputSchema: PersonalizedCourseRecommendationsInputSchema,
    outputSchema: PersonalizedCourseRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
