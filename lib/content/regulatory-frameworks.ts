import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'regulatory-frameworks',
  title: 'AI Agent Security Frameworks',
  description:
    'OWASP Top 10 for Agentic Applications, NIST AI 600-1, CoSAI Secure-by-Design, EU AI Act Article 14, and Gartner/Forrester analyst framing — the credibility anchors for AI agent governance conversations with CISOs and compliance teams.',
  tags: ['OWASP', 'NIST', 'CoSAI', 'EU-AI-Act', 'Gartner', 'Forrester', 'compliance', 'frameworks'],
  icon: '📋',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'OWASP Top 10 for Agentic Applications',
      paragraphs: [
        '!! The OWASP Top 10 for Agentic Applications was published December 9, 2025. It is the first industry-standard risk taxonomy specifically for AI agent architectures. SEs should reference it in every CISO conversation — it provides vendor-neutral credibility that no marketing claim can match.',
        'The full list: ASI01 — Agentic Excessive Agency (agent acts beyond intended scope). ASI02 — Agentic Memory Poisoning (corrupted context leads to bad decisions). ASI03 — Identity and Privilege Abuse (the one most relevant to O4AA). ASI04 — Agentic Tool Misuse. ASI05 — Insecure Agent Communication. ASI06 — Agentic RAG Poisoning. ASI07 — Supply Chain Vulnerabilities. ASI08 — Agentic Monitoring Gaps. ASI09 — Human-Agent Trust Exploitation. ASI10 — Rogue Agents.',
        '>> ASI03 — Identity and Privilege Abuse is the direct anchor for every O4AA conversation. OWASP defines this as: static API keys giving agents scope they shouldn\'t have, shared credentials preventing attribution, privilege escalation through the delegation chain, and the absence of per-action authorization checks. This is the exact problem set that XAA, FGA, and Privileged Credential Management solve.',
        '>> ASI10 — Rogue Agents and ASI09 — Human-Agent Trust Exploitation both address misalignment rather than external compromise. This maps directly to the Gartner finding that 80% of unauthorized agent transactions will be caused by internal policy violations, not malicious attacks. The implication: perimeter-style defenses are structurally insufficient. Governance and behavioral controls — OIG certification campaigns, ITP behavioral detection — are the correct response.',
        'TT "OWASP now lists identity and privilege abuse as ASI03 — a top-3 agentic risk. That\'s a static API key in a config file giving an agent scope it shouldn\'t have. When your auditors ask what framework you\'re using for AI agent security, OWASP Top 10 for Agentic Applications is the answer. And ASI03 is the control that Okta for AI Agents addresses directly."',
      ],
      labeledCallouts: [
        { label: 'ASI03', labelColor: 'rose', text: 'Identity and Privilege Abuse — static API keys, shared credentials, privilege escalation through delegation chains, absence of per-action auth checks. This is the O4AA conversation anchor.' },
        { label: 'ASI10', labelColor: 'amber', text: 'Rogue Agents — agents operating outside intended parameters due to governance failures, not external attack. ITP behavioral detection + OIG certification address this directly.' },
        { label: 'ASI08', labelColor: 'amber', text: 'Agentic Monitoring Gaps — insufficient logging and observability for agent actions. Okta System Log with agent-specific events (app.oauth2.token.grant.id_jag) closes this gap.' },
      ],
    },
    {
      heading: 'NIST AI 600-1 and the AI Risk Management Framework',
      paragraphs: [
        'NIST AI 600-1 (Artificial Intelligence Risk Management Framework: Generative AI Profile) was published July 2024. It adds a generative AI and agentic systems layer on top of the existing NIST AI RMF (AI 100-1). For federal customers and regulated enterprises, this is the governance standard their compliance teams will reference.',
        '>> NIST AI 600-1 identifies "Information Security" as a primary risk category for generative AI systems, with credential management and access control listed as direct mitigations. The specific relevant risks: unauthorized data access by AI systems (mitigated by scoped credentials and FGA), credential theft from AI agent infrastructure (mitigated by Privileged Credential Management), and inability to attribute AI actions to responsible parties (mitigated by the XAA sub + client_id dual identity model).',
        '>> The NIST AI RMF structures governance around four functions — GOVERN, MAP, MEASURE, MANAGE — each with a direct Okta product mapping: GOVERN (organizational accountability → Okta NHI ownership model, every agent requires a named human owner). MAP (AI system inventory → ISPM discovery of shadow agents). MEASURE (audit and assessment → System Log agent events, ITP behavioral signals). MANAGE (incident response and revocation → Universal Logout, agent deactivation kill switch).',
        'For federal customers: NIST 800-53 controls AC-2 (account management for non-human identities) and IA-3 (unique device/system authentication) already apply to AI agents. NIST AI 600-1 adds the AI-specific risk framing on top of existing FedRAMP requirements. Okta WIC Government Cloud\'s FedRAMP Moderate authorization covers the identity infrastructure layer.',
        '?? "Which NIST framework is your team using for AI agent governance? If they\'re on 800-53, AC-2 already requires that every non-human identity — including AI agents — be inventoried, owned, and subject to periodic access review. NIST AI 600-1 adds the AI-specific risk layer. Okta satisfies both."',
      ],
      mermaidDiagrams: [
        {
          title: 'NIST AI RMF Functions — Mapped to Okta Products',
          code: `graph TB
    subgraph RMF["NIST AI RMF — Four Core Functions"]
        GOV["📋 GOVERN<br/>Organizational<br/>accountability"]
        MAP["🗺️ MAP<br/>AI system<br/>inventory"]
        MEA["📊 MEASURE<br/>Audit and<br/>assessment"]
        MAN["🔧 MANAGE<br/>Incident response<br/>and revocation"]
    end

    subgraph OKTA["Okta Products — Direct Mappings"]
        OIG["🔐 OIG<br/>NHI ownership model<br/>Every agent has a<br/>named human owner"]
        ISPM["🔍 ISPM<br/>Shadow agent discovery<br/>AI system inventory<br/>across the environment"]
        SYSLOG["📋 System Log + ITP<br/>Agent event audit trail<br/>Behavioral anomaly<br/>detection signals"]
        ULO["🔐 Agent Gateway +<br/>Universal Logout<br/>Kill switch for<br/>compromised agents"]
    end

    GOV -.->|"satisfies"| OIG
    MAP -.->|"satisfies"| ISPM
    MEA -.->|"satisfies"| SYSLOG
    MAN -.->|"satisfies"| ULO

    style RMF fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style OKTA fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style GOV fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style MAP fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style MEA fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style MAN fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style OIG fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style ISPM fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style SYSLOG fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style ULO fill:#e6f0eb,stroke:#80b89a,stroke-width:2px`,
          caption: 'Each of the four NIST AI RMF functions maps directly to a shipped Okta product. Dashed arrows represent compliance mapping — Okta implements the controls that satisfy each governance function.',
        },
      ],
    },
    {
      heading: 'CoSAI Secure-by-Design Principles',
      paragraphs: [
        'The Coalition for Secure AI (CoSAI) published its Secure-by-Design Principles in July 2025. CoSAI\'s members include Google, Microsoft, Palo Alto Networks, IBM, Intel, and Anthropic — making it the most credible neutral body for AI security principles. Okta is not a CoSAI member, but the principles directly validate Okta\'s architectural approach.',
        '>> Principle 2 is the money quote: "strict, purpose-specific entitlements on capabilities and resource access." This is the least-privilege mandate stated by a neutral body with the largest AI companies as co-sponsors. When a CISO asks "what does best practice look like for AI agent access control?", CoSAI Principle 2 is the answer — and Okta FGA\'s per-action, per-resource authorization is the implementation.',
        'CoSAI\'s September 2025 strategic update named "Define new identity and access paradigms for AI agents" as a top priority. This signals that the industry\'s most influential AI companies agree: existing IAM approaches are insufficient for agentic workloads. A new identity paradigm is needed — and that\'s what O4AA provides.',
        'TT "CoSAI — Google, Microsoft, IBM, Anthropic — published Principle 2: \'strict, purpose-specific entitlements on capabilities and resource access.\' That\'s the neutral-body version of what Okta\'s been building. When your board asks what AI security best practice looks like, CoSAI is the citation."',
      ],
      labeledCallouts: [
        { label: 'Principle 2 — Least Privilege', labelColor: 'emerald', text: '"Strict, purpose-specific entitlements on capabilities and resource access." The neutral-body version of what Okta FGA implements: per-action, per-resource authorization that eliminates standing privileges. Endorsed by Google, Microsoft, IBM, Anthropic, Palo Alto Networks.' },
        { label: 'Principle 4 — Human Oversight', labelColor: 'emerald', text: 'Meaningful human control over AI system actions, particularly for high-impact decisions. Okta\'s CIBA (Client-Initiated Backchannel Authentication) is the protocol-level implementation — agent pauses, human approves, agent proceeds. Also the technical mechanism behind EU AI Act Article 14 compliance.' },
        { label: 'September 2025 Update', labelColor: 'blue', text: 'CoSAI named "Define new identity and access paradigms for AI agents" as a top strategic priority. The most influential AI companies in the world — including Okta\'s competitors — formally declared that existing IAM is insufficient for agentic workloads. Use this to neutralize "our current IAM is good enough" objections.' },
        { label: 'Okta Not a Member', labelColor: 'amber', text: 'Okta is not a CoSAI member — do not misrepresent this. The value is that the principles independently validate Okta\'s architectural approach without any Okta involvement. That\'s stronger than a member endorsement: it\'s validation from companies that include Okta\'s direct competitors.' },
      ],
    },
    {
      heading: 'EU AI Act — Article 14 and the August 2026 Deadline',
      paragraphs: [
        '!! EU AI Act Article 14 requires mandatory human oversight for high-risk AI systems, including the ability to override and halt autonomous AI operations. Full enforcement begins August 2, 2026 — four months from now. Fines for non-compliance: up to EUR 35 million or 7% of global annual turnover, whichever is higher. This is not theoretical future regulation; it is an active compliance deadline.',
        'High-risk AI systems under the EU AI Act include those used in: credit scoring, employment decisions, essential services access, law enforcement, and critical infrastructure management. AI agents operating in any of these domains must demonstrate human oversight mechanisms that satisfy Article 14.',
        '>> CIBA (Client-Initiated Backchannel Authentication) is the technical implementation of Article 14\'s human oversight requirement. When an AI agent is about to execute a high-impact action, CIBA enables a cryptographically-bound human approval gate — the agent pauses, the responsible human receives an approval request on their device, and the agent proceeds only after explicit human consent. This is not a UI overlay; it\'s a protocol-level mechanism that regulators can audit.',
        '>> MiFID II adds further requirements for algorithmic trading systems: registration, documented risk controls, and governance. An AI agent executing trading logic must have an auditable identity that can be presented to regulators on demand. The SEC CETU (Cyber and Emerging Technologies Unit, launched February 2025) is the US equivalent — an active enforcement body specifically targeting AI-enabled fraud and cybersecurity disclosure failures.',
        'TT "Article 14 takes full effect in August 2026. If your AI agents make autonomous decisions with business impact in the EU — credit, employment, essential services — you need to demonstrate human oversight. CIBA gives you the protocol-level mechanism that satisfies the regulation. The question isn\'t whether to implement this; it\'s whether to implement it before or after the deadline."',
        '?? "Do any of your AI agent initiatives operate in EU-regulated domains? If so, are you aware of the Article 14 human oversight requirement taking effect in August? What mechanism do you have today for a human to override or halt an autonomous agent action?"',
      ],
      labeledCallouts: [
        { label: 'DEADLINE', labelColor: 'rose', text: 'EU AI Act Article 14 full enforcement: August 2, 2026. Four months away. Fines up to EUR 35M or 7% of global annual turnover.' },
        { label: 'CIBA', labelColor: 'emerald', text: 'Client-Initiated Backchannel Authentication provides the protocol-level human oversight mechanism that satisfies Article 14. Agent pauses → human approves → agent proceeds.' },
        { label: 'SEC CETU', labelColor: 'amber', text: 'US enforcement body (launched Feb 2025) specifically targeting AI-enabled fraud. Active investigations, not proposed regulation.' },
      ],
    },
    {
      heading: 'Gartner & Forrester — Analyst Category Mapping',
      paragraphs: [
        'When selling into enterprises with Gartner or Forrester subscriptions, the analyst framing determines which budget the purchase comes from and which stakeholder sponsors it. Knowing which Gartner categories O4AA maps to is as important as knowing the product features.',
        '>> Gartner\'s Market Guide for Guardian Agents (February 24, 2026) introduced the "Guardian Agent" concept — independent agents that monitor and govern other agents. The guide specifically references "multiple identity systems" as the governance problem, directly validating the cross-platform governance story. Okta maps to the identity system layer within the Guardian Agent architecture.',
        '>> Gartner\'s most important stat for SE use: "Through 2028, at least 80% of unauthorized AI agent transactions will be caused by internal violations of enterprise policies concerning information oversharing, unacceptable use, or misguided AI behavior rather than from malicious attacks." This validates governance-first over detection-first. Use it to redirect security-first buyers toward governance conversations. [Source: Market Guide for Guardian Agents, February 24, 2026 — cited via vendor blogs; paywalled original]',
        '>> Gartner published a standalone Hype Cycle for Agentic AI on April 2, 2026 — distinct from the general AI hype cycle. This signals that Gartner treats agentic AI as its own market category, not a subset of generative AI. The Market Guide for Guardian Agents (February 2026) was the first dedicated analysis of agent governance.',
        '>> Forrester expanded "workforce identity" to explicitly include AI agents as a third class alongside humans and NHIs (Workforce Identity Security Platforms Landscape, Q4 2025). Forrester\'s 2026 cybersecurity prediction: "An agentic AI deployment will cause a public breach and lead to employee dismissals." This creates urgency for governance accountability — and maps to Okta\'s mandatory human ownership model for every registered agent.',
        '!! Forrester at RSAC 2026 flagged that many vendor "agentic AI" messages are existing IAM/data security pitches with a new label. This creates credibility risk for SEs who over-rotate on AI language without demonstrating product substance. Anchor on shipped capabilities — Universal Directory entries for agents, ISPM discovery, OIG certification campaign scope, ITP behavioral signals — rather than future positioning.',
      ],
      conceptGrid: [
        { label: 'Gartner: Guardian Agents', text: 'Identity system layer within Guardian Agent architecture. Cross-platform governance across clouds and identity systems. Published February 24, 2026.' },
        { label: 'Gartner: AI TRiSM', text: 'AI Trust, Risk, and Security Management. Broader framework covering explainability, robustness, and privacy. O4AA addresses the identity and access dimension.' },
        { label: 'Gartner: Hype Cycle for Agentic AI', text: 'Standalone hype cycle published April 2, 2026. Treats agentic AI as its own market, not a subset of generative AI.' },
        { label: 'Forrester: Workforce Identity', text: 'AI agents as a third identity class alongside humans and NHIs. Q4 2025 landscape expanded to include agent identity explicitly.' },
      ],
    },
    {
      heading: 'Using Frameworks in Customer Conversations',
      paragraphs: [
        'The frameworks above serve different roles in different conversations. Match the framework to the audience:',
        '>> CISO conversations — lead with OWASP ASI03. It\'s vendor-neutral, practitioner-oriented, and names the specific risk (identity and privilege abuse) that Okta addresses. Follow with CoSAI Principle 2 for the "industry best practice" framing. CISOs trust OWASP and respond to specific risk identifiers.',
        '>> Compliance/GRC conversations — lead with NIST AI 600-1 for US enterprises, EU AI Act Article 14 for European operations, and SOX/HIPAA/PCI mapping from the Industry Compliance section. Compliance teams want regulatory citations, not product names.',
        '>> CIO/CTO conversations — lead with Gartner\'s Guardian Agents framing and the "80% internal policy violation" stat. CIOs think in Gartner categories and budget cycles. Frame Okta as the identity system within Gartner\'s Guardian Agent architecture.',
        '>> Board/executive conversations — lead with Forrester\'s prediction that an agentic AI deployment will cause a public breach. Executives respond to consequence framing. Follow with the EU AI Act fines (EUR 35M / 7% of turnover) for boards with European exposure.',
        '>> Developer conversations — frameworks are less useful here. Developers care about protocols (OAuth 2.1, RFC 8693, MCP), not compliance frameworks. Use the Auth Flows and Developer sections instead. The one exception: OWASP ASI03 resonates with security-conscious developers because OWASP is a practitioner community, not a regulatory body.',
        '?? "When your compliance team evaluates AI agent governance, which framework are they using? OWASP published a Top 10 specifically for agentic applications in December. NIST AI 600-1 adds AI-specific risk categories on top of 800-53. If neither is on their radar, that\'s a gap worth surfacing before the next audit cycle."',
      ],
    },
  ],
};
