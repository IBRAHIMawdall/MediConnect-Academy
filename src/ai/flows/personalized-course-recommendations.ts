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
  prompt: `You are an AI assistant designed to provide personalized course recommendations for healthcare professionals.

  Based on the user's role and learning history, suggest courses that would be most relevant to their professional development and skill enhancement. Provide a list of recommended courses and a brief explanation of why each course is recommended.

  User Role: {{{userRole}}}
  Learning History: {{{learningHistory}}}

  Consider the following factors when making recommendations:
  - Relevance to the user's role and responsibilities
  - Potential to fill gaps in the user's existing knowledge and skills
  - Alignment with the user's career goals and interests

  Respond with the list of recommended courses and reasoning.
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
