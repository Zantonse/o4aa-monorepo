import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'customer-evidence',
  title: 'Customer Evidence',
  description:
    'Named references, partner quotes, competitor proof points, and the honest state of customer evidence for AI agent identity products across the market — updated April 2026.',
  tags: ['customers', 'proof-points', 'references', 'competitive', 'evidence'],
  icon: '📋',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'The Bottom Line: The Gap Is Market-Wide',
      paragraphs: [
        '!! No vendor — not Okta, not Ping, not Microsoft, not SailPoint, not CyberArk — can cite a named customer in production on their AI agent identity product as of April 5, 2026. This is the single most important piece of intelligence in this section. When a competitor claims customer deployments in an RFP, ask for the name and the metric. Based on all public evidence, none of them have one.',
        'The correct positioning is not "we have more customers" — it is "this is a new category and no vendor has production proof points yet, which is why buying based on platform maturity, ecosystem depth, and governance track record matters more than AI agent case studies that don\'t exist anywhere."',
        'CyberArk has the longest runway (GA November 2025) and four months later has zero named customers. SailPoint\'s Accenture quote explicitly says "evaluating." Ping went GA March 31 with zero customer names. Microsoft Agent 365 isn\'t even GA until May 1. O4AA EA launched March 16 — three weeks ago.',
      ],
      labeledCallouts: [
        { label: 'KEY FACT', labelColor: 'rose', text: 'Zero vendors have named production customers for AI agent identity products as of April 2026. The proof point gap is market-wide, not Okta-specific.' },
        { label: 'RFP TACTIC', labelColor: 'emerald', text: 'When a competitor claims customer deployments, ask for the name and specific metric. Based on all public evidence, none can provide one. Shift the evaluation to platform maturity and governance track record.' },
      ],
    },
    {
      heading: 'Okta End Customer References',
      paragraphs: [
        '>> Equals Money (Financial Technology, UK) — STRONGEST NAMED REFERENCE. James Simcox, COO/CPO, quoted in Okta press release (February 12, 2026) and companion editorial: "When an employee brings their own AI agents into the workplace, it creates a dangerous blind spot where unmanaged tools connect to enterprise data and systems without oversight." Equals Money is an EA participant for Agent Discovery (ISPM-based shadow AI discovery). Simcox described proactively pushing ChatGPT to staff and using ISPM to discover agents with excessive permissions. Dual-publication quote on okta.com. [VERIFIED — okta.com press release + editorial, February 2026]',
        '>> Paysafe (Global Payment Platform) — Amar Akshat, SVP Technology and Chief Architect, quoted in the same February 2026 editorial on AI governance philosophy. The quote addresses shadow AI broadly, not O4AA specifically. Likely from a customer advisory board conversation. [MEDIUM confidence — editorial context only]',
        '>> Unnamed Financial Services Platform (Auth0) — Todd McKinnon, Q4 FY2026 earnings call (March 4, 2026): existing Auth0 customer building AI agents for financial advisers. Chose Auth0 for AI Agents for "enterprise-grade identity for humans and agents while providing secure access to third-party MCP servers, all while acting as a single source of truth." Features: Token Vault, MCP integration, least-privilege. [VERIFIED — public earnings call transcript]',
        '>> Unnamed Global Business/Technology Services Provider (Okta WIC) — Q4 FY2026 earnings call: chose Okta for AI Agents to "discover, control, and govern identities for their AI agent sprawl across multiple agent platforms." [VERIFIED — earnings transcript]',
        '>> Zillow — SVP of Engineering Toby Roberts spoke at Oktane 2025 alongside Auth0 CPO at the GA announcement. Quote addresses Auth0 identity broadly for real estate transactions, not Auth0 for AI Agents by name. [MEDIUM — implied, not confirmed]',
      ],
      labeledCallouts: [
        { label: 'Equals Money — VERIFIED', labelColor: 'emerald', text: 'Strongest named reference. James Simcox (COO/CPO), February 12, 2026. EA participant for Agent Discovery (ISPM). Proactively pushed ChatGPT to staff, used ISPM to find agents with excessive permissions. Dual-published on okta.com (press release + editorial). Named executive, named product, named use case.' },
        { label: 'Paysafe — MEDIUM', labelColor: 'blue', text: 'Amar Akshat (SVP Technology), same February 2026 editorial. Quote is about shadow AI governance philosophy — not O4AA specifically. Useful for framing the business concern; do not position as an O4AA deployment reference.' },
        { label: 'Unnamed FinServ (Auth0) — VERIFIED', labelColor: 'blue', text: 'McKinnon Q4 earnings call, March 4, 2026. Building AI agents for financial advisers. Chose Auth0 for AI Agents: Token Vault, MCP integration, least-privilege. "Enterprise-grade identity for humans and agents... single source of truth." Verified via public earnings transcript. No company name — do not speculate on identity.' },
        { label: 'Unnamed Global BizTech (WIC) — VERIFIED', labelColor: 'blue', text: 'McKinnon Q4 earnings call. Chose Okta for AI Agents to "discover, control, and govern identities for their AI agent sprawl across multiple agent platforms." Multi-platform agent governance use case. Verified via public earnings transcript.' },
        { label: 'Zillow — MEDIUM (implied)', labelColor: 'amber', text: 'Toby Roberts (SVP Engineering) at Oktane 2025 GA announcement. Quote covers Auth0 identity for real estate transactions broadly — not Auth0 for AI Agents by name. Do not present as an AI Agents reference. Useful only for Auth0 platform credibility in real estate/CIAM deals.' },
      ],
    },
    {
      heading: 'Integration Partner References',
      paragraphs: [
        'These are technology ecosystem partners, not enterprises using O4AA to govern their own agents. Their customers inherit O4AA governance when deploying these platforms.',
        '>> Boomi — Carl Siva, CISO (Showcase March 16, 2026): "Together, Boomi\'s Agentstudio and Agent Control Tower with Okta for AI Agents enable teams to build and deploy agents faster — without compromising governed security controls." Boomi is in OIN with named product integration. Two dated quotes from named executives (Oktane 2025 + Showcase 2026). Strongest partner reference. [VERIFIED — Okta press releases]',
        '>> DataRobot — Venky Veeraraghavan, CPO (Showcase March 16, 2026): "If an AI agent has the power to act, it must have an identity. DataRobot has always been built for the enterprise that can\'t afford to get AI wrong." OIN-integrated Agent Workforce Platform. [VERIFIED — Okta press release]',
        '>> Automation Anywhere — Adi Kuruganti, CPO (Oktane September 2025): "Cross App Access provides a critical new standard for building the trust required to securely scale these powerful capabilities across the enterprise." Strategic endorsement, not deployment report. No AA-authored content about XAA found. [MEDIUM — Okta-sourced quote only]',
        '>> Glean Technologies — Sunil Agrawal, CISO (Oktane September 2025): "We\'re excited to support this emerging protocol." Also posted independently on LinkedIn. No deployment metrics or Glean-authored content found. [MEDIUM — Okta-sourced + independent LinkedIn post]',
        '>> Google Vertex AI — Named in OIN agent platform list alongside Boomi and DataRobot. No separate quote. [LOW — name-only]',
        '>> Box — Named as XAA co-supporter at Oktane 2025. Akhila Nama, Head of Enterprise Security, joined Okta at RSAC March 2026 for the shadow AI panel. No published Box quote about O4AA specifically. Box has a separate customer story for OIG/zero standing privileges. [LOW — present at events but no O4AA-specific evidence]',
        '>> Accenture — Co-authored a joint POV with Okta: "Securing AI agents at scale" (March 2026). Systems integrator partnership, not an end customer deployment. [LOW for deployment evidence]',
      ],
    },
    {
      heading: 'Competitor Proof Points — What They Can (and Can\'t) Cite',
      paragraphs: [
        'Know this table before every competitive RFP. It maps what each vendor can actually prove in a customer conversation.',
      ],
      tabs: [
        {
          label: 'Ping Identity',
          content: [
            'Product: Identity for AI / Runtime Identity. GA: March 31, 2026.',
            'Named customers: NONE. Zero.',
            'What they have: Partner quotes only — Deloitte (validation, not deployment), Cloudflare (security governance, not deployment). The April 7 webinar is a demo event, not a customer showcase.',
            'SE counter: "GA\'d five days before our own GA. They have no named customers. We\'re at the same starting line."',
          ],
        },
        {
          label: 'Microsoft Entra',
          content: [
            'Product: Agent ID + Agent 365. GA: May 1, 2026 (NOT YET GA).',
            'Named customers: NONE for agent identity specifically. Copilot Studio users are implicit Entra Agent ID users by default, but Microsoft hasn\'t surfaced a single named case study.',
            'What they have: Scale of the Copilot installed base (350M+ M365 seats). Survey stat: "97% experienced identity incidents, 70% AI-related" (Microsoft\'s own survey).',
            'SE counter: "Not yet GA. Implicit via Copilot isn\'t a proof point — it\'s a bundling claim. Ask them for a company that chose Entra Agent ID and can describe the deployment."',
          ],
        },
        {
          label: 'SailPoint',
          content: [
            'Product: Agent Identity Security. Launched: February 4, 2026.',
            'Named customers: Accenture ("evaluating"), State Farm (adjacent quote, not agent-specific). STRONGEST competitor social proof — but "evaluating" is not "deploying."',
            'What they have: 8 AI platform connectors (Salesforce Agentforce, ServiceNow, Snowflake, etc.). IDC analyst endorsement.',
            'SE counter: "Accenture said evaluating, not deploying. If SailPoint\'s own major reference is in evaluation, the prospect faces the same unproven territory."',
          ],
        },
        {
          label: 'CyberArk',
          content: [
            'Product: Secure AI Agents. GA: November 4, 2025 — EARLIEST GA.',
            'Named customers: NONE after four months of GA. Zero in the GA press release, zero in Q4 2025 earnings.',
            'What they have: Strong overall business ($1.29B recurring revenue, +39% YoY). CEO frames AI agent identity as growth driver narratively but provides no metrics.',
            'SE counter: "Earliest GA in the market, but four months later, zero named customers. If CyberArk can\'t produce a proof point after four months of GA, the honest answer is nobody has production customers yet."',
            'Note: Palo Alto Networks acquisition pending. Product continuity uncertain.',
          ],
        },
        {
          label: 'CrowdStrike',
          content: [
            'Product: Falcon AI agent detection (not identity governance).',
            'Named customers: Two unnamed Fortune 50 incidents disclosed at RSAC (CEO\'s agent rewrote security policy; 100-agent Slack swarm made unauthorized code commit). These are incident references, not deployments.',
            'What they have: 1,800+ AI apps detected, 160M unique instances across customer fleet. This is the only quantified production-scale AI agent detection metric from any vendor. But it describes EDR visibility, not identity governance.',
            'SE position: CrowdStrike is complementary (detection), not competitive (identity). The 160M number is impressive but answers "what do you see?" not "what do you govern?"',
          ],
        },
      ],
    },
    {
      heading: 'Earnings Call Signals — Pipeline Without Names',
      paragraphs: [
        'The Q4 FY2026 earnings call (March 4, 2026) is the most substantive forward-looking commentary on O4AA. Key signals for SE use:',
        '>> New products (including O4AA, OIG, OPA, ISPM, ITP, Auth0 for AI Agents) represented ~30% of Q4 bookings with ~40% average contract uplift when included in a deal. These figures are aggregate — not O4AA-specific. [VERIFIED — earnings transcript]',
        '>> McKinnon: "It\'s off to a huge start." But: O4AA was in EA only during Q4, contributing "very little revenue at the moment." The framing is FY28-29 upside, not FY27 revenue.',
        '>> Pre-GA: "We have a waitlist of over 200 plus Fortune 100 and startups" for Auth for GenAI (the pre-GA name). None of these waitlist names have been published.',
        '>> Pricing mechanics: Two models confirmed — (1) multiplier on a human identity using multiple agents, (2) connection-based pricing when agent is not coupled to a person. No dollar figures disclosed.',
        '>> McKinnon on trust barrier: Early adopters are "reticent to trust a startup with this critical piece of foundation because they know there\'s gonna be M&A, and they\'re gonna be startups going away." Use this directly in deals where NHI startups are in the conversation.',
        '>> Analyst consensus (Jefferies, JPM, Wolfe, KeyBank, BTIG): Uniformly interested in the agentic opportunity but treating it as a long-term bet. No analyst expressed negative reaction. Street consensus: O4AA is potential upside to conservative FY27 guidance.',
      ],
      labeledCallouts: [
        { label: 'Bookings Signal', labelColor: 'blue', text: '~30% of Q4 bookings included new products (O4AA, OIG, OPA, ISPM, ITP, Auth0 for AI Agents). ~40% average contract uplift when new products included in a deal. AGGREGATE figures — not O4AA-specific. Use to show platform momentum, not O4AA standalone traction.' },
        { label: 'Revenue Reality', labelColor: 'amber', text: 'O4AA was EA-only in Q4, contributing "very little revenue at the moment." McKinnon: "It\'s off to a huge start" — but the commercial framing is FY28-29 upside. Do not use earnings commentary to imply O4AA is generating significant revenue today.' },
        { label: 'Waitlist Signal', labelColor: 'emerald', text: '200+ waitlist entries (Fortune 100 and startups) for Auth for GenAI (pre-GA name). Zero names published. Use as a demand signal, not a reference signal. "We have 200+ organizations waiting to deploy" is accurate. "200 customers are using it" is not.' },
        { label: 'Trust Barrier Quote', labelColor: 'emerald', text: 'McKinnon on why enterprises choose Okta over NHI startups: "reticent to trust a startup with this critical piece of foundation because they know there\'s gonna be M&A, and they\'re gonna be startups going away." Use verbatim in competitive deals where Oasis, Astrix, or Token is in the conversation.' },
        { label: 'Analyst View', labelColor: 'blue', text: 'Jefferies, JPM, Wolfe, KeyBank, BTIG: uniformly interested in the agentic opportunity, treating it as a long-term bet. No analyst negative reaction. Street consensus: O4AA is potential upside to conservative FY27 guidance — not yet factored into base estimates.' },
      ],
    },
    {
      heading: 'What to Say When Asked for References',
      paragraphs: [
        'This is the honest playbook for handling the "who else is using this?" question.',
        'TT "This is a new category — AI agent identity governance products are all less than six months old across the entire industry. No vendor, including us, has published production case studies with deployment metrics yet. CyberArk GA\'d in November and hasn\'t produced one. SailPoint\'s best reference says \'evaluating.\' Ping GA\'d last week with zero names. What we can show you is: the platform you already trust for workforce identity (20,000+ customers, 8,200+ integrations) now extends to AI agents with the same governance model. The track record is the platform, not the product SKU."',
        '?? "Would it help to connect with our EA participants? We have organizations in financial services and technology actively deploying Agent Discovery and XAA. I can also arrange a technical deep-dive with our product team on how the architecture works for your specific use case."',
        '!! Refresh trigger: Check for published case studies after GA (April 30, 2026). SailPoint Navigator 2026 (June) and CyberArk\'s post-PANW messaging are the two most likely competitor proof point breaks. Microsoft Agent 365 GA (May 1) will generate press comparisons with Okta\'s April 30 GA.',
      ],
    },
  ],
};
