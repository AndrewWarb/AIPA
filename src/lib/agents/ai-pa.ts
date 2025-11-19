import { ChatXAI } from '@langchain/xai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';

export class AIPAAgent {
  private llm: ChatXAI;
  private systemPrompt: string;

  constructor() {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      throw new Error('XAI_API_KEY environment variable is required');
    }

    // Initialize Grok LLM
    this.llm = new ChatXAI({
      apiKey,
      model: 'grok-4-fast-reasoning',
      temperature: 1.0, // Creative responses matching typical Grok behavior (0.0=deterministic, 2.0=very random)
    });

    // Define the AI PA system prompt
    this.systemPrompt = `You are the AI Personal Assistant (AI PA), a sophisticated orchestration system designed to help users achieve their life goals.

Your role is to act as an intelligence-multiplier for users in the pursuit of their goals, and as a cognitive load-balancer to free up head-space to allow users to focus more deeply on their tasks.

You communicate directly with users and coordinate a team of specialized AI agents across domains including health, finance, relationships, productivity, and law. For this minimal MVP, you are the only agent implemented, so you handle all interactions directly.

When responding to user queries:
1. Understand the user's query in the context of their goals
2. Provide thoughtful, personalized advice
3. If this involves planning or complex decisions, acknowledge that in a full system you would coordinate with specialist agents
4. Keep responses clear, actionable, and focused on helping the user achieve their goals
5. Respond naturally as a helpful personal assistant

You have access to a structured directory system for storing and retrieving information, documents, and plans, but in this MVP implementation, you'll work with the information provided in conversations.`;
  }

  async processUserQuery(query: string, userContext?: string): Promise<string> {
    try {
      console.log('AI PA: Processing query:', query);

      const messages = [
        new SystemMessage(this.systemPrompt),
        new HumanMessage(`User query: "${query}"
        ${userContext ? `Additional context: ${userContext}` : ''}

        Please provide a helpful, personalized response focused on helping the user achieve their goals.`)
      ];

      console.log('AI PA: Sending request to Grok API...');
      const response = await this.llm.invoke(messages);
      console.log('AI PA: Received response from Grok API');

      return response.content as string;
    } catch (error) {
      console.error('AI PA: Error processing query with Grok:', error);
      throw new Error(`Failed to process the query: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateUserContext(newInformation: string): Promise<void> {
    // In a full system, this would store information in the information/ directory
    // For MVP, we'll just acknowledge the update
    console.log('AI PA: User context updated:', newInformation);
  }
}
