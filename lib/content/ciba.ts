import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'ciba',
  title: 'CIBA (Human-in-the-Loop)',
  description:
    'Client-Initiated Backchannel Authentication — how Okta enables human approval gates for high-risk AI agent actions, satisfying EU AI Act oversight requirements.',
  tags: ['auth-flows', 'CIBA', 'human-in-loop', 'EU-AI-Act'],
  icon: '✋',
  hasDiagram: true,
  diagramPrompt:
    'Sequence diagram: AI Agent on left initiates backchannel auth request to Authorization Server in center. Server sends push notification to Human Approver on right. Approver approves or denies. Server issues or denies token to Agent. Blue and white palette, clean technical style.',
  cards: [
    {
      heading: 'What is CIBA?',
      paragraphs: [
        'CIBA (Client-Initiated Backchannel Authentication) is an OpenID Connect extension where the client (AI agent) initiates an authentication/authorization request, but the end user authenticates on a separate device. The agent does not need a browser — it makes a backchannel API call and waits.',
        'Three delivery modes: poll (agent polls the token endpoint), ping (server calls back the agent when approved), push (server pushes the token directly). The agent sends a login_hint identifying the approver and a binding_message describing the action requiring approval.',
        '!! CIBA is the technical mechanism that makes "human-in-the-loop" for AI agents real. Without it, agents must either proceed autonomously (risky) or pause and surface a UI approval (requires the user to be at a browser). CIBA decouples the agent\'s request from the human\'s approval device — the approver gets a push notification on Okta Verify, reviews the action, and approves or denies from their phone.',
        '?? For actions your AI agents can take that cannot be undone — wiring a payment, deleting a record, modifying production config — what is your approval mechanism today? Human-in-the-loop async authorization is one of the most common unsolved problems in our customer conversations. Can you get async human approval without blocking the agent\'s execution thread?',
      ],
      mermaidDiagrams: [
        {
          title: 'CIBA Decoupled Approval Flow',
          code: `sequenceDiagram
    participant Agent as 🤖 AI Agent
    participant Okta as 🔐 Okta CIBA Endpoint
    participant Approver as 🧑‍💼 Approver (phone)

    Note over Agent,Okta: Backchannel request — no browser required
    Agent->>Okta: POST /bc-authorize<br/>login_hint: approver@co<br/>binding_message: "Wire $50k to vendor X"
    Okta-->>Agent: auth_req_id (pending)<br/>Agent waits / polls

    Note over Okta,Approver: Decoupled approval channel
    Okta->>Approver: Push notification (Okta Verify)<br/>"AI Agent requests: Wire $50k to vendor X"
    Approver->>Okta: Approve or Deny

    Note over Okta,Agent: Token gate — no approval, no token
    alt Approved
        Okta-->>Agent: Scoped access token issued<br/>Agent proceeds with action
    else Denied
        Okta-->>Agent: access_denied error<br/>Agent halts — action blocked
    end`,
          caption: 'CIBA enforces human oversight at the identity layer — the agent receives a token only after explicit human approval, and the approval event is cryptographically bound and logged in Okta System Log.',
        },
      ],
      timeline: [
        { label: 'Step 1', title: 'Agent Requests Approval', description: 'Agent makes backchannel API call to Okta\'s CIBA endpoint with login_hint (approver) and binding_message (action description). No browser needed.' },
        { label: 'Step 2', title: 'Push to Approver', description: 'Okta sends push notification to the approver\'s device via Okta Verify. Notification includes the action details and the requesting agent\'s identity.' },
        { label: 'Step 3', title: 'Human Decision', description: 'Approver reviews and approves or denies from their phone. Decision is cryptographically bound and logged in Okta System Log.' },
        { label: 'Step 4', title: 'Token Issued (or Denied)', description: 'If approved, Okta issues a scoped token to the agent. If denied, the agent receives an error. No approval = no token = no action.' },
      ],
    },
    {
      heading: 'CIBA for AI Agent Scenarios',
      paragraphs: [
        'Financial trading: agent executes trades autonomously below a threshold. Above threshold, CIBA fires — the licensed trader gets a push notification with the instrument, quantity, price, and reason. They approve or deny from Okta Verify. The agent only receives the token (and can proceed) after approval. This satisfies SOX maker/checker requirements.',
        'Healthcare PHI access: agent processing a patient request needs to access medical records. CIBA triggers approval from the treating clinician before the agent can access PHI. Logged in Okta System Log as a CIBA authorization event — auditable under HIPAA.',
        'IT automation: helpdesk bot handles routine requests autonomously. For high-risk operations (account deprovisioning, privilege escalation), CIBA requires approval from an IT admin. Satisfies SOX ITGC separation of duties.',
        '!! CIBA is the direct answer to the EU AI Act Article 14 requirement for human oversight of high-risk AI systems. The Act requires that humans can "intervene on the functioning of the high-risk AI system or interrupt the system." CIBA implements this at the identity layer — no approval, no token, no action.',
        'The enforcement date for EU AI Act Article 14 is August 2, 2026 — four months from now. The fine structure is up to EUR 35 million or 7% of global annual turnover. CIBA is the direct technical answer to Article 14\'s human oversight requirement for autonomous AI systems. [Source: EU AI Act]',
      ],
      tabs: [
        {
          label: 'Financial Trading',
          content: [
            'Agent executes trades autonomously below a threshold. Above threshold, CIBA fires — the licensed trader gets a push notification with instrument, quantity, price, and reason.',
            '!! Satisfies SOX maker/checker requirements and FINRA Notice 24-09 governance frameworks.',
          ],
        },
        {
          label: 'Healthcare PHI',
          content: [
            'Agent processing a patient request needs medical records. CIBA triggers approval from the treating clinician before the agent can access PHI.',
            '!! Logged in Okta System Log as a CIBA authorization event — auditable under HIPAA.',
          ],
        },
        {
          label: 'IT Automation',
          content: [
            'Helpdesk bot handles routine requests autonomously. For high-risk operations (account deprovisioning, privilege escalation), CIBA requires approval from an IT admin.',
            '!! Satisfies SOX ITGC separation of duties requirements.',
          ],
        },
      ],
    },
    {
      heading: 'SE Positioning',
      paragraphs: [
        'TT "Every enterprise deploying AI agents has a class of actions that should never happen without human approval. The question is how you implement that gate. CIBA means the agent requests approval via API, the human approves from their phone, and Okta issues the token only after approval. It\'s async, it\'s auditable, and it works without the user being at a browser."',
        '>> CIBA differentiates Okta from every competitor in the AI agent space. No other enterprise identity platform has a native backchannel auth flow purpose-built for agent approval gates. Entra has no equivalent. AWS IAM has no equivalent. Ping\'s new "Identity for AI" does not include backchannel approval.',
        '?? Which of your AI agent actions require human approval before execution? How do you implement that approval today — is it a code-level check, a Slack message, or nothing at all? For financial trading: FINRA Notice 24-09 requires documented governance frameworks for AI in trading operations. For healthcare: HIPAA requires clinician authorization before AI agents access PHI. CIBA provides the standards-based mechanism for both.',
      ],
    },
  ],
};
