import type { UseCase, CoTMPillar, FlowStep } from './types';

export const QUESTION_BANK: Record<UseCase, { cotmView: CoTMPillar[]; flowView: FlowStep[] }> = {

  // ─────────────────────────────────────────────────────────────────────────
  // USE CASE 1: Workforce AI Agents
  // Updated with insights from 743 Gong transcripts (306 AI-related) across
  // 17 industry × use-case archetypes. Universal pain points: shadow AI
  // inventory (0.83–0.88 frequency), orphaned agent credentials at offboarding,
  // no audit trail / user attribution, no kill switch, overprivileged agents,
  // long-lived credentials, exec mandate outpacing security.
  // ─────────────────────────────────────────────────────────────────────────
  'workforce-ai-agents': {
    cotmView: [
      {
        id: 'pbo',
        name: 'Positive Business Outcomes',
        description:
          'Uncover the business value the customer expects from securing workforce AI assistants — reduced audit exposure, policy enforcement, and reclaimed IT control.',
        questions: [
          'How many AI agents are operating in your environment today — and how confident are you in that number? Across 306 AI-related conversations we\'ve had this quarter, security teams consistently discover agents they didn\'t know existed. One director of information security told us: "We went from zero AI at about mid-December to AI everywhere with mandates."',
          'When your board or regulators ask how you\'re managing AI risk in the workforce, what answer are you giving them right now versus what answer you\'d like to be giving them? 44% of organizations in a recent Okta survey had no AI agent governance in place at all — and 88% reported suspected or confirmed AI agent security incidents.',
          'Leadership said "go use AI" — but did they also say "and here\'s how to secure it"? We hear this in almost every conversation: the AI mandate moves faster than governance, and security is retrofitting controls onto agents already in production. As one customer put it, "that train is moving at mach speed — I\'m not sure there is anything in front of it at this point."',
          'If an AI agent acting on behalf of an employee caused a data breach or compliance violation tomorrow, what would the business exposure look like — and how quickly could you even determine which agent did it and what it accessed? In one documented case, a RevOps team stretched permissions to gain full access to company financial records in Databricks through unauthorized agents.',
          'What happens if you don\'t solve this in the next 6 months? Every customer we talk to says agent count at least 5x\'d in the last year — and the governance gap compounds with every new agent. The organizations starting now will be production-ready when their AI deployments scale. The ones that wait will be building under pressure when compliance is already asking questions.',
        ],
      },
      {
        id: 'required-capabilities',
        name: 'Required Capabilities',
        description:
          'Identify the specific controls the security and IT teams need to bring workforce AI agents under managed identity and least-privilege access.',
        questions: [
          'Your employees are probably running agents across multiple platforms — Copilot Studio, Claude, Cursor, Gemini, maybe custom builds on Bedrock or LangChain. Is there a single control plane that governs all of them, or are you managing each one separately? We consistently see multi-platform environments where Entra governs Microsoft agents but nothing governs the rest.',
          'Walk me through what happens today when an employee grants an AI assistant OAuth access to their Microsoft 365 or Google Workspace account — who sees that consent event, and what can revoke it? One customer told us someone was actually embedding the Salesforce client ID and client secret in a Google Sheets Apps Script that could have been shared broadly.',
          'Agents act on behalf of users but typically inherit full user permissions. As one financial services firm told us: "Once you give any kind of agent unfettered create, read, update, even potentially delete in Google Workspace for a financial services organization, we just can\'t give you update and delete." Is there any mechanism today to give an agent a subset of what the user can do?',
          'Are developers running MCP servers locally on their laptops? If so, who controls where those MCP connections go and what data flows through them? In healthcare environments we see this as a hard blocker — no network whitelisting is possible for local MCP servers, and PHI could flow through unmonitored channels.',
          'When an employee leaves the company, their human identity gets deprovisioned — but what happens to the AI agents they spun up, the API keys they hardcoded, the OAuth grants they approved? As one IT contact described it: "When we terminate someone, we terminate all of their API keys of the bot... we have no way to manage that." The agents keep running.',
        ],
      },
      {
        id: 'success-metrics',
        name: 'Success Metrics',
        description:
          'Define the measurable outcomes that would signal a successful workforce AI governance program — inventory completeness, time-to-revoke, and audit defensibility.',
        questions: [
          'If you could produce a complete, real-time inventory of every AI agent in your environment — what it accesses, who owns it, and when it was last reviewed — how many audit hours does that save? As one director told us: "The moment I get a dashboard in front of senior leadership showing we have 8,000 robots doing stuff, it should be eye opening."',
          'If you could measure one thing to prove to your CISO that you\'ve meaningfully reduced shadow AI risk, what would that metric be? Most teams we talk to can\'t even produce a count of active agents — the measurement starts with inventory.',
          'Right now, if an agent were compromised, how quickly could you revoke its access — and how would you know which systems it had touched? In a documented incident, it took 4 hours to fully revoke credentials across 11 API providers because each required a manual process. During that window, 340,000 customer records were downloaded. What\'s your target response time?',
          'When a security incident involves an AI agent today, can you even distinguish whether it was the agent or the human who took the action? One customer told us: "Agent did something wrong — they deleted data. We can\'t even differentiate if an agent did it or a user did it." What would full attribution be worth to your SOC team?',
          'What KPI would your economic buyer use to justify the investment — reduced breach risk, compliance costs avoided, or the fact that a 4-person IAM team can govern 40,000 identities including agents without adding headcount? Colgate-Palmolive runs exactly that model today with Okta.',
        ],
      },
      {
        id: 'before-after',
        name: 'Before / After Scenarios',
        description:
          'Contrast the current state of unmanaged AI assistant access and invisible audit trails with a governed, auditable workforce AI environment.',
        questions: [
          'Right now, if a rogue or compromised AI assistant spent two weeks quietly exfiltrating sales data via an employee\'s connected account, what\'s the realistic chance you\'d catch it within those two weeks? We documented a case where a RevOps team had "full unfettered access into data repositories — they got access to the entire repository of company financial records in Databricks" through unauthorized agents.',
          'Today, your access reviews probably cover human identities. But 80% of organizations in a recent survey reported unintended agent behavior — and only 22% treat agents as independent identities in their governance programs. What does it look like when AI agents become first-class citizens in your access review cycle?',
          'An employee leaves on Friday. Their Okta account is deprovisioned. Monday morning, the three AI agents they built — one connected to Salesforce, one to GitHub, one to the data warehouse — are still running under hardcoded service accounts. One customer described it bluntly: "When we terminate someone, we terminate all of their API keys of the bot... we have no way to manage that." How does your current offboarding process handle that?',
          'Before a solution like this: your incident response team gets a ticket that an AI agent may have accessed sensitive HR records. They have no centralized logs, no agent registry, and no way to scope the blast radius. It took one organization 4 hours to revoke credentials across 11 API providers — 340,000 records downloaded in that window. After: the same scenario plays out with a kill switch that revokes the agent in seconds.',
          'Imagine an agent chain where Agent A calls Agent B, which calls Agent C to update a production database. Ephemeral agents that spin up and die in seconds break audit trails entirely — the original user\'s identity is lost by hop two. If something goes wrong, who\'s accountable? What would it look like if user context flowed through the entire chain?',
        ],
      },
      {
        id: 'decision-process',
        name: 'Decision Process',
        description:
          'Uncover the stakeholders, timeline, evaluation criteria, and competitive context driving the decision to invest in workforce AI governance.',
        questions: [
          'Who in your organization owns the decision to put formal governance around workforce AI tools — is this living in IT, Security, Legal, or is it genuinely cross-functional right now with no clear DRI? In manufacturing environments, we often find nobody owns it. In financial services, security usually leads but legal is blocking.',
          'Is there a regulatory or compliance event on the horizon — a SOC 2 renewal, a GDPR audit, a HIPAA risk assessment, a HITRUST renewal, an internal board review — that\'s creating urgency? For financial services, FINRA and the SEC are already examining AI in trading workflows under existing supervision rules. For healthcare, HIPAA auditors are asking about AI agent PHI access.',
          'Are you evaluating this alongside your existing Entra/Microsoft investment? We find the Okta case gets strongest when you have agents spanning multiple platforms — Copilot Studio plus AWS Bedrock plus homegrown builds — because Entra governs Microsoft agents well but not the rest. Microsoft is going GA with their AI identity capabilities May 1 — one day after Okta\'s April 30 GA.',
          'Are you evaluating any NHI-specific vendors — Astrix, Oasis Security, Aembit? Those tools solve real problems around shadow agent discovery and NHI governance, but they\'re governance overlays that need an identity foundation underneath. The question is whether you need Okta alone or Okta plus a governance overlay.',
          'Okta for AI Agents goes GA April 30, 2026. If we were to run a focused POC before that, who needs to be in the room? We find deals stall when the CISO or AI Security Director isn\'t involved early — they\'re often the actual approver even when they\'re not on the initial call.',
        ],
      },
    ],
    flowView: [
      {
        id: 'workforce-opening',
        section: 'Opening',
        questions: [
          'How many AI agents do you think are running in your environment today — and how many of those did IT actually authorize? That gap between known and actual is usually where the conversation gets interesting. As one security leader described it: "It\'s the wild west. We\'re not blocking any agent installations. People don\'t understand what permissions they need."',
          'Is there an executive mandate driving AI adoption — and has security been invited to that conversation, or are you trying to catch up? We see a pattern where the CEO says "go use AI" and security is retrofitting controls after the fact. One customer told us: "If we don\'t have all the controls in place from the beginning, it\'s just going to be a shit show trying to get back on top of it."',
          'Just to level-set: which AI platforms are your employees actually using? We typically see a mix — Copilot Studio for business users, Cursor or Claude for developers, maybe Bedrock or custom builds from the AI team. Where are you on that spectrum? And are those agent platforms integrated with your identity control plane today, or operating independently?',
          'Who authorized those agents to connect to corporate data — was there an approval process, or did teams just start building? One identity professional told us: "Identity always gets back-loaded into the end of these projects and then everything gets ingrained in and you have to go back and rework it."',
        ],
      },
      {
        id: 'workforce-pain',
        section: 'Pain Exploration',
        questions: [
          'When an employee uses an AI assistant to take action in a corporate system — send an email, update a Salesforce record, query an HR database — does that action get logged in a way your SOC could audit? Can you even tell whether it was the agent or the human who took the action? Most organizations we talk to cannot.',
          'If you discovered today that an employee had connected an unauthorized AI tool to your CRM or file storage, would you know about it? Have you had any incidents or close calls with AI agents accessing data they shouldn\'t have — or do you just not know because you have no visibility? Either answer is a signal.',
          'What credentials are your agents using right now — are they running under the human user\'s OAuth token, a shared service account, long-lived API keys, or hardcoded secrets? We documented a case where a developer installed an Okta bypass mechanism because Okta re-auth prompts were blocking agent operation — security controls were actively undermined by the friction they created.',
          'Are any of your agents calling other agents in a chain? When Agent A triggers Agent B, which calls Agent C — does the original user\'s identity and permission scope survive through those hops, or does it get lost? In tech companies, ephemeral agents that spin up and die in seconds completely break the audit trail.',
          'Do you have a kill switch today — if an agent starts doing something unexpected, can you terminate it instantly across every system it\'s connected to? This is cited as a top goal in 72% of the technology accounts we speak with, and almost none of them have it.',
        ],
      },
      {
        id: 'workforce-impact',
        section: 'Business Impact',
        questions: [
          'If a workforce AI governance failure resulted in a compliance violation — a GDPR breach, a SOX control failure, a data residency issue — what\'s the realistic financial exposure for your organization? For financial services, FINRA Notice 24-09 already requires documented governance frameworks including access controls and audit trails for AI in trading.',
          'Beyond the regulatory risk, what\'s the reputational risk if it became public that AI tools were operating inside your environment without adequate controls? One organization\'s RevOps team gained "full unfettered access into data repositories — they got access to the entire repository of company financial records in Databricks" through unauthorized agents.',
          'What\'s the cost today of not having this solved — in terms of your team\'s time spent on manual reviews, the risk premium you\'re carrying, or the innovation you\'re blocking because security can\'t say yes to AI fast enough? One customer told us: "If Okta can help us move faster, that is the primary driver. If I can just say you don\'t have to do that anymore — just expose that layer in Okta — that\'s going to be what signs us up."',
          'How many agents do you expect to be running 12 months from now? Every customer we talk to says the number at least 5x\'d in the last year — and the governance gap compounds with every new agent. Shadow AI is not waiting for your deployment timeline.',
        ],
      },
      {
        id: 'workforce-technical',
        section: 'Technical Reality',
        questions: [
          'What does your current tech stack look like for identity governance — are you running Okta, Entra, or something else, and how well are AI agents represented as identities in that system today? Do your existing PAM and IGA tools (CyberArk, SailPoint) cover AI agents alongside human users, or are agents completely outside those governance programs?',
          'Are your agents using long-lived API keys, personal access tokens, or service accounts? What\'s your current process for rotating those? This tells us whether the primary motion is OPA for credential management or Cross App Access for OAuth-based delegation.',
          'If I told you we could register every AI agent as a first-class identity in your existing Okta tenant with scoped credentials and a full audit trail — what gaps in your current environment would that actually close versus what would still need to be solved? Are there systems that don\'t support modern auth where agents need to authenticate with legacy credentials?',
          'Are your agents accessing systems across multiple clouds or SaaS platforms — or is this primarily within one ecosystem? The multi-platform case is where a vendor-neutral identity layer matters most. In financial services, we typically see Copilot Studio plus Salesforce AI plus Bedrock all in the same environment — no single vendor governs all three.',
        ],
      },
      {
        id: 'workforce-decision',
        section: 'Decision Process',
        questions: [
          'Who outside this conversation would need to weigh in before you could move forward — and specifically, is your CISO or AI Security Director engaged yet? We find deals stall when they\'re brought in late. In many organizations, the CISO is the actual approver even when they\'re not on the initial call.',
          'What does your evaluation process look like — are you running a formal RFP, doing a side-by-side POC, or is this more of a "build confidence and get budget" conversation right now? Do you have an existing Okta ELA? The AI SKU can be an expansion without a new contract.',
          'The AI agent governance SKU is a separate line item — is there already a budget vehicle identified for this, or does this need a new conversation with your economic buyer? What would a 30-day POC scoped to your highest-priority AI agent risk look like as a way to build the internal business case?',
          'What would need to be true about a solution for your team to feel confident recommending it? For healthcare, FedRAMP and HIPAA cell availability is often a hard requirement. For financial services, SOX and FINRA alignment is table stakes. What are your non-negotiable criteria?',
        ],
      },
      {
        id: 'workforce-next-steps',
        section: 'Next Steps',
        questions: [
          'Based on what we\'ve covered, where do you see the most immediate value — getting an inventory of existing AI agent access via ISPM, locking down a specific high-risk integration, or building the audit trail first? ISPM gives you the "8,000 robots" dashboard that makes the problem real for leadership.',
          'Okta for AI Agents goes GA April 30, 2026. If we designed a 30-day POC scoped to your highest-priority AI agent risk — one system, one agent type, full audit trail and kill switch — would that be a useful way to build the business case internally and be production-ready at GA?',
          'Is there an internal hackathon, an AI pilot, a board review, or a compliance audit coming up that creates a natural deadline for having a governance story in place? Multiple accounts we work with are scheduling POC and purchase decisions around the April 30 GA date.',
          'What\'s the timeline pressure here — and are your security and AI teams aligned on the governance model, or is there a gap between how fast the AI team wants to move and what security is comfortable with? The underlying identity primitives — OAuth, OIDC, RFC 8693 — are stable standards. You\'re buying the stable foundation, not a point tool that might shift.',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // USE CASE 2: Customer-Facing AI Agents (Auth0 motion)
  // 23 transcripts. Primary products: Auth0 Token Vault, Auth0 FGA, Auth0
  // MCP Authorization, CIBA. Most common incumbent: homegrown (48%).
  // Key proof points: Filevine (FGA for 80B docs), CARFAX (~3M FGA hits/day).
  // ─────────────────────────────────────────────────────────────────────────
  'customer-facing-ai-agents': {
    cotmView: [
      {
        id: 'pbo',
        name: 'Positive Business Outcomes',
        description:
          'Uncover the business value the customer expects from deploying trusted, authorized customer-facing AI agents — reduced fraud exposure, increased customer trust, and confident agentic automation.',
        questions: [
          'What\'s the business case for deploying customer-facing AI agents in the first place — cost reduction, CSAT improvement, revenue growth — and how does the security story either accelerate or block that case internally? We see most teams stalled because custom JWT systems hit agent-specific walls when they try to scale.',
          'When your AI agent acts on behalf of a customer — connecting to their Gmail, their GitHub, their calendar — how does the agent prove to that external service that it\'s authorized to act for that specific user? This is the core delegation problem that homegrown solutions struggle with.',
          'If you could fully automate the top-10 high-value customer service actions through your AI agent — account changes, claims processing, refunds — what\'s the revenue or cost impact? Filevine built an AI legal chatbot that requires authorization across 80 billion documents using Auth0 FGA. CARFAX runs ~3 million authorization hits per day for consumer-facing agents.',
          'How many distinct teams in your engineering organization are building AI agents right now, and do they all follow the same identity and access pattern? We see fragmentation as the most common blocker — 5 teams building 5 different auth approaches.',
          'For high-stakes actions — like an agent deleting a file, sending a message on behalf of a customer, or modifying an account — does the agent just go ahead and do it, or does a human have to approve first? Human-in-the-loop async authorization is one of the most common unsolved problems we hear about.',
        ],
      },
      {
        id: 'required-capabilities',
        name: 'Required Capabilities',
        description:
          'Identify the specific identity and authorization capabilities needed to make customer-facing AI agents trustworthy — consent flows, scoped credentials, and delegated authorization.',
        questions: [
          'When your AI agent executes an action on behalf of a customer — initiating a refund, changing account settings, submitting a support ticket — what\'s the authorization mechanism that actually governs that action? Is it a session token from the customer\'s login, a hardcoded service credential, or something more granular? Most teams we talk to are using session-inherited permissions with no per-action scoping.',
          'For high-risk agent actions — large transactions, PII exports, account closure — is there any step-up consent mechanism today, or does the agent operate on whatever permissions were granted at initial login? CIBA enables async human approval without blocking the agent\'s execution thread — this is the mechanism most teams are missing.',
          'When your AI agents query your data to generate responses — for a chatbot or copilot — how do you ensure the agent only returns data the requesting user is actually authorized to see? RAG authorization is one of the fastest-growing pain points — without FGA at the document level, RAG pipelines return data users shouldn\'t see.',
          'What\'s your plan for connecting AI agents to MCP servers? Have you started thinking about how to authenticate and authorize those connections? As one customer told us: "People are chomping at the bit for MCP — we\'re like slow down it\'s very unsecure." MCP connections are being opened without auth controls.',
          'When you need to add a new capability to your AI agent that requires access to a new backend system, how long does that integration take? Auth0 Token Vault manages 30+ third-party API tokens automatically — the goal is shipping agentic apps in days, not months.',
        ],
      },
      {
        id: 'success-metrics',
        name: 'Success Metrics',
        description:
          'Define the measurable outcomes that would prove the customer-facing AI agent program is both effective and trustworthy — deflection rates, consent coverage, and dispute resolution time.',
        questions: [
          'How are you currently measuring the effectiveness of your customer-facing AI agent — deflection rate, CSAT, handle time — and is "agent-related security incidents" or "unauthorized action disputes" anywhere in that scorecard?',
          'If you could demonstrate to enterprise customers that your AI agent operates under verifiable, scoped authorization — would that metric translate directly into sales velocity or contract requirements satisfied?',
          'What would a successful fraud or impersonation prevention metric look like for your AI agent program — is there a target for zero unauthorized actions, or a response time target for detecting and revoking compromised agent sessions?',
          'How do you measure customer trust in your AI agent today — and is there a gap between what customers assume about the security of agent-driven actions versus what\'s actually enforced?',
          'Twelve months from now, what does a "mature" customer-facing AI agent security posture look like in measurable terms — full consent coverage, complete audit trails, sub-hour incident response for agent compromise?',
        ],
      },
      {
        id: 'before-after',
        name: 'Before / After Scenarios',
        description:
          'Contrast the current state of implicit, session-based agent authorization with explicit, scoped, auditable delegated authorization for every customer-facing agent action.',
        questions: [
          'Today, when a customer disputes an action your AI agent took — a charge they didn\'t authorize, a setting that was changed — what\'s your evidence trail? Can you reconstruct that the agent was properly authorized to take that action, and how long does that investigation take?',
          'Right now, if your AI agent\'s credentials were compromised, how quickly would you detect it, and what\'s the blast radius — could a bad actor use those credentials to take actions across thousands of customer accounts before you shut it down?',
          'Compare your current state — where agent authorization is probably inherited from the customer\'s session or hardcoded to a service account — to a state where every agent action is tied to a specific delegated grant, scoped to a specific customer context. What changes in your fraud posture, your audit capability, and your enterprise sales conversations?',
          'Before implementing proper agent identity: a customer calls to dispute a transaction their AI assistant initiated. Your support team has no way to verify whether the agent had explicit consent. After: walk me through how that same call resolves differently.',
          'What does customer consent for AI agent actions look like today — is it buried in terms of service, confirmed at onboarding, or explicitly requested per action — and where does that fall short of what customers and regulators are going to expect in the next 12-24 months?',
        ],
      },
      {
        id: 'decision-process',
        name: 'Decision Process',
        description:
          'Uncover the stakeholders, regulatory pressures, and competitive drivers that determine how and when the organization commits to securing its customer-facing AI agent program.',
        questions: [
          'Who owns the security posture of your customer-facing AI agent — is it your security team, your product team, a dedicated AI/ML platform team, or is this genuinely ungoverned today?',
          'Are there regulatory requirements — CFPB guidance, GDPR Article 22, PSD2, state AI laws — that are already forcing you to address the authorization and consent story for your AI agents, or is this proactive?',
          'When your enterprise customers ask due diligence questions about how your AI agent is authorized and audited — in vendor security questionnaires, in procurement reviews — what\'s the answer today, and where does it fall short?',
          'Are you considering building your own agent authorization layer, buying a dedicated solution, or extending your existing CIAM platform — and what\'s driving that build vs. buy calculus?',
          'What would a successful 60-day evaluation look like — is it a technical POC proving the consent and delegation flows work, a compliance mapping exercise, or an enterprise customer reference you can point to?',
        ],
      },
    ],
    flowView: [
      {
        id: 'ciam-opening',
        section: 'Opening',
        questions: [
          'Set the stage for me — when you talk about your customer-facing AI agent, are we talking about a chatbot that handles FAQ traffic, a full agentic workflow that takes transactional actions, or somewhere on the spectrum between? The identity requirements are very different depending on where you are on that spectrum.',
          'How far along is the deployment — is this live in production serving real customers, in pilot with a subset, or still in design and build phase? And how are you currently handling auth — is it homegrown JWT, a managed service, or still figuring it out? 48% of the customer-facing agent accounts we talk to are running custom auth.',
          'What triggered this conversation specifically — are you hitting walls with your current auth approach as you try to scale? Most teams start building custom auth for their first 2-3 agent integrations and then hit a wall at integration 4-5 when the maintenance burden becomes unsustainable.',
        ],
      },
      {
        id: 'ciam-pain',
        section: 'Pain Exploration',
        questions: [
          'When your AI agent executes an action on behalf of a customer — say, initiating a refund or changing account settings — does the customer explicitly consent to that specific action, or is it assumed from the original login session?',
          'If a customer later disputed an action taken by your AI agent, what\'s your evidence trail that the agent was properly authorized to take that action — not just that the customer was logged in, but that they granted the agent specific permission?',
          'Has your team run a threat model specifically for agent impersonation — a scenario where someone spoofs your agent or hijacks an agent session to take unauthorized actions across customer accounts? What came out of that exercise?',
        ],
      },
      {
        id: 'ciam-impact',
        section: 'Business Impact',
        questions: [
          'If an unauthorized agent action — or a fraudulent agent impersonating yours — resulted in financial losses for customers, what\'s the liability exposure and how does that compare to the cost of closing the gap?',
          'How much of your enterprise pipeline has stalled or slowed because prospects are asking security questions about your AI agent that you can\'t fully answer today — around authorization, audit logs, or data access scoping?',
          'What\'s the relationship between your AI agent\'s security posture and customer retention — if customers lost trust in the agent because of a visible incident, what\'s the downstream revenue impact?',
        ],
      },
      {
        id: 'ciam-technical',
        section: 'Technical Reality',
        questions: [
          'What\'s the current credential model for your AI agent authenticating to your backend APIs — is it an API key, an OAuth client, a shared service account — and how are those credentials managed and rotated?',
          'When you think about the delegated authorization problem — the agent needs to act as the customer but only within specific bounds — how close is your current CIAM platform to supporting that natively, and where does it break down?',
          'If I described a flow where the customer grants the agent a scoped, time-limited token for a specific action, the agent uses that token for exactly that action, and the whole thing is logged immutably — what would it take to build that on your current stack versus getting it out of the box?',
        ],
      },
      {
        id: 'ciam-decision',
        section: 'Decision Process',
        questions: [
          'Who are the key stakeholders for a decision like this — I\'d expect a product owner for the agent, a security architect, and probably a CISO or VP Eng for anything touching customer data. Is that roughly the map, or are there others?',
          'Is there a budget conversation that needs to happen, or is there already a line item for customer-facing AI agent infrastructure that this could fall under?',
          'What does your evaluation timeline look like — and is there a specific compliance deadline, product launch date, or enterprise customer commitment that creates a hard constraint on when this needs to be solved?',
        ],
      },
      {
        id: 'ciam-next-steps',
        section: 'Next Steps',
        questions: [
          'If we scoped a POC around your highest-risk agent action — the one where an unauthorized execution would be most damaging — and demonstrated explicit consent, scoped delegation, and a full audit trail, would that be the right starting point?',
          'Would it be valuable to do a quick architecture review with your platform team — mapping your current agent auth flow against what a mature delegated authorization model looks like and identifying the gaps?',
          'Who should we loop in for the next conversation — is it worth getting your security architect and your product lead for the agent in the same room so we can go deeper on the technical design?',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // USE CASE 3: 3rd Party AI Governance
  // Key pain: vendor AI agents operating with valid credentials and no
  // centralized governance. Insurance/FinServ verticals: regulators are
  // starting to ask about third-party AI agent audit trails. No gold standard
  // published yet — positioning opportunity for "we help you define it."
  // ─────────────────────────────────────────────────────────────────────────
  '3rd-party-ai-governance': {
    cotmView: [
      {
        id: 'pbo',
        name: 'Positive Business Outcomes',
        description:
          'Uncover the business value of bringing third-party AI agents under formal access governance — reduced vendor-introduced risk, audit defensibility, and incident response readiness.',
        questions: [
          'How many of your third-party SaaS vendors currently have an AI agent with access to your production environment — and can you answer that question off the top of your head, or would you need to go investigate?',
          'When a vendor\'s AI introduces a data breach or compliance violation, your legal and PR exposure depends on whether you had reasonable controls in place. What does "reasonable controls" look like in your current vendor AI governance posture?',
          'What\'s the business driver for getting this solved — is it a specific vendor relationship that\'s creating risk, a compliance framework requiring third-party AI oversight, or a board-level directive after watching what happened to peers in your industry?',
          'If you could give your CISO a real-time dashboard showing every third-party AI agent with access to your systems, what they can read or write, and whether any of their actions look anomalous — how does that change your risk posture conversation at the exec level?',
          'What would it be worth to your procurement and legal teams to be able to enforce AI governance requirements contractually and technically — not just "we have a clause in the MSA" but "their agent literally cannot exceed these permissions"?',
        ],
      },
      {
        id: 'required-capabilities',
        name: 'Required Capabilities',
        description:
          'Identify the specific controls needed to manage, scope, audit, and revoke third-party AI agent access within the enterprise environment.',
        questions: [
          'When a vendor\'s AI agent accesses your systems, what limits what it can read or write today — is that enforced at the identity layer with scoped credentials, at the network layer, or is it essentially just contractual with no technical enforcement?',
          'Do you have a centralized registry of every third-party AI agent with access to your environment — something that tells you the agent\'s identity, the credentials it\'s using, the systems it has access to, and the last time it was reviewed?',
          'If a vendor\'s AI agent needed to be immediately revoked — say, the vendor had a security incident, or you ended the relationship — how long would that take today, and how confident are you that you\'ve revoked all of its access vectors?',
          'When your security team reviews vendor access during periodic access certifications, are AI agents included in that review, or are they invisible because they\'re sitting outside your human identity governance processes?',
          'For vendor AI agents that have write access to your systems — ERP, CRM, data warehouse — what\'s the mechanism that prevents them from accessing data outside the specific tenant, customer set, or dataset they\'re authorized for?',
        ],
      },
      {
        id: 'success-metrics',
        name: 'Success Metrics',
        description:
          'Define the measurable outcomes that prove third-party AI governance is working — inventory completeness, access review coverage, and mean-time-to-revoke.',
        questions: [
          'If you ran a vendor AI agent inventory today, what percentage coverage do you think you\'d have — and what\'s the target percentage that would give your CISO enough confidence to say the program is effective?',
          'What\'s your current mean-time-to-revoke for a third-party agent access when an incident is declared — and what\'s the target that would satisfy your incident response SLA?',
          'How are you measuring whether third-party AI agents are operating within their authorized scope — is there active monitoring, periodic review, or is "no news is good news" the current model?',
          'When your third-party risk management team completes a vendor review, what evidence do you collect to demonstrate that the vendor\'s AI agent is least-privileged and auditable? What does that evidence package look like today versus what it should look like?',
          'What metric would demonstrate ROI on a third-party AI governance program to your CFO — reduced vendor risk assessment time, faster vendor offboarding, audit findings avoided, or something else?',
        ],
      },
      {
        id: 'before-after',
        name: 'Before / After Scenarios',
        description:
          'Contrast the current state of opaque, contractually-governed vendor AI access with a technically-enforced, auditable, revocable third-party agent governance model.',
        questions: [
          'Picture this scenario today: a vendor\'s AI agent that has read access to your customer database has been quietly exfiltrating records for 60 days using valid credentials. Walk me through how you detect that, scope the damage, and contain it — honestly, not aspirationally.',
          'Today, when a vendor relationship ends, how do you ensure the vendor\'s AI agent credentials are actually revoked versus sitting dormant and potentially misusable? What\'s the failure mode there and how often does it happen?',
          'Right now, if a regulator asked you to produce a complete list of every non-human identity — including vendor AI agents — with access to your systems, along with what they accessed and when, how long would that take and how confident would you be in the completeness?',
          'Before a proper governance solution: your SOC detects an anomalous API call from a vendor\'s AI agent at 2am. Your team doesn\'t know what the agent is, what it\'s supposed to do, or how to scope the blast radius. After: how does that same incident response play out?',
          'What does "least privilege" actually mean for vendor AI agents in your current environment — is it a theoretical principle you endorse or something that\'s technically enforced right now, and what\'s the gap between those two states?',
        ],
      },
      {
        id: 'decision-process',
        name: 'Decision Process',
        description:
          'Uncover the stakeholders, compliance drivers, and organizational dynamics shaping the decision to invest in third-party AI agent governance.',
        questions: [
          'Who in your org owns the intersection of third-party risk management and AI governance — is that a unified function, or is it split between your TPRM team, your security team, and your legal team without a clear DRI?',
          'Are there specific compliance frameworks driving this — NIST AI RMF, ISO 42001, SOC 2 AI addendums, or sector-specific requirements — that are creating a hard deadline for having third-party AI governance controls documented and tested?',
          'When vendors ask "what are your AI governance requirements for our agent integration," what\'s your current answer — and is there a gap between what you tell vendors and what you can actually technically enforce?',
          'Have you evaluated any solutions specifically for non-human identity or third-party agent governance, or is this conversation part of the early market scan? Understanding where you are in the process shapes how we can be most useful.',
          'If we could demonstrate that third-party AI agents can be registered, scoped, monitored, and revoked from your existing Okta tenant without requiring the vendor to rearchitect their integration — what stakeholders would need to validate that claim before it could influence a purchase decision?',
        ],
      },
    ],
    flowView: [
      {
        id: 'tpag-opening',
        section: 'Opening',
        questions: [
          'When you think about third-party AI agent risk, what\'s the vendor relationship or the specific integration that comes to mind first — the one where you\'d be most concerned if the agent were doing something it shouldn\'t?',
          'How did this problem get on your radar — was it a vendor audit finding, an internal security review, a regulatory inquiry, or a peer organization\'s incident that made you think "that could be us"?',
          'Just to calibrate: are you dealing with a handful of known vendor AI integrations you want to govern better, or is this more of an unknown-unknowns problem where you don\'t have full visibility into how many vendor agents are operating in your environment?',
        ],
      },
      {
        id: 'tpag-pain',
        section: 'Pain Exploration',
        questions: [
          'When a vendor\'s AI agent accesses your systems, what limits what it can read or write — is that enforced at the identity layer, or is the access boundary essentially defined by whatever the vendor chose to request when they set up the integration?',
          'Walk me through your current process for reviewing and certifying vendor AI agent access — is it included in your periodic access reviews, handled separately by your TPRM team, or is it effectively a gap right now?',
          'If I told you one of your vendor AI agents had been operating outside its authorized scope for the past 30 days — accessing data it shouldn\'t — what would your investigation look like and how quickly could you prove or disprove that claim?',
        ],
      },
      {
        id: 'tpag-impact',
        section: 'Business Impact',
        questions: [
          'If a vendor\'s AI agent caused a data breach affecting your customers, what\'s your liability exposure — and does your contracts and insurance position hold up if you can\'t demonstrate you had technical controls in place, not just contractual ones?',
          'What\'s the reputational and regulatory cost of a vendor-introduced AI breach versus a first-party breach — does the fact that it was a third-party agent reduce your exposure, or do your customers and regulators hold you to the same standard regardless?',
          'What\'s the opportunity cost of not having this solved — are there vendor AI integrations you\'re holding off on because you can\'t adequately govern the access, and what business value are you leaving on the table as a result?',
        ],
      },
      {
        id: 'tpag-technical',
        section: 'Technical Reality',
        questions: [
          'What credential model are vendor AI agents using to authenticate to your systems today — OAuth clients with specific scopes, API keys issued per integration, shared service accounts — and how are those credentials inventoried and managed?',
          'When you think about enforcing fine-grained authorization for a vendor agent — "this agent can read data for tenant A but not tenant B" — what would it take to implement that on your current stack, and where does it break down technically?',
          'How does your current SIEM or audit log infrastructure handle events generated by non-human identities like vendor AI agents — are they treated the same as human identity events, filtered out as noise, or not captured at all?',
        ],
      },
      {
        id: 'tpag-decision',
        section: 'Decision Process',
        questions: [
          'Who needs to be involved in a decision to implement vendor AI agent governance — your CISO, your TPRM lead, your platform/identity team, legal? And is there a single decision owner or a committee?',
          'Is there a budget already allocated for non-human identity or third-party risk tooling, or is this a new line item that needs to be justified? That shapes whether we\'re in a "build the business case" conversation or a "evaluate and decide" conversation.',
          'What does your timeline look like — is there a compliance deadline, a vendor contract renewal, or an internal security initiative that creates urgency around solving this in a defined window?',
        ],
      },
      {
        id: 'tpag-next-steps',
        section: 'Next Steps',
        questions: [
          'Would it be valuable to start with a vendor AI agent discovery exercise — mapping what\'s already in your environment, what credentials they\'re using, and what access they have — as the foundation for building the governance program?',
          'If we scoped a POC around your highest-risk vendor integration — the one with the broadest access or the most sensitive data — and demonstrated real-time monitoring, scoped authorization, and one-click revocation, would that be the right proof point to take to your CISO?',
          'Who should we include in the next technical conversation — is it worth getting your identity engineering lead and your TPRM team in the same session so we can map the solution to both the technical and the risk management requirements?',
        ],
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // USE CASE 4: AI Agent CIAM (Non-Human Identity Management)
  // 5 transcripts (Auth0 platform builders). Key pain: DCR client explosion
  // (one customer has 72,000 clients, mostly Claude Code, with no search/filter
  // in the UI — "700 pages worth of applications"). Auth0 FGA model limit
  // (20 per tenant) will be breached by enterprise AI builder platforms.
  // ─────────────────────────────────────────────────────────────────────────
  'ai-agent-ciam': {
    cotmView: [
      {
        id: 'pbo',
        name: 'Positive Business Outcomes',
        description:
          'Uncover the business value of replacing unmanaged service accounts and static API keys with a governed, lifecycle-managed non-human identity program.',
        questions: [
          'What\'s the strategic driver for solving non-human identity at scale right now — is it an audit finding, a security incident involving leaked credentials, the growth of your AI agent fleet, or pressure from your board or a regulator? For platform builders, the DCR client explosion is often the trigger — one customer went from manageable to 72,000 registered clients, mostly AI coding assistants, with no way to search or filter.',
          'If you had complete, accurate, real-time visibility into every non-human identity — service account, API key, bot user, AI agent — operating in your production environment, what decisions would you make differently tomorrow? As one developer described it: "There\'s 700 pages worth of applications — there\'s no search in the UI."',
          'When you think about the risk that service account sprawl and unrotated credentials represent, how do you quantify that risk internally? Credential-based breaches take 292 days on average to detect according to IBM/Ponemon 2024 — that\'s nearly 10 months of exposure from a single compromised machine credential.',
          'What would it mean for your engineering and security teams to stop fighting fires around compromised credentials or orphaned service accounts — what higher-value work gets unlocked? As one CEO told their AI team: "The core of AI is authorization at scale" — and that\'s the engineering capacity problem identity solves.',
          'How does your non-human identity posture affect your ability to pass enterprise customer security reviews? Cyber insurance carriers are increasingly requiring documented non-human identity governance as a condition of coverage or favorable rates. Is that a factor in your current renewal cycle?',
        ],
      },
      {
        id: 'required-capabilities',
        name: 'Required Capabilities',
        description:
          'Identify the specific capabilities required to discover, register, scope, rotate, and deprovision non-human identities at enterprise scale.',
        questions: [
          'If I asked you to pull a complete inventory of every non-human identity — service accounts, API keys, bot users, CI/CD pipeline credentials, AI agents — with access to your production systems right now, how confident are you in the accuracy and completeness of that list?',
          'What\'s your current mechanism for enforcing least privilege on service accounts — are you actively scoping them to minimum necessary permissions, or do they tend to accumulate permissions over time because it\'s easier to add than to remove?',
          'How are long-lived API keys and service account credentials managed today — is there a rotation policy, is it actually enforced, and how do you handle the cases where a key is hardcoded in an application and rotation would break something?',
          'When an AI agent needs to authenticate to multiple backend services — a database, an API gateway, a messaging system — how do you manage the credentials for each of those relationships without ending up with a sprawl of secrets the agent is carrying?',
          'What\'s your strategy for machine-to-machine authentication as your AI agent fleet scales — are you moving toward short-lived OAuth tokens, mTLS, or are you still largely relying on long-lived API keys that get issued and forgotten?',
        ],
      },
      {
        id: 'success-metrics',
        name: 'Success Metrics',
        description:
          'Define the measurable outcomes that prove a mature non-human identity program — complete inventory, enforced rotation, zero orphaned credentials.',
        questions: [
          'What does "solved" look like for your non-human identity program in 12 months — is it a specific inventory coverage percentage, a credential rotation compliance rate, a reduction in orphaned service accounts, or passing a specific audit or certification?',
          'How are you currently measuring credential hygiene for non-human identities — what\'s your ratio of long-lived static keys to short-lived dynamic tokens, and what\'s the target ratio you\'re working toward?',
          'When a service account is deprovisioned, how long does it take from the triggering event — project end, vendor offboard, system decommission — to confirmed revocation? What\'s the current average versus the target SLA?',
          'What compliance metric would demonstrate to your auditors that non-human identity is under control — a clean SIEM showing no credential anomalies, a 100% access review completion rate for machine identities, or a zero-finding credential audit?',
          'If you could report to your CISO that X% of your AI agents are using short-lived rotatable credentials with no hardcoded secrets in your codebase, what percentage would represent meaningful risk reduction versus the current state?',
        ],
      },
      {
        id: 'before-after',
        name: 'Before / After Scenarios',
        description:
          'Contrast the current state of service account sprawl and static credential debt with a governed, automated, lifecycle-managed non-human identity environment.',
        questions: [
          'Today, when a developer leaves or a project ends, what reliably ensures the service accounts and API keys associated with their work get deprovisioned — is there a process, or does it depend on someone\'s memory?',
          'Describe your current credential rotation story for AI agents and service accounts honestly — is it "we rotate on a schedule," "we rotate when we remember or when there\'s an incident," or something more ad hoc? What\'s the ratio of rotated to stale?',
          'Before proper NHI governance: a penetration tester finds a hardcoded API key in a GitHub repo that hasn\'t been rotated in 18 months and has admin-level access. Walk me through the incident response. After: how does that same discovery look different?',
          'Right now, if you needed to scope a service account\'s access to only the specific resources an AI agent needs for a given task — and then revoke that scope when the task is complete — what would that engineering effort look like versus just giving the agent broad static permissions?',
          'What does your current onboarding process look like when a new AI agent or automated system needs production access — how long does it take from "we need this agent to work" to "the agent has appropriate, least-privileged, auditable credentials," and what breaks along the way?',
        ],
      },
      {
        id: 'decision-process',
        name: 'Decision Process',
        description:
          'Uncover the organizational dynamics, budget context, and technical stakeholders that will drive the decision to invest in enterprise-scale non-human identity management.',
        questions: [
          'Who owns non-human identity in your organization — is there a clear owner between your platform engineering team, your security team, and your IAM/identity team, or is it a gap that multiple teams acknowledge but nobody has formal accountability for?',
          'Is there a security or compliance initiative underway that\'s creating a forcing function here — a Zero Trust program, a NIST CSF alignment, a cyber insurance renewal with new requirements, a SOC 2 finding related to service account governance?',
          'When you think about the build versus buy decision for NHI management, what\'s the calculus — do you have the engineering bandwidth to build a secrets management and lifecycle solution in-house, or is the priority getting to a solution faster than you could build it?',
          'What does the competitive landscape look like from your perspective — are you evaluating dedicated secrets managers, your existing IdP\'s service account capabilities, a PAM solution, or something purpose-built for AI agent identities?',
          'If we could demonstrate that your existing Okta tenant can serve as the system of record for all non-human identities — with automated lifecycle, scoped OAuth tokens, and a full audit trail — who would need to be in the room to evaluate that claim and how quickly could we get that conversation scheduled?',
        ],
      },
    ],
    flowView: [
      {
        id: 'nhi-opening',
        section: 'Opening',
        questions: [
          'When you think about non-human identity at your organization — service accounts, API keys, automated agents — what\'s the scale we\'re talking about? Hundreds, thousands, or is it genuinely unknown because nobody has a complete count?',
          'What brought this to a head right now — is there a specific incident, an audit finding, a compliance requirement, or a strategic AI initiative that\'s forcing the non-human identity problem to the top of the list?',
          'Who\'s in the room for this conversation — I want to make sure I\'m pitching to the right level of abstraction. Are we doing an executive-level business case conversation, a technical deep dive on the architecture, or somewhere in between?',
        ],
      },
      {
        id: 'nhi-pain',
        section: 'Pain Exploration',
        questions: [
          'If I asked you to pull a complete inventory of every service account and machine credential with access to your production environment right now — not aspirationally, but what you could actually produce in the next hour — how complete would that list be?',
          'When a service account or machine identity is no longer needed — a project ends, a vendor offboards, a system is decommissioned — what\'s the process for deprovisioning it, and how often does that process actually execute versus leaving orphaned credentials sitting in the environment?',
          'Where are your AI agents\' secrets and credentials living right now — in a secrets manager, in environment variables, hardcoded in configuration files, or some mix of all of the above — and how many of those credentials haven\'t been rotated in the last 90 days?',
        ],
      },
      {
        id: 'nhi-impact',
        section: 'Business Impact',
        questions: [
          'What\'s the cost of a credential compromise at your organization — not just the breach remediation, but the engineering time, the customer notification requirements, the audit findings, and the reputational damage to your enterprise customers who trusted you with their data?',
          'How much engineering time is your team spending managing the lifecycle of service accounts and API keys manually — provisioning, rotating, auditing, deprovisioning — and what\'s the opportunity cost of that time versus shipping product?',
          'Cyber insurance carriers are increasingly requiring documented non-human identity governance as a condition of coverage or favorable rates. Is that a factor in your current renewal cycle, and how does your current posture hold up against those requirements?',
        ],
      },
      {
        id: 'nhi-technical',
        section: 'Technical Reality',
        questions: [
          'Walk me through the authentication mechanism your AI agents use to talk to your backend systems today — are you using OAuth client credentials, mTLS, static API keys, or a mix, and what does the credential rotation story look like for each?',
          'When you think about fine-grained authorization for AI agents — the ability to say "this agent can access records for customer A but not customer B, and only for read operations" — where does your current authorization layer break down and what would it take to implement relationship-based access control at that granularity?',
          'How does your current developer experience for provisioning agent credentials interact with your security requirements — is the secure path also the easy path, or do developers work around the controls because the governed option adds friction?',
        ],
      },
      {
        id: 'nhi-decision',
        section: 'Decision Process',
        questions: [
          'Who are the key technical and business stakeholders for this decision — your IAM team, your platform security lead, your CISO, your VP Engineering — and is there a single economic buyer or does this cut across multiple budget owners?',
          'What does the evaluation process look like from here — is there a formal RFP, an internal proof of concept requirement, a security architecture review, or is this at the stage where you\'re still building the business case before any formal process kicks off?',
          'What would need to be true about a solution for your platform and security teams to jointly recommend it — specific integration requirements with your existing stack, a particular deployment model, reference customers in your industry, or something else?',
        ],
      },
      {
        id: 'nhi-next-steps',
        section: 'Next Steps',
        questions: [
          'Would it make sense to start with a non-human identity discovery exercise — using Okta to enumerate what machine identities already exist in your environment, what they have access to, and where the biggest credential hygiene gaps are — as the foundation for the business case?',
          'If we scoped a 30-day POC focused on a specific AI agent or service account cluster — demonstrating automated registration, short-lived credential issuance, and lifecycle management — what team would need to own that POC and what would their success criteria be?',
          'What\'s the right next meeting — should we get your identity engineering team and your security architect together for a technical architecture session, or is the priority getting your CISO a one-pager on the business case before going deeper on technical design?',
        ],
      },
    ],
  },
};
