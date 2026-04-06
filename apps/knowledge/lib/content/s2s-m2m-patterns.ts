import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 's2s-m2m-patterns',
  title: 'S2S & M2M Identity Patterns',
  description:
    'Server-to-server and machine-to-machine identity patterns for AI agents — what\'s standardized (OAuth 2.1, SPIFFE, mTLS), what\'s emerging (RFC 8693 delegation chains, CAEP/SSF, DPoP), the critical gaps, and where Okta XAA fits.',
  tags: ['S2S', 'M2M', 'OAuth', 'SPIFFE', 'RFC-8693', 'CAEP', 'DPoP', 'mTLS', 'token-exchange'],
  icon: '🔐',
  hasDiagram: true,
  diagramPrompt:
    'Layered architecture diagram showing three horizontal bands: bottom band "Infrastructure Identity" with SPIFFE/SPIRE and mTLS icons, middle band "Token Security" with OAuth 2.1, DPoP, and RFC 8693 Token Exchange, top band "Continuous Evaluation" with CAEP/SSF and IPSIE. On the right side, a vertical "XAA / ID-JAG" bar spans all three layers. Navy and amber palette, flat technical illustration.',
  cards: [
    {
      heading: 'Why SEs Need This: Spec vs Production Reality',
      paragraphs: [
        '!! When a customer\'s engineering team says "we use OAuth for our agents," dig deeper. CSA/Strata survey (285 IT/security professionals, Sept-Oct 2025): 44% use static API keys for agent auth, 43% use username/password, and only 18% are highly confident their IAM can handle agent identities. Astrix Security analyzed 5,200+ open-source MCP servers (October 2025): 53% rely on static API keys, only 8.5% use OAuth. The gap between what specs recommend and what developers deploy is the largest in the identity space.',
        'This section maps the S2S/M2M identity landscape so you can have architecture-level conversations about where the customer is today vs where they need to be. It covers what\'s production-ready, what\'s emerging, and the critical gaps that Okta fills.',
      ],
    },
    {
      heading: 'Production-Ready: What You Can Count On',
      paragraphs: [
        'These patterns are standardized, implemented by multiple vendors, and deployed at enterprise scale. They form the foundation any AI agent architecture should build on.',
      ],
      accordion: [
        {
          title: 'OAuth 2.1 + Client Credentials (IETF draft-ietf-oauth-v2-1-15)',
          content: [
            'OAuth 2.1 consolidates RFC 6749 with security best practices: mandatory PKCE, no implicit grant, no ROPC, short token lifetimes. The IETF draft is at v15 (March 2026) — still not an RFC (4 years past the WG milestone), but the requirements are stable and widely implemented. MCP mandates OAuth 2.1 as of the November 2025 spec.',
            'Client Credentials grant remains the dominant M2M pattern: the agent authenticates with client ID + secret, receives a scoped access token. The gap: client ID/secret pairs are static secrets requiring manual rotation. The credential proves "this registered app" — not "this specific running container." Cloud workload identity (AWS IAM Roles, Azure Managed Identity, GCP WIF) solves the credential-free problem within each cloud, but creates silos — agents crossing cloud boundaries still fall back to static credentials.',
          ],
        },
        {
          title: 'SPIFFE/SPIRE — Workload Identity (CNCF Graduated)',
          content: [
            'SPIFFE (Secure Production Identity Framework) and SPIRE (runtime environment) graduated CNCF in September 2022 — same tier as Kubernetes. In production at Uber (4,500 services across 4 clouds), Bloomberg, Square, Netflix, Pinterest. Each workload gets an X.509 SVID (SPIFFE Verifiable Identity Document) with a URI like spiffe://acme.corp/ns/trading/sa/agent-a. Default TTL: 1 hour, auto-renewed.',
            'SPIFFE answers "is this really workload X?" It does NOT answer "can workload X access resource Y on behalf of user Z?" For AI agents acting on behalf of users, SPIFFE provides the infrastructure identity layer — OAuth provides the delegation layer on top. Neither is sufficient alone.',
            'Per-instance SPIFFE IDs for AI agents (proposed by Solo.io CTO, June 2025) are technically supported by the spec but require custom SPIRE extensions. Current Kubernetes implementations assign one SPIFFE ID per service account — all replicas of the same agent share one identity, which breaks compliance attribution for non-deterministic agents.',
          ],
        },
        {
          title: 'mTLS via Service Mesh (Istio, Linkerd, Envoy)',
          content: [
            'Service mesh mTLS with SPIFFE IDs is production-ready for Kubernetes service-to-service traffic. Istio ships with SPIFFE-compliant identity natively. Linkerd added SPIFFE support in 2.15 (November 2023). Red Hat\'s March 2026 Kagenti deployment demonstrates Istio Ambient Mesh enforcing L4 mTLS for multi-agent systems without per-pod sidecars.',
            'Critical limitation: mTLS authenticates the workload, NOT the user whose request it\'s processing. An agent calling a downstream service over mTLS proves it is the agent — not which human initiated the request. User context propagation requires a separate mechanism: OAuth token in the Authorization header, or Transaction Tokens (IETF draft) for cryptographic user-context binding.',
          ],
        },
        {
          title: 'DPoP — Key-Bound Tokens (RFC 9449, September 2023)',
          content: [
            'Standard bearer tokens are "possession is proof" — steal the token, use it anywhere. DPoP binds tokens to a public/private key pair. At each API call, the client presents a fresh DPoP proof (signed JWT). A stolen token is useless without the private key. Supported in production by Okta (June 2023), Auth0, Microsoft Entra, and Ping Identity.',
            'For AI agents: if an agent container is compromised, bearer tokens can be exfiltrated and replayed. DPoP eliminates this vector. The deployment gap: where does the agent\'s private key live? Per-agent TPM/HSM is hard at cloud scale. Per-agent key in memory is lost on restart. Token Vault with centralized key management is currently the most practical approach but not yet standardized.',
          ],
        },
      ],
    },
    {
      heading: 'Emerging: Standards Still Forming',
      paragraphs: [
        'These patterns have published specs but incomplete enterprise adoption. Position them as leading practice, not universal standard.',
      ],
      accordion: [
        {
          title: 'RFC 8693 Token Exchange + Delegation Chains',
          content: [
            'RFC 8693 (January 2020) defines OAuth 2.0 Token Exchange — a client presents an existing token to an authorization server and receives a new token with different audience, scope, or subject. The act claim encodes "Agent A acting on behalf of User X." Multi-hop nesting is supported: act within act for Agent B → Agent A → User X.',
            'Implementation status: Keycloak (GA since v26.2, May 2025), PingFederate (long-standing — co-authored the spec), Curity (production). Okta does NOT have a native RFC 8693 token exchange endpoint — XAA/ID-JAG is Okta\'s implementation, built on RFC 8693 semantics + RFC 7523 JWT Bearer assertions. Microsoft Entra\'s OBO flow is semantically equivalent but not interoperable with RFC 8693.',
            'Critical limitation: the nested act claims are informational — they record who was in the chain but provide no cryptographic proof that the chain was legitimate. A new IETF draft (Attenuating Agent Tokens, March 2026) proposes cryptographically enforced attenuation chains, but it\'s an individual submission, not a WG document.',
          ],
        },
        {
          title: 'CAEP/SSF — Continuous Access Evaluation (Finalized August 2025)',
          content: [
            'CAEP (Continuous Access Evaluation Profile) and SSF (Shared Signals Framework) were finalized by the OpenID Foundation on August 29, 2025. CAEP defines signal types (session-revoked, risk-level-change, credential-change, device-compliance-change). SSF is the transport bus carrying those signals between IdPs and apps. The spec explicitly covers "robotic users" — AI agents are in scope.',
            'This is the standards-based path to real-time agent session revocation. When an agent\'s risk level changes (prompt injection detected, credential compromise), a CAEP signal fires and the receiving app terminates the session. Okta implements this as Universal Logout for AI Agents (GA April 30, 2026), with ITP feeding CAEP signals.',
            'Vendors implementing CAEP: Okta (production), Google Workspace (beta), Microsoft Entra (preview), IBM, JAMF, SailPoint, SGNL (all production receivers). Gap: no AI-agent-specific CAEP event types exist yet. "Agent deviated from policy" is not a standard signal — vendors fill this with proprietary signals.',
          ],
        },
        {
          title: 'IPSIE — Interoperability Profile (Working Group, No Published Spec)',
          content: [
            'IPSIE is an OpenID Foundation Working Group — NOT a published specification. Chaired by Aaron Parecki (Okta). It defines profiling tiers (SL1-SL3, IL1-IL3) that certify how well SaaS apps implement underlying standards (OIDC, SCIM, CAEP, DPoP). SL2 requires CAEP Receiver support (terminate sessions on IdP signal). SL3 requires bidirectional CAEP.',
            'Enterprises cannot "implement IPSIE" yet — they implement the underlying standards that IPSIE will eventually profile. The current scope does not address non-human identities or AI agents. Okta marketing positions IPSIE as a differentiator, but this is a spec that is not finalized — position carefully with technical audiences.',
          ],
        },
      ],
    },
    {
      heading: 'The Critical Gaps',
      paragraphs: [
        'These are the unsolved problems developers face when building multi-agent systems. Each gap is an opportunity to position Okta.',
      ],
      labeledCallouts: [
        { label: 'NO DELEGATION CHAIN AUDIT FORMAT', labelColor: 'rose', text: 'No standardized audit trail format exists for multi-agent delegation chains. RFC 8693 act claims are informational, not verifiable. Enterprises needing SOX/HIPAA/PCI evidence for agent-delegated actions are building bespoke audit infrastructure. This is the sharpest gap in the space.' },
        { label: 'MCP M2M STILL GAPPED', labelColor: 'rose', text: '53% of MCP servers use static API keys. The Client Credentials extension (SEP-1046) shipped November 2025 but is optional, not baseline. XAA/Enterprise-Managed Auth (SEP-990) is similarly optional. Production adoption lags the spec.' },
        { label: 'NO CROSS-CLOUD AGENT IDENTITY', labelColor: 'amber', text: 'AWS IAM Roles, Azure Managed Identity, and GCP WIF each solve credential-free auth within their cloud. Agents crossing cloud boundaries still use static credentials. SPIFFE Federation addresses this but requires operational investment most teams don\'t have.' },
        { label: 'AGENT CARD IDENTITY UNVERIFIED', labelColor: 'amber', text: 'A2A Agent Cards at /.well-known/agent-card.json are self-declared. No standard mechanism verifies the card is authentic. Spoofing an Agent Card enables agent impersonation. GitHub issue #1672 proposes verification but no resolution yet.' },
      ],
    },
    {
      heading: 'Where XAA / ID-JAG Fits',
      paragraphs: [
        'Okta\'s Cross App Access (XAA) protocol, built on the ID-JAG IETF draft (draft-ietf-oauth-identity-assertion-authz-grant-02, Standards Track), sits at the intersection of several S2S/M2M patterns. It combines RFC 8693 token exchange semantics with RFC 7523 JWT bearer assertions, using the enterprise IdP as the authorization broker.',
        '>> What XAA solves that raw RFC 8693 doesn\'t: (1) IT admin governance — managed connections define which apps can connect, enforced at the IdP, not bilaterally negotiated. (2) IdP-mediated trust — the resource app trusts Okta\'s signed assertion, not the requesting app directly. (3) Dual identity model — sub (user) + client_id (agent) in every token, enabling per-action audit trail attribution. (4) Scope enforcement at issuance — the IdP enforces downscoping based on the managed connection policy.',
        '>> What XAA does NOT solve (be honest): (1) No native RFC 8693 endpoint — customers expecting vanilla token exchange won\'t find it. (2) Multi-hop chains beyond 2 levels are roadmap, not shipped. (3) Autonomous agents with no originating user identity are not XAA\'s design center — XAA requires a user authorization event. (4) The runtime enforcement gap between token issuance and agent action is addressed by ITP + CAEP, not by XAA itself.',
        '>> How XAA maps to MCP spec evolution: The November 2025 MCP spec added SEP-990 (Enterprise-Managed Authorization / XAA) as an optional extension. This means Okta is the IdP-mediated authorization layer for enterprise MCP deployments. When a customer asks "how do I bring my corporate IdP into the MCP auth loop," XAA is the answer.',
        'TT "There are three layers to AI agent identity: infrastructure identity (SPIFFE/mTLS — is this really agent X?), authorization (OAuth/XAA — can agent X access this resource on behalf of this user?), and continuous evaluation (CAEP/DPoP — is the authorization still valid right now?). Most enterprise stacks have the first layer. Okta adds the second and third."',
      ],
      mermaidDiagrams: [
        {
          title: 'S2S/M2M Protocol Landscape',
          code: `graph LR
    subgraph Infra["Infrastructure Identity"]
        SPIFFE["SPIFFE/SPIRE<br/>Workload Identity"]
        mTLS["mTLS<br/>Transport Auth"]
    end

    subgraph Delegation["Delegation & Authorization"]
        RFC8693["RFC 8693<br/>Token Exchange"]
        IDJAG["ID-JAG<br/>XAA Protocol"]
        OBO["Entra OBO<br/>Microsoft"]
    end

    subgraph Runtime["Runtime Enforcement"]
        FGA["Auth0 FGA<br/>Per-Resource Auth"]
        CAEP["CAEP/SSF<br/>Continuous Eval"]
        DPoP["DPoP<br/>Token Binding"]
    end

    subgraph Governance["Agent Governance"]
        CIBA["CIBA<br/>Human Approval"]
        OIG["OIG<br/>Access Reviews"]
        ISPM2["ISPM<br/>Posture Mgmt"]
    end

    SPIFFE -->|"proves identity"| RFC8693
    SPIFFE -->|"proves identity"| IDJAG
    RFC8693 -->|"issues token"| FGA
    IDJAG -->|"issues token"| FGA
    OBO -->|"issues token"| FGA
    FGA -->|"signals"| CAEP
    CAEP -->|"revokes"| DPoP
    CIBA -.->|"gates"| IDJAG
    OIG -.->|"certifies"| IDJAG
    ISPM2 -.->|"discovers"| SPIFFE`,
          caption: 'Three layers of AI agent identity: infrastructure (SPIFFE), authorization (XAA/RFC 8693), and continuous evaluation (CAEP/FGA)',
        },
        {
          title: 'XAA vs RFC 8693 vs Entra OBO — Token Structure Comparison',
          code: `graph TB
    subgraph XAA["XAA / ID-JAG"]
        X1["sub: user@acme.com"]
        X2["client_id: sales-agent"]
        X3["aud: resource-api"]
        X4["scope: read write"]
        X5["exp: 5 min TTL"]
    end

    subgraph RFC["RFC 8693 Token Exchange"]
        R1["sub: user@acme.com"]
        R2["act.sub: agent-client-id"]
        R3["aud: resource-api"]
        R4["scope: read write"]
        R5["act.act.sub: parent-agent"]
    end

    subgraph Entra["Entra OBO"]
        E1["sub: user-oid"]
        E2["appid: agent-app-id"]
        E3["aud: resource-api"]
        E4["scp: delegated scopes"]
        E5["❌ No actor chain"]
    end

    style XAA fill:#e8e5f0,stroke:#8b80b8
    style RFC fill:#e6f0eb,stroke:#80b89a
    style Entra fill:#f0ede6,stroke:#c4b99a`,
          caption: 'XAA uses client_id for agent identity, RFC 8693 uses nestable act claims, Entra OBO has no actor chain',
        },
      ],
    },
    {
      heading: 'Standards Landscape — Quick Reference',
      paragraphs: [
        'Carry this to architecture conversations. It maps what\'s production-ready vs what\'s still forming.',
      ],
      tabs: [
        {
          label: 'Production-Ready',
          content: [
            'OAuth 2.1 (draft v15, stable requirements) — MCP mandates it. Client Credentials for M2M, Authorization Code for delegated access.',
            'RFC 7523 JWT Bearer Grant — assertion-based auth used by GCP service accounts and Okta XAA.',
            'RFC 8693 Token Exchange — published 2020, supported by Keycloak, Ping, Curity. Okta uses ID-JAG semantics instead.',
            'SPIFFE/SPIRE (CNCF graduated) — workload identity at scale. Uber runs 4,500 services across 4 clouds.',
            'DPoP (RFC 9449) — key-bound tokens. Production in Okta, Auth0, Entra, Ping since 2023.',
            'CAEP + SSF (OpenID Foundation finalized August 2025) — continuous access evaluation and signal propagation.',
            'Cloud Workload Identity (AWS STS, Azure MI, GCP WIF) — credential-free within each cloud.',
          ],
        },
        {
          label: 'Emerging',
          content: [
            'ID-JAG / XAA (IETF WG draft, Standards Track) — Okta GA, IETF standardization in progress.',
            'Attenuating Agent Tokens (IETF individual draft, March 2026) — cryptographic delegation chain enforcement.',
            'Transaction Tokens (draft-ietf-oauth-transaction-tokens-08) — bind user identity + workload identity + auth context to specific transactions.',
            'IPSIE (OpenID WG, no published spec) — profiling tiers for enterprise SaaS identity interoperability.',
            'Per-instance SPIFFE IDs for AI agents — proposed pattern (Solo.io, June 2025), no standard Kubernetes operator.',
            'MCP Client Credentials (SEP-1046) and Enterprise Auth (SEP-990) — November 2025 optional extensions.',
          ],
        },
        {
          label: 'Not Yet Standardized',
          content: [
            'Delegation chain audit trail format — no standard exists. Enterprises build bespoke.',
            'AI-agent-specific CAEP event types — no "agent-deviated-from-policy" signal. Vendors use proprietary signals.',
            'Cross-cloud agent identity bridging — SPIFFE Federation is the closest, but no turnkey solution.',
            'A2A Agent Card identity verification — self-declared, no verification standard. Open GitHub proposal.',
            'Dynamic authorization for per-instance agent identities — static RBAC breaks at instance-level; needs ABAC/Cedar/OPA.',
          ],
        },
      ],
    },
  ],
};
