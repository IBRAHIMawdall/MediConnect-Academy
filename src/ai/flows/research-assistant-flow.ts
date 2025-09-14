'use server';
/**
 * @fileOverview An AI flow for answering user questions with the help of a content search tool.
 *
 * - researchAssistant - A function that returns an answer to a user's query.
 * - ResearchAssistantInput - The input type for the researchAssistant function.
 * - ResearchAssistantOutput - The return type for the researchAssistant function.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Mock search results
const mockSearchResults = [
    {
        title: 'Recent Advances in Interventional Cardiology - PubMed',
        url: 'https://pubmed.ncbi.nlm.nih.gov/34008902/',
        snippet: 'This review covers the latest techniques in interventional cardiology, including complex coronary interventions and structural heart disease treatments...',
    },
    {
        title: 'Pediatric Emergency Medicine: A Review - NEJM',
        url: 'https://www.nejm.org/doi/full/10.1056/NEJMra1807212',
        snippet: 'A comprehensive overview of common pediatric emergencies, from respiratory distress to febrile seizures, and the latest evidence-based management strategies.',
    },
     {
        title: 'Open-source Surgical Simulation with Suture-less',
        url: 'https://www.sutureless.org/',
        snippet: 'Suture-less is an open-source platform for surgical simulation, providing realistic training modules for various procedures.',
    }
];


const findRelevantContent = ai.defineTool(
    {
        name: 'findRelevantContent',
        description: 'Searches the internet for open-source articles and videos relevant to a medical topic. Use this to find content for courses or answer specific questions.',
        inputSchema: z.object({
            query: z.string().describe('The topic to search for.'),
        }),
        outputSchema: z.array(
            z.object({
                title: z.string(),
                url: z.string(),
                snippet: z.string(),
            })
        ),
    },
    async ({ query }) => {
        console.log(`Searching for content related to: ${query}`);
        // In a real application, this would call a search API (e.g., Google Search, PubMed API).
        // For this demo, we return mock data.
        return mockSearchResults.filter(r => r.title.toLowerCase().includes(query.toLowerCase()) || r.snippet.toLowerCase().includes(query.toLowerCase()));
    }
);


const ResearchAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question or research topic.'),
});
export type ResearchAssistantInput = z.infer<typeof ResearchAssistantInputSchema>;

const ResearchAssistantOutputSchema = z.object({
  answer: z
    .string()
    .describe('A comprehensive answer to the user\'s query, citing sources from the provided tools.'),
  sources: z.array(z.object({
    title: z.string(),
    url: z.string(),
    snippet: z.string(),
  })).describe('A list of sources used to generate the answer.'),
});
export type ResearchAssistantOutput = z.infer<typeof ResearchAssistantOutputSchema>;


const researchAssistantPrompt = ai.definePrompt({
    name: 'researchAssistantPrompt',
    tools: [findRelevantContent],
    input: { schema: ResearchAssistantInputSchema },
    output: { schema: ResearchAssistantOutputSchema },
    prompt: `You are an AI Research Assistant for MediConnect Academy. Your role is to answer user questions about medical topics accurately and concisely.

    When a user asks a question, you MUST use the 'findRelevantContent' tool to search for relevant articles and information.

    Base your answer ONLY on the information returned by the tool. Synthesize the findings from the sources into a clear answer.

    At the end of your answer, you MUST list the sources you used.

    User Query: {{{query}}}
    `,
});

export async function researchAssistant(
  input: ResearchAssistantInput
): Promise<ResearchAssistantOutput> {
  const { output } = await researchAssistantPrompt(input);
  if (!output) {
      throw new Error("Failed to get a response from the research assistant.");
  }
  return output;
}
