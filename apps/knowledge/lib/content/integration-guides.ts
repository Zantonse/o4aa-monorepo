import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'integration-guides',
  title: 'Integration Guides',
  description:
    'How to connect Okta with the AI agent frameworks customers actually build with — LangChain, CrewAI, AWS Bedrock, Claude, and the generic MCP pattern.',
  tags: ['developer', 'integration', 'LangChain', 'CrewAI', 'Bedrock', 'Claude'],
  icon: '🔧',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'LangChain / LangGraph',
      paragraphs: [
        'LangChain is the most common agent framework. The integration point is the Tool layer — where LangChain makes external API calls. The pattern: configure each LangChain Tool to obtain an Okta token before calling the protected API. For OBO flows, the LangGraph node that initiates the agent task receives the user\'s access token and exchanges it via Okta\'s token exchange endpoint before each tool call.',
        '>> Integration pattern: (1) User authenticates via Okta (Auth Code + PKCE), (2) LangGraph receives user\'s access token as task context, (3) Before each tool call, a custom callback or middleware calls Okta\'s /token endpoint with grant_type=token-exchange, passing subject_token (user\'s token) and the tool\'s target audience, (4) Okta returns a scoped delegated token, (5) The tool call uses the delegated token as its Bearer credential, (6) After the call, the scoped token is discarded (not cached).',
        '!! Key implementation detail: the token exchange happens per-tool-call, not per-session. This is what enables per-call audit and minimal privilege. A common mistake is exchanging once at session start and reusing the broad token — this defeats the purpose of OBO.',
        'For MCP-based LangChain tools: configure the LangChain MCP tool to point at the Okta Agent Gateway endpoint instead of the raw MCP server. The Agent Gateway handles all auth transparently — the LangChain tool code does not need to know about Okta.',
      ],
      labeledCallouts: [
        {
          label: 'Pattern',
          labelColor: 'blue',
          text: 'Token exchange happens per-tool-call, not per-session. Each LangGraph node calls POST /oauth2/{authServerId}/v1/token with grant_type=urn:ietf:params:oauth:grant-type:token-exchange before invoking the downstream API. The returned token is scoped to that tool\'s audience and discarded after use.',
        },
        {
          label: 'Caveat',
          labelColor: 'amber',
          text: 'Exchanging the user token once at session start and reusing it for all tool calls is the most common implementation mistake. This produces a single broad token that persists across the entire session — defeating per-call audit granularity and violating the minimal privilege principle. Each tool call must trigger a fresh exchange.',
        },
        {
          label: 'Demo Tip',
          labelColor: 'emerald',
          text: 'For MCP-based LangChain tools, point the tool at the Okta Agent Gateway URL instead of the raw MCP server. The Gateway handles all Okta auth transparently — no changes to LangChain tool code beyond the endpoint URL. This is the fastest path to a working demo: swap the MCP server URL, everything else stays the same.',
        },
      ],
    },
    {
      heading: 'CrewAI',
      paragraphs: [
        'CrewAI organizes agents into "crews" with specialized roles. Each crew member (agent) can have its own tools. The Okta integration maps to CrewAI\'s tool configuration: each tool is configured with Okta credentials, and the crew\'s task context carries the user delegation.',
        '>> Integration pattern: (1) Define each crew member\'s tools with an Okta-aware wrapper that handles token exchange, (2) Pass the user\'s access token into the crew\'s task input, (3) The wrapper exchanges the user token for a scoped tool-specific token before each external API call, (4) For multi-agent crews: the orchestrator agent\'s delegation is downscoped for each sub-agent using RFC 8693 token exchange — sub-agents cannot exceed the orchestrator\'s permissions.',
        '!! CrewAI\'s multi-agent pattern maps directly to Okta\'s principal hierarchy: the crew manager is the orchestrator, crew members are sub-agents. Each delegation hop uses token exchange to enforce scope reduction. This is the concrete implementation of the "confused deputy" prevention described in the Security section.',
      ],
      labeledCallouts: [
        {
          label: 'Pattern',
          labelColor: 'blue',
          text: 'CrewAI\'s crew manager maps to the Okta orchestrator principal; each crew member maps to a sub-agent principal. Token exchange at each delegation hop uses RFC 8693 to enforce scope reduction — the sub-agent\'s token is always narrower than the orchestrator\'s. Pass the user\'s access token in the crew\'s task input so every tool wrapper can perform the exchange against the correct user context.',
        },
        {
          label: 'Caveat',
          labelColor: 'amber',
          text: 'Sub-agents cannot exceed the orchestrator\'s permissions — this is enforced by Okta\'s token exchange policy, not by application code. If the orchestrator\'s token lacks a scope, no downstream exchange will grant it to a sub-agent. Ensure the orchestrator\'s initial token is scoped broadly enough to cover all tools in the crew, or sub-agent calls will fail at exchange time.',
        },
        {
          label: 'Demo Tip',
          labelColor: 'emerald',
          text: 'Use this framework to demonstrate confused deputy prevention live: show that a CrewAI sub-agent attempting to use the orchestrator\'s token directly (without downscoping) is rejected by the protected API. Then show the same call succeeding after a proper RFC 8693 exchange. This makes the security model tangible rather than theoretical.',
        },
      ],
    },
    {
      heading: 'AWS Bedrock Agents',
      paragraphs: [
        'AWS Bedrock Agents authenticate via IAM roles — there is no native OIDC flow. Each Bedrock Agent gets a single IAM service role, and all users\' requests run under that same role with no per-user delegation. This is the core gap Okta fills.',
        '>> Bridge pattern: (1) The calling application authenticates the user via Okta (Auth Code + PKCE), (2) Before invoking the Bedrock Agent, the app calls Okta\'s token exchange to get a delegated token scoped to the specific task, (3) The delegated token is passed to the Bedrock Agent as custom session context, (4) When the Bedrock Agent makes a tool call to an Okta-protected API, the API validates the delegated token — seeing both the user identity and the agent identity, (5) The IAM role handles Bedrock-to-AWS-service auth; the Okta token handles user delegation to external APIs.',
        '!! The Bedrock-Okta bridge is essential for any customer using Bedrock Agents that need to access non-AWS APIs with per-user authorization. Without it, all Bedrock Agent actions appear as the same IAM service role — no user attribution, no per-user data access, no delegation audit.',
      ],
      labeledCallouts: [
        {
          label: 'Pattern',
          labelColor: 'blue',
          text: 'The IAM role handles Bedrock-to-AWS-service authentication. The Okta delegated token, passed as custom session context, handles user delegation for non-AWS API calls. These are two separate auth planes: IAM for the AWS boundary, Okta for the external API boundary. Neither replaces the other — both must be present for full coverage.',
        },
        {
          label: 'Caveat',
          labelColor: 'amber',
          text: 'Without the Okta bridge, every Bedrock Agent action is attributable only to the IAM service role. The audit log shows the role ARN, not the user. This is not a logging configuration issue — it is a structural limitation of IAM role-based auth. There is no way to add per-user attribution to Bedrock Agents without passing user identity through a separate channel like the Okta delegated token in session context.',
        },
        {
          label: 'Demo Tip',
          labelColor: 'emerald',
          text: 'Show the CloudTrail log for a Bedrock Agent call without the bridge — highlight that the identity is the IAM role ARN only. Then show the API access log for an Okta-protected tool call with the bridge — highlight the user sub claim and agent client_id both present. The contrast makes the attribution gap concrete for a security or audit audience.',
        },
      ],
    },
    {
      heading: 'Claude Tools / Claude Code + MCP',
      paragraphs: [
        'Claude Code and Claude Desktop connect to MCP servers natively. The Agent Gateway serves as the remote MCP server endpoint — Claude connects to the Gateway, which handles auth and routes to the actual backend MCP servers. Claude does not need to know about Okta; the Gateway handles everything via the BFF pattern.',
        '>> Setup: (1) Deploy the Agent Gateway (Docker bundle), (2) Configure backend MCP servers in the Admin UI, (3) In Claude Desktop settings or claude_desktop_config.json, add the Gateway\'s URL as a remote MCP server, (4) On first connection, the Agent Gateway initiates OAuth via the BFF pattern — Claude sees a standard OAuth prompt, (5) After auth, Claude can call all tools exposed by the configured backends, with per-agent ACLs and per-call audit enforced by the Gateway.',
        'TT "Your developers are probably already using Claude Code or Claude Desktop with MCP. The Agent Gateway slots in as the MCP server endpoint — Claude connects to it like any other MCP server. The difference: every tool call goes through Okta auth, gets per-user scoping, and produces an audit event. Zero changes to the Claude configuration beyond pointing at a different URL."',
      ],
      labeledCallouts: [
        {
          label: 'Pattern',
          labelColor: 'blue',
          text: 'The Agent Gateway is a remote MCP server from Claude\'s perspective. In claude_desktop_config.json, add the Gateway URL under mcpServers — Claude initiates a standard MCP connection. On first use, the Gateway triggers an OAuth BFF flow: Claude presents an auth prompt, the user authenticates with Okta, and the Gateway issues a session token. All subsequent tool calls carry that session — the Gateway enforces per-agent ACLs and writes an audit event for each call.',
        },
        {
          label: 'Caveat',
          labelColor: 'amber',
          text: 'The BFF pattern means the Agent Gateway holds the OAuth session, not Claude. If the Gateway restarts or the session expires, Claude will re-authenticate on the next tool call. For long-running Claude Code sessions, this can interrupt work mid-task. Configure Gateway session TTL to match expected session duration, and ensure the OAuth client has a refresh token grant to avoid hard re-authentication.',
        },
        {
          label: 'Demo Tip',
          labelColor: 'emerald',
          text: 'The fastest demo path: deploy the Gateway Docker bundle locally, register one backend MCP server (the O4AA sample MCP server works well), add the Gateway URL to claude_desktop_config.json, and restart Claude Desktop. The entire setup takes under 10 minutes. Then show the Okta Admin Console — every tool call Claude makes appears as an audit event with the user identity and tool name.',
        },
      ],
    },
    {
      heading: 'Generic Pattern (Any Framework)',
      paragraphs: [
        'For frameworks not listed above, the integration follows a framework-agnostic pattern. The key insight: Okta integration happens at the tool call boundary, not at the framework level. Any framework that makes HTTP calls to external APIs can use Okta tokens.',
        '>> Universal integration steps: (1) Authenticate the user via Okta (Auth Code + PKCE or Device Authorization Grant), (2) Store the user\'s access token in the agent\'s session context, (3) Before each tool call, exchange the user\'s token for a scoped delegated token via POST to /oauth2/{authServerId}/v1/token with grant_type=urn:ietf:params:oauth:grant-type:token-exchange, (4) Use the delegated token as the Bearer credential for the tool call, (5) Discard the delegated token after use (do not cache).',
        '?? Which agent framework is the customer using? This determines the integration pattern. If they are using MCP, point them at the Agent Gateway. If they are using direct API calls, walk them through the OBO token exchange integration at the tool call boundary.',
      ],
      timeline: [
        {
          label: 'Step 1',
          title: 'Authenticate the user',
          description: 'The user authenticates via Okta using Auth Code + PKCE (browser-based agents) or Device Authorization Grant (CLI/headless agents). The result is a user access token stored in the agent\'s session context.',
        },
        {
          label: 'Step 2',
          title: 'Store token in session context',
          description: 'The user\'s access token is passed into the agent\'s task or session context. Every subsequent tool call in this session will use this token as the subject_token in the exchange request.',
        },
        {
          label: 'Step 3',
          title: 'Exchange token before each tool call',
          description: 'Before calling any protected API, POST to /oauth2/{authServerId}/v1/token with grant_type=urn:ietf:params:oauth:grant-type:token-exchange, subject_token (the user\'s token), and the target audience for this specific tool. Okta returns a scoped delegated token.',
        },
        {
          label: 'Step 4',
          title: 'Call the tool with the delegated token',
          description: 'Use the delegated token as the Bearer credential in the Authorization header of the tool call. The API validates the token and sees both the user identity (sub) and the agent identity (client_id) in the claims.',
        },
        {
          label: 'Step 5',
          title: 'Discard the delegated token',
          description: 'After the tool call completes, discard the delegated token. Do not cache or reuse it for subsequent calls. Each tool call must trigger a fresh exchange. This is what enables per-call audit granularity and enforces the minimal privilege principle.',
        },
      ],
    },
    {
      heading: 'The Four Supported Access Patterns',
      paragraphs: [
        'Okta for AI Agents secures agent-to-resource communication through four distinct patterns, each implemented as a Managed Connection on a registered AI agent (Workload Principal). The right pattern depends on what the downstream resource supports and whether user-level context is required. [Source: Okta for AI Agents: Supported Access Patterns reference document]',
        '>> Pattern 1 — Cross App Access (XAA) [RECOMMENDED]: Delegated, user-context-aware access via ID-JAG. The agent exchanges the user\'s ID token for a scoped, ephemeral access token through Okta\'s authorization servers. Every token carries both sub (the user) and client_id (the agent), preserving full identity context. Managed Connection type: Authorization Server. Use when: the resource supports it — always prefer this. Pattern 2 — Secure Token Service (STS) [BROKERED CONSENT]: Okta brokers third-party OAuth tokens. The user provides one-time consent, Okta vaults the token via Privileged Access, and the agent retrieves short-lived federated tokens at runtime. Managed Connection type: Secret (vaulted OAuth token). Use when: accessing third-party SaaS (GitHub, Slack, Google Workspace) that supports OAuth but not XAA, and user context matters.',
        '>> Pattern 3 — Pre-Shared Key (VAULTED SECRET) [STATIC CREDENTIALS]: Static credentials (API keys, bearer tokens) vaulted in Okta Privileged Access. The agent retrieves the secret at runtime via Resource Indicator. No user context — agent-level access only. Managed Connection type: Secret. Use when: the resource only supports API key auth with no OAuth option. Pattern 4 — Service Account [LEGACY]: Username/password credentials managed through Okta Privileged Access. The agent authenticates as a shared service account. No user context, no scope narrowing, broad static permissions. Managed Connection type: Service Account. Use when: username/password is the sole authentication method available. Okta docs explicitly state this is "not as secure as the authorization server or vaulted secret resource types."',
        '>> Quick comparison — User context in token: XAA yes, STS yes, Pre-Shared Key no, Service Account no. Scope narrowing per request: XAA yes, STS per-connection, Pre-Shared Key none, Service Account none. Ephemeral credentials: XAA yes (minutes TTL), STS yes (access tokens), Pre-Shared Key no (static), Service Account no (static). Audit attribution: XAA user+agent+txn ID, STS user+agent, Pre-Shared Key agent only, Service Account service account only. Revocation granularity: XAA per-user/agent/session, STS per-connection, Pre-Shared Key per-secret, Service Account per-account (shared). Strategic direction: XAA = primary investment, STS = bridge to XAA, Pre-Shared Key = legacy support, Service Account = migrate away.',
        'TT "When a customer asks how to connect their agent to a resource, the decision tree is simple: Can the resource do XAA? Use XAA. Can it do OAuth but not XAA? Use STS. Only API keys? Vault it with Pre-Shared Key. Only username/password? Service Account, but plan to migrate. The goal is to get every connection to XAA over time — that\'s where you get user context, ephemeral tokens, per-request scope narrowing, and full audit attribution."',
      ],
      mermaidDiagrams: [
        {
          title: 'Access Pattern Decision Tree',
          code: `graph TB
    START["🤖 Agent needs to<br/>access a resource"]
    Q1{"Can the resource<br/>support XAA?"}
    Q2{"Can it support<br/>OAuth (not XAA)?"}
    Q3{"Does it support<br/>API key auth?"}

    XAA["✅ XAA — Cross App Access<br/>─────────────────<br/>User context in token<br/>Ephemeral (minutes TTL)<br/>Per-request scope narrowing<br/>Full audit: user+agent+txn ID<br/>RECOMMENDED"]

    STS["🔐 STS — Secure Token Service<br/>─────────────────<br/>User context via consent<br/>Okta vaults OAuth token<br/>Short-lived federated tokens<br/>Bridge pattern to XAA"]

    PSK["🔑 Pre-Shared Key<br/>─────────────────<br/>Agent-level access only<br/>Static credential vaulted<br/>No user context<br/>Legacy support"]

    SA["⚠️ Service Account<br/>─────────────────<br/>Shared username/password<br/>No user context<br/>Broad static permissions<br/>Migrate away from this"]

    START --> Q1
    Q1 -->|"Yes"| XAA
    Q1 -->|"No"| Q2
    Q2 -->|"Yes"| STS
    Q2 -->|"No"| Q3
    Q3 -->|"Yes"| PSK
    Q3 -->|"No — password only"| SA

    style XAA fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style STS fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style PSK fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style SA fill:#f0e6e6,stroke:#b88080,stroke-width:2px,stroke-dasharray:4 4
    style START fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px`,
          caption: 'Decision tree for selecting an access pattern. Always try XAA first — it gives the strongest security posture with user context and ephemeral tokens. Service Account (red, dashed) is a legacy fallback — plan to migrate away.',
        },
      ],
    },
    {
      heading: 'Component Architecture Mapping',
      paragraphs: [
        'The O4AA Sample Guide provides a concrete mapping between O4AA concepts and Okta Admin Console objects. This mapping is essential for SEs setting up demos and for customers implementing O4AA in their environments: [Source: O4AA Sample Guide v1.6.0]',
        '>> Component architecture mapping: Chat Assistant (the AI agent your users interact with) = Agent Identity in Okta (registered as a Workload Principal in Universal Directory with a wlp_ prefixed ID). Agentic App (the application hosting the agent) = OIDC App in Okta (Web Application type, OpenID Connect, Federation Broker Mode). MCP Server authorization (the backend resource the agent accesses) = Okta Custom Authorization Server (defines scopes, claims, and access policies for the resource). Initial user authentication = Okta Org Authorization Server (issues the ID Token that starts the XAA chain). Agent credential = RSA key pair generated in the Credentials tab of the agent identity (the private key signs requests, the public key is stored in Okta).',
        'TT "When setting up O4AA, the mental model is: the agent gets an identity (Workload Principal), the app gets an OIDC registration, and each backend resource gets its own custom authorization server. The Managed Connection ties the agent identity to the resource auth server. The ID-JAG flow chains them together: user authenticates at the Org Auth Server, the agent exchanges the ID Token for an ID-JAG assertion, and presents it to the resource\'s Custom Auth Server for a scoped access token. Every component maps to something already familiar in the Okta Admin Console."',
      ],
      conceptGrid: [
        {
          label: 'Chat Assistant',
          text: '→ Workload Principal in Universal Directory (wlp_ prefixed ID, represents the agent\'s unique identity)',
        },
        {
          label: 'Agentic App',
          text: '→ OIDC App in Okta Admin Console (Web Application type, OpenID Connect, Federation Broker Mode enabled)',
        },
        {
          label: 'MCP Server Authorization',
          text: '→ Okta Custom Authorization Server (defines scopes, claims, and access policies for the backend resource)',
        },
        {
          label: 'Initial User Authentication',
          text: '→ Okta Org Authorization Server (issues the ID Token that starts the XAA / ID-JAG chain)',
        },
        {
          label: 'Agent Credential',
          text: '→ RSA Key Pair in the Credentials tab of the Workload Principal (private key signs requests; public key stored in Okta)',
        },
        {
          label: 'Managed Connection',
          text: '→ Ties the Workload Principal to a specific Custom Authorization Server — the configuration object that enables the ID-JAG exchange for a given resource',
        },
      ],
    },
  ],
};
