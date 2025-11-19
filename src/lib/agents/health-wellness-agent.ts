import { ChatXAI } from '@langchain/xai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export class HealthWellnessAgent {
  private llm: ChatXAI;
  private systemPrompt: string;

  constructor(apiKey: string) {
    this.llm = new ChatXAI({
      apiKey,
      model: 'grok-4-fast-reasoning',
      temperature: 0.8, // Slightly creative for personalized advice
    });

    this.systemPrompt = `You are the Health & Wellness Specialist Agent for the AI Personal Assistant system.

Your primary goal is to maximize the user's longevity and overall health and wellness. You focus on:

1. Nutrition and diet optimization
2. Exercise and physical activity recommendations
3. Mental health and stress management
4. Sleep quality and recovery
5. Preventive healthcare and screening
6. Lifestyle factors affecting health
7. Evidence-based health practices

You provide specific, actionable advice tailored to the user's situation. When consulted by the AI PA, give focused, expert-level health recommendations.

Always emphasize sustainable, long-term health improvements over quick fixes. Be encouraging and supportive while being medically responsible.

If you need more information about the user's current health status, diet, exercise habits, or medical history, ask the AI PA to gather that information.`;
  }

  async provideHealthAdvice(query: string, userContext?: string): Promise<string> {
    try {
      console.log('Health & Wellness Agent: Processing query:', query);

      const messages = [
        new SystemMessage(this.systemPrompt),
        new HumanMessage(`Health query: "${query}"
        ${userContext ? `User context: ${userContext}` : ''}

        Please provide specific, actionable health and wellness advice focused on maximizing longevity and well-being.`)
      ];

      console.log('Health & Wellness Agent: Consulting with Grok...');
      const response = await this.llm.invoke(messages);
      console.log('Health & Wellness Agent: Received expert advice');

      return response.content as string;
    } catch (error) {
      console.error('Health & Wellness Agent: Error:', error);
      throw new Error(`Health consultation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
