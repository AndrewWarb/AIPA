import { NextRequest, NextResponse } from 'next/server';
import { getAIPAService, isAIPAInitialized } from '@/lib/ai-pa-service';

export async function POST(request: NextRequest) {
  try {
    if (!isAIPAInitialized()) {
      return NextResponse.json(
        { error: 'AI PA not initialized. Please initialize first.' },
        { status: 400 }
      );
    }

    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const aiPAService = getAIPAService();
    const result = await aiPAService.processUserQuery(message, conversationHistory || []);

    return NextResponse.json({
      response: result.response,
      agentConsultations: result.agentConsultations
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process message';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
