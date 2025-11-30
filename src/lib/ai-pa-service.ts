import { AIPAAgent } from './agents/ai-pa';

// Singleton instance - ensures only one AI PA agent exists (auto-initialized)
let aiPAService: AIPAAgent;

try {
  // Auto-initialize on module load
  aiPAService = new AIPAAgent();
  console.log('AI PA: Auto-initialized successfully');
} catch (error) {
  console.error('AI PA: Failed to auto-initialize:', error);
  // Create a placeholder that will throw errors until proper API key is set
  aiPAService = {} as AIPAAgent;
}

export function getAIPAService(): AIPAAgent {
  if (!aiPAService || typeof aiPAService.processUserQuery !== 'function') {
    throw new Error('AI PA service not properly initialized. Please check your XAI_API_KEY environment variable.');
  }
  return aiPAService;
}

export function isAIPAInitialized(): boolean {
  return aiPAService && typeof aiPAService.processUserQuery === 'function';
}
