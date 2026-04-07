import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'auth0-for-agents',
  title: 'Auth0 for AI Agents',
  description:
    'The developer-facing product surface for securing AI agents — Token Vault, AI SDKs (LangChain, LlamaIndex, Vercel AI), MCP Security, CIBA human-in-the-loop, FGA for RAG, and when to position Auth0 vs Okta WIC.',
  tags: ['Auth0', 'Token-Vault', 'CIBA', 'FGA', 'RAG', 'MCP', 'SDK', 'CIAM', 'developer'],
  icon: '🔧',
  hasDiagram: true,
  diagramPrompt:
    'Four-pillar architecture diagram showing Auth0 for AI Agents: left pillar "User Auth" (Universal Login icon), second pillar "Token Vault" (key + vault icon with 35+ API logos), third pillar "CIBA" (phone with approve/deny), fourth pillar "FGA for RAG" (document filter funnel). AI agent at top connecting to all four. Navy and orange palette, flat technical illustration.',
  cards: [
    {
      heading: 'When to Position Auth0 vs Okta WIC',
      paragraphs: [
        '!! This is the boundary every SE needs to internalize. Auth0 and Okta WIC serve different buyers solving different problems in the agentic enterprise. Getting this wrong positions you against your own company.',
        'The official Okta boundary statement (Launch Week blog, March 16, 2026): "The Okta platform: Protect every identity type with a unified fabric" (workforce, infrastructure, internal AI agents). "The Auth0 platform: Secure your production-ready AI experiences" (customer-facing, developer-built, B2C/B2B SaaS AI products).',
        '?? The qualifying question: "Are you building an AI product for your customers, or deploying AI agents for your employees?" If building → Auth0. If deploying internally → Okta WIC. If both → lead with the primary buying motion.',
      ],
      conceptGrid: [
        { label: 'Auth0', text: 'Primary buyer: developer / product team. Identity type: end customers (consumers, B2B SaaS tenants). Agent model: acts on behalf of an authenticated end user. Deployment: SDK-first, minutes to first integration.' },
        { label: 'Okta WIC', text: 'Primary buyer: IT / security team. Identity type: employees, contractors, internal agents. Agent model: independent identity in Universal Directory. Deployment: admin console + Workflows + Terraform.' },
        { label: 'Both Apply', text: 'A company building an AI-powered SaaS product for enterprise customers needs Auth0 for the customer-facing layer AND may need Okta WIC for their internal developer workforce. This is a "both" conversation.' },
        { label: 'Never', text: 'Never position Auth0 for shadow agent discovery (that is ISPM), OIG access certification campaigns, or ITP behavioral detection for internal agents. These are Okta WIC capabilities with no Auth0 equivalent.' },
      ],
    },
    {
      heading: 'The Four Pillars (All GA as of November 2025)',
      paragraphs: [
        'Auth0 for AI Agents went GA on November 19, 2025. The four pillars are shipped, not roadmap. Auth for MCP is the exception — it is still in Early Access as of April 2026.',
      ],
      accordion: [
        {
          title: '1. User Authentication — Identify who the agent acts for',
          content: [
            'Integrates Auth0 Universal Login into AI agent flows. The agent gets a first-party access token scoped to the authenticated user. Supports social login, enterprise SSO (SAML, OIDC), MFA, and passwordless. The user authenticates once; the agent inherits their identity context for all subsequent tool calls.',
            'Available via Next.js SDK, FastAPI SDK, and auth0-server-python. Framework SDKs (LangChain, LlamaIndex, Vercel AI) wrap this into their native auth patterns.',
          ],
        },
        {
          title: '2. Token Vault — Delegate third-party API access without credentials in code',
          content: [
            'Token Vault manages OAuth tokens for 35+ third-party integrations: Google Drive, Gmail, Google Calendar, Slack, GitHub, Salesforce, Stripe, Microsoft Entra, Dropbox, Box, Discord, Spotify, Figma, and more. Any OAuth 2.0-compatible service can be added via custom integration.',
            'The flow: user authenticates once with the external provider via OAuth consent. Auth0 stores the refresh token. At agent runtime, the SDK exchanges an Auth0 token for a short-lived external token — the agent code never sees a raw credential. Token refresh, rotation, and revocation are automatic.',
            'Developer experience: wrap any tool function with withTokenVault({connection: "sign-in-with-slack", scopes: ["channels:read"]}). The SDK handles authentication interrupts, consent flows, and token retrieval. This eliminates ~100-200 lines of OAuth boilerplate per integration.',
            'Free tier: 2 connected apps included in all Auth0 plans. Enterprise pricing for higher limits requires sales contact.',
          ],
        },
        {
          title: '3. CIBA — Human-in-the-loop approval for high-stakes actions',
          content: [
            'Client-Initiated Backchannel Authentication (CIBA) enables explicit per-action approval. The agent pauses, pushes an approval request to the user\'s device with rich context (Rich Authorization Requests), and proceeds only after explicit human consent.',
            'Use cases: banking chatbot approving a wire transfer, retail AI confirming a large purchase, healthcare AI accessing protected records. The user sees exactly what the agent wants to do — "Approve wire transfer of $5,000 to XYZ Corp" — not a generic consent prompt.',
            'Notification channels: Auth0 Guardian push (GA) and email (paid add-on, Essentials+ plans). SMS coming soon.',
            'Distinction from Token Vault: Token Vault = standing delegated access within pre-approved scopes. CIBA = explicit per-action approval for actions beyond standing consent. Both can operate in the same agent workflow.',
          ],
        },
        {
          title: '4. FGA for RAG — Document-level access control in retrieval pipelines',
          content: [
            'Auth0 Fine Grained Authorization (FGA) implements Relationship-Based Access Control (ReBAC) built on OpenFGA (CNCF sandbox project). For RAG pipelines: before documents enter the LLM context window, the SDK checks each document against FGA policy — "Can this user view this document?" Only authorized documents reach the model.',
            'This prevents the cross-user data leakage problem: User A queries an AI assistant, the retriever pulls User B\'s financial reports, and the LLM generates a response using data User A shouldn\'t see. FGA filters at the retrieval layer, not the application layer.',
            'Available as retriever plugins for LangChain/LangGraph, LlamaIndex, and Vercel AI — both JS and Python. Also available for FGA-controlled MCP tool access (quickstart added January 30, 2026).',
          ],
        },
      ],
    },
    {
      heading: 'Token Vault vs XAA — Who Uses What and Why',
      paragraphs: [
        '!! This is the most common confusion in O4AA positioning. Token Vault and XAA solve different problems for different actors. Getting the distinction wrong leads to architectural mistakes that break audit trails.',
        'Token Vault is for the developer building the agent. Your agent needs to call Slack, Google Drive, or Salesforce on behalf of the user. Token Vault stores the user\'s OAuth tokens for 35+ third-party APIs, handles refresh and revocation, and gives the agent a fresh token at runtime. The developer chooses which integrations to enable. The user consents via OAuth. No IT admin is in the loop.',
        'XAA (Cross App Access) is for the enterprise IT admin. A third-party ISV ships an AI agent that wants to access your internal APIs on behalf of your employees. XAA puts the IT admin in control: they create a Managed Connection in the Okta console that specifies which agents can access which resources with which scopes. The ISV\'s agent participates in the flow but does not control the policy.',
      ],
      conceptGrid: [
        { label: 'Token Vault', text: 'Direction: agent calls OUT to third-party APIs. Who controls access: the developer building the agent. Trust boundary: within one app\'s scope. Token type: user\'s own OAuth token for the third-party service. The third-party API sees the user — the agent is invisible.' },
        { label: 'XAA / ID-JAG', text: 'Direction: third-party agent calls IN to your APIs. Who controls access: the enterprise IT admin via Managed Connections. Trust boundary: across organizational boundaries. Token type: ID-JAG → scoped access token carrying both user (sub) and agent (cid) identity.' },
        { label: 'Both Together', text: 'A single agent workflow often uses both. Read the user\'s Google Calendar → Token Vault (outbound). Write a summary to the company knowledge base → XAA (inbound to enterprise API). Approve before posting to #general → CIBA. Filter retrieved docs → FGA for RAG.' },
      ],
      labeledCallouts: [
        {
          label: 'The Audit Trail Gap',
          labelColor: 'amber',
          text: 'Token Vault hands the agent the user\'s OAuth token. The third-party API (Google, Slack) sees only the user — there is no agent identity in the token. If the agent deletes a user\'s Google Drive file, Google\'s audit log shows the user did it, not the agent. Auth0\'s own logs record that the agent requested the token, but the third-party API has no concept of delegation. XAA fixes this for APIs you control — the token carries both sub (user) and cid (agent) — but cannot fix it for third-party APIs that only understand their own OAuth tokens.',
        },
        {
          label: 'What If the Third Party Supports XAA?',
          labelColor: 'blue',
          text: 'If a third-party service implements XAA as a Resource App, you skip Token Vault for that service and use XAA instead. The agent presents an ID-JAG to the third party\'s auth server and receives a token carrying both user and agent identity — full dual attribution. The third-party API can then log exactly which agent did what on behalf of which user. Token Vault exists because most third-party APIs do not support delegated assertion flows today. As more APIs adopt XAA or similar standards (RFC 8693, ID-JAG), Token Vault\'s role shifts from primary auth mechanism to convenience layer for token lifecycle management.',
        },
        {
          label: 'Air Canada Lesson',
          labelColor: 'rose',
          text: 'The Air Canada chatbot incident (Moffatt v. Air Canada, 2024) is the canonical example of what happens without dual attribution. The chatbot used a service account to access downstream systems — no user identity in the delegation chain, no agent identity at the resource layer, no audit trail connecting the user\'s request to the chatbot\'s action. Token Vault prevents credential sprawl (no hardcoded API keys) but does not solve attribution at the third-party layer. XAA solves attribution for APIs that participate in the delegation chain.',
        },
      ],
    },
    {
      heading: 'AI Framework SDKs — What\'s Supported',
      paragraphs: [
        'Auth0 ships framework-native SDKs so developers integrate auth using patterns they already know — not a generic OAuth library bolted on from the side. Available under @auth0/ai-* (npm) and auth0-ai-* (PyPI).',
        '!! Adoption signal: npm monthly downloads (March 2026) — @auth0/ai: 2,581, @auth0/ai-vercel: 1,543, @auth0/ai-langchain: 613. Early-stage adoption. The Vercel AI SDK getting 2.5x the downloads of LangChain suggests the audience skews JS/Next.js rather than Python ML engineers.',
        '!! The JS repo carries a prominent warning: "under heavy development... major versions may be released frequently... we recommend locking versions in production." Set expectations accordingly with developer audiences.',
      ],
      tabs: [
        {
          label: 'JavaScript / TypeScript',
          content: [
            '@auth0/ai — base abstractions (Token Vault, CIBA, FGA primitives)',
            '@auth0/ai-langchain — LangChain/LangGraph integration',
            '@auth0/ai-llamaindex — LlamaIndex integration',
            '@auth0/ai-vercel — Vercel AI SDK integration',
            '@auth0/ai-genkit — Firebase Genkit integration',
            '@auth0/ai-cloudflare — Cloudflare Agents + MCP server auth',
            '@auth0/ai-components — React UI components for consent flows',
            '@auth0/ai-redis — Redis state store for auth interrupt persistence',
          ],
        },
        {
          label: 'Python',
          content: [
            'auth0-ai — base abstractions',
            'auth0-ai-langchain — LangChain/LangGraph integration',
            'auth0-ai-llamaindex — LlamaIndex integration',
            'auth0-ai-ms-agent — Microsoft Agent Framework support (added March 2026)',
          ],
        },
        {
          label: 'Not Yet Supported',
          content: [
            'CrewAI — use base auth0-ai package directly',
            'Google ADK — use base auth0-ai package directly',
            'AutoGen — use base auth0-ai package directly',
            'Semantic Kernel (Microsoft) — not listed as of April 2026',
            'These frameworks require developers to use the base abstractions rather than framework-native wrappers. This is a gap for deals where the customer is building on these specific frameworks.',
          ],
        },
      ],
    },
    {
      heading: 'Auth for MCP — Securing MCP Server Connections',
      paragraphs: [
        '!! Auth for MCP is in Early Access (not GA). Requires joining the Early Access program at auth0.com/ai. Position as available for evaluation, not for production deployment without confirming access.',
        'Auth0 acts as the OAuth 2.1 authorization server for MCP servers. The 7-step flow: MCP client requests server → receives 401 → fetches protected resource metadata → discovers Auth0 as auth server → user authenticates via Universal Login → Auth0 issues scoped access token → MCP client uses token for all tool calls.',
        '>> Key capabilities: OAuth 2.1 + PKCE enforcement (mandatory per MCP spec), metadata discovery (/.well-known/oauth-authorization-server), Dynamic Client Registration and CIMD (Client ID Metadata Documents, per November 2025 MCP spec), Custom Token Exchange for internal API calls from MCP servers, Token Vault integration for third-party API calls from MCP tools.',
        '>> November 2025 MCP spec additions Auth0 implements: SEP-990 (Cross App Access / XAA / Enterprise-Managed Authorization) — inserts the enterprise IdP into the MCP auth loop so IT can govern which agents connect to which MCP servers. SEP-1046 (Client Credentials) — standardized M2M flow for headless agents.',
        'TT "When a developer asks how to secure their MCP server, Auth0 is the answer for the CIAM use case — their customers\' AI agents connecting to their MCP servers. For the workforce use case — employees\' AI agents connecting to internal MCP servers — Okta WIC and the Agent Gateway handle that side."',
      ],
      mermaidDiagrams: [
        {
          title: 'Auth for MCP — OAuth 2.1 Flow with Auth0',
          code: `sequenceDiagram
    participant MC as 🤖 MCP Client
    participant MS as 🌐 MCP Server
    participant AS as 🔐 Auth0<br/>(Auth Server)

    Note over MC,MS: Step 1 — Initial tool call (unauthenticated)
    MC->>MS: Tool call request
    MS-->>MC: 401 Unauthorized<br/>WWW-Authenticate: Bearer<br/>resource_metadata URL

    Note over MC,MS: Step 2 — Metadata discovery
    MC->>MS: GET /.well-known/oauth-protected-resource
    MS-->>MC: Protected resource metadata<br/>authorization_server: auth0.com/...

    Note over MC,AS: Step 3 — Auth server discovery
    MC->>AS: GET /.well-known/oauth-authorization-server
    AS-->>MC: Auth server metadata<br/>(endpoints, supported grants)

    Note over MC,AS: Step 4 — User authenticates via Universal Login
    MC->>AS: Authorization request (PKCE)<br/>+ Dynamic Client Registration / CIMD
    AS-->>MC: Universal Login redirect
    Note over AS: User authenticates,<br/>consents to scopes

    Note over MC,AS: Step 5 — Token issuance
    AS-->>MC: Scoped access_token (JWT)<br/>short-lived, audience = MCP Server

    Note over MC,MS: Steps 6 & 7 — Authenticated tool calls
    MC->>MS: Tool call + Bearer access_token
    MS-->>MC: Tool response ✓`,
          caption: 'Auth0 acts as the OAuth 2.1 authorization server for MCP servers. The MCP client discovers Auth0 via Protected Resource Metadata, authenticates once via Universal Login, and uses the resulting scoped token for all subsequent tool calls.',
        },
      ],
    },
    {
      heading: 'CIAM-Specific Agent Patterns',
      paragraphs: [
        'These are the customer-facing AI agent patterns where Auth0 is the correct product to position — not Okta WIC.',
        '>> Retail / agentic commerce: Consumer AI agents that browse, compare, and purchase products. Auth0 provides persistent customer identity across sessions, access to order history and loyalty data, and CIBA-based purchase approval. Auth0 blog: "Unifying the Retail Customer Journey from Web to AI Agent" (March 27, 2026).',
        '>> Healthcare: AI assistants accessing protected health records. CIBA ensures explicit patient consent before PHI retrieval. FGA ensures document-level access control — the AI only sees records the specific clinician is authorized to access.',
        '>> Financial services: Banking AI assistants where every transaction requires CIBA approval. Rich Authorization Requests provide specific transaction context — "Approve wire transfer of $5,000 to XYZ Corp" — not a generic consent prompt.',
        '>> ISV / SaaS copilots: The most common Auth0 CIAM AI pattern. A SaaS company building an AI copilot for their product needs: Universal Login for end-user auth, Token Vault to let the copilot call third-party APIs on the user\'s behalf, CIBA for high-stakes actions, and FGA for RAG if the copilot accesses tenant documents. Auth0 covers all four layers.',
        '>> Multi-tenant agent deployments: Auth0 Organizations isolates each B2B customer\'s agent sessions, data access, and permissions. When an agent acts on behalf of a customer user within a specific Organization, it inherits that Organization\'s federated identity context, FGA permissions, and token scopes. The agent cannot bleed across tenants.',
        '?? "Are you building an AI feature into your SaaS product? How do your customers\' AI agents authenticate today? If your answer involves API keys or shared credentials, Auth0 Token Vault replaces that with per-user delegated access — no credentials in your agent code, no credential rotation to manage, and a full audit trail of what each agent accessed on behalf of each user."',
      ],
    },
    {
      heading: 'Feature Status — What\'s GA vs Early Access',
      paragraphs: [
        'Carry this to avoid over-promising. Auth0 for AI Agents is mostly GA, but Auth for MCP is not.',
      ],
      timeline: [
        { label: 'GA', title: 'User Authentication', description: 'Universal Login, social + enterprise IdPs, MFA. Available on all Auth0 plans.' },
        { label: 'GA', title: 'Token Vault', description: '35+ integrations, auto-refresh, per-user scoping. Free tier: 2 connected apps. SPA support since August 2025.' },
        { label: 'GA', title: 'Asynchronous Authorization (CIBA)', description: 'Guardian push (GA) + email (paid add-on). Rich Authorization Requests for action context.' },
        { label: 'GA', title: 'FGA for RAG', description: 'OpenFGA-based ReBAC retrieval filter. LangChain, LlamaIndex, Vercel AI plugins.' },
        { label: 'GA', title: 'Framework SDKs', description: 'LangChain, LlamaIndex, Vercel AI, Cloudflare, Genkit — JS and Python.' },
        { label: 'EA', title: 'Auth for MCP', description: 'OAuth 2.1 authorization for MCP servers. CIMD, DCR, Token Vault integration, FGA tool access. Requires Early Access enrollment.' },
      ],
    },
  ],
};
