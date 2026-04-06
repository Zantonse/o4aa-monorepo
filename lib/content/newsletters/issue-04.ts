import type { NewsletterIssue } from '../../newsletter-types';

export const issue04: NewsletterIssue = {
  slug: 'newsletter-04',
  issueNumber: 4,
  title: 'The O4AA Product Map',
  subtitle: 'Every product, what it does, where it fits, and which customer pain point it solves — the complete SE reference for Okta for AI Agents',
  date: 'April 2, 2026',
  readTimeMinutes: 11,
  heroImageAlt: 'Product team mapping out the O4AA architecture on a large whiteboard in a collaborative working session',
  tags: ['products', 'xaa', 'fga', 'ispm', 'oig', 'itp', 'architecture'],
  tldr: 'O4AA is not one product — it\'s six capabilities that work together: Cross-App Access (XAA) for delegation, Auth0 FGA for per-resource authorization, Privileged Credential Management for secrets, ISPM for discovery, OIG for governance, and ITP for threat detection. The framework is Discover, Onboard, Protect, Govern. XAA is the foundation everything else extends from.',

  sections: [
    {
      heading: 'It\'s Not One Product',
      paragraphs: [
        'The most common mistake SEs make on their first O4AA call is positioning it as a single product. "Okta for AI Agents" is a marketing name that encompasses six distinct capabilities across the Okta platform. Each one solves a different problem, ships on a different timeline, and maps to a different line in the customer\'s budget.',
        'Understanding which capability maps to which pain point is the difference between a conversation that resonates and one that overwhelms. This issue gives you the complete map.',
        '!! The mental model: think of O4AA as a four-phase lifecycle — Discover, Onboard, Protect, Govern — with specific Okta products powering each phase. The customer enters the lifecycle at whatever phase matches their most urgent pain. Most enter at Discover (they don\'t know what agents exist) or Protect (they know agents exist but can\'t control what they do).',
      ],
    },
    {
      heading: 'The Four-Phase Framework',
      paragraphs: [
        'Every O4AA conversation maps to this framework. Memorize it — it\'s the skeleton of every demo, every discovery call, and every architecture review.',
        '!! Phase 1 — DISCOVER: "What agents exist in my environment and what are they doing?" Product: ISPM (Identity Security Posture Management). ISPM scans agent platforms — AWS Bedrock, Microsoft Copilot Studio, Google Vertex AI, local MCP servers — and produces an inventory. It detects shadow agents, identifies non-human identities, flags excessive permissions, and scores risk. This is the entry point for most O4AA deals because the customer can\'t govern what they can\'t see.',
        '!! Phase 2 — ONBOARD: "How do I give each agent a managed identity?" Product: Universal Directory + Agent registration. Every agent gets a first-class identity in Universal Directory with a mandatory human owner, a client ID, and lifecycle states. This is where the agent stops being a rogue process and starts being a governed principal. The agent appears in the same admin console, same access reviews, and same audit logs as human identities.',
        '!! Phase 3 — PROTECT: "How do I control what agents can do?" Products: Cross-App Access (XAA), Auth0 FGA, Privileged Credential Management, CIBA. This is the richest product layer. XAA handles delegation (agent acts on behalf of user). FGA handles per-resource authorization (agent can read this document but not that one). Credential Management secures secrets. CIBA adds human approval for high-stakes actions. Most of the technical demo lives in this phase.',
        '!! Phase 4 — GOVERN: "How do I audit, review, and respond to agent activity?" Products: OIG (certification campaigns), ITP (threat detection), Universal Logout (kill switch). OIG runs access certification that includes agent identities — the same review campaign covers humans and agents. ITP detects anomalous agent behavior patterns. Universal Logout revokes all of an agent\'s active tokens in a single action.',
        'TT "The framework is Discover, Onboard, Protect, Govern. Most customers start at Discover — they don\'t know how many agents are running. Some jump straight to Protect — they know agents exist but can\'t control them. Where are you in that lifecycle right now?"',
      ],
      conceptGrid: [
        { label: 'DISCOVER', text: 'What agents exist? ISPM scans platforms, detects shadow agents, inventories NHIs, flags excessive permissions. The entry point for most deals.' },
        { label: 'ONBOARD', text: 'Give each agent a managed identity. Universal Directory registration with mandatory human owner, client ID, and lifecycle states.' },
        { label: 'PROTECT', text: 'Control what agents do. XAA for delegation, FGA for per-resource auth, Credential Management for secrets, CIBA for human approval.' },
      ],
      image: 'newsletter-04-framework.png',
      imageAlt: 'Solution architect drawing a four-phase framework diagram on a whiteboard while team members observe and discuss',
      imageCaption: 'The four-phase O4AA lifecycle: Discover, Onboard, Protect, Govern',
    },
    {
      heading: 'Product Deep Dive: XAA (The Foundation)',
      paragraphs: [
        'Cross-App Access is the technical foundation of everything in O4AA. If you understand XAA, you understand the architecture. If you don\'t, everything else is confusing. Invest here.',
        'What it is: XAA is a protocol that lets enterprise IT admins create "managed connections" between applications — including AI agents. The admin decides which app can reach which other app, what scopes are permitted, and what policies apply. This replaces the ad-hoc pattern where agents use shared service accounts or forward user tokens directly.',
        'How it works: XAA uses a new token type called an Identity Assertion JWT (ID-JAG). The agent authenticates to Okta, receives an ID-JAG that carries both the agent\'s identity AND the user\'s authorization, and presents that ID-JAG to the downstream API. The API validates the assertion against Okta\'s signing keys. The dual-identity structure — sub (the user) + client_id (the agent) — is what makes every action attributable to both a human and an agent. Note: Okta uses client_id in the ID-JAG and resulting access token rather than the RFC 8693 act claim.',
        '>> The key architectural insight: the downstream API never directly trusts the agent. It trusts Okta. Okta vouches for the agent through a signed assertion. If you revoke the managed connection in the Admin Console, the ID-JAG issuance stops immediately. Centralized control, distributed enforcement.',
        'Status: XAA is currently self-service Early Access. Enable it in Admin Console > Settings > Features > Early Access. No support ticket required. The full GA is April 30, 2026.',
        '!! Demo resource: xaa.dev is a free browser-based playground that lets you walk through the ID-JAG flow interactively. For a full end-to-end demo, use the oktadev/okta-secure-ai-agent-example repo — one bootstrap script configures the entire demo environment.',
      ],
    },
    {
      heading: 'Product Deep Dive: Auth0 FGA',
      paragraphs: [
        'Auth0 Fine Grained Authorization adds relationship-based access control at the resource level. Where XAA answers "can this agent talk to this API?", FGA answers "can this agent access this specific document, this specific record, this specific calendar entry?"',
        'Why this matters for agents: AI agents routinely need to access user-specific resources. A RAG-powered assistant queries a document store and returns results. Without FGA, the agent returns every document matching the query — including documents the user isn\'t authorized to see. With FGA, each document is filtered through the user\'s relationship-based permissions before the agent can access it.',
        '>> Proof points: Filevine built an AI legal chatbot requiring authorization across 80 billion documents using Auth0 FGA. CARFAX processes ~3 million FGA authorization decisions per day for consumer-facing agents.',
        'Status: Auth0 FGA is GA and available at dashboard.fga.dev. Built on the open-source OpenFGA engine (CNCF incubating project). Important positioning note: FGA is branded under Auth0, not Okta WIC. For WIC-only accounts, this requires the Auth0/OCI product surface.',
        'TT "XAA tells you whether the agent can talk to Salesforce. FGA tells you whether the agent can see this specific opportunity record for this specific customer. You need both — one for the connection, one for the data."',
      ],
    },
    {
      heading: 'Product Deep Dive: The Supporting Cast',
      paragraphs: [
        'Three more capabilities round out the Protect and Govern phases. These are often the difference between a POC and a production deployment.',
        'Privileged Credential Management (GA April 30, 2026): A centralized, Okta-managed store for third-party credentials and refresh tokens that agents need during task execution. This moves credentials out of agent memory — where they\'re vulnerable to prompt injection and context window leakage — and into secured infrastructure. The agent requests a credential just-in-time through Okta, uses it for the specific tool call, and the credential is never exposed in the agent\'s context. Think of it as a vault that only opens for the exact moment the agent needs a secret.',
        'CIBA — Client-Initiated Backchannel Authentication: When an agent needs to take a high-stakes action — delete data, send a message as the user, initiate a financial transaction — CIBA pauses the workflow and sends an async authorization request to the user\'s device. The user approves or denies on their phone. The agent proceeds only after explicit consent. No consent screen blocking the agent\'s thread. The request is asynchronous — the agent waits while the user reviews.',
        'Universal Logout (via IPSIE): If an agent is compromised, behaving anomalously, or simply needs to be shut down immediately, Universal Logout revokes all of the agent\'s active tokens and sessions across every connected system in a single action. Sub-second revocation. This is the "kill switch" that 72% of technology accounts cite as a top requirement.',
        '!! The five properties of AI-ready identity map directly to these products: Provenance (XAA), Attenuation (XAA scope narrowing), Continuous Evaluation (FGA), Lifecycle Governance (OIG + ISPM), Interoperability (open standards: OAuth 2.1, RFC 8693, CIBA, ID-JAG).',
      ],
      image: 'newsletter-04-products.png',
      imageAlt: 'Engineer reviewing a product architecture diagram showing interconnected capabilities on a large monitor',
      imageCaption: 'The O4AA product stack: six capabilities powering four lifecycle phases',
    },
    {
      heading: 'The SKU-to-Pain Map',
      paragraphs: [
        'This is the reference table you\'ll use on every call. Match the customer\'s pain statement to the product that solves it.',
        '>> "We don\'t know how many agents are running." → ISPM. Start with discovery. Build the inventory. Quantify the problem. This is the most common entry point.',
        '>> "Agents are using shared service accounts / static API keys." → XAA + Privileged Credential Management. Replace static credentials with short-lived, scoped tokens issued through the managed connection model.',
        '>> "We can\'t prove who authorized an agent\'s action." → XAA. The sub + client_id token structure provides full attribution: which user authorized it and which agent did it.',
        '>> "Our RAG pipeline returns data users shouldn\'t see." → Auth0 FGA. Per-document authorization filtering based on the user\'s relationship-based permissions.',
        '>> "Agents need human approval for sensitive actions." → CIBA. Async human-in-the-loop authorization without blocking the agent\'s execution thread.',
        '>> "When employees leave, their agents keep running." → OIG lifecycle management. Agent identities tied to human owners with automatic review-state transition on offboarding.',
        '>> "We need a kill switch for compromised agents." → Universal Logout. Sub-second token revocation across all connected systems.',
        '>> "Auditors are asking about AI agent access." → OIG certification campaigns. Agent identities included in the same access review as human identities.',
        '>> "We\'re seeing anomalous agent behavior." → ITP threat detection. Agent-specific behavioral analysis and automated response.',
        'TT "What\'s the most pressing problem right now — is it visibility (you don\'t know what agents exist), control (you know they exist but can\'t govern them), or compliance (auditors are asking questions)? That tells me which capability to show you first."',
      ],
      accordion: [
        { title: '"We don\'t know how many agents are running"', content: ['ISPM. Start with discovery. Build the inventory. Quantify the problem. This is the most common entry point and the fastest path to executive buy-in.'] },
        { title: '"Agents are using shared service accounts / static API keys"', content: ['XAA + Privileged Credential Management. Replace static credentials with short-lived, scoped tokens issued through the managed connection model.'] },
        { title: '"We can\'t prove who authorized an agent\'s action"', content: ['XAA. The sub + client_id token structure provides full attribution: which user authorized it and which agent did it.'] },
        { title: '"Our RAG pipeline returns data users shouldn\'t see"', content: ['Auth0 FGA. Per-document authorization filtering based on the user\'s relationship-based permissions. Filevine uses this for 80B documents.'] },
        { title: '"Agents need human approval for sensitive actions"', content: ['CIBA. Async human-in-the-loop authorization without blocking the agent\'s execution thread.'] },
        { title: '"When employees leave, their agents keep running"', content: ['OIG lifecycle management. Agent identities tied to human owners with automatic review-state transition on offboarding.'] },
        { title: '"We need a kill switch for compromised agents"', content: ['Universal Logout. Sub-second token revocation across all connected systems. Single action, all connections terminated.'] },
      ],
      image: 'newsletter-04-whiteboard.png',
      imageAlt: 'Solution engineer whiteboarding a product-to-pain mapping with a customer in an intimate meeting room',
      imageCaption: 'Matching customer pain statements to O4AA capabilities — the SE\'s most-used reference',
    },
    {
      heading: 'The Roadmap Snapshot',
      paragraphs: [
        'Knowing what\'s GA, what\'s EA, and what\'s coming helps you set expectations and scope POCs correctly.',
        '!! GA Now: Auth0 FGA (relationship-based authorization), Universal Logout (IPSIE-based revocation), OIG access certification, ITP threat detection, ISPM posture assessment.',
        '!! EA Now (self-service): Cross-App Access / XAA — enable in Admin Console > Settings > Features > Early Access. No support ticket needed.',
        '!! GA April 30, 2026: Okta for AI Agents full platform — XAA GA, Privileged Credential Management GA, Agent registration in Universal Directory, MCP Server security.',
        '!! EA Q2 2026: Agent Gateway, Shadow AI Discovery via Browser Plugin (ISPM), Agent risk assessment via ISPM.',
        '!! Roadmap Q3+ 2026: Agent-to-Agent (A2A) delegation, registry of trusted remote MCP servers, CIBA human-in-the-loop, kill switch (global token revocation), EDR-based agent discovery.',
        '>> Important: Everything on the roadmap extends from the XAA foundation. MCP support, A2A delegation, and the Agent Gateway all use the same ID-JAG token exchange. Organizations building on XAA today will inherit every future capability as an extension, not a migration. This is the key message for customers evaluating "should I start now or wait."',
        'TT "Everything ships on April 30 builds on what you can try today in Early Access. Start with XAA now — create a managed connection, run the demo, see the token structure. Everything that comes after is an extension of that same foundation."',
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'O4AA is not one product — it\'s six capabilities that work together across a four-phase lifecycle: Discover, Onboard, Protect, Govern.',
    },
    {
      text: 'XAA is the foundation. If you understand XAA, you understand the architecture. If you don\'t, everything else is confusing. Invest here.',
    },
    {
      text: 'The downstream API never directly trusts the agent. It trusts Okta. Okta vouches for the agent through a signed assertion. Centralized control, distributed enforcement.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Four-Phase Framework',
      text: 'Discover (ISPM), Onboard (Universal Directory), Protect (XAA + FGA + Credential Mgmt + CIBA), Govern (OIG + ITP + Universal Logout). Customers enter at their most urgent pain.',
    },
    {
      label: 'XAA Is the Foundation',
      text: 'Cross-App Access with the ID-JAG token (sub + client_id) is the architectural core. MCP, A2A, and Agent Gateway all extend from it. Start every technical conversation here.',
    },
    {
      label: 'Entry Point Question',
      text: '"Is the problem visibility, control, or compliance?" Visibility = ISPM. Control = XAA + FGA. Compliance = OIG. Match the pain to the product.',
    },
    {
      label: 'Timeline',
      text: 'XAA is EA now (self-service). Full GA April 30, 2026. Everything on the roadmap extends from XAA — start today, inherit future capabilities automatically.',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #5: Auth Flows for the Agentic Era',
    description: 'The technical deep dive — token exchange (RFC 8693), ID-JAG flow step by step, CIBA consent flow, scope attenuation across delegation chains, and how to demo each one. Bring your terminal.',
  },
};
