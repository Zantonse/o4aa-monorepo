import type { SectionContent, ContentCardData } from '../types';

const slug = 'demo-playbook';
const title = 'Demo Playbook';
const description = 'Step-by-step guides for demoing O4AA to customers — xaa.dev playground, the Agent0/Todo0 reference app, and the Agent Gateway Docker bundle.';
const tags = ['SE-playbook', 'demo', 'POC', 'setup'];
const icon = '🎬';
const hasDiagram = false;
const diagramPrompt = '';

const cards: ContentCardData[] = [
  {
    heading: 'Quick Demo: xaa.dev Playground',
    paragraphs: [
      '!! xaa.dev is a free, browser-based playground for Cross App Access. No local setup required. Use this for first-call demos or when you need to show the XAA flow in under 5 minutes.',
      '>> Demo flow: (1) Open xaa.dev in browser, (2) Walk through the three-party model: requesting app, IdP, resource app, (3) Show the ID-JAG token being issued, (4) Show the resource app validating the assertion against the IdP\'s JWKS, (5) Point out: "The resource app never trusts the requesting app directly — it trusts Okta."',
      'TT "Let me show you how Cross App Access works in practice. This is a live playground — no slides, real tokens. Watch what happens when the agent app requests access to the resource app through Okta..."',
      'Best for: first-call demos, executive overviews, security architect introductions. Not suitable for: deep technical POCs (use the full reference app for that).',
    ],
    timeline: [
      { label: 'Step 1', title: 'Open xaa.dev in browser', description: 'No setup required — the playground is fully hosted and accessible immediately.' },
      { label: 'Step 2', title: 'Introduce the three-party model', description: 'Walk through the requesting app, IdP (Okta), and resource app. Explain why all three parties are needed.' },
      { label: 'Step 3', title: 'Show the ID-JAG token being issued', description: 'Trigger the token exchange and point out the typ: oauth-id-jag+jwt header in the response.' },
      { label: 'Step 4', title: 'Show resource app validation', description: 'Demonstrate the resource app validating the assertion against the IdP\'s JWKS endpoint.' },
      { label: 'Step 5', title: 'Deliver the key insight', description: '"The resource app never trusts the requesting app directly — it trusts Okta." This is the governance moment.' },
    ],
  },
  {
    heading: 'Full Demo: Agent0/Todo0 Reference App',
    paragraphs: [
      'The oktadev/okta-secure-ai-agent-example repo is the full XAA reference implementation. It includes Agent0 (an AI agent using Claude via Amazon Bedrock) and Todo0 (a todo management app exposing MCP-protected APIs). The demo shows Agent0 accessing Todo0\'s APIs on behalf of a user via XAA.',
      '>> Setup steps: (1) Clone the repo: git clone github.com/oktadev/okta-secure-ai-agent-example, (2) Ensure prerequisites: VS Code, Python 3.9+, Docker, AWS credentials for Bedrock, (3) Enable XAA: Admin Console > Settings > Features > Early Access > "Cross App Access" toggle, (4) Run bootstrap: pnpm run bootstrap:okta — this creates the custom auth server, custom scopes (mcp:connect, mcp:tools:read, mcp:tools:manage), 2 OIDC apps, agent identity with RSA key pair, managed connection, and access policies, (5) Start the apps: follows Dev Container workflow in VS Code.',
      '!! The bootstrap script (pnpm run bootstrap:okta) automates ALL Okta configuration. You do not need to manually create apps, scopes, or policies. This is critical for demo reliability — manual setup is where demos break.',
      'Demo narrative: show the user logging in to Todo0, then show Agent0 accessing Todo0\'s tasks on the user\'s behalf. Open the Okta System Log and show the XAA/ID-JAG token exchange events. Tie each step to a business outcome: "This is the audit trail your compliance team needs."',
    ],
    timeline: [
      { label: 'Step 1', title: 'Clone the repo', description: 'git clone github.com/oktadev/okta-secure-ai-agent-example — the full reference implementation.' },
      { label: 'Step 2', title: 'Verify prerequisites', description: 'VS Code, Python 3.9+, Docker, and AWS credentials for Bedrock must all be in place before running bootstrap.' },
      { label: 'Step 3', title: 'Enable XAA feature flag', description: 'Admin Console > Settings > Features > Early Access > toggle "Cross App Access" on.' },
      { label: 'Step 4', title: 'Run the bootstrap script', description: 'pnpm run bootstrap:okta — creates the custom auth server, scopes (mcp:connect, mcp:tools:read, mcp:tools:manage), 2 OIDC apps, agent identity with RSA key pair, managed connection, and access policies. One command does everything.' },
      { label: 'Step 5', title: 'Start the apps', description: 'Follow the Dev Container workflow in VS Code. Both Agent0 and Todo0 start via the container setup.' },
      { label: 'Step 6', title: 'Run the demo narrative', description: 'Log in to Todo0 as the user, show Agent0 accessing tasks on the user\'s behalf, open System Log to show the ID-JAG token exchange events.' },
    ],
  },
  {
    heading: 'Agent Gateway Demo (Docker Bundle)',
    paragraphs: [
      'The Agent Gateway Docker bundle (okta-mcp-aws-0.12.1.tar.gz) deploys the full 5-service stack: Gateway, PostgreSQL, Redis, Admin UI, and Grafana observability. Deploy on AWS EC2 with ALB+HTTPS for a customer-facing POC. For internal demos, run locally with Docker Compose.',
      '>> Quick start: (1) Unpack the bundle, (2) Configure .env with Okta org URL, client credentials, and backend MCP server URLs, (3) docker compose up, (4) Open Admin UI at localhost:3001 — show agent registration, resource configuration, audit log, (5) Connect Claude Desktop or VS Code to the Agent Gateway endpoint, (6) Make tool calls and show the audit trail in real-time.',
      '!! The Admin UI at port 3001 is the demo centerpiece for the Agent Gateway. It shows: registered agents with their resource ACLs, configured backends with auth methods, and a searchable audit log of every tool call. This is what makes the demo tangible — customers can see the governance layer, not just hear about it.',
    ],
    timeline: [
      { label: 'Step 1', title: 'Unpack the bundle', description: 'Extract okta-mcp-aws-0.12.1.tar.gz to a working directory.' },
      { label: 'Step 2', title: 'Configure .env', description: 'Set Okta org URL, client credentials, and backend MCP server URLs. This is the only manual configuration step.' },
      { label: 'Step 3', title: 'docker compose up', description: 'Starts all 5 services: Gateway, PostgreSQL, Redis, Admin UI, and Grafana observability stack.' },
      { label: 'Step 4', title: 'Open Admin UI at localhost:3001', description: 'Demo centerpiece: show registered agents with their resource ACLs, configured backends, and the searchable audit log.' },
      { label: 'Step 5', title: 'Connect a client to the Gateway', description: 'Connect Claude Desktop or VS Code to the Agent Gateway endpoint to demonstrate live tool routing.' },
      { label: 'Step 6', title: 'Make tool calls and show the audit trail', description: 'Every tool call appears in the audit log in real-time — this is the governance layer customers can see, not just hear about.' },
    ],
  },
  {
    heading: 'demo.okta.com Components',
    paragraphs: [
      'Two O4AA components are available on demo.okta.com — the standard demo platform most SEs use daily. These are the lowest-friction demo path, requiring no Docker setup or local environment configuration.',
      '>> AI Agent Governance component (aka ProGear Basketball demo): Showcases registering agents as identities, Managed Connections to control which APIs they can access, and ID-JAG token exchange for runtime enforcement with RBAC policies. Key features demonstrated: ID-JAG Token Exchange, Managed Connections, Multi-Agent AI in Action, Role-Based Agent Access, Industry Verticals. Attach this component to your demo org from the demo.okta.com library.',
      '>> Cross App Access component (aka Todo0/Agent0): Demonstrates OIN integrations with two apps — \'Todo0\' (resource app) and \'Agent0\' (requesting app). This shows the XAA token exchange flow between a registered AI agent app and a protected resource app through the Okta authorization server.',
      '>> ProGear demo industry verticals: The AI Agent Governance component supports 4 industry themes that customize all branding, data, and Okta resource names. (1) Sports Equipment (default) — CourtEdge ProGear, B2B sporting goods. (2) Financial Services — PledgeRocket, investment and wealth management. (3) Healthcare — AlgenHealth, medical supply distributor. (4) Retail — ShelfPoint, wholesale distributor. Select the vertical that matches your customer\'s industry for maximum relevance. Each vertical creates 4 AI agents, 4 authorization servers with industry-specific scopes, and 3 groups (advisors/full access, operations/limited, compliance/limited).',
      '>> The 6-scenario demo walkthrough (from Demo Guide): Scenario 1 — First login and environment verification. Scenario 2 — The Failure: agent has zero access by default (no Managed Connections configured). This is the most important demo moment — it proves zero-trust. Scenario 3 — Configuring Managed Connections (the admin fix that enables governed access). Scenario 4 — Full access success after authorization. Scenario 5 — Role-based access: different user, different permissions (same agent, but Mike in Warehouse only gets inventory). Scenario 6 — Audit trail in Okta System Log showing grants and denials. Start with the failure (Scenario 2) — it sets up the entire governance narrative.',
      '!! Critical setup note: if attaching to an existing Okta demo environment, the Demo Platform Management application may not have the required API scopes. You must grant okta.governance.resourceOwner.manage and okta.aiAgents.manage in the app\'s API scopes. Enable the IGA_RESOURCE_OWNERS feature flag from SU(OK14) if you don\'t see the governance scope. Without these, the component will fail to register AI agents during provisioning. [Source: Demo Guide: Okta AI Agent Governance, Confluence]',
      'TT \'For a quick O4AA demo, you don\'t need Docker or local setup. The ProGear and Todo0/Agent0 components on demo.okta.com give you a working demo in minutes. Use ProGear for business-audience demos (the basketball pricing scenario is immediately relatable). Use Todo0/Agent0 for technical-audience demos where you want to show the actual token exchange flow.\'',
    ],
    accordion: [
      {
        title: 'Scenario 1 — First Login and Environment Verification',
        content: [
          'Log in to the demo org and confirm the component provisioned correctly. Verify that the AI agents appear in Universal Directory and that authorization servers are present. This is your sanity check before the live demo — do it before the customer joins.',
        ],
      },
      {
        title: 'Scenario 2 — The Failure: Agent Has Zero Access by Default',
        content: [
          'Attempt to make an API call as the AI agent with no Managed Connections configured. The call fails — the agent is registered but has no authorized access to any resource. This is the most important demo moment: it proves zero-trust by default. Agents are not trusted simply because they exist.',
        ],
      },
      {
        title: 'Scenario 3 — Configuring Managed Connections',
        content: [
          'In the Admin UI, configure a Managed Connection binding the agent identity to the resource app with the appropriate scopes. This is the admin action that grants governed access. Walk the customer through the policy — scope selection, resource binding, who approved it.',
        ],
      },
      {
        title: 'Scenario 4 — Full Access Success After Authorization',
        content: [
          'Repeat the API call from Scenario 2. This time it succeeds because the Managed Connection is in place. The agent receives a scoped access token via the ID-JAG exchange and makes the API call. Contrast this with Scenario 2 — same agent, same API, different outcome because of governance.',
        ],
      },
      {
        title: 'Scenario 5 — Role-Based Access: Different User, Different Permissions',
        content: [
          'Switch to a different user (e.g., Mike in Warehouse). The same AI agent requests access, but this user\'s group membership only permits inventory read — not pricing or customer data. The access token reflects the user\'s permissions, not the agent\'s. This demonstrates RBAC applied at the identity layer.',
        ],
      },
      {
        title: 'Scenario 6 — Audit Trail in Okta System Log',
        content: [
          'Open the Okta System Log and show all agent actions from the demo: the failed access attempt in Scenario 2, the Managed Connection grant in Scenario 3, the successful token exchanges in Scenarios 4 and 5, and the RBAC-gated denial in Scenario 5. Every action is attributable to a specific identity, time-stamped, and searchable. This is the compliance narrative.',
        ],
      },
    ],
  },
  {
    heading: 'Recorded Demo Resources',
    paragraphs: [
      'For SEs who haven\'t run a live O4AA demo yet, or for async follow-up after a customer call, recorded demos are available:',
      '>> Key recorded demos: (1) Apex Wealth Advisor Demo (March 2026, 8 min) — covers SSO, Universal Directory integration, action attribution, audit logging, cross-app access, token exchange, granular policy evaluation, least privilege, ephemeral tokens, token vaulting, and multi-system CRUD operations. This is the most comprehensive single demo. (2) Bulk Onboarding & Registration — demonstrates Workflows-based bulk agent registration from Google Sheets, including activation and audit trail. (3) ISPM Demo for NHI & In-browser Discovery — shows shadow AI agent discovery, credential mapping, and agentless continuous monitoring. Includes a Storylane interactive walkthrough. (4) Okta MCP Adapter Demo — the Professional Services engagement demo ($55K, 6-12 weeks). (5) Showcase2026 Demo (Figma) — the full demo from Okta Showcase March 2026. (6) OAuth STS Brokered Consent for AI Agents — demonstrates the consent flow for ISV app integrations.',
      '!! The Apex Wealth Advisor demo is the recommended first demo for SEs new to O4AA — it covers the broadest set of capabilities in 8 minutes. For ISPM-led conversations, use the ISPM NHI Discovery demo with the Storylane interactive walkthrough.',
    ],
    labeledCallouts: [
      {
        label: 'Apex Wealth Advisor Demo',
        labelColor: 'blue',
        text: 'March 2026, 8 min. The most comprehensive single demo — covers SSO, Universal Directory, action attribution, audit logging, cross-app access, token exchange, granular policy evaluation, least privilege, ephemeral tokens, token vaulting, and multi-system CRUD. Recommended first watch for SEs new to O4AA.',
      },
      {
        label: 'Bulk Onboarding & Registration',
        labelColor: 'blue',
        text: 'Demonstrates Workflows-based bulk agent registration from Google Sheets, including activation and audit trail. Use this when the customer asks how to onboard many agents at once.',
      },
      {
        label: 'ISPM Demo for NHI & In-browser Discovery',
        labelColor: 'blue',
        text: 'Shows shadow AI agent discovery, credential mapping, and agentless continuous monitoring. Includes a Storylane interactive walkthrough. Use this for ISPM-led conversations.',
      },
      {
        label: 'Okta MCP Adapter Demo',
        labelColor: 'blue',
        text: 'The Professional Services engagement demo ($55K, 6-12 weeks). Use when positioning the PS-assisted implementation path.',
      },
      {
        label: 'Showcase2026 Demo (Figma)',
        labelColor: 'blue',
        text: 'The full demo from Okta Showcase March 2026. Use for internal enablement and to understand the current official demo narrative.',
      },
      {
        label: 'OAuth STS Brokered Consent for AI Agents',
        labelColor: 'blue',
        text: 'Demonstrates the consent flow for ISV app integrations. Use when the customer is an ISV or when brokered consent is part of the conversation.',
      },
    ],
  },
  {
    heading: 'Official Build Guides and Technical Resources',
    paragraphs: [
      'When a customer is ready to implement, point them to official build guides rather than demo-focused setup instructions:',
      '>> Key technical resources: (1) O4AA Sample Guide — the primary build guide for Okta for AI Agents implementation. (2) EA Docs — official early access documentation at help.okta.com covering Detect, Register, Secure, and Govern phases. (3) Okta Developer API Reference — the complete API reference for Okta for AI Agents. (4) AI Agent XAA Token Exchange Orchestration CoLab — a Google Colab notebook for hands-on XAA token exchange testing (save a copy and set variables for your environment). (5) Process to enable O4AA during EA — the internal process document for enabling O4AA features.',
      '!! SEs should use the knowledge app for conversation prep and the official build guides for customer handoff. Do not send customers the knowledge app content as implementation documentation.',
    ],
    labeledCallouts: [
      {
        label: 'O4AA Sample Guide',
        labelColor: 'blue',
        text: 'The primary build guide for Okta for AI Agents implementation. Walk customers through this document at the point of POC handoff. Contains the four POC use cases in structured execution order.',
      },
      {
        label: 'EA Docs (help.okta.com)',
        labelColor: 'blue',
        text: 'Official early access documentation covering Detect, Register, Secure, and Govern phases. The authoritative source for capability claims — verify anything you say against this before saying it to a customer.',
      },
      {
        label: 'Okta Developer API Reference',
        labelColor: 'blue',
        text: 'The complete API reference for Okta for AI Agents. Hand this to the customer\'s engineering team when they move from POC to implementation.',
      },
      {
        label: 'AI Agent XAA Token Exchange CoLab',
        labelColor: 'blue',
        text: 'A Google Colab notebook for hands-on XAA token exchange testing. Save a copy to your own Google Drive and set variables for your environment before sharing with customers.',
      },
      {
        label: 'Process to Enable O4AA During EA',
        labelColor: 'blue',
        text: 'The internal process document for enabling O4AA features on a customer org. Required reading before any customer enablement conversation — know the process before they ask.',
      },
    ],
  },
  {
    heading: 'Four POC Use Cases — Structured Execution Framework',
    paragraphs: [
      'The O4AA Sample Guide defines four use cases as a structured POC execution framework. This is the recommended order for hands-on evaluation — note it differs from the discovery conversation order (which typically starts with Discover). The POC order starts with Register because you need a registered agent before you can demonstrate the other capabilities. [Source: O4AA Sample Guide v1.6.0]',
      '>> POC Use Case 1 — Register Your Agent: Create an OIDC app (Web Application type, OpenID Connect, Federation Broker Mode enabled). Register the agent identity as a Workload Principal in Universal Directory. Generate credentials (public-private RS256 key pair). Output: a registered agent with a wlp_ prefixed identity and cryptographic credentials ready for token exchange.',
      '>> POC Use Case 2 — Secure Agent-to-Resource Access: Create a custom authorization server for the resource app. Add a Managed Connection binding the agent identity to the resource. Run the XAA/ID-JAG flow: user SSO → ID Token → exchange for ID-JAG at Org Auth Server → present ID-JAG to Custom Auth Server → receive scoped access token → make API call. This is the core demo flow that shows the complete token exchange chain.',
      '>> POC Use Case 3 — Govern Agent Access: Configure the Access Requests resource catalog in OIG. Test the request-approval workflow (user requests agent access → approval policy → time-bound grant). Run an access certification campaign that includes the AI agent. Demonstrate System Log auditability for all agent actions. This use case requires OIG licensing.',
      '>> POC Use Case 4 — Discover Unregistered Agents: Onboard Entra ID and/or Salesforce to ISPM. ISPM discovers AI agents from Microsoft Copilot Studio and Salesforce Agentforce. Gain visibility into agent inventory, investigate owners and permissions, and onboard discovered agents to Okta. Available since March 15, 2026. This use case requires ISPM licensing.',
      'TT "For a POC, I recommend we work through these four use cases in order. First we register an agent and give it a real identity. Then we secure its access to a backend resource using token exchange. Third, we show your governance team the access request and certification workflows. Finally, we connect ISPM to discover what agents are already running in your environment. By the end, you\'ll have seen the complete lifecycle — and you\'ll have a working implementation, not just a slide deck."',
    ],
    mermaidDiagrams: [
      {
        title: 'XAA Token Exchange Flow — Core POC Demo',
        code: `sequenceDiagram
    participant User as 👤 User
    participant WebApp as 🖥️ Web App
    participant Agent as 🤖 AI Agent
    participant OktaOrg as 🔐 Okta Org AS
    participant OktaRes as 🔐 Resource AS (Okta)
    participant API as 🌐 Resource API

    Note over User,WebApp: SSO Login
    User->>WebApp: Login (Auth Code + PKCE)
    WebApp->>OktaOrg: Authorization request
    OktaOrg-->>WebApp: ID Token issued

    Note over WebApp,Agent: Pass ID Token to Agent
    WebApp->>Agent: ID Token (user identity)

    Note over Agent,OktaOrg: Token Exchange — ID Token to ID-JAG
    Agent->>OktaOrg: POST /oauth2/v1/token<br/>grant_type=token-exchange<br/>subject_token=ID Token<br/>client_assertion=signed JWT
    OktaOrg-->>Agent: ID-JAG (5 min TTL)<br/>typ: oauth-id-jag+jwt

    Note over Agent,OktaRes: JWT Bearer Grant — ID-JAG to Scoped Token
    Agent->>OktaRes: POST /oauth2/{asId}/v1/token<br/>grant_type=jwt-bearer<br/>assertion=ID-JAG<br/>client_assertion=signed JWT
    OktaRes->>OktaOrg: Validate ID-JAG via JWKS
    OktaRes-->>Agent: Scoped Access Token

    Note over Agent,API: Bearer Token API Call
    Agent->>API: GET /api/resource<br/>Authorization: Bearer token
    API-->>Agent: Response data`,
        caption: 'Complete POC demo flow: SSO login → ID Token → token exchange for ID-JAG → JWT Bearer grant → scoped access token → API call',
      },
    ],
  },
  {
    heading: 'CoLab Notebook Setup — XAA Token Exchange Demo',
    paragraphs: [
      'The O4AA Sample Guide includes a Google Colab notebook (cross_app_access_demo.ipynb) for hands-on XAA token exchange testing. This is the fastest way to demonstrate the ID-JAG flow without building a full application. Save a copy and configure these variables for your environment: [Source: O4AA Sample Guide v1.6.0]',
      '>> CoLab configuration variables: OKTA_DOMAIN — your preview org URL (e.g., https://your-org.oktapreview.com). CLIENT_ID — from the OIDC app created in Use Case 1. CLIENT_SECRET — from the OIDC app. REDIRECT_URI — http://localhost:8080/authorization-code/callback (must match the OIDC app config). AUTHORIZATION_SERVER_ID — the custom authorization server created in Use Case 2. PRINCIPAL_ID — the Workload Principal ID (starts with wlp_, e.g., wlp8x5q7mvH86KvFJ0g7). RESOURCE_SERVER_AUDIENCE — the audience URI of the resource app (e.g., https://benefits.streamward.com). PRIVATE_JWK — the full private JWK JSON downloaded when generating agent credentials.',
      '!! Critical setup detail: when creating the OIDC app, you must enable Federation Broker Mode (check "Enable immediate access with Federation Broker Mode"). The app type must be Web Application with OpenID Connect sign-in method. The redirect URI must exactly match what you configure in the CoLab notebook. If the token exchange fails with a 400 error, the most common causes are: mismatched redirect URI, Federation Broker Mode not enabled, or the Managed Connection not yet configured for the custom authorization server.',
      '>> The CoLab notebook link: https://colab.research.google.com/drive/1rrvcb-WBfx8E7VWWkOea5E13mWfGnvDM — save a copy to your own Google Drive before modifying. The notebook walks through the complete flow: authenticate user → get ID Token → exchange for ID-JAG → present to resource server → receive scoped access token → make API call with the token.',
    ],
    timeline: [
      { label: 'Step 1', title: 'Open and save a copy of the CoLab notebook', description: 'Go to the CoLab link, then File > Save a copy in Drive. Work from your copy — never modify the original shared notebook.' },
      { label: 'Step 2', title: 'Complete Use Case 1 in the Sample Guide', description: 'Create the OIDC Web Application app. Enable Federation Broker Mode. Note the CLIENT_ID and CLIENT_SECRET. These feed into the notebook variables.' },
      { label: 'Step 3', title: 'Complete Use Case 2 in the Sample Guide', description: 'Create the custom authorization server and note the AUTHORIZATION_SERVER_ID. Register the Workload Principal and note the wlp_ prefixed PRINCIPAL_ID.' },
      { label: 'Step 4', title: 'Configure the 8 notebook variables', description: 'Set OKTA_DOMAIN, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI (must match OIDC app exactly), AUTHORIZATION_SERVER_ID, PRINCIPAL_ID, RESOURCE_SERVER_AUDIENCE, and PRIVATE_JWK.' },
      { label: 'Step 5', title: 'Run the notebook cells in order', description: 'The notebook walks through: authenticate user → get ID Token → exchange for ID-JAG → present to resource server → receive scoped access token → make API call.' },
      { label: 'Step 6', title: 'Troubleshoot 400 errors if they appear', description: 'Most common causes: mismatched redirect URI, Federation Broker Mode not enabled on the OIDC app, or the Managed Connection not yet configured for the custom auth server.' },
    ],
  },
  {
    heading: 'Field-Validated Discovery Patterns',
    paragraphs: [
      'Patterns observed from recorded pitch and discovery calls in the field:',
      '>> Pattern 1 — Keep bringing it back to identity: In a recorded Cap Group O4AA call, the SE consistently redirected the conversation from AI infrastructure topics back to identity and governance. When the customer went deep on AI model selection and orchestration frameworks, the SE asked: \'That\'s all important, but who authorized that agent to access your customer data? And can you revoke that access right now?\' This reframe from AI infrastructure to identity governance is the core O4AA conversation technique.',
      '>> Pattern 2 — Let educated customers drive: In an Infoblox call, the customer was already educated on O4AA concepts and clear on what they wanted. The SE aligned to their needs rather than running a full discovery. When the customer already knows the problem, skip the pain-building and go straight to solution mapping.',
      '>> Pattern 3 — The ISPM-first approach: Lead with \'let us show you what\'s running in your environment\' rather than a product pitch. The scan results do the selling — shadow agents, orphaned credentials, and over-privileged access are more persuasive than any slide deck.',
      '?? \'How are your engineering teams connecting AI agents to internal APIs today? If we scanned your environment, how many agents do you think we\'d find?\'',
    ],
    accordion: [
      {
        title: 'Pattern 1 — Keep Bringing It Back to Identity',
        content: [
          'Observed in a recorded Cap Group O4AA call. When the customer went deep on AI model selection and orchestration frameworks, the SE redirected: "That\'s all important, but who authorized that agent to access your customer data? And can you revoke that access right now?"',
          'This reframe from AI infrastructure to identity governance is the core O4AA conversation technique. Every time the customer drifts toward ML pipelines, model choices, or orchestration tooling, bring it back to: authorization, auditability, and revocation.',
        ],
      },
      {
        title: 'Pattern 2 — Let Educated Customers Drive',
        content: [
          'Observed in an Infoblox call. The customer was already educated on O4AA concepts and clear on what they wanted. The SE aligned to their needs rather than running a full discovery script.',
          'When the customer already knows the problem, skip the pain-building phase and go straight to solution mapping. Attempting to educate an informed customer wastes their time and erodes credibility. Read the room and adapt.',
        ],
      },
      {
        title: 'Pattern 3 — The ISPM-First Approach',
        content: [
          'Lead with "let us show you what\'s running in your environment" rather than a product pitch. The scan results do the selling — shadow agents, orphaned credentials, and over-privileged access are more persuasive than any slide deck.',
          'Open question: "How are your engineering teams connecting AI agents to internal APIs today? If we scanned your environment, how many agents do you think we\'d find?" Let the number land before introducing the product.',
        ],
      },
    ],
  },
  {
    heading: 'Pre-Call Checklist',
    paragraphs: [
      '>> Before every demo: (1) Verify your Okta org has XAA enabled (Settings > Features > EA), (2) Confirm xaa.dev is accessible, (3) If using Agent0/Todo0: run the bootstrap, start the apps, verify the login flow works end-to-end, (4) If using Agent Gateway: confirm Docker is running, Admin UI is accessible, at least one backend MCP server is configured and responding, (5) Open the System Log in a browser tab — you\'ll reference it during the demo.',
      '>> Common failure modes and fixes: Token endpoint misconfiguration — re-run bootstrap, Scope mismatch — check custom auth server scopes match the app configuration, Docker port conflict — check nothing else is using 3001/8000, XAA feature flag not enabled — the catalog entries won\'t appear, RSA key mismatch — regenerate via bootstrap script.',
      'TT "Never wing an O4AA demo. Auth flow demos fail unpredictably when setup is approximate. Run through the full flow yourself the morning of the call. If anything breaks, you have time to fix it."',
      'Budget 30 minutes of pre-call setup time for the first demo with a new org. Subsequent demos with the same org take 5 minutes to verify.',
    ],
    labeledCallouts: [
      {
        label: 'XAA feature flag enabled',
        labelColor: 'emerald',
        text: 'Verify Settings > Features > Early Access > "Cross App Access" is toggled on. If the catalog entries are missing during provisioning, this is the first thing to check.',
      },
      {
        label: 'xaa.dev accessible',
        labelColor: 'emerald',
        text: 'Open xaa.dev in a browser tab and confirm the playground loads. No setup needed — just confirm network access.',
      },
      {
        label: 'Agent0/Todo0 bootstrap complete',
        labelColor: 'emerald',
        text: 'Run pnpm run bootstrap:okta, start the apps via Dev Container, and verify the end-to-end login flow works before the call. Do not assume it works from yesterday.',
      },
      {
        label: 'Agent Gateway Docker running',
        labelColor: 'emerald',
        text: 'Confirm docker compose up is running, Admin UI is accessible at localhost:3001, and at least one backend MCP server is configured and responding.',
      },
      {
        label: 'System Log browser tab open',
        labelColor: 'emerald',
        text: 'Open the Okta System Log in a dedicated browser tab before the call starts. You will reference it during the demo — having it ready avoids navigation fumbling.',
      },
      {
        label: 'Token endpoint misconfiguration',
        labelColor: 'amber',
        text: 'If token exchange fails, re-run the bootstrap script. Manual configuration of endpoints is where demos most commonly break.',
      },
      {
        label: 'Scope mismatch',
        labelColor: 'amber',
        text: 'If access is denied unexpectedly, check that the custom auth server scopes match what the app configuration requests. The scope names must match exactly.',
      },
      {
        label: 'Docker port conflict',
        labelColor: 'amber',
        text: 'If the Admin UI or API is unreachable, check that ports 3001 and 8000 are not in use by another process.',
      },
      {
        label: 'RSA key mismatch',
        labelColor: 'amber',
        text: 'If client_assertion validation fails, the private JWK in use may not match the public key registered on the Workload Principal. Regenerate credentials via the bootstrap script.',
      },
    ],
  },
];

export const content: SectionContent = { slug, title, description, tags, icon, hasDiagram, diagramPrompt, cards };
