import type { NavGroup } from './types';

export const NEWSLETTER_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Field Guide Issues',
    items: [
      { slug: 'newsletter-01', label: '#1: The Identity Crisis', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-02', label: '#2: Agent Identity Anatomy', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-03', label: '#3: MCP Protocol', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-04', label: '#4: O4AA Product Map', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-05', label: '#5: Auth Flows', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-06', label: '#6: Discovery', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-07', label: '#7: Competitive', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
      { slug: 'newsletter-08', label: '#8: Putting It Together', icon: '📬', iconImage: 'icons/newsletter.png', isNew: true },
    ],
  },
];

export const NAV_GROUPS: NavGroup[] = [
  {
    groupLabel: 'Foundations',
    items: [
      { slug: 'ai-agents-101', label: 'AI Agents 101', icon: '🤖', iconImage: 'icons/ai-agent.png' },
      { slug: 'agent-identity', label: 'Agent Identity', icon: '👤', iconImage: 'icons/identity.png' },
      { slug: 'mcp-protocol', label: 'MCP Protocol', icon: '📡', iconImage: 'icons/protocol.png', isNew: true },
      { slug: 'a2a-protocol', label: 'A2A Protocol', icon: '🔀', iconImage: 'icons/protocol.png', isNew: true },
    ],
  },
  {
    groupLabel: 'Okta Products',
    items: [
      { slug: 'o4aa-products', label: 'O4AA Product Suite', icon: '🔐', iconImage: 'icons/lock-circuit.png' },
      { slug: 'mcp-adapter', label: 'Agent Gateway & MCP Server', icon: '🔌', iconImage: 'icons/gateway.png' },
      { slug: 'mcp-bridge', label: 'MCP Bridge', icon: '🌉', iconImage: 'icons/bridge.png' },
      { slug: 'auth0-for-agents', label: 'Auth0 for AI Agents', icon: '🔧', iconImage: 'icons/tools.png', isNew: true },
    ],
  },
  {
    groupLabel: 'Auth Flows',
    items: [
      { slug: 'obo-flow', label: 'On-Behalf-Of (OBO)', icon: '🔄', iconImage: 'icons/obo-flow.png' },
      { slug: 'id-jag', label: 'ID-JAG Protocol', icon: '🪪', iconImage: 'icons/id-card.png' },
      { slug: 'xaa-deep-dive', label: 'XAA Deep Dive', icon: '🔗', iconImage: 'icons/chain-link.png', isNew: true },
      { slug: 'agent-relay', label: 'Agent Relay', icon: '🔗', iconImage: 'icons/chain-link.png', isNew: true },
      { slug: 'ciba', label: 'CIBA (Human-in-Loop)', icon: '✋', iconImage: 'icons/hand-approve.png', isNew: true },
      { slug: 'managed-connections', label: 'Managed Connections', icon: '🔗', iconImage: 'icons/chain-link.png', isNew: true },
    ],
  },
  {
    groupLabel: 'Developer',
    items: [
      { slug: 'nhi-management', label: 'NHI Management', icon: '🤖', iconImage: 'icons/ai-agent.png', isNew: true },
      { slug: 'workload-principals', label: 'Workload Principals', icon: '👤', iconImage: 'icons/identity.png', isNew: true },
      { slug: 'agent-rag', label: 'RAG Authorization', icon: '📄', iconImage: 'icons/lock-circuit.png', isNew: true },
      { slug: 'integration-guides', label: 'Integration Guides', icon: '🔧', iconImage: 'icons/tools.png', isNew: true },
      { slug: 's2s-m2m-patterns', label: 'S2S & M2M Patterns', icon: '🔐', iconImage: 'icons/lock-circuit.png', isNew: true },
    ],
  },
  {
    groupLabel: 'Operations',
    items: [
      { slug: 'shadow-ai-discovery', label: 'Discover & Register Agents', icon: '🔍', iconImage: 'icons/discover.png', isNew: true },
      { slug: 'credential-security', label: 'Agent Credential Security', icon: '🔑', iconImage: 'icons/key.png', isNew: true },
      { slug: 'audit-reporting', label: 'Audit & Reporting', icon: '📊', iconImage: 'icons/chart.png' },
      { slug: 'security', label: 'Security', icon: '🛡️', iconImage: 'icons/shield.png' },
      { slug: 'compliance', label: 'Industry Compliance', icon: '⚖️', iconImage: 'icons/scales.png', isNew: true },
      { slug: 'regulatory-frameworks', label: 'AI Security Frameworks', icon: '📋', iconImage: 'icons/scales.png', isNew: true },
    ],
  },
  {
    groupLabel: 'SE Playbook',
    items: [
      { slug: 'demo-playbook', label: 'Demo Playbook', icon: '🎬', iconImage: 'icons/demo.png', isNew: true },
      { slug: 'business-outcomes', label: 'Business Outcomes', icon: '📈', iconImage: 'icons/trending.png', isNew: true },
      { slug: 'use-case-patterns', label: 'Use Case Patterns', icon: '🎯', iconImage: 'icons/target.png', isNew: true },
      { slug: 'competitive', label: 'Competitive Intel', icon: '🏁', iconImage: 'icons/flag.png', isNew: true },
      { slug: 'message-by-persona', label: 'Message by Persona', icon: '🎯', iconImage: 'icons/target.png', isNew: true },
      { slug: 'customer-evidence', label: 'Customer Evidence', icon: '📋', iconImage: 'icons/chart.png', isNew: true },
    ],
  },
  {
    groupLabel: 'Reference',
    items: [
      { slug: 'why-okta', label: 'Why Okta', icon: '⚡', iconImage: 'icons/bolt.png' },
      { slug: 'pricing', label: 'Pricing & Packaging', icon: '💰', iconImage: 'icons/price-tag.png', isNew: true },
      { slug: 'glossary', label: 'Glossary', icon: '📖', iconImage: 'icons/book.png' },
    ],
  },
];

export const ALL_SLUGS = [
  ...NAV_GROUPS.flatMap(g => g.items.map(i => i.slug)),
  ...NEWSLETTER_GROUPS.flatMap(g => g.items.map(i => i.slug)),
];

export const SLUG_MAP = Object.fromEntries([
  ...NAV_GROUPS.flatMap(g => g.items.map(i => [i.slug, i])),
  ...NEWSLETTER_GROUPS.flatMap(g => g.items.map(i => [i.slug, i])),
]) as Record<string, NavGroup['items'][number]>;
