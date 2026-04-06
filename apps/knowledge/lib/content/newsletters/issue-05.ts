import type { NewsletterIssue } from '../../newsletter-types';

export const issue05: NewsletterIssue = {
  slug: 'newsletter-05',
  issueNumber: 5,
  title: 'Auth Flows for the Agentic Era',
  subtitle: 'The technical deep dive — token exchange, ID-JAG step by step, scope attenuation, CIBA consent, and how to demo each one. Bring your terminal.',
  date: 'April 2, 2026',
  readTimeMinutes: 12,
  heroImageAlt: 'Developer at a terminal examining token exchange flows with authentication diagrams on screen',
  tags: ['auth-flows', 'rfc-8693', 'id-jag', 'ciba', 'scope-attenuation', 'technical'],
  tldr: 'Four auth flows power O4AA: Client Credentials (agent-as-itself), Token Exchange/RFC 8693 (agent-on-behalf-of-user), ID-JAG (Okta\'s enterprise-governed delegation), and CIBA (async human approval). Scope attenuation ensures permissions narrow at every hop. This issue walks through each flow technically and gives you a 15-minute demo script.',

  sections: [
    {
      heading: 'Why This Issue Is Different',
      paragraphs: [
        'Issues #1-4 gave you the "what" and the "why." This issue gives you the "how." It\'s the most technical issue in the series — designed for the moment on a call when the customer\'s architect says "show me the flow."',
        '!! If you can whiteboard the token exchange flow and explain scope attenuation at each hop, you will earn more technical credibility in 5 minutes than any slide deck delivers in 30. This is the issue that separates "I sell an AI identity product" from "I understand how delegated authorization actually works."',
        'Four flows. Each one maps to a different trust level. By the end of this issue, you\'ll know when to use each, what the token looks like at every step, and how to demo them live.',
      ],
      conceptGrid: [
        { label: 'CLIENT CREDENTIALS', text: 'Agent authenticates as itself. No user context. For batch jobs, scheduled automation, system-level operations.' },
        { label: 'TOKEN EXCHANGE', text: 'Agent acts on behalf of a user. RFC 8693. User\'s identity embedded in a scoped, time-limited agent token.' },
        { label: 'ID-JAG', text: 'Okta\'s enterprise-governed delegation. IT admin creates managed connections. Trust flows through Okta, not between apps.' },
        { label: 'CIBA', text: 'Agent pauses for human approval. Async push to user\'s device. No approval = no token = no action.' },
      ],
    },
    {
      heading: 'Flow 1: Client Credentials',
      paragraphs: [
        'The simplest flow. The agent authenticates as itself — no user in the picture. The token carries the agent\'s own identity and scopes. Use this when the agent is doing a system-level job that doesn\'t involve acting on behalf of any specific person.',
        'The flow in three steps:',
      ],
      timeline: [
        { label: 'Step 1', title: 'Agent Authenticates', description: 'Agent sends client_id + client_secret (or private_key_jwt) to Okta\'s /token endpoint with grant_type=client_credentials.' },
        { label: 'Step 2', title: 'Okta Validates & Issues Token', description: 'Okta verifies the client credential, checks the agent\'s registered scopes, and issues an access token. Token contains sub=client_id, no user identity.' },
        { label: 'Step 3', title: 'Agent Calls API', description: 'Agent presents the Bearer token to the downstream API. API validates the token and authorizes based on the agent\'s scopes alone.' },
      ],
      labeledCallouts: [
        { label: 'WHEN TO USE', labelColor: 'emerald', text: 'Batch data processing, scheduled reports, system health checks, CI/CD pipeline actions — any operation that runs as the system, not as a user.' },
        { label: 'LIMITATION', labelColor: 'amber', text: 'No user context in the token. The downstream API cannot answer "which human authorized this?" — only "which agent did this." Not suitable for user-facing actions.' },
      ],
    },
    {
      heading: 'Flow 2: Token Exchange (RFC 8693)',
      paragraphs: [
        'This is the flow that makes delegated authorization possible. The agent has a user\'s token (obtained through a prior OIDC login) and needs to exchange it for a new token that carries both identities — the agent\'s and the user\'s.',
        '!! RFC 8693 is the IETF standard for token exchange. It defines a grant_type=urn:ietf:params:oauth:grant-type:token-exchange that lets one party exchange a token for another with different characteristics. Okta implements this as the mechanism for user-to-agent delegation.',
      ],
      timeline: [
        { label: 'Step 1', title: 'User Authenticates', description: 'User logs in via standard OIDC. The application (or agent framework) receives the user\'s ID token and/or access token.' },
        { label: 'Step 2', title: 'Agent Requests Exchange', description: 'Agent sends the user\'s token to Okta\'s /token endpoint with grant_type=token-exchange. Includes: subject_token (user\'s token), subject_token_type, requested scopes, and the agent\'s own client credentials.' },
        { label: 'Step 3', title: 'Okta Mints Delegated Token', description: 'Okta validates the user\'s token, verifies the agent is authorized for exchange, and mints a NEW token. This token contains sub (the user) and client_id/cid (the agent) — dual identity in one JWT. Note: Okta\'s OBO implementation uses cid rather than the RFC 8693 act claim for the agent identity.' },
        { label: 'Step 4', title: 'Agent Calls API with Delegated Token', description: 'Agent presents the exchanged token to downstream APIs. Each API can verify BOTH who the user is AND which agent is acting. Full attribution chain preserved.' },
      ],
      tabs: [
        {
          label: 'Token Request',
          content: [
            'The exchange request to Okta\'s /token endpoint includes: grant_type=urn:ietf:params:oauth:grant-type:token-exchange, subject_token (the user\'s token), subject_token_type=urn:ietf:params:oauth:token-type:id_token, requested_token_type=urn:ietf:params:oauth:token-type:access_token, scope (the scopes the agent needs), client_id and client_secret (the agent\'s own credentials).',
            '!! The agent authenticates itself AND presents the user\'s token. Okta verifies both before issuing the exchange. This is what prevents unauthorized agents from obtaining delegated tokens.',
          ],
        },
        {
          label: 'Token Payload',
          content: [
            'The resulting JWT contains: sub: "sarah@acme.com" (the user), cid/client_id: "sales-assistant" (the agent), aud: "salesforce-api" (the target resource), scope: "opportunities:read" (the granted permissions), exp: (short TTL, typically 5-15 minutes). Note: Okta uses cid (client ID) to identify the agent — not the nested act claim defined in RFC 8693.',
            '!! The sub + client_id structure is what makes delegated tokens attributable. The downstream API can determine both the authorizing user and the acting agent from a single credential.',
          ],
        },
        {
          label: 'Validation',
          content: [
            'The downstream API validates the token by: (1) verifying Okta\'s signature via JWKS, (2) checking the aud claim matches itself, (3) checking the sub claim for user-level authorization, (4) checking the client_id/cid claim to verify the agent is recognized, (5) checking scope for the specific permission needed.',
            '!! Five checks, one token. The API never needs to contact the agent directly or maintain a separate trust relationship with it.',
          ],
        },
      ],
      image: 'newsletter-05-exchange.png',
      imageAlt: 'Close-up of a developer\'s screen showing token exchange code and JWT payload structure',
      imageCaption: 'RFC 8693 token exchange: user token in, delegated agent token out — dual identity in one JWT',
    },
    {
      heading: 'Flow 3: ID-JAG — Enterprise-Governed Delegation',
      paragraphs: [
        'ID-JAG (Identity Assertion JWT Authorization Grant) is Okta\'s implementation of enterprise-controlled cross-app delegation. Where token exchange lets an agent exchange a user token, ID-JAG lets an IT admin pre-authorize which apps can communicate and under what conditions — before any user is involved.',
        'The critical difference from standard token exchange: with RFC 8693, the trust decision happens at exchange time based on the tokens presented. With ID-JAG, the trust decision was already made by an IT admin who created a "managed connection" between apps in the Okta Admin Console. The agent doesn\'t negotiate trust — it receives trust that was pre-established by the enterprise.',
      ],
      timeline: [
        { label: 'Step 1', title: 'Admin Creates Managed Connection', description: 'IT admin creates a connection in Okta between App A (agent) and App B (resource). Defines allowed scopes and policies. This is the governance gate — no connection, no delegation.' },
        { label: 'Step 2', title: 'Agent Authenticates to Okta', description: 'Agent uses client_credentials to authenticate to Okta. Okta verifies the agent has a managed connection to the target resource.' },
        { label: 'Step 3', title: 'Okta Issues ID-JAG', description: 'Okta mints an Identity Assertion JWT — a short-lived, RS256-signed assertion that says "this agent is enterprise-authorized to act on behalf of this user for this resource." Not an access token — an assertion.' },
        { label: 'Step 4', title: 'Agent Presents ID-JAG to Resource', description: 'Agent sends the ID-JAG to the resource app\'s /token endpoint via RFC 7523 JWT Bearer grant. The resource validates against Okta\'s JWKS.' },
        { label: 'Step 5', title: 'Resource Issues Scoped Access Token', description: 'If validation passes, the resource issues a standard access token. The agent uses this to call the resource API. Trust chain: Resource trusts Okta → Okta vouches for Agent → Agent acts for User.' },
      ],
      image: 'newsletter-05-token.png',
      imageAlt: 'Whiteboard showing JWT token structure with sub, client_id, aud, scope, and exp fields',
      imageCaption: 'The dual-identity JWT: sub (user) + client_id (agent) in a single credential',
      labeledCallouts: [
        { label: 'WHY ID-JAG MATTERS', labelColor: 'blue', text: 'The resource app never directly trusts the agent. It trusts Okta. Okta vouches for the agent through a signed assertion that was pre-authorized by enterprise IT. Centralized control, distributed enforcement.' },
        { label: 'VERSUS STANDARD TOKEN EXCHANGE', labelColor: 'amber', text: 'Token exchange: user consent drives authorization. ID-JAG: IT admin policy drives authorization. In enterprise contexts where IT must govern cross-app communication, ID-JAG is the correct model.' },
      ],
    },
    {
      heading: 'Scope Attenuation: Permissions Narrow at Every Hop',
      paragraphs: [
        'This is the architectural property that prevents privilege escalation in agent chains. Scope attenuation means that when Agent A delegates to Agent B, Agent B\'s permissions are always a subset of Agent A\'s. Permissions can only narrow, never expand.',
        'Concretely: if a user grants an orchestrator agent access to read and write opportunities in Salesforce, and the orchestrator delegates to a sub-agent, the sub-agent can receive at most read+write on opportunities. It might receive only read. It can never receive delete, or access to a different resource, because neither the user nor the orchestrator had that to delegate.',
        '!! Scope attenuation is enforced structurally by the token exchange mechanism. Each exchange request includes the requested scopes. Okta evaluates: (1) does the incoming token carry these scopes? (2) is the agent authorized for these scopes? The issued token contains the intersection — never the union.',
      ],
      conceptGrid: [
        { label: 'USER GRANTS', text: 'User authenticates and grants: opportunities:read, opportunities:write, contacts:read. This is the maximum scope ceiling for the entire chain.' },
        { label: 'ORCHESTRATOR RECEIVES', text: 'Orchestrator agent exchanges and requests: opportunities:read, opportunities:write. Gets exactly that — a subset of user\'s grants.' },
        { label: 'SUB-AGENT RECEIVES', text: 'Sub-agent exchanges the orchestrator\'s token and requests: opportunities:read. Gets only read — it cannot request write because it only needs read for its task. Attenuation in action.' },
      ],
      labeledCallouts: [
        { label: 'THE RULE', labelColor: 'blue', text: 'At every delegation hop, the effective scope is the INTERSECTION of (what the delegator has) AND (what the delegatee requests) AND (what the delegatee\'s policy allows). Three constraints, multiplicative — never additive.' },
      ],
      image: 'newsletter-05-attenuation.png',
      imageAlt: 'Whiteboard diagram showing scope narrowing across three delegation hops from user to orchestrator to sub-agent',
      imageCaption: 'Scope attenuation: permissions narrow at every delegation hop — the intersection model',
    },
    {
      heading: 'Flow 4: CIBA — Human Approval in the Loop',
      paragraphs: [
        'CIBA is the flow you reach for when the agent needs to do something too risky for pre-authorized delegation. The agent pauses, asks a human for explicit approval of a specific action, and proceeds only after consent.',
        'We covered the conceptual model in Issue #2 and the scenarios in the CIBA knowledge page. Here\'s the technical flow in detail:',
      ],
      timeline: [
        { label: 'Step 1', title: 'Agent Initiates Backchannel Request', description: 'Agent POSTs to Okta\'s /bc-authorize endpoint with: login_hint (who should approve), binding_message (human-readable description of the action), scope (what the agent needs), acr_values (optional authentication level requirement).' },
        { label: 'Step 2', title: 'Okta Sends Push Notification', description: 'Okta identifies the approver from login_hint and sends a push notification to Okta Verify on their device. The notification includes the binding_message so the human knows exactly what they\'re approving.' },
        { label: 'Step 3', title: 'Human Reviews and Decides', description: 'The approver sees: "Sales Assistant wants to send an email to prospect@company.com on your behalf." They tap Approve or Deny. The decision is cryptographically signed and logged.' },
        { label: 'Step 4', title: 'Agent Polls for Result', description: 'The agent polls Okta\'s /token endpoint with the auth_req_id from step 1. If approved: Okta returns a scoped access token. If denied or timed out: Okta returns an error. The agent handles both cases.' },
      ],
      tabs: [
        {
          label: 'Poll Mode',
          content: [
            'Agent polls /token endpoint at the interval specified in Okta\'s response. Receives authorization_pending until the human acts. Simple to implement — the agent loops until it gets a token or an error.',
            '!! Best for: most implementations. Simple polling loop. The agent\'s execution thread waits but doesn\'t need a callback URL.',
          ],
        },
        {
          label: 'Ping Mode',
          content: [
            'Okta calls back a registered notification endpoint when the human decides. The agent receives a webhook instead of polling. More complex but lower latency.',
            '!! Best for: high-throughput systems where polling overhead matters. Requires the agent to expose a callback URL that Okta can reach.',
          ],
        },
        {
          label: 'Push Mode',
          content: [
            'Okta pushes the token directly to the agent\'s registered endpoint after approval. The agent doesn\'t poll or receive a ping — the token arrives.',
            '!! Best for: event-driven architectures. Most efficient but requires the most infrastructure from the agent side.',
          ],
        },
      ],
      labeledCallouts: [
        { label: 'EU AI ACT', labelColor: 'rose', text: 'Article 14 requires human oversight of high-risk AI systems — "humans can intervene on or interrupt the system." CIBA is the technical implementation. Enforcement date: August 2, 2026. Fines up to EUR 35M or 7% global turnover.' },
      ],
    },
    {
      heading: 'Demo Script: Four Flows in 15 Minutes',
      paragraphs: [
        'Here\'s the demo script that works. Four flows, each building on the last, with a clear "aha moment" at each step. Practice this until you can run it without notes.',
        '!! Minute 1-3: Client Credentials — Show an agent authenticating to Okta and receiving a token. Decode the JWT on jwt.io. Point out: sub is the agent\'s client_id. No user identity. "This is how agents authenticate as themselves — but it doesn\'t answer \'who authorized this?\'"',
        '!! Minute 4-7: Token Exchange — Same agent, but now a user has logged in. Show the exchange request: user\'s token goes in, delegated token comes out. Decode the new JWT. Point out: sub is the user, client_id is the agent. "Now the downstream API knows both who and what."',
        '!! Minute 8-11: Scope Attenuation — Show what happens when the agent requests a scope it wasn\'t granted. The exchange fails. Then request a valid scope — it succeeds. "The agent can never exceed what the user delegated. This is least-privilege enforced at the platform level."',
        '!! Minute 12-14: CIBA — Trigger a high-stakes action. Show the backchannel request. The approver\'s phone buzzes with Okta Verify. They approve. The agent receives the token. "For actions that require human judgment, the agent asks permission. No approval, no token, no action."',
        '!! Minute 15: Kill Switch — Revoke the agent\'s managed connection in the Admin Console. Show that the next token request fails immediately. "When you need to shut an agent down, one click. Every active session terminates."',
        'TT "I want to show you four auth flows that power every O4AA deployment. Each one takes about 3 minutes. By the end, you\'ll see how an agent goes from \'anonymous process\' to \'fully governed identity with auditable delegation.\' Ready?"',
      ],
      image: 'newsletter-05-demo.png',
      imageAlt: 'Solution engineer running a live terminal demo while a customer watches the token exchange in real time',
      imageCaption: 'The four-flow demo: Client Credentials → Token Exchange → Scope Attenuation → CIBA → Kill Switch',
    },
  ],

  pullQuotes: [
    {
      text: 'If you can whiteboard the token exchange flow and explain scope attenuation at each hop, you will earn more technical credibility in 5 minutes than any slide deck delivers in 30.',
    },
    {
      text: 'The sub + client_id structure carries both the delegating user and the acting agent in a single credential — making every action attributable.',
    },
    {
      text: 'At every delegation hop, the effective scope is the intersection of what the delegator has, what the delegatee requests, and what the delegatee\'s policy allows. Three constraints, multiplicative — never additive.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Four Flows',
      text: 'Client Credentials (agent-as-itself), Token Exchange (agent-on-behalf-of-user), ID-JAG (enterprise-governed delegation), CIBA (human approval). Know when to use each.',
    },
    {
      label: 'Token Structure',
      text: 'The sub + client_id JWT structure carries both user identity and agent identity. Decode one on jwt.io during every demo — it\'s the most powerful visual.',
    },
    {
      label: 'Scope Attenuation',
      text: 'Permissions narrow at every hop: intersection of (delegator has) AND (delegatee requests) AND (delegatee policy allows). Three constraints, never additive.',
    },
    {
      label: 'Demo Script',
      text: '15 minutes: Client Credentials → Token Exchange → Break a scope boundary → CIBA approval → Kill switch. Five aha moments. Practice until you don\'t need notes.',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #6: Discovery That Actually Works',
    description: 'The discovery methodology that converts technical conversations into pipeline — which questions to ask, how to qualify O4AA opportunities, and the Gong transcript patterns that predict closed deals.',
  },
};
