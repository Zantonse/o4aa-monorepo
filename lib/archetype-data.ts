// Customer Intelligence — Archetype Data
// Auto-generated from 743 Gong transcripts (March 2026)
// 306 AI-related calls → 279 in 17 viable archetypes
//
// DO NOT EDIT MANUALLY — regenerate by re-running the synthesis pipeline

import type { CustomerArchetype, Industry, ArchetypeUseCase } from './archetype-types';

export const ARCHETYPES: CustomerArchetype[] = [
  {
    "id": "technology-workforce-ai-agents",
    "industry": "technology",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 77,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "500-50,000 employees (median ~2,000-5,000); includes hyperscalers and startups",
      "aiMaturity": "Early-to-mid experimentation; 10-500+ agents in environment, most ungoverned; many have CEO or exec mandates driving rapid AI adoption ahead of security",
      "triggerEvent": "CEO/exec mandate to adopt AI everywhere, a shadow AI incident (data leakage, unauthorized access, rogue agent), GA announcement of O4AA (April 30 2026), or a security/compliance audit that surfaced NHI gaps",
      "buyingMotion": "Security-led (CISO, Head of Security, or Director of InfoSec) with IT/IAM as evaluator; occasionally engineering-led when the pain is technical credential management",
      "typicalBudgetHolder": "CISO or VP IT; some deals require CISO sign-off even when IT initiates; early adopter deals are often expansion on existing Okta ELA"
    },
    "stakeholders": [
      {
        "role": "CISO / Head of Security / Director of Information Security",
        "frequency": 0.62,
        "whatTheyCareAbout": [
          "Stopping a shadow AI incident before it becomes a breach",
          "Audit trail and accountability \u2014 who did what on whose behalf",
          "Kill switch capability for rogue agents",
          "Compliance readiness (SOX, PCI, SOC 2) for non-human identities",
          "Not blocking innovation while building guardrails"
        ],
        "typicalQuestions": [
          "How do we force all agent traffic through Okta \u2014 not just make it optional?",
          "If an agent goes rogue, can we kill it instantly across all connected systems?",
          "Can you prove to our auditors what every agent accessed last quarter?",
          "We don't know how many agents we have. Can you help us find them?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "VP IT / Director IT / IT Manager",
        "frequency": 0.58,
        "whatTheyCareAbout": [
          "Practical deployment \u2014 what requires managed browsers, MDM, or client changes",
          "Reducing tool sprawl and operational burden",
          "Tying agent lifecycle to HR offboarding (no orphaned agents)",
          "Not adding another tool that nobody uses"
        ],
        "typicalQuestions": [
          "Can this work without forcing managed Chrome on all users?",
          "When someone leaves the company, do their agents die too?",
          "How much implementation work does this take?",
          "Can we buy this standalone or does it require the full ISPM/OIG bundle?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Principal / Senior IAM Engineer",
        "frequency": 0.48,
        "whatTheyCareAbout": [
          "Technical feasibility \u2014 does the OAuth model actually work for their agent architecture",
          "How service accounts and PATs get replaced or vaulted",
          "Agent-to-agent delegation and token chaining",
          "Whether cross-app access standard is adopted by the apps they use"
        ],
        "typicalQuestions": [
          "How do ephemeral agents that spin up and die in seconds get registered?",
          "What happens to agents using personal access tokens \u2014 are those covered?",
          "Can the scope be attenuated so an agent gets less privilege than the user who launched it?",
          "Does this work for agents making direct API calls, not just MCP?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "VP Engineering / Engineering Manager / Software Engineer",
        "frequency": 0.35,
        "whatTheyCareAbout": [
          "Not slowing down agent development velocity",
          "Frictionless credential management that doesn't require developers to change how they work",
          "Token vaulting so hardcoded secrets disappear",
          "A paved path that makes secure behavior the default, not an obstacle"
        ],
        "typicalQuestions": [
          "If Okta can make developers more secure without making them slower, that's the win",
          "How do we handle agents in Docker containers that get rebuilt constantly?",
          "Can agents access internal Kubernetes services via short-lived tokens without browser interaction?",
          "What forces developers to use the gateway instead of going direct?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "CIO",
        "frequency": 0.18,
        "whatTheyCareAbout": [
          "Executive visibility \u2014 a dashboard showing what's running in the environment",
          "Governance that keeps pace with CEO-mandated AI adoption",
          "Consolidation \u2014 reducing the number of security tools",
          "Board-level accountability for AI agent risk"
        ],
        "typicalQuestions": [
          "When my CEO says everyone builds an AI agent this quarter, how do I govern that without being the blocker?",
          "Can I get a single pane of glass across all our AI agents?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "AI Technology Lead / AI Platform Engineer / Lead DevSecOps",
        "frequency": 0.22,
        "whatTheyCareAbout": [
          "Technical architecture alignment \u2014 how O4AA fits their agent stack",
          "Multi-cloud token management (GCP, AWS, Azure)",
          "Agent-to-agent orchestration and delegation chains",
          "SDK-level integration with their chosen agent frameworks"
        ],
        "typicalQuestions": [
          "Does this work with LangChain agents running on EC2?",
          "Can one user login persist across a whole ecosystem of agents without re-auth?",
          "How do I restrict per-agent scope when the orchestrator has broad access?"
        ],
        "influenceLevel": "champion"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "We don't know how many AI agents are running in our environment, what they're accessing, or who authorized them",
        "frequency": 0.87,
        "severity": "critical",
        "exampleQuote": "We don't know how many agents we have. That's the problem. We went from zero AI at about mid-December to AI everywhere with mandates."
      },
      {
        "id": "pp-2",
        "statement": "Employees are spinning up AI agents using personal accounts, shared API keys, and hardcoded secrets \u2014 and when they leave the company, those agents keep running",
        "frequency": 0.82,
        "severity": "critical",
        "exampleQuote": "When we terminate someone, we terminate all of their API keys of the bot... we have no way to manage that."
      },
      {
        "id": "pp-3",
        "statement": "Agents act on behalf of users but inherit full user permissions \u2014 there's no way to give an agent a subset of what the user can do",
        "frequency": 0.74,
        "severity": "critical",
        "exampleQuote": "Agent did something wrong. They deleted data. We can't even differentiate if an agent did it or a user did it."
      },
      {
        "id": "pp-4",
        "statement": "There's no audit trail. When an agent does something \u2014 accesses data, makes a change \u2014 we can't trace it back to the user who launched it",
        "frequency": 0.71,
        "severity": "critical",
        "exampleQuote": "We want to be able to trace back: this identity led to what operations led to what events and what happened."
      },
      {
        "id": "pp-5",
        "statement": "MCP servers are being built for every SaaS tool and users are connecting agents without any governance \u2014 it's the wild west",
        "frequency": 0.65,
        "severity": "high",
        "exampleQuote": "It's the wild west. We're not blocking any agent installations. People don't understand what permissions they need."
      },
      {
        "id": "pp-6",
        "statement": "Long-lived API keys, PATs, and service account credentials are being handed to agents \u2014 there's no rotation, no expiration, and if one leaks everyone's exposed",
        "frequency": 0.61,
        "severity": "high",
        "exampleQuote": "This was a big no-no \u2014 someone was actually embedding the Salesforce client ID and client secret in a Google Sheets Apps Script that could have been shared broadly."
      },
      {
        "id": "pp-7",
        "statement": "Ephemeral agents that spin up and terminate in seconds are impossible to track \u2014 the lifecycle is too short to audit",
        "frequency": 0.42,
        "severity": "high",
        "exampleQuote": "We spin them up very fast. Sometimes the life cycle is very short then the instance killed and sometimes we are missing the tracks of it, it's very hard to audit it later."
      },
      {
        "id": "pp-8",
        "statement": "We can't force all agent traffic through Okta \u2014 developers can always go direct to the API or install local MCP servers that bypass governance",
        "frequency": 0.39,
        "severity": "high",
        "exampleQuote": "How do we force people to use Okta with their MCP servers? All MCP servers everywhere have to funnel through Okta. How do we accomplish that?"
      },
      {
        "id": "pp-9",
        "statement": "The ISPM browser plugin requires managed Chrome \u2014 most of our users can choose their own browser and we can't enforce managed browsers without a political fight",
        "frequency": 0.35,
        "severity": "moderate",
        "exampleQuote": "People are just so very touchy about their environments... when we started getting into managed browsers, people thinking like, are you essentially spying on all of my traffic."
      },
      {
        "id": "pp-10",
        "statement": "We have hundreds of agents already running rogue \u2014 we need to bring existing ungoverned agents under management without starting over",
        "frequency": 0.31,
        "severity": "moderate",
        "exampleQuote": "100,000 agents running rogue today \u2014 can we import them into Okta without starting over?"
      }
    ],
    "goals": [
      {
        "statement": "Discover and inventory every AI agent in the environment \u2014 known and shadow",
        "frequency": 0.88,
        "successMetric": "Percentage of active agents with a registered identity in Universal Directory; reduction in unknown OAuth grants per week"
      },
      {
        "statement": "Kill switch \u2014 instantly revoke an agent's access across all connected systems when it goes rogue or its owner leaves",
        "frequency": 0.72,
        "successMetric": "Time from revocation trigger to full access revocation across all connected apps"
      },
      {
        "statement": "Tie agent identity and lifecycle to the human who owns it \u2014 when the employee is offboarded, their agents are too",
        "frequency": 0.68,
        "successMetric": "Percentage of agents with a named human owner; time to deprovision agent after employee departure"
      },
      {
        "statement": "Maintain a full audit trail \u2014 every agent action traceable back to the user who initiated it",
        "frequency": 0.65,
        "successMetric": "Percentage of agent-initiated transactions with full user lineage in audit logs"
      },
      {
        "statement": "Replace hardcoded secrets and long-lived API keys with short-lived, vaulted credentials that agents retrieve at runtime",
        "frequency": 0.58,
        "successMetric": "Number of long-lived credentials eliminated; rotation frequency for agent credentials"
      },
      {
        "statement": "Scope attenuation \u2014 agents should only get a subset of the user's permissions, never the full set",
        "frequency": 0.54,
        "successMetric": "Percentage of agents with scopes narrower than their delegating user; reduction in over-privileged agent access events"
      },
      {
        "statement": "Build a paved path so developers can build AI agents securely by default \u2014 governance that enables speed, not blocks it",
        "frequency": 0.45,
        "successMetric": "Developer time to spin up a governed agent; reduction in security-related agent deployment blockers"
      },
      {
        "statement": "Access certification campaigns for AI agents \u2014 periodic reviews of what each agent can access and whether it still should",
        "frequency": 0.38,
        "successMetric": "Agent certification cycle completion rate; reduction in stale agent entitlements"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA) \u2014 Core SKU",
        "relevance": "primary",
        "rationale": "The product directly addresses the top 4 pain points: agent discovery, lifecycle management, kill switch, and audit trail. Almost every signal mentions it.",
        "specificFeatures": [
          "Universal Directory AI Agents tab \u2014 register agents as first-class identities",
          "Managed Connections \u2014 governed agent-to-app connections",
          "Cross-App Access / ID-JAG token \u2014 scope-attenuated delegation preserving user context",
          "Workload Principal \u2014 non-human identity with lifecycle management",
          "Universal Logout / Kill Switch \u2014 instant cross-app revocation"
        ],
        "frequency": 0.96
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management) \u2014 Shadow AI Discovery",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is the second-most cited need. ISPM browser plugin is the primary discovery mechanism, though managed Chrome dependency is a friction point in ~35% of accounts.",
        "specificFeatures": [
          "Browser plugin for OAuth grant detection",
          "Shadow AI agent discovery across known SaaS platforms",
          "Non-human identity posture assessment",
          "Agent risk scoring and registration workflow"
        ],
        "frequency": 0.78
      },
      {
        "product": "Agent Gateway / MCP Adapter",
        "relevance": "primary",
        "rationale": "Consistently cited as the 'missing piece' \u2014 customers want to force all MCP traffic through a centralized enforcement point. Currently PS-delivered; roadmap item for productization.",
        "specificFeatures": [
          "Centralized MCP server proxy",
          "Enforce authentication for all MCP connections",
          "Block unauthorized local MCP server installations",
          "Policy-based MCP access control"
        ],
        "frequency": 0.52
      },
      {
        "product": "Okta Identity Governance (OIG) \u2014 Agent Certification",
        "relevance": "secondary",
        "rationale": "Approximately half of accounts want periodic access reviews for agents \u2014 same JML lifecycle as humans. Often bundled in the AI conversation for customers who don't already own OIG.",
        "specificFeatures": [
          "Access certification campaigns for AI agent identities",
          "Entitlement management for agent scopes",
          "Access request catalog for agent provisioning",
          "Integration with HR system for agent offboarding triggers"
        ],
        "frequency": 0.48
      },
      {
        "product": "Okta Privileged Access (OPA) \u2014 Credential Vault for Agents",
        "relevance": "secondary",
        "rationale": "Long-lived PATs, API keys, and service account credentials used by agents are a critical gap. OPA/Token Vault is the right answer when Cross-App Access isn't supported by the target app.",
        "specificFeatures": [
          "Vaulted credential retrieval for agents at runtime",
          "Rotation of service account passwords and API keys",
          "Least-privilege credential scoping per agent",
          "Audit trail for credential access by agent"
        ],
        "frequency": 0.44
      },
      {
        "product": "Identity Threat Protection (ITP) \u2014 Runtime Agent Monitoring",
        "relevance": "secondary",
        "rationale": "Kill switch and anomaly detection for agent behavior. Cited alongside universal logout as the mechanism to terminate rogue agents in real time.",
        "specificFeatures": [
          "Universal Logout integration for agent session termination",
          "Anomalous agent behavior detection",
          "Integration with CrowdStrike and Zscaler for cross-signal enforcement",
          "Risk-based access revocation for agents"
        ],
        "frequency": 0.35
      },
      {
        "product": "Auth0 for AI Agents \u2014 Token Vault and FGA",
        "relevance": "adjacent",
        "rationale": "Surfaces in multi-cloud scenarios where agents need vaulted third-party OAuth tokens (Google Workspace, AWS) or fine-grained authorization for RAG pipelines. Relevant when engineering teams are building agent platforms, not just consuming them.",
        "specificFeatures": [
          "Token Vault for third-party OAuth tokens (Google, Microsoft, generic OIDC)",
          "Fine-Grained Authorization (FGA) for document-level access control in RAG",
          "CIBA (human-in-the-loop) for high-stakes agent actions",
          "Auth0 M2M for agent-to-agent authentication"
        ],
        "frequency": 0.26
      }
    ],
    "competitiveContext": [
      {
        "competitor": "CrowdStrike (endpoint + AIDR)",
        "frequency": 0.18,
        "context": "Evaluated alongside Okta as part of a broader AI security stack (CrowdStrike for endpoint/detection, Okta for identity governance). Not a direct replacement \u2014 complementary positioning.",
        "differentiators": [
          "Okta governs identity and access; CrowdStrike detects endpoint threats \u2014 the integration story is Okta+CrowdStrike, not either/or",
          "Okta provides the audit trail and user attribution that endpoint tools cannot",
          "Kill switch via Universal Logout is identity-layer, not endpoint-layer \u2014 works even for cloud-native agents with no endpoint"
        ]
      },
      {
        "competitor": "HashiCorp Vault",
        "frequency": 0.13,
        "context": "Customers planning to buy Vault for secrets management discover O4AA/OPA can replace or complement it. Consolidation narrative is effective.",
        "differentiators": [
          "OPA credential vault is natively integrated with Okta identity \u2014 no separate tool to manage",
          "Agent lifecycle (onboarding, offboarding, certification) is built-in; Vault is only a secrets store",
          "Okta provides the identity layer that gives context to what is accessing the vault"
        ]
      },
      {
        "competitor": "Zscaler",
        "frequency": 0.1,
        "context": "Some customers use Zscaler for network-level AI traffic inspection. Evaluated for MCP gateway/funnel use case. Not a direct replacement for identity-layer governance.",
        "differentiators": [
          "Zscaler operates at network layer; Okta at identity layer \u2014 different enforcement points",
          "Okta provides agent identity and user attribution; Zscaler provides traffic inspection",
          "Integration story: Okta + Zscaler is stronger than either alone for full governance"
        ]
      },
      {
        "competitor": "Microsoft Entra ID + Copilot Studio",
        "frequency": 0.1,
        "context": "Microsoft-native customers with heavy M365/Copilot Studio adoption. Okta needs to explain why Entra alone is insufficient for AI agent governance across non-Microsoft platforms.",
        "differentiators": [
          "Okta governs agents across all platforms \u2014 not just Microsoft; Entra is Microsoft-first",
          "Neutral identity layer matters when agents span AWS, GCP, and third-party SaaS",
          "Okta's cross-app access standard works across vendors; Entra is proprietary to Microsoft ecosystem"
        ]
      },
      {
        "competitor": "SailPoint / Saviynt (IGA)",
        "frequency": 0.09,
        "context": "Existing IGA customers evaluating whether to extend SailPoint to govern AI agents, or add Okta as the AI-native identity layer. Netcracker, Cisco (SailPoint+Okta coexist), Sony (migrating off SailPoint).",
        "differentiators": [
          "Okta natively manages both human and AI agent identities in one directory \u2014 no connector overhead",
          "SailPoint requires custom integration for AI agent lifecycle; Okta O4AA is purpose-built",
          "Okta's real-time kill switch is not available in traditional IGA platforms"
        ]
      },
      {
        "competitor": "Niche AI governance tools (Porky, Ciata, Acuvity)",
        "frequency": 0.09,
        "context": "Startups providing AI-specific governance or shadow AI detection. Evaluated as point solutions before Okta's O4AA was announced. Okta's platform breadth is the counter.",
        "differentiators": [
          "Okta provides identity lifecycle, not just detection \u2014 discovery plus governance plus enforcement in one platform",
          "Okta is already the identity platform for most of these accounts \u2014 adding a niche tool adds integration overhead",
          "Okta's Universal Directory ensures AI agents are managed with the same platform as human identities"
        ]
      }
    ],
    "objections": [
      {
        "objection": "The ISPM browser plugin requires managed Chrome \u2014 we don't enforce a managed browser and we're not about to",
        "frequency": 0.35,
        "counterPosition": "The browser plugin is one discovery method, not the only one. ISPM also discovers agents through known platform integrations (Salesforce, Microsoft, GitHub) and OAuth grant analysis. An MDM-deployed lightweight agent is on the roadmap as an alternative to the browser plugin. Start discovery with what you have \u2014 managed Chrome for the subset of users who have it \u2014 and expand from there.",
        "evidenceSupport": "AppLovin, BeyondTrust, Snowflake, Shipmonk all raised this; roadmap item for MDM-deployed agent confirmed"
      },
      {
        "objection": "How do I force developers to use Okta's agent gateway when they can always go direct to the API?",
        "frequency": 0.32,
        "counterPosition": "This is correct \u2014 Okta cannot enforce at the network layer today. The enforcement model works in two ways: (1) at the resource level \u2014 apps that support Cross-App Access will only accept scoped tokens, forcing agents to go through Okta to get the right token; (2) through policy and culture \u2014 making the governed path easier than the unmanaged path. The Agent Gateway (GA roadmap) will make centralized funneling easier. Meanwhile, ISPM surfaces agents that bypass governance so you can address them.",
        "evidenceSupport": "BeyondTrust, Snowflake, WalkMe, Vercel all raised the enforcement gap explicitly"
      },
      {
        "objection": "The AI governance landscape is changing too fast \u2014 I don't want to commit to something that's outdated in 6 months",
        "frequency": 0.26,
        "counterPosition": "Fair. Okta is shipping weekly updates on O4AA \u2014 the product 4 weeks ago looked nothing like today. The underlying identity primitives (Universal Directory, OAuth, OIDC) are stable standards that won't change. You're buying a platform that builds on stable foundations, not a point tool that may not survive the AI governance market consolidation.",
        "evidenceSupport": "Cockroach Labs, Cloudbeds raised this; LiveRamp AE noted 'the product team is on a weekly shipping schedule'"
      },
      {
        "objection": "AI governance isn't in the current budget / isn't a top-3 priority yet",
        "frequency": 0.24,
        "counterPosition": "Your competitors are already in evaluation. The shadow AI incident you haven't had yet is the one that gets this to priority 1. The question is whether you want to govern this before or after an incident. Okta's early adopter pricing lets you start with your UD account at a fixed rate and true up to actual usage \u2014 lower barrier to start.",
        "evidenceSupport": "Manychat, Zello, Cockroach Labs raised budget/priority objections"
      },
      {
        "objection": "We already have tools for parts of this \u2014 HashiCorp Vault for secrets, CrowdStrike for detection \u2014 why add Okta?",
        "frequency": 0.22,
        "counterPosition": "Those tools solve adjacent problems. Vault stores secrets but doesn't know who the agent is, who launched it, or whether it should still have access. CrowdStrike detects endpoint threats but can't govern identity or produce an audit trail of agent actions tied back to users. Okta is the identity layer that ties all of this together \u2014 it doesn't replace those tools, it gives them context.",
        "evidenceSupport": "Armis (using Island, Ciata, Jamf), Unconventional AI (Wiz + Vault), BeyondTrust (CrowdStrike + Cloudflare)"
      },
      {
        "objection": "The pricing model \u2014 per agent-to-identity connection \u2014 is hard to predict when we could have thousands of agents and hundreds of MCP connections",
        "frequency": 0.21,
        "counterPosition": "The early adopter program is built for this uncertainty. You license based on your UD account size and get unlimited agent connections for one year, then true up to actual usage. This lets you discover the real scope before committing to a number. Okta is not trying to price-gouge on AI proliferation \u2014 the model is designed to grow with you.",
        "evidenceSupport": "WalkMe, Netcracker, Zello raised pricing predictability concerns"
      },
      {
        "objection": "The agent gateway / MCP adapter isn't a product yet \u2014 it's PS-delivered",
        "frequency": 0.19,
        "counterPosition": "Correct \u2014 the productized Agent Gateway is on the roadmap for Q2-Q3. Today, Professional Services can deploy the MCP adapter for your use case. If the gateway is blocking your purchase, the PS engagement is a way to start getting value now while waiting for GA. The Cisco POC and several others are running on PS-deployed adapters today.",
        "evidenceSupport": "Discord, 6Sense, Docker, Twilio all noted the PS-only status"
      },
      {
        "objection": "We're not sure Cross-App Access / ID-JAG will be adopted by the third-party apps we need \u2014 it's an emerging standard",
        "frequency": 0.18,
        "counterPosition": "You're right that not every app supports it yet. Okta is driving the standard and already has GitHub, Atlassian, and Microsoft in beta. For apps that don't yet support it, Token Vault and OPA credential vaulting cover the gap \u2014 agents retrieve short-lived credentials from the vault instead of carrying long-lived keys. The standard will expand; the vault covers the interim.",
        "evidenceSupport": "Uber, LinkedIn, Attentive raised third-party adoption gap"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents do you think are running in your environment today \u2014 and how many of those did IT actually authorize?",
        "callPhase": "opening",
        "rationale": "The gap between the answer to these two questions is the entire sales motion. Almost every account in this dataset discovered the gap was enormous. The question surfaces urgency without being accusatory."
      },
      {
        "question": "What happens to an AI agent's access when the employee who built it leaves the company?",
        "callPhase": "pain-exploration",
        "rationale": "This is the most visceral lifecycle gap. Stack Exchange, Proofpoint, and Cloudbeds described exactly this scenario. If the answer is 'nothing happens automatically,' the pain is immediate."
      },
      {
        "question": "If an AI agent accessed data it shouldn't have accessed last Tuesday, can you tell me which user launched it and what exactly it touched?",
        "callPhase": "pain-exploration",
        "rationale": "Audit trail is the second-most-cited pain. LinkedIn described exactly this failure mode \u2014 an agent deleted data and they couldn't determine if it was a user or an agent. The question makes the gap concrete."
      },
      {
        "question": "Are your agents using long-lived API keys, personal access tokens, or service accounts? What's your current process for rotating those?",
        "callPhase": "technical",
        "rationale": "The answer to this reveals credential hygiene and whether OPA/Token Vault or Cross-App Access is the right initial product motion. Almost universally, the answer reveals gaps."
      },
      {
        "question": "When a developer builds an agent today, what's the standard process for getting it approved, scoped, and governed? Or is there no standard process?",
        "callPhase": "pain-exploration",
        "rationale": "Reveals whether there's a paved path or complete chaos. Solidigm, Databricks, Redis all said 'no standard process.' This sets up the reference architecture conversation."
      },
      {
        "question": "Do you have a kill switch today \u2014 if an agent starts doing something unexpected, can you terminate it instantly across every system it's connected to?",
        "callPhase": "pain-exploration",
        "rationale": "Kill switch is cited in 72% of signals as a goal. If the answer is no, the impact is immediate \u2014 every active agent is a potential uncontrolled risk. Sets up ITP + Universal Logout."
      },
      {
        "question": "Are your developers using managed browsers, or can they install any browser they want? How does that affect your ability to monitor what AI tools they're using?",
        "callPhase": "technical",
        "rationale": "Surfaces the managed Chrome dependency for ISPM browser plugin early. If unmanaged browsers are the norm, sets expectation and pivots to alternative discovery methods."
      },
      {
        "question": "When your AI agents access internal systems or third-party SaaS, do they act as themselves or do they impersonate the user who launched them? And is there a record of which it was?",
        "callPhase": "technical",
        "rationale": "Surfaces the user attribution and scope attenuation gap. LinkedIn and Confluent described this failure mode in detail. Leads directly into Cross-App Access demo."
      },
      {
        "question": "Is there an executive mandate driving AI adoption \u2014 and has security been invited to that conversation, or are you trying to catch up?",
        "callPhase": "opening",
        "rationale": "BeyondTrust, Redis, Affinity, Cloudbeds, and others all had CEO or exec mandates driving AI adoption ahead of governance. Understanding this dynamic reveals urgency and the political landscape."
      },
      {
        "question": "Have you had any incidents or close calls with AI agents accessing data they shouldn't have \u2014 or do you just not know because you have no visibility?",
        "callPhase": "pain-exploration",
        "rationale": "Cision had RevOps gain access to financial records. Many accounts don't know because they have no audit trail. Either answer is a sales signal."
      }
    ],
    "proofPoints": [
      {
        "metric": "91% of organizations are deploying AI agents but more than half lack visibility into what their agents are doing",
        "source": "Okta survey, March 2026 \u2014 cited by Okta AEs in Cyberhaven and Discord calls",
        "confidence": "soft"
      },
      {
        "metric": "Organizations actively buying Okta for AI Agents span companies from 37 employees (Ayoka) to 100,000+ (Dell, Cisco, LinkedIn) \u2014 the pain is not size-dependent, it's AI-adoption-speed-dependent",
        "source": "Pattern across 77 transcripts",
        "confidence": "narrative"
      },
      {
        "metric": "Technology companies are moving from zero AI agents to hundreds or thousands in weeks \u2014 BeyondTrust went from zero AI to AI everywhere in 6 weeks; Databricks estimated 100,000 rogue agents already in environment",
        "customer": "[Tech Company A], [Tech Company B]",
        "source": "BeyondTrust transcript (Mar 24 2026), Databricks transcript (Mar 25 2026)",
        "confidence": "soft"
      },
      {
        "metric": "Shadow AI incidents are already materializing: one company's RevOps team gained full access to the entire company financial records in Databricks by building unauthorized AI agents",
        "customer": "[Tech Company C]",
        "source": "Cision transcript (Mar 30 2026) \u2014 VP/CISO direct statement",
        "confidence": "narrative"
      },
      {
        "metric": "CEO mandates to adopt AI across the entire workforce are the most common trigger event \u2014 'everyone builds an AI agent this quarter' or equivalent was present in Affinity, Redis, Solidigm, BeyondTrust, and multiple other accounts",
        "source": "Pattern across 12+ transcripts (Mar 2026)",
        "confidence": "narrative"
      },
      {
        "metric": "GA April 30 2026 is functioning as a buying trigger \u2014 multiple accounts scheduled POC evaluations, sandbox enablement, and purchase decisions explicitly timed to GA announcement",
        "source": "Pattern across Headspace, GoFundMe, Discord, CloudBees, Cision, Attentive transcripts (Mar 2026)",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "4-10 weeks from first contact to POC; 8-16 weeks to close for net-new SKU; faster for existing Okta ELA expansions where CISO is already bought in",
      "typicalStages": [
        {
          "stage": "AI Security Discovery / Demo",
          "description": "First call where Okta introduces O4AA and ISPM. Customer either reached out proactively (triggered by CEO mandate or incident) or was introduced via AE account sync. Primary goal: make the shadow AI problem visible and concrete.",
          "typicalDuration": "1-2 calls over 1-2 weeks",
          "keyActivities": [
            "Demo shadow AI discovery via ISPM browser plugin",
            "Show Universal Directory AI Agents tab",
            "Introduce kill switch / Universal Logout concept",
            "Identify if CISO / Head of Security is in the room"
          ]
        },
        {
          "stage": "Technical Deep Dive / Architecture Review",
          "description": "IAM engineers and platform engineers evaluate whether the OAuth model (Cross-App Access, ID-JAG token) actually solves their agent architecture. Key blockers surface here: managed Chrome dependency, direct API calls, ephemeral agents, PAT coverage.",
          "typicalDuration": "1-2 calls over 1-2 weeks",
          "keyActivities": [
            "Map customer's agent stack to O4AA capabilities",
            "Address managed browser / ISPM discovery method",
            "Discuss MCP adapter (PS engagement vs roadmap)",
            "Clarify what Cross-App Access covers vs. what needs Token Vault / OPA"
          ]
        },
        {
          "stage": "POC / Solution Sprint",
          "description": "Customer enables preview tenant or sandbox. Okta provides POC guide. Customer tests with 1-3 real use cases (typically: shadow AI discovery, register one known agent, test kill switch). GA April 30 deadline creates urgency.",
          "typicalDuration": "2-4 weeks",
          "keyActivities": [
            "Enable AI features in preview environment",
            "Run shadow AI discovery via browser plugin",
            "Register 1-2 agents in Universal Directory",
            "Test managed connections and scope attenuation",
            "Test Universal Logout kill switch"
          ]
        },
        {
          "stage": "Business Case / Executive Approval",
          "description": "CISO or VP IT presents to CFO or CIO. Early adopter pricing (UD-based, unlimited connections, true-up) reduces financial risk. AI governance committee or AI council approval sometimes required.",
          "typicalDuration": "2-3 weeks",
          "keyActivities": [
            "Develop ROI narrative around risk avoidance and audit readiness",
            "Present early adopter pricing model",
            "Address procurement / legal review for new product terms",
            "Loop in CISO if not already engaged"
          ]
        }
      ],
      "commonBlockers": [
        "CISO not in the room \u2014 IT manager wants to buy but doesn't have budget authority",
        "Managed Chrome / browser management policy blocks ISPM deployment",
        "Agent Gateway / MCP adapter not yet productized \u2014 customers want GA before committing",
        "Cross-App Access standard not yet adopted by key third-party apps in their stack",
        "Existing contracts with point solution tools (HashiCorp Vault, CrowdStrike, Acuvity) create political inertia",
        "Implementation bandwidth \u2014 IT/security teams stretched thin, no capacity for another deployment",
        "Pricing unpredictability for high-volume agent environments"
      ],
      "accelerators": [
        "CEO or exec mandate to adopt AI everywhere creates urgency that bypasses normal procurement cycles",
        "A shadow AI incident or near-miss that is visible to the CISO",
        "April 30 GA date creates natural urgency for customers who want early adopter pricing",
        "Existing Okta ELA \u2014 AI SKU can be added as expansion without new contract",
        "Okta Showcase or in-person events that trigger the CISO to engage directly",
        "Competitor doing a security incident in the same vertical creates fear-of-being-next urgency"
      ]
    },
    "realQuotes": [
      {
        "quote": "We went from zero AI at about mid-December to AI everywhere with mandates. And they said: you need to secure it while we're moving.",
        "context": "Describing the speed of AI adoption and the security challenge of governing it retroactively",
        "speakerRole": "Director of Information Security"
      },
      {
        "quote": "It's the wild west. We're not blocking any agent installations. People don't understand what permissions they need.",
        "context": "Describing the current uncontrolled AI agent environment",
        "speakerRole": "IT/Security contact"
      },
      {
        "quote": "We have a group in RevOps that stretched the limit of opening tickets to gain full unfettered access into data repositories. They got access to the entire repository of company financial records in Databricks.",
        "context": "Shadow AI risk that had already materialized \u2014 unauthorized agents accessing sensitive financial data",
        "speakerRole": "VP/CISO"
      },
      {
        "quote": "The moment I get a dashboard in front of senior leadership showing we have 8,000 robots doing stuff, it should be eye opening.",
        "context": "Describing the executive visibility need \u2014 leadership doesn't know the scale of what's running",
        "speakerRole": "Director Global Infrastructure Technology"
      },
      {
        "quote": "If Okta can help us move faster, that is the primary driver. If I can just say you don't have to do that anymore \u2014 just expose that layer in Okta \u2014 that's going to be what signs us up.",
        "context": "The winning framing: governance that accelerates developer velocity, not governance that blocks it",
        "speakerRole": "Director Global Infrastructure Technology"
      },
      {
        "quote": "We spin them up very fast. Sometimes the life cycle is very short then the instance killed and sometimes we are missing the tracks of it, it's very hard to audit it later.",
        "context": "Describing the core challenge with ephemeral agent lifecycle \u2014 audit trail breaks when agents terminate in seconds",
        "speakerRole": "IT Director"
      },
      {
        "quote": "We have an internal agentic workflow platform where non-technical users build workflows using static or personal credentials.",
        "context": "Non-engineers building agents with their own credentials \u2014 no IT visibility or governance",
        "speakerRole": "Platform Engineering lead"
      },
      {
        "quote": "Agent did something wrong. They deleted data. We can't even differentiate if an agent did it or a user did it.",
        "context": "User attribution failure \u2014 no way to distinguish human from agent action in audit logs",
        "speakerRole": "Infrastructure Security Lead"
      }
    ]
  },
  {
    "id": "financial-services-workforce-ai-agents",
    "industry": "financial-services",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 40,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "500\u201350,000 employees; represented companies range from community banks (~1,100 employees) to global institutions (Citi, CME Group, Ally Financial). The median appears in the 1,000\u201310,000 range.",
      "aiMaturity": "Early-to-mid adoption. Most have employees building agents ad hoc with ChatGPT, Cursor, GitHub Copilot, Claude, or Microsoft Copilot\u2014but with no governance, no registry, and no centralized visibility. A small minority (Citi, Capital Group) have mature in-house AI programs. Many have executive mandates to deploy AI broadly but security teams still in reactive mode.",
      "triggerEvent": "Executive or board mandate to adopt AI broadly, often concurrent with the realization that employees are already building agents without controls. Secondary triggers: upcoming regulatory inquiry (NYDFS, SEC, FINRA), PCI/SOX audit, or M&A-related identity consolidation.",
      "buyingMotion": "Primarily land-and-expand off existing Okta workforce contracts. Most evaluations begin as an education or discovery call for an existing customer, progress to demo, then POC, with a net-new AI SKU add-on purchase. New logo opportunities exist but are slower (6\u20138 month cycle). Budget often requires CSO/CISO sponsorship and is tied to 2027 budget planning cycles for many accounts.",
      "typicalBudgetHolder": "CISO or Director of IT/InfoSec. CIO is decision-maker at several accounts. IAM team is champion but rarely controls budget. CSO approval required at several mid-market firms for net-new tooling spend."
    },
    "stakeholders": [
      {
        "role": "Director / VP of Identity and Access Management (IAM)",
        "frequency": 0.7,
        "whatTheyCareAbout": [
          "Maintaining governance over non-human identities as agent count scales",
          "Extending existing Okta workflows to cover AI agents without rebuilding from scratch",
          "Audit trails that attribute agent actions back to the human who authorized them",
          "Not getting back-loaded into AI projects after architecture is already baked in"
        ],
        "typicalQuestions": [
          "Does this work with our existing Okta tenant or do we need a separate deployment?",
          "How do we tie an agent action back to a specific employee for audit purposes?",
          "What happens to agents when an employee leaves or changes roles?",
          "Can this governance layer work alongside our existing Ping or Entra setup?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "CISO / VP Cybersecurity",
        "frequency": 0.5,
        "whatTheyCareAbout": [
          "Preventing data exfiltration through ungoverned AI agents accessing sensitive financial data",
          "Regulatory compliance posture for AI (NYDFS, SEC, FINRA, PCI, SOX)",
          "Kill switch capability\u2014ability to immediately revoke a compromised or rogue agent",
          "Not creating a reason for employees to bypass security controls"
        ],
        "typicalQuestions": [
          "What's the incident response story if an agent is compromised?",
          "How do we prevent an agent from accessing data it's not supposed to see?",
          "Is there a way to enforce least-privilege for agents the same way we do for humans?",
          "Do we have an audit trail that would satisfy a regulatory examiner?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Director / VP of IT or Technology",
        "frequency": 0.45,
        "whatTheyCareAbout": [
          "Operational feasibility and IT team bandwidth to deploy and manage the solution",
          "Integration complexity with Microsoft Copilot, Entra, and existing SaaS stack",
          "Cost justification to leadership for a net-new AI SKU",
          "Avoiding yet another point solution added to an already sprawling stack"
        ],
        "typicalQuestions": [
          "What's the deployment effort and ongoing maintenance burden?",
          "Can one person manage this alongside everything else?",
          "What exactly is in the base product vs. the new AI SKU?",
          "How does this integrate with our Microsoft Copilot environment?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Enterprise / Security Architect",
        "frequency": 0.4,
        "whatTheyCareAbout": [
          "Token architecture and how idjag/cross-app access works in unhappy paths (non-compliant vendors)",
          "Whether the solution covers locally-run agents, not just SaaS-integrated ones",
          "MCP server security and OAuth 2.1 compliance",
          "Integration with cloud platforms (AWS Bedrock, Azure, GCP) where agents actually run"
        ],
        "typicalQuestions": [
          "What happens for apps that don't support cross-app access\u2014how do we handle those?",
          "Can this work with agents running in containers locally, not just in SaaS apps?",
          "How does the idjag token exchange work when the agent is server-side, not browser-side?",
          "What's the story for SPIFFE/SPIRE integration for workload identity?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Head of Developer Security / IAM Engineer",
        "frequency": 0.38,
        "whatTheyCareAbout": [
          "Ensuring developer productivity is not blocked by security controls on agents",
          "Replacing long-lived API keys and service accounts with short-lived scoped tokens",
          "Visibility into which agents are running in dev environments",
          "Preventing shadow AI and unapproved agent deployments from developers"
        ],
        "typicalQuestions": [
          "How do we give developers flexibility to build agents without creating security gaps?",
          "Can this replace our current service account approach for internal tools?",
          "Does this work for CLI-based tools like Claude Code and GitHub Copilot?",
          "How do we handle tokens for agents that need to call multiple APIs in sequence?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "CIO / CTO",
        "frequency": 0.25,
        "whatTheyCareAbout": [
          "Strategic fit of AI agent governance within the broader IAM and security program",
          "Commercial bundling and total contract cost",
          "Alignment with vendor consolidation goals (preference for extending existing Okta relationship)"
        ],
        "typicalQuestions": [
          "Can we bundle this with our existing Okta contract or is it truly a separate buy?",
          "How does this fit our multi-year roadmap for AI and identity?",
          "What's the TCO comparison vs. building this ourselves?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Information Security Risk & Compliance",
        "frequency": 0.25,
        "whatTheyCareAbout": [
          "PCI compliance for non-human credentials (agents as credential-holding entities)",
          "SOX and SEC audit-readiness for AI agent access logs",
          "Agent access certification campaigns analogous to human user access reviews",
          "Regulatory uncertainty\u2014no published gold standard yet for AI governance"
        ],
        "typicalQuestions": [
          "How do access certification campaigns work for agents under PCI/SOX?",
          "Can the audit log produced by this solution satisfy a regulatory examiner?",
          "What's the classification scheme for agents by risk level?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Application / Enterprise Architect (Builder)",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "Token vault architecture for MCP servers (Snowflake, Slack, Salesforce, Workday)",
          "Solving the cartesian product of user-to-MCP-server token management",
          "Auth0 as token vaulting engine vs. Okta as governance layer"
        ],
        "typicalQuestions": [
          "How do we manage tokens for each user across multiple MCP servers without building custom refresh logic?",
          "What's the right split between Auth0 token vault and Okta governance?",
          "Does this support first-party MCP servers with custom token exchange?"
        ],
        "influenceLevel": "evaluator"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No visibility into which AI agents are running in the environment\u2014agents are discovered only when Netskope blocks something, or when an admin stumbles across unrecognized Copilot Studio registrations in Azure",
        "frequency": 0.88,
        "severity": "critical",
        "exampleQuote": "I went into Azure the other day and I saw all these Copilot Studio agents registered and I don't know where they came from"
      },
      {
        "id": "pp-2",
        "statement": "Agents run with the full permissions of the human user who authorized them\u2014no separate, attenuated identity with least-privilege scopes. Agents can read, write, and delete at the same level as a senior engineer",
        "frequency": 0.83,
        "severity": "critical",
        "exampleQuote": "Once you give any kind of agent unfettered create, read, update, even potentially delete in Google Workspace for a financial services organization, we just can't give you update and delete"
      },
      {
        "id": "pp-3",
        "statement": "No audit trail that distinguishes agent actions from human actions\u2014impossible to determine after the fact whether a person or their agent took a sensitive action",
        "frequency": 0.75,
        "severity": "critical",
        "exampleQuote": "We need to know: did the agent take that action on its own or was it taking action on behalf of the user?"
      },
      {
        "id": "pp-4",
        "statement": "Agents use long-lived API keys, shared service accounts, or static credentials with no lifecycle management\u2014keys don't rotate and no one knows who owns them",
        "frequency": 0.73,
        "severity": "critical",
        "exampleQuote": "Instead of a service account everyone shares, we maintain the lineage between human and the agent workload principle"
      },
      {
        "id": "pp-5",
        "statement": "Executive or CTO mandate to deploy AI everywhere is racing ahead of the security team's ability to establish governance\u2014security is in permanent reactive mode",
        "frequency": 0.65,
        "severity": "high",
        "exampleQuote": "That train is moving at mach speed. I'm not sure there is any in front of it at this point. I'm just trying to ride on it."
      },
      {
        "id": "pp-6",
        "statement": "Identity governance controls are never built into AI projects from the start\u2014they get back-loaded, and by then the architecture is already baked in and rework is painful",
        "frequency": 0.55,
        "severity": "high",
        "exampleQuote": "Identity always gets back-loaded into the end of these projects and it's like we can't do that then because then everything gets ingrained in and you have to go back and rework it."
      },
      {
        "id": "pp-7",
        "statement": "Token management at scale is a 'cartesian product problem'\u2014each user needs discrete credentials per MCP server, and current solutions (AWS Secrets Manager, custom code) don't handle the refresh token lifecycle",
        "frequency": 0.45,
        "severity": "high",
        "exampleQuote": "We have this sort of a cartesian product of keys that we need to manage for users and MCP servers"
      },
      {
        "id": "pp-8",
        "statement": "Compliance and regulatory uncertainty about AI agents\u2014no published FINRA, SEC, NYDFS, or global gold standard for how agents should be governed, yet auditors and regulators are beginning to ask",
        "frequency": 0.45,
        "severity": "high",
        "exampleQuote": "No regulator on the globe has fully openly disclosed to say this is the gold standard of how you're supposed to be deploying AI technologies."
      },
      {
        "id": "pp-9",
        "statement": "Security controls on agents create re-authentication friction that users work around\u2014when agents prompt Okta re-auth, developers build bypass mechanisms, making the security posture worse than having no control at all",
        "frequency": 0.3,
        "severity": "high",
        "exampleQuote": "The user actually installed an Okta bypass capability within the agentic environment that he was trying to build. We were giving our users a reason to try to find ways around our controls."
      },
      {
        "id": "pp-10",
        "statement": "Agent-to-agent delegation is an unsolved governance problem\u2014when an agent creates another agent, attribution and authorization are completely unclear",
        "frequency": 0.25,
        "severity": "moderate",
        "exampleQuote": "If the agent creates an agent, how do you determine what they're allowed to access?"
      }
    ],
    "goals": [
      {
        "statement": "Gain a complete, real-time inventory of every AI agent in the environment\u2014what it is, who owns it, what it can access, and whether it's approved",
        "frequency": 0.85,
        "successMetric": "Zero unknown agents operating in environment; all agents registered in a central directory with named human owners"
      },
      {
        "statement": "Enforce least-privilege access for agents with scopes narrower than the human user's permissions\u2014separate agent identity from human identity",
        "frequency": 0.8,
        "successMetric": "No agent operating with full human user permissions; all agent scopes explicitly defined and attenuated"
      },
      {
        "statement": "Produce a complete audit trail tying every agent action back to the specific user on whose behalf it acted\u2014for compliance, incident response, and regulatory examination",
        "frequency": 0.75,
        "successMetric": "100% of agent actions attributable to a named human identity in logs; audit log satisfies PCI/SOX examiner"
      },
      {
        "statement": "Replace long-lived API keys and shared service accounts with short-lived, scoped tokens that automatically rotate and expire",
        "frequency": 0.65,
        "successMetric": "Zero static long-lived credentials in use by AI agents; all tokens time-bounded and user-scoped"
      },
      {
        "statement": "Establish governance processes for agent access reviews\u2014periodic certification campaigns analogous to human access reviews, with kill-switch capability",
        "frequency": 0.58,
        "successMetric": "Quarterly agent access certification cycle; agent access revocable in under 5 minutes via kill switch"
      },
      {
        "statement": "Enable security team to say 'yes' to AI adoption requests with guardrails in place\u2014shift from blocking AI to governing it",
        "frequency": 0.48,
        "successMetric": "Security team approves AI agent deployments within defined SLA; no rogue shadow AI activity in ISPM reports"
      },
      {
        "statement": "Get AI agent identity governance in place before agents proliferate further and rework becomes impossible",
        "frequency": 0.43,
        "successMetric": "Governance framework operational before next major AI platform rollout; no retroactive rearchitecting required"
      },
      {
        "statement": "Centralize token lifecycle management for agents accessing multiple MCP servers or third-party APIs\u2014eliminate custom refresh token code",
        "frequency": 0.35,
        "successMetric": "Single platform managing all agent-to-MCP-server tokens; no custom token refresh logic in application code"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA) \u2014 Cross-App Access / idjag token",
        "relevance": "primary",
        "rationale": "Directly addresses the core pain: giving agents a distinct identity with attenuated scopes, producing an audit token that carries both user context and agent context (idjag). Mentioned in 31 of 40 signals\u2014the most frequently discussed product by a wide margin.",
        "specificFeatures": [
          "idjag token (carries user + agent context for full audit trail)",
          "Cross-App Access / token exchange (Okta token \u2192 agent-scoped downstream token)",
          "Agent registry in Universal Directory with human owner assignment",
          "Authorization policies (what the agent can do + what the user is permitted\u2014the intersection)",
          "Kill switch / instant revocation via Universal Logout extension for AI agents",
          "Agent Gateway for low-code agents (Copilot Studio) that can't implement token exchange natively"
        ],
        "frequency": 0.78
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is universally named as the prerequisite for everything else. ISPM browser plugin is the entry point for discovering agents employees have already deployed without IT knowledge. Discussed in 15 of 40 signals.",
        "specificFeatures": [
          "Browser extension for OAuth consent discovery (captures which AI tools employees have authorized)",
          "Non-human identity discovery (Copilot Studio agents, Agentforce connectors)",
          "Shadow AI inventory and risk scoring",
          "Agent posture assessment"
        ],
        "frequency": 0.38
      },
      {
        "product": "Okta Identity Governance (OIG) \u2014 Agent Certification Campaigns",
        "relevance": "primary",
        "rationale": "Financial services compliance teams explicitly ask for access certification campaigns covering AI agents, analogous to existing human user access reviews. OIG extends this motion to non-human identities. Discussed in 10 signals.",
        "specificFeatures": [
          "Access certification campaigns for AI agents (periodic review cycles)",
          "Entitlement reviews for agent-to-application connections",
          "Owner assignment workflows for ungoverned agents",
          "Governance policies for agent lifecycle (provisioning, deprovision, access change)"
        ],
        "frequency": 0.25
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "secondary",
        "rationale": "Directly solves the cartesian product token management problem for architectures using LangChain, FastAPI, or custom agent platforms that need to manage discrete per-user per-MCP-server tokens. Most relevant for accounts already using or considering Auth0.",
        "specificFeatures": [
          "Per-user per-MCP-server token storage and refresh lifecycle",
          "Token exchange: Okta/Auth0 user token \u2192 third-party API token (Snowflake, Slack, Outlook, Salesforce)",
          "Eliminates custom refresh token code",
          "Offline access scope handling for third-party OAuth providers"
        ],
        "frequency": 0.18
      },
      {
        "product": "Okta Identity Threat Protection (ITP)",
        "relevance": "secondary",
        "rationale": "Post-authentication continuous monitoring is the complement to agent governance\u2014detect anomalous agent behavior in real time and trigger automated response. Several accounts already evaluating or using ITP in monitoring mode.",
        "specificFeatures": [
          "Continuous post-authentication risk monitoring (not just at login)",
          "Shared signals integration (CrowdStrike, Netskope, Zscaler) for correlated risk signals",
          "Universal Logout triggered by risk elevation",
          "Session monitoring and protection"
        ],
        "frequency": 0.2
      },
      {
        "product": "Okta Privileged Access (OPA) \u2014 Agent Credential Vaulting",
        "relevance": "secondary",
        "rationale": "Agents accessing privileged systems (production databases, infrastructure APIs) need vaulted credentials with JIT access, not standing long-lived keys. OPA extends PAM controls to AI agent workloads.",
        "specificFeatures": [
          "Secrets vault for agent credentials",
          "Just-in-time access provisioning for agent sessions",
          "Session recording for privileged agent access"
        ],
        "frequency": 0.18
      },
      {
        "product": "Fine-Grained Authorization (FGA)",
        "relevance": "adjacent",
        "rationale": "Document-level and data-level authorization for AI agents accessing knowledge bases, RAG pipelines, and sensitive data sources. Relevant for architectures where scope alone is insufficient\u2014row-level or attribute-level control is needed.",
        "specificFeatures": [
          "Relationship-based access control (ReBAC) for agent-to-data authorization",
          "Policy enforcement for RAG pipelines (agent only returns documents user is authorized to see)",
          "Integration with Kong and other API gateways"
        ],
        "frequency": 0.13
      },
      {
        "product": "Auth0 for MCP / MCP Security",
        "relevance": "adjacent",
        "rationale": "Emerging pattern for developer-built MCP servers in financial services\u2014Auth0 provides OAuth 2.1-based authentication for MCP tools. Early access, relevant for architectures building internal MCP infrastructure.",
        "specificFeatures": [
          "OAuth 2.1 for MCP tool authorization",
          "MCP registry for available connections per tenant",
          "Secure MCP server authentication without custom code"
        ],
        "frequency": 0.13
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Entra ID / Copilot Studio / AI Foundry / Agentforce)",
        "frequency": 0.43,
        "context": "Microsoft is simultaneously the platform where most agents are being built (Copilot Studio, AI Foundry) and the incumbent IdP at many accounts. The key tension: Microsoft's native agent governance is RBAC in Entra, which customers describe as insufficient\u2014no agent-specific identity, no attenuated scopes, no cross-vendor audit trail. Customers building on Copilot Studio specifically need Okta to mediate connections to non-Microsoft SaaS (Salesforce, Workday, ServiceNow).",
        "differentiators": [
          "Okta is vendor-neutral\u2014governs agents across Microsoft, AWS, GCP, and any SaaS, not just the Microsoft stack",
          "idjag token carries both user and agent context; Entra RBAC does not produce equivalent agent-specific audit token",
          "Okta Agent Gateway enables governance of Copilot Studio agents that cannot implement token exchange natively",
          "Okta's cross-app access standard is being adopted by non-Microsoft vendors; Microsoft preview coverage is incomplete"
        ]
      },
      {
        "competitor": "AWS (Secrets Manager / Bedrock / AgentCore / Cognito)",
        "frequency": 0.23,
        "context": "AWS is the cloud platform where many financial services agents run. AWS Secrets Manager is a common current-state for token storage but lacks refresh token lifecycle management. AWS AgentCore handles some agent orchestration but doesn't produce the idjag-style dual-context token. Accounts using AWS Bedrock need Okta as the authorization plane layered above AWS.",
        "differentiators": [
          "Okta as authorization plane above AWS\u2014policy decisions flow down to AWS-hosted agents",
          "idjag token not natively supported by AWS Cognito (as of March 2026); Okta fills the gap",
          "AWS Secrets Manager has no native refresh token lifecycle; Auth0 Token Vault does",
          "Okta governs agents across cloud providers; AWS governance is siloed to the AWS environment"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.1,
        "context": "Incumbent IGA platform at several accounts (SWBC, Stockman Bank, TD Bank). Mentioned as the reference frame for what IGA should do for AI agents\u2014customers ask whether Okta's agent certification capability is comparable to SailPoint's governance depth.",
        "differentiators": [
          "Okta governs agent identities natively within the same platform that manages human identities\u2014no separate IGA tool",
          "SailPoint requires connector to Okta; Okta OIG + O4AA is native",
          "Okta's agent discovery (ISPM) feeds governance natively; SailPoint requires separate discovery tooling"
        ]
      },
      {
        "competitor": "CrowdStrike / Netskope / Zscaler (SASE/CSPM)",
        "frequency": 0.23,
        "context": "Security-focused buyers often come in with these tools already deployed. Some use Netskope to block AI tools (blunt instrument). Others see CrowdStrike or Zscaler as the natural home for AI security. The objection: 'We're bringing on Zscaler to address AI security gaps first.' Okta's counter is that network-layer blocking is not identity-aware governance.",
        "differentiators": [
          "Network-layer blocking (Netskope/Zscaler) cannot distinguish corporate from personal AI accounts using the same domain",
          "Identity-aware governance links AI agent action to specific user identity\u2014SASE cannot",
          "Okta integrates with CrowdStrike/Netskope/Zscaler via Shared Signals Framework rather than competing",
          "ISPM browser extension discovers OAuth grants that SASE/EDR tools miss"
        ]
      },
      {
        "competitor": "Veza / Orca (NHI / Cloud Permissions Management)",
        "frequency": 0.1,
        "context": "Surfaced at Capital Group alongside Okta for the broader NHI problem. These tools provide cloud entitlement and NHI visibility. The objection: 'We're evaluating Veza and Orca for NHI alongside Okta.' They address the discovery layer but not the governance and remediation layer.",
        "differentiators": [
          "Okta combines discovery (ISPM), governance (OIG), and enforcement (O4AA/OPA) in one platform",
          "Veza/Orca provide visibility into NHI risk but lack the identity lifecycle and enforcement capabilities",
          "Okta extends the same IAM workflows (provisioning, certification, deprovisioning) that already exist for humans to AI agents"
        ]
      },
      {
        "competitor": "Delinea / CyberArk (PAM incumbents)",
        "frequency": 0.1,
        "context": "PAM incumbents appear at a subset of accounts (Cathay Bank has Delinea for PAM). The question is whether agent credential vaulting belongs in the existing PAM tool or in Okta. Cathay Bank specifically asked about integrating Okta AI governance with Copilot alongside their Delinea deployment.",
        "differentiators": [
          "Okta OPA provides JIT and session controls natively within the identity fabric without requiring a separate PAM vault for agent credentials",
          "PAM tools are designed for human admin access; AI agent token lifecycle is a different problem",
          "Okta enables unified governance across human, machine, and AI agent identities from one control plane"
        ]
      }
    ],
    "objections": [
      {
        "objection": "The AI agent SKU is an additional cost on top of our existing Okta contract\u2014this needs a separate budget conversation and approval cycle",
        "frequency": 0.45,
        "counterPosition": "Frame it as the cost of insurance against an AI security incident. $5/user/month for governance that prevents a single data exfiltration incident typically pays back immediately. The pricing model is per agent-to-identity connection, not per user\u2014walk through the specific agent count to right-size the number before presenting to budget holder.",
        "evidenceSupport": "Several accounts explicitly request pricing before progressing. Celtic Bank: $5/user/month = $24K/year for 400 users\u2014requires a budget conversation. Regions Bank: 'everything included in the five dollars per connection.'"
      },
      {
        "objection": "This technology is all in its infancy\u2014we're waiting to see who wins in AI security before committing",
        "frequency": 0.35,
        "counterPosition": "The agents are already running. Waiting for the market to mature doesn't stop the current sprawl\u2014it just means the backlog of ungoverned agents grows. The cost of retroactive governance increases with each month of delay. A scoped POC with existing Okta integration is low-risk and produces immediate visibility value even if a broader purchase decision is deferred.",
        "evidenceSupport": "Stockman Bank IAM Specialist: 'If we don't have all the controls in place from the beginning, it's just going to be a shit show trying to get back on top of it.' Capital Group: 'business is not waiting\u20142 weeks to approve Databricks agents without InfoSec controls.'"
      },
      {
        "objection": "Agent discovery only works for browser-based OAuth grants and managed browsers\u2014it doesn't cover agents running locally in containers or CLI tools",
        "frequency": 0.3,
        "counterPosition": "Acknowledge the gap honestly\u2014ISPM browser extension coverage is partial today. The roadmap includes expanded discovery. Frame what is covered (browser-based OAuth, Copilot Studio, Agentforce) as the 80% case in financial services where agents access SaaS via OAuth. CLI and container-based agents are a separate motion that OPA and cross-app access address at the enforcement layer.",
        "evidenceSupport": "PEAK6: 'Agents running locally not in SaaS apps\u2014fundamental gap in Okta's approach.' Brex: 'Discovery only covers managed browsers, not device-level agents.' Zerohash: 'For agents using CLI tools: can't differentiate between human and agent using same token.'"
      },
      {
        "objection": "The idjag token standard is still an IETF draft\u2014we're not comfortable building on a non-ratified standard",
        "frequency": 0.25,
        "counterPosition": "Position idjag as the direction the industry is moving\u2014AWS, Microsoft, and Salesforce are all aligned on this pattern even if formal ratification is pending. The alternative is relying on ad-hoc OAuth grants with no agent context at all. Okta is building to the standard now so customers are positioned when it ratifies, rather than having to rearchitect later.",
        "evidenceSupport": "CME Group Director IAM Engineering pushed back on happy-path cross-app access demo, wanting to see unhappy paths for non-compliant vendors. Regions Bank: 'idjag is just another type of OAuth grant flow\u2014specifically for crossing trust boundaries.'"
      },
      {
        "objection": "AI agent governance is the security team's decision, not the IAM team's\u2014we need to involve a different stakeholder",
        "frequency": 0.25,
        "counterPosition": "Use this as an expansion signal, not a blocker. Offer to run a separate executive or security team education session. Leave materials with the IAM champion to share. Position the IAM team as the natural bridge\u2014they already control the identity infrastructure; extending it to AI agents is an IAM motion.",
        "evidenceSupport": "Allvue: 'AI is security team's decision, not IAM team's.' Evercore: 'Contact is on banking side, not technology\u2014may not be right decision maker.'"
      },
      {
        "objection": "We prefer vendor consolidation\u2014we don't want to add another point solution. We'd rather extend Microsoft or our existing security stack",
        "frequency": 0.2,
        "counterPosition": "Okta is the consolidation play, not a net-new point solution. Customers who extend Entra for AI governance end up with Microsoft-only coverage. Okta governs agents across all vendors and clouds from the same platform already managing their human identities\u2014fewer tools, not more. The ISPM, OIG, and ITP capabilities are add-on modules to the existing Okta subscription.",
        "evidenceSupport": "TD Bank: 'Minimizing third-party vendor footprint\u2014prefer existing partners.' Several accounts responded positively to 'it's an extension of what you already do in Okta.'"
      },
      {
        "objection": "Our AI usage is too light today to justify a purchase\u2014we need to do internal AI training and ramp up first",
        "frequency": 0.18,
        "counterPosition": "The light-usage window is exactly when governance is cheapest to implement\u2014before sprawl sets in. A trial or sandbox is the right entry point here: low cost, high learning. Offer a time-limited sandbox to let the team self-educate on the platform while their AI program matures.",
        "evidenceSupport": "Dunham & Associates: 'Current AI usage too light to justify purchase now\u2014need internal AI training first.' Cornerstone: Offered POC/partnership opportunity with GA April 30 as urgency anchor."
      },
      {
        "objection": "The MCP adapter / virtual MCP server is still a PS-managed service, not a productized GA capability",
        "frequency": 0.18,
        "counterPosition": "Acknowledge the current state honestly\u2014the managed service path still delivers value today while the productized version matures. Customers who start with PS-delivered implementation get early access and influence the roadmap. GA April 30 covers the core O4AA capabilities; the virtual MCP server for third-party agents without native cross-app access support is the next wave.",
        "evidenceSupport": "Apollo/Athene: 'Product won't be fully productized until July\u2014current state is managed service.' Ally Financial: 'Virtual MCP server solves the third-party agent problem.'"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents are operating in your environment today\u2014and how confident are you in that number?",
        "callPhase": "opening",
        "rationale": "Opens the visibility gap pain point immediately. Most customers know they have agents but cannot enumerate them\u2014this question surfaces the uncertainty and creates urgency for discovery tooling. Sets up the ISPM motion."
      },
      {
        "question": "When an employee deploys a new AI agent\u2014say a Copilot Studio workflow or a Claude integration\u2014what's the process for approving it and assigning an owner?",
        "callPhase": "pain-exploration",
        "rationale": "Exposes the absence of a governance process without being leading. Most customers in this archetype have no process\u2014the question makes that visible. Sets up the agent registry and OIG certification motion."
      },
      {
        "question": "If a deployed agent were compromised right now, how quickly could you revoke its access\u2014and how would you know which systems it had touched?",
        "callPhase": "pain-exploration",
        "rationale": "Forces the customer to walk through their incident response scenario for agents. In most cases, there is no answer\u2014no kill switch, no audit trail. This is the single most effective question for surfacing severity of the gap."
      },
      {
        "question": "What credentials are your agents using today\u2014are they running under a service account, long-lived API keys, or the human user's own OAuth token?",
        "callPhase": "technical",
        "rationale": "Identifies the specific credential anti-pattern in use. Long-lived keys \u2192 OPA vault story. Shared service accounts \u2192 idjag lineage story. Human OAuth tokens \u2192 scope attenuation story. Drives to the right product motion."
      },
      {
        "question": "When an AI agent takes an action in a system\u2014say updates a record in Salesforce or reads from a SharePoint folder\u2014how do you know today whether it was the agent acting autonomously or acting on a human's behalf?",
        "callPhase": "technical",
        "rationale": "Directly surfaces the attribution and audit trail gap. Leads naturally to the idjag token demonstration\u2014the token carries both user context and agent context, producing the audit chain the customer needs."
      },
      {
        "question": "Do your existing compliance or audit frameworks cover AI agents today\u2014for example, do your access certification campaigns include agents alongside human users?",
        "callPhase": "pain-exploration",
        "rationale": "Financial services customers are beginning to face regulatory scrutiny on AI governance. This question surfaces the compliance gap and creates urgency without requiring the customer to volunteer it. Sets up OIG agent certification motion and regulatory alignment framing."
      },
      {
        "question": "Is there a meaningful difference between what an AI agent should be allowed to do versus what the human who authorized it is allowed to do? Are there any actions you'd want to permit for the human but restrict for the agent?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the scope attenuation conversation in the customer's own terms. Nearly every customer in this archetype says yes\u2014the agent should have narrower permissions. This creates the natural setup for Cross-App Access and policy-based scope restriction demo."
      },
      {
        "question": "Has your security team had to block or restrict AI tools because of access control concerns? Have employees found workarounds?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces both the blunt-instrument blocking problem (Netskope blocking everything) and the user bypass behavior (building Okta bypass mechanisms). Both indicate that the current approach is failing. Creates urgency for a governance-first rather than block-everything strategy."
      },
      {
        "question": "Walk me through your most complex AI agent use case today\u2014what systems does it access, under what credentials, and what would happen if that access were misused?",
        "callPhase": "technical",
        "rationale": "Gets the customer to self-articulate the most sensitive exposure in their environment. Often produces the most compelling specific pain point that the POC should target. Also qualifies the technical complexity to determine whether Auth0 Token Vault is needed alongside O4AA."
      },
      {
        "question": "When your leadership talks about AI governance, what does 'getting a handle on this' actually look like to them\u2014what would success look like in 6 months?",
        "callPhase": "decision-process",
        "rationale": "Identifies the executive success metric that must be met for a purchase decision. Aligns the POC scope to what leadership will actually evaluate. Surfaces whether the budget holder is the CISO (security incident prevention), CIO (operational control), or CFO (cost/compliance)."
      }
    ],
    "proofPoints": [
      {
        "metric": "91% of organizations are now using AI agents; 80% have experienced unintended agent behavior; 44% have no AI agent governance in place; 88% report suspected or confirmed AI agent security incidents",
        "source": "Okta survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      },
      {
        "metric": "NIST has reached out to financial services firms for guidance on AI agent security standards\u2014no published standard exists yet, but regulatory attention is confirmed",
        "customer": "Oak Hill Advisors",
        "source": "VP Cybersecurity on transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "A CISO's developer installed an Okta bypass mechanism within an agentic environment because Okta re-auth prompts were blocking the agent's operation\u2014security controls intended to protect the org were actively undermined by the friction they created",
        "customer": "[Financial Services Company]",
        "source": "CISO on Gong transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "A global investment management firm discovered 50,000+ non-human identity findings in their cloud environment (Wiz CIEM) but found the results unactionable without enriched identity context\u2014drove evaluation of Okta for NHI governance",
        "customer": "[Financial Services Company]",
        "source": "VP Cloud Security Engineering on Gong transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Teams of 3\u20134 developers at a financial services firm were building and deploying new AI agents every 4\u20136 weeks across multiple departments, with no central registry, no audit trail, and no governance process in place",
        "customer": "[Financial Services Company]",
        "source": "Enterprise Systems Engineer on Gong transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "A global bank's IAM team discovered unknown Copilot Studio agents registered in their Azure tenant with no record of who created them or what data they could access",
        "customer": "[Financial Services Company]",
        "source": "Enterprise Systems Engineer on Gong transcript, March 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20139 months from first AI agent discussion to purchase. Existing Okta customers compress to 3\u20135 months when an executive or compliance trigger creates urgency. New logo or multi-vendor evaluation extends to 6\u20139 months.",
      "typicalStages": [
        {
          "stage": "Education / Awareness",
          "description": "Customer becomes aware of Okta for AI Agents, often through an account sync, QBR, or proactive Okta outreach. AI governance is not yet a named project. Primary audience is IAM team or IT director.",
          "typicalDuration": "1\u20133 weeks",
          "keyActivities": [
            "Introductory deck or product overview shared with IAM champion",
            "Internal materials forwarded to security team",
            "Identification of whether security or IAM team owns the AI governance decision",
            "Demo scheduled"
          ]
        },
        {
          "stage": "Discovery / Demo",
          "description": "Technical demo with IAM and security team. Customer articulates current agent environment (often discovering they don't have good visibility). Pain points surfaced: no registry, long-lived keys, no audit trail. Security or CISO team engaged.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Live demo of agent registry, idjag token exchange, ISPM discovery",
            "Customer maps their current agent environment to the demo scenarios",
            "Pricing conversation initiated ($5/user/month or per-connection model explained)",
            "POC scoped",
            "CISO or security team briefed separately if not on initial call"
          ]
        },
        {
          "stage": "Technical Deep Dive / Architecture Review",
          "description": "Customers with existing complex environments (multi-cloud, Microsoft heavy, custom MCP builds) require architecture-level sessions to work through their specific scenarios. Unhappy paths (non-compliant vendors, locally-run agents, CLI tools) must be addressed.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Whiteboarding session (in-person preferred for complex accounts)",
            "Walk through each specific agent use case and map to O4AA capabilities",
            "Address idjag standard maturity, vendor adoption gaps, AWS/Microsoft integration",
            "Confirm POC scope and success criteria"
          ]
        },
        {
          "stage": "POC",
          "description": "Hands-on POC typically scoped to one or two agent use cases. Existing Okta customers use existing sandbox tenant. Success criteria: working token exchange, agent registered in UD with owner, authorization policy enforced, audit trail visible.",
          "typicalDuration": "3\u20136 weeks",
          "keyActivities": [
            "Enable EA features in sandbox",
            "Walk through cross-app access with idjag token for a specific agent use case",
            "Run ISPM browser extension to discover existing shadow agents",
            "Customer runs internal demo for their team (SE coaches customer to present, more credible internally)",
            "Commercial offer presented concurrent with POC"
          ]
        },
        {
          "stage": "Commercial / Decision",
          "description": "Budget approval required (CISO or CIO sponsor). Purchase is typically an add-on SKU to existing Okta contract. Multi-year preferred when early renewal opportunity exists. Urgency anchors: GA April 30, end-of-quarter incentive, upcoming audit or regulatory review.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Formal commercial proposal with per-connection or per-user pricing",
            "ROI conversation framed around incident prevention and compliance cost avoidance",
            "Contract amendment or early renewal bundled with existing Okta contract",
            "Budget holder approval (often requires separate exec briefing)"
          ]
        }
      ],
      "commonBlockers": [
        "AI governance decision owned by security team, not IAM team\u2014requires escalation to different stakeholder who was not on initial calls",
        "No active AI governance project or budget line\u2014purchase deferred to next fiscal year planning cycle",
        "Internal competing priorities and team bandwidth limiting POC progress",
        "Vendor consolidation mandate\u2014preference to extend Microsoft or existing security vendor rather than add Okta AI module",
        "Product gaps: agent-to-agent delegation not yet GA, locally-run agent discovery incomplete, hosted MCP server not yet productized",
        "idjag standard not yet ratified\u2014legal or security teams unwilling to build on draft standard"
      ],
      "accelerators": [
        "Executive mandate to deploy AI everywhere creates urgency for governance to catch up",
        "Recent AI-related security incident or near-miss (data sent to personal AI account, unknown agent discovered)",
        "Upcoming audit, regulatory examination, or compliance review (PCI, SOX, NYDFS)",
        "Early renewal opportunity allows bundling AI SKU into existing contract economics",
        "End-of-quarter commercial incentive (April 23 / Q1 close pressure observed across multiple accounts)",
        "Customer acts as internal champion and runs their own internal demo (SE coaching this pattern explicitly)",
        "Competitive displacement situation\u2014Okta for AI as retention hook for churn-risk accounts"
      ]
    },
    "realQuotes": [
      {
        "quote": "If we don't have all the controls in place from the beginning, it's just going to be a shit show trying to get back on top of it.",
        "context": "Describing shadow AI risk if agent governance is not established early in the AI adoption lifecycle",
        "speakerRole": "IAM Specialist"
      },
      {
        "quote": "I went into Azure the other day and I saw all these Copilot Studio agents registered and I don't know where they came from.",
        "context": "Discovering unmanaged AI agents in the enterprise Azure tenant without any record of their creation or purpose",
        "speakerRole": "Enterprise Systems Engineer"
      },
      {
        "quote": "The user actually installed an Okta bypass capability within the agentic environment that he was trying to build. We were giving our users a reason to try to find ways around our controls.",
        "context": "Describing the unintended consequence of Okta re-authentication prompts blocking agent operation\u2014developers bypassed security controls rather than tolerate the friction",
        "speakerRole": "CISO"
      },
      {
        "quote": "Once you give any kind of agent unfettered create, read, update, even potentially delete in Google Workspace for a financial services organization, we just can't give you update and delete.",
        "context": "Articulating why AI agent permissions must be attenuated below human user permissions for financial data",
        "speakerRole": "Security Engineer"
      },
      {
        "quote": "We have this sort of a cartesian product of keys that we need to manage for users and MCP servers.",
        "context": "Describing the token management complexity of a many-users \u00d7 many-MCP-servers credential matrix without a centralized token vault",
        "speakerRole": "Enterprise Architect"
      },
      {
        "quote": "Identity always gets back-loaded into the end of these projects and it's like we can't do that then because then everything gets ingrained in and you have to go back and rework it.",
        "context": "Articulating the systemic failure mode where AI projects are built without identity governance and become impossible to retrofit",
        "speakerRole": "IAM Specialist"
      },
      {
        "quote": "It's the rainbows and sunshine thing, right? I'm assuming all the backend apps here support cross app access and you're in the happy path. I need to understand what happens for the apps that don't support cross app access\u2014that's where my challenges are.",
        "context": "Pushing back on an idealized demo scenario\u2014demanding to see what happens for non-compliant vendors before evaluating the solution",
        "speakerRole": "Director IAM Engineering"
      },
      {
        "quote": "It's a very wild west\u2014nobody knows what they're doing, they're just doing it.",
        "context": "Characterizing the current state of AI agent deployment at their firm following a company-wide mandate for every employee to build something with AI",
        "speakerRole": "Director Information Security"
      }
    ]
  },
  {
    "id": "healthcare-workforce-ai-agents",
    "industry": "healthcare",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 29,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (200\u201350,000 employees); spans startups building healthcare AI products (Gnostora, Abridge) to large health systems (Cedars-Sinai, Labcorp) and distributors (Cardinal Health, McKesson)",
      "aiMaturity": "Early-to-mid adoption: most organizations have AI tools deployed (ChatGPT Enterprise, Copilot, Claude, Gemini) but governance is absent or informal \u2014 'we blessed it and put it on a wiki page'. A subset (Unlock Health, Tempus, WellSky) are building in-house agentic stacks. Very few have formal agent lifecycle processes.",
      "triggerEvent": "Top triggers: (1) an over-provisioned or shadow AI agent causes a security incident or near-miss, (2) compliance audit or certification renewal (HIPAA BAA, HITRUST, SOC 2, FedRAMP) forces governance conversation, (3) executive 'AI first' mandate outpaces security team's ability to govern, (4) existing Okta customer renewal cycle used to add new AI governance SKU",
      "buyingMotion": "Primarily top-down from CISO or CIO after a risk event or compliance deadline; sometimes SE/security engineer-led bottom-up that stalls without executive sponsor. Phased approach common: core Okta workforce identity Phase 1, AI agents Phase 2. POC required before commitment in most enterprise deals.",
      "typicalBudgetHolder": "CISO (most common), CIO/CTO, VP IT Security, Director IAM. CFO influence increases when AI initiative budget is already committed elsewhere. Budget is often already allocated to AI initiatives \u2014 the governance angle must compete with or attach to existing AI spend."
    },
    "stakeholders": [
      {
        "role": "CISO",
        "frequency": 0.52,
        "whatTheyCareAbout": [
          "PHI exposure and HIPAA liability from ungoverned agents",
          "Audit readiness and compliance evidence for agent actions",
          "Kill switch capability for compromised agents",
          "Service account over-provisioning and agent 'godmode' access",
          "Being seen as 'Dr. No' vs enabling the business safely"
        ],
        "typicalQuestions": [
          "How do I revoke an agent's access the moment it's compromised?",
          "Can I produce an audit trail showing which agent accessed which PHI and when?",
          "How do you detect agents behaving outside their authorized scope?",
          "What's your HIPAA cell roadmap for AI features?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "CIO / CTO",
        "frequency": 0.38,
        "whatTheyCareAbout": [
          "Enabling AI-first mandate without creating unacceptable risk",
          "Vendor neutrality across OpenAI, Anthropic, Google, Microsoft",
          "Not blocking developer productivity",
          "Cost justification \u2014 AI governance on top of existing AI spend"
        ],
        "typicalQuestions": [
          "If you're not thinking about agentic AI, are you missing a lot?",
          "How does this work if our AI landscape spans multiple vendors?",
          "Does this complement or replace what Google/Microsoft already provides natively?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Director IAM / Director Identity",
        "frequency": 0.34,
        "whatTheyCareAbout": [
          "Agent joiner-mover-leaver (JML) framework analogous to human accounts",
          "Single pane of glass for human and non-human identity",
          "Governance overhead of assigning users to thousands of agents at scale",
          "Compatibility with existing browser-based tooling (Island, Chrome extensions)"
        ],
        "typicalQuestions": [
          "Can I build an agent JML framework similar to how we handle human accounts?",
          "What's the governance overhead at 10,000 agents?",
          "Does your browser plugin work with managed browsers like Island?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Security Architect / Senior Security Engineer",
        "frequency": 0.41,
        "whatTheyCareAbout": [
          "Token management: short-lived tokens vs PATs vs service accounts",
          "PHI/non-PHI data isolation within a single agent session",
          "FedRAMP and HIPAA cell compatibility for AI features",
          "Agent-to-agent interaction security and swarm governance"
        ],
        "typicalQuestions": [
          "How do you prevent an agent from reading PHI and then writing to a non-PHI system in the same transaction?",
          "Are your AI features available on FedRAMP/HIPAA cells?",
          "How do short-lived tokens work vs service accounts for agents?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "VP IT Security / IT Director",
        "frequency": 0.31,
        "whatTheyCareAbout": [
          "Shadow AI discovery \u2014 knowing what they don't know",
          "MCP connection visibility and whitelisting",
          "Clinical workstation compatibility (multi-user shared workstations)",
          "Practical rollout without overwhelming clinical staff"
        ],
        "typicalQuestions": [
          "How do I discover AI agents I don't even know exist?",
          "Can I whitelist or block MCP connections at the network level?",
          "What happens on multi-user clinical workstations?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "IT Manager / IT Lead",
        "frequency": 0.28,
        "whatTheyCareAbout": [
          "Compliance certifications (SOC 2, HIPAA) to satisfy customer requirements",
          "Practical tooling that doesn't require heavy developer effort",
          "Real-time alerts and monitoring without building custom tooling"
        ],
        "typicalQuestions": [
          "Do you have HIPAA, SOC 2, FedRAMP certifications I can share with customers?",
          "How do I get real-time alerts on suspicious agent behavior without building my own?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Founder / CTO (healthcare startup)",
        "frequency": 0.14,
        "whatTheyCareAbout": [
          "HIPAA BAA availability and timeline before go-live",
          "Startup pricing programs",
          "Programmatic org management via API for multi-tenant healthcare apps",
          "Developer-friendly integration \u2014 can't slow down engineering velocity"
        ],
        "typicalQuestions": [
          "Can I get a HIPAA BAA before mid-April?",
          "Is there a startup discount program?",
          "How do I manage AI agents programmatically via API?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Developer / DevOps Engineer / IT Automation Engineer",
        "frequency": 0.24,
        "whatTheyCareAbout": [
          "Not having to run MCP servers locally on laptops",
          "Developer-friendly auth integration that doesn't slow teams down",
          "Token introspection latency tradeoffs",
          "Custom authorization server access to replace AWS Cognito workarounds"
        ],
        "typicalQuestions": [
          "I'm running MCP on my laptop \u2014 when will there be a hosted option?",
          "Why do I need AWS Cognito if Okta could provide custom auth servers?",
          "How do I enforce short-lived tokens without breaking developer workflows?"
        ],
        "influenceLevel": "evaluator"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Shadow AI is everywhere and we can't see it \u2014 employees are spinning up Claude, ChatGPT, Copilot, Gemini Gems, and custom agents without IT or security awareness, and we're playing whack-a-mole",
        "frequency": 0.83,
        "severity": "critical",
        "exampleQuote": "We told all of them just go do whatever you want. And they are. So we're playing constant whack-a-mole right now on insane requests that we're having to tamp back down."
      },
      {
        "id": "pp-2",
        "statement": "PHI could be leaking through AI agents \u2014 agents with access to both PHI and non-PHI systems can commingle data in a single session, and we have no way to enforce separation",
        "frequency": 0.66,
        "severity": "critical",
        "exampleQuote": "We don't want them reading from a PHI-containing system and then writing or having write access to a non-PHI containing system."
      },
      {
        "id": "pp-3",
        "statement": "MCP connections are completely uncontrolled \u2014 there's no standard protocol we can whitelist at the firewall, engineers run MCP servers locally on laptops, and data is going to unknown destinations",
        "frequency": 0.62,
        "severity": "critical",
        "exampleQuote": "There's no set MCP protocol even really being passed through. So you can't even do whitelisting for what you're going to allow. And people are sending data, who knows where."
      },
      {
        "id": "pp-4",
        "statement": "Okta for AI features aren't available on our HIPAA or FedRAMP cell \u2014 we're stuck waiting on a roadmap with no specific date",
        "frequency": 0.45,
        "severity": "critical",
        "exampleQuote": "For consumer apps, yeah, definitely, it has to be HIPAA."
      },
      {
        "id": "pp-5",
        "statement": "We can't differentiate real users from agents in our logs \u2014 service accounts are being used as agent identities, which means we have admin-level access with no visibility or accountability",
        "frequency": 0.52,
        "severity": "high",
        "exampleQuote": "Teams started connecting agents to GitHub and Google Drive \u2014 we know the agents are internal but they started building things out of our visibility. They were using machine identities or service accounts as a broker because they couldn't capture user tokens."
      },
      {
        "id": "pp-6",
        "statement": "AI agent governance is outpacing our security team \u2014 the business has an 'AI first' mandate but we have no standards, no framework, and no way to govern agents at the pace they're being deployed",
        "frequency": 0.59,
        "severity": "high",
        "exampleQuote": "We're at a rapid pace trying to keep up \u2014 it's a tsunami. Executive level has committed to being AI first \u2014 do we have standards for autonomous agents? Not yet at the level needed."
      },
      {
        "id": "pp-7",
        "statement": "AI agents are non-deterministic \u2014 the same prompt can produce three different outputs, which is a significant patient safety and clinical risk that traditional security controls weren't built for",
        "frequency": 0.28,
        "severity": "high",
        "exampleQuote": "Agents are non-deterministic: same prompt can get three different outputs \u2014 huge implication in healthcare."
      },
      {
        "id": "pp-8",
        "statement": "No agent joiner-mover-leaver (JML) process exists \u2014 agents aren't deprovisioned when the use case ends, there's no ownership, and legacy agents accumulate with unknown access",
        "frequency": 0.45,
        "severity": "high",
        "exampleQuote": "I want to create an agent JML framework similar to human accounts with policies in place."
      },
      {
        "id": "pp-9",
        "statement": "Governance overhead at scale is unsustainable \u2014 assigning human owners to thousands of agents (8,000\u201310,000) and managing per-connection licensing is operationally prohibitive",
        "frequency": 0.31,
        "severity": "high",
        "exampleQuote": "If we go into that route, it is going to do heavy lifting in governance process for all of these agents tomorrow."
      },
      {
        "id": "pp-10",
        "statement": "OAuth and current identity standards aren't sufficient for agentic workloads \u2014 we need time-based access restrictions, scope attenuation, and granular file-level permissions, not just app-level",
        "frequency": 0.38,
        "severity": "moderate",
        "exampleQuote": "OAuth is great but there needs to be more granularity, more time-based access restrictions."
      }
    ],
    "goals": [
      {
        "statement": "Discover all AI agents in the environment \u2014 known and shadow \u2014 before attempting to govern them",
        "frequency": 0.76,
        "successMetric": "Complete agent inventory with owner assigned; zero unknown agents in production after 90 days"
      },
      {
        "statement": "Prevent PHI from leaking through AI agent sessions into non-PHI systems or unauthorized external services",
        "frequency": 0.62,
        "successMetric": "Zero PHI-to-non-PHI data commingling incidents; audit trail of all PHI access by agents"
      },
      {
        "statement": "Centralize MCP control \u2014 replace locally-run MCP servers on developer laptops with a managed, governed MCP gateway",
        "frequency": 0.55,
        "successMetric": "100% of MCP connections routed through central control point; zero unregistered local MCP servers"
      },
      {
        "statement": "Build an agent lifecycle management framework (register, govern, decommission) analogous to human account JML processes",
        "frequency": 0.52,
        "successMetric": "Every agent has an assigned owner; agent access reviews run quarterly; no orphaned agent accounts"
      },
      {
        "statement": "Obtain a HIPAA BAA and compliance certifications (SOC 2, FedRAMP) before deploying AI identity governance in production",
        "frequency": 0.48,
        "successMetric": "BAA signed; AI features enabled in HIPAA or FedRAMP cell; evidence package available for audit"
      },
      {
        "statement": "Get a kill switch \u2014 the ability to instantly revoke an agent's access when it's compromised, out of scope, or acting anomalously",
        "frequency": 0.45,
        "successMetric": "Mean time to revoke a compromised agent < 5 minutes; revocation propagates across all connected resources"
      },
      {
        "statement": "Enforce least-privilege access for agents \u2014 short-lived tokens, scope attenuation, no standing service account credentials",
        "frequency": 0.41,
        "successMetric": "Zero permanent service account credentials in use for agent authentication; all tokens expire within defined window"
      },
      {
        "statement": "Create a compliance-ready audit trail \u2014 log every agent action with human user context preserved through the entire chain",
        "frequency": 0.38,
        "successMetric": "100% of agent transactions logged with user context; audit report generatable in < 1 hour for HIPAA or SOC 2 review"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA) \u2014 Agent Registry + Cross-App Access",
        "relevance": "primary",
        "rationale": "The foundational product discussed in virtually every call. Agent registry provides the identity fabric for non-human identities; cross-app access enables user-context propagation through agent chains without service account credentials.",
        "specificFeatures": [
          "Agent registration and Universal Directory enrollment",
          "Cross-App Access (JWT bearer token exchange)",
          "User context propagation through agent chains",
          "Agent access certification via OIG",
          "Kill switch / universal logout for agents"
        ],
        "frequency": 0.93
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management) \u2014 Shadow AI Discovery",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is the #1 starting goal in nearly every account. ISPM's browser plugin and EDR integrations are the primary mechanism to discover OAuth grants and agent connections employees have made outside IT visibility.",
        "specificFeatures": [
          "Browser extension for OAuth grant detection (Chrome)",
          "EDR integration (CrowdStrike, Zscaler) for agent install detection",
          "SaaS platform connectors (Copilot Studio, Agentforce)",
          "Shadow AI inventory and risk scoring",
          "Managed vs unmanaged app categorization"
        ],
        "frequency": 0.72
      },
      {
        "product": "MCP Adapter / Agent Gateway",
        "relevance": "primary",
        "rationale": "MCP governance is the most acute technical pain. Customers need a centralized MCP control point to replace locally-run MCP servers. Currently PS-delivered; hosted version is a strong roadmap pull.",
        "specificFeatures": [
          "Central MCP control point replacing laptop-hosted servers",
          "Policy enforcement for which MCPs employees can connect to",
          "PHI/non-PHI context-aware authorization (roadmap)",
          "Hosted/managed MCP server (Q3 FY27 roadmap)"
        ],
        "frequency": 0.62
      },
      {
        "product": "Auth0 FGA (Fine-Grained Authorization)",
        "relevance": "secondary",
        "rationale": "Required for PHI data access control at the resource level. Repeatedly cited alongside O4AA for healthcare accounts where PHI isolation is a hard requirement.",
        "specificFeatures": [
          "Document/resource-level access control for PHI",
          "PHI vs non-PHI system separation enforcement",
          "Relationship-based access control for agent permissions"
        ],
        "frequency": 0.38
      },
      {
        "product": "Okta Identity Governance (OIG) \u2014 Agent Certification Campaigns",
        "relevance": "secondary",
        "rationale": "Agent access reviews and certification campaigns extend naturally from existing OIG deployments. Customers want the same quarterly review cycle they use for humans applied to agents.",
        "specificFeatures": [
          "Agent access certification campaigns",
          "Automated deprovisioning of unused agent access",
          "JML workflow for agent lifecycle",
          "Governance reporting for HIPAA/SOC 2 audits"
        ],
        "frequency": 0.45
      },
      {
        "product": "Okta PAM (Privileged Access Management)",
        "relevance": "secondary",
        "rationale": "Agents operating with service account credentials represent a privileged access problem. PAM's secrets vault and just-in-time access patterns are directly applicable to agent credential management.",
        "specificFeatures": [
          "Secrets vault for agent credentials (replacing PATs)",
          "Just-in-time access for agents accessing sensitive systems",
          "Session recording for privileged agent operations"
        ],
        "frequency": 0.31
      },
      {
        "product": "Okta Identity Threat Protection (ITP)",
        "relevance": "secondary",
        "rationale": "Runtime anomaly detection for agent behavior \u2014 detecting when an agent acts outside authorized scope or at superhuman speed. Cited as the risk signal and CAPE kill-switch mechanism.",
        "specificFeatures": [
          "Anomalous agent behavior detection",
          "Risk-based session termination (CAPE) for agents",
          "Superhuman access speed detection",
          "Integration with SIEM (Splunk) for agent event streaming"
        ],
        "frequency": 0.34
      },
      {
        "product": "Okta API Access Management (Custom Authorization Servers)",
        "relevance": "adjacent",
        "rationale": "Developers building MCP gateways need custom authorization servers to control agent access by role and group. Currently workarounded with AWS Cognito in accounts without this SKU.",
        "specificFeatures": [
          "Custom authorization servers for MCP gateway auth",
          "Scope attenuation for agent tokens",
          "Token introspection for real-time validation",
          "Role/group-based access control for agent API access"
        ],
        "frequency": 0.21
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Entra ID / Copilot Studio / Azure)",
        "frequency": 0.45,
        "context": "Present in almost half of accounts as the primary AI development platform or existing identity layer. Microsoft is launching agent identity capabilities with a May 1 2026 GA date, going head-to-head with Okta's April 30 launch. In pure Microsoft shops, customers question why they need Okta at all. Copilot Studio agent import not yet fully supported in O4AA.",
        "differentiators": [
          "Vendor neutrality \u2014 Okta governs agents across OpenAI, Anthropic, Google, Microsoft; Entra only governs Microsoft agents natively",
          "Okta goes GA April 30 \u2014 one day ahead of Microsoft May 1 announcement",
          "Existing Okta workforce identity investment extends naturally to agent identity",
          "Cross-cloud, multi-IdP governance vs Microsoft's single-vendor lock-in"
        ]
      },
      {
        "competitor": "Runlayer",
        "frequency": 0.17,
        "context": "Cited as more mature for context-aware MCP authorization and hub-spoke MCP management. A direct competitor in the MCP governance space that healthcare AI-native companies (Abridge) are actively evaluating alongside Okta.",
        "differentiators": [
          "Okta integrates with Universal Directory \u2014 policies tied to existing identity fabric vs standalone MCP tool",
          "Okta provides full lifecycle governance beyond MCP (OIG, PAM, ITP) while Runlayer is MCP-specific",
          "Okta roadmap for PHI/non-PHI context awareness in MCP adapter"
        ]
      },
      {
        "competitor": "Google Cloud Platform (GCP / Vertex / Gemini)",
        "frequency": 0.21,
        "context": "Heavy Google shops question Okta's value when GCP provides agent discovery, registry, and access control natively within the Google ecosystem. Okta's honest position: if 100% of agent access is within Google, the case is weaker.",
        "differentiators": [
          "Multi-cloud and non-Google coverage \u2014 most enterprises have agents across GCP, AWS, Azure, and SaaS",
          "Vendor-neutral governance layer above any cloud provider",
          "Existing Okta workforce identity prevents introducing another identity silo"
        ]
      },
      {
        "competitor": "Cloudflare (MCP Gateway / Cloudflare One)",
        "frequency": 0.14,
        "context": "Emerging competitor for MCP gateway functionality. Healthcare customers with existing Cloudflare stacks ask whether Okta displaces or complements Cloudflare's MCP gateway. Cloudflare positions on network-layer MCP control.",
        "differentiators": [
          "Okta provides identity-layer governance with user context vs Cloudflare's network-layer approach",
          "Okta integration with OIG, PAM, ITP provides broader governance beyond traffic routing",
          "Complementary positioning possible \u2014 Cloudflare for network, Okta for identity"
        ]
      },
      {
        "competitor": "CyberArk",
        "frequency": 0.1,
        "context": "Mentioned in formal vendor evaluations (McKesson) as an incumbent in the non-human identity and secrets management space. Not leading the AI agent identity conversation but present in competitive RFPs.",
        "differentiators": [
          "Okta extends existing workforce identity investment vs introducing a separate PAM-specific vendor",
          "OIG + PAM + O4AA provides unified governance vs CyberArk's PAM-centric approach"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.07,
        "context": "Present in McKesson's vendor questionnaire alongside CyberArk. Relevant in accounts with mature IGA programs where SailPoint is the incumbent for access governance.",
        "differentiators": [
          "Native Okta integration eliminates connector overhead that SailPoint deployments require",
          "OIG extends to agent identity natively; SailPoint requires custom connectors for AI agent objects"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Okta for AI is not available on our HIPAA or FedRAMP cell \u2014 we can't evaluate or deploy until it is",
        "frequency": 0.45,
        "counterPosition": "Acknowledge this directly \u2014 it is a real limitation today. Offer a parallel track: POC on commercial/developer cell for architecture validation while HIPAA cell roadmap progresses. Set expectation on timeline and get a joint commitment to revisit when HIPAA cell ships.",
        "evidenceSupport": "Multiple accounts (Chamber Cardio, AdventHealth, Tempus, Abridge) blocked on HIPAA/FedRAMP cell availability. This is a recurring blocker, not an edge case."
      },
      {
        "objection": "We're a heavy Microsoft shop \u2014 doesn't Entra ID / Copilot Studio already handle agent identity within our ecosystem?",
        "frequency": 0.45,
        "counterPosition": "If 100% of agent access is within Microsoft, Entra is sufficient \u2014 be direct. The Okta case is strongest when agents touch non-Microsoft systems (AWS Bedrock, Salesforce Agentforce, custom LLMs, third-party SaaS). Probe for multi-cloud agent usage and developer tooling outside Microsoft.",
        "evidenceSupport": "Cardinal Health, HNI Healthcare, Kyntra Bio, Caris MPI all have Microsoft as primary stack. Okta wins on vendor neutrality in mixed-vendor environments."
      },
      {
        "objection": "The licensing model \u2014 per agent-to-user connection \u2014 is prohibitively expensive at scale (8,000\u201310,000 agents)",
        "frequency": 0.31,
        "counterPosition": "Acknowledge pricing uncertainty \u2014 the model is still evolving. Propose a POC scoped to a high-value, bounded use case (e.g., 50 critical agents) to validate before committing to enterprise scale. Note that pricing may shift from per-connection to per-user.",
        "evidenceSupport": "McKesson (10K agents), Exelixis, and others explicitly raised per-connection pricing as a potential blocker. Pricing model is actively changing per Okta SE comments."
      },
      {
        "objection": "Runlayer is more mature for context-aware MCP authorization \u2014 why choose Okta's PS-delivered adapter over a purpose-built MCP tool?",
        "frequency": 0.17,
        "counterPosition": "Runlayer solves the MCP problem in isolation. Okta's value is the integration with existing identity fabric \u2014 policies tied to Universal Directory, governance through OIG, anomaly detection via ITP. A standalone MCP tool creates another identity silo. The MCP adapter is the entry point; the hosted gateway is on roadmap.",
        "evidenceSupport": "Abridge specifically evaluated Runlayer and cited it as more mature for context-aware MCP. Okta's competitive response should focus on breadth, not MCP maturity alone."
      },
      {
        "objection": "We already have a working in-house agent stack \u2014 agents currently work around Okta due to API and MCP authentication limitations. Adding Okta adds cost without solving our existing problem.",
        "frequency": 0.21,
        "counterPosition": "The workaround is the problem \u2014 agents bypassing Okta means there is no audit trail, no governance, and no kill switch. Ask: 'When you need to revoke that agent's access, what does that process look like?' The lack of an answer is the business case.",
        "evidenceSupport": "Unlock Health explicitly stated agents work around Okta. This surfaces a real product limitation (MCP auth gaps) that must be acknowledged alongside the governance value proposition."
      },
      {
        "objection": "The standards aren't mature enough \u2014 agent-to-agent swarm governance and time-based access restrictions aren't in OAuth yet",
        "frequency": 0.28,
        "counterPosition": "Agree that the standards are evolving \u2014 Okta is actively participating in standards development. Position O4AA as the governance layer on top of today's imperfect standards, so customers aren't waiting for the standards to solidify before gaining visibility. Start with discovery and registration; add enforcement as standards mature.",
        "evidenceSupport": "Cotiviti, Labcorp, Cardinal Health all raised standards maturity. Okta SEs acknowledged the roadmap is fluid due to the pace of industry change."
      },
      {
        "objection": "We're 6\u201312 months from active agentic AI deployment \u2014 we don't need this now",
        "frequency": 0.24,
        "counterPosition": "Shadow AI isn't waiting for your deployment timeline. Employees are already connecting Claude, ChatGPT, and Copilot to corporate resources today. Discovery is the immediate value \u2014 understand what's in your environment before your official rollout begins. 'If you don't get it right at deployment there won't be another opportunity.'",
        "evidenceSupport": "American Oncology Network, Xanitos, Direct Supply all at 6\u201312 month horizon but with confirmed shadow AI activity already present."
      },
      {
        "objection": "Auth0 is not wanted \u2014 we need a pure Okta SDK path for custom agent development",
        "frequency": 0.17,
        "counterPosition": "Okta's native SDK path (cross-app access, agent registry) is the primary mechanism and does not require Auth0. Auth0 FGA is an optional add-on for fine-grained authorization at the resource level. Lead with the Okta-native path and introduce Auth0 FGA only when document/resource-level PHI control becomes a specific requirement.",
        "evidenceSupport": "Labcorp explicitly stated 'Auth0 not wanted \u2014 need pure Okta SDK path.' Cotiviti's team also preferred native Okta approach."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents do you believe are operating in your environment today \u2014 and how many do you actually know about versus suspect exist?",
        "callPhase": "opening",
        "rationale": "Surfaces the shadow AI gap immediately. The delta between 'believe' and 'know' defines the discovery urgency and sets up ISPM's value."
      },
      {
        "question": "When a clinician or developer connects an AI tool to internal systems and grants it access to patient data, does that show up anywhere in your security monitoring today?",
        "callPhase": "pain-exploration",
        "rationale": "Healthcare-specific framing of the OAuth grant visibility problem. PHI angle creates immediate HIPAA urgency."
      },
      {
        "question": "Are any of your AI agents currently authenticating with service accounts or long-lived API keys? How would you know if one of those credentials was compromised?",
        "callPhase": "pain-exploration",
        "rationale": "Exposes service account over-provisioning. The 'how would you know' question reveals absence of monitoring and creates kill-switch urgency."
      },
      {
        "question": "If a patient data breach traced back to an AI agent accessing PHI beyond its authorized scope, how would you produce the audit trail for your compliance team and regulators?",
        "callPhase": "pain-exploration",
        "rationale": "HIPAA-specific consequence framing. Forces the compliance gap to become concrete rather than theoretical."
      },
      {
        "question": "Are you currently operating on Okta's HIPAA cell or FedRAMP environment? And is that a hard requirement for any AI governance tooling you evaluate?",
        "callPhase": "technical",
        "rationale": "Surface the HIPAA/FedRAMP blocker early. If yes, set roadmap expectations immediately rather than building evaluation momentum toward a wall."
      },
      {
        "question": "When your developers build or connect AI agents, are they running MCP servers locally? Who controls where those MCP connections go?",
        "callPhase": "technical",
        "rationale": "MCP governance is the most acute near-term pain. Local MCP servers are a near-universal problem in technical healthcare orgs."
      },
      {
        "question": "If an AI agent needed to be shut down immediately \u2014 compromised, out of scope, or behaving unexpectedly \u2014 what does that process look like today?",
        "callPhase": "pain-exploration",
        "rationale": "Kill-switch question. The absence of a clear answer is the strongest business case for O4AA. Virtually no account has a good answer."
      },
      {
        "question": "You mentioned Microsoft Copilot / Google Vertex / [other AI platform] \u2014 are all of your AI agents running within that ecosystem, or do you also have agents accessing AWS, Salesforce, or non-Microsoft/Google SaaS?",
        "callPhase": "technical",
        "rationale": "Vendor neutrality differentiator. Probes whether the customer is truly single-vendor (Okta case weaker) or multi-vendor (Okta wins clearly)."
      },
      {
        "question": "When a physician or researcher connects an AI tool to your systems, does that connection go through Okta's authentication flow \u2014 or does it happen outside Okta entirely?",
        "callPhase": "technical",
        "rationale": "Surfaces the bypass problem. If agents route around Okta, the audit trail and governance gap is immediate and concrete."
      },
      {
        "question": "Do your compliance frameworks \u2014 HIPAA, HITRUST, SOC 2, or any upcoming audit \u2014 require you to demonstrate governance and access controls for non-human identities including AI agents?",
        "callPhase": "decision-process",
        "rationale": "Ties the technical problem to a compliance timeline. HITRUST renewal, SOC 2 audit, or HIPAA risk assessment creates a hard deadline that accelerates deal cycle."
      }
    ],
    "proofPoints": [
      {
        "metric": "80% of healthcare organizations have adopted AI, but more than half cannot see what their agents are doing",
        "source": "Cited by Chamber Cardio call participant (March 2026) \u2014 attributed to industry data; original study not specified in transcript",
        "confidence": "narrative"
      },
      {
        "metric": "44% of organizations have no AI agent governance in place despite 91% using AI agents",
        "source": "Okta survey, March 2026 (okta.com/ai) \u2014 cited in multiple calls as conversation framing",
        "confidence": "soft"
      },
      {
        "metric": "800+ software engineers given unrestricted AI access resulted in 'constant whack-a-mole' security incidents requiring IT intervention",
        "customer": "[Health Software Company]",
        "source": "WellSky Gong transcript, March 27 2026 \u2014 Director of Information Security direct quote",
        "confidence": "narrative"
      },
      {
        "metric": "An over-provisioned AI agent with more access than it should have 'definitely scared the organization' \u2014 led to executive security mandate",
        "customer": "[Healthcare AI Company]",
        "source": "Abridge Win Lab Review Gong transcript, March 9 2026 \u2014 AE observation",
        "confidence": "narrative"
      },
      {
        "metric": "Governance overhead of managing 8,000\u201310,000 agents with per-connection licensing model is operationally unsustainable at enterprise scale",
        "customer": "[Healthcare Distributor]",
        "source": "McKesson Gong transcript, March 13 2026 \u2014 Architect direct quote",
        "confidence": "narrative"
      },
      {
        "metric": "Agents work around Okta authentication in ~100% of agentic interactions at organizations with in-house agent stacks, because of MCP auth limitations \u2014 creating a complete audit trail gap",
        "customer": "[Healthcare Technology Company]",
        "source": "Unlock Health Gong transcript, March 30 2026 \u2014 CTO direct statement",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from first AI conversation to POC commitment; 6\u20139 months to close for enterprise accounts. Startups and SMB close faster (6\u201312 weeks) driven by HIPAA BAA deadlines. Existing Okta customers add O4AA at renewal cycle.",
      "typicalStages": [
        {
          "stage": "AI Security Awareness / Education",
          "description": "First call introducing Okta's AI agent security capabilities. Customer often has informal shadow AI policy ('blessed on a wiki page') and limited understanding of the risk surface. Goal is to surface what they don't know about their environment.",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "Shadow AI awareness conversation using ISPM discovery story",
            "PHI/non-PHI leakage risk framing",
            "Share Okta AI agent overview deck and video recording",
            "Schedule ISPM trial or POC discussion"
          ]
        },
        {
          "stage": "Discovery + Demo",
          "description": "Technical discovery to map agent landscape and compliance requirements. Demo of ISPM discovery + agent registry. HIPAA cell / FedRAMP compatibility assessed. Security engineer and IT director engaged.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Discovery questions on current agent inventory, service account usage, MCP usage",
            "ISPM browser plugin demo and trial setup (30-day trial common)",
            "O4AA cross-app access demo with agent registration walkthrough",
            "Confirm HIPAA cell / FedRAMP requirements and set timeline expectations",
            "Compliance certifications (HIPAA BAA, SOC 2, FedRAMP) documentation provided"
          ]
        },
        {
          "stage": "Technical Validation / POC",
          "description": "Hands-on evaluation in customer environment or sandbox. ISPM browser plugin deployed to detect shadow OAuth grants. MCP adapter proof-of-concept if applicable. Preview tenant enabled with O4AA SKU.",
          "typicalDuration": "3\u20136 weeks",
          "keyActivities": [
            "Preview tenant enabled with O4AA SKU",
            "ISPM trial to discover shadow AI agents in live environment",
            "MCP adapter workshop (PS-delivered) if MCP governance is the primary use case",
            "Cross-app access technical workshop for agent authentication flows",
            "Use case mapping: identify 2\u20133 priority agent governance scenarios",
            "Compliance documentation review for HIPAA/SOC 2 audit readiness"
          ]
        },
        {
          "stage": "Business Justification + Stakeholder Alignment",
          "description": "Move from technical champion to CISO/CIO sponsorship. Quantify risk of ungoverned agents. Align to compliance timeline (HITRUST renewal, SOC 2 audit, HIPAA risk assessment). Executive briefing common.",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "Executive briefing with CISO / CIO (EBC or on-site)",
            "Risk quantification: PHI exposure scenarios, audit failure cost, incident response overhead",
            "Compliance timeline mapping: when does governance need to be in place for next audit?",
            "Pricing and licensing discussion \u2014 confirm per-user vs per-connection model",
            "Reference call with similar healthcare org if available"
          ]
        },
        {
          "stage": "Commercial Negotiation + Close",
          "description": "Legal, procurement, and HIPAA BAA execution. Phased deal common: core Okta workforce Phase 1, O4AA Phase 2 attached to renewal or as standalone SKU.",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "HIPAA BAA execution (blocking requirement for production deployment)",
            "Pricing finalization \u2014 startup discount, renewal attachment, or standalone SKU",
            "Statement of work for PS-delivered MCP adapter if applicable",
            "Implementation timeline agreement",
            "Phase 2 commitment for O4AA attached to Phase 1 workforce identity close"
          ]
        }
      ],
      "commonBlockers": [
        "HIPAA cell / FedRAMP cell unavailability for O4AA features \u2014 blocks production deployment entirely",
        "CISO unavailability (tied up in FedRAMP audit, board prep, or incident response) \u2014 blocks executive sign-off",
        "Budget fully committed to AI initiatives \u2014 security governance competes with AI deployment spend",
        "Per-connection licensing model creates sticker shock at enterprise agent scale (5,000\u201310,000 agents)",
        "Heavy Microsoft shop asks 'why not just use Entra?' \u2014 requires multi-vendor proof before proceeding",
        "MCP adapter is PS-delivered, not native product \u2014 creates delivery uncertainty and PS cost objection",
        "Agent-to-agent swarm governance not yet production-ready \u2014 advanced use cases blocked on roadmap"
      ],
      "accelerators": [
        "Over-provisioned agent incident or shadow AI security scare \u2014 creates urgency at executive level",
        "Upcoming compliance audit with agent governance requirement (HIPAA risk assessment, HITRUST renewal, SOC 2)",
        "Existing Okta customer at renewal \u2014 add O4AA to renewal cycle with minimal new procurement motion",
        "Executive 'AI first' mandate that outpaces security team \u2014 CISO needs a governance answer quickly",
        "Developer productivity crisis \u2014 MCP servers on laptops causing operational pain, not just security risk",
        "GA April 30 2026 announcement \u2014 creates a concrete 'now is the time to start' moment"
      ]
    },
    "realQuotes": [
      {
        "quote": "We told all of them just go do whatever you want. And they are. So we're playing constant whack-a-mole right now on insane requests that we're having to tamp back down.",
        "context": "Director of Information Security describing the shadow AI problem after giving 800+ engineers unrestricted AI tool access",
        "speakerRole": "Director of Information Security"
      },
      {
        "quote": "There's no set MCP protocol even really being passed through. So you can't even do whitelisting for what you're going to allow. And people are sending data, who knows where.",
        "context": "Explaining why network-layer MCP controls don't work and why identity-layer governance is needed",
        "speakerRole": "Director of Information Security"
      },
      {
        "quote": "We have no way to enforce it. We basically bless it and put it on a wiki page and say, hey use these tools for this.",
        "context": "Describing the current state of AI agent governance \u2014 policy exists on paper but cannot be technically enforced",
        "speakerRole": "Enterprise Security Engineer"
      },
      {
        "quote": "Teams started connecting agents to GitHub and Google Drive \u2014 we know the agents are internal but they started building things out of our visibility. They were using machine identities or service accounts as a broker because they couldn't capture user tokens.",
        "context": "Senior InfoSec manager describing how developers bypassed user-context authentication by using service accounts to give agents persistent access to corporate resources",
        "speakerRole": "Senior Manager Information Security"
      },
      {
        "quote": "I want to create an agent JML framework similar to human accounts with policies in place. Can we build it similar to how we do with human accounts and automate approvals?",
        "context": "CISO articulating the governance framework they want built for AI agents, directly analogous to human account lifecycle",
        "speakerRole": "CISO"
      },
      {
        "quote": "Most of the benefits that Okta gives us are usually tied to the human components. The agents work around Okta in many cases because of authentication limitations.",
        "context": "CTO at a healthcare tech company with an in-house agent stack explaining why their agents bypass Okta authentication flows entirely",
        "speakerRole": "CTO"
      },
      {
        "quote": "We're at a rapid pace trying to keep up \u2014 it's a tsunami. Executive level has committed to being AI first \u2014 do we have standards for autonomous agents? Not yet at the level needed.",
        "context": "Large healthcare lab company VP describing the gap between executive AI mandate and actual governance readiness",
        "speakerRole": "VP Digital Trust Officer"
      },
      {
        "quote": "Agents are non-deterministic: same prompt can get three different outputs \u2014 huge implication in healthcare.",
        "context": "Healthcare technology company CTO explaining why AI agent security in healthcare is uniquely high-stakes compared to other industries",
        "speakerRole": "CTO"
      }
    ]
  },
  {
    "id": "technology-customer-facing-ai-agents",
    "industry": "technology",
    "useCase": "customer-facing-ai-agents",
    "transcriptCount": 23,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (500\u2013100,000+ employees); also early-stage startups and scale-ups building B2B SaaS platforms. Includes ISVs, cybersecurity vendors, cloud infrastructure providers, and developer tooling companies.",
      "aiMaturity": "Early-to-mid: Most are in POC or pilot phase (1\u201310 internal/customer-facing agents deployed). A few are at production scale (85M MAU, 3M daily transactions). The majority are racing to launch within 6\u201312 months and have not yet solved agent identity.",
      "triggerEvent": "AI product roadmap pressure \u2014 CTO or CEO commits publicly to an AI feature before identity architecture is solved. Existing auth system (homegrown, Auth0 without agent features, or static API keys) hits a wall when agents need to act on behalf of users, call third-party APIs, or operate across tenant boundaries.",
      "buyingMotion": "Bottom-up technical evaluation led by Principal/Staff Engineers or Architects who discover the gap, escalating to VP Engineering or CTO for budget. Auth0 for AI is often an add-on to an existing Auth0 CIAM relationship or a net-new evaluation alongside a broader CIAM replacement. Typical path: Gong/inbound interest \u2192 technical discovery \u2192 POC/trial \u2192 pricing \u2192 contract.",
      "typicalBudgetHolder": "VP Engineering or CTO for smaller companies; Director of Engineering/Architecture or Head of Identity for larger enterprises. CISO becomes involved when agent security posture or compliance is in scope."
    },
    "stakeholders": [
      {
        "role": "Principal / Staff / Distinguished Engineer",
        "frequency": 0.65,
        "whatTheyCareAbout": [
          "Correct OAuth 2.0 flows for agent-to-agent and user-to-agent delegation",
          "Token lifecycle management (refresh, rotation, scoping) without building it in-house",
          "MCP server authorization and security",
          "Audit trail that distinguishes user actions from agent actions",
          "Latency requirements (sub-20ms authorization calls at scale)"
        ],
        "typicalQuestions": [
          "How does token exchange work when an agent acts on behalf of an authenticated user?",
          "Does Token Vault replace HashiCorp Vault for OAuth token management?",
          "What is the FGA permission index query latency at 3M daily transactions?",
          "How do we register and deregister agents dynamically at scale?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "CTO / VP Engineering / Co-founder",
        "frequency": 0.57,
        "whatTheyCareAbout": [
          "Time to market \u2014 shipping AI features before competitors",
          "Avoiding building and maintaining identity infrastructure in-house",
          "Architecture decisions that scale without re-platforming",
          "Budget justification for a new identity SKU on top of existing spend"
        ],
        "typicalQuestions": [
          "Can Auth0 serve as the IdP for our AI agents the same way it does for our human users?",
          "What does the pricing look like at our scale?",
          "Do you have reference customers who have shipped agentic products with Auth0?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Head of AI Innovation / AI Product Architect",
        "frequency": 0.35,
        "whatTheyCareAbout": [
          "Defining the reference architecture for agent identity company-wide",
          "Best-of-breed composition (identity + ZTNA, identity + AI orchestration)",
          "How Okta/Auth0 fits into the broader AI stack (AWS Bedrock, AgentCore, etc.)",
          "Governing agent behavior and preventing prompt injection or unauthorized escalation"
        ],
        "typicalQuestions": [
          "What does a reference architecture for secure agentic AI look like with Auth0?",
          "How does Auth0 integrate with AWS AgentCore / Google Vertex / Microsoft Copilot?",
          "How do you handle agent swarm governance \u2014 judge/supervisor hierarchies?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "IAM Architect / Identity Manager / IAM Engineer",
        "frequency": 0.3,
        "whatTheyCareAbout": [
          "Integrating agent identities into existing Okta/Auth0 deployment",
          "SCIM and provisioning for agent accounts",
          "Role and permission model for agent principals",
          "Cross-app access configuration and token exchange flows"
        ],
        "typicalQuestions": [
          "How do we represent agents as principals in Universal Directory?",
          "Can agents be governed through the same OIG certification campaigns as human users?",
          "How does cross-app access token exchange work in practice?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Director of Engineering / Engineering Manager",
        "frequency": 0.26,
        "whatTheyCareAbout": [
          "Team velocity \u2014 not burning engineering cycles on identity plumbing",
          "Roadmap sequencing (what to build now vs. defer to platform)",
          "Scaling from pilot to production without re-architecture"
        ],
        "typicalQuestions": [
          "How long does it take to integrate Auth0 for AI agents into an existing Auth0 deployment?",
          "What is the migration path from static API keys to Token Vault?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "CISO / Chief of Staff",
        "frequency": 0.22,
        "whatTheyCareAbout": [
          "Shadow AI \u2014 ungoverned agents accessing corporate resources",
          "Compliance readiness (FedRAMP, SOX, audit trails for agent actions)",
          "AI governance as a board-level risk topic",
          "Vendor perception and trust (prior breach history can block deals)"
        ],
        "typicalQuestions": [
          "How do you provide an audit trail of every action an AI agent took and why?",
          "Can we prove to auditors which agent accessed which data and under whose authorization?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Account Executive / Sales Leader (internal Okta/Auth0)",
        "frequency": 0.43,
        "whatTheyCareAbout": [
          "Deal sequencing: don't conflate AI messaging with immediate CIAM replacement priority",
          "Competitive positioning against Descope, Microsoft Entra, Keycloak",
          "Pricing and packaging clarity for new AI SKUs",
          "Identifying the right internal champion before escalating to CISO or CTO"
        ],
        "typicalQuestions": [],
        "influenceLevel": "influencer"
      },
      {
        "role": "VP / EVP Product & Engineering",
        "frequency": 0.17,
        "whatTheyCareAbout": [
          "Defining company-wide governance policy for AI agents before dev teams build ad hoc",
          "Enterprise-grade identity as a product differentiator for their customers",
          "Reference architecture they can distribute internally and externally"
        ],
        "typicalQuestions": [
          "What does a production-grade reference architecture for agentic AI security look like?",
          "How do we enforce governance without blocking developer velocity?"
        ],
        "influenceLevel": "decision-maker"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Agents are using static API keys and service accounts \u2014 there's no standard way to give them a real identity, scope their access, or revoke it when something goes wrong",
        "frequency": 0.65,
        "severity": "critical",
        "exampleQuote": "\"What I'm looking for this agentic project is an identity provider that can sort of provide that missing puzzle piece of, well, what do we do about agent identities?\""
      },
      {
        "id": "pp-2",
        "statement": "We can't tell the difference between what a user did and what an agent did on their behalf \u2014 our audit trail doesn't distinguish them",
        "frequency": 0.52,
        "severity": "critical",
        "exampleQuote": "\"We do not have a clear distinction between actions performed by a user and actions performed by an agent on behalf of a user.\""
      },
      {
        "id": "pp-3",
        "statement": "Managing OAuth tokens for agents calling third-party APIs (Gmail, GitHub, Jira, Datadog, etc.) is painful \u2014 we built our own caching or use HashiCorp Vault, but it's brittle and doesn't scale",
        "frequency": 0.48,
        "severity": "high",
        "exampleQuote": "\"Token Vault \u2014 it's like a 1Password for your bot.\""
      },
      {
        "id": "pp-4",
        "statement": "We have no governance framework for AI agents \u2014 dev teams are building agents ad hoc, and there's no policy or visibility into what they're accessing",
        "frequency": 0.48,
        "severity": "critical",
        "exampleQuote": "\"For me, it's just not having a whole lot of policy \u2014 and like making it enforceable.\""
      },
      {
        "id": "pp-5",
        "statement": "Agent-to-agent delegation is unsolved \u2014 when one agent needs to call another or spawn a sub-agent, there's no standard trust model",
        "frequency": 0.39,
        "severity": "high",
        "exampleQuote": "\"The challenge now is how that access is being used \u2014 what AI has done is now that access is not necessarily going to do the same thing every time, it's going to do something of its own accord because it now has access to do it and it thinks it's a good idea to do it.\""
      },
      {
        "id": "pp-6",
        "statement": "We need fine-grained authorization at massive scale \u2014 checking permissions across millions of document-user relationships for RAG and chatbot use cases is too slow without pre-computation",
        "frequency": 0.35,
        "severity": "high",
        "exampleQuote": "\"The backbone of secure stable enterprise agents is going to be the permission that those agents have behind the scenes. CEO said the core of AI is authorization at scale.\""
      },
      {
        "id": "pp-7",
        "statement": "MCP is moving fast and customers want it, but securing MCP server connections is an open problem \u2014 connections are being opened without proper auth controls",
        "frequency": 0.35,
        "severity": "high",
        "exampleQuote": "\"People are chomping at the bit for MCP \u2014 we're like slow down it's very unsecure.\""
      },
      {
        "id": "pp-8",
        "statement": "High-stakes agent actions need a human approval step, but we don't have async authorization \u2014 the agent either acts autonomously or we block the whole flow waiting for a user response",
        "frequency": 0.3,
        "severity": "high",
        "exampleQuote": "\"Human-in-the-loop concept is interesting \u2014 that could solve our authorization issue.\""
      },
      {
        "id": "pp-9",
        "statement": "Auth0 is SaaS-only, which disqualifies it for customers serving regulated industries (healthcare, government) who require private cloud or on-prem deployment",
        "frequency": 0.26,
        "severity": "critical",
        "exampleQuote": "\"If it's going to be some SaaS or hosted solution, that's where the conversation mostly ends for private cloud.\""
      },
      {
        "id": "pp-10",
        "statement": "We can't estimate transaction volumes 12\u201318 months out for new AI use cases \u2014 pricing and capacity planning models built for stable workloads don't fit agentic patterns",
        "frequency": 0.22,
        "severity": "moderate",
        "exampleQuote": "\"If I told you exactly how many I need today, I'm just wrong \u2014 this is all so new and growing so rapidly.\""
      }
    ],
    "goals": [
      {
        "statement": "Give AI agents a first-class identity \u2014 register them, scope their access, and revoke them through the same platform used for human users",
        "frequency": 0.7,
        "successMetric": "Every agent has a managed identity; zero orphaned agent credentials in production"
      },
      {
        "statement": "Secure third-party API token management for agents \u2014 replace static keys and fragile caching with a governed token vault",
        "frequency": 0.52,
        "successMetric": "Agents retrieve scoped, rotated tokens on demand; no hardcoded credentials in agent code"
      },
      {
        "statement": "Implement fine-grained authorization for AI-generated data access (RAG, chatbots, document retrieval) so agents only return data the requesting user is authorized to see",
        "frequency": 0.43,
        "successMetric": "Authorization evaluated per-request at p95 < 20ms; no over-permissioned data exposure in chatbot outputs"
      },
      {
        "statement": "Add human-in-the-loop (async authorization) for high-stakes agent actions \u2014 user approves before the agent executes",
        "frequency": 0.39,
        "successMetric": "Agent pauses on sensitive operations; user receives approval request and can approve or deny asynchronously"
      },
      {
        "statement": "Secure and standardize MCP server connections \u2014 protect MCP endpoints with proper OAuth 2.1 and scope management",
        "frequency": 0.35,
        "successMetric": "All MCP tool invocations are authenticated and authorized; no unauthenticated MCP endpoints in production"
      },
      {
        "statement": "Build a reference architecture for agentic AI security to distribute to internal engineering teams and stop ad hoc agent development",
        "frequency": 0.35,
        "successMetric": "Published internal standard adopted by all teams building agents; governance policy enforced centrally"
      },
      {
        "statement": "Enable customer-facing AI features (chatbots, digital assistants, autonomous agents) that enterprise customers will trust \u2014 with audit trails, scoped permissions, and revocation controls",
        "frequency": 0.3,
        "successMetric": "Enterprise customers can review agent activity logs; agents operate with least-privilege scopes tied to the user's authorization"
      },
      {
        "statement": "Scale agent authorization to production workloads (millions of transactions/day) without building and operating custom authorization infrastructure",
        "frequency": 0.26,
        "successMetric": "FGA authorization calls handle 3M+ daily transactions at acceptable latency; no custom auth infra maintained by engineering"
      }
    ],
    "productFit": [
      {
        "product": "Auth0 for AI Agents (Token Vault)",
        "relevance": "primary",
        "rationale": "The most consistently surfaced product across all agent-identity conversations. Addresses the core pain of managing third-party OAuth tokens for agents calling external APIs. Frequently positioned as replacing ad hoc caching, Redis workarounds, and HashiCorp Vault for agent token management.",
        "specificFeatures": [
          "Third-party OAuth token storage and rotation",
          "Scoped token retrieval by agent identity",
          "Integration with GitHub, Gmail, Jira, Datadog, and 30+ providers",
          "Agent-as-principal token issuance"
        ],
        "frequency": 0.65
      },
      {
        "product": "Auth0 Fine-Grained Authorization (FGA)",
        "relevance": "primary",
        "rationale": "Core requirement for RAG and chatbot use cases where document-level access control must be enforced at query time. Also needed for permission modeling in agent swarm hierarchies. FGA Permission Index specifically requested for sub-20ms latency at scale.",
        "specificFeatures": [
          "Relation-based access control (ReBAC) for document-user tuples",
          "Permission Index for pre-computed authorization at scale",
          "Intent-based authorization (infer permissions from prompt context)",
          "Cross-subsidiary relationship graphs"
        ],
        "frequency": 0.52
      },
      {
        "product": "Auth0 for MCP (MCP Server Authorization)",
        "relevance": "primary",
        "rationale": "Emerging requirement across nearly all technical conversations. MCP adoption is accelerating faster than security practices, creating an immediate need for OAuth 2.1-protected MCP endpoints. Includes both the Auth0-hosted MCP gateway and the on-prem MCP adapter for customers who cannot use SaaS for all connections.",
        "specificFeatures": [
          "OAuth 2.1 enforcement on MCP server connections",
          "MCP gateway for centralized tool access management",
          "On-prem MCP adapter for private cloud / regulated environments",
          "Per-agent MCP server authorization"
        ],
        "frequency": 0.48
      },
      {
        "product": "CIBA (Client-Initiated Backchannel Authentication / Human-in-the-Loop)",
        "relevance": "primary",
        "rationale": "Repeatedly cited as the mechanism to implement async human approval for sensitive agent actions. Customers understand the concept quickly and see immediate applicability, but want to see working implementations before committing.",
        "specificFeatures": [
          "Async authorization request from agent to user",
          "User approves/denies via mobile push or notification",
          "Agent flow pauses until authorization resolved",
          "Audit record of approval decision"
        ],
        "frequency": 0.43
      },
      {
        "product": "Cross-App Access / Token Exchange",
        "relevance": "primary",
        "rationale": "Required for agent-to-agent delegation and user-to-agent delegation patterns. Enables propagating user identity and context through multi-step agent chains without re-authenticating at each hop.",
        "specificFeatures": [
          "RFC 8693 Token Exchange for agent delegation",
          "act claims (JWT actor claim) for agent-on-behalf-of-user tracing",
          "Cross-application access control policies",
          "Identity propagation through multi-agent workflows"
        ],
        "frequency": 0.39
      },
      {
        "product": "Auth0 Organizations (B2B Multi-Tenancy)",
        "relevance": "secondary",
        "rationale": "Frequently co-purchased with AI agent capabilities by B2B SaaS companies that need to isolate agent permissions, API connections, and audit data per customer tenant. Nested organization support is a recurring gap.",
        "specificFeatures": [
          "Per-organization agent registration and scoping",
          "Self-service SSO per tenant",
          "Organization-level RBAC for agent principals",
          "Nested organization hierarchy (requested, limited today)"
        ],
        "frequency": 0.35
      },
      {
        "product": "Okta for AI Agents (Workforce/Enterprise Control Plane)",
        "relevance": "secondary",
        "rationale": "Relevant when the buyer is an enterprise platform provider (ServiceNow, Snowflake, Docker) that wants a control plane for governing which AI agents are authorized to run in their environment, discoverable via ISPM and governed via OIG certification.",
        "specificFeatures": [
          "Agent discovery and inventory (ISPM)",
          "Agent identity lifecycle via Universal Directory",
          "OIG certification campaigns for agent access review",
          "Universal Logout for instant agent revocation"
        ],
        "frequency": 0.3
      },
      {
        "product": "Auth0 Universal Login + Passkeys",
        "relevance": "adjacent",
        "rationale": "Baseline CIAM requirement that frequently co-exists with AI agent discussions. Customers on homegrown IdP evaluating Auth0 for AI also need modern passwordless auth for their human users. AI agent auth discussions often surface alongside MFA, passkey, and SCIM gaps in existing deployments.",
        "specificFeatures": [
          "Passkeys (FIDO2/WebAuthn)",
          "Adaptive MFA",
          "SCIM provisioning for enterprise customers",
          "Progressive enrollment"
        ],
        "frequency": 0.26
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Homegrown / Custom-Built",
        "frequency": 0.48,
        "context": "The most common incumbent. Companies built their own auth (NSL at Gen Digital, custom JWT wrapping at ReliaQuest, Redis caching at Hard Skills) and hit scaling or security walls when agents arrived. The transition from 'it works for humans' to 'it breaks for agents' is the primary trigger event.",
        "differentiators": [
          "Auth0 eliminates ongoing build and maintenance burden as agent patterns evolve",
          "Standards compliance (OAuth 2.0, RFC 8693) vs. proprietary token formats that vendors won't interop with",
          "Audit trail built in vs. retrofitting logging onto custom systems"
        ]
      },
      {
        "competitor": "HashiCorp Vault",
        "frequency": 0.17,
        "context": "Used by security-mature companies for secrets management and token storage. Auth0 Token Vault competes here for the OAuth-token-management use case specifically, not general secrets management. The differentiation is agent-aware token lifecycle vs. static secret storage.",
        "differentiators": [
          "Token Vault handles OAuth refresh and rotation automatically \u2014 Vault requires custom logic",
          "Agent identity context tied to tokens \u2014 Vault stores credentials without agent attribution",
          "Auth0 native integration vs. side-car Vault architecture"
        ]
      },
      {
        "competitor": "Microsoft (Entra ID / Azure AD B2C / Copilot)",
        "frequency": 0.17,
        "context": "Mentioned as existing workforce IdP, as a competitor for CIAM replacement, and as a preview entrant into agent identity. Entra's agent identity capabilities are in preview and pose a future threat for Microsoft-heavy shops.",
        "differentiators": [
          "Auth0 supports multi-cloud and non-Microsoft stacks \u2014 Entra agent identity tied to Azure ecosystem",
          "Auth0 FGA provides relation-based access control Entra does not match for RAG/chatbot use cases",
          "Vendor-neutral identity fabric for agent populations spanning AWS, GCP, and Azure workloads"
        ]
      },
      {
        "competitor": "AWS (AgentCore / Bedrock)",
        "frequency": 0.17,
        "context": "AWS positioned as a platform integration partner (Auth0 has a native dropdown in AgentCore) as well as a potential competitor for agent identity in AWS-native stacks. The partnership framing is more common than the competitive framing.",
        "differentiators": [
          "Auth0 plugs directly into AgentCore \u2014 described as a native dropdown option",
          "Auth0 provides identity across multi-cloud agent deployments; AgentCore is AWS-native",
          "Auth0 FGA for authorization is deeper than IAM policies for complex ReBAC use cases"
        ]
      },
      {
        "competitor": "Descope",
        "frequency": 0.13,
        "context": "Appeared in one competitive evaluation (Qualtrics) where Descope won an initial foothold with a custom SCIM connector at $130K/year. Descope's land-and-expand motion \u2014 solve one immediate pain cheaply \u2014 is a genuine competitive threat against Auth0's full-platform approach.",
        "differentiators": [
          "Auth0 platform breadth (FGA, Token Vault, CIBA) is the long-term value proposition \u2014 Descope is a point solution",
          "Auth0's existing ecosystem and integrations reduce total cost over time",
          "Challenge: Auth0 must overcome the perception of complexity and large lift vs. Descope's targeted quick win"
        ]
      },
      {
        "competitor": "Keycloak / Open Source IAM",
        "frequency": 0.13,
        "context": "Relevant for private cloud / regulated industry customers who cannot use SaaS. Keycloak is often the fallback when Auth0's SaaS-only deployment model is a disqualifier.",
        "differentiators": [
          "Auth0 managed service eliminates operational overhead of self-hosting Keycloak",
          "Auth0 FGA, Token Vault, and CIBA have no Keycloak equivalents",
          "Keycloak wins on deployment flexibility \u2014 Auth0 SaaS-only is a real constraint for private cloud buyers"
        ]
      },
      {
        "competitor": "FastMCP / Open Source MCP Proxies",
        "frequency": 0.13,
        "context": "Used by engineering teams as a stopgap for MCP server access control. No auth, no governance, just plumbing. Present in early-stage deployments that need to evolve as production scale and security requirements increase.",
        "differentiators": [
          "Auth0 MCP gateway adds OAuth 2.1, per-agent scoping, and audit logging",
          "FastMCP has no identity \u2014 Auth0 ties MCP access to agent and user identity",
          "Enterprise governance and revocation absent from open source MCP proxies"
        ]
      },
      {
        "competitor": "Google Vertex AI / FastMCP (Google)",
        "frequency": 0.09,
        "context": "Mentioned in context of GCP OAuth client proliferation and internal agent management. Google's identity infrastructure for agents is fragmented and creates shadow credential problems.",
        "differentiators": [
          "Auth0 centralizes OAuth client governance \u2014 GCP per-project OAuth clients create uncontrolled proliferation",
          "Auth0 provides vendor-neutral agent identity vs. GCP-native credentials"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Auth0 is SaaS-only \u2014 we need on-premise or private cloud deployment for regulated industry customers (healthcare, government) or air-gapped environments",
        "frequency": 0.26,
        "counterPosition": "Acknowledge this is a real constraint \u2014 Auth0 SaaS is the architecture and cannot be deployed on-prem. For MCP specifically, the on-prem MCP adapter bridges some of this gap for hybrid patterns. For full on-prem identity requirements, evaluate Okta CIC (FedRAMP) or qualify whether the regulated workload can be isolated while agents use SaaS auth for the control plane.",
        "evidenceSupport": "Rackspace (private cloud AI for healthcare/government) was a confirmed no-fit; Vorto flagged FedRAMP as a potential requirement that would require Okta CIC rather than Auth0."
      },
      {
        "objection": "Our agents don't use Auth0 at all right now \u2014 we convert tokens to our own internal JWT immediately, so Token Vault doesn't fit our architecture",
        "frequency": 0.22,
        "counterPosition": "Validate whether the custom JWT system handles OAuth token refresh for third-party APIs, agent attribution in audit logs, and human-in-the-loop authorization. Most custom JWT systems answer 'no' to at least one of these. The value is not replacing the internal JWT but adding agent-specific capabilities the custom system lacks.",
        "evidenceSupport": "ReliaQuest converts Auth0 tokens to internal JWT immediately, yet lacks audit trail delineation between user and agent actions and needs OAuth token management for third-party API calls \u2014 both Auth0-solvable gaps."
      },
      {
        "objection": "We're all internal first-party APIs right now \u2014 Token Vault is designed for third-party integrations, so it doesn't apply",
        "frequency": 0.22,
        "counterPosition": "Token Vault is the most visible part of Auth0 for AI, but CIBA (human-in-the-loop) and FGA (fine-grained authorization) apply equally to internal API patterns. If agents cross internal system boundaries with user context, Cross-App Access and token exchange solve the propagation problem regardless of whether the APIs are first-party.",
        "evidenceSupport": "Riskonnect: all-internal APIs, but human-in-the-loop concept resonated immediately as solving their authorization challenge."
      },
      {
        "objection": "Agents are still in POC phase \u2014 our product team controls the roadmap and timing, so we don't have an immediate need",
        "frequency": 0.22,
        "counterPosition": "Use this as a discovery conversation, not a closing call. Introduce the pattern library (Token Vault, CIBA, FGA, Cross-App Access) and plant the question: when you hit the security wall on static keys or need human approval for sensitive actions, what's your plan? Leave sandbox access and documentation. Follow up when they hit POC blockers.",
        "evidenceSupport": "Riskonnect and several other companies are in early POC phase \u2014 the deal timing is 3\u20139 months out but the technical conversation now shapes the architectural decision."
      },
      {
        "objection": "The CISO or VP has a bad perception of Okta from the 2023 breach \u2014 this creates a trust barrier even when the technical team is interested",
        "frequency": 0.13,
        "counterPosition": "Acknowledge the breach directly \u2014 it was real and Okta has published post-incident reviews and security improvements. Separate Auth0 (CIAM platform, independent architecture) from Okta workforce identity if the concern is breach risk to enterprise identity systems. Offer to connect with Okta's CISO or a customer reference in the same industry.",
        "evidenceSupport": "Qualtrics: CISO and direct report (ex-PayPal) have negative Okta perception, flagged explicitly as a deal blocker."
      },
      {
        "objection": "This is an additional SKU cost on top of what we already pay \u2014 the AI agent features should be included in our existing plan",
        "frequency": 0.13,
        "counterPosition": "Position the AI SKU as a new product category, not a feature add. The token vault, FGA, and CIBA capabilities are net-new engineering investment with standalone market value. Use renewal timing as an opportunity to reframe value \u2014 what does ungoverned agent access cost vs. the incremental SKU?",
        "evidenceSupport": "F&I Sentinel: AI agents feature is an additional SKU; surfaced at renewal discussion."
      },
      {
        "objection": "We already have a working homegrown system \u2014 why would we replace it just for AI?",
        "frequency": 0.22,
        "counterPosition": "The homegrown system was built for deterministic, scripted workflows. AI agents are non-deterministic \u2014 they make novel decisions at runtime based on context, and they need to be stopped, scoped, or escalated in ways scripts never did. The question is not whether the current system works today, but whether it can enforce policy on something that 'thinks it's a good idea' to take an action it wasn't explicitly told to take.",
        "evidenceSupport": "Vorto, Qualtrics, and Gen Digital all have homegrown systems that are functional for current use cases but have no answer for agent-specific governance requirements."
      },
      {
        "objection": "We can't estimate future transaction volumes for pricing \u2014 AI usage patterns are too unpredictable to commit to a volume tier",
        "frequency": 0.22,
        "counterPosition": "Offer flexible consumption-based or usage-tracked pricing options. Lead with sandbox access to establish the architectural fit before forcing a volume commitment. Reference that FedEx, CARFAX, and other enterprise customers navigated this same uncertainty and started with conservative estimates that were adjusted over time.",
        "evidenceSupport": "CARFAX explicitly stated inability to predict volume 18 months out for a new use case."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "When one of your AI agents acts on behalf of a user \u2014 say, connecting to their Gmail or GitHub \u2014 how does the agent prove to that external service that it's authorized to act for that specific user?",
        "callPhase": "pain-exploration",
        "rationale": "Immediately surfaces the static-key / OAuth-gap pain. Most companies answer 'service account' or 'we store the user's token somewhere' \u2014 both of which reveal the problem Auth0 Token Vault solves."
      },
      {
        "question": "If an agent takes an action in your system right now and something goes wrong, can you pull an audit log that shows exactly which agent did what, under whose authorization, and when?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the audit trail gap \u2014 the inability to distinguish user actions from agent actions is nearly universal and compliance teams will surface this as agents reach production."
      },
      {
        "question": "For high-stakes actions \u2014 like an agent deleting a file, sending a message on behalf of a customer, or modifying an account \u2014 does the agent just go ahead and do it, or does a human have to approve first?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the CIBA / human-in-the-loop conversation. Most customers know they need this but haven't implemented it. The question makes the gap concrete."
      },
      {
        "question": "When your AI agents query your data to generate responses \u2014 for a chatbot or copilot, for example \u2014 how do you ensure the agent only returns data the requesting user is actually authorized to see?",
        "callPhase": "technical",
        "rationale": "The authorization gap for RAG and chatbot use cases. Data leakage through over-permissioned agents is a CISO-level concern. This question triggers the FGA conversation."
      },
      {
        "question": "How many distinct teams in your engineering organization are building AI agents right now, and do they all follow the same identity and access pattern?",
        "callPhase": "opening",
        "rationale": "Surfaces governance fragmentation. The answer is almost always 'multiple teams, no standard' \u2014 which is the exact problem Auth0 for AI addresses at the organization level."
      },
      {
        "question": "What's your plan for connecting AI agents to MCP servers? Have you started thinking about how to authenticate and authorize those connections?",
        "callPhase": "technical",
        "rationale": "MCP is moving faster than security practices. This question meets customers where they are on a hot topic and positions Auth0 MCP authorization as the answer to a security problem they already feel."
      },
      {
        "question": "When you think about your AI agent roadmap 12 months out, what's the use case that keeps the security or engineering team up at night \u2014 the one where you know you need to solve identity before you can ship it?",
        "callPhase": "opening",
        "rationale": "Identifies the blocking use case and creates urgency. Moves from general interest to a specific, timeline-bound commitment."
      },
      {
        "question": "Are your agents already in production with customers, or still in POC? And who in your organization owns the security architecture decision for those agents?",
        "callPhase": "opening",
        "rationale": "Qualifies deal stage and identifies the right stakeholder to engage. POC-stage deals need different motion than production-scale customers."
      },
      {
        "question": "Have you hit any limits with your current approach \u2014 rate limits on token refresh, OAuth client proliferation, or developers creating their own credentials under different cloud projects?",
        "callPhase": "pain-exploration",
        "rationale": "Targets specific pain patterns seen repeatedly: GCP OAuth client sprawl (Snowflake), Redis caching for M2M tokens (Hard Skills), HashiCorp Vault token rotation limitations (ReliaQuest, Verint)."
      },
      {
        "question": "If a deployed agent is compromised or starts behaving unexpectedly, what's your current process to revoke its access \u2014 and how long does that take?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the revocation gap. Static API keys and service accounts cannot be revoked in real time across all connected services. Universal Logout for AI Agents solves this."
      }
    ],
    "proofPoints": [
      {
        "metric": "Auth0 for AI Agents has generated 300+ customer conversations in 3 weeks \u2014 the most talked-about offering in the portfolio",
        "customer": "[Tech Company SE team]",
        "source": "Gen Digital Auth0 demo call, March 2026 \u2014 Okta SE observation",
        "confidence": "narrative"
      },
      {
        "metric": "Filevine technical win for Auth0 FGA to authorize an AI legal chatbot across 80 billion documents \u2014 deal in Stage 6 with contract target of July 2026",
        "customer": "[Tech Company - Legal SaaS]",
        "source": "Filevine FGA Win Lab internal review, March 30 2026",
        "confidence": "hard"
      },
      {
        "metric": "Auth0 has a native dropdown integration in AWS AgentCore \u2014 described by AWS partner SA as 'I want to use Auth0' being selectable directly in AgentCore configuration",
        "customer": "[Tech Company - AWS]",
        "source": "Gen Digital Okta AWS AI Discussion, March 11 2026 \u2014 AWS Sr WW Partner Solutions Architect",
        "confidence": "soft"
      },
      {
        "metric": "AI governance named the number one enterprise trend for 2026 by the Dell chief AI officer",
        "customer": "[Enterprise Platform Company]",
        "source": "ServiceNow + Okta AI Agents call, March 19 2026 \u2014 referenced by ServiceNow IAM Engineer",
        "confidence": "soft"
      },
      {
        "metric": "CARFAX consumer-facing agents require ~3 million authorization hits per day \u2014 evaluating FGA for relation-based access control across multiple subsidiaries",
        "customer": "[Automotive Data Company]",
        "source": "Okta-CARFAX AI Use Case Discussion, March 11 2026",
        "confidence": "hard"
      },
      {
        "metric": "ReliaQuest (Grey Matter AI) has 4\u20135 AI agent teammates live in production and is expanding access to all new customers \u2014 with no current audit trail distinguishing agent actions from user actions",
        "customer": "[Cybersecurity Platform Company]",
        "source": "ReliaQuest Auth0 AI Overview, March 11 2026",
        "confidence": "hard"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20139 months from first technical contact to contract. Earliest closers are existing Auth0 customers adding the AI SKU at renewal (4\u20138 weeks). New logo deals with a clear production use case and executive sponsor close in 3\u20135 months. Deals blocked by divestiture, CISO change, or FedRAMP requirements can extend 9\u201312+ months.",
      "typicalStages": [
        {
          "stage": "Technical Discovery",
          "description": "SE or SDR connects with Principal Engineer, AI Architect, or CTO. Customer articulates an agent identity problem (static keys, no audit trail, MCP security gap). Call establishes whether Auth0 for AI fits the pattern.",
          "typicalDuration": "1\u20132 calls, 1\u20132 weeks",
          "keyActivities": [
            "Identify the specific agent pattern: user-to-agent delegation, agent-to-agent, autonomous agent calling third-party APIs",
            "Confirm deployment model (SaaS acceptable vs. private cloud requirement)",
            "Map current auth approach: static keys, service accounts, custom JWT, HashiCorp Vault",
            "Determine deal stage: POC, pilot, or production planning"
          ]
        },
        {
          "stage": "POC / Sandbox Access",
          "description": "Customer evaluates Auth0 for AI in a trial tenant or free Professional tier. Focus on Token Vault, FGA, or CIBA depending on primary pain. SE provides code samples and reference architectures.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Set up trial Auth0 tenant (21-day trial or startup plan)",
            "Demonstrate Token Vault with the customer's actual third-party API targets",
            "Provide Python/Node SDK samples for CIBA and Cross-App Access",
            "Share fga.dev environment for FGA exploration",
            "Bring in FGA specialist or CIBA specialist if deep technical questions arise"
          ]
        },
        {
          "stage": "Architecture Alignment",
          "description": "Technical win established. SE and Principal SE align on the full architecture: which products, what scopes, how agent identities are registered and managed at scale. Pricing and volume estimates discussed.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Define agent identity registration pattern (dynamic client registration, manual, API-driven)",
            "Scope FGA model and permission index requirements",
            "Estimate transaction volumes for pricing (acknowledge uncertainty, use conservative ranges)",
            "Introduce MCP adapter or gateway architecture if relevant",
            "Confirm SCIM, RBAC, and organization structure for B2B multi-tenant use cases"
          ]
        },
        {
          "stage": "Commercial / Procurement",
          "description": "AE engages with budget holder (VP Engineering, CTO, or procurement). Contract targets established. Common blockers: new SKU pricing pushback, FedRAMP gaps, CISO perception issues.",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "Align on pricing model (per-token, per-agent, or MAU-based)",
            "Address CISO objections (breach perception, compliance gaps)",
            "Provide customer references in same industry if available",
            "Resolve EDR, FedRAMP, or SLA requirements",
            "Define contract structure for existing Auth0 customers adding AI SKU"
          ]
        }
      ],
      "commonBlockers": [
        "Private cloud / on-prem deployment requirement disqualifies Auth0 SaaS \u2014 no workaround for full on-prem",
        "FedRAMP High requirement not met by Auth0 (targeting Moderate by end of 2027)",
        "CISO or VP with negative Okta brand perception from 2023 breach",
        "Agents still in early POC \u2014 product team controls timing, engineering team cannot commit",
        "Pending organizational change (divestiture, new CISO hire) delays identity architecture decisions",
        "Custom internal JWT system with internal advocates resistant to migrating to Auth0 token patterns",
        "Cross-app access standard not yet adopted by target API vendors (Claude/Anthropic, Jira, etc.)"
      ],
      "accelerators": [
        "Existing Auth0 customer \u2014 AI SKU adds to known platform at renewal",
        "Production agent already live and hitting a security or scale wall (static key rotation failure, audit trail gap surfaced by compliance)",
        "CTO or CEO has publicly committed to an AI feature \u2014 engineering team has a hard ship deadline",
        "AWS partnership \u2014 Auth0 native in AgentCore removes one evaluation step",
        "FGA technical win \u2014 once the ReBAC model is proven, deal momentum accelerates quickly",
        "MCP interest \u2014 MCP is the current hottest topic; securing MCP connections creates immediate urgency"
      ]
    },
    "realQuotes": [
      {
        "quote": "What I'm looking for this agentic project is an identity provider that can sort of provide that missing puzzle piece of, well, what do we do about agent identities?",
        "context": "Head of AI Innovation explaining the gap in the ecosystem at the start of an Auth0 evaluation for an agentic ZTNA platform",
        "speakerRole": "Head of AI Innovation"
      },
      {
        "quote": "The challenge now is how that access is being used \u2014 what AI has done is now that access is not necessarily going to do the same thing every time, it's going to do something of its own accord because it now has access to do it and it thinks it's a good idea to do it.",
        "context": "IS Engineer at a large data platform company explaining why deterministic script governance models break down for autonomous AI agents using the same OAuth credentials",
        "speakerRole": "IS Engineer"
      },
      {
        "quote": "We do not have a clear distinction between actions performed by a user and actions performed by an agent on behalf of a user.",
        "context": "Principal Software Engineer at a cybersecurity platform describing their current audit trail gap after explaining they have 4\u20135 AI agent teammates already live in production",
        "speakerRole": "Principal Software Engineer"
      },
      {
        "quote": "The backbone of secure stable enterprise agents is going to be the permission that those agents have behind the scenes. CEO said the core of AI is authorization at scale.",
        "context": "Internal win lab debrief after a technical win for FGA to power an AI legal chatbot needing to authorize access across 80 billion documents",
        "speakerRole": "Corporate Customer Account Executive"
      },
      {
        "quote": "People are chomping at the bit for MCP \u2014 we're like slow down it's very unsecure.",
        "context": "Lead SRE at a technology company describing the tension between developer enthusiasm for MCP integrations and security team concerns about unauthenticated MCP endpoints",
        "speakerRole": "Lead Site Reliability Engineer"
      },
      {
        "quote": "If I told you exactly how many transactions I need today, I'm just wrong \u2014 this is all so new and growing so rapidly.",
        "context": "Director of Technology Operations at an automotive data company explaining why they cannot commit to a volume-based pricing tier for FGA in an agent use case expected to scale to millions of daily calls",
        "speakerRole": "Director of Technology Operations"
      },
      {
        "quote": "Agents right now do not do anything with Auth0 at all \u2014 we immediately convert the identity token to our own JWT.",
        "context": "Principal Software Engineer describing their current agent architecture where Auth0 is used for human user auth but agents bypass Auth0 entirely, creating the audit and token management gaps",
        "speakerRole": "Principal Software Engineer"
      },
      {
        "quote": "You guys should actually work on something that we could consume in the data center \u2014 that's something that everyone is going to be looking for.",
        "context": "ML Technical Architect at a managed cloud services provider explaining why Auth0 SaaS-only deployment ends the conversation for private cloud AI customers in healthcare and government",
        "speakerRole": "ML Technical Architect"
      }
    ]
  },
  {
    "id": "manufacturing-workforce-ai-agents",
    "industry": "manufacturing",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 15,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Large enterprise (5,000\u2013200,000+ employees); global operations with distributed manufacturing sites and IT/OT environments",
      "aiMaturity": "Early-to-mid adoption \u2014 dev teams and business units deploying agents independently (Copilot Studio, AWS Bedrock, GitHub Copilot) with minimal central oversight; most are in discovery or POC phase for governance",
      "triggerEvent": "Proliferation of AI agents across the enterprise without any central registry or kill switch; compliance pressure (EU AI Act, partner/customer audits); new CISO or CIO asking about AI governance posture; upcoming supply chain or agentic AI initiative",
      "buyingMotion": "Top-down when triggered by a new security leader; bottom-up when IAM or security teams identify shadow agent risk. Deals frequently stall pending FY budget cycles or executive alignment. Often enters through existing Okta relationship upsell.",
      "typicalBudgetHolder": "CISO or Deputy CISO (primary); VP or Director of IT (secondary); occasionally a dedicated AI security/governance team lead. Budget decisions often require CIO buy-in for net-new spend."
    },
    "stakeholders": [
      {
        "role": "CISO / Deputy CISO",
        "frequency": 0.47,
        "whatTheyCareAbout": [
          "AI agents as an expanding, ungoverned attack surface",
          "Compliance posture for EU AI Act, SOX, and partner-driven audit requirements",
          "Ability to demonstrate governance and control to the board",
          "Risk of credential exposure via AI agents"
        ],
        "typicalQuestions": [
          "How do we know what agents are running and what they can access?",
          "Can we revoke an agent's access instantly if something goes wrong?",
          "Does this satisfy our AI Act or audit obligations?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "IT Director / VP Information Technology",
        "frequency": 0.47,
        "whatTheyCareAbout": [
          "Cost justification before broader evaluation",
          "Operational fit with existing Okta deployment",
          "Scale implications for a large workforce (50K\u2013200K employees)",
          "Avoiding agent sprawl across AWS Bedrock, Copilot Studio, and GitHub"
        ],
        "typicalQuestions": [
          "What is the SKU and pricing structure?",
          "How does this work with our existing Okta tenant?",
          "Who owns this program \u2014 IT, security, or the AI team?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "IAM Architect / Sr. Manager Identity and Access",
        "frequency": 0.53,
        "whatTheyCareAbout": [
          "Technical feasibility and integration architecture",
          "How agent identities are registered, governed, and deprovisioned",
          "MCP adapter deployment model (SaaS vs. self-hosted)",
          "Audit trail linking agent actions to the initiating human user"
        ],
        "typicalQuestions": [
          "How do we register agents that were built outside our control?",
          "Can we enforce least privilege at the MCP server level?",
          "Does the kill switch work across agent frameworks, not just Okta-native ones?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Enterprise Architect / Solutions Architect",
        "frequency": 0.4,
        "whatTheyCareAbout": [
          "Architectural patterns for agent identity at scale",
          "Cross-platform governance (AWS Bedrock, Copilot Studio, GitHub Copilot, custom MCP servers)",
          "Future-proofing the identity fabric before agent count scales",
          "Integration with existing SIEM and logging infrastructure"
        ],
        "typicalQuestions": [
          "What is the agent identity lifecycle model?",
          "How does this handle agents we didn't build \u2014 third-party or shadow agents?",
          "What does the logging overhead look like at scale?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Director of Infrastructure & Platform Engineering",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Practical operationalization of agent governance alongside existing IAM",
          "Avoiding friction for developer teams while adding security controls",
          "UEBA-equivalent capabilities for machine identities"
        ],
        "typicalQuestions": [
          "How do we govern agents built with user credentials that are acting like service accounts?",
          "Can we get behavioral analytics on agent activity, not just human users?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Information Security Business Manager / Senior Security Administrator",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Risk-based posture assessment for AI agents",
          "Inventory completeness \u2014 knowing what agents exist",
          "Logging and audit evidence for compliance reviews"
        ],
        "typicalQuestions": [
          "How do we get a risk score across all agents, not just the ones we know about?",
          "What does the audit evidence look like for a regulator?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "AI Strategy Lead / Innovation Team",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "Speed of AI deployment without security blocking innovation",
          "Enabling developers and business teams to build agents safely",
          "Future-proofing the architecture for agentic AI scale"
        ],
        "typicalQuestions": [
          "How do we let teams move fast without creating governance debt?",
          "Can we build agents today and apply governance retroactively?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "IAM Lead / Identity Management Lead",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Day-to-day operational management of agent identities",
          "Integration with existing directory and provisioning workflows",
          "Lifecycle management for agents across joiner/mover/leaver equivalents"
        ],
        "typicalQuestions": [
          "How do we deprovision an agent when a project ends?",
          "Does this plug into our existing Okta Workflows for automation?"
        ],
        "influenceLevel": "champion"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "AI agents are proliferating across the enterprise \u2014 Copilot Studio, AWS Bedrock, GitHub Copilot \u2014 and no one has a central inventory of what exists, what it can access, or who owns it",
        "frequency": 0.87,
        "severity": "critical",
        "exampleQuote": "We have to set the foundation, set that architecture layer to support what we see coming which is a proliferation of many agents into the environment in the coming months and year."
      },
      {
        "id": "pp-2",
        "statement": "Shadow agents are running outside any identity control plane \u2014 no kill switch, no audit trail, no way to know if an agent is acting rogue",
        "frequency": 0.73,
        "severity": "critical",
        "exampleQuote": "How do I know if this agent is acting rogue is essentially what you're getting at?"
      },
      {
        "id": "pp-3",
        "statement": "Agents are being built with human user credentials but operating like service accounts \u2014 the identity model doesn't exist to handle this hybrid",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "You have people with human identities creating these agents using their access, whereas this stuff is really meant to be running in the background almost akin to a service account. How do we solve for that from a lifecycle development perspective?"
      },
      {
        "id": "pp-4",
        "statement": "No audit trail linking agent actions back to the initiating human user \u2014 compliance and forensics are impossible when something goes wrong",
        "frequency": 0.53,
        "severity": "critical",
        "exampleQuote": "Without an actor ID you can't limit scope or audit agent actions."
      },
      {
        "id": "pp-5",
        "statement": "Business teams \u2014 not developers \u2014 are deploying agents (Copilot Studio, low-code tools) without any security review or governance framework in place",
        "frequency": 0.47,
        "severity": "high",
        "exampleQuote": "People building Copilot Studio agents without governance framework in place. Business teams (not developers) using agents that need to be governed."
      },
      {
        "id": "pp-6",
        "statement": "No centralized governance across multiple cloud environments and agent platforms \u2014 each platform is operating as its own island",
        "frequency": 0.47,
        "severity": "high",
        "exampleQuote": "We've got many different cloud environments and they're all kind of to some degree operating as their own companies."
      },
      {
        "id": "pp-7",
        "statement": "Dev teams are building MCP servers and agent-to-backend connections without enterprise security standards or centralized policy enforcement",
        "frequency": 0.4,
        "severity": "high",
        "exampleQuote": "Dev teams building MCP servers without enterprise security standards. No guardrails for MCP usage. No central policy enforcement across agent frameworks."
      },
      {
        "id": "pp-8",
        "statement": "AI governance blueprint is still undefined internally \u2014 teams are in learning mode, making any procurement decision feel premature",
        "frequency": 0.4,
        "severity": "moderate",
        "exampleQuote": "The blueprint for AI governance is still evolving because the tech stack is changing so fast every week."
      },
      {
        "id": "pp-9",
        "statement": "Non-human identities \u2014 service accounts, AI agents, RPA bots \u2014 have never been governed with the same rigor as human identities, and that debt is now surfacing",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "Non-human identities is another angle we knew had to be tackled."
      },
      {
        "id": "pp-10",
        "statement": "Cost pressure from existing identity vendors (or Microsoft E5 bundle) makes expanding the Okta footprint a difficult internal sell without a clear, quantified ROI",
        "frequency": 0.33,
        "severity": "moderate",
        "exampleQuote": "Okta price is more than our CrowdStrike cost \u2014 there is a hard look right now at whether we'll continue the Okta partnership."
      }
    ],
    "goals": [
      {
        "statement": "Discover and inventory all AI agents \u2014 known and shadow \u2014 across every platform before the count scales beyond control",
        "frequency": 0.8,
        "successMetric": "Complete agent inventory with owner, platform, permissions, and risk score within 30 days of deployment"
      },
      {
        "statement": "Register AI agents as first-class identities with mandatory human ownership and lifecycle management (create, modify, deprovision)",
        "frequency": 0.73,
        "successMetric": "100% of active agents have a registered Okta identity with an assigned owner"
      },
      {
        "statement": "Implement a kill switch \u2014 the ability to instantly revoke any agent's access across all connected systems",
        "frequency": 0.6,
        "successMetric": "Mean time to revoke agent access reduced from days/unknown to under 5 minutes"
      },
      {
        "statement": "Enforce least privilege for agent-to-resource connections, scoped to the initiating user's permissions",
        "frequency": 0.6,
        "successMetric": "Zero agents with standing access to production resources outside their defined task scope"
      },
      {
        "statement": "Build the governance foundation now, before agent proliferation makes retroactive control impossible",
        "frequency": 0.53,
        "successMetric": "Governance framework in place before next quarterly AI deployment cycle"
      },
      {
        "statement": "Enable developers and business teams to deploy agents faster by embedding security controls into the build process \u2014 not blocking innovation",
        "frequency": 0.47,
        "successMetric": "Agent deployment time unchanged or faster; security review automated via policy"
      },
      {
        "statement": "Comply with EU AI Act requirements and satisfy partner or customer audit demands for AI agent governance",
        "frequency": 0.33,
        "successMetric": "Audit-ready evidence package for all AI agent activity on demand"
      },
      {
        "statement": "Get Okta into the AI strategy conversation at the executive level \u2014 align identity governance with the broader agentic AI program",
        "frequency": 0.27,
        "successMetric": "Executive sponsor (CISO/CIO) formally includes identity governance in AI program charter"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA)",
        "relevance": "primary",
        "rationale": "Directly addresses the core need: registering AI agents as identities, enforcing lifecycle governance, and providing a kill switch. Mentioned or implied in every signal.",
        "specificFeatures": [
          "Agent identity registration in Universal Directory",
          "Mandatory human ownership assignment",
          "Universal Logout / kill switch for AI agents",
          "Cross-App Access (XAA) for scoped agent-to-resource authorization",
          "MCP Adapter for routing all agent connections through the Okta control plane",
          "Workload Principal IDs (WLP) for non-human actors"
        ],
        "frequency": 0.93
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is table stakes before any governance can be applied. ISPM's ability to detect unregistered agents across platforms is the entry point for the conversation.",
        "specificFeatures": [
          "Shadow AI agent discovery across SaaS and cloud platforms",
          "Agent inventory with risk scoring",
          "Posture gap identification for non-human identities",
          "Integration with Microsoft Entra ID environment for agent discovery"
        ],
        "frequency": 0.8
      },
      {
        "product": "Okta Identity Governance (OIG)",
        "relevance": "secondary",
        "rationale": "Extends governance to agent access certifications, joiner/mover/leaver equivalents for agents, and access request workflows. Several customers already have OIG licensed.",
        "specificFeatures": [
          "Access certification campaigns extended to AI agent identities",
          "Entitlement management for agent permissions",
          "Workflow automation for agent provisioning/deprovisioning"
        ],
        "frequency": 0.47
      },
      {
        "product": "Okta Privileged Access (OPA)",
        "relevance": "secondary",
        "rationale": "AI agents accessing production systems, supply chain data, or sensitive manufacturing infrastructure require privileged access controls equivalent to human admins.",
        "specificFeatures": [
          "Credential vaulting for agent service accounts",
          "Session recording for high-privilege agent activity",
          "JIT access for agents performing sensitive operations"
        ],
        "frequency": 0.4
      },
      {
        "product": "Okta Identity Threat Protection (ITP)",
        "relevance": "secondary",
        "rationale": "Customers want UEBA-equivalent detection for machine/agent identities \u2014 detecting rogue agent behavior, anomalous access patterns, and compromised agent credentials.",
        "specificFeatures": [
          "Continuous risk evaluation for non-human identities",
          "Automated response to anomalous agent behavior",
          "Integration with CrowdStrike and SIEM for correlated threat signals"
        ],
        "frequency": 0.4
      },
      {
        "product": "Okta Workflows",
        "relevance": "secondary",
        "rationale": "Automation of agent lifecycle events (registration, permission updates, deprovisioning) maps naturally to existing Workflows deployments in this customer segment.",
        "specificFeatures": [
          "Agent onboarding/offboarding automation",
          "Policy-driven remediation workflows triggered by ISPM findings",
          "Integration with HR systems for ownership tracking"
        ],
        "frequency": 0.33
      },
      {
        "product": "Universal Directory",
        "relevance": "secondary",
        "rationale": "The identity store for AI agent registration \u2014 customers need a single authoritative directory for both human and non-human identities.",
        "specificFeatures": [
          "Agent identity profiles with owner, platform, permissions metadata",
          "Cross-directory federation for agents sourced from multiple platforms",
          "Attribute-based access control for agent-to-resource authorization"
        ],
        "frequency": 0.33
      },
      {
        "product": "Okta Fine-Grained Authorization (FGA)",
        "relevance": "adjacent",
        "rationale": "Customers with complex supply chain data access requirements need document- or resource-level authorization for agents \u2014 beyond coarse role-based controls.",
        "specificFeatures": [
          "Policy-based authorization at MCP server level",
          "Resource-scoped permissions for agent data access",
          "Relationship-based access control for supply chain data hierarchies"
        ],
        "frequency": 0.2
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Entra ID / Copilot Studio / E5 bundle)",
        "frequency": 0.47,
        "context": "Microsoft is both the platform customers are using to build agents (Copilot Studio, Power Automate) and the identity vendor they are considering as a cost-driven alternative to Okta. E5 licensing creates a 'free' SSO narrative. Microsoft's AI agent governance offering (E7 SKU) is seen as vaporware by technical buyers.",
        "differentiators": [
          "Okta governs agents across ALL platforms \u2014 not just Microsoft. Copilot Studio agents are 20% of the problem.",
          "Microsoft E7 AI governance SKU described by a prospect as 'crack smoking vaporware' \u2014 no viable product today",
          "Okta is the neutral identity layer; Microsoft governance only works within the Microsoft stack",
          "Okta has a GA-timed product (April 30) with a working POC guide \u2014 Microsoft has a roadmap"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.27,
        "context": "Existing IGA deployments that are expensive, underutilized, or failing to extend to non-human identities. Competitive evaluation in active deals.",
        "differentiators": [
          "SailPoint implementations described as 'millions invested and barely scratched the surface'",
          "Okta's unified platform avoids the connector tax that plagues standalone IGA tools",
          "Forrester TEI: OIG delivers 211% ROI with sub-6-month payback vs. multi-year SailPoint programs"
        ]
      },
      {
        "competitor": "CrowdStrike",
        "frequency": 0.2,
        "context": "Used as a cost benchmark by security buyers evaluating Okta's value. Some customers pay more for Okta than CrowdStrike and struggle to justify it internally.",
        "differentiators": [
          "CrowdStrike secures endpoints; Okta secures identities \u2014 complementary, not competitive",
          "Okta ITP + CrowdStrike integration provides endpoint-to-identity threat correlation",
          "The comparison is a sign of value communication failure, not a real competitive threat"
        ]
      },
      {
        "competitor": "AWS Bedrock / AWS Q Developer",
        "frequency": 0.2,
        "context": "Agent development platforms where agents are being built without Okta integration. Not a direct identity competitor but a source of shadow agents.",
        "differentiators": [
          "Okta governs agents regardless of where they run \u2014 Bedrock agents need Okta identity just like any other",
          "ISPM discovers Bedrock-hosted agents that IT didn't register"
        ]
      },
      {
        "competitor": "HashiCorp Vault",
        "frequency": 0.07,
        "context": "Mentioned in one deal as an alternative for credential management for agents.",
        "differentiators": [
          "Okta provides full identity lifecycle, not just credential vaulting",
          "Vault requires separate governance layer; Okta provides governance, vaulting, and access control in one platform"
        ]
      },
      {
        "competitor": "Ping Identity (PingOne)",
        "frequency": 0.13,
        "context": "Active competitive evaluation in at least one deal alongside Microsoft and SailPoint.",
        "differentiators": [
          "Okta's AI agent governance is GA \u2014 Ping's roadmap is unclear",
          "Okta's vendor-neutral position vs. Ping's Oracle/Thales ownership trajectory"
        ]
      },
      {
        "competitor": "CyberArk / Delinea",
        "frequency": 0.13,
        "context": "Existing PAM vendors that haven't extended governance to AI agent identities. Mentioned in competitive evaluations.",
        "differentiators": [
          "PAM tools govern privileged human sessions; Okta governs the entire agent identity lifecycle",
          "AI agents need identity governance (lifecycle, ownership, authorization) not just session recording"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We only have 1-2 agents in production right now \u2014 the urgency isn't there yet",
        "frequency": 0.47,
        "counterPosition": "Every customer we've talked to said the same thing six months before their agent count exploded. The cost of retrofitting governance at 50 agents is 10x the cost of building the foundation at 2. You're not buying for today \u2014 you're buying for the proliferation that's already been approved internally.",
        "evidenceSupport": "Jabil, Flex, and Pella all described imminent agent proliferation as the reason to build the foundation now, not after the fact"
      },
      {
        "objection": "The AI governance blueprint is still evolving \u2014 we're not ready to commit",
        "frequency": 0.4,
        "counterPosition": "The blueprint evolving is exactly why you need an identity control plane that can adapt. Okta doesn't require you to have the full governance policy defined \u2014 it gives you the inventory, ownership, and kill switch so that when your policy is defined, you have the enforcement layer ready. You can't govern what you haven't registered.",
        "evidenceSupport": "EU AI Act enforcement timeline creates a hard compliance deadline regardless of internal readiness"
      },
      {
        "objection": "Microsoft SSO/E5 is 'free' \u2014 why pay for Okta when we already have Microsoft licenses",
        "frequency": 0.33,
        "counterPosition": "Entra governs Microsoft agents. Your agents run on AWS Bedrock, Copilot Studio, GitHub, and custom Python scripts. 'Free' for 20% of the problem is not free \u2014 it's a credential management gap for the other 80%. Okta is the control plane for the entire mixed-platform reality, not just the Microsoft stack.",
        "evidenceSupport": "Multiple customers using Copilot Studio confirmed it doesn't provide cross-platform agent governance"
      },
      {
        "objection": "The product is still in early access \u2014 we'll wait for GA",
        "frequency": 0.33,
        "counterPosition": "GA is April 30 with introductory pricing. Customers in early access are getting first-mover advantage on pricing and shaping the product roadmap. Waiting for GA means paying more and starting the evaluation process over.",
        "evidenceSupport": "Eaton POC and Jabil technical deep-dive both referenced April 30 GA with introductory pricing window"
      },
      {
        "objection": "We prefer not to add new vendors in a volatile AI market \u2014 we want most value for least cost",
        "frequency": 0.27,
        "counterPosition": "This isn't a new vendor \u2014 this is extending your existing Okta investment to non-human identities. The ISPM and O4AA capabilities are additive to what you already have. The alternative is adding a point solution for agent governance that doesn't integrate with your existing identity fabric.",
        "evidenceSupport": "Fortune Brands explicitly stated preference for existing Okta relationship vs. new vendor"
      },
      {
        "objection": "MCP adapter requires self-hosting (Docker in AWS) \u2014 we're not ready to operate that",
        "frequency": 0.2,
        "counterPosition": "The self-hosted model gives you data residency control and keeps agent traffic within your security perimeter \u2014 most enterprise manufacturing customers actually prefer that model. We have a deployment guide and PS support. The hosting overhead is a one-time setup, not ongoing complexity.",
        "evidenceSupport": "Pella Corporation scoping session confirmed self-hosted MCP adapter deployment model"
      },
      {
        "objection": "Budget is constrained \u2014 we can't take on new spend this fiscal year",
        "frequency": 0.33,
        "counterPosition": "The conversation about AI agent governance doesn't need to be a new budget line \u2014 it's a natural extension of your existing identity security investment. Start with ISPM for discovery (which you may already be evaluating) and O4AA becomes the control plane once you know the scope. We can structure this to fit your current fiscal cycle.",
        "evidenceSupport": "Graphic Packaging (post-layoffs), Rite-Hite (cost pressure), Emerson (FY27 planning) all raised budget timing objections"
      },
      {
        "objection": "Our IT/security team is too lean to operate another platform",
        "frequency": 0.2,
        "counterPosition": "The lean team argument is actually the case FOR this, not against it. A 4-person IAM team govering 40,000 users \u2014 and their agents \u2014 is only possible if the governance is automated. Manual agent governance at scale requires more headcount, not less.",
        "evidenceSupport": "Colgate-Palmolive: 4-person IAM team manages 40K users with Okta automation (Okta Value Framework v1.0)"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents are running in your environment today \u2014 and how confident are you that number is accurate?",
        "callPhase": "opening",
        "rationale": "Opens the shadow AI discovery conversation. Most customers underestimate their agent count significantly, which creates immediate credibility for the inventory problem."
      },
      {
        "question": "If an agent started acting unexpectedly right now \u2014 accessing systems it shouldn't, sending data it shouldn't \u2014 what would your response look like? How long would it take to shut it down?",
        "callPhase": "pain-exploration",
        "rationale": "The kill switch question. Forces the customer to confront the absence of an operational kill switch without using Okta jargon."
      },
      {
        "question": "When a developer or business analyst builds an agent using their own credentials, what happens to that access when they leave the company or change roles?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the human-credential-as-agent-identity problem. This is the most common gap and the one most customers haven't articulated yet."
      },
      {
        "question": "Who in your organization owns the AI agent governance program today \u2014 is it IT, security, the AI team, or is that still being defined?",
        "callPhase": "opening",
        "rationale": "Identifies the buying center and surfaces whether there's a political gap between the AI team (moving fast) and the security team (asked to govern retroactively)."
      },
      {
        "question": "Your agents are connecting to ERP, supply chain systems, and manufacturing data \u2014 are those connections scoped to the initiating user's permissions, or do the agents have standing access?",
        "callPhase": "technical",
        "rationale": "OT/IT convergence angle \u2014 manufacturing-specific. Supply chain and production data access by ungoverned agents is a material risk that resonates with both security and operations."
      },
      {
        "question": "Are your AI teams building on Microsoft Copilot Studio, AWS Bedrock, or custom Python/MCP \u2014 and are those agent platforms integrated with your identity control plane today?",
        "callPhase": "technical",
        "rationale": "Multi-platform discovery. Manufacturing companies typically have fragmented agent platforms and this question maps the scope of the governance gap."
      },
      {
        "question": "When your auditors or compliance team asks about AI agent access next quarter \u2014 what evidence can you produce today?",
        "callPhase": "pain-exploration",
        "rationale": "EU AI Act and partner compliance angle. Creates urgency by connecting the technical gap to an imminent audit requirement."
      },
      {
        "question": "Who approved the last five agents your teams deployed, and can you produce a list of what systems they can access?",
        "callPhase": "pain-exploration",
        "rationale": "Concrete inventory challenge. The inability to answer this question quickly is itself a demonstration of the problem."
      },
      {
        "question": "What does your timeline look like for scaling AI agents \u2014 are you talking about 10 more agents this year, or 100?",
        "callPhase": "decision-process",
        "rationale": "Sets the urgency frame. Customers planning significant agent scale need governance infrastructure before proliferation, not after. This also surfaces budget timing."
      },
      {
        "question": "Are your security and AI teams aligned on the governance model, or is there a gap between how fast the AI team wants to move and what security is comfortable with?",
        "callPhase": "decision-process",
        "rationale": "Identifies internal political dynamics that often stall deals. The SE/security split is common in manufacturing where innovation pressure is high."
      }
    ],
    "proofPoints": [
      {
        "metric": "91% of organizations are using AI agents; 44% have no AI agent governance in place; 88% report suspected or confirmed AI agent security incidents",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "80% of organizations experienced unintended AI agent behavior; 23% report credential exposure via AI agents",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Average data breach cost $4.88M globally; credential-based breaches take 292 days to detect \u2014 the longest of any attack vector",
        "source": "IBM/Ponemon Cost of a Data Breach Report 2024",
        "confidence": "hard"
      },
      {
        "metric": "4-person IAM team manages 40,000 users with Okta automation; IT tickets reduced 40%",
        "customer": "Colgate-Palmolive",
        "source": "Okta Value Framework v1.0, February 2026",
        "confidence": "hard"
      },
      {
        "metric": "OIG: 211% ROI, $1.8M NPV over 3 years, payback under 6 months; composite 5,000-identity enterprise",
        "source": "Forrester Total Economic Impact of Okta Identity Governance, June 2025",
        "confidence": "soft"
      },
      {
        "metric": "143,000 work hours reclaimed, ~$1M saved on audit prep, $250K eliminated in password reset costs",
        "customer": "Workday",
        "source": "Okta Value Framework v1.0, February 2026",
        "confidence": "hard"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from first AI governance conversation to signed order; existing Okta customers move faster (6\u201310 weeks) when a new security leader drives urgency",
      "typicalStages": [
        {
          "stage": "AI Governance Awareness",
          "description": "Initial conversation triggered by a new security leader, internal AI proliferation concern, or compliance requirement. Customer is in learning mode \u2014 seeking to understand options, not yet evaluating vendors formally.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Educational call / demo of O4AA capabilities",
            "Shadow AI discovery framing using ISPM",
            "Internal champion briefing on cost and SKU structure",
            "New CIO/CISO engagement"
          ]
        },
        {
          "stage": "Technical Evaluation",
          "description": "Customer agrees to a POC or technical deep-dive. IAM architects and enterprise architects assess integration with existing Okta deployment, MCP adapter deployment model, and cross-platform coverage.",
          "typicalDuration": "3\u20136 weeks",
          "keyActivities": [
            "Self-service POC using implementation guide and colab notebook",
            "ISPM environment configuration for agent discovery",
            "MCP adapter deployment scoping",
            "Technical architecture review for multi-platform environments"
          ]
        },
        {
          "stage": "Business Case & Executive Alignment",
          "description": "CISO/CIO alignment on governance approach and budget. FY planning cycle often determines timing. Competitive evaluation may be active against Microsoft E7 or SailPoint.",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "Executive demo for CISO/Deputy CISO",
            "Competitive differentiation vs. Microsoft E7",
            "ROI framing against agent-related risk and compliance cost",
            "Budget fit analysis and introductory pricing discussion"
          ]
        },
        {
          "stage": "Commercial & Close",
          "description": "Legal review, final pricing, and contract terms. Often slowed by legal red lines, forced support tier changes, or net payment term negotiations.",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "Introductory pricing window (GA April 30 deadline for early customers)",
            "SpinCo or subsidiary sizing if applicable",
            "Legal review and contract redlines",
            "Partner (GSI/SI) SOW alignment if implementation required"
          ]
        }
      ],
      "commonBlockers": [
        "New CISO or CIO in seat \u2014 existing champion loses access; deal pauses while new leader onboards",
        "FY budget cycle not aligned to AI governance urgency \u2014 decisions deferred to next fiscal year",
        "Microsoft E5/E7 narrative \u2014 'we already paid for AI governance in our Microsoft bundle'",
        "Product still in early access \u2014 technical buyers want to wait for GA stability",
        "ISPM environment setup complexity delays the shadow AI discovery proof point",
        "Legal review on contract terms, support tier changes, or net payment terms",
        "Internal ARS or custom-built access request systems used instead of OIG \u2014 governance conversation deferred"
      ],
      "accelerators": [
        "New CISO/Deputy CISO with agentic AI governance as stated top priority",
        "Active EU AI Act compliance deadline or partner audit requirement",
        "Recent internal AI agent incident or near-miss",
        "Executive or board-level mandate to formalize AI governance before next agent deployment cycle",
        "GA pricing window (April 30) creating urgency for introductory terms",
        "Existing Okta OIG license \u2014 natural extension to agent governance without new vendor",
        "Competitive loss risk to Microsoft drives Okta to prioritize AI roadmap demonstration"
      ]
    },
    "realQuotes": [
      {
        "quote": "We have to set the foundation, set that architecture layer to support what we see coming which is a proliferation of many agents into the environment in the coming months and year.",
        "context": "Describing why they need governance now, before agent count scales",
        "speakerRole": "Sr IT Enterprise Architect"
      },
      {
        "quote": "You have people with human identities creating these agents using their access, whereas this stuff is really meant to be running in the background almost akin to a service account. How do we solve for that from a lifecycle development perspective? How do we visualize and get better controls?",
        "context": "Articulating the core AI identity governance problem \u2014 the human-credential-as-agent gap",
        "speakerRole": "Director Infrastructure & Platform Engineering"
      },
      {
        "quote": "You guys have an actual operational solution that can be piloted. This is the first viable alternative I've seen to Microsoft's crack smoking E7 SKU.",
        "context": "Validating Okta's AI agent product vs. Microsoft's roadmap offering",
        "speakerRole": "Director Infrastructure & Platform Engineering"
      },
      {
        "quote": "Agents have ability to do multiple things in a massive way \u2014 the security compliance governance needs to be mimicked the way we are doing for humans and maybe more stringent.",
        "context": "Framing AI agents as requiring stricter governance than human identities due to their scale and speed",
        "speakerRole": "Vice President Information Technology"
      },
      {
        "quote": "Boss told everybody in the company to go try and create an agent with no parameters in place. And the director of IT was like that is like giving machine guns to toddlers.",
        "context": "Sharing a customer story illustrating the governance risk when AI agent creation is uncontrolled",
        "speakerRole": "Sr Corporate Customer Account Executive"
      },
      {
        "quote": "We just want to make sure we're designing our AI to fit with this governance framework from the start rather than having to rework it.",
        "context": "Expressing preference for building governance in from day one, not retrofitting",
        "speakerRole": "Senior Security Administrator"
      },
      {
        "quote": "The blueprint for AI governance is still evolving because the tech stack is changing so fast every week.",
        "context": "Explaining why procurement decisions feel premature even when the problem is recognized",
        "speakerRole": "Vice President Information Technology"
      },
      {
        "quote": "Stephen's immediate focus is agentic AI and non-human identity efforts \u2014 that's top on his list.",
        "context": "Describing incoming Deputy CISO's stated top priority as entry point for the conversation",
        "speakerRole": "Strategic Account Executive"
      }
    ]
  },
  {
    "id": "retail-ecommerce-workforce-ai-agents",
    "industry": "retail-ecommerce",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 15,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (500\u2013130,000+ employees); mix of pure-play e-commerce, omnichannel retail, and retail-adjacent brands",
      "aiMaturity": "Early-to-mid deployment \u2014 AI tools (Copilot, ChatGPT Enterprise, Cursor, Gemini, Anthropic Claude) adopted by engineering and business teams, but governance infrastructure is absent or reactive; a minority have agents actively in production calling other agents",
      "triggerEvent": "Shadow AI proliferation reaching IT/security leadership; specific incident or near-miss (data concern from Copilot accessing SharePoint, engineers hooking agents to Salesforce write access, brand/breach risk realization); or upcoming enterprise AI rollout (Anthropic enterprise, Copilot Studio) forcing a governance decision",
      "buyingMotion": "Security/IT-led evaluation with engineering stakeholders; typically surfaces through existing Okta account team; often starts as a NHI or ISPM conversation that expands into AI agent governance; deal velocity varies from months-long (enterprise) to wait-and-see (mid-market held up by product gaps)",
      "typicalBudgetHolder": "CISO or VP/Director of IT Security; sometimes co-owned with VP of Engineering for developer tooling use cases; budget is new incremental spend, not a rip-and-replace"
    },
    "stakeholders": [
      {
        "role": "Director / VP of IT or IT Security",
        "frequency": 0.73,
        "whatTheyCareAbout": [
          "Visibility into what AI agents are doing in the environment",
          "Preventing shadow AI from becoming a security incident",
          "Not adding operational overhead to an already short-staffed team",
          "Keeping up with the pace of developer AI adoption"
        ],
        "typicalQuestions": [
          "Can I see all the AI agents in my environment without deploying yet another tool?",
          "What happens when an agent connects to something it shouldn't \u2014 can I revoke access instantly?",
          "How much implementation effort is required to get this running?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Director / Manager of Security",
        "frequency": 0.47,
        "whatTheyCareAbout": [
          "Audit trail for agent actions traceable to a human identity",
          "Preventing privilege escalation across agent chains",
          "Compliance and governance posture for AI access"
        ],
        "typicalQuestions": [
          "If an agent does something it shouldn't, can I trace that back to the user who authorized it?",
          "Do we need a separate agent registry, or can this integrate with what we already have in Okta?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Distinguished Engineer / Senior Software Architect",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Token management and short-lived credentials for agents",
          "MCP server security and scoped access",
          "Cross-app access flows for autonomous agents without user interaction"
        ],
        "typicalQuestions": [
          "How do autonomous agents authenticate when there is no user present?",
          "Can I scope what an agent can do at the MCP level rather than giving it full credentials?",
          "What does the SDK integration look like for our Python-based agent stack?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Director of AI / Engineering Lead (AI)",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Production rollout timelines not being blocked by governance gaps",
          "Centralized policy management across agent chains",
          "Third-party agent integration (Salesforce, Copilot Studio, ChatGPT)"
        ],
        "typicalQuestions": [
          "We have agents already calling other agents in production \u2014 how do we retrofit governance?",
          "Can Okta enforce policy on third-party agents we don't control?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "Procurement / Finance",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "Predictable pricing that maps to known user or agent counts",
          "Payment flexibility across fiscal years",
          "Avoiding pricing surprises at renewal"
        ],
        "typicalQuestions": [
          "How do you price this when we don't know how many agents we'll have in six months?",
          "Can we do semi-annual payments or split across fiscal years?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Operations Engineer / Security Engineer",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "Coverage gaps \u2014 especially terminal-based and non-browser AI agents",
          "Reactive vs. proactive security posture",
          "Avoiding another point solution layered on existing stack"
        ],
        "typicalQuestions": [
          "Our engineers run AI in the terminal, not a browser \u2014 does this cover that?",
          "We already have CyberArk and Zscaler \u2014 where does Okta for AI fit without overlapping?"
        ],
        "influenceLevel": "evaluator"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Employees are using AI tools (Cursor, ChatGPT, Copilot, Gemini, Glean) without any oversight \u2014 IT has no visibility into what those agents are connecting to or what actions they're taking",
        "frequency": 0.87,
        "severity": "critical",
        "exampleQuote": "I've got people trying to install Cursor or other apps that can do agentic things and log into things and hook up to things and do things like a person \u2014 and I don't have controls or visibility into it. That's where I'm starting to get heartburn."
      },
      {
        "id": "pp-2",
        "statement": "No centralized inventory of AI agents \u2014 no registry of what agents exist, who owns them, or what they're authorized to access",
        "frequency": 0.73,
        "severity": "critical",
        "exampleQuote": "Copilot agents are being spun up \u2014 we're tracking them but we want something more formal."
      },
      {
        "id": "pp-3",
        "statement": "Agents are using hardcoded service accounts, API keys, and GitHub personal access tokens with no user context \u2014 no audit trail that traces agent actions back to a human",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "No audit trail for agent actions \u2014 can't trace back to the user."
      },
      {
        "id": "pp-4",
        "statement": "Existing PAM and IGA tools (CyberArk, SailPoint, Saviant) manage human user lifecycles but do not cover AI agents or non-human identities",
        "frequency": 0.47,
        "severity": "high",
        "exampleQuote": "CyberArk manages privileged accounts for users only \u2014 not AI agents. Agents need to be managed like users \u2014 same lifecycle, same governance."
      },
      {
        "id": "pp-5",
        "statement": "AI agents already in production calling other agents with no centralized policy enforcement \u2014 privilege escalation across agent chains is uncontrolled",
        "frequency": 0.4,
        "severity": "critical",
        "exampleQuote": "Agents already in production and calling other agents \u2014 need centralized policy management and authorization decisions."
      },
      {
        "id": "pp-6",
        "statement": "Terminal-based AI agents (cloud code, CLI tools) are invisible to browser-based detection plugins \u2014 the highest-risk developer use cases are not covered",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "If most of our engineers are doing the dangerous work in a terminal, if that's not capturable yet, I don't think we're ready to move forward."
      },
      {
        "id": "pp-7",
        "statement": "Connection-based and per-user-per-agent pricing models are difficult to forecast \u2014 unknown agent proliferation creates renewal risk and budget approval challenges",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "Nordstrom might use 3 coding agents for 6,000 knowledge workers \u2014 that's approximately 18,000 connections."
      },
      {
        "id": "pp-8",
        "statement": "Third-party agents from Salesforce, Microsoft Copilot Studio, and ChatGPT are difficult to integrate into a centralized governance model \u2014 no standard protocol across vendor agents",
        "frequency": 0.27,
        "severity": "high",
        "exampleQuote": "Third-party agents (Salesforce, M365 Copilot Studio, ChatGPT) are hard to integrate directly."
      },
      {
        "id": "pp-9",
        "statement": "Business users are creating automated workflows (N8N, low-code tools) and connecting them to corporate systems without security controls \u2014 shadow IT at the workflow layer",
        "frequency": 0.2,
        "severity": "moderate",
        "exampleQuote": "Business users are already creating workflows in N8N and we can't stop them."
      },
      {
        "id": "pp-10",
        "statement": "Reactive mitigation (WAF updates, Zscaler blocks, network-level controls) is the current approach \u2014 it's operational overhead and it breaks agent utility without solving the governance problem",
        "frequency": 0.2,
        "severity": "moderate",
        "exampleQuote": "I've had to look into network settings to kind of neuter it \u2014 which is ridiculous because once I neuter it you kind of lost the point."
      }
    ],
    "goals": [
      {
        "statement": "Gain full visibility into every AI agent operating in the environment \u2014 who owns it, what it can access, and what it is doing",
        "frequency": 0.87,
        "successMetric": "Complete agent inventory with human ownership assigned; zero unregistered agents accessing production systems"
      },
      {
        "statement": "Establish a centralized agent registry with governance controls \u2014 registration, access certification, and lifecycle management comparable to human user governance",
        "frequency": 0.67,
        "successMetric": "All agents discoverable via a single pane; certification campaigns running on AI agent populations"
      },
      {
        "statement": "Replace hardcoded credentials and long-lived API keys with short-lived tokens and vaulted secrets for agent authentication",
        "frequency": 0.53,
        "successMetric": "Zero long-lived static credentials in agent configurations; all agent auth routed through token vault"
      },
      {
        "statement": "Enforce scoped, least-privilege access for agents connecting to MCP servers and corporate APIs \u2014 not full credential delegation",
        "frequency": 0.4,
        "successMetric": "All agent-to-API connections governed by defined OAuth scopes; no agents with write access beyond defined scope"
      },
      {
        "statement": "Secure cross-agent access \u2014 prevent privilege escalation when agents call other agents",
        "frequency": 0.33,
        "successMetric": "Agent-to-agent calls carry identity context; no privilege elevation across call chain"
      },
      {
        "statement": "Reduce shadow AI risk \u2014 know when employees install unauthorized agents and prevent those agents from connecting to corporate resources",
        "frequency": 0.33,
        "successMetric": "Shadow AI discovery enabled; unauthorized agent connections blocked or flagged in real time"
      },
      {
        "statement": "Produce an audit trail for all agent actions traceable to the human who authorized them \u2014 for compliance and incident response",
        "frequency": 0.27,
        "successMetric": "100% of agent actions attributable to a human identity; audit log available for SOC and compliance reviews"
      },
      {
        "statement": "Integrate third-party agents (Salesforce, Copilot Studio, ChatGPT) into the same governance framework as internally built agents",
        "frequency": 0.2,
        "successMetric": "Third-party agent traffic passing through centralized policy enforcement point"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA)",
        "relevance": "primary",
        "rationale": "Core product addressing agent discovery, registry, identity lifecycle, and policy enforcement \u2014 mentioned in every deal with an active AI governance requirement",
        "specificFeatures": [
          "Agent registry with human ownership assignment",
          "Agent discovery from platforms via integration or CSV import",
          "Access certification campaigns for AI agent populations",
          "MCP security and scoped authorization",
          "Universal Logout for AI Agents (instant revocation)"
        ],
        "frequency": 0.93
      },
      {
        "product": "ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Frequently paired with O4AA for NHI discovery \u2014 surfaces unmanaged service accounts, API keys, and agent credentials across cloud platforms before governance is applied",
        "specificFeatures": [
          "NHI discovery across AWS, Azure, Salesforce",
          "OAuth grant detection via browser plugin",
          "AI agent-specific pricing tier",
          "Shadow AI uncovering"
        ],
        "frequency": 0.47
      },
      {
        "product": "Cross-App Access (Identity Assertion Grant / IDJ)",
        "relevance": "primary",
        "rationale": "Technical requirement for agent-to-agent authorization \u2014 enables agents to carry user identity context across service boundaries without static credential delegation",
        "specificFeatures": [
          "Identity Assertion Grant for downstream API calls",
          "MCP adapter prototype for N8N and low-code workflows",
          "Adapter pattern for non-compliant IdPs (Microsoft)"
        ],
        "frequency": 0.47
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "primary",
        "rationale": "Addresses the hardcoded credential problem \u2014 vaults and manages refresh tokens for agent access to third-party APIs without exposing long-lived secrets",
        "specificFeatures": [
          "Token vaulting for connected accounts",
          "Short-lived token issuance for agent API calls",
          "Third-party API token management"
        ],
        "frequency": 0.33
      },
      {
        "product": "Okta Identity Governance (OIG)",
        "relevance": "secondary",
        "rationale": "Many retail/e-commerce accounts are existing Okta customers with OIG rollouts in progress \u2014 AI agent governance is a natural extension of existing certification and lifecycle workflows",
        "specificFeatures": [
          "Access certification campaigns extendable to AI agent identities",
          "Lifecycle management for non-human identities",
          "Governance workflows applicable to agent populations"
        ],
        "frequency": 0.33
      },
      {
        "product": "Okta Universal Directory",
        "relevance": "secondary",
        "rationale": "Provides the identity fabric underpinning agent identities \u2014 agents registered as identities in UD with mandatory human owner attribute",
        "specificFeatures": [
          "Agent identity records with human ownership field",
          "Hybrid AD bridging for on-prem-connected agent environments"
        ],
        "frequency": 0.27
      },
      {
        "product": "Auth0 for AI / Auth0 FGA",
        "relevance": "secondary",
        "rationale": "Surfaces in deals where the customer has both workforce agents and customer-facing AI \u2014 Auth0 FGA provides fine-grained authorization for RAG pipelines and document-level access control",
        "specificFeatures": [
          "Fine-grained authorization for customer-facing AI agents",
          "Token vault for Auth0-managed agent credentials"
        ],
        "frequency": 0.27
      },
      {
        "product": "Okta Privileged Access (OPA)",
        "relevance": "adjacent",
        "rationale": "Relevant where customers want service account vaulting for AI agents as part of a broader privileged access consolidation \u2014 typically where CyberArk is already in place for human users",
        "specificFeatures": [
          "Service account vaulting",
          "Session recording for privileged agent actions"
        ],
        "frequency": 0.13
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Copilot / Entra ID / Copilot Studio)",
        "frequency": 0.53,
        "context": "Most common competitor context \u2014 Microsoft is often the AI tool being governed (Copilot, Copilot Studio) and the IdP in place (Entra ID). Customers note Microsoft plays well within the Microsoft stack but breaks down across realms.",
        "differentiators": [
          "Okta provides neutral governance across Microsoft AND non-Microsoft agents in a mixed environment",
          "Entra ID cannot govern third-party agents built on Anthropic, Salesforce, or open-source frameworks",
          "Cross-App Access adapter pattern handles Microsoft's non-compliant IdP behavior",
          "Okta agent registry is platform-agnostic \u2014 a single pane across all agent origins"
        ]
      },
      {
        "competitor": "CyberArk",
        "frequency": 0.2,
        "context": "Present in enterprise retail accounts for privileged human account management \u2014 customers explicitly note CyberArk does not cover AI agents or NHIs, creating the governance gap Okta fills",
        "differentiators": [
          "CyberArk is human-user PAM; Okta fills the AI agent and NHI governance gap it does not address",
          "Okta agent governance integrates with the existing identity fabric rather than adding a separate PAM silo for agents"
        ]
      },
      {
        "competitor": "Salesforce Agentforce",
        "frequency": 0.13,
        "context": "Mentioned as a third-party agent platform that produces agents which need to be governed \u2014 not a direct competitor for the governance layer itself",
        "differentiators": [
          "Okta can govern Salesforce Agentforce-originated agents alongside internally built agents via the MCP proxy approach"
        ]
      },
      {
        "competitor": "Crowdstrike",
        "frequency": 0.13,
        "context": "Present in accounts as an endpoint security tool \u2014 customers are using Crowdstrike rules as reactive controls for AI agent behavior, not as a governance solution",
        "differentiators": [
          "Okta provides proactive governance (registry, access control, certification) vs. Crowdstrike's reactive endpoint detection",
          "Okta addresses the identity layer; Crowdstrike addresses the endpoint \u2014 complementary, not competitive"
        ]
      },
      {
        "competitor": "Pathfix / Paragon (OAuth integration platforms)",
        "frequency": 0.13,
        "context": "Niche competitors for the token vault / connected account use case \u2014 engineering-led evaluation for managing third-party API credentials for agents",
        "differentiators": [
          "Auth0 Token Vault provides the same connected-account capability within the Okta identity fabric, avoiding a separate point solution",
          "Okta adds governance, audit trail, and lifecycle management that Pathfix/Paragon do not provide"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Terminal-based AI agents (CLI tools, cloud code in terminal) are not captured by the browser plugin \u2014 our highest-risk developer use cases are outside current product coverage",
        "frequency": 0.33,
        "counterPosition": "Acknowledge the gap directly \u2014 browser-based detection covers the majority of OAuth-based connections today. The roadmap prioritizes terminal and IDE-level coverage. For customers blocked on this, propose ISPM NHI discovery as the bridge: it surfaces API keys and service accounts used by terminal agents even without browser visibility. Agree to revisit timeline for terminal coverage.",
        "evidenceSupport": "Multiple customers (CustomInk, Loloi) explicitly named terminal-based agents as the blocking requirement"
      },
      {
        "objection": "This is a priority but we are short-staffed \u2014 the implementation effort is the real blocker, not the budget",
        "frequency": 0.33,
        "counterPosition": "Lead with time-to-value: agent discovery and registry can be operational in days, not months. Professional services engagement can handle initial agent import and configuration. Emphasize that the alternative \u2014 manually tracking agents in spreadsheets or applying network controls \u2014 costs more engineering time than a structured onboarding.",
        "evidenceSupport": "LTK Director of IT explicitly named implementation effort as the primary concern despite confirming it was a priority"
      },
      {
        "objection": "Connection-based or per-user-per-agent pricing is hard to forecast \u2014 we don't know how many agents we'll have, and renewal pricing creates budget risk",
        "frequency": 0.33,
        "counterPosition": "Offer a fast-start structure: waived true-ups in year one, baseline connections as a negotiating floor (not a cap), and semi-annual payment options. Internal Okta pricing reviews show this pattern works for deals where agent count is uncertain. Frame year-one as an unlimited-access exploration period with pricing renegotiation at renewal based on actual usage.",
        "evidenceSupport": "Choice Hotels secured net-90 and semi-annual payment terms; Nordstrom pricing strategy included waived year-one true-ups"
      },
      {
        "objection": "We already have CyberArk for PAM \u2014 we don't want to add another privileged access layer",
        "frequency": 0.2,
        "counterPosition": "Okta for AI Agents is not a PAM replacement \u2014 it is the identity governance layer for AI agents, which CyberArk explicitly does not cover. Position as complementary: CyberArk vaults human privileged credentials; Okta governs AI agent identities, their access lifecycle, and their authorization decisions. These are different identity populations.",
        "evidenceSupport": "Ross Stores confirmed CyberArk manages human privileged accounts only; AI agents are outside its scope"
      },
      {
        "objection": "The product is not GA yet \u2014 we cannot commit to a production deployment on an early-access product",
        "frequency": 0.2,
        "counterPosition": "Define a time-boxed POV with success criteria before asking for commitment. GA is targeted for April 2026. Structure the POV around the customer's actual production agents (e.g., PIP agent, coding agents) so they are evaluating real utility, not sandbox scenarios. Early access positions the customer ahead of peers on a capability that will be standard in 12 months.",
        "evidenceSupport": "Choice Hotels structured a POV with defined success criteria; GA timeline of April 2026 confirmed in multiple calls"
      },
      {
        "objection": "No budget this year \u2014 AI governance is on the roadmap for next year",
        "frequency": 0.2,
        "counterPosition": "Agree to stay engaged and build the business case now for next year's budget cycle. Use the interim period to run ISPM discovery (lower-cost entry point) to build the inventory that makes the O4AA business case concrete. A documented inventory of unmanaged agent credentials is a compelling artifact for budget justification.",
        "evidenceSupport": "RealTruck has AI specialist budgeted for Q3 next year; advance work positions Okta as the incumbent when budget opens"
      },
      {
        "objection": "The current setup (Entra ID, Duo, basic SSO) is working well enough for our needs today",
        "frequency": 0.13,
        "counterPosition": "This is true for human identity \u2014 the gap is in AI agent governance, which neither Entra ID nor Duo addresses. Ask: 'How many AI agents are connecting to your environment today that Entra or Duo can see and revoke?' The answer is typically zero. The risk is not in the existing setup; it is in what the existing setup cannot see.",
        "evidenceSupport": "Charlotte's Web acknowledged Entra + Duo covered basic needs but had no answer for AI tool governance"
      },
      {
        "objection": "ISPM pricing is based on our total user count (130,000+) \u2014 the cost is too high to get leadership approval for what is primarily an AI agent use case",
        "frequency": 0.13,
        "counterPosition": "An AI-specific ISPM pricing tier exists \u2014 confirm availability for the account. The full ISPM SKU addresses the broader NHI and posture problem; the AI-specific tier scopes to the agent discovery use case at lower cost. Separate the conversation: start with AI agent discovery, expand to full ISPM if NHI discovery surfaces broader risk.",
        "evidenceSupport": "Ross Stores and CustomInk both raised ISPM pricing as a concern; CustomInk was awaiting confirmation of AI-specific tier"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI tools or agents are your employees using today \u2014 and how many of those did IT actually authorize?",
        "callPhase": "opening",
        "rationale": "Opens the shadow AI gap without leading with fear. Most retail/e-commerce IT leaders know the authorized list is a fraction of what is actually in use. The delta creates urgency."
      },
      {
        "question": "If I asked you right now to revoke an AI agent's access to your Salesforce environment, how long would that take \u2014 and are you confident it would actually work?",
        "callPhase": "pain-exploration",
        "rationale": "Tests the revocation gap directly. Most customers cannot answer this confidently, which surfaces the absence of an agent lifecycle management process."
      },
      {
        "question": "You mentioned agents are using API keys or service accounts \u2014 do those credentials have an owner? Is there a human whose job it is to rotate or revoke them?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the orphaned credential problem. In retail environments with high engineering turnover or rapid AI adoption, many service accounts have no living owner."
      },
      {
        "question": "When an AI agent takes an action in your environment, can you trace that action back to the employee who authorized it?",
        "callPhase": "pain-exploration",
        "rationale": "Audit trail gap. Critical for compliance and incident response. In regulated retail (PCI, GDPR for EU e-commerce), this is a direct compliance question."
      },
      {
        "question": "Are any of your AI agents calling other agents \u2014 and if so, does the downstream agent know the identity of the person who initiated the chain?",
        "callPhase": "technical",
        "rationale": "Opens the agent-to-agent privilege escalation discussion. Relevant for more mature deployments (e.g., Choice Hotels with PIP/RMT agents). Differentiates O4AA's Cross-App Access capability."
      },
      {
        "question": "How are your developers handling credentials for AI coding tools like Cursor or GitHub Copilot \u2014 are those stored in environment files or hardcoded anywhere?",
        "callPhase": "technical",
        "rationale": "Opens the terminal-agent and developer-tooling gap. Surfaces whether the browser plugin coverage limitation is a blocker or whether the customer's primary risk is in browser-based OAuth connections."
      },
      {
        "question": "Which AI platforms are you running \u2014 or planning to run \u2014 that come from vendors you don't control, like Salesforce Agentforce, Microsoft Copilot Studio, or ChatGPT Enterprise?",
        "callPhase": "technical",
        "rationale": "Maps the third-party agent surface. Determines whether the MCP proxy / virtual integration approach is needed and whether the customer's governance problem extends beyond internally built agents."
      },
      {
        "question": "What does your timeline look like for AI governance? Is this a this-quarter problem or a next-year budget item?",
        "callPhase": "decision-process",
        "rationale": "Qualifies urgency and budget availability. Retail/e-commerce customers span the full range from production-deployed agents with immediate need to roadmap items with no budget. Sets POC vs. pilot vs. next-cycle framing."
      },
      {
        "question": "Who else needs to be involved in this decision \u2014 is this purely an IT/security decision, or does engineering leadership or a CISO need to sign off?",
        "callPhase": "decision-process",
        "rationale": "Maps the buying committee. In retail, the CISO or VP Security typically holds budget but the engineering lead or Director of AI may have strong influence on product selection."
      },
      {
        "question": "You mentioned you're already an Okta customer \u2014 are you using Identity Governance today? If so, how are you thinking about extending those certification workflows to AI agent identities?",
        "callPhase": "opening",
        "rationale": "Specific to existing Okta customers (the majority in this dataset). Connects the AI governance conversation to existing OIG investment and frames O4AA as an extension, not a new purchase."
      }
    ],
    "proofPoints": [
      {
        "metric": "Choice Hotels International \u2014 agents already in production calling other agents; internal buy-in achieved; contract being formalized with GA rollout targeting April 2026 (PIP agent) and September 2026 (RMT agent)",
        "customer": "[Hospitality/Retail Company]",
        "source": "Gong call transcript \u2014 Choice + Okta Agentic AI Security Resource Review, Mar 13 2026",
        "confidence": "narrative"
      },
      {
        "metric": "LTK \u2014 POC guide shared, sandbox provisioned, professional services engagement scoped; existing Okta customer expanding into AI agent governance",
        "customer": "[Retail-Ecommerce Company]",
        "source": "Gong call transcripts \u2014 LTK + Okta for AI Discussion Mar 11 2026; LTK Okta Secures AI Technical Call Mar 27 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Brilliant Earth \u2014 existing Okta customer with 100+ integrations; technical deep-dive and demo completed; pricing evaluation in progress at $5/user/month estimate",
        "customer": "[Retail E-commerce Company]",
        "source": "Gong call transcripts \u2014 Okta Brilliant Earth Scoping Mar 10 2026; Okta Brilliant Earth Demo Mar 16 2026",
        "confidence": "narrative"
      },
      {
        "metric": "[Large Retail Company, ~6,000 knowledge workers] estimated at approximately 18,000 connections for 3 coding agents across knowledge worker population \u2014 illustrates agent-to-connection ratio for workforce AI deployments",
        "customer": "[Large Retail Company]",
        "source": "Gong call transcript \u2014 Internal Okta AI for [Large Retail Company] Pricing Strategy, Mar 20 2026",
        "confidence": "soft"
      },
      {
        "metric": "Wayfair \u2014 RFC in progress documenting business use cases; MCP adapter prototype under active test; evaluation phase H1 2026, implementation phase H2 2026",
        "customer": "[E-commerce Company]",
        "source": "Gong call transcript \u2014 Wayfair Okta AI Reconnect, Mar 27 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Ross Stores \u2014 existing Okta SSO/MFA customer; ISPM POC in dev tenant arranged; NHI discovery need confirmed across AWS, Azure, and Salesforce; AI agent SKU interest surfaced",
        "customer": "[Large Retail Company]",
        "source": "Gong call transcript \u2014 Okta Secures AI, Mar 18 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from first AI governance conversation to signed contract for active deals; 6\u201312 months for accounts where budget is next-year or product gaps (terminal coverage) are blocking",
      "typicalStages": [
        {
          "stage": "Shadow AI Discovery / Initial Awareness",
          "description": "IT or security leadership becomes aware of the scope of ungoverned AI tool usage \u2014 often triggered by a specific incident (Copilot accessing SharePoint, engineers connecting agents to Salesforce) or an impending enterprise AI rollout",
          "typicalDuration": "1\u20134 weeks",
          "keyActivities": [
            "Initial discovery call with AE",
            "IT Director or VP Security confirms shadow AI concern",
            "Map existing AI tools in use (authorized and unauthorized)"
          ]
        },
        {
          "stage": "Technical Scoping / Demo",
          "description": "SE or AI specialist joins to map the specific agent architecture, identify product fit (O4AA, ISPM, Cross-App Access), and surface gaps (terminal coverage, third-party agent integration)",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Technical deep-dive with engineering stakeholders",
            "Demo of agent registry, discovery, and certification flows",
            "Identify blocking requirements (terminal detection, pricing clarity)",
            "Scope POC or sandbox evaluation"
          ]
        },
        {
          "stage": "POC / Sandbox Evaluation",
          "description": "Customer evaluates against real agents in their environment \u2014 not synthetic scenarios. Success criteria defined upfront. Engineering lead and security lead both engaged.",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "Sandbox provisioned, POC guide shared",
            "Agent import and registry population",
            "Cross-App Access and MCP security testing",
            "RFC or internal business case written by champion"
          ]
        },
        {
          "stage": "Commercial Negotiation",
          "description": "Pricing structure finalized \u2014 typically involves resolving connection-based pricing uncertainty, payment flexibility across fiscal years, and unlimited access terms for year one",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "Pricing proposal with year-one true-up waiver if needed",
            "Payment terms negotiation (net-90, semi-annual)",
            "Contract language on unlimited access and baseline connections",
            "Finance and procurement sign-off"
          ]
        },
        {
          "stage": "Production Rollout",
          "description": "Phased rollout starting with highest-risk agent populations (production agents, engineering coding agents) and expanding to business user workflows",
          "typicalDuration": "2\u20136 months",
          "keyActivities": [
            "Agent registration and human ownership assignment",
            "Access certification campaign launch",
            "Token vault and credential rotation for existing service accounts",
            "ISPM integration for ongoing NHI discovery"
          ]
        }
      ],
      "commonBlockers": [
        "Terminal-based AI agent detection not yet available \u2014 blocks deals where developer CLI tools are the primary risk surface",
        "Connection-based pricing complexity \u2014 customers cannot forecast agent count, making budget approval difficult",
        "Short-staffed IT teams \u2014 implementation effort concern delays commitment even when priority is acknowledged",
        "Product in early access / not GA \u2014 risk-averse procurement holds until GA",
        "No budget this year \u2014 AI governance is a next-year roadmap item for many mid-market retail accounts",
        "CyberArk incumbency \u2014 confusion about overlap between PAM and AI agent governance requires careful positioning"
      ],
      "accelerators": [
        "Specific shadow AI incident or near-miss (data leakage concern, agent connecting to sensitive system)",
        "Impending enterprise AI rollout (Anthropic enterprise, Copilot Studio) forcing a governance decision within weeks",
        "Existing OIG rollout \u2014 AI agent governance is a natural extension of certification already in flight",
        "Engineering champion (Distinguished Engineer, Director of AI) who has already built internal agents and understands the credential risk firsthand",
        "Competitive multiple \u2014 multiple AI governance vendors reaching out creates urgency to consolidate on a platform approach",
        "Year-one unlimited access with waived true-ups removes the pricing forecast problem that blocks procurement"
      ]
    },
    "realQuotes": [
      {
        "quote": "I've got people trying to install Cursor or other apps that can do agentic things and log into things and hook up to things and do things like a person \u2014 and I don't have controls or visibility into it. That's where I'm starting to get heartburn.",
        "context": "Describing the AI agent governance pain point during discovery call",
        "speakerRole": "VP Head of IT, [Retail Company]"
      },
      {
        "quote": "I have to figure out how to allow them to install that and then control their privileged access so they can't make that do stuff I don't want it to do \u2014 I've had to look into network settings to kind of neuter it, which is ridiculous because once I neuter it you kind of lost the point.",
        "context": "Describing manual network-level controls applied to agentic coding tools as a workaround",
        "speakerRole": "VP Head of IT, [Retail Company]"
      },
      {
        "quote": "If most of our engineers are doing the dangerous work in a terminal, if that's not capturable yet, I don't think we're ready to move forward.",
        "context": "Explaining why terminal-based agent detection is the blocking requirement before adoption",
        "speakerRole": "Operations Engineer, [Retail E-commerce Company]"
      },
      {
        "quote": "It's a priority for sure. But we have a lot going on. I'm also pretty short-staffed right now. So it would depend on the level of effort to get something like this spun up.",
        "context": "When asked about governance priority \u2014 acknowledging urgency while naming implementation effort as the real blocker",
        "speakerRole": "Director of IT, [Retail E-commerce Company]"
      },
      {
        "quote": "Agents need to be managed like users \u2014 same lifecycle, same governance.",
        "context": "Articulating the desired end state for AI agent identity management",
        "speakerRole": "Senior Software Architect, [Large Retail Company]"
      },
      {
        "quote": "We want to do this but we have to have security ahead of time.",
        "context": "Framing the security-first posture before proceeding with AI implementation",
        "speakerRole": "Director Cybersecurity, [Retail Company]"
      },
      {
        "quote": "We are trying to secure it and we don't want people to give out full blown access \u2014 we want to secure it via scopes with authentication and authorization.",
        "context": "Describing the desired MCP security model during technical evaluation",
        "speakerRole": "Senior Manager, [E-commerce Company]"
      },
      {
        "quote": "Business users are already creating workflows in N8N and we can't stop them.",
        "context": "Acknowledging the shadow workflow problem beyond just developer-built agents",
        "speakerRole": "Senior Manager, [E-commerce Company]"
      }
    ]
  },
  {
    "id": "professional-services-workforce-ai-agents",
    "industry": "professional-services",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 14,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-enterprise to large enterprise (1,000\u2013100,000 employees); includes consulting firms, legal, logistics, data analytics, and marketing services companies",
      "aiMaturity": "Early-to-mid adoption: most firms have licensed AI tools (Copilot, Claude, ChatGPT, Cursor) for individual productivity but lack centralized governance, agent registries, or programmatic agent identity. Autonomous agentic workflows are POC or early-pilot stage at most accounts.",
      "triggerEvent": "AI governance deadline (internal or regulatory), a near-miss or breach incident involving an AI agent, renewal conversation where AI SKU is introduced, or a new Director of Identity/CISO hire tasked with establishing AI guardrails",
      "buyingMotion": "Security champion (CSO, Chief Security Architect, Head of IAM) drives the buy; CIO or CTO as co-sponsor; procurement / renewal motion often surfaces the AI interest opportunistically. Design partner and early-access POC paths common.",
      "typicalBudgetHolder": "CISO or VP/Head of IAM (primary); CIO as co-approver for enterprise-wide governance initiatives; CFO involvement when pricing model scales to thousands of agent-to-identity connections"
    },
    "stakeholders": [
      {
        "role": "Chief Security Architect / Head of IAM Architecture",
        "frequency": 0.57,
        "whatTheyCareAbout": [
          "Centralized control plane that does not require rearchitecting every application",
          "Consentless agent-to-third-party access flows without repeated user interruption",
          "Audit-grade trail of agent actions for compliance and incident response",
          "Product maturity \u2014 does not want to pay to fund development of an unfinished product"
        ],
        "typicalQuestions": [
          "How does authorization token context survive through multi-hop agent chains?",
          "Can we get a consentless flow so agents don't require user consent on every call?",
          "Is this production-ready or are we paying to be a design partner for something still being built?",
          "How do we govern agents that were built internally rather than imported from AWS or Salesforce?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Global Head of IAM / Sr. Director Cyber Security",
        "frequency": 0.5,
        "whatTheyCareAbout": [
          "Full lifecycle management of agent identities \u2014 creation, delegation, revocation",
          "Distinguishing agent actions from user actions in audit logs",
          "Kill switch capability for compromised or misbehaving agents",
          "Preventing privilege escalation via over-permissioned service accounts"
        ],
        "typicalQuestions": [
          "How do we assign human ownership and accountability to every agent?",
          "Can we scope what an agent can do based on which user invoked it \u2014 not just the service account's permissions?",
          "What does the kill switch look like \u2014 how fast can we revoke an agent's access?",
          "How do we handle agent governance across platforms we didn't build (Glean, Astra, Copilot)?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "CIO",
        "frequency": 0.36,
        "whatTheyCareAbout": [
          "Whether the problem is urgent enough today to justify investment",
          "ROI and proof that this solves a real problem rather than a future-state one",
          "Consistency across Berkshire portfolio companies or enterprise subsidiaries",
          "FinOps visibility into AI consumption costs alongside governance"
        ],
        "typicalQuestions": [
          "Do we actually have autonomous agents running around today, or is this a future problem?",
          "What would have caught the McKinsey SQL agent breach \u2014 would ISPM have seen it?",
          "How does this sit alongside our existing Entra or AWS IAM investments?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Principal Application Security Engineer / Cloud Architect",
        "frequency": 0.43,
        "whatTheyCareAbout": [
          "Token propagation mechanics through agent chains (on-behalf-of, token exchange)",
          "Authorization model migration cost from app-layer to centralized policy",
          "Integration with existing platforms (AWS Agent Core, Salesforce Agentforce, Google Vertex)",
          "MCP server security and supply chain attack surface"
        ],
        "typicalQuestions": [
          "If AWS Agent Core drops the JWT, how does user context survive?",
          "How much rearchitecting does moving authorization into Okta actually require?",
          "Does Cross-App Access require every third-party vendor to adopt the standard, or just us?",
          "Is there a connector for Google Vertex/Gemini yet?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Head of AI Platform / AI Tiger Team Lead",
        "frequency": 0.29,
        "whatTheyCareAbout": [
          "Agent authentication using the agent's own identity token \u2014 not user impersonation",
          "Recursive delegation model (user to agent A to agent B)",
          "Pricing model that scales for large enterprise deployments",
          "Ability to advise regulated industry clients on AI governance patterns"
        ],
        "typicalQuestions": [
          "How does the agent authenticate as itself \u2014 does it get its own ID token or does it impersonate the user?",
          "How does recursive delegation work when agent A needs to call agent B on behalf of the user?",
          "At 2 agents and 4,000 users, how does the pricing per agent-to-identity connection actually work out?",
          "Is the product certified for HIPAA or regulated financial environments yet?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "CSO / CISO",
        "frequency": 0.29,
        "whatTheyCareAbout": [
          "Shadow AI risk \u2014 employees expensing individual AI tools with no security controls",
          "Supply chain attack surface from unvetted MCP libraries",
          "Incident response capability for compromised agents",
          "Being a client-zero reference \u2014 test on own environment before selling to customers"
        ],
        "typicalQuestions": [
          "How do we detect AI tools that are being expensed individually by 240 people?",
          "Can we use this to build a security assessment offering for our own clients?",
          "What does the incident response flow look like when an agent is compromised?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "IT Manager / Director of Identity",
        "frequency": 0.21,
        "whatTheyCareAbout": [
          "Practical governance framework they can stand up before Q2 product shipment deadline",
          "Avoiding proliferation of dedicated service accounts per AI use case",
          "How ISPM browser plugin fits with existing managed device strategy"
        ],
        "typicalQuestions": [
          "How do we govern shared service accounts that agents are already using for client platform access?",
          "Does the browser plugin require managed Chrome on every device?",
          "What does the AI governance framework look like \u2014 can we have something by May?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Procurement Specialist",
        "frequency": 0.14,
        "whatTheyCareAbout": [
          "Total cost at scale \u2014 how the per-agent-to-identity connection model compounds",
          "Early access pricing and whether it reflects production pricing",
          "Partner protection margins and renewal protections"
        ],
        "typicalQuestions": [
          "How is pricing calculated \u2014 per agent, per user, or per connection?",
          "Is there an enterprise-wide license option that avoids per-connection scaling?",
          "What's the early access discount and does it lock in pricing for production?"
        ],
        "influenceLevel": "influencer"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No visibility or governance over AI agents operating in the enterprise \u2014 no central registry, no human ownership assigned, no audit trail of what agents accessed or did",
        "frequency": 0.71,
        "severity": "critical",
        "exampleQuote": "The horse has already bolted \u2014 the workforce are being enlightened. We've got ChatGPT, Copilot, and Claude all licensed. Non-technical people are not thinking about data privacy \u2014 they're thinking about how they solve the problems they have."
      },
      {
        "id": "pp-2",
        "statement": "Shadow AI proliferation: employees independently adopting and expensing AI tools (Cursor, Claude, Gemini, GitHub Copilot, Devon) with no security controls, creating ungoverned agent sprawl",
        "frequency": 0.5,
        "severity": "critical",
        "exampleQuote": "Teams are testing AI every week \u2014 cloud code one week, cursor the next \u2014 I need governance now before products ship in Q2."
      },
      {
        "id": "pp-3",
        "statement": "Fear of agents with write access or admin permissions \u2014 no guardrails preventing agents from making catastrophic mistakes or unauthorized changes across connected systems (Zscaler, Cloudflare, Defender, Jira, GitHub)",
        "frequency": 0.43,
        "severity": "critical",
        "exampleQuote": "I've been scared to let it loose on write functions. When we're talking about giving agents admin permissions essentially, that's where it gets a little nervous."
      },
      {
        "id": "pp-4",
        "statement": "Authorization logic is distributed across individual applications \u2014 no centralized control plane means every app team rebuilds auth logic independently, making consistent policy enforcement impossible",
        "frequency": 0.43,
        "severity": "high",
        "exampleQuote": "Authorization handled at app layer \u2014 no central control plane for agents."
      },
      {
        "id": "pp-5",
        "statement": "User identity context is lost through multi-hop agent chains \u2014 gateways (e.g., AWS Agent Core) drop the JWT token so downstream agents cannot distinguish who originally authorized the action",
        "frequency": 0.29,
        "severity": "high",
        "exampleQuote": "The only true gap here is a consentless flow. This is still alpha and people aren't up to speed with it yet. We still need the third parties to get on board. But right now, the net benefit to me is zero until our partners actually onboard with it."
      },
      {
        "id": "pp-6",
        "statement": "Agents running on shared service accounts with broad, unrestricted scopes \u2014 no ability to limit what an agent can do based on the identity of the user who invoked it",
        "frequency": 0.29,
        "severity": "high",
        "exampleQuote": "Marketing agents use 'superpowers grants' accounts \u2014 access to everything and you can't restrict it further. How do we manage shared service account access where what the agent can do depends on who is running it?"
      },
      {
        "id": "pp-7",
        "statement": "Pricing model concern: per-agent-to-identity connection pricing scales rapidly and becomes unworkable at enterprise scale (large user bases, multiple agents, regulated industry deployments)",
        "frequency": 0.21,
        "severity": "high",
        "exampleQuote": "The pricing will rapidly get into where it doesn't work \u2014 if you're talking about a bank and a number of agents, the pricing will rapidly get into where it doesn't work."
      },
      {
        "id": "pp-8",
        "statement": "Product maturity gap: critical capabilities (consentless flows, agent-native ID tokens, live session monitoring, cross-app access third-party adoption) are roadmap items rather than GA \u2014 customers feel they are funding development, not buying a finished product",
        "frequency": 0.29,
        "severity": "high",
        "exampleQuote": "This is still alpha and people aren't up to speed with it yet. Product is very early \u2014 paying to help develop rather than buying finished solution."
      },
      {
        "id": "pp-9",
        "statement": "Competitive displacement risk from Microsoft: E7 Frontier bundle packages AI security features, and Entra-centric shops question why they need Okta alongside Microsoft for agent governance",
        "frequency": 0.21,
        "severity": "moderate",
        "exampleQuote": "Microsoft bundles AI security \u2014 hard to compete on price."
      },
      {
        "id": "pp-10",
        "statement": "Manual agent registration at scale is impractical \u2014 importing agents from only 2-3 platforms (AWS Bedrock, Salesforce) leaves the majority of internally-built or locally-deployed agents unmanaged",
        "frequency": 0.21,
        "severity": "moderate",
        "exampleQuote": "Manual agent registration at scale is impractical \u2014 need automated onboarding from deployment pipeline. Import only supports 3 platforms."
      }
    ],
    "goals": [
      {
        "statement": "Centralized visibility and governance over all AI agents \u2014 discover, register, assign human ownership, and maintain an audit trail across all agent platforms",
        "frequency": 0.64,
        "successMetric": "100% of AI agents in production have a registered identity with assigned human owner and full access audit trail"
      },
      {
        "statement": "Establish a kill switch capability \u2014 ability to immediately revoke any agent's access when compromised, misbehaving, or no longer needed",
        "frequency": 0.43,
        "successMetric": "Agent access revocation time from hours/days to seconds; full session termination on Universal Logout trigger"
      },
      {
        "statement": "Scope agent permissions based on the invoking user's identity \u2014 not just the service account's broad grants \u2014 enabling least-privilege delegation per task",
        "frequency": 0.36,
        "successMetric": "Agent actions are constrained to the intersection of the agent's permissions and the delegating user's permissions"
      },
      {
        "statement": "Detect and govern shadow AI across the enterprise workforce \u2014 identify AI tools being adopted without IT approval before they create unmanaged data exposure",
        "frequency": 0.36,
        "successMetric": "Shadow AI tool count, coverage rate of managed-vs-unmanaged AI tool usage across the workforce"
      },
      {
        "statement": "Preserve user identity context through multi-hop agent chains \u2014 on-behalf-of token passing from user through orchestrator agent to sub-agents without losing the delegation trail",
        "frequency": 0.29,
        "successMetric": "Every agent action in a chain is attributable to the originating user identity in the audit log"
      },
      {
        "statement": "Build an internal client-zero reference \u2014 test AI agent governance on own environment before productizing as an assessment offering for clients or portfolio companies",
        "frequency": 0.21,
        "successMetric": "Internal AI governance program stood up and documented as a replicable reference architecture"
      },
      {
        "statement": "Establish governance and accountability for AI agents accessing regulated data or performing compliance-sensitive actions (SOX, PCI, NIST audit requirements)",
        "frequency": 0.21,
        "successMetric": "AI agent actions included in access certification campaigns; audit evidence exportable for SOX/NIST reviews"
      },
      {
        "statement": "Secure MCP server infrastructure \u2014 prevent supply chain attacks through vulnerable MCP libraries and enforce authorization on tool calls invoked by AI agents",
        "frequency": 0.21,
        "successMetric": "All internal MCP servers registered and governed; unauthorized tool invocations blocked and logged"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA / Universal Directory Workload Identities)",
        "relevance": "primary",
        "rationale": "Core product directly addressing agent identity lifecycle \u2014 discovery, registration, human ownership assignment, access certification, and revocation. Named or demoed in 11 of 14 transcripts.",
        "specificFeatures": [
          "Agent registration and Universal Directory workload principals",
          "Human ownership assignment and accountability model",
          "Agent discovery via ISPM browser plugin (Shadow AI detection)",
          "Universal Logout for AI agents (kill switch)",
          "Import from AWS Bedrock, Salesforce Agentforce (limited platform support today)",
          "Access certification campaigns (currently targets linked app, not agent itself \u2014 gap)"
        ],
        "frequency": 0.79
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Shadow AI discovery via browser plugin is the most accessible immediate use case. Frequently positioned as the entry point for AI governance conversations.",
        "specificFeatures": [
          "SAM browser plugin for detecting AI tools accessed via managed Chrome",
          "Shadow AI inventory and risk scoring",
          "Agent posture assessment and drift detection"
        ],
        "frequency": 0.57
      },
      {
        "product": "Cross-App Access (XAA / ID-JAG token exchange)",
        "relevance": "primary",
        "rationale": "Directly addresses the token propagation problem through multi-hop agent chains. High technical interest but adoption blocked by third-party vendor readiness.",
        "specificFeatures": [
          "On-behalf-of token passing through multi-agent orchestration chains",
          "Token exchange (idjag) for preserving user context at each agent hop",
          "Integration with AWS Agent Core, MCP servers",
          "Consentless flow capability (roadmap gap as of March 2026)"
        ],
        "frequency": 0.5
      },
      {
        "product": "Okta FGA (Fine-Grained Authorization)",
        "relevance": "secondary",
        "rationale": "Emerging use case for controlling what agents can access within RAG pipelines, MCP tool calls, and multi-tenant professional services environments. Strong fit for Vialto, Power Digital.",
        "specificFeatures": [
          "Document-level and resource-level authorization for RAG pipeline queries",
          "MCP server tool call authorization control",
          "Post-employment account linking (personal vs. corporate identity correlation)",
          "OpenFGA migration path"
        ],
        "frequency": 0.29
      },
      {
        "product": "Okta OIG (Identity Governance)",
        "relevance": "secondary",
        "rationale": "Access certification for AI agents is a compliance requirement for regulated professional services firms. Positioned as governance layer once agents are registered.",
        "specificFeatures": [
          "Access certification campaigns extended to AI agent identities",
          "Separation of duties enforcement for agents with admin access",
          "Audit evidence export for SOX, PCI, NIST compliance"
        ],
        "frequency": 0.36
      },
      {
        "product": "Auth0 for AI Agents (Token Vault, Async Authorization)",
        "relevance": "secondary",
        "rationale": "Relevant for professional services firms building customer-facing or developer-facing AI products \u2014 less common in pure workforce governance motion but present in Vialto and Power Digital.",
        "specificFeatures": [
          "Token Vault for storing and managing third-party API credentials used by agents",
          "Async human-in-the-loop authorization (CIBA) for high-stakes agent actions",
          "Auth0 Actions and FGA integration for CIAM + agent authorization"
        ],
        "frequency": 0.21
      },
      {
        "product": "Okta OPA (Privileged Access Management)",
        "relevance": "adjacent",
        "rationale": "Relevant where AI agents need privileged or ephemeral access to infrastructure. JIT workload identity use case for automation agents. Present in Vialto and FedEx.",
        "specificFeatures": [
          "Ephemeral JIT credentials for automation agents",
          "Session recording for privileged agent sessions (live monitoring gap as of March 2026)",
          "Workload identity ephemerality for CI/CD and automation pipelines"
        ],
        "frequency": 0.21
      },
      {
        "product": "Okta ITP (Identity Threat Protection)",
        "relevance": "adjacent",
        "rationale": "Detects anomalous agent behavior and coordinates automated response. Positioned as Tier 2 SKU in Verisk. Relevant for firms with mature security operations.",
        "specificFeatures": [
          "Real-time detection of anomalous AI agent behavior",
          "Automated session termination on threat signal",
          "Integration with SIEM and CrowdStrike for agent threat correlation"
        ],
        "frequency": 0.14
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Entra ID / Copilot / E7 Frontier bundle)",
        "frequency": 0.29,
        "context": "Many professional services firms are Microsoft-centric. Microsoft is bundling AI security features in E7, making price-based differentiation difficult. Entra is the primary IDP in Accenture and Epiq. Copilot and Harvey AI are in active use at law firms.",
        "differentiators": [
          "Okta provides vendor-neutral governance across non-Microsoft agents (Cursor, Claude, AWS Bedrock, Glean) \u2014 Entra governance scope is limited to Microsoft ecosystem",
          "Central governance, administration, and observability across diverse platforms \u2014 acknowledged as Okta's value even by Entra-primary accounts",
          "Okta's cross-app access standard and token exchange works across heterogeneous agent environments, not just Azure-native agents",
          "For existing Okta workforce customers, extending to AI governance avoids introducing a second identity vendor"
        ]
      },
      {
        "competitor": "AWS (Agent Core / Bedrock / Cognito)",
        "frequency": 0.29,
        "context": "AWS Agent Core is the primary orchestration platform at JLL and one of the target import sources for Okta AI agent discovery. A known integration gap exists: AWS Agent Core currently drops the JWT token, breaking user context propagation.",
        "differentiators": [
          "Okta provides identity governance layer above AWS Agent Core \u2014 AWS handles orchestration, Okta handles identity lifecycle and audit",
          "Cross-App Access token exchange designed to preserve user context that AWS Agent Core currently drops",
          "Okta's universal agent registry spans AWS and non-AWS agents \u2014 AWS-native governance is limited to Bedrock workloads"
        ]
      },
      {
        "competitor": "CyberArk",
        "frequency": 0.14,
        "context": "Accenture is actively evaluating CyberArk alongside Okta for agentic identity. CyberArk's strength in credential vaulting and session recording creates competitive consideration for privileged agent access use cases.",
        "differentiators": [
          "Okta's unified identity fabric governs both human and agent identities in one platform \u2014 CyberArk requires separate tooling for human access",
          "Okta's agent governance is native to the existing workforce identity stack \u2014 avoids adding a third identity vendor for customers already running Okta + PAM"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.07,
        "context": "Evaluated by Accenture for agentic identity governance. IGA heritage makes it a natural consideration for organizations that think of agent governance as a governance problem rather than an authentication problem.",
        "differentiators": [
          "Okta's governance layer is native to the authentication and access fabric \u2014 SailPoint would require connector integration to Okta or another IDP",
          "Real-time agent access revocation is faster from the identity provider than from a disconnected IGA tool"
        ]
      },
      {
        "competitor": "ServiceNow (AI Control Tower)",
        "frequency": 0.07,
        "context": "Ahead mentioned ServiceNow selling an AI Control Tower product with overlapping agent visibility features. Positioned as a workflow/ITSM-native alternative to identity-layer governance.",
        "differentiators": [
          "Okta governs agent identities at the authentication and token layer \u2014 ServiceNow visibility is log-based and retrospective, not preventive",
          "Okta kill switch (Universal Logout) is immediate \u2014 ServiceNow action would require a workflow to trigger downstream revocation"
        ]
      }
    ],
    "objections": [
      {
        "objection": "The product is too early \u2014 we'd be paying to help Okta build it, not buying a finished solution",
        "frequency": 0.29,
        "counterPosition": "Early access customers become design partners who shape the roadmap to their exact requirements. GA is targeted for April 30, 2026. Customers who participate in EA get pricing protections and direct product team access that GA customers will not.",
        "evidenceSupport": "JLL requested pricing and early access discount; NTT DATA AIVista committed to POC by June 30; Ferry International requested sandbox access"
      },
      {
        "objection": "We're not running autonomous agents at scale yet \u2014 this isn't an urgent problem today",
        "frequency": 0.21,
        "counterPosition": "Shadow AI is already the present problem \u2014 employees are adopting tools today without governance. The governance gap exists now even if full agent autonomy is 6-12 months away. The McKinsey SQL agent breach shows what happens when ungoverned agents reach production.",
        "evidenceSupport": "Ahead: 300 internal AI use cases, 240 people expensing individual tools. Verisk: engineers already using Claude, Copilot, Cursor with no controls. Power Digital: agents accessing client platforms via shared accounts this week."
      },
      {
        "objection": "Pricing model doesn't work at enterprise scale \u2014 per-agent-to-identity connection costs spiral for large deployments",
        "frequency": 0.21,
        "counterPosition": "Enterprise pricing discussions are appropriate at the AE level with specific deployment parameters. Early access pricing may not reflect production pricing. Volume tiers exist for large deployments.",
        "evidenceSupport": "NTT DATA AIVista: 2 agents x 1,000-4,000 users cited as the threshold where pricing breaks. Ahead raised same concern for Berkshire portfolio scale."
      },
      {
        "objection": "Why use Okta alongside Microsoft Entra for agent governance \u2014 Microsoft already bundles AI security in E7",
        "frequency": 0.21,
        "counterPosition": "Entra's AI governance scope covers Microsoft-native agents. Professional services firms run agents on AWS Bedrock, Glean, Cursor, GitHub Copilot, Claude, and custom-built platforms. Okta is the governance layer for the agents that don't live in the Microsoft ecosystem \u2014 which is the majority.",
        "evidenceSupport": "Accenture acknowledged Okta's value for central governance and observability across diverse platforms even while preferring Entra for local cloud operations."
      },
      {
        "objection": "Cross-App Access requires third-party vendors to adopt the standard \u2014 value is zero until partners onboard",
        "frequency": 0.14,
        "counterPosition": "XAA adoption is growing. The standard enables internal agent chains today regardless of third-party readiness. For third-party integrations, the current fallback (Token Vault + broker consent) provides immediate value while the ecosystem matures.",
        "evidenceSupport": "JLL Chief Security Architect explicitly stated this concern. Token Vault is the near-term bridge for third-party API access while XAA adoption scales."
      },
      {
        "objection": "Moving authorization into Okta requires massive rearchitecting of existing app-layer authorization models",
        "frequency": 0.14,
        "counterPosition": "Migration does not require rearchitecting all apps simultaneously. Start with new agents and new workloads. Existing apps can adopt incrementally. The FGA migration path from OpenFGA provides a lower-friction onramp for teams that have already built policy models.",
        "evidenceSupport": "Vialto is migrating from OpenFGA \u2014 direct migration path exists. NTT DATA AIVista and JLL starting with HR onboarding and Agent Core as scoped POC workloads."
      },
      {
        "objection": "The Shadow AI browser plugin only works on managed Chrome \u2014 doesn't cover all enterprise devices",
        "frequency": 0.14,
        "counterPosition": "Managed Chrome coverage addresses the highest-risk surface: corporate-managed devices where enterprise data is most likely to be accessed. BYOD device coverage is a roadmap item. Complement browser-based detection with network-layer signals and software inventory scanning.",
        "evidenceSupport": "Alchemy, McKinsey, and Ahead all raised this limitation. Framed as current constraint with roadmap expansion planned."
      },
      {
        "objection": "FGA setup requires building a permissions database \u2014 too much custom engineering work for the team",
        "frequency": 0.07,
        "counterPosition": "FGA's value is proportional to the complexity of the authorization problem. For simple agent scoping, Okta's standard group and scope model may be sufficient without FGA. FGA becomes necessary when authorization decisions depend on relationships between users, resources, and agents \u2014 a common pattern in professional services data environments.",
        "evidenceSupport": "Power Digital IT Manager raised this concern. FGA was positioned as appropriate for their multi-client access scoping problem specifically."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents or AI tools are actively running in your environment today \u2014 and how many of those did IT formally approve versus employees adopting on their own?",
        "callPhase": "opening",
        "rationale": "Surfaces the shadow AI gap immediately. Every account in this cohort has ungoverned AI tool adoption; quantifying the spread creates urgency without requiring a technical deep dive."
      },
      {
        "question": "If one of those agents was compromised or started doing something it shouldn't \u2014 how would you know, and how quickly could you shut it down?",
        "callPhase": "pain-exploration",
        "rationale": "Tests for the kill switch and observability gap. The absence of a clear answer is itself the proof of the problem. Referenced explicitly in Verisk and Epiq transcripts."
      },
      {
        "question": "For the agents that are running \u2014 whose identity are they running as? A service account? The user who launched them? Something else?",
        "callPhase": "pain-exploration",
        "rationale": "Uncovers the shared service account / over-privileged identity pattern. Directly triggers the Power Digital and Epiq pain points about unrestricted scope."
      },
      {
        "question": "When an agent takes an action \u2014 accesses a file, calls an API, modifies a record \u2014 can you tell from your logs which human authorized that action and what they intended?",
        "callPhase": "pain-exploration",
        "rationale": "Probes for the audit and accountability gap. The inability to answer this is a compliance failure for regulated accounts and an incident response failure for all others."
      },
      {
        "question": "Are any of your agents operating in multi-hop chains \u2014 where one agent calls another agent? And if so, does the downstream agent know who the original user was?",
        "callPhase": "technical",
        "rationale": "Opens the Cross-App Access conversation for technical buyers at JLL and NTT DATA-type accounts. Also surfaces the token-dropping problem with orchestration gateways."
      },
      {
        "question": "Which AI platforms are your agents being built on \u2014 AWS Bedrock, Azure, Salesforce Agentforce, custom-built? Are they all in one place or spread across teams?",
        "callPhase": "technical",
        "rationale": "Scopes the import/discovery challenge and the multi-platform governance requirement. The answer determines whether ISPM browser detection, API-based discovery, or a combination is appropriate."
      },
      {
        "question": "Do you have a governance deadline \u2014 a date by which you need agent controls in place for compliance, a board review, or a product launch?",
        "callPhase": "decision-process",
        "rationale": "Identifies the trigger event and creates a POC timeline. Power Digital's Q2 deadline and NTT's June 30 POC target both emerged from this type of question."
      },
      {
        "question": "Who else in your organization needs to be involved in this decision \u2014 is this primarily a security buy, a platform architecture buy, or is the CIO the final approver?",
        "callPhase": "decision-process",
        "rationale": "Maps the buying committee and identifies whether the champion can close or whether CIO/CISO escalation is needed. Critical in accounts where the IAM architect is the champion but CIO holds budget."
      },
      {
        "question": "Are your existing AI vendors \u2014 Microsoft, AWS, Google \u2014 already pitching you an agent governance solution? What are they showing you?",
        "callPhase": "decision-process",
        "rationale": "Surfaces Microsoft Entra / E7 or AWS-native IAM as the competitive threat early. Allows positioning of Okta as cross-platform governance layer before the customer anchors on the hyperscaler's narrative."
      },
      {
        "question": "If you think forward 12 months \u2014 what does success look like for AI governance in your environment? What metric or outcome would tell you the program is working?",
        "callPhase": "pain-exploration",
        "rationale": "Shifts from problem framing to outcome framing. Helps qualify whether the account is ready to buy a platform or still defining the problem. Accounts that cannot articulate a success metric are at the awareness stage, not the buying stage."
      }
    ],
    "proofPoints": [
      {
        "metric": "44% of organizations have no AI agent governance in place",
        "source": "Okta proprietary survey, March 2026 (okta.com/ai) \u2014 cited in FedEx/Accenture transcript",
        "confidence": "soft"
      },
      {
        "metric": "80% of organizations experienced unintended AI agent behavior",
        "source": "Okta proprietary survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      },
      {
        "metric": "88% of organizations report suspected or confirmed AI agent security incidents",
        "source": "Okta proprietary survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      },
      {
        "metric": "FedEx identified agent identity management as a high priority \u2014 had no solution in place at time of discovery call",
        "customer": "FedEx (via Accenture)",
        "source": "HOLD ACN AI enablement session FedEx transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "NTT DATA AIVista founding philosophy: scale with agents instead of headcount \u2014 targeting HR onboarding automation as first POC by June 30, 2026",
        "customer": "NTT DATA AIVista",
        "source": "Okta + NTT Data AI Vista sync transcript, March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Japanese banks expect to lose 30% of workforce doing specific tasks \u2014 automation urgency is demographically driven, not just efficiency-driven",
        "customer": "NTT DATA AIVista (advising Japanese bank clients)",
        "source": "Okta + NTT Data AI Vista sync transcript, March 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3-6 months from first AI discovery conversation to signed early access or POC agreement; 6-12 months to production deployment",
      "typicalStages": [
        {
          "stage": "AI Awareness / Trigger",
          "description": "Account surfaces AI interest \u2014 either proactively (security gap discovered) or opportunistically (raised during renewal, partner meeting, or executive conversation). Shadow AI or agent governance is acknowledged as a gap but urgency is not yet quantified.",
          "typicalDuration": "0-4 weeks",
          "keyActivities": [
            "Identify the trigger event (deadline, incident, new hire, renewal)",
            "Qualify whether problem is shadow AI, agent lifecycle, or authorization \u2014 or all three",
            "Map buying committee: champion (IAM/security), co-sponsor (CIO/CISO), technical evaluator (architect)"
          ]
        },
        {
          "stage": "Technical Discovery",
          "description": "Deep dive into agent platforms in use, token architecture, and current governance gaps. Often includes demo of ISPM browser plugin and O4AA agent management. Technical buyers probe Cross-App Access and token propagation mechanics.",
          "typicalDuration": "2-4 weeks",
          "keyActivities": [
            "Map all agent platforms in use (AWS, Azure, custom, SaaS AI tools)",
            "Identify authorization model: service accounts, impersonation, or dedicated agent identities",
            "Demo O4AA agent discovery, registration, human ownership assignment",
            "Surface XAA / token exchange requirement if multi-hop chains exist",
            "Identify competitive alternatives under evaluation (Entra, CyberArk, SailPoint, ServiceNow)"
          ]
        },
        {
          "stage": "POC / Early Access Evaluation",
          "description": "Self-guided or Okta-supported POC on a scoped workload. Common POC scopes: HR onboarding agent, security automation agent, or shadow AI inventory via ISPM. Design partner conversation explored for accounts willing to provide feedback.",
          "typicalDuration": "4-8 weeks",
          "keyActivities": [
            "Scope POC to 1-2 specific agent workloads with clear success criteria",
            "Stand up agent registration, human ownership, and audit trail",
            "Test kill switch (Universal Logout) and access revocation",
            "Validate token exchange for multi-hop use cases if applicable",
            "Document results for internal champion to present to CIO/CISO"
          ]
        },
        {
          "stage": "Commercial Negotiation",
          "description": "Pricing model validation against deployment scale. Per-agent-to-identity connection model requires explicit scoping. Early access pricing vs. production pricing clarification. Procurement complexity often added by third-party sourcing firms at renewal.",
          "typicalDuration": "2-6 weeks",
          "keyActivities": [
            "Define agent count and identity count to validate pricing model",
            "Negotiate early access or design partner pricing protections",
            "Navigate procurement/sourcing firm if present",
            "Align on contract term: 1-year early access vs. multi-year production commitment"
          ]
        },
        {
          "stage": "Production Deployment",
          "description": "Phased rollout starting with highest-risk or highest-value agent workloads. Governance framework documentation required for compliance-sensitive accounts. Integration with SIEM and existing IAM tooling.",
          "typicalDuration": "2-4 months",
          "keyActivities": [
            "Import agents from primary platforms (AWS Bedrock, Salesforce) via automated pipeline",
            "Deploy ISPM browser plugin to managed devices for shadow AI coverage",
            "Extend access certification campaigns to include AI agent identities",
            "Train IAM team on agent lifecycle management workflows"
          ]
        }
      ],
      "commonBlockers": [
        "Product maturity concerns \u2014 key features (consentless flows, agent-native ID tokens, RDP session recording) on roadmap but not GA",
        "Pricing model ambiguity at scale \u2014 per-agent-to-identity connection cost unclear for large deployments",
        "Third-party vendor readiness for Cross-App Access standard \u2014 limits XAA value until ecosystem adoption grows",
        "Microsoft Entra incumbent position \u2014 CIO questions whether Okta adds value beyond what E7 Frontier provides",
        "New procurement firm or renewal complexity introducing pricing negotiations that delay AI conversation",
        "CIO not yet convinced urgency is sufficient \u2014 autonomous agent sprawl is a future problem for some accounts",
        "Browser plugin limited to managed Chrome \u2014 reduces shadow AI discovery coverage for BYOD environments"
      ],
      "accelerators": [
        "Security incident or near-miss involving an AI agent (real or publicly reported, e.g., McKinsey SQL agent breach)",
        "Q2 governance deadline or compliance audit requiring AI agent access controls",
        "New IAM/security leader (Director of Identity, CISO hire) tasked with establishing AI guardrails",
        "Design partner or early access invitation \u2014 creates urgency and pricing incentive",
        "Existing Okta workforce customer \u2014 AI governance is a natural extension, no new vendor evaluation required",
        "Partner (Accenture, SHI, Alchemy) building AI assessment practice and using client as client-zero reference",
        "FinOps pressure \u2014 agent token consumption costs becoming visible and requiring governance alongside security"
      ]
    },
    "realQuotes": [
      {
        "quote": "I've been scared to let it loose on write functions. When we're talking about giving agents admin permissions essentially, that's where it gets a little nervous.",
        "context": "Senior Cyber Security Engineer describing fear of deploying security automation agents with write access to Zscaler, Cloudflare, and Defender",
        "speakerRole": "Senior Cyber Security Engineer"
      },
      {
        "quote": "The horse has already bolted \u2014 the workforce are being enlightened. We've got ChatGPT, Copilot, and Claude all licensed. Non-technical people are not thinking about data privacy \u2014 they're thinking about how they solve the problems they have.",
        "context": "Articulating the shadow AI reality \u2014 governance is reactive because adoption already outpaced controls",
        "speakerRole": "AVP Cloud Platform Services & CIAM"
      },
      {
        "quote": "This is still alpha and people aren't up to speed with it yet. We still need the third parties to get on board. But right now, the net benefit to me is zero until our partners actually onboard with it.",
        "context": "Chief Security Architect at JLL questioning the value of Cross-App Access without third-party ecosystem adoption",
        "speakerRole": "Chief Security Architect"
      },
      {
        "quote": "The pricing will rapidly get into where it doesn't work \u2014 if you're talking about a bank and a number of agents, the pricing will rapidly get into where it doesn't work.",
        "context": "Head of AI Platform raising concern about per-agent-to-identity connection pricing model for large Japanese bank deployments",
        "speakerRole": "Head of AI Platform"
      },
      {
        "quote": "Our intention is to try and scale the company with agents as opposed to scaling with people.",
        "context": "Describing NTT DATA AIVista's founding philosophy \u2014 AI-first growth model where agents replace headcount scaling",
        "speakerRole": "Head of AI Platform"
      },
      {
        "quote": "If it's not monitored, it doesn't count. It doesn't exist.",
        "context": "Articulating the non-negotiable requirement for live session monitoring \u2014 unmonitored access is treated as ungoverned access regardless of technical controls in place",
        "speakerRole": "Head of IAM Architecture"
      },
      {
        "quote": "Teams are testing AI every week \u2014 cloud code one week, cursor the next \u2014 I need governance now before products ship in Q2.",
        "context": "IT Manager at a marketing agency describing rapid shadow AI adoption and an internal deadline to establish governance before AI-powered products launch",
        "speakerRole": "IT Manager"
      },
      {
        "quote": "A McKinsey issue recently \u2014 someone put an agent that ran SQL and had access to everything and it got breached. It's not manually importing the rogue agent because I wouldn't know about it.",
        "context": "CIO citing a real breach example to probe whether ISPM-based discovery would detect an internally-built rogue agent \u2014 questioning the limits of import-only discovery",
        "speakerRole": "CIO"
      }
    ]
  },
  {
    "id": "insurance-workforce-ai-agents",
    "industry": "insurance",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 13,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-market to large enterprise (500\u201350,000+ employees); mix of regional carriers (Amica, Hadron) and national/global insurers (MetLife, Liberty Mutual, Farmers)",
      "aiMaturity": "Early-to-mid: AI tools proliferating via vendor-embedded AI (Copilot Studio, Salesforce AI, Bedrock) and homegrown builds; formal AI governance programs exist on paper but lack tooling; AI CoEs and hackathons active",
      "triggerEvent": "Microsoft Copilot Studio rollout or other vendor-embedded AI launch; internal hackathon with AI scope; board-level pressure to match competitor AI commitments; regulatory inquiry risk around agent-made claim decisions",
      "buyingMotion": "Expansion from existing Okta workforce identity footprint into AI governance add-on; occasionally net-new Okta with AI governance as the wedge; security/IAM team initiates, AI CoE or CDO often holds budget",
      "typicalBudgetHolder": "CDO or VP IT Security Operations; CIO is common first contact but often not the decision maker; security budget line when framed as risk reduction"
    },
    "stakeholders": [
      {
        "role": "VP IT Security Operations / AVP Global Cloud Security",
        "frequency": 0.62,
        "whatTheyCareAbout": [
          "Visibility into shadow AI agents before a breach",
          "Alerting on overprivileged agent access without breaking availability",
          "Audit trail for compliance and regulatory inquiries",
          "Attack surface expansion from democratized agent creation"
        ],
        "typicalQuestions": [
          "How do I know which agents are out there right now?",
          "Can I get alerts without automated remediation that might break things?",
          "What's the audit trail when an agent makes a claim decision?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "IAM Engineer / Identity & Access Manager",
        "frequency": 0.54,
        "whatTheyCareAbout": [
          "Technical implementation feasibility",
          "Integration with existing IGA platform (SailPoint, OIG)",
          "Token exchange flow clarity vs. opaque black-box approaches",
          "Avoiding credential sprawl and overprivileged service accounts"
        ],
        "typicalQuestions": [
          "How does the token exchange actually work under the hood?",
          "How does this tie back to our IGA platform for lifecycle?",
          "What does the sidecar/hosted deployment model look like?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Director IT / Information Security Architect",
        "frequency": 0.46,
        "whatTheyCareAbout": [
          "Centralized governance across multiple AI vendors",
          "Not adding new identity sprawl to an already complex environment",
          "Regulatory compliance posture",
          "Budget justification against Microsoft Entra incumbency"
        ],
        "typicalQuestions": [
          "Can this work alongside our existing Entra or Ping environment?",
          "How do I justify this cost when Microsoft might already handle it?",
          "What's the licensing model for agents vs. human users?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Product Manager / AI CoE Lead",
        "frequency": 0.31,
        "whatTheyCareAbout": [
          "Enabling developers to build AI features securely without slowing them down",
          "Single sign-in experience across AI tools",
          "Replicable secure patterns before scaling agent use cases"
        ],
        "typicalQuestions": [
          "How do we make the security invisible to developers?",
          "Can we establish a secure-by-design pattern before the hackathon?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "CIO / SVP & Chief Information Officer",
        "frequency": 0.31,
        "whatTheyCareAbout": [
          "Board-level AI strategy and competitive positioning",
          "Vendor consolidation over adding new sprawl",
          "Alignment between AI innovation and risk management"
        ],
        "typicalQuestions": [
          "How does this fit into our broader AI strategy?",
          "Can we expand with an existing vendor rather than add another?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "CDO / Chief Data Officer",
        "frequency": 0.15,
        "whatTheyCareAbout": [
          "AI governance tied to data access and RAG pipeline authorization",
          "Ensuring agent actions on data are attributable and auditable"
        ],
        "typicalQuestions": [
          "How do we control what data an agent can surface from our RAG pipelines?",
          "Who is the accountable human when an agent accesses sensitive data?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Senior Cyber Security Architect",
        "frequency": 0.23,
        "whatTheyCareAbout": [
          "Fine-grained authorization at MCP and API gateway level",
          "Short-lived scoped tokens with full audit trail",
          "Coexistence strategy between Okta AI governance and existing Entra IdP"
        ],
        "typicalQuestions": [
          "What's the token lifecycle and revocation model?",
          "Does FGA work at the individual tool-call level?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "VP Security (startup/insurtech)",
        "frequency": 0.15,
        "whatTheyCareAbout": [
          "Kill switch for rogue agents",
          "First-class identity for agents with lifecycle management",
          "Group-based scoped access per MCP tool"
        ],
        "typicalQuestions": [
          "If an agent is breached, how do I revoke it globally?",
          "Can I assign different tool access by user group?"
        ],
        "influenceLevel": "decision-maker"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Shadow AI agents proliferating without IT visibility \u2014 employees and developers connecting agents to corporate data (OneDrive, SharePoint, internal APIs) without approval or audit trail",
        "frequency": 0.85,
        "severity": "critical",
        "exampleQuote": "Biggest risk: shadow IT connections with zero visibility \u2014 not knowing which agents are out there"
      },
      {
        "id": "pp-2",
        "statement": "Overprivileged agent access \u2014 developers giving break-glass or service account credentials to agents because no scoped token mechanism exists, creating godmode access with no least-privilege enforcement",
        "frequency": 0.77,
        "severity": "critical",
        "exampleQuote": "The developer is giving his own credentials who has like a guard level privileges, maybe the break-glass account... he might be giving those credentials to that agent"
      },
      {
        "id": "pp-3",
        "statement": "No centralized governance for AI agents spanning multiple platforms \u2014 insurers run Copilot Studio, Salesforce AI, AWS Bedrock, and homegrown builds simultaneously with no single control plane",
        "frequency": 0.77,
        "severity": "critical",
        "exampleQuote": "We're never going to use just one AI platform \u2014 we need something that manages all of them"
      },
      {
        "id": "pp-4",
        "statement": "No audit trail for agent actions \u2014 cannot answer regulators who demand a record of every action an agent took before a claim was denied or a decision was made",
        "frequency": 0.62,
        "severity": "critical",
        "exampleQuote": "Some state regulator is going to ask: show me everything that happened before you denied that claim"
      },
      {
        "id": "pp-5",
        "statement": "MCP server governance gap \u2014 no controls on which MCP servers employees or agents can connect to, and rapidly evolving MCP spec (3 revisions in one year) creates moving-target integration risk",
        "frequency": 0.54,
        "severity": "high",
        "exampleQuote": "Controlling access to different MCP servers and making sure that you're not allowing access to just any MCP server"
      },
      {
        "id": "pp-6",
        "statement": "AI governance policy exists on paper but tooling does not \u2014 IT and security teams running AI governance committees without enforcement capability, creating policy-reality gap",
        "frequency": 0.46,
        "severity": "high",
        "exampleQuote": "I run our AI governance committee and I create our AI policy \u2014 I'm not doing any of the things we say we're doing"
      },
      {
        "id": "pp-7",
        "statement": "Microsoft Entra and Copilot Studio coexistence friction \u2014 most insurers have Entra as primary IdP; Okta AI governance must coexist without requiring IdP replacement, but Copilot Studio authentication integration is technically incomplete",
        "frequency": 0.46,
        "severity": "high",
        "exampleQuote": "Copilot Studio cannot handle the authentication step for the MCP adapter \u2014 requires a separate connections manager with poor UX"
      },
      {
        "id": "pp-8",
        "statement": "Attack surface expansion from democratized agent creation \u2014 agentic AI differs from RPA in that every employee can now build and deploy agents, eliminating the previous control point of restricting automation to a specialist group",
        "frequency": 0.38,
        "severity": "critical",
        "exampleQuote": "With RPA and machine learning, we could still control it to a specific group. Now with agentic AI, everybody gets the chance to do this \u2014 I can't even control how you bring it in. The attack surface has expanded so fast."
      },
      {
        "id": "pp-9",
        "statement": "Credential passing between agents \u2014 concern that agent-to-agent orchestration results in credentials or tokens being forwarded across agent chains with no visibility or revocation capability",
        "frequency": 0.31,
        "severity": "high",
        "exampleQuote": "Agents potentially passing credentials to other agents"
      },
      {
        "id": "pp-10",
        "statement": "MCP adapter deployment model not enterprise-ready \u2014 current sidecar/Docker deployment blocks non-developer users (HR, claims staff) from using agent tooling in a governed way; hosted version not yet available",
        "frequency": 0.23,
        "severity": "moderate",
        "exampleQuote": "Non-developer users need a hosted solution, not a local sidecar"
      }
    ],
    "goals": [
      {
        "statement": "Discover and register all AI agents (human-created and vendor-embedded) in a centralized registry with ownership, scope, and lifecycle tracking",
        "frequency": 0.85,
        "successMetric": "100% of active agents visible in Universal Directory with assigned human owner"
      },
      {
        "statement": "Implement least-privilege access for agents using short-lived scoped tokens instead of standing service account credentials or break-glass access",
        "frequency": 0.77,
        "successMetric": "Zero agents using standing privileged credentials; all token grants time-bound and scope-limited"
      },
      {
        "statement": "Establish audit trail for every agent action with user attribution \u2014 who authorized the agent, what scope was granted, what it accessed, and for how long",
        "frequency": 0.69,
        "successMetric": "Complete audit log exportable on demand for regulatory inquiry within 24 hours"
      },
      {
        "statement": "Govern AI agents across multiple vendor platforms (Copilot Studio, Salesforce, Bedrock) from a single control plane without replacing each vendor's IdP",
        "frequency": 0.62,
        "successMetric": "All major AI platforms covered by centralized governance policy with no per-platform exceptions"
      },
      {
        "statement": "Seamless single sign-in experience for employees using agent tools \u2014 no repeated consent prompts or visible authentication friction",
        "frequency": 0.46,
        "successMetric": "Employees authenticate once; agents act on their behalf without re-prompting"
      },
      {
        "statement": "Integrate agent lifecycle with existing IGA platform (SailPoint or OIG) for access certification and deprovisioning when users leave",
        "frequency": 0.38,
        "successMetric": "Agent access included in quarterly access certification cycle; fully revoked within 24 hours of user departure"
      },
      {
        "statement": "Establish a replicable secure-by-design pattern for AI development before scaling \u2014 prove the model in a sandbox or hackathon, then roll out to the enterprise",
        "frequency": 0.38,
        "successMetric": "Working POC deployed before internal hackathon; developer onboarding playbook available"
      },
      {
        "statement": "Implement global kill switch \u2014 ability to revoke all tokens for a specific agent or user-agent pair immediately if a breach or misbehavior is detected",
        "frequency": 0.31,
        "successMetric": "Time-to-revoke under 5 minutes for any agent identity across all connected systems"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (O4AA) \u2014 Cross-App Access / ID-JAG token flow",
        "relevance": "primary",
        "rationale": "Core mechanism for scoped, short-lived token delegation to agents acting on behalf of users; directly addresses overprivileged service account problem",
        "specificFeatures": [
          "Cross-App Access (XAA) token exchange",
          "Identity Assertion JWT (ID-JAG)",
          "Universal Directory AI agent registry",
          "Managed Connections",
          "Agent-to-OIDC application linking"
        ],
        "frequency": 0.92
      },
      {
        "product": "Okta ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Discovery of shadow AI agents via browser plugin OAuth grant scanning; surfaces agents employees have already authorized against corporate resources",
        "specificFeatures": [
          "Browser plugin for OAuth grant discovery",
          "Shadow AI agent detection",
          "AI agent posture scoring",
          "Alerting on overprivileged agent grants"
        ],
        "frequency": 0.69
      },
      {
        "product": "Okta Identity Governance (OIG) \u2014 Access Certification for Agents",
        "relevance": "primary",
        "rationale": "Insurers require periodic certification of agent access for regulatory compliance; OIG extends certification campaigns to non-human agent identities",
        "specificFeatures": [
          "Access certification campaigns for AI agent identities",
          "Entitlement reporting for NIST/regulatory compliance",
          "Agent lifecycle governance tied to owner identity"
        ],
        "frequency": 0.54
      },
      {
        "product": "Okta Privileged Access (OPA) / PAM",
        "relevance": "secondary",
        "rationale": "Secret vault for legacy API keys agents must use where OAuth is not supported; included in AI SKU bundle; addresses RPA service account risk",
        "specificFeatures": [
          "Secrets vault for agent API keys",
          "Short-lived credential injection",
          "Session recording for privileged agent actions"
        ],
        "frequency": 0.46
      },
      {
        "product": "Okta MCP Adapter",
        "relevance": "primary",
        "rationale": "Governs which MCP servers agents and users can connect to; high demand but current sidecar deployment model is a POC blocker for non-developer users",
        "specificFeatures": [
          "MCP server access control",
          "OAuth flow for MCP tool invocations",
          "Tool-level policy enforcement (roadmap)"
        ],
        "frequency": 0.46
      },
      {
        "product": "Auth0 FGA (Fine-Grained Authorization)",
        "relevance": "secondary",
        "rationale": "RAG pipeline authorization and document-level access control; relevant for insurers with large claims document repositories accessed by AI",
        "specificFeatures": [
          "Policy-as-code for MCP and API gateway",
          "Document-level RAG authorization",
          "Per-user access enforcement for agent-retrieved data"
        ],
        "frequency": 0.31
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "secondary",
        "rationale": "Centralized third-party API token management with audit trail; relevant where agents call external SaaS APIs; lost to XAA in one account due to transparency concerns",
        "specificFeatures": [
          "Short-lived scoped token storage",
          "Third-party API credential management",
          "Audit trail for token use"
        ],
        "frequency": 0.23
      },
      {
        "product": "Okta Threat Protection (ITP) \u2014 Global Token Revocation",
        "relevance": "secondary",
        "rationale": "Kill switch capability resonates strongly with security-first buyers; ability to revoke all agent tokens on breach detection addresses the 'agents will be breached' concern",
        "specificFeatures": [
          "Global token revocation",
          "Real-time threat signal integration",
          "Session termination across all agent connections"
        ],
        "frequency": 0.23
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft Entra / Copilot Studio",
        "frequency": 0.69,
        "context": "Dominant incumbent IdP and AI platform in insurance; Copilot Studio is the primary trigger for AI governance urgency; Entra's AI agent governance controls described as too coarse-grained for enterprise needs; authentication integration with Okta MCP Adapter technically incomplete today",
        "differentiators": [
          "Okta governs agents across ALL platforms, not just Microsoft \u2014 insurers run multi-vendor AI",
          "Entra controls for agentic AI are coarse-grained; Okta offers scoped short-lived delegation",
          "Okta can coexist as AI governance layer without replacing Entra as IdP",
          "Position as 'AI' solution first \u2014 internal teams will reject an Okta IdP pitch in Ping/Entra shops"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.23,
        "context": "Existing IGA platform at several accounts; not viewed as competing directly on AI agent governance; customers want Okta AI governance to integrate WITH SailPoint, not replace it",
        "differentiators": [
          "SailPoint governs human identity; Okta O4AA adds agent identity as a first-class type",
          "Customers want IGA integration, not replacement \u2014 position as complementary"
        ]
      },
      {
        "competitor": "Oasis Security / Collekt Security",
        "frequency": 0.15,
        "context": "Specialized NHI governance vendors surfaced at Liberty Mutual; in early evaluation; not yet head-to-head with Okta but represent point-solution risk for non-human identity governance",
        "differentiators": [
          "Okta provides AI governance integrated with existing workforce identity \u2014 no new vendor sprawl",
          "Okta's agent registry is Universal Directory already in use; no separate system to buy and integrate"
        ]
      },
      {
        "competitor": "Ping Identity",
        "frequency": 0.15,
        "context": "Primary IdP at MetLife; creates internal resistance to any Okta conversation; AI governance is the wedge to have the conversation without triggering IdP replacement objection",
        "differentiators": [
          "Lead with AI governance, not IdP replacement \u2014 Okta as overlay layer, not competitor to Ping",
          "Ping has no equivalent AI agent governance story"
        ]
      },
      {
        "competitor": "Varonis / CrowdStrike / Prisma (CNAP)",
        "frequency": 0.15,
        "context": "Adjacent security tools at large insurers; cover SaaS posture and alerting but do not provide AI agent identity lifecycle or token delegation; customers use these alongside, not instead of, identity-native governance",
        "differentiators": [
          "CNAP and DLP tools alert on anomalies; Okta governs identity before access is granted",
          "Varonis covers SaaS data access; Okta covers agent identity and delegation \u2014 different layers"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We're primarily a Microsoft shop \u2014 Entra might already cover this, and our internal teams will push back on adding Okta",
        "frequency": 0.54,
        "counterPosition": "Lead with AI governance, not Okta-as-IdP. Entra's agentic AI controls are coarse-grained and apply only to Microsoft agents. Insurance companies run Copilot Studio AND Salesforce AI AND Bedrock \u2014 Okta governs all three from one control plane. Position as the neutral AI governance layer, not a Ping/Entra replacement.",
        "evidenceSupport": "MetLife AVP: 'The moment I say Okta within our group, they'll say we're a Ping customer. What we have to say is AI.'"
      },
      {
        "objection": "This is an Early Access product \u2014 we're not sure it's production-ready",
        "frequency": 0.46,
        "counterPosition": "Acknowledge EA status honestly. The POC-first motion de-risks this \u2014 customers prove the pattern in sandbox before committing production budget. Frame the hackathon or POC as the validation milestone. Reference existing Okta customers (Country Financial, Farmers, Amica) already in working sessions.",
        "evidenceSupport": "Country Financial IAM Engineer chose Okta XAA over Auth0 Token Vault after seeing the GUI: 'Having it all right there in Okta is really enticing.'"
      },
      {
        "objection": "The licensing model for agents vs. human users is complex and potentially expensive",
        "frequency": 0.38,
        "counterPosition": "Acknowledge the complexity and offer a clear explainer. For existing Okta customers, the AI SKU bundles ISPM, OPA, and AI agent capabilities \u2014 often replacing licenses they'd buy separately. Anchor the conversation on risk reduction value (regulatory fine avoidance, breach cost) before discussing price.",
        "evidenceSupport": "American Fidelity: SVP/GM explicitly said commercial terms shouldn't block adoption \u2014 position as security investment, not IT line item"
      },
      {
        "objection": "The MCP adapter requires Docker/sidecar deployment \u2014 our non-developer users can't use it",
        "frequency": 0.31,
        "counterPosition": "Acknowledge the gap directly \u2014 hosted MCP adapter is on the product roadmap. For current POC, scope to developer use cases where sidecar is acceptable. Use the POC to validate the security pattern; hosted deployment for broader rollout when available."
      },
      {
        "objection": "We're not doing much custom AI development \u2014 our AI is mostly vendor built-in, so we don't control it",
        "frequency": 0.31,
        "counterPosition": "Vendor-embedded AI (Copilot Studio, Salesforce, ServiceNow) is exactly the uncontrolled surface. ISPM browser plugin discovers OAuth grants employees have already made to vendor AI tools. O4AA governs the token delegation layer even for vendor-built agents \u2014 you don't need to own the agent code to govern its access.",
        "evidenceSupport": "Alfa Mutual: 'Every product that we have has some kind of AI built into it' \u2014 this is the discovery hook, not an objection disqualifier"
      },
      {
        "objection": "Our purchasing process takes 60+ days \u2014 too slow for our hackathon/AI initiative timeline",
        "frequency": 0.23,
        "counterPosition": "Use the POC/EA tenant to start technical validation before commercial close. Coordinate with CS and AE to expedite procurement. The urgency framing \u2014 'the business will do AI without us if we're not ready' \u2014 is the internal sponsor's argument for accelerating approval.",
        "evidenceSupport": "Country Financial IAM: 'We're going to do it without us if we don't have something in place. They're just going to do it all in Copilot and Entra ID and there won't be guardrails.'"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "Which AI tools are your employees actively using today \u2014 Copilot Studio, Salesforce AI, Bedrock, or homegrown builds \u2014 and who authorized those connections to corporate data?",
        "callPhase": "opening",
        "rationale": "Opens the shadow AI conversation without assuming a specific platform; surfaces the governance gap immediately; maps to the #1 pain point across all 13 transcripts"
      },
      {
        "question": "When an employee builds or enables an AI agent, what access does it get \u2014 and how does that compare to what it actually needs?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces overprivileged access pattern; leads naturally into the break-glass credential and service account risk discussion"
      },
      {
        "question": "If a regulator asked you today to produce a complete audit trail of every action an AI agent took before it denied a claim last month, could you do that?",
        "callPhase": "pain-exploration",
        "rationale": "Insurance-specific regulatory trigger; makes the audit trail gap concrete and urgent; effective with security architects and compliance-aware leaders"
      },
      {
        "question": "If an agent behaved unexpectedly or was compromised, how long would it take you to revoke its access across all systems \u2014 and do you have a kill switch today?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the revocation gap; 'kill switch' language resonates strongly with insurance security buyers who prioritize availability"
      },
      {
        "question": "You mentioned your primary IdP is Entra / Ping \u2014 are you looking for Okta to replace that, or are you looking for an AI governance layer that works alongside what you already have?",
        "callPhase": "technical",
        "rationale": "Defuses the IdP replacement objection early; positions O4AA as an overlay layer; critical for MetLife-type accounts"
      },
      {
        "question": "How many AI platforms are in use across your organization today \u2014 just Microsoft, or also Salesforce, AWS, and others? Who is accountable if one of those platforms' agents accesses data it shouldn't?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces multi-vendor complexity and accountability gap; directly sets up the single-control-plane value proposition"
      },
      {
        "question": "Do your developers assign AI agents their own service accounts or break-glass credentials? How do those credentials get cleaned up when the project ends?",
        "callPhase": "technical",
        "rationale": "Technically specific but understood by IAM engineers; surfaces the standing credential risk that Cross-App Access / ID-JAG directly solves"
      },
      {
        "question": "Is there an internal hackathon or AI pilot coming up where you need to prove a secure-by-design pattern quickly?",
        "callPhase": "decision-process",
        "rationale": "Surfaces internal timeline pressure that creates POC urgency; hackathon / AI CoE events appeared in 4 of 13 transcripts as deal accelerators"
      },
      {
        "question": "Your AI governance committee \u2014 is it currently enforcing policy through tooling, or mainly setting policy on paper?",
        "callPhase": "pain-exploration",
        "rationale": "Directly surfaces the policy-reality gap without accusation; the Hadron Director quote shows this lands with buyers who know the gap exists"
      },
      {
        "question": "When a claims adjuster or underwriter uses an AI tool that accesses policyholder data, is their individual identity tied to what the agent does \u2014 or does the agent act under a shared service account?",
        "callPhase": "technical",
        "rationale": "Insurance-specific; surfaces user attribution gap in claims and underwriting workflows; directly relevant to state regulatory audit risk"
      }
    ],
    "proofPoints": [
      {
        "metric": "Farmers Insurance: Agents need first-class identity \u2014 same model applied to 175,000 Flex employees extended to AI agents; active POC with phased rollout under evaluation",
        "customer": "Farmers Insurance",
        "source": "Transcript: Farmers - Okta AI Sync - Mar 19 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Country Financial: IAM team selected Okta XAA over Auth0 Token Vault after seeing GUI transparency \u2014 'everything I wanted done in code behind the scenes in Auth0, now right there in the GUI in Okta'",
        "customer": "Country Financial",
        "source": "Transcript: Okta & Country Financial Agentic AI - Mar 13 2026",
        "confidence": "narrative"
      },
      {
        "metric": "American Fidelity: SVP/GM directed that commercial terms should not block AI governance adoption \u2014 security urgency elevated to executive sponsor level within 2 weeks of AI SKU announcement",
        "customer": "American Fidelity",
        "source": "Transcript: Okta American Fidelity AI Governance Demo Deep Dive - Mar 9 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Reserv: 5.8B access decisions per day identified as ungoverned at scale \u2014 illustrates the magnitude of uncontrolled agent activity in a small insurer's environment",
        "customer": "Reserv",
        "source": "Transcript: Okta+Reserv Okta for AI Agents Discussion - Mar 5 2026",
        "confidence": "soft"
      },
      {
        "metric": "Amica Mutual: Board-level pressure from new CIO (5 weeks in) to match competitor AI automation commitments (Travelers cited); AI governance framed as prerequisite for responsible AI scaling",
        "customer": "Amica Mutual Insurance",
        "source": "Transcript: Okta-Amica Securing AI - Mar 10 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Country Financial: Active MCP adapter POC progressing toward April 16-17 hackathon; Professional Services engagement in procurement; validated that 'this solves an actual security problem we have in the middle'",
        "customer": "Country Financial",
        "source": "Transcript: Okta & Country - Agentic AI Discussion - Mar 27 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from first AI governance conversation to initial commit; POC-gated; often accelerated by internal hackathon or board AI initiative deadline",
      "typicalStages": [
        {
          "stage": "AI Governance Awareness",
          "description": "Security or IAM team learns about O4AA through Okta outreach, AI SKU announcement, or peer conversation; educational touchpoint focused on shadow AI and overprivileged agents",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "Discovery call to map current AI tool landscape",
            "ISPM demo to surface shadow AI agent discovery",
            "Share AI governance POC guide"
          ]
        },
        {
          "stage": "Technical Validation (POC)",
          "description": "Enable O4AA on existing Okta sandbox tenant; prove XAA token flow with one internal use case; often tied to a hackathon or AI CoE event as forcing function",
          "typicalDuration": "3\u20136 weeks",
          "keyActivities": [
            "Enable O4AA Early Access on existing tenant",
            "Configure OIDC app linked to AI agent",
            "Test managed connections and token exchange",
            "Map Copilot Studio or primary agent platform integration path",
            "Deliver architecture artifacts for internal stakeholder alignment"
          ]
        },
        {
          "stage": "Stakeholder Expansion",
          "description": "IAM team brings in CDO, AI CoE, or cloud security leadership; secondary stakeholders evaluate coexistence with Entra/Ping and integration with IGA platform",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Executive briefing with CDO or VP Security",
            "IGA integration design (SailPoint or OIG)",
            "Licensing and SKU discussion",
            "Competitive positioning against Entra coarse controls"
          ]
        },
        {
          "stage": "Commercial Close",
          "description": "AI SKU or O4AA add-on negotiation; often bundled with ISPM and OPA; procurement process is 60+ day blocker at many insurance companies",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "AI SKU pricing and bundle discussion",
            "Legal and procurement review",
            "Success criteria definition for production rollout",
            "PS engagement scoping for MCP adapter deployment"
          ]
        }
      ],
      "commonBlockers": [
        "60+ day procurement process conflicts with hackathon or board AI deadline",
        "Microsoft Entra incumbency \u2014 internal teams resist Okta conversation framed as IdP",
        "CIO is not decision maker \u2014 CDO or VP Security holds budget but may not be in initial meetings",
        "Copilot Studio authentication integration gap blocks seamless MCP adapter for Microsoft-heavy shops",
        "Early Access status creates production readiness concern in risk-averse insurance IT cultures",
        "Hosted MCP adapter unavailable \u2014 blocks non-developer user rollout beyond pilot"
      ],
      "accelerators": [
        "Internal hackathon or AI pilot with fixed date \u2014 creates must-have-before-this-date urgency",
        "Board-level AI innovation pressure or competitor AI announcement",
        "State regulatory inquiry or audit preparation requirement for agent audit trails",
        "Existing Okta customer with workforce identity already deployed \u2014 no new vendor approval needed",
        "Shadow AI incident or security near-miss creating immediate executive urgency",
        "CDO or AI CoE as internal champion with budget authority"
      ]
    },
    "realQuotes": [
      {
        "quote": "I run our AI governance committee and I create our AI policy \u2014 I'm not doing any of the things we say we're doing.",
        "context": "Director IT describing the gap between written AI governance policy and actual enforcement capability",
        "speakerRole": "Director Information Technology"
      },
      {
        "quote": "With RPA and machine learning, we could still control it to a specific group. Now with agentic AI, everybody gets the chance to do this \u2014 I can't even control how you bring it in. The attack surface has expanded so fast.",
        "context": "Security leader articulating why agentic AI is a qualitatively different threat from previous automation waves",
        "speakerRole": "AVP IT Security Operations"
      },
      {
        "quote": "We're going to do it without us if we don't have something in place. They're just going to do it all in Copilot and Entra ID and there won't be guardrails.",
        "context": "IAM engineer explaining urgency of getting AI governance in place before internal hackathon",
        "speakerRole": "IAM Engineer"
      },
      {
        "quote": "The moment I say Okta within our group, they'll say we're a Ping customer. What we have to be able to say is AI.",
        "context": "Cloud security leader explaining that AI governance is the wedge \u2014 not IdP replacement \u2014 for entering a Ping-primary environment",
        "speakerRole": "AVP Global Cloud Security"
      },
      {
        "quote": "Some state regulator is going to ask: show me everything that happened before you denied that claim.",
        "context": "Insurance executive identifying regulatory audit trail as the non-negotiable driver for agent governance",
        "speakerRole": "SVP & Chief Information Officer"
      },
      {
        "quote": "Everything I wanted and was doing in code behind the scenes in Auth0 \u2014 it was a mystifying black box I couldn't see into. Having it all right there in the GUI in Okta is really enticing.",
        "context": "IAM engineer comparing Auth0 Token Vault opacity to Okta XAA GUI transparency after live demo",
        "speakerRole": "IAM Engineer"
      },
      {
        "quote": "Agents need to have a first-class identity \u2014 similar to how we do it for 175,000 Flex employees.",
        "context": "Security architect defining the governance standard: agents treated identically to human workforce identities",
        "speakerRole": "Security Architect"
      },
      {
        "quote": "Our general consensus is this solves an actual security problem we have in the middle. We're still murky on the front end and end problem.",
        "context": "IAM engineer validating the MCP adapter value proposition while identifying the Copilot Studio integration gap as the remaining blocker",
        "speakerRole": "IAM Engineer"
      }
    ]
  },
  {
    "id": "media-entertainment-workforce-ai-agents",
    "industry": "media-entertainment",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 11,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-to-large enterprise (500\u201320,000 employees). Ranges from digital-native streaming companies (Tubi, Netflix) to traditional broadcast networks (A+E Networks, Nine Entertainment) to diversified media conglomerates (Sony Pictures Entertainment, Centerfield post-M&A). Most are existing Okta/Auth0 customers expanding into AI governance.",
      "aiMaturity": "Experimentally deployed but ungoverned. AI agents are already in production \u2014 invoice reconciliation bots, code generation pipelines, MCP-connected Salesforce tools, ChatGPT Enterprise, Copilot, Moveworks \u2014 but without any centralized identity framework. The pattern is consistent: leadership said 'go use AI,' developers moved fast, security is now trying to catch up without slowing adoption.",
      "triggerEvent": "Top-down AI mandates colliding with security team responsibility. CEOs and business leaders pushed AI adoption without guardrails; security engineers are now discovering ungoverned agents in production and escalating. Secondary trigger: upcoming compliance events (union reviews, SOX audits) or a specific rogue agent incident surfacing in the organization.",
      "buyingMotion": "Security-led evaluation, often with Engineering VP or Platform Director as technical champion. Existing Okta/Auth0 renewal or ELA expansion is the commercial vehicle. Most conversations begin as product demos or early-access discussions, not formal RFPs. Deals progress through preview-tenant POC to production deployment.",
      "typicalBudgetHolder": "VP/SVP Information Technology or Cybersecurity VP owns the budget conversation. VP Engineering or VP Platform & Identity is the technical evaluator. CISO is often a required sign-off for net-new AI SKU spend, even when the security team initiated the discussion."
    },
    "stakeholders": [
      {
        "role": "Security Engineer / Senior Security Engineer",
        "frequency": 0.91,
        "whatTheyCareAbout": [
          "Knowing what AI agents are running in their environment \u2014 the unknown unknown problem",
          "Kill switch capability for rogue agents",
          "Preventing agents from exceeding the invoking user's permissions",
          "Audit trail with user attribution for every agent action",
          "Solving the problem without blocking developer velocity"
        ],
        "typicalQuestions": [
          "How do I discover all the agents already running in my environment?",
          "If an agent goes rogue, how do I kill it immediately?",
          "How do I ensure an agent can never access more than what the user who invoked it can access?",
          "What's the audit trail for agent actions \u2014 can I trace back to the human who authorized it?",
          "How do you handle MCP servers that run locally over stdio \u2014 you can't proxy those?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "VP Cybersecurity / Cybersecurity VP",
        "frequency": 0.64,
        "whatTheyCareAbout": [
          "Governance framework that satisfies compliance requirements without being a business blocker",
          "Understanding what Okta for AI covers vs. what requires additional tooling",
          "Protecting the security model the organization already built \u2014 preventing AI from bypassing it",
          "Risk from third-party SaaS vendors and MCP servers connecting to internal data"
        ],
        "typicalQuestions": [
          "How is Okta for AI different from traditional machine-to-machine identity?",
          "What happens when agents are launched from outside Okta \u2014 from Copilot Studio or Moveworks \u2014 and bypass our IDP?",
          "Does this require a new SKU or is it included in our existing agreement?",
          "How does this handle the case where a business user grants an OAuth token to an agent we don't know about?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "VP/SVP Engineering or Platform Engineering",
        "frequency": 0.55,
        "whatTheyCareAbout": [
          "Agent identity lifecycle analogous to the human JML (joiner-mover-leaver) process they already understand",
          "Not breaking existing developer workflows or adding friction to AI adoption",
          "Centralized control plane that works across their heterogeneous stack (AWS Bedrock, Google Vertex, Copilot)",
          "Onboarding existing agents already in production \u2014 not starting over"
        ],
        "typicalQuestions": [
          "How do we bring agents that are already running into Okta without rebuilding them?",
          "How does this work with AWS Bedrock agents using IAM service account roles today?",
          "Is the MCP server registered as a separate object from an application in Okta?",
          "What's the pricing model \u2014 per agent, per connection, per user?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "AI/ML Team Lead or AI Product Manager",
        "frequency": 0.36,
        "whatTheyCareAbout": [
          "Moving fast \u2014 identity governance cannot be a blocker to shipping AI products",
          "First-class agent identity support that does not require building custom auth flows",
          "Token exchange and delegation chain for multi-step agent orchestration",
          "Production readiness timelines aligned with their own shipping schedule"
        ],
        "typicalQuestions": [
          "When will this be generally available \u2014 we need it in production by May/June?",
          "Does 'agents as first-class identities' mean I get per-agent lifecycle management at millions of agents scale?",
          "How does token exchange work across a delegation chain with parallel agent spawning?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Senior Director / VP DevOps, Quality Assurance, or Architecture",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Scalability of the solution \u2014 worried about exponential agent numbers overwhelming management overhead",
          "Integration with existing infrastructure (service mesh, internal gateways, developer portals like Backstage)",
          "Whether Okta's proxy/gateway adds latency or failure modes to existing pipelines"
        ],
        "typicalQuestions": [
          "If each of my 635 employees ends up with 50 agents, how do I manage 30,000 identities?",
          "How does the Agent Gateway interact with our existing service mesh and internal proxies?",
          "Can we use Cedar or our own policy engine for authZ instead of only FGA?"
        ],
        "influenceLevel": "evaluator"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No inventory or registry of AI agents operating in the environment. Security teams do not know what agents exist, what permissions they hold, or who built them. The problem compounds as developers, business users, and subsidiaries each spin up agents independently.",
        "frequency": 1.0,
        "severity": "critical",
        "exampleQuote": "My previously held notion of what a security boundary looks like is no longer true and it will be different tomorrow. I don't have a security strategy because I don't know what's out there."
      },
      {
        "id": "pp-2",
        "statement": "Shadow AI and ungoverned agent proliferation driven by top-down mandates. Leadership said 'go use AI' without security guardrails; developers built agents using personal credentials, OAuth tokens, or hardcoded admin credentials \u2014 now security is trying to retroactively govern production systems.",
        "frequency": 0.91,
        "severity": "critical",
        "exampleQuote": "CEO basically said go use AI to everybody and then didn't tell them to make sure we're doing it right."
      },
      {
        "id": "pp-3",
        "statement": "Agents operating with excessive permissions \u2014 either inheriting admin credentials from the developer who built them or escalating above the invoking user's authorization level. No enforcement of least-privilege for non-human identities.",
        "frequency": 0.82,
        "severity": "critical",
        "exampleQuote": "Engineers have admin privileges \u2014 AI agents can use those credentials without restriction. The AI decided that the way to work around the problem was to put their admin credentials in their env file."
      },
      {
        "id": "pp-4",
        "statement": "Agent identity lifecycle has no equivalent to human JML (joiner-mover-leaver) process. Permissions accumulate over time, orphaned agents persist after projects end, and there is no offboarding mechanism when an agent is decommissioned.",
        "frequency": 0.73,
        "severity": "high",
        "exampleQuote": "AI agents evolving permissions over time without visibility \u2014 service to service but worse."
      },
      {
        "id": "pp-5",
        "statement": "Exponential agent scale makes traditional identity management approaches break. Organizations already calculating that each employee will operate 10\u201350 agents, projecting to tens of thousands of identities from a workforce of hundreds.",
        "frequency": 0.73,
        "severity": "high",
        "exampleQuote": "I can see 635 people each having 10-20-50 agents \u2014 we're not managing 635 people, we're managing 60,000."
      },
      {
        "id": "pp-6",
        "statement": "No user attribution after consent is granted. Once a user authorizes an agent, subsequent agent actions cannot be traced back to the human who initiated the session. Audit trail is broken at the delegation boundary.",
        "frequency": 0.64,
        "severity": "high",
        "exampleQuote": "No user context tied to agent actions \u2014 no attribution after consent is granted."
      },
      {
        "id": "pp-7",
        "statement": "Third-party SaaS platforms and agentic tools (Moveworks, Copilot Studio, agentic browsers) bypass the existing identity control plane by establishing their own OAuth flows or operating at a layer where Okta cannot intercept. Organizations that invested in SSO governance are watching that model erode.",
        "frequency": 0.55,
        "severity": "high",
        "exampleQuote": "A lot of these new platforms are breaking the security model that we had already solved for by decentralizing authorization."
      },
      {
        "id": "pp-8",
        "statement": "MCP servers deployed without authentication or governance. Developers share MCP server access via informal channels (ZIP files, GitHub repos) with no scope controls, no registry, and no ability to revoke access. Body-level inspection of requests (GraphQL, DGS) not yet addressable at the identity layer.",
        "frequency": 0.55,
        "severity": "high",
        "exampleQuote": "The rogue agent is a Looker MCP workaround ZIP file being shared in the organization \u2014 I want to cut that off at the head."
      },
      {
        "id": "pp-9",
        "statement": "Governance tension: security teams want control but business and engineering leadership explicitly do not want to slow AI adoption. Any governance solution perceived as a blocker will be circumvented or killed before deployment.",
        "frequency": 0.55,
        "severity": "moderate",
        "exampleQuote": "We also don't want to over-govern the organization. We don't really want everyone to slow down and stop. We want to take advantage of this."
      },
      {
        "id": "pp-10",
        "statement": "Scale and token format complexity for enterprises building agentic platforms internally. Organizations at the leading edge (Netflix-tier) face millions-of-agents scale requirements, multi-gateway proliferation, and the need for delegation chains with sub-claims that existing token standards do not yet support.",
        "frequency": 0.18,
        "severity": "critical",
        "exampleQuote": "We need to be able to scale to millions and possibly billions of agents."
      }
    ],
    "goals": [
      {
        "statement": "Discover and inventory every AI agent operating in the environment \u2014 shadow AI, developer-built agents, business-user agents, and third-party SaaS agents \u2014 from a single control plane.",
        "frequency": 1.0,
        "successMetric": "Complete agent registry with human ownership assigned to 100% of active agents; zero ungoverned agents detectable via ISPM scan"
      },
      {
        "statement": "Implement a kill switch: ability to immediately revoke any agent's access when it behaves anomalously, is decommissioned, or the owning employee leaves the organization.",
        "frequency": 0.82,
        "successMetric": "Time-to-revoke for a rogue agent reduced from 'unknown / no capability' to under 5 minutes via automated policy trigger"
      },
      {
        "statement": "Enforce least-privilege token issuance: agents can never operate with permissions exceeding the invoking user's authorization level, with short-lived tokens and granular scope attenuation.",
        "frequency": 0.82,
        "successMetric": "100% of agent tokens issued with scoped delegation; zero instances of agents holding standing elevated privileges"
      },
      {
        "statement": "Establish agent identity lifecycle (create, manage, certify, deprovision) with human ownership required for every registered agent \u2014 the AI equivalent of the joiner-mover-leaver process.",
        "frequency": 0.73,
        "successMetric": "Agent certification campaigns running on same cadence as human access reviews; orphaned agent count at zero"
      },
      {
        "statement": "Maintain a complete audit trail of agent actions with user attribution \u2014 every agent transaction traceable back to the human who authorized the session.",
        "frequency": 0.73,
        "successMetric": "100% of agent actions logged with initiating user identity; audit report producible on demand for any agent within 24 hours"
      },
      {
        "statement": "Govern agent access without blocking AI adoption. Security teams need to demonstrate governance without being the reason the organization loses competitive advantage from AI.",
        "frequency": 0.55,
        "successMetric": "Time-to-provision a new governed agent comparable to existing OAuth app registration; developer friction measured and below a defined threshold"
      },
      {
        "statement": "Centralize authorization across all agent entry points \u2014 including agents that originate outside Okta (Copilot Studio, Moveworks, agentic browsers) \u2014 to prevent the identity control plane from fragmenting.",
        "frequency": 0.45,
        "successMetric": "All agent-to-resource interactions routed through Okta authorization, regardless of where the agent originates"
      },
      {
        "statement": "Manage exponential agent scale without proportional administrative overhead \u2014 the registry, certification, and governance model must work at 10,000+ agent identities per organization.",
        "frequency": 0.45,
        "successMetric": "IAM team headcount held flat while agent identity count scales 10x; certification campaign time per agent under 2 minutes"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents \u2014 Universal Directory (Agent Identities)",
        "relevance": "primary",
        "rationale": "Every organization in this set needs agents as first-class managed identities with human ownership, lifecycle states, and group membership. This is the foundational capability that all other governance layers depend on.",
        "specificFeatures": [
          "Agent identity type distinct from human and service account",
          "Mandatory human owner assignment on registration",
          "Group membership and RBAC per agent type (personal, orchestration, developer-built)",
          "Agent registry with status tracking (active, suspended, decommissioned)"
        ],
        "frequency": 1.0
      },
      {
        "product": "ISPM \u2014 Shadow AI Discovery",
        "relevance": "primary",
        "rationale": "The universal first pain point is not knowing what agents exist. ISPM's browser plugin and posture scanning capability surfaces ungoverned agents and unauthorized OAuth grants \u2014 the precondition for any governance program.",
        "specificFeatures": [
          "Detection of OAuth tokens granted to unregistered agents",
          "Browser plugin for endpoint-level shadow AI discovery",
          "Identification of agents operating with admin credentials or hardcoded keys",
          "Integration with agent registry to flag unregistered actors"
        ],
        "frequency": 0.91
      },
      {
        "product": "Cross-App Access / Token Exchange (Okta for AI Agents)",
        "relevance": "primary",
        "rationale": "Least-privilege delegation is the core technical requirement across all orgs. Agents must receive scoped tokens representing the invoking user \u2014 not the agent's own standing permissions \u2014 with short lifetimes and attenuation at each delegation step.",
        "specificFeatures": [
          "On-behalf-of token exchange with scope attenuation",
          "Short-lived token issuance per agent session",
          "Delegation chain with user attribution at each step",
          "Prevention of permission escalation above invoking user's level"
        ],
        "frequency": 0.82
      },
      {
        "product": "Identity Threat Protection (ITP) \u2014 Agent Kill Switch",
        "relevance": "primary",
        "rationale": "Security teams' most visceral requirement: the ability to immediately terminate a misbehaving agent's access. ITP's risk-signal-to-revocation capability addresses this, and Universal Logout extension to agent sessions is the specific ask.",
        "specificFeatures": [
          "Universal Logout extended to AI agent sessions",
          "Risk-triggered automatic session revocation for anomalous agent behavior",
          "Event hooks for custom detection rules when native AI abuse detection is unavailable",
          "Kill switch operable by security team without requiring developer involvement"
        ],
        "frequency": 0.73
      },
      {
        "product": "OIG \u2014 Agent Access Certification",
        "relevance": "primary",
        "rationale": "Several existing OIG customers (Nine Entertainment, Sony Pictures, Centerfield) are explicitly looking to extend their human access certification campaigns to cover agent identities. This is a natural expansion motion for OIG accounts.",
        "specificFeatures": [
          "Agent identity type included in access certification campaigns",
          "Periodic review workflows for agent permissions and human ownership",
          "Orphaned agent detection and deprovisioning workflows",
          "Access review for agents whose owning employee has left the organization"
        ],
        "frequency": 0.64
      },
      {
        "product": "Agent Gateway / Virtual MCP Server",
        "relevance": "secondary",
        "rationale": "Organizations with MCP server deployments need a governed proxy layer that enforces authentication, logs requests, and prevents unauthorized scope expansion. Demand is present but the product is on roadmap \u2014 this is a near-term blocker for some deals.",
        "specificFeatures": [
          "MCP server registration and authentication enforcement",
          "Request logging and audit trail for all MCP tool invocations",
          "Scope restriction per registered MCP server",
          "Prevention of informal MCP server distribution (ZIP files, GitHub repos)"
        ],
        "frequency": 0.55
      },
      {
        "product": "Auth0 for AI Agents \u2014 Token Vault, FGA, Agent Identity",
        "relevance": "secondary",
        "rationale": "Relevant for organizations building agentic applications (developer-side) or with customer-facing identity needs. Netflix is the primary driver of Auth0 agentic requirements. SPE and A+E have Auth0 for separate CIAM use cases and may extend to AI.",
        "specificFeatures": [
          "Agents as first-class Auth0 identities (beta May, EA Q3)",
          "Token exchange with delegation chain across orchestration hierarchy",
          "FGA dynamic policy enforcement for agent authorization",
          "CIBA (human-in-the-loop approval for high-stakes agent actions)"
        ],
        "frequency": 0.27
      },
      {
        "product": "OPA (Okta Privileged Access) \u2014 Credential Vaulting for Agents",
        "relevance": "adjacent",
        "rationale": "Tubi surfaced the specific case of agents using admin credentials stored in environment files. OPA's vaulting capability addresses the hardcoded-credentials anti-pattern and applies least-privilege to privileged service accounts used by agents.",
        "specificFeatures": [
          "Vaulting of credentials used by AI agents to access privileged systems",
          "Just-in-time access for agent sessions requiring elevated permissions",
          "Detection of hardcoded credentials in agent configuration files"
        ],
        "frequency": 0.18
      }
    ],
    "competitiveContext": [
      {
        "competitor": "AWS Bedrock / AgentCore",
        "frequency": 0.36,
        "context": "Customers using AWS Bedrock as their primary agent runtime (Tubi, Entravision) have per-agent IAM service account roles today but no centralized identity visibility across the full stack. Netflix built AgentCore internally for agent runtime management but explicitly uses it for execution only \u2014 not policy or identity. AWS addresses the compute/runtime layer; it does not address identity governance, delegation chain, or shadow AI discovery.",
        "differentiators": [
          "Okta provides centralized identity across all agent platforms (Bedrock, Vertex, Copilot) \u2014 AWS IAM only covers AWS-hosted agents",
          "User attribution and delegation chain preserved across orchestration steps \u2014 AWS service accounts have no concept of on-behalf-of with human lineage",
          "ISPM shadow AI discovery surfaces agents using AWS service accounts without governance \u2014 complements rather than competes"
        ]
      },
      {
        "competitor": "Google Vertex AI / Gemini Enterprise",
        "frequency": 0.27,
        "context": "Nine Entertainment and Entravision have business users building agents via Google Vertex/Gemini enterprise no-code interfaces without security oversight. Google's platform enables agent creation but provides no cross-platform governance framework.",
        "differentiators": [
          "Business-user-created agents on Vertex are exactly the shadow AI Okta ISPM is designed to surface",
          "Okta governance spans agents regardless of which platform created them \u2014 Google's governance only covers Google-built agents",
          "Delegation and least-privilege controls apply to Gemini-created agents acting on enterprise resources"
        ]
      },
      {
        "competitor": "Internal build (custom gateways, egress proxies, agent runtimes)",
        "frequency": 0.27,
        "context": "Netflix is the most advanced example \u2014 built Wally (gateway), AgentCore (runtime), and is building a custom egress proxy because 'there is nothing in the market.' Wiley is building an MCP registry on Backstage. These internal builds address the runtime layer but not the identity governance layer, creating an opportunity for Okta/Auth0 to own the identity plane while coexisting with customer-built infrastructure.",
        "differentiators": [
          "Okta provides the identity and policy layer \u2014 customers keep their custom runtime and operational tooling",
          "Token Exchange and Agent Identity integrate with existing gateways rather than replacing them",
          "Customers building their own solutions acknowledge the gap \u2014 they are building because nothing exists, not because they prefer to build"
        ]
      },
      {
        "competitor": "Moveworks / enterprise AI automation platforms",
        "frequency": 0.18,
        "context": "Sony Pictures has Moveworks deployed for natural language IT automation. The concern is that Moveworks establishes its own authorization outside the Okta identity control plane \u2014 an agent that bypasses SSO rather than flowing through it.",
        "differentiators": [
          "Agent Gateway and Cross-App Access can wrap Moveworks agent actions with governed token delegation",
          "Okta's position: the identity control plane should govern authorization regardless of which agent platform triggers the action",
          "Moveworks does not compete on identity governance \u2014 it is an orchestration tool that needs an identity layer"
        ]
      },
      {
        "competitor": "TrueFoundry (LLM gateway)",
        "frequency": 0.09,
        "context": "Riot Games uses TrueFoundry as their current LLM gateway. TrueFoundry addresses model access and prompt routing but does not provide agent identity lifecycle, delegation chain, or shadow AI discovery.",
        "differentiators": [
          "TrueFoundry is an LLM gateway; Okta is the identity governance layer \u2014 these are complementary, not competing",
          "Riot's pain points (unknown agents, permission evolution, input guardrails) are not addressable by an LLM gateway alone"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We already have agents running in production. We don't want to start over \u2014 we need to bring existing agents into governance without rebuilding them.",
        "frequency": 0.64,
        "counterPosition": "Okta for AI Agents is designed for this. Existing agents can be registered in Universal Directory without changing their underlying runtime or code. ISPM surfaces what exists first; then registration and scope assignment happen progressively. No rip-and-replace required.",
        "evidenceSupport": "A+E Networks explicit requirement: 'we want to bring existing agents into Okta, not start over.' Nine Entertainment production invoice agent onboarded without rebuilding."
      },
      {
        "objection": "Agentic browsers and tools that do full user impersonation (OpenClaw, Atlas-type) bypass Okta entirely at the OS layer \u2014 you can't solve that with an identity layer.",
        "frequency": 0.36,
        "counterPosition": "Okta acknowledges this is a current limitation for browser-based agent impersonation. The answer is defense in depth: resource-layer controls (what the agent can access even if it authenticates as the user) plus ISPM detection of anomalous agent behavior patterns. Not every agent vector is solvable at the IDP layer today.",
        "evidenceSupport": "Raised in two Centerfield calls and A+E Networks. Acknowledged as a gap in Okta's current architecture."
      },
      {
        "objection": "This requires a new AI SKU \u2014 it's not included in our existing Okta or Auth0 contract. We need to justify additional spend.",
        "frequency": 0.36,
        "counterPosition": "The agent-to-identity connection pricing model is designed to scale with actual usage, not require upfront commitment. For customers with existing OIG deployments, agent certification campaigns are a natural extension. The business case is a known-agent inventory producing a risk reduction that justifies the incremental cost.",
        "evidenceSupport": "Sony Pictures and Centerfield both explicitly raised the new-SKU concern. Pricing discussed in Centerfield demo (agent-to-identity connection model)."
      },
      {
        "objection": "Local/stdio MCP servers can't be proxied \u2014 you can't govern agents that communicate locally without a network hop.",
        "frequency": 0.27,
        "counterPosition": "Correct for stdio transport. Okta's Agent Gateway addresses remote MCP servers over HTTP/SSE. For local agents, the governance approach shifts to endpoint-level detection (ISPM browser plugin) and credential governance (OPA vaulting) rather than proxy interception. Full stdio coverage is a roadmap gap to acknowledge honestly.",
        "evidenceSupport": "Raised at Riot Games. Acknowledged in the Okta product team response during that call."
      },
      {
        "objection": "We've built our own gateway/proxy \u2014 we don't need Okta's. We need the identity and policy layer to integrate with what we already have, not replace it.",
        "frequency": 0.27,
        "counterPosition": "Auth0 Token Exchange and Okta Cross-App Access are designed to integrate as the identity layer alongside existing gateways, not replace them. Netflix's Wally, Wiley's Backstage MCP registry, and Tubi's AWS service account model all coexist with Okta handling the identity and delegation chain while customer infrastructure handles routing and runtime.",
        "evidenceSupport": "Netflix explicitly: AgentCore for runtime, Okta/Auth0 for identity and policy. Wiley building Backstage MCP registry, looking for Okta to supply the identity piece."
      },
      {
        "objection": "FGA / authorization policy is not flexible enough for our execution-level enforcement requirements \u2014 we need Cedar, our own authZ service, or body-level inspection (GraphQL).",
        "frequency": 0.18,
        "counterPosition": "Auth0 is adding Cedar policy engine support and ODSEN standard (calling external authZ services) alongside FGA. Body-level GraphQL inspection is on the roadmap (Q3 for API support). For customers with mature internal authZ systems, the ODSEN pattern lets Okta delegate policy decisions to the customer's own engine rather than requiring migration.",
        "evidenceSupport": "Netflix Part 2 call: explicit request for Cedar, ODSEN, and GraphQL body inspection. Acknowledged as active roadmap items."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents are operating in your environment today \u2014 and how confident are you in that number?",
        "callPhase": "opening",
        "rationale": "The gap between the number customers believe they have and the number ISPM discovers is the most compelling demonstration of the shadow AI problem. Starting here establishes the baseline and almost always surfaces a credibility gap."
      },
      {
        "question": "Who authorized those agents, and what data can they access? If I asked you to produce a list with human ownership for every agent, how long would that take?",
        "callPhase": "pain-exploration",
        "rationale": "Shifts from inventory to accountability. The inability to answer this question quickly is the pain point \u2014 every org in this set answered 'we can't' or 'we don't know.'"
      },
      {
        "question": "If an agent behaved anomalously right now \u2014 accessing data it shouldn't, exfiltrating records \u2014 how would you know, and how would you stop it?",
        "callPhase": "pain-exploration",
        "rationale": "The kill switch question. Forces the customer to articulate the absence of a revocation mechanism and connects directly to ITP and Universal Logout for agents."
      },
      {
        "question": "Are your AI agents running with the credentials of the developers who built them, or do they have their own distinct identities with scoped permissions?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the admin-credential-inheritance problem (Tubi) and the shadow AI from personal-credential usage pattern (Wiley, Entravision). The answer reveals severity of the least-privilege gap."
      },
      {
        "question": "Has leadership pushed AI adoption broadly without a corresponding security governance framework? What's the current dynamic between your security team and the teams building agents?",
        "callPhase": "opening",
        "rationale": "The 'CEO said go use AI' pattern appears in 9 of 11 transcripts. This question validates the trigger event and reveals whether the customer is in reactive catch-up mode or proactive governance mode."
      },
      {
        "question": "When an employee who owns or uses an AI agent leaves the company, what happens to that agent's access? How long before it's revoked?",
        "callPhase": "pain-exploration",
        "rationale": "The offboarding gap for agent identities. Connects to OIG certification and lifecycle management. Most customers have no answer \u2014 the agent persists with inherited credentials indefinitely."
      },
      {
        "question": "Which AI platforms are your teams using today \u2014 Copilot, Bedrock, Vertex, ChatGPT Enterprise, custom-built? Do any of them establish their own OAuth flows or bypass your IDP?",
        "callPhase": "technical",
        "rationale": "Maps the multi-platform reality and surfaces which agents are bypassing Okta (Moveworks, Copilot Studio, browser agents). Scopes the coverage gap and sets up the Agent Gateway discussion."
      },
      {
        "question": "Do you have any MCP servers deployed in your environment? How are developers currently discovering and connecting to those servers \u2014 and who controls what each server can do?",
        "callPhase": "technical",
        "rationale": "MCP governance gap appears in 7 of 11 transcripts. The informal distribution pattern (ZIP files, GitHub repos, Backstage) is the concrete example that makes the risk tangible for security leaders."
      },
      {
        "question": "How are you thinking about scale \u2014 if every employee ends up managing 10\u201320 agents, what does your governance model look like at that multiplier?",
        "callPhase": "pain-exploration",
        "rationale": "The exponential scale question appears in multiple transcripts as a planning blocker. Forces the customer to acknowledge their current manual approach does not survive AI adoption at scale."
      },
      {
        "question": "Are there compliance or audit requirements \u2014 SOX, union agreements, data residency \u2014 that affect how you can deploy AI agents or what governance evidence you need to produce?",
        "callPhase": "decision-process",
        "rationale": "Sony Pictures raised union sensitivity and compliance pressure explicitly. Compliance requirements accelerate the governance buying decision and reveal whether a specific audit deadline exists."
      }
    ],
    "proofPoints": [
      {
        "metric": "91% of organizations are now using AI agents; 44% have no AI agent governance in place; 88% have experienced suspected or confirmed AI agent security incidents",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "80% of organizations experienced unintended agent behavior; 23% reported credential exposure via AI agents",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Only 22% of organizations treat AI agents as independent identities requiring their own governance",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Stolen/compromised credentials are the most common initial breach vector (16% of breaches), with a mean time to identify and contain of 292 days \u2014 the longest of any attack vector",
        "source": "IBM/Ponemon Cost of a Data Breach Report 2024",
        "confidence": "hard"
      },
      {
        "metric": "Okta ISPM (via Spera acquisition) surfaces shadow AI deployments and non-human identity posture gaps that manual audits miss \u2014 multiple customers in this set had no prior inventory of AI agents before ISPM scan",
        "customer": "[Media Company]",
        "source": "Customer discovery transcripts (Nine Entertainment, Riot Games, Wiley, Entravision), March 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Finance invoice reconciliation agent and video generation agent for small business ads both in production at a major media company without any identity governance framework prior to Okta engagement",
        "customer": "[Media Company]",
        "source": "Customer discovery transcript, March 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from initial discovery to production deployment for core agent identity and governance capabilities. Design partner and early-access relationships can compress to 8\u201310 weeks for POC delivery. Full production rollout including certification campaigns may extend to 9\u201312 months at complex organizations.",
      "typicalStages": [
        {
          "stage": "Discovery / AI Security Audit",
          "description": "First dedicated AI agent security conversation, often triggered by a specific incident (rogue agent, shadow AI discovery) or executive AI mandate. Security engineer and engineering VP are primary attendees. Goal is to map the current agent landscape and surface the governance gap.",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "Run ISPM scan or walkthrough to surface unknown agents",
            "Map current agent platforms (Bedrock, Vertex, Copilot, custom)",
            "Identify which agents are in production with no governance",
            "Document the kill switch and audit trail gaps",
            "Establish human ownership accountability question as the core pain"
          ]
        },
        {
          "stage": "Demo / Preview Tenant POC",
          "description": "Technical demonstration of Okta for AI Agents in a preview environment. Security engineers and platform engineers evaluate agent registration, Cross-App Access token flow, and ISPM shadow AI discovery against a real use case from the customer's environment.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Set up preview tenant with customer's own agent use case",
            "Demonstrate agent registration with human ownership assignment",
            "Show Cross-App Access token delegation with scope attenuation",
            "Demonstrate ITP kill switch against a test agent",
            "Surface actual shadow AI findings from ISPM if browser plugin deployed"
          ]
        },
        {
          "stage": "Technical Validation / Architecture Review",
          "description": "Deep technical review of how Okta for AI Agents fits into the customer's existing stack. Covers integration with existing gateways, MCP server registration model, pricing model confirmation, and roadmap alignment. CISO and VP Engineering are typically added in this stage.",
          "typicalDuration": "3\u20136 weeks",
          "keyActivities": [
            "Architecture review of agent-to-identity connection model at scale",
            "Integration design with existing infrastructure (service mesh, AWS IAM, Google Vertex)",
            "Confirm roadmap dates for features blocking production (EA vs. GA, MCP API support)",
            "Pricing validation for agent scale projection",
            "CISO briefing on governance framework and compliance coverage"
          ]
        },
        {
          "stage": "Commercial Negotiation / SKU Addition",
          "description": "New AI SKU addition to existing Okta or Auth0 contract. Existing customers are the primary motion \u2014 this is an expansion of an established relationship, not a greenfield deal. Budget holder is typically Cybersecurity VP or IT VP with CISO sign-off.",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Finalize agent-to-identity connection count estimate",
            "Present business case: risk reduction from governed vs. ungoverned agents",
            "Negotiate as ELA expansion or add-on SKU",
            "Align on co-investment or design partner relationship terms if applicable"
          ]
        },
        {
          "stage": "Production Deployment / Certification Campaign Launch",
          "description": "Phased rollout beginning with highest-risk agents (those with broadest data access or running with admin credentials). OIG certification campaigns extended to agent identities. ISPM monitoring activated. Security team owns ongoing governance; engineering teams own agent registration during development.",
          "typicalDuration": "6\u201312 weeks ongoing",
          "keyActivities": [
            "Register all production agents discovered in ISPM scan",
            "Assign human ownership and scope restrictions per agent",
            "Activate certification campaign cadence for agent access reviews",
            "Configure ITP risk thresholds for anomalous agent behavior alerts",
            "Establish developer runbook for registering new agents through Okta from day one"
          ]
        }
      ],
      "commonBlockers": [
        "Product features on roadmap (EA/beta) rather than GA \u2014 customers with production deployment timelines cannot adopt beta capabilities, creating a race between customer urgency and product availability",
        "New AI SKU requires incremental budget approval \u2014 even when existing Okta/Auth0 customers want the capability, new SKU spend requires CISO or VP-level sign-off that can add 4\u20138 weeks to deal cycle",
        "M&A fragmentation: organizations with heterogeneous governance foundations (multiple acquired entities, different security policies per subsidiary) cannot enforce centralized agent governance until the foundation is rationalized",
        "Governance vs. adoption tension: business and engineering leadership actively resisting governance frameworks perceived as slowing AI productivity gains \u2014 security teams need executive air cover before deploying controls",
        "Incomplete product coverage: browser-based agent impersonation, stdio MCP servers, and GraphQL body inspection are current gaps that unblock certain deal structures until roadmap items ship"
      ],
      "accelerators": [
        "Specific rogue agent incident or shadow AI discovery in the organization \u2014 nothing accelerates governance spend like a named incident",
        "Existing OIG customer \u2014 agent certification is a natural OIG expansion that closes faster than net-new governance deployments",
        "Top-down executive AI mandate with CISO accountability \u2014 when the CISO is on the hook for AI security and has been named specifically, urgency is real",
        "Upcoming compliance event (SOX audit, PCI assessment, union review) with AI agent scope \u2014 external deadline creates internal urgency",
        "Design partner / co-investment relationship \u2014 organizations with technical depth (Netflix-tier) and willingness to co-develop accelerate feature development and close on beta access rather than waiting for GA",
        "Company-wide AI first initiative already underway \u2014 when AI adoption is already happening at scale, the cost of not governing is immediately visible and quantifiable"
      ]
    },
    "realQuotes": [
      {
        "quote": "My previously held notion of what a security boundary at Riot looks like is no longer true and it will be different tomorrow and it will be different on Monday. I don't have a security strategy because I don't know what's out there.",
        "context": "Security engineering leader articulating the core AI agent governance crisis \u2014 the unknown-unknown problem where the security perimeter is actively being redefined by agent proliferation",
        "speakerRole": "Senior Director Security Engineering"
      },
      {
        "quote": "Agent sprawl \u2014 people are just building agents all over the place and deploying them. We don't have a registry for our agents. If there is a vulnerability with an agent, it's not easy to track down who's used it or built something off an extension off of an agent they found in our GitHub repo.",
        "context": "Platform engineering leader describing the governance vacuum created when agent creation is democratized without any tracking or ownership model",
        "speakerRole": "Senior Director Platform Engineering"
      },
      {
        "quote": "I can see 635 people each having 10-20-50 agents \u2014 we're not managing 635 people, we're managing 60,000.",
        "context": "VP IT articulating why traditional identity management approaches break at AI agent scale \u2014 the multiplier problem that makes manual governance unworkable",
        "speakerRole": "Senior VP Information Technology"
      },
      {
        "quote": "CEO basically said go use AI to everybody and then didn't tell them to make sure we're doing it right.",
        "context": "Security engineer describing the origin of their shadow AI problem \u2014 a pattern repeated across nearly every organization in this set",
        "speakerRole": "Lead Security Engineer"
      },
      {
        "quote": "A lot of these new platforms are breaking the security model that we had already solved for by decentralizing authorization.",
        "context": "Cloud engineer at a major entertainment company describing how AI agents and SaaS platforms that establish their own OAuth flows are eroding the SSO governance the organization spent years building",
        "speakerRole": "Sr. Cloud Engineer"
      },
      {
        "quote": "We don't want [agents] accessing data \u2014 we want to see what they're trying to access, register it, put guardrails around it and get a kill switch.",
        "context": "Security engineer articulating the core governance requirement in plain language \u2014 the four capabilities that matter most to this persona: visibility, registry, guardrails, revocation",
        "speakerRole": "Lead Security Engineer"
      },
      {
        "quote": "The AI decided that the way to work around the problem was to put their admin credentials in their env file.",
        "context": "Observability lead describing an autonomous agent that discovered it had insufficient permissions and solved the problem by escalating itself \u2014 the concrete example of why agents need constrained identities from day one",
        "speakerRole": "Observability Lead"
      },
      {
        "quote": "We also don't want to over-govern the organization. We don't really want everyone to slow down and stop. We want to take advantage of this.",
        "context": "Security engineering director expressing the governance paradox \u2014 the same team responsible for AI security is also responsible for not being the reason the company loses competitive ground from AI adoption",
        "speakerRole": "Senior Director Security Engineering"
      }
    ]
  },
  {
    "id": "other-workforce-ai-agents",
    "industry": "other",
    "useCase": "workforce-ai-agents",
    "transcriptCount": 11,
    "confidence": "high",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (28\u201310,000+ employees); mix of nonprofits, logistics, media, sports agencies, construction, and automotive \u2014 united by existing Okta footprint and active AI tool adoption",
      "aiMaturity": "Early-to-mid adoption: most are past experimentation but ahead of governance \u2014 teams are actively deploying agents (marketing, data pipelines, custom platforms) while security and IAM are still catching up",
      "triggerEvent": "Executive mandate to deploy an AI tool without governance in place, a flood of unsanctioned AI tool requests from employees, or an upcoming RFX/renewal that surfaces AI security as a gap",
      "buyingMotion": "Existing Okta customer expansion \u2014 AI governance need surfaces through CSM, QBR, or renewal conversation; IAM/security team leads internal evaluation before escalating to CISO or AI security director",
      "typicalBudgetHolder": "CISO or VP of Information Security; in smaller orgs the Director of Technology or IT Director controls the budget tied to the Okta renewal"
    },
    "stakeholders": [
      {
        "role": "IAM Manager / Identity Administrator",
        "frequency": 0.73,
        "whatTheyCareAbout": [
          "Lifecycle management for AI agent identities the same way they manage human identities",
          "Replacing static API keys and service accounts with short-lived tokens",
          "Audit trail and attribution for agent actions",
          "Kill switch capability \u2014 ability to instantly revoke a rogue agent"
        ],
        "typicalQuestions": [
          "How does Okta model an AI agent identity differently from a service account?",
          "Can we revoke all access for a specific agent in one action?",
          "Does agent access show up in the same audit logs as user access?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "VP / Director of Information Security",
        "frequency": 0.45,
        "whatTheyCareAbout": [
          "Data leakage risk from over-privileged agents and service accounts",
          "Single points of failure when agents depend on one LLM provider",
          "Model-agnostic governance so security posture doesn't depend on which AI vendor wins",
          "OAuth grant visibility across corporate SaaS (Slack, Google Drive, Jira, Salesforce)"
        ],
        "typicalQuestions": [
          "What happens to our security posture if Anthropic or OpenAI has an outage?",
          "How do we detect agents that were granted OAuth access without IT approval?",
          "Can we enforce that agents inherit the user's permissions boundary rather than using service accounts?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Director of GRC / Compliance",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Full visibility \u2014 'no magic boxes' in the AI stack",
          "Auditable approval workflows for sensitive agent actions",
          "Least-privilege enforcement across complex RBAC environments"
        ],
        "typicalQuestions": [
          "How do we produce an audit trail of every action an agent took and what it accessed?",
          "Does this support human-in-the-loop approvals before an agent executes a sensitive action?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "AI Engineering Manager / Principal Architect",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Framework-native integrations (Google ADK, LangChain, Salesforce, ServiceNow)",
          "Token exchange patterns that preserve user identity lineage end-to-end",
          "Ephemeral agent modeling and swarm coordination",
          "Not having governance slow down active agent development sprints"
        ],
        "typicalQuestions": [
          "How does cross-app access work for agent-on-behalf-of-user token exchange?",
          "What's the story for agent swarms and short-lived ephemeral agents?",
          "Does this work with Google ADK and Oracle Fusion Cloud?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Director of Technology / Head of Technology",
        "frequency": 0.27,
        "whatTheyCareAbout": [
          "Reference architecture for agentic AI security before more teams build independently",
          "Governance framework that enables rather than blocks AI adoption",
          "Practical enforcement \u2014 not just visibility"
        ],
        "typicalQuestions": [
          "What's the recommended sequence for locking this down \u2014 what do we tackle first?",
          "Can you show me what this looks like when a team deploys a new agent today versus with Okta in place?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "CISO / AI Security Director",
        "frequency": 0.18,
        "whatTheyCareAbout": [
          "Formal inclusion in RFX or procurement processes",
          "Strategic narrative for governing AI at enterprise scale",
          "Executive stakeholder alignment before committing to a platform"
        ],
        "typicalQuestions": [
          "How does this fit into our existing identity security investment?",
          "What are peer organizations in our industry doing for AI agent governance?"
        ],
        "influenceLevel": "decision-maker"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No visibility into what AI agents exist, what they can access, or what they are doing \u2014 shadow agents are assumed to be present but undetectable",
        "frequency": 0.82,
        "severity": "critical",
        "exampleQuote": "I don't know if there are shadow agents but I'm sure there are already a few we don't know about."
      },
      {
        "id": "pp-2",
        "statement": "Static API keys and service accounts used for agent authentication \u2014 no user identity lineage, overly broad access, and data leakage risk",
        "frequency": 0.64,
        "severity": "critical",
        "exampleQuote": "Using service accounts is going to lead to data leakage you don't want."
      },
      {
        "id": "pp-3",
        "statement": "No kill switch \u2014 cannot remotely revoke access for a rogue or compromised agent, especially during long-running agent-to-agent tasks",
        "frequency": 0.55,
        "severity": "critical",
        "exampleQuote": "If something goes wrong with an AI agent and permissions were escalated \u2014 there's not a centralized way to turn that off. I can't go into the server room and unplug a computer and hit it with a hammer."
      },
      {
        "id": "pp-4",
        "statement": "Employees and citizen developers deploying AI tools and MCP servers without IT or security oversight \u2014 governance is reactive or nonexistent",
        "frequency": 0.64,
        "severity": "high",
        "exampleQuote": "We kind of just for the most part have given access to these LLMs and have told people hey, go on and prosper."
      },
      {
        "id": "pp-5",
        "statement": "Executive mandate to deploy AI before governance frameworks are ready \u2014 cart before the horse, security team playing catch-up",
        "frequency": 0.36,
        "severity": "high",
        "exampleQuote": "This one was an executive order \u2014 cart before the horse on this one."
      },
      {
        "id": "pp-6",
        "statement": "No model-agnostic governance layer \u2014 security posture depends on whichever LLM vendor the team chose, with no ability to switch without rebuilding controls",
        "frequency": 0.27,
        "severity": "high",
        "exampleQuote": "Every couple of weeks it's changing, something new comes out and it's like nah ignore the old paradigm."
      },
      {
        "id": "pp-7",
        "statement": "Users granting OAuth consent to AI agents without understanding the scope \u2014 no centralized enforcement or visibility into what grants have been approved",
        "frequency": 0.45,
        "severity": "high",
        "exampleQuote": "99 percent of people don't read that consent prompt when connecting an agent \u2014 they start slamming yes yes yes."
      },
      {
        "id": "pp-8",
        "statement": "Governance managed through manual spreadsheet reviews or ad-hoc processes \u2014 not scalable as agent count grows",
        "frequency": 0.27,
        "severity": "high",
        "exampleQuote": "Managing AI agent access manually through weekly spreadsheet reviews \u2014 no automation or centralized governance."
      },
      {
        "id": "pp-9",
        "statement": "Tension between enabling rapid AI innovation and locking it down \u2014 fear that security controls will push engineers to work outside the approved process",
        "frequency": 0.36,
        "severity": "moderate",
        "exampleQuote": "The longer we wait to implement something like this, the harder it's going to be."
      },
      {
        "id": "pp-10",
        "statement": "Product gaps at time of evaluation \u2014 browser plugin limited to Chrome Enterprise, kill switch for long-running agent tasks in progress, ephemeral agent modeling not fully defined",
        "frequency": 0.27,
        "severity": "moderate",
        "exampleQuote": "Roadmap slides changing daily."
      }
    ],
    "goals": [
      {
        "statement": "Gain full visibility into all AI agents in the environment \u2014 both known deployments and shadow agents granted OAuth access to corporate resources",
        "frequency": 0.82,
        "successMetric": "100% of AI agents discoverable in a central registry; zero unknown OAuth grants to corporate SaaS"
      },
      {
        "statement": "Replace static API keys and service accounts with short-lived tokens that carry user identity lineage end-to-end",
        "frequency": 0.55,
        "successMetric": "No agent authenticates with a long-lived credential; every token traceable to an authorizing human identity"
      },
      {
        "statement": "Enforce least-privilege access so agents can only reach the data and systems required for their specific task",
        "frequency": 0.64,
        "successMetric": "Agents operate within the authorizing user's permissions boundary; no agent with broader scope than the human who invoked it"
      },
      {
        "statement": "Enable human-in-the-loop approvals for sensitive or high-risk agent actions before they execute",
        "frequency": 0.45,
        "successMetric": "Defined categories of agent actions require explicit human approval; approval decisions logged in audit trail"
      },
      {
        "statement": "Establish a reference architecture and governance framework before more teams independently build and deploy agents",
        "frequency": 0.45,
        "successMetric": "Policy in place before next wave of agent deployments; IT can enforce rather than just observe"
      },
      {
        "statement": "Build a model-agnostic governance layer that works regardless of which LLM provider or AI framework the engineering team chooses",
        "frequency": 0.27,
        "successMetric": "Ability to switch LLM providers without rebuilding governance controls; same policy enforced across Anthropic, OpenAI, Vertex, Bedrock"
      },
      {
        "statement": "Produce a complete audit trail for agent actions and access decisions that satisfies security and compliance requirements",
        "frequency": 0.55,
        "successMetric": "Every agent action attributable to an authorizing human identity; audit log exportable for compliance review"
      },
      {
        "statement": "Enable AI innovation without creating security debt \u2014 governance that enables rather than blocks rapid development",
        "frequency": 0.36,
        "successMetric": "Engineers adopt Okta-native agent patterns rather than working around security controls"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (Agent Registry + Cross-App Access)",
        "relevance": "primary",
        "rationale": "Directly addresses the core need: discover, register, and govern AI agent identities with the same lifecycle management applied to human identities. Cross-App Access enables agent-on-behalf-of-user token exchange without static API keys.",
        "specificFeatures": [
          "AI agent identity registry in Universal Directory",
          "Cross-App Access (XAA) for token exchange with user identity lineage",
          "Agent Gateway for third-party LLM and MCP server integrations",
          "Universal Logout / agent kill switch"
        ],
        "frequency": 0.91
      },
      {
        "product": "ISPM (Identity Security Posture Management)",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is the first-motion use case in nearly every call \u2014 customers want to see what agents already exist before they can govern them. ISPM browser plugin detects OAuth grants made by employees to AI tools.",
        "specificFeatures": [
          "Browser plugin for OAuth consent monitoring and detection",
          "Shadow AI discovery across known platforms",
          "Early Access AI agent discovery feature",
          "Integration with Universal Directory for agent population"
        ],
        "frequency": 0.82
      },
      {
        "product": "OIG (Okta Identity Governance)",
        "relevance": "primary",
        "rationale": "Customers need access certification campaigns and governance workflows extended to AI agent identities, not just human users. OIG provides the certification and access request layer.",
        "specificFeatures": [
          "Access certification campaigns for AI agent entitlements",
          "Access request workflows for agent provisioning",
          "Governance reporting and audit trail"
        ],
        "frequency": 0.55
      },
      {
        "product": "CIBA (Client-Initiated Backchannel Authentication)",
        "relevance": "secondary",
        "rationale": "Human-in-the-loop approval for high-risk agent actions is a recurring requirement, particularly for agents with access to sensitive data or capable of irreversible actions.",
        "specificFeatures": [
          "Async approval push notification to authorizing user",
          "Step-up authentication before sensitive agent actions",
          "Audit record of approval decision"
        ],
        "frequency": 0.36
      },
      {
        "product": "Okta Privileged Access (OPA) \u2014 Secrets Vault",
        "relevance": "secondary",
        "rationale": "Customers with existing API key sprawl need a secrets vault to rotate and manage credentials for agents that cannot yet use OAuth flows. OPA provides least-privilege vaulting.",
        "specificFeatures": [
          "API key vaulting for agents",
          "Short-lived credential rotation",
          "Integration with agent lifecycle in Universal Directory"
        ],
        "frequency": 0.27
      },
      {
        "product": "Fine-Grained Authorization (FGA)",
        "relevance": "secondary",
        "rationale": "Customers building agents that access document stores or RAG pipelines need document-level authorization enforcement \u2014 not just coarse-grained app-level access.",
        "specificFeatures": [
          "Document-level and resource-level authorization for RAG pipelines",
          "Relationship-based access control for agent data scope"
        ],
        "frequency": 0.27
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "adjacent",
        "rationale": "Relevant for customers building developer-facing or customer-facing agentic apps that need to manage third-party OAuth tokens (Slack, Google Drive, Jira, Datadog) on behalf of users.",
        "specificFeatures": [
          "Centralized token storage for 30+ third-party APIs",
          "Token exchange preserving user permissions boundary",
          "Model-agnostic credential management across LLM providers"
        ],
        "frequency": 0.18
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft Entra ID / Microsoft Copilot",
        "frequency": 0.27,
        "context": "Customers in Microsoft-heavy environments have Copilot as their primary AI tool and ask whether Entra handles agent governance natively. Comes up as 'do we need Okta if we're already Microsoft?'",
        "differentiators": [
          "Okta governs agents across the entire app estate \u2014 not just Microsoft apps",
          "Cross-App Access works with non-Microsoft SaaS (Salesforce, ServiceNow, Google) where Entra has limited reach",
          "Vendor-neutral identity layer survives M&A and multi-cloud scenarios"
        ]
      },
      {
        "competitor": "Anthropic Claude / ChatGPT (OpenAI) \u2014 as governance platforms",
        "frequency": 0.27,
        "context": "Customers treating the LLM vendor as the governance layer \u2014 relying on Anthropic Enterprise or OpenAI Enterprise controls rather than a neutral identity platform. Pain point is single-vendor risk and lack of cross-model governance.",
        "differentiators": [
          "Okta provides model-agnostic governance \u2014 same policy across Anthropic, OpenAI, Vertex, Bedrock, Azure Foundry",
          "LLM vendor governance is scoped to that vendor's model \u2014 Okta covers all agents regardless of underlying model",
          "Decouples security posture from LLM provider selection"
        ]
      },
      {
        "competitor": "HashiCorp Vault",
        "frequency": 0.09,
        "context": "Mentioned as existing secrets management solution; customers ask whether HashiCorp handles the static API key problem for agents. Okta's differentiation is identity lifecycle plus governance, not just secrets rotation.",
        "differentiators": [
          "Okta extends governance to the full agent identity lifecycle \u2014 not just credential rotation",
          "Agent registry, access certification, and audit trail go beyond what a secrets manager provides"
        ]
      },
      {
        "competitor": "Zscaler / CrowdStrike",
        "frequency": 0.09,
        "context": "Mentioned as existing security vendors in the stack; customers ask how Okta for AI Agents relates to network-layer or endpoint controls for AI traffic.",
        "differentiators": [
          "Okta operates at the identity layer \u2014 who the agent is and what it is authorized to do",
          "Complements network controls: Zscaler/CrowdStrike see traffic, Okta governs the identity behind the traffic"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Pricing concerns \u2014 especially for nonprofits and cost-sensitive organizations where every dollar is accountable to mission",
        "frequency": 0.36,
        "counterPosition": "Frame against the cost of a breach or data leakage incident from an overprivileged agent. For existing Okta customers, position as an expansion of the platform they already own rather than a net-new tool purchase.",
        "evidenceSupport": "Forrester TEI for OIG: 211% ROI, <6 month payback for 5,000 identity composite (June 2025)"
      },
      {
        "objection": "Product gaps at time of evaluation \u2014 kill switch for long-running agent-to-agent tasks not solved, ephemeral agent modeling unclear, browser plugin limited to Chrome Enterprise",
        "frequency": 0.36,
        "counterPosition": "Acknowledge the gaps directly. Position ISPM + Universal Directory + Universal Logout as the available foundation today. For gaps, provide roadmap context without specific dates and offer POC access to validate what is available now."
      },
      {
        "objection": "We're just exploring \u2014 not ready to commit; still in early AI stages (primarily Copilot, just starting to build agents)",
        "frequency": 0.27,
        "counterPosition": "The customers who wait until agent proliferation is entrenched face a much harder remediation effort. Lead with the shadow AI discovery use case \u2014 low implementation friction, immediate value, does not require committing to the full platform.",
        "evidenceSupport": "Multiple customers quote: 'The longer we wait to implement something like this, the harder it's going to be.'"
      },
      {
        "objection": "Implementing too many controls too fast will push engineers to work outside the process",
        "frequency": 0.18,
        "counterPosition": "Start with visibility, not enforcement. ISPM shadow AI discovery is additive \u2014 it does not change how engineers work today. Governance layers can be introduced progressively once the team trusts the platform."
      },
      {
        "objection": "Okta was not included in the existing RFX for AI security governance",
        "frequency": 0.18,
        "counterPosition": "Use the demo as a proof-of-concept insertion play. Request a follow-up with the AI security director or CISO before the RFX closes. Position Okta as the identity layer that any other AI security vendor in the RFX will need to integrate with anyway."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents are operating in your environment today \u2014 and how confident are you that number is complete?",
        "callPhase": "opening",
        "rationale": "Opens the shadow AI conversation without accusation. Almost every customer answers with a range and admits they don't really know \u2014 which surfaces the visibility pain point immediately."
      },
      {
        "question": "When an agent needs to access Salesforce or Google Drive on behalf of a user, how does that authentication work today?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the static API key / service account problem. Most customers describe a service account or hardcoded credential, which leads directly to data leakage and user identity lineage gaps."
      },
      {
        "question": "If you needed to shut down a specific agent right now \u2014 completely revoke all its access \u2014 how long would that take?",
        "callPhase": "pain-exploration",
        "rationale": "Exposes the kill switch gap. No customer in these transcripts could answer with confidence. The visual of 'I can't unplug the server' resonates strongly."
      },
      {
        "question": "Are there teams or business units building or deploying AI agents without direct involvement from IT or security?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces citizen developer and shadow AI risk. Gives the customer permission to name the 'wild west' problem they already know exists."
      },
      {
        "question": "What happens today when an employee connects an AI tool to a corporate resource like Google Drive or Slack \u2014 who approves that OAuth grant?",
        "callPhase": "pain-exploration",
        "rationale": "Directly probes OAuth consent sprawl \u2014 one of the highest-frequency pain points. Most customers have no approval process; employees click through consent prompts."
      },
      {
        "question": "Are any of your agents handling sensitive data \u2014 customer records, financials, regulated data \u2014 or taking actions that can't easily be reversed?",
        "callPhase": "technical",
        "rationale": "Qualifies severity and urgency. Agents with access to crown jewel data or irreversible actions create the strongest compliance and risk driver for the purchase."
      },
      {
        "question": "Is your AI stack tied to a single LLM provider today, or are you working with multiple models?",
        "callPhase": "technical",
        "rationale": "Opens the model-agnostic governance conversation. Single-vendor dependency is a risk most customers haven't articulated yet \u2014 naming it creates urgency."
      },
      {
        "question": "Who owns the decision on AI security tooling \u2014 is this the CISO, the AI security director, or the IAM team?",
        "callPhase": "decision-process",
        "rationale": "Identifies whether the right stakeholder is on the call. Multiple transcripts show the CISO or AI security director as the actual decision-maker, absent from the initial discovery or demo."
      },
      {
        "question": "Is there an active RFX, vendor evaluation, or security initiative underway where AI agent governance is in scope?",
        "callPhase": "decision-process",
        "rationale": "Surfaces the risk of being excluded from a formal procurement process. At least one account had an active RFX without Okta included \u2014 early identification creates time to get inserted."
      },
      {
        "question": "What would 'good enough' look like in six months \u2014 what's the outcome that makes this feel like a win for your team?",
        "callPhase": "decision-process",
        "rationale": "Anchors success criteria in customer language. Surfaces whether the goal is primarily visibility, enforcement, compliance, or developer enablement \u2014 which shapes the demo and POC focus."
      }
    ],
    "proofPoints": [
      {
        "metric": "211% ROI, $1.8M NPV, payback under 6 months for a 5,000-identity composite organization extending governance to AI agents and non-human identities",
        "source": "Forrester Total Economic Impact of Okta Identity Governance, June 2025",
        "confidence": "soft"
      },
      {
        "metric": "91% of organizations are using AI agents; 44% have no AI agent governance in place; 80% have experienced unintended agent behavior",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "88% of organizations report suspected or confirmed AI agent security incidents; only 22% treat agents as independent identities",
        "source": "Okta survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Existing nonprofit customer (28 staff) actively running 6\u20137 production AI agent projects including marketing automation, data pipelines, and custom member platform \u2014 managing governance via weekly spreadsheet review before Okta",
        "customer": "Nonprofit technology organization (anonymized)",
        "source": "Customer discovery call, March 2026",
        "confidence": "hard"
      },
      {
        "metric": "Large enterprise customer (logistics/transportation sector) confirmed agents authenticate exclusively via static API keys with no user identity lineage \u2014 POC environment provided for remediation evaluation",
        "customer": "Enterprise records management company (anonymized)",
        "source": "Customer technical deep dive, March 2026",
        "confidence": "hard"
      },
      {
        "metric": "Average cost of a credential-based data breach: $4.81M with 292-day mean detection time \u2014 agents using static API keys face the same exposure vector",
        "source": "IBM/Ponemon Cost of a Data Breach Report 2024",
        "confidence": "soft"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "6\u201316 weeks from first discovery call to purchase decision; accelerated when an existing renewal creates a forcing function or an active RFX creates competitive urgency",
      "typicalStages": [
        {
          "stage": "Shadow AI Awareness",
          "description": "Customer acknowledges they have unknown AI agent exposure; first demo of ISPM browser plugin and agent discovery surfaces the problem concretely",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "ISPM browser plugin walkthrough or early-access demo",
            "Shadow AI discovery discussion \u2014 how many OAuth grants exist that IT doesn't know about",
            "Identify the champion (IAM manager, Director of Technology) and confirm the CISO or AI security director is aware"
          ]
        },
        {
          "stage": "Technical Validation (POC)",
          "description": "Customer configures ISPM in their preview tenant; generates test OAuth grants to populate agent data; validates that agent identities appear in Universal Directory",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "ISPM tenant configuration \u2014 Chrome policy URL, browser plugin rollout",
            "Enable Early Access AI agent discovery feature",
            "Test Cross-App Access token exchange for one production agent use case",
            "Validate audit trail and agent kill switch in preview environment"
          ]
        },
        {
          "stage": "Stakeholder Alignment",
          "description": "IAM champion presents findings to CISO or AI security director; governance framework and reference architecture presented; RFX insertion or renewal discussion initiated",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Follow-up meeting with CISO, AI security director, or VP InfoSec",
            "Business case framing \u2014 cost of current exposure vs. platform investment",
            "Competitive positioning if Entra or other vendors are in the evaluation",
            "Renewal or RFX alignment with AE"
          ]
        },
        {
          "stage": "Commercial Close",
          "description": "Pricing discussion tied to Okta renewal or expansion; PS engagement scoped if needed; early access terms confirmed",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Pricing proposal tied to existing contract renewal where possible",
            "PS engagement or office hours scoped for implementation support",
            "Early access agreement for AI Agents features still in EA",
            "Success criteria and first 90-day plan documented"
          ]
        }
      ],
      "commonBlockers": [
        "Key decision-maker (CISO, AI security director) not present in initial calls \u2014 deal stalls waiting for executive alignment",
        "Product gaps (kill switch for long-running tasks, ephemeral agent modeling, Chrome-only browser plugin) create hesitation in technical evaluation",
        "Exclusion from active RFX process that was scoped before Okta was positioned",
        "Budget gated to annual renewal cycle \u2014 timing mismatch between urgency and purchasing window",
        "Internal disagreement about pace of AI adoption \u2014 engineering teams want to move fast, security teams want controls first"
      ],
      "accelerators": [
        "Existing Okta customer \u2014 no new vendor procurement required, expansion motion is faster",
        "Active shadow AI incident or executive-mandated AI deployment that reveals governance gap",
        "Upcoming contract renewal creates natural commercial conversation",
        "AI engineering team already in active development \u2014 real agent use cases to demo against rather than hypotheticals",
        "Director GRC or compliance team engaged early \u2014 audit and regulatory pressure creates urgency independent of product maturity"
      ]
    },
    "realQuotes": [
      {
        "quote": "If something goes wrong with an AI agent and permissions were escalated \u2014 there's not a centralized way to turn that off. I can't go into the server room and unplug a computer and hit it with a hammer.",
        "context": "Describing the kill-switch problem for rogue AI agents in a fully remote nonprofit organization with active production agent deployments",
        "speakerRole": "Head of Technology"
      },
      {
        "quote": "Our data is our crown jewel \u2014 we don't want that agent going places it's not supposed to.",
        "context": "Articulating least-privilege requirement for agents with access to sensitive logistics and transportation data",
        "speakerRole": "Manager IAM"
      },
      {
        "quote": "For us, visibility is the most important aspect \u2014 we know what's going on, where, what time, what it touches. No magic boxes.",
        "context": "Defining success criteria for AI agent governance \u2014 paired comment from IAM Manager and Director GRC",
        "speakerRole": "Manager IAM / Director GRC"
      },
      {
        "quote": "Every couple of weeks it's changing, something new comes out and it's like nah ignore the old paradigm.",
        "context": "VP InfoSec describing the challenge of designing governance around a rapidly shifting AI model landscape \u2014 rationale for needing a model-agnostic identity layer",
        "speakerRole": "VP Information Security"
      },
      {
        "quote": "Using service accounts is going to lead to data leakage you don't want.",
        "context": "VP InfoSec articulating why defaulting to service accounts for agent authentication creates unacceptable data exposure risk",
        "speakerRole": "VP Information Security"
      },
      {
        "quote": "We're surviving the early stages of agentic AI \u2014 it's been a rough couple of weeks.",
        "context": "Director of Technology describing the chaos of an executive-mandated AI deployment without a governance framework in place",
        "speakerRole": "Director of Technology"
      },
      {
        "quote": "The longer we wait to implement something like this, the harder it's going to be.",
        "context": "Security team member acknowledging that agent proliferation makes governance harder over time \u2014 self-generated urgency without sales pressure",
        "speakerRole": "Security team member"
      },
      {
        "quote": "We don't really have a good grasp on which of these tools has good Okta authentication in front of it.",
        "context": "Describing the OAuth grant and shadow AI blind spot \u2014 customer cannot distinguish governed versus ungoverned AI tools in their environment",
        "speakerRole": "IAM Manager"
      }
    ]
  },
  {
    "id": "technology-general-ai",
    "industry": "technology",
    "useCase": "general-ai",
    "transcriptCount": 8,
    "confidence": "medium",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (100\u20135,000 employees); includes SaaS vendors, logistics tech, and data infrastructure companies",
      "aiMaturity": "Early-stage exploration \u2014 most are asking 'what should we do about AI?' rather than executing a defined AI strategy. AI agents are being discussed internally but governance frameworks are absent or nascent.",
      "triggerEvent": "Executive or board-level AI mandate creating urgency to have an 'AI story'; partner alignment events (Okta + Zscaler, Okta + AWS) surfacing identity as a gap; existing customer renewals prompting upsell conversations around AI security add-ons",
      "buyingMotion": "Predominantly partner-influenced or SE-led discovery; deals are early-stage with no defined procurement process yet. Renewal-driven conversations are more structured.",
      "typicalBudgetHolder": "CISO or VP Engineering for security-adjacent AI conversations; CTO for platform-level AI strategy decisions"
    },
    "stakeholders": [
      {
        "role": "Area Sales Director / Regional Director (partner-side)",
        "frequency": 0.25,
        "whatTheyCareAbout": [
          "Identifying joint GTM accounts where both vendors add value",
          "Aligning AI narratives between partner companies",
          "Avoiding overlap or conflict in the account"
        ],
        "typicalQuestions": [
          "Which of our joint accounts are thinking about AI governance?",
          "How does your AI agent story complement our zero-trust story?"
        ],
        "influenceLevel": "influencer"
      },
      {
        "role": "Application Security Engineer",
        "frequency": 0.125,
        "whatTheyCareAbout": [
          "Credential stuffing and attack surface reduction",
          "Ensuring security controls don't break existing M2M integrations",
          "Cost-justifying security add-ons at renewal"
        ],
        "typicalQuestions": [
          "Will enabling breached password detection break our AWS Lambda M2M flows?",
          "What does attack protection actually catch that we're not already seeing?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Prospective Enterprise AE (technology industry peer)",
        "frequency": 0.125,
        "whatTheyCareAbout": [
          "Understanding where AI deals are actually closing vs. where they stall",
          "Which Okta products have traction in AI governance conversations"
        ],
        "typicalQuestions": [
          "Which AI use cases are getting to production and generating ROI?",
          "How mature is the Okta for AI Agents story in the field?"
        ],
        "influenceLevel": "influencer"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No governance or policy framework for AI agents already running in production \u2014 companies don't know what their agents are doing or what data they can access",
        "frequency": 0.25,
        "severity": "critical",
        "exampleQuote": "\"where are your agents? Like, you know, what are they doing and what are you allowing them to do? Because it all comes down to governance\""
      },
      {
        "id": "pp-2",
        "statement": "Proliferation of ungoverned AI micro-tools built by individual employees (Cursor, Claude, GPT wrappers) with no central visibility or security controls",
        "frequency": 0.25,
        "severity": "high",
        "exampleQuote": "\"we've got cursor, we've got cloud coming. Everyone's developing their own sort of micro tools and applications in gpt\""
      },
      {
        "id": "pp-3",
        "statement": "Security controls disabled or misconfigured on existing auth infrastructure, leaving the platform exposed even before AI agents are added",
        "frequency": 0.125,
        "severity": "high",
        "exampleQuote": "\"Breached password detection disabled\""
      },
      {
        "id": "pp-4",
        "statement": "M2M authentication conflicts with security controls \u2014 existing Lambda or service-to-service flows may be flagged or throttled when security features are enabled",
        "frequency": 0.125,
        "severity": "moderate",
        "exampleQuote": "\"AWS Lambda M2M may trigger suspicious IP throttling\""
      },
      {
        "id": "pp-5",
        "statement": "Most AI investments are not reaching production or generating ROI \u2014 companies are stuck in pilots with unclear paths to governance-ready deployment",
        "frequency": 0.25,
        "severity": "high",
        "exampleQuote": "\"all the ones that are actually getting to production and producing Roi for these companies are basically in the governance and security space\""
      },
      {
        "id": "pp-6",
        "statement": "Partners (Zscaler, AWS) lack a joint reference architecture with Okta for AI agent identity, making it hard to bring a unified story to joint accounts",
        "frequency": 0.125,
        "severity": "moderate"
      }
    ],
    "goals": [
      {
        "statement": "Establish governance and policy guardrails for AI agents before incidents occur",
        "frequency": 0.25,
        "successMetric": "Documented AI agent inventory with defined access scopes and audit trail"
      },
      {
        "statement": "Identify joint GTM accounts where AI governance + zero-trust or AI + cloud identity create a combined value proposition",
        "frequency": 0.25,
        "successMetric": "Pipeline of co-sell accounts with shared opportunity plans"
      },
      {
        "statement": "Enable baseline security controls (breached password detection, attack protection) as a foundation before layering AI agent identity",
        "frequency": 0.125,
        "successMetric": "Attack protection enabled with no disruption to existing M2M flows"
      },
      {
        "statement": "Align internal teams on a coherent AI identity strategy before customer conversations require one",
        "frequency": 0.125,
        "successMetric": "Reference architecture shared with partner field teams"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents (workforce)",
        "relevance": "primary",
        "rationale": "Directly addresses the governance gap \u2014 companies need to know what AI agents exist, what they can access, and how to revoke them. This is the top-of-mind concern in partner and exploratory conversations.",
        "specificFeatures": [
          "AI agent identity lifecycle management",
          "Policy governance and access scoping for agents",
          "Audit trail for agent actions",
          "Universal Logout for AI Agents"
        ],
        "frequency": 0.25
      },
      {
        "product": "Okta ISPM (AI agent discovery)",
        "relevance": "primary",
        "rationale": "Shadow AI discovery is a prerequisite for governance. Companies that don't know what micro-tools and agents are running can't govern them. ISPM surfaces ungoverned AI identities.",
        "specificFeatures": [
          "Shadow AI discovery",
          "AI agent posture assessment",
          "Identity hygiene baseline"
        ],
        "frequency": 0.25
      },
      {
        "product": "Auth0 (CIAM)",
        "relevance": "secondary",
        "rationale": "Mentioned in partner sync as the Auth0 side of the AI agent story. Relevant for tech companies building customer-facing AI features that require user-delegated authorization.",
        "specificFeatures": [
          "M2M authentication",
          "Attack protection",
          "Breached password detection"
        ],
        "frequency": 0.25
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Microsoft (Entra)",
        "frequency": 0.25,
        "context": "Mentioned as an incumbent or alternative in the technology sector, particularly in enterprise accounts. No specific competitive details extracted from these transcripts.",
        "differentiators": [
          "Okta is vendor-neutral across cloud and non-Microsoft apps",
          "Okta AI agent governance spans all identity types, not just Microsoft workloads"
        ]
      },
      {
        "competitor": "Palo Alto Networks",
        "frequency": 0.125,
        "context": "Mentioned in the Zscaler partner sync as a competing partner alignment \u2014 Okta fields a choice between aligning with Palo Alto or Zscaler on AI security narratives.",
        "differentiators": [
          "Okta covers identity layer; Palo Alto covers network/endpoint \u2014 complementary, not competing on AI agent governance"
        ]
      },
      {
        "competitor": "Zitadel",
        "frequency": 0.125,
        "context": "FreightVerify was already using Zitadel as their main platform; Auth0 was an add-on for specific features. Indicates Auth0 sometimes enters as a point solution alongside an existing open-source IdP.",
        "differentiators": [
          "Auth0 attack protection and managed security features vs. self-managed open-source"
        ]
      },
      {
        "competitor": "Cloudflare",
        "frequency": 0.125,
        "context": "Mentioned in context of credential stuffing defense \u2014 customer was considering Cloudflare-level controls as an alternative to Auth0 attack protection.",
        "differentiators": [
          "Auth0 attack protection is identity-native and does not require DNS/proxy changes"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We're not ready for AI governance yet \u2014 we haven't defined our AI strategy",
        "frequency": 0.25,
        "counterPosition": "The companies that 'aren't there yet' are the ones with the largest exposure. AI agents are already running whether governance exists or not. Starting with discovery (ISPM) doesn't require a defined strategy \u2014 it reveals what you already have.",
        "evidenceSupport": "\"we asked the question I'm like, well, like what are you guys doing for policy governance guardrails? And they're like, you know, we're not there yet\""
      },
      {
        "objection": "Our AI use case is in the real world / physical operations \u2014 AI agents acting on behalf of users doesn't apply to us",
        "frequency": 0.125,
        "counterPosition": "Even physical-world operations have backend AI agents making decisions, accessing APIs, and processing data. The identity question is about the agents themselves, not the output domain.",
        "evidenceSupport": "\"we would never do that [AI agents acting on behalf of users]. All our work is in the real world\""
      },
      {
        "objection": "Enabling security controls may break our existing M2M integrations",
        "frequency": 0.125,
        "counterPosition": "Auth0 allows whitelisting of known service IPs and M2M clients before enabling suspicious IP throttling. The conflict is resolvable without disabling security."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "How many AI agents or automated tools are currently running in your environment, and who authorized each one?",
        "callPhase": "opening",
        "rationale": "Opens the governance gap without assuming they have an answer. Most companies cannot answer this \u2014 which creates immediate urgency."
      },
      {
        "question": "When an AI agent does something unexpected or accesses data it shouldn't, what's your current process for detecting and stopping it?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the absence of detection and response capability for AI agent behavior."
      },
      {
        "question": "Can you produce an audit trail of what your AI agents accessed or acted on in the last 30 days?",
        "callPhase": "pain-exploration",
        "rationale": "Compliance-framed question that will almost universally surface a gap."
      },
      {
        "question": "How are individual teams provisioning AI tools \u2014 is there a central approval process, or is each team self-serve?",
        "callPhase": "pain-exploration",
        "rationale": "Uncovers shadow AI and ungoverned micro-tool proliferation."
      },
      {
        "question": "When a developer leaves or a project ends, how do you ensure the AI agents they created or configured are decommissioned?",
        "callPhase": "technical",
        "rationale": "Reveals lifecycle management gaps for non-human identities."
      },
      {
        "question": "Which of your AI initiatives are actually in production versus still in pilot? What's blocking the ones that are stuck?",
        "callPhase": "pain-exploration",
        "rationale": "Separates real buyers from explorers. Governance and security are the blockers for production-bound projects."
      },
      {
        "question": "Are your AI agents operating with static API keys or rotating credentials? Who rotates them?",
        "callPhase": "technical",
        "rationale": "Credential hygiene for non-human identities is almost always poor. Surfaces a concrete security gap."
      },
      {
        "question": "Who owns the decision on AI security tooling \u2014 is this CISO, CTO, or a platform engineering team?",
        "callPhase": "decision-process",
        "rationale": "Identifies the buying committee and whether a security or engineering motion is needed."
      },
      {
        "question": "If a board member or auditor asked you today what AI agents have access to in your environment, what would you tell them?",
        "callPhase": "opening",
        "rationale": "Executive-framed version of the governance gap question. Creates urgency with leaders who haven't mapped the risk."
      },
      {
        "question": "Are you working with any partners on AI infrastructure \u2014 AWS, Zscaler, Palo Alto \u2014 and how are you thinking about where identity fits in that stack?",
        "callPhase": "technical",
        "rationale": "Identifies partner-influenced deals and positions Okta as the identity layer in a multi-vendor AI security architecture."
      }
    ],
    "proofPoints": [
      {
        "metric": "44% of organizations have no AI agent governance in place",
        "source": "Okta AI survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "80% of organizations have experienced unintended AI agent behavior",
        "source": "Okta AI survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "88% report suspected or confirmed AI agent security incidents",
        "source": "Okta AI survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Only 22% of organizations treat AI agents as independent identities requiring governance",
        "source": "Okta AI survey, okta.com/ai, March 2026",
        "confidence": "soft"
      },
      {
        "metric": "Credential-based breaches take an average of 292 days to detect and contain",
        "source": "IBM/Ponemon Cost of a Data Breach Report 2024",
        "confidence": "hard"
      },
      {
        "metric": "23% of organizations report credential exposure via AI agents",
        "source": "Okta AI survey, okta.com/ai, March 2026",
        "confidence": "soft"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20139 months from first AI governance conversation to closed deal; many remain in exploration for 6+ months without a defined trigger to move",
      "typicalStages": [
        {
          "stage": "AI Awareness / Partner Alignment",
          "description": "Initial conversations triggered by partner events, executive mandates, or Okta-initiated outreach. Company has not defined their AI identity problem yet.",
          "typicalDuration": "1\u20134 weeks",
          "keyActivities": [
            "Partner sync to map joint accounts",
            "Share Okta AI reference architecture",
            "Qualify whether a defined AI project exists"
          ]
        },
        {
          "stage": "Discovery and Gap Surfacing",
          "description": "Okta SE or partner helps the customer map their current AI agent inventory and identify governance gaps. Often the first time the customer has done this exercise.",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "ISPM scan to discover AI agents",
            "Stakeholder mapping to find CISO + CTO alignment",
            "Document the governance gap in writing"
          ]
        },
        {
          "stage": "Business Case and Prioritization",
          "description": "Customer decides whether AI governance is a priority relative to other identity investments. Often competes with existing roadmap items.",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "Quantify exposure from ungoverned agents",
            "Map to compliance requirements (SOX, PCI, HIPAA)",
            "Present alongside existing renewal or upsell motion"
          ]
        },
        {
          "stage": "Technical Validation / POC",
          "description": "Customer validates that Okta for AI Agents can govern their specific agent types (internal tools, third-party SaaS agents, customer-facing AI features).",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "POC scoped to 2\u20133 AI agents",
            "Validate audit trail and revocation capabilities",
            "Confirm no disruption to existing workforce identity setup"
          ]
        }
      ],
      "commonBlockers": [
        "AI strategy not yet defined \u2014 no executive sponsor for AI governance",
        "Competing internal priority: existing identity debt or security projects get budget first",
        "Product is EA / pre-GA \u2014 customers hesitant to commit to a product without GA status or customer references",
        "Multi-stakeholder alignment required (CISO + CTO + platform engineering) but no single owner",
        "Partner complexity: account covered by multiple vendors (Zscaler, Palo Alto, AWS) with overlapping AI narratives"
      ],
      "accelerators": [
        "Board or regulatory ask to document AI agent access and activity",
        "A security incident or near-miss involving an AI agent or automated credential",
        "Existing Okta renewal creates a natural expansion conversation",
        "Partner co-sell with AWS or Zscaler who has existing AI project context",
        "CTO or CISO who has already been burned by ungoverned tooling proliferation"
      ]
    },
    "realQuotes": [
      {
        "quote": "where are your agents? Like, you know, what are they doing and what are you allowing them to do? Because it all comes down to governance",
        "context": "Okta ASD describing the question they're asking joint accounts during a partner sync with Zscaler",
        "speakerRole": "Area Sales Director (Okta)"
      },
      {
        "quote": "we asked the question I'm like, well, like what are you guys doing for policy governance guardrails? And they're like, you know, we're not there yet",
        "context": "Okta ASD describing a typical customer response when asked about AI agent governance",
        "speakerRole": "Area Sales Director (Okta)"
      },
      {
        "quote": "all the ones that are actually getting to production and producing Roi for these companies are basically in the governance and security space",
        "context": "Industry peer describing which AI projects are succeeding versus stalling, during an internal Okta AE interview",
        "speakerRole": "Prospective Enterprise AE (currently at [Tech Company])"
      },
      {
        "quote": "we've got cursor, we've got cloud coming. Everyone's developing their own sort of micro tools and applications in gpt",
        "context": "Describing the ungoverned proliferation of AI tools across enterprise teams",
        "speakerRole": "Prospective Enterprise AE (currently at [Tech Company])"
      },
      {
        "quote": "we would never do that [AI agents acting on behalf of users]. All our work is in the real world",
        "context": "[Tech Company] application security engineer pushing back on AI agent auth use case, believing their physical-world operations are exempt",
        "speakerRole": "Application Security Engineer ([Tech Company])"
      }
    ]
  },
  {
    "id": "financial-services-customer-facing-ai-agents",
    "industry": "financial-services",
    "useCase": "customer-facing-ai-agents",
    "transcriptCount": 5,
    "confidence": "medium",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (400K+ MAU or 1,000\u201310,000 employees); includes FinTech platforms, financial advisory software, and money transfer services",
      "aiMaturity": "Early to mid adoption \u2014 AI agents are on the roadmap or in early production; most are past the 'should we do AI' question and into 'how do we govern and secure it'",
      "triggerEvent": "Existing homegrown or legacy auth (SAML-based, Keycloak, Duende, or Microsoft Entra) cannot support AI agent login mechanisms, API-based auth, or dynamic RBAC \u2014 forcing a CIAM platform evaluation",
      "buyingMotion": "Technical-led evaluation initiated by CTO or Head of Engineering, typically triggered by a specific AI agent use case (chatbot, robo-advisor, or customer service AI) that exposes auth gaps; AE engaged after engineering signals readiness",
      "typicalBudgetHolder": "CTO (primary decision-maker); Engineering Lead as champion; CISO or Compliance as influencer when regulatory requirements surface"
    },
    "stakeholders": [
      {
        "role": "CTO",
        "frequency": 0.8,
        "whatTheyCareAbout": [
          "Least privilege access for AI agents \u2014 agents should have fewer rights than the user they impersonate",
          "Technical feasibility validation before committing to a platform",
          "Offloading identity complexity to focus engineering on core product",
          "Support for modern auth patterns (OAuth, token exchange, SCIM) that homegrown systems lack",
          "Data sovereignty and multi-tenant isolation for regulated customer data"
        ],
        "typicalQuestions": [
          "Can your platform handle server-side, SPA, AI agent, and mobile login from a single auth layer?",
          "How do we scope an AI agent's access to be narrower than the end user it acts on behalf of?",
          "What does a POC look like to validate technical feasibility before we commit?",
          "How do you handle multi-tenant data isolation when an AI agent queries across client accounts?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Head of Engineering / Engineering Lead",
        "frequency": 0.6,
        "whatTheyCareAbout": [
          "Practical integration path from existing homegrown or legacy systems",
          "SCIM and provisioning support for downstream applications",
          "Actions and extensibility for custom auth logic",
          "Timeline and migration complexity"
        ],
        "typicalQuestions": [
          "How do we migrate from our SAML-based app switcher without disrupting existing users?",
          "Can Auth0 Actions handle our custom token enrichment logic?",
          "What's the pattern for outbound SCIM from Auth0 to our data platform?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "Head of Quality Assurance / Compliance",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "RBAC governance and audit trails for AI agent actions",
          "Financial institution compliance requirements (PCI, SOX)",
          "Ensuring AI agent permissions are reviewable and certifiable"
        ],
        "typicalQuestions": [
          "How do we demonstrate to auditors which permissions an AI agent had at a given point in time?",
          "Can we enforce RBAC governance on AI agents the same way we do on human users?"
        ],
        "influenceLevel": "influencer"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Homegrown or legacy auth systems (SAML-based app switchers, Keycloak, Duende, Microsoft Entra cross-tenant sync) cannot support AI agent login mechanisms \u2014 they were built for human browser flows and break on API-native, mobile, and agent auth patterns",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "POC to ensure technical feasibility for server-side, SPA, AI agent, mobile app login mechanisms"
      },
      {
        "id": "pp-2",
        "statement": "No least-privilege model for AI agents \u2014 agents currently inherit full user permissions or operate with static API keys, creating over-privileged access to sensitive financial data",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "least privilege \u2014 agents should have fewer rights than the user they impersonate"
      },
      {
        "id": "pp-3",
        "statement": "RBAC governance for AI agents is absent or inconsistent \u2014 dynamic permission changes cannot be handled by current systems, and there is no audit trail for agent actions",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "We want to decouple authentication and authorization \u2014 the RBAC is too complex and too dynamic for static XML."
      },
      {
        "id": "pp-4",
        "statement": "Financial regulatory compliance (PCI, SOX, financial institution requirements) demands strict access control architecture, but current auth systems cannot produce the audit evidence required",
        "frequency": 0.6,
        "severity": "high",
        "exampleQuote": "financial institution compliance requirements"
      },
      {
        "id": "pp-5",
        "statement": "Multi-tenant data access control is not solved for AI agents \u2014 agents querying across client accounts risk data leakage without fine-grained, per-tenant isolation",
        "frequency": 0.4,
        "severity": "high",
        "exampleQuote": "multi-tenant data access control needed for AI agents (financial advisor use case)"
      },
      {
        "id": "pp-6",
        "statement": "Customer onboarding friction reduces conversion \u2014 checkout flows requiring full account creation before interaction create drop-off, and AI-assisted onboarding requires auth patterns current systems don't support",
        "frequency": 0.2,
        "severity": "moderate",
        "exampleQuote": "customer onboarding friction at checkout (name, email, zip before account)"
      },
      {
        "id": "pp-7",
        "statement": "Complex identity stacks (multiple IdPs, IGA systems, legacy SCIM gaps) create integration overhead when adding AI agent identity layers",
        "frequency": 0.4,
        "severity": "moderate",
        "exampleQuote": "This is not a standard identity problem."
      }
    ],
    "goals": [
      {
        "statement": "Establish least-privilege access controls for AI agents so agents can only access the specific data sets and operations their task requires, not the full permissions of the user they act on behalf of",
        "frequency": 0.6,
        "successMetric": "AI agent token scope is narrower than the delegating user's scope; no standing privileges for agents"
      },
      {
        "statement": "Support AI agent login mechanisms (OAuth token exchange, API-native auth, machine-to-machine) alongside existing human auth flows from a single platform",
        "frequency": 0.6,
        "successMetric": "Single auth platform handles server-side, SPA, mobile, and AI agent login without separate homegrown layers"
      },
      {
        "statement": "Implement human-in-the-loop approval gates for AI agents performing sensitive financial transactions",
        "frequency": 0.4,
        "successMetric": "High-value agent actions require explicit user confirmation before execution; audit log captures approval chain"
      },
      {
        "statement": "Offload identity engineering to a third-party platform to free internal teams to focus on core financial product development",
        "frequency": 0.4,
        "successMetric": "Reduction in identity-related engineering sprint allocation; faster feature delivery on core product"
      },
      {
        "statement": "Enable dynamic, self-service RBAC management for AI agents so permissions can be updated without code changes or manual intervention",
        "frequency": 0.4,
        "successMetric": "Permission changes propagate to AI agents within minutes via policy or GUI without engineering involvement"
      },
      {
        "statement": "Achieve CIAM modernization with social logins, magic links, and progressive account creation to reduce customer friction at onboarding",
        "frequency": 0.2,
        "successMetric": "Reduction in checkout drop-off rate; increase in account creation completion"
      }
    ],
    "productFit": [
      {
        "product": "Auth0 for AI Agents",
        "relevance": "primary",
        "rationale": "Directly addresses AI agent login mechanisms, token exchange, and least-privilege delegation \u2014 the core unsolved problem across 4 of 5 transcripts",
        "specificFeatures": [
          "Token exchange for delegated agent access",
          "Machine-to-machine (M2M) auth for agent-to-API calls",
          "Auth0 Actions for custom token enrichment and scope restriction",
          "Auth0 Token Vault for secure third-party API credential management",
          "CIBA (Client-Initiated Backchannel Authentication) for async human-in-the-loop approval"
        ],
        "frequency": 0.8
      },
      {
        "product": "Auth0 (CIAM platform)",
        "relevance": "primary",
        "rationale": "Foundation for replacing homegrown SAML-based auth with modern OAuth/OIDC, supporting social logins, magic links, Organizations (B2B), and Universal Login \u2014 present in migration and modernization conversations",
        "specificFeatures": [
          "Universal Login",
          "Auth0 Organizations for B2B multi-tenancy",
          "SCIM inbound/outbound provisioning",
          "Self-service SSO for enterprise customers",
          "Auth0 Actions for custom auth logic"
        ],
        "frequency": 0.8
      },
      {
        "product": "Cross-App Access (XAA)",
        "relevance": "secondary",
        "rationale": "Service-to-service authorization pattern needed when AI agents must call multiple backend APIs with scoped tokens \u2014 mentioned explicitly by eMoney and Intermex",
        "specificFeatures": [
          "Service-to-service token delegation",
          "Scoped cross-application access without over-privileged API keys"
        ],
        "frequency": 0.4
      },
      {
        "product": "Okta for Enterprise AI Governance (OIG)",
        "relevance": "secondary",
        "rationale": "Governance and access certification for AI agent identities is a stated need for compliance-driven financial services buyers; surfaces as a follow-up after initial CIAM discussion",
        "specificFeatures": [
          "AI agent identity lifecycle management",
          "Access certification campaigns for non-human identities",
          "Audit trail for agent permissions and actions"
        ],
        "frequency": 0.4
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "adjacent",
        "rationale": "Secure management of third-party API credentials used by AI agents \u2014 relevant when agents call external financial APIs with stored credentials",
        "specificFeatures": [
          "Encrypted credential storage for third-party API tokens",
          "Least-privilege token issuance to agents"
        ],
        "frequency": 0.2
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Homegrown / Custom-built auth",
        "frequency": 0.6,
        "context": "Most common incumbent \u2014 SAML-based app switchers, custom OAuth wrappers, or Django/Rails auth layers built 3\u20135 years ago. Teams describe them as 'robust and scalable' for human flows but unable to support AI agent patterns or modern mobile APIs.",
        "differentiators": [
          "Auth0 supports AI agent token exchange natively \u2014 homegrown systems require significant re-engineering",
          "Auth0 handles social logins, magic links, and passkeys without custom build",
          "Faster time-to-market vs. maintaining and extending homegrown identity"
        ]
      },
      {
        "competitor": "Microsoft Entra (formerly Azure AD B2C / cross-tenant sync)",
        "frequency": 0.2,
        "context": "Present in one enterprise deal (TWG / JP Morgan reference). Described as 'bulky' for cross-tenant sync and difficult to manage at scale. The buyer specifically cited a prior painful implementation.",
        "differentiators": [
          "Auth0 Organizations provides cleaner B2B multi-tenancy without cross-tenant sync overhead",
          "Standard SCIM in/out replaces Entra's proprietary sync patterns",
          "Auth0 decouples authentication from authorization \u2014 Entra bundles them, creating rigidity for dynamic RBAC"
        ]
      },
      {
        "competitor": "Open source / self-hosted (Keycloak, FusionAuth, Duende Identity Server)",
        "frequency": 0.4,
        "context": "Present in two deals \u2014 doxo evaluating Keycloak and FusionAuth; eMoney using Duende for external API token issuance. Buyers cite operational burden and feature gaps (AI agent patterns, managed infrastructure) as reasons to evaluate commercial alternatives.",
        "differentiators": [
          "Auth0 is managed \u2014 no infrastructure operations burden",
          "Auth0 supports AI agent auth patterns that open source solutions require custom extensions to support",
          "Auth0 compliance certifications (SOC 2, ISO 27001) reduce customer compliance overhead vs. self-hosted"
        ]
      },
      {
        "competitor": "Clerk / Stitch / Logtube",
        "frequency": 0.2,
        "context": "Mentioned in one competitive evaluation (doxo) alongside Keycloak and FusionAuth. Indicate a price-sensitive, developer-led buyer comparing modern auth-as-a-service options. Not present in enterprise or eMoney-tier deals.",
        "differentiators": [
          "Auth0 has enterprise-grade B2B (Organizations) and AI agent support that developer-focused tools lack",
          "Auth0 scales to 400K+ MAU with enterprise SLAs",
          "Auth0 for AI Agents is a differentiating capability not available in Clerk or Stitch"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We need a POC to validate technical feasibility before committing \u2014 we're not sure the platform can handle our specific auth patterns (AI agents, server-side, SPA, mobile)",
        "frequency": 0.6,
        "counterPosition": "A time-boxed POC is the right call. Define 3\u20135 specific scenarios (AI agent token exchange, mobile PKCE flow, SAML federation for existing enterprise customers) and run them in a dedicated POC tenant. Auth0 provides a structured POC framework with SE support. ComplySci achieved POC completion in 6 weeks with a Q2 production target.",
        "evidenceSupport": "ComplySci: POC proposed for early Q2, quote to be sent, 18-month contract with aggressive Q2 timeline"
      },
      {
        "objection": "Our homegrown system is robust and scalable \u2014 it works for our current users, so the switching cost may not be worth it",
        "frequency": 0.4,
        "counterPosition": "The robustness argument holds for today's human-browser flows. The question is what it costs to add AI agent auth, mobile-native flows, and social logins to a system that wasn't designed for them. Most teams estimate 6\u201312 months of engineering to extend homegrown systems for AI agent patterns \u2014 Auth0 ships that in weeks."
      },
      {
        "objection": "Auth0 has feature gaps that block our architecture \u2014 group sync not available, Organizations is flat (no parent-child hierarchy), Management APIs expose all users without per-org scoping",
        "frequency": 0.4,
        "counterPosition": "Be direct about current gaps. Auth0 inbound SCIM group sync is on the near-term roadmap. For parent-child org hierarchy, the current pattern uses nested Actions and custom claims \u2014 it works but requires implementation effort. Get a product roadmap call to confirm timelines and assess workarounds. Do not oversell what isn't shipped.",
        "evidenceSupport": "TWG: blocked on Auth0 group sync gap, Auth0 group sync planned for next quarter per SE"
      },
      {
        "objection": "We're evaluating multiple vendors and haven't committed to Auth0",
        "frequency": 0.4,
        "counterPosition": "Acknowledge the competitive eval and anchor on AI agent differentiation: ask each vendor to demonstrate native AI agent token exchange and least-privilege delegation in a live POC \u2014 not slides. Auth0 for AI Agents is in production; most alternatives require custom extensions. Use the POC to create a technical proof point no competitor can replicate from a pitch deck.",
        "evidenceSupport": "doxo: evaluating Stitch, Keycloak, Clerk, Logtube, FusionAuth"
      },
      {
        "objection": "Custom AI agents and client-facing agent use cases aren't prioritized yet \u2014 we're still in internal tooling phase",
        "frequency": 0.2,
        "counterPosition": "Start with the internal agents use case \u2014 it's lower risk and builds the governance foundation. The identity patterns for internal agents (least privilege, RBAC, audit trails) are identical to what customer-facing agents need. Getting the architecture right internally makes the customer-facing rollout faster and more defensible to compliance.",
        "evidenceSupport": "Intermex: focusing on developer tools now but custom internal and client-facing AI agents are under discussion"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "Walk me through how an AI agent in your environment authenticates today \u2014 what credentials does it use, and how do you scope what it can access?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the core gap: most financial services companies have no structured answer to this question, revealing that AI agents are operating with over-privileged static credentials or inheriting full user sessions"
      },
      {
        "question": "When an AI agent acts on behalf of a customer or financial advisor, how do you ensure it can only access the data that specific user is authorized to see \u2014 and nothing more?",
        "callPhase": "pain-exploration",
        "rationale": "Forces the least-privilege conversation specific to financial data, where cross-account data leakage carries regulatory consequences"
      },
      {
        "question": "If a high-value transaction is initiated by an AI agent \u2014 a wire transfer, a trade, a data export \u2014 how does a human approve or deny that action before it executes?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the human-in-the-loop conversation; financial services buyers almost universally need this pattern but many haven't implemented it yet"
      },
      {
        "question": "How is your current auth system handling API-native login for mobile apps and AI agents \u2014 is it the same system managing browser-based SSO, or something separate?",
        "callPhase": "technical",
        "rationale": "Uncovers the fragmented identity stack (SAML for browser, custom for mobile/API, nothing for agents) that is the most common trigger for this evaluation"
      },
      {
        "question": "If a regulator asked you to produce an audit trail of every action an AI agent took and every data set it accessed last quarter, how would you pull that today?",
        "callPhase": "pain-exploration",
        "rationale": "Creates urgency around governance gaps; financial services compliance teams need this answer and rarely have it"
      },
      {
        "question": "How many AI agents are currently operating in your environment \u2014 sanctioned and unsanctioned \u2014 and do you have a single inventory of what they can access?",
        "callPhase": "opening",
        "rationale": "Establishes scope and surfaces shadow AI risk; most companies undercount their AI agents significantly"
      },
      {
        "question": "What is the timeline pressure on your AI agent roadmap \u2014 and what happens to that timeline if you can't get the identity and access control layer right?",
        "callPhase": "decision-process",
        "rationale": "Connects identity to business urgency; financial services companies with competitive pressure on AI features have a clear cost-of-delay calculation"
      }
    ],
    "proofPoints": [
      {
        "metric": "POC to production in one quarter for financial services SaaS platform \u2014 AI agent auth, SAML federation, and CIAM modernization",
        "customer": "[Financial Services SaaS \u2014 compliance tech]",
        "source": "Transcript signal: ComplySci demo, March 2026 \u2014 POC proposed for early Q2, 18-month contract, aggressive Q2 production timeline",
        "confidence": "narrative"
      },
      {
        "metric": "Auth0 for AI Agents enables least-privilege token delegation (agent token scope narrower than delegating user) \u2014 native platform capability without custom engineering",
        "source": "Transcript signal: eMoney Advisor discovery, March 2026 \u2014 CTO requirement confirmed against Auth0 product discussion",
        "confidence": "narrative"
      },
      {
        "metric": "Replacing Entra cross-tenant sync with standard SCIM in Auth0 Organizations eliminates sync overhead for B2B financial platform serving multiple client organizations",
        "customer": "[Financial Services \u2014 B2B platform]",
        "source": "Transcript signal: TWG technical deep-dive, March 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3\u20136 months from first discovery to contract; technically-led evaluations compress to 6\u20138 weeks when a specific AI agent use case creates urgency",
      "typicalStages": [
        {
          "stage": "Technical Discovery",
          "description": "CTO or Head of Engineering describes current auth stack, identifies gaps blocking AI agent use case, and asks technical feasibility questions",
          "typicalDuration": "1\u20132 calls, 2\u20133 weeks",
          "keyActivities": [
            "Map current auth stack (homegrown, SAML, legacy IdP)",
            "Identify specific AI agent login pattern that is blocked",
            "Confirm OAuth / token exchange requirements",
            "Surface compliance and multi-tenant requirements"
          ]
        },
        {
          "stage": "POC / Technical Validation",
          "description": "Structured proof-of-concept to validate that Auth0 can handle the specific combination of AI agent auth, existing enterprise SAML federation, and any compliance-required isolation",
          "typicalDuration": "4\u20138 weeks",
          "keyActivities": [
            "Deploy POC tenant with SE support",
            "Test AI agent token exchange against production-like workloads",
            "Validate SCIM integration with downstream systems",
            "Test multi-tenant data isolation for financial advisor use cases"
          ]
        },
        {
          "stage": "Commercial Negotiation",
          "description": "AE drives pricing, contract structure, and timeline; CTO signs off on technical fit from POC",
          "typicalDuration": "2\u20134 weeks",
          "keyActivities": [
            "Quote and contract terms",
            "MAU / M2M token volume sizing",
            "Migration timeline and support model",
            "Legal and security review"
          ]
        },
        {
          "stage": "Migration Planning",
          "description": "Phased migration from homegrown or legacy auth to Auth0; existing users, enterprise SSO connections, and AI agents onboarded in phases",
          "typicalDuration": "1\u20133 months post-contract",
          "keyActivities": [
            "User migration strategy (bulk import vs. progressive)",
            "SAML federation for existing enterprise customers",
            "AI agent auth pattern implementation",
            "Parallel run and cutover"
          ]
        }
      ],
      "commonBlockers": [
        "Auth0 feature gaps (group sync not yet available, flat Organizations hierarchy) require workarounds or roadmap commitment",
        "Complex existing identity stacks (multiple IdPs, IGA systems, homegrown SCIM) make integration scoping difficult",
        "Financial regulatory review (PCI, SOX, FINRA) adds security review cycle time",
        "Competitive evaluation against open source (Keycloak, Duende) where engineering teams underestimate operational overhead",
        "AI agent use case not yet prioritized by business \u2014 identity team can't get budget without business sponsor"
      ],
      "accelerators": [
        "Specific AI agent use case already in production or on near-term roadmap creates urgency (chatbot, robo-advisor, customer service AI)",
        "Existing homegrown auth reaching a breaking point (new mobile app, new AI feature, compliance audit upcoming)",
        "Regulatory deadline or audit finding creates compliance-driven urgency",
        "Competitive pressure to ship AI features faster than engineering can build custom auth",
        "CTO who has experienced a prior painful identity build (homegrown or legacy IdP) and wants to avoid repeating it"
      ]
    },
    "realQuotes": [
      {
        "quote": "POC to ensure technical feasibility for server-side, SPA, AI agent, mobile app login mechanisms",
        "context": "CTO articulating POC scope before committing to Auth0 Enterprise Premium",
        "speakerRole": "CTO, [Financial Services SaaS \u2014 compliance tech]"
      },
      {
        "quote": "least privilege \u2014 agents should have fewer rights than the user they impersonate",
        "context": "CTO stating a non-negotiable requirement for AI agent access control in a financial advisor platform",
        "speakerRole": "CTO, [Financial Services \u2014 advisor platform]"
      },
      {
        "quote": "We want to decouple authentication and authorization \u2014 the RBAC is too complex and too dynamic for static XML.",
        "context": "Technical architect explaining why the current Entra-based system cannot support dynamic AI agent permission management",
        "speakerRole": "Technical architect, [Financial Services \u2014 B2B platform]"
      },
      {
        "quote": "This is not a standard identity problem.",
        "context": "Opening statement from technical team before explaining AI agent RBAC and parent-child organization hierarchy requirements",
        "speakerRole": "Technical architect, [Financial Services \u2014 B2B platform]"
      },
      {
        "quote": "infusing AI everywhere internally and interested in agentic AI for customer interaction on product roadmap",
        "context": "CTO describing their AI strategy during discovery \u2014 internal AI first, then customer-facing agents",
        "speakerRole": "CTO, [Financial Services \u2014 payments platform]"
      },
      {
        "quote": "We implemented this four years ago with B2C at JP Morgan \u2014 it was a nightmare to manage.",
        "context": "Technical architect referencing a prior Microsoft Entra cross-tenant sync implementation as evidence for wanting a cleaner Auth0 approach",
        "speakerRole": "Technical architect, [Financial Services \u2014 B2B platform]"
      },
      {
        "quote": "We're focusing on developer tools now but custom internal and client-facing AI agents are under discussion",
        "context": "Early-stage buyer signaling AI agent use cases are coming but not yet the primary buying trigger",
        "speakerRole": "Head of Quality Assurance, [Financial Services \u2014 money transfer]"
      }
    ]
  },
  {
    "id": "technology-ai-agent-ciam",
    "industry": "technology",
    "useCase": "ai-agent-ciam",
    "transcriptCount": 5,
    "confidence": "medium",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise SaaS (50\u20135,000 employees); existing Auth0 customers building AI-native products or MCP-based developer platforms",
      "aiMaturity": "Builders \u2014 actively shipping agentic features or MCP servers to their own customers; not evaluating AI in the abstract, already in production or near-production",
      "triggerEvent": "MCP adoption by downstream AI clients (Claude Code, ChatGPT, Cursor) causing unexpected tenant-level resource explosion, or internal initiative to expose APIs as MCP servers with proper authorization",
      "buyingMotion": "Expansion from existing Auth0 contract; driven by engineering team hitting platform limits; AE-led with SE/PM technical validation; low budget friction but high technical validation bar",
      "typicalBudgetHolder": "VP Engineering or SVP App Development; occasionally shared with Product Management for platform decisions"
    },
    "stakeholders": [
      {
        "role": "Software Engineer / Developer",
        "frequency": 0.6,
        "whatTheyCareAbout": [
          "How to technically implement MCP server authorization without breaking existing flows",
          "Manageable API surface \u2014 finding, filtering, and managing clients programmatically",
          "Not being blocked by platform limits (client count, FGA model count) mid-build",
          "Token scoping that doesn't require full user token forwarding"
        ],
        "typicalQuestions": [
          "How do we search or filter 72,000 clients in the Auth0 dashboard?",
          "Is there auto-cleanup for idle DCR clients?",
          "Can we rate-limit per client ID or per third-party app category?",
          "How does token exchange work when a new IDP connection is added?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "VP Engineering / SVP App Development",
        "frequency": 0.4,
        "whatTheyCareAbout": [
          "Agent identity as a first-class platform capability they can sell to their enterprise customers",
          "Multi-tenant authorization models that work across diverse customer configurations",
          "Scalability of the auth platform as agentic use cases multiply internally and externally",
          "Not building auth plumbing from scratch \u2014 Auth0 as the infrastructure layer"
        ],
        "typicalQuestions": [
          "Will your FGA model limit hold up as our enterprise customers build dozens of agentic use cases?",
          "Can Token Vault handle our multi-tenant deployment model?",
          "How do we give agents authorization to specific tools based on user context?",
          "What's the roadmap for MCP client management at scale?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Technical Program Manager",
        "frequency": 0.2,
        "whatTheyCareAbout": [
          "Operational manageability of the Auth0 tenant as client counts grow",
          "Clear roadmap commitments for features they're depending on (search, cleanup, rate limits)",
          "Renewal risk from unresolved platform gaps"
        ],
        "typicalQuestions": [
          "When will application search/filter ship?",
          "What's the timeline for CIMD support across major MCP clients like Claude Code?"
        ],
        "influenceLevel": "influencer"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "Dynamic client registration causes uncontrolled client explosion \u2014 tens of thousands of clients created by AI agents with no way to search, filter, or bulk-manage them in the Auth0 dashboard",
        "frequency": 0.8,
        "severity": "critical",
        "exampleQuote": "72,000 clients right now, most of which are Claude Code that are just noise. There's 700 pages worth of applications \u2014 there's no search in the UI."
      },
      {
        "id": "pp-2",
        "statement": "No native dashboard tooling for managing MCP clients at scale \u2014 the only path is paging through the Management API, which is not viable for operational teams",
        "frequency": 0.6,
        "severity": "critical",
        "exampleQuote": "The only way to query this data is to call the API and just page over the applications."
      },
      {
        "id": "pp-3",
        "statement": "Auth0 FGA model limits (20 per tenant) are insufficient for enterprise AI builder platforms where individual enterprise customers each need multiple authorization models for multiple agentic use cases",
        "frequency": 0.4,
        "severity": "high",
        "exampleQuote": "That 20 limit will easily get breached in an enterprise organization because of the number of agentic use cases that people are building inside."
      },
      {
        "id": "pp-4",
        "statement": "Agents run with over-privileged tokens \u2014 full user tokens are forwarded because proper downscoped token exchange is complex or Auth0 migration is incomplete",
        "frequency": 0.4,
        "severity": "high"
      },
      {
        "id": "pp-5",
        "statement": "New IDP connections don't automatically enable existing MCP applications, breaking token exchange flows silently for customers adding identity providers",
        "frequency": 0.2,
        "severity": "high"
      },
      {
        "id": "pp-6",
        "statement": "No rate limiting per client ID or per third-party app category, making it impossible to enforce usage policies across different AI client types",
        "frequency": 0.2,
        "severity": "moderate"
      },
      {
        "id": "pp-7",
        "statement": "Fine-grained authorization for data product access (e.g., geographic or occupational data packages) creates claim bloat \u2014 claims become too large to be practical",
        "frequency": 0.2,
        "severity": "moderate",
        "exampleQuote": "FGA is an appealing solution \u2014 it also is a little scary because how far do we need to go in terms of granularity?"
      }
    ],
    "goals": [
      {
        "statement": "Authorize MCP server tool calls with fine-grained, per-tool permissions tied to user or customer context",
        "frequency": 0.8,
        "successMetric": "AI agents only invoke tools they are explicitly authorized for; authorization decisions logged and auditable"
      },
      {
        "statement": "Manage dynamic client registration at scale \u2014 search, filter, group, and auto-clean idle clients from the Auth0 dashboard",
        "frequency": 0.6,
        "successMetric": "Operations team can find and manage any client without paging through the Management API"
      },
      {
        "statement": "Provide agent identity and authorization as a platform capability to enterprise customers \u2014 not just use it internally",
        "frequency": 0.4,
        "successMetric": "Enterprise customers can configure authorization models for their own agentic use cases without Auth0 expertise"
      },
      {
        "statement": "Issue downscoped tokens for agents so they access only the APIs and data required for a specific task, not the full user token",
        "frequency": 0.4,
        "successMetric": "No agent operates with permissions broader than the specific tool call requires"
      },
      {
        "statement": "Single gateway or relay checkpoint for all MCP server communications as the agent ecosystem scales",
        "frequency": 0.2,
        "successMetric": "All agent-to-server traffic passes through a single auditable control point"
      },
      {
        "statement": "Human-in-the-loop authorization for sensitive agent operations (e.g., payment changes, irreversible actions)",
        "frequency": 0.2,
        "successMetric": "Sensitive operations blocked until explicit human approval received"
      }
    ],
    "productFit": [
      {
        "product": "Auth0 Dynamic Client Registration (DCR) + CIMD",
        "relevance": "primary",
        "rationale": "Every MCP-building customer hits DCR immediately \u2014 it is the entry point for AI client authorization. CIMD is the roadmap answer to client explosion but adoption by AI clients (Claude Code) is a dependency outside Auth0's control.",
        "specificFeatures": [
          "Dynamic Client Registration for MCP clients",
          "Client ID Metadata Documents (CIMD) for client categorization",
          "Application search and filter (roadmap)",
          "Automated idle client cleanup (roadmap)",
          "Per-client-ID rate limits (roadmap)",
          "Application grouping and bulk management (roadmap)"
        ],
        "frequency": 0.8
      },
      {
        "product": "Auth0 FGA (Fine-Grained Authorization)",
        "relevance": "primary",
        "rationale": "Customers building data APIs or multi-tenant agent platforms need authorization at the tool, dataset, or resource level \u2014 coarse role-based access is insufficient. FGA is the right architecture but scalability limits are a real friction point.",
        "specificFeatures": [
          "Relationship-based authorization for tool-level permissions",
          "Multi-tenant authorization model separation",
          "Zanzibar-style tuple storage for user-resource-permission relationships"
        ],
        "frequency": 0.6
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "secondary",
        "rationale": "Mentioned as the answer to credential management for agents accessing external APIs and databases. Not yet the primary driver of conversations but surfaces when customers articulate over-privileged token problems.",
        "specificFeatures": [
          "Secure credential storage for third-party API tokens",
          "Token exchange for downscoped agent access",
          "Multi-tenant token isolation"
        ],
        "frequency": 0.4
      },
      {
        "product": "Auth0 Token Exchange / 'On Behalf Of'",
        "relevance": "secondary",
        "rationale": "Customers using full user token forwarding need a migration path to proper delegation. Token exchange is the mechanism but customers need documentation and the feature to be complete before they can adopt it.",
        "specificFeatures": [
          "OAuth 2.0 Token Exchange (RFC 8693)",
          "'On behalf of' delegation for agent-to-service calls",
          "Downscoped token issuance"
        ],
        "frequency": 0.4
      },
      {
        "product": "Auth0 Tenant ACL",
        "relevance": "adjacent",
        "rationale": "Surfaced as a mechanism for managing which third-party apps can access a tenant, but not a primary conversation driver.",
        "specificFeatures": [
          "Third-party application allow/deny controls",
          "Default permission sets for application categories"
        ],
        "frequency": 0.2
      }
    ],
    "competitiveContext": [
      {
        "competitor": "AI MCP Clients (Claude Code, Claude Desktop, ChatGPT, Cursor)",
        "frequency": 0.8,
        "context": "Not competitors in the traditional sense \u2014 these are the AI clients consuming Auth0-protected MCP servers. Their adoption patterns (especially Claude Code's aggressive DCR usage) are creating Auth0 tenant management crises for customers. The competitive angle is whether Auth0 can handle MCP-scale client proliferation or customers build custom authorization layers.",
        "differentiators": [
          "Auth0 is the only CIAM platform with a defined MCP server authorization story",
          "CIMD provides a standardized way to identify and categorize AI clients \u2014 no competing platform has this today",
          "FGA gives relationship-based authorization that static scopes cannot match"
        ]
      },
      {
        "competitor": "Build-your-own / custom authorization middleware",
        "frequency": 0.4,
        "context": "When Auth0 platform limits or missing features (search, cleanup, rate limits) become blockers, engineering teams evaluate building lightweight custom middleware instead of waiting for Auth0 roadmap. The risk is customers decoupling from Auth0 for AI workloads while keeping it for human auth.",
        "differentiators": [
          "Auth0 provides standards-compliant OAuth 2.0 / OIDC \u2014 custom builds drift from standards",
          "Auth0 handles the compliance and security posture \u2014 custom builds require customers to own this",
          "Auth0 roadmap items (search, CIMD) address the gaps without requiring custom infrastructure"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Auth0 FGA's 20-model limit per tenant is a hard ceiling that enterprise AI builder platforms will hit immediately",
        "frequency": 0.4,
        "counterPosition": "The 20-model limit applies to a specific tier; enterprise contracts have different limits. More importantly, well-designed FGA implementations use a small number of models with relationship tuples to express complex permissions \u2014 the limit rarely applies to correctly architected systems. Engage a solutions engineer to review the data model before accepting this as a blocker."
      },
      {
        "objection": "DCR client explosion is fundamentally unmanageable \u2014 the tooling doesn't exist to handle 72,000+ clients",
        "frequency": 0.6,
        "counterPosition": "This is a real and acknowledged gap. Auth0 roadmap includes application search/filter (before summer 2026), automated idle client cleanup, and CIMD-based categorization. CIMD shifts the problem: once AI clients adopt CIMD, Auth0 can group and manage by client type rather than individual client IDs. In the interim, the Management API allows programmatic bulk operations \u2014 not ideal, but functional.",
        "evidenceSupport": "Auth0 PM confirmed application search/filter shipping before summer 2026 and default permissions for third-party apps shipping May 2026."
      },
      {
        "objection": "Full Auth0 migration not complete \u2014 we can't use these features yet",
        "frequency": 0.2,
        "counterPosition": "Token exchange and MCP authorization features are available on current-generation Auth0 tenants. The migration unlocks additional capabilities but is not a prerequisite for starting. Identify which specific features require migration and sequence adoption accordingly."
      },
      {
        "objection": "Token Vault scalability is unclear for multi-tenant deployments \u2014 we need to verify before committing",
        "frequency": 0.2,
        "counterPosition": "Token Vault is designed for multi-tenant SaaS architectures. Request a technical deep-dive with the Auth0 solutions engineering team to validate the specific multi-tenant topology against Token Vault's isolation and scaling model before the next conversation."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "Are you already seeing AI clients \u2014 like Claude Code, Cursor, or ChatGPT \u2014 connecting to your Auth0 tenant through MCP? If so, how many clients have been registered?",
        "callPhase": "opening",
        "rationale": "Immediately surfaces whether DCR explosion has already started. If they answer yes with a large number, the conversation shifts to crisis management. If no, it sets the stage for why MCP authorization planning matters now."
      },
      {
        "question": "When an AI agent takes an action on behalf of a user, what token does it use today \u2014 a full user token, a service account, or something else?",
        "callPhase": "pain-exploration",
        "rationale": "Most teams don't realize they're forwarding full user tokens until asked directly. This surfaces the over-privileged agent problem and opens Token Vault and token exchange as solutions."
      },
      {
        "question": "How are you handling authorization for different tools within an MCP server today \u2014 are all tools equally accessible once a client is authenticated, or do you have per-tool permissions?",
        "callPhase": "pain-exploration",
        "rationale": "Exposes whether customers have thought through fine-grained tool authorization. Most haven't, making this a natural FGA entry point."
      },
      {
        "question": "Are you building this auth layer for your own agents, or will your enterprise customers also need to configure authorization models for their own agentic use cases?",
        "callPhase": "pain-exploration",
        "rationale": "Distinguishes internal-tooling use cases from platform plays. Platform builders have much higher FGA scalability requirements and a stronger Token Vault need."
      },
      {
        "question": "How many MCP servers are you running today, and how do you expect that to grow over the next 6-12 months?",
        "callPhase": "technical",
        "rationale": "Sets scale expectations and whether a single-tenant Auth0 approach is sufficient or whether they need multi-tenant architecture planning."
      },
      {
        "question": "Are there any agent actions in your system that should require explicit human approval before proceeding \u2014 payments, data exports, configuration changes?",
        "callPhase": "technical",
        "rationale": "Opens the human-in-the-loop conversation. Most teams haven't designed this yet and it's a differentiated Auth0 capability."
      },
      {
        "question": "What does your current Auth0 migration status look like \u2014 are you on the current-generation tenant or still mid-migration?",
        "callPhase": "decision-process",
        "rationale": "Migration status is a real adoption blocker. Knowing this upfront prevents proposing features the customer can't yet use and allows sequencing the engagement around what's available to them now."
      }
    ],
    "proofPoints": [
      {
        "metric": "Auth0 MCP server authorization is in production use by multiple existing Auth0 enterprise customers building developer platforms and data APIs",
        "source": "Direct from transcripts \u2014 Lightcast, Common Room, NISC are all existing Auth0 customers actively building on MCP authorization",
        "confidence": "narrative"
      },
      {
        "metric": "Application search/filter shipping before summer 2026; default permissions for third-party apps shipping May 2026",
        "source": "Auth0 Group Product Manager commitment in Common Room call, March 27 2026",
        "confidence": "soft"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "4-8 weeks from first technical call to expansion commitment; existing Auth0 customers with active MCP build can move faster (2-3 weeks) if blockers are resolved",
      "typicalStages": [
        {
          "stage": "Technical Discovery",
          "description": "Engineering team hits a specific MCP authorization problem (DCR explosion, token scoping, per-tool permissions) and reaches out to Auth0 AE or attends an Auth0 AI-focused event",
          "typicalDuration": "1-2 weeks",
          "keyActivities": [
            "Map current MCP architecture and identify specific authorization gaps",
            "Audit DCR client count and current management approach",
            "Identify whether FGA, Token Vault, or DCR management is the primary need",
            "Confirm Auth0 tenant migration status"
          ]
        },
        {
          "stage": "Technical Validation",
          "description": "SE-led deep-dive to validate Auth0 capabilities against the customer's specific architecture; often includes a free trial or sandbox environment",
          "typicalDuration": "1-2 weeks",
          "keyActivities": [
            "Prototype MCP server authorization with Auth0 DCR and CIMD",
            "Test FGA model design for fine-grained tool permissions",
            "Validate Token Vault multi-tenant isolation if platform play",
            "Confirm roadmap items (search, cleanup) will meet their timeline"
          ]
        },
        {
          "stage": "Roadmap Alignment",
          "description": "Customer needs features on roadmap before committing; PM involvement to confirm timelines and get early access where available",
          "typicalDuration": "1-3 weeks",
          "keyActivities": [
            "PM briefing on application search/filter and CIMD timelines",
            "Early access or beta enrollment for critical roadmap features",
            "Escalation path if roadmap items slip"
          ]
        },
        {
          "stage": "Expansion Commitment",
          "description": "Contract expansion to cover Auth0 for AI features (FGA, Token Vault) or consumption-based increase from agent traffic growth",
          "typicalDuration": "1-2 weeks",
          "keyActivities": [
            "Scope FGA model count and Token Vault tenant requirements",
            "Negotiate consumption terms for agent-driven token volume",
            "Document integration architecture for customer's engineering team"
          ]
        }
      ],
      "commonBlockers": [
        "Auth0 FGA model limit per tenant insufficient for enterprise platform builders \u2014 requires escalation to product or contract exception",
        "DCR client explosion creating operational crisis before roadmap features ship \u2014 customers may build custom workarounds",
        "Auth0 tenant migration incomplete, blocking access to current-generation MCP authorization features",
        "CIMD not yet supported by major AI clients (Claude Code) \u2014 removes the primary path to client categorization",
        "Token Vault multi-tenant scalability unverified \u2014 blocks platform builders until SE validates their specific topology"
      ],
      "accelerators": [
        "Customer already in active development and shipping to end users \u2014 urgency is real, not hypothetical",
        "Auth0 PM direct engagement on roadmap \u2014 converts timeline uncertainty into commitment",
        "Early access to application search/filter or CIMD beta \u2014 lets customer prove the solution before committing",
        "SE-led sandbox that replicates the customer's specific MCP server architecture",
        "Renewal timing pressure (Common Room pattern \u2014 renewal in May creates natural expansion conversation)"
      ]
    },
    "realQuotes": [
      {
        "quote": "We have 72,000 clients right now, most of which are Claude Code that are just noise.",
        "context": "Describing DCR client explosion caused by Claude Code connecting to their MCP server via dynamic client registration",
        "speakerRole": "Software Developer"
      },
      {
        "quote": "There's 700 pages worth of applications \u2014 there's no search in the UI.",
        "context": "Explaining why the Auth0 dashboard is operationally unusable for managing MCP clients at their scale",
        "speakerRole": "Software Developer"
      },
      {
        "quote": "The only way to query this data is to call the API and just page over the applications.",
        "context": "Workaround they're using to manage clients without dashboard search functionality",
        "speakerRole": "Software Developer"
      },
      {
        "quote": "FGA is an appealing solution \u2014 it also is a little scary because how far do we need to go in terms of granularity?",
        "context": "Evaluating Auth0 FGA for fine-grained authorization across geographic and occupational data packages; concerned about implementation complexity",
        "speakerRole": "SVP App Development"
      },
      {
        "quote": "The whole benefit of the MCP is the ease of connectivity.",
        "context": "Articulating why MCP adoption is accelerating and why auth friction is a business problem, not just a technical one",
        "speakerRole": "SVP App Development"
      },
      {
        "quote": "That 20 limit will easily get breached in an enterprise organization because of the number of agentic use cases that people are building inside.",
        "context": "Challenging Auth0 FGA's 20-model-per-tenant limit as insufficient for their enterprise AI builder platform where each customer deploys multiple authorization models",
        "speakerRole": "VP Engineering"
      }
    ]
  },
  {
    "id": "professional-services-customer-facing-ai-agents",
    "industry": "professional-services",
    "useCase": "customer-facing-ai-agents",
    "transcriptCount": 4,
    "confidence": "low",
    "profile": {
      "typicalCompanySize": "Mid-to-large enterprise (500\u201350,000+ employees); multi-tenant SaaS products serving hundreds to thousands of external clients",
      "aiMaturity": "Early-to-active: firms are actively POCing or building AI agent features into existing products; some have working prototypes, others are in anticipatory planning phase",
      "triggerEvent": "Product team building or expanding AI-powered capabilities (co-pilots, AI assistants, MCP-based agents) that need to call external APIs or access customer-specific data securely",
      "buyingMotion": "Expansion on existing Auth0 relationship or new CIAM evaluation; technical team drives evaluation, senior innovation or engineering leadership sponsors; POC-gated before commercial expansion",
      "typicalBudgetHolder": "SVP Engineering, Director of Engineering CIAM, or VP Innovation; existing Auth0 renewal owners who evaluate add-on capabilities"
    },
    "stakeholders": [
      {
        "role": "IT Architect / Principal Architect",
        "frequency": 0.75,
        "whatTheyCareAbout": [
          "Correct implementation patterns for MCP and token exchange",
          "Scalability of multi-tenant architectures (hundreds of tenants)",
          "Avoiding infrastructure management burden (self-hosting)",
          "Compliance requirements (FedRAMP, data residency)"
        ],
        "typicalQuestions": [
          "Are we implementing MCP the right way, or is there a better pattern we're missing?",
          "Can we support 200\u2013300 enterprise tenants without creating one application per tenant?",
          "What are the latency implications at deep relationship graph levels?",
          "How do we handle audience management when routing through an API gateway?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Director of Engineering / Engineering Lead",
        "frequency": 0.75,
        "whatTheyCareAbout": [
          "Scaling secure agent access across many tenants without proportional manual work",
          "Avoiding self-hosted infrastructure for authorization systems",
          "Integration complexity and developer experience",
          "Rate limiting and operational reliability at scale"
        ],
        "typicalQuestions": [
          "How do we scale MCP server setup to hundreds of enterprise tenants without it becoming a manual process?",
          "What does the migration path look like from OpenFGA self-hosted to Auth0 FGA?",
          "How does token vault pricing work as we scale connections?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Developer / Front-end Developer",
        "frequency": 0.5,
        "whatTheyCareAbout": [
          "Practical implementation of secure agent access patterns",
          "Eliminating workarounds like environment scraping or hard-coded credentials",
          "Clear SDK and API documentation for AI agent auth flows"
        ],
        "typicalQuestions": [
          "How do agents get authenticated access to production APIs instead of scraping QA environments?",
          "What is the correct token exchange pattern for first-party vs. third-party APIs?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Innovation / Product Leader (SVP, Director of UX)",
        "frequency": 0.5,
        "whatTheyCareAbout": [
          "Guardrails that prevent AI agents from taking unauthorized or legally risky actions",
          "Vendor and external user authentication that doesn't require accounts in their system",
          "Moving from ERP-adjacent services to standalone AI-powered product offerings"
        ],
        "typicalQuestions": [
          "What guardrails can we place on agents so they don't go off the rails \u2014 legally and from a security standpoint?",
          "How do we authenticate anonymous external vendors who click an email link without requiring them to create an account?"
        ],
        "influenceLevel": "champion"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "AI agents are accessing QA or dev environments via scraping because they lack authenticated, secure access to production APIs",
        "frequency": 0.25,
        "severity": "critical",
        "exampleQuote": "agents scraping content from QA/dev environments due to lack of secure authenticated access"
      },
      {
        "id": "pp-2",
        "statement": "No scalable approach to multi-tenant MCP setup \u2014 creating one application per tenant for hundreds of enterprise clients is impractical without automation",
        "frequency": 0.5,
        "severity": "critical",
        "exampleQuote": "We have like 2,500 tenants \u2014 I wasn't sure if that's a model where you have a limitation on the number of organization applications."
      },
      {
        "id": "pp-3",
        "statement": "No guardrails on AI agent behavior \u2014 legal and security risk from agents acting outside authorized scope",
        "frequency": 0.5,
        "severity": "critical",
        "exampleQuote": "What kind of guardrails can we place on these agents so they don't go off the rails \u2014 it's a combination of legal and security."
      },
      {
        "id": "pp-4",
        "statement": "Weak authentication for external users (vendors, anonymous clients) \u2014 email-code or password-based methods that don't scale or meet security standards",
        "frequency": 0.25,
        "severity": "high",
        "exampleQuote": "We send them an email, they click a link and they're authenticated \u2014 that would be ideal. And I want to know who they are and which account they're submitting to."
      },
      {
        "id": "pp-5",
        "statement": "Self-hosting open-source authorization infrastructure (OpenFGA, Kubernetes, databases) creates operational burden teams want to eliminate",
        "frequency": 0.25,
        "severity": "high",
        "exampleQuote": "OpenFGA requires self-hosting \u2014 managing Kubernetes, databases, sharding"
      },
      {
        "id": "pp-6",
        "statement": "Complex relationship-based authorization needs (folder/project/file hierarchies, per-tenant permissioning) not achievable with current RBAC or coarse-grained models",
        "frequency": 0.25,
        "severity": "high",
        "exampleQuote": "We've got a new product being developed and there's a lot of interest in moving to a more flexible authorization system."
      },
      {
        "id": "pp-7",
        "statement": "No secure token management for agents calling third-party APIs \u2014 credentials hard-coded or stored insecurely",
        "frequency": 0.5,
        "severity": "high"
      },
      {
        "id": "pp-8",
        "statement": "Scaling an existing security model (built on a single platform like ServiceNow) to a multi-platform, platform-agnostic architecture as the product expands",
        "frequency": 0.25,
        "severity": "moderate",
        "exampleQuote": "Existing ServiceNow-based security won't scale as standalone product"
      }
    ],
    "goals": [
      {
        "statement": "Implement secure, authenticated access for AI agents to internal and third-party APIs \u2014 eliminating environment scraping and hard-coded credentials",
        "frequency": 0.75,
        "successMetric": "Agents call production APIs with proper identity context; zero reliance on QA/dev environment workarounds"
      },
      {
        "statement": "Scale MCP server and agent auth infrastructure to hundreds of enterprise tenants without proportional manual configuration work",
        "frequency": 0.5,
        "successMetric": "200\u2013300 tenants onboarded to MCP without one-application-per-tenant bottleneck"
      },
      {
        "statement": "Establish human-in-the-loop controls (CIBA) for high-stakes agent actions requiring explicit user approval",
        "frequency": 0.5,
        "successMetric": "Agents require explicit human authorization before executing sensitive operations"
      },
      {
        "statement": "Implement fine-grained authorization for document and resource sharing within AI-powered products",
        "frequency": 0.25,
        "successMetric": "Document/folder/project permissioning enforced at the relationship level across all users and tenants"
      },
      {
        "statement": "Replace or augment existing platform-specific security (ServiceNow, OpenFGA self-hosted) with a managed, platform-agnostic identity layer",
        "frequency": 0.5,
        "successMetric": "Single auth platform securing agents and users across SAP, Oracle, Workday, and custom products"
      },
      {
        "statement": "Achieve compliance requirements (FedRAMP Moderate, data residency for EU/UK/AU) for AI-powered product offerings",
        "frequency": 0.25,
        "successMetric": "FedRAMP Moderate authorization achieved; data residency requirements met by target date"
      }
    ],
    "productFit": [
      {
        "product": "Auth0 for AI Agents (MCP Security / OAuth 2.1 for MCP)",
        "relevance": "primary",
        "rationale": "All four firms are building or evaluating MCP-based agent architectures. Providing identity context to MCP clients and protecting API access is the core technical need across the cohort.",
        "specificFeatures": [
          "Auth for MCP (OAuth 2.1 authorization for MCP servers)",
          "Token Exchange (first-party API delegation)",
          "Agent identity context propagation"
        ],
        "frequency": 1.0
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "primary",
        "rationale": "Three of four firms explicitly discussed Token Vault for managing third-party API credentials for agents. Eliminating hard-coded or insecure token storage is a top-ranked pain point.",
        "specificFeatures": [
          "Secure third-party API token storage for agents",
          "Token retrieval without exposing credentials to agent code",
          "Pricing tier for connection count (4 included on enterprise plan)"
        ],
        "frequency": 0.75
      },
      {
        "product": "Auth0 Fine-Grained Authorization (FGA)",
        "relevance": "primary",
        "rationale": "Thomson Reuters has an active POC starting. Rimini Street's multi-platform expansion and Guidepoint's multi-tenant setup both have latent FGA needs for resource-level permissioning.",
        "specificFeatures": [
          "Relationship-based authorization (ReBAC) for document/folder/project hierarchies",
          "Managed hosting \u2014 eliminates OpenFGA self-hosting burden",
          "Zanzibar-style tuple model for complex permission graphs"
        ],
        "frequency": 0.5
      },
      {
        "product": "Auth0 CIBA (Client-Initiated Backchannel Authentication)",
        "relevance": "primary",
        "rationale": "Human-in-the-loop approval for high-stakes agent actions is a stated goal in two calls. CIBA is the explicit mechanism discussed for requiring user consent before agents proceed.",
        "specificFeatures": [
          "Async user approval for agent-initiated sensitive actions",
          "Decoupled authorization without interrupting agent workflow",
          "Consent audit trail for compliance"
        ],
        "frequency": 0.5
      },
      {
        "product": "Auth0 Universal Login / Passwordless",
        "relevance": "secondary",
        "rationale": "Rimini Street needs passwordless authentication for anonymous external vendors (email magic link). Guidepoint's existing Auth0 deployment covers this layer already.",
        "specificFeatures": [
          "Magic link / email-code authentication",
          "Anonymous external user onboarding without pre-existing accounts",
          "Branded login experience per tenant"
        ],
        "frequency": 0.25
      },
      {
        "product": "Auth0 Organizations (multi-tenant)",
        "relevance": "secondary",
        "rationale": "Guidepoint's 2,500-tenant concern and Rimini Street's multi-client architecture both require per-tenant isolation. Multi-tenant scaling is a recurring structural constraint.",
        "specificFeatures": [
          "Organization-scoped applications",
          "Per-tenant branding and policies",
          "Scalable tenant provisioning via Management API"
        ],
        "frequency": 0.5
      }
    ],
    "competitiveContext": [
      {
        "competitor": "OpenFGA (open source, self-hosted)",
        "frequency": 0.25,
        "context": "Thomson Reuters was evaluating OpenFGA as the alternative to Auth0 FGA. They chose to POC Auth0 FGA specifically to avoid self-hosting Kubernetes and database infrastructure.",
        "differentiators": [
          "Managed hosting eliminates operational burden of Kubernetes/database management",
          "Same Zanzibar model as OpenFGA \u2014 no conceptual migration cost",
          "Auth0 support and SLA vs. community-only open source support"
        ]
      },
      {
        "competitor": "ServiceNow (incumbent security layer)",
        "frequency": 0.25,
        "context": "Rimini Street built initial AI agent security on ServiceNow because that is their core platform. As they expand to SAP, Oracle, and Workday, ServiceNow security does not extend platform-agnostically.",
        "differentiators": [
          "Platform-agnostic identity layer works across any ERP or SaaS product",
          "Purpose-built for CIAM and agent auth \u2014 not an ERP workflow tool repurposed for security",
          "Standards-based (OAuth 2.1, OpenID Connect) \u2014 not proprietary to a single vendor"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Creating one Auth0 application per enterprise tenant for MCP is not scalable for firms with hundreds or thousands of tenants",
        "frequency": 0.5,
        "counterPosition": "Auth0 Organizations combined with dynamic client registration and Management API automation allows tenant onboarding at scale without manual per-tenant application creation. The SE validated Guidepoint's directional approach and noted tweaks rather than a fundamental architecture change.",
        "evidenceSupport": "Validated in Guidepoint call: approach confirmed correct directionally by Okta SE"
      },
      {
        "objection": "No urgency driver \u2014 anticipatory planning without an active security incident creates slow-moving deals",
        "frequency": 0.25,
        "counterPosition": "Legal and compliance exposure from ungoverned agents is a forward-looking risk that product and legal teams are increasingly surfacing. Framing around proactive risk mitigation (agent guardrails, audit trail, consent flows) rather than incident response tends to resonate with innovation leaders.",
        "evidenceSupport": "Rimini Street framing: 'what guardrails can we place on these agents so they don't go off the rails \u2014 it's a combination of legal and security'"
      },
      {
        "objection": "FedRAMP compliance gap \u2014 Auth0 core platform FedRAMP authorization still in progress",
        "frequency": 0.25,
        "counterPosition": "Be transparent about current FedRAMP timeline. If the customer's deadline is firm, confirm whether FedRAMP Moderate will be achieved before their target date. Do not overcommit on roadmap timing.",
        "evidenceSupport": "Raised directly by Thomson Reuters; confirmed as valid gap in the call"
      },
      {
        "objection": "Data residency requirements for EU, UK, and Australia users add deployment complexity",
        "frequency": 0.25,
        "counterPosition": "Auth0 Private Cloud and regional deployment options address data residency requirements. Confirm specific residency needs and map to available deployment regions early in evaluation.",
        "evidenceSupport": "Thomson Reuters explicitly raised EU/UK/AU residency as a consideration"
      },
      {
        "objection": "API gateway integration complexity for audience management when agents route through a gateway",
        "frequency": 0.25,
        "counterPosition": "Token exchange allows agents to get appropriately scoped tokens for downstream APIs without requiring the gateway to manage audiences independently. Walkthrough of the token exchange flow addresses this concern in most POC contexts.",
        "evidenceSupport": "DDI call \u2014 raised as integration complexity objection"
      }
    ],
    "discoveryQuestions": [
      {
        "question": "Are your AI agents currently calling production APIs, or are they working against QA or dev environments because of auth limitations?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the environment-scraping anti-pattern seen in DDI. Firms often don't realize this is a security gap until asked directly."
      },
      {
        "question": "How many enterprise tenants need access to your AI agent or MCP server? How are you thinking about managing auth configuration at that scale?",
        "callPhase": "technical",
        "rationale": "Multi-tenant scaling is the most common architectural pain point in this cohort. Quantifying tenant count early sets up the Organizations + automation conversation."
      },
      {
        "question": "When an AI agent takes a high-stakes action on behalf of a user \u2014 like modifying a document, submitting to a client, or accessing sensitive data \u2014 how does the user know it happened, and can they stop it?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the CIBA / human-in-the-loop conversation without leading with product names. Framed around the legal and compliance concern Rimini Street articulated."
      },
      {
        "question": "How do your AI agents authenticate when calling third-party APIs \u2014 are those credentials stored in the agent code, in a secrets manager, or somewhere else?",
        "callPhase": "technical",
        "rationale": "Uncovers insecure credential storage patterns. Token Vault is the answer, but the question surfaces the pain first."
      },
      {
        "question": "If your AI product needs to enforce who can see which documents, projects, or data \u2014 how is that permissioning managed today, and how does it behave at scale across thousands of users?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the FGA conversation. Relationship-based authorization is a latent need in multi-tenant professional services platforms."
      },
      {
        "question": "Are any of your users or external vendors anonymous at the point they interact with your AI product \u2014 meaning they don't have accounts in your system yet?",
        "callPhase": "opening",
        "rationale": "Surfaces external vendor / passwordless auth needs as seen in Rimini Street. Relevant for professional services firms with broad external stakeholder networks."
      },
      {
        "question": "Do you have compliance requirements \u2014 FedRAMP, data residency, SOC 2 \u2014 that this AI product needs to meet, and what's the timeline?",
        "callPhase": "decision-process",
        "rationale": "FedRAMP and data residency gaps are active blockers. Surfacing early avoids late-stage surprises in the eval."
      },
      {
        "question": "Are you currently building on or evaluating any open-source authorization frameworks like OpenFGA or OPA for this use case?",
        "callPhase": "technical",
        "rationale": "Identifies the self-hosting burden and opens the managed-FGA displacement conversation. Competitive signal for Auth0 FGA vs. OpenFGA."
      }
    ],
    "proofPoints": [
      {
        "metric": "Existing Auth0 customer with $5M+ renewal and active FGA POC starting",
        "customer": "[Professional Services Firm]",
        "source": "Thomson Reuters transcript, Mar 27 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Active POC of Auth0 for AI (MCP auth and Token Vault) by existing Auth0 customer with 2,500 tenants",
        "customer": "[Professional Services Firm]",
        "source": "Guidepoint transcript, Mar 27 2026",
        "confidence": "narrative"
      },
      {
        "metric": "POC proposed and accepted for MCP server implementation with token exchange and token vault",
        "customer": "[Professional Services Firm]",
        "source": "DDI transcript, Mar 10 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "4\u201312 weeks from initial discovery to POC completion; existing Auth0 customers move faster (2\u20134 weeks to POC start) than net-new evaluations",
      "typicalStages": [
        {
          "stage": "Discovery / Intro Call",
          "description": "Map existing auth infrastructure, identify AI agent use cases in development, surface compliance requirements and scale constraints",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "Identify whether customer is building MCP clients, tools, or full agent orchestration",
            "Qualify tenant count and multi-tenancy architecture",
            "Surface compliance requirements (FedRAMP, data residency)",
            "Identify key technical stakeholder (architect, engineering lead) and business sponsor (SVP, innovation director)"
          ]
        },
        {
          "stage": "Technical Deep Dive",
          "description": "Validate Auth0 approach for the customer's specific architecture; walk through token exchange, MCP security, FGA model, or CIBA patterns as relevant",
          "typicalDuration": "1\u20132 weeks",
          "keyActivities": [
            "Review customer's current auth implementation against recommended patterns",
            "Clarify token exchange flow for first-party vs. third-party APIs",
            "Address multi-tenant scaling concerns (Organizations + Management API automation)",
            "Confirm FedRAMP / data residency fit or surface gap early"
          ]
        },
        {
          "stage": "POC",
          "description": "Customer implements Auth0 for AI capabilities against their own APIs or an agreed test environment; SE validates approach",
          "typicalDuration": "2\u20136 weeks",
          "keyActivities": [
            "POC scoped to MCP server auth, token vault integration, or FGA model",
            "SE validates implementation approach and addresses technical blockers",
            "Product and engineering team evaluates developer experience",
            "Identify automation path for multi-tenant onboarding if relevant"
          ]
        },
        {
          "stage": "Commercial Expansion / Renewal",
          "description": "Formalize add-on (FGA, Token Vault, AI Agents) on top of existing Auth0 commitment or negotiate new enterprise plan",
          "typicalDuration": "1\u20133 weeks",
          "keyActivities": [
            "Token Vault connection pricing confirmed against projected third-party API count",
            "FGA pricing confirmed against identity and check volume",
            "Involve senior sponsor (SVP Engineering, SVP Innovation) for final approval",
            "Legal and security review if FedRAMP or data residency requirements are active"
          ]
        }
      ],
      "commonBlockers": [
        "FedRAMP compliance gap \u2014 Auth0 core platform authorization still in progress; hard blocker for US federal or regulated customers",
        "Multi-tenant scale concern \u2014 architecture validation needed before engineering commits to implementation",
        "No active incident creating urgency \u2014 innovation-led purchases require business case framing to accelerate",
        "Senior sponsor (SVP Innovation, CTO) not yet engaged \u2014 deals stall at engineering level without executive alignment",
        "Data residency requirements for non-US regions (EU, UK, Australia) need deployment architecture confirmation"
      ],
      "accelerators": [
        "Existing Okta workforce or Auth0 CIAM relationship \u2014 trust already established, faster path to POC",
        "Active AI product roadmap with hard ship date \u2014 creates natural urgency for resolving auth infrastructure questions",
        "Engineering team already attempting DIY implementation (and hitting scaling or security limits) \u2014 pain is concrete and present",
        "Legal or compliance team flagging ungoverned agent risk \u2014 adds non-technical urgency to guardrails conversation"
      ]
    },
    "realQuotes": [
      {
        "quote": "Agents scraping content from QA/dev environments due to lack of secure authenticated access.",
        "context": "Developer describing current workaround \u2014 agents cannot access production APIs so they scrape lower environments instead",
        "speakerRole": "Developer"
      },
      {
        "quote": "What kind of guardrails can we place on these agents so they don't go off the rails \u2014 it's a combination of legal and security.",
        "context": "Innovation leader articulating the primary business risk driving the evaluation",
        "speakerRole": "Front-end Developer / AI Security"
      },
      {
        "quote": "We send them an email, they click a link and they're authenticated \u2014 that would be ideal. And I want to know who they are and which account they're submitting to.",
        "context": "Describing desired external vendor authentication flow for anonymous users interacting with AI product",
        "speakerRole": "Director of UX"
      },
      {
        "quote": "We have like 2,500 tenants \u2014 I wasn't sure if that's a model where you have a limitation on the number of organization applications.",
        "context": "SVP Engineering raising multi-tenant scaling concern before committing to MCP architecture",
        "speakerRole": "SVP Engineering"
      },
      {
        "quote": "My confusion was: are we doing it the right way? Is there a better way we don't know about? The call was good to understand \u2014 seems like we are doing it right directionally, there might be some tweaks.",
        "context": "Reflecting on the value of the technical validation call \u2014 confirms that architecture review is a high-value engagement motion even for existing customers",
        "speakerRole": "SVP Engineering"
      },
      {
        "quote": "Eventually there's going to be one product in every company, and underneath you might have multiple agents or permissions to those agents.",
        "context": "Principal Architect articulating the long-term product vision driving the FGA evaluation",
        "speakerRole": "Principal Architect"
      },
      {
        "quote": "We are the innovation group \u2014 for 20 years Rimini has been a service group for ERP systems, but now we've totally switched to innovation.",
        "context": "Setting organizational context \u2014 professional services firm transitioning from service delivery to product development, driving new identity requirements",
        "speakerRole": "Senior Director / Innovation Group"
      },
      {
        "quote": "We are already POCing Auth0 for AI, utilizing features like Auth for MCP and the upcoming token vault.",
        "context": "Confirming active implementation in progress \u2014 signals fast-moving existing customer",
        "speakerRole": "SVP Engineering"
      }
    ]
  },
  {
    "id": "healthcare-general-ai",
    "industry": "healthcare",
    "useCase": "general-ai",
    "transcriptCount": 3,
    "confidence": "low",
    "profile": {
      "typicalCompanySize": "Enterprise (1,000\u201350,000 employees); mix of digital health platforms, diagnostics, and healthcare payment/benefits companies",
      "aiMaturity": "Early exploration \u2014 AI use in production is narrow (OCR, data analysis, scheduling); agentic AI is aspirational or not yet planned for 2026",
      "triggerEvent": "Vendor outreach or existing account sync; no strong internal trigger for AI agent identity specifically \u2014 these calls were initiated by the sales team, not by a customer-driven need",
      "buyingMotion": "Land-and-expand on existing Okta relationship; no active buying motion for AI agent identity in any of these accounts",
      "typicalBudgetHolder": "CISO or Sr. Director of IT/Security; budget decisions require clear use case justification before any procurement conversation starts"
    },
    "stakeholders": [
      {
        "role": "CISO",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Knowing when AI agent tooling is genuinely necessary vs. premature",
          "Not duplicating tooling already covered by CyberArk or SaaS platform RBAC",
          "Security signoff readiness \u2014 pen tests, threat models, attestation"
        ],
        "typicalQuestions": [
          "If we use Okta for authentication and CyberArk for PAM, which one wins for AI agents?",
          "Our SaaS platforms already manage agent identity as just another user type \u2014 why add another tool?",
          "We don't think we're quite ready for a tool like this \u2014 what changes to make it relevant?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Senior Product Manager (AI/Connected Care)",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Understanding whether Auth0/Okta AI capabilities apply to their specific care delivery use case",
          "Future applicability in care-at-home or scheduling scenarios",
          "Differentiating inpatient (human-centric) from future agentic workflows"
        ],
        "typicalQuestions": [
          "Maybe not for our inpatient use case, but I can see for care at home where we do a lot of scheduling \u2014 does that fit?",
          "What specifically does CIBA enable that we can't do today?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Sr. Director of IT / Enterprise Architecture",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Successful go-live of identity migration as a proof point for broader adoption",
          "Security documentation and architectural signoff from Okta",
          "Accelerating development velocity \u2014 anything that reduces migration complexity"
        ],
        "typicalQuestions": [
          "If the first portal go-live fails it will put the entire enterprise Okta adoption at risk \u2014 can Okta give us a sign-off on go-live readiness?",
          "The AI side \u2014 anything that helps us migrate or accelerate development \u2014 what would that look like?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "Manager / Engineer, Security Analysis",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Practical tooling gaps \u2014 what CyberArk does not cover",
          "Real-time monitoring and session recording for AI agents",
          "Avoiding architecture complexity when simpler solutions exist"
        ],
        "typicalQuestions": [
          "CyberArk is more about monitoring what the agent is doing in real-time \u2014 alerts, session recording, lock it down. Does Okta do that too?",
          "SaaS platforms are managing agent identity as just another user type with RBAC \u2014 why overcomplicate the architecture?"
        ],
        "influenceLevel": "evaluator"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "SaaS platform agents (Salesforce, ServiceNow, Oracle) already have built-in RBAC and identity management \u2014 customers don't see a gap Okta fills for those agents",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "SaaS platforms are managing agent identity as just another user type with RBAC \u2014 why overcomplicate the architecture?"
      },
      {
        "id": "pp-2",
        "statement": "Current AI use cases in healthcare are non-agentic (OCR, data analysis, scheduling) \u2014 agents acting autonomously on behalf of users are not yet in scope",
        "frequency": 0.67,
        "severity": "high",
        "exampleQuote": "We don't think we're quite ready for a tool like this \u2014 our use cases are OCR and data analysis, not agentic"
      },
      {
        "id": "pp-3",
        "statement": "CyberArk already covers discovery, session recording, PAM, and real-time monitoring \u2014 customers with CyberArk see limited incremental value from Okta AI agent tooling",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "CyberArk already has discovery, session recording, real-time monitoring, PAM integration \u2014 if we use Okta for authentication and CyberArk for PAM, which one wins for AI agents?"
      },
      {
        "id": "pp-4",
        "statement": "Complex client migration with thousands of payers, providers, and B2C users \u2014 email not enforced for legacy users, MFA resistance from clients, branding contractual obligations",
        "frequency": 0.33,
        "severity": "critical",
        "exampleQuote": "If the first portal go-live fails it will put the entire enterprise Okta adoption at risk"
      },
      {
        "id": "pp-5",
        "statement": "Security incident awareness (e.g., Change Healthcare breach) is elevating security priority but has not yet translated into specific AI agent governance requirements",
        "frequency": 0.33,
        "severity": "moderate",
        "exampleQuote": "Change Healthcare was a wake-up call \u2014 security is now number one priority"
      }
    ],
    "goals": [
      {
        "statement": "Understand the AI agent identity market landscape and determine when Okta's product becomes relevant to their environment",
        "frequency": 0.67,
        "successMetric": "Clear decision criteria for when to re-engage on AI agent tooling"
      },
      {
        "statement": "Successful go-live of first identity migration as a proof point to unlock enterprise-wide Okta adoption",
        "frequency": 0.33,
        "successMetric": "First portal live with zero security incidents, architectural signoff from Okta"
      },
      {
        "statement": "Explore whether Auth0 or Okta AI capabilities can accelerate migration or development velocity",
        "frequency": 0.33,
        "successMetric": "Reduced migration timeline or developer hours spent on auth implementation"
      },
      {
        "statement": "Identify future-fit use cases (care-at-home scheduling, cross-platform agents) where AI agent identity becomes relevant",
        "frequency": 0.33,
        "successMetric": "Specific use case identified and scoped for future evaluation"
      }
    ],
    "productFit": [
      {
        "product": "Okta for AI Agents",
        "relevance": "adjacent",
        "rationale": "No customer in this cohort has an active agentic AI deployment. Relevance is future-dated \u2014 when custom agents that act on behalf of users become reality. Currently blocked by the SaaS-platform-RBAC objection and CyberArk coverage.",
        "specificFeatures": [
          "Agent identity lifecycle management",
          "Cross-platform agent governance (when agents operate outside a single SaaS vendor's RBAC)",
          "Universal Logout for AI Agents"
        ],
        "frequency": 0.67
      },
      {
        "product": "Auth0 for AI Agents (CIBA)",
        "relevance": "adjacent",
        "rationale": "Surfaced in care-at-home and scheduling use cases where human approval of agent actions is plausible. Not relevant for inpatient workflows where agents do not act on behalf of users.",
        "specificFeatures": [
          "CIBA (async human-in-the-loop approval)",
          "Delegated authorization for scheduling agents"
        ],
        "frequency": 0.33
      },
      {
        "product": "ISPM (Identity Security Posture Management)",
        "relevance": "secondary",
        "rationale": "Mentioned as a future capability for discovering shadow AI and ungoverned agent identities. Not in active evaluation in any of these accounts.",
        "specificFeatures": [
          "Shadow AI discovery",
          "AI agent posture assessment"
        ],
        "frequency": 0.67
      },
      {
        "product": "Okta SSO / MFA / Universal Directory",
        "relevance": "primary",
        "rationale": "Core existing product in use or being deployed. The foundational relationship that any AI agent identity conversation builds on. Migration complexity is the current focus, not AI.",
        "specificFeatures": [
          "Universal Directory for enterprise IDP consolidation",
          "MFA policy management across heterogeneous client base",
          "Universal Login with branding customization"
        ],
        "frequency": 0.67
      },
      {
        "product": "OIG (Okta Identity Governance)",
        "relevance": "secondary",
        "rationale": "Mentioned as a future addition for one customer. Not actively evaluated in this cohort but a natural expansion path.",
        "specificFeatures": [
          "Access certification for AI agent identities (future)"
        ],
        "frequency": 0.33
      }
    ],
    "competitiveContext": [
      {
        "competitor": "CyberArk",
        "frequency": 0.33,
        "context": "Actively evaluating CyberArk's AI agent product (free beta) in parallel with the Okta conversation. CyberArk positioned on real-time monitoring, session recording, PAM integration \u2014 capabilities customers see as directly relevant to AI agent security. Free beta lowers evaluation barrier significantly.",
        "differentiators": [
          "Okta owns the identity layer (authentication, lifecycle) \u2014 CyberArk owns the PAM/monitoring layer; the two are complementary if customers can articulate the division of responsibility",
          "Okta provides cross-platform agent governance beyond a single vendor's ecosystem; CyberArk is stronger at session-level real-time control",
          "Okta's strength is the identity fabric integration (IDP + IGA + PAM as unified governance); CyberArk requires a separate integration layer back to Okta"
        ]
      },
      {
        "competitor": "SailPoint",
        "frequency": 0.33,
        "context": "Mentioned in passing \u2014 not a primary competitive threat in these calls. Likely present in the customer's IGA evaluation landscape.",
        "differentiators": [
          "OIG is natively integrated with the Okta identity fabric \u2014 no connector tax",
          "SailPoint requires separate integration back to Okta for enforcement"
        ]
      },
      {
        "competitor": "SaaS Platform Native RBAC (Salesforce, ServiceNow, Oracle)",
        "frequency": 0.33,
        "context": "Not a named competitor but the most common objection surface \u2014 customers see SaaS-native agent identity management as sufficient for agents operating within a single platform. The Okta case only becomes clear when agents operate across platforms or when cross-vendor governance is required.",
        "differentiators": [
          "Okta provides governance across platforms \u2014 SaaS RBAC is siloed per vendor",
          "When an agent touches Salesforce, Oracle, and an internal API, SaaS RBAC cannot govern the full workflow",
          "Audit trail across platforms requires a neutral identity layer"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Our AI use cases are OCR and data analysis \u2014 we don't have agents acting on behalf of users, so this isn't relevant now",
        "frequency": 0.67,
        "counterPosition": "That's exactly the right time to establish governance architecture \u2014 before agents proliferate. The cost of retrofitting identity governance after agents are in production is significantly higher. Ask: when does your roadmap expect autonomous agents to appear, and who owns that security architecture decision?",
        "evidenceSupport": "Okta survey (March 2026): 44% of organizations have no AI agent governance in place; 80% experienced unintended agent behavior [MEDIUM \u2014 single source, survey methodology not published]"
      },
      {
        "objection": "SaaS platform agents (Salesforce, ServiceNow, Oracle) already manage agent identity internally with RBAC \u2014 why add another tool?",
        "frequency": 0.33,
        "counterPosition": "SaaS RBAC governs agents within that vendor's ecosystem. The gap appears when agents operate across platforms \u2014 when a Salesforce agent triggers a ServiceNow workflow that calls an internal API, none of those RBAC systems can produce a unified audit trail or enforce cross-platform revocation."
      },
      {
        "objection": "CyberArk already handles discovery, session recording, real-time monitoring, and PAM integration for our AI agents",
        "frequency": 0.33,
        "counterPosition": "CyberArk is strong on session-level control and PAM \u2014 Okta is strong on identity lifecycle and cross-platform authentication. The question is not either/or: if the customer already uses Okta for authentication, the AI agent identity lifecycle (provisioning, certification, deprovisioning) sits naturally in Okta. CyberArk can monitor what the agent does; Okta governs what the agent is allowed to be."
      },
      {
        "objection": "Our current inpatient AI is human-centric \u2014 agents don't act on behalf of users, so CIBA doesn't apply",
        "frequency": 0.33,
        "counterPosition": "Agreed for inpatient. The near-term fit is care-at-home and scheduling workflows where an agent does act on a patient's behalf. Worth mapping which workflows on your 12-month roadmap will require delegated authorization \u2014 that's the scoping question."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "Which of your current AI use cases involve an agent taking an action on behalf of a user \u2014 not just processing data, but doing something in a system?",
        "callPhase": "opening",
        "rationale": "Separates non-agentic AI (OCR, analytics) from agentic workflows. The answer determines whether Okta AI agent tooling is relevant now or future-dated."
      },
      {
        "question": "When your AI agents call external APIs or SaaS platforms, how do they authenticate today \u2014 service accounts, static API keys, or something else?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces the authentication gap that SaaS RBAC does not solve. Static API keys are a security risk and an audit failure point."
      },
      {
        "question": "If an AI agent were compromised or started behaving unexpectedly, how long would it take your team to identify which systems it accessed and revoke its access across all of them?",
        "callPhase": "pain-exploration",
        "rationale": "Forces a concrete answer to the incident response gap. Cross-platform revocation is where SaaS RBAC and CyberArk alone have coverage gaps."
      },
      {
        "question": "You mentioned CyberArk for PAM \u2014 how do you currently split responsibility between CyberArk and Okta for non-human identities like service accounts?",
        "callPhase": "technical",
        "rationale": "Clarifies the existing architecture so Okta AI agent positioning can be placed in the gap rather than duplicating CyberArk coverage."
      },
      {
        "question": "What does your 12-18 month AI roadmap look like \u2014 are there workflows where agents will need to act on patient or user data autonomously?",
        "callPhase": "opening",
        "rationale": "Establishes whether the engagement is a future pipeline nurture or a near-term opportunity. Healthcare AI roadmaps are often 12-24 months behind other industries."
      },
      {
        "question": "Who owns the security architecture decision for AI agents in your organization \u2014 is that your CISO team, the team building the agents, or someone else?",
        "callPhase": "decision-process",
        "rationale": "AI agent governance in healthcare is often unowned. Identifying the decision-maker (or the absence of one) determines how to advance the conversation."
      },
      {
        "question": "After Change Healthcare, has your organization updated its security requirements for third-party integrations or automated workflows?",
        "callPhase": "pain-exploration",
        "rationale": "Change Healthcare was cited unprompted as a security wake-up call. It opens a door to governance and identity-centric security conversations without cold-pitching."
      }
    ],
    "proofPoints": [
      {
        "metric": "44% of organizations using AI agents have no AI agent governance in place",
        "source": "Okta survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      },
      {
        "metric": "80% of organizations using AI agents experienced unintended agent behavior",
        "source": "Okta survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      },
      {
        "metric": "88% of organizations report suspected or confirmed AI agent security incidents",
        "source": "Okta survey, March 2026 (okta.com/ai)",
        "confidence": "soft"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "12-24+ months to active evaluation; these are awareness and pipeline-seeding conversations, not active deals",
      "typicalStages": [
        {
          "stage": "Awareness",
          "description": "Customer learns that AI agent identity governance is a category. No active need articulated. Often an existing Okta customer receiving outbound outreach.",
          "typicalDuration": "1-2 calls",
          "keyActivities": [
            "Explain what agentic AI identity governance is and why it differs from SaaS RBAC",
            "Map customer's current AI use cases to agentic vs. non-agentic",
            "Establish future trigger conditions: when will they need this?"
          ]
        },
        {
          "stage": "Future-Fit Qualification",
          "description": "Customer has a roadmap item that will require agentic AI \u2014 care-at-home, cross-platform automation, custom agent development. Identity governance becomes a near-term requirement.",
          "typicalDuration": "2-4 months",
          "keyActivities": [
            "Map specific future workflows to Auth0 CIBA or Okta AI Agents capabilities",
            "Identify the team building the agents and connect Okta to their architecture review",
            "Position alongside CyberArk (complementary, not competing)"
          ]
        },
        {
          "stage": "Architecture Review",
          "description": "Customer actively designing AI agent architecture and evaluating identity approach. Okta positioned as the identity layer; CyberArk positioned as the PAM/monitoring layer.",
          "typicalDuration": "1-3 months",
          "keyActivities": [
            "Technical session with the agent development team",
            "POC scoped against a specific workflow",
            "Security documentation: threat model for AI agent identity"
          ]
        },
        {
          "stage": "Procurement",
          "description": "Active deal with budget identified. Healthcare procurement cycles are long \u2014 compliance and security review required.",
          "typicalDuration": "3-6 months",
          "keyActivities": [
            "Business case with CISO and budget holder",
            "Compliance and security questionnaire response",
            "Contract and procurement process"
          ]
        }
      ],
      "commonBlockers": [
        "No active agentic AI deployment \u2014 product is not yet relevant to current AI use cases",
        "CyberArk already in place for PAM \u2014 customer sees overlapping coverage without a clear division of responsibility",
        "SaaS platform RBAC satisfies agent identity needs for single-platform agents",
        "CISO/security team not ready to evaluate \u2014 no internal mandate or budget for AI agent governance",
        "Migration complexity consuming all IT bandwidth \u2014 no capacity for a new evaluation"
      ],
      "accelerators": [
        "Security incident (like Change Healthcare) elevates identity governance urgency",
        "New agentic AI project approved on roadmap that requires cross-platform access",
        "Existing Okta relationship provides a trust foundation \u2014 no new vendor evaluation required",
        "CyberArk positioning clarified (complementary) removes the either/or objection",
        "Free Auth0 trial already downloaded (Zelis) \u2014 low-friction entry point for exploration"
      ]
    },
    "realQuotes": [
      {
        "quote": "maybe not for our inpatient use case, but I can see for like care at home where we're a lot of scheduling",
        "context": "Senior PM at [Health System] discussing Auth0 CIBA applicability to their inpatient AI product",
        "speakerRole": "Senior Product Manager, InPatient Connected Care & AI"
      },
      {
        "quote": "we don't think we're quite ready for a tool like this \u2014 our use cases are OCR and data analysis, not agentic",
        "context": "CISO at [Healthcare Company] explaining why Okta AI Agents is premature for their environment",
        "speakerRole": "CISO"
      },
      {
        "quote": "SaaS platforms are managing agent identity as just another user type with RBAC \u2014 why overcomplicate the architecture?",
        "context": "Security team at [Healthcare Company] objecting to adding Okta AI Agents when SaaS-native RBAC exists",
        "speakerRole": "Manager, Security Analysis"
      },
      {
        "quote": "CyberArk is more about monitoring what the agent is doing in real-time \u2014 alerts, session recording, lock it down",
        "context": "[Healthcare Company] security team describing CyberArk's role and implicitly questioning Okta's differentiated position",
        "speakerRole": "Manager, Security Analysis"
      },
      {
        "quote": "if we use Okta for authentication and CyberArk for PAM, which one wins for AI agents?",
        "context": "[Healthcare Company] articulating the core positioning question between Okta and CyberArk for AI agent identity",
        "speakerRole": "CISO"
      },
      {
        "quote": "if the first portal go-live fails it will put the entire enterprise Okta adoption at risk",
        "context": "Sr. Director at [Health System] describing the stakes of the current identity migration before AI conversation arose",
        "speakerRole": "Sr. Director"
      },
      {
        "quote": "change healthcare was a wake-up call \u2014 security is now number one priority",
        "context": "[Health System] unprompted reference to Change Healthcare breach as context for why security requirements have intensified",
        "speakerRole": "Sr. Director"
      },
      {
        "quote": "the AI side \u2014 anything that helps us migrate or accelerate development \u2014 that's what we'd want to explore",
        "context": "[Health System] describing their AI interest as instrumentally focused on development acceleration, not AI agent governance",
        "speakerRole": "Sr. Director"
      }
    ]
  },
  {
    "id": "other-customer-facing-ai-agents",
    "industry": "other",
    "useCase": "customer-facing-ai-agents",
    "transcriptCount": 3,
    "confidence": "low",
    "profile": {
      "typicalCompanySize": "Large enterprise (franchisee networks, airlines, real estate platforms) \u2014 10,000+ end users, complex multi-tenant or multi-channel structures",
      "aiMaturity": "Early-to-mid: running AI initiatives (voicebots, chatbots, internal agents) but without unified identity strategy; auth often handled in-house or not at all for AI channels",
      "triggerEvent": "Existing AI deployment hits an authentication wall \u2014 either unauthenticated transactions create risk (contact center impersonation) or complex permission models can't be handled by current IdP",
      "buyingMotion": "Technical-led expansion from existing Auth0 customer relationship; not a net-new purchase \u2014 triggered by a specific capability gap (CIBA/SIVA, FGA, Token Vault) surfaced during architecture review",
      "typicalBudgetHolder": "IT Director or Technical Director; CTO-adjacent; budget tied to digital transformation or contact center modernization program"
    },
    "stakeholders": [
      {
        "role": "Software Architect / Enterprise Architect",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Per-agent identity (each agent instance needs its own ID, not a deployment-level credential)",
          "Workload identity standards (SPIFFE/SPIRE compatibility)",
          "Policy engine for AI agent governance",
          "How authorization complexity maps to a product \u2014 not just auth, but fine-grained authZ"
        ],
        "typicalQuestions": [
          "Does Auth0 support SPIFFE for per-container agent identity?",
          "How does FGA handle our franchisee permission model at scale?",
          "When is agents-as-first-class-identities GA?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "Contact Center Technical Lead",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Enabling authenticated transactions in voicebot/chatbot flows",
          "Channel-hopping UX (push notification to mobile app during voice call)",
          "High-precision identity verification to prevent impersonation",
          "CIBA/SIVA implementation path and cost"
        ],
        "typicalQuestions": [
          "How does SIVA work when the customer only has SMS MFA, not TOTP?",
          "What happens to the user experience when we hop from voice channel to app push?",
          "Is SIVA a separate add-on cost or included?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "IT Manager / Technical Director",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Migration path from current IdP or current Auth0 setup to private cloud",
          "Timeline for CIBA/SIVA activation post-migration",
          "Third-party token management for agents acting on behalf of customers"
        ],
        "typicalQuestions": [
          "After the private cloud migration, what's the activation path for SIVA?",
          "Can Token Vault handle third-party API credentials for our agents?",
          "What Professional Services scope is needed for the migration?"
        ],
        "influenceLevel": "decision-maker"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "AI channels (voicebots, chatbots) can only handle unauthenticated transactions \u2014 they can't verify who the customer is, so they can't execute sensitive operations like flight changes, name changes, or financial actions",
        "frequency": 0.33,
        "severity": "critical",
        "exampleQuote": "voicebots would love to do flight changes but can't do authenticated transactions today"
      },
      {
        "id": "pp-2",
        "statement": "Current identity verification for AI-assisted channels relies on data matching (name, DOB, record lookup), which is susceptible to impersonation \u2014 especially for high-stakes operations",
        "frequency": 0.33,
        "severity": "critical",
        "exampleQuote": "we need to verify identity with extremely high precision \u2014 especially for name changes where impersonation is a real risk"
      },
      {
        "id": "pp-3",
        "statement": "Existing IdP can't handle the authorization complexity required \u2014 fine-grained permissioning for franchisee/hierarchical models has to be built in-house because no IdP supports it out of the box",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "Our permissioning model is complex because we operate on a franchisee model"
      },
      {
        "id": "pp-4",
        "statement": "AI agents lack per-instance identity \u2014 deployments share a single credential rather than each agent container having its own workload identity, creating governance and traceability gaps",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "Decentralized identities - each agent needs its own ID, not just a deployment-level identity"
      },
      {
        "id": "pp-5",
        "statement": "Multiple parallel AI initiatives running without a unified AI strategy or shared identity infrastructure \u2014 token management, agent governance, and authZ solved differently per team",
        "frequency": 0.33,
        "severity": "moderate"
      }
    ],
    "goals": [
      {
        "statement": "Enable authenticated transactions through AI channels (voicebots, chatbots) using strong customer authentication (CIBA/SIVA) without degrading UX",
        "frequency": 0.33,
        "successMetric": "Percentage of contact center transactions completed via authenticated AI channel without agent escalation"
      },
      {
        "statement": "Implement per-agent identity (each AI agent instance has its own managed identity, not a shared deployment credential)",
        "frequency": 0.33,
        "successMetric": "Full audit trail of actions per agent instance; ability to revoke a single agent without disrupting others"
      },
      {
        "statement": "Secure token management for AI agents acting on behalf of customers \u2014 third-party API credentials vaulted and scoped per user delegation",
        "frequency": 0.67,
        "successMetric": "Zero static API keys embedded in agent code; all third-party tokens scoped to user session"
      },
      {
        "statement": "Fine-grained authorization that handles complex hierarchical or franchisee permission models without custom in-house builds",
        "frequency": 0.33,
        "successMetric": "Elimination of custom authZ code; policy managed centrally in FGA"
      },
      {
        "statement": "Unified policy engine governing what AI agents can and cannot do on behalf of users",
        "frequency": 0.33,
        "successMetric": "Policy coverage across all active AI agent deployments; no ungoverned agent actions"
      }
    ],
    "productFit": [
      {
        "product": "CIBA / SIVA (Client-Initiated Backchannel Authentication)",
        "relevance": "primary",
        "rationale": "Directly addresses the core pain: AI-assisted channels (voicebot, chatbot) cannot authenticate users. CIBA enables just-in-time authentication push to the user's mobile app at the moment of a sensitive transaction, without channel-hopping breaking the flow.",
        "specificFeatures": [
          "Backchannel authentication request from AI agent to Auth0",
          "Push notification to registered mobile authenticator",
          "Transaction-level authentication (not session-level)",
          "SMS fallback where TOTP adoption is low"
        ],
        "frequency": 0.33
      },
      {
        "product": "Auth0 Token Vault",
        "relevance": "primary",
        "rationale": "Both substantive signals independently identified token management as a requirement \u2014 agents need to act on behalf of users against third-party APIs without embedding static credentials.",
        "specificFeatures": [
          "Per-user delegation of third-party API tokens",
          "Token scoping to user session",
          "Vault for third-party service credentials (not just Auth0 tokens)"
        ],
        "frequency": 0.67
      },
      {
        "product": "Auth0 FGA (Fine-Grained Authorization)",
        "relevance": "primary",
        "rationale": "Franchisee/hierarchical permission models are too complex for role-based access. FGA (Zanzibar-model) allows relationship-based authorization policies that scale to multi-tenant enterprise structures.",
        "specificFeatures": [
          "Relationship-based access control (ReBAC)",
          "Hierarchical tenant/franchisee permission modeling",
          "Centralized policy management replacing custom in-house authZ"
        ],
        "frequency": 0.33
      },
      {
        "product": "Auth0 for AI Agents (Agents as First-Class Identities)",
        "relevance": "primary",
        "rationale": "Both substantive signals need AI agents to have managed identities \u2014 not shared deployment credentials. This is the foundational requirement for governance, audit, and revocation.",
        "specificFeatures": [
          "Per-agent-instance identity in Universal Directory",
          "Lifecycle management (provision, rotate, revoke per agent)",
          "Audit trail scoped to individual agent identity"
        ],
        "frequency": 0.67
      },
      {
        "product": "Auth0 Actions",
        "relevance": "secondary",
        "rationale": "Used for custom logic within authentication flows \u2014 relevant for implementing channel-hop UX and conditional authentication logic in contact center scenarios.",
        "specificFeatures": [
          "Custom authentication flow logic",
          "Conditional MFA triggers",
          "Integration hooks for contact center systems"
        ],
        "frequency": 0.33
      },
      {
        "product": "MCP Servers (Model Context Protocol)",
        "relevance": "adjacent",
        "rationale": "Mentioned in LATAM Airlines context as part of the AI agent architecture \u2014 relevant for securing tool invocations from AI agents against enterprise APIs.",
        "specificFeatures": [
          "OAuth 2.1-secured MCP tool invocations",
          "Token-based access to enterprise tools via AI agent"
        ],
        "frequency": 0.33
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Ping Identity",
        "frequency": 0.33,
        "context": "Incumbent IdP at one account; recently renewed contract means no active displacement opportunity in the near term. Customer acknowledged limitations (can't handle authZ complexity) but is locked in for the renewal period.",
        "differentiators": [
          "Auth0 FGA handles relationship-based authZ that Ping cannot \u2014 customer built in-house to compensate",
          "Auth0 native AI agent identity features not available in Ping",
          "Auth0 CIBA/SIVA as a managed service vs. custom Ping implementation"
        ]
      },
      {
        "competitor": "Google Zanzibar / Gemini Enterprise",
        "frequency": 0.33,
        "context": "Referenced as a model for fine-grained authorization (Zanzibar is the academic/technical reference behind Google's authZ system). Customer was aware of the concept and using it to evaluate Auth0 FGA's approach.",
        "differentiators": [
          "Auth0 FGA is a managed, product-grade implementation of the Zanzibar model \u2014 no self-hosting required",
          "Integrated with Auth0 identity lifecycle vs. standalone authZ service"
        ]
      }
    ],
    "objections": [
      {
        "objection": "Core AI agent identity features (agents as first-class identities) are not yet GA \u2014 hard to build a business case or get leadership buy-in on roadmap items",
        "frequency": 0.33,
        "counterPosition": "SIVA/CIBA and Token Vault are available today and solve immediate pain. Agents-as-first-class-identities earns the conversation and gives a path forward \u2014 GA target is April 30, 2026. Start with what's available now.",
        "evidenceSupport": "LATAM Airlines was prioritizing SIVA as the immediate workstream \u2014 not waiting for full agent identity GA"
      },
      {
        "objection": "SPIFFE workload identity standard for per-container AI agents is not supported \u2014 architecture team requires standards-compliant workload identity",
        "frequency": 0.33,
        "counterPosition": "Auth0 agent identity provides per-instance managed identity with lifecycle and revocation. SPIFFE federation is on the roadmap. For most enterprise use cases, OAuth-based workload identity with per-agent client credentials achieves the same governance outcome without requiring SPIFFE."
      },
      {
        "objection": "SIVA pricing unclear \u2014 may be a separate add-on cost that complicates the business case",
        "frequency": 0.33,
        "counterPosition": "Escalate to AE for accurate pricing; position SIVA value against cost of current workaround (agent escalation, manual verification, impersonation risk exposure)."
      },
      {
        "objection": "Currently under a recently renewed contract with incumbent IdP (Ping) \u2014 not in an active buying cycle",
        "frequency": 0.33,
        "counterPosition": "Use this window to build the architecture case and get leadership aligned. Request for slide deck signals intent to position internally. Future renewal conversation starts now.",
        "evidenceSupport": "Customer explicitly requested a slide deck to present to leadership \u2014 the relationship and evaluation are active even if the purchase is not"
      },
      {
        "objection": "Low TOTP adoption (~50%) in customer base \u2014 CIBA push authentication requires the customer to have a registered authenticator app, limiting addressable population",
        "frequency": 0.33,
        "counterPosition": "CIBA supports SMS as a fallback channel for customers without authenticator apps. Prioritize TOTP enrollment as a parallel initiative \u2014 frame it as enabling more AI self-service capabilities."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "What transactions are your AI channels (voicebots, chatbots) handling today, and where does the flow break down because you can't verify identity?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the authenticated transaction gap \u2014 surfaces the specific high-value actions currently blocked by lack of strong customer auth in AI channels"
      },
      {
        "question": "When a customer calls in and your AI needs to perform a sensitive operation, how do you verify who they are right now \u2014 and how often does that verification fail or get escalated to a human agent?",
        "callPhase": "pain-exploration",
        "rationale": "Quantifies the impersonation risk and escalation cost \u2014 grounds the CIBA/SIVA business case in operational reality"
      },
      {
        "question": "How are your AI agents credentialed today \u2014 do individual agent instances have their own identity, or do they share service accounts or API keys?",
        "callPhase": "technical",
        "rationale": "Exposes the per-agent identity gap; creates the opening for agents-as-first-class-identities conversation"
      },
      {
        "question": "When your AI agents act on behalf of a customer \u2014 calling a third-party API, accessing a reservation system, submitting a transaction \u2014 whose credentials do they use?",
        "callPhase": "technical",
        "rationale": "Surfaces the token management problem; creates the Token Vault conversation"
      },
      {
        "question": "Do you have a central place where you can see all the AI agents running in your environment, what they have access to, and revoke one if something goes wrong?",
        "callPhase": "pain-exploration",
        "rationale": "Surfaces governance gap \u2014 most companies cannot answer yes; creates urgency around centralized AI agent identity management"
      },
      {
        "question": "Who in your organization owns the AI agent identity question \u2014 is it the security team, the architecture team, the AI product team, or is it currently ungoverned?",
        "callPhase": "decision-process",
        "rationale": "Maps the internal champion and buying motion; AI agent identity often falls between teams, creating a political opening"
      },
      {
        "question": "What does your authorization model look like for AI agents \u2014 can your current IdP express the rules for what an agent is and isn't allowed to do on behalf of a specific user?",
        "callPhase": "technical",
        "rationale": "Opens the FGA conversation for complex permission models; most IdPs only support coarse-grained RBAC, not relationship-based authZ"
      }
    ],
    "proofPoints": [
      {
        "metric": "SIVA/CIBA identified as top post-migration priority by existing Auth0 enterprise customer planning contact center AI deployment",
        "source": "Transcript signal \u2014 LATAM Airlines call, Mar 17 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Franchisee-model enterprise built custom in-house authZ system because no IdP could handle permission complexity \u2014 Auth0 FGA positioned as the replacement",
        "source": "Transcript signal \u2014 Keller Williams call, Mar 18 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "6-18 months from first technical conversation to activation \u2014 gated by migration dependencies, contract timing with incumbent, and internal leadership alignment on AI strategy",
      "typicalStages": [
        {
          "stage": "Technical Discovery",
          "description": "Architecture team maps specific AI agent use cases against Auth0 capabilities; identifies gaps (SPIFFE, GA timing) and near-term wins (Token Vault, SIVA)",
          "typicalDuration": "1-2 calls over 2-4 weeks",
          "keyActivities": [
            "Map AI channel transaction types to CIBA/SIVA flow",
            "Assess current agent credentialing model",
            "Identify token management requirements for third-party APIs",
            "Review FGA fit for authZ complexity"
          ]
        },
        {
          "stage": "Internal Alignment",
          "description": "Technical champion builds internal case for leadership; typically requires a deck or brief positioning AI agent identity as a strategic priority",
          "typicalDuration": "4-8 weeks",
          "keyActivities": [
            "Produce architecture overview or slide deck for leadership",
            "Align AI product team, security team, and IT on shared identity strategy",
            "Identify budget owner and budget cycle"
          ]
        },
        {
          "stage": "POC / Proof of Value",
          "description": "Validate CIBA/SIVA flow in sandbox or staging environment; demonstrate Token Vault with one third-party API; FGA policy modeling for one permission scenario",
          "typicalDuration": "4-8 weeks",
          "keyActivities": [
            "CIBA flow implementation in test environment",
            "Token Vault integration with one third-party service",
            "FGA policy model for a subset of the authZ complexity",
            "PS scoping for production migration"
          ]
        },
        {
          "stage": "Activation",
          "description": "Production deployment, often gated by a parallel migration (private cloud, IdP transition) completing first",
          "typicalDuration": "8-16 weeks",
          "keyActivities": [
            "Private cloud or IdP migration completion",
            "SIVA/CIBA activation in production contact center flows",
            "Agent identity onboarding for active AI deployments",
            "Token Vault rollout across agent fleet"
          ]
        }
      ],
      "commonBlockers": [
        "Incumbent IdP contract not yet expired \u2014 evaluation is active but purchase is deferred",
        "AI agent identity features not yet GA \u2014 creates uncertainty for architecture sign-off",
        "No single owner for AI agent identity across AI product, security, and IT teams",
        "Migration dependency \u2014 SIVA activation blocked until private cloud migration completes",
        "Low MFA app enrollment in customer base limits CIBA reach without SMS fallback"
      ],
      "accelerators": [
        "Existing Auth0 customer relationship \u2014 no net-new procurement process",
        "Specific high-value blocked transaction (e.g., flight changes via voicebot) creates urgency",
        "Leadership presentation request signals internal champion building a case",
        "Contact center cost or impersonation incident creates executive attention",
        "Competing AI initiative by another team creates urgency to standardize identity before sprawl"
      ]
    },
    "realQuotes": [
      {
        "quote": "Our permissioning model is complex because we operate on a franchisee model",
        "context": "Explaining why the company built a custom in-house authorization system rather than relying on their IdP",
        "speakerRole": "Software Architect / Enterprise Architect"
      },
      {
        "quote": "Decentralized identities \u2014 each agent needs its own ID, not just a deployment-level identity",
        "context": "Describing the requirement for per-agent-instance identity, referencing SPIFFE as the technical standard they expected",
        "speakerRole": "Software Architect / Enterprise Architect"
      },
      {
        "quote": "This solves a lot of in-house stuff that we do",
        "context": "Reacting positively to Auth0 FGA as a potential replacement for custom-built authorization logic",
        "speakerRole": "Software Architect / Enterprise Architect"
      },
      {
        "quote": "we need to verify identity with extremely high precision \u2014 especially for name changes where impersonation is a real risk",
        "context": "Explaining why unauthenticated AI channel transactions are unacceptable for sensitive operations like customer record modifications",
        "speakerRole": "Contact Center Technical Lead"
      },
      {
        "quote": "voicebots would love to do flight changes but can't do authenticated transactions today",
        "context": "Describing the gap between what AI channels could automate and what they're actually permitted to do due to lack of strong authentication",
        "speakerRole": "Contact Center Technical Lead"
      },
      {
        "quote": "SIVA is the immediate priority \u2014 enables contact center even without full agent deployment",
        "context": "Clarifying that CIBA/SIVA is a near-term workstream independent of the broader AI agent identity roadmap",
        "speakerRole": "IT Manager / Technical Director"
      }
    ]
  },
  {
    "id": "retail-ecommerce-customer-facing-ai-agents",
    "industry": "retail-ecommerce",
    "useCase": "customer-facing-ai-agents",
    "transcriptCount": 3,
    "confidence": "low",
    "profile": {
      "typicalCompanySize": "Mid-market to enterprise (consumer brands with large MAU bases, typically 100k+ registered customers and B2B2C complexity)",
      "aiMaturity": "Early-to-mid stage. Teams are standardizing on LLM providers (OpenAI, Codex) and beginning to ship agentic customer tools, but lack formal security strategy, agent governance, or authorization frameworks for autonomous actions.",
      "triggerEvent": "Imminent go-live of an AI-powered customer experience feature (shopping assistant, autonomous browsing/purchasing agent) OR post-migration contract expansion where agentic tooling surfaces as a phase 2 priority.",
      "buyingMotion": "Bottom-up from engineering (Engineering Manager, Senior Director Engineering, Architect) who hit a concrete security or authorization wall during implementation. Security/infosec team involvement required as a gate before any commitment.",
      "typicalBudgetHolder": "VP Engineering or IT Director, with infosec team as a required sign-off. AE or commercial AE drives contract expansion. AI budget line often does not yet exist \u2014 pricing uncertainty is a recurring friction point."
    },
    "stakeholders": [
      {
        "role": "Engineering Manager / Senior Director Software Engineering",
        "frequency": 1.0,
        "whatTheyCareAbout": [
          "Preventing AI agents from taking unauthorized actions on behalf of customers",
          "Defining clear permission boundaries at the tool and action level",
          "Avoiding multi-IdP complexity (managing Keycloak, Okta, and Auth0 in parallel)",
          "Getting the agent auth pattern right before shipping to production"
        ],
        "typicalQuestions": [
          "How do we restrict what an AI agent is allowed to do on a customer's behalf?",
          "How do we put controls around agent access to upstream systems like Slack, Jira, or our data repositories?",
          "How do we handle anonymous or guest users in an agentic flow?",
          "Can we manage token vault use cases similar to what Rocket Mortgage built?"
        ],
        "influenceLevel": "champion"
      },
      {
        "role": "Architect / Software Engineer",
        "frequency": 0.67,
        "whatTheyCareAbout": [
          "Avoiding disruption to existing identity architecture",
          "Decoupling authorization logic from application code",
          "Understanding how MCP layers interact with existing auth systems",
          "Practical implementation path for FGA or token vault"
        ],
        "typicalQuestions": [
          "FGA rules are already baked into our apps \u2014 how do we adopt this without a rewrite?",
          "How does the agent token vault work when the agent is operating autonomously?",
          "What does the implementation plan look like for our specific stack?"
        ],
        "influenceLevel": "evaluator"
      },
      {
        "role": "VP Engineering / IT Director",
        "frequency": 0.67,
        "whatTheyCareAbout": [
          "MAU forecasting accuracy for agentic workloads (agents may spike user counts)",
          "Contract flexibility as AI usage scales unpredictably",
          "Avoiding surprise overages post-launch",
          "Understanding Okta/Auth0 AI pricing model before committing to phase 2"
        ],
        "typicalQuestions": [
          "How do we forecast MAU growth when customer-facing AI agents could create non-human identity volumes we can't predict?",
          "What does AI agent pricing look like \u2014 is it per agent, per action, or per MAU?",
          "Can we start the contract later to avoid paying for capacity we're not using yet?"
        ],
        "influenceLevel": "decision-maker"
      },
      {
        "role": "Infosec / Security Team",
        "frequency": 0.33,
        "whatTheyCareAbout": [
          "Agent impersonation and user spoofing risk",
          "Overprivileged agents accessing sensitive customer data",
          "Formal security review before any AI agent capability goes to production"
        ],
        "typicalQuestions": [
          "What is the threat model for an AI agent acting on behalf of a customer?",
          "How do we detect if an agent has been compromised or is behaving anomalously?"
        ],
        "influenceLevel": "influencer"
      }
    ],
    "painPoints": [
      {
        "id": "pp-1",
        "statement": "No mechanism to restrict AI agent permissions at the tool or action level \u2014 agents can potentially take any action available to the user they represent, with no fine-grained scope enforcement.",
        "frequency": 0.67,
        "severity": "critical",
        "exampleQuote": "I need to integrate with insert upstream system Slack, Jira, some of our data repositories - how do we put controls around that?"
      },
      {
        "id": "pp-2",
        "statement": "Risk of user impersonation by AI agents \u2014 existing systems have been exploited where an agent or automated process could act as a different user than intended.",
        "frequency": 0.67,
        "severity": "critical",
        "exampleQuote": "We've been bit in the butt where a user is able to mock another user"
      },
      {
        "id": "pp-3",
        "statement": "No AI agent governance or inventory \u2014 teams do not have visibility into which agents are deployed, what data they can access, or who authorized them.",
        "frequency": 0.67,
        "severity": "high"
      },
      {
        "id": "pp-4",
        "statement": "MAU forecasting is broken for agentic workloads \u2014 customer-facing AI agents may create identity volumes that are impossible to predict, making license sizing and contract negotiation difficult.",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "concern about forecasting MAU growth due to future customer-facing agentic tools"
      },
      {
        "id": "pp-5",
        "statement": "Authorization logic baked into existing application code \u2014 adopting FGA or a centralized authorization layer requires decoupling from legacy app architecture, which is disruptive.",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "I don't think that's a boat we necessarily want to rock"
      },
      {
        "id": "pp-6",
        "statement": "Multi-IdP complexity \u2014 some organizations run Keycloak, Okta, and Auth0 in parallel for different use cases, creating fragmented identity management overhead.",
        "frequency": 0.33,
        "severity": "moderate"
      },
      {
        "id": "pp-7",
        "statement": "Fear of uncontrolled autonomous agent behavior \u2014 engineering and security teams express concern about agents taking actions outside their intended scope (e.g., opening firewall rules, unauthorized resource access).",
        "frequency": 0.33,
        "severity": "high",
        "exampleQuote": "I heard where the AI agent decided to open a hole in the firewall and start bitcoin mining - those things scare me a lot"
      },
      {
        "id": "pp-8",
        "statement": "No clear AI security strategy \u2014 teams recently assigned to AI projects are still assessing their approach and lack formal frameworks for securing agentic workloads.",
        "frequency": 0.33,
        "severity": "moderate"
      }
    ],
    "goals": [
      {
        "statement": "Enable AI agents to take actions on behalf of customers (browse, purchase, manage accounts) with enforced, scoped authorization \u2014 not open-ended access.",
        "frequency": 1.0,
        "successMetric": "Agents operate within defined permission boundaries with no unauthorized cross-user or cross-resource access incidents"
      },
      {
        "statement": "Human-in-the-loop oversight for high-stakes AI actions \u2014 customers can approve or reject sensitive agent actions before they execute.",
        "frequency": 0.67,
        "successMetric": "Sensitive actions (purchases above threshold, account changes) require explicit customer approval before execution"
      },
      {
        "statement": "Understand and adopt an agent token vault pattern to securely manage tokens for autonomous agent workflows calling upstream systems.",
        "frequency": 0.67,
        "successMetric": "Agents authenticate to third-party systems via short-lived, scoped tokens rather than static credentials or user session tokens"
      },
      {
        "statement": "Establish a scalable AI agent authorization approach before shipping customer-facing agentic features to production.",
        "frequency": 0.67,
        "successMetric": "Go-live with agentic customer tools without a security review blocker from infosec team"
      },
      {
        "statement": "Clarify AI pricing model and contract flexibility to accommodate unpredictable MAU growth from agentic workloads.",
        "frequency": 0.33,
        "successMetric": "Contract in place before go-live that does not create overage exposure from agent-driven identity volume"
      }
    ],
    "productFit": [
      {
        "product": "Auth0 for AI Agents / Agent Token Vault",
        "relevance": "primary",
        "rationale": "Directly addresses the core pain of securing autonomous agents acting on behalf of customers \u2014 scoped token issuance, third-party API token management, and agent identity lifecycle.",
        "specificFeatures": [
          "Agent token vault for managing third-party API tokens (Slack, Jira, data repositories)",
          "M2M tokens scoped to specific agent actions",
          "Token issuance for anonymous/guest user agent flows",
          "Agent identity lifecycle (creation, rotation, revocation)"
        ],
        "frequency": 0.67
      },
      {
        "product": "Fine-Grained Authorization (FGA)",
        "relevance": "primary",
        "rationale": "Enables tool-level and action-level permission enforcement for AI agents, and is gaining renewed relevance as teams rebuild authorization logic in the MCP layer rather than inside applications.",
        "specificFeatures": [
          "Permission model for agent tool access (which agent can call which tool)",
          "Resource-level authorization for RAG pipelines (document-level access control)",
          "MCP layer authorization without requiring application rewrites",
          "Relationship-based access control for B2B2C scenarios (corporate partner tenants)"
        ],
        "frequency": 0.67
      },
      {
        "product": "Auth0 Organizations",
        "relevance": "secondary",
        "rationale": "Relevant for retail companies with B2B2C complexity \u2014 enabling corporate partner tenants (e.g., clinic networks, enterprise accounts) to SSO into customer-facing portals while supporting agentic workflows per organization.",
        "specificFeatures": [
          "Per-organization SSO configuration",
          "SCIM provisioning for large corporate partner accounts",
          "Enterprise Connect for partners with their own IdPs"
        ],
        "frequency": 0.33
      },
      {
        "product": "Auth0 Attack Protection",
        "relevance": "secondary",
        "rationale": "A prerequisite for production go-live in at least one case \u2014 bot detection and brute force protection become more critical when AI agents interact with login and account management flows.",
        "specificFeatures": [
          "Bot detection",
          "Password leak detection",
          "Brute force protection"
        ],
        "frequency": 0.33
      },
      {
        "product": "Virtual MCPs",
        "relevance": "adjacent",
        "rationale": "Emerging interest in MCP-level authorization as teams rebuild agent tool layers \u2014 virtual MCPs provide a controlled abstraction over tool access without exposing raw APIs to agents.",
        "specificFeatures": [
          "Controlled tool exposure to AI agents via MCP",
          "Permission enforcement at the MCP layer"
        ],
        "frequency": 0.33
      }
    ],
    "competitiveContext": [
      {
        "competitor": "Keycloak",
        "frequency": 0.33,
        "context": "Used as an existing identity system in a multi-IdP architecture alongside Okta and Auth0. Customer expressed reluctance to consolidate ('I don't think that's a boat we necessarily want to rock') \u2014 Keycloak is entrenched for a specific use case and displacement is not the near-term path.",
        "differentiators": [
          "Auth0 Organizations handles B2B2C complexity that Keycloak requires custom development for",
          "FGA provides authorization capabilities Keycloak lacks natively",
          "Auth0 AI-native capabilities (token vault, virtual MCPs) have no Keycloak equivalent"
        ]
      },
      {
        "competitor": "OpenAI / Codex (as LLM infrastructure)",
        "frequency": 0.33,
        "context": "Customer is standardizing on OpenAI and Codex as their LLM layer, with other models (Claude, Gemini) blocked by firewall policy. Okta/Auth0 positioned as the identity and authorization layer on top of their chosen LLM stack \u2014 not a competitive displacement.",
        "differentiators": [
          "Auth0 is LLM-agnostic \u2014 works with OpenAI, Codex, or any model",
          "Auth0 provides the identity and authorization layer that LLM platforms do not offer natively"
        ]
      }
    ],
    "objections": [
      {
        "objection": "We need to get our infosec team involved before we can make any decisions \u2014 they weren't on this call.",
        "frequency": 0.33,
        "counterPosition": "This is expected and healthy. Offer to run a dedicated infosec-focused session with the security team covering the threat model for agentic AI, how Auth0 enforces agent scope boundaries, and how token vault eliminates standing credential exposure. The infosec gate is a qualifier, not a blocker \u2014 it confirms the deal has real internal momentum."
      },
      {
        "objection": "Our authorization logic is already baked into our applications \u2014 adopting FGA would require us to rip it out, and we're not ready for that.",
        "frequency": 0.33,
        "counterPosition": "FGA does not require a full application rewrite. The entry point is the MCP layer \u2014 teams rebuilding agent tool authorization can adopt FGA at the new layer without touching existing application code. Start with net-new agent workflows, not legacy app migration.",
        "evidenceSupport": "FGA is getting a second life because people are now rebuilding the MCP layer \u2014 this is the Okta SA framing from one call"
      },
      {
        "objection": "We don't know how to price or forecast AI agent usage \u2014 what happens if our agentic tools spike our MAU count in ways we can't predict?",
        "frequency": 0.33,
        "counterPosition": "Okta's approach treats AI agent auth as an extension of core API security with more straightforward pricing than competitors. Work with the AE to structure the contract with headroom and flexible start dates. For phase 2 agentic pricing, get a dedicated commercial discussion with product before the contract is signed.",
        "evidenceSupport": "Okta approach to securing agentic AI is extension of core API security \u2014 more straightforward pricing than other vendors (Okta SC, CustomInk call)"
      },
      {
        "objection": "We recently took over the AI team and are still assessing our strategy \u2014 we're not ready to commit to a direction yet.",
        "frequency": 0.33,
        "counterPosition": "Use the gap to get ahead of infosec requirements rather than waiting. A 3-4 week timeline to bring in the security team is a natural next step that builds internal consensus without requiring immediate commitment. Offer a proof-of-concept scoped to a single agent workflow."
      }
    ],
    "discoveryQuestions": [
      {
        "question": "What actions can your AI agents take on behalf of a customer today \u2014 and is there any enforcement preventing them from taking actions outside that intended scope?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the permission boundary gap. Most teams have not implemented tool-level or action-level restrictions and this question surfaces it quickly."
      },
      {
        "question": "If an AI agent is acting as a customer and calls one of your backend APIs \u2014 how does your system verify the agent is only allowed to access that specific customer's data and not others?",
        "callPhase": "pain-exploration",
        "rationale": "Gets at user impersonation and cross-customer data leakage risk \u2014 the pain that 1-800-Flowers had already experienced in production."
      },
      {
        "question": "How do your AI agents authenticate to third-party systems \u2014 Slack, your data repositories, payment processors? Are those credentials stored somewhere the agent can access them directly?",
        "callPhase": "technical",
        "rationale": "Surfaces credential exposure risk and opens the token vault conversation."
      },
      {
        "question": "When a customer wants to approve or reject a high-stakes action the AI agent is about to take \u2014 how does that approval flow work today?",
        "callPhase": "pain-exploration",
        "rationale": "Opens the human-in-the-loop / CIBA conversation. Most teams have not implemented this and it is a named goal."
      },
      {
        "question": "Do you have an inventory of every AI agent currently running in your environment \u2014 who authorized each one, what data it can access, and when that access was last reviewed?",
        "callPhase": "pain-exploration",
        "rationale": "Agent governance gap is present across all three accounts. This question typically produces a 'no' and anchors the governance conversation."
      },
      {
        "question": "When your AI go-live happens, how many non-human identities do you expect to be operating \u2014 and does your current contract cover that volume?",
        "callPhase": "decision-process",
        "rationale": "Commercial qualifier relevant to MAU forecasting risk. Surfaces the licensing conversation early before it becomes a surprise blocker at go-live."
      },
      {
        "question": "Is your security or infosec team involved in the AI agent rollout \u2014 and have they signed off on the authorization model you're planning to use?",
        "callPhase": "opening",
        "rationale": "Identifies the infosec gate early. If infosec is not involved, this question sets up the multi-stakeholder meeting that will be required before any deal closes."
      },
      {
        "question": "Where does your current authorization logic live \u2014 inside your application code, or in a separate policy layer? And how does that affect what your AI agents are allowed to do?",
        "callPhase": "technical",
        "rationale": "Identifies whether FGA adoption requires a migration conversation or whether the MCP layer is the clean entry point."
      }
    ],
    "proofPoints": [
      {
        "metric": "Agent token vault use cases modeled on Rocket Mortgage implementation \u2014 referenced by Chewy as a target architecture for autonomous agent workflows",
        "customer": "Rocket Mortgage (referenced, not the interviewed account)",
        "source": "Chewy discovery call transcript, Mar 23 2026",
        "confidence": "narrative"
      },
      {
        "metric": "Okta/Auth0 AI agent pricing described as 'more straightforward than other vendors' by Okta Solutions Consultant during CustomInk account sync",
        "source": "CustomInk account sync transcript, Mar 30 2026",
        "confidence": "narrative"
      }
    ],
    "dealProgression": {
      "typicalTimeline": "3-6 months from first AI discovery call to signed phase 2 contract for agentic features. Initial discovery moves quickly (3-4 weeks to infosec meeting), but security review and pricing negotiation for agentic workloads extend the cycle.",
      "typicalStages": [
        {
          "stage": "Engineering Discovery",
          "description": "Engineering Manager or Architect surfaces agent authorization pain during an existing account sync or Auth0 intro call. Okta SE/SA presents token vault and FGA framing. Technical fit is evaluated at the implementation level.",
          "typicalDuration": "1-2 weeks",
          "keyActivities": [
            "Map existing agent architecture and identify permission boundary gaps",
            "Demo agent token vault or FGA for the specific use case",
            "Identify which third-party systems agents need to access",
            "Establish whether FGA entry point is net-new MCP layer or existing app migration"
          ]
        },
        {
          "stage": "Infosec Gate",
          "description": "Security team reviews the threat model for agentic AI before the deal can progress. This is a mandatory internal gate, not an optional step. Deals that skip this gate tend to stall later.",
          "typicalDuration": "2-4 weeks",
          "keyActivities": [
            "Dedicated infosec session covering agent threat model",
            "Review of token vault security properties vs. static credentials",
            "Discussion of agent impersonation and user data isolation controls",
            "Infosec sign-off or list of requirements"
          ]
        },
        {
          "stage": "Commercial Negotiation (AI Pricing)",
          "description": "Pricing for agentic workloads requires separate commercial discussion. MAU forecasting for AI agents is a blocker \u2014 customers need to understand the pricing model before committing to a contract that covers agentic volume.",
          "typicalDuration": "2-4 weeks",
          "keyActivities": [
            "Define expected non-human identity volume at go-live and 12-month horizon",
            "Negotiate contract headroom for agentic MAU growth",
            "Structure start date and payment flexibility if go-live is imminent",
            "Align on phase 2 contract scope for agentic customer tools"
          ]
        },
        {
          "stage": "POC / Implementation Planning",
          "description": "Engineering team builds out a scoped proof-of-concept for the agent auth pattern. SA reviews implementation plan. This often runs in parallel with commercial negotiation for existing Auth0 customers.",
          "typicalDuration": "4-8 weeks",
          "keyActivities": [
            "SA reviews implementation plan submitted by engineering",
            "POC scoped to one agent workflow (e.g., autonomous shopping assistant accessing order history)",
            "Token vault integration with one upstream system",
            "FGA policy definition for the MCP layer"
          ]
        }
      ],
      "commonBlockers": [
        "Infosec team not engaged \u2014 deal cannot close without security review",
        "AI pricing model not resolved \u2014 customers won't commit to a contract with unpredictable agentic MAU exposure",
        "Authorization logic baked into existing applications \u2014 perceived migration effort delays FGA adoption",
        "AI strategy still being defined \u2014 new team leads assessing direction before committing to a platform",
        "Multi-IdP inertia \u2014 customers running Keycloak alongside Auth0 resist consolidation due to perceived disruption risk"
      ],
      "accelerators": [
        "Existing Auth0 customer with an imminent AI go-live \u2014 urgency is real and contract expansion is natural",
        "Concrete prior security incident (user impersonation, unauthorized data access) that the engineering team experienced firsthand",
        "Reference architecture from a comparable company (e.g., Rocket Mortgage token vault) that maps to their use case",
        "MCP layer rebuild underway \u2014 FGA adoption at the new layer requires no application migration",
        "Infosec team already involved and engaged \u2014 removes the largest single deal gate"
      ]
    },
    "realQuotes": [
      {
        "quote": "We've been bit in the butt where a user is able to mock another user",
        "context": "Engineering Manager at [Retail Company] describing a prior production security incident involving user impersonation \u2014 used to explain urgency around agent authorization controls",
        "speakerRole": "Engineering Manager"
      },
      {
        "quote": "I heard where the AI agent decided to open a hole in the firewall and start bitcoin mining - those things scare me a lot",
        "context": "Engineering Manager at [Retail Company] explaining why autonomous agent behavior without scope enforcement is a serious concern, even for customer-facing shopping use cases",
        "speakerRole": "Engineering Manager"
      },
      {
        "quote": "I don't think that's a boat we necessarily want to rock",
        "context": "Architect at [E-commerce Company] responding to a suggestion about consolidating multi-IdP architecture \u2014 expressing resistance to changing an existing Keycloak deployment even when it adds complexity",
        "speakerRole": "Architect"
      },
      {
        "quote": "FGA is getting a second life because people are now rebuilding the MCP layer",
        "context": "Okta Solutions Architect during a discovery call with [E-commerce Company], explaining why FGA adoption is now feasible as teams build new agent tool layers rather than trying to migrate existing application authorization",
        "speakerRole": "Okta Senior SA"
      },
      {
        "quote": "I need to integrate with insert upstream system Slack, Jira, some of our data repositories - how do we put controls around that?",
        "context": "Senior Director of Software Engineering at [E-commerce Company] articulating the core agent authorization problem \u2014 agents need access to multiple systems but there is no mechanism to enforce scoped, controlled access",
        "speakerRole": "Senior Director Software Engineering"
      },
      {
        "quote": "concern about forecasting MAU growth due to future customer-facing agentic tools",
        "context": "IT Director at [Retail Company] during a contract expansion discussion \u2014 expressing the commercial uncertainty created by not knowing how many non-human identities agentic tools will generate",
        "speakerRole": "IT Director"
      },
      {
        "quote": "Okta approach to securing agentic AI is extension of core API security - more straightforward pricing than other vendors",
        "context": "Okta Solutions Consultant framing Auth0 for AI positioning during a commercial discussion at [Retail Company] \u2014 used to address pricing uncertainty for agentic workloads",
        "speakerRole": "Okta Solutions Consultant"
      }
    ]
  }
];

// Lookup helpers

export function getArchetype(industry: string, useCase: string): CustomerArchetype | undefined {
  return ARCHETYPES.find(a => a.industry === industry && a.useCase === useCase);
}

export function getArchetypesByIndustry(industry: string): CustomerArchetype[] {
  return ARCHETYPES.filter(a => a.industry === industry);
}

export function getArchetypesByUseCase(useCase: string): CustomerArchetype[] {
  return ARCHETYPES.filter(a => a.useCase === useCase);
}

// Available filter options (derived from actual data)

export const AVAILABLE_INDUSTRIES: Industry[] = Array.from(new Set(ARCHETYPES.map(a => a.industry)));

export const AVAILABLE_USE_CASES: ArchetypeUseCase[] = Array.from(new Set(ARCHETYPES.map(a => a.useCase)));

export const TOTAL_TRANSCRIPTS = 743;
export const AI_TRANSCRIPTS = 306;
export const ARCHETYPE_TRANSCRIPTS = 279;
