import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'ai-agents-101',
  title: 'AI Agents 101',
  description:
    'What AI agents are, why authentication is uniquely hard for them, and the key concepts every SE needs to internalize before a discovery call.',
  tags: ['foundations', 'agents', 'concepts'],
  icon: '🤖',
  hasDiagram: true,
  diagramPrompt:
    'Clean technical diagram: AI orchestrator agent in center connected to 4 tool boxes (web search, calendar API, database, email). Token flow arrows between components labeled with "scoped token". Warm amber and cream color palette, flat illustration style, white background, no gradients, technical diagram aesthetic.',
  cards: [
    {
      heading: 'What is an AI Agent?',
      paragraphs: [
        'An AI agent is autonomous software that perceives inputs from its environment, reasons over them using a large language model or similar system, and takes actions through tools — external APIs, databases, code interpreters, or other services. Unlike a traditional application that executes a fixed decision tree, an agent decides at runtime which steps to take and in what order. The key word is autonomous: an agent is not just generating a response, it is completing a goal.',
        'This is the critical distinction from a chatbot. A chatbot receives a message and returns a message. An agent receives a goal and pursues it across multiple steps, potentially spanning several API calls, data lookups, and writes to external systems before it reports back. An agent booking a travel itinerary does not just suggest flights — it searches for options, applies user preferences, calls a booking API, updates a calendar, and sends a confirmation. Each of those steps is a real action with real side effects.',
        'Agents invoke external capabilities through tool calls, also called function calling. The LLM outputs a structured request — "call get_calendar_events with date range July 1–5" — and a surrounding framework executes that call, returns the result to the model, and lets the model decide what to do next. From an identity perspective, every one of those tool calls is an API request that a protected service needs to authorize. The agent is making API calls on behalf of a user, which means every tool call needs a credential.',
        'In production systems, a single monolithic agent is rarely the architecture. Orchestrator-sub-agent patterns are common: one orchestrator agent breaks a goal into subtasks and delegates them to specialized sub-agents — a search agent, a calendar agent, a code execution agent. Each sub-agent has its own identity and its own scope of access. For an SE, this is the moment to start asking about the identity model: who issued those credentials, what scopes do they carry, and how does the receiving API know the sub-agent is acting with legitimate authority from the original user?',
      ],
      mermaidDiagrams: [
        {
          title: 'Orchestrator-Sub-Agent Topology',
          code: `graph LR
    subgraph User["User Context"]
        U["👤 User<br/><i>Sets the goal</i>"]
    end

    subgraph Orch["Orchestrator Layer"]
        O["🤖 Orchestrator Agent<br/><i>Plans and delegates</i>"]
    end

    subgraph Agents["Sub-Agent Layer"]
        S1["🤖 Search Agent<br/><i>scope: web.read</i>"]
        S2["🤖 Calendar Agent<br/><i>scope: calendar.write</i>"]
        S3["🤖 Booking Agent<br/><i>scope: booking.create</i>"]
    end

    subgraph APIs["External APIs"]
        A1["🌐 Search API"]
        A2["🌐 Calendar API"]
        A3["🌐 Booking API"]
    end

    U -->|"goal: book travel"| O
    O -->|"subtask: find flights"| S1
    O -->|"subtask: check calendar"| S2
    O -->|"subtask: complete booking"| S3
    S1 -->|"tool call + credential"| A1
    S2 -->|"tool call + credential"| A2
    S3 -->|"tool call + credential"| A3

    style User fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style Orch fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Agents fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style APIs fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px`,
          caption: 'Every sub-agent tool call is a real API request that needs a credential — the multi-hop topology means each hop is a separate identity boundary requiring authorization.',
        },
      ],
    },
    {
      heading: 'Why Auth is Hard for AI Agents',
      paragraphs: [
        'Agents are non-human identities, but they are not traditional service accounts either. A service account authenticates as itself to do a fixed, predictable job. An agent authenticates as itself but acts on behalf of a specific human user, with the user\'s permissions, to accomplish a goal the user set. That distinction — "on behalf of" — is where the identity problem lives. Standard OAuth user flows assume a human present at a browser. Standard service account patterns assume a fixed, pre-scoped credential. Agents need something in between, and most organizations have not built it.',
        'The delegated access problem is the core issue: the agent must prove to every API it calls that it has been legitimately authorized by a specific user to take a specific action. The API cannot just trust the agent\'s credential in isolation — it needs to verify the user\'s authorization is embedded in that credential. If an agent calls your company\'s internal HR API and says "I am Agent X, give me employee records," the API needs to know not just that Agent X is a valid client, but that a specific human authorized Agent X to access those records and under what constraints.',
        'Dynamic tool selection makes token scoping nearly impossible with traditional approaches. A human user authenticates once and gets a token with a defined scope for that session. An agent in the middle of a task might decide it needs to call five different APIs that were not known at authentication time. If the token was scoped to API A and B at login, the agent fails when it tries to call API C — unless you issued an overly broad token at the start, which violates least-privilege. The agent needs a mechanism to acquire appropriately scoped credentials just-in-time for each tool call, without re-prompting the user on every step.',
        '!! Compliance and audit requirements close the loop on why this is a hard problem. Security and legal teams need to answer: what exactly did the agent do, as which user, at what time, and was that action within the scope the user authorized? If agents are sharing service account credentials, or storing long-lived tokens in memory, or calling APIs with ambient credentials that were not explicitly delegated — there is no audit trail, no accountability chain, and no defensible answer to a compliance inquiry. This is the exact problem Okta for AI Agents is designed to solve: a standards-based identity layer that makes every agent action attributable, scoped, and auditable.',
        'The velocity gap illustrates why traditional auth models break down: a typical application performs approximately 50 operations per minute, while AI agents execute up to 5,000 — a 100x multiplier. On July 18, 2025, an AI agent at Replit erased 1,206 executive records from a live production database in seconds. Consent-based authorization models that work for human-speed interactions collapse at agent velocity — by the time a consent screen would appear, the agent has already made thousands of API calls. This is why Okta\'s approach enforces policy-based authorization in real time rather than relying on upfront consent. [Source: Kundan Kolhe, Okta AI Agent Security Series Post 1]',
      ],
    },
    {
      heading: 'Key Agentic Concepts',
      paragraphs: [
        '>> Tool calls / function calling: the mechanism by which an LLM requests execution of an external capability. The model outputs a structured JSON call spec; a framework executes it against a real API and returns results. Every tool call is a real API request — and from an identity standpoint, every API request needs an authorized credential.',
        'Orchestrator vs. sub-agent: an orchestrator receives the high-level goal, plans the steps, and delegates subtasks to specialized sub-agents. Sub-agents are narrowly scoped — they execute one kind of task well. The orchestrator aggregates results. Each hop in this chain is an identity boundary: who is the sub-agent, what did the orchestrator authorize it to do, and how does the downstream API verify that chain?',
        'Human-in-the-loop vs. fully autonomous: some agent workflows pause and request human approval before taking sensitive actions (sending an email, making a purchase, deleting data). Others run end-to-end without human intervention. The auth requirements differ: human-in-the-loop flows can reconfirm authorization at the pause point; fully autonomous flows must establish all necessary authorization upfront, which makes over-provisioning tempting and dangerous.',
        'Context window and long-lived token risk: agents store intermediate state — including sometimes credentials or tokens — in their context window or in attached memory stores. A token sitting in an agent\'s memory is a credential that could be exposed through a prompt injection attack, a log leak, or a compromised memory store. Short-lived, tightly scoped tokens that are requested just-in-time and expire quickly minimize this attack surface.',
        '>> Stateless authorization: each tool call should be independently authorized against a current, valid credential — not rely on session state from a previous step. This is a design principle, not a technical limitation. It means the authorization decision is made fresh at each API call boundary, which supports least-privilege, enables per-call audit logging, and ensures a revoked delegation is honored immediately rather than only at token expiry.',
      ],
      conceptGrid: [
        { label: 'TOOL CALLING', text: 'LLM outputs a structured JSON call spec. A framework executes it against a real API. Every tool call = a real API request that needs an authorized credential.' },
        { label: 'ORCHESTRATOR PATTERN', text: 'One agent plans and delegates subtasks to specialized sub-agents. Each hop is an identity boundary — who authorized the sub-agent and what scope does it carry?' },
        { label: 'STATELESS AUTH', text: 'Each tool call independently authorized against a fresh credential. No session state reliance. Supports least-privilege, per-call audit, and immediate revocation.' },
      ],
    },
  ],
};
