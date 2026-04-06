import type { NewsletterIssue } from '../../newsletter-types';

export const issue03: NewsletterIssue = {
  slug: 'newsletter-03',
  issueNumber: 3,
  title: 'MCP: The Protocol That Changed Everything',
  subtitle: 'Model Context Protocol is becoming the USB-C of AI tool integration. Here\'s why it\'s insecure by default, how attackers exploit it, and what Okta does about it.',
  date: 'April 2, 2026',
  readTimeMinutes: 10,
  heroImageAlt: 'Developer at a workstation with multiple MCP server connections visualized as glowing data streams',
  tags: ['mcp', 'protocol', 'security', 'tool-calling'],
  tldr: 'MCP lets AI agents call tools through a standard protocol — think USB-C for AI. But 53% of MCP connections use static API keys, only 8.5% use OAuth, and 79.7% of MCP traffic comes from spoofed sources. A CVE with a 9.3 CVSS score demonstrated credential theft through tool poisoning. Okta\'s MCP Security solution applies OAuth 2.1, per-tool authorization, and centralized revocation to close these gaps.',

  sections: [
    {
      heading: 'What MCP Actually Is',
      paragraphs: [
        'Model Context Protocol — MCP — is a standard published by Anthropic that defines how AI agents connect to external tools. Before MCP, every agent framework had its own way of calling tools: LangChain had one pattern, AutoGen had another, Claude had function calling, GPT had tool use. MCP standardizes the interface so any agent can connect to any tool server through one protocol.',
        'The analogy that works on calls: MCP is the USB-C of AI. Before USB-C, every device had its own charging cable. USB-C standardized the physical connection. MCP standardizes the programmatic connection between agents and tools. One protocol, any agent, any tool.',
        '!! An MCP server is a lightweight process that exposes tools — functions an agent can call. A developer writes an MCP server for their internal database, their CI/CD pipeline, their CRM, their email system. The agent connects to the MCP server and discovers what tools are available. Then the agent can call those tools by name with structured arguments, and the MCP server executes the call and returns results.',
        'Here\'s the architecture that matters for identity: the agent sits in the middle. On one side, a human user gives the agent a goal. On the other side, MCP servers expose tools that access corporate systems. Every tool call is an API request from the agent, through the MCP server, to a backend system. And every one of those requests needs a credential.',
        'TT "MCP is the standard protocol that lets AI agents connect to your internal tools and data sources. Think of it as USB-C for AI — one standard connection instead of a custom integration for each agent framework. The identity question is: who controls what plugs into that port?"',
      ],
    },
    {
      heading: 'Why MCP Is Insecure By Default',
      paragraphs: [
        'Here is the uncomfortable truth that makes this conversation urgent: MCP was designed for developer ergonomics, not enterprise security. The protocol specification itself, until very recently, had no built-in authentication or authorization mechanism. Connecting an agent to an MCP server was as simple as pointing it at a URL or running a local process. No login. No token. No scope.',
        'The MCP specification added OAuth 2.1 support in early 2026, but adoption lags dramatically. The installed base of MCP servers — thousands of them on npm, GitHub, and private registries — was built without auth. Developers are installing and using these servers today, and the vast majority have no authentication layer.',
        '>> "People are chomping at the bit for MCP — we\'re like slow down, it\'s very unsecure." — Identity architect, healthcare enterprise (from Gong transcript analysis)',
        'The result is a shadow IT problem with a twist. When employees adopted unauthorized SaaS apps a decade ago, the apps had their own auth — the risk was ungoverned access through a browser. When developers adopt unauthorized MCP servers today, the servers often have no auth at all — the risk is ungoverned programmatic access to production systems with no authentication, no scoping, and no audit trail.',
        'This is not theoretical. Developers are running MCP servers on their laptops that connect AI coding assistants directly to production databases, internal APIs, and source code repositories. Each connection is an unmonitored data channel. IT doesn\'t know these channels exist. Security has no visibility. And the data flowing through them may include customer PII, financial records, proprietary code, or credentials.',
      ],
      image: 'newsletter-03-insecure.png',
      imageAlt: 'Security team gathered around a threat dashboard showing unsecured MCP connections highlighted in red',
      imageCaption: 'The shadow MCP problem: developers connecting AI tools to production systems without security\'s knowledge',
    },
    {
      heading: 'The Attack Surface: Five Vectors',
      paragraphs: [
        'MCP introduces five distinct attack vectors that your customers\' existing security tools don\'t cover. Each one is a conversation starter on a discovery call.',
        '!! Vector 1 — Static credential exposure: 53% of MCP integrations use static API keys baked into configuration files. These keys don\'t expire, don\'t have scoped permissions, and aren\'t rotated. If an MCP server config file is committed to a repo, shared on Slack, or left on a reimaged laptop, the key is compromised. GitGuardian found 28.65 million hardcoded secrets in public GitHub commits in 2024 alone.',
        '!! Vector 2 — Tool poisoning (CVE-2025-32711, CVSS 9.3): A malicious actor modifies an MCP server\'s tool descriptions to manipulate agent behavior. The agent trusts the tool description and follows its instructions — which could include exfiltrating credentials, modifying data, or escalating privileges. The agent doesn\'t verify tool descriptions against a known-good baseline. This is the MCP equivalent of a supply chain attack.',
        '!! Vector 3 — Spoofed traffic: Invariant Labs found that 79.7% of MCP traffic in their analysis came from spoofed or unverified sources. Without mutual authentication between the agent and the MCP server, there\'s no way to verify that the server your agent is connecting to is the server you think it is. A man-in-the-middle could intercept tool calls and return manipulated results.',
        '!! Vector 4 — Lateral movement through tool chains: An agent connected to multiple MCP servers can be manipulated into chaining tool calls across servers — querying one system and writing the results to another. If one MCP server is compromised, the attacker can use the agent as a pivot point to access other systems the agent is connected to. The blast radius extends across every MCP connection the agent has.',
        '!! Vector 5 — No revocation mechanism: If a compromised MCP server is discovered, there is no centralized way to revoke all agent connections to it. Each developer\'s local MCP configuration must be individually updated. During the window between discovery and full revocation, data continues to flow through the compromised channel.',
        'TT "Your existing tools — CASB, API gateway, DLP — can\'t see MCP traffic. It doesn\'t go through the browser, it doesn\'t go through your API gateway, and it doesn\'t trigger your DLP rules. It\'s a net new attack surface that requires a net new control. That\'s what Okta\'s MCP Security is designed for."',
      ],
      accordion: [
        {
          title: 'Vector 1: Static Credential Exposure',
          content: [
            '53% of MCP integrations use static API keys baked into configuration files. No expiration, no scope limits, no rotation.',
            '!! 28.65 million hardcoded secrets detected in public GitHub commits in 2024 (GitGuardian). MCP config files are a growing contributor.',
            'TT "What credential model are your developers\' MCP connections using? If it\'s API keys in a config file, that\'s the exact pattern attackers look for."',
          ],
        },
        {
          title: 'Vector 2: Tool Poisoning (CVSS 9.3)',
          content: [
            'CVE-2025-32711: attacker modifies MCP server tool descriptions to manipulate agent behavior — exfiltrating credentials, modifying data, or escalating privileges.',
            'The agent trusts tool descriptions implicitly and doesn\'t verify against a known-good baseline. This is the MCP equivalent of a supply chain attack.',
          ],
        },
        {
          title: 'Vector 3: Spoofed Traffic',
          content: [
            '79.7% of MCP traffic observed from spoofed or unverified sources (Invariant Labs).',
            'Without mutual authentication, there\'s no way to verify the MCP server your agent connects to is the one you think it is. MITM attacks can intercept tool calls and return manipulated results.',
          ],
        },
        {
          title: 'Vector 4: Lateral Movement Through Tool Chains',
          content: [
            'An agent connected to multiple MCP servers can be manipulated into chaining calls across servers — query one system, write results to another.',
            'If one MCP server is compromised, the attacker uses the agent as a pivot to access every other connected system. The blast radius = all MCP connections.',
          ],
        },
        {
          title: 'Vector 5: No Revocation Mechanism',
          content: [
            'If a compromised MCP server is discovered, there is no centralized way to revoke connections. Each developer\'s local config must be individually updated.',
            'During the window between discovery and full revocation, data continues to flow through the compromised channel.',
          ],
        },
      ],
    },
    {
      heading: 'The Stats That Stop Conversations',
      paragraphs: [
        'These are the numbers you pull up mid-call when a customer says "we\'re not worried about MCP yet." Every one of them is sourced and ready to cite.',
        '>> 53% of MCP integrations use static API keys with no expiration or scope limits. — Invariant Labs MCP Audit, 2025',
        '>> Only 8.5% of MCP deployments use OAuth for authentication. The other 91.5% use static keys or no auth at all. — MCP Audit Community Survey, 2025',
        '>> 79.7% of MCP traffic observed came from spoofed or unverified sources. — Invariant Labs MCP Traffic Analysis, 2025',
        '>> CVE-2025-32711 (CVSS 9.3): credential theft via MCP tool poisoning. Attacker modifies tool descriptions to trick agents into exfiltrating secrets. — NVD, April 2025',
        '>> 28.65 million hardcoded secrets detected in public GitHub commits in 2024, a 25% increase YoY. MCP config files are a growing contributor. — GitGuardian State of Secrets Sprawl, 2025',
        '>> 16,200 AI/ML-related cybersecurity incidents tracked in 2024, a 354% increase over 2023. MCP-related incidents are a rapidly growing subcategory. — HiddenLayer AI Threat Landscape Report, 2025',
        '!! Pro tip: The 53% stat and the CVE are the two that get the most reaction on calls. Lead with one of them depending on whether the customer is more concerned about credential hygiene (53%) or supply chain risk (CVE).',
      ],
      labeledCallouts: [
        { label: 'CREDENTIAL RISK', labelColor: 'rose', text: '53% of MCP integrations use static API keys with no expiration or scope limits. — Invariant Labs MCP Audit, 2025' },
        { label: 'AUTH GAP', labelColor: 'amber', text: 'Only 8.5% of MCP deployments use OAuth for authentication. The other 91.5% rely on static keys or no auth at all. — MCP Audit Community Survey, 2025' },
        { label: 'SPOOFING', labelColor: 'rose', text: '79.7% of MCP traffic observed came from spoofed or unverified sources. — Invariant Labs MCP Traffic Analysis, 2025' },
        { label: 'CRITICAL CVE', labelColor: 'rose', text: 'CVE-2025-32711 (CVSS 9.3): credential theft via MCP tool poisoning. Attacker modifies tool descriptions to trick agents into exfiltrating secrets. — NVD, April 2025' },
      ],
      image: 'newsletter-03-stats.png',
      imageAlt: 'Presenter showing alarming MCP security statistics on a large display screen to an engaged executive audience',
      imageCaption: 'The numbers that reframe every MCP conversation: 53% static keys, 8.5% OAuth, CVSS 9.3 tool poisoning CVE',
      imageBanner: true,
    },
    {
      heading: 'How Okta Secures MCP',
      paragraphs: [
        'Okta\'s MCP Security solution applies identity-layer controls to MCP connections. It does not replace the MCP protocol — it wraps it in the same OAuth 2.1 security model that governs every other agent interaction in the Okta ecosystem. Here\'s how it works:',
        'Control 1 — OAuth 2.1 for MCP authentication: Every MCP connection authenticates through Okta using OAuth 2.1. The developer\'s identity is verified, the MCP server is registered as a known resource, and the connection receives a short-lived token (recommended 15-minute TTL) instead of a static key. When the token expires, the connection must re-authenticate. No more permanent credentials.',
        'Control 2 — Per-tool authorization: Not all tools on an MCP server are equal. A database MCP server might expose both read and write tools. With Okta\'s per-tool authorization, the agent\'s token can be scoped to specific tools — read-only for one agent, read-write for another. The authorization decision happens at the tool level, not the server level.',
        'Control 3 — MCP server registry: Organizations define an approved list of MCP servers. Agents can only connect to registered servers. Unapproved MCP connections are blocked or flagged. This is the equivalent of an app catalog for MCP — a sanctioned list that security controls rather than an open marketplace developers pick from freely.',
        'Control 4 — ISPM discovery: Okta\'s Identity Security Posture Management scans for MCP connections across developer environments. It discovers unsanctioned MCP servers, identifies which credentials they\'re using, and flags connections that don\'t meet policy. This is how you find the shadow MCP servers that exist before you deploy controls.',
        'Control 5 — Universal Logout for MCP: If an MCP server is compromised, Okta can revoke all active tokens for that server across every agent and every user in a single action. No machine-by-machine cleanup. No hoping developers update their configs. One click, all connections terminated.',
        '>> The five controls map to the five attack vectors from the previous section: OAuth replaces static keys (V1), the registry prevents tool poisoning from unknown servers (V2), mutual authentication prevents spoofing (V3), per-tool authorization limits lateral movement (V4), and Universal Logout provides instant revocation (V5).',
      ],
      image: 'newsletter-03-solution.png',
      imageAlt: 'Solution engineer demonstrating MCP security controls on a laptop to a customer in a modern meeting space',
      imageCaption: 'Five controls for five vectors: OAuth, per-tool auth, server registry, ISPM discovery, and Universal Logout',
    },
    {
      heading: 'Your MCP Discovery Playbook',
      paragraphs: [
        'MCP security is still a new conversation for most customers. Here\'s how to bring it up effectively — whether MCP is the primary motion or a secondary play in a broader O4AA deal.',
        '!! Opening move — The inventory question: "Are your developers using MCP to connect AI assistants to your internal tools and data? If so, how many MCP servers are running in your environment, and does your security team have visibility into those connections?" This question works because the honest answer is almost always "we don\'t know" — which opens the discovery conversation.',
        '!! If they say "what\'s MCP?": Brief them in 30 seconds. "MCP is a standard protocol that lets AI agents connect to tools — databases, APIs, code repos, email. Think of it as USB-C for AI. Your developers are probably already using it, especially if they use Cursor, Claude, or any AI coding assistant." Then ask the inventory question.',
        '!! If they say "our developers use it but it\'s fine": The 53% stat is your wedge. "53% of MCP integrations use static API keys with no expiration or scope limits. Do you know what credential model your developers\' MCP connections use?" This shifts the conversation from "is MCP a problem" to "how big is the problem."',
        '!! If they\'re already concerned about MCP: Go straight to the five vectors. Walk through each one and ask which ones they have controls for today. Most customers have zero of the five covered. Then map Okta\'s five controls to their gaps.',
        '!! The bridge to the broader O4AA conversation: "MCP security is one piece of the agent identity puzzle. The same OAuth 2.1 and token exchange mechanisms that secure MCP connections also govern every other agent interaction — workforce copilots, customer-facing agents, third-party vendor agents. It\'s one identity fabric, not a point solution for each protocol."',
        'TT "Here\'s the question I\'d ask your platform engineering team: how many MCP servers are running on developer laptops right now, what credentials are they using, and what production systems do they connect to? If you can answer all three, you\'re ahead of 90% of the organizations we talk to. If you can\'t — that\'s exactly the gap we close."',
      ],
    },
  ],

  pullQuotes: [
    {
      text: 'MCP is the USB-C of AI. Before USB-C, every device had its own charging cable. MCP standardizes the connection between agents and tools. The identity question is: who controls what plugs into that port?',
    },
    {
      text: '53% of MCP integrations use static API keys. Only 8.5% use OAuth. 79.7% of traffic comes from spoofed sources. This is not a future problem.',
    },
    {
      text: 'People are chomping at the bit for MCP — we\'re like slow down, it\'s very unsecure.',
      attribution: 'Identity Architect, Healthcare Enterprise',
    },
  ],

  keyTakeaways: [
    {
      label: 'What MCP Is',
      text: 'A standard protocol for AI agents to call tools. USB-C for AI. Any agent, any tool, one interface. But no built-in security — that\'s the problem.',
    },
    {
      label: 'Five Attack Vectors',
      text: 'Static credentials (53%), tool poisoning (CVSS 9.3), spoofed traffic (79.7%), lateral movement through tool chains, and no centralized revocation.',
    },
    {
      label: 'Five Okta Controls',
      text: 'OAuth 2.1 auth, per-tool authorization, MCP server registry, ISPM discovery, and Universal Logout. Each control maps to a specific vector.',
    },
    {
      label: 'Your Opening Question',
      text: '"How many MCP servers are running in your developer environments, and does security have visibility into those connections?" The honest answer is almost always "we don\'t know."',
    },
  ],

  nextIssueTeaser: {
    title: 'Issue #4: The O4AA Product Map',
    description: 'The complete product landscape — Agent Gateway, Cross-App Access, ISPM for agents, OIG certification campaigns, ITP threat detection, and how they fit together. Plus: which SKU maps to which customer pain point.',
  },
};
