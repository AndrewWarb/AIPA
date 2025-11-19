import { AIPAAgent } from './agents/ai-pa';

// Singleton instance - ensures only one AI PA agent exists
let aiPAService: AIPAAgent | null = null;

export function getAIPAService(): AIPAAgent {
  if (!aiPAService) {
    aiPAService = new AIPAAgent();
  }
  return aiPAService;
}

export function isAIPAInitialized(): boolean {
  return aiPAService !== null;
}
