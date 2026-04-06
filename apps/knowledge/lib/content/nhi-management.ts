import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'nhi-management',
  title: 'NHI Management',
  description:
    'How to register, govern, review, and deprovision AI agent identities in Okta — the full Non-Human Identity lifecycle.',
  tags: ['developer', 'NHI', 'lifecycle', 'ISPM', 'OIG', 'Universal-Logout'],
  icon: '🤖',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'Registering Agent Identities',
      paragraphs: [
        'In Okta, an AI agent is registered as a service application (OIDC app with client_credentials grant type). Best practice: use Private Key JWT authentication (not client secret) for production agents. Each agent gets its own app registration with metadata: owner (human), environment (dev/staging/prod), cost center, and purpose description.',
        '!! Critical rule: every agent gets its own identity — never share service accounts across agents. Shared credentials mean shared blast radius, shared audit trail (useless), and inability to revoke one agent without killing all of them.',
        '>> Registration checklist: (1) Create OIDC app in Admin Console with client_credentials grant, (2) Enable Private Key JWT auth, generate RSA 2048 key pair, (3) Assign custom scopes matching the agent\'s required API access, (4) Set app metadata: owner, environment, team, (5) Add to relevant groups for access policy enforcement.',
        'For environments with many agents, consider automating registration via the Okta Management API or the Okta Terraform provider. The Okta MCP Server can also be used to manage agent app registrations via natural language.',
      ],
      timeline: [
        { label: 'Step 1', title: 'Create OIDC App', description: 'In Admin Console, create a new app integration with client_credentials grant type. One app registration per agent — never shared.' },
        { label: 'Step 2', title: 'Enable Private Key JWT Auth', description: 'Generate RSA 2048 key pair. Configure the app to authenticate using Private Key JWT instead of a client secret. Store the private key securely — not in the agent\'s config file or environment variables.' },
        { label: 'Step 3', title: 'Assign Custom Scopes', description: 'Configure only the scopes the agent requires for its specific task. No broad or catch-all scopes. Scope list should match the agent\'s purpose description.' },
        { label: 'Step 4', title: 'Set App Metadata', description: 'Record the owning human (by name, not team), environment (dev/staging/prod), cost center, and purpose description. These fields are required for OIG access certification campaigns.' },
        { label: 'Step 5', title: 'Assign to Access Policy Groups', description: 'Add the app to relevant groups for access policy enforcement. Group membership determines which resource policies apply to this agent at runtime.' },
      ],
    },
    {
      heading: 'Bulk Registration at Scale',
      paragraphs: [
        'For organizations deploying dozens or hundreds of AI agents, one-at-a-time console registration is impractical. The Okta developer community has published a Workflows template (oktaairegistration.folder) that automates bulk onboarding and registration of AI agents into Universal Directory. The template uses Okta Workflows — the visual, no-code automation platform — meaning administrators can operationalize bulk registration without API development skills. [Source: Okta Developer Forum, January 2026]',
        '>> Bulk registration approaches: (1) Okta Workflows template — no-code, visual flow builder. Import the template, connect to your agent inventory source (Google Sheets, HR system, CMDB), and run on schedule for continuous sync. Best for: admins without development resources. (2) Okta Management API — programmatic registration via REST API. Best for: teams with existing automation infrastructure (Terraform, CI/CD). (3) Okta MCP Server — register agents via natural language through Claude Desktop or VS Code. Best for: developers who prefer conversational interfaces.',
        '!! The Workflows template supports scheduled execution, not just one-time import. This means it can continuously sync with an external agent inventory — when a new agent is deployed in your orchestration platform (LangChain, CrewAI, AutoGen, Bedrock), the Workflow automatically registers it in Okta. This closes the gap between \'agent deployed\' and \'agent governed.\'',
      ],
      labeledCallouts: [
        { label: 'WORKFLOWS TEMPLATE', labelColor: 'blue', text: 'No-code, visual flow builder (oktaairegistration.folder). Import the template, connect to your agent inventory source (Google Sheets, HR system, CMDB), and run on schedule. Best for admins without development resources.' },
        { label: 'CONTINUOUS SYNC', labelColor: 'emerald', text: 'The Workflows template supports scheduled execution — not just one-time import. When a new agent is deployed in LangChain, CrewAI, AutoGen, or Bedrock, the Workflow automatically registers it in Okta. Closes the gap between "agent deployed" and "agent governed."' },
        { label: 'MANAGEMENT API', labelColor: 'amber', text: 'Programmatic registration via REST API. Best for teams with existing automation infrastructure (Terraform, CI/CD pipelines). Full lifecycle management: create, update, disable, and audit agent app registrations.' },
        { label: 'MCP SERVER', labelColor: 'blue', text: 'Register agents via natural language through Claude Desktop or VS Code using the Okta MCP Server. Best for developers who prefer conversational interfaces for admin tasks.' },
      ],
    },
    {
      heading: 'Shadow Agent Discovery (ISPM)',
      paragraphs: [
        'The "shadow agent" problem: development teams deploy AI agents with their own credentials (personal API keys, shared service accounts) without registering them through IT. These agents accumulate access, are invisible to security, and persist after the deploying engineer leaves.',
        '!! Okta Identity Security Posture Management (ISPM) surfaces these shadow identities. ISPM analyzes authentication patterns, credential usage, and API access to identify non-human identities that are not formally registered — including agents using stale credentials, agents with overprivileged access, and orphaned service accounts with no active owner.',
        '?? How many AI agents are running in your environment right now? Can you name all of them? Do you know who owns each one? Across 306 AI-related conversations this quarter, shadow AI inventory gaps appear in 83-88% of accounts. As one security leader described it: "It\'s the wild west. We\'re not blocking any agent installations. People don\'t understand what permissions they need."',
      ],
    },
    {
      heading: 'Access Reviews and Governance (OIG)',
      paragraphs: [
        'Okta Identity Governance (OIG) extends access certification campaigns to non-human identities. Just as human users undergo quarterly access reviews, AI agent app registrations can be included in certification campaigns. The assigned owner reviews: which scopes does this agent have? Are they still needed? Is the agent still active?',
        'TT "Your quarterly access reviews probably cover human users. Do they cover your AI agents? With OIG, you include agent identities in the same certification campaigns — the owner reviews scopes, confirms the agent is still needed, and either re-certifies or flags for deprovisioning."',
        '>> Access review lifecycle: (1) OIG creates certification campaign including NHI apps, (2) Assigned owner reviews each agent\'s scopes and access, (3) Owner certifies or flags for revocation, (4) Flagged agents are automatically disabled or scopes are narrowed, (5) Audit trail of every review decision stored in OIG.',
      ],
      mermaidDiagrams: [
        {
          title: 'NHI Certification Lifecycle (OIG)',
          code: `graph LR
    CC["🧑‍💼 Campaign Creation<br/>OIG schedules NHI review"]
    OR["👤 Owner Review<br/>Assigned owner examines<br/>agent scopes and activity"]
    DEC{"Certify or Flag?"}
    CERT["✅ Certify<br/>Agent re-approved<br/>scopes confirmed"]
    FLAG["⚠️ Flag for Revocation<br/>Scope too broad or<br/>agent no longer needed"]
    ACTION["🔐 Auto-Disable or<br/>Scope-Narrow<br/>Okta enforces decision"]
    AUDIT["📋 Audit Trail<br/>Every review decision<br/>stored in OIG (immutable)"]

    CC --> OR
    OR --> DEC
    DEC -->|"Active & needed"| CERT
    DEC -->|"Stale or over-privileged"| FLAG
    CERT --> AUDIT
    FLAG --> ACTION
    ACTION --> AUDIT

    style CC fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style OR fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style CERT fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style FLAG fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style ACTION fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style AUDIT fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px`,
          caption: 'Five-step NHI certification lifecycle. Green path: owner certifies the agent is still needed and scopes are appropriate. Amber path: flagged agents are automatically disabled or scopes are narrowed. Every decision is captured in the OIG audit trail.',
        },
      ],
    },
    {
      heading: 'Revocation and Universal Logout',
      paragraphs: [
        'When an agent is compromised or needs to be deprovisioned, disabling the app registration in Okta immediately stops all new token issuance. Existing tokens expire according to their TTL (typically minutes for access tokens). For immediate revocation, Okta\'s token revocation endpoint invalidates specific tokens on demand.',
        '!! The "kill switch" is not an abstract concept — it\'s a concrete Okta operation: disable the app in Admin Console (or via API) and all downstream access stops. No need to hunt down credentials across 11 different API providers. One action, immediate effect, full audit trail of who disabled what and when.',
        '?? If you discovered an AI agent was compromised right now, how long would it take to revoke ALL of its access across ALL systems? In a documented incident, it took 4 hours to fully revoke credentials across 11 different API providers — 340,000 customer records downloaded during that window. With Okta, the answer is seconds — disable the app, revoke the token, done.',
      ],
      labeledCallouts: [
        { label: 'URGENCY', labelColor: 'rose', text: 'In a documented incident, it took 4 hours to fully revoke credentials across 11 different API providers. 340,000 customer records were downloaded during that window. The time-to-revoke gap is where the damage happens.' },
        { label: 'KILL SWITCH', labelColor: 'rose', text: 'Disable the app registration in Admin Console (or via API). All new token issuance stops immediately. No need to hunt down credentials across every API provider the agent accessed.' },
        { label: 'TOKEN REVOCATION', labelColor: 'blue', text: 'For immediate effect beyond the token TTL: Okta\'s token revocation endpoint invalidates specific tokens on demand. Existing tokens are invalidated before their natural expiry.' },
        { label: 'AUDIT TRAIL', labelColor: 'blue', text: 'Every revocation action — who disabled what, at what time, under whose authority — is recorded in the System Log. The kill switch is auditable from the moment it is pulled.' },
      ],
    },
  ],
};
