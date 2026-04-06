import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'use-case-patterns',
  title: 'Use Case Patterns',
  description:
    'Common agentic AI deployment patterns and the identity and authorization model each one requires.',
  tags: ['OBO', 'XAA', 'M2M', 'CIBA', 'FGA', 'anti-patterns', 'delegation'],
  icon: '🎯',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'Delegated Access Patterns (OBO/XAA)',
      paragraphs: [
        'Sales Copilot agents read deal history, update Salesforce records, and draft outbound emails on behalf of a specific sales rep. Because the action must be attributed to the rep — not a generic service account — the agent authenticates using On-Behalf-Of (OBO) or Cross-Application Authorization (XAA). The token the agent receives is scoped to that rep\'s permissions and expires with the user\'s session.',
        '?? Discovery question for Sales Copilot: "When your AI agent sends an email from a rep\'s account, how does it authenticate to Gmail? If two reps trigger the same agent simultaneously, does it access the same shared credential or does each rep get a distinct token?" In one documented case, someone was embedding the Salesforce client ID and client secret in a Google Sheets Apps Script that could have been shared broadly.',
        'HR Data Agents access Workday and ADP to retrieve employee records, automate onboarding tasks, and answer HR policy questions. These agents use a mixed authentication model: Client Credentials (M2M) for provisioning workflows that have no user context, and OBO tokens when accessing specific employee PII. Auth0 Fine-Grained Authorization (FGA) is used to filter what the RAG document retrieval layer surfaces — an employee asking a benefits question should not have salary bands or performance reviews included in the retrieved context.',
        '?? Discovery question for HR agents: "When your HR agent queries the document store, how do you prevent it from surfacing salary data to an employee asking a general onboarding question? Is that filtering enforced at the identity layer or only inside the LLM prompt?" In healthcare environments, agents with access to both PHI and non-PHI systems can commingle data in a single session — Auth0 FGA at the resource level is the isolation mechanism.',
        'Customer Service Agents handle support requests on behalf of authenticated end customers in a B2C context, typically built on Auth0 for CIAM. The agent receives a token derived from the customer\'s login session and Auth0 FGA enforces per-customer record access — the agent can only retrieve data belonging to the authenticated customer, not other accounts.',
        '?? Discovery question for B2C customer service: "If a customer asks for a record of everything your AI accessed about them during a support session, can you produce that audit trail on demand to comply with a GDPR Subject Access Request?"',
      ],
      tabs: [
        {
          label: 'OBO Pattern',
          content: [
            'On-Behalf-Of (OBO) — RFC 8693 token exchange where a user-initiated token is the starting point. The agent exchanges the user\'s access token for a new token scoped to a specific downstream service.',
            'Use cases: Sales Copilot accessing CRM/email on behalf of a named rep. HR agent accessing employee PII when the employee is present in the request context. Any scenario where a user session has already been initiated.',
            'Key requirement: a user-initiated token must already exist. Autonomous agents running on client credentials cannot generate OBO tokens — the user must have actively authenticated first.',
            'Auth mechanism: the agent presents the user\'s access_token as the subject_token in an RFC 8693 token exchange request. Okta issues a new access_token scoped to the target resource with the user\'s identity preserved in the sub claim.',
            'Audit output: every downstream action logs both the agent identity (client_id) and the delegating user (sub), creating a two-party attribution chain.',
          ],
        },
        {
          label: 'XAA Pattern',
          content: [
            'Cross-Application Authorization (XAA / ID-JAG) — extends delegation through autonomous agent chains without requiring an active user session at every hop.',
            'Use cases: Multi-step orchestrations where the human authorized the initial action but is not present for each sub-agent call. Financial trading agents executing within a pre-authorized scope. Any chain where the agent acts autonomously but the authorization trace must lead back to a human decision.',
            'Key advantage over OBO: XAA works when the agent operates autonomously — no active user session required at the moment of execution. The human authorization is recorded at initiation; XAA carries that authorization through the chain.',
            'Auth mechanism: ID-JAG (Identity Assertion JWT Authorization Grant). The orchestrator builds a private_key_jwt client assertion attesting that the action was authorized by user X with scope Y. Downstream authorization servers accept the assertion and issue scoped access tokens without requiring a fresh user login.',
            'Audit output: every token in the chain carries the original authorizing user identity, the delegating agent identity, the granted scope, and the session window. Full chain is reconstructible from the System Log.',
          ],
        },
      ],
    },
    {
      heading: 'Machine Identity Patterns (M2M)',
      paragraphs: [
        'IT Automation and Helpdesk Bots handle autonomous tier-1 IT operations: account provisioning, password resets, group membership changes, and ServiceNow ticket updates. These agents authenticate using Client Credentials with Private Key JWT — each agent deployment has its own unique service app identity registered in Okta, with OAuth scopes limited to the specific Admin API operations it needs. High-risk operations such as granting admin roles or disabling MFA require a CIBA async confirmation from an on-call IT admin before the action is executed.',
        'Discovery question for IT automation: "What identity does your helpdesk bot use when it calls the Okta Admin API? Is it a named service account shared with other systems, or does the bot have its own registered application identity with scoped permissions?"',
        'DevOps CI-CD Agents handle pull request review, deployment orchestration, and cloud infrastructure changes across AWS, GitHub, and Kubernetes. The key identity principle is environment isolation: the agent must have separate registered identities for dev, staging, and production environments so that a compromised dev credential cannot be used against production. Production deployment approvals require CIBA confirmation from a senior engineer. The primary risk in this pattern is credential sprawl — a single DevOps agent may need to authenticate to a dozen different API providers, and those credentials are often stored as long-lived secrets in CI/CD environment variables.',
        'Discovery question for DevOps agents: "Could you revoke your DevOps agent\'s access to all downstream systems — AWS, GitHub, Kubernetes, Datadog — in under 60 seconds right now if you detected a compromise?"',
      ],
      labeledCallouts: [
        { label: 'IT Automation / Helpdesk Bots', labelColor: 'blue', text: 'Auth: Client Credentials + Private Key JWT. Each bot gets its own registered application identity in Okta — never shared with other systems. Scopes limited to specific Admin API operations. High-risk actions (grant admin role, disable MFA) require CIBA async confirmation from on-call IT admin before execution.' },
        { label: 'DevOps CI-CD Agents', labelColor: 'blue', text: 'Auth: separate registered identities per environment (dev/staging/prod). A compromised dev credential cannot escalate to production. Production deployments require CIBA sign-off from a senior engineer. Primary risk: credential sprawl across CI/CD env vars — short-lived tokens via Privileged Credential Management address this.' },
        { label: 'Kill Switch Requirement', labelColor: 'amber', text: 'Every M2M agent deployment must have a tested runbook: full credential revocation across all downstream systems in under 5 minutes. Centralized agent identity in Okta Universal Directory means disabling one application propagates to all downstream token issuance — no manual per-API revocation required.' },
      ],
    },
    {
      heading: 'Complex Patterns',
      paragraphs: [
        'Financial Trading Agents combine M2M autonomous execution with mandatory human-in-the-loop authorization. Trades below a defined threshold execute autonomously using DPoP-bound tokens that are cryptographically tied to the agent\'s runtime environment. Trades above the threshold trigger a CIBA async authorization request to a licensed trader; the push notification includes rich context — instrument, quantity, notional value, and the agent\'s reasoning — so the approver has enough information to make an informed decision. Compliance requirements include SOX audit trail, FINRA Notice 24-09 on AI in trading, and the EU AI Act high-risk classification. Separation of Duties is enforced at the identity layer: the agent identity that generates a trade recommendation cannot be the same identity that executes it.',
        'Discovery question for trading agents: "When your algorithm executes a trade, which identity appears in the trade record submitted to the exchange or custodian? Is it traceable back to the specific agent version and the human who authorized it?"',
        'Multi-Agent Orchestrators chain multiple specialized sub-agents together — a research agent, a drafting agent, a code execution agent — to complete complex tasks. Token delegation across the chain uses RFC 8693 Token Exchange: each sub-agent receives a token that is downscoped from the token the orchestrator holds. A sub-agent that only needs read access to a document store should not hold a token that also grants write access to the CRM. This downscoping directly mitigates prompt injection lateral movement: if a malicious document causes a sub-agent to be compromised, the attacker is constrained to the permissions in the sub-agent\'s restricted token and cannot escalate to orchestrator-level permissions.',
        'Discovery question for multi-agent systems: "If a sub-agent takes a destructive action — deletes a record, sends an unauthorized message — can you produce a complete authorization chain audit trail that traces back to the originating user or system that initiated the orchestration run?"',
      ],
      mermaidDiagrams: [
        {
          title: 'RFC 8693 Token Downscoping Chain',
          code: `sequenceDiagram
    participant User as 👤 User
    participant Orch as 🤖 Orchestrator
    participant SubA as 🤖 Sub-Agent A
    participant Tool as 🌐 Tool API

    Note over User,Orch: Full scope delegated to orchestrator
    User->>Orch: Delegates task<br/>scope: crm:read crm:write docs:read docs:write

    Note over Orch,SubA: RFC 8693 Token Exchange — scope narrowed
    Orch->>SubA: Token exchange (RFC 8693)<br/>requested scope: docs:read only
    Note over SubA: Sub-Agent A holds<br/>narrowed token<br/>crm:write REMOVED

    Note over SubA,Tool: Minimal scope at tool boundary
    SubA->>Tool: API call with minimal token<br/>scope: docs:read only
    Tool-->>SubA: Document content (read-only)
    SubA-->>Orch: Result returned

    Note over Orch: Prompt injection in doc?<br/>Attacker constrained to docs:read<br/>Cannot escalate to crm:write`,
          caption: 'Each hop downscopes the token. A compromised sub-agent cannot escalate beyond its restricted permissions.',
        },
      ],
    },
    {
      heading: 'Deployment Anti-Patterns',
      paragraphs: [
        '>> Shared Service Account Credentials: multiple agents share a single credential, which means audit logs record the account name rather than which agent or which user triggered the action. In a documented incident at a financial services firm, 23 different AI agents were sharing one Salesforce service account. A prompt injection attack on one of those agents exposed the data surfaces of all 23 use cases simultaneously. The blast radius of a single compromised credential grows linearly with the number of agents sharing it.',
        'Long-Lived Static Credentials: API keys and OAuth client secrets that never expire, stored as plaintext environment variables or hardcoded in container images, are one of the most common root causes of AI agent breaches. When an engineer who configured the credentials leaves the organization, the credentials remain active — sometimes for years. In one documented case, a long-lived GitHub personal access token was baked into a Docker image layer. Scanning tools discovered it, which led to further credential exposure across Salesforce and Stripe integrations. Credentials should be short-lived, rotated automatically, and never stored in build artifacts.',
        'No Human Ownership: agents are deployed without a formal identity registration in the enterprise\'s IAM system and without a named business owner. When a security incident occurs — an agent behaving unexpectedly, an anomalous API call pattern — there is no clear responder. Security teams cannot escalate, product teams claim the agent belongs to a different team, and the incident response window expands while ownership is being established. Every agent identity should be registered in Okta with an application owner, a cost center, and an on-call contact.',
        'Overbroad Permissions ("Admin for Convenience"): this is OWASP LLM Top 10 item number 6, Excessive Agency. Engineers grant broad permissions during development to avoid debugging permission errors, then those permissions persist to production. In a documented example, an AI research assistant was granted GitHub organization admin to simplify repository access during a proof of concept. A prompt injection attack in a retrieved document escalated through that admin permission and exfiltrated private repositories before the connection between the broad permission and the attack surface was recognized.',
        '>> No Kill Switch: the most operationally dangerous anti-pattern. In a documented incident, a compromised agent was identified within 20 minutes of initial detection. It took 4 hours to fully revoke the agent\'s credentials across 11 different API providers because each provider required a manual process and there was no centralized identity that could be disabled in one action. During that 4-hour window, 340,000 customer records were downloaded. Every agent deployment must have a tested runbook for full credential revocation in under 5 minutes, and all agent identities should be centrally managed through Okta so that disabling the application in one place propagates to all downstream token issuance.',
      ],
      mermaidDiagrams: [
        {
          title: 'Blast Radius: Shared vs Unique Credentials',
          code: `graph LR
    subgraph Dangerous["ANTI-PATTERN: 1 Shared Credential"]
        SC["1 Shared Credential<br/>service-account@corp"]
        A1["🤖 Agent 1<br/>Sales Copilot"]
        A2["🤖 Agent 2<br/>HR Bot"]
        A3["🤖 Agent 3<br/>IT Helpdesk"]
        A4["🤖 Agent 4<br/>Finance Agent"]
        A5["🤖 Agent 5<br/>DevOps Bot"]
        APIS["ALL APIs<br/>CRM + HRIS + Tickets<br/>+ Finance + Infra"]
        BREACH["💥 1 compromise =<br/>ALL 5 exposed"]
        SC --> A1
        SC --> A2
        SC --> A3
        SC --> A4
        SC --> A5
        A1 --> APIS
        A2 --> APIS
        A3 --> APIS
        A4 --> APIS
        A5 --> APIS
        APIS -.-> BREACH
    end

    subgraph Safe["BEST PRACTICE: Unique Credentials"]
        C1["🔑 cred-agent1"]
        C2["🔑 cred-agent2"]
        C3["🔑 cred-agent3"]
        C4["🔑 cred-agent4"]
        C5["🔑 cred-agent5"]
        B1["🤖 Agent 1"]
        B2["🤖 Agent 2"]
        B3["🤖 Agent 3"]
        B4["🤖 Agent 4"]
        B5["🤖 Agent 5"]
        SCOPE["Scoped API only"]
        CONTAIN["✅ 1 compromise =<br/>1 agent contained"]
        C1 --> B1
        C2 --> B2
        C3 --> B3
        C4 --> B4
        C5 --> B5
        B1 --> SCOPE
        SCOPE -.-> CONTAIN
    end

    style Dangerous fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px
    style Safe fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style BREACH fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style CONTAIN fill:#e6f0eb,stroke:#7ab894,stroke-width:2px,stroke-dasharray:5 5`,
          caption: 'Blast radius grows linearly with agents sharing one credential. Unique credentials contain compromise to a single agent.',
        },
      ],
    },
  ],
};
