import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'agent-identity',
  title: 'Agent Identity',
  description:
    'Machine identity vs. human-delegated identity, how principal hierarchies work in multi-agent systems, and the discovery questions that open the identity conversation.',
  tags: ['foundations', 'identity', 'delegation', 'discovery'],
  icon: '👤',
  hasDiagram: true,
  diagramPrompt:
    'Vertical trust chain diagram: Human User (top, amber box) → AI Orchestrator (amber) → Sub-Agent (amber) → Protected API (bottom, amber). Downward arrows labeled with identity assertion types (delegated token, scoped token). Okta auth checkpoint icon between Sub-Agent and API. Clean flat style, warm cream background, white background areas, technical diagram aesthetic.',
  cards: [
    {
      heading: 'Machine Identity vs. Human-Delegated Identity',
      paragraphs: [
        'An agent can act in two fundamentally different identity modes, and confusing them is one of the most common mistakes in early agentic architectures. Machine identity means the agent authenticates as itself — it holds credentials issued to it as a service principal, independent of any particular user. This is appropriate for fully autonomous, system-level operations: running a nightly data pipeline, monitoring infrastructure, or performing batch processing tasks that have no per-user context. The credential belongs to the agent, and the agent\'s authorization is defined by what the service principal has been granted.',
        'Human-delegated identity means the agent acts on behalf of a specific human user. The agent\'s actions carry the user\'s identity and are bounded by what that user is permitted to do. This is required any time the agent accesses user-specific data — reading a person\'s calendar, querying their account records, sending email from their address. The agent cannot simply use its own machine credential here; the downstream API needs to know which user authorized this action and what scope of access was granted. Without this delegation chain, you lose accountability: you can see that Agent X accessed the calendar API, but you cannot attribute that action to any specific user authorization.',
        'The identity assertion chain is the concrete question: when the agent\'s tool call arrives at a protected API, how does that API determine who authorized the request and what they were permitted to do? A bare machine credential answers "who is this agent" but not "on whose behalf is it acting." This is where RFC 8693 OAuth 2.0 Token Exchange enters: it provides a standards-based mechanism to issue a new token that binds both the agent\'s identity (the actor) and the user\'s identity (the subject), so the receiving API can verify the complete authorization picture. Okta\'s On-Behalf-Of Token Exchange implementation is the production form of this pattern.',
      ],
      tabs: [
        {
          label: 'Machine Identity',
          content: [
            'The agent authenticates as itself using credentials issued to it as a service principal — independent of any particular user session.',
            'Use cases: nightly data pipelines, infrastructure monitoring, batch processing, scheduled jobs with no per-user context.',
            'The credential belongs to the agent. Authorization is defined entirely by what the service principal has been granted in the authorization server.',
            'Audit trail shows: which agent acted, when, and against which resource — but carries no record of which human (if any) triggered the action.',
            'Risk: a compromised service principal credential grants access until manually revoked, and the blast radius is everything the service principal could access.',
          ],
        },
        {
          label: 'Human-Delegated Identity',
          content: [
            'The agent acts on behalf of a specific human user. The agent\'s actions carry the user\'s identity and are bounded by what that user is permitted to do.',
            'Use cases: reading a user\'s calendar, querying account records, sending email from their address, any operation on user-specific data.',
            'The agent cannot use its own machine credential — the downstream API must know which user authorized the action and what scope was granted.',
            'Audit trail shows: which agent acted, on behalf of which user, with which scoped permissions — full attribution for compliance.',
            'Implemented via RFC 8693 OAuth 2.0 Token Exchange: the resulting token carries both the user\'s identity (sub claim) and the agent\'s identity (cid claim), answering both "who authorized this" and "which agent executed it."',
          ],
        },
      ],
    },
    {
      heading: 'Principal Hierarchy in Multi-Agent Systems',
      paragraphs: [
        'In a multi-agent system, authorization does not flow through a single hop — it traverses a chain: Human User authorizes an AI Orchestrator, the Orchestrator delegates to one or more Sub-Agents, and Sub-Agents call Tools or downstream APIs. At every hop in this chain, a different principal is making the API call, but the action should still be traceable back to the original human authorization. If the chain breaks — if a sub-agent operates with credentials that are not rooted in the user\'s explicit grant — then you no longer have a defensible authorization model.',
        'The confused delegate problem is the most dangerous failure mode in this chain. It occurs when a sub-agent can claim or inherit permissions that the orchestrator never had, or that the user never granted to the orchestrator. If the orchestrator was authorized to read a user\'s calendar but not write to it, a sub-agent operating under the orchestrator\'s delegation should not be able to write to the calendar either. The permission ceiling of any downstream agent is bounded by the authorization of the principal above it in the chain. Without an explicit enforcement mechanism, a misconfigured or compromised sub-agent can silently escalate privilege.',
        'Okta models this through scoped delegation tokens that carry both the original user\'s identity and the agent\'s identity. When a sub-agent requests a token to call a downstream API, Okta can inspect the full delegation chain — user granted orchestrator, orchestrator delegated to sub-agent — and issue a token scoped to only what that sub-agent legitimately needs for that specific call. The receiving API gets a verifiable credential that answers: who is the user, who is the acting agent, what was explicitly authorized, and is this token still valid. For an SE, this is the conversation-stopper when a prospect says "we just use a shared service account for all our agents."',
      ],
      labeledCallouts: [
        {
          label: 'Level 1: Human User',
          labelColor: 'blue',
          text: 'The root of all authorization. The human user is the authorizing principal — every downstream delegation must be traceable back to an explicit grant from a real user. Without a human at the root, there is no accountable authorization chain.',
        },
        {
          label: 'Level 2: AI Orchestrator',
          labelColor: 'blue',
          text: 'The orchestrator receives delegated authority from the human user via an OBO token exchange. It operates with a scoped token bounded by what the user granted — it cannot self-elevate. The orchestrator\'s scope ceiling is the maximum any downstream agent in its chain can receive.',
        },
        {
          label: 'Level 3: Sub-Agent',
          labelColor: 'blue',
          text: 'The sub-agent receives re-delegated authority from the orchestrator. Its permissions are a subset of the orchestrator\'s — never exceeding the orchestrator\'s scope, and never exceeding the user\'s original grant. Each sub-agent has its own distinct identity in Okta\'s Universal Directory.',
        },
        {
          label: 'Level 4: Tool / Downstream API',
          labelColor: 'blue',
          text: 'The protected resource. The API receives a delegated token that carries the full chain context: user identity (sub claim), acting agent identity (cid claim), scope, and expiry. The API validates the token with Okta and can inspect the delegation claims to enforce its own policies on who may call it and under what circumstances.',
        },
      ],
    },
    {
      heading: 'SE Discovery Angle',
      paragraphs: [
        '?? The most productive early question is not "do you have AI agents?" — 91% of organizations are using or building them. The question is: "How do your agents authenticate to internal APIs today?" If the answer is "shared service account" — in one documented case, 23 agents sharing one Salesforce service account were all compromised through a single prompt injection attack. If "we pass the user\'s token" — understand how it\'s stored and what happens when it expires mid-task. If "long-lived API keys" — one customer had embedded Salesforce credentials in a Google Sheets Apps Script. All three answers lead directly to Okta for AI Agents.',
        '>> Common pain points worth surfacing: shared service account credentials used across multiple agents (no isolation, no accountability, blast radius is the entire account\'s permissions); no per-user delegation mechanism (agent acts as itself, not as the user — user-specific data access breaks or is silently unauthorized); no audit trail distinguishing agent actions from human actions (compliance cannot answer "what did the agent do?"); tokens stored in agent memory or environment variables with no rotation (static credentials in a dynamic system). Any one of these is a compelling problem. All four in the same organization is a priority deal.',
        'TT Why this conversation is different from traditional IAM: your prospect has probably already solved human authentication — they have Okta, or a competitor, for their employees. The agentic identity problem is new, and critically, most customers have not consciously recognized it as an identity problem yet. They think of it as a "how do we connect our agent to APIs" problem. Reframing it as an identity and authorization problem — with the compliance, audit, and security implications that follow — elevates the conversation from a developer integration discussion to a CISO-relevant business risk conversation. That reframe is the entry point for a strategic Okta for AI Agents sale.',
      ],
    },
    {
      heading: 'Two Anti-Patterns: How Enterprises Get Agent Identity Wrong',
      paragraphs: [
        'The O4AA Sample Guide identifies two common anti-patterns for how enterprises authenticate AI agents today — both create security gaps that Okta for AI Agents is designed to close. [Source: O4AA Sample Guide v1.6.0]',
        '!! Anti-Pattern 1 — Impersonation: the agent assumes the user\'s full authorization and identity. Many agents serve many users, each impersonating the user who invoked them. The agent acts AS the user rather than ON BEHALF OF the user. The result: broken audit trails (you cannot distinguish agent actions from human actions), privilege escalation risk (the agent inherits all of the user\'s permissions rather than a scoped subset), and interrupted UX (token refreshes and consent flows designed for humans disrupt agent workflows). IT and Security cannot see which resource apps the agent is actually connecting to.',
        '!! Anti-Pattern 2 — Machine/Service Access: the agent is configured as a deterministic service with its own static credentials, limited to the least privilege of the instructing user. This seems safer but introduces different risks: shared service account credentials across multiple agents (one compromise affects all), no per-user attribution in audit logs, and static credentials that persist indefinitely. When these patterns fail, teams compensate by giving agents broader access scopes and longer token lifetimes — turning agents into high-value, persistent attack vectors.',
        'TT "Most enterprises we talk to are in one of two camps: either their agents impersonate users and they have no audit trail, or their agents use shared service accounts and they have no per-user attribution. Both patterns break down under compliance scrutiny. The On Behalf Of model with ID-JAG solves both — the agent acts with the user\'s authorization but maintains its own distinct identity, so every action is attributable to both the requesting user and the acting agent."',
      ],
      mermaidDiagrams: [
        {
          title: 'Two Anti-Patterns vs. the OBO Solution',
          code: `graph TB
    subgraph AP1["Anti-Pattern 1: Impersonation"]
        direction TB
        U1["👤 User A<br/>👤 User B<br/>👤 User C"]
        AG1["🤖 Agent<br/><i>acts AS each user</i>"]
        P1["Full user permissions<br/>No audit distinction"]
        GAP1["❌ Cannot tell agent<br/>actions from human actions"]
        U1 -->|"invokes"| AG1
        AG1 --> P1
        P1 --> GAP1
    end

    subgraph AP2["Anti-Pattern 2: Shared Service Account"]
        direction TB
        AG2A["🤖 Agent 1"]
        AG2B["🤖 Agent 2"]
        AG2C["🤖 Agent 3"]
        SA["Shared Service Account<br/><i>same static credential</i>"]
        GAP2["❌ One compromise =<br/>all agents exposed"]
        AG2A --> SA
        AG2B --> SA
        AG2C --> SA
        SA --> GAP2
    end

    subgraph OBO["Correct Pattern: On-Behalf-Of (OBO)"]
        direction TB
        U3["👤 User"]
        AG3["🤖 Agent<br/><i>distinct identity</i>"]
        OKT["🔐 Okta Token Exchange<br/><i>binds user + agent identity</i>"]
        API3["🌐 API<br/><i>sees both identities</i>"]
        U3 -->|"delegates"| AG3
        AG3 -->|"subject + actor tokens"| OKT
        OKT -->|"scoped delegated token"| API3
    end

    style AP1 fill:#f0e6e6,stroke:#c08080,stroke-width:2px
    style AP2 fill:#f0e6e6,stroke:#c08080,stroke-width:2px
    style OBO fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style GAP1 fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5
    style GAP2 fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5`,
          caption: 'Impersonation breaks the audit trail; shared service accounts create shared blast radius. OBO token exchange is the only pattern that preserves both per-user attribution and a distinct agent identity.',
        },
      ],
    },
  ],
};
