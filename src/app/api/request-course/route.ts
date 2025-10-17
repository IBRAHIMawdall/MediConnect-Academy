import { NextResponse } from "next/server";

// Simple in-memory storage for course requests (in production, use a database)
const courseRequests: Array<{
  id: string;
  topic: string;
  suggestion?: string;
  timestamp: number;
  status: 'pending' | 'approved' | 'rejected';
}> = [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { topic, suggestion } = body;

    if (!topic || topic.length < 5) {
      return NextResponse.json(
        { error: "Topic must be at least 5 characters long" },
        { status: 400 }
      );
    }

    // Create a new course request
    const newRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      topic: topic.trim(),
      suggestion: suggestion?.trim(),
      timestamp: Date.now(),
      status: 'pending' as const
    };

    courseRequests.push(newRequest);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({
      success: true,
      message: "Course request submitted successfully!",
      requestId: newRequest.id,
      estimatedReviewTime: "2-3 business days"
    });

  } catch (error) {
    console.error("Error processing course request:", error);
    return NextResponse.json(
      { error: "Failed to submit course request" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Return all course requests (for admin purposes)
    return NextResponse.json({
      requests: courseRequests,
      total: courseRequests.length
    });
  } catch (error) {
    console.error("Error fetching course requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch course requests" },
      { status: 500 }
    );
  }
}