import type { NewsletterIssue } from '../../newsletter-types';

export const issue02: NewsletterIssue = {
  slug: 'newsletter-02',
  issueNumber: 2,
  title: 'Anatomy of an Agent Identity',
  subtitle: 'How agent identities actually work in Okta — registration, credentials, scoping, lifecycle, and the Universal Directory model that makes it all click',
  date: 'April 2, 2026',
  readTimeMinutes: 9,
  heroImageAlt: 'Security professional examining a holographic agent identity profile with credential details',
  tags: ['identity', 'credentials', 'lifecycle', 'universal-directory'],
  tldr: 'An agent identity in Okta is a first-class principal in Universal Directory — registered, credentialed, scoped, governed, and revocable just like a human identity. The three credential models (client credentials, token exchange, CIBA) map to three different trust levels. Understanding which one applies to your customer\'s use case is the key to a sharp demo.',

  sections: [
    {
      heading: 'What Makes an Agent Identity Different',
      paragraphs: [
        'In Issue #1, we established the core problem: agents authenticate like service accounts but authorize like users. This issue goes deeper — what does an agent identity actually look like inside Okta, and how does it differ from both human identities and traditional service accounts?',
        '!! An agent identity has three properties that neither a human identity nor a service account has: (1) it always has a human owner, (2) it carries delegated — not inherent — permissions, and (3) its lifecycle is tied to both the owning human and the task it was created for.',
        'Think of it this way. A human identity is self-sovereign — it represents a person who authenticates themselves. A service account is system-sovereign — it represents a machine process with fixed permissions. An agent identity is delegated-sovereign — it represents an autonomous actor whose authority derives from a specific human for a specific purpose.',
        'This is not a philosophical distinction. It has concrete implications for how you register the agent, what credentials you issue, how you scope permissions, and when you revoke access. Every one of those decisions maps to a specific Okta configuration.',
        'TT "When I say agent identity, I don\'t mean a service account with a fancy label. I mean a first-class identity in your directory that knows who created it, what it\'s allowed to do, and when it should stop existing. That\'s what Okta builds natively."',
      ],
    },
    {
      heading: 'The Identity Anatomy: Five Layers',
      paragraphs: [
        'Every agent identity in Okta has five layers. Understanding these layers is what separates an SE who can demo the product from one who can architect a solution.',
        'Layer 1 — Registration: The agent is registered in Universal Directory as a distinct principal with its own client ID. This is not a shared credential or an API key taped to a config file. The agent has a named identity that shows up in your directory, your logs, and your access reviews.',
        'Layer 2 — Ownership: Every agent identity has a mandatory human owner. This is enforced at registration — you cannot create an agent identity without linking it to a human principal. When the human leaves the organization, the agent\'s identity enters a review state. No orphaned agents.',
        'Layer 3 — Credentials: The agent receives credentials appropriate to its trust level. Client credentials for machine-to-machine. Token exchange for delegated user context. CIBA for high-stakes actions requiring human approval. We\'ll go deep on each of these in the next section.',
        'Layer 4 — Scoping: The agent\'s permissions are defined at two levels — what the agent is allowed to do (its static policy), and what the delegating user is allowed to do (the inherited scope). The effective permission is always the intersection of both. An agent cannot exceed its owner\'s permissions, even if the agent\'s policy would allow it.',
        'Layer 5 — Lifecycle: The agent identity has explicit lifecycle states — active, suspended, review, deprovisioned. Transitions between states can be triggered manually, by policy (e.g., owner leaves), by time (credential expiry), or by signal (anomalous behavior detected by ITP). Every state transition is logged.',
        '>> "The five-layer model is the mental framework. When a customer asks \'how does this work?\' — walk them through registration, ownership, credentials, scoping, lifecycle. In that order. It builds naturally."',
      ],
      timeline: [
        { label: 'Layer 1', title: 'Registration', description: 'Agent registered in Universal Directory as a distinct principal with its own client ID. Shows up in your directory, logs, and access reviews.' },
        { label: 'Layer 2', title: 'Ownership', description: 'Mandatory human owner linked at registration. When the human leaves, the agent enters review state. No orphaned agents.' },
        { label: 'Layer 3', title: 'Credentials', description: 'Credential model matched to trust level — client credentials (M2M), token exchange (delegated), or CIBA (human approval).' },
        { label: 'Layer 4', title: 'Scoping', description: 'Two-dimensional: agent policy AND user delegation. Effective permission is always the intersection. Neither can expand the other.' },
        { label: 'Layer 5', title: 'Lifecycle', description: 'Explicit states: active, suspended, review, deprovisioned. Transitions triggered by policy, time, signal, or manual action. Every transition logged.' },
      ],
      image: 'newsletter-02-layers.png',
      imageAlt: 'Security architect presenting a five-layer identity model on a glass whiteboard to a team',
      imageCaption: 'The five layers of agent identity: Registration, Ownership, Credentials, Scoping, Lifecycle',
    },
    {
      heading: 'The Three Credential Models',
      paragraphs: [
        'This is the section you\'ll reference most on calls. The credential model determines how the agent proves its identity and authority. There are three models, and each maps to a different customer scenario.',
        'Model 1 — Client Credentials (machine-to-machine): The agent authenticates as itself using a client ID and secret (or private key JWT). No user context is embedded in the token. Use this for: batch processing agents, scheduled automation, system-level operations that don\'t act on behalf of a specific user. The token carries the agent\'s own scopes, not any user\'s. This is the simplest model and the one most customers start with.',
        'Model 2 — Token Exchange (RFC 8693): The agent presents a user\'s token to Okta and receives back a new token that embeds both the agent\'s identity and the user\'s delegated authorization. The downstream API can verify: who is the agent, who authorized it, what scopes were granted. Use this for: agents acting on behalf of a specific user — the copilot reading your email, the assistant booking your meeting, the coding agent accessing your repos. This is the most common O4AA model.',
        '!! Token exchange is where the magic happens. The user never shares their credentials with the agent. The agent never holds the user\'s token. Instead, Okta mints a new scoped token that says "Agent X is authorized by User Y to do Z until time T." The downstream API trusts this because it trusts Okta as the issuer.',
        'Model 3 — CIBA (Client-Initiated Backchannel Authentication): The agent pauses its workflow and sends an async authorization request to the user\'s device. The user reviews and approves (or denies) the specific action. The agent proceeds only after explicit consent. Use this for: high-stakes actions — financial transactions, data deletion, sending messages on behalf of the user, accessing sensitive records. CIBA adds human-in-the-loop without blocking the agent\'s execution thread.',
        'TT "Which of these three models applies depends on one question: does the agent need to act as itself, act as a user, or act as a user with explicit approval for sensitive operations? That\'s client credentials, token exchange, or CIBA — and most customers need at least two of the three."',
      ],
      tabs: [
        {
          label: 'Client Credentials',
          content: [
            'Agent authenticates as itself using client ID + secret (or private key JWT). No user context in the token.',
            '!! Use for: batch processing, scheduled automation, system-level operations that don\'t act on behalf of a specific user.',
            'The token carries the agent\'s own scopes. Simplest model — most customers start here.',
          ],
        },
        {
          label: 'Token Exchange',
          content: [
            'Agent presents user\'s token to Okta, receives a new token embedding both agent identity AND user authorization (RFC 8693).',
            '!! Use for: agents acting on behalf of a specific user — copilot reading email, assistant booking meetings, coding agent accessing repos.',
            'The downstream API verifies: who is the agent, who authorized it, what scopes were granted. This is the most common O4AA model.',
          ],
        },
        {
          label: 'CIBA',
          content: [
            'Agent pauses workflow and sends an async authorization request to the user\'s device. User approves or denies the specific action.',
            '!! Use for: high-stakes actions — financial transactions, data deletion, sending messages as the user, accessing sensitive records.',
            'Adds human-in-the-loop without blocking the agent\'s execution thread. The request goes to the user\'s phone while the agent waits.',
          ],
        },
      ],
      image: 'newsletter-02-credentials.png',
      imageAlt: 'Engineer comparing three authentication flow diagrams on a large monitor display',
      imageCaption: 'Three credential models for three trust levels: Client Credentials, Token Exchange (RFC 8693), and CIBA',
    },
    {
      heading: 'Scoping: Least Privilege for Agents',
      paragraphs: [
        'Scoping is where most existing solutions fail — and where Okta\'s model is genuinely differentiated. The problem: agents are dynamic. They decide at runtime which tools to call and which APIs to access. You can\'t predict at authentication time exactly what the agent will need.',
        'The traditional approach is to over-provision: give the agent broad scopes upfront so it doesn\'t hit permission errors mid-task. This violates least privilege and creates the exact blast radius problem we described in Issue #1.',
        'Okta\'s approach uses two-dimensional scoping:',
        'Dimension 1 — Agent policy scopes: What is this class of agent allowed to do? These are defined at registration time and apply regardless of which user the agent is acting for. Example: "This coding assistant agent can access repos and run builds, but cannot access HR systems or financial data."',
        'Dimension 2 — User delegation scopes: What is this specific user allowed to delegate? These are inherited from the user\'s own permissions and further constrained by what the user explicitly granted. Example: "User Y has access to repos A, B, and C, but only delegated access to repo A to this agent."',
        '!! The effective scope is always the INTERSECTION of the agent policy and the user delegation. If the agent policy allows repos A-Z but the user only delegated repo A, the agent can only access repo A. If the user has access to repos A-C but the agent policy only allows repos, the agent gets repos A-C. Neither dimension can expand the other.',
        'This intersection model is what makes just-in-time scoping possible. The agent requests a token scoped to what it needs right now. Okta evaluates the request against both dimensions and either issues a tightly scoped token or denies it. No over-provisioning required.',
      ],
    },
    {
      heading: 'Universal Directory: Agents as First-Class Citizens',
      paragraphs: [
        'Here\'s the architectural decision that makes everything else work: agent identities live in Universal Directory alongside human identities. Not in a separate NHI database. Not in a sidecar registry. In the same directory, governed by the same policies, visible in the same admin console.',
        'This matters for three reasons your customers will care about:',
        '!! 1. Single access review campaign. When the compliance team runs quarterly access certifications, agent identities appear in the same review alongside human identities. No separate tool, no separate process, no agents hiding in the blind spot of your governance program.',
        '!! 2. Unified lifecycle management. When a human owner leaves, their agent identities automatically enter a review state. The offboarding workflow doesn\'t need a separate step to "also revoke the 12 agents this person created." It\'s the same lifecycle engine.',
        '!! 3. Consistent policy enforcement. Conditional access policies, risk signals from ITP, and MFA step-up requirements apply to agent identities using the same policy engine. You don\'t need to build a parallel policy framework for non-human identities.',
        '>> "The Universal Directory decision is the one that separates Okta from the NHI-only startups. Oasis and Astrix can discover and inventory your agents — but they need an IdP underneath to issue credentials, run access reviews, and enforce policies. Okta IS that IdP, and the agent identities live natively in it."',
        'TT "When you think about where agent identities should live, the answer is the same place your human identities live — because they need the same governance. That\'s Universal Directory. One directory, one policy engine, one audit trail, one access review."',
      ],
      image: 'newsletter-02-directory.png',
      imageAlt: 'IT administrator viewing a unified identity dashboard showing both human and agent identities in the same directory view',
      imageCaption: 'Universal Directory: human and agent identities governed side by side in a single control plane',
    },
    {
      heading: 'What This Means for Your Demo',
      paragraphs: [
        'Here\'s how to translate the five-layer model into a demo that lands:',
        '!! Demo moment 1 — Registration: Show the agent being created in the admin console with a named identity and a linked human owner. The customer sees it appear in Universal Directory. "This agent now exists as a real identity in your directory — not a service account, not an API key."',
        '!! Demo moment 2 — Token exchange: Show the agent requesting a token on behalf of a user. Show the token contents — the agent\'s client ID, the user\'s subject, the scoped permissions, the expiry. "Every downstream API can verify who the agent is and who authorized it."',
        '!! Demo moment 3 — Scoping: Show what happens when the agent requests a scope the user hasn\'t delegated. The request is denied. "The agent cannot exceed its owner\'s permissions. That\'s least privilege enforced at the platform level, not by the agent\'s own code."',
        '!! Demo moment 4 — Lifecycle: Show what happens when the human owner is deprovisioned. The agent identity enters review state. All active tokens are revoked. "When the person leaves, their agents stop working. No orphaned agents, no forgotten credentials."',
        '!! Demo moment 5 — Audit: Show the system log with the full chain: user authorized agent, agent requested token, agent called API, action logged with both identities. "Your SOC team can answer \'what did this agent do, as which user, at what time?\' in seconds."',
        'TT "The demo flow that works best: create the agent, show the token exchange, break a scope boundary, kill the owner, show the audit trail. Five steps, five aha moments. Each one maps to a real customer pain point from discovery."',
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'An agent identity has three properties that neither a human nor a service account has: it always has a human owner, it carries delegated permissions, and its lifecycle is tied to both the owner and the task.',
    },
    {
      text: 'The effective scope is always the intersection of the agent policy and the user delegation. Neither dimension can expand the other.',
    },
    {
      text: 'The demo flow that works best: create the agent, show the token exchange, break a scope boundary, kill the owner, show the audit trail.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Five Layers',
      text: 'Every agent identity has Registration, Ownership, Credentials, Scoping, and Lifecycle. Walk customers through these in order.',
    },
    {
      label: 'Three Credential Models',
      text: 'Client credentials (M2M), token exchange (delegated user context), CIBA (human approval for sensitive actions). Most customers need at least two.',
    },
    {
      label: 'Intersection Scoping',
      text: 'Effective permissions = agent policy AND user delegation. Neither can expand the other. This is how you do least privilege for dynamic agents.',
    },
    {
      label: 'Universal Directory',
      text: 'Agent identities live alongside human identities — same access reviews, same lifecycle, same policy engine. This is the architectural differentiator vs NHI-only tools.',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #3: MCP — The Protocol That Changed Everything',
    description: 'Model Context Protocol is becoming the USB-C of AI tool integration. How it works, why it\'s insecure by default, and how Okta\'s MCP Security solution closes the gap. Plus: the stats that make CISOs pay attention.',
  },
};
