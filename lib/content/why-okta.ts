import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'why-okta',
  title: 'Why Okta',
  description:
    'The case for Okta as the identity platform for AI agentic systems — differentiated capabilities, the audit trail advantage, common objections and responses, and discovery questions that surface the gap.',
  tags: ['reference', 'differentiation', 'messaging', 'objections'],
  icon: '⚡',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'The Integration Advantage',
      paragraphs: [
        'Every enterprise AI security architecture eventually arrives at the same set of requirements: delegated user identity through to downstream APIs, per-resource fine-grained authorization, secure credential storage for heterogeneous backends, cross-application agent access, and a protocol adapter for MCP-based agent systems. The question is whether those requirements are met by assembling pieces from different vendors — each with its own identity model, policy engine, audit log format, and API surface — or by extending the platform the enterprise already runs for workforce authentication.',
        '!! The key differentiator: Okta is the ONLY enterprise identity platform where OBO Token Exchange (GA), Auth0 FGA, Privileged Credential Management, Cross App Access, and Agent Gateway operate as integrated components within the same platform your workforce already authenticates through. No other vendor can say this.',
        '>> The expansion motion is natural: most enterprise Okta customers already have WIC for their workforce. Extending that to AI agents is additive — same platform, same policies, same audit infrastructure, new subject type.',
        'TT "You already use Okta for your workforce identity. Your AI agents need the same level of governance — user delegation, per-resource authorization, audit trail. Why would you bring in a second identity platform for agents when Okta extends to cover them natively?"',
        'Industry data reinforces the governance gap: Deloitte\'s 2026 State of AI report found that 73% of enterprise leaders cite security as their top AI risk, but only 21% have a mature governance model for autonomous agents. McKinsey reports 80% of organizations have encountered risky agent behaviors. And Okta\'s own survey shows that while 91% of organizations use AI agents, only 10% have a strategy for managing non-human identities. The gap between AI adoption and AI governance is where Okta for AI Agents operates. [Sources: Deloitte 2026 State of AI; McKinsey; Okta AI Agent Survey, March 2026]',
      ],
      labeledCallouts: [
        {
          label: 'OBO Token Exchange',
          labelColor: 'blue',
          text: 'RFC 8693 On-Behalf-Of is GA in Okta — the only enterprise IdP with a production-ready OBO implementation designed for autonomous agent delegation. Entra OBO requires a user token present at the start of the call; Okta\'s implementation supports scheduled and event-driven agents.',
        },
        {
          label: 'Auth0 FGA',
          labelColor: 'blue',
          text: 'Fine-grained, relationship-based authorization evaluated at query time. Enforces what an agent can access on whose behalf — per resource, per user — without embedding authorization logic in the agent itself.',
        },
        {
          label: 'Privileged Credential Management',
          labelColor: 'blue',
          text: 'Centralized credential storage and lifecycle management for heterogeneous backends. Eliminates long-lived API keys and shared service accounts — the credential sprawl pattern that leads to 23-agent blast-radius incidents.',
        },
        {
          label: 'Cross App Access (XAA)',
          labelColor: 'blue',
          text: 'IT-governed, policy-controlled connections between applications for agent access flows. Replaces shadow integrations built by individual teams with centrally audited, revocable app-to-app access.',
        },
        {
          label: 'Agent Gateway',
          labelColor: 'blue',
          text: 'GA April 30, 2026 — a single protocol adapter supporting 8 authentication methods for MCP-based agent systems and heterogeneous backends. Engineers configure once; every agent-to-backend connection inherits enterprise auth automatically.',
        },
        {
          label: 'Platform Extension Advantage',
          labelColor: 'blue',
          text: 'All five capabilities operate within the same platform enterprise customers already run for workforce authentication. Same policies, same audit infrastructure, same admin console — agent identities are an additive subject type, not a separate system.',
        },
      ],
    },
    {
      heading: 'The Audit Trail Differentiator',
      paragraphs: [
        'When an AI agent takes an action on behalf of a user — calling an API, reading a record, initiating a transaction — that action generates two distinct types of evidence: an application-layer log produced by the agent or the target system, and an identity-layer record produced by the authorization server. Most organizations deploying AI agents today have the first and not the second. The distinction matters because application-layer logs are produced by the same system that is being investigated. An identity-layer record is produced independently — it captures the authorization decision itself, not the application\'s account of what it decided to do.',
        '!! This is the differentiator that closes deals in regulated industries: Okta\'s System Log is produced by the authorization server, not by the agent or the application. It\'s an independent, tamper-evident record of every delegation event. No competitor produces this.',
        '>> In a compliance inquiry, an app-level log says "our agent says it did X." An Okta System Log says "Okta authorized agent Y to do X on behalf of user Z at time T with scope W." The difference is credibility — and it matters to auditors.',
        '?? If your AI agent takes an action that triggers a compliance inquiry, is your audit evidence produced by the agent itself or by an independent identity layer?',
      ],
      mermaidDiagrams: [
        {
          title: 'Audit Trail: App-Layer Log vs Identity-Layer Record',
          code: `graph TB
    subgraph AppLayer["App-Layer Log"]
        direction TB
        A1["🤖 Agent itself<br/>produces the log"]
        A2["Self-reported<br/><i>agent\\'s own account</i>"]
        A3["Could be tampered<br/><i>same system under investigation</i>"]
        A4["Audit gap<br/><i>no independent verification</i>"]
        A1 --> A2 --> A3 --> A4
    end

    subgraph IdLayer["Identity-Layer Record"]
        direction TB
        B1["🔐 Okta Auth Server<br/>produces the record"]
        B2["Independent source<br/><i>not the agent or app</i>"]
        B3["Tamper-evident<br/><i>RS256-signed JWT, JWKS-verifiable</i>"]
        B4["Compliance-grade<br/><i>captures who, what, when, why</i>"]
        B1 --> B2 --> B3 --> B4
    end

    Q["Which would an auditor trust?"]

    AppLayer --> Q
    IdLayer --> Q

    style AppLayer fill:#f0e6e6,stroke:#c4a0a0,stroke-width:2px
    style IdLayer fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style A4 fill:#f0e6e6,stroke:#c4a0a0,stroke-dasharray:5 5
    style B4 fill:#e6f0eb,stroke:#80b89a`,
          caption: 'App-layer logs are self-reported. Okta\'s System Log is produced by an independent authorization server — the same record an auditor would rely on.',
        },
      ],
    },
    {
      heading: 'Common Objections and Responses',
      paragraphs: [
        'Objection: "We already have an IdP" (usually Entra ID)\nTT "Your IdP handles user authentication — that\'s not the gap. The gap is agent delegation. Entra OBO only works for user-initiated flows where a user token is present at the start of the call. Autonomous agents running on scheduled jobs or event triggers cannot produce OBO tokens using client credentials alone — there\'s no user token to exchange. Okta\'s OBO implementation is designed to support delegated access patterns for agentic systems. It layers on top of your existing IdP — it doesn\'t replace it."',
        'Objection: "We can use service accounts"\nTT "Service accounts tell the downstream API who the agent is. They don\'t tell the API who the user is. That means no per-user delegation, no per-resource FGA that enforces what the agent can access on whose behalf, no delegation audit trail, and no way to revoke a specific user\'s agent access without taking down the entire service. When your compliance team asks how you ensure an AI agent acting on behalf of a departed employee loses access immediately — a service account has no answer."',
        'Objection: "We\'ll build it ourselves"\nTT "RFC 8693 token exchange is the easy part — it\'s well-documented. The hard part is what comes after: fine-grained authorization that evaluates relationship-based policies at query time, a credential gateway with 8 auth methods for heterogeneous backends, centralized revocation that propagates across distributed systems, and an audit log that holds up to SOX review. Those take 12–18 months to build and a dedicated team to maintain as the OAuth ecosystem evolves. The question isn\'t whether you can build it — it\'s whether that\'s the best use of your engineering capacity."',
        'Objection: "It\'s too early for this"\nTT "OBO is GA. Cross App Access is in Early Access. The Agent Gateway and Privileged Credential Management are GA April 30, 2026. The standards these capabilities are built on — RFC 8693, GNAP, OAuth 2.1 — are not drafts, they are shipping implementations. The organizations that start building their agent identity architecture now will have it production-ready when their AI deployments scale. The organizations that wait will be building under pressure when the compliance team is already asking questions."',
      ],
      accordion: [
        {
          title: '"We already have an IdP" (usually Entra ID)',
          content: [
            'Your IdP handles user authentication — that\'s not the gap. The gap is agent delegation. Entra OBO only works for user-initiated flows where a user token is present at the start of the call. Autonomous agents running on scheduled jobs or event triggers cannot produce OBO tokens using client credentials alone — there\'s no user token to exchange.',
            'Okta\'s OBO implementation is designed to support delegated access patterns for agentic systems. It layers on top of your existing IdP — it doesn\'t replace it. The positioning is additive: workforce auth stays where it is; agent delegation is the new layer Okta provides.',
          ],
        },
        {
          title: '"We can use service accounts"',
          content: [
            'Service accounts tell the downstream API who the agent is. They don\'t tell the API who the user is. That means no per-user delegation, no per-resource FGA that enforces what the agent can access on whose behalf, no delegation audit trail, and no way to revoke a specific user\'s agent access without taking down the entire service.',
            'When your compliance team asks how you ensure an AI agent acting on behalf of a departed employee loses access immediately — a service account has no answer. Documented incident: 23 agents sharing one Salesforce service account were all compromised simultaneously through a single prompt injection attack. One credential, 23 blast radiuses.',
          ],
        },
        {
          title: '"We\'ll build it ourselves"',
          content: [
            'RFC 8693 token exchange is the easy part — it\'s well-documented. The hard part is what comes after: fine-grained authorization that evaluates relationship-based policies at query time, a credential gateway with 8 auth methods for heterogeneous backends, centralized revocation that propagates across distributed systems, and an audit log that holds up to SOX review.',
            'Those take 12–18 months to build and a dedicated team to maintain as the OAuth ecosystem evolves. The question isn\'t whether you can build it — it\'s whether that\'s the best use of your engineering capacity when a production-ready platform already exists.',
          ],
        },
        {
          title: '"It\'s too early for this"',
          content: [
            'OBO is GA. Cross App Access is in Early Access. The Agent Gateway and Privileged Credential Management are GA April 30, 2026. The standards these capabilities are built on — RFC 8693, GNAP, OAuth 2.1 — are not drafts, they are shipping implementations.',
            'The organizations that start building their agent identity architecture now will have it production-ready when their AI deployments scale. The organizations that wait will be building under pressure when the compliance team is already asking questions. Okta\'s own survey: 91% of organizations use AI agents, but only 10% have a strategy for managing non-human identities. The gap is already real.',
          ],
        },
      ],
    },
    {
      heading: 'Top Discovery Questions',
      paragraphs: [
        '?? How many AI agents are operating in your environment today — and how confident are you in that number? Across 306 AI-related conversations this quarter, security teams consistently discover agents they didn\'t know existed. One director told us: "We went from zero AI at about mid-December to AI everywhere with mandates."',
        '?? What happens when an employee leaves — how do you ensure AI agents acting on their behalf lose access immediately? As one IT contact described: "When we terminate someone, we terminate all of their API keys of the bot... we have no way to manage that."',
        '?? If your AI agents take an action that causes a compliance incident, can you prove to an auditor exactly what the agent did, on whose behalf, and what it was authorized to do? One customer told us: "Agent did something wrong — they deleted data. We can\'t even differentiate if an agent did it or a user did it."',
        '?? How many backend systems do your AI agents access? How long does it take to add auth to each new integration? Most teams hit a wall at integration 4-5 when the per-integration auth maintenance burden becomes unsustainable.',
        '?? Are your AI agents using shared service accounts or long-lived API keys? In a documented incident, 23 agents sharing one Salesforce service account were all compromised simultaneously through a single prompt injection attack. One credential, 23 blast radiuses.',
        '?? Do you have a kill switch today — if an agent starts doing something unexpected, can you terminate it instantly across every system it\'s connected to? In one incident, it took 4 hours to revoke credentials across 11 API providers. 340,000 records were downloaded during that window.',
        'TT "These questions don\'t have good answers without an identity layer for agents. That\'s the gap Okta fills. Start the conversation here, document the answers, and use the gaps as the business case."',
      ],
      labeledCallouts: [
        {
          label: 'Agent Inventory',
          labelColor: 'blue',
          text: 'How many AI agents are operating in your environment today — and how confident are you in that number? Security teams consistently discover agents they didn\'t know existed. One director told us: "We went from zero AI at about mid-December to AI everywhere with mandates."',
        },
        {
          label: 'Offboarding & Revocation',
          labelColor: 'blue',
          text: 'What happens when an employee leaves — how do you ensure AI agents acting on their behalf lose access immediately? As one IT contact described: "When we terminate someone, we terminate all of their API keys of the bot... we have no way to manage that."',
        },
        {
          label: 'Compliance Audit Trail',
          labelColor: 'blue',
          text: 'If your AI agents take an action that causes a compliance incident, can you prove to an auditor exactly what the agent did, on whose behalf, and what it was authorized to do? One customer told us: "Agent did something wrong — they deleted data. We can\'t even differentiate if an agent did it or a user did it."',
        },
        {
          label: 'Integration Scale',
          labelColor: 'blue',
          text: 'How many backend systems do your AI agents access? How long does it take to add auth to each new integration? Most teams hit a wall at integration 4–5 when the per-integration auth maintenance burden becomes unsustainable.',
        },
        {
          label: 'Credential Risk',
          labelColor: 'blue',
          text: 'Are your AI agents using shared service accounts or long-lived API keys? In a documented incident, 23 agents sharing one Salesforce service account were all compromised simultaneously through a single prompt injection attack. One credential, 23 blast radiuses.',
        },
        {
          label: 'Kill Switch',
          labelColor: 'blue',
          text: 'Do you have a kill switch today — if an agent starts doing something unexpected, can you terminate it instantly across every system it\'s connected to? In one incident, it took 4 hours to revoke credentials across 11 API providers. 340,000 records were downloaded during that window.',
        },
      ],
    },
    {
      heading: 'Aligning O4AA to APEX Methodology',
      paragraphs: [
        'The Okta field team uses the APEX sales methodology for qualification and discovery. O4AA conversations map to APEX stages: the Value Framework discovery questions in this knowledge app align with APEX discovery methodology. The APEX Mantra Generator, Discovery Gem, and reinforcement prompt gallery are available in Highspot for O4AA-specific deal preparation.',
        '>> Key APEX resources for O4AA: (1) APEX Mantra Generator — generate a deal-specific mantra. (2) APEX Discovery Gem — provide a pre-call plan with full discovery strategy for an O4AA account. (3) APEX Reinforcement AI Prompt Gallery — collection of prompts for applying APEX to daily execution. (4) OWI Sales Play: Okta for AI Agents — strategies for targeting current customers on shadow AI. (5) Auth0 Sales Play: AI Agents — strategies for CIAM-side AI security positioning. (6) Ideal Customer Profile — good fit vs. bad fit criteria for O4AA deals. (7) O4AA Apex Product Sales Guide — the definitive APEX-structured guide for selling O4AA.',
        'TT \'If you\'re preparing for an O4AA call, start with the APEX Discovery Gem in Highspot — it generates a pre-call plan with discovery strategy tailored to your specific account and contacts.\'',
      ],
      timeline: [
        {
          label: 'APEX: Align',
          title: 'Establish fit and urgency',
          description: 'Use the Agent Inventory and Kill Switch discovery questions to surface the governance gap. The Ideal Customer Profile (Highspot) defines good-fit vs. bad-fit criteria for O4AA deals. The OWI Sales Play provides targeting strategies for current Okta customers on shadow AI.',
        },
        {
          label: 'APEX: Probe',
          title: 'Quantify the pain',
          description: 'Use the Offboarding & Revocation, Compliance Audit Trail, and Credential Risk questions to map the customer\'s specific gaps to the three business outcomes: blocked deployment, integration complexity, and compliance exposure. The APEX Mantra Generator produces a deal-specific mantra from this data.',
        },
        {
          label: 'APEX: Execute',
          title: 'Build the technical case',
          description: 'Map O4AA capabilities (OBO, FGA, Agent Gateway, System Log, CIBA) to the pains uncovered in Probe. The O4AA APEX Product Sales Guide (Highspot) provides the definitive APEX-structured guide for this stage. The Feature-to-Outcome mapping in this app connects each capability to the language leadership cares about.',
        },
        {
          label: 'APEX: Xtend',
          title: 'Expand and reinforce',
          description: 'Use the APEX Reinforcement AI Prompt Gallery for ongoing deal execution. Auth0 Sales Play covers the CIAM-side AI security positioning for customers building agentic applications. Cross App Access and Privileged Credential Management are the natural expansion motions for customers who start with OBO.',
        },
      ],
    },
  ],
};
