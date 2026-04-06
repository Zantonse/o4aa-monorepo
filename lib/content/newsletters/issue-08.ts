import type { NewsletterIssue } from '../../newsletter-types';

export const issue08: NewsletterIssue = {
  slug: 'newsletter-08',
  issueNumber: 8,
  title: 'Putting It All Together',
  subtitle: 'Your first O4AA deal end-to-end — from account research to discovery to demo to POC to close. The playbook that ties the entire series into one execution framework.',
  date: 'April 2, 2026',
  readTimeMinutes: 11,
  heroImageAlt: 'SE and customer shaking hands at the conclusion of a successful engagement',
  tags: ['playbook', 'deal-execution', 'poc', 'demo', 'end-to-end'],
  tldr: 'This final issue is the execution playbook. Five phases: Pre-Call Research → Discovery → Demo → POC → Close. Each phase maps to specific issues from the series. The goal: turn the knowledge from Issues #1-7 into a repeatable deal motion with concrete actions at every step.',

  sections: [
    {
      heading: 'The Deal Arc',
      paragraphs: [
        'You now have the knowledge. Issues #1-4 gave you the foundations — what agents are, how identities work, the MCP security gap, and the product map. Issues #5-7 gave you the execution tools — auth flows, discovery methodology, and competitive positioning.',
        'This issue ties it all together into a single deal execution framework. Five phases, each with specific actions, deliverables, and links back to the relevant Field Guide issue.',
        '!! The framework is linear but the reality is not. Deals loop back, skip phases, and stall. The value of the framework is knowing what "good" looks like at each phase so you can diagnose where a deal is stuck and what it needs to move forward.',
      ],
      timeline: [
        { label: 'Phase 1', title: 'Pre-Call Research', description: 'Before any customer contact. Build the hypothesis about their agent landscape, identify likely pain points, and prepare targeted questions.' },
        { label: 'Phase 2', title: 'Discovery', description: 'The first 1-2 calls. Surface pain, quantify impact, create urgency. Qualify using the 3-of-5 framework from Issue #6.' },
        { label: 'Phase 3', title: 'Technical Demo', description: 'Show, don\'t tell. The four-flow demo script from Issue #5. Tailored to their specific use case and competitive context.' },
        { label: 'Phase 4', title: 'POC / Proof of Value', description: '30-day focused evaluation. Scoped to one use case, one agent type, measurable success criteria agreed upfront.' },
        { label: 'Phase 5', title: 'Close', description: 'Build the business case from POC results. Map to the customer\'s budget cycle and procurement process. Reference proof points from Issue #4.' },
      ],
    },
    {
      heading: 'Phase 1: Pre-Call Research',
      paragraphs: [
        'The 30 minutes before a call determine whether you\'re having a conversation or reading slides. Here\'s what to prepare:',
      ],
      accordion: [
        {
          title: 'Research the AI Landscape',
          content: [
            'Search for the company + "AI" + "agents" in news, press releases, and job postings. Look for: AI platform mentions (Copilot, Bedrock, custom builds), AI governance roles being hired, recent AI-related incidents or announcements.',
            '!! If they have public job postings for "AI Security" or "AI Platform Engineer" roles, they\'re building the team. That\'s a strong signal they need the tooling too.',
          ],
        },
        {
          title: 'Map the Identity Stack',
          content: [
            'Check: Are they an existing Okta customer? What tier? Do they use OIG, ITP, ISPM? If they\'re Entra-primary, prepare the cross-platform positioning from Issue #7.',
            '!! Existing Okta customers are the fastest path. O4AA extends their current investment — no new vendor evaluation, no new procurement process. Agent identity is an expansion, not a displacement.',
          ],
        },
        {
          title: 'Prepare Three Hypotheses',
          content: [
            'Based on their industry and size, prepare three hypotheses about their likely agent pain: (1) shadow AI inventory gap, (2) credential management problem, (3) compliance/audit pressure. You\'ll validate or invalidate these on the call.',
            'TT "I did some research before our call and I have a hypothesis about where AI agent governance might be creating risk for you. Let me share it and you can tell me if I\'m close or way off."',
          ],
        },
      ],
      labeledCallouts: [
        { label: 'ISSUE REFERENCE', labelColor: 'blue', text: 'Issue #1 (why agents break auth), Issue #3 (MCP stats for opening hooks), Issue #7 (competitive prep if Entra/CyberArk/SailPoint is in play)' },
      ],
    },
    {
      heading: 'Phase 2: Discovery',
      paragraphs: [
        'The discovery methodology from Issue #6 in a condensed action plan:',
      ],
      tabs: [
        {
          label: 'First 5 Minutes',
          content: [
            'Open with the inventory question: "How many AI agents are running in your environment — and how confident are you in that number?"',
            'Listen for Signal 1 (shadow AI confession), Signal 2 (compliance clock), or Signal 3 (5x growth). If you hear any of them, you\'re in qualified territory.',
            '!! Don\'t pitch anything in the first 5 minutes. Your only job is to get the customer talking about their agent landscape in their own words.',
          ],
        },
        {
          label: 'Minutes 5-20',
          content: [
            'Follow the Pain → Impact → Urgency framework. Go deep on whatever signal surfaced. Ask the domain-specific questions from the Discover/Protect/Govern sections in Issue #6.',
            'TT "You mentioned agents are using shared service accounts. Walk me through what happens when one of those agents needs to be revoked — how long does that take today?"',
          ],
        },
        {
          label: 'Last 10 Minutes',
          content: [
            'Secure the next step. Options: (1) ISPM scan to quantify the problem, (2) technical demo with the security architect, (3) architecture review of their agent deployment, (4) POC scoping with the platform team.',
            '!! A concrete next step with a date is the only acceptable outcome. "We\'ll circle back" is not a next step.',
            'TT "Based on what you\'ve shared, there are two paths that make sense. One: we run an ISPM scan to quantify the agent inventory — takes days, gives you the \'8,000 robots\' dashboard for leadership. Two: I show your security architect the token exchange flow so they can evaluate the technical approach. Which resonates more?"',
          ],
        },
      ],
      labeledCallouts: [
        { label: 'ISSUE REFERENCE', labelColor: 'blue', text: 'Issue #6 (full discovery methodology, three signals, qualification framework, question bank)' },
      ],
    },
    {
      heading: 'Phase 3: Technical Demo',
      paragraphs: [
        'The demo from Issue #5, tailored to their specific situation:',
      ],
      conceptGrid: [
        { label: 'WORKFORCE AGENTS', text: 'Lead with shadow AI discovery (ISPM), then token exchange for Copilot/Claude delegation, then lifecycle management showing offboarding revocation.' },
        { label: 'CUSTOMER-FACING', text: 'Lead with Auth0 FGA for RAG authorization, then CIBA for consent flows, then Token Vault for third-party API credential management.' },
        { label: 'MCP SECURITY', text: 'Lead with the 53% static key stat, show OAuth 2.1 for MCP auth, per-tool authorization, then Universal Logout as the kill switch.' },
      ],
      image: 'newsletter-08-poc.png',
      imageAlt: 'Overhead view of a POC review meeting with success criteria, laptop dashboard, and team discussion',
      imageCaption: 'Phase 4: POC results review — scoped to one use case with measurable success criteria',
      labeledCallouts: [
        { label: 'DEMO GOLDEN RULE', labelColor: 'emerald', text: 'Every demo moment must connect to a pain point the customer articulated during discovery. "You told me agents are using shared credentials with no audit trail — watch what happens when I show you the token structure."' },
        { label: 'ISSUE REFERENCE', labelColor: 'blue', text: 'Issue #5 (four-flow demo script), Issue #4 (product map for which capability to demo), Issue #2 (five-layer model for architecture conversations)' },
      ],
    },
    {
      heading: 'Phase 4: POC Design',
      paragraphs: [
        'The POC is where deals are won or lost. A well-scoped POC proves value in 30 days. A poorly scoped POC stalls indefinitely.',
      ],
      accordion: [
        {
          title: 'Scope: One Use Case, One Agent Type',
          content: [
            'Pick the customer\'s highest-value agent use case — the one their CISO loses sleep over. Scope the POC to exactly that. Don\'t try to prove the entire platform in one POC.',
            '!! Common POC scopes: (1) ISPM scan + agent inventory for 1 platform, (2) XAA delegation for 1 agent type + 1 downstream API, (3) CIBA approval flow for 1 high-stakes agent action.',
          ],
        },
        {
          title: 'Success Criteria: Agreed Before Day 1',
          content: [
            'Define measurable success criteria with the customer before starting. Examples: "Discover 100% of agents on Copilot Studio," "Demonstrate delegated token with user attribution," "Show sub-second agent revocation."',
            '!! If you can\'t agree on success criteria, the POC will drift. Push back: "What would need to be true for your team to recommend moving forward?"',
          ],
        },
        {
          title: 'Timeline: 30 Days, Three Checkpoints',
          content: [
            'Week 1: Environment setup and agent registration. Week 2-3: Core flow implementation and testing. Week 4: Results review with stakeholders. Three checkpoints prevent the POC from going dark.',
            'TT "Let\'s set three checkpoints: Week 1 for environment readiness, Week 2 for first working flow, Week 4 for stakeholder results review. This keeps momentum and surfaces blockers early."',
          ],
        },
      ],
    },
    {
      heading: 'Phase 5: Building the Business Case',
      paragraphs: [
        'The POC generates the data. Now you turn it into a business case that gets budget approved.',
      ],
      labeledCallouts: [
        { label: 'HARD SAVINGS', labelColor: 'emerald', text: 'License consolidation (Experian saved $1M/year deprecating 6 legacy IdPs), helpdesk ticket reduction (Priceline: 95% reduction), headcount avoidance (Colgate-Palmolive: 4-person IAM team manages 40K users).' },
        { label: 'RISK REDUCTION', labelColor: 'blue', text: 'Avg credential breach: $4.81M, 292 days to detect (IBM/Ponemon 2024). Frame as: "Every day without agent governance is another day of exposure at this cost level."' },
        { label: 'COMPLIANCE VALUE', labelColor: 'amber', text: 'Forrester TEI: 211% ROI, $1.8M NPV, <6 month payback for OIG (June 2025). Workday: 143K hours reclaimed, $1M saved on audit prep.' },
        { label: 'SPEED TO VALUE', labelColor: 'emerald', text: 'XAA is EA now — start today. Full GA April 30, 2026. Everything on the roadmap extends from XAA. Start now = inherit every future capability. Wait = retrofit under pressure.' },
      ],
    },
    {
      heading: 'The Series Summary',
      paragraphs: [
        'Eight issues. Here\'s the complete knowledge map:',
      ],
      timeline: [
        { label: 'Issue #1', title: 'The Identity Crisis', description: 'Why agents break traditional auth. The delegation problem. The 100x velocity gap. Your opening frame for every conversation.' },
        { label: 'Issue #2', title: 'Agent Identity Anatomy', description: 'Five layers: Registration, Ownership, Credentials, Scoping, Lifecycle. Three credential models. Universal Directory as the foundation.' },
        { label: 'Issue #3', title: 'MCP Protocol', description: 'MCP insecure by default. Five attack vectors. Five Okta controls. The stats that stop conversations (53%, 8.5%, CVSS 9.3).' },
        { label: 'Issue #4', title: 'Product Map', description: 'Discover/Onboard/Protect/Govern framework. XAA as the foundation. SKU-to-pain mapping. Roadmap snapshot.' },
        { label: 'Issue #5', title: 'Auth Flows', description: 'Token exchange, ID-JAG, scope attenuation, CIBA — technical depth. The 15-minute four-flow demo script.' },
        { label: 'Issue #6', title: 'Discovery', description: 'The opening question. Three closing signals. Pain → Impact → Urgency. 3-of-5 qualification framework.' },
        { label: 'Issue #7', title: 'Competitive', description: 'Five competitors, honest strengths, sharp counters. Respect → Gap → Solution approach. Trap-setting questions.' },
        { label: 'Issue #8', title: 'Putting It Together', description: 'Five-phase deal execution: Research → Discovery → Demo → POC → Close. This issue.' },
      ],
      labeledCallouts: [
        { label: 'WHAT\'S NEXT', labelColor: 'emerald', text: 'The Field Guide doesn\'t end here. As O4AA ships GA on April 30, new issues will cover GA features, early customer wins, demo environment updates, and the evolving competitive landscape. Stay tuned.' },
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'The 30 minutes before a call determine whether you\'re having a conversation or reading slides.',
    },
    {
      text: 'A well-scoped POC proves value in 30 days. A poorly scoped POC stalls indefinitely. Scope to one use case, one agent type, measurable success criteria.',
    },
    {
      text: 'Every demo moment must connect to a pain point the customer articulated during discovery. Features without pain context is a demo that goes nowhere.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Five Phases',
      text: 'Pre-Call Research → Discovery → Demo → POC → Close. Know what "good" looks like at each phase so you can diagnose where a deal is stuck.',
    },
    {
      label: 'POC Scope',
      text: 'One use case, one agent type, measurable success criteria agreed before Day 1. Three checkpoints (Week 1, 2, 4) to maintain momentum.',
    },
    {
      label: 'Business Case',
      text: 'Forrester TEI: 211% ROI, <6mo payback. Credential breach: $4.81M avg. Workday: 143K hours reclaimed. Customer data from POC beats every benchmark.',
    },
    {
      label: 'The Series',
      text: 'Eight issues covering foundations → products → flows → discovery → competitive → execution. Reference the specific issue when you need depth on any topic.',
    },
  ],

  nextIssueTeaser: {
    title: 'Coming After GA: New Field Guide Issues',
    description: 'As O4AA ships GA on April 30, the Field Guide continues with real customer deployment stories, demo environment walkthroughs, competitive updates, and advanced architecture patterns.',
  },
};
