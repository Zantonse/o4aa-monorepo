import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'credential-security',
  title: 'Agent Credential Security',
  description:
    'Eliminating static credentials from AI agent code — privileged credential management, Managed Connections with Resource Indicators, and securing agent identity with rotatable key pairs. Source: Okta AI Agent Certification (2026).',
  tags: ['security', 'credentials', 'OPA', 'managed-connections', 'JWK', 'privileged-access'],
  icon: '🔑',
  hasDiagram: true,
  diagramPrompt:
    'Split comparison diagram. Left side "BEFORE" (red/warning): AI agent code file with a hardcoded API_KEY string highlighted, arrow pointing to database with a warning icon. Right side "AFTER" (green/safe): AI agent requests credential from Okta Privileged Access vault via Resource Indicator, vault returns just-in-time credential, agent uses it once, credential auto-expires. Bottom section: credential rotation timeline showing 30-day auto-rotation cycle. Clean flat style, navy and amber palette, technical diagram aesthetic.',
  cards: [
    {
      heading: 'The Hidden Risk: Static Credentials in Agent Code',
      image: 'diagrams/credential-lifecycle.png',
      paragraphs: [
        'AI agents need access to sensitive systems: CRM databases, cloud infrastructure, and internal APIs. Traditionally, developers grant this access by hard-coding API keys or secrets directly into the agent\'s scripts or configuration files. This practice creates a vulnerability: unlike human users who can use Multi-Factor Authentication (MFA), an autonomous agent relies solely on these static strings. If an attacker finds a hard-coded key in a code repository or log file, they have access until that key is manually revoked. [Source: Okta AI Agent Certification, "Eliminate Static Credentials" module, 2026]',
        '!! The certification course contrasts two credential models: static keys persist indefinitely and grant access to anyone who possesses them until manually rotated or revoked. In contrast, dynamically managed credentials are rotated on a schedule (e.g., every 30 days) and retrieved just-in-time by the agent for each task. The agent never stores the credential — it requests it on demand from the vault, uses it for the specific operation, and the vault handles lifecycle management. These are distinct but complementary mechanisms: scheduled rotation limits the window of exposure if a credential is compromised, while just-in-time retrieval prevents credentials from being stored in agent code or memory.',
        'Privileged credential management (part of Okta Privileged Access) vaults secrets and automates rotation on the target system. By shifting to this model, you enforce isolation: vaulted secrets should not appear in the agent\'s code, configuration files, or developer logs. The certification course also notes that agents should use output filtering to prevent vaulted credentials from leaking into conversational responses. [Note: Okta Privileged Access is a separate product/SKU. Verify licensing requirements for your customer\'s deployment.]',
        'The Okta blog series on AI Agent Security names a related pattern "authorization drift" — the gap between when something should lose access and when it actually does. The OWASP Non-Human Identity Top 7 (NHI7) report found that credentials stay active an average of 47 days after they are no longer needed. The Salesloft/Drift breach (August 2025) demonstrated this at scale: 700+ organizations were compromised via OAuth tokens that should have been revoked months earlier. Static credentials are the most severe form of this problem — they have no expiration by design, so the drift period is unbounded. Dynamic, just-in-time credentials with enforced expiration eliminate the drift window entirely: when the task ends, the credential is gone. [Source: Kundan Kolhe, Okta AI Agent Security Series Post 2; OWASP NHI7]',
      ],
      mermaidDiagrams: [
        {
          title: 'Before vs. After: Static Credentials to OPA-Managed Access',
          code: `graph LR
    subgraph Before["BEFORE — Static Credentials"]
        direction TB
        AG1["🤖 Agent Code<br/><i>API_KEY=s3cr3t hardcoded</i>"]
        DB1["🌐 Database<br/><i>No mediation</i>"]
        RISK["❌ Key never expires<br/>Leaked = permanent breach"]
        AG1 -->|"direct connection<br/>static key"| DB1
        DB1 --> RISK
    end

    subgraph After["AFTER — OPA Vault + Resource Indicator"]
        direction TB
        AG2["🤖 Agent<br/><i>Okta identity token only</i>"]
        RI["📋 Resource Indicator<br/><i>an_example_resource_indicator</i>"]
        VAULT["🔐 OPA Vault<br/><i>Auto-rotation every 30 days</i>"]
        DB2["🌐 Database<br/><i>Access mediated by vault</i>"]
        EXPIRE["✅ JIT credential<br/>Expires after task"]
        AG2 -->|"request via indicator"| RI
        RI -->|"retrieve vaulted secret"| VAULT
        VAULT -->|"just-in-time credential"| AG2
        AG2 -->|"scoped, expiring access"| DB2
        DB2 --> EXPIRE
    end

    style Before fill:#f0e6e6,stroke:#c08080,stroke-width:2px
    style After fill:#e6f0eb,stroke:#80b89a,stroke-width:2px
    style AG1 fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5
    style RISK fill:#f0e6e6,stroke:#c08080,stroke-dasharray:5 5
    style VAULT fill:#e8e5f0,stroke:#8b80b8,stroke-width:2px
    style EXPIRE fill:#e6f0eb,stroke:#80b89a`,
          caption: 'Static credentials have no expiration by design — a single leak grants unbounded access. The OPA vault pattern eliminates drift: the agent requests a just-in-time credential via a Resource Indicator, and the credential expires when the task ends.',
        },
      ],
    },
    {
      heading: 'Managed Connections: Binding Identity to Access',
      paragraphs: [
        'After vaulting a secret in Okta Privileged Access, you explicitly authorize your AI agent to use it through Managed Connections. This is the control plane where you bind a specific AI Agent Identity (from the Universal Directory) to a specific privileged credential. This binding ensures that only the authorized agent can request that specific credential. [Source: Okta AI Agent Certification, 2026]',
        '>> To configure a Managed Connection (per the certification course): (1) Prerequisite: verify you have both Super Admin and Security Admin roles, and that the secret or service account is already configured in privileged credential management. (2) In the Okta Admin Console, go to Directory > AI Agents. (3) Select the agent you want to secure. (4) Open the Managed Connections tab. (5) Add a new connection — select the Secret resource type to link a vaulted secret (e.g., "Salesforce Production Key"), or select Service Account for username/password credentials managed in the vault. [Note: Admin Console paths may vary by Okta release version. Verify against current documentation.]',
        'TT "Managed Connections bind a specific agent identity to a specific privileged resource. If the agent is deactivated, the connection is severed. If the credential rotates, the agent retrieves the updated credential on its next request. This reduces manual credential management overhead, though administrators should still verify connections are functioning after rotation events."',
      ],
      labeledCallouts: [
        {
          label: 'Identity-to-Credential Binding',
          labelColor: 'blue',
          text: 'Managed Connections bind a specific AI Agent Identity (registered in Okta\'s Universal Directory) to a specific vaulted secret or service account. Only that agent can request that credential — no other service or agent can access it, even if they hold valid Okta credentials.',
        },
        {
          label: 'Automatic Lifecycle Propagation',
          labelColor: 'blue',
          text: 'If the agent is deactivated in Okta, the Managed Connection is severed and the credential becomes inaccessible to the agent immediately — no manual cleanup required. If the underlying credential rotates in the vault, the agent retrieves the updated credential on its next request without code changes or redeployment.',
        },
        {
          label: 'Supported Resource Types',
          labelColor: 'blue',
          text: 'Two resource types are supported in Managed Connections: Secret (for vaulted API keys and tokens, e.g., "Salesforce Production Key") and Service Account (for username/password credentials managed by the vault). The selection determines how the vault surfaces the credential to the agent at runtime.',
        },
        {
          label: 'Admin Role Requirement',
          labelColor: 'amber',
          text: 'Configuring Managed Connections requires both Super Admin and Security Admin roles. Verify the secret or service account is already configured in privileged credential management before attempting to create the connection. Admin Console paths may vary by Okta release version — verify against current documentation before customer demonstrations.',
        },
      ],
    },
    {
      heading: 'Resource Indicators: The Abstraction Layer',
      paragraphs: [
        'How does a developer write code to retrieve the key if they cannot paste the key itself? They use a Resource Indicator — a human-readable string defined during Managed Connection setup (for example, an_example_resource_indicator). The developer references this indicator in their agent code to request the credential programmatically. This is Okta\'s implementation of an abstraction layer between the agent code and the underlying secret. [Source: Okta AI Agent Certification, 2026. Note: Resource Indicators in this context are Okta\'s implementation pattern — SEs should be aware that RFC 8707 defines a related but broader "Resource Indicators for OAuth 2.0" standard.]',
        '!! Because the agent requests the indicator rather than the specific secret ID, you can rotate the underlying credential or change the target system without requiring developers to modify or redeploy agent code. This decouples credential lifecycle management from application deployment.',
        'After configuring the Resource Indicator and selecting Add, verify the connection by checking that the secret or service account appears as a connected resource in the agent\'s Managed Connections tab. The agent can then programmatically exchange its Okta identity token for the vaulted secret at runtime. [Note: The specific token exchange flow and API calls are documented in the Okta developer documentation for AI Agent credential retrieval.]',
      ],
      conceptGrid: [
        {
          label: 'What a Resource Indicator Is',
          text: 'A human-readable string defined during Managed Connection setup (e.g., an_example_resource_indicator). It is the name the agent code uses to request a specific vaulted credential at runtime — not the credential itself.',
        },
        {
          label: 'The Abstraction Problem It Solves',
          text: 'Developers cannot paste the actual secret into their code — that defeats the entire purpose of vaulting. The Resource Indicator is how the agent code references a credential without ever storing or knowing the credential value.',
        },
        {
          label: 'Decoupled Lifecycle Management',
          text: 'Because the agent requests the indicator (not the secret ID), you can rotate the underlying credential or change the target system without modifying or redeploying agent code. Credential lifecycle and application deployment are fully independent.',
        },
        {
          label: 'Runtime Resolution',
          text: 'At runtime, the agent exchanges its Okta identity token for the vaulted secret by presenting the Resource Indicator to the vault. The vault resolves the indicator to the current credential value and returns it just-in-time. The agent never stores the credential between tasks.',
        },
        {
          label: 'RFC 8707 Relationship',
          text: 'Resource Indicators in this context are Okta\'s implementation pattern for JIT credential retrieval. RFC 8707 defines a related but broader "Resource Indicators for OAuth 2.0" standard governing audience restriction in token requests. SEs should be precise about this distinction when talking to security architects who have read the RFC.',
        },
        {
          label: 'Verification Step',
          text: 'After configuring the Resource Indicator and selecting Add, confirm the connection by checking that the secret or service account appears as a connected resource in the agent\'s Managed Connections tab in the Okta Admin Console.',
        },
      ],
    },
    {
      heading: 'Agent Identity Credentials: RSA Key Pairs',
      paragraphs: [
        'While privileged credential management protects the downstream secrets the agent accesses (such as a Salesforce API key), the AI agent itself also requires credentials to prove its identity to Okta. Instead of static passwords or shared client secrets, the certification course describes using RSA key pairs with the RS256 signing algorithm. The agent holds the private key and uses it to cryptographically sign authentication requests. This approach avoids transmitting shared secrets over the network. [Source: Okta AI Agent Certification, 2026]',
        '>> To manage agent identity credentials (per the certification course): (1) Go to Directory > AI Agents. (2) Select your registered agent. (3) Navigate to the Credentials tab. (4) Select Add public key and choose Generate new key. Okta creates a JSON Web Key (JWK) pair — the system stores the public key, and you download or copy the private key (available in JSON or PEM format) to store in your agent\'s secure environment. [Note: The certification course shows Okta generating the key pair. In some implementations, organizations may prefer generating the key pair locally and uploading only the public key to Okta — check current Okta documentation for supported key management options.] The agent uses this private key to sign its requests to Okta.',
        '!! Operational constraint: an agent must always have at least one active credential. The system prevents you from deleting or deactivating an agent\'s only active key. For key rotation, the recommended practice is: generate a new key, activate it, verify the agent is using the new key, then deactivate or delete the old one.',
        '?? How are your AI agents authenticating to your identity provider today? Are they using shared client secrets, static API keys, or cryptographic key pairs? If an agent\'s credential was intercepted in transit, how long would the attacker have access before the credential is rotated? What is the process for emergency credential revocation?',
      ],
    },
  ],
};
