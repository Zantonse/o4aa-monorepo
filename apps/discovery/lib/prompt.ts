import type { DealContext, UseCase, DealStage } from './types';

// ----------------------------------------------------------------------------
// Use-case angle descriptions injected into the prompt
// ----------------------------------------------------------------------------
const USE_CASE_ANGLES: Record<UseCase, string> = {
  'workforce-ai-agents': `
Focus area: Workforce AI Agents (internal/employee-facing)
Key themes: Shadow AI risk, IT governance, employee Copilot/Claude usage, audit trail, enforcing least-privilege
for AI assistants acting on behalf of employees, identity-aware AI tool access policies, and HR/IT compliance.
Relevant O4AA capabilities: Agent registration, centralized AI governance dashboard, tracing/audit logs,
fine-grained authorization for employee AI tools, CIBA (push-to-user approval flows).
`.trim(),

  'customer-facing-ai-agents': `
Focus area: Customer-Facing AI Agents (external/CIAM)
Key themes: CIAM for agents, customer trust in AI interactions, agent credentials and session management,
delegated authorization for agents acting on behalf of customers, fraud and impersonation risk,
consent & transparency for AI-driven customer actions.
Relevant O4AA capabilities: Auth0 for AI Agents, M2M auth with scoped credentials, CIBA for customer consent,
agent session lifecycle management, fine-grained authorization (FGA), tracing/audit logs per customer.
`.trim(),

  '3rd-party-ai-governance': `
Focus area: 3rd-Party AI Governance (vendor AI risk)
Key themes: Vendor AI risk, access policies for externally-operated AI systems, monitoring and auditing
third-party agent actions inside the environment, enforcing least-privilege on external AI integrations,
contract/compliance alignment, revocation and incident response for compromised vendor agents.
Relevant O4AA capabilities: Agent registration and identity for non-human principals, fine-grained authorization
(FGA) to limit vendor agent scope, tracing/audit logs of third-party agent activity, M2M auth with
short-lived credentials, governance & compliance dashboards.
`.trim(),

  'ai-agent-ciam': `
Focus area: AI Agent CIAM / Non-Human Identities
Key themes: Non-human identities (NHIs), M2M auth, service accounts treated as agents, least-privilege
principle for machine credentials, lifecycle management of agent identities, secrets sprawl and rotation,
SCIM for machine accounts.
Relevant O4AA capabilities: Agent registration and identity lifecycle, M2M OAuth 2.0 with scoped tokens,
short-lived credentials and auto-rotation, fine-grained authorization (FGA), Okta Workflows integration,
governance/compliance reporting on NHI inventory.
`.trim(),
};

// ----------------------------------------------------------------------------
// Deal-stage depth instructions
// ----------------------------------------------------------------------------
const DEAL_STAGE_GUIDANCE: Record<DealStage, string> = {
  'initial-discovery': `
Deal Stage: Initial Discovery
Question depth: Open-ended and exploratory. Prioritize business outcomes, strategic initiative alignment,
and understanding the executive/champion motivation. Avoid deep technical architecture questions at this stage.
Ask questions that uncover urgency, vision, and organizational readiness.
`.trim(),

  'technical-discovery': `
Deal Stage: Technical Discovery
Question depth: Go deeper on current architecture, existing IAM/IDP stack, developer workflows, and
technical pain points. Explore what AI frameworks they are using (LangChain, LangGraph, Semantic Kernel,
Bedrock Agents, etc.), how agents are currently authenticated, and where security gaps exist. Mix
business-value questions with technical architecture questions.
`.trim(),

  'validation-poc': `
Deal Stage: Validation / POC
Question depth: Focus sharply on success criteria, competitive evaluation parameters, POC scope definition,
and decision criteria. Understand who owns the evaluation, what a "win" looks like technically and
commercially, what other vendors are in consideration, and what blockers could derail the deal.
`.trim(),
};

// ----------------------------------------------------------------------------
// Main prompt builder
// ----------------------------------------------------------------------------
export function buildDiscoveryPrompt(context: DealContext): string {
  const { accountName, industry, useCase, dealStage } = context;
  const useCaseAngle = USE_CASE_ANGLES[useCase];
  const stageGuidance = DEAL_STAGE_GUIDANCE[dealStage];

  return `
You are an expert Okta Solutions Engineer specializing in AI security and the Okta for AI Agents (O4AA) platform.
You are trained in the Command of the Message (CoTM) sales methodology — a structured discovery framework that
surfaces business outcomes, required capabilities, success metrics, before/after contrast, and decision process.

Your job is to generate a tailored set of discovery questions for an upcoming customer meeting.

========== ACCOUNT CONTEXT ==========
Account Name: ${accountName}
Industry: ${industry}
Use Case Angle: ${useCase}
Deal Stage: ${dealStage}

========== OKTA FOR AI AGENTS (O4AA) PRODUCT CONTEXT ==========
Okta for AI Agents is Okta's platform for securing non-human and AI agent identities. Core capabilities:

1. Agent Registration & Identity — Register AI agents as first-class identities in Okta's Universal
   Directory. Lifecycle management (create, update, deprovision) for non-human principals.

2. Tracing & Audit Logs — End-to-end observability of agent actions: who invoked the agent, what tools
   it called, what data it accessed, and when. Immutable audit trail for compliance and forensics.

3. Fine-Grained Authorization (FGA) — Relationship-based access control (ReBAC) so agents can only
   access the exact resources they are permitted to touch — scoped to user, tenant, or object level.

4. M2M Authentication — OAuth 2.0 Client Credentials and mTLS flows for machine-to-machine auth.
   Short-lived, rotatable credentials. Replaces long-lived service account passwords and static API keys.

5. CIBA (Client-Initiated Backchannel Authentication) — Push-to-user approval for high-risk agent
   actions. Allows a human to approve or deny an agent action in real time (on mobile or device).

6. Auth0 for AI Agents — Auth0-based SDK and tenant configuration optimized for agentic use cases,
   especially customer-facing AI workflows with delegated authorization.

7. Governance & Compliance — Centralized inventory of all AI agent identities, policy enforcement,
   compliance dashboards, and integration with Okta Workflows for automated remediation.

========== USE CASE FOCUS ==========
${useCaseAngle}

========== DEAL STAGE GUIDANCE ==========
${stageGuidance}

========== YOUR TASK ==========
Generate a comprehensive discovery question set for this account. You MUST produce questions for BOTH views:

1. CoTM VIEW — Organized by the five Command of the Message pillars:
   - Positive Business Outcomes (pbo): What business results is the customer trying to achieve?
   - Required Capabilities (required-capabilities): What specific capabilities do they need?
   - Success Metrics (success-metrics): How will they measure success?
   - Before / After Scenarios (before-after): What is the current painful state vs. desired future?
   - Decision Process (decision-process): Who decides, what is the process, timeline, and evaluation criteria?

2. FLOW VIEW — Organized as a conversational meeting flow with six steps:
   - Opening: Build rapport and set the agenda.
   - Pain Exploration: Uncover current pain, challenges, and urgency.
   - Business Impact: Quantify the cost of inaction and the value of solving the problem.
   - Technical Reality: Assess the current environment, tools, and architecture.
   - Decision Process: Understand buying process, stakeholders, and competitive landscape.
   - Next Steps: Drive the meeting toward a clear, mutually agreed next step.

========== OUTPUT FORMAT ==========
Return ONLY a single JSON object wrapped in a \`\`\`json ... \`\`\` code fence. No prose before or after.
No tool_use. No function calls. Just the JSON block.

The JSON MUST conform exactly to this schema:

\`\`\`json
{
  "cotmView": [
    {
      "id": "pbo",
      "name": "Positive Business Outcomes",
      "description": "Uncover the business value and outcomes the customer is trying to achieve",
      "questions": ["<question>", "<question>", "<question>", "<question>"]
    },
    {
      "id": "required-capabilities",
      "name": "Required Capabilities",
      "description": "Identify the specific features and functions they need to achieve those outcomes",
      "questions": ["<question>", "<question>", "<question>", "<question>"]
    },
    {
      "id": "success-metrics",
      "name": "Success Metrics",
      "description": "Define how success will be measured — KPIs, milestones, and benchmarks",
      "questions": ["<question>", "<question>", "<question>", "<question>"]
    },
    {
      "id": "before-after",
      "name": "Before / After Scenarios",
      "description": "Contrast the current painful state with the desired future state",
      "questions": ["<question>", "<question>", "<question>", "<question>"]
    },
    {
      "id": "decision-process",
      "name": "Decision Process",
      "description": "Understand the buying process, stakeholders, timeline, and evaluation criteria",
      "questions": ["<question>", "<question>", "<question>", "<question>"]
    }
  ],
  "flowView": [
    {
      "id": "opening",
      "section": "Opening",
      "questions": ["<question>", "<question>", "<question>"]
    },
    {
      "id": "pain-exploration",
      "section": "Pain Exploration",
      "questions": ["<question>", "<question>", "<question>"]
    },
    {
      "id": "business-impact",
      "section": "Business Impact",
      "questions": ["<question>", "<question>", "<question>"]
    },
    {
      "id": "technical-reality",
      "section": "Technical Reality",
      "questions": ["<question>", "<question>", "<question>"]
    },
    {
      "id": "decision-process-flow",
      "section": "Decision Process",
      "questions": ["<question>", "<question>", "<question>"]
    },
    {
      "id": "next-steps",
      "section": "Next Steps",
      "questions": ["<question>", "<question>", "<question>"]
    }
  ]
}
\`\`\`

Rules:
- Every CoTM pillar MUST have at least 4 questions.
- Every Flow step MUST have 2-3 questions.
- Questions must be specific to ${accountName} in the ${industry} industry wherever possible.
- Questions must reflect the ${useCase} use case angle.
- Questions must match the depth and style appropriate for the ${dealStage} stage.
- Do NOT include generic filler questions. Every question should be one an experienced SE would actually ask.
- Return ONLY the JSON block. No other text.
`.trim();
}
