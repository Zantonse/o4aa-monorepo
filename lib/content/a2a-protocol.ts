import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'a2a-protocol',
  title: 'A2A Protocol',
  description:
    'Agent-to-Agent (A2A) protocol: how AI agents discover and communicate with each other, how it differs from MCP, the identity gap at the agent coordination layer, and how XAA extends to A2A delegation chains.',
  tags: ['A2A', 'agent-to-agent', 'Google', 'protocol', 'multi-agent', 'delegation'],
  icon: '🔀',
  hasDiagram: true,
  diagramPrompt:
    'Two AI agent boxes connected by bidirectional arrows through a central "A2A Protocol" layer. Left agent labeled "Orchestrator Agent" sends task request, right agent labeled "Specialist Agent" returns result. Below both, a shared "Identity & Auth Layer" box with OAuth 2.0, API Keys, mTLS labels. Warm amber and navy palette, flat technical illustration, clean white background.',
  cards: [
    {
      heading: 'What Is A2A and Why It Matters',
      paragraphs: [
        'Agent-to-Agent (A2A) is a protocol that enables AI agents to discover each other, negotiate capabilities, and delegate tasks — agent talking to agent, not agent talking to a tool. Google announced A2A on April 9, 2025 and donated it to the Linux Foundation on June 23, 2025, establishing vendor-neutral governance. As of April 2026, A2A has 23,000+ GitHub stars and 2,300+ forks, with declared support from Google ADK, LangChain, CrewAI, Amazon Bedrock, and Microsoft.',
        '!! The critical distinction: MCP connects agents to tools and data sources (like a USB-C port for AI tooling). A2A connects agents to other agents (like HTTP for agent networks). They are complementary, not competing — Google\'s March 2026 developer guide demonstrates both used together in the same reference architecture. Most production agentic systems will use MCP for tool access and A2A for agent coordination.',
        'A2A is relevant now because enterprise AI deployments are moving from single-agent to multi-agent architectures. An orchestrator agent might delegate a compliance check to a specialist agent, which in turn delegates a data lookup to another agent. Each hop in this chain needs identity, authorization, and an audit trail. A2A defines how agents discover and communicate; it does not yet define how identity propagates through the chain — and that gap is where Okta\'s value proposition lands.',
      ],
    },
    {
      heading: 'How A2A Works — Agent Cards, Tasks, and Artifacts',
      paragraphs: [
        'A2A has three core concepts: Agent Cards for discovery, Tasks for work delegation, and Artifacts for result delivery.',
        '>> Agent Cards — Every A2A-capable agent publishes a JSON document at /.well-known/agent-card.json describing its capabilities, supported input/output formats, and authentication requirements. This is how agents discover each other — an orchestrator reads another agent\'s card to determine if it can handle a specific task. Think of it as a machine-readable resume for AI agents.',
        '>> Tasks — The unit of work in A2A. A client agent sends a task request to a remote agent, which can accept, reject, or negotiate. Tasks have lifecycle states (submitted, working, completed, failed, canceled) and support streaming updates so the calling agent can track progress. Long-running tasks use server-sent events for real-time status.',
        '>> Artifacts — The outputs of completed tasks. An artifact is a structured result (text, files, structured data) that the remote agent returns to the caller. Artifacts are typed and versioned, allowing the calling agent to validate that it received what it expected.',
        '>> Authentication — A2A supports three auth mechanisms: OAuth 2.0 (recommended for enterprise), API Keys (simpler but less secure), and mTLS (mutual TLS for high-security environments). The Agent Card declares which auth methods the agent accepts. The protocol does not mandate a specific identity provider — it defers to OAuth 2.0 for the authorization model.',
      ],
      timeline: [
        { label: 'Step 1', title: 'Discovery', description: 'Client agent fetches the remote agent\'s Agent Card from /.well-known/agent-card.json. Card describes capabilities, auth requirements, and supported formats.' },
        { label: 'Step 2', title: 'Authentication', description: 'Client authenticates using the method specified in the Agent Card — OAuth 2.0 token, API key, or mTLS certificate.' },
        { label: 'Step 3', title: 'Task Delegation', description: 'Client sends a task request with input data. Remote agent can accept, reject, or negotiate terms.' },
        { label: 'Step 4', title: 'Execution & Streaming', description: 'Remote agent works on the task, sending progress updates via SSE. Client can cancel if needed.' },
        { label: 'Step 5', title: 'Artifact Return', description: 'Remote agent returns typed artifacts as results. Client validates output format matches expectations.' },
      ],
      mermaidDiagrams: [
        {
          title: 'A2A Protocol Flow — Discovery, Delegation, and Execution',
          code: `sequenceDiagram
    participant Client as 🤖 Client Agent<br/>(Orchestrator)
    participant Card as 📄 Agent Card<br/>/.well-known/agent-card.json
    participant Remote as 🤖 Remote Agent<br/>(Specialist)

    Note over Client,Card: Phase 1 — Discovery
    Client->>Card: GET /.well-known/agent-card.json
    Card-->>Client: Capabilities, auth requirements,<br/>supported formats

    Note over Client,Remote: Phase 2 — Authentication
    Client->>Remote: Authenticate per Agent Card<br/>(OAuth 2.0 / API Key / mTLS)
    Remote-->>Client: Auth accepted ✓

    Note over Client,Remote: Phase 3 — Task Lifecycle
    Client->>Remote: POST /task — Submit task request<br/>{input data, requested output format}
    Remote-->>Client: Status: submitted → working
    Remote-->>Client: SSE: progress updates (streaming)
    Remote-->>Client: Status: completed

    Note over Client,Remote: Phase 4 — Artifact Return
    Remote-->>Client: Typed artifacts<br/>{text, files, structured data}
    Client->>Client: Validate output format`,
          caption: 'A2A lifecycle: Agent Card discovery → authenticate → submit task → stream progress → receive artifacts',
        },
      ],
    },
    {
      heading: 'MCP vs A2A — When to Use Which',
      paragraphs: [
        'SEs will encounter confusion about whether MCP and A2A overlap or compete. They don\'t — they solve different layers of the agentic architecture.',
        '?? "Are your engineering teams building single-agent or multi-agent systems? If multi-agent, how do the agents discover and authenticate to each other today? Most teams are using ad-hoc REST calls with static API keys between agents — A2A standardizes that, and Okta secures it."',
      ],
      conceptGrid: [
        { label: 'MCP', text: 'Agent → Tool/Data Source. Standardizes how an agent calls a function, reads a database, or accesses an API. The agent is the actor; the MCP server is a passive resource. Analogy: USB-C for AI tooling.' },
        { label: 'A2A', text: 'Agent → Agent. Standardizes how two autonomous agents discover, negotiate, and delegate work to each other. Both sides are active actors. Analogy: HTTP for agent networks.' },
        { label: 'Together', text: 'An orchestrator uses A2A to delegate a task to a specialist agent. That specialist uses MCP to access the tools and data it needs to complete the task. Both protocols in the same call chain.' },
        { label: 'Identity', text: 'MCP has OAuth 2.1 + CIMD + XAA (Enterprise-Managed Authorization) in the spec. A2A has OAuth 2.0, API keys, and mTLS — but no mandatory identity verification for inter-agent calls. The A2A identity gap is larger.' },
      ],
      mermaidDiagrams: [
        {
          title: 'MCP vs A2A — Complementary Protocol Layers',
          code: `graph TB
    User["👤 User"]
    Orch["🤖 Orchestrator Agent"]

    subgraph A2A_Layer["A2A Layer — Agent ↔ Agent"]
        direction LR
        Spec1["🤖 Specialist A<br/><i>Compliance Check</i>"]
        Spec2["🤖 Specialist B<br/><i>Data Analysis</i>"]
    end

    subgraph MCP_Layer["MCP Layer — Agent ↔ Tool"]
        direction LR
        Tool1["🔧 Database<br/><i>MCP Server</i>"]
        Tool2["🔧 Salesforce<br/><i>MCP Server</i>"]
        Tool3["🔧 Slack<br/><i>MCP Server</i>"]
    end

    subgraph Identity["Identity Layer — ❓ Gap"]
        Q1["Who authorized this chain?"]
        Q2["What scope at each hop?"]
        Q3["How to audit the full path?"]
    end

    User -->|"delegates"| Orch
    Orch -->|"A2A task"| Spec1
    Orch -->|"A2A task"| Spec2
    Spec1 -->|"MCP call"| Tool1
    Spec2 -->|"MCP call"| Tool2
    Spec2 -->|"MCP call"| Tool3
    Orch -.->|"needs"| Identity
    Spec1 -.->|"needs"| Identity
    Spec2 -.->|"needs"| Identity

    style A2A_Layer fill:#e8e5f0,stroke:#8b80b8
    style MCP_Layer fill:#e6f0eb,stroke:#80b89a
    style Identity fill:#fff5f5,stroke:#e8a0a0,stroke-dasharray: 5 5`,
          caption: 'A2A handles agent-to-agent orchestration, MCP handles agent-to-tool access. The identity layer connecting them is the unsolved gap.',
        },
      ],
    },
    {
      heading: 'The Identity Gap at the A2A Layer',
      paragraphs: [
        '!! A2A\'s authentication model has a structural gap that SEs should understand and surface in technical conversations. Agent Cards declare auth requirements, but there is no mandatory identity verification mechanism for inter-agent calls. An agent presenting a valid OAuth token proves it has a credential — it does not prove which human authorized the delegation, what scope was intended, or whether that authorization is still valid.',
        'The specific gaps as of April 2026: (1) No delegation chain propagation — when Agent A delegates to Agent B on behalf of User X, A2A has no standard mechanism for Agent B to know it\'s acting on behalf of User X. The actor claim from RFC 8693 is not part of the A2A spec. (2) No scope attenuation — A2A tasks can carry arbitrary metadata but there\'s no enforced mechanism to ensure that delegated agents have narrower permissions than their callers. (3) No centralized audit trail — each agent logs its own actions independently. Reconstructing a full delegation chain across 3+ agents requires correlating logs across systems. (4) No Agent Card identity verification — an agent can publish an Agent Card claiming any capabilities. There is no registry of trusted agents or certificate authority for Agent Cards.',
        'Neither Okta nor any vendor has shipped a comprehensive A2A identity enforcement layer as of this date. This is the largest unaddressed technical gap in the agentic protocol ecosystem. Okta\'s Q3+ 2026 roadmap includes A2A support — extending XAA identity and scope attenuation across agent-to-agent hops for Google ADK, CrewAI, LangGraph, and AutoGen frameworks.',
        'TT "A2A solves agent-to-agent communication — how agents find each other and delegate work. What it doesn\'t solve is the identity chain: when Agent A asks Agent B to do something on behalf of your user, who enforces what Agent B is allowed to do? Who audits the full chain? That\'s the identity layer that sits above A2A, and it\'s what Okta is building with XAA extension to A2A."',
      ],
      labeledCallouts: [
        { label: 'NO DELEGATION CHAIN', labelColor: 'rose', text: 'A2A has no standard mechanism for propagating "on behalf of User X" through agent-to-agent hops. RFC 8693 actor claims are not part of the A2A spec.' },
        { label: 'NO SCOPE ATTENUATION', labelColor: 'rose', text: 'No enforced mechanism ensures delegated agents have narrower permissions than their callers. Scope can expand through the chain.' },
        { label: 'OKTA ROADMAP', labelColor: 'amber', text: 'Q3+ 2026: XAA extends to A2A pattern — ID-JAG token exchange across agent-to-agent hops with scope attenuation at every delegation.' },
      ],
      mermaidDiagrams: [
        {
          title: 'A2A Identity Gaps — What Is Missing Today',
          code: `graph LR
    subgraph Current["A2A Today (April 2026)"]
        U["👤 User X"]
        A["🤖 Agent A<br/><i>Orchestrator</i>"]
        B["🤖 Agent B<br/><i>Specialist</i>"]
        C["🤖 Agent C<br/><i>Sub-specialist</i>"]

        U -->|"delegates"| A
        A -->|"A2A task<br/>OAuth token"| B
        B -->|"A2A task<br/>OAuth token"| C
    end

    subgraph Gaps["❌ Identity Gaps"]
        G1["Agent B doesn't know<br/>it's acting for User X"]
        G2["Agent C's scope can<br/>EXPAND beyond Agent B's"]
        G3["No centralized audit<br/>of the full chain"]
        G4["Agent Cards are<br/>self-declared, unverified"]
    end

    B -.-> G1
    C -.-> G2
    A -.-> G3
    B -.-> G4

    style Current fill:#f5f4f8,stroke:#8b80b8
    style Gaps fill:#fff5f5,stroke:#e8a0a0`,
          caption: 'Four structural gaps in A2A identity: no delegation chain, no scope attenuation, no centralized audit, no Agent Card verification',
        },
      ],
    },
    {
      heading: 'How XAA Extends to A2A',
      paragraphs: [
        'Okta\'s approach to A2A identity uses the same XAA/ID-JAG foundation that already works for agent-to-app (MCP) connections. The architectural principle: every delegation hop — whether agent-to-tool or agent-to-agent — goes through the same Okta-mediated trust exchange. The Q3+ 2026 roadmap items that address A2A specifically:',
        '>> Agent-to-Agent (A2A) support — extend XAA to A2A delegation chains. When an orchestrator agent delegates to a specialist agent, the specialist receives an ID-JAG that carries both the originating user\'s identity (sub) and the calling agent\'s identity (client_id). The specialist can only act within the scope the orchestrator was authorized to delegate. Each hop attenuates scope — it never expands.',
        '>> Registry of Trusted Remote MCP Servers — a curated registry that agents can connect to with pre-established trust. While focused on MCP servers, this registry pattern could extend to A2A Agent Cards, providing a verified directory of trusted agents rather than relying on self-published Agent Cards at /.well-known/ endpoints.',
        '!! Key insight from the O4AA access patterns reference: MCP Server support and A2A are not new access patterns — they are extensions of the XAA foundation to new protocol surfaces. The same ID-JAG delegation model, the same token structure (sub + client_id), and the same Okta policy enforcement apply. Organizations building on XAA today will inherit A2A capabilities as they ship.',
        'TT "When customers ask about A2A, the key message is: everything extends from the XAA foundation you can build on today. A2A delegation uses the same ID-JAG token exchange, the same sub + client_id identity model, and the same Okta policy enforcement. Start with XAA now and A2A capability is an extension, not a migration."',
      ],
      mermaidDiagrams: [
        {
          title: 'XAA Extension to A2A — Scope Attenuation Across Hops',
          code: `sequenceDiagram
    participant User as 👤 User
    participant Orch as 🤖 Orchestrator
    participant Okta as 🔐 Okta IdP
    participant Spec as 🤖 Specialist
    participant API as 🌐 Resource API

    Note over User,Orch: User delegates to orchestrator
    User->>Orch: ID token (full user scopes)

    Note over Orch,Okta: Hop 1 — Orchestrator gets ID-JAG
    Orch->>Okta: Token exchange<br/>scope: read + write
    Note over Okta: Managed connection ✓<br/>Policy: orchestrator allowed
    Okta-->>Orch: ID-JAG #1<br/>sub=user, client_id=orchestrator<br/>scope: read + write

    Note over Orch,Spec: Hop 2 — Orchestrator delegates to specialist
    Orch->>Okta: Token exchange (with ID-JAG #1)<br/>scope: read only
    Note over Okta: Scope attenuation ✓<br/>read ⊂ {read, write}
    Okta-->>Spec: ID-JAG #2<br/>sub=user, client_id=specialist<br/>scope: read ← NARROWED

    Note over Spec,API: Specialist accesses resource
    Spec->>API: Bearer token (read only)
    API-->>Spec: Data (read-only access)

    Note right of Okta: At every hop:<br/>• User identity preserved<br/>• Scope can only narrow<br/>• Okta policy enforced<br/>• Full audit trail logged`,
          caption: 'XAA scope attenuation: user delegates read+write → orchestrator passes read-only to specialist. Scope narrows at every hop, never expands.',
        },
        {
          title: 'A2A + MCP + XAA — Unified Architecture (Roadmap)',
          code: `graph TB
    User["👤 User authenticates"]
    Admin["🧑‍💼 IT Admin<br/>Managed Connections"]

    subgraph Okta["🔐 Okta Identity Platform"]
        MC["Policy Engine"]
        JAG["ID-JAG Issuer"]
        ITP["ITP Threat Detection"]
        UL["Universal Logout"]
    end

    subgraph Agents["Agent Layer"]
        Orch["🤖 Orchestrator<br/><i>Google ADK / LangGraph</i>"]
        SpecA["🤖 Compliance Agent<br/><i>CrewAI</i>"]
        SpecB["🤖 Data Agent<br/><i>AutoGen</i>"]
    end

    subgraph Tools["Tool Layer (MCP)"]
        MCP1["🔧 Salesforce<br/><i>MCP Server</i>"]
        MCP2["🔧 Snowflake<br/><i>MCP Server</i>"]
        MCP3["🔧 Jira<br/><i>MCP Server</i>"]
    end

    Admin -->|"governs"| MC
    User -->|"delegates"| Orch
    Orch -->|"A2A + ID-JAG"| SpecA
    Orch -->|"A2A + ID-JAG"| SpecB
    SpecA -->|"MCP + XAA"| MCP1
    SpecA -->|"MCP + XAA"| MCP3
    SpecB -->|"MCP + XAA"| MCP2

    Orch -.->|"token exchange"| JAG
    SpecA -.->|"token exchange"| JAG
    SpecB -.->|"token exchange"| JAG
    ITP -.->|"anomaly → revoke"| UL

    style Okta fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Agents fill:#e6f0eb,stroke:#80b89a
    style Tools fill:#f0ede6,stroke:#c4b99a`,
          caption: 'Roadmap vision: A2A for agent orchestration + MCP for tool access + XAA/ID-JAG for identity at every hop — all governed by Okta',
        },
      ],
    },
    {
      heading: 'Protocol Proliferation — The Developer\'s Dilemma',
      paragraphs: [
        'SEs should be aware that developers building multi-agent systems face a confusing protocol landscape. Google\'s March 2026 developer guide alone covers six protocols: MCP, A2A, UCP, AP2, A2UI, and AG-UI. IBM\'s ACP (Agent Communication Protocol) is also under the Linux Foundation. Each solves a different layer, and the consolidation trajectory is still unclear.',
        '>> The emerging consensus (as of April 2026): MCP + A2A as the core pair. MCP for agent-to-tool, A2A for agent-to-agent. The specialized protocols (AG-UI for agent-to-user-interface, UCP for unified compute) are layer-specific additions. Most enterprises will only encounter MCP and A2A in their first agentic deployments.',
        'Developer community sentiment is consistent across Hacker News and r/mcp: "The abstraction is right but the implementation is immature." The identity layer is the most frequently cited gap — developers building multi-agent systems are solving auth with bespoke middleware because no standard exists for propagating user identity through agent-to-agent chains.',
        '?? "How many protocols are your engineering teams integrating today? If they\'re building multi-agent systems, they\'re likely solving MCP for tool access and ad-hoc REST for agent-to-agent. A2A standardizes the agent-to-agent layer. Okta secures both layers with the same identity model."',
      ],
      mermaidDiagrams: [
        {
          title: 'Agentic Protocol Stack — What Solves What',
          code: `graph TB
    subgraph UI["User Interface Layer"]
        AGUI["AG-UI<br/><i>Agent-to-UI streaming</i>"]
        A2UI["A2UI<br/><i>Agent-to-User Interface</i>"]
    end

    subgraph Coordination["Agent Coordination Layer"]
        A2A2["A2A<br/><i>Agent-to-Agent</i><br/>Tasks, Artifacts, Cards"]
        ACP["ACP (IBM)<br/><i>Agent Communication</i>"]
    end

    subgraph ToolAccess["Tool Access Layer"]
        MCP2["MCP<br/><i>Agent-to-Tool</i><br/>Resources, Prompts, Tools"]
    end

    subgraph Identity["Identity & Auth Layer"]
        XAA2["XAA / ID-JAG<br/><i>Enterprise delegation</i>"]
        OAuth["OAuth 2.1<br/><i>Standard auth</i>"]
        SPIFFE2["SPIFFE<br/><i>Workload identity</i>"]
    end

    subgraph Infra["Infrastructure Layer"]
        UCP["UCP<br/><i>Unified Compute</i>"]
    end

    UI --> Coordination
    Coordination --> ToolAccess
    ToolAccess --> Identity
    Identity --> Infra

    style UI fill:#f0ede6,stroke:#c4b99a
    style Coordination fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style ToolAccess fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style Identity fill:#e8e5f0,stroke:#8b80b8
    style Infra fill:#f5f4f8,stroke:#c4bdd8`,
          caption: 'Emerging consensus: MCP + A2A as the core pair, with XAA as the identity layer securing both. UI and infrastructure protocols are layer-specific additions.',
        },
      ],
    },
  ],
};
