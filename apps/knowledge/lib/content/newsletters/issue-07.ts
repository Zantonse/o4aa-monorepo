import type { NewsletterIssue } from '../../newsletter-types';

export const issue07: NewsletterIssue = {
  slug: 'newsletter-07',
  issueNumber: 7,
  title: 'The Competitive Landscape',
  subtitle: 'How to handle Microsoft Entra, CyberArk, SailPoint, PANW, and the NHI startups in O4AA deals — honest strengths, sharp counters, and the questions that shift conversations',
  date: 'April 2, 2026',
  readTimeMinutes: 11,
  heroImageAlt: 'SEs reviewing competitive battle cards and deal strategy in a huddle',
  tags: ['competitive', 'entra', 'cyberark', 'sailpoint', 'panw', 'nhi'],
  tldr: 'Five competitors show up in O4AA deals. Microsoft Entra is the most common (43% of FinServ deals) but gaps on cross-platform delegation. CyberArk is PAM-first, not identity-first. SailPoint has deep IGA but no native IdP. PANW is complementary, not competitive. NHI startups validate the market but need an IdP underneath. Lead with honest acknowledgment, then pivot to the gap.',

  sections: [
    {
      heading: 'The Honest Advisor Approach',
      paragraphs: [
        'The fastest way to lose credibility in a competitive conversation is to trash-talk a competitor the customer has already invested in. The fastest way to win is to acknowledge the competitor\'s genuine strengths, then pivot to the specific gap Okta fills that the competitor doesn\'t.',
        '!! Rule: Lead with what the competitor does well. Then name the specific gap. Then show how Okta fills it. This sequence — respect, gap, solution — is what customers trust. "Entra is great for your Microsoft stack; the gap is the 40% of your agents that aren\'t Microsoft-native."',
        'The competitive landscape for AI agent identity is still forming. No vendor has a complete solution. The question is which platform gives the broadest foundation to build on — and which ones create silos you\'ll need to bridge later.',
      ],
    },
    {
      heading: 'The Five Competitors',
      paragraphs: [
        'These are the vendors that appear in O4AA deals. Each has a different angle and a different gap.',
      ],
      accordion: [
        {
          title: 'Microsoft Entra — The Bundled Incumbent',
          content: [
            'Appears in 43% of competitive FinServ deals. Entra Agent ID goes GA May 1, 2026 — one day after Okta. Native integration with Copilot Studio, Azure AI Foundry, M365. Included in E5/E7 bundle at zero incremental cost.',
            '!! THE GAP: Entra governs Microsoft agents well but not the rest. Most enterprises run multi-platform — Copilot + Bedrock + Claude + custom builds. Entra has no mechanism to propagate user delegation across non-Microsoft apps.',
            'TT "Entra is genuinely good for your Microsoft ecosystem. The question is: what governs the other 40-60% of your agent fleet that isn\'t Microsoft-native? That cross-platform layer is where Okta fits — and many customers run both."',
            '?? "How many of your AI agents run outside the Microsoft ecosystem — on AWS Bedrock, LangChain, Claude, or custom frameworks?"',
          ],
        },
        {
          title: 'CyberArk — PAM-First, Not Identity-First',
          content: [
            'Deepest session recording and credential vaulting. Conjur is mature for DevOps secrets. Being acquired by PANW for $25B. Strong in regulated industries where PAM is a compliance requirement.',
            '!! THE GAP: CyberArk vaults secrets but doesn\'t do identity lifecycle, access certification campaigns, or cross-app delegation. Agents need more than credential management — they need registration, governance, and full lifecycle.',
            'TT "CyberArk has deeper session recording than Okta Privileged Access — we acknowledge that. The question is whether you need standalone PAM or an identity fabric where PAM is one pillar alongside AM, IGA, and ITDR."',
            '?? "Beyond vaulting agent credentials, how do you certify that each agent still needs its current access level — and who runs that review?"',
          ],
        },
        {
          title: 'SailPoint — Deep IGA, Separate IdP Required',
          content: [
            '5-pillar identity security strategy. Machine Identity Security module for NHI. Deeper SAP GRC and SoD than OIG today. Strong analyst positioning in IGA-specific evaluations.',
            '!! THE GAP: SailPoint requires a separate identity store synced with your IdP. OIG is native to Universal Directory — zero sync lag between authentication and governance. SailPoint\'s MIS module is a separate silo from their IGA workflows.',
            'TT "OIG\'s advantage is native integration. The identity that authenticates is the same identity that gets certified — with zero sync lag. Ask SailPoint how long their connector sync takes and what happens to access reviews when the data is stale."',
            '?? "How many connectors do you maintain between your IdP and your IGA tool, and how often does the sync lag cause access review data to be stale?"',
          ],
        },
        {
          title: 'Palo Alto Networks — Complementary, Not Competitive',
          content: [
            'Prisma AIRS for AI runtime security. CyberArk acquisition adds PAM. Strong SOC/CISO trust. Network-level visibility into agent traffic patterns.',
            '!! THE FRAME: PANW is complementary. They detect anomalous agent behavior at runtime. Okta prevents unauthorized access before the agent runs. Both layers are needed. Position as "better together."',
            'TT "PANW Prisma AIRS is good runtime security — it\'s complementary to identity, not a replacement. Okta prevents unauthorized agent access. PANW detects anomalous behavior. We integrate — ITP threat signals flow to Prisma and vice versa."',
            '?? "Does your AI runtime security also manage the identity and credentials of the agents it monitors — or does it assume something else handles that?"',
          ],
        },
        {
          title: 'NHI Startups — Market Validation, Not Market Threat',
          content: [
            'Oasis, Astrix, Token Security, Aembit. Collectively $340M+ in VC funding. Purpose-built for NHI discovery and governance. Fast time-to-value for the specific shadow agent problem.',
            '!! THE FRAME: NHI startups are governance overlays that need an IdP underneath. They discover and monitor but don\'t issue credentials or run access reviews. Okta IS the identity foundation — Agent Gateway + OIG + ISPM provides NHI governance natively.',
            'TT "The NHI startup market validates the problem — $340M+ in funding proves enterprises need this. The question is: do you add another point tool, or extend the identity platform you already trust?"',
            '?? "If you deploy an NHI governance tool, what issues the actual credentials the governed agents use — the NHI tool or your IdP?"',
          ],
        },
      ],
      image: 'newsletter-07-hero.png',
      imageAlt: 'SEs reviewing competitive battle cards during a deal strategy huddle',
      imageCaption: 'Five competitors, five gaps — the honest advisor approach to competitive positioning',
      imageBanner: true,
    },
    {
      heading: 'The Competitive Matrix',
      paragraphs: [
        'This is the reference you pull up when a customer asks "how do you compare?" Don\'t present the whole matrix — use it to find the relevant row for their specific situation.',
      ],
      image: 'newsletter-07-landscape.png',
      imageAlt: 'Abstract visualization of five competitors as geometric shapes around a central Okta shield',
      imageCaption: 'The competitive landscape: five vendors, five different angles — Okta at the center of the identity fabric',
      conceptGrid: [
        { label: 'DELEGATION', text: 'Okta XAA propagates user identity across any agent chain via ID-JAG. Entra OBO works only within Microsoft. CyberArk and SailPoint have no delegation mechanism.' },
        { label: 'GOVERNANCE', text: 'OIG certifies agent and human identities in one campaign. SailPoint has deeper SoD but requires a separate IdP sync. NHI startups don\'t do certification.' },
        { label: 'NEUTRALITY', text: 'Okta governs agents across AWS, Azure, GCP, and any SaaS — 7,000+ OIN apps. Every competitor is locked to their own ecosystem or requires custom integration.' },
      ],
    },
    {
      heading: 'Handling "We Already Have X"',
      paragraphs: [
        'The three most common objections and the response pattern that works:',
      ],
      tabs: [
        {
          label: '"We have Entra E5"',
          content: [
            'TT "Entra E5 is the right answer for your Azure workloads and Microsoft agents. The gap is the cross-cloud, cross-SaaS delegation layer — who the agent is acting for, across every API it touches, with a single audit trail. That\'s not a problem Entra was designed to solve."',
            '!! Follow-up: "How many of your AI agents call non-Microsoft SaaS — Salesforce, ServiceNow, Workday? Where Managed Identities have no reach?"',
          ],
        },
        {
          label: '"We have CyberArk"',
          content: [
            'TT "CyberArk handles credential vaulting and rotation — and it\'s the right tool for that job. The gap is the identity layer above it: who created this agent, what user authorized it, is it still needed, and can we review its access alongside our human identities? That\'s OIG + Universal Directory."',
            '!! Follow-up: "When you run access certification, are AI agent credentials included in that review alongside human identities?"',
          ],
        },
        {
          label: '"We\'re evaluating NHI tools"',
          content: [
            'TT "The NHI tools solve real discovery problems. For some customers, Okta + an NHI overlay makes sense. The strategic question is: does NHI governance live in its own silo, or is it part of your identity fabric? We think it should be unified."',
            '!! Follow-up: "Would you prefer one access review campaign that covers humans, agents, and service accounts — or separate tools for each?"',
          ],
        },
      ],
    },
    {
      heading: 'Trap-Setting Questions',
      paragraphs: [
        'These questions expose specific competitor gaps without directly attacking the competitor. They work because they surface a real customer need that the competitor can\'t fulfill.',
      ],
      labeledCallouts: [
        { label: 'VS ENTRA', labelColor: 'blue', text: '"When you acquired that company last year, did their agents also run on Microsoft — or did you inherit a different stack?" Exposes the multi-platform reality Entra can\'t govern.' },
        { label: 'VS CYBERARK', labelColor: 'rose', text: '"When you onboard a new AI agent, does it go through the same identity lifecycle as a human — registration, scoped access, periodic review, deprovisioning?" CyberArk vaults credentials but doesn\'t do lifecycle.' },
        { label: 'VS SAILPOINT', labelColor: 'amber', text: '"When you run an access certification campaign, does the certifier see the same identity data the authentication system uses, or a synced copy that might be hours behind?" Exposes the connector tax.' },
        { label: 'VS NHI STARTUPS', labelColor: 'emerald', text: '"If you deploy an NHI governance tool, what issues the actual credentials that the governed agents use?" NHI tools discover and monitor — they need an IdP underneath to issue credentials.' },
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'The fastest way to lose credibility is to trash-talk a competitor the customer has already invested in. The fastest way to win is to acknowledge the strength, name the gap, and show the solution.',
    },
    {
      text: 'Entra governs Microsoft agents well. The question is what governs the other 40-60% of your agent fleet that isn\'t Microsoft-native.',
    },
    {
      text: 'The NHI startup market validates the problem — $340M+ in funding. The question is whether you solve it with another point tool or with your identity platform.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Approach',
      text: 'Respect → Gap → Solution. Acknowledge what the competitor does well, name the specific gap, show how Okta fills it. This sequence is what customers trust.',
    },
    {
      label: 'Entra',
      text: 'Strong for Microsoft ecosystem. Gap: cross-platform delegation. Counter: "What governs the non-Microsoft 40-60%?" Okta + Entra coexist in many accounts.',
    },
    {
      label: 'CyberArk + SailPoint',
      text: 'CyberArk = PAM-first (no lifecycle). SailPoint = deep IGA (separate IdP sync). Okta = native identity fabric where AM, IGA, and PAM are unified.',
    },
    {
      label: 'PANW + NHI Startups',
      text: 'PANW is complementary (runtime + identity). NHI startups validate the market but need an IdP underneath. Position as "better together" or "extend your platform."',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #8: Putting It All Together',
    description: 'Your first O4AA deal end-to-end — from account research to discovery to demo to POC to close. The playbook that ties all seven previous issues into a single execution framework.',
  },
};
