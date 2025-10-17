import { NextResponse } from 'next/server';
import { z } from 'genkit';

export const runtime = 'nodejs';

// Rate limiting
const lastCalls = new Map<string, number>();
const WINDOW_MS = 60000; // 1 minute

const InputSchema = z.object({
  query: z.string().min(1).max(500),
});

// Simple AI research function using Google AI directly
async function performResearch(query: string): Promise<{answer: string, sources: any[]}> {
  try {
    // Test Google AI API directly
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("No API key available");
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-002:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a medical research assistant. Provide a comprehensive answer about: ${query}

Please include:
1. A clear, evidence-based explanation
2. Current medical guidelines if applicable
3. Key clinical considerations
4. Relevant research findings

Keep the response professional and cite general medical knowledge.`
          }]
        }]
      })
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated";

    return {
      answer,
      sources: [
        {
          title: "PubMed - NCBI",
          url: `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(query)}`,
          snippet: "Search PubMed for peer-reviewed medical literature"
        },
        {
          title: "Cochrane Library", 
          url: `https://www.cochranelibrary.com/search?q=${encodeURIComponent(query)}`,
          snippet: "Systematic reviews and evidence-based medicine"
        }
      ]
    };

  } catch (error) {
    console.error("AI Research error:", error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query } = InputSchema.parse(body);

    // Rate limiting based on IP
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const now = Date.now();
    const lastCall = lastCalls.get(ip) || 0;

    if (now - lastCall < WINDOW_MS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before making another request.' },
        { status: 429 }
      );
    }

    lastCalls.set(ip, now);

    // Dynamic import of the research flow
    const { researchAssistant } = await import('@/ai/flows/research-assistant-flow');
    
    // Call the research flow
    const result = await researchAssistant({ query });
    
    return NextResponse.json({
      query,
      summary: result.answer,
      sources: result.sources,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Research API error:', error);
    
    // Fallback response
    return NextResponse.json({
      aiUnavailable: true,
      message: "AI research assistant is currently unavailable. Please try searching these reputable medical databases:",
      fallbackSources: [
        {
          title: "PubMed - National Library of Medicine",
          url: "https://pubmed.ncbi.nlm.nih.gov/",
          description: "Search for peer-reviewed medical literature"
        },
        {
          title: "Cochrane Library", 
          url: "https://www.cochranelibrary.com/",
          description: "Systematic reviews and evidence-based medicine"
        }
      ]
    });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Medical Research API",
    usage: "POST with { query: string, ncbiApiKey?: string }",
    example: {
      query: "diabetes treatment guidelines",
      ncbiApiKey: "optional_api_key"
    }
  });
}