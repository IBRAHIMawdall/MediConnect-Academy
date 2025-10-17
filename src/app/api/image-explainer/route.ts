import { NextResponse } from 'next/server';
import { z } from 'genkit';

export const runtime = 'nodejs';

// Rate limiting
const lastCalls = new Map<string, number>();
const WINDOW_MS = 60000; // 1 minute

const InputSchema = z.object({
  imageData: z.string().min(1, 'Image data is required'),
  mimeType: z.string().regex(/^image\/(jpeg|jpg|png|webp)$/, 'Invalid image format. Supported formats: JPEG, PNG, WebP'),
  userQuery: z.string().optional(),
});

// Validate image size (max 10MB)
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

function validateImageSize(base64Data: string): boolean {
  // Calculate approximate file size from base64 string
  const sizeInBytes = (base64Data.length * 3) / 4;
  return sizeInBytes <= MAX_IMAGE_SIZE;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { imageData, mimeType, userQuery } = InputSchema.parse(body);

    // Validate image size
    if (!validateImageSize(imageData)) {
      return NextResponse.json(
        { error: 'Image size too large. Maximum size allowed is 10MB.' },
        { status: 400 }
      );
    }

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

    // Dynamic import of the image explainer flow
    const { explainImage } = await import('@/ai/flows/image-explainer-flow');
    
    // Call the image analysis flow
    const result = await explainImage({
      imageData,
      mimeType,
      userQuery: userQuery || 'Please analyze this image and provide a comprehensive explanation.'
    });
    
    return NextResponse.json({
      success: true,
      analysis: result,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Image Explainer API error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      );
    }
    
    // Fallback response
    return NextResponse.json({
      error: 'Image analysis service is currently unavailable. Please try again later.',
      aiUnavailable: true,
      fallbackMessage: 'The AI-powered image analysis feature is temporarily unavailable. Please check your image format (JPEG, PNG, WebP) and size (max 10MB), then try again.'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    message: "AI-Powered Image Explainer API",
    usage: "POST with { imageData: string (base64), mimeType: string, userQuery?: string }",
    supportedFormats: ["image/jpeg", "image/png", "image/webp"],
    maxSize: "10MB",
    example: {
      imageData: "base64_encoded_image_data",
      mimeType: "image/jpeg",
      userQuery: "What medical condition is shown in this X-ray?"
    }
  });
}