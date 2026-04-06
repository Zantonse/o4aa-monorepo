import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'o4aa-products',
  title: 'O4AA Product Suite',
  description:
    'Cross App Access (XAA), Auth0 Fine Grained Authorization, Privileged Credential Management, and the Okta MCP Server: the components of Okta for AI Agents and how they secure agentic systems.',
  tags: ['products', 'XAA', 'Auth0-FGA', 'privileged-credential-management'],
  icon: '🔐',
  hasDiagram: true,
  diagramPrompt:
    'Product architecture diagram: four interconnected component boxes labeled Cross App Access, Authorization, Privileged Credential Management, and MCP Server. AI Agent above, Protected APIs below. Amber/cream palette, flat technical illustration, clean white background.',
  cards: [
    {
      heading: 'The O4AA Product Suite',
      paragraphs: [
        'Okta for AI Agents (O4AA) is a set of integrated identity capabilities that address the authentication and authorization challenges unique to agentic AI systems. The core components are: Cross App Access (XAA) for agent-to-app delegation, Auth0 Fine Grained Authorization (FGA) for per-resource access decisions, Privileged Credential Management for secure credential storage and lifecycle management, and the Okta MCP Server for managing the Okta tenant via AI agents. Each solves a distinct problem — but together they form a coherent identity layer for production agent deployments.',
        '!! Cross App Access (XAA) is the foundation. It is a new protocol developed by Okta (and standardized via the IETF as the Identity Assertion JWT Authorization Grant, or ID-JAG) that enables secure, enterprise-governed communication between applications — including AI agents. XAA replaces ad-hoc integration patterns (shared service accounts, raw token forwarding) with a standards-based delegation model where enterprise IT admins control which apps can connect and what they can access. XAA is currently in self-service Early Access — enable it in Admin Console > Settings > Features > Early Access.',
        'Auth0 Fine Grained Authorization (FGA) adds relationship-based access control. Built on the open-source OpenFGA engine (a CNCF incubating project), Auth0 FGA answers "does THIS agent have permission to access THIS specific resource on behalf of THIS user?" — a fundamentally richer question than role-based access control. The managed service is accessed at dashboard.fga.dev with an Auth0 account. Note: Auth0 FGA is branded under Auth0, not Okta Workforce Identity Cloud. SEs selling into WIC-only accounts should understand that FGA requires the Auth0/OCI product surface.',
        'Privileged Credential Management (GA April 30, 2026) and scoped token issuance close the credential security loop. Credential Management is a secure, centralized store for third-party credentials and refresh tokens that agents need during task execution — moving credentials out of agent memory and into Okta-managed infrastructure. Scoped token issuance (via RFC 8693 Token Exchange) mints short-lived, minimally-permissioned tokens for each tool call. Note: Privileged Credential Management and "Scoped Tokens" are capability descriptions, not named SKUs — they refer to the credential management and token narrowing mechanisms within the broader O4AA platform.',
      ],
    },
    {
      heading: 'Auth0 Fine Grained Authorization (FGA)',
      paragraphs: [
        'Auth0 FGA is relationship-based access control: it models permissions not as flat role assignments but as a graph of relationships between users, resources, groups, and actions. Where RBAC asks "does this user have the editor role?", FGA asks "does this user have edit access to this specific document, given the current state of all ownership, sharing, and team membership relationships?" The distinction matters because agents routinely need to access user-specific resources — particular files, specific records, individual calendar entries — not just broad resource categories.',
        'For agentic systems, FGA adds a critical second dimension to every access decision: the agent\'s authority within the delegation chain. A user can grant an orchestrator agent the right to read their project files, but the FGA model enforces that this grant does not extend to payroll files in the same system, even if the user\'s own access to payroll is not restricted. This is particularly important for RAG-based agent systems where the agent queries a document store — FGA filters retrieved documents to only those the specific user is authorized to see, preventing data leakage across users even if the agent\'s search query is broad.',
        '>> Auth0 FGA is a managed service accessed at dashboard.fga.dev. The API endpoint is api.[region].fga.dev. It uses the OpenFGA model language (same SDK for open-source self-hosted and Auth0-hosted versions). A reference implementation of FGA with a Google Drive-style file sharing model is available at oktadev/fga-drive-example. For SE positioning: FGA is the answer to "how do you prevent an agent from accessing more data than the user intended?" It operationalizes least-privilege at the resource level, not just the scope level.',
      ],
    },
    {
      heading: 'Discover / Onboard / Protect / Govern Framework',
      paragraphs: [
        'The Okta AI Agent Security blog series maps the product suite to a four-pillar operational framework that aligns with the product documentation\'s four-phase lifecycle: [Source: Kundan Kolhe, Okta blog Post 7]',
        '!! Note: the blog series references an \'AI Agent Directory\' as a distinct entity alongside Universal Directory. This may be a product name that appears at or after GA (April 30, 2026). Verify against current product documentation before using this terminology in customer conversations.',
      ],
      phaseGrid: [
        {
          phase: '01',
          title: 'Discover',
          icon: 'search',
          accent: 'oklch(0.55 0.20 260)',
          summary: 'Scan agent platforms, detect shadow agents, inventory non-human identities, and flag excessive permissions. The entry point for most O4AA engagements.',
          products: ['ISPM', 'Shadow AI Discovery', 'Browser Plugin'],
        },
        {
          phase: '02',
          title: 'Onboard',
          icon: 'user-plus',
          accent: 'oklch(0.55 0.16 160)',
          summary: 'Give every agent a first-class identity with a named human owner. Lifecycle Management handles request, approval, certification, and deprovision.',
          products: ['Universal Directory', 'Agent Registration', 'Lifecycle Mgmt'],
        },
        {
          phase: '03',
          title: 'Protect',
          icon: 'shield',
          accent: 'oklch(0.60 0.18 85)',
          summary: 'Control what agents can do. Enterprise-governed delegation with scope attenuation, secretless credentials, and per-resource authorization at every action.',
          products: ['XAA', 'Auth0 FGA', 'Token Vault', 'CIBA'],
        },
        {
          phase: '04',
          title: 'Govern',
          icon: 'clipboard-check',
          accent: 'oklch(0.50 0.20 300)',
          summary: 'Audit, review, and respond to agent activity. Cryptographically-bound human consent, access certification, and sub-second token revocation.',
          products: ['OIG', 'ITP', 'Universal Logout', 'Telemetry'],
        },
      ],
    },
    {
      heading: 'Five Properties of AI-Ready Identity',
      paragraphs: [
        'The capstone of the Okta AI Agent Security blog series synthesizes five architectural properties that identity and authorization must have when serving as the substrate for AI security: [Source: Kundan Kolhe, Okta blog Post 7]',
        '>> (1) Provenance — every action traces to an accountable human through the delegation chain, policy, and scope. Implemented via XAA + Token Vault encoding delegation lineage. (2) Attenuation — when a primary agent delegates to a sub-agent, scope decreases, never increases. XAA enforces this structurally through ID-JAG attestation chains. (3) Continuous Evaluation — context shifts, risk changes, intent expires. Auth0 FGA checks permissions at the moment of action, not just at token issuance. (4) Lifecycle Governance — employee leaves, their agents get revoked. Workflow completes, credentials expire. ISPM discovers every agent and assesses risk. (5) Interoperability — XAA is now part of MCP as \'Enterprise-Managed Authorization\', standardizing secure agent connections across domain boundaries. All solutions map to open standards: OAuth 2.1, OIDC, RFC 8693, CIBA, SCIM, Shared Signals Framework, ID-JAG.',
        'TT \'When your CISO asks what AI-ready identity looks like, there are five properties: provenance (trace every action to a human), attenuation (scope narrows at every delegation hop), continuous evaluation (check permissions at time of action, not just at login), lifecycle governance (when someone leaves, their agents die too), and interoperability (open standards, not vendor lock-in). Okta delivers all five through the same platform you already use for SSO and lifecycle management.\'',
      ],
      labeledCallouts: [
        { label: 'PROVENANCE', labelColor: 'blue', text: 'Every action traces to an accountable human through the delegation chain, policy, and scope. Implemented via XAA + Token Vault encoding delegation lineage.' },
        { label: 'ATTENUATION', labelColor: 'blue', text: 'When a primary agent delegates to a sub-agent, scope decreases, never increases. XAA enforces this structurally through ID-JAG attestation chains.' },
        { label: 'CONTINUOUS EVALUATION', labelColor: 'emerald', text: 'Context shifts, risk changes, intent expires. Auth0 FGA checks permissions at the moment of action, not just at token issuance.' },
        { label: 'LIFECYCLE GOVERNANCE', labelColor: 'amber', text: 'Employee leaves, their agents get revoked. Workflow completes, credentials expire. ISPM discovers every agent and assesses risk.' },
        { label: 'INTEROPERABILITY', labelColor: 'blue', text: 'XAA is part of MCP as Enterprise-Managed Authorization. All solutions map to open standards: OAuth 2.1, OIDC, RFC 8693, CIBA, SCIM, ID-JAG.' },
      ],
    },
    {
      heading: '2026 Roadmap: Q2 and Q3+',
      paragraphs: [
        'Based on the Okta for AI Agents 2026 Roadmap (201 deck, March 2026). Note: roadmap items are subject to change. Do not commit to specific dates or capabilities in customer conversations without verifying against the current internal roadmap. [Source: O4AA Supported Access Patterns reference document]',
        '>> Q2 2026 (April-June): IdP for Homegrown Agents (GA) — full GA release of the platform. Secure Agent Access to MCP Servers — agents authenticate to MCP servers through Okta authorization, extending XAA to the MCP protocol surface. Agent Gateway (EA) — manage identities of embedded agents via the Agent Gateway with Okta-mediated policy enforcement. Shadow AI Discovery — discover shadow AI agents via Okta Browser Plugin (ISPM, EA). Manage Agent Identities — manage homegrown AI agents as Workload Principals. Import from Builder Platforms — import homegrown agents from builder platforms into Okta. Secure with User Consent — secure homegrown agents with STS user consent flows. Certify User Access — certify user access to AI agents via OIG. Assess Agent Risk — assess risk of homegrown agents via ISPM.',
        '>> Q3+ 2026 (July onward): Agent-to-Agent (A2A) — support A2A pattern for agent delegation chains (Google ADK, CrewAI, LangGraph, AutoGen), extending XAA identity and scope attenuation across agent-to-agent hops. Registry of Trusted Remote MCP Servers — curated registry of trusted remote MCP servers that agents can connect to. Secure via Customer Gateways — secure agents through customer-managed gateways. Agent Gateway (GA) — full GA of Agent Gateway. Import from Any Source — import agents from any source into Okta. Human-in-the-Loop — CIBA-based approval for agent actions. Kill Switch — terminate rogue agents via global token revocation. Threat Detection — threat detections specifically for AI agent activity patterns. EDR Discovery — discover agents and MCP servers via EDR integrations (ISPM).',
        'TT "When customers ask about the roadmap, the key message is: everything extends from the XAA foundation you can build on today. MCP support, A2A delegation, and the Agent Gateway all use the same ID-JAG token exchange, the same sub + client_id identity model, and the same Okta policy enforcement. Start with XAA now and every future capability is an extension, not a migration."',
      ],
    },
    {
      heading: 'Cross App Access (XAA) — How It Works',
      paragraphs: [
        'Cross App Access defines a three-party trust model: the enterprise IdP (Okta), the requesting application (the AI agent), and the resource application (the API the agent needs to call). The enterprise IT admin creates a "managed connection" in Okta between the requesting and resource apps — this is the governance control that traditional OAuth consent flows lack. The admin decides which apps can connect, what scopes are permitted, and what policies apply.',
        'The technical flow uses the Identity Assertion JWT Authorization Grant (ID-JAG): (1) the requesting app authenticates to Okta via Client Credentials, (2) Okta issues an Identity Assertion JWT — a short-lived, signed assertion that the requesting app has been trusted by the enterprise and that a specific user has authorized the interaction, (3) the requesting app presents this ID-JAG to the resource app\'s authorization server using the JWT Bearer grant type (RFC 7523), (4) the resource app validates the assertion against Okta\'s JWKS endpoint and issues a scoped access token. The resource app never needs to trust the requesting app directly — it trusts Okta, and Okta vouches for the requesting app.',
        '!! For demos and POCs: xaa.dev is a free browser-based playground where anyone can test the XAA flow without local setup. For a full local demo, the oktadev/okta-secure-ai-agent-example repository includes a bootstrap script (pnpm run bootstrap:okta) that automatically creates all required Okta resources: custom authorization server, scopes, OIDC apps, agent identity with RSA keys, and access policies. The demo uses an AI agent (Agent0) accessing a todo app (Todo0) to show the end-to-end XAA flow.',
      ],
      mermaidDiagrams: [
        {
          title: 'XAA / ID-JAG Token Exchange Flow',
          code: `sequenceDiagram
    participant User as 👤 User
    participant Agent as 🤖 AI Agent
    participant Okta as 🔐 Okta IdP
    participant ResAS as 📋 Resource Auth Server
    participant API as 🌐 Resource API

    User->>Agent: Delegates task (ID token)
    Agent->>Okta: Token exchange request<br/>(grant_type=token-exchange,<br/>requested_token_type=id-jag)
    Note over Okta: Validates managed<br/>connection policy
    Okta-->>Agent: ID-JAG (5 min TTL)<br/>sub=user, client_id=agent
    Agent->>ResAS: JWT Bearer grant<br/>(assertion=ID-JAG)
    Note over ResAS: Validates via<br/>Okta JWKS endpoint
    ResAS-->>Agent: Scoped access token
    Agent->>API: Bearer token + API call
    API-->>Agent: Response`,
          caption: 'The four-step XAA flow: User delegates → Okta issues ID-JAG → Resource validates → Agent calls API',
        },
        {
          title: 'O4AA Product Architecture',
          code: `graph TB
    subgraph Enterprise["🏢 Enterprise IT Admin"]
        MC["Managed Connections<br/>Policy Engine"]
    end

    subgraph Discover["Phase 1: Discover"]
        ISPM["ISPM<br/>Shadow AI Discovery"]
    end

    subgraph Onboard["Phase 2: Onboard"]
        UD["Universal Directory<br/>Agent Registration"]
    end

    subgraph Protect["Phase 3: Protect"]
        XAA["XAA / ID-JAG<br/>Delegation"]
        FGA["Auth0 FGA<br/>Fine-Grained Auth"]
        TV["Token Vault<br/>Credential Mgmt"]
        CIBA2["CIBA<br/>Human Approval"]
    end

    subgraph Govern["Phase 4: Govern"]
        OIG["OIG<br/>Access Reviews"]
        ITP["ITP<br/>Threat Detection"]
        UL["Universal Logout<br/>Kill Switch"]
    end

    MC --> XAA
    MC --> UD
    ISPM --> UD
    UD --> XAA
    XAA --> FGA
    XAA --> TV
    CIBA2 -.-> XAA
    OIG --> UD
    ITP --> UL`,
          caption: 'How the six O4AA capabilities connect across the four lifecycle phases',
        },
      ],
    },
  ],
};
