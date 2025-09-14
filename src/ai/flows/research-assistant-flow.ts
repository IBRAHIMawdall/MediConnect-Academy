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

const findRelevantContent = ai.defineTool(
    {
        name: 'findRelevantContent',
        description: 'Searches PubMed for open-source articles and videos relevant to a medical topic. Use this to find content for courses or answer specific questions.',
        inputSchema: z.object({
            query: z.string().describe('The topic to search for.'),
            apiKey: z.string().optional().describe('Optional NCBI API Key for higher rate limits.'),
        }),
        outputSchema: z.array(
            z.object({
                title: z.string(),
                url: z.string(),
                snippet: z.string(),
            })
        ),
    },
    async ({ query, apiKey }) => {
        const key = apiKey || process.env.NCBI_API_KEY;
        if (!key) {
            console.warn(
                `\n[MediConnectAI] NCBI_API_KEY is not set. \n` +
                `The application will work, but you may experience rate limiting from the PubMed API.\n` +
                `To fix this, you can provide a key through the UI or set it in your .env file.\n`
            );
        }
        
        const baseUrl = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';

        try {
            // Step 1: Search for article IDs
            let searchUrl = `${baseUrl}esearch.fcgi?db=pubmed&term=${encodeURIComponent(query)}&retmode=json&retmax=5`;
            if (key) {
                searchUrl += `&api_key=${key}`;
            }
            const searchResponse = await fetch(searchUrl);
            if (!searchResponse.ok) {
                throw new Error(`NCBI esearch failed with status: ${searchResponse.status}`);
            }
            const searchData = await searchResponse.json();
            const ids = searchData.esearchresult?.idlist;

            if (!ids || ids.length === 0) {
                return [];
            }

            // Step 2: Fetch summaries for those IDs
            const idList = ids.join(',');
            let summaryUrl = `${baseUrl}esummary.fcgi?db=pubmed&id=${idList}&retmode=json`;
            if (key) {
                summaryUrl += `&api_key=${key}`;
            }
            const summaryResponse = await fetch(summaryUrl);
            if (!summaryResponse.ok) {
                throw new Error(`NCBI esummary failed with status: ${summaryResponse.status}`);
            }
            const summaryData = await summaryResponse.json();
            const results = summaryData.result;
            
            if (!results) {
                return [];
            }
            
            // Step 3: Format the results
            const articles = Object.keys(results).filter(key => key !== 'uids').map(uid => {
                const article = results[uid];
                const pubDate = article.pubdate || 'Date not available';
                const authors = (article.authors || []).map((a: {name: string}) => a.name).join(', ');
                
                return {
                    title: article.title || 'Title not available',
                    url: `https://pubmed.ncbi.nlm.nih.gov/${uid}/`,
                    snippet: `Authors: ${authors}. Published: ${pubDate}.`,
                };
            });

            return articles;
        } catch (error) {
            console.error('Error fetching from PubMed:', error);
            // Return an empty array or handle the error as appropriate
            return [];
        }
    }
);


const ResearchAssistantInputSchema = z.object({
  query: z.string().describe('The user\'s question or research topic.'),
  apiKey: z.string().optional().describe('Optional NCBI API key to avoid rate limiting.'),
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
