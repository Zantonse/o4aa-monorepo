import type { NewsletterIssue } from '../../newsletter-types';

export const issue01: NewsletterIssue = {
  slug: 'newsletter-01',
  issueNumber: 1,
  title: 'The Identity Crisis Nobody Saw Coming',
  subtitle: 'Why AI agents broke every assumption about authentication — and what SEs need to know before their next call',
  date: 'April 2, 2026',
  readTimeMinutes: 8,
  heroImageAlt: 'Abstract visualization of AI agents connecting to enterprise systems through identity channels',
  tags: ['foundations', 'agents', 'identity', 'auth'],
  tldr: 'AI agents are not users and not service accounts — they are a new identity category that breaks traditional auth models. 91% of enterprises are using them, 44% have zero governance, and 88% have had security incidents. This issue covers why the old models fail and what the new model looks like.',

  sections: [
    {
      heading: 'The Problem in One Sentence',
      paragraphs: [
        'AI agents need to authenticate like service accounts but authorize like users — and nothing in the enterprise identity stack was built for that.',
        '!! This is the single most important sentence in the entire O4AA sales motion. If a customer gets this, the rest of the conversation follows naturally. If they don\'t, you\'re selling features instead of solving a problem.',
        'Think about it: a traditional service account authenticates as itself and does a fixed job with fixed permissions. A human user authenticates as themselves and does whatever their role allows. An AI agent authenticates as itself but acts on behalf of a specific human, with that human\'s permissions, to accomplish a goal the human set. That "on behalf of" is where the entire identity problem lives.',
      ],
    },
    {
      heading: 'Why This Matters Right Now',
      paragraphs: [
        'The numbers tell the story. In a March 2026 survey, Okta found that 91% of organizations are actively using AI agents in production. Not experimenting — using. But 44% have no governance framework for those agents, and 88% have experienced suspected or confirmed AI agent security incidents.',
        '>> "We went from zero AI at about mid-December to AI everywhere with mandates." — Director of Information Security, Fortune 500 (from Gong transcript analysis of 306 AI-related discovery calls)',
        'The velocity is unprecedented. Every customer we talk to says their agent count at least 5x\'d in the past year. Shadow AI — agents deployed without IT knowledge or approval — is following the exact same adoption curve as shadow SaaS a decade ago, but with one critical difference: these agents don\'t just read data through a browser. They make API calls, write to databases, send emails, and modify production systems. The blast radius of an ungoverned agent is categorically larger than an ungoverned SaaS app.',
        'And the gap is widening. Leadership is mandating AI adoption ("use AI or fall behind") while security teams are trying to retrofit governance onto agents already in production. As one customer put it: "That train is moving at mach speed — I\'m not sure there is anything in front of it at this point."',
      ],
    },
    {
      heading: 'The Three Models That Don\'t Work',
      paragraphs: [
        'Before we look at what does work, let\'s kill three common assumptions that SEs encounter on nearly every call.',
        'Model 1: "We\'ll just use service accounts." Service accounts are designed for machine-to-machine communication where both the identity and the action scope are fixed at provisioning time. An agent deciding at runtime to call five different APIs based on user intent doesn\'t fit this model. You\'d need to pre-provision the service account with access to every API the agent might ever call — which is the definition of over-privileged. And service accounts don\'t carry user context, so there\'s no audit trail connecting the action to the human who requested it.',
        'Model 2: "We\'ll use the user\'s OAuth token." This sounds right but fails in practice. OAuth tokens are scoped at authentication time. If the user authenticates with scopes for API A and B, and the agent decides mid-task it needs API C, the token doesn\'t cover it. You either over-scope upfront (violating least privilege) or force re-authentication mid-task (breaking the autonomous experience). Plus, passing a user\'s full token to an agent gives the agent the user\'s complete access — no way to limit what the agent can do versus what the user can do.',
        'Model 3: "Our API gateway handles it." API gateways enforce rate limits and routing, but they don\'t solve the delegation problem. The gateway can verify that an incoming request has a valid token, but it can\'t answer the question: "Was this specific agent authorized by this specific user to take this specific action at this specific time?" That\'s an identity problem, not a network problem.',
        'TT When a customer proposes any of these three models, the pivot is the same: "Those tools solve part of the problem well. The gap is the delegation chain — proving that a specific user authorized a specific agent to take a specific action. That\'s what O4AA is designed for."',
      ],
      tabs: [
        {
          label: 'Service Accounts',
          content: [
            'Designed for fixed machine-to-machine communication. Identity and scope are set at provisioning time.',
            '!! FAILS BECAUSE: Agents decide at runtime which APIs to call. You\'d pre-provision access to every possible API = over-privileged. No user context in the token = no audit trail linking actions to humans.',
          ],
        },
        {
          label: 'User OAuth Tokens',
          content: [
            'Sounds right — pass the user\'s token to the agent. But tokens are scoped at auth time.',
            '!! FAILS BECAUSE: Agent needs API C mid-task but token only covers A and B. Either over-scope upfront (violating least privilege) or re-auth mid-task (breaking autonomy). Plus: agent gets the user\'s FULL access with no way to limit.',
          ],
        },
        {
          label: 'API Gateway',
          content: [
            'Gateways enforce rate limits and routing. They can verify a token is valid.',
            '!! FAILS BECAUSE: Can\'t answer "was this SPECIFIC agent authorized by this SPECIFIC user to take this SPECIFIC action at this SPECIFIC time?" That\'s an identity problem, not a network problem.',
          ],
        },
      ],
      image: 'newsletter-01-broken-models.png',
      imageAlt: 'Three geometric shapes — hexagon, circle, diamond — each fractured with amber light, representing three broken authentication models',
      imageCaption: 'Service accounts, user tokens, and API gateways — three models that break under agentic workloads',
      imageBanner: true,
    },
    {
      heading: 'What the New Model Looks Like',
      paragraphs: [
        'The solution is a delegated authorization model built on existing standards — primarily OAuth 2.0 token exchange (RFC 8693) and CIBA (Client-Initiated Backchannel Authentication). Here\'s the mental model:',
        'Step 1 — The user authenticates to Okta. Nothing new here. Standard OIDC login.',
        'Step 2 — The user invokes an agent. The agent receives a constrained token — not the user\'s token, but a new token derived from the user\'s session that carries only the scopes the agent needs for its current task. This is the RFC 8693 token exchange: the agent presents the user\'s token to Okta and gets back a scoped, time-limited agent token.',
        'Step 3 — The agent calls tools. Each API call uses the agent token, which encodes both the agent\'s identity AND the user\'s authorization. The downstream API can verify: who is the agent, who authorized it, what scopes were granted, and when does this authorization expire.',
        'Step 4 — For high-stakes actions, CIBA kicks in. The agent pauses and sends an async authorization request to the user\'s device. The user approves or denies. The agent proceeds only with explicit consent. No consent screen blocking the workflow — the request goes to the user\'s phone while the agent waits.',
        '!! The key insight: the user\'s identity flows through the entire agent chain without the agent ever holding the user\'s actual credentials. The agent proves it\'s acting on behalf of the user without being able to impersonate the user.',
      ],
      timeline: [
        { label: 'Step 1', title: 'User Authenticates', description: 'Standard OIDC login to Okta. Nothing new here — the user proves their identity.' },
        { label: 'Step 2', title: 'Agent Gets Constrained Token', description: 'RFC 8693 token exchange: agent presents user\'s token, receives a scoped, time-limited agent token. Not the user\'s token — a derived token with only the needed scopes.' },
        { label: 'Step 3', title: 'Agent Calls Tools', description: 'Each API call uses the agent token encoding both the agent\'s identity AND the user\'s authorization. Downstream APIs verify: who is the agent, who authorized it, what scopes, when it expires.' },
        { label: 'Step 4', title: 'CIBA for High Stakes', description: 'For sensitive actions, the agent pauses and sends an async approval request to the user\'s phone. No approval = no token = no action. Human-in-the-loop without blocking the workflow.' },
      ],
      image: 'newsletter-01-new-model.png',
      imageAlt: 'Delegated authorization flow — user orb at top connecting through Okta shield to three downstream API orbs',
      imageCaption: 'The delegated authorization model: user identity flows through the agent chain via scoped, time-limited tokens',
    },
    {
      heading: 'The 100x Velocity Problem',
      paragraphs: [
        'Here\'s a stat that reframes every conversation: a typical web application makes about 50 API operations per minute. An AI agent makes up to 5,000. That\'s a 100x multiplier.',
        '>> On July 18, 2025, an AI agent at Replit erased 1,206 executive records from a live production database in seconds. By the time anyone noticed, the damage was done.',
        'Traditional auth models were designed for human-speed interactions. Consent screens, approval workflows, and manual reviews all assume a human is in the loop and has time to make decisions. At agent velocity, those assumptions collapse. By the time a consent screen would render, the agent has already made thousands of API calls.',
        'This is why Okta\'s approach enforces policy-based authorization in real time rather than relying on upfront consent. The policy engine evaluates every token exchange request against rules — not just "is this token valid?" but "should this agent have this access right now, given the current risk signals?" It\'s authorization that operates at machine speed because it was designed for machine speed.',
      ],
      labeledCallouts: [
        { label: '50 OPS/MIN', labelColor: 'blue', text: 'A typical web application. Human-speed interactions. Consent screens, approval workflows, and manual reviews work at this velocity.' },
        { label: '5,000 OPS/MIN', labelColor: 'rose', text: 'An AI agent. 100x multiplier. Consent screens collapse. By the time a UI would render, the agent has already made thousands of API calls.' },
        { label: 'REPLIT INCIDENT', labelColor: 'amber', text: 'July 18, 2025: An AI agent erased 1,206 executive records from a live production database in seconds. The damage was done before anyone noticed.' },
      ],
      image: 'newsletter-01-velocity.png',
      imageAlt: 'Speed comparison — sparse slow particle trail on left versus explosive dense blue particle burst on right',
      imageCaption: '50 ops/min vs 5,000 ops/min — the velocity gap that breaks consent-based authorization',
    },
    {
      heading: 'What You Need to Know for Your Next Call',
      paragraphs: [
        'Here are the five things to internalize before your next O4AA discovery call:',
        '!! 1. Agents are a NEW identity category. Not users, not service accounts. The customer needs to hear this framing because it explains why their existing tools don\'t solve the problem.',
        '!! 2. The core problem is delegation, not authentication. The agent can authenticate fine. The hard part is proving it was authorized by a specific user to take a specific action. Lead with this.',
        '!! 3. 53% of MCP integrations use static API keys. This stat from Invariant Labs is the opener that gets security teams\' attention. Static keys mean no expiration, no scope limits, no audit trail.',
        '!! 4. The standards already exist. OAuth 2.0 token exchange (RFC 8693) and CIBA are published, proven standards. Okta didn\'t invent a new protocol — we built the implementation. This matters because customers need to know they\'re not betting on proprietary tech.',
        '!! 5. The pain is live right now. 88% of organizations report AI agent security incidents. This is not a future problem — it\'s a current one with a growing blast radius. The urgency is real.',
        'TT "How many AI agents are running in your environment today — and how confident are you in that number?" This is the single best opening question. It surfaces the shadow AI gap immediately, and the honest answer is almost always "we don\'t know."',
      ],
      conceptGrid: [
        { label: 'NEW IDENTITY CATEGORY', text: 'Agents are not users and not service accounts. The customer needs to hear this framing — it explains why existing tools don\'t solve the problem.' },
        { label: 'DELEGATION IS THE CORE', text: 'The hard part isn\'t agent authentication — it\'s proving a specific user authorized a specific agent to take a specific action. Lead with this.' },
        { label: 'STANDARDS EXIST', text: 'OAuth 2.0 token exchange (RFC 8693) and CIBA are proven standards. Okta built the implementation, not a proprietary protocol. Customers aren\'t betting on vendor lock-in.' },
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'AI agents authenticate like service accounts but authorize like users — and nothing in the enterprise identity stack was built for that.',
    },
    {
      text: 'We went from zero AI at about mid-December to AI everywhere with mandates.',
      attribution: 'Director of Information Security, Fortune 500',
    },
    {
      text: 'A typical application makes 50 API calls per minute. An AI agent makes 5,000. Your auth model needs to work at that speed.',
    },
  ],

  keyTakeaways: [
    {
      label: 'The Core Problem',
      text: 'Agents need delegated authorization — proving a specific user authorized a specific agent to take a specific action. Service accounts and user tokens don\'t solve this.',
    },
    {
      label: 'The Market Reality',
      text: '91% using agents, 44% no governance, 88% had incidents. This is not a future problem — it\'s happening now with a widening gap.',
    },
    {
      label: 'The Standards Play',
      text: 'OAuth 2.0 token exchange (RFC 8693) + CIBA. Okta built the implementation on proven standards, not proprietary protocols.',
    },
    {
      label: 'Your Opening Question',
      text: '"How many AI agents are running in your environment — and how confident are you in that number?" Opens the shadow AI conversation immediately.',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #2: Anatomy of an Agent Identity',
    description: 'Deep dive into how agent identities are structured in Okta — registration, credential models, scoping, lifecycle management, and the Universal Directory model for non-human identities.',
  },
};
