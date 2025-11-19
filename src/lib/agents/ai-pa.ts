import { ChatXAI } from '@langchain/xai';
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { HealthWellnessAgent } from './health-wellness-agent';

export class AIPAAgent {
  private llm: ChatXAI;
  private classifier: ChatXAI; // Cheap model for classification
  private readonly systemPrompt: string;
  private healthWellnessAgent: HealthWellnessAgent;

  constructor() {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      throw new Error('XAI_API_KEY environment variable is required');
    }

    // Initialize main LLM for responses
    this.llm = new ChatXAI({
      apiKey,
      model: 'grok-4-fast-reasoning',
      temperature: 1.0, // Creative responses matching typical Grok behavior (0.0=deterministic, 2.0=very random)
    });

    // Initialize cheap classifier for query routing
    this.classifier = new ChatXAI({
      apiKey,
      model: 'grok-3-mini', // Cheap and fast for classification
      temperature: 0.1, // Low temperature for consistent classification
    });

    // Initialize specialist agents
    this.healthWellnessAgent = new HealthWellnessAgent(apiKey);

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

  async processUserQuery(query: string, conversationHistory: Array<{ role: string, content: string }> = []): Promise<{
    response: string,
    agentConsultations?: Array<{ agent: string, query: string, response: string }>
  }> {
    try {
      console.log('AI PA: Processing query:', query);
      console.log('AI PA: Conversation history length:', conversationHistory.length);

      const agentConsultations: Array<{ agent: string, query: string, response: string }> = [];

      // Classify query using AI
      const isHealthRelated = await this.classifyQueryDomain(query);

      if (isHealthRelated) {
        console.log('AI PA: Health-related query detected, consulting Health & Wellness Agent...');

        try {
          const healthAdvice = await this.healthWellnessAgent.provideHealthAdvice(query, this.extractUserContext(conversationHistory));
          agentConsultations.push({
            agent: 'Health & Wellness Agent',
            query: query,
            response: healthAdvice
          });
          console.log('AI PA: Received health consultation');
        } catch (error) {
          console.error('AI PA: Health agent consultation failed:', error);
          // Continue without health advice rather than failing completely
        }
      }

      // Build messages array with conversation history and agent consultations
      const messages = [
        new SystemMessage(`${this.systemPrompt}

${agentConsultations.length > 0 ? `Recent specialist consultations:
${agentConsultations.map(consult => `${consult.agent}: ${consult.response}`).join('\n')}

Use this expert advice to inform your response to the user.` : ''}`),
        ...conversationHistory.map(msg => {
          if (msg.role === 'user') {
            return new HumanMessage(msg.content);
          } else {
            return new AIMessage(msg.content);
          }
        }),
        new HumanMessage(query)
      ];

      console.log('AI PA: Sending request to Grok API with', messages.length, 'messages...');
      const response = await this.llm.invoke(messages);
      console.log('AI PA: Received response from Grok API');

      return {
        response: response.content as string,
        agentConsultations: agentConsultations.length > 0 ? agentConsultations : undefined
      };
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

  private async classifyQueryDomain(query: string): Promise<boolean> {
    try {
      const classificationPrompt = `Analyze this user query and determine if it's primarily about health, wellness, fitness, nutrition, or medical topics.

Query: "${query}"

Respond with only "HEALTH" or "OTHER". Consider:
- HEALTH: diet, exercise, sleep, stress, mental health, medical advice, fitness, nutrition, wellness, longevity
- OTHER: weather, entertainment, work productivity (non-health), travel, hobbies, relationships (non-health), etc.

Response:`;

      const messages = [new SystemMessage(classificationPrompt)];
      const response = await this.classifier.invoke(messages);
      const result = response.content as string;

      console.log('AI PA: Query classification result:', result.trim());

      return result.trim().toUpperCase() === 'HEALTH';
    } catch (error) {
      console.error('AI PA: Classification failed, falling back to keyword detection:', error);
      // Fallback to simple keyword detection if AI classification fails
      return this.fallbackKeywordCheck(query);
    }
  }

  private fallbackKeywordCheck(query: string): boolean {
    const healthKeywords = [
      'health', 'wellness', 'fitness', 'exercise', 'diet', 'nutrition',
      'sleep', 'stress', 'mental health', 'doctor', 'medical',
      'workout', 'running', 'gym', 'weight', 'calories', 'protein',
      'vitamins', 'supplements', 'hydration', 'meditation', 'yoga',
      'longevity', 'aging', 'chronic', 'disease', 'prevention'
    ];

    const lowerQuery = query.toLowerCase();
    return healthKeywords.some(keyword => lowerQuery.includes(keyword));
  }

  private extractUserContext(conversationHistory: Array<{ role: string, content: string }>): string {
    // Extract recent user messages to provide context to specialist agents
    return conversationHistory
      .filter(msg => msg.role === 'user')
      .slice(-3) // Last 3 user messages
      .map(msg => msg.content)
      .join(' ');
  }
}
