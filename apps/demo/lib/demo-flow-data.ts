export interface TalkTrack {
  context: string;
  script: string;
}

export interface DemoModule {
  id: string;
  act: string;
  title: string;
  narrativeBeat: string;
  demoAsset: string;
  componentId?: string;
  variants: DemoVariant[];
  transition: string;
  color: {
    border: string;
    heading: string;
    badge: string;
    badgeText: string;
    accent: string;
  };
}

export interface DemoVariant {
  label: string;
  audience: string;
  duration: string;
  beats: DemoBeat[];
}

export interface DemoBeat {
  title: string;
  duration: string;
  action: string;
  talkTrack: string;
  isHighlight?: boolean;
}

export interface AudienceProfile {
  id: string;
  label: string;
  emoji: string;
  discover: 'zoom' | 'medium' | 'skim';
  onboard: 'skim';
  protect: 'zoom' | 'medium';
  protectVariant: 'wic' | 'auth0' | 'mixed';
  govern: 'zoom' | 'medium' | 'skim';
  discoverMin: number;
  protectMin: number;
  governMin: number;
}

export const AUDIENCES: AudienceProfile[] = [
  {
    id: 'ciso',
    label: 'CISO / Security',
    emoji: '🛡️',
    discover: 'zoom',
    onboard: 'skim',
    protect: 'medium',
    protectVariant: 'wic',
    govern: 'zoom',
    discoverMin: 7,
    protectMin: 5,
    governMin: 6,
  },
  {
    id: 'architect',
    label: 'Platform Architect',
    emoji: '🏗️',
    discover: 'skim',
    onboard: 'skim',
    protect: 'zoom',
    protectVariant: 'wic',
    govern: 'medium',
    discoverMin: 1,
    protectMin: 12,
    governMin: 5,
  },
  {
    id: 'developer',
    label: 'Developer / CIAM',
    emoji: '💻',
    discover: 'skim',
    onboard: 'skim',
    protect: 'zoom',
    protectVariant: 'auth0',
    govern: 'medium',
    discoverMin: 1,
    protectMin: 12,
    governMin: 5,
  },
  {
    id: 'mixed',
    label: 'Mixed Room',
    emoji: '👥',
    discover: 'medium',
    onboard: 'skim',
    protect: 'medium',
    protectVariant: 'mixed',
    govern: 'medium',
    discoverMin: 4,
    protectMin: 7,
    governMin: 7,
  },
];

export const OPENING = {
  stats: [
    { value: '91%', label: 'of enterprises run AI agents' },
    { value: '80%', label: 'had an agent do something unintended' },
    { value: '44%', label: 'have zero governance' },
  ],
  script:
    '"91% of enterprises are already running AI agents. 80% have had an agent do something unintended. And 44% have zero governance over what those agents can access. Today I\'m going to show you what Okta does about that — using a scenario that probably looks a lot like your environment."',
  source: 'Okta survey, March 2026 (okta.com/ai)',
};

export const DEMO_MODULES: DemoModule[] = [
  {
    id: 'discover',
    act: 'Act 1',
    title: 'DISCOVER — "You can\'t secure what you can\'t see"',
    narrativeBeat: 'Create the uncomfortable realization that agents are already running without governance.',
    demoAsset: 'ISPM Detect and Remediate AI Agent Risk',
    componentId: '9e558fee-2a78-45c1-976e-f0a31ad04536',
    transition: '"So that\'s the problem. Agents are already running, they have broad access, and nobody\'s watching. The first thing Okta does is bring them under management."',
    color: {
      border: 'border-violet-200',
      heading: 'text-violet-800',
      badge: 'bg-violet-100',
      badgeText: 'text-violet-700',
      accent: '#6d28d9',
    },
    variants: [
      {
        label: 'Zoom',
        audience: 'CISO / Security',
        duration: '~7 min',
        beats: [
          {
            title: 'Shadow AI Detection',
            duration: '2 min',
            action: 'Show ISPM dashboard — shadow AI tools employees adopted without IT approval.',
            talkTrack: '"These are AI tools your employees are already using. IT didn\'t approve them. Security doesn\'t know about them. But they have OAuth tokens to your Salesforce, your SharePoint, your HR system."',
          },
          {
            title: 'Permission Transparency',
            duration: '2 min',
            action: 'Click into a specific agent. Show scopes — Read/Write/Execute. Show blast radius.',
            talkTrack: '"This agent has read/write access to your entire CRM. It was authorized by a single employee clicking Allow on an OAuth consent screen. No IT review. No scope limitation. No expiration."',
          },
          {
            title: 'Human Accountability Gap',
            duration: '2 min',
            action: 'Show agents without a mapped human owner. Show risk posture score.',
            talkTrack: '"22% of organizations treat agents as independent identities — meaning nobody is accountable when they go wrong. Every one of these unowned agents is a liability."',
          },
        ],
      },
      {
        label: 'Skim',
        audience: 'Architect / Developer',
        duration: '~90 sec',
        beats: [
          {
            title: 'One-Liner',
            duration: '90 sec',
            action: 'Don\'t open ISPM. Verbal only.',
            talkTrack: '"Before we secure agents, we need to find them. ISPM scans your environment — browser plugins, OAuth grants, builder platforms like Copilot Studio and Agentforce — and builds an inventory of every agent, its permissions, and its risk posture. Most orgs we scan find 3-5x more agents than they expected."',
          },
        ],
      },
    ],
  },
  {
    id: 'onboard',
    act: 'Act 2',
    title: 'ONBOARD — "Every agent gets an identity"',
    narrativeBeat: 'The bridge from problem to solution. Always a skim — the drama comes from the contrast with Act 3.',
    demoAsset: 'Okta Admin Console — Directory > AI Agents',
    transition: '"Now the interesting part. The agent has an identity — but it has zero access. Let me show you what happens when it tries to do something."',
    color: {
      border: 'border-sky-200',
      heading: 'text-sky-800',
      badge: 'bg-sky-100',
      badgeText: 'text-sky-700',
      accent: '#0284c7',
    },
    variants: [
      {
        label: 'Always Skim',
        audience: 'Every audience',
        duration: '60-90 sec',
        beats: [
          {
            title: 'Identity + Ownership',
            duration: '60 sec',
            action: 'Show Directory > AI Agents briefly, or describe verbally.',
            talkTrack: '"Every discovered agent gets registered in Okta as a Workload Principal — a first-class identity, just like a human employee. The critical rule: every agent must have a named human owner. Sarah in Sales owns her sales assistant. When Sarah leaves the company, her agent\'s access is automatically revoked."',
          },
        ],
      },
    ],
  },
  {
    id: 'protect',
    act: 'Act 3',
    title: 'PROTECT — "The agent asks Okta for permission at every step"',
    narrativeBeat: 'The core of the demo. The agent doesn\'t just have access — it earns access, per-action, per-user, governed by IT.',
    demoAsset: 'Okta AI Agent Governance (WIC) or AI Assistant Demo (Auth0)',
    componentId: '385a2461-b5a1-4a04-899e-0453fbdae903',
    transition: '"So the agent is governed. But what happens when something goes wrong? Let me show you the safety net."',
    color: {
      border: 'border-emerald-200',
      heading: 'text-emerald-800',
      badge: 'bg-emerald-100',
      badgeText: 'text-emerald-700',
      accent: '#059669',
    },
    variants: [
      {
        label: 'WIC / Architect Zoom',
        audience: 'Platform Architect',
        duration: '~12 min',
        beats: [
          {
            title: 'Setup',
            duration: '1 min',
            action: 'Sarah Sales logs in. Chat interface with AI sales assistant across 4 MCPs.',
            talkTrack: '"Sarah\'s a sales rep. She\'s using an AI assistant that can pull from four backend services — CRM, Inventory, Customer data, and Pricing. Each is a separate MCP server with its own authorization server in Okta."',
          },
          {
            title: 'The Failure',
            duration: '2 min',
            action: 'Sarah asks a question. ALL FOUR MCPs show RED DENIED.',
            talkTrack: '"Everything is provisioned. The agent exists. The services exist. But the agent can\'t access anything. This is zero trust for AI agents — agents have zero access by default. The IT admin hasn\'t authorized the connection yet."',
            isHighlight: true,
          },
          {
            title: 'The Fix — Managed Connections',
            duration: '3 min',
            action: 'Okta Admin → Directory → AI Agents → Managed Connections. Add auth server with scopes.',
            talkTrack: '"This is the governance control that doesn\'t exist in traditional OAuth. The IT admin explicitly decides: this agent can connect to this resource, with these specific scopes. Not the user clicking Allow — the enterprise deciding what\'s permitted."',
          },
          {
            title: 'The Success',
            duration: '2 min',
            action: 'Back to Sarah. Same question. ALL FOUR MCPs show GREEN GRANTED.',
            talkTrack: '"Same question. But now the agent has governed access. Short-lived tokens, minimum permission, every exchange brokered through Okta."',
          },
          {
            title: 'Role-Based Access',
            duration: '3 min',
            action: 'Log out Sarah. Log in as Mike Manager. Inventory: GRANTED. Everything else: DENIED.',
            talkTrack: '"Same agent. Same interface. But Mike is in the Warehouse group, not Sales. Okta policies evaluated his group membership and only granted inventory access. This is the same policy engine you already use for human SSO — now extended to AI agents."',
          },
        ],
      },
      {
        label: 'Auth0 / Developer Zoom',
        audience: 'Developer / CIAM',
        duration: '~12 min',
        beats: [
          {
            title: 'FGA for RAG',
            duration: '5 min',
            action: 'AI assistant queries document store. Auth0 FGA filters results per-user.',
            talkTrack: '"The agent searches all company documents — but Auth0 Fine Grained Authorization checks at the document level. Sarah sees sales docs. Mike sees warehouse docs. This is how you prevent a RAG pipeline from leaking data across users."',
          },
          {
            title: 'CIBA Human-in-the-Loop',
            duration: '4 min',
            action: 'Agent performs high-stakes action. Push notification for approval.',
            talkTrack: '"For read-only actions, the agent acts autonomously. For high-stakes actions — booking a meeting, committing budget — the agent pauses and asks the human. CIBA: async approval, human-in-the-loop without blocking the UX."',
          },
          {
            title: 'Token Vault',
            duration: '2 min',
            action: 'Conceptual — credentials stored in Okta, not agent memory.',
            talkTrack: '"Third-party API credentials stored in Okta\'s Token Vault — the agent never sees the raw credentials. Short-lived, scoped tokens minted on demand. If the agent is compromised, there are no credentials to steal."',
          },
        ],
      },
      {
        label: 'Medium (Mixed Room)',
        audience: 'Mixed Room',
        duration: '~7 min',
        beats: [
          { title: 'DENIED', duration: '30 sec', action: 'Show the red wall.', talkTrack: '"Zero access by default."' },
          { title: 'Managed Connections', duration: '1 min', action: 'Add auth server in admin.', talkTrack: '"IT authorizes the connection."' },
          { title: 'GRANTED', duration: '30 sec', action: 'Retry — green.', talkTrack: '"Now it works — governed access."' },
          { title: 'Role-Based', duration: '2 min', action: 'Switch to Mike.', talkTrack: '"Same agent, different permissions."' },
        ],
      },
    ],
  },
  {
    id: 'govern',
    act: 'Act 4',
    title: 'GOVERN — "When something goes wrong, you see it and kill it"',
    narrativeBeat: 'The safety net. Full visibility and instant response.',
    demoAsset: 'Okta System Log + AI Agent Activity Monitor',
    transition: '',
    color: {
      border: 'border-amber-200',
      heading: 'text-amber-800',
      badge: 'bg-amber-100',
      badgeText: 'text-amber-700',
      accent: '#d97706',
    },
    variants: [
      {
        label: 'Zoom',
        audience: 'CISO / Security',
        duration: '~6-7 min',
        beats: [
          {
            title: 'The Audit Trail',
            duration: '3 min',
            action: 'System Log filtered for app.oauth2.token.grant.id_jag. Show grants and denials.',
            talkTrack: '"Every token exchange — granted and denied — is in the System Log with full context. Who, which agent, which resource, what scopes, when. This is your SOX/PCI audit trail for AI agent activity. Your auditor asks: What did AI agents access last quarter? You have the answer."',
          },
          {
            title: 'OIG Certification',
            duration: '2 min',
            action: 'Conceptual or show OIG guided demo briefly.',
            talkTrack: '"You run access certification for human users today. Now extend to AI agents. Should this agent still have access to the CRM? Same review process, same workflow, new identity type."',
          },
          {
            title: 'The Kill Switch',
            duration: '1-2 min',
            action: 'Describe Universal Logout + ITP.',
            talkTrack: '"Universal Logout. One action revokes all active tokens globally. Sub-second. And ITP watches for anomalous patterns — an agent requesting unusual scopes, accessing resources at odd hours, making requests at unusual volumes."',
          },
        ],
      },
      {
        label: 'Medium',
        audience: 'Architect / Mixed',
        duration: '~4-5 min',
        beats: [
          { title: 'System Log', duration: '2 min', action: 'Show grants and denials from Act 3.', talkTrack: '"Full audit trail. Every exchange logged."' },
          { title: 'OIG + ITP + Kill Switch', duration: '2 min', action: 'Mention each in one sentence.', talkTrack: '"Certification campaigns for agents. Behavioral threat detection. And a global kill switch — Universal Logout."' },
        ],
      },
      {
        label: 'Skim',
        audience: 'Developer',
        duration: '~90 sec',
        beats: [
          {
            title: 'One-Liner',
            duration: '90 sec',
            action: 'Verbal only.',
            talkTrack: '"Everything is logged. You can run governance certification campaigns on agent access. ITP watches for anomalous behavior. And if an agent goes rogue, Universal Logout revokes all tokens globally in sub-second."',
          },
        ],
      },
    ],
  },
];

export const CLOSE_OPTIONS = [
  {
    audience: 'Already building agents',
    offer: '"Let\'s set up a POC with your actual agents. We can have a working XAA integration in days."',
    emoji: '🔧',
  },
  {
    audience: 'Security-focused',
    offer: '"Let\'s run ISPM against your environment and show you what\'s out there. No commitment, just visibility."',
    emoji: '🔍',
  },
  {
    audience: 'Wants more depth',
    offer: '"Let\'s schedule a 60-minute technical deep dive where I can show you the protocol layer and whiteboard your architecture."',
    emoji: '📐',
  },
];

export const SO_WHAT = {
  script:
    '"We discovered agents you didn\'t know existed. We gave every agent an identity with a human owner. We enforced that agents earn access per-action, per-user, governed by IT policy. And we gave your security team full visibility with instant response. Without this — shadow agents with broad access and no audit trail. With this — every agent discovered, governed, logged, and revocable. Same Okta platform you already use for SSO and lifecycle."',
  perAudience: [
    { audience: 'CISOs', landing: 'Five Properties: Provenance, Attenuation, Continuous Evaluation, Lifecycle Governance, Interoperability.', emoji: '🛡️' },
    { audience: 'Architects', landing: 'Open Standards: ID-JAG (IETF draft), XAA in MCP, OAuth 2.1, RFC 8693, CIBA. No lock-in.', emoji: '🏗️' },
    { audience: 'Developers', landing: 'Time-to-Market: Auth0 SDKs give you FGA, CIBA, and Token Vault in days, not months.', emoji: '💻' },
  ],
};
