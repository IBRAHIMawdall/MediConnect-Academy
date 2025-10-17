import { NextResponse } from 'next/server';
import { z } from 'genkit';

export const runtime = 'nodejs';

// Rate limiting for video generation (more restrictive due to computational cost)
const lastCalls = new Map<string, number>();
const WINDOW_MS = 120000; // 2 minutes

const InputSchema = z.object({
  textContent: z.string().min(10, 'Text content must be at least 10 characters').max(5000, 'Text content too long (max 5000 characters)'),
  topic: z.string().min(1, 'Topic is required').max(200, 'Topic too long'),
  duration: z.enum(['short', 'medium', 'long']).default('medium'),
  style: z.enum(['educational', 'presentation', 'tutorial', 'overview']).default('educational'),
  targetAudience: z.enum(['students', 'professionals', 'general']).default('professionals'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { textContent, topic, duration, style, targetAudience } = InputSchema.parse(body);

    // Rate limiting based on IP (more restrictive for video generation)
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : 'unknown';
    const now = Date.now();
    const lastCall = lastCalls.get(ip) || 0;

    if (now - lastCall < WINDOW_MS) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Video generation is limited to one request every 2 minutes.' },
        { status: 429 }
      );
    }

    lastCalls.set(ip, now);

    // Dynamic import of the video generator flow
    const { generateVideoScript } = await import('@/ai/flows/video-generator-flow');
    
    // Generate the video script
    const result = await generateVideoScript({
      textContent,
      topic,
      duration,
      style,
      targetAudience
    });
    
    return NextResponse.json({
      success: true,
      videoScript: result,
      generatedAt: new Date().toISOString(),
      metadata: {
        inputLength: textContent.length,
        sceneCount: result.scenes.length,
        estimatedDuration: result.totalDuration,
        style,
        targetAudience
      }
    });

  } catch (error) {
    console.error('Video Generator API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    // Fallback response
    return NextResponse.json({
      error: 'Video generation service is currently unavailable. Please try again later.',
      aiUnavailable: true,
      fallbackMessage: 'The AI-powered video generation feature is temporarily unavailable. Please check your input and try again in a few minutes.'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "AI-Powered Video Generator API",
    usage: "POST with { textContent: string, topic: string, duration?: 'short'|'medium'|'long', style?: 'educational'|'presentation'|'tutorial'|'overview', targetAudience?: 'students'|'professionals'|'general' }",
    features: [
      "Convert text explanations to video scripts",
      "Scene-by-scene breakdown",
      "Voice-over narration",
      "Visual element descriptions",
      "Educational content optimization"
    ],
    limits: {
      textLength: "10-5000 characters",
      rateLimit: "1 request per 2 minutes per IP"
    },
    example: {
      textContent: "The cardiovascular system consists of the heart, blood vessels, and blood...",
      topic: "Introduction to Cardiovascular System",
      duration: "medium",
      style: "educational",
      targetAudience: "students"
    }
  });
}