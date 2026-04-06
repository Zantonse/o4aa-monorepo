import type { SectionContent } from '../types';

export const content: SectionContent = {
  slug: 'glossary',
  title: 'Glossary',
  description:
    'Definitions for the key terms, protocols, and concepts used across the O4AA Knowledge Hub — organized by category for quick reference.',
  tags: ['reference', 'definitions', 'protocols', 'concepts', 'se-enablement'],
  icon: '📖',
  hasDiagram: false,
  diagramPrompt: '',
  cards: [
    {
      heading: 'Protocol Terms',
      paragraphs: [
        'Key OAuth and protocol standards underlying O4AA. Understanding these is prerequisite for technical discovery conversations.',
      ],
      conceptGrid: [
        {
          label: 'MCP (Model Context Protocol)',
          text: 'An open standard for AI agents to discover and call tools. Defines how an AI client connects to an MCP server, enumerates available tools, and invokes them. Transports include STDIO (local, no auth) and Streamable HTTP (remote, optional OAuth 2.1). Auth is deliberately optional in the spec.',
        },
        {
          label: 'OAuth 2.0 Token Exchange (RFC 8693)',
          text: "A standard grant type that allows a client to exchange one token for another — used by Okta to implement On-Behalf-Of delegation. The exchanged token carries the user's identity (sub claim) and the service app's client ID (cid claim). Note: Okta's implementation does not emit the RFC 8693 act (actor) claim as a structured JWT claim.",
        },
        {
          label: 'On-Behalf-Of (OBO)',
          text: 'The pattern in which an AI agent obtains a token to act on behalf of a specific user, rather than acting as itself. Implemented via RFC 8693 token exchange in Okta. GA in Okta Workforce Identity Cloud.',
        },
        {
          label: 'ID-JAG (Identity Assertion JWT Authorization Grant)',
          text: 'An adopted IETF OAuth Working Group draft (draft-ietf-oauth-identity-assertion-authz-grant-02). The token type used by Cross App Access (XAA). A short-lived JWT signed by Okta that asserts a user\'s identity and that a requesting app has been trusted by the enterprise. System Log event app.oauth2.token.grant.id_jag is EA in Preview since August 2025.',
        },
        {
          label: '!! Cross App Access (XAA)',
          text: "Okta's protocol for enterprise-governed agent-to-app and app-to-app access. Replaces scattered integrations with centralized IT admin control over which apps connect and what they can access. Self-service Early Access. Test at xaa.dev.",
        },
        {
          label: 'Enterprise-Managed Authorization',
          text: "Okta's Cross App Access (XAA) protocol integrated into MCP (Model Context Protocol) as a standard for enterprise-grade secure agent connections. Not to be confused with RFC 8707 Resource Indicators, which is a related but broader OAuth standard.",
        },
        {
          label: 'IPSIE (Interoperability Profile for Secure Identity in the Enterprise)',
          text: 'Cross-vendor standard enabling Universal Logout with sub-second revocation. Used by Okta for AI agent deactivation and enterprise-wide token revocation.',
        },
      ],
    },
    {
      heading: 'Okta Product Terms',
      paragraphs: [
        'Product names, capabilities, and internal terms used across O4AA. Accurate naming matters in technical calls — know which surface each capability lives on.',
      ],
      conceptGrid: [
        {
          label: 'O4AA (Okta for AI Agents)',
          text: "The umbrella term for Okta's identity capabilities designed for AI and agentic systems — including XAA, OBO Token Exchange, Auth0 FGA, Privileged Credential Management, the Agent Gateway, and the Okta MCP Server.",
        },
        {
          label: 'Auth0 Fine Grained Authorization (FGA)',
          text: 'Relationship-based access control, branded under Auth0 (not Okta WIC). Managed service at dashboard.fga.dev. Built on OpenFGA (CNCF incubating). Answers "does THIS agent have permission to access THIS specific resource on behalf of THIS user?"',
        },
        {
          label: 'Privileged Credential Management (GA April 30, 2026)',
          text: "Okta's secure credential storage and lifecycle management for agent tokens. Centralizes third-party OAuth tokens and API keys — agents hold reference pointers, not raw credentials. Handles refresh, rotation, and revocation. A capability within O4AA, not a separately named SKU.",
        },
        {
          label: 'Okta MCP Server',
          text: 'An open-source MCP server (github.com/okta/okta-mcp-server) that exposes Okta Admin Management APIs to LLMs. Enables AI agents to manage the Okta tenant via natural language (user/group management, system logs, policies). Shipped and GA.',
        },
        {
          label: 'Agent Gateway (GA April 30, 2026)',
          text: "Okta's centralized MCP control plane — a self-hosted OAuth 2.1 authorization gateway that sits between AI agents and backend MCP servers. Authenticates agents via Okta, brokers token exchange, enforces per-agent ACLs, and produces a full audit trail. For current agent-to-app auth without Agent Gateway, use XAA + OBO Token Exchange.",
        },
        {
          label: 'SAM (Okta Secure Access Monitor)',
          text: 'A browser extension deployed to managed browsers that monitors for new OAuth grants. SAM feeds data into ISPM for shadow AI agent detection. Prerequisite for the Detect phase of O4AA governance.',
        },
        {
          label: 'AI Agent Directory',
          text: 'Referenced in Okta blog series as a distinct entity alongside Universal Directory for managing AI agent identities. Verify against current product documentation for availability status.',
        },
        {
          label: 'Workload Principal',
          text: 'In Okta, the identity type assigned to a registered AI agent. A first-class identity in the agent registry with a unique ID prefixed with wlp. Distinct from service accounts — workload principals have mandatory human owners and participate in governance workflows.',
        },
        {
          label: 'APEX',
          text: "Okta's internal sales methodology framework. O4AA discovery questions and business outcomes in this knowledge app map to APEX stages. APEX resources for O4AA are available in Highspot.",
        },
      ],
    },
    {
      heading: 'Security Concepts',
      paragraphs: [
        'Attack patterns and security principles that come up in O4AA technical and risk conversations. Use these to sharpen discovery questions and explain why agent identity controls matter.',
      ],
      conceptGrid: [
        {
          label: 'Confused Deputy',
          text: 'A security vulnerability in which a trusted intermediary (like an AI agent) is manipulated into misusing its privileges on behalf of an attacker. The MCP spec explicitly prohibits token passthrough (forwarding client tokens to upstream APIs) to prevent this. Mitigated by minimal-scope tokens and Auth0 FGA.',
        },
        {
          label: 'Minimal Privilege',
          text: 'The principle that every entity (including AI agents) should have only the permissions needed for the current task — not blanket permissions for all possible tasks. In agentic systems, this means per-call token narrowing via RFC 8693 Token Exchange.',
        },
        {
          label: 'Workload Identity',
          text: 'The identity of a non-human service or agent — distinct from user identity. Workload identities authenticate as themselves; Okta extends this with OBO to allow workloads to also act on behalf of users.',
        },
        {
          label: 'Principal Hierarchy',
          text: 'The chain of entities involved in an agentic transaction — typically Human User → Orchestrator Agent → Sub-Agent → Tool. Each level in the hierarchy must have appropriate authorization, and no level can exceed what the level above it was authorized to do.',
        },
        {
          label: 'Authorization Drift',
          text: 'The gap between when an identity should lose access and when it actually does. OWASP NHI7 found credentials stay active an average of 47 days past when they are no longer needed. Central risk concept for O4AA credential security conversations.',
        },
        {
          label: 'Agent Session Smuggling',
          text: 'Attack technique documented by Palo Alto Unit 42: a sub-agent embeds unauthorized actions inside a routine response, exploiting absence of scope attenuation in multi-hop delegation chains. XAA/ID-JAG scope attenuation is the architectural countermeasure.',
        },
        {
          label: 'Permission Intersection Problem',
          text: "In shared workspace contexts (Slack, Teams), an agent may retrieve data authorized for one user and surface it to another. Fix requires computing the intersection of all recipients' permissions before data leaves the retrieval layer. Auth0 FGA batchCheck is the technical solution.",
        },
      ],
    },
    {
      heading: 'Agent Architecture Concepts',
      paragraphs: [
        'Architectural patterns and component roles in agentic systems. Knowing these helps SEs map customer architectures to Okta capabilities in discovery and design conversations.',
      ],
      conceptGrid: [
        {
          label: 'Agentic Workflow',
          text: 'A multi-step automated process in which an AI agent reasons, plans, and takes actions across multiple systems to accomplish a goal — rather than responding to a single request.',
        },
        {
          label: 'Tool Call (Function Calling)',
          text: 'The mechanism by which an AI agent invokes an external capability — a search API, a database, a calendar service. Each tool call is a real API request that requires authorization.',
        },
        {
          label: 'Orchestrator Agent',
          text: "An AI agent responsible for decomposing a high-level goal into subtasks and coordinating specialized sub-agents to execute them. The orchestrator holds the user's delegation and issues further delegations to sub-agents.",
        },
        {
          label: 'Sub-Agent',
          text: 'A specialized AI agent that executes a specific class of tasks (e.g., web search, code execution, email). Receives delegated authorization from an orchestrator — scoped to its specific capabilities.',
        },
        {
          label: 'Stateless Authorization',
          text: 'The principle that each API call is independently authorized against current credentials, rather than relying on session state from a previous step. Enables per-call auditing and honors revocations immediately.',
        },
      ],
    },
  ],
};
