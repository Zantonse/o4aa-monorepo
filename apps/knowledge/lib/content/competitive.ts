import type { SectionContent } from '../types';

const slug = 'competitive';
const title = 'Competitive Intel';
const description =
  'How Okta O4AA compares to Microsoft Entra, AWS IAM, Ping Identity, CrowdStrike (SGNL/Pangea/Seraphic), CyberArk, SailPoint, and the broader 2026 landscape shift toward agent runtime identity.';
const tags = ['competitive', 'microsoft', 'aws', 'ping', 'crowdstrike', 'SGNL', 'cyberark', 'sailpoint', 'agentic-ai'];
const icon = '🏁';
const hasDiagram = false;
const diagramPrompt = '';

import type { ContentCardData } from '../types';

const cards: ContentCardData[] = [
  {
    heading: 'Microsoft Entra Agent ID — The #1 Competitive Objection',
    image: 'diagrams/competitive-entra.png',
    paragraphs: [
      '!! Microsoft Entra Agent ID reached Preview/GA in March-April 2026 alongside the M365 E7 and Agent 365 licensing tier at $15/user/month. This is no longer a roadmap item — it is a shipping product bundled with licenses many customers already pay for. The "We already have Entra" objection now extends to AI agent governance specifically. SEs must be prepared to address it in every deal.',
      'The attack is structural, not rhetorical: "Why pay for Okta for AI Agents when agent identity governance is included in the Microsoft 365 licenses you already pay for?" This is the same cost-of-ownership argument Microsoft has used in every AM deal for the past decade, now applied to a budget line (AI agent governance) that hasn\'t been funded yet — making the incumbent cost argument stronger than usual, because there is no existing Okta line item to defend.',
      '!! Ecosystem boundary argument — the decisive counter: Entra Agent ID governs agents built on or for Microsoft platforms. It has no coverage for agents running in Salesforce Agentforce, AWS Bedrock, Google Vertex AI, LangChain, or ServiceNow. Ask the customer: "What percentage of your planned AI agent deployments will be exclusively Microsoft-sourced?" For most enterprises, the answer is below 50%. SailPoint\'s March 2026 launch added connectors for 8 AI platforms simultaneously — Microsoft was not one of them by default.',
      '!! Preview-to-GA timeline argument: As recently as April 3, 2026, Entra Agent ID was in Preview status requiring M365 Copilot Frontier program enrollment. M365 Copilot itself has approximately 3.3% enterprise penetration as of early 2026. Enterprises not enrolled in Frontier cannot access full Entra Agent ID capabilities. Verify current status at learn.microsoft.com before representing Microsoft\'s availability in competitive situations.',
      '!! Per-user licensing paradox: Microsoft\'s own licensing analysis (licensing.guide, March 2026) acknowledged: "The control plane for discovering that inventory is the very Agent 365 service now being launched." Customers must buy Agent 365 to count their agents but need to count their agents to justify the cost. Okta\'s ISPM provides agent discovery independent of agent management licensing — you can discover the problem before buying the solution.',
      '!! IGA depth argument: Entra does not have Okta OIG\'s access certification campaign depth. Customers under SOX, HIPAA, or FedRAMP with quarterly access review requirements will find Entra\'s governance workflow less mature than OIG. Access certifications for AI agent entitlements — required for compliance evidence — are not available in Entra\'s current agent governance stack.',
      'The core architectural gap for agentic workloads remains: Entra On-Behalf-Of (OBO) flow requires a user-initiated token as the starting point. Autonomous agents running on client credentials cannot generate OBO tokens that carry delegated user identity. In any agentic scenario where the human authorized an action before the agent executes it — which is most of them — Entra has no native mechanism to propagate that delegation through the chain.',
      'Device trust is under active scrutiny. In March 2026, CISA issued a warning that attackers successfully abused Microsoft Intune to wipe devices during the Stryker cyberattack. This follows the September 2025 critical Entra ID flaw that allowed Global Admin impersonation across tenants. Any prospect citing Entra as their security baseline should be walked through these incidents.',
      '?? Discovery: "Entra Agent ID governs Microsoft agents. What governs your Salesforce Agentforce, Bedrock, and LangChain agents? If those are on your roadmap, you need a governance layer that spans all of them — not just the Microsoft subset."',
      '?? Discovery: "Has your team enrolled in the M365 Copilot Frontier program? If not, Entra Agent ID may not be accessible to you yet. What\'s the timeline for your Frontier enrollment versus your AI agent deployment timeline?"',
      'TT Objection response for "We already have Entra E5/E7": "Entra governs Microsoft agents well — that\'s genuine value. The gap is the 50-70% of your agent portfolio that isn\'t Microsoft-sourced. Salesforce Agentforce, AWS Bedrock agents, homegrown LangChain builds — those need a governance layer too. Okta is the cross-platform delegation and audit layer that works alongside Entra, not instead of it. You can run both."',
      'TT Objection response for "Agent 365 is only $15/user/month": "That pricing assumes you\'re on E7 or buying Agent 365 standalone. More importantly, you need Agent 365 to even discover which agents exist — but you need to know which agents exist to justify the spend. Okta ISPM provides that discovery without requiring you to buy the governance platform first."',
    ],
    labeledCallouts: [
      { label: 'ECOSYSTEM GAP', labelColor: 'rose', text: 'Entra Agent ID governs Microsoft-platform agents only. No coverage for Salesforce Agentforce, AWS Bedrock, Google Vertex AI, LangChain, ServiceNow, or homegrown agents.' },
      { label: 'DELEGATION GAP', labelColor: 'rose', text: 'Entra OBO requires a user-initiated token. Autonomous agents on client credentials cannot generate OBO tokens with delegated user identity. No native delegation chain propagation.' },
      { label: 'LICENSING PARADOX', labelColor: 'amber', text: 'Agent 365 required to discover agents, but discovery needed to justify Agent 365 spend. Okta ISPM provides discovery independent of governance licensing.' },
      { label: 'SECURITY INCIDENTS', labelColor: 'amber', text: 'March 2026: CISA/Stryker Intune abuse. September 2025: Entra ID Global Admin impersonation flaw. Device trust baseline under active scrutiny.' },
      { label: 'OKTA COUNTER', labelColor: 'emerald', text: 'XAA propagates user identity through any agent chain via ID-JAG. Works across Azure, AWS, GCP, and any SaaS. ISPM discovers agents across all platforms without requiring a separate license per platform.' },
    ],
  },
  {
    heading: 'AWS IAM — Bedrock Agents, STS Limits, and the User Delegation Gap',
    image: 'diagrams/competitive-aws.png',
    paragraphs: [
      'AWS IAM is the correct tool for authenticating agents to AWS infrastructure. IAM Roles for Compute (EC2, Lambda, ECS, SageMaker) provision temporary credentials automatically. STS AssumeRole handles cross-account and cross-service delegation with role chaining. For agents running entirely within the AWS ecosystem operating on AWS resources, this is a well-solved problem. The conversation starts when agents leave the AWS boundary.',
      '!! The Bedrock Agents user identity gap is the decisive technical point. Bedrock Agents assign a single IAM service role per agent. Every user request — regardless of which human initiated it — executes under that same role. CloudTrail logs the service role ARN, not the individual user who triggered the action. Per-user data access control and user-level audit trails require custom engineering completely outside IAM. There is no native STS mechanism to propagate user identity through an agent chain.',
      '!! AWS IAM has no user delegation primitive. STS AssumeRole, IAM Roles Anywhere, and Outbound Identity Federation all operate at the workload level. None of them carry "this action is on behalf of user@company.com with these scopes for this session window." RFC 8693 Token Exchange — the standard mechanism for this pattern — is not a supported construct in AWS IAM.',
      'IAM complexity is a real operational cost. The JSON policy language is notoriously error-prone and AWS released IAM Policy Autopilot (an AI coding assistant) in December 2025 specifically to help developers write policies correctly. The existence of the tool is a good landmine: it signals that AWS itself acknowledges the complexity is a barrier.',
      '?? Discovery: "When a Bedrock agent takes an action on behalf of a user, what does your CloudTrail log as the principal? Can you demonstrate per-user data access enforcement — where user A\'s agent cannot read user B\'s data — without custom code outside IAM?" AWS appears as a competitor in 23% of financial services AI deals.',
      '?? Discovery: "Your Bedrock agents will eventually need to call your CRM, your ticketing system, your internal APIs. How are those credentials managed today, and what happens when a secret rotates?"',
      'TT Objection response for "We\'re AWS-native, we\'ll just use IAM": "IAM handles your agent\'s identity to AWS services perfectly — we are not replacing that. The gap is the layer above it: which user authorized this agent, what scope they granted, and the audit trail that connects every downstream action back to that human decision. IAM was never designed for that layer. O4AA is."',
      'Positioning note: In practice this is rarely a head-to-head displacement. The target architecture is Okta as the human delegation and cross-SaaS authorization layer, with AWS IAM handling AWS-scoped infrastructure access downstream — federated from Okta via IAM Identity Center.',
    ],
    labeledCallouts: [
      { label: 'Their Strength', labelColor: 'rose', text: 'AWS IAM + STS AssumeRole is the correct tool for workload-to-AWS-service auth. EC2, Lambda, ECS, SageMaker — provisioned automatically. Well-solved for pure AWS environments.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'RFC 8693 Token Exchange propagates user identity through any agent chain. XAA carries "on behalf of user@company.com" context that AWS STS was never designed to carry. Okta covers every SaaS outside the AWS boundary — the majority of enterprise tool sprawl.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'AWS Bedrock AgentCore (roadmap) and IAM Identity Center expansions are closing some gaps. Re-verify AWS delegation capabilities before each deal. Bedrock AgentCore is the one to watch for native user delegation.' },
    ],
  },
  {
    heading: 'Ping Identity — "Identity for AI" GA and the Runtime Identity Challenge',
    image: 'diagrams/competitive-ping.png',
    paragraphs: [
      'Ping Identity is the most direct new competitor in the agentic identity space as of March 2026. On March 25 they announced "Identity for AI" reaching General Availability on March 31. This is not a roadmap item — it is a shipping product and prospects in active RFPs will have seen it. You must be prepared to address it specifically.',
      'Ping\'s "Identity for AI" introduces what they call Runtime Identity: a framework that registers autonomous AI agents as users in PingOne, links them to a human owner, and enforces delegated, fine-grained access controls at every action the agent takes. The concept maps directly to O4AA\'s agent delegation model. The key differences are architecture, ecosystem, and deployment reality.',
      '!! Ping\'s Runtime Identity is built on PingOne (cloud) and PingFederate (on-prem/hybrid) — two platforms that operate differently and require separate administrative consoles. An enterprise deploying Runtime Identity in a hybrid environment is inheriting two upgrade tracks, two support contracts, and the fragmentation Ping has been managing since the ForgeRock acquisition in August 2023. Okta O4AA is a single SaaS control plane.',
      '!! Financial health is a legitimate risk signal. Thoma Bravo had to refinance Ping\'s debt in October 2025 to reduce interest payments — a move that signaled financial pressure on the PE-owned company. Prospects in regulated industries with long procurement cycles should evaluate vendor stability, not just feature parity.',
      'Ping does have genuine strengths in this space. PingFederate supports token exchange including OBO flows. PingAuthorize is an externalized authorization engine comparable in concept to Okta FGA. Their October 2025 Keyless acquisition added Zero-Knowledge Biometrics for privacy-preserving authentication. In February 2026 their Secure Containers were approved for Iron Bank, making them very strong in DoD/IL5 environments. If the deal is Federal or DoD-adjacent, treat Ping as a serious incumbent.',
      '?? Discovery: "Identity for AI sounds like it solves the same problem as O4AA. Walk me through how Runtime Identity handles a scenario where an agent needs to act on behalf of a user in your non-Ping SaaS applications — where PingFederate is not in the call path. What enforces the delegation there?"',
      '?? Discovery: "How many products from the Ping portfolio — PingOne, PingFederate, PingAccess, PingAuthorize — are involved in a full Runtime Identity deployment? Who owns the integration between them when something breaks?"',
      'TT Objection response for "Ping just launched the same thing": "Ping launched Runtime Identity for their ecosystem. The question is what happens when your AI agents operate across your entire SaaS footprint — including apps that Ping does not have pre-built integrations for. Okta O4AA sits above any IdP, including Ping, as the delegation and audit layer. You can run both."',
      'TT Objection response for "We already have PingFederate on-prem": "PingFederate is your federation engine — it is not going away today. The agentic identity question is what sits above it to govern what your AI agents are authorized to do on behalf of your users, across every system they touch. That is the layer Okta adds without requiring a rip-and-replace."',
    ],
    labeledCallouts: [
      { label: 'Their Strength', labelColor: 'rose', text: 'PingFederate supports OBO token exchange. PingAuthorize is a real externalized authorization engine. FedRAMP/Iron Bank approved (February 2026). Strong Federal and DoD-adjacent incumbent — treat as a serious competitor in those deals.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'Single SaaS control plane vs. PingOne + PingFederate fragmentation (two admin consoles, two upgrade tracks, two support contracts). Okta O4AA deploys above any IdP — including Ping — as the cross-ecosystem delegation layer. No rip-and-replace required.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'Thoma Bravo debt refinancing (October 2025) signals financial pressure. Zero named customers at GA (March 31). In Federal/DoD deals, Ping\'s Iron Bank approval is a hard requirement Okta does not yet match — escalate to deal support before competing.' },
    ],
  },
  {
    heading: 'CyberArk and SailPoint — Diverging Bets in the AI Era',
    paragraphs: [
      'CyberArk and SailPoint are both making aggressive AI identity plays but from very different positions, and both face structural limitations that create clear Okta differentiation.',
      'CyberArk closed a $25 billion acquisition by Palo Alto Networks in February 2026. Within days, PANW cut over 500 CyberArk jobs. The acquisition makes CyberArk a pillar within the PANW platformization strategy — their trajectory is now tied to PANW\'s "Precision AI" narrative, and they are no longer a neutral identity vendor. Prospects looking for an independent identity control plane above all network and cloud providers should be aware of this dependency.',
      '!! CyberArk\'s AI agent strategy is PAM-centric: vault the agent\'s credentials, attest the workload, manage privilege escalation. This is the right model for securing agents\' own secrets. It does not address the user delegation layer — which human authorized the agent, what scope, and whether that authorization is still valid at runtime. CyberArk is not investing heavily in runtime identity for autonomous agents in the sense of cross-SaaS user delegation. This is a meaningful gap when the prospect\'s AI agents need to act on behalf of end users, not just access infrastructure.',
      'CyberArk is openly pivoting toward Operational Technology (OT) for manufacturing environments and PKI/TLS certificate lifecycle management. These are greenfield markets for them. Expect CyberArk to be less aggressive in pure AI agent RFPs and more focused on manufacturing, industrial, and infrastructure accounts. In those accounts they are the right PAM layer; Okta O4AA is the user delegation layer above it.',
      'SailPoint is a different kind of competitor. They hit $1.1 billion in FY26 revenue, and in March 2026 they launched "Shadow AI Remediation" to address unsanctioned GenAI usage. They also signed a strategic collaboration with AWS to govern agentic AI workloads. On paper this sounds directly competitive. In practice SailPoint is a governance engine — they can detect and report that shadow AI exists, but they rely on an Access Management vendor to actually terminate the session or enforce the policy inline.',
      '!! SailPoint\'s stock plunged 22% to a 12-month low in March 2026 following a weak Q1 FY26 and FY27 revenue forecast. Despite the top-line revenue, the market is pricing in execution risk on their ambitious expansion into PAM, observability, and AI governance. This is live FUD for deals in progress: prospects in long procurement cycles with SailPoint are exposed to vendor risk at a critical moment.',
      '?? Discovery for CyberArk accounts: "When an autonomous AI agent takes an action in your environment, CyberArk can tell you what credentials the agent used. Can it tell you which human user authorized the agent to take that action?" CyberArk is pivoting to OT and PKI — in IT-focused accounts, they\'re complementary PAM, not a competitor on agent delegation.',
      '?? Discovery for SailPoint accounts: "SailPoint\'s Shadow AI Remediation can surface that unsanctioned AI usage is happening. When it identifies a violation, what enforcement mechanism actually terminates that active session?" SailPoint\'s stock plunged 22% in March 2026 — vendor stability is a live topic in deals where SailPoint is the incumbent IGA.',
      'TT Objection response for CyberArk: "CyberArk solves the secrets and privilege problem — that is genuine value and it belongs in the stack. Okta O4AA solves the delegation problem that sits above it: who the agent is acting for, what they are authorized to do, and the immutable audit trail from human decision to agent action."',
      'TT Objection response for SailPoint: "SailPoint governs access policy and can detect Shadow AI. Okta enforces it at the authentication event. These products are designed to work together — OIG and SailPoint solve the same governance layer, but the real-time enforcement and user delegation for AI agents happens in O4AA, at the moment of token issuance."',
    ],
    labeledCallouts: [
      { label: 'Their Strength (CyberArk)', labelColor: 'rose', text: 'Best-in-class credential vaulting and privilege escalation management. Conjur and Secrets Manager are genuine enterprise PAM. Strong in OT/manufacturing and PKI certificate lifecycle. Earliest GA (November 2025) among AI agent security vendors.' },
      { label: 'Their Strength (SailPoint)', labelColor: 'rose', text: '$1.1B FY26 revenue. 8 AI platform connectors (Salesforce Agentforce, ServiceNow, Snowflake). "Shadow AI Remediation" launched February 2026. Accenture (largest SI) in active evaluation. Deep IGA heritage for access certification.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'CyberArk cannot propagate user identity through an agent chain — it secures the agent\'s own secrets, not the delegation layer above. SailPoint detects violations but cannot enforce at the authentication event — Okta terminates the session inline. OIG + O4AA cover both governance and enforcement in one platform.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'CyberArk is now a PANW subsidiary — vendor neutrality argument is yours to use. SailPoint stock -22% in March 2026 — procurement teams at financially-exposed prospects may use this as a risk justification to delay. CyberArk zero named AI customers after four months of GA.' },
    ],
  },
  {
    heading: 'Market Landscape — The March 2026 Shift and Where Okta Stands',
    image: 'diagrams/competitive-landscape.png',
    paragraphs: [
      'March 2026 marks the point at which agentic AI identity moved from a roadmap conversation to an RFP disqualification criterion. Microsoft, Ping Identity, SailPoint, and Okta all launched dedicated AI agent security frameworks within a 30-day window. Vendors without a runtime identity story for autonomous agents are being removed from enterprise shortlists before the first demo.',
      '!! The defining question in every competitive RFP right now is: "Can your platform maintain user-level delegation through an autonomous agent chain, enforce fine-grained access per action, and produce a human-traceable audit trail — without requiring the agent to be Azure-native, AWS-native, or on-Ping?" This is the question that eliminates Microsoft (Azure-locked Managed Identities), AWS (no user delegation primitive in STS), and Ping (hybrid fragmentation) and that O4AA was designed to answer.',
      'IAM platforms are absorbing CASB capabilities. The simultaneous launch of Shadow AI discovery tools by SailPoint and Okta signals that identity platforms are taking over application discovery workloads previously owned by network security and CASB vendors. Buyers evaluating CASB renewals should be shown Okta\'s Shadow AI discovery capabilities as a consolidation play.',
      'CyberArk\'s pivot to OT and PKI is a strategic retreat from the AI agent conversation. By moving into manufacturing identity and certificate lifecycle management, they are choosing greenfield markets over competing directly against Okta and Ping in software-defined agentic security. In IT-focused accounts, this reduces CyberArk from a head-to-head competitor to a complementary PAM layer.',
      'SailPoint\'s financial turbulence creates a specific opportunity. Their 22% stock drop and weak FY27 guidance are not public knowledge for every prospect, but they are easily surfaced. In deals where SailPoint is the incumbent IGA vendor, the question of whether to expand with SailPoint\'s new AI governance modules (at a financially vulnerable company) versus consolidating on Okta Identity Governance + O4AA is a legitimate strategic framing.',
      'Microsoft\'s reputational damage from the CISA/Stryker incident is the most immediate opportunity in the field. CISA explicitly called out Intune as the attack vector used to wipe devices in a major breach. Any prospect running Intune as their device trust anchor for AI agent access policies is a live displacement conversation for Okta\'s Enhanced Disaster Recovery and phished-resistant device posture model.',
      '?? Board-level discovery question: "Which of your AI agent initiatives require an agent to act on behalf of a specific user — accessing that user\'s data, triggering actions in that user\'s name? How are you tracking authorization provenance for those actions today?" For insurance and financial services: regulators (NYDFS, SEC, FINRA) are demanding audit trails for agent actions — no gold standard published yet, which creates urgency to build the framework now.',
      '?? Architecture question: "If your AI agents need to call five different SaaS platforms — none of them AWS, none of them Azure-native — which identity layer today provides unified token issuance, scoped delegation, and a single audit log across all five?"',
      'TT Positioning statement for competitive deals: "Every major vendor launched an AI identity story this month. The difference is architecture. Microsoft secures Copilot. Ping secures their PingOne ecosystem. SailPoint governs the policy. CyberArk vaults the secrets. Okta O4AA is the delegation layer that sits above all of them — cloud-agnostic, user-traceable, enforcement-ready at token issuance, across every API your agents touch. That is not a feature. That is the missing layer in every one of those architectures."',
      '>> Okta\'s March 2026 counter-offensive: "Okta for AI Agents" blueprint published, Auth0 partnership with Yubico and IBM announced for hardware-backed human governance of AI actions, Shadow AI discovery launched in February, Enhanced Disaster Recovery (1-hour RTO, self-service failover APIs) launched in March, and enhanced O365 provisioning controls released. This is the most concentrated Okta product launch window in recent memory. Use all of it.',
    ],
    labeledCallouts: [
      { label: 'Their Strength', labelColor: 'rose', text: 'Every major vendor launched in the same 30-day window (March 2026). Microsoft has E7/Agent 365 bundling leverage. SailPoint has 8 AI platform connectors and the deepest IGA heritage. CrowdStrike has 160M unique agent instances detected — the only quantified production-scale AI detection metric in the market.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'Only vendor spanning authentication + discovery (ISPM) + IGA (OIG) + behavioral detection (ITP) with all four shipped. Cloud-agnostic: same control plane for AWS, Azure, GCP, and any SaaS. Universal Logout for AI Agents — instant enterprise-wide token revocation with no equivalent in any competitor.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'The CASB consolidation framing only lands if the prospect is evaluating CASB renewal — verify before using it. CyberArk OT pivot means they may show up less in AI-focused RFPs, but if manufacturing or PKI is in scope, they remain a strong incumbent. Verify competitor GA status before each deal — the landscape moved fast and dates matter.' },
    ],
  },
  {
    heading: 'Competitive Positioning Matrix — Carry to Every RFP',
    paragraphs: [
      '!! This matrix maps shipped capabilities as of April 2026. Print it, screenshot it, bring it to every competitive deal. No single competitor spans authentication + discovery + IGA + behavioral detection. The closest to full coverage after Okta is a hypothetical CyberArk + SailPoint stack, which still lacks authentication breadth and ecosystem neutrality.',
      '>> Authentication: Okta ✅ Full | Entra ✅ Microsoft-only | Ping ✅ Full | CyberArk 🟡 PAM-layer | SailPoint ❌ None | Palo Alto ❌ None | NHI Startups ❌ None',
      '>> Shadow AI Discovery: Okta ✅ ISPM | Entra 🟡 Agent 365 required | Ping 🟡 Agent Detection | CyberArk ❌ Limited | SailPoint 🟡 Agent BOM | Palo Alto ✅ Cross-cloud | NHI Startups ✅ Purpose-built',
      '>> IGA / Access Certification: Okta ✅ OIG (newer) | Entra 🟡 Less mature | Ping ❌ Minimal | CyberArk ❌ Minimal | SailPoint ✅ Deep heritage | Palo Alto ❌ None | NHI Startups 🟡 Context only',
      '>> Runtime Enforcement: Okta 🟡 Roadmap (Agent Gateway, XAP) | Entra 🟡 Conditional Access | Ping ✅ Agent Gateway GA | CyberArk ✅ AI Agent Gateway (PAM) | SailPoint ❌ Framework only | Palo Alto 🟡 Limited preview | NHI Startups ❌ None',
      '>> Behavioral Threat Detection: Okta ✅ ITP | Entra 🟡 Identity Protection (Microsoft agents) | Ping 🟡 Agent Detection | CyberArk 🟡 Anomaly detection | SailPoint ❌ Minimal | Palo Alto ✅ Cortex XSIAM | NHI Startups 🟡 Posture signals',
      '>> Ecosystem Breadth: Okta ✅ Multi-cloud, multi-framework | Entra ❌ Microsoft-only | Ping ✅ Multi-framework | CyberArk 🟡 Enterprise PAM breadth | SailPoint ✅ 8+ AI platform connectors | Palo Alto ✅ Multi-cloud | NHI Startups ✅ Multi-cloud',
      '>> Secrets / Credential Management: Okta 🟡 Developing (OPA) | Entra ❌ Not a PAM vendor | Ping ❌ Not a PAM vendor | CyberArk ✅ Conjur, Secrets Manager | SailPoint ❌ None | Palo Alto ❌ None | NHI Startups ❌ None',
      'Legend: ✅ Shipped, full capability | 🟡 Partial or roadmap | ❌ Not available',
      'TT "When a prospect asks \'why not just use [vendor]?\' — pull up this matrix. No vendor covers all seven columns. Okta covers five of seven with shipped product. The two gaps — runtime enforcement and secrets management — are on the roadmap and addressable with partners (CyberArk for PAM, Agent Gateway for runtime). Every other vendor has three or more gaps they can\'t close without acquiring or partnering."',
    ],
    mermaidDiagrams: [
      {
        title: 'Key Competitive Dimensions — Okta vs Entra vs Field',
        code: `graph TB
    subgraph Layer1["Layer 1: Agent Identity"]
        OA["🔐 Okta WLP<br/>Workload Principals<br/>Any cloud, any framework"]
        EA["Entra WI<br/>Workload Identity<br/>Microsoft-ecosystem only"]
        NA["No Native Layer<br/>AWS IAM / SailPoint<br/>No user delegation primitive"]
    end

    subgraph Layer2["Layer 2: Delegation Protocol"]
        OD["🔐 Okta XAA + OBO<br/>RFC 8693 Token Exchange<br/>User identity through chain"]
        ED["Entra OBO<br/>Requires user-initiated token<br/>Autonomous agents cannot use OBO"]
        ND["No Delegation<br/>Ping / CyberArk<br/>PAM-layer only, no user propagation"]
    end

    subgraph Layer3["Layer 3: Governance"]
        OG["🔐 Okta OIG<br/>Access certification campaigns<br/>SOX / HIPAA / FedRAMP depth"]
        EG["No IGA Equivalent<br/>Entra governance less mature<br/>No agent access certification"]
        NG["No Governance<br/>AWS / NHI Startups<br/>Detection only, no lifecycle"]
    end

    OA --> OD --> OG
    EA --> ED --> EG
    NA --> ND --> NG

    style Layer1 fill:#e8f0f5,stroke:#7a9ab8,stroke-width:2px
    style Layer2 fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Layer3 fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style OA fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style OD fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style OG fill:#e6f0eb,stroke:#7ab894,stroke-width:2px
    style EA fill:#f0ede6,stroke:#c4a87a,stroke-width:2px
    style ED fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style EG fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style NA fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style ND fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5
    style NG fill:#f0e6e6,stroke:#c47a7a,stroke-width:2px,stroke-dasharray:5 5`,
        caption: 'Only Okta spans all three layers with shipped product. Entra covers Layer 1 for Microsoft agents only. Others have gaps at Layer 2 or 3.',
      },
    ],
  },
  {
    heading: 'CrowdStrike — Partner, Not Competitor (But Watch the Narrative)',
    paragraphs: [
      '!! CrowdStrike spent approximately $1.4 billion acquiring identity capabilities in late 2025 and early 2026: SGNL ($740M, runtime authorization and continuous access evaluation), Pangea (~$260M, AI Detection and Response with prompt/response inspection), and Seraphic (~$420M, browser security with session protection and DLP). Combined with the NVIDIA Secure-by-Design AI Blueprint (March 18, 2026) integrating Falcon into NVIDIA OpenShift, CrowdStrike is assembling a full "identity security for AI agents" narrative. The core SE framing: CrowdStrike is a detection-and-response platform acquiring identity capabilities. Okta is the identity control plane. These are complementary, not competitive — but the narrative risk is real if CISOs conflate detection with identity.',
      '>> CrowdStrike strengths SEs must acknowledge: (1) Unified Platform Story — single Falcon console covers endpoint, cloud, and now identity, simplifying procurement for CISOs. (2) NVIDIA Ecosystem Lock-in — first-mover integration with OpenShift creates an early default for NVIDIA GPU-accelerated AI environments. (3) Real-Time Threat Telemetry — existing threat intelligence graph (billions of events/week) could add signals for agent content inspection and SGNL-powered authorization decisions. (4) Speed of Acquisitions — $1.4B across SGNL + Pangea + Seraphic demonstrates willingness to buy market position. (5) EDR Brand Trust — existing SOC and CISO mindshare from EDR means security teams may default to CrowdStrike for AI agent security without evaluating identity-specific alternatives. (6) Prompt Injection Protection — Pangea claims 99% blocking rate at sub-30ms latency (based on internal GPU-based edge benchmarks, not independently validated). (7) Browser + DLP Layer — Seraphic provides continuous in-session browser protection connecting directly with CrowdStrike\'s platform, working across Chrome, Edge, Safari, and Firefox.',
      '!! CrowdStrike weaknesses and gaps — where Okta wins: (1) Identity capabilities are acquisitions, not integrated product. SGNL was announced January 9, 2026 — customers evaluating CrowdStrike for agent identity governance are buying a roadmap, not a shipped product. (2) SGNL is not Okta Universal Directory. SGNL provides a runtime access enforcement layer that sits between identity providers (including Okta) and the SaaS/cloud resources they access. It continuously evaluates identity, device, and behavior signals to dynamically grant, deny, or revoke access — but it is an enforcement point, not an identity source of record. (3) No native agent credential vaulting or rotation. CrowdStrike does not offer native credential vaulting for agent secrets and cannot issue, vault, or rotate the ephemeral credentials that agents need. They would need to partner with a secrets manager (CyberArk, HashiCorp) to cover this. (4) No developer-facing identity primitives. CrowdStrike has no equivalent to Auth0 or Okta\'s Authentication APIs. Their approach is to overlay security on deployed agents, not to give developers the building blocks to make agents secure by construction. (5) Agent Identity Governance is detection-first, not lifecycle-first. CrowdStrike\'s identity capabilities grew out of ITDR — focused on detecting and responding to identity-based threats, not on the full lifecycle (register, provision, certify, deprovision). (6) Pangea\'s core is prompt/response semantic inspection, not identity governance — it does not address which agents exist, how to manage their lifecycle, or how to ensure credentials are verifiable.',
      'TT By persona — CISOs: "CrowdStrike secures what agents say, Okta secures who agents are plus ISA plus authentication. AI agent security has two distinct surfaces: the content layer (prompts, responses, data in motion) and the identity layer (authentication, authorization). CrowdStrike\'s AIDR is a strong fit for the content layer. Okta is the identity control plane that ensures every agent is discovered, onboarded, credentialed, scoped to least privilege, and revocable in real time. These are complementary investments."',
      'TT CIOs/CFOs: "Identity is the foundational investment. Security layers come and go, your identity platform is permanent infrastructure. CrowdStrike\'s AI security addresses the structural question of how agents are governed across your entire enterprise — an identity infrastructure investment that makes the security investment more effective. Okta builds the foundation once, and reduces the cost of switching your EDR vendor in the future if you choose to."',
      'TT Product/Engineering: "Build secure agents from Day 1 with dev tools that CrowdStrike doesn\'t offer. Auth0 enables developer-facing platform for embedding identity into agent architectures. CIBA and Okta\'s Fine-Grained Authorization for RAG ensures that agents retrieving content from enterprise data only see what they\'re authorized to see. Universal Directory registers agents as first-class entities with defined lifecycle, ownership, and credential rotation — making them auditable and governable."',
      '>> Competitive positioning framework: (1) If the customer is an existing CrowdStrike shop, lead with the partnership narrative — Okta as the identity layer that makes CrowdStrike more effective. (2) If CrowdStrike is in a competitive evaluation, reframe from "identity security" to "identity platform" — CrowdStrike detects threats, Okta provides the identity fabric. (3) CrowdStrike deployment scenario: if a customer says CrowdStrike is handling AI agent security, that is the threat detection and content inspection layer. Ask: "Who registers the agent identities? Who issues and rotates credentials? Who runs access certifications? Who provides the kill switch?" Those are identity platform functions. (4) The SGNL integration gap window: SGNL is still pre-integration. Okta has 6-12 months while CrowdStrike integrates SGNL to establish Okta for AI Agents as the preferred agent identity platform.',
      '?? "Is CrowdStrike in your environment today? What are they handling — endpoint detection, cloud security, or are they positioning for AI agent identity? If they claim identity governance for agents, ask: where do those agent identities live? Who manages the credentials? Who runs the access reviews? CrowdStrike detects. Okta governs."',
    ],
    labeledCallouts: [
      { label: 'Their Strength', labelColor: 'rose', text: '$1.4B in identity acquisitions (SGNL, Pangea, Seraphic). Unified Falcon console across endpoint, cloud, and identity — strong CISO procurement story. 160M unique AI agent instances detected across fleet — the only quantified production-scale AI detection metric in the market. NVIDIA OpenShift first-mover integration.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'SGNL explicitly lists Okta as an upstream identity provider — CrowdStrike\'s own architecture depends on Okta underneath. No developer-facing identity primitives (no Auth0 equivalent). No credential vaulting. No HITL/CIBA consent workflow. Full lifecycle (register, provision, certify, deprovision) vs. detection-first only.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'SGNL integration is pre-shipped (announced January 9, 2026). The 6-12 month integration window is the window to establish Okta as the preferred agent identity platform before CrowdStrike closes the gap. If the CISO is CrowdStrike-first, lead with partnership narrative — not displacement. The "CrowdStrike detects, Okta governs" frame is more durable than head-to-head competition.' },
    ],
  },
  {
    heading: 'CrowdStrike — Head-to-Head Capability Comparison',
    paragraphs: [
      '>> Agent Identity Management: Okta — Universal Directory treats agents as first-class Workload Principals with human ownership, across all platforms. CrowdStrike — SGNL provides runtime authorization evaluating identity signals from multiple providers but does not itself manage agent identities or lifecycle.',
      '>> Shadow AI Agent Discovery: Okta — Okta Secure Access Monitor (SAM) plus ISPM provides agentless discovery of unmanaged AI interactions across browsers and cloud platforms. CrowdStrike — Falcon ASIR uses runtime detection to identify AI agent behavior, but focuses on identifying threats rather than cataloging the full agent inventory.',
      '>> Agent Credential Management & Rotation: Okta — Native credential lifecycle with RS256 JWK key pairs, automatic rotation, Privileged Credential Management for downstream secrets. CrowdStrike — No native credential vaulting. Requires partnership with CyberArk or HashiCorp for credential management.',
      '>> Authorization & Zero Trust: Okta — FGA delivers continuous policy-based authorization. Eliminates standing privileges with just-in-time scoped tokens via XAA/ID-JAG. CrowdStrike — SGNL provides runtime authorization enforcement using Shared Signals Framework, but is an enforcement overlay rather than the authorization source.',
      '>> Human-in-the-Loop Consent: Okta — CIBA and Async Authentication enable human approval for agent actions. Purpose-built for agentic architectures where machines act on behalf of humans. CrowdStrike — No native HITL mechanism. Runtime controls can block suspicious behavior but lack the structured consent workflow.',
      '>> Developer Identity Platform: Okta — Auth0 gives a developer-facing platform for embedding identity into agent architectures. SDKs, Actions, FGA, CIBA. CrowdStrike — No developer-facing identity tooling. Pangea provides security APIs but focused on content inspection (prompt injection, data leakage), not identity.',
      '>> Agent Gateway / MCP Security: Okta — Agent Gateway serves as a centralized control plane with 7-layer proxy pipeline, 8 auth methods, and per-tool RBAC. CrowdStrike — Has published an MCP proxy that exposes Falcon security tools, but this extends Falcon\'s detection capabilities to MCP rather than governing agent-to-tool access.',
      '>> Unified Human + Agent Directory: Okta — Manages human identities for 20,000+ customers and is extending that same platform to agent identities with full lifecycle (registration, credential management, access certification, decommissioning). CrowdStrike — SGNL provides policy enforcement based on identity signals but does not manage the human directory that agent ownership maps to.',
      '>> Integration Breadth: Okta — Sits in the authentication path for every user and every agent, with 8,200+ integrations. Identity infrastructure is deeply embedded and high switching cost. CrowdStrike — Security modules are add-ons to Falcon platform. Integrations focused on detection/response ecosystem.',
      '!! Key differentiator summary: Okta is the identity control plane for the agentic enterprise that discovers, governs, and manages every AI agent as a first-class identity — from shadow agent detection and authentication to instant revocability. CrowdStrike, which extends its detection-and-response platform to inspect AI agent traffic and monitor runtime behavior, is complementary. Okta provides what CrowdStrike\'s own architecture depends on: SGNL explicitly lists Okta as an upstream identity provider to function. CrowdStrike secures what agents do. Okta secures who agents are. The market needs both — but identity is the foundation that every other layer depends on.',
    ],
    labeledCallouts: [
      { label: 'Their Strength', labelColor: 'rose', text: 'Real-time threat telemetry from billions of weekly events. SGNL runtime authorization enforcement and Shared Signals Framework integration. Pangea prompt injection blocking (99% claimed, internal benchmarks). Seraphic browser DLP across all major browsers.' },
      { label: 'Okta Advantage', labelColor: 'blue', text: 'Universal Directory: 20,000+ customers, human + agent identities in one store. Credential lifecycle: RS256 JWK rotation, Privileged Credential Management. CIBA/Async HITL: structured consent workflow CrowdStrike cannot replicate. Auth0 developer platform: SDKs, Actions, FGA — CrowdStrike has no equivalent.' },
      { label: 'Watch Out', labelColor: 'amber', text: 'The head-to-head framing is only needed when CrowdStrike is in a competitive evaluation. In the more common scenario — CrowdStrike already deployed for EDR — the partnership frame is stronger. Never volunteer this comparison unless directly asked. Use the 7-column matrix card instead for a neutral side-by-side.' },
    ],
  },
  {
    heading: 'NHI Startups & Developer-First Auth — April 2026 Update',
    paragraphs: [
      '!! The NHI startup landscape has matured significantly since early 2026. CSO Online named NHI governance one of RSAC 2026\'s top five agenda items. $340M+ in NHI investment in the past year. Machine identities outnumber humans 82:1 to 100:1. The acquisition precedent is set: CrowdStrike bought SGNL for $740M (January 2026), Palo Alto completed the CyberArk acquisition for $2.5B (February 2026). These startups are real competitors at the ISPM/NHI layer and real acquisition targets.',
      '!! Oasis Security — $195M total funding ($120M Series B, March 2026, Craft Ventures/Sequoia/Accel). 142 employees. 5x YoY ARR growth, majority Fortune 500 customers on multi-year agreements. Product: "Agentic Access Management" — unified NHI discovery, intent-based just-in-time access (no standing permissions), and single policy layer across multiple IDPs. Oasis is in the Okta Integration Network (OIN) and positions Okta as a data source for NHI discovery, not a competing layer. The honest overlap: Oasis directly competes with Okta ISPM on NHI discovery and goes significantly deeper — intent-based JIT access and multi-IDP governance that ISPM does not have. Acquisition risk: MEDIUM-HIGH (Craft-led Series B at this scale targets exit in 2-4 years; if acquired by a competitor, it flips from complementary to integrated competitive).',
      '!! Astrix Security — $85M total funding ($45M Series B, December 2024, Menlo Ventures/Anthropic Anthology Fund/Workday Ventures). Launched "AI Agent Control Plane" (ACP) in Q1 2026 — the industry\'s first Secure-by-Design agent deployment platform with discovery, security remediation, and JIT provisioning. Shadow AI agent discovery directly competes with Okta ISPM — PeerSpot data (March 2026): Astrix holds 15.3% mindshare vs Oasis 12.8% in NHI management. Customers: Workday, Boomi, Mercury, BigID, HubSpot. The Anthropic investor connection is strategically significant — it positions Astrix as infrastructure for the Claude ecosystem.',
      '!! Token Security — $27M total funding ($20M Series A, January 2025, Notable Capital). 48 employees. Named customers: HP, HiBob, Dayforce, BetterHelp, Bloomreach. RSAC 2026 Innovation Sandbox Top 10 Finalist + two Global InfoSec Awards. Differentiator: launched the first NHI MCP Server (May 2025) — security teams query their NHI inventory using natural language via Claude, Cursor, or any MCP-compatible tool. Neither Oasis nor Astrix has an equivalent MCP interface. Also has ITDR (Identity Threat Detection and Response) at the NHI layer — behavioral anomaly detection for agents at runtime.',
      'Aembit — $45M total ($25M Series A, September 2024, Acrew Capital). Critically: Okta Ventures is an investor. The positioning: "workload IAM" — secretless agent-to-service authentication via platform attestation (Kubernetes, AWS IAM, GCP WIF). Agents prove their identity cryptographically through their runtime environment, eliminating long-lived API keys. Aembit fills a gap Okta does not cover: workload-level secretless auth. This is why Okta Ventures invested — complementary, not competitive. Also co-sponsored the CSA/Aembit RSAC survey (March 2026) that produced the "68% cannot distinguish human vs AI agent activity" statistic.',
      'Stytch (acquired by Twilio, October 2025) — now operates as a Twilio subsidiary with distribution through Twilio\'s 300K+ developer customers. Launched OAuth Client ID Metadata Document (CIMD) support for MCP clients (September 2025) — one of the first identity providers to implement this emerging standard, before Auth0. "Connected Apps" product supports CIMD in production. This is a sharpened Auth0 competitor in developer-first AI agent auth deals. Not an Okta workforce competitor. The counter: Auth0 has 150K+ customers and deeper enterprise governance; Stytch wins on developer experience velocity.',
      'Descope — $88M total seed funding ($35M extension, September 2025, Notable/Lightspeed). 1,000+ organizations in production. FedRAMP High authorized (July 2025). Launched "Agentic Identity Hub 2.0" (January 2026) with agent identity management, comprehensive MCP auth (OAuth 2.1 + PKCE + DCR + CIMD), credential vault (50+ connection templates), and AI agent logging. This is the most complete agentic identity product from any CIAM vendor in Q1 2026 — Descope\'s Hub 2.0 went GA before Auth0 for AI Agents. Founders built Demisto (acquired by Palo Alto). Watch for Descope in CIAM deals where Auth0\'s developer resources feel heavy — Descope\'s no-code workflow builder is a genuine differentiator.',
      '>> Silverfort — $223.5M total ($116M Series D, January 2024, $1B+ valuation). Agentless MFA overlay for legacy systems — proxies Kerberos, NTLM, RADIUS, LDAP authentication to apply MFA without code changes. Published a joint solution brief with Okta for the "Okta for modern apps + Silverfort for legacy" architecture. Acquired Rezonate in 2024, adding cloud identity posture management. The Rezonate acquisition creates a new overlap with Okta ISPM that didn\'t exist before — watch this space. For now, the formal co-sell partnership holds.',
      'TT When you encounter these companies: "The NHI startup landscape has three tiers. Discovery and governance platforms (Oasis, Astrix, Token) compete with ISPM for the shadow AI budget but lack authentication — they need Okta underneath. Secretless workload auth (Aembit) fills a gap Okta doesn\'t cover and Okta Ventures invested for a reason. Developer CIAM platforms (Stytch/Twilio, Descope) compete with Auth0 for the developer buyer. The question in every deal: does the customer need the identity platform (Okta) or a governance overlay (startup), or both? The answer is usually both."',
      '?? "Are you evaluating any dedicated NHI platforms? If Oasis, Astrix, or Token is in the conversation, the question is who authenticates the agents they discover. That\'s Okta. If Aembit is in the conversation, ask your AE about the Okta Ventures relationship — there\'s a co-sell path. If Descope or Stytch is in the conversation, that\'s an Auth0 competitive deal at the CIAM layer — lead with enterprise governance depth and Organizations multi-tenancy."',
    ],
    accordion: [
      {
        title: 'Oasis Security — $195M, "Agentic Access Management"',
        content: [
          '$195M total ($120M Series B, March 2026, Craft Ventures/Sequoia/Accel). 142 employees. 5x YoY ARR growth, majority Fortune 500 on multi-year agreements.',
          'Product: unified NHI discovery, intent-based JIT access (no standing permissions), single policy layer across multiple IDPs. In OIN — positions Okta as a data source, not a competing layer.',
          'Honest overlap: directly competes with ISPM on NHI discovery and goes deeper — intent-based JIT access and multi-IDP governance ISPM does not have.',
          'Acquisition risk: MEDIUM-HIGH. Craft-led Series B at this scale targets exit in 2-4 years. If acquired by a competitor, flips from complementary to integrated competitive.',
        ],
      },
      {
        title: 'Astrix Security — $85M, "AI Agent Control Plane"',
        content: [
          '$85M total ($45M Series B, December 2024, Menlo Ventures/Anthropic Anthology Fund/Workday Ventures).',
          'Launched "AI Agent Control Plane" (ACP) in Q1 2026 — discovery, security remediation, JIT provisioning. PeerSpot (March 2026): 15.3% NHI management mindshare vs Oasis 12.8%.',
          'Customers: Workday, Boomi, Mercury, BigID, HubSpot. Anthropic investor connection positions Astrix as infrastructure for the Claude ecosystem.',
          'Competes directly with ISPM for shadow AI discovery budget.',
        ],
      },
      {
        title: 'Token Security — $27M, First NHI MCP Server',
        content: [
          '$27M total ($20M Series A, January 2025, Notable Capital). 48 employees. Named customers: HP, HiBob, Dayforce, BetterHelp, Bloomreach.',
          'RSAC 2026 Innovation Sandbox Top 10 Finalist + two Global InfoSec Awards.',
          'Differentiator: first NHI MCP Server (May 2025) — query NHI inventory via natural language through Claude, Cursor, or any MCP client. Neither Oasis nor Astrix has an equivalent.',
          'Also has NHI-layer ITDR — behavioral anomaly detection for agents at runtime.',
        ],
      },
      {
        title: 'Aembit — $45M, Secretless Workload Auth (Okta Ventures Portfolio)',
        content: [
          '$45M total ($25M Series A, September 2024, Acrew Capital). Okta Ventures is an investor.',
          'Positioning: "workload IAM" — secretless agent-to-service auth via platform attestation (Kubernetes, AWS IAM, GCP WIF). Agents prove identity cryptographically through runtime environment, eliminating long-lived API keys.',
          'Fills a gap Okta does not cover: workload-level secretless auth. This is why Okta Ventures invested — complementary, not competitive.',
          'Co-sponsored the CSA/Aembit RSAC survey (March 2026) producing the "68% cannot distinguish human vs AI agent activity" statistic. Ask your AE about the co-sell path.',
        ],
      },
      {
        title: 'Stytch (Twilio) — Developer-First Auth, Auth0 Competitor',
        content: [
          'Acquired by Twilio, October 2025. Operates as Twilio subsidiary with distribution through 300K+ developer customers.',
          'Launched CIMD (OAuth Client ID Metadata Document) support for MCP clients (September 2025) — before Auth0. "Connected Apps" product supports CIMD in production.',
          'Auth0 competitor in developer-first AI agent auth deals. Not an Okta workforce competitor.',
          'Counter: Auth0 has 150K+ customers, deeper enterprise governance, Organizations multi-tenancy. Stytch wins on developer experience velocity — be honest about where Auth0 feels heavier.',
        ],
      },
      {
        title: 'Descope — $88M, "Agentic Identity Hub 2.0" (FedRAMP High)',
        content: [
          '$88M total seed ($35M extension, September 2025, Notable/Lightspeed). 1,000+ organizations in production. FedRAMP High authorized (July 2025).',
          'Agentic Identity Hub 2.0 (January 2026): agent identity management, comprehensive MCP auth (OAuth 2.1 + PKCE + DCR + CIMD), credential vault (50+ templates), AI agent logging.',
          'Most complete agentic identity product from any CIAM vendor in Q1 2026 — Hub 2.0 went GA before Auth0 for AI Agents. Founders built Demisto (acquired by Palo Alto).',
          'Watch in CIAM deals where Auth0 feels heavy — Descope\'s no-code workflow builder is a genuine differentiator for non-developer buyers.',
        ],
      },
      {
        title: 'Silverfort — $223.5M, Agentless MFA Overlay (Co-Sell Partner)',
        content: [
          '$223.5M total ($116M Series D, January 2024, $1B+ valuation). Agentless MFA overlay for legacy systems — proxies Kerberos, NTLM, RADIUS, LDAP without code changes.',
          'Published joint solution brief with Okta: "Okta for modern apps + Silverfort for legacy." Formal co-sell partnership.',
          'Acquired Rezonate in 2024, adding cloud identity posture management. The Rezonate acquisition creates new overlap with Okta ISPM — watch this space.',
          'Current status: co-sell partner. Monitor Rezonate integration progress for potential competitive drift into ISPM territory.',
        ],
      },
    ],
  },
];

export const content: SectionContent = { slug, title, description, tags, icon, hasDiagram, diagramPrompt, cards };
