import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'managed-connections',
  title: 'Managed Connections — Deep Analysis',
  description:
    'Honest assessment of XAA managed connections: what they get right (mandatory governance gate, centralized control, inherent audit trail), what falls short (admin bottleneck, connection sprawl, single-domain constraint), and what v2 should look like.',
  tags: ['XAA', 'managed-connections', 'governance', 'analysis', 'enterprise'],
  icon: '🔗',
  hasDiagram: true,
  diagramPrompt:
    'Managed connection governance model: IT Admin box on left creating connections in Okta IdP center. Multiple AI Agent boxes on right connecting through managed connections to Resource API boxes below. Show the governance gate as a checkpoint. Amber/navy palette.',
  cards: [
    {
      heading: 'What Managed Connections Get Right',
      paragraphs: [
        'Managed connections are the governance primitive that differentiates XAA from every other delegation protocol. Four structural advantages make them the right foundation for enterprise agent governance.',
        '!! 1. The governance gate is mandatory, not optional. Without a managed connection, the IdP refuses to issue an ID-JAG. Period. Every other delegation approach (RFC 8693, Entra OBO, client credentials) allows agents to operate without IT admin knowledge. XAA\'s default state is "closed unless explicitly approved." For enterprise security teams, that inversion IS the value proposition.',
        '!! 2. Centralized control at the right layer. Managed connections push the trust decision to the IdP — the one system the enterprise already manages. The alternative (pushing trust decisions to each resource server) means every SaaS vendor, internal API, and MCP server needs its own agent governance. That\'s unrealistic. By centralizing at the IdP, IT admins get a single pane of glass: which agents can talk to which apps, under what scopes, governed by what policies. Revocation is instant — delete the connection, ID-JAG issuance stops.',
        '!! 3. Scope enforcement at issuance, not just validation. Managed connections define allowed scopes before the token exchange happens. The IdP evaluates: does this connection allow these scopes for this agent? If not, the exchange fails. Structurally different from RFC 8693 where scope enforcement happens at the resource server (if it bothers to check).',
        '!! 4. Audit trail is inherent, not additive. Every managed connection event — creation, modification, deletion, and every token exchange through it — is logged in the Okta System Log. The audit trail includes: which admin created the connection, which agent used it, on behalf of which user, with what scopes, at what time. SOX/PCI/HIPAA evidence is a byproduct of the design.',
      ],
      mermaidDiagrams: [
        {
          title: 'Managed Connections Governance Model',
          code: `graph TB
    Admin["🧑‍💼 IT Admin"]

    subgraph Okta["🔐 Okta Identity Provider"]
        MC1["Managed Connection<br/>Agent A → API 1<br/>scope: read"]
        MC2["Managed Connection<br/>Agent A → API 2<br/>scope: read, write"]
        MC3["Managed Connection<br/>Agent B → API 1<br/>scope: read"]
        NONE["❌ No Connection<br/>Agent B → API 2"]
    end

    subgraph Agents["AI Agents"]
        A["🤖 Agent A"]
        B["🤖 Agent B"]
    end

    subgraph Resources["Resource APIs"]
        API1["🌐 API 1<br/>(Salesforce)"]
        API2["🌐 API 2<br/>(Workday)"]
    end

    Admin -->|"creates & governs"| MC1
    Admin -->|"creates & governs"| MC2
    Admin -->|"creates & governs"| MC3
    A -->|"ID-JAG ✓"| MC1 -->|"scoped token"| API1
    A -->|"ID-JAG ✓"| MC2 -->|"scoped token"| API2
    B -->|"ID-JAG ✓"| MC3 -->|"scoped token"| API1
    B -->|"DENIED ✗"| NONE

    style NONE fill:#fff5f5,stroke:#e8a0a0,stroke-dasharray: 5 5
    style Okta fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px`,
          caption: 'No managed connection = no ID-JAG = no access. Agent B cannot reach API 2 because no admin created the connection.',
        },
      ],
    },
    {
      heading: 'Where Managed Connections Fall Short',
      paragraphs: [
        'Six structural shortcomings limit the current managed connections model. These are genuine gaps — not marketing FUD from competitors — that Okta will need to address as enterprise agent deployments scale beyond POC.',
      ],
      labeledCallouts: [
        { label: 'ADMIN BOTTLENECK', labelColor: 'rose', text: 'Every agent-to-app connection requires IT admin pre-configuration. 50 agents × 30 APIs = potentially 1,500 connections to configure and maintain. No self-service request-and-approve workflow exists. Developer workflow becomes: build agent → request from IT → IT reviews → IT configures → developer tests. This kills velocity and is the same friction that drove developers to API keys.' },
        { label: 'N×M CONNECTION SPRAWL', labelColor: 'rose', text: 'The model is 1:1 — one connection between one requesting app and one resource. No concept of "connection groups" or "connection templates" that would let an admin say "all agents in the Sales group can access these 5 APIs with read scope." Each connection is individually configured. Doesn\'t scale without Terraform or API automation.' },
        { label: 'SINGLE TRUST DOMAIN', labelColor: 'rose', text: 'Managed connections only work within a single Okta org (or between Okta orgs with cross-AS trust). Cross-organizational scenarios — your agent calling a partner\'s API through their IdP — fall back to STS brokered consent or vault secrets where the governance model doesn\'t apply with the same rigor. The identity-chaining draft addresses this but isn\'t implemented yet.' },
        { label: 'NO CHAIN VISIBILITY', labelColor: 'amber', text: 'A managed connection authorizes hop 1: Agent → Resource. If that resource delegates to another resource, the connection has no visibility into hop 2. Combined with XAA\'s two-hop limit (spec says IdP MUST NOT re-issue ID-JAGs on previously issued ones), managed connections can\'t govern multi-hop agent pipelines.' },
        { label: 'OKTA-PROPRIETARY', labelColor: 'amber', text: 'The ID-JAG spec defines the token exchange. The managed connections governance layer is Okta\'s implementation on top. If PingFederate or Keycloak implements ID-JAG, they get the exchange but NOT managed connections. The security story ("mandatory admin approval") requires Okta as IdP — it\'s not portable.' },
        { label: 'NO CONDITIONAL LOGIC', labelColor: 'amber', text: 'Connections are static: this agent CAN access this resource with these scopes. No conditional activation like "only during business hours," "only if user risk score is below X," or "only if agent passed ISPM health check." The connection is binary. Runtime risk evaluation happens at ITP/CAEP, not at the connection layer.' },
      ],
      mermaidDiagrams: [
        {
          title: 'The Admin Bottleneck — Developer Workflow Impact',
          code: `sequenceDiagram
    participant Dev as 👩‍💻 Developer
    participant IT as 🧑‍💼 IT Admin
    participant Okta as 🔐 Okta Admin Console
    participant Agent as 🤖 AI Agent

    Note over Dev: Builds new agent feature<br/>that needs API access
    Dev->>IT: "I need my agent to<br/>access the CRM API"
    Note over IT: Reviews request...<br/>(hours to days)
    IT->>Okta: Creates managed connection<br/>(manual Admin Console config)
    Okta-->>IT: Connection active
    IT->>Dev: "It's configured"
    Dev->>Agent: Tests the integration
    Agent->>Okta: Token exchange ✓

    Note over Dev: Needs a second API...
    Dev->>IT: "Now I need Slack API too"
    Note over IT: Another review cycle...

    Note right of Dev: ⚠️ This loop repeats<br/>for EVERY new backend.<br/>50 agents × 30 APIs =<br/>1,500 review cycles.`,
          caption: 'Every new agent-to-API connection requires a full IT review cycle. No self-service path exists today.',
        },
      ],
    },
    {
      heading: 'The Core Tradeoff: Security vs Velocity',
      paragraphs: [
        'The managed connections design reflects a deliberate tradeoff: security over velocity. Every protocol design has to choose a default posture — open-by-default (developer-friendly, security risk) or closed-by-default (secure, developer friction). Managed connections choose closed-by-default.',
        '>> Enterprises with mature change management (financial services, healthcare, government) will embrace this. Their IT teams already operate approval-gated workflows for network access, database credentials, and service accounts. Adding managed connections to that workflow is natural. The governance story is the selling point.',
        '>> Fast-moving dev teams will fight it. Startups, platform engineering teams, and internal AI labs iterate on agent capabilities daily. Requiring IT admin approval for every backend connection is antithetical to their workflow. The admin bottleneck becomes a churn risk — developers will route around managed connections using API keys or vault secrets, defeating the governance model.',
        '?? "How does your organization handle access requests today? Do developers go through an approval workflow for new API access, or do they self-serve? That tells us whether managed connections will feel like natural governance or friction."',
      ],
      mermaidDiagrams: [
        {
          title: 'Default Posture Comparison Across Protocols',
          code: `graph LR
    subgraph Open["Open by Default"]
        CC["Client Credentials<br/>+ API Keys"]
        RFC["RFC 8693<br/>Token Exchange"]
        A2A2["A2A Protocol"]
    end

    subgraph Gated["Admin-Gated"]
        OBO2["Entra OBO<br/>(admin consent)"]
    end

    subgraph Closed["Closed by Default"]
        XAA2["XAA / Managed<br/>Connections"]
    end

    Open -->|"any agent can<br/>connect freely"| Risk["⚠️ Shadow agents<br/>No audit trail"]
    Gated -->|"admin consent<br/>per-tenant"| Partial["⚡ Partial visibility<br/>Microsoft-only"]
    Closed -->|"no connection =<br/>no access"| Secure["✅ Full governance<br/>Full audit trail"]

    style Open fill:#fff5f5,stroke:#e8a0a0
    style Gated fill:#f0ede6,stroke:#c4b99a
    style Closed fill:#e6f0eb,stroke:#80b89a
    style Risk fill:#fff0f0,stroke:#e8a0a0
    style Secure fill:#e6f0eb,stroke:#80b89a`,
          caption: 'XAA is the only protocol with a closed-by-default posture. The security advantage is real — but so is the developer friction.',
        },
      ],
    },
    {
      heading: 'What Managed Connections v2 Should Look Like',
      paragraphs: [
        'Six enhancements would address the current shortcomings while preserving the governance foundation. These are not speculative features — each maps to a pattern already implemented in other parts of the Okta platform.',
      ],
      timeline: [
        { label: 'Enhancement 1', title: 'Self-Service Request Portal', description: 'Developer requests a connection via OIG access request workflow. IT approves/denies with policy-driven auto-approval for low-risk connections. The governance gate stays mandatory — but the workflow becomes async and self-serve instead of requiring admin console access.' },
        { label: 'Enhancement 2', title: 'Connection Templates', description: '"All agents in the Sales group get read access to CRM APIs." Group-based connection policies that apply to classes of agents, not individual 1:1 mappings. Reduces N×M sprawl to N groups × M resource classes.' },
        { label: 'Enhancement 3', title: 'Conditional Activation', description: 'Connection active only when runtime conditions are met: business hours, user risk score below threshold, agent ISPM health check passed. Bridges the gap between static connection approval and dynamic risk evaluation via ITP integration.' },
        { label: 'Enhancement 4', title: 'Cross-Org Federation', description: 'Managed connections that span trust boundaries via identity-chaining (draft-ietf-oauth-identity-chaining-08). Your agent calls a partner\'s API through their IdP, with both organizations\' governance policies enforced.' },
        { label: 'Enhancement 5', title: 'Bulk Management API', description: 'Terraform provider and management API for connections at scale. Import/export connection configs, version control in git, CI/CD deployment. Essential for enterprises managing 100+ connections.' },
        { label: 'Enhancement 6', title: 'Delegation Chain Awareness', description: 'Connections that govern hop 2+ in multi-agent pipelines. When an orchestrator delegates to a specialist that calls a tool, the managed connection policy extends through the full chain — not just the first hop.' },
      ],
      mermaidDiagrams: [
        {
          title: 'Managed Connections v2 — Self-Service + Templates',
          code: `sequenceDiagram
    participant Dev as 👩‍💻 Developer
    participant OIG as 📋 OIG Access Request
    participant Policy as ⚙️ Auto-Approval Policy
    participant Okta as 🔐 Okta
    participant Agent as 🤖 AI Agent

    Note over Dev: Builds new agent feature
    Dev->>OIG: Request: "Agent needs<br/>CRM API read access"
    OIG->>Policy: Evaluate request
    Note over Policy: Low-risk connection?<br/>Agent in Sales group?<br/>Read-only scope?
    alt Auto-approved (matches template)
        Policy-->>OIG: Auto-approved ✓
        OIG->>Okta: Create managed connection
    else Requires review
        Policy-->>OIG: Needs IT approval
        OIG->>OIG: Route to IT admin
    end
    Okta-->>Dev: Connection active
    Dev->>Agent: Test immediately

    Note right of Dev: ✅ Minutes, not days<br/>Governance preserved<br/>Audit trail intact`,
          caption: 'v2 vision: self-service requests with policy-driven auto-approval for low-risk connections, IT review for high-risk ones',
        },
      ],
    },
    {
      heading: 'SE Positioning — How to Talk About the Gaps',
      paragraphs: [
        'SEs will encounter managed connection limitations in technical discovery. Here is how to acknowledge them honestly while maintaining the governance narrative.',
        'TT "You\'re right that managed connections require admin configuration for every agent-to-app pair. That\'s by design — it ensures no agent can connect to a resource that IT hasn\'t explicitly approved. For your initial deployment with 5-10 agents, this is straightforward. As you scale, we recommend automating connection management via the Okta Management API, and the roadmap includes self-service request workflows through OIG."',
        'TT "The single-domain constraint is real — managed connections work within your Okta org. For partner or cross-organizational scenarios, we use STS brokered consent or vault secrets as the bridge today. The identity-chaining standard is progressing through IETF, and cross-org managed connections are on the roadmap. For most enterprise deployments, the internal governance use case is the starting point."',
        '?? "How many AI agents are you planning to deploy in the first phase? If it\'s under 20 agents connecting to under 10 APIs, managed connections are straightforward to configure. If you\'re planning hundreds of agents, let\'s discuss the connection management automation strategy as part of the architecture review."',
      ],
    },
  ],
};
