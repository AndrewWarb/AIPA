import { NextResponse } from 'next/server';
import { isAIPAInitialized } from '@/lib/ai-pa-service';

export async function GET() {
  try {
    // Check if AI PA is initialized (happens automatically on server start)
    const isInitialized = isAIPAInitialized();

    return NextResponse.json({
      initialized: isInitialized,
      message: isInitialized ? 'AI PA is ready' : 'AI PA failed to initialize'
    });
  } catch (error) {
    console.error('Error checking AI PA status:', error);
    return NextResponse.json(
      { error: 'Failed to check AI PA status', initialized: false },
      { status: 500 }
    );
  }
}
