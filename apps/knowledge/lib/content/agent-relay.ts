import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'agent-relay',
  title: 'Agent Relay',
  description:
    'The architectural pattern for propagating user identity and scoped permissions across multi-hop AI agent chains — what it requires, where it breaks (Air Canada), how Okta implements it with XAA and ID-JAG, and how it compares to competing approaches.',
  tags: ['agent-relay', 'delegation', 'RFC-8693', 'XAA', 'ID-JAG', 'audit', 'multi-hop', 'scope-attenuation'],
  icon: '🔗',
  hasDiagram: true,
  diagramPrompt:
    'Four boxes in a vertical chain: User at top, Orchestrator Agent below, Sub-Agent below that, Resource API at bottom. Arrows between each box labeled with decreasing scope circles (large to small). On the right side, a vertical bar labeled "Okta AS — Root of Trust" spans the full height. Each arrow also connects to a small "Audit Log" box on the left. Warm amber and navy palette, flat technical illustration, white background.',
  cards: [
    {
      heading: 'What Is Agent Relay?',
      paragraphs: [
        'Agent Relay is an architectural pattern — not a formal protocol — for propagating user identity and scoped permissions across multi-hop AI agent chains. When a user authorizes an orchestrator, which delegates to a sub-agent, which calls a downstream resource API, each hop must satisfy three requirements simultaneously: the downstream must be able to verify the identity of the originating user, the scope available to the calling agent must be equal to or narrower than what the delegating principal held (monotonic scope attenuation), and an immutable audit trail must record every delegation hop. Violating any one of these requirements produces a vulnerable or ungovernable system. The canonical failure mode is the Confused Deputy: a trusted agent with broad access acts on a request it cannot attribute to a specific authorized user.',
        'The formal foundation for relay is RFC 8693 (OAuth 2.0 Token Exchange), which defines how an authorization server issues a new token that binds both a subject (the user) and an actor (the executing agent). RFC 8693 is the best available standard for single-hop delegation. For multi-hop chains, the IETF Agent Authorization Token (AAT) draft (March 2026) extends this with cryptographic invariants — six properties that a relay chain must satisfy to be considered forensically reconstructible. Okta\'s Cross App Access (XAA) and the ID-JAG token type are the most complete enterprise implementation of relay semantics available as of April 2026.',
        'Christian Posta (Solo.io field CTO) named the underlying problem the "structural identity problem" in a widely-cited February 2026 analysis: agentic systems face fragmented identity (no unified identity model across agents, tools, and users), ungoverned authorization (policy lives in individual agents rather than a shared enforcement point), and IAM scale mismatch (traditional IAM was built for human-scale identity events, not the thousands of machine-to-machine interactions a multi-agent pipeline can generate per minute). Relay is the architectural response to all three dimensions — it centralizes identity enforcement at the authorization server, applies policy at the point of token issuance, and produces a per-hop audit record by construction.',
      ],
      labeledCallouts: [
        {
          label: 'Requirement 1: User Verifiability',
          labelColor: 'blue',
          text: 'Every downstream API in the chain must be able to cryptographically verify the identity of the originating human user who initiated the workflow — not just the identity of the immediate calling agent. This requires the user\'s identity to be encoded in the token (sub claim) at every hop, not only at the first hop.',
        },
        {
          label: 'Requirement 2: Monotonic Scope Attenuation',
          labelColor: 'blue',
          text: 'Scope can only narrow as a delegation chain deepens. If a user grants records.read, no agent in the chain can acquire records.write through delegation. The authorization server enforces this at issuance time — an agent cannot request a scope that exceeds what the delegating principal held.',
        },
        {
          label: 'Requirement 3: Per-Hop Audit Trail',
          labelColor: 'blue',
          text: 'Every delegation step must be logged at the authorization server, not only at the API endpoint. This means the audit trail is built at the point of token exchange — which is centralized in Okta — rather than reconstructed after the fact from fragmented application logs.',
        },
        {
          label: 'What Relay Is NOT',
          labelColor: 'amber',
          text: 'Relay is not a product, not a single protocol, and not a replacement for OAuth 2.1. It is a set of architectural requirements that a delegation chain must satisfy. RFC 8693 satisfies these requirements for one hop. ID-JAG and XAA extend them to multi-hop chains. Service accounts, client credentials, and raw token forwarding are not relay architectures — they break at least one of the three requirements by design.',
        },
        {
          label: 'What Relay Is NOT (Protocol Confusion)',
          labelColor: 'amber',
          text: 'MCP is not a relay protocol — it is a tool-access protocol with Bearer token auth. A2A is not a relay protocol — it is an agent coordination protocol. Neither specifies how user identity propagates through delegation chains. Relay sits above both protocols in the architecture stack, providing the identity layer that MCP and A2A lack.',
        },
      ],
    },
    {
      heading: 'Case Study: Air Canada — The Confused Deputy',
      paragraphs: [
        'Moffatt v. Air Canada (2024 BCCRT 149) is the most cited real-world example of agentic identity failure — but SEs routinely misframe it. The tribunal ruling itself was narrow: Air Canada argued its chatbot was "a separate legal entity" responsible for its own representations; the tribunal rejected this and held Air Canada liable for bereavement fare misinformation the chatbot provided to passenger Jake Moffatt. The legal outcome matters, but it is not the security lesson.',
        'The security lesson is what the service account architecture made invisible. The user authenticated to the Air Canada web application via OIDC. That authentication was valid. The web application passed a prompt and the user\'s auth token to the AI agent. The agent then called downstream systems — Salesforce CRM for passenger records, Sabre GDS for fare rules — using a service account, not a token that carried the user\'s identity. At the point of downstream API access, the user\'s identity was silently dropped and replaced with a static machine credential. The SFDC system log shows "Service_Account_AI accessed Passenger Record Y." There is no trace of which user triggered that access.',
        'Two additional failure modes compounded the attribution problem. First, no unified trace ID spanned the LLM provider, the orchestrator, and the CRM — log correlation across these three systems required manual, non-deterministic reconstruction. Second, LLM providers maintain shorter log retention windows than airline reservation systems, meaning the full prompt and response chain was gone before any audit could begin. The result: a compliance investigation would find an action (bereavement fare guidance provided) but could not cryptographically link that action to an authorized user, an authorized scope, or a verified delegation chain.',
        '?? The discovery question this case surfaces for SE conversations: "If your AI agent takes an action — modifies a record, sends a customer notification, issues a refund — can you produce a unified audit trail that shows which user triggered it, which agent executed it, and which scopes were in play at each hop, from a single authoritative log source?" Almost no organization has this today. The Air Canada failure was not a chatbot hallucination problem — it was a service account architecture problem that made attribution structurally impossible.',
      ],
      conceptGrid: [
        {
          label: 'Old Way (Air Canada)',
          text: 'Service accounts with static credentials — the agent authenticates as itself, user context is lost at the first downstream API call. SFDC logs show machine identity, not user identity. Attribution is impossible.',
        },
        {
          label: 'Secure Agent Way (2026)',
          text: 'OBO tokens scoped to the originating user — the delegated token carries sub=user_id and cid=agent_id at every hop. SFDC sees both who authorized the action and which agent executed it.',
        },
        {
          label: 'Old Way (Air Canada)',
          text: 'AuthN only — the system verifies that the agent is the agent, but applies no policy to what the agent is allowed to do on behalf of which user. No intent enforcement, no scope ceiling.',
        },
        {
          label: 'Secure Agent Way (2026)',
          text: 'Policy enforcement on intent — Managed Connections define which agents can access which resources with which scopes. The authorization server enforces policy at token issuance, not at the application layer.',
        },
        {
          label: 'Old Way (Air Canada)',
          text: 'Fragmented logs across LLM provider, orchestrator, and CRM with no shared trace ID. Retention windows differ. Post-incident reconstruction is manual and incomplete.',
        },
        {
          label: 'Secure Agent Way (2026)',
          text: 'Immutable audit trails via OpenTelemetry with a unified Trace ID spanning all hops. Okta System Log is the authoritative record of every token exchange — not reconstructed from application logs.',
        },
        {
          label: 'Old Way (Air Canada)',
          text: 'No scope attenuation — the agent inherits or escalates permissions at each hop. The downstream API has no mechanism to verify that the action was within the user\'s original authorization.',
        },
        {
          label: 'Secure Agent Way (2026)',
          text: 'RFC 8693 act claim chain with monotonic scope narrowing — each hop can only grant a subset of what the delegating principal held. Scope escalation attempts fail at the authorization server, not at the API.',
        },
      ],
    },
    {
      heading: 'How Okta Implements Agent Relay (XAA + ID-JAG)',
      paragraphs: [
        'Okta\'s relay implementation combines two components: Cross App Access (XAA) as the overall framework, and ID-JAG (Identity Assertion JWT Authorization Grant) as the specific token type that carries the delegation chain. XAA is the Auth0-side EA feature; Okta for AI Agents entered EA in late 2025 and is targeted for GA on April 30, 2026. The IETF draft behind ID-JAG (draft-ietf-oauth-identity-assertion-authz-grant) has been formally adopted by the OAuth Working Group — this is not a proprietary Okta extension, it is the emerging industry standard.',
        '!! Technical setup note: XAA requires the agent application to have the Token Exchange grant type enabled in the Okta Admin Console (Grant type > Advanced). The subject token must be an access token from an Authorization Code + PKCE flow. The requested_token_type for ID-JAG exchanges is urn:ietf:params:oauth:token-type:id-jag — this is Okta-specific syntax built on the RFC 8693 extension point. Managed Connections in the Okta Admin Console define which agents are permitted to exchange tokens for which resources with which scopes — this is where organizational policy is enforced, separate from individual application code.',
        'Three credential types operate in the XAA/relay model. An Authorization Server credential (the ID-JAG token itself) carries delegated user identity and is the primary credential for human-authorized agent actions. A Secret credential (stored and rotated in OPA, Okta\'s privileged access module) is used for agent-to-service connections where a human user is not in the loop — background processing, scheduled tasks. A Service Account credential (managed in Universal Directory and optionally vaulted in OPA) is used for administrative agent operations. The relay pattern applies specifically to the Authorization Server credential type — the other two types are machine identity patterns that are appropriate for different workloads but do not carry user delegation context.',
        'TT For SE conversations: the key Okta differentiator in relay is not just the token format — it is that the enforcement point is the authorization server, not the individual application. When Okta issues an ID-JAG, it has already evaluated the Managed Connection policy, verified that this specific agent is allowed to act on behalf of this specific user for this specific resource with these specific scopes. The downstream API does not need to implement delegation logic — it validates a standard JWT and trusts that Okta has already enforced organizational policy. This is the architectural difference between relay and ad-hoc token forwarding.',
      ],
      timeline: [
        {
          label: 'Step 1',
          title: 'User Authentication',
          description: 'User authenticates to the orchestrating application via Authorization Code + PKCE flow. Okta issues an access token (the subject token). grant_type=authorization_code. This is standard OIDC — no agent-specific configuration needed at this step.',
        },
        {
          label: 'Step 2',
          title: 'ID-JAG Request (Token Exchange)',
          description: 'The orchestrator presents the user\'s access token plus its own credential to the Okta Token Exchange endpoint. grant_type=urn:ietf:params:oauth:grant-type:token-exchange, subject_token=<user access token>, requested_token_type=urn:ietf:params:oauth:token-type:id-jag. Okta validates both tokens and evaluates the Managed Connection policy for this agent + resource combination.',
        },
        {
          label: 'Step 3',
          title: 'Present ID-JAG to Custom Authorization Server',
          description: 'The orchestrator presents the ID-JAG to the Okta custom authorization server for the target resource. grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer. The AS validates the ID-JAG, confirms the delegation chain, and evaluates resource-level policies.',
        },
        {
          label: 'Step 4',
          title: 'Scoped Access Token Issued',
          description: 'Okta issues a scoped access token bound to the target resource. Token carries sub=user_id (originating user), cid=agent_client_id (executing agent), scope constrained by the Managed Connection policy. This token cannot exceed the scope of the original user token.',
        },
        {
          label: 'Step 5',
          title: 'Resource API Call',
          description: 'The agent calls the resource API using the scoped access token as a standard Bearer token. The API validates with Okta and can inspect sub + cid claims for dual attribution. Every exchange in steps 2-4 is logged in the Okta System Log with a unified event record — the authoritative audit trail.',
        },
      ],
      mermaidDiagrams: [
        {
          title: 'XAA Agent Relay Flow — 5-Step Token Exchange Chain',
          code: `sequenceDiagram
    participant U as 👤 User
    participant App as Application
    participant Orch as 🤖 Orchestrator
    participant Okta as 🔐 Okta AS
    participant API as 🌐 Resource API

    Note over U,App: Step 1 — Standard user authentication
    U->>App: Login (Auth Code + PKCE)
    App->>Okta: Authorization request
    Okta-->>App: Access token (subject token)

    Note over Orch,Okta: Step 2 — ID-JAG request (Token Exchange)
    App->>Orch: Trigger task + user access token
    Orch->>Okta: grant_type=token-exchange<br/>subject_token=<user AT><br/>requested_token_type=id-jag
    Okta->>Okta: Validate tokens<br/>Check Managed Connection policy

    Note over Orch,Okta: Step 3 — Present ID-JAG to AS
    Okta-->>Orch: ID-JAG assertion
    Orch->>Okta: grant_type=jwt-bearer<br/>assertion=<ID-JAG>
    Okta->>Okta: Validate ID-JAG chain<br/>Evaluate resource policy

    Note over Okta,API: Step 4 — Scoped access token issued
    Okta-->>Orch: Scoped AT<br/>sub=user, cid=agent<br/>scope=constrained

    Note over Orch,API: Step 5 — Agent calls resource API
    Orch->>API: Bearer scoped token
    API->>Okta: Introspect / JWKS
    Okta-->>API: Valid — user + agent identity confirmed
    API-->>Orch: Authorized response

    Note right of Okta: System Log records<br/>every exchange`,
          caption: 'Each token exchange is logged in Okta System Log — the audit trail is built at the authorization server, not reconstructed from application logs.',
        },
      ],
    },
    {
      heading: 'Scope Attenuation and Audit Trails',
      paragraphs: [
        'RFC 8693 defines the act claim as a nested JSON object that records the delegation chain. Each hop in a multi-agent relay adds a new act object nested inside the previous one, creating a cryptographic chain of custody. A three-hop chain produces a token where the outermost act is the immediate calling agent, with the previous hop\'s act nested inside, with the originating principal at the innermost level. The receiving API can traverse this structure to reconstruct the full delegation history and verify that each hop was a legitimate attenuation of the preceding one.',
        'The IETF Agent Authorization Token (AAT) draft (arXiv 2604.02767 cross-reference, March 2026) formalizes six cryptographic invariants that a relay implementation must satisfy to support offline forensic reconstruction: (1) origin binding — the token cryptographically identifies the originating principal; (2) chain continuity — every intermediate hop is represented in the token structure; (3) scope monotonicity — no hop claims permissions exceeding what it received; (4) temporal ordering — issuance timestamps are monotonically increasing through the chain; (5) key binding — each hop\'s delegation is bound to the delegating principal\'s signing key; (6) revocability — a revocation signal at any hop invalidates all downstream tokens in that chain. Standard RFC 8693 tokens satisfy invariants 1-4. ID-JAG and the AAT draft extend coverage to 5 and 6.',
        '!! Known audit gap: by the third hop in a standard OAuth delegation chain, the cryptographic linkage back to the initiating user degrades. Standard access tokens carry a sub claim but do not encode the full act chain in a way that remains verifiable after two intermediate hops. This is the gap that ID-JAG specifically addresses with its structured assertion format. SEs should not claim that RFC 8693 alone solves multi-hop audit — it provides the foundation, but ID-JAG is required for chains of three or more hops.',
        'The SentinelAgent framework (arXiv 2604.02767, April 2026) introduced "forensic reconstructibility" as a formal property: the ability to reconstruct the complete authorization history of an agent action from the token chain alone, without relying on application logs. This is the standard Okta\'s ID-JAG implementation is designed to meet. It also surfaced a property called "delegation opacity" as a risk: when intermediate agents strip or rewrite delegation claims before passing tokens downstream, the receiving API cannot distinguish legitimate delegation from impersonation.',
      ],
      labeledCallouts: [
        {
          label: 'AAT Invariant: Origin Binding',
          labelColor: 'blue',
          text: 'The token cryptographically identifies the originating principal — the human user who initiated the delegation chain. This binding must survive all intermediate hops and be verifiable by any relying party in the chain without contacting the authorization server.',
        },
        {
          label: 'AAT Invariant: Scope Monotonicity',
          labelColor: 'blue',
          text: 'No hop in the chain can claim permissions that exceed what the delegating principal held. This invariant is enforced at the authorization server at token issuance time — not at the API level. An agent requesting a broader scope than its delegator held receives an error, not a reduced-scope token.',
        },
        {
          label: 'AAT Invariant: Revocability',
          labelColor: 'blue',
          text: 'A revocation signal at any hop invalidates all downstream tokens derived from that hop. This means Universal Logout for AI Agents (Okta roadmap, GA April 30 2026) can revoke an entire delegation chain — orchestrator, all sub-agents, all tool connections — with a single signal to the Okta AS.',
        },
        {
          label: 'CVE-2025-32711: EchoLeak (May 2025)',
          labelColor: 'rose',
          text: 'Microsoft Copilot Studio exfiltrated user data via prompt injection into external connectors. Root cause: agent used service account credentials with broad scope, no per-user attenuation. Data accessible to the agent was data exfiltrable through the agent. Scope attenuation at every relay hop is the structural defense.',
        },
        {
          label: 'Security Risk: Agent Session Smuggling (Unit 42)',
          labelColor: 'rose',
          text: 'Unit 42 demonstrated extraction of OAuth tokens from MCP tool responses through prompt injection, allowing attackers to replay agent sessions with the victim\'s delegated permissions. Key-bound tokens (DPoP, RFC 9449) and short token lifetimes are the mitigations. Standard bearer tokens in relay chains are vulnerable to this attack vector.',
        },
        {
          label: 'Security Risk: Cross-Agent Privilege Escalation (Rehberger, 2025)',
          labelColor: 'rose',
          text: 'Johann Rehberger demonstrated that a compromised agent in a multi-agent chain can present forged or manipulated act claims to claim delegation it was never granted. ID-JAG\'s structured assertion format with cryptographic binding at each hop is the defense — but only if the receiving API validates the full chain, not just the outermost token.',
        },
      ],
      mermaidDiagrams: [
        {
          title: 'RFC 8693 act Claim Nesting — Three-Hop Chain',
          code: `graph TB
    subgraph Token["Access Token Claims at Hop 3"]
        sub["sub: user@example.com<br/><i>Originating user — never changes</i>"]
        act_outer["act: \\{<br/>  sub: sub-agent-id,<br/>  act: \\{<br/>    sub: orchestrator-id,<br/>    act: \\{<br/>      sub: user@example.com<br/>    \\}<br/>  \\}<br/>\\}<br/><i>RFC 8693 nested act chain</i>"]
        scope["scope: records.read<br/><i>Final attenuated scope (monotonic)</i>"]
        aud["aud: resource-api.acme.com<br/><i>Audience-bound, non-transferable</i>"]
    end

    subgraph Validation["Chain Validation at Resource API"]
        V1["1. Verify outermost act = sub-agent (caller)"]
        V2["2. Verify nested act = orchestrator (delegator)"]
        V3["3. Verify innermost sub = originating user"]
        V4["4. Verify scope monotonicity at each nesting level"]
        V5["5. Verify each hop was authorized via Okta System Log"]
    end

    Token --> Validation

    style Token fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Validation fill:#e6f0eb,stroke:#80b89a,stroke-width:2px`,
          caption: 'RFC 8693 act claim nesting encodes the full delegation chain inside the token. The receiving API validates each hop without contacting the AS — the chain is self-describing and cryptographically bound.',
        },
      ],
    },
    {
      heading: 'Agent Relay vs Competing Approaches',
      paragraphs: [
        'The relay standards landscape is unresolved as of April 2026. No vendor has shipped a complete, interoperable multi-hop relay implementation. The comparison below reflects the current state — each approach has genuine strengths and real gaps. RFC 8693 is the best available foundation. Okta\'s ID-JAG is the most complete enterprise implementation of relay semantics. The competitive differentiation is real but should be framed as "where the market is going and where Okta is today" rather than "we have solved this and others have not."',
        'TT Positioning guidance: when a prospect asks "how does Okta\'s agent relay compare to [competitor]?", the honest answer has two parts. First, acknowledge what the competitor does well — Microsoft Entra has the strongest multi-hop OBO implementation for Microsoft-stack environments; SGNL/CrowdStrike has the strongest runtime enforcement story for MCP gateways. Second, position Okta\'s unique contribution: the ID-JAG token type is the only relay implementation backed by a formal IETF standard with a co-author from the vendor (Aaron Parecki), and Managed Connections provide the centralized policy enforcement that per-agent implementations cannot. Okta wins when the customer has a multi-cloud, multi-vendor agent environment where vendor-neutral identity is a requirement.',
      ],
      labeledCallouts: [
        {
          label: 'Microsoft Entra Agent ID',
          labelColor: 'blue',
          text: 'Strongest multi-hop OBO implementation for Microsoft-stack environments. Actor facets in Entra tokens are the closest existing analog to RFC 8693 act claims, and they integrate natively with Conditional Access policies. Critical gap: zero RAG authorization story — Entra has no mechanism for document-level access control in retrieval pipelines. Wins for: pure Microsoft shops with M365 + Azure + Copilot. Loses when: non-Microsoft apps, multi-cloud, or RAG pipelines with document-level authz requirements.',
        },
        {
          label: 'Google A2A',
          labelColor: 'blue',
          text: 'Strongest agent discovery story — Agent Cards at /.well-known/agent-card.json provide a standardized capability registry. OAuth 2.0 support in the spec. Critical gap: no delegation chain in the protocol. A2A defines how agents find each other and communicate, not how user identity propagates through agent-to-agent hops. Wins for: discovery and coordination. Requires a separate relay layer (e.g., XAA) on top for identity.',
        },
        {
          label: 'MCP (Anthropic / Open Standard)',
          labelColor: 'amber',
          text: 'Single-hop Bearer token auth for agent-to-tool connections. Not a relay protocol and does not claim to be. The MCP spec has no mechanism for multi-hop delegation chain propagation. MCP + Okta XAA is the reference architecture: MCP handles the tool-access protocol layer, XAA handles the identity and delegation layer. Positioning MCP alone as a relay approach is a category error.',
        },
        {
          label: 'SGNL / CrowdStrike (MCP Gateway)',
          labelColor: 'amber',
          text: 'Strongest runtime enforcement story. SGNL intercepts MCP tool calls and applies Continuous Access Evaluation (CAEP) — if a user\'s risk posture changes (suspicious login, device compromise) mid-session, the MCP gateway revokes the agent\'s tool access in near real-time without requiring a full token refresh. CrowdStrike\'s Falcon integration brings endpoint telemetry into the access decision. Gap: single-hop, MCP-specific enforcement — does not extend to multi-hop relay chains. Wins when: real-time access revocation and endpoint risk posture are the primary requirements.',
        },
        {
          label: 'Okta XAA + ID-JAG',
          labelColor: 'blue',
          text: 'Most complete enterprise relay implementation with a formal IETF standard behind it. Managed Connections provide centralized policy enforcement across all agent types. ID-JAG carries the full delegation chain in a standardized token format. Universal Logout for AI Agents enables chain-wide revocation. Gap: XAA Beta on Auth0 side, Okta for AI Agents GA April 30 2026 — this is not a fully-shipped product yet. Wins when: multi-vendor agent environment, compliance audit requirements, vendor-neutral identity layer, or multi-hop chains beyond what OBO alone handles.',
        },
      ],
    },
  ],
};
