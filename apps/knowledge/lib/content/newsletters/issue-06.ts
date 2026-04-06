import type { NewsletterIssue } from '../../newsletter-types';

export const issue06: NewsletterIssue = {
  slug: 'newsletter-06',
  issueNumber: 6,
  title: 'Discovery That Actually Works',
  subtitle: 'The questions that open deals, the signals that qualify them, and the Gong transcript patterns from 306 AI-related calls that predict what closes',
  date: 'April 2, 2026',
  readTimeMinutes: 10,
  heroImageAlt: 'Sales engineer preparing for a discovery call with notes and research on screen',
  tags: ['discovery', 'sales', 'qualification', 'gong', 'methodology'],
  tldr: 'Great O4AA discovery starts with one question: "How many AI agents are running in your environment — and how confident are you in that number?" Analysis of 306 AI-related Gong transcripts reveals three patterns that predict closed deals: the shadow AI confession, the compliance clock, and the 5x growth projection. This issue gives you the methodology, the questions, and the qualification framework.',

  sections: [
    {
      heading: 'The One Question That Opens Every Deal',
      paragraphs: [
        'After analyzing 306 AI-related discovery calls from the last quarter, one opening question consistently outperforms every other:',
        '>> "How many AI agents are running in your environment today — and how confident are you in that number?"',
        'This question works because the honest answer is almost always "we don\'t know." That gap between assumed and actual agent count is where every O4AA deal lives. The moment a security leader admits they can\'t produce an agent inventory, the conversation shifts from "do we need this?" to "how big is the problem?"',
        '!! The question is designed to surface shadow AI — the agents deployed without IT knowledge or approval. In our Gong analysis, 83-88% of accounts had a shadow AI discovery moment during the call. The frequency was consistent across industries. Shadow AI inventory is the single most reliable pain point in O4AA discovery.',
        'TT "I\'m not going to pitch you anything yet. I just want to understand one thing: how many AI agents are operating in your environment today? Not how many you authorized — how many are actually running. Because in every conversation we have, that number is higher than anyone expected."',
      ],
    },
    {
      heading: 'The Three Signals That Predict Closed Deals',
      paragraphs: [
        'From the Gong transcript analysis, three customer signals appeared repeatedly in deals that closed. When you hear any of these on a call, you\'re in qualified territory.',
      ],
      accordion: [
        {
          title: 'Signal 1: The Shadow AI Confession',
          content: [
            'The customer admits they don\'t know how many agents are running or what they\'re accessing. Variations: "It\'s the wild west," "We\'re not blocking any agent installations," "People don\'t understand what permissions they need."',
            '>> "We went from zero AI at about mid-December to AI everywhere with mandates." — Director of Information Security, Fortune 500',
            '!! When you hear this: Pivot to ISPM. "The first step is visibility. Okta\'s ISPM can scan your environment and produce that inventory in days, not months. Want to see what it finds?"',
            'TT "Every customer we talk to says their agent count at least 5x\'d in the past year. The question is whether you find them before an auditor does — or after."',
          ],
        },
        {
          title: 'Signal 2: The Compliance Clock',
          content: [
            'The customer references an upcoming audit, a regulatory deadline, or a compliance framework that requires AI governance. SOC 2 renewals, HIPAA risk assessments, FINRA examinations, EU AI Act (August 2, 2026), or board-mandated AI risk reviews.',
            '>> "Our HITRUST renewal is in Q3 and we don\'t have an answer for AI agents yet." — CISO, Healthcare',
            '!! When you hear this: Calculate the timeline backward. If the audit is in 6 months, the governance framework needs to be in place in 3, which means the POC needs to start now. Create urgency from their own deadline.',
            'TT "When is the next time someone — an auditor, a board member, a regulator — is going to ask you how AI agents are governed? Let\'s work backward from that date."',
          ],
        },
        {
          title: 'Signal 3: The 5x Growth Projection',
          content: [
            'The customer describes rapid AI adoption with no governance keeping pace. They expect agent count to multiply 5-10x in the next 12 months and recognize the current approach won\'t scale.',
            '>> "That train is moving at mach speed — I\'m not sure there is anything in front of it at this point."',
            '!! When you hear this: Frame the cost of waiting. "Every ungoverned agent you deploy now is a retroactive governance problem later. The organizations starting now will be production-ready when their AI deployments scale. The ones that wait will be building under pressure."',
            'TT "What does your agent count look like 12 months from now? Because the governance gap compounds with every new agent. Starting now means you scale with guardrails. Starting later means you retrofit under pressure."',
          ],
        },
      ],
      image: 'newsletter-06-signals.png',
      imageAlt: 'Sales team reviewing discovery call patterns on a shared screen during a strategy session',
      imageCaption: 'Three signals from 306 Gong transcripts that predict closed O4AA deals',
    },
    {
      heading: 'The Discovery Framework: Pain → Impact → Urgency',
      paragraphs: [
        'Every O4AA discovery conversation follows a three-beat structure. Don\'t skip beats — the sequence builds the business case in the customer\'s own words.',
      ],
      timeline: [
        { label: 'Beat 1', title: 'Surface the Pain', description: 'Start with the agent inventory question. Follow with: "When an AI agent acts on behalf of an employee, does that action get logged in a way your SOC could audit? Can you tell whether it was the agent or the human?" Surface the specific gap — not the category.' },
        { label: 'Beat 2', title: 'Quantify the Impact', description: 'Move from "this is a problem" to "this is a $X problem." Use: "If an AI agent caused a data breach or compliance violation tomorrow, what would the exposure look like?" Push for numbers — breach cost, audit hours, incident response time. Customer-specific data beats industry benchmarks.' },
        { label: 'Beat 3', title: 'Create Urgency', description: 'Connect to a deadline: audit date, regulatory enforcement, board review. Or connect to velocity: "How many more agents will exist in 6 months?" The urgency must come from THEIR calendar, not ours. Okta\'s April 30 GA is a proof point, not a pressure tactic.' },
      ],
      image: 'newsletter-06-prep.png',
      imageAlt: 'SE preparing for a discovery call with research and notes on dual monitors',
      imageCaption: 'The three-beat discovery framework: Surface Pain, Quantify Impact, Create Urgency',
      labeledCallouts: [
        { label: 'ANTI-PATTERN', labelColor: 'rose', text: 'Leading with product features before establishing pain. "Let me show you XAA" before the customer has articulated why they need delegated authorization. Features without pain context is a demo that goes nowhere.' },
        { label: 'BEST PRACTICE', labelColor: 'emerald', text: 'Letting the customer articulate the problem in their own words, then reflecting it back with the Okta solution mapped. "You said agents are using shared service accounts with no audit trail — that\'s exactly the gap XAA closes."' },
      ],
    },
    {
      heading: 'Qualifying O4AA Opportunities',
      paragraphs: [
        'Not every AI conversation is an O4AA deal. Here\'s how to qualify quickly so you invest time in the right accounts.',
      ],
      tabs: [
        {
          label: 'Strong Qualify',
          content: [
            '!! Customer has agents in production (not just exploring). Security team is aware and concerned. A compliance event or audit is on the horizon. The CISO or AI Security Director is engaged or willing to engage.',
            'TT "It sounds like you have agents running in production, your security team is flagging the governance gap, and you\'ve got [audit/deadline] coming. This is exactly the use case O4AA was built for. Let me show you what the first 30 days would look like."',
          ],
        },
        {
          label: 'Developing',
          content: [
            '!! Customer is building agents but hasn\'t deployed to production yet. Security is aware but not yet pressured. No immediate compliance deadline but general awareness that governance is needed.',
            'TT "You\'re in the right window — building governance before agents hit production is dramatically easier than retrofitting after. Let\'s map your architecture to the O4AA model now so you\'re ready at deployment."',
          ],
        },
        {
          label: 'Not Ready',
          content: [
            '!! Customer is "exploring AI" with no agents built or deployed. No security awareness of agent identity as a category. No compliance pressure. The AI mandate exists but the technical implementation hasn\'t started.',
            'TT "Let me leave you with some resources on agent identity — it\'s going to become relevant as your AI deployment matures. When you start connecting agents to production systems, that\'s when we should talk."',
          ],
        },
      ],
    },
    {
      heading: 'The Questions That Go Deep',
      paragraphs: [
        'Once you\'ve qualified, these questions dig into the technical reality. Organized by the Discover/Onboard/Protect/Govern framework from Issue #4:',
      ],
      accordion: [
        {
          title: 'Discover Questions',
          content: [
            '?? "Walk me through what happens when an employee grants an AI assistant OAuth access to their Microsoft 365 or Google Workspace account — who sees that consent event, and what can revoke it?"',
            '?? "Are developers running MCP servers locally on their laptops? If so, who controls where those connections go and what data flows through them?"',
            '?? "If your CISO asked right now for a complete list of every AI agent with access to Salesforce, how long would that take to produce?"',
          ],
        },
        {
          title: 'Protect Questions',
          content: [
            '?? "Agents act on behalf of users but typically inherit full user permissions. Is there any mechanism today to give an agent a subset of what the user can do?"',
            '?? "What credentials are your agents using right now — OAuth tokens, personal access tokens, long-lived API keys, or hardcoded secrets?"',
            '?? "Do you have a kill switch today — if an agent starts doing something unexpected, can you terminate it instantly across every system it\'s connected to?"',
          ],
        },
        {
          title: 'Govern Questions',
          content: [
            '?? "When an employee leaves the company, their human identity gets deprovisioned. What happens to the AI agents they spun up and the API keys they created?"',
            '?? "Can your SOC distinguish whether it was an agent or a human who took a specific action? In the logs, do agent actions have separate attribution?"',
            '?? "When your board asks how AI risk is being managed, what\'s the answer today versus what you\'d like it to be?"',
          ],
        },
      ],
    },
    {
      heading: 'The Post-Call Checklist',
      paragraphs: [
        'After every O4AA discovery call, score these five dimensions. If you have 3+ confirmed, you have a qualified opportunity worth investing in.',
      ],
      conceptGrid: [
        { label: 'PAIN CONFIRMED', text: 'Customer articulated a specific agent identity problem in their own words — not just agreed with your framing.' },
        { label: 'STAKEHOLDER MAP', text: 'You know the CISO, CIO, or AI Security Director\'s position. At least one champion identified who feels the pain.' },
        { label: 'TECHNICAL REALITY', text: 'You know what agents they run, what platforms (Copilot, Bedrock, custom), and what credential model they use today.' },
      ],
      labeledCallouts: [
        { label: 'TIMELINE', labelColor: 'blue', text: 'A compliance event, audit, or board review creates a real deadline. Or: rapid agent growth creates scaling urgency. Either works — but something must drive the "why now."' },
        { label: 'NEXT STEP', labelColor: 'emerald', text: 'A concrete next action was agreed on the call: ISPM scan, architecture review, demo with the security team, POC scoping. If the call ended with "we\'ll circle back" — it\'s not qualified yet.' },
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'How many AI agents are running in your environment today — and how confident are you in that number? The honest answer is almost always "we don\'t know."',
    },
    {
      text: 'Every ungoverned agent you deploy now is a retroactive governance problem later. The organizations starting now will be production-ready when their AI deployments scale.',
    },
    {
      text: 'Features without pain context is a demo that goes nowhere. Let the customer articulate the problem in their own words, then map it to the solution.',
    },
  ],

  keyTakeaways: [
    {
      label: 'Opening Question',
      text: '"How many AI agents are running — and how confident are you in that number?" Surfaces shadow AI immediately. 83-88% of accounts have a confession moment.',
    },
    {
      label: 'Three Closing Signals',
      text: 'Shadow AI confession ("it\'s the wild west"), compliance clock (audit deadline approaching), 5x growth projection (agent count multiplying with no governance).',
    },
    {
      label: 'Three Beats',
      text: 'Surface the Pain → Quantify the Impact → Create Urgency. Don\'t skip beats. The sequence builds the business case in the customer\'s words.',
    },
    {
      label: 'Qualification Gate',
      text: '3 of 5: pain confirmed, stakeholder mapped, technical reality known, timeline exists, next step agreed. Below 3 = not ready for investment.',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #7: The Competitive Landscape',
    description: 'How to handle Microsoft Entra, CyberArk, SailPoint, Palo Alto Networks, and the NHI startups in O4AA deals. Honest strengths, sharp counters, and the trap-setting questions that shift the conversation.',
  },
};
