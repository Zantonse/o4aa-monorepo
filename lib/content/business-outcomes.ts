import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'business-outcomes',
  title: 'Customer Business Outcomes',
  description:
    'How Okta for AI Agents maps to the business outcomes customers care about — unblocking production deployment, reducing integration complexity, and strengthening compliance posture.',
  tags: ['SE-playbook', 'business-outcomes', 'value-mapping', 'consulting'],
  icon: '📈',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'Accelerate AI Agent Deployment',
      paragraphs: [
        'Most enterprises have AI agent projects stalled in development because they can\'t pass security review. The auth model is missing. Agents are running on shared service accounts with no per-user delegation, no audit trail, and no revocation mechanism. Security teams block production deployment until these gaps are closed.',
        '!! Business outcome: Okta unblocks production deployment by providing the auth layer security teams require — OBO token exchange for user delegation, Auth0 FGA for per-resource access, and System Log for compliance-grade audit. Customers go from "blocked in dev" to "approved for production."',
        'TT "How many AI agent projects do you have waiting for security approval right now? What\'s the specific blocker? In most cases, it\'s the identity and authorization model. Okta provides that layer so your security team can sign off."',
        '?? How many AI agent initiatives are currently blocked waiting for security review? What would it mean for your business if those went live this quarter instead of next year? One customer told us: "If Okta can help us move faster, that is the primary driver. If I can just say you don\'t have to do that anymore — just expose that layer in Okta — that\'s going to be what signs us up."',
      ],
      labeledCallouts: [
        {
          label: 'OBO Token Exchange',
          labelColor: 'emerald',
          text: 'Provides per-user delegation — the specific auth model security teams require before approving production AI agent deployments. Agents act on behalf of named users, not as anonymous services. Security teams can sign off because there\'s a traceable delegation chain.',
        },
        {
          label: 'Auth0 FGA',
          labelColor: 'emerald',
          text: 'Per-resource, per-user authorization enforced at query time. Closes the "what can this agent access and on whose behalf" gap that blocks security approval for RAG systems, multi-tenant environments, and any agent accessing sensitive data.',
        },
        {
          label: 'System Log (Identity-Layer Audit)',
          labelColor: 'emerald',
          text: 'Produces the compliance-grade audit evidence that security and compliance teams require for production sign-off. Every delegation event captured independently of the agent or application — the record an auditor will rely on.',
        },
        {
          label: 'CIBA (Human-in-the-Loop)',
          labelColor: 'emerald',
          text: 'Async human approval for high-risk agent actions before execution. Directly satisfies the EU AI Act human oversight requirement and unblocks production deployment for regulated industries where fully autonomous agent action is not yet permissible.',
        },
      ],
    },
    {
      heading: 'Reduce Integration Complexity',
      paragraphs: [
        'Without a centralized identity layer, every AI agent integration requires custom auth middleware. Each backend API needs its own credential management, token exchange logic, and audit implementation. With 10 backend systems, that\'s 10 custom auth implementations to build, maintain, test, and keep secure. Engineering time spent on auth plumbing is time not spent on AI capabilities.',
        '!! Business outcome: Okta centralizes agent auth into one platform. The Agent Gateway handles 8 different auth methods through a single gateway. Engineers configure once in Okta; every agent-to-backend connection inherits enterprise auth automatically. Customers report reducing integration effort from weeks to days per backend.',
        '>> The pattern we see: customers start by building custom auth for their first 2-3 agent integrations, then hit a wall at integration 4-5 when the maintenance burden becomes unsustainable. Okta is the answer to "how do we scale this?"',
        '?? How many backend systems do your AI agents need to connect to? How long does it take your team to add auth to each new integration today? One common pattern: teams build custom auth for their first 2-3 integrations, then hit a wall at integration 4-5 when the maintenance burden becomes unsustainable. The Agent Gateway handles 8 different auth methods through a single gateway.',
      ],
      labeledCallouts: [
        {
          label: 'Agent Gateway (8 Auth Methods)',
          labelColor: 'blue',
          text: 'A single gateway supporting 8 different authentication methods for heterogeneous backends — API key, OAuth 2.0, mTLS, and more. Engineers configure once in Okta; every agent-to-backend connection inherits enterprise auth automatically. Reduces per-integration auth engineering from weeks to days.',
        },
        {
          label: 'Privileged Credential Management',
          labelColor: 'blue',
          text: 'Centralized credential storage and lifecycle management. Eliminates the credential sprawl pattern where each team builds their own secret management for agent integrations. When an agent is decommissioned or an employee leaves, credential rotation propagates from one place.',
        },
        {
          label: 'Cross App Access (XAA)',
          labelColor: 'blue',
          text: 'IT-governed, policy-controlled app-to-app connections that replace shadow integrations built by individual engineering teams. Gives IT a centralized inventory of which agents access which systems — visibility that service accounts and custom auth middleware cannot provide.',
        },
        {
          label: 'Platform Consolidation',
          labelColor: 'blue',
          text: 'All agent auth runs through the same platform as workforce identity — same admin console, same policy engine, same audit log. No separate toolchain to procure, deploy, and maintain for agent-specific auth. The marginal cost of each new agent integration decreases as the platform absorbs the fixed overhead.',
        },
      ],
    },
    {
      heading: 'Strengthen Compliance Posture',
      paragraphs: [
        'Regulators are catching up to AI. SOX auditors are asking whether AI agents have unique, audited identities. HIPAA requires per-access PHI logging that shared service accounts can\'t provide. The EU AI Act mandates human oversight mechanisms for high-risk AI systems. Organizations that deploy AI agents without an identity layer face compliance gaps that surface during the next audit cycle.',
        '!! Business outcome: Okta produces the audit evidence compliance teams need — every agent action logged with user attribution, delegation chain, scopes used, and timestamp. System Log is an identity-layer record (not an app-level log), making it authoritative for audit purposes. CIBA provides the human oversight mechanism the EU AI Act requires.',
        'TT "When your auditor asks \'who authorized this AI agent to access that customer record,\' what\'s your answer today? With Okta, the answer is in the System Log: user X authorized agent Y at time T with scope Z. That\'s the audit evidence that closes the compliance gap."',
        '?? What compliance frameworks govern your AI agent deployments? Has your audit team asked about AI agent identity and access controls yet? For financial services: SOX auditors are already examining whether AI agents have unique, audited identities. For healthcare: HIPAA requires per-access PHI logging that shared service accounts structurally cannot provide. For insurance: regulators (NYDFS, SEC, FINRA) are demanding audit trails for agent actions — and no gold standard exists yet.',
        'Updated industry data: IBM\'s 2025 Cost of a Data Breach report puts the global average at $4.4M. Shadow AI specifically adds $670,000 to average breach costs (IBM 2025) — this is the quantifiable cost of ungoverned AI agent activity. For the cost-of-inaction case: multiply the customer\'s agent count by their data sensitivity and compare against the $670K shadow AI adder. [Source: IBM Cost of a Data Breach 2025]',
      ],
      labeledCallouts: [
        {
          label: 'Risk: SOX ITGC Gap',
          labelColor: 'rose',
          text: 'SOX auditors are already examining whether AI agents have unique, audited identities separate from the users and services they act on behalf of. Shared service accounts fail this test — they cannot demonstrate per-user attribution or per-action authorization for agent activity.',
        },
        {
          label: 'Okta: System Log',
          labelColor: 'emerald',
          text: 'Every delegation event logged with user attribution, delegation chain, scopes used, and timestamp. Produced by the authorization server — not by the agent or application — making it an independent, authoritative record for SOX ITGC review. Format: "Okta authorized agent Y to do X on behalf of user Z at time T with scope W."',
        },
        {
          label: 'Risk: HIPAA PHI Logging Gap',
          labelColor: 'rose',
          text: 'HIPAA requires per-access PHI logging that shared service accounts structurally cannot provide. When a service account accesses PHI, the log shows the service account — not the user on whose behalf the agent was acting. That\'s an incomplete audit trail for a HIPAA compliance review.',
        },
        {
          label: 'Okta: OBO + FGA',
          labelColor: 'emerald',
          text: 'OBO token exchange preserves the user identity through the delegation chain — the PHI access log shows both the agent and the user. Auth0 FGA enforces the HIPAA "minimum necessary" principle at the resource level: agents can only access PHI records scoped to the specific patient and encounter, not the entire database.',
        },
        {
          label: 'Risk: EU AI Act Human Oversight Gap',
          labelColor: 'rose',
          text: 'The EU AI Act mandates human oversight mechanisms for high-risk AI systems. Fully autonomous agents that take irreversible actions — modifying records, initiating transactions, sending communications — without a human approval step may not satisfy this requirement for regulated use cases.',
        },
        {
          label: 'Okta: CIBA',
          labelColor: 'emerald',
          text: 'Client-Initiated Backchannel Authentication (CIBA) provides asynchronous human approval before an agent executes a high-risk action. The agent requests authorization; a named human approves or denies via Okta Verify. The approval event is logged in System Log — closing the human oversight gap with an auditable record.',
        },
        {
          label: 'Risk: Shadow AI Cost',
          labelColor: 'rose',
          text: 'Shadow AI specifically adds $670,000 to average breach costs (IBM Cost of a Data Breach 2025). This is the quantifiable cost of ungoverned AI agent activity — agents operating outside the identity governance perimeter, using credentials IT doesn\'t manage, accessing systems IT doesn\'t know about.',
        },
        {
          label: 'Okta: Cross App Access + XAA Inventory',
          labelColor: 'emerald',
          text: 'Cross App Access gives IT a governed, auditable registry of every agent-to-system connection. Agents operating outside this registry are detectable. The shift from "we don\'t know what our agents are doing" to "every agent connection is an IT-approved policy entry" is the structural control that shadow AI risk requires.',
        },
      ],
    },
    {
      heading: 'Feature-to-Outcome Mapping',
      paragraphs: [
        'Every O4AA capability maps to a specific business outcome. Use this mapping in proposals, executive summaries, and business case documents to connect technical features to the language leadership cares about.',
        '>> OBO Token Exchange (RFC 8693) → Enables user-delegated agent access → Unblocks production deployment by satisfying security team requirements for per-user attribution',
        '>> Cross App Access (XAA) / ID-JAG → Enterprise-governed app-to-app connections → Reduces shadow AI risk by giving IT centralized control over which agents access which systems',
        '>> Auth0 FGA → Per-resource, per-user authorization → Prevents data leakage in RAG systems and multi-tenant environments → Directly addresses GDPR "minimum necessary" and HIPAA requirements',
        '>> Privileged Credential Management → Centralized credential storage and lifecycle management → Eliminates credential sprawl and "ghost access" from departed employees → Reduces mean-time-to-revoke from hours to seconds',
        '>> Agent Gateway (8 auth methods) → Single gateway for heterogeneous backends → Reduces per-integration auth engineering from weeks to days → Directly reduces engineering cost',
        '>> System Log (identity-layer audit) → Authoritative compliance record → Satisfies SOX ITGC, HIPAA 164.312(b), GDPR Article 30 → Audit evidence that costs nothing to produce once configured',
        '>> CIBA (human-in-the-loop) → Async human approval for high-risk agent actions → Satisfies EU AI Act human oversight requirement → Directly unblocks regulated industry deployment',
      ],
      mermaidDiagrams: [
        {
          title: 'O4AA Capability to Business Outcome Map',
          code: `graph LR
    subgraph Capabilities["Product Capabilities"]
        OBO["OBO Token Exchange<br/>RFC 8693"]
        XAA["XAA / ID-JAG<br/>Cross-App Access"]
        FGA["Auth0 FGA<br/>Fine-Grained Authz"]
        PCM["Privileged Credential<br/>Management"]
        AGW["Agent Gateway<br/>8 auth methods"]
        LOG["System Log<br/>Identity-layer audit"]
        CIBA["CIBA<br/>Human-in-the-Loop"]
    end

    subgraph Mechanisms["Mechanism"]
        M1["User-delegated token<br/>per-user attribution"]
        M2["IT-governed app<br/>connections"]
        M3["Per-resource scoped<br/>authorization"]
        M4["Centralized credential<br/>lifecycle + rotation"]
        M5["Single gateway for<br/>heterogeneous backends"]
        M6["Authoritative<br/>compliance record"]
        M7["Async human approval<br/>before agent action"]
    end

    subgraph Outcomes["Business Outcomes"]
        O1["Accelerate Deployment<br/>Security team sign-off"]
        O2["Reduce Complexity<br/>Centralized control plane"]
        O3["Strengthen Compliance<br/>GDPR, HIPAA, SOX, EU AI Act"]
    end

    OBO --> M1 --> O1
    XAA --> M2 --> O2
    FGA --> M3 --> O3
    PCM --> M4 --> O2
    AGW --> M5 --> O2
    LOG --> M6 --> O3
    CIBA --> M7 --> O3
    CIBA -.-> O1

    style Capabilities fill:#e8f0f5,stroke:#7a9ab8,stroke-width:2px
    style Mechanisms fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Outcomes fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style O1 fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style O2 fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style O3 fill:#e6f0eb,stroke:#7ab894,stroke-width:2px`,
          caption: 'Each capability drives a mechanism that unlocks one or more of the three core business outcomes. CIBA uniquely supports both Accelerate Deployment and Strengthen Compliance.',
        },
      ],
    },
  ],
};
