# Customer Intelligence — Design Spec

**Date:** 2026-03-30
**Feature:** Pre-call prep tool that surfaces customer archetype patterns extracted from 743 Gong transcripts
**Location:** New `/insights` route in the O4AA Discovery app

---

## Problem

SEs and AEs walk into AI Agent calls without knowing what customers like theirs typically care about. The team has 743 Gong transcripts (256 AI-focused) that contain rich signal about customer pain points, stakeholder dynamics, product fit, objections, and deal progression — but no one has time to read them. This feature extracts and structures those patterns into an instant pre-call prep tool.

## Solution

An **Archetype Matrix** organized by Industry × Use Case. SE selects their customer's industry and AI use case, gets a structured brief showing what customers in that segment typically look like: who's in the room, what they care about, what products resonate, what objections to expect, and what questions to ask.

Two view modes:
- **Cheat Sheet** — single screen, top 3 items per category, for the "5 minutes before the call" scenario
- **Full Detail** — expandable card grid with complete insights per dimension

---

## Data Model

### Core Types

```typescript
type Industry =
  | 'healthcare'
  | 'financial-services'
  | 'technology'
  | 'retail-ecommerce'
  | 'media-entertainment'
  | 'manufacturing'
  | 'insurance'
  | 'government'
  | 'education'
  | 'professional-services'
  | 'other';

// Reuses existing UseCase type from lib/types.ts:
// 'workforce-ai-agents' | 'customer-facing-ai-agents' | '3rd-party-ai-governance' | 'ai-agent-ciam'

interface CustomerArchetype {
  id: string;                            // e.g., "healthcare-workforce-ai"
  industry: Industry;
  useCase: UseCase;
  transcriptCount: number;               // how many transcripts inform this archetype
  confidence: 'high' | 'medium' | 'low'; // high: 10+, medium: 5-9, low: 3-4

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
```

### Sub-Types

```typescript
interface ArchetypeProfile {
  typicalCompanySize: string;        // e.g., "5,000-50,000 employees"
  aiMaturity: string;                // e.g., "Early experimentation, 10-50 agents"
  triggerEvent: string;              // what brought them to Okta for AI
  buyingMotion: string;              // e.g., "Security-led, CISO-sponsored"
  typicalBudgetHolder: string;       // who owns the budget
}

interface StakeholderInsight {
  role: string;                      // e.g., "CISO", "VP Engineering"
  frequency: number;                 // 0-1, how often this role appears
  whatTheyCareAbout: string[];       // top concerns for this role
  typicalQuestions: string[];        // questions they tend to ask
  influenceLevel: 'decision-maker' | 'influencer' | 'evaluator' | 'champion';
}

interface PainPoint {
  id: string;
  statement: string;                 // the pain point in customer language
  frequency: number;                 // 0-1, how often this appears
  severity: 'critical' | 'high' | 'moderate';
  exampleQuote?: string;             // anonymized real quote
}

interface Goal {
  statement: string;
  frequency: number;
  successMetric?: string;            // how they measure success
}

interface ProductRecommendation {
  product: string;                   // e.g., "Okta for AI Agents", "ISPM", "OPA", "FGA"
  relevance: 'primary' | 'secondary' | 'adjacent';
  rationale: string;                 // why this product fits
  specificFeatures: string[];        // which features matter
  frequency: number;                 // how often discussed in transcripts
}

interface CompetitorMention {
  competitor: string;                // e.g., "Wiz", "HashiCorp Vault", "RunLayer"
  frequency: number;
  context: string;                   // what they're being evaluated for
  differentiators: string[];         // how Okta wins against this competitor
}

interface Objection {
  objection: string;                 // the pushback
  frequency: number;
  counterPosition: string;           // suggested response
  evidenceSupport?: string;          // proof point or capability that addresses it
}

interface DiscoveryQuestion {
  question: string;
  callPhase: 'opening' | 'pain-exploration' | 'technical' | 'decision-process';
  rationale: string;                 // why this question works for this archetype
}

interface ProofPoint {
  metric: string;                    // e.g., "95% reduction in shadow AI tools"
  customer?: string;                 // anonymized or named if public
  source: string;                    // where this data comes from
  confidence: 'hard' | 'soft' | 'narrative';
}

interface DealProgression {
  typicalTimeline: string;           // e.g., "60-90 days from first call to POC"
  typicalStages: DealStagePattern[];
  commonBlockers: string[];
  accelerators: string[];            // what speeds deals up
}

interface DealStagePattern {
  stage: string;
  description: string;
  typicalDuration: string;
  keyActivities: string[];
}

interface TranscriptQuote {
  quote: string;                     // anonymized
  context: string;                   // what was being discussed
  speakerRole: string;               // role, not name
}
```

---

## UI Design

### Route: `/insights`

New page added to the app nav as "Customer Intelligence" alongside Question Bank and Call Wizard.

### Layout

#### Header Section
- Page title: "Customer Intelligence"
- Subtitle: "Pre-call prep powered by {N} real Gong transcripts"
- Two dropdowns: Industry (11 options) and Use Case (4 options, reuse existing)
- Confidence badge: "{N} transcripts" with color (green: high, amber: medium, red: low)
- View toggle: "Cheat Sheet" / "Full Detail" (pill toggle, default: Cheat Sheet)

#### Cheat Sheet Mode (default)
Single screen, no scrolling on desktop. Organized as a compact grid:

| Column 1 | Column 2 | Column 3 |
|-----------|----------|----------|
| **Profile** (company size, maturity, trigger) | **Top 3 Pain Points** | **Top 3 Goals** |
| **Key Stakeholders** (top 3 roles + what they care about) | **Product Fit** (primary products + one-line rationale) | **Top 3 Discovery Questions** |
| **Competitive Landscape** (top competitors + differentiation) | **Top 3 Objections** (with counter-positions) | **Deal Progression** (timeline + key stages) |

Each cell is a compact card. "See full detail" link on each card switches to Full Detail mode with that card expanded.

#### Full Detail Mode
Two-column card grid (stacked on mobile). 9 cards:

1. **Archetype Profile** — hero card spanning full width
2. **Stakeholder Map** — role cards with influence indicators
3. **Pain Points** — ranked list with frequency bars and quotes
4. **Goals & Success Criteria** — ranked with metrics
5. **Product Fit** — product cards with relevance badges
6. **Competitive Landscape** — competitor cards with differentiation
7. **Objections & Landmines** — objection/counter pairs
8. **Discovery Questions** — organized by call phase
9. **Proof Points & Deal Progression** — combined card

Each card: collapsed showing title + 2-line preview. Click to expand. Copy button on each card.

### Styling
- Follow existing app patterns: `bg-white border border-slate-200 rounded-xl shadow-sm`
- Okta blue (`#00297A`) for primary actions and active states
- Frequency/prevalence shown as horizontal bar fills (Okta blue gradient)
- Confidence indicators: green (high), amber (medium), red (low)
- Cards use the existing pillar color palette from CoTMView for visual variety

---

## Agent Research Pipeline

### Overview

Three-phase pipeline using parallel agents to process 743 transcripts into structured archetype data.

### Phase 1: Transcript Classification & Signal Extraction

**Agent count:** 6 parallel agents, ~124 transcripts each

**Per-transcript output:**

```typescript
interface TranscriptSignal {
  filename: string;
  isAICall: boolean;
  company: string;
  industry: Industry;
  useCase: UseCase | null;           // null if not an AI call
  callType: 'discovery' | 'demo' | 'poc' | 'technical-deep-dive' | 'internal-review' | 'account-sync' | 'other';
  attendeeRoles: string[];
  dealStageSignals: string[];
  painPoints: string[];
  goalsStated: string[];
  productsDiscussed: string[];
  competitorsMentioned: string[];
  objectionsRaised: string[];
  notableQuotes: { quote: string; speakerRole: string; context: string }[];
  gongSummary: string;              // extracted from transcript header
  gongKeyPoints: string[];          // extracted from transcript header
}
```

**Agent instructions:**
- Read the Gong summary/key points section first (high-quality signal)
- Classify industry from company name + context clues
- Map use case to the 4 existing categories
- Extract pain points in customer language (not Okta marketing language)
- Capture real quotes (anonymize company name if sensitive)
- Skip non-AI calls for detailed extraction (still classify them for corpus stats)

### Phase 2: Archetype Synthesis

**Agent count:** 1 agent per archetype that has 3+ transcripts (estimated 12-20 archetypes)

**Per-archetype process:**
1. Receive all TranscriptSignals for this industry×use case
2. Aggregate pain points — rank by frequency, merge near-duplicates
3. Aggregate stakeholder roles — build the StakeholderInsight array
4. Aggregate goals, products, competitors, objections
5. Select best quotes (most vivid, most representative)
6. Infer deal progression patterns from stage signals and call types
7. Map proof points from outcome mentions
8. Build the full CustomerArchetype object

### Phase 3: Data Assembly

**Agent count:** 1 agent

**Process:**
1. Merge all archetype outputs
2. Generate industry and use case enum lists based on what actually exists in the data
3. Flag thin archetypes (< 5 transcripts) as low confidence
4. Write final `lib/archetype-data.ts` with full typed data
5. Write `lib/archetype-types.ts` with shared type definitions
6. Validate: every required field populated, no empty arrays on high-confidence archetypes

---

## File Structure (New Files)

```
o4aa-discovery/
  app/
    insights/
      page.tsx                 # /insights route — main page
  components/
    ArchetypeSelector.tsx      # industry + use case dropdowns + confidence badge
    CheatSheet.tsx             # compact single-screen view
    FullDetailView.tsx         # expandable card grid
    InsightCard.tsx            # reusable card component (title, preview, expand, copy)
    StakeholderMap.tsx         # role cards with influence indicators
    FrequencyBar.tsx           # horizontal bar chart for rankings
  lib/
    archetype-data.ts          # pre-computed archetype JSON (generated by agents)
    archetype-types.ts         # TypeScript types for archetype data model
```

---

## Implementation Notes

- No new API routes needed — all data is static and imported at build time
- NavLinks.tsx updated to add "Customer Intelligence" with `/insights` route
- Reuse existing Tailwind patterns and color system
- All transcript data is anonymized in the final output — no PII from Gong exports
- The archetype data file can be regenerated by re-running the agent pipeline when new transcripts arrive

---

## Out of Scope (v1)

- Dynamic AI generation per query (v2: paste deal context, get custom brief)
- Transcript search/browse (the raw transcripts stay on disk, not in the app)
- Auto-refresh when new transcripts are added
- Comparison mode (side-by-side two archetypes)
- Export to PDF/markdown

---

## Success Criteria

1. An SE can select Industry + Use Case and see a structured archetype brief in < 1 second
2. The cheat sheet mode fits on a single screen without scrolling (desktop)
3. Every insight card has a copy button for quick paste into call prep
4. At least 10 distinct archetypes with high confidence (10+ transcripts each)
5. Pain points and stakeholder insights are in customer language, not Okta marketing language
