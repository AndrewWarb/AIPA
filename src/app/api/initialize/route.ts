import { NextRequest, NextResponse } from 'next/server';
import { getAIPAService } from '@/lib/ai-pa-service';

export async function POST(request: NextRequest) {
  try {
    // Initialize the AI PA service (reads API key from environment variables)
    getAIPAService();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error initializing AI PA:', error);
    return NextResponse.json(
      { error: 'Failed to initialize AI PA. Please check your XAI_API_KEY environment variable.' },
      { status: 500 }
    );
  }
}
