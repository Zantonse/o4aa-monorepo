// Use case options for O4AA discovery
export type UseCase =
  | 'workforce-ai-agents'
  | 'customer-facing-ai-agents'
  | '3rd-party-ai-governance'
  | 'ai-agent-ciam';

// Deal stage options
export type DealStage =
  | 'initial-discovery'
  | 'technical-discovery'
  | 'validation-poc';

// Input context from the SE/AE
export interface DealContext {
  accountName: string;
  industry: string;
  useCase: UseCase;
  dealStage: DealStage;
}

// CoTM pillar identifiers
export type CoTMPillarId =
  | 'pbo'
  | 'required-capabilities'
  | 'success-metrics'
  | 'before-after'
  | 'decision-process';

// A single CoTM pillar with its questions
export interface CoTMPillar {
  id: CoTMPillarId;
  name: string;
  description: string;
  questions: string[];
}

// A step in the conversational flow
export interface FlowStep {
  id: string;
  section: string;
  questions: string[];
}

// The full generated discovery plan
export interface DiscoveryPlan {
  accountName: string;
  useCase: UseCase;
  dealStage: DealStage;
  cotmView: CoTMPillar[];
  flowView: FlowStep[];
  generatedAt: string;
}

// UI state for generation
export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';

// Use case display labels
export const USE_CASE_LABELS: Record<UseCase, string> = {
  'workforce-ai-agents': 'Workforce AI Agents',
  'customer-facing-ai-agents': 'Customer-Facing AI Agents',
  '3rd-party-ai-governance': '3rd Party AI Governance',
  'ai-agent-ciam': 'AI Agent CIAM',
};

// Deal stage display labels
export const DEAL_STAGE_LABELS: Record<DealStage, string> = {
  'initial-discovery': 'Initial Discovery',
  'technical-discovery': 'Technical Discovery',
  'validation-poc': 'Validation / POC',
};

// CoTM pillar metadata
export const COTM_PILLAR_META: Record<CoTMPillarId, { name: string; description: string }> = {
  pbo: {
    name: 'Positive Business Outcomes',
    description: 'Uncover the business value and outcomes the customer is trying to achieve',
  },
  'required-capabilities': {
    name: 'Required Capabilities',
    description: 'Identify the specific features and functions they need to achieve those outcomes',
  },
  'success-metrics': {
    name: 'Success Metrics',
    description: 'Define how success will be measured — KPIs, milestones, and benchmarks',
  },
  'before-after': {
    name: 'Before / After Scenarios',
    description: 'Contrast the current painful state with the desired future state',
  },
  'decision-process': {
    name: 'Decision Process',
    description: 'Understand the buying process, stakeholders, timeline, and evaluation criteria',
  },
};

// Flow step section names
export const FLOW_STEP_SECTIONS = [
  'Opening',
  'Pain Exploration',
  'Business Impact',
  'Technical Reality',
  'Decision Process',
  'Next Steps',
] as const;
