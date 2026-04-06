import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'compliance',
  title: 'Industry Compliance',
  description:
    'How AI agent identity and authorization requirements map to HIPAA, SOX, FINRA, the EU AI Act, FedRAMP, NIST, and multi-tenant data privacy frameworks — and why shared service accounts create audit and regulatory exposure.',
  tags: ['compliance', 'hipaa', 'sox', 'finra', 'fedramp', 'nist', 'gdpr', 'pci-dss', 'eu-ai-act', 'multi-tenant'],
  icon: '⚖️',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'Healthcare: HIPAA',
      paragraphs: [
        'The HIPAA Minimum Necessary Standard requires that access to Protected Health Information be limited to the minimum necessary to accomplish the intended purpose. For AI agents this is a technical enforcement requirement, not an assumed behavior. A service account granted broad patient record access violates the Minimum Necessary Standard even if the agent only queries what it needs during normal operation — because the technical permission boundary permits far more than that. Auditors examine what the credential can do, not what it typically does. An agent identity with narrowly scoped, per-request tokens satisfies the standard in a way that a shared broad-access service account structurally cannot.',
        'HIPAA Security Rule section 164.312(b) mandates that covered entities implement hardware, software, and procedural mechanisms to record and examine activity in information systems containing PHI. Every PHI access must be logged with specific identity, what was accessed, when, and from where. Shared service accounts collapse this requirement entirely — the audit log shows the service account, not the individual user or clinical context that authorized the access. When a clinical AI agent queries patient records using a shared EHR service account, there is no patient-specific scope control and no way to reconstruct which clinician authorized which query. This is a structural audit gap, not a configuration problem.',
        'Okta, both Workforce Identity Cloud and Auth0, is a HIPAA Business Associate with a Business Associate Agreement available. AI agent infrastructure handling PHI must be covered under a BAA — this is a precondition for compliant deployment, not an optional enhancement. Organizations deploying clinical AI should verify BAA coverage for every component in the agent infrastructure chain, including the identity provider. The practical implication is that Auth0 enterprise customers in healthcare have a path to compliant agentic deployment through the Auth0 BAA, while organizations using unverified identity infrastructure have a compliance gap regardless of their application-layer controls.',
        'A documented real-world pattern from hospital deployments illustrates the exposure. A clinical documentation agent was deployed using a shared EHR service account to query patient records for note generation. During a HIPAA audit, investigators found that the audit logs showed only the service account identifier with no patient-specific scope control and no clinician attribution. The agent had accessed hundreds of patient records over weeks with no log trail showing who authorized each access. The result was a breach notification obligation and a civil monetary penalty.',
        '?? When your clinical AI reads a patient record, does the audit log show the patient ID and the authorizing clinician, or does it show a service account?',
      ],
      labeledCallouts: [
        {
          label: 'Risk',
          labelColor: 'rose',
          text: 'Minimum Necessary Standard (45 CFR § 164.502(b)): Auditors examine what the credential is technically permitted to access — not what the agent typically requests. A shared EHR service account with broad PHI read permissions fails this standard regardless of the agent\'s normal access patterns. Structural over-privilege is a violation even when never exercised.',
        },
        {
          label: 'Okta Capability',
          labelColor: 'blue',
          text: 'Per-request scoped tokens via XAA (Cross App Access) enforce the Minimum Necessary Standard at the credential layer. Each token is issued for a specific task and audience, with TTL measured in minutes. The agent cannot access PHI outside the scope of the current token — the technical boundary matches the compliance requirement.',
        },
        {
          label: 'Risk',
          labelColor: 'rose',
          text: 'Audit Control requirement (§ 164.312(b)): Every PHI access must be attributable to a specific identity, resource, and timestamp. Shared service accounts collapse attribution — the audit log shows the service account name, not the clinician or patient context. This is a structural gap that cannot be patched with application-layer logging alone.',
        },
        {
          label: 'Okta Capability',
          labelColor: 'blue',
          text: 'Okta\'s audit log for token issuance captures the user sub (the authorizing clinician), the agent client_id, the requested scopes, the target resource, and the timestamp — for every token exchange. This provides the per-access audit trail § 164.312(b) requires, at the identity infrastructure layer rather than the application layer.',
        },
        {
          label: 'Risk',
          labelColor: 'rose',
          text: 'BAA prerequisite: AI agent infrastructure handling PHI must be covered under a signed Business Associate Agreement. An organization deploying clinical AI on an identity provider without a BAA has a compliance gap at the infrastructure layer, regardless of application-layer controls.',
        },
        {
          label: 'Okta Capability',
          labelColor: 'blue',
          text: 'Okta Workforce Identity Cloud and Auth0 are both HIPAA Business Associates with BAAs available. Healthcare organizations can execute a BAA with Okta to bring the identity infrastructure layer into the covered entity compliance boundary — a precondition for any agentic deployment that touches PHI.',
        },
      ],
    },
    {
      heading: 'Financial Services: SOX, FINRA, EU AI Act',
      paragraphs: [
        'SOX IT General Controls require that access changes to financial systems produce audit evidence equivalent to what a human administrator would generate. As of 2025 and 2026, SOX auditors are specifically examining whether AI agents that automate access changes, financial data queries, or reporting workflows have unique, audited identities. An AI agent with a shared service account credential produces audit evidence attributable only to that service account — it satisfies the logging requirement on paper while eliminating the accountability the requirement was designed to enforce. The practical question auditors are asking is whether you can demonstrate that a specific agent action was authorized by a specific human principal at a specific time. Shared credentials make that answer no by design.',
        'FINRA Regulatory Notice 24-09, published in 2024, addressed the use of AI in securities trading and operations. Firms using AI in trading workflows are required to document governance frameworks that include access controls and audit trails. The Notice treats AI governance as an extension of existing supervision obligations — not a new regulatory category, but an application of existing rules to a new class of actor. An agent executing trading operations without a documented identity and access governance framework is non-compliant with supervision requirements regardless of whether the underlying trades are sound. The audit trail for algorithmic and AI-assisted trading must be able to attribute each action to an authorized system with documented controls.',
        'The EU AI Act, with enforcement beginning in 2025 and 2026, classifies AI systems used in credit, employment, essential services, and law enforcement as high-risk. High-risk AI systems require human oversight mechanisms — CIBA (Client-Initiated Backchannel Authentication) is a technical implementation of this requirement, enabling human approval gates for agent actions before execution. The Act also requires audit logging and transparency such that decisions made by AI systems can be attributed and explained. Black-box agent actions that cannot be attributed to a specific identity and authorization chain will fail EU AI Act compliance review. MiFID II adds a further layer for algorithmic trading systems, requiring registration, documented risk controls, and governance — an agent executing trading logic must have an auditable identity that can be presented to regulators on demand.',
        'EU AI Act Article 14 (human oversight of autonomous systems) takes full effect on August 2, 2026. Organizations operating high-risk AI systems in the EU must demonstrate human oversight mechanisms. Fines for non-compliance: up to EUR 35 million or 7% of global annual turnover, whichever is higher. For AI agents making autonomous decisions with business impact, CIBA provides the technical mechanism for human-in-the-loop approval that satisfies Article 14 requirements. The August 2026 deadline creates concrete urgency for customers deploying AI agents in EU-regulated environments. [Source: EU AI Act Article 14; Kundan Kolhe blog Post 2]',
        'The SEC Cyber and Emerging Technologies Unit (CETU), launched in February 2025, specifically targets fraudulent cybersecurity disclosure and AI-enabled fraud. Unlike pending regulations, CETU is an active enforcement body with ongoing investigations. For publicly traded companies deploying AI agents, CETU adds an immediate compliance dimension beyond SOX and FINRA — particularly for agents that access or generate financial data. [Source: Kundan Kolhe blog Post 7]',
        'TT The SE talking point for financial services prospects is grounded in what their auditors are already doing. SOX auditors want IT General Controls on AI agents structured the same way they want controls on human admins — unique identity, access review, and deprovisioning. FINRA and the SEC are examining AI in trading workflows under existing supervision rules. The EU AI Act requires documented human oversight for high-risk AI that will be tested in enforcement actions starting now. The current state for most firms is that their agents run as shared service accounts — that is a compliance gap that will surface in the next audit cycle, not a hypothetical future risk.',
      ],
      accordion: [
        {
          title: 'SOX — IT General Controls for AI Agents',
          content: [
            'SOX IT General Controls require that access changes to financial systems produce audit evidence equivalent to what a human administrator would generate. Auditors are specifically examining whether AI agents that automate access changes, financial data queries, or reporting workflows have unique, audited identities.',
            'Compliance gap with shared credentials: An AI agent using a shared service account satisfies the logging requirement on paper — events are logged — but the log shows the service account, not the human principal who authorized the action. The question auditors ask is: can you demonstrate that a specific agent action was authorized by a specific human at a specific time? Shared credentials make the answer structurally no.',
            'Okta response: Workload Principals give each AI agent a unique identity in Universal Directory. OIG access certification campaigns extend to agent identities — agents are reviewed, attested, and deprovisioned the same way human accounts are. Every token issuance event in the Okta audit log carries the agent client_id and the authorizing user sub. SOX auditors see the same evidence structure for agents as for human admins.',
            'SEC CETU (launched February 2025) adds immediate enforcement risk for publicly traded companies beyond the annual audit cycle — particularly for agents that access or generate financial data. [Source: Kundan Kolhe blog Post 7]',
          ],
        },
        {
          title: 'FINRA — Supervision Obligations and AI in Trading',
          content: [
            'FINRA Regulatory Notice 24-09 (2024) addressed AI use in securities trading and operations. The Notice treats AI governance as an extension of existing supervision obligations, not a new regulatory category. An agent executing trading operations must have a documented identity and access governance framework — the underlying trade quality is separate from the supervision compliance question.',
            'The audit trail for algorithmic and AI-assisted trading must attribute each action to an authorized system with documented controls. A shared service account executing trades satisfies none of this: the account is not uniquely attributed, there is no documented authorization chain, and there is no per-action audit trail beyond the service account identifier.',
            'Okta response: Agent identities registered as Workload Principals have documented ownership (assigned human accountable party), access policies, and audit log coverage. The Managed Connection configuration serves as the documented access control record for the agent\'s permissions. Every trade action executed by an agent appears in Okta\'s system log attributed to the agent\'s unique identity.',
          ],
        },
        {
          title: 'EU AI Act — Article 14 Human Oversight (Effective August 2, 2026)',
          content: [
            'The EU AI Act classifies AI systems used in credit, employment, essential services, and law enforcement as high-risk. High-risk AI systems require human oversight mechanisms that allow humans to monitor, intervene, or override agent actions before they take effect. Enforcement began in 2025; Article 14 (human oversight of autonomous systems) takes full effect August 2, 2026.',
            'Fines for non-compliance: up to EUR 35 million or 7% of global annual turnover, whichever is higher.',
            'Technical implementation: CIBA (Client-Initiated Backchannel Authentication) is the direct implementation of Article 14\'s human oversight requirement. Before a high-risk agent action executes, CIBA triggers an approval request to the designated human approver. The agent action is blocked pending approval. The approval event is logged. This is a synchronous human oversight gate at the identity layer — not application-level confirmation dialogs.',
            'MiFID II adds a further requirement for algorithmic trading systems: registration, documented risk controls, and governance. An agent executing trading logic must have an auditable identity presentable to regulators on demand.',
            'Okta response: CIBA is available in Okta Workforce Identity Cloud. Configuring CIBA as a pre-execution step for high-risk agent actions provides the Article 14 oversight mechanism. Each approval event is logged in Okta\'s system log with the approver\'s identity and timestamp — satisfying both the oversight requirement and the audit logging requirement simultaneously.',
          ],
        },
      ],
    },
    {
      heading: 'Government: FedRAMP and NIST',
      paragraphs: [
        '!! FedRAMP authorization is a prerequisite for any cloud service used by US federal agencies. Okta Workforce Identity Cloud Government Cloud is FedRAMP Moderate authorized, which means it satisfies the authorization requirement for federal AI agent deployments. Auth0 does not have FedRAMP authorization. This is not a configuration gap or a roadmap item — it is a current authorization status that eliminates Auth0 as an option for federal customers deploying AI agents in FedRAMP-scoped environments. When federal prospects are evaluating Okta for agentic deployments, the FedRAMP status of WIC Government Cloud is a qualification criterion, not a differentiator.',
        'NIST Special Publication 800-53 Access Control family control AC-2 requires that all accounts, including non-human identities, be inventoried with assigned owners, subject to periodic access reviews, and promptly deprovisioned when no longer needed. AI agents are non-human identities that must be managed under AC-2 the same way human accounts are managed. An AI agent with no assigned owner, no inventory record, and no deprovisioning process is an AC-2 finding. The control requires that organizations know what accounts exist, who is responsible for them, and whether they should still have access — none of which is possible for agent identities managed as anonymous shared service accounts.',
        'NIST 800-53 control IA-3 requires that devices and systems be uniquely identified and authenticated before establishing connections. AI agents that share credentials with other systems or with human operators fail IA-3 because they cannot be uniquely identified at the authentication layer. The Okta Non-Human Identity model addresses IA-3 directly by issuing unique, machine-specific credentials to each agent identity — the agent authenticates as itself, not as a shared pool credential. This makes each agent\'s actions attributable to a unique authenticated entity at the infrastructure level, not just at the application level.',
        'The NIST AI Risk Management Framework structures AI governance around four functions: GOVERN, MAP, MEASURE, and MANAGE. The GOVERN function addresses organizational accountability and ownership for AI systems — Okta NHI provides the ownership and accountability infrastructure for agent identities. The MANAGE function addresses incident response and risk treatment, including the ability to revoke or modify AI system access during an incident — Okta\'s centralized identity model enables rapid revocation of agent credentials without modifying application code. The MEASURE function requires audit and assessment capabilities to evaluate AI system behavior — Okta\'s audit logging for agent token issuance and access events provides the measurement data the RMF requires. Federal and regulated agency customers building AI systems should expect their AI governance documentation to map to RMF functions, and each function has a direct Okta product mapping.',
      ],
      labeledCallouts: [
        {
          label: 'FedRAMP Requirement',
          labelColor: 'rose',
          text: 'FedRAMP authorization is a binary prerequisite for US federal agency deployments — not a feature comparison point. Any cloud service in the identity infrastructure chain must be FedRAMP authorized for the deployment to be in scope. There is no workaround or compensating control.',
        },
        {
          label: 'Okta FedRAMP Status',
          labelColor: 'blue',
          text: 'Okta Workforce Identity Cloud Government Cloud is FedRAMP Moderate authorized. This qualifies WIC Government Cloud for federal AI agent deployments. Auth0 does not have FedRAMP authorization — this eliminates Auth0 as an identity infrastructure option in FedRAMP-scoped federal environments, regardless of other capabilities.',
        },
        {
          label: 'NIST 800-53 AC-2 Requirement',
          labelColor: 'rose',
          text: 'AC-2 (Account Management) requires all accounts — including non-human identities — to be inventoried with assigned human owners, subject to periodic access reviews, and deprovisioned when no longer needed. An AI agent with no inventory record, no assigned owner, and no deprovisioning process is an AC-2 finding on its own.',
        },
        {
          label: 'Okta Capability',
          labelColor: 'blue',
          text: 'Workload Principals in Universal Directory satisfy AC-2\'s inventory requirement. OIG access certification campaigns extend to agent identities — each agent is reviewed on a defined cycle and deprovisioned when access is no longer warranted. The assigned owner field on each Workload Principal provides the accountability record AC-2 requires.',
        },
        {
          label: 'NIST 800-53 IA-3 Requirement',
          labelColor: 'rose',
          text: 'IA-3 (Device Identification and Authentication) requires that devices and systems be uniquely identified and authenticated before establishing connections. AI agents sharing credentials with other systems or human operators cannot be uniquely identified at the authentication layer — a direct IA-3 failure.',
        },
        {
          label: 'Okta Capability',
          labelColor: 'blue',
          text: 'Each Workload Principal receives a unique RSA key pair credential stored in Okta. The agent authenticates as itself using this unique credential — not as a shared pool or service account. Every connection is attributable to the specific registered agent identity, satisfying IA-3\'s unique identification and authentication requirement at the infrastructure layer.',
        },
      ],
    },
    {
      heading: 'SaaS Multi-Tenant and Data Privacy',
      paragraphs: [
        '!! Multi-tenant SaaS applications face an agent isolation requirement that is structurally different from single-tenant deployments. When the same agent infrastructure serves multiple tenants, each request must be scoped so that the agent can only access data belonging to the tenant whose request it is currently processing. This isolation must be cryptographically enforced through the token and authorization layer — it cannot be enforced solely by application logic, because application logic errors, prompt injection attacks, or agent state confusion can cross tenant boundaries if the credential itself is not tenant-scoped. A single service account with access to all tenant data is a multi-tenant isolation failure regardless of how careful the application code is.',
        'Auth0 Fine Grained Authorization with multi-tenancy implements tenant-scoped authorization through relationship tuples that encode which identities have which permissions on which resources within which tenant context. When an agent queries FGA with the current tenant context, it receives authorization decisions that are bounded to that tenant\'s data. A misrouted request or a prompt injection attempt to access another tenant\'s records fails at the authorization layer rather than at the application layer. The cryptographic binding of the token to a tenant context means that even a compromised or confused agent cannot escape the authorization boundary established at token issuance.',
        'SOC 2 Type II Confidentiality trust service criteria require that information designated as confidential be protected as committed. For multi-tenant SaaS, each tenant\'s data is confidential relative to other tenants. An AI agent serving multiple tenants via a single shared service account fails the Confidentiality criteria because there is no technical control preventing cross-tenant data access — the credential boundary does not align with the confidentiality boundary. SOC 2 auditors examining agentic systems will test whether tenant data isolation is enforced at the identity and authorization layer, not just the application layer. GDPR adds a further obligation: data subjects have the right to access records of processing activities, including AI-mediated access to their personal data. An agent that accesses personal data through a shared credential cannot produce per-subject access records.',
        'PCI DSS requires that access to cardholder data be attributable to individual user accounts, with no shared credentials permitted in cardholder data environments. An AI agent performing payment operations — fraud detection, transaction processing, chargeback review — using shared service account credentials fails PCI DSS section 8 requirements on unique IDs and section 10 requirements on audit trail attribution. CCPA grants California consumers the right to know what categories of third parties and automated systems have accessed their personal information. An organization that cannot attribute AI agent access to specific identifiable system actors cannot satisfy CCPA right-to-know requests for AI-mediated data access. CCPA and GDPR together create a de facto requirement that any AI system touching consumer personal data have an attributable, auditable identity — which is the same technical requirement as HIPAA, SOX, and FedRAMP, applied to the consumer privacy context.',
      ],
      mermaidDiagrams: [
        {
          title: 'Multi-Tenant Isolation: Shared Credential vs Per-Tenant Scoped Token',
          code: `graph LR
    subgraph Before["BEFORE: Shared Credential"]
        AG1["🤖 Agent<br/>shared-svc-account"]
        TD["ALL Tenant Data<br/>Tenant A + B + C<br/>no boundary"]
        TA1["Tenant A Data"]
        TB1["Tenant B Data"]
        TC1["Tenant C Data"]
        LEAK["💥 Cross-tenant leak<br/>possible on any request"]
        AG1 --> TD
        TD --> TA1
        TD --> TB1
        TD --> TC1
        TD -.-> LEAK
    end

    subgraph After["AFTER: Per-Tenant Scoped Token"]
        AG2["🤖 Agent"]
        FGA["🔐 Auth0 FGA<br/>Tenant context enforced<br/>at token issuance"]
        TA2["Tenant A Data<br/>isolated"]
        TB2["Tenant B Data<br/>isolated"]
        TC2["Tenant C Data<br/>isolated"]
        BOUND["✅ Containment boundary<br/>cryptographically enforced"]
        AG2 -->|"presents tenant context"| FGA
        FGA -->|"token scoped to Tenant A only"| TA2
        FGA -.->|"access DENIED"| TB2
        FGA -.->|"access DENIED"| TC2
        FGA --> BOUND
    end

    style Before fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px
    style After fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style LEAK fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style BOUND fill:#e6f0eb,stroke:#7ab894,stroke-width:2px,stroke-dasharray:5 5
    style TD fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px
    style FGA fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px`,
          caption: 'The containment boundary must be cryptographic — enforced at the token layer — not just application logic.',
        },
      ],
    },
  ],
};
