import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'mcp-adapter',
  title: 'Agent Gateway & Okta MCP Server',
  description:
    'The Okta Agent Gateway is a self-hosted OAuth 2.1 authorization gateway for MCP — a 7-layer proxy pipeline that brokers token exchange between AI agents and backend MCP servers, with 8 auth methods, per-agent ACLs, and full audit trail.',
  tags: ['products', 'MCP', 'ProServ', 'architecture', 'GA', 'MCP-gateway', 'market'],
  icon: '🔌',
  hasDiagram: true,
  diagramPrompt:
    'Technical architecture diagram: MCP clients on left (Claude Code, Cursor, Copilot), a central gateway box labeled Adapter with 7 numbered internal layers (Transport, Auth, Authz, Routing, Token Exchange, Cache, Proxy), and backend MCP servers on right (HR, Finance, GitHub, Vault). Arrows flow left to right through the gateway. Clean professional style, blue and white palette.',
  cards: [
    {
      heading: 'Executive Summary: The MCP Adapter',
      paragraphs: [
        'Third-party AI agents and coding assistants — Claude Code, Glean, GitHub Copilot, Devin, Cursor — cannot be configured today to participate in Okta\'s XAA flows. They are locked into their own auth stacks or use no standardized auth at all, so enterprises end up connecting them to internal MCP servers (Jira, ServiceNow, etc.) with zero identity security guardrails. The result: no audit trail, no access policy enforcement, and no visibility for IT admins. The enterprise IdP is bypassed entirely for a growing class of agent activity.',
        '!! The Okta MCP Adapter sits between the agent and the MCP servers, brokers the token exchange with Okta, and restores XAA-level security without requiring code or architectural changes to the agent or the MCP server. It acts as a secure intermediary between agents and backend systems, eliminating credential sprawl and ensuring full auditability for every tool call. Delivered as a self-hostable, containerized solution, it closes this gap without placing any burden on the vendors building these agents or the teams operating them.',
        '>> The problem — AI agents as an attack surface: (1) Credential Sprawl: secrets are often hardcoded in local agent configs or env vars. (2) Auth Translation Gap: agents struggle with varying backend requirements (OAuth, Basic Auth). (3) Audit Blindness: no unified log tracking user/agent access to backend data. (4) No Granular Control: access is typically all-or-nothing across the agent fleet.',
        '>> Why this matters — what the Adapter delivers: 0 secrets exposed (agents never see backend credentials, only short-lived tokens). 100% auditability (every action is logged and attributable to a specific user and agent). 1 login, N backends (MFA once to access all authorized tools). Minimal onboarding (connect a new backend with one API call and one access mapping).',
      ],
      image: 'diagrams/mcp-adapter-solution.png',
      labeledCallouts: [
        { label: 'The Problem', labelColor: 'rose', text: 'Claude Code, Cursor, Copilot, and Glean cannot participate in Okta XAA flows today. They connect directly to internal MCP servers with no auth guardrails — no audit trail, no access policy, no IT visibility. The enterprise IdP is bypassed entirely for a growing class of agent activity.' },
        { label: 'The Solution', labelColor: 'emerald', text: 'The Okta Agent Gateway sits between the agent and every MCP backend. Brokers token exchange with Okta. No code changes required in the agent or the MCP server. Self-hostable, containerized. Agents never see backend credentials — only short-lived tokens scoped to the specific tools they\'re authorized to call.' },
        { label: 'Key Metrics', labelColor: 'blue', text: '0 secrets exposed to agents. 100% auditability per tool call. 1 MFA login grants access to all authorized backends. New backend onboarded with one API call and one access mapping. Credential revocation propagates to all downstream systems in one action.' },
      ],
    },
    {
      heading: 'Architecture & Deployment',
      paragraphs: [
        'The Agent Gateway is a Python/FastAPI application packaged as a Docker bundle. It consists of 5 services: the Gateway (port 8000), PostgreSQL (config, agents, audit log — AES-256-GCM encrypted credentials), Redis (token cache, session cache, pub/sub event bus), an Admin UI (Next.js on port 3001), and an observability stack (Grafana + Loki + Promtail on port 3000). It deploys on AWS EC2 with ALB + HTTPS. The current demo package is okta-mcp-aws-0.12.1.',
        'The adapter acts as a Backend-for-Frontend (BFF) for a seamless agent experience. Agent Support: native integration with agents like Claude Code, Cursor, and Copilot. Flow: Discovery → PKCE Login (Okta MFA) → Token Exchange → Proxied MCP Calls. Security: AES-256-GCM encryption, non-root containers, and read-only filesystems.',
        '>> Roadmap: Now — per-backend scoped tokens, PostgreSQL storage, HR System examples. Next — Admin UI Dashboard, Level 2 Caching, Service Account patterns. Later — Policy engine (OPA/FGA), SIEM streaming, and human-in-the-loop workflows.',
      ],
    },
    {
      heading: 'Spotify Proof Point and the Zero Trust Agent Problem',
      image: 'diagrams/zero-trust-agents.png',
      paragraphs: [
        'The Product Brief for the AI Gateway (Confluence, October 2025) establishes the architectural case with a concrete proof point: Spotify, working with Auth0 and Okta, deployed this gateway architecture to securely manage access for agents across all their enterprise resources. The architecture was demoed at Oktane 2025 in the session "AI Agents That Just Work: Unlocking MCP for the Enterprise." [Source: Confluence Product Brief: AI Gateway for MCP]',
        '!! The "5 million breach surfaces" calculation: for an enterprise with 10,000 employees, 5 popular AI agents, and 100 SaaS services, there are now 5 million potential places to watch for a breach (employees x agents x services). Each agent holds roughly the same level of access as the employee\'s unlocked laptop, at all times. Unlike a human who actively uses applications in sessions, AI agents maintain persistent credential access — an attacker who can influence the agent via prompt injection has the equivalent of an unlocked laptop with all applications logged in.',
        '>> The Product Brief identifies four enterprise requirements for zero-trust AI agents: (1) Visibility — which agent has access to which application, on whose behalf. (2) Auditability — which agent did what, where, when, on whose behalf. (3) Controls — ability to allow/disallow agents, revoke granted access. (4) Trust — any enterprise-wide system must be high trust and assurance. The Agent Gateway centralizes all four into a single control plane — just as Okta centralizes human identity governance today.',
        'TT "The Spotify proof point is the most powerful asset we have. They are a real enterprise customer who deployed this exact architecture. When a prospect says \'has anyone actually done this?\' — yes, Spotify did, with Auth0 and Okta, and they presented it at Oktane."',
      ],
      labeledCallouts: [
        { label: 'Spotify Proof Point', labelColor: 'blue', text: 'Spotify deployed the Agent Gateway architecture with Auth0 and Okta to secure agent access across all enterprise resources. Presented at Oktane 2025: "AI Agents That Just Work: Unlocking MCP for the Enterprise." Source: Confluence Product Brief (October 2025). Use this when prospects ask "has anyone actually deployed this?"' },
        { label: '5M Breach Surfaces', labelColor: 'amber', text: 'For an enterprise with 10,000 employees, 5 AI agents, and 100 SaaS services: 5 million potential breach surfaces (employees × agents × services). Each agent holds persistent credential access equivalent to an unlocked laptop — no active session required for an attacker to exploit via prompt injection.' },
        { label: '4 Enterprise Requirements', labelColor: 'emerald', text: 'Visibility (which agent accesses which app, on whose behalf). Auditability (which agent did what, when, for whom). Controls (allow/disallow agents, revoke access). Trust (high-assurance system). The Agent Gateway centralizes all four into one control plane.' },
      ],
    },
    {
      heading: 'PRD: Relay Architecture and Policy Engine',
      image: 'diagrams/policy-engine.png',
      paragraphs: [
        'The PRD for Relay (the engineering name for the Agent Gateway) defines a comprehensive gateway architecture with capabilities beyond the current ProServ adapter package. Key additions in the PRD scope: Virtual Server abstraction (logical MCP endpoints that aggregate tools from multiple upstream sources with per-server OAuth audience isolation), a 3-tier policy engine (standard policies with tool allowlists + Cedar policies for attribute-based access control + FGA relationship-based authorization), and 41+ native SaaS connectors (Slack, GitHub, Google Workspace, Linear, Notion, Stripe, Salesforce, etc.) that work without deploying separate MCP servers. [Source: Confluence PRD - Relay: MCP Gateway for Okta]',
        '>> Policy engine capabilities (from the PRD): Standard policies — tool allowlists, required Auth0 roles, client IP ranges. Cedar policies — attribute-based access control using any combination of client metadata, user identity, tool name, tool arguments, time of day, and client IP. FGA policies — relationship-based authorization (e.g., "user X is a member of team Y which has editor access to project Z"). Policies evaluate in first-match-wins order: standard → Cedar → FGA. Every policy decision is logged to the audit trail with the specific policy that granted or denied access and the denial reason code.',
        '!! An FGA hackathon (October 2025) demonstrated the policy engine protecting against real attack vectors: FGA limited which email domains an agent could send to (preventing data exfiltration via email MCP), and restricted GitHub issue access based on whether the requestor was in working hours. These are the kind of fine-grained, context-aware policies that no competing MCP gateway offers today. [Source: Confluence #tmp-hacktober-mcp-gw]',
        '>> PRD open questions SEs should be aware of: (1) Session model for stateless vs. stateful MCP clients — how do session timeouts interact with long-running agent tasks? (2) Rate limiting defaults per virtual server and per tool. (3) PII in audit logs — should tool arguments/results be logged in full or redacted? (4) Handling partial failures when one upstream MCP server is down. These are areas where the product is still evolving — do not commit to specific behavior in customer conversations.',
      ],
    },
    {
      heading: 'The 7-Layer Proxy Pipeline',
      image: 'diagrams/agent-gateway-pipeline.png',
      paragraphs: [
        'Every MCP request passes through a deterministic 7-layer pipeline. Each layer has a single responsibility and can be independently tested. This is the core architecture — understanding it is essential for SE conversations about how the Agent Gateway works.',
        'Layer 1 — Transport: handles Streamable HTTP and MCP JSON-RPC dispatch. Accepts POST requests to the unified handler and routes based on path. Layer 2 — Authentication: validates the agent\'s JWT against Okta JWKS. Supports Client ID Metadata Documents (CIMD) for token lookup via Confidential Relay, and resolves the client through the registry (pre-registered, CIMD, or DCR). Layer 3 — Authorization: resolves the agent identity from the X-MCP-Agent header (or falls back to token aud/cid), then enforces the agent\'s resource_access ACL — the list of backend resources this specific agent is permitted to call.',
        '>> Layer 4 — Routing: parses the tool namespace ({resource}__{tool}) to determine which backend MCP server handles this call. Resolves the resource config from the ResourceStore (merging database config with OktaConnectionSyncer data). Layer 5 — Token Exchange: the ResourceTokenResolver dispatches to one of 8 authentication methods based on the resource\'s configured auth_method. This is where the Agent Gateway obtains the correct outbound credential for the backend.',
        'Layer 6 — Cache: two-tier caching (L1 memory with 30s TTL, L2 Redis with configurable TTL). Cache key is user_id:resource_name. Implements 60-second early refresh to avoid token expiry mid-call. Layer 7 — Proxy: injects the obtained credentials into the outbound request, forwards the JSON-RPC call to the backend MCP server via httpx async, parses SSE responses, handles 401 retry with cache invalidation, and manages MCP session state.',
      ],
      mermaidDiagrams: [
        {
          title: 'The 7-Layer Proxy Pipeline',
          code: `sequenceDiagram
    participant C as 🤖 MCP Client
    participant L1 as Layer 1<br/>Transport
    participant L2 as Layer 2<br/>Auth
    participant L3 as Layer 3<br/>Authz
    participant L4 as Layer 4<br/>Routing
    participant L5 as Layer 5<br/>Token Exchange
    participant L6 as Layer 6<br/>Cache
    participant L7 as Layer 7<br/>Proxy
    participant B as 🌐 Backend<br/>MCP Server

    C->>L1: MCP tool call (HTTP POST)
    Note over L1: Streamable HTTP dispatch<br/>JSON-RPC parsing

    L1->>L2: Parsed request
    Note over L2: JWT validation (Okta JWKS)<br/>Client registry lookup<br/>(pre-reg / CIMD / DCR)

    L2->>L3: Authenticated identity
    Note over L3: resource_access ACL check<br/>Agent allowed to call<br/>this resource?

    L3->>L4: Authorized request
    Note over L4: Parse tool namespace<br/>{resource}__{tool}<br/>Resolve resource config

    L4->>L5: Resource config
    Note over L5: ResourceTokenResolver<br/>Dispatches to 1 of 8<br/>auth methods

    L5->>L6: Resolved credential
    Note over L6: Check L1 memory (30s TTL)<br/>Check L2 Redis cache<br/>60s early refresh

    L6->>L7: Outbound credential
    Note over L7: Inject credential header<br/>Forward JSON-RPC<br/>Parse SSE response

    L7->>B: Authenticated tool call
    B-->>L7: Tool result
    L7-->>C: MCP response`,
          caption: 'Every MCP request passes all 7 layers sequentially. Each layer has one job and cannot be bypassed.',
        },
      ],
    },
    {
      heading: '8 Authentication Methods',
      image: 'diagrams/eight-auth-methods.png',
      paragraphs: [
        'The ResourceTokenResolver at Layer 5 is the single entry point for obtaining auth headers for any backend resource. It dispatches to one of 8 methods based on the resource\'s configured auth_method. This is where the Agent Gateway\'s flexibility comes from — it can broker access to XAA-protected resources, Okta STS-brokered ISV apps, Okta Privileged Access vault secrets, and legacy systems with basic auth, all through the same pipeline.',
        'okta-cross-app: the primary method. Uses ID-JAG (RFC 8693 + RFC 7523) via the Okta SDK CrossAppAccessFlow. The Agent Gateway builds a private_key_jwt client assertion, exchanges it at the Okta token endpoint for an ID-JAG assertion, then presents the assertion to the target authorization server for a scoped access token. Agent private keys are stored AES-256-GCM encrypted in PostgreSQL. okta-sts: RFC 8693 token exchange via the Okta ORG authorization server with brokered user consent — designed for ISV app integrations where the user must explicitly consent before the agent can access their data.',
        'vault-secret: RFC 8693 with a special requested_token_type (urn:okta:...:vaulted-secret) that retrieves secrets from Okta Privileged Access (OPA). The Agent Gateway injects the retrieved secret as a Bearer token or X-API-Key header. sts-service-account: same OPA vault flow but returns username/password for systems requiring HTTP Basic Auth. pre-shared-key: static API key stored encrypted in the resource config, injected as an X-API-Key header. service-account: HTTP Basic Auth with encrypted username/password. bearer-passthrough: forwards the user\'s BFF-captured id_token directly to the backend (for resources that trust the Okta id_token natively).',
        'TT For SEs: the 8-method architecture is the key differentiator in conversations about heterogeneous backend environments. Customers rarely have all-OAuth backends. They have a mix of XAA-capable services, legacy APIs with API keys, vault-managed secrets, and ISV SaaS apps requiring user consent. The Agent Gateway handles all of these through a single gateway — the agent authenticates once, and the Gateway translates that identity into whatever credential each backend needs.',
      ],
      accordion: [
        {
          title: 'okta-cross-app — Primary XAA Method (ID-JAG)',
          content: [
            'The primary method for XAA-capable backends. Uses ID-JAG (RFC 8693 + RFC 7523) via Okta SDK CrossAppAccessFlow.',
            'Flow: Gateway builds a private_key_jwt client assertion → exchanges at Okta token endpoint for an ID-JAG assertion → presents assertion to target authorization server for a scoped access token.',
            'Agent private keys stored AES-256-GCM encrypted in PostgreSQL. Keys never leave the Gateway — agents hold only an id_token.',
            'Use when: the target backend is an Okta-integrated app with its own authorization server.',
          ],
        },
        {
          title: 'okta-sts — ISV App Token Exchange with User Consent',
          content: [
            'RFC 8693 token exchange via the Okta ORG authorization server with brokered user consent.',
            'Designed for ISV app integrations where the user must explicitly consent before the agent can access their data.',
            'Use when: a third-party SaaS app (e.g., Salesforce, ServiceNow) requires an explicit user consent screen before granting the agent access.',
          ],
        },
        {
          title: 'vault-secret — OPA Secret Retrieval',
          content: [
            'RFC 8693 with a special requested_token_type (urn:okta:...:vaulted-secret). Retrieves secrets from Okta Privileged Access (OPA).',
            'Gateway injects the retrieved secret as a Bearer token or X-API-Key header to the backend.',
            'Use when: the backend requires an API key or bearer token managed in OPA. No long-lived secrets in agent config or env vars.',
          ],
        },
        {
          title: 'sts-service-account — OPA Vault → HTTP Basic Auth',
          content: [
            'Same OPA vault flow as vault-secret but returns username/password for systems requiring HTTP Basic Auth.',
            'Use when: the backend only supports Basic Auth (legacy systems, on-prem tools). Credentials are vaulted in OPA, not stored in the agent config.',
          ],
        },
        {
          title: 'pre-shared-key — Static API Key (Encrypted)',
          content: [
            'Static API key stored encrypted in the resource config. Injected as an X-API-Key header on every request.',
            'Use when: the backend has a static API key with no rotation mechanism. The Gateway encrypts it at rest — agents never see the raw key value.',
            'Note: this is the lowest-security method. Prefer vault-secret for any backend that supports OPA integration.',
          ],
        },
        {
          title: 'service-account — HTTP Basic Auth (Encrypted)',
          content: [
            'HTTP Basic Auth with encrypted username/password stored in the resource config.',
            'Use when: the backend requires Basic Auth and OPA vaulting is not yet configured.',
            'Note: rotate credentials regularly. Upgrade to sts-service-account (OPA-vaulted) when available.',
          ],
        },
        {
          title: 'bearer-passthrough — Forward Okta id_token Directly',
          content: [
            'Forwards the user\'s BFF-captured id_token directly to the backend as a Bearer token.',
            'Use when: the backend trusts the Okta id_token natively and performs its own JWT validation.',
            'Simplest method for Okta-native internal services that already validate Okta tokens.',
          ],
        },
        {
          title: '(8th Method) — Custom / Extensible',
          content: [
            'The ResourceTokenResolver is extensible. Custom auth handlers can be added for backends with non-standard authentication requirements.',
            'Examples: digest auth, AWS SigV4, HMAC-signed requests, or proprietary enterprise auth schemes.',
            'Implemented as part of the Professional Services engagement when standard methods do not cover the customer\'s backend stack.',
          ],
        },
      ],
    },
    {
      heading: 'BFF Pattern and Client Registration',
      image: 'diagrams/bff-pattern.png',
      paragraphs: [
        'The Agent Gateway operates as a Backend-for-Frontend (BFF) OAuth proxy. MCP clients never talk directly to Okta. The Gateway intercepts the OAuth discovery endpoint (.well-known/oauth-protected-resource) and the token endpoint, rewrites access_token = id_token for downstream ID-JAG exchange, and stores refresh_tokens server-side in the UserTokenStore. This means the MCP client (Claude Code, Cursor, etc.) only ever holds an id_token — never a refresh_token or a downstream access_token. Credential exposure risk is minimized.',
        'Client registration follows a 4-strategy priority chain. Priority 1 — Pre-Registration: the admin imports an agent from Okta via the Admin UI. The agent record maps to an Okta OIDC app. Priority 2 — CIMD (Client ID Metadata Documents): the MCP client presents a URL-based client_id, the Gateway fetches the metadata (SSRF-safe, 5s timeout, 50KB max), validates the schema and trust policy, matches to an imported agent via the client registry, and proxies OAuth using per-agent Okta credentials. Priority 3 — DCR (Dynamic Client Registration, RFC 7591): new MCP clients register dynamically. The admin links the DCR client to an existing imported agent via an agent selection page, inheriting that agent\'s Okta app credentials. Priority 4 — Fallback: 401 with WWW-Authenticate + resource_metadata URI.',
        'The Dual Identity Plane is the architectural key: the Agent Gateway is simultaneously an OAuth Authorization Server (to inbound MCP clients) and an OAuth Client (to outbound backends). The Client Registry resolves inbound identity. The ResourceTokenResolver + outbound auth handlers resolve outbound credentials. This separation means adding a new backend auth method doesn\'t affect how clients authenticate, and adding a new client registration strategy doesn\'t affect how backends are accessed.',
      ],
    },
    {
      heading: 'Okta MCP Server (Tenant Management)',
      paragraphs: [
        'Distinct from the Agent Gateway, the Okta MCP Server (github.com/okta/okta-mcp-server, Apache 2.0) is a shipped, open-source MCP server that exposes Okta Admin Management APIs to LLMs. It lets AI agents manage the Okta tenant itself — create users, manage groups, pull system logs, manage applications and policies — via natural language through Claude Desktop, VS Code, or any MCP-compatible client.',
        'Auth supports two modes: Device Authorization Grant (interactive, browser login) and Private Key JWT (headless, RSA 2048-bit key pair). For destructive operations the server implements the MCP Elicitation API — clients with MCP SDK >= 1.26 get a confirmation dialog; older clients get a JSON payload for the LLM to relay. Docker quick start: docker run -i --rm -e OKTA_ORG_URL="https://your-org.okta.com" -e OKTA_CLIENT_ID="your-id" -e OKTA_SCOPES="okta.users.read okta.groups.read" okta-mcp-server.',
        'SE positioning: "Okta MCP Server" answers "I want AI to manage my Okta tenant." "Agent Gateway" answers "I want to secure the MCP tool calls my agents make to any backend API." Know the difference — they serve completely different use cases and audiences.',
      ],
      labeledCallouts: [
        { label: 'What It Does', labelColor: 'blue', text: 'Open-source MCP server (Apache 2.0, github.com/okta/okta-mcp-server). Exposes Okta Admin Management APIs to any MCP client. AI agents can create users, manage groups, pull system logs, manage apps and policies — via natural language through Claude Desktop, VS Code, or any MCP client.' },
        { label: 'Auth Modes', labelColor: 'emerald', text: 'Device Authorization Grant (interactive, browser login) for human-in-the-loop admin tasks. Private Key JWT (headless, RSA 2048-bit) for automated workflows. Destructive operations trigger MCP Elicitation API — confirmation dialog (SDK >= 1.26) or JSON payload for older clients.' },
        { label: 'Key Distinction', labelColor: 'amber', text: '"Okta MCP Server" = I want AI to manage my Okta tenant. "Agent Gateway" = I want to secure the MCP tool calls my agents make to any backend API. These are completely different products for different audiences. Do not confuse them in customer conversations — it signals poor product knowledge.' },
      ],
    },
    {
      heading: 'What Customers Are Asking: "MCP Gateways"',
      paragraphs: [
        'MCP gateways became a Gartner-recognized enterprise infrastructure category in September 2025 ("Innovation Insight: MCP Gateways"). Gartner projects 75% of API management vendors will offer MCP gateway capabilities by 2026. Over 16,000 MCP servers were deployed in 2025 alone. When customers ask about "MCP gateways," they are asking about the N×M integration problem: connecting N AI agents to M tool servers creates credential sprawl, observability black holes, and inconsistent access control. A gateway collapses this to N×1 + 1×M with centralized governance.',
        '!! The customer question behind every MCP gateway inquiry boils down to three concerns: "Where are my agents?" (discovery/inventory), "What can they connect to?" (access control), and "What did they do?" (audit trail). Okta for AI Agents (GA April 30, 2026) answers all three — and the Agent Gateway is the enforcement point.',
        'The market has split into three gateway architectures: (1) Purpose-built MCP gateways like Obot AI ($35M seed), Runlayer ($11M seed, Khosla Ventures), TrueFoundry (Gartner-recognized), and Lunar.dev MCPX (SOC 2). (2) API gateway extensions like Kong 3.12 AI MCP Proxy, AWS API Gateway + Bedrock AgentCore, and Azure APIM. (3) Aggregator platforms like Composio (500+ managed MCP servers) and Zapier MCP (8,000+ integrations). Solo.io\'s independent analysis (August 2025) found that traditional API gateways like Apigee cannot natively support MCP because MCP semantics live in JSON-RPC message bodies, not HTTP paths — a critical distinction when customers ask "can\'t we just use our existing API gateway?"',
        '?? Discovery questions: "Are your engineering teams already connecting AI agents to internal APIs? If so, how are those agents authenticating today?" ... "Do you have visibility into which AI agents are accessing which tools, and can you revoke that access in real time?" ... "Have you evaluated MCP gateways? What\'s driving that evaluation — is it security, compliance, or developer productivity?" In healthcare: MCP servers run locally on developer laptops — no network whitelisting is possible, and PHI could flow through unmonitored channels. As one customer put it: "People are chomping at the bit for MCP — we\'re like slow down it\'s very unsecure."',
      ],
    },
    {
      heading: 'The Security Case: Why MCP Gateways Are Urgent',
      paragraphs: [
        'Nine documented MCP security incidents occurred between April and October 2025 (AuthZed timeline, November 2025). These include: WhatsApp MCP chat history exfiltration via tool poisoning, GitHub MCP private repo content leaked via prompt injection, Asana MCP cross-tenant data exposure, mcp-remote OS command injection (CVE-2025-6514, 437K+ downloads affected), and the Smithery hosting path traversal that exposed 3,000+ hosted MCP servers. Every incident traces to one of three root causes: over-privileged credentials, absent access controls, or unvalidated tool descriptions.',
        '!! The DHS is already using Lasso Security\'s MCP gateway. Gusto and Opendoor are production customers of Runlayer. When a customer says "we\'re not ready for MCP governance yet," point to the breach timeline — the risk is already live. Shadow AI is a documented problem: Obot (March 2026) reported sales teams connecting MCP servers to CRM, email, and Slack on personal accounts without IT approval.',
        'Five cross-incident patterns (AuthZed): (1) Local AI dev tools behave like exposed remote APIs. (2) Over-privileged API tokens are catastrophic in MCP workflows. (3) Tool poisoning is a new supply-chain attack vector undetectable by traditional DLP. (4) Hosted MCP registries concentrate risk at scale. (5) Prompt injection alone can cause full data exfiltration when MCP tool calls are in the agent\'s context window.',
        'TT Talk track: "The MCP security landscape is maturing fast. Nine breaches in seven months, including CVEs in Anthropic\'s own tooling. The customers who are deploying AI agents today are already exposed — the question is whether they have centralized visibility and the ability to revoke access instantly. That\'s exactly what the Okta Agent Gateway provides, backed by the same identity platform they already use for SSO and lifecycle management."',
      ],
    },
    {
      heading: 'How Okta\'s Agent Gateway Answers the MCP Gateway Need',
      paragraphs: [
        'When customers evaluate MCP gateways, they compare across five dimensions. Here is how the Okta Agent Gateway maps to each, and where Okta has differentiated advantages versus the broader market.',
        '!! Identity-Native Gateway: Most MCP gateways (Bifrost, TrueFoundry, Docker MCP Gateway) bolt on auth as a plugin or rely on API keys. The Okta Agent Gateway is identity-native — it IS the OAuth 2.1 authorization server. Agent identity resolves through Okta Universal Directory. Group membership drives per-tool ACLs. SCIM lifecycle (onboarding/offboarding) automatically propagates to MCP tool access. When a user is deprovisioned in Okta, their agent\'s tool access revokes immediately — no config file to update.',
        'Token Brokering (vs. raw token passthrough): A key pattern documented by Obot (March 2026) — when MCP clients hold raw OAuth access tokens, those tokens can bypass MCP audit logs entirely and call underlying APIs directly. The Okta Agent Gateway solves this architecturally: MCP clients only hold an id_token. The Gateway performs RFC 8693 token exchange internally, obtaining backend-specific access tokens that never leave the Gateway. This is the "BFF pattern" described in the 7-layer pipeline — credentials are brokered, not passed through.',
        'Tool-Level RBAC (vs. server-level access): The Agent Gateway\'s resource_access ACL system enforces per-agent, per-tool permissions. Agent A can call hr_server__read_employee but not hr_server__terminate_employee. Most competing gateways (Cloudflare MCP Portals, Kong 3.12) only enforce access at the server level — either you can reach the server or you can\'t. The Agent Gateway\'s tool-namespace routing ({resource}__{tool}) enables the fine-grained control that enterprise security teams require.',
        'TT Talk track: "You mentioned evaluating MCP gateways. Most of the options in the market are infrastructure-first — they solve routing and rate limiting but bolt identity on as an afterthought. Okta\'s Agent Gateway is identity-first. It starts from the same Okta Universal Directory your users are already in, applies the same group policies, and extends SCIM lifecycle management to AI agent access. When your security team asks \'what happens when we offboard someone?\' — the answer is automatic, not manual."',
      ],
    },
    {
      heading: 'Competitive Positioning: MCP Gateway Market Map',
      image: 'diagrams/mcp-gateway-market.png',
      paragraphs: [
        'The Agentic AI Foundation (AAIF), formed under the Linux Foundation in December 2025, now governs MCP as an open standard. Platinum members: AWS, Anthropic, Cloudflare, Google, Microsoft, OpenAI. Okta is a Gold member — the only pure-play identity provider at Gold or above. This positioning matters: Okta is the designated identity authority in the AAIF ecosystem.',
        '>> Okta vs. Entra ID in MCP contexts: Microsoft\'s MCP Gateway (541 GitHub stars) is Azure-first with hard Azure lock-in. Their APIM stateless model requires workarounds for MCP\'s stateful SSE sessions. Okta is cloud-agnostic — agents running on AWS, Azure, or GCP all authenticate through the same Okta Agent Gateway. Key differentiators: Universal Logout for AI Agents (instant enterprise-wide token revocation — no Entra equivalent), Shadow AI discovery (detect unsanctioned agent-to-service connections), and multi-cloud MCP deployment without cloud vendor lock-in.',
        '>> Okta vs. Purpose-Built MCP Gateway Startups: Obot ($35M), Runlayer ($11M), TrueFoundry, and Lunar.dev all build excellent gateway infrastructure — routing, rate limiting, observability. But none of them are identity providers. They need to integrate with an IdP for authentication, lifecycle management, and group-based access control. The Okta Agent Gateway is both the gateway AND the IdP — no integration seam, no identity sync lag, no secondary user store. When Runlayer needs to check "is this agent allowed to call this tool?" they call out to an external IdP. The Agent Gateway already knows.',
        '>> Okta + Operant AI (OIN Integration): For customers who want a defense-in-depth architecture, Operant AI\'s MCP Gateway is in the Okta Integration Network. The pattern: Okta secures the identity plane (authentication, MFA, scope enforcement, group membership, device posture, risk signals). Operant extends those identity claims into runtime authorization (per-tool least-privilege, intent-aware controls, execution pattern analysis, behavioral risk scoring). Okta handles "who is this agent?" — Operant handles "should this specific tool call be allowed right now?"',
        '?? Discovery questions for competitive situations: "Are you looking at MCP gateways primarily for infrastructure (routing, rate limiting) or for identity governance (who can do what, audit trail, lifecycle)?" ... "How would your current approach handle an employee offboarding — does their agent\'s tool access revoke automatically? As one customer described: when they terminate someone, the API keys and agent connections keep running with no way to manage that." ... "Do you need multi-cloud support? In financial services, we see Copilot Studio plus Bedrock plus custom builds — no single cloud vendor governs all three."',
      ],
    },
    {
      heading: 'The Enterprise Authorization Gap (ID-JAG Context)',
      paragraphs: [
        'The most strategically important finding from the broader MCP gateway market: there is a fundamental "enterprise consent gap" in MCP auth that no vendor has fully solved at the protocol level — and Okta is closest to solving it at the product level.',
        'Standard OAuth requires users to explicitly approve scopes on a consent screen. In enterprise agentic scenarios, an MCP client may access Slack, GitHub, and Salesforce on behalf of the user without the user ever seeing a consent screen — the enterprise policy (administered in Okta) decides based on the agent\'s identity. The draft solution is the Identity Assertion JWT Authorization Grant (JAG), defined in the modelcontextprotocol/ext-auth repo. Okta\'s Agent Gateway implements ID-JAG as its primary auth method (okta-cross-app) — see the ID-JAG Protocol section for the full technical flow.',
        '!! Doyensec\'s March 2026 security research identified four unresolved problems with the JAG draft: no revocation mechanism, potential LLM scope abuse without consent, unspecified credential distribution, and ID-JAG replay amplification risk. Okta\'s answer to each: Universal Logout provides instant revocation. API Access Management enforces dynamic least-privilege with risk-based evaluation. The Agent Gateway\'s client registry and AES-256-GCM encrypted credential store handle credential distribution. And the Gateway\'s server-side token lifecycle (tokens never leave the Gateway) mitigates replay risk.',
        'TT Talk track for CISOs: "The MCP protocol spec says auth SHOULD be implemented — not MUST. That \'should\' is the gap that every enterprise needs to close. The Okta Agent Gateway makes auth mandatory by design — every tool call passes through the 7-layer pipeline, every token exchange is logged, and Universal Logout gives you an instant kill switch if an agent deviates. You\'re not relying on each MCP server to implement auth correctly — the Gateway enforces it centrally."',
      ],
    },
    {
      heading: 'Professional Services Engagement',
      paragraphs: [
        'Leverage Okta\'s experts to architect and scale a secure AI gateway that bridges the gap between third-party agents and enterprise data. This production-ready deployment eliminates credential sprawl through a hardened 7-layer proxy pipeline, ensuring 100% auditability and Zero Trust access for every agent-to-tool call.',
        '>> Investment: $55,000 (via Professional Services SKUs). Duration: 6-12 weeks typical. Phase 1 — Design Review & Validation (1-2 weeks): architecture assessment, backend inventory, auth method mapping, security requirements gathering. Phase 2 — Development & Iteration (2-4 weeks): Gateway deployment, backend integration, agent registration, ACL configuration, custom auth method development if needed. Phase 3 — Testing, UAT & Deployment (4-6 weeks): end-to-end testing, security validation, production cutover, runbook documentation, handoff to operations.',
        'Contact the Professional Services team to scope the engagement. The Adapter is available to existing customers through Professional Services and to prospects as part of a paid POC.',
      ],
      labeledCallouts: [
        { label: 'Investment', labelColor: 'blue', text: '$55,000 via Professional Services SKUs. 6-12 weeks typical engagement duration. Available to existing customers through ProServ, and to prospects as a paid POC — no free trial.' },
        { label: 'Phase 1: Design (1-2 weeks)', labelColor: 'emerald', text: 'Architecture assessment. Backend inventory (all systems agents will need to access). Auth method mapping (which of the 8 methods each backend needs). Security requirements gathering.' },
        { label: 'Phase 2: Build (2-4 weeks)', labelColor: 'emerald', text: 'Gateway deployment. Backend integration. Agent registration and ACL configuration. Custom auth method development if standard methods don\'t cover all backends.' },
        { label: 'Phase 3: Deploy (4-6 weeks)', labelColor: 'emerald', text: 'End-to-end testing. Security validation. Production cutover. Runbook documentation. Handoff to operations team with complete documentation.' },
        { label: 'POC Option', labelColor: 'amber', text: 'Prospects can access the Adapter in a paid POC scoped as a Professional Services engagement. There is no free trial. Scope through the ProServ team before committing the product to a prospect evaluation.' },
      ],
    },
    {
      heading: 'FAQ',
      paragraphs: [
        '?? "Why isn\'t this an Okta-hosted part of the product?" The Adapter provides additional extensibility and includes production-ready capabilities that are not yet integrated into the Okta hosted stack. It fills the gap between what Okta\'s hosted MCP gateway offers today and what enterprises need for complex, heterogeneous backend environments.',
        '?? "Should I use the Adapter or wait for the Okta hosted implementation?" Customers without well-defined requirements or urgent requirements that benefit from the extensibility set should consider the Adapter. If the customer\'s needs are straightforward and align with the Okta hosted MCP gateway capabilities, waiting may be appropriate. Evaluate based on: number and variety of backend auth methods needed, timeline urgency, and whether custom auth flows or policy engine integration is required.',
        '?? "Can I POC the Adapter?" Prospects can utilize the Adapter in a paid POC. Existing customers can acquire the Adapter through Professional Services. There is no free trial — the POC is scoped as a Professional Services engagement.',
      ],
    },
  ],
};
