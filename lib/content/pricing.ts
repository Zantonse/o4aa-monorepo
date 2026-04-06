import type { SectionContent, ContentCardData } from '../types';

const slug = 'pricing';
const title = 'Pricing & Packaging';
const description = 'What SEs need to know about O4AA commercial packaging — what is included, what requires add-ons, and how to position pricing in deals.';
const tags = ['reference', 'pricing', 'packaging', 'SKU', 'commercial'];
const icon = '💰';
const hasDiagram = false;
const diagramPrompt = '';

const cards: ContentCardData[] = [
  {
    heading: 'O4AA Commercial Landscape',
    paragraphs: [
      '!! Important: O4AA is not a single named SKU. It is a set of capabilities distributed across Okta Workforce Identity Cloud (WIC) and Auth0 (OCI). SEs must understand which capabilities come from which product surface to avoid promising features that require a different license.',
    ],
    labeledCallouts: [
      {
        label: 'Included in WIC (OIE)',
        labelColor: 'blue',
        text: 'OBO Token Exchange (RFC 8693), Cross App Access (XAA — Early Access, no additional cost during EA), System Log audit events, Universal Directory for NHI registration.',
      },
      {
        label: 'WIC Add-On',
        labelColor: 'amber',
        text: 'OIG (Okta Identity Governance) for access reviews and certification campaigns — separate WIC add-on. CIBA — requires confirmation on tier availability.',
      },
      {
        label: 'Auth0 / OCI (separate product surface)',
        labelColor: 'amber',
        text: 'Auth0 FGA (Fine Grained Authorization) — separate Auth0 managed service at dashboard.fga.dev, requires Auth0 account. M2M token issuance pricing scales with token volume. For WIC-only accounts that need FGA: discuss co-term or cross-sell path with your account team.',
      },
    ],
  },
  {
    heading: 'Agent Gateway Engagement Model',
    paragraphs: [
      'The Agent Gateway (GA April 30, 2026) is currently delivered as a ProServ engagement, not a self-service product. Position this in deals as a professional services engagement alongside the platform license.',
    ],
    labeledCallouts: [
      {
        label: 'What ProServ Delivers',
        labelColor: 'blue',
        text: 'Architecture workshop, tenant configuration, Docker bundle deployment, admin training, and handoff documentation.',
      },
      {
        label: '!! Do Not Misrepresent',
        labelColor: 'rose',
        text: 'Do not position the Agent Gateway as a self-service SaaS product — it is ProServ-delivered in its current form. Misrepresenting the delivery model creates deal friction and customer disappointment. When a customer asks "can we just turn it on?", the honest answer is "it\'s a guided deployment with our professional services team."',
      },
      {
        label: 'Infrastructure Requirement',
        labelColor: 'amber',
        text: '?? Is the customer prepared for a ProServ engagement? Do they have the infrastructure (AWS EC2, Docker) and engineering resources to support the deployment? What is their timeline?',
      },
    ],
  },
  {
    heading: 'Competitive Pricing Context',
    paragraphs: [
      '>> Frame pricing conversations around total cost of ownership, not per-unit pricing. The comparison is not "Okta vs. Entra per-identity cost" but "integrated agent identity platform vs. assembling pieces from multiple vendors."',
    ],
    tabs: [
      {
        label: 'Entra Pricing',
        content: [
          'Microsoft Entra Workload Identity Premium: $3/workload identity/month for Conditional Access and risk detection on service principals.',
          'This is the most directly comparable competitive price point.',
          'Coverage gap: Entra Workload Identity Premium covers only workload Conditional Access — it does not include OBO token exchange, FGA, agent-specific audit, or MCP support.',
        ],
      },
      {
        label: 'Okta Value Framing',
        content: [
          'The TCO of building custom token exchange + FGA + Privileged Credential Management + audit + MCP auth across multiple tools always exceeds the cost of an integrated platform.',
          'TT "The question isn\'t what does Okta cost per agent — it\'s what does it cost your engineering team to build and maintain agent auth across 10 backend systems, keep it secure, and pass your next audit. That\'s the real comparison."',
        ],
      },
    ],
  },
  {
    heading: 'Key Packaging Questions for Deals',
    paragraphs: [
      'Ask these early — packaging answers shape whether the deal requires Auth0 cross-sell, ProServ scoping, or a governance add-on conversation.',
    ],
    accordion: [
      {
        title: '?? WIC-only, Auth0-only, or both?',
        content: [
          'This is the foundational packaging question. It determines which O4AA capabilities the customer can access natively vs. what requires a cross-sell motion.',
          'WIC-only customers get: OBO Token Exchange, XAA, Universal Directory, System Log audit. They do not get Auth0 FGA natively.',
          'Auth0-only customers get: FGA, M2M token issuance, Universal Login for agents. They may not have WIC OBO or XAA.',
          'Both: full O4AA capability stack available — focus the conversation on which capabilities apply to their agentic use case.',
        ],
      },
      {
        title: '?? Does the customer need FGA?',
        content: [
          'If yes and they are WIC-only, engage your Auth0 sales counterpart early — do not discover this gap during POC.',
          'FGA is required for any use case involving resource-level authorization (e.g., "can this agent access this specific document on behalf of this user?").',
          'The co-term or cross-sell path needs to be in place before the technical team starts building against the API.',
        ],
      },
      {
        title: '?? What is the customer\'s AI agent scale?',
        content: [
          'Number of agents, number of backend integrations, expected tool call volume — this sizes the engagement and identifies whether M2M token volume pricing (Auth0) is a factor.',
          'High tool call volume on Auth0 can make M2M token pricing a line item worth scoping early. Surface this before the customer is surprised by overage.',
          'Agent Gateway scoping also depends on backend count — more MCP servers = more ProServ complexity.',
        ],
      },
    ],
  },
];

export const content: SectionContent = { slug, title, description, tags, icon, hasDiagram, diagramPrompt, cards };
