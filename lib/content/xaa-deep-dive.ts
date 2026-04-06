import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'xaa-deep-dive',
  title: 'XAA Deep Dive',
  description:
    'How Okta\'s Cross App Access protocol solves enterprise-governed machine-to-machine communication — the technical flow, the identity assertion mechanism, and how to demo it end-to-end.',
  tags: ['XAA', 'cross-app-access', 'ID-JAG', 'OAuth', 'enterprise', 'EA'],
  icon: '🔗',
  hasDiagram: true,
  diagramPrompt:
    'Three-party flow diagram: Requesting App on left, Identity Provider (IdP) in center highlighted in amber, Resource App on right. Arrows: 1-Requesting App authenticates to IdP, 2-IdP issues identity assertion, 3-Requesting App presents assertion to Resource App, 4-Resource App validates and issues access token. Warm cream background, flat technical style.',
  cards: [
    {
      heading: 'What is Cross App Access (XAA)?',
      paragraphs: [
        'Cross App Access (XAA) is a new protocol from Okta designed to give enterprise IT administrators centralized, policy-driven control over how applications — including AI agents — communicate with one another. The protocol addresses a structural gap in standard OAuth 2.0: because OAuth consent screens rely on individual users granting permissions, enterprises have historically had no effective way to regulate app-to-app or agent-to-app communication at the organizational level. A user can consent to an app accessing another app\'s data, but the IT admin has no visibility into that grant and no mechanism to revoke or audit it centrally.',
        'With AI agents increasingly acting as autonomous systems that communicate across enterprise applications — reading data from one system, writing results to another, triggering workflows across platforms — the absence of IT oversight over these connections becomes a material security and compliance risk. XAA closes this gap. Rather than relying on user consent to authorize cross-app communication, XAA lets enterprise IT admins create "managed connections" between registered applications. These connections define which app can reach which other app, under what conditions, and with what level of trust — entirely from the Admin Console, without requiring individual users to make that determination themselves.',
        'Technically, XAA works by introducing a new trust artifact: the Identity Assertion JWT, or ID-JAG. When a requesting app needs to access a resource app, it goes to Okta to obtain an ID-JAG — a short-lived, Okta-signed token that asserts user identity plus enterprise-level authorization. This is fundamentally different from a standard OAuth access token or a client credentials grant because the trust does not originate from a user consent screen. It originates from an IT admin\'s managed connection policy. The resource app validates the ID-JAG against Okta\'s public keys, and if the assertion is valid and the connection is authorized, it issues a scoped access token for the requesting app to use.',
        '!! XAA is currently available as a self-service Early Access feature. To enable it in any Okta org, navigate to Admin Console > Settings > Features > Early Access and toggle on "Cross App Access." No support ticket or account team enablement is required — any admin can activate it today and begin creating managed connections through the standard application configuration UI.',
      ],
      mermaidDiagrams: [
        {
          title: 'XAA Three-Party Trust Model',
          code: `graph TB
    Admin["🧑‍💼 IT Admin<br/><i>Creates managed connections</i>"]

    subgraph Okta["🔐 Okta Identity Provider"]
        MC["Managed Connection<br/>Policy Engine"]
        JAG["ID-JAG Issuer<br/>(RS256 signed)"]
        JWKS["JWKS Endpoint<br/>(Public keys)"]
    end

    subgraph Requesting["🤖 Requesting App (AI Agent)"]
        Auth["Client Credentials<br/>Authentication"]
        Exchange["Token Exchange<br/>ID token → ID-JAG"]
    end

    subgraph Resource["🌐 Resource App (API)"]
        Validate["JWT Validation<br/>via Okta JWKS"]
        Issue["Access Token<br/>Issuance"]
        API["Protected API<br/>Endpoints"]
    end

    Admin -->|"configures"| MC
    Auth -->|"1. authenticates"| MC
    MC -->|"2. policy check ✓"| JAG
    JAG -->|"3. issues ID-JAG"| Exchange
    Exchange -->|"4. presents ID-JAG<br/>RFC 7523 JWT Bearer"| Validate
    Validate -.->|"fetches keys"| JWKS
    Validate -->|"5. validated ✓"| Issue
    Issue -->|"6. scoped token"| API

    style Okta fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Requesting fill:#e6f0eb,stroke:#80b89a
    style Resource fill:#f0ede6,stroke:#c4b99a`,
          caption: 'Trust flows through Okta — the resource app never directly trusts the requesting app',
        },
      ],
    },
    {
      heading: 'XAA Token Structure',
      paragraphs: [
        'An XAA token issued through ID-JAG exchange carries both the user identity and the agent identity in a single JWT. This is the concrete mechanism that preserves attribution at every hop in the delegation chain. Example token payload: [Source: Okta for AI Agents: Supported Access Patterns]',
        '>> XAA token fields: sub (the user: "sarah@acme.com") — who authorized this action. client_id (the agent: "sales-assistant") — which agent performed this action. aud (the resource: "salesforce-mcp") — what resource this token grants access to. scope (the permissions: "opportunities:read") — what the agent is allowed to do. nbf/exp (time bounds: ~5 minute window) — when this token is valid. jti (transaction ID) — unique identifier for audit trail correlation. Every field is logged in Okta System Log events under app.oauth2.token.grant.id_jag, giving security teams the complete story: who authorized it, which agent did it, on what resource, with what permissions, and when. Note: Okta\'s current implementation uses client_id (not the RFC 8693 act claim) to identify the agent in both the ID-JAG and the resulting access token.',
        '!! The dual-identity structure (sub + client_id) is what makes XAA fundamentally different from both impersonation (where the agent IS the user) and machine identity (where the agent is only itself). With XAA, the downstream API can answer two questions simultaneously: "which user authorized this?" AND "which agent performed this?" No other access pattern provides this level of attribution.',
        '!! Key insight from the access patterns reference: MCP Server support and Agent-to-Agent (A2A) are not new access patterns — they are extensions of the XAA foundation to new protocol surfaces. The same ID-JAG delegation model, the same token structure (sub + client_id), and the same Okta policy enforcement apply. Organizations building on XAA today will inherit MCP and A2A capabilities as they ship.',
      ],
      mermaidDiagrams: [
        {
          title: 'ID-JAG Token Anatomy',
          code: `graph LR
    subgraph Header["JWT Header"]
        H1["alg: RS256"]
        H2["typ: oauth-id-jag+jwt"]
    end

    subgraph Payload["JWT Payload — Dual Identity"]
        direction TB
        P_USER["<b>sub</b>: sarah@acme.com<br/><i>The delegating user</i>"]
        P_AGENT["<b>client_id</b>: sales-assistant<br/><i>The acting agent</i>"]
        P_AUD["<b>aud</b>: https://resource.example/<br/><i>Target authorization server</i>"]
        P_SCOPE["<b>scope</b>: opportunities:read<br/><i>Granted permissions</i>"]
        P_TIME["<b>exp</b>: ~5 min TTL<br/><i>Short-lived assertion</i>"]
        P_JTI["<b>jti</b>: unique-txn-id<br/><i>Audit trail correlation</i>"]
    end

    subgraph Signature["RS256 Signature"]
        S1["Signed by Okta<br/>JWKS-verifiable"]
    end

    Header --> Payload --> Signature

    style Header fill:#e6f0eb,stroke:#80b89a
    style Payload fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Signature fill:#f0ede6,stroke:#c4b99a`,
          caption: 'The ID-JAG carries dual identity (sub + client_id) in a single short-lived, Okta-signed JWT',
        },
        {
          title: 'XAA vs Traditional OAuth — Trust Model Comparison',
          code: `graph TB
    subgraph Traditional["Traditional OAuth 2.0"]
        U1["👤 User"] -->|"consents via<br/>consent screen"| App1["App A"]
        App1 -->|"forwards token<br/>or uses service account"| App2["App B"]
        Note1["❌ IT admin has<br/>no visibility"]
    end

    subgraph WithXAA["With XAA / ID-JAG"]
        U2["👤 User"] -->|"authenticates"| Agent2["🤖 Agent"]
        Admin2["🧑‍💼 IT Admin"] -->|"pre-authorizes<br/>managed connection"| IdP2["🔐 Okta"]
        Agent2 -->|"token exchange"| IdP2
        IdP2 -->|"ID-JAG assertion"| Agent2
        Agent2 -->|"JWT Bearer grant"| Res2["🌐 Resource"]
        Res2 -.->|"validates via JWKS"| IdP2
        Note2["✅ Centralized control<br/>Full audit trail"]
    end

    style Traditional fill:#fff5f5,stroke:#e8a0a0
    style WithXAA fill:#f0f8f0,stroke:#80b89a`,
          caption: 'Traditional OAuth relies on user consent with no IT oversight. XAA centralizes trust through the IdP with admin-governed managed connections.',
        },
      ],
    },
    {
      heading: 'The XAA / ID-JAG Technical Flow',
      image: 'diagrams/scope-attenuation.png',
      paragraphs: [
        'The XAA flow is a four-step exchange that replaces ad-hoc cross-app trust with a verifiable, Okta-mediated chain of assertions. Understanding each step is important for positioning the protocol accurately — and for explaining to technical audiences why this is meaningfully different from existing approaches like client credentials or JWT bearer grants used without an identity layer.',
        'Step 1: The requesting app — typically an AI agent or an integration service — authenticates to Okta using the Client Credentials grant type. This establishes the app\'s machine identity with Okta. The app presents its client ID and client secret (or a signed JWT assertion if using private key JWT authentication). Okta validates the credential and confirms that this registered app has a valid managed connection to the target resource app. This step is the IT policy enforcement gate: if no managed connection exists between the two apps, the flow stops here.',
        'Step 2: Okta issues an Identity Assertion JWT — the ID-JAG. This is a short-lived, RS256-signed token with specific claims: the subject (sub) claim carries the user\'s identity that the requesting app is acting on behalf of, the audience (aud) claim identifies the resource app\'s authorization server, and the issuer (iss) claim is the Okta org. The ID-JAG is not an access token — it cannot be used directly to call the resource app\'s API. It is an assertion from Okta that says: "this requesting app is authorized by enterprise policy to act on behalf of this user when talking to this resource app." The signing key is Okta\'s JWKS-published key, so the resource app can verify it without any out-of-band coordination with the requesting app.',
        'Step 3: The requesting app presents the ID-JAG to the resource app\'s authorization server using the JWT Bearer grant type defined in RFC 7523. This is a standard OAuth 2.0 grant type — the requesting app sends the ID-JAG in the assertion parameter of a token request to the resource app\'s /token endpoint. The requesting app also includes the scopes it needs for its intended API calls. Critically, the requesting app is not asking for a trust grant from the resource app directly. It is presenting a credential that was issued by a mutually trusted third party — Okta — and relying on the resource app to validate that credential through Okta.',
        '!! Step 4: The resource app\'s authorization server validates the ID-JAG by fetching Okta\'s JWKS endpoint and verifying the token\'s signature. It checks the aud claim to confirm the assertion was issued for this specific resource app, the sub claim to establish user identity, and the expiry to reject stale assertions. If validation passes, the resource app issues a scoped access token to the requesting app. This access token is standard — it can be used as a Bearer token for the resource app\'s API calls. The entire validation chain runs through Okta: the resource app never directly trusts the requesting app. It trusts only Okta\'s signed assertion that the requesting app was authorized to make this connection. This is the architectural guarantee that makes XAA enterprise-grade: trust is delegated to the IdP, not bilaterally negotiated between applications.',
      ],
      timeline: [
        { label: 'Step 1', title: 'Client Credentials Auth', description: 'Requesting app authenticates to Okta with client ID + secret. Okta verifies a managed connection exists to the target resource app. No connection = flow stops.' },
        { label: 'Step 2', title: 'ID-JAG Issuance', description: 'Okta issues an Identity Assertion JWT — short-lived, RS256-signed. Contains sub (user), aud (resource app), iss (Okta org). Not an access token — an assertion.' },
        { label: 'Step 3', title: 'JWT Bearer Grant', description: 'Requesting app presents ID-JAG to resource app\'s /token endpoint via RFC 7523 JWT Bearer grant type. Includes requested scopes.' },
        { label: 'Step 4', title: 'Validation & Token Issue', description: 'Resource app validates ID-JAG against Okta\'s JWKS, checks aud/sub/exp claims. Issues scoped access token. Trust chain runs entirely through Okta.' },
      ],
      mermaidDiagrams: [
        {
          title: 'XAA / ID-JAG Detailed Sequence',
          code: `sequenceDiagram
    participant User as 👤 User
    participant WebApp as 🖥️ Web App
    participant Agent as 🤖 AI Agent
    participant OktaOrg as 🔐 Okta Org AS
    participant OktaRes as 📋 Resource AS (Okta)
    participant API as 🌐 Protected API

    Note over User,WebApp: Step 0 — User Authentication
    User->>WebApp: Login (Auth Code + PKCE)
    WebApp->>OktaOrg: Authorization request
    OktaOrg-->>WebApp: ID Token + Access Token
    WebApp->>Agent: Pass ID Token

    Note over Agent,OktaOrg: Step 1-2 — Token Exchange for ID-JAG
    Agent->>OktaOrg: POST /oauth2/v1/token<br/>grant_type=token-exchange<br/>requested_token_type=id-jag<br/>subject_token=<ID Token><br/>client_assertion=<signed JWT>
    Note over OktaOrg: Check managed connection ✓<br/>Validate subject token ✓<br/>Verify agent identity ✓
    OktaOrg-->>Agent: ID-JAG (5 min TTL)<br/>typ: oauth-id-jag+jwt

    Note over Agent,OktaRes: Step 3-4 — JWT Bearer Exchange
    Agent->>OktaRes: POST /oauth2/{asId}/v1/token<br/>grant_type=jwt-bearer<br/>assertion=<ID-JAG><br/>client_assertion=<signed JWT>
    OktaRes->>OktaOrg: Fetch JWKS (cached)
    Note over OktaRes: Verify signature ✓<br/>Check aud matches ✓<br/>Check sub identity ✓<br/>Check client_id ✓<br/>Check exp not stale ✓
    OktaRes-->>Agent: Access Token (scoped)

    Note over Agent,API: Step 5 — API Call
    Agent->>API: GET /api/todos<br/>Authorization: Bearer <token>
    API-->>Agent: Response data`,
          caption: 'Complete XAA flow: User auth → ID token handoff → Token exchange → ID-JAG → JWT Bearer → Scoped access token → API call',
        },
      ],
    },
    {
      heading: 'XAA Result',
      paragraphs: [
        'The practical result is that every cross-app connection in an enterprise — including all agent-to-app calls — is mediated by a Okta-signed identity assertion that IT admins authorized in advance. This means connections can be audited, reviewed, and revoked centrally. If an AI agent is decommissioned, the admin removes its managed connection in the Admin Console and the ID-JAG issuance stops immediately. No user consent screens to track down, no OAuth grants scattered across user accounts, no service account passwords to rotate.',
      ],
    },
    {
      heading: 'Demo Setup and xaa.dev',
      paragraphs: [
        '!! For quick experimentation with XAA without any local environment setup, xaa.dev is a free browser-based playground launched in beta in January 2026. It lets you walk through the ID-JAG issuance and JWT Bearer exchange steps interactively, inspect the claims in each token, and understand the flow before committing to a full local demo. It is especially useful for technical discovery conversations where you want to show the protocol in action without requiring the prospect to configure anything.',
        'For a full, end-to-end local demo, the reference implementation lives in the oktadev/okta-secure-ai-agent-example GitHub repository. The setup is driven by a single bootstrap script: running pnpm run bootstrap:okta against a target Okta org automatically provisions all the required infrastructure. This includes a custom authorization server named "Todo MCP Authorization Server," three custom OAuth scopes (mcp:connect, mcp:tools:read, and mcp:tools:manage), two OIDC application registrations (Agent0 representing the AI agent and Todo0 representing the todo management API), an agent machine identity with an RSA key pair, a managed XAA connection between the two apps, and access policies that allow the JWT Bearer grant type. The script handles the entire org configuration in a single pass — there is no manual Admin Console work required after running it.',
        'The demo scenario has Agent0 — an AI agent powered by Claude via Amazon Bedrock — using XAA to access Todo0, a simple todo management API. The agent authenticates to Okta, receives an ID-JAG asserting the user\'s identity plus the managed connection authorization, presents that ID-JAG to Todo0\'s authorization server via RFC 7523 JWT Bearer grant, and receives a scoped token to call the todo API. The full flow is visible in browser developer tools and in the Okta system log, making it straightforward to show the complete trust chain during a demo.',
        '>> To enable XAA in any developer or sandbox Okta org before running the bootstrap script, go to Admin Console > Settings > Features > Early Access and turn on the "Cross App Access" toggle. This is a self-service activation — no feature flag request or support case needed. Once enabled, the managed connection UI appears under the application configuration for any registered app, and the ID-JAG issuance endpoint becomes available for testing.',
        'Okta\'s Cross App Access (XAA) protocol has been integrated into MCP (Model Context Protocol) as \'Enterprise-Managed Authorization\' — a standardized mechanism for enterprise-grade secure agent connections across domain boundaries. This means XAA is not just an Okta-proprietary protocol; it is becoming part of the MCP standard that AI agent platforms implement. When a customer asks \'what is Okta\'s role in the MCP standard?\', the answer is: Okta contributed Enterprise-Managed Authorization (XAA) to MCP, and Okta is the only pure-play identity provider at Gold or Platinum level in the AAIF (Agentic AI Foundation). [Source: Kundan Kolhe blog Post 7; AAIF membership]',
      ],
    },
  ],
};
