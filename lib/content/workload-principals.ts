import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'workload-principals',
  title: 'Workload Principals — Okta\'s First-Class AI Agent Identity',
  description:
    'Deep analysis of Workload Principals (WLPs): Okta\'s purpose-built identity object for registered AI agents in Universal Directory. Covers the wlp_ identifier, API surface, lifecycle governance, XAA token exchange role, and honest comparison against Microsoft Entra Workload Identities, SPIFFE, CyberArk, and NHI startups.',
  tags: ['workload-principals', 'NHI', 'Universal-Directory', 'agent-identity', 'governance', 'API'],
  icon: '👤',
  hasDiagram: true,
  diagramPrompt:
    'Workload Principal identity object in Okta Universal Directory. Show a directory containing human users and WLP agent identities side-by-side. WLP connects to an OIDC app client, which connects to a managed connection governance gate, which connects to a resource API. Use amber/navy palette with a clear governance checkpoint.',
  cards: [
    {
      heading: 'What Are Workload Principals',
      paragraphs: [
        'A Workload Principal (WLP) is Okta\'s first-class identity object for registered AI agents in Universal Directory. Introduced with Okta for AI Agents (EA March 16, 2026; GA April 30, 2026), WLPs give non-human AI agents the same directory citizenship as human users — same governance workflows, same audit trail, same lifecycle management.',
        'The distinguishing marker is the identifier prefix: `wlp_` (e.g., `wlp8x5q7mvH86KvFJ0g7`). This makes WLPs structurally distinct from every other Okta identity type: users (`00u`), apps (`0oa`), groups (`00g`). The prefix is not cosmetic — it is how the system routes governance, certification, and audit events to the correct object type.',
        '!! A WLP is NOT the same as an OIDC app client, a service account, or a generic NHI. Each is a separate layer. The WLP is the directory-layer identity (who is this agent, who owns it, what is its lifecycle state). The OIDC app client is the OAuth-layer identity (what client_id does it use for token requests). The managed connection is the governance-layer control (which resources can it reach, under what scopes). Conflating these layers is the single most common mistake in WLP architecture conversations.',
        'WLPs live under Directory > AI Agents in the admin console — a dedicated section separate from People, Groups, and Service Accounts. This separation is intentional: it gives IT admins a single pane of glass for agent inventory without polluting the human identity namespace.',
        'Lifecycle states follow a staged activation model: STAGED → ACTIVE → INACTIVE. Activation requires a mandatory human owner — at least one individual or a group with two or more members. This ownership constraint is a product-enforced control, not a recommendation. An agent cannot be activated without it.',
      ],
      mermaidDiagrams: [
        {
          title: 'WLP Identity Layers — Directory to Resource',
          code: `graph LR
    subgraph Dir["Universal Directory"]
        WLP["🤖 Workload Principal<br/>wlp8x5q7mvH86KvFJ0g7<br/>ACTIVE | Owner: jane@co"]
    end

    subgraph OAuth["OAuth Layer"]
        APP["OIDC App Client<br/>client_id: 0oa..."]
    end

    subgraph Gov["Governance Layer"]
        MC["Managed Connection<br/>Agent → CRM API<br/>scope: crm.read"]
    end

    subgraph Res["Resource"]
        API["Resource API<br/>(Salesforce CRM)"]
    end

    WLP -->|"authenticates via<br/>private_key_jwt"| APP
    APP -->|"ID-JAG exchange<br/>through"| MC
    MC -->|"scoped access<br/>token"| API

    style Dir fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style OAuth fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style Gov fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style Res fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px`,
          caption: 'Three distinct layers: WLP (directory identity) → OIDC App (OAuth client) → Managed Connection (governance gate) → Resource. The wlp_ ID and the client_id are different identifiers at different layers.',
        },
      ],
    },
    {
      heading: 'WLP vs Other Identity Types',
      paragraphs: [
        'The WLP is one of four identity types used to represent non-human workloads in enterprise environments. Understanding the distinctions matters for architecture conversations — especially when customers already have service accounts, app clients, or third-party NHI tooling in place.',
        'The key differentiators are: enforced human ownership (WLPs require it; others do not), credential type (WLPs use JWKs/private_key_jwt exclusively; others allow static secrets), governance workflow eligibility (WLPs participate in OIG certification campaigns; service accounts and generic NHIs do not), audit granularity (WLPs generate first-class audit events tied to a named owner), and user-context delegation (WLPs can carry a delegated user context through the ID-JAG exchange; service accounts and client credentials cannot).',
      ],
      conceptGrid: [
        {
          label: 'Workload Principal (WLP)',
          text: 'First-class directory object for AI agents. Mandatory human owner. JWK credentials only. Participates in OIG certification and access request workflows. Carries user context through ID-JAG delegation. Identifier: wlp_ prefix. Lifecycle: STAGED → ACTIVE → INACTIVE. Designed for governed AI agent deployments.',
        },
        {
          label: 'OIDC App Client',
          text: 'OAuth-layer identity for any application (human-facing or machine). No enforced ownership. Supports client secrets and JWKs. Does NOT participate in OIG certification campaigns. The client_id in access tokens and ID-JAGs comes from here, not from the WLP. Required as the OAuth client paired with each WLP.',
        },
        {
          label: 'Service Account',
          text: 'Legacy pattern: a user object repurposed for machine authentication. No product-enforced ownership. Often uses passwords or long-lived API tokens. No native governance workflows. Does not support user-context delegation. Common in enterprises pre-WLP — migration target, not a complement.',
        },
        {
          label: 'Generic NHI',
          text: 'Catch-all term for any non-human identity: API keys, bot accounts, machine tokens, third-party integration credentials. No standardized governance model. Discovery tools (ISPM, NHI startups) inventory these but cannot govern them through OIG workflows. The WLP is the replacement identity for any AI agent currently represented as a generic NHI.',
        },
      ],
    },
    {
      heading: 'API Surface — Registration, Lifecycle, and Credentials',
      paragraphs: [
        'The Workload Principals API lives at `/workload-principals/api/v1/ai-agents`. Access requires the `SUPER_ADMIN` role and the `okta.aiAgents.manage` scope (or `okta.aiAgents.read` for read-only operations).',
        'Full CRUD is supported: list agents (with SCIM-style filtering), create, get by ID, update via PUT (full replace) or PATCH (partial update), and delete. Lifecycle operations — activate and deactivate — are separate endpoints, consistent with the pattern used for users and apps throughout the Okta API.',
        '!! Registration returns `202 Accepted`, not `201 Created`. The agent starts in STAGED state. Activation is a separate explicit step — the intent is to force a human review before the agent becomes capable of authenticating. Activation without a valid owner assignment fails with a 400.',
        'Credential management lives under `/ai-agents/{id}/credentials/jwks`. Operations: add a JWK, list all JWKs for an agent, get a specific JWK, activate, deactivate, and delete. One active key per agent at a time is the enforced model. Zero-downtime key rotation is supported: add the new key, activate it, deactivate the old key — the agent can authenticate throughout the rotation. No bulk credential import endpoint exists in the current EA release.',
        'No bulk agent import endpoint exists in EA. For large-scale deployments, use the create API in a loop (Terraform provider is the recommended pattern for IaC management).',
      ],
      timeline: [
        { label: 'Step 1', title: 'Create Agent (POST)', description: 'POST /workload-principals/api/v1/ai-agents with name, description, and owner(s). Returns 202 Accepted. Agent is in STAGED state — cannot authenticate yet.' },
        { label: 'Step 2', title: 'Add JWK Credential (POST)', description: 'POST /ai-agents/{id}/credentials/jwks with a public key in JWK format. The agent holds the private key; Okta stores only the public key for verification.' },
        { label: 'Step 3', title: 'Activate JWK (POST)', description: 'POST /ai-agents/{id}/credentials/jwks/{keyId}/lifecycle/activate. Key is now usable for private_key_jwt authentication.' },
        { label: 'Step 4', title: 'Activate Agent (POST)', description: 'POST /ai-agents/{id}/lifecycle/activate. Requires at least one active JWK and a valid human owner. Agent moves from STAGED to ACTIVE. Can now authenticate and participate in token exchanges.' },
        { label: 'Step 5', title: 'Rotate Key (Zero Downtime)', description: 'Add new JWK → activate new JWK → deactivate old JWK. Agent authenticates with either key during the transition window. No gap in availability.' },
        { label: 'Step 6', title: 'Deactivate Agent (POST)', description: 'POST /ai-agents/{id}/lifecycle/deactivate. Agent moves to INACTIVE. Stops new token issuance immediately. Combine with token revocation for zero-gap termination.' },
      ],
    },
    {
      heading: 'WLPs in the XAA / ID-JAG Token Exchange Flow',
      paragraphs: [
        'Understanding where the WLP\'s identity appears — and where it does not — is essential for debugging token exchange failures and for explaining the architecture accurately to customer security teams.',
        'The WLP authenticates to Okta using a `private_key_jwt` client assertion. The JWT\'s `sub` and `iss` claims reference the OIDC app\'s `client_id`, NOT the `wlp_` identifier. The `wlp_` ID is the directory-layer handle; the `client_id` is the OAuth-layer handle. The IdP uses the `client_id` to look up which WLP is making the request and then checks managed connections for that WLP.',
        '!! The `subject_token` in the ID-JAG exchange is the user\'s ID token — it carries the delegating user\'s identity. The `client_assertion` is the agent\'s signed JWT proving its own identity. The IdP evaluates both: is the user allowed to delegate to this agent (managed connection check), and is the agent who it claims to be (JWK signature verification)?',
        'The resulting ID-JAG is a JWT that can be exchanged for an access token at the resource server\'s token endpoint. The access token carries both the user context (who is being acted upon) and the agent context (who is acting). Resource servers can inspect both claims for fine-grained authorization decisions.',
        '>> Discovery question: "When your AI agent calls a downstream API on behalf of a user, what identity does the resource server see? Today it likely sees the agent\'s service account or API key — no user context at all. With WLPs and XAA, the resource server sees both the agent\'s identity and the delegating user\'s identity in the same token. That\'s the audit trail your compliance team needs."',
      ],
      mermaidDiagrams: [
        {
          title: 'ID-JAG Token Exchange — WLP\'s Role at Each Step',
          code: `sequenceDiagram
    participant U as 👤 User
    participant Agent as 🤖 AI Agent<br/>(WLP + OIDC App)
    participant IdP as 🔐 Okta IdP<br/>(WLP Registry)
    participant RS as 🌐 Resource Server

    Note over U,Agent: Phase 1: User delegates to agent
    U->>Agent: Initiates task<br/>(provides ID token)

    Note over Agent,IdP: Phase 2: Agent proves its identity
    Agent->>Agent: Signs client_assertion JWT<br/>with private key (JWK)<br/>sub/iss = client_id (NOT wlp_ ID)

    Note over Agent,IdP: Phase 3: ID-JAG exchange
    Agent->>IdP: POST /token<br/>grant_type: urn:ietf:params:oauth:grant-type:token-exchange<br/>subject_token: user_id_token<br/>client_assertion: agent_signed_jwt

    Note over IdP: Verifies: JWK signature ✓<br/>Managed connection exists ✓<br/>Scopes allowed ✓<br/>Owner active ✓

    IdP-->>Agent: ID-JAG (JWT with user + agent context)

    Note over Agent,RS: Phase 4: Access token acquisition
    Agent->>RS: POST /token (JWT Bearer grant)<br/>assertion: ID-JAG

    RS-->>Agent: Access token<br/>(scoped to managed connection)

    Note over Agent,RS: Phase 5: Resource call
    Agent->>RS: API call with access token
    RS-->>Agent: Response

    Note right of IdP: wlp_ ID = directory handle<br/>client_id = OAuth handle<br/>Both tracked in audit log`,
          caption: 'The wlp_ identifier governs directory-layer operations (lifecycle, ownership, certification). The client_id governs OAuth-layer operations (token requests, managed connection lookup). They are linked but distinct.',
        },
      ],
    },
    {
      heading: 'Lifecycle and Governance — The Four Phases',
      paragraphs: [
        'WLP governance follows the same four-phase model as all O4AA products: Discover, Onboard, Protect, Govern. For WLPs specifically, each phase has concrete product touchpoints.',
      ],
      labeledCallouts: [
        {
          label: 'MANDATORY OWNERSHIP',
          labelColor: 'amber',
          text: 'A WLP cannot be activated without at least one human owner — either 1-5 named individuals or a group with 2+ members. This is a product constraint enforced at activation time, not an advisory. The recommended posture is 2+ owners to prevent orphaned agents when a single owner departs. Orphaned WLPs — those whose owners have been deprovisioned — surface automatically in OIG certification campaigns.',
        },
        {
          label: 'KILL SWITCH',
          labelColor: 'rose',
          text: 'Deactivating a WLP stops new token issuance immediately. For zero-gap termination: deactivate the WLP AND revoke outstanding tokens via Universal Logout for AI Agents. Deactivation alone stops future authentications; revocation terminates active sessions. Both steps together provide the equivalent of an emergency kill switch for a misbehaving or compromised agent.',
        },
        {
          label: 'CERTIFICATION CAMPAIGNS',
          labelColor: 'blue',
          text: 'OIG certification campaigns now include WLPs alongside human identities. Reviewers are asked: Is this agent still needed? Are its managed connections still appropriate? Is the human owner still the right owner? This closes the governance gap that exists with service accounts and generic NHIs, which are invisible to traditional IGA tools. For orgs with SOX or PCI requirements, WLP certification provides the evidence that non-human access is periodically reviewed.',
        },
      ],
      phaseGrid: [
        {
          phase: '01',
          title: 'Discover',
          icon: 'search',
          accent: 'oklch(0.65 0.15 250)',
          summary: 'ISPM scans for shadow agents across the environment',
          products: ['ISPM', 'SAM Browser Extension', 'Copilot Studio Integration', 'Agentforce Integration'],
        },
        {
          phase: '02',
          title: 'Onboard',
          icon: 'user-plus',
          accent: 'oklch(0.65 0.15 145)',
          summary: 'Register shadow agents as WLPs with mandatory human owners',
          products: ['WLP Registration API', 'JWK Credential Provisioning', 'Universal Directory'],
        },
        {
          phase: '03',
          title: 'Protect',
          icon: 'shield',
          accent: 'oklch(0.65 0.15 30)',
          summary: 'Enforce delegation scope via managed connections; private_key_jwt only',
          products: ['Managed Connections', 'XAA Token Exchange', 'ITP Threat Detection'],
        },
        {
          phase: '04',
          title: 'Govern',
          icon: 'clipboard-check',
          accent: 'oklch(0.65 0.15 320)',
          summary: 'Certification campaigns, access requests, Universal Logout as kill switch',
          products: ['OIG Certification Campaigns', 'Access Request Workflows', 'Universal Logout for AI Agents'],
        },
      ],
    },
    {
      heading: 'WLPs vs Industry NHI Models — Honest Competitive Comparison',
      paragraphs: [
        'WLPs occupy the identity layer of the NHI stack. The competitive landscape is fragmented across four distinct layers: infrastructure attestation, identity management, governance, and discovery. No single competitor covers all four. Okta\'s claim is the unified stack — WLP + OIG + ISPM in one platform.',
        '!! Microsoft Entra Workload Identities (managed identities + service principals) are the closest functional analog. The structural difference: Entra does not enforce ownership. A service principal can exist without a named human owner — and most do. For Microsoft-centric shops, Entra conditional access provides some governance, but there is no OIG-equivalent certification campaign for non-human identities in the native Entra toolset. The Okta case gets strong when the customer has multi-cloud or non-Microsoft workloads.',
        'SPIFFE/SPIRE operates at the infrastructure attestation layer — it proves a workload\'s identity based on where it is running (k8s pod, VM, container), not what it is authorized to do. SPIFFE is complementary to WLPs, not competitive. An enterprise can use SPIFFE for workload attestation at the infrastructure layer and WLPs for identity governance at the directory layer — they serve different purposes.',
        'CyberArk\'s approach is secrets-first: vault the credentials, rotate them, record the sessions. Deep PAM functionality that Okta Privileged Access does not fully match today. But CyberArk has no unified identity directory for AI agents, no OIG-equivalent governance, and no ID-JAG delegation protocol. For customers where PAM is the primary buying motion, CyberArk remains the stronger standalone choice. For customers consolidating identity, WLPs provide the governance layer that CyberArk cannot.',
        'SailPoint provides IGA governance for NHIs — you can run certification campaigns and manage entitlements for machine accounts. But SailPoint does not issue credentials, does not implement an auth protocol, and does not provide real-time token-level control. It governs access at the entitlement layer; WLPs govern access at the identity and authentication layers.',
        'NHI discovery startups (Oasis Security, Astrix Security, Token Security) focus on visibility: find all non-human identities, flag risky ones. They are discovery-only — they surface the problem but do not provide an authoritative identity object, credential lifecycle management, or a governance workflow engine. They are a complement to WLPs in the Discover phase, not a replacement.',
      ],
      mermaidDiagrams: [
        {
          title: 'NHI Stack Layers — Where Each Vendor Plays',
          code: `graph TB
    subgraph L4["Layer 4: Discovery & Visibility"]
        ISPM["Okta ISPM<br/>(shadow agent discovery)"]
        NHIStart["NHI Startups<br/>(Oasis, Astrix, Token Security)<br/>discovery-only"]
    end

    subgraph L3["Layer 3: Governance & Compliance"]
        OIG["Okta Identity Governance<br/>(certification campaigns,<br/>access requests for WLPs)"]
        Sail["SailPoint / Saviynt<br/>(IGA for NHIs — no<br/>credential issuance)"]
    end

    subgraph L2["Layer 2: Identity & Authentication"]
        WLP["Okta Workload Principals<br/>(directory identity,<br/>lifecycle, JWK auth,<br/>ID-JAG delegation)"]
        Entra["Microsoft Entra<br/>Workload Identities<br/>(managed identity +<br/>service principal,<br/>no enforced ownership)"]
        Cyber["CyberArk<br/>(secrets-first PAM,<br/>no unified NHI directory,<br/>no delegation protocol)"]
    end

    subgraph L1["Layer 1: Infrastructure Attestation"]
        SPIFFE["SPIFFE / SPIRE<br/>(workload attestation<br/>by deployment context,<br/>complementary to L2)"]
    end

    L4 -->|"feeds inventory to"| L3
    L3 -->|"governs identities in"| L2
    L2 -->|"authenticates workloads<br/>attested by"| L1

    style L4 fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px
    style L3 fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style L2 fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style L1 fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style WLP fill:#d6ead9,stroke:#5a9a6a,stroke-width:3px
    style OIG fill:#d6ead9,stroke:#5a9a6a,stroke-width:3px
    style ISPM fill:#d6ead9,stroke:#5a9a6a,stroke-width:3px`,
          caption: 'Okta covers layers 2-4 natively (WLP + OIG + ISPM). SPIFFE/SPIRE handles layer 1 infrastructure attestation — complementary, not competitive. Entra covers layer 2 for Microsoft shops without the governance depth of layer 3.',
        },
      ],
    },
  ],
};
