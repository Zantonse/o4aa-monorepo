/**
 * cotm-rubric.ts
 *
 * Intelligence layer for the O4AA discovery question generator.
 * Encodes the Command of the Message (CoTM) framework with O4AA-specific guidance.
 *
 * O4AA Product Context:
 * Okta for AI Agents enables organizations to:
 *   - Register and track AI agents (human and non-human identities)
 *   - Issue tokens/credentials to AI agents
 *   - Define and enforce fine-grained authorization policies for agents
 *   - Trace agent actions across systems for audit/compliance
 *   - Govern 3rd party AI agent access
 *   - Implement CIBA (Client-Initiated Backchannel Authentication) for agents
 *     acting on a user's behalf (async authorization)
 *   - Apply least-privilege to AI agent access
 *   - Integrate with Auth0 for customer-facing agent authentication and CIAM
 */

import type { CoTMPillarId, DealStage, UseCase } from './types';

// ---------------------------------------------------------------------------
// USE_CASE_ANGLES
// Discovery angle context per use case — shapes which business pain surfaces
// and which O4AA capabilities are most relevant in the conversation.
// ---------------------------------------------------------------------------

export const USE_CASE_ANGLES: Record<
  UseCase,
  {
    label: string;
    corePain: string;
    primaryBuyers: string[];
    keyRisks: string[];
    o4aaCapabilities: string[];
    triggerKeywords: string[];
  }
> = {
  'workforce-ai-agents': {
    label: 'Workforce AI Agents',
    corePain:
      'Employees are adopting AI assistants (Copilot, Claude, ChatGPT) and building agent workflows without IT visibility or governance. Every unmanaged agent is a potential compliance violation, data exfiltration vector, or audit gap.',
    primaryBuyers: [
      'CISO / Head of Security',
      'CIO / VP of IT',
      'Head of AI/ML Engineering',
      'Compliance & Risk Officer',
    ],
    keyRisks: [
      'Shadow AI: employees connecting unapproved agents to corporate systems',
      'No audit trail for actions taken by AI on behalf of employees',
      'Agents accumulating excessive permissions (no least-privilege)',
      'Compliance violations from AI-driven data access (HIPAA, SOX, GDPR)',
      'No revocation mechanism when employees leave or agents are decommissioned',
      'Inability to prove human oversight of AI actions during an audit',
    ],
    o4aaCapabilities: [
      'Agent registry: catalog every workforce AI agent in one place',
      'Token issuance with scoped, time-limited credentials for each agent',
      'Fine-grained authorization policies enforced at the API layer',
      'Immutable audit trail linking agent actions to the employee who authorized them',
      'Lifecycle management: auto-deprovision agents tied to offboarded employees',
      'Policy enforcement across M365 Copilot, Claude, custom LLM pipelines',
    ],
    triggerKeywords: [
      'Copilot',
      'shadow IT',
      'AI governance',
      'employee AI',
      'internal agents',
      'workforce automation',
      'audit',
      'compliance',
    ],
  },

  'customer-facing-ai-agents': {
    label: 'Customer-Facing AI Agents',
    corePain:
      'Products are shipping AI assistants and agents that act on customer accounts — booking, purchasing, managing preferences. Without proper CIAM for agents, customers have no visibility into what the agent did on their behalf, and the company has no way to prove consent or enforce authorization boundaries.',
    primaryBuyers: [
      'CPO / VP of Product',
      'Head of Engineering / CTO',
      'CISO',
      'Head of Identity / Platform Engineering',
    ],
    keyRisks: [
      'Agent overstep: AI agent takes actions the customer never explicitly authorized',
      'No delegated authorization model — agent uses the user\'s full credentials',
      'Customer trust erosion if AI acts without clear consent boundaries',
      'Session management gaps: agents holding long-lived tokens without refresh controls',
      'Inability to revoke agent access without revoking the user\'s own session',
      'Regulatory exposure (PSD2, CCPA) if agent-initiated transactions lack consent records',
    ],
    o4aaCapabilities: [
      'Auth0 CIAM integration: customer-facing agent auth built on proven identity infrastructure',
      'CIBA (Client-Initiated Backchannel Authentication): async user consent for agent actions',
      'Delegated authorization: agent receives a scoped token, not the user\'s full credential',
      'Per-action authorization policies (not just login-time consent)',
      'Consent ledger: auditable record of what the customer authorized the agent to do',
      'Token binding: agent tokens cryptographically tied to the originating user session',
    ],
    triggerKeywords: [
      'AI assistant',
      'customer agent',
      'agentic product',
      'AI-powered',
      'act on behalf',
      'delegated',
      'CIAM',
      'Auth0',
    ],
  },

  '3rd-party-ai-governance': {
    label: '3rd Party AI Governance',
    corePain:
      'Vendors and SaaS partners are deploying AI agents that access the organization\'s data and systems. There is no consistent framework for what those agents are allowed to do, no monitoring of their actions, and no way to enforce least-privilege across the supply chain.',
    primaryBuyers: [
      'CISO / VP of Security',
      'Head of Vendor Risk / Third-Party Risk Management',
      'Procurement / Legal (AI addendums)',
      'Head of IAM / Zero Trust lead',
    ],
    keyRisks: [
      'Vendor agents with broad API access and no scope restrictions',
      'No visibility into what third-party AI agents are doing inside your environment',
      'Supply chain AI risk: compromised vendor agent = compromised internal data',
      'AI addendums without technical enforcement — policy on paper only',
      'No mechanism to pause or revoke a vendor\'s agent access without breaking the integration',
      'Vendor agents bypassing PAM/SSO controls because they authenticate via API key',
    ],
    o4aaCapabilities: [
      'Third-party agent registry: enumerate and classify every vendor AI agent with access',
      'Scoped token issuance to vendor agents — no shared secrets or long-lived API keys',
      'Fine-grained authorization policies: vendor agent X can only read resource Y',
      'Real-time monitoring and alerting on vendor agent behavior anomalies',
      'Revocation without integration breakage: token rotation with zero-downtime handoff',
      'Audit logs that are vendor-opaque — you see everything, they see nothing',
    ],
    triggerKeywords: [
      'vendor AI',
      'third-party agent',
      'supply chain',
      'SaaS AI',
      'partner access',
      'AI addendum',
      'vendor risk',
      'external agent',
    ],
  },

  'ai-agent-ciam': {
    label: 'AI Agent CIAM (Non-Human Identities)',
    corePain:
      'AI agents are multiplying faster than identity infrastructure can handle. Service accounts, M2M credentials, and agent tokens are proliferating with no lifecycle governance, no least-privilege enforcement, and no consistent provisioning/deprovisioning process.',
    primaryBuyers: [
      'Head of Platform / Infrastructure Engineering',
      'IAM / Identity Engineering Lead',
      'CISO',
      'Head of AI/ML Platform',
    ],
    keyRisks: [
      'Proliferating service accounts with no owner and over-provisioned permissions',
      'Long-lived static API keys used for agent auth — no rotation, no expiry',
      'No systematic deprovisioning when an agent is retired or its purpose changes',
      'M2M credentials not covered by existing PAM or secrets management tools',
      'Inability to answer "what agents do we have and what can they access?" in an audit',
      'Identity sprawl: agents registered in AWS, Azure, GitHub, and internal systems independently',
    ],
    o4aaCapabilities: [
      'Non-human identity (NHI) registry: single authoritative catalog of all agent identities',
      'Short-lived token issuance via client credentials flow — no static secrets',
      'Least-privilege policy engine: define what each agent class is allowed to access',
      'Lifecycle automation: provisioning workflows tied to CI/CD pipelines or ticketing systems',
      'Automated deprovisioning triggers (agent version deprecated, project closed, etc.)',
      'Cross-cloud NHI normalization: consistent identity model regardless of runtime environment',
    ],
    triggerKeywords: [
      'service account',
      'M2M',
      'non-human identity',
      'API key',
      'machine identity',
      'NHI',
      'agent lifecycle',
      'workload identity',
    ],
  },
};

// ---------------------------------------------------------------------------
// COTM_RUBRIC
// Per-pillar guidance that shapes how the AI generates questions.
// Each entry defines the pillar's theme, its overarching goal in the
// conversation, and specific angles to take per use case.
// ---------------------------------------------------------------------------

export const COTM_RUBRIC: Record<
  CoTMPillarId,
  {
    theme: string;
    goalDescription: string;
    promptInstruction: string;
    useCaseGuidance: Record<UseCase, string>;
  }
> = {
  pbo: {
    theme: 'Positive Business Outcomes',
    goalDescription:
      'Surface the executive-level business outcomes the customer is trying to achieve — not features, not technology, but the measurable business results that justify the initiative. Tie AI agent identity governance to revenue, risk reduction, compliance posture, or competitive differentiation.',
    promptInstruction:
      'Generate open-ended questions that connect AI agent governance to board-level priorities. Avoid "what features do you need?" and instead ask "what happens to the business if this problem is not solved?" questions.',
    useCaseGuidance: {
      'workforce-ai-agents':
        'Angle toward risk reduction and productivity unlock. Ask what happens to compliance posture, employee trust, and productivity roadmap if shadow AI continues unchecked. Tie governance to enabling more AI adoption safely — not blocking it.',
      'customer-facing-ai-agents':
        'Angle toward customer trust and product differentiation. Ask how AI agent experiences affect customer retention, NPS, and the ability to compete on AI-powered features. Frame CIAM for agents as a product capability, not a security tax.',
      '3rd-party-ai-governance':
        'Angle toward supply chain risk and regulatory exposure. Ask what a vendor AI incident would cost — reputationally, financially, and in customer contracts. Frame third-party agent governance as a board-level risk management obligation.',
      'ai-agent-ciam':
        'Angle toward scale and velocity. Ask how identity sprawl for non-human identities is slowing down AI initiatives, creating audit liability, or blocking zero-trust maturity. Frame NHI governance as infrastructure for AI at scale.',
    },
  },

  'required-capabilities': {
    theme: 'Required Capabilities',
    goalDescription:
      'Identify the specific technical and operational capabilities the customer must have to achieve their stated outcomes. This pillar translates business pain into a capability checklist that maps cleanly to O4AA features. Avoid feature-dumping — only surface capabilities that connect to the pain already uncovered.',
    promptInstruction:
      'Generate questions that help the customer articulate what "good" looks like technically. Ask about current gaps, must-haves vs. nice-to-haves, and whether existing tools (PAM, secrets managers, CASB) are already partially solving the problem.',
    useCaseGuidance: {
      'workforce-ai-agents':
        'Probe for: agent discovery/inventory capabilities, policy enforcement at the API layer, audit trail that can satisfy a compliance auditor, and employee-level vs. agent-level authorization. Ask whether existing IGA or PAM tools have been extended to cover AI agents.',
      'customer-facing-ai-agents':
        'Probe for: delegated authorization flows (CIBA/OAuth), per-action consent models, the ability to revoke an agent session independently of the user session, and customer-visible consent records. Ask how their current Auth0 or CIAM implementation handles agent tokens today.',
      '3rd-party-ai-governance':
        'Probe for: vendor onboarding workflows for AI agents, API gateway integration, behavior anomaly detection, and contractual/technical enforcement of AI addendums. Ask whether vendor risk processes currently cover AI agents or only human access.',
      'ai-agent-ciam':
        'Probe for: programmatic provisioning/deprovisioning, short-lived credential issuance, cross-environment NHI inventory, and integration with CI/CD pipelines. Ask what percentage of their service accounts have a known owner and a documented access scope.',
    },
  },

  'success-metrics': {
    theme: 'Success Metrics',
    goalDescription:
      'Define how the customer will measure success — concretely and within a specific timeframe. This pillar prevents vague evaluations and creates the benchmarks for a POC or business case. Good success metrics are quantifiable, time-bound, and owned by a named stakeholder.',
    promptInstruction:
      'Generate questions that force specificity: percentages, time-to-X, reduction in incidents, audit pass rates. Avoid accepting "improved security" as an answer — push for the number behind the feeling.',
    useCaseGuidance: {
      'workforce-ai-agents':
        'Target metrics: % of employee AI agents inventoried within 30 days, time-to-revoke a terminated employee\'s agent credentials, number of policy violations caught per quarter, audit pass rate for AI-related controls. Ask what their auditor would need to see to sign off.',
      'customer-facing-ai-agents':
        'Target metrics: customer consent capture rate, mean time to revoke an agent\'s access post-incident, reduction in customer complaints about unauthorized AI actions, number of agent-initiated transactions with a complete consent record. Ask what a 1-point NPS improvement is worth.',
      '3rd-party-ai-governance':
        'Target metrics: % of vendor AI agents with a defined access policy, mean time to detect anomalous vendor agent behavior, reduction in over-provisioned vendor credentials, time-to-offboard a vendor\'s agent. Ask what their current vendor incident response SLA is.',
      'ai-agent-ciam':
        'Target metrics: % of non-human identities with a known owner, reduction in static API key usage, mean time to deprovision a retired agent, audit coverage of NHI access events. Ask whether they can answer "what agents touched sensitive data last week?" today.',
    },
  },

  'before-after': {
    theme: 'Before / After Scenarios',
    goalDescription:
      'Paint a vivid contrast between the current painful state and the desired future state. This pillar creates emotional resonance by making the cost of inaction tangible and the value of the solution concrete. Good before/after framing is specific, story-driven, and grounded in the customer\'s own words.',
    promptInstruction:
      'Generate questions that draw out the current pain in operational, financial, or reputational terms, then help the customer articulate the future state. Use "walk me through what happens today when..." framing to surface process gaps.',
    useCaseGuidance: {
      'workforce-ai-agents':
        'Before: IT gets a ticket saying an employee built an agent that has been connecting to the CRM for 6 months — no one knows what it accessed. After: every agent is registered at creation, scoped at provisioning, and automatically deprovisioned when the employee leaves. Ask: "What would you do right now if your CISO asked for a list of all AI agents with access to Salesforce?"',
      'customer-facing-ai-agents':
        'Before: the AI assistant uses the customer\'s OAuth token directly — when the customer revokes the app, the agent loses access, but between now and then it had full account privileges. After: the agent has a delegated, scoped token with per-action authorization and a customer-visible consent ledger. Ask: "If a customer called today saying your AI agent made a transaction they didn\'t authorize, what would your response process look like?"',
      '3rd-party-ai-governance':
        'Before: a SaaS vendor deploys an AI feature that now has read access to your data lake — you found out when reviewing the vendor\'s changelog. After: every vendor agent request goes through a scoped token issuance workflow with policy enforcement and behavioral monitoring. Ask: "Have you discovered any vendor AI agents accessing your systems that you didn\'t explicitly authorize?"',
      'ai-agent-ciam':
        'Before: the infrastructure team has 400 service accounts, 60% with no documented owner, and the security team\'s answer to "what does this credential have access to?" is a manual audit that takes two weeks. After: every agent identity has an owner, a scope, a TTL, and an automated deprovision trigger. Ask: "If you were asked to produce a complete inventory of non-human identities today, how long would that take?"',
    },
  },

  'decision-process': {
    theme: 'Decision Process',
    goalDescription:
      'Understand the buying motion: who the real decision-makers and influencers are, what the evaluation criteria will be, what the competitive landscape looks like, what could block or delay the deal, and what the timeline is anchored to. This pillar prevents surprises late in the sales cycle.',
    promptInstruction:
      'Generate questions that map the org chart of the decision, surface the internal champions and skeptics, identify technical vs. business evaluation criteria, and uncover any existing commitments (vendor contracts, internal build efforts, or competing priorities) that could derail the deal.',
    useCaseGuidance: {
      'workforce-ai-agents':
        'Key stakeholders: CISO (risk reduction), CIO (IT governance), Head of AI (enabling adoption). Key blocker: existing MDM/CASB/DLP vendors claiming they already solve this. Key question: "Is there a security or governance initiative this would roll up into, or would this stand alone?" Surface the AI governance steering committee if one exists.',
      'customer-facing-ai-agents':
        'Key stakeholders: Product/Engineering (capability), CISO (risk sign-off), Legal/Privacy (consent compliance). Key blocker: "we\'ll build it ourselves on our Auth0 tenant." Key question: "Who owns the decision on your identity stack for product features — is that platform engineering, product, or both?" Understand whether they have an existing Auth0 relationship.',
      '3rd-party-ai-governance':
        'Key stakeholders: CISO, VP of Vendor Risk, Procurement, Legal. Key blocker: "our CASB or API gateway already handles this." Key question: "Who is responsible for AI-specific vendor risk today — is that in your existing VRM program or is it a gap?" Surface any regulatory deadline (AI Act, sector-specific AI rules) anchoring urgency.',
      'ai-agent-ciam':
        'Key stakeholders: Platform/Infra Engineering lead, IAM team, CISO, DevOps/Platform. Key blocker: secrets managers (Vault, AWS Secrets Manager) being positioned as the complete solution. Key question: "Is there a zero-trust or identity-first infrastructure initiative this would fall under?" Understand who owns the NHI problem — it often falls between security and platform teams with neither fully owning it.',
    },
  },
};

// ---------------------------------------------------------------------------
// DEAL_STAGE_CONTEXT
// Controls the depth, focus, and tone of question generation per stage.
// ---------------------------------------------------------------------------

export const DEAL_STAGE_CONTEXT: Record<
  DealStage,
  {
    depth: 'breadth-first' | 'depth-first' | 'validation-focused';
    focus: string;
    tone: string;
    questionCount: { min: number; max: number };
    avoidPatterns: string[];
    priorityPillars: CoTMPillarId[];
    instructions: string;
  }
> = {
  'initial-discovery': {
    depth: 'breadth-first',
    focus:
      'Establish whether there is a real problem and real urgency. Surface pain across all CoTM pillars at a high level. Do not go deep on technical architecture — you are earning the right to a second conversation.',
    tone:
      'Conversational, curious, and business-oriented. Avoid jargon. This is a C-level or VP-level conversation. Questions should sound like a peer asking about the business, not a salesperson running a script.',
    questionCount: { min: 2, max: 3 },
    avoidPatterns: [
      'API',
      'OAuth',
      'token',
      'SCIM',
      'CIBA',
      'federation',
      'architecture',
      'integration',
    ],
    priorityPillars: ['pbo', 'before-after', 'decision-process'],
    instructions:
      'Generate questions that open up the conversation and surface whether the customer has articulated the problem. Prioritize PBO, Before/After, and Decision Process. Keep language at the business level — "AI agents acting on employee behalf" not "OAuth client credentials flow". Aim for 2–3 questions per pillar maximum.',
  },

  'technical-discovery': {
    depth: 'depth-first',
    focus:
      'Map the technical and operational reality in detail. Understand current architecture, existing tools, gaps, and what "good" looks like. This is where you build the business case and capability map.',
    tone:
      'Technical and collaborative. You are in a working session with architects, engineers, and identity leads. Use precise terminology. Show expertise. Questions should feel like those of a knowledgeable peer helping them think through the problem.',
    questionCount: { min: 3, max: 5 },
    avoidPatterns: [],
    priorityPillars: ['required-capabilities', 'success-metrics', 'before-after'],
    instructions:
      'Generate technically precise questions that probe the current state deeply. Use O4AA-specific terminology where appropriate (CIBA, NHI, M2M, delegated authorization, token scoping). Cover Required Capabilities and Success Metrics thoroughly. Before/After questions should be operational and architecture-level, not conceptual. Aim for 3–5 questions per pillar.',
  },

  'validation-poc': {
    depth: 'validation-focused',
    focus:
      'Confirm the value hypothesis from discovery and de-risk the deal. Identify what criteria the POC must satisfy, who is evaluating, and what success looks like in measurable terms. Uncover any last objections or competing alternatives.',
    tone:
      'Direct and criteria-focused. You are aligning on exit criteria and decision-making. Questions should be crisp and confirmatory — less exploration, more validation. Some skepticism is appropriate ("what would make you choose not to move forward?").',
    questionCount: { min: 2, max: 4 },
    avoidPatterns: [],
    priorityPillars: ['success-metrics', 'decision-process', 'required-capabilities'],
    instructions:
      'Generate questions that confirm pain is real, validate the POC scope, surface exit criteria, and smoke out remaining blockers. Prioritize Success Metrics and Decision Process. Include at least one "devil\'s advocate" question per pillar — probe for what would cause them to walk away or choose an alternative. Aim for 2–4 questions per pillar.',
  },
};
