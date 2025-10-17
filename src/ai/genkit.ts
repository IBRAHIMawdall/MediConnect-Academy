import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';

// Allow either GOOGLE_API_KEY or GEMINI_API_KEY to configure Google AI.
// If only GEMINI_API_KEY is present, map it to GOOGLE_API_KEY so the plugin works.
const resolvedApiKey = process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY || '';
if (!process.env.GOOGLE_API_KEY && process.env.GEMINI_API_KEY) {
  process.env.GOOGLE_API_KEY = process.env.GEMINI_API_KEY;
}

export const ai = genkit({
  plugins: [
    googleAI({
      // Use stable v1 API and a numeric model version to avoid 404s.
      apiVersion: 'v1',
      // Pass apiKey explicitly to support environments without process env mapping.
      apiKey: resolvedApiKey || undefined,
    }),
  ],
  // Use available model from v1 API
  model: 'googleai/gemini-2.0-flash-exp',
});
