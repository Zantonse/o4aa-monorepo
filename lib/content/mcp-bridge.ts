import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'mcp-bridge',
  title: 'MCP Bridge',
  description:
    'How the Agent Gateway handles transport, client discovery, and the BFF pattern — connecting AI agents to backend MCP servers via Streamable HTTP with Okta identity brokering.',
  tags: ['products', 'MCP', 'Transport', 'Streamable-HTTP', 'BFF'],
  icon: '🌉',
  hasDiagram: true,
  diagramPrompt:
    'Network architecture diagram: AI agents on left (Claude Code, Cursor, Copilot), connecting via Streamable HTTP to a central gateway. The gateway shows BFF pattern: intercepts OAuth discovery, proxies tokens, stores refresh tokens. On right: multiple backend MCP servers. Blue and white palette, clean professional technical style.',
  cards: [
    {
      heading: 'Transport: Streamable HTTP',
      paragraphs: [
        'The Agent Gateway handles transport at Layer 1 of its 7-layer pipeline using Streamable HTTP — the current MCP spec transport for remote servers (replacing the deprecated HTTP+SSE transport from 2024). Streamable HTTP uses a single endpoint that accepts HTTP POST for client-to-server messages and HTTP GET for server-to-client SSE streaming. Sessions are tracked via the Mcp-Session-Id header.',
        'From the MCP client\'s perspective (Claude Code, Cursor, etc.), the Agent Gateway looks like a standard MCP server endpoint. The client connects to the Gateway\'s URL, performs OAuth discovery via the .well-known/oauth-protected-resource endpoint, authenticates, and then makes tool calls as normal JSON-RPC over HTTP POST. The Gateway transparently routes each call through the 7-layer pipeline to the correct backend MCP server.',
        'The key architectural insight is that the Agent Gateway is NOT a separate component from the transport — it IS the transport endpoint for MCP clients. Clients connect to the Agent Gateway, not to individual backend MCP servers. This gives the Gateway full control over every message: authentication, authorization, routing, token exchange, caching, and audit all happen inline before any message reaches a backend.',
      ],
    },
    {
      heading: 'The BFF Pattern: OAuth Proxy',
      paragraphs: [
        'The Agent Gateway operates as a Backend-for-Frontend (BFF) OAuth proxy. MCP clients never communicate directly with Okta. This is critical because third-party AI agents (Claude Code, Cursor, Copilot) do not integrate with enterprise IdPs — they have no mechanism to participate in Okta XAA flows natively. The Gateway bridges this gap by acting as the OAuth intermediary.',
        '!! When an MCP client initiates OAuth discovery, the Agent Gateway intercepts the .well-known/oauth-protected-resource response and rewrites it to point at itself as both the authorization server and the token endpoint. The client authenticates through the Gateway, which proxies the flow to Okta. The Gateway rewrites access_token = id_token in the response (the id_token is what the Gateway needs for downstream ID-JAG exchange). Refresh tokens are stored server-side in the UserTokenStore — the MCP client only ever holds an id_token. This minimizes credential exposure: if a client is compromised, the attacker gets a short-lived id_token, not a refresh_token or any downstream access tokens.',
        'TT For SE conversations: the BFF pattern is the answer to "how do we get Okta auth into Claude Code / Cursor / Copilot without those vendors integrating with Okta?" The Agent Gateway handles it transparently — no changes required from the AI agent vendor.',
      ],
      mermaidDiagrams: [
        {
          title: 'The BFF Pattern: OAuth Proxy',
          code: `sequenceDiagram
    participant C as 🤖 MCP Client<br/>(Claude Code / Cursor)
    participant GW as 🌉 Agent Gateway<br/>(BFF Proxy)
    participant OK as 🔐 Okta
    participant TS as 🗄️ UserTokenStore<br/>(Server-side)

    Note over C,GW: Step 1 — Discovery
    C->>GW: GET /.well-known/oauth-protected-resource
    GW-->>C: Rewrites response — points to Gateway<br/>as auth server AND token endpoint

    Note over C,GW: Step 2 — Client authenticates through Gateway
    C->>GW: Authorization request (PKCE)
    GW->>OK: Proxies auth flow to Okta
    OK-->>GW: Okta auth response + refresh_token

    Note over GW,TS: Step 3 — Gateway stores refresh_token server-side
    GW->>TS: Store refresh_token (never leaves Gateway)
    GW-->>C: access_token = id_token only<br/>(short-lived, no refresh exposure)

    Note over C,GW: Step 4 — Tool call
    C->>GW: MCP tool call + id_token
    GW->>GW: ID-JAG exchange via id_token
    GW->>OK: Token exchange (RFC 8693)<br/>id_token → downstream access_token
    OK-->>GW: Scoped downstream access_token
    GW-->>C: Tool call result`,
          caption: 'The BFF pattern ensures the MCP client only ever holds a short-lived id_token. Refresh tokens and downstream credentials never leave the Gateway.',
        },
      ],
    },
    {
      heading: 'Client Registration Strategies',
      paragraphs: [
        'The Agent Gateway supports a 4-strategy priority chain for client registration, which determines how an MCP client is identified and authorized. Priority 1 — Pre-Registration: the admin imports an agent from Okta via the Admin UI. The agent record maps directly to an Okta OIDC app with its client credentials. This is the highest-trust method and is recommended for known enterprise agents.',
        'Priority 2 — CIMD (Client ID Metadata Documents): the MCP client presents a URL-based client_id per the MCP spec. The Gateway fetches the metadata document (with SSRF protections: 5s timeout, 50KB max), validates the schema and trust policy, matches to an imported agent via the client registry, and proxies OAuth using that agent\'s Okta credentials. Priority 3 — DCR (Dynamic Client Registration, RFC 7591): new, unknown MCP clients register dynamically. The Gateway presents an agent selection page where the admin links the new client to an existing imported agent, inheriting that agent\'s Okta app credentials and resource ACLs.',
        '>> Priority 4 — Fallback: if no registration strategy matches, the Agent Gateway returns 401 with WWW-Authenticate and a resource_metadata URI pointing back to itself. This allows the client to retry the OAuth discovery flow. For SEs: the registration priority chain is important because it shows the Agent Gateway works with the full range of MCP clients — from pre-registered enterprise agents (Priority 1) to completely unknown agents that show up via DCR (Priority 3). The admin always maintains control over which agents can access which resources.',
      ],
      accordion: [
        {
          title: 'Priority 1 — Pre-Registration (highest trust)',
          content: [
            'Admin imports the agent from Okta via the Admin UI. The agent record maps directly to an Okta OIDC app with its client credentials.',
            'Recommended for all known enterprise agents: Claude Code, Cursor, Copilot, or any internally built agent with a formal app registration. This method provides the strongest authorization signal and is required for agents that access high-sensitivity resources.',
          ],
        },
        {
          title: 'Priority 2 — CIMD (Client ID Metadata Documents)',
          content: [
            'The MCP client presents a URL-based client_id per the MCP spec. The Gateway fetches the metadata document from that URL with SSRF protections applied (5s timeout, 50KB max response size), validates the schema and trust policy, and matches to an imported agent via the client registry.',
            'Best for MCP clients that self-declare their identity via a public metadata document. The Gateway enforces SSRF protections on the fetch to prevent server-side request forgery via a malicious client_id URL.',
          ],
        },
        {
          title: 'Priority 3 — DCR (Dynamic Client Registration, RFC 7591)',
          content: [
            'New, unknown MCP clients register dynamically. The Gateway presents an agent selection page where the admin links the new client to an existing imported agent, inheriting that agent\'s Okta app credentials and resource ACLs.',
            'Best for scenarios where a third-party agent arrives without prior coordination. The admin review step ensures the Gateway never silently grants access to an unreviewed client.',
          ],
        },
        {
          title: 'Priority 4 — Fallback (401 with retry guidance)',
          content: [
            'If no registration strategy matches, the Agent Gateway returns 401 with WWW-Authenticate and a resource_metadata URI pointing back to itself. This allows the client to retry the OAuth discovery flow.',
            'The fallback ensures clients that arrive without any recognized registration method receive a standards-compliant error response with a clear path to retry — rather than a generic connection failure.',
          ],
        },
      ],
    },
    {
      heading: 'Deployment and Observability',
      paragraphs: [
        'The Agent Gateway deploys as a Docker bundle with 5 services: the Gateway (FastAPI on port 8000), PostgreSQL (config, agents, audit log — all credentials AES-256-GCM encrypted at rest), Redis (token cache with two-tier L1 memory + L2 Redis, session cache, pub/sub event bus), the Admin UI (Next.js on port 3001 for agent management, resource configuration, and audit log viewing), and an observability stack (Grafana + Loki + Promtail on port 3000).',
        'Current deployment target is AWS EC2 with ALB + HTTPS. The demo package (okta-mcp-aws-0.12.1.tar.gz) includes everything needed for a standalone deployment. Observability is built in: the Agent Gateway emits 50+ structured audit event types covering authentication, authorization, token exchange, routing, and proxy operations. Every tool call generates an audit event with: agent identity, user identity, target resource, tool name, auth method used, token exchange result, and response status.',
        'For demo/POC environments: the Admin UI at port 3001 provides a web interface for managing agents (import from Okta, view resource access), configuring backend resources (set auth method, connection details), viewing the audit log (searchable, filterable), and managing client registrations. This is the primary interface for showing customers how the Agent Gateway works in practice.',
      ],
      labeledCallouts: [
        { label: 'DEPLOYMENT', labelColor: 'blue', text: 'Docker bundle with 5 services: Gateway (FastAPI, port 8000), PostgreSQL (config + audit log, AES-256-GCM at rest), Redis (two-tier token cache + session cache + pub/sub), Admin UI (Next.js, port 3001), and observability stack (Grafana + Loki + Promtail, port 3000).' },
        { label: 'DEPLOYMENT TARGET', labelColor: 'blue', text: 'Current target: AWS EC2 with ALB + HTTPS. Demo package (okta-mcp-aws-0.12.1.tar.gz) includes all 5 services pre-configured for standalone deployment.' },
        { label: 'AUDIT EVENTS', labelColor: 'emerald', text: '50+ structured audit event types emitted per tool call — covering authentication, authorization, token exchange, routing, and proxy operations. Per-event fields: agent identity, user identity, target resource, tool name, auth method used, token exchange result, response status.' },
        { label: 'ADMIN UI', labelColor: 'amber', text: 'Port 3001 — primary interface for POC/demo environments. Manage agent imports from Okta, configure backend resource auth methods, view and filter the searchable audit log, and manage client registrations.' },
        { label: 'OBSERVABILITY', labelColor: 'emerald', text: 'Grafana dashboards at port 3000 via Loki + Promtail log aggregation. All Gateway events are structured JSON — directly ingestible by enterprise SIEM platforms (Splunk, Datadog, Elastic) via the audit log or event stream.' },
      ],
    },
  ],
};
