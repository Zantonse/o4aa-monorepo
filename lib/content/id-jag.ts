import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'id-jag',
  title: 'ID-JAG Protocol',
  description:
    'The Identity Assertion JWT Authorization Grant — an adopted IETF OAuth Working Group draft (draft-ietf-oauth-identity-assertion-authz-grant) that standardizes how AI agents prove delegated authority across application boundaries.',
  tags: ['auth-flows', 'identity', 'provenance', 'IETF-adopted', 'XAA', 'EA'],
  icon: '🪪',
  hasDiagram: true,
  diagramPrompt:
    'Four boxes in a horizontal row labeled User, Orchestrator, Agent, Server. Arrows between boxes labeled assertion. A verification checkpoint between Agent and Server boxes. Warm amber and cream palette, clean flat technical diagram style, white background.',
  cards: [
    {
      heading: 'What is ID-JAG?',
      image: 'diagrams/id-jag-flow.png',
      paragraphs: [
        'ID-JAG — the Identity Assertion JWT Authorization Grant — is the token type at the heart of Cross App Access (XAA). Formally published as an IETF OAuth Working Group draft (draft-ietf-oauth-identity-assertion-authz-grant, currently at version -02 as of March 2026), it standardizes how AI agent identity assertions are structured, communicated, and verified across distributed systems. Okta\'s Aaron Parecki is a co-author. The problem it addresses is one that RFC 8693 token exchange surfaces but does not fully resolve: when a token arrives at an API endpoint, the token can tell the API who the user is and who the acting agent is for a single delegation hop, but it does not natively encode the full context of a complex, multi-hop agentic transaction. An API receiving a token cannot tell whether it came from a human directly, from a single AI agent acting for a human, from an AI orchestrator that spawned the calling agent, or from some chain of delegations that started two systems upstream.',
        'ID-JAG defines a structured identity assertion format that carries three categories of information: the type of principal making the call (human user, AI agent, AI orchestrator, automated system), the verifiable identity of that principal, and the chain of delegation — every authorization step from the original human grant through to the immediate caller. This assertion travels with the token or alongside it as a verifiable credential, giving the receiving API a complete, tamper-evident picture of who did what and who authorized each step. Rather than inferring intent from token claims, the API can inspect a structured, cryptographically bound record of the entire authorization chain.',
        '!! ID-JAG is further along than many SEs realize. The IETF draft has been formally adopted by the OAuth Working Group (not just an individual submission), and the Okta System Log event type app.oauth2.token.grant.id_jag entered EA Preview in August 2025 — meaning the infrastructure to issue and log ID-JAG tokens exists in Okta today. Cross App Access (XAA), which uses ID-JAG as its token type, is currently in self-service Early Access. This positions it correctly for SE conversations: XAA/ID-JAG is not vaporware — it is a shipping EA feature with an IETF-track standard behind it. The value of surfacing it in discovery is to establish Okta as the identity standard for agentic systems and to give security architects a credible, standards-based answer to "what happens as our agent systems get more complex?"',
      ],
    },
    {
      heading: 'The Agent Provenance Chain',
      paragraphs: [
        'Provenance, in the identity and governance context, means the documented, verifiable history of who authorized what in a transaction. In a simple human-to-API interaction, provenance is straightforward: a user authenticated, the system issued a token, the user made a request. In a multi-agent system, the provenance chain becomes a tree of delegations. A human user authorizes an AI orchestrator to complete a task. The orchestrator determines it needs to invoke a specialized sub-agent — for example, a search agent, a code execution agent, or a data retrieval agent. The sub-agent calls a protected downstream API. Three principals have touched this transaction: the human user who authorized the orchestrator, the orchestrator that delegated to the sub-agent, and the sub-agent that made the API call. Without a provenance mechanism, the API sees only the last hop.',
        'The provenance chain matters because authorization is not transitive by default. If a human user authorizes an orchestrator to read their financial records, that authorization does not automatically entitle the orchestrator to delegate write access to a sub-agent, or to share that delegation with a tool server operated by a third-party vendor. Each hop in the chain is a new authorization decision: does the principal at this step have the right to delegate the claimed permissions to the next step in the chain? ID-JAG defines how each delegation hop is encoded into the assertion chain so that the receiving API can validate not just "is this token valid?" but "is each delegation in this chain legitimate?" A malicious or misconfigured sub-agent that attempts to escalate privilege by claiming an authorization it was never granted will produce a chain that fails validation at the API.',
        'The practical encoding: each identity assertion in the ID-JAG chain contains the identity of the principal at that step, the scope of what that principal was authorized to do, a reference to the assertion from the previous step (creating a cryptographic chain of custody), and a timestamp. The receiving API validates the entire chain from the root human authorization down to the immediate caller. If any link is missing, invalid, or claims permissions that exceed what the previous link authorized, the call fails. This is the concrete answer to the question "how do we prevent an AI agent from doing something a user didn\'t authorize?" — the chain is the enforcement mechanism, and Okta\'s authorization server is the root of trust for the entire chain.',
      ],
      mermaidDiagrams: [
        {
          title: 'ID-JAG Provenance Chain — Scope Ceiling Enforcement',
          code: `graph TB
    subgraph Human["Root Authorization"]
        U["👤 Human User<br/><i>Grants: records.read</i>"]
    end

    subgraph Orch["Orchestrator Layer"]
        O["🤖 Orchestrator Agent<br/><i>Receives: records.read</i><br/><i>Scope ceiling: records.read</i>"]
    end

    subgraph Sub["Sub-Agent Layer"]
        S["🤖 Sub-Agent<br/><i>Delegated: records.read</i><br/><i>Cannot exceed ceiling</i>"]
    end

    subgraph Resource["Protected Resource"]
        API["🌐 Protected API<br/><i>Validates full chain</i>"]
    end

    subgraph BadPath["Bad Path — Scope Escalation Attempt"]
        BAD["🤖 Compromised Sub-Agent<br/><i>Claims: records.write</i>"]
        DENY["❌ Chain validation fails<br/><i>Scope exceeds delegation</i>"]
    end

    U -->|"delegation<br/>records.read"| O
    O -->|"re-delegation<br/>records.read"| S
    S -->|"ID-JAG assertion chain<br/>all hops verified"| API

    O -.->|"escalation attempt"| BAD
    BAD -.->|"rejected"| DENY

    style Human fill:#f0ede6,stroke:#c4b99a,stroke-width:2px
    style Orch fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style Sub fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style Resource fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px
    style BadPath fill:#f0e6e6,stroke:#c08080,stroke-width:2px
    style BAD fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5
    style DENY fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5`,
          caption: 'Each delegation hop can only grant what the delegating principal received — the scope ceiling is the enforcement mechanism. A sub-agent claiming permissions never granted in the chain fails validation at the API.',
        },
      ],
    },
    {
      heading: 'SE Positioning',
      paragraphs: [
        'ID-JAG is most relevant to three audiences in an enterprise sale: security architects designing the identity model for agentic systems, CISOs and compliance teams asking "how do we know an AI did this versus a human?", and platform teams evaluating which identity vendor will still be the right choice two to three years from now as their agent systems scale in complexity. The first two audiences have an immediate problem: they are being asked to sign off on AI agent deployments that use authentication models — shared service accounts, forwarded user tokens, client credentials — that they know are inadequate. ID-JAG gives them a credible answer to "what is the right long-term architecture?" that they can use to make the current Okta investment defensible internally.',
        'TT The relationship between OBO Token Exchange and ID-JAG is complementary, not competing. OBO handles the delegated access mechanics: it issues a token that binds user identity and agent identity for a single delegation hop, and it is the right solution to deploy right now for AI agents that need to act on behalf of users. ID-JAG extends this model to cover the full provenance chain across multiple delegation hops, adds structured assertions about the type of principal at each step, and provides the governance layer that lets enterprises answer "who did this, through what path, authorized by whom" for arbitrarily complex multi-agent transactions. Customers who implement OBO today are not throwing away that investment — they are building on the foundation that ID-JAG will formalize. The architecture that is correct for OBO is the same architecture that will be correct for ID-JAG.',
        '?? The discovery question that opens the ID-JAG conversation is direct: "If an AI agent takes a destructive action — deletes a record, transfers funds, sends a notification to a customer — can you trace exactly which agent took that action, authorized by which user, through which chain of delegation, and verify that every step in that chain was within the scope of what was originally authorized?" Almost no organization can answer yes to all parts of this question today. That gap is the opportunity. Okta\'s position is that it is investing in ID-JAG as the long-term identity standard for agentic systems, and customers who adopt Okta for AI Agents now — starting with OBO Token Exchange and Cross App Access (XAA) — will have a clear, supported path to full ID-JAG compliance as the standard matures. Competitors who are not actively driving this standard will be catching up to it. That is a durable differentiator worth putting in the account plan.',
      ],
      accordion: [
        {
          title: 'Audience: Security Architects',
          content: [
            'Security architects are being asked to sign off on agentic deployments using authentication models they know are inadequate — shared service accounts, client credentials, forwarded user tokens.',
            'ID-JAG gives them a credible, standards-backed answer to "what is the right long-term architecture?" that makes the current Okta investment defensible in their internal security review.',
            'Lead with: the IETF OAuth Working Group has formally adopted the draft (not just an individual submission), and Okta is an active co-author. This is not a proprietary Okta extension — it is the emerging industry standard.',
            'Connect to their current deployment: OBO Token Exchange (GA today) is the right first step, and ID-JAG formalizes the provenance model that OBO tokens are already partially encoding.',
          ],
        },
        {
          title: 'Audience: CISOs and Compliance Teams',
          content: [
            'Core question from this audience: "How do we know an AI did this versus a human, and can we prove it under audit?"',
            'ID-JAG provides a structured, cryptographically bound record of the entire authorization chain — every delegation hop from the original human grant to the API call that took the action.',
            'Compliance angle: for SOX, GDPR, HIPAA, and FINRA, the ability to produce a verifiable audit record of who authorized what, through which agent, with which scope, is not optional in production agentic deployments.',
            'Discovery question: "If an AI agent deletes a record or transfers funds, can you trace exactly which agent did it, authorized by which user, through which delegation chain, and verify every step was in scope?" Almost no organization can answer yes to all parts today.',
          ],
        },
        {
          title: 'Audience: Platform Teams and Architecture Evaluators',
          content: [
            'Platform teams evaluating identity vendors for multi-year agentic system roadmaps need to know: will this vendor still be the right choice when agent systems become more complex?',
            'Position Okta as the vendor actively driving the standard — Aaron Parecki (Okta) is a co-author of the IETF draft. Competitors will be catching up to a standard Okta helped define.',
            'The investment path is linear, not forked: customers who implement OBO Token Exchange now are building on the same architectural foundation that ID-JAG will formalize. No rework required.',
            'Cross App Access (XAA), which uses ID-JAG as its token type, is currently in self-service Early Access — the infrastructure exists in Okta today, not on a distant roadmap.',
          ],
        },
        {
          title: 'OBO vs. ID-JAG: How to Position Both in the Same Conversation',
          content: [
            'OBO Token Exchange and ID-JAG are complementary, not competing — position them as two layers of the same architecture, not alternative choices.',
            'OBO handles the immediate, single-hop delegation problem: an agent acting for a user, calling one downstream API, with a verifiable scoped token. This is GA and should be the first deployment.',
            'ID-JAG extends the model to arbitrarily complex multi-agent chains: full provenance across multiple delegation hops, structured principal-type assertions, and chain-of-custody validation at the receiving API.',
            'Frame it as a maturity progression: "Start with OBO for your current agent deployments. As your agent systems grow — multiple orchestrators, specialized sub-agents, third-party tool servers — ID-JAG and XAA are the governance layer that scales with you. You are building on the same foundation either way."',
          ],
        },
      ],
    },
  ],
};
