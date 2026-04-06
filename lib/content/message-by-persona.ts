import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'message-by-persona',
  title: 'Message by Persona',
  description:
    'How to open, frame, and close the O4AA conversation for each buyer persona — CISO, CIO/CTO, Developer, Board/Executive. Different audiences need different anchors, different frameworks, and different proof points.',
  tags: ['messaging', 'persona', 'CISO', 'CIO', 'CTO', 'developer', 'executive', 'talk-track'],
  icon: '🎯',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'The Three Questions That Qualify Every Conversation',
      paragraphs: [
        'Regardless of persona, these three questions diagnose the AI agent governance gap. They map directly to the capabilities where Okta has confirmed competitive advantage (ISPM, OIG certification, Universal Logout/ITP). No single competitor can answer all three from a single platform today.',
        '?? "When an AI agent connects to a system today, how do you know which agent it is, on whose behalf it\'s acting, and what it\'s authorized to do?"',
        '?? "Which agents in your environment have been through an access review in the last 90 days?"',
        '?? "If an agent was compromised at 2am, how quickly could you revoke its access — and how would you know it was compromised?"',
        'If the customer can answer all three confidently, they have a mature governance program and the conversation shifts to consolidation and cost. If they can\'t — which is the majority — you\'ve surfaced the gap that O4AA fills.',
      ],
      mermaidDiagrams: [
        {
          title: 'Persona-Based Opening: Lead with the Right Framework',
          code: `graph TB
    Entry["Who is in the room?"]

    Entry --> CISO["🛡️ CISO"]
    Entry --> CIO["📊 CIO / CTO"]
    Entry --> Dev["💻 Developer"]
    Entry --> Board["🏛️ Board / Executive"]

    CISO --> C1["Lead with OWASP ASI03<br/>+ risk frameworks"]
    C1 --> C2["Frame: identity &amp; privilege abuse<br/>is a top-3 agentic risk"]

    CIO --> G1["Lead with Gartner<br/>+ business enablement"]
    G1 --> G2["Frame: governance unblocks<br/>AI investment, not slows it"]

    Dev --> D1["Lead with protocols<br/>+ code patterns"]
    D1 --> D2["Frame: static API keys bypass<br/>zero trust — here\\'s the fix"]

    Board --> B1["Lead with consequences<br/>+ regulation deadlines"]
    B1 --> B2["Frame: EU AI Act Aug 2026,<br/>breach cost, personal liability"]

    style CISO fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style CIO fill:#e8f0f5,stroke:#80a8b8,stroke-width:2px
    style Dev fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style Board fill:#f0ede6,stroke:#c4b99a,stroke-width:2px`,
          caption: 'Qualification starts by identifying who is in the room. Each persona has a distinct credibility anchor — use the wrong one and you lose the conversation.',
        },
      ],
    },
    {
      heading: 'CISO — Lead with OWASP and Risk',
      paragraphs: [
        '!! CISOs respond to vendor-neutral risk frameworks and specific threat identifiers, not product names. They trust OWASP and distrust marketing language. The credibility anchor for every CISO conversation is OWASP ASI03.',
        '>> Opening frame: "OWASP published a Top 10 specifically for agentic applications in December 2025. ASI03 — Identity and Privilege Abuse — is a top-3 risk. That\'s a static API key in a config file giving an agent scope it shouldn\'t have. 53% of MCP servers in the wild use static API keys (Astrix Security, October 2025). When your auditors ask what framework you\'re using for AI agent security, OWASP Top 10 for Agentic Applications is the answer."',
        '>> Core fear: Authorized but unintended agent behavior. Gartner predicts 80% of unauthorized AI agent transactions will be caused by internal policy violations, not external attacks (Market Guide for Guardian Agents, February 2026). This means perimeter-style defenses are insufficient — governance and behavioral controls are the correct response.',
        '>> Resolution: Lifecycle governance (ISPM discovery + OIG certification) + behavioral detection (ITP) + revocation (Universal Logout for AI Agents). The full kill chain from shadow agent detection to sub-second session termination.',
        '>> What does NOT resonate: Developer experience language, SDK names, time-to-market framing, Auth0 product details. CISOs don\'t care how fast your developers can ship — they care whether the deployed agents are governable.',
        '?? "Can you answer \'who is this agent, what is it allowed to do, and who approved that?\' the same way you can for a human employee? If not, that\'s the gap."',
        'TT "OWASP lists identity and privilege abuse as ASI03. CoSAI — Google, Microsoft, IBM, Anthropic — published Principle 2: strict, purpose-specific entitlements. These aren\'t Okta marketing claims. They\'re vendor-neutral frameworks that validate the architectural approach Okta built. When your board asks what AI security best practice looks like, these are the citations."',
      ],
      labeledCallouts: [
        { label: 'ANCHOR', labelColor: 'blue', text: 'OWASP ASI03 (Identity and Privilege Abuse) — vendor-neutral, practitioner-oriented. The single best credibility anchor for CISO conversations.' },
        { label: 'STAT', labelColor: 'amber', text: '53% of MCP servers use static API keys (Astrix, Oct 2025). 44% of orgs use static keys for agent auth (CSA/Strata, 2025). 68% can\'t distinguish human vs agent activity (CSA/Aembit, March 2026).' },
        { label: 'FRAMEWORK', labelColor: 'emerald', text: 'CoSAI Principle 2: "strict, purpose-specific entitlements on capabilities and resource access." Neutral body (Google, Microsoft, IBM, Anthropic) validating Okta\'s approach.' },
      ],
    },
    {
      heading: 'CIO / CTO — Lead with Gartner and Business Enablement',
      paragraphs: [
        '!! CIOs think in Gartner categories and budget cycles. They respond to analyst framing and the "AI programs stalled" narrative — not threat vectors or CVE numbers. Frame identity governance as the enabler of AI adoption, not the obstacle.',
        '>> Opening frame: "AI programs stall in production when governance infrastructure isn\'t ready. Only 18% of security leaders are highly confident their IAM can manage agent identities (CSA/Strata, 2025). Identity governance isn\'t blocking AI — the absence of it is. The question isn\'t whether to invest in AI agent governance; it\'s whether your governance infrastructure will be ready before your AI programs need it."',
        '>> Core fear: AI investment not generating ROI. Board scrutiny on AI spend without production deployment. The CIO\'s nightmare is spending $10M on AI initiatives that can\'t go to production because security and compliance can\'t certify the agents.',
        '>> Resolution: Frame Okta as the identity system within Gartner\'s Guardian Agent architecture. Governance as AI enabler: once agents are discoverable, certifiable, and revocable, the security team says yes instead of no.',
        '>> Gartner anchors: Market Guide for Guardian Agents (Feb 2026) — "independent guardian agents... manage their agents across clouds and hosting environments, information repositories, and multiple identity systems." Hype Cycle for Agentic AI (April 2026) — standalone hype cycle, not a subset of generative AI. This signals a new budget category.',
        '>> What does NOT resonate: Threat vectors, CVE numbers, SOC workflows, protocol names (OAuth, RFC numbers). CIOs delegate these to their CISOs and architects.',
        '?? "What\'s preventing your AI program from moving from pilot to production? Is it model quality, or is it that the security and governance teams can\'t certify the agents are operating within policy?"',
        'TT "Gartner published a standalone Hype Cycle for Agentic AI in April 2026 — separate from the general AI hype cycle. That means the analyst community treats AI agent governance as its own market category with its own budget. Okta is the identity system that makes the Guardian Agent architecture work across your entire environment — not just Azure, not just AWS, not just one framework."',
      ],
      labeledCallouts: [
        { label: 'ANCHOR', labelColor: 'blue', text: 'Gartner Market Guide for Guardian Agents (Feb 2026): "independent guardian agents manage their agents across clouds and hosting environments, information repositories, and multiple identity systems." Okta is the identity system that makes this architecture work.' },
        { label: 'STAT', labelColor: 'amber', text: 'Only 18% of security leaders are highly confident their IAM can manage agent identities today (CSA/Strata, 2025). AI programs stall at production — not because of model quality, but because governance infrastructure isn\'t ready.' },
        { label: 'REFRAME', labelColor: 'emerald', text: 'Governance as AI enabler, not obstacle. Once agents are discoverable, certifiable, and revocable, the security team says yes instead of no. The CIO\'s path to AI ROI runs through identity governance.' },
        { label: 'BUDGET SIGNAL', labelColor: 'blue', text: 'Gartner Hype Cycle for Agentic AI (April 2026) is a standalone hype cycle — not a subset of generative AI. The analyst community treats this as its own budget category. This legitimizes a dedicated AI agent governance line item.' },
        { label: 'AVOID', labelColor: 'amber', text: 'Do NOT use: threat vectors, CVE numbers, SOC workflows, protocol names (OAuth, RFC numbers). CIOs delegate these to their CISOs and architects. Losing the CIO by going technical is a common SE mistake.' },
      ],
    },
    {
      heading: 'Developer / Architect — Lead with Protocols and Code',
      paragraphs: [
        '!! Developers respond to protocol names, code examples, and the "static API key problem" stated technically. They distrust governance language and compliance framing. Lead with OAuth 2.1, RFC 8693, MCP, and show real token structures.',
        '>> Opening frame: "Your zero trust architecture requires dynamic credentials, just-in-time access, and continuous verification. AI agents bypass all of it with static API keys in config files. 53% of MCP servers ship with static keys because OAuth 2.1 + PKCE + DCR is weeks of identity plumbing unrelated to the tool being built. Auth0 Token Vault eliminates that — one decorator per tool, automatic token refresh, per-user scoping."',
        '>> Core fear: Security blocking deployment. Shipping to production and being told to go back and add auth. The developer wants to build the agent, not the identity infrastructure.',
        '>> Resolution: Auth0 AI SDKs (LangChain, LlamaIndex, Vercel AI) with Token Vault, CIBA, and FGA as framework-native decorators. Show the withTokenVault() code pattern — it\'s ~5 lines that replace ~200 lines of OAuth boilerplate per integration.',
        '>> Protocol anchors: OAuth 2.1 (MCP mandates it), RFC 8693 Token Exchange (multi-hop delegation), DPoP RFC 9449 (key-bound tokens), XAA/ID-JAG (enterprise-managed authorization in MCP spec). Developers care about standards, not products.',
        '>> For architects specifically: The S2S & M2M Patterns section covers the three-layer model — infrastructure identity (SPIFFE/mTLS), authorization (OAuth/XAA), continuous evaluation (CAEP/DPoP). Most stacks have layer 1. Okta adds layers 2 and 3.',
        '>> What does NOT resonate: Governance language, audit trails, compliance frameworks, Gartner categories. The one exception: OWASP ASI03 resonates with security-conscious developers because OWASP is a practitioner community.',
        '?? "When your agent calls a third-party API, where does that credential live? If the answer is a config file or environment variable, you\'ve created the credential exposure pattern that shows up in every agentic breach scenario."',
        'TT "There are three layers to AI agent identity: infrastructure identity — is this really agent X? Authorization — can agent X access this resource on behalf of this user? Continuous evaluation — is the authorization still valid right now? Most enterprise stacks have layer one. Auth0 adds layers two and three with a few lines of code per tool."',
      ],
      labeledCallouts: [
        { label: 'ANCHOR', labelColor: 'blue', text: 'OAuth 2.1 (MCP mandates it), RFC 8693 Token Exchange (multi-hop delegation), DPoP RFC 9449 (key-bound tokens), XAA/ID-JAG (enterprise-managed authorization in MCP spec). Lead with protocol names — developers respond to standards, not product names.' },
        { label: 'STAT', labelColor: 'amber', text: '53% of MCP servers ship with static API keys because OAuth 2.1 + PKCE + DCR is weeks of identity plumbing unrelated to the tool being built (Astrix, Oct 2025). Static keys bypass zero trust entirely.' },
        { label: 'SDK FIX', labelColor: 'emerald', text: 'Auth0 Token Vault via AI SDK decorators: withTokenVault() is ~5 lines replacing ~200 lines of OAuth boilerplate per integration. Framework-native for LangChain, LlamaIndex, and Vercel AI.' },
        { label: 'THREE-LAYER MODEL', labelColor: 'blue', text: 'Layer 1 — infrastructure identity (SPIFFE/mTLS): most stacks have this. Layer 2 — authorization (OAuth/XAA): who can agent X access on behalf of this user? Layer 3 — continuous evaluation (CAEP/DPoP): is that authorization still valid right now? Auth0 adds layers 2 and 3.' },
        { label: 'AVOID', labelColor: 'amber', text: 'Do NOT use: governance language, audit trails, compliance frameworks, Gartner categories. Exception: OWASP ASI03 resonates with security-conscious developers. Governance framing signals you don\'t understand the developer\'s problem.' },
      ],
    },
    {
      heading: 'Board / Executive — Lead with Consequences and Regulation',
      paragraphs: [
        '!! Board members and C-suite executives respond to consequence framing — fines, breach costs, regulatory deadlines. They don\'t want technical depth. They want to know: what\'s the exposure, what\'s the timeline, and what does the investment prevent?',
        '>> Opening frame: "Forrester predicts an agentic AI deployment will cause a public breach and lead to employee dismissals in 2026. EU AI Act Article 14 takes full effect August 2, 2026 — fines up to EUR 35 million or 7% of global annual turnover for organizations that can\'t demonstrate human oversight of autonomous AI systems. The SEC CETU is actively investigating AI-enabled fraud. These aren\'t proposed regulations — they\'re active enforcement."',
        '>> Core fear: Personal liability and reputational damage. The board member\'s nightmare is reading about their company\'s AI agent breach in the Wall Street Journal, followed by a shareholder lawsuit asking why the company had no governance framework.',
        '>> Resolution: Frame O4AA as insurance against regulatory exposure. Every agent registered, owned by a named human, subject to access certification, with a kill switch. The board can tell regulators: "We can identify every AI agent, trace every action to an authorized human, and revoke access in seconds."',
        '>> Key numbers: Average breach cost $4.88M globally (IBM/Ponemon 2024). Credential-based breach detection: 292 days average. EU AI Act fines: EUR 35M or 7% of turnover. Okta customer ROI: 211% (Forrester TEI for OIG, June 2025).',
        '>> What does NOT resonate: Anything technical. No protocol names, no architecture diagrams, no product features. If you\'re explaining OAuth to a board member, you\'ve lost the conversation.',
        '?? "If a regulator asked you today to produce an audit trail of what your AI agents accessed last quarter — which agents, which data, on whose authority — could you produce that evidence? If not, what\'s the timeline to close that gap relative to the August 2026 EU AI Act deadline?"',
        'TT "Every major vendor launched an AI identity story this quarter. The board question isn\'t which vendor — it\'s whether your governance framework will be ready before the regulators test it. Okta provides the framework that satisfies Article 14 human oversight, SOX audit trails, and HIPAA attribution — because it\'s the same identity platform your workforce already runs on, extended to cover AI agents."',
      ],
      labeledCallouts: [
        { label: 'REGULATORY DEADLINE', labelColor: 'rose', text: 'EU AI Act Article 14 takes full effect August 2, 2026. Fines: up to EUR 35 million or 7% of global annual turnover for organizations that cannot demonstrate human oversight of autonomous AI systems.' },
        { label: 'BREACH EXPOSURE', labelColor: 'rose', text: 'Average breach cost: $4.88M globally (IBM/Ponemon 2024). Credential-based breach detection takes 292 days on average — nearly 10 months of undetected exposure before containment begins.' },
        { label: 'FORECAST', labelColor: 'amber', text: 'Forrester predicts an agentic AI deployment will cause a public breach and lead to employee dismissals in 2026. The SEC CETU is actively investigating AI-enabled fraud. These are active enforcement trajectories, not proposed rules.' },
        { label: 'THE BOARD ANSWER', labelColor: 'emerald', text: 'Frame O4AA as the framework that lets the board tell regulators: "We can identify every AI agent, trace every action to an authorized human, and revoke access in seconds." Every agent registered, owned by a named human, subject to access certification, with a kill switch.' },
        { label: 'ROI ANCHOR', labelColor: 'blue', text: '211% ROI with < 6-month payback (Forrester TEI for OIG, June 2025). The governance infrastructure that satisfies Article 14, SOX, and HIPAA runs on the same platform the workforce identity program already uses — no net-new vendor.' },
      ],
    },
    {
      heading: 'Messaging Anti-Patterns — What Falls Flat',
      paragraphs: [
        'Practitioner analysis from RSAC 2026 (Zenity floor report, April 2026) identified four messaging patterns that no longer move buyers. Avoid these regardless of persona.',
        '>> "We secure AI" without specificity. The standard due-diligence question is now: "Is your enforcement at the action level or the input level?" Vague AI security claims trigger skepticism, not interest.',
        '>> Fear statistics without a path forward. "48% say agentic AI is the #1 threat" no longer moves buyers who already accept the risk premise. They\'re asking: "How far behind are we, and how fast can we close the gap?" Lead with the gap assessment (ISPM scan), not the fear stat.',
        '>> "It\'s just NHI, we already do that." Multiple sources flag that sophisticated buyers distinguish static credential management from AI agent identity governance. Conflating them damages credibility. AI agents are a third identity class — not a subtype of service accounts.',
        '>> Broad capability claims without production evidence. The market has matured past GA announcements. "Which customers are using this in production today?" is now a standard qualifying question for every vendor, including Okta. Be ready with XAA early adopter names (Automation Anywhere, Boomi, Box, Glean) and the Forrester TEI for OIG.',
        '!! Forrester at RSAC 2026 flagged that many vendor "agentic AI" messages are existing IAM pitches with a new label. Anchor on shipped capabilities — Universal Directory entries for agents, ISPM discovery, OIG certification, ITP behavioral signals — rather than future positioning. Substance over narrative.',
      ],
    },
  ],
};
