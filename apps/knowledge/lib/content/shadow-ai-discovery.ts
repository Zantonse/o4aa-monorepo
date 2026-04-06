import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'shadow-ai-discovery',
  title: 'Discover & Register AI Agents',
  description:
    'From shadow AI to managed identity — how to discover unmanaged AI agents using ISPM, the SAM browser plugin, and osquery posture checks. Covers registration as Workload Principals, the On Behalf Of model, competitive landscape, real-world shadow AI statistics, and the discovery conversation playbook. Sources: Okta AI Agent Certification (2026), Okta ISPM/OIE docs, deep research synthesis (April 2026).',
  tags: ['operations', 'shadow-ai', 'workload-principal', 'discovery', 'managed-connections', 'OBO', 'ispm', 'sam-plugin', 'osquery', 'posture-checks', 'competitive'],
  icon: '🔍',
  hasDiagram: true,
  diagramPrompt:
    'Four-step governance flow diagram: Step 1 "Discover" (magnifying glass scanning a dark shadow agent) → Step 2 "Register" (agent receives a bright ID badge labeled wlp) → Step 3 "Assign Owner" (human figure linked to agent) → Step 4 "Scope Access" (narrow funnel filtering broad permissions into specific scopes). Bottom section shows the On Behalf Of model: Sarah (Sales) and Mike (Warehouse) sending the same question through the governed agent, with Sarah receiving pricing data and Mike receiving an access-denied message. Clean flat style, navy and amber palette, technical diagram aesthetic.',
  cards: [
    {
      heading: 'The Problem: Shadow AI and the Masked Visitor',
      paragraphs: [
        'Your organization is probably already using AI agents — tools that look up customer information, check inventory, summarize records, and draft responses. They work quietly in the background and they are genuinely useful. But here is the question most organizations cannot answer: when an AI agent does something with your data, do you actually know what happened? [Source: Okta AI Agent Certification, "Discover and Register AI Agents" module, 2026]',
        'Think of your company data as a secure office building with multiple floors: Sales, Inventory, Customers, and Pricing. When an AI agent accesses your data without governance, it is like a masked visitor walking into your building. A standard audit log might show someone entered Floor 3 at 2:34 PM, but you do not know who sent them, what they looked at, or how to stop them from coming back. This is "Shadow AI" — the certification course\'s term for AI agents operating without formal identity governance.',
        '!! To govern AI agents, the certification course defines five accountability questions every action must answer: (1) Who requested this access? Without an answer, you cannot trace a data access event to a specific person — you cannot respond to an incident or satisfy an auditor. (2) What AI system performed the action? If multiple agents share credentials, you cannot distinguish which one acted or hold anyone accountable. (3) When did it happen? Vague timestamps mean you cannot reconstruct a timeline during an investigation. (4) Why was access granted or denied? Without policy visibility, you cannot explain to a compliance team why an AI had access to sensitive data. (5) Can we stop it right now if we need to? Without an off switch, dealing with a compromised agent could take hours or longer.',
      ],
    },
    {
      heading: 'The Solution: Workload Principals',
      image: 'diagrams/four-phase-lifecycle.png',
      paragraphs: [
        'The governance solution is to assign AI agents a formal identity. In Okta, that identity is called a Workload Principal — a first-class identity in the agent registry alongside human users. Each Workload Principal receives a unique ID prefixed with wlp (e.g., wlp8x5q7mvH86KvFJ0g7), making agent actions individually traceable in audit logs. [Source: Okta AI Agent Certification, 2026. Note: Workload Principals and the AI Agents registry are part of Okta for AI Agents, which entered EA in March 2026 with GA targeted for April 30, 2026. Verify current availability status before referencing in customer conversations.]',
        '>> The four steps from shadow to managed identity (per the certification course): (1) Discover with Shadow AI agent discovery — Okta\'s discovery mechanism monitors for unmanaged OAuth grants to detect agents operating without formal governance. [Note: The certification course references a "Secure Access Monitor plugin" for browser-based OAuth grant detection. Verify current product documentation for the exact discovery mechanism and prerequisites in your customer\'s environment.] (2) Register as a Workload Principal — once discovered, select Register and provide a descriptive name. (3) Assign an owner — a human owner or team responsible for the agent\'s behavior and lifecycle. (4) Scope access with Managed Connections — apply least-privilege principles, restricting the agent to specific scopes (like sales:read) instead of granting blanket access.',
        'The official Okta product documentation organizes AI agent governance into a four-phase lifecycle: (1) Detect and Discover — use SAM and ISPM to identify unmanaged agents. (2) Register and Provision — formalize the agent as a non-human identity in Universal Directory with assigned human ownership. (3) Secure and Authorize — enforce least privilege via Managed Connections, defining which resources an agent can access and under what policies. (4) Govern — integrate with OIG for access requests, time-bound access, periodic access certifications, and System Log auditability. [Source: Okta Help Center, EA Docs, 2026]',
        '!! Important EA scope limitation: the current release enables human-to-agent connections only. Agent-to-agent connections are not supported in this release. SEs must be aware of this boundary when discussing multi-agent orchestration scenarios — XAA/ID-JAG covers the protocol-level architecture, but the Okta Admin Console governance features are scoped to human-to-agent at EA. [Source: Okta Help Center, EA Docs]',
        'The Okta Secure Access Monitor (SAM) is a browser extension deployed to managed browsers that monitors for new OAuth grants — the mechanism by which AI agents gain access to user data. SAM feeds this data into ISPM (Identity Security Posture Management), which analyzes the grants and surfaces shadow AI agents. Without SAM deployed to managed browsers, shadow AI detection is limited. Prerequisite: the customer must have browser management (Chrome Enterprise, Edge management) to deploy SAM. BYOD-heavy environments without managed browsers will have reduced detection coverage. [Source: Okta Help Center, EA Docs]',
      ],
    },
    {
      heading: 'The On Behalf Of Model',
      image: 'diagrams/obo-model.png',
      paragraphs: [
        'In the On Behalf Of (OBO) model, the agent does not hold standing access of its own. Instead, it inherits the permissions of the user it is acting for. When Sarah in Sales asks the AI a question, the AI can only access what Sarah can access. When Mike in the Warehouse asks the same question, the AI is limited to what Mike can access. The OBO model is one of the primary patterns Okta uses for agentic access control — appropriate when an agent acts on behalf of a specific user. Agents performing autonomous system-level tasks (batch processing, infrastructure monitoring) may use machine-identity patterns instead. [Source: Okta AI Agent Certification, 2026]',
        'Illustrative example from the certification course: Sarah and Mike both type the exact same question into the AI assistant: "What is our profit margin on Pro Game Basketballs?" For Sarah, Okta checks that Sarah is in the ProGear-Sales group, confirms the agent is approved to act on her behalf, and grants access. The audit log records: who asked (Sarah Sales), which agent acted (ProGear Sales Agent, wlp8x5q7mvH86KvFJ0g7), and what permission was granted (pricing:read, pricing:margin).',
        'For Mike, Okta checks his group membership — ProGear-Warehouse — and finds it does not include pricing access. The agent denies the request. The system blocked the attempt, exposed no data, and logged the denial. Note: The application layer must be configured to handle the authorization denial gracefully and present an appropriate message to the user — Okta enforces the policy, but the agent application controls the user-facing response.',
        'The official documentation defines explicit roles: the Super Admin handles technical setup and configuration (agent registration, credential generation, Managed Connection creation). The Human Owner handles governance accountability — certifying the agent\'s intended use, approving access requirements, and overseeing long-term compliance. This is not optional metadata; it is a product-enforced governance requirement. Every registered AI agent must have a named human owner before it can be fully configured. [Source: Okta Help Center, EA Docs]',
      ],
      mermaidDiagrams: [
        {
          title: 'On Behalf Of — Permission Inheritance by User Context',
          code: `graph TB
    AGENT["🤖 AI Agent<br/>ProGear Sales Agent<br/>wlp8x5q7mvH86KvFJ0g7<br/>No standing access of its own"]

    subgraph SARAH["👤 Sarah — ProGear-Sales group"]
        SQ["Sarah asks:<br/>What is our profit margin<br/>on Pro Game Basketballs?"]
        SCHECK["🔐 Okta checks:<br/>Sarah in ProGear-Sales?  yes<br/>Agent approved for Sarah?  yes<br/>Scope: pricing:read  yes"]
        SGRANT["GRANTED<br/>Pricing data returned"]
        SLOG["📋 Audit log:<br/>actor: Sarah Sales<br/>agent: wlp8x5q7mvH86KvFJ0g7<br/>scopes: pricing:read, pricing:margin<br/>result: granted"]
    end

    subgraph MIKE["👤 Mike — ProGear-Warehouse group"]
        MQ["Mike asks:<br/>What is our profit margin<br/>on Pro Game Basketballs?"]
        MCHECK["🔐 Okta checks:<br/>Mike in ProGear-Warehouse?  yes<br/>Warehouse has pricing:read?  no<br/>Access denied"]
        MDENY["DENIED<br/>Access blocked — no data exposed"]
        MLOG["📋 Audit log:<br/>actor: Mike Warehouse<br/>agent: wlp8x5q7mvH86KvFJ0g7<br/>scopes: pricing:read<br/>result: denied"]
    end

    AGENT --> SQ
    AGENT --> MQ
    SQ --> SCHECK
    SCHECK --> SGRANT
    SGRANT --> SLOG
    MQ --> MCHECK
    MCHECK --> MDENY
    MDENY --> MLOG

    style AGENT fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style SARAH fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style MIKE fill:#f0e6e6,stroke:#b88080,stroke-width:2px
    style SGRANT fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style MDENY fill:#f0e6e6,stroke:#b88080,stroke-width:2px,stroke-dasharray:4 4
    style SLOG fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px
    style MLOG fill:#e8f0f5,stroke:#80a0b8,stroke-width:2px`,
          caption: 'The same agent, the same question, two different outcomes — because the agent inherits the permissions of the requesting user. Sarah (Sales group) gets pricing data. Mike (Warehouse group) is blocked. Both decisions are recorded in the audit log with full attribution.',
        },
      ],
    },
    {
      heading: 'ISPM as the O4AA Entry Point',
      paragraphs: [
        'ISPM (Identity Security Posture Management) is positioned as the primary land-and-expand entry point for O4AA conversations. The discovery motion: offer to scan the customer\'s environment to reveal what AI agents are already running, what data they access, and what credentials they hold. ISPM provides the evidence — shadow agents, orphaned credentials, over-privileged access — that makes the governance case concrete rather than theoretical.',
        'ISPM provides direct integrations with what the O4AA Sample Guide calls "crown jewel AI platforms" — specifically Microsoft Copilot Studio and Salesforce Agentforce. These are the two highest-priority discovery targets because they represent the largest concentration of enterprise AI agent activity. ISPM connects to these platforms to discover agents, map their credentials and resource access, and flag risk posture — all without requiring agents on endpoints (agentless, continuous monitoring). The Discover use case (Use Case 4 in the Sample Guide) has been available since March 15, 2026. [Source: O4AA Sample Guide v1.6.0]',
        '>> ISPM discovery flow for O4AA: (1) Position the scan — \'Let us show you what AI agents are running in your environment today. Most organizations find agents they didn\'t know about.\' (2) Deploy SAM to managed browsers (prerequisite for shadow AI detection). (3) Run the ISPM scan — produces an inventory of discovered agents, their OAuth grants, credential types, and risk posture. (4) Present findings — shadow agents, over-privileged access, orphaned credentials, agents without human owners. (5) Expand to governance — \'Now that you see the problem, here\'s how Okta registers, secures, and governs these agents.\' The ISPM scan converts an abstract governance pitch into a concrete, evidence-based conversation.',
        '?? \'If we scanned your environment right now, how many AI agents do you think we\'d find? In our experience, organizations typically discover 3-5x more agents than they expected. Would you be open to a discovery scan to get a baseline?\' This question is the O4AA conversation opener in most field engagements.',
      ],
    },
    {
      heading: 'Deactivation: The Kill Switch',
      paragraphs: [
        '!! Scenario from the certification course: your monitoring system flags unusual activity — an agent is attempting to access pricing data at an abnormally high rate. You open the Okta Admin Console, navigate to AI Agents, find the agent, and select Deactivate. Deactivation stops the agent from obtaining new authentication tokens. Note: already-issued access tokens may remain valid until they expire (typically minutes, depending on token TTL configuration). For immediate access termination, combine deactivation with explicit token revocation. Dependent integrations that rely on the agent may also be affected — plan accordingly.',
        'The audit log records the deactivation event and the full history of the agent\'s actions. This provides the evidence trail needed for compliance investigations and incident response. [Source: Okta AI Agent Certification, 2026]',
        '!! Limitation to note: deactivation governs the Okta authentication layer. If the agent cached credentials or tokens locally, or if downstream APIs do not validate tokens on every request, there may be a window of continued access. The effectiveness of the kill switch depends on token TTL settings and downstream API validation behavior.',
        '?? How many AI agents are operating in your environment today? Who authorized them and what data can they access? Can you produce an audit trail of what your AI agents accessed last quarter? If you discovered an agent was compromised right now, how long would it take to revoke ALL of its access?',
      ],
    },
    {
      heading: 'SAM Browser Plugin — Technical Architecture',
      paragraphs: [
        'The Okta Secure Access Monitor (SAM) plugin is the primary technical mechanism behind shadow AI discovery. It is a managed Chrome extension (Extension ID: galipinbbdandeicdicjbalcbpdbljjj) that detects AI agents at the moment an employee authorizes them via browser-based OAuth consent — a fundamentally different detection surface than CASB or endpoint DLP. SAM entered EA on February 12, 2026, with GA targeted for April 30, 2026. Importantly, SAM is a separate extension from the existing Okta end-user browser plugin — it was deliberately built as a new extension for security isolation. [Source: Okta OIE docs, VERIFIED; Okta internal eng docs]',
        'SAM\'s core function is OAuth grant monitoring, not URL blocking, content inspection, or traffic analysis. The plugin uses Chrome\'s webRequest/declarativeNetRequest APIs (MV3 extension) to monitor outgoing requests to authorization endpoints (/authorize). It matches requests against a registry of approximately 40 known OAuth providers plus a generic fallback that catches any standard OAuth flow. When a user grants an application OAuth access to a resource app, the plugin intercepts the authorization code or grant from the redirect URL, enriches the event with user context, and transmits it securely to Okta via an mTLS endpoint (<org>.mtls.okta.com). Events are batched and sent in CloudEvents format (type: com.okta.observation). [Source: Okta OIE docs + internal eng docs, VERIFIED]',
        'Data captured per OAuth grant event: the URL of the requesting application, the grant type (Redirect, Direct, or Grant), the Okta User ID tied to the authenticated Chrome profile, the resource app being accessed, the client app requesting access, the specific scopes granted, and device/browser context from Okta Verify. ISPM automatically applies an "AI" category label to grants it detects as enabling AI agents, and admins filter the inventory by this label to isolate shadow AI-specific grants. [Source: help.okta.com/oie/topics/ai-agents/ai-agent-identify-with-oauth.htm, VERIFIED]',
        '!! Initial data population takes up to 7 days after SAM plugin deployment — security teams have zero shadow AI visibility during this initialization period. After the 7-day initialization, data syncs daily (not real-time). Communicate this clearly during deployment planning so customers set expectations appropriately. [Source: Okta OIE docs, VERIFIED]',
      ],
      tabs: [
        {
          label: 'Plugin Identity & Auth',
          content: [
            'SAM authenticates as a WorkloadPrincipal (type: SECURITY_ACCESS_MONITOR) — Okta dogfoods its own non-human identity model for the plugin. The plugin obtains an OAuth 2.0 token where the subject (sub) is a wlp_ ID, using client assertion via the Web Cryptography API. No human SSO or authentication is required — the plugin authenticates autonomously using the Google CA-provisioned client certificate. OAuth issuer: urn:okta:plugins:security-access-monitor. Scopes: okta.securityAccessMonitor.events.manage. [Source: Okta internal eng 1-pager]',
            'The mTLS auth chain has three components: (1) Google Certificate Authority provisioned via Google Admin Console > Chrome browser > Connectors — a Google-managed CA that issues client certificates to enrolled Chrome browsers. (2) Client certificate auto-selection via Chrome policy AutoSelectCertificateForUrls, filtered to Chrome Enterprise CA issuer — Chrome automatically presents the cert when connecting to Okta\'s mTLS endpoint. (3) CA upload to Okta Admin Console > Security > Device Integrations. This ensures ISPM only accepts telemetry from genuine, company-managed browser instances — prevents spoofing and MITM attacks.',
            '!! SASE/proxy conflict: if the customer runs Netskope, Zscaler, or any TLS-inspecting proxy, they MUST exempt <org>.mtls.okta.com from TLS inspection — otherwise the proxy breaks the mTLS handshake and the plugin cannot transmit data. Also note: the SAM plugin client certificate interferes with manual certificate selection flows (Smart Card, PIV, Legacy Device Trust) — material for government/defense customers.',
          ],
        },
        {
          label: 'How ISPM Applies AI Labels',
          content: [
            'The plugin itself does NOT determine what is or is not an AI agent — it is a passive telemetry sensor. The "AI" label in the ISPM console is the result of a multi-layered backend analysis. [Source: Okta internal SAM architecture doc]',
            'Method 1 — Metadata Fingerprinting: ISPM compares the Client ID, URL, and Resource against a proprietary database of known AI platforms (OpenAI, Anthropic, Glean, Midjourney, etc.) and agent-building frameworks. Method 2 — Scope Analysis: AI agents typically request high-privilege "Data-Out" scopes (files.read.all, mail.read, workspace.admin). ISPM flags non-sanctioned clients requesting these broad scopes — a hallmark of autonomous agents vs. simple productivity integrations. Method 3 — Behavioral Context: since the plugin sends the Okta UserId, ISPM correlates the grant with a human user session. If a high-privilege grant is initiated via a User Consent flow in a browser (Redirect/Grant type) rather than a server-to-server Client Credentials flow, ISPM flags it as a "Shadow" entity.',
            '!! V0 detection caveat: the current detection logic relies on heuristics and data correlations rather than complete deterministic linking. The engineering team acknowledges risk of false positives (flagging legitimate integrations) and false negatives (missing shadow agents). The plugin only captures the Okta session user, not necessarily the actual authorizing user. This is being improved iteratively with customer data. Position this honestly in POC conversations — the detection improves with deployment time and data volume.',
          ],
        },
        {
          label: 'Security Boundary',
          content: [
            'What SAM CAN access: OAuth request interception (client_id, redirect_uri, scopes), redirect URLs with authorization codes/grants, and the active Okta session of the managed Chrome profile (for UserId enrichment). What SAM CANNOT access: cross-session data (bound to managed Chrome profile only — cannot see personal profiles or other browsers), session cookies or Bearer tokens (captures the event of the grant and scopes, not the actual access_token or id_token values), and page content (technically isolated from sensitive data inside SaaS apps). [Source: Okta internal SAM architecture doc]',
            'Security controls: (1) mTLS with Chrome Enterprise certificate store — managed device credential, not a shared static cert. (2) Content Security Policy — plugin can only send data to the hardcoded <org>.mtls.okta.com endpoint, cannot exfiltrate to any other destination. (3) Tamper protection — Force-Installed via Google Admin Policy; users cannot disable, uninstall, or modify the plugin.',
          ],
        },
        {
          label: 'Future: CIMD Detection',
          content: [
            'A proposal exists (March 2026) to extend SAM to detect IETF OAuth Client ID Metadata Document (CIMD) — where AI agents use a URL as their client_id instead of a GUID. Traditional: client_id=abc123. CIMD: client_id=https://agent.example.com/.well-known/oauth-client. The plugin change is trivial — one line: detect URL-based client_id, flag as isCIMD:true, pass to ISPM backend for metadata fetching, posture checks, and correlation. [Source: Okta internal CIMD proposal]',
            'CIMD posture checks (engine-side): authentication posture (no client auth, missing JWKS, weak auth), key hygiene (unrotated keys, expired keys), scope/permission drift (expanded declared scopes since last observation), identity hygiene (unreachable CIMD doc, client_id mismatch, missing required fields), and cross-platform correlation (same CIMD URL across multiple users = shared agent detection).',
            '!! Current CIMD adoption: neither Microsoft Entra/Copilot Studio nor Salesforce/Agentforce use CIMD today. The CIMD spec is authored by Aaron Parecki (Okta), active IETF draft as of March 2026. Expected adoption path: MCP incorporates CIMD → platforms building MCP-compatible agents adopt it transitively. This is roadmap — do not position as current capability.',
          ],
        },
      ],
      mermaidDiagrams: [
        {
          title: 'SAM Plugin — Data Flow and Constraints',
          code: `graph LR
    subgraph Browser["Employee Browser<br/><i>Chrome Enterprise only</i>"]
        E["👤 Employee<br/>grants OAuth consent"]
        SAM["SAM Plugin<br/><i>Extension: galipinbb...</i>"]
        E -->|"OAuth consent event"| SAM
    end

    subgraph Okta["🔐 Okta Platform"]
        mTLS["mTLS Endpoint<br/><i>org.mtls.okta.com</i>"]
        ISPM["ISPM Analysis<br/><i>applies AI label</i>"]
        Inv["Admin Inventory<br/><i>Browser OAuth Grants page</i>"]
        mTLS -->|"grant event ingested"| ISPM
        ISPM -->|"shadow AI flagged"| Inv
    end

    SAM -.->|"intercepts grant<br/>client cert auth"| mTLS

    C1["Chrome-only<br/><i>no Edge / Firefox / Safari</i>"]
    C2["MDM required<br/><i>Jamf / Intune + Chrome Enterprise</i>"]
    C3["7-day init<br/><i>zero visibility on day 1</i>"]
    C4["Daily sync<br/><i>not real-time</i>"]

    Browser -.->|"constraint"| C1
    Browser -.->|"constraint"| C2
    ISPM -.->|"constraint"| C3
    ISPM -.->|"constraint"| C4

    style Browser fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style Okta fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style C1 fill:#f0e6e6,stroke:#c4a0a0,stroke-dasharray:5 5
    style C2 fill:#f0e6e6,stroke:#c4a0a0,stroke-dasharray:5 5
    style C3 fill:#f0ede6,stroke:#c4b99a,stroke-dasharray:5 5
    style C4 fill:#f0ede6,stroke:#c4b99a,stroke-dasharray:5 5`,
          caption: 'SAM intercepts OAuth grants at the browser consent moment and feeds ISPM. Key constraints: Chrome-only, MDM required, 7-day initialization, daily (not real-time) sync.',
        },
      ],
      labeledCallouts: [
        { label: 'CHROME ONLY', labelColor: 'rose', text: 'SAM works exclusively on managed Chrome browsers enrolled in Google Chrome Enterprise Core. Organizations running Edge, Firefox, or Safari as their standard browser have no coverage. This is the single largest coverage constraint — surface it in the first technical conversation.' },
        { label: 'MDM REQUIRED', labelColor: 'rose', text: 'Two conditions are both required: (1) MDM enrollment via Jamf Pro, Microsoft Intune, or equivalent, and (2) Google Chrome Enterprise Core enrollment. Standard MDM alone is insufficient — Chrome Enterprise enrollment is specifically required. BYOD-heavy environments have significant blind spots.' },
        { label: 'NO PROMPT DLP', labelColor: 'amber', text: 'SAM is not a DLP tool — it sees that a connection was made (OAuth grant), not what data flows through it. For prompt-level content inspection, customers need a separate DLP layer (Netskope, Harmonic Security, Microsoft Purview). Position SAM as complementary to network DLP, not a replacement.' },
        { label: 'NO HISTORY', labelColor: 'amber', text: 'Unlike email-scanning approaches (Nudge Security), SAM cannot discover AI tools adopted before the plugin was deployed. SAM is forward-looking only. For historical discovery, supplement with Nudge Security or Grip Security.' },
      ],
    },
    {
      heading: 'osquery Advanced Posture Checks for AI Agents',
      paragraphs: [
        'osquery-based Advanced Posture Checks (APC) provide a complementary detection layer for endpoint-resident AI agents that the SAM plugin cannot see — specifically agents that do not use browser OAuth flows: locally installed SDKs, VS Code extensions, local LLM servers, MCP client configurations, and direct API key use. Okta embeds a bundled osqueryd binary inside Okta Verify. When APC is enabled (currently EA), Okta runs SQL queries against this local osquery instance at authentication time. Queries must return a single column with value 1 (pass) or 0 (fail) — results gate access through Device Assurance policies. [Source: Okta help docs; iamse.blog, May 2025]',
        '!! Platform requirements: macOS 14.4+ with Okta Verify 9.39.0+ (MDM-managed via Jamf Pro or Intune), or Windows 10 22H2+ with Okta Verify 6.7.0+ (MDM-managed via Intune or Workspace ONE). Linux is not currently supported for APC.',
        '>> Real-world proof point: 1Password Extended Access Management (formerly Kolide) has production deployment of this exact approach, integrated with Okta SSO. Check 1: verifies the user is logged into an enterprise ChatGPT workspace (not personal), reading ~/Library/Application Support/ChatGPT/ preferences to validate the active workspace ID. Check 2: blocks Okta login entirely if the ChatGPT macOS app is installed and the organization prohibits it. This validates that osquery posture checks can enforce AI tool policy at the Okta authentication boundary — not just detect. [Source: 1password.com/blog/two-checks-chatgpt-macos-app, May 2024, VERIFIED]',
        'Fleet\'s mcp_listening_servers table detects active HTTP MCP protocol servers — but note this is a Fleet-added table (not standard osquery), and it only detects HTTP-based MCP servers. stdio-based MCP servers (the majority of current deployments) are invisible to this table. [Source: fleetdm.com/tables/mcp_listening_servers, VERIFIED]',
      ],
      accordion: [
        {
          title: 'Query 1: Python AI SDK Detection (Okta APC-compatible)',
          content: [
            'Returns 1 (FAIL posture check) if any unsanctioned AI SDK is installed. Use in Okta Advanced Posture Checks → Device Assurance. Detects: openai, anthropic, google-generativeai, langchain, langchain-core, crewai, autogen, pyautogen, llama-index, ollama, litellm, openai-agents, pydantic-ai, semantic-kernel, huggingface-hub.',
            'SQL: SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS has_ai_sdk FROM python_packages WHERE name IN (\'openai\', \'anthropic\', \'google-generativeai\', \'langchain\', \'langchain-core\', \'crewai\', \'autogen\', \'pyautogen\', \'llama-index\', \'llama_index\', \'ollama\', \'litellm\', \'openai-agents\', \'pydantic-ai\', \'semantic-kernel\', \'huggingface-hub\');',
            '!! Confidence: HIGH — pip-installed packages are reliably enumerated by the python_packages table.',
          ],
        },
        {
          title: 'Query 2: Local LLM Inference Server Detection',
          content: [
            'Detects locally running LLM servers by known port numbers. Checks listening_ports joined to processes to identify Ollama (11434), LM Studio (1234 or 4891), common LLM API servers (8080), and Gradio/HuggingFace (7860).',
            'SQL: SELECT lp.port, lp.address, p.name, p.cmdline FROM listening_ports lp LEFT JOIN processes p USING (pid) WHERE lp.port IN (11434, 1234, 4891, 8080, 7860);',
            '!! Confidence: HIGH for currently running servers. Will not detect servers that were running before the query execution — osquery APC runs at authentication time (point-in-time query).',
          ],
        },
        {
          title: 'Query 3: AI API Keys in Process Environment (APC-compatible)',
          content: [
            'Returns 1 if AI-related API keys are detected in active process environments. Checks for: OPENAI_API_KEY, ANTHROPIC_API_KEY, GOOGLE_API_KEY, GOOGLE_GENERATIVEAI_API_KEY, HUGGINGFACE_API_KEY, HF_TOKEN, LANGCHAIN_API_KEY, LANGSMITH_API_KEY, COHERE_API_KEY, MISTRAL_API_KEY, AZURE_OPENAI_API_KEY, REPLICATE_API_TOKEN, AWS_ACCESS_KEY_ID.',
            'SQL: SELECT CASE WHEN COUNT(*) > 0 THEN 1 ELSE 0 END AS has_ai_api_key FROM process_envs WHERE key IN (\'OPENAI_API_KEY\', \'ANTHROPIC_API_KEY\', \'GOOGLE_API_KEY\', \'GOOGLE_GENERATIVEAI_API_KEY\', \'HUGGINGFACE_API_KEY\', \'HF_TOKEN\', \'LANGCHAIN_API_KEY\', \'LANGSMITH_API_KEY\', \'COHERE_API_KEY\', \'MISTRAL_API_KEY\', \'AZURE_OPENAI_API_KEY\', \'REPLICATE_API_TOKEN\', \'AWS_ACCESS_KEY_ID\');',
            '!! Confidence: MEDIUM — captures keys passed as environment variables to running processes. Keys stored in OS keychain, .env files not currently loaded, or IDE secret managers are NOT captured. This is a meaningful gap on developer machines where good key hygiene is practiced.',
          ],
        },
        {
          title: 'Query 4: VS Code AI Extension Detection',
          content: [
            'Detects AI-powered VS Code extensions by publisher and name pattern. Targets: GitHub (Copilot), Anysphere (Cursor), Continue.dev, Codeium, Tabnine, Sourcegraph, Google, AmazonWebServices. Also catches extensions with "copilot", "codeium", or "tabnine" in the name.',
            'SQL: SELECT u.username, ext.name, ext.publisher, ext.version FROM users u JOIN vscode_extensions ext USING (uid) WHERE ext.publisher IN (\'GitHub\', \'Anysphere\', \'Continue\', \'Codeium\', \'tabnine\', \'sourcegraph\', \'google\', \'AmazonWebServices\') OR ext.name LIKE \'%copilot%\' OR ext.name LIKE \'%codeium%\' OR ext.name LIKE \'%tabnine%\';',
            '!! Confidence: HIGH — VS Code extension IDs are stable and reliably catalogued.',
          ],
        },
        {
          title: 'Query 5: MCP Client Configuration Detection',
          content: [
            'Detects MCP client configuration files across major AI development tools: Claude Desktop (claude_desktop_config.json), Cursor (.cursor/mcp.json), VS Code (.vscode/mcp.json), Windsurf/Codeium (.codeium/windsurf/mcp_config.json), and Linux Claude config (.config/claude/claude_desktop_config.json). Uses CROSS JOIN on user home directories to check all known MCP config paths.',
            'SQL pattern: WITH path_suffixes AS (SELECT \'/Library/Application Support/Claude/claude_desktop_config.json\' AS suffix UNION ALL SELECT \'/.cursor/mcp.json\' UNION ALL SELECT \'/.vscode/mcp.json\' UNION ALL SELECT \'/.codeium/windsurf/mcp_config.json\' UNION ALL SELECT \'/.config/claude/claude_desktop_config.json\') SELECT u.username, f.path, f.size, datetime(f.mtime, \'unixepoch\') AS last_modified FROM users u CROSS JOIN path_suffixes ps JOIN file f ON f.path = u.directory || ps.suffix WHERE f.size > 0;',
            '!! Confidence: HIGH for file presence — but does not parse config contents to enumerate connected MCP tools. Detects that the user has configured MCP, not which MCP servers they are running. [Source: fleetdm.com/queries/get-mcp-client-configurations, VERIFIED]',
          ],
        },
        {
          title: 'Query 6: Chrome AI Extension Detection',
          content: [
            'Detects AI-powered Chrome extensions using the chrome_extensions osquery table. Target extensions by known extension IDs for ChatGPT, Perplexity, Monica AI, and other AI browser tools. Complement to the SAM plugin — SAM catches OAuth grants, while this query catches extension installation even if no OAuth flow has triggered yet.',
            'This query pattern is useful for organizations that cannot deploy the SAM plugin (non-Chrome-Enterprise environments) but want endpoint-level AI tool detection through osquery. Combine with Query 4 (VS Code) for comprehensive developer AI tool inventory.',
            '!! Confidence: HIGH — Chrome extension IDs are stable identifiers. Note that extension detection requires the Chrome browser profile to be accessible to osquery, which may vary by MDM configuration.',
          ],
        },
      ],
    },
    {
      heading: 'Shadow AI Statistics — The Discovery Pitch',
      paragraphs: [
        'These statistics open the discovery conversation without requiring the customer to self-diagnose. Lead with observed-data statistics (Reco, Zscaler, Grip) — these are based on actual environment scans or network telemetry, not surveys, and will survive scrutiny in CFO/board-level conversations. Use survey data (IBM/Ponemon, Gartner, BlackFog) directionally to frame human behavior patterns.',
        '>> The Samsung proof point: Samsung allowed ChatGPT use on March 11, 2023. Within 19 days, engineers had uploaded sensitive source code and internal meeting notes to ChatGPT for debugging. The AI retained the inputted data. Samsung subsequently banned ChatGPT company-wide. Samsung did not detect the leakage proactively — it was reported externally. This illustrates the exact problem ISPM addresses: by the time IT discovers the Samsung scenario via conventional monitoring, the data has already been processed by the AI tool. The SAM plugin addresses the prevention opportunity — the OAuth grant moment — before data flows. [Source: Forbes, May 2023; AI Incident Database, Incident 768, VERIFIED]',
      ],
      tabs: [
        {
          label: 'Observed Data',
          content: [
            'Reco 2025 State of Shadow AI Report (actual SaaS environment scans, not surveys): The average enterprise has 490 SaaS applications, but only 47% are authorized. OpenAI accounts for 53% of all shadow AI usage, processing data from 10,000+ enterprise users — more than the next nine AI platforms combined. Shadow AI tools persist for an average of 400+ days before discovery (specific tools: CreativeX = 403 days, System.com = 401 days). Small companies (11-50 employees) have 269 unsanctioned AI tools per 1,000 employees. [Source: reco.ai/state-of-shadow-ai-report, HIGH confidence]',
            'Zscaler ThreatLabz (18 billion AI/ML transactions analyzed): Enterprise AI usage surged 595% between April 2023 and January 2024. AI/ML transactions increased 91% YoY in the 2026 report. Applications driving AI/ML transactions quadrupled YoY to 3,400+. [Source: ir.zscaler.com, January 2026, HIGH confidence]',
            'Grip Security (23,000 SaaS environments scanned): 100% of analyzed companies operate SaaS environments with embedded AI. Organizations have an average of 140 AI-enabled SaaS environments. This means the discovery conversation should start with "what are your currently-approved platforms doing?" before "what shadow AI exists outside your walls." [Source: securityweek.com/grip, HIGH confidence]',
            'Netskope ThreatLabs (own telemetry): 72% of enterprise GenAI use is shadow AI — unauthorized and unmonitored. [Source: Netskope Cloud and Threat Report 2025, HIGH confidence]',
          ],
        },
        {
          label: 'Survey Data',
          content: [
            'IBM/Ponemon Cost of a Data Breach 2025 (n=600 organizations, Ponemon methodology): 13% of organizations reported breaches of AI models or applications; 8% don\'t know if they were compromised. 97% of organizations breached via AI reported lacking proper AI access controls. Shadow AI added an average $670,000 to breach costs. Shadow AI incidents led to more PII compromise (65% vs. 53% global average) and more IP compromise (40% vs. 33%). Only 37% of organizations have policies to detect or manage shadow AI. [Source: newsroom.ibm.com, July 2025, HIGH confidence]',
            'Gartner (November 2025, 302 CISOs surveyed): 69% of organizations suspect or have evidence employees use prohibited AI tools. Prediction: by 2030, >40% of enterprises will experience security or compliance incidents linked to shadow AI. [Source: gartner.com press release, November 2025, HIGH confidence]',
            'BlackFog (January 2026, n=2,000 US+UK employees, organizations 500+): 86% use AI tools at least weekly for work tasks. 49% use AI tools not sanctioned by their employer. 60% say using unsanctioned AI tools is worth the security risks if it helps them work faster. 69% of C-level executives say speed outweighs security risk (vs. 37% of administrative staff). 51% have connected AI tools to other work systems without IT approval. [Source: blackfog.com, January 2026, MEDIUM confidence — vendor-commissioned survey]',
            '!! Note: Survey-based statistics should anchor the human behavior framing ("policy alone fails because employees prioritize speed"). The observed-data statistics should anchor the quantitative case ("here is what we see in real environments"). Do not use BlackFog stats as primary citations in executive briefings — prefer IBM/Ponemon and Gartner.',
          ],
        },
      ],
    },
    {
      heading: 'Competitive Landscape — AI Agent Discovery',
      paragraphs: [
        'The AI agent discovery market is fragmented across identity, network, endpoint, and DLP vendors. No single competitor covers discovery, remediation, and governance end-to-end. Okta\'s differentiator is not discovery breadth — it is identity-native remediation. Dedicated discovery tools find shadow AI; Okta governs it. The recommended positioning: "A discovery-only tool that can\'t remediate — revoke access, register the identity, trigger a certification, enforce MFA on the service account — stops at alerting. The Okta platform turns the alert into an action."',
        '!! Honest competitive framing: Nudge Security and Grip Security have 12-24 months of GA discovery tooling with broader coverage than Okta ISPM\'s February 2026 EA. Astrix Security\'s Agent Control Plane (ACP) provides JIT provisioning at agent creation — a preventive control Okta does not yet have. Network-layer tools (Netskope, Zscaler, Harmonic Security) see what data flows into AI tools, while Okta SAM sees that a connection was made, not what was sent. Be transparent about these gaps — credibility earned here compounds across the engagement.',
      ],
      labeledCallouts: [
        {
          label: 'NUDGE SECURITY',
          labelColor: 'blue',
          text: 'Multi-layer discovery: IdP APIs + browser extension + M365/workspace API + OAuth monitoring. Covers 1,000+ AI tools in GA. March 2026 research preview adds Agentforce, Copilot Studio, and MCP connection monitoring. Strength: broadest discovery surface, email-first historical detection. Gap vs. Okta: cannot register discovered agents into an IAM platform, run through OIG certification, or revoke via Universal Logout. Remediation requires a separate IdP integration step.',
        },
        {
          label: 'ASTRIX SECURITY',
          labelColor: 'blue',
          text: 'API integration monitoring + OAuth token graph + MCP server detection. Agent Control Plane (ACP) provides JIT provisioning and short-lived credentials at agent creation time (preventive, not detective). Deep agent→creator→NHI→app graph mapping. Strength: preventive provisioning controls, NHI graph depth. Gap vs. Okta: end-user shadow AI app discovery less comprehensive, no IGA/certification workflow.',
        },
        {
          label: 'GRIP SECURITY',
          labelColor: 'blue',
          text: 'Identity-based agentless discovery — reads IdP auth logs to detect SaaS and AI tool usage. Covers 85% of unknown/unmanaged SaaS. "Agents" use case and AI-SPM module address AI specifically. Strength: no agent deployment required, identity-first approach, 23,000 environments analyzed. Gap vs. Okta: no native IGA certification, discovery requires IdP as source. Complementary: Grip discovers, Okta governs.',
        },
        {
          label: 'NETWORK LAYER',
          labelColor: 'amber',
          text: 'Netskope and Zscaler provide inline proxy-based AI traffic analysis. Zscaler detects 3,400+ AI apps; Netskope catalogs shadow AI comprehensively. Strength: see actual data in transit, real-time blocking, DLP-level content inspection. Gap vs. Okta: no identity context — cannot register discovered agents, assign human owners, or trigger access certifications. Cannot see AI agents using approved domains with legitimate OAuth tokens.',
        },
        {
          label: 'SAILPOINT',
          labelColor: 'amber',
          text: 'IGA connectors for Agentforce and Copilot Studio (March 2026). Deep governance lifecycle — certify, provision, deprovision AI agents. Strength: mature IGA with NHI module. Gap vs. Okta: no browser-layer shadow AI discovery, no SAM-equivalent. Complementary to, not competitive with, Okta IAM — but competes directly with OIG on the governance layer.',
        },
      ],
    },
    {
      heading: 'Discovery Conversation Playbook',
      paragraphs: [
        'Customer maturity determines the conversation entry point. Do not lead with product capabilities — lead with the customer\'s current reality. The four maturity levels below represent the most common personas an SE encounters. Each includes opening questions, qualifying questions, and positioning guidance. After assessing maturity, use the Universal Qualification Dimensions to determine product fit.',
        '>> Universal Qualification Dimensions (ask regardless of maturity level): (1) Device Coverage — "What percentage of employees are on managed, corporate-enrolled devices? Is Chrome your standard browser?" Answers determine SAM plugin feasibility. Heavy BYOD = lower browser-layer coverage; supplement with osquery and NHI scanning. (2) Identity Stack — "Are you on OIE or Classic Engine? Do you have an ISPM license? Do you use OIG for access certifications?" Answers determine what is available today vs. what requires upsell. Classic Engine = migration conversation first. (3) Risk Framing — "Has your org experienced any data exposure incidents involving AI tools? Are you in scope for EU AI Act, HIPAA, or SOC 2? Does your cyber insurance renewal ask about AI governance controls?" Answers determine proactive investment vs. reactive compliance urgency.',
      ],
      accordion: [
        {
          title: 'Level 0: "We Have No Idea What AI Tools Exist"',
          content: [
            'Typical profile: Mid-market, no dedicated AI governance program, CIO/CISO aware of shadow AI from industry press but has not inventoried. This is the most common entry point.',
            '?? "When did your team last do a formal inventory of what AI tools are in use — not just the tools IT approved, but what people are actually using?" / "Reco\'s 2025 research found that the average enterprise has 53% of its AI traffic flowing through OpenAI services they didn\'t intentionally deploy. If that\'s true in your environment, where would you see it?" / "If one of your developers built an agent that connected to your Salesforce data two years ago, how would you know today whether that agent is still running?"',
            'TT No inventory = immediate ROI case for ISPM discovery. Existing inventory done manually or via network logs = identify the gaps in those approaches. "We trust our employees" = reframe with the 400-day persistence data and C-suite behavior statistics (69% of C-level executives say speed outweighs security risk).',
          ],
        },
        {
          title: 'Level 1: "We\'ve Blocked AI Tools at the Network Layer"',
          content: [
            'Typical profile: Enterprise with Netskope or Zscaler in place, confident they\'ve addressed shadow AI via URL blocking. These customers think the problem is solved — the conversation is about what their network layer cannot see.',
            '?? "Your Netskope deployment blocks unauthorized AI domains at the network layer — how does that handle AI features embedded inside Salesforce, Microsoft 365, or Notion that are already approved traffic on port 443?" / "When a developer uses the OpenAI API via an approved VS Code extension, that traffic is allowed. But the API key they\'re using — who issued it, who owns it, and when does it expire?" / "Your employees who know what they\'re doing — the engineers, the data scientists — they\'ll use APIs directly or run local models. What does your network layer see there?"',
            'TT Key differentiating argument: network-layer controls see traffic; identity-layer controls see intent and authorization. An AI agent that runs with a legitimate OAuth token through an approved domain is invisible to CASB. ISPM sees the moment that token was granted and who granted it. Qualify for osquery posture checks: "Do you use VS Code as a standard development environment? Are developers allowed to install extensions?"',
          ],
        },
        {
          title: 'Level 2: "We Have a Shadow AI Discovery Tool Already"',
          content: [
            'Typical profile: Enterprise with Nudge Security or Grip Security deployed, looking at Okta for governance. Do not position competitively — position as additive. These tools excel at discovery breadth but cannot close the governance loop.',
            '?? "Nudge Security is excellent at discovering what AI tools exist. When Nudge finds a shadow agent — what\'s the next step? How do you register that agent as a managed identity, assign it an owner, and run it through your access certification process?" / "When you want to revoke an agent\'s access to Salesforce, Grip hands that off to your IdP. That\'s an extra step in an incident response scenario. How fast can you execute that today?" / "What happens to an agent that Nudge discovered 18 months ago when the employee who created it leaves?"',
            'TT Positioning: Nudge/Grip discover. Okta governs. Complementary in the near term; Okta\'s full-platform approach becomes the consolidation path as the customer matures. Proof points to offer: ISPM-to-OIG certification pipeline, Universal Logout as a kill switch, OPA Privileged Credential Management replacing static API keys.',
          ],
        },
        {
          title: 'Level 3: "We\'re Building Our Own AI Platform"',
          content: [
            'Typical profile: Enterprise with active Salesforce Agentforce or Microsoft Copilot Studio deployment; CTO/CISO asking about governance for internally built agents. These are the most sophisticated buyers.',
            '?? "How many agents are currently deployed in your Agentforce environment? Of those, how many have had a formal access certification review in the last 90 days?" / "When an agent you built in Copilot Studio runs with a Microsoft service principal that has admin Graph API access — who on your team knows that today without logging into the Azure portal?" / "Your developers are building agents on AWS Bedrock. Those agents have IAM roles. When a developer leaves, does your offboarding process automatically revoke the IAM roles tied to agents they created?"',
            'TT Technical focus: ISPM NHI scanning for Salesforce, AWS IAM, Microsoft Entra (current GA capability). OIG certification campaigns for agents as a resource (EA). For customers building AI-powered applications (developer audience): Auth0 for AI Agents — Token Vault (secure OAuth token storage for 35+ integrations), CIBA (human-in-the-loop approval), FGA for RAG (document-level access control). Clarify the Okta for AI Agents vs. Auth0 for AI Agents distinction: different products, different audiences, complementary.',
          ],
        },
      ],
    },
    {
      heading: 'Honest Limitations & Gaps',
      paragraphs: [
        'Credibility in enterprise discovery conversations comes from proactively surfacing what the platform cannot do — before the customer discovers it during a POC. The following gaps are confirmed as of April 2026 (pre-GA). Some may be addressed at GA (April 30, 2026) or in subsequent releases. Always verify against current documentation before customer conversations.',
      ],
      labeledCallouts: [
        {
          label: 'AGENT GATEWAY',
          labelColor: 'rose',
          text: 'The Agent Gateway — centralized control plane for AI agent access with virtual MCP server capability, tool-call-level policy enforcement, and unified audit logging — is listed as "Coming Soon" as of March 16, 2026. No public GA date. Without it, enforcement relies on identity-layer controls, not individual tool-call-level policies. When customers ask "can you block an agent from calling a specific tool?" the honest answer today is "that\'s on the roadmap via Agent Gateway." [Source: Okta product page, investor PR, VERIFIED]',
        },
        {
          label: 'CROWN JEWELS',
          labelColor: 'rose',
          text: 'Crown Jewel platform deep audit (Microsoft Copilot Studio, AWS Bedrock, Salesforce Agentforce) was announced as "What\'s to Come" in the February 2026 press release. OIN integrations for Boomi, DataRobot, and Google Vertex AI entered EA at Showcase (March 16, 2026) — suggesting coverage is actively expanding but incomplete. Do not demo Crown Jewel deep audit as current capability. Demo only what is confirmed: SAM plugin OAuth monitoring, NHI scanning, and the discovery-to-registration-to-certification pipeline. [Source: Press release vs. blog source tension, VERIFIED]',
        },
        {
          label: 'NO PROOF POINTS',
          labelColor: 'rose',
          text: 'No public customer proof points exist for O4AA as of April 2026. The Okta Value Framework explicitly notes "[NONE YET — EA product]." Any ROI or effectiveness claims should be framed as expected outcomes or analogized from NHI governance use cases — not attributed to O4AA customer data. Track the April 30, 2026 GA date for updated proof points and customer reference programs.',
        },
        {
          label: 'AGENT-TO-AGENT',
          labelColor: 'rose',
          text: 'The official ISPM documentation states: "The solution addresses human-to-agent connections, as opposed to agent-to-agent connections." This is a material gap as multi-agent orchestration (LangGraph, AutoGen, CrewAI) becomes more common. The EA governance features in the Okta Admin Console are scoped to human-to-agent only. [Source: help.okta.com/ispm, VERIFIED]',
        },
        {
          label: 'COVERAGE GAPS',
          labelColor: 'amber',
          text: 'Chrome-only SAM plugin + managed-device MDM requirement = coverage blind spots for BYOD, non-Chrome browsers, and non-browser OAuth flows (direct API calls). Agents that authenticate without a browser consent screen are invisible to SAM. Server-side AI infrastructure (cloud-deployed agents, VMs) is not covered by endpoint osquery. Each gap has a mitigation path but no single mechanism provides complete coverage.',
        },
        {
          label: 'SAM + OSQUERY',
          labelColor: 'emerald',
          text: 'Mitigation strategy: layer SAM plugin (browser OAuth), osquery APC (endpoint AI tools), and ISPM NHI scanning (SaaS API integrations) for defense-in-depth discovery. SAM catches the OAuth grant moment, osquery catches installed SDKs and local LLM servers, and NHI scanning catches API tokens and service accounts. No single layer is complete, but together they cover most enterprise AI agent adoption patterns.',
        },
        {
          label: 'HYBRID APPROACH',
          labelColor: 'emerald',
          text: 'For customers who need maximum discovery breadth on day one and have more time before governance: recommend a hybrid approach — Nudge Security or Grip Security for comprehensive discovery, Okta for governance. This is the honest positioning for accounts where ISPM EA discovery coverage is insufficient. The consolidation path to Okta-only becomes viable as ISPM coverage expands toward GA and beyond.',
        },
      ],
    },
  ],
};
