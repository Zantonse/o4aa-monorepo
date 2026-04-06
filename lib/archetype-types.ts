// Customer Intelligence — Archetype Types
// Generated from 743 Gong transcripts (306 AI-related, 279 in viable archetypes)

export type Industry =
  | 'healthcare'
  | 'financial-services'
  | 'technology'
  | 'retail-ecommerce'
  | 'media-entertainment'
  | 'manufacturing'
  | 'insurance'
  | 'professional-services'
  | 'other';

export type ArchetypeUseCase =
  | 'workforce-ai-agents'
  | 'customer-facing-ai-agents'
  | 'ai-agent-ciam'
  | 'general-ai';

export type Confidence = 'high' | 'medium' | 'low';

export interface ArchetypeProfile {
  typicalCompanySize: string;
  aiMaturity: string;
  triggerEvent: string;
  buyingMotion: string;
  typicalBudgetHolder: string;
}

export interface StakeholderInsight {
  role: string;
  frequency: number;
  whatTheyCareAbout: string[];
  typicalQuestions: string[];
  influenceLevel: 'decision-maker' | 'influencer' | 'evaluator' | 'champion';
}

export interface PainPoint {
  id: string;
  statement: string;
  frequency: number;
  severity: 'critical' | 'high' | 'moderate';
  exampleQuote?: string;
}

export interface Goal {
  statement: string;
  frequency: number;
  successMetric?: string;
}

export interface ProductRecommendation {
  product: string;
  relevance: 'primary' | 'secondary' | 'adjacent';
  rationale: string;
  specificFeatures: string[];
  frequency: number;
}

export interface CompetitorMention {
  competitor: string;
  frequency: number;
  context: string;
  differentiators: string[];
}

export interface Objection {
  objection: string;
  frequency: number;
  counterPosition: string;
  evidenceSupport?: string;
}

export interface DiscoveryQuestion {
  question: string;
  callPhase: 'opening' | 'pain-exploration' | 'technical' | 'decision-process';
  rationale: string;
}

export interface ProofPoint {
  metric: string;
  customer?: string;
  source: string;
  confidence: 'hard' | 'soft' | 'narrative';
}

export interface DealStagePattern {
  stage: string;
  description: string;
  typicalDuration: string;
  keyActivities: string[];
}

export interface DealProgression {
  typicalTimeline: string;
  typicalStages: DealStagePattern[];
  commonBlockers: string[];
  accelerators: string[];
}

export interface TranscriptQuote {
  quote: string;
  context: string;
  speakerRole: string;
}

export interface CustomerArchetype {
  id: string;
  industry: Industry;
  useCase: ArchetypeUseCase;
  transcriptCount: number;
  confidence: Confidence;
  profile: ArchetypeProfile;
  stakeholders: StakeholderInsight[];
  painPoints: PainPoint[];
  goals: Goal[];
  productFit: ProductRecommendation[];
  competitiveContext: CompetitorMention[];
  objections: Objection[];
  discoveryQuestions: DiscoveryQuestion[];
  proofPoints: ProofPoint[];
  dealProgression: DealProgression;
  realQuotes: TranscriptQuote[];
}

// Display labels
export const INDUSTRY_LABELS: Record<Industry, string> = {
  'healthcare': 'Healthcare',
  'financial-services': 'Financial Services',
  'technology': 'Technology',
  'retail-ecommerce': 'Retail & E-Commerce',
  'media-entertainment': 'Media & Entertainment',
  'manufacturing': 'Manufacturing',
  'insurance': 'Insurance',
  'professional-services': 'Professional Services',
  'other': 'Other Industries',
};

export const ARCHETYPE_USE_CASE_LABELS: Record<ArchetypeUseCase, string> = {
  'workforce-ai-agents': 'Workforce AI Agents',
  'customer-facing-ai-agents': 'Customer-Facing AI Agents',
  'ai-agent-ciam': 'AI Agent CIAM',
  'general-ai': 'General AI Exploration',
};

export const CONFIDENCE_CONFIG: Record<Confidence, { label: string; color: string; minTranscripts: number }> = {
  high: { label: 'High Confidence', color: 'green', minTranscripts: 10 },
  medium: { label: 'Medium Confidence', color: 'amber', minTranscripts: 5 },
  low: { label: 'Low Confidence', color: 'red', minTranscripts: 3 },
};
