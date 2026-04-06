'use client';

import { useState } from 'react';

interface Product {
  name: string;
  short: string;
  color: string;
  pillars: string[];
  description: string;
}

const PILLARS = ['Discover', 'Onboard', 'Protect', 'Govern'];

const PRODUCTS: Product[] = [
  {
    name: 'ISPM + SAM',
    short: 'Discovery',
    color: 'oklch(0.42 0.18 260)',
    pillars: ['Discover'],
    description: 'Shadow AI agent discovery via Secure Access Monitor (browser plugin) and ISPM platform scanning. Connects to Microsoft Copilot Studio, Salesforce Agentforce, and other agent platforms.',
  },
  {
    name: 'Universal Directory',
    short: 'Agent Registry',
    color: 'oklch(0.35 0.16 260)',
    pillars: ['Onboard'],
    description: 'Registers AI agents as Workload Principals with unique wlp_ identifiers. Every agent gets a named human owner, RS256 key pair credentials, and lifecycle management.',
  },
  {
    name: 'XAA / ID-JAG',
    short: 'Cross-App Access',
    color: 'oklch(0.38 0.12 160)',
    pillars: ['Protect'],
    description: 'Enterprise-governed cross-app delegation via Identity Assertion JWT. IT admins create managed connections. sub + client_id dual identity in every token.',
  },
  {
    name: 'Agent Gateway',
    short: 'MCP Security',
    color: 'oklch(0.38 0.12 160)',
    pillars: ['Protect'],
    description: '7-layer proxy pipeline between AI agents and MCP servers. 8 auth methods, per-agent ACLs, full audit trail. Zero credentials exposed to agents.',
  },
  {
    name: 'Auth0 FGA',
    short: 'Fine-Grained Authz',
    color: 'oklch(0.38 0.12 160)',
    pillars: ['Protect'],
    description: 'Relationship-based access control for per-resource, per-action authorization. RAG document filtering, MCP tool-level access control.',
  },
  {
    name: 'Auth0 Token Vault',
    short: 'Credential Mgmt',
    color: 'oklch(0.38 0.12 160)',
    pillars: ['Protect'],
    description: '35+ pre-built OAuth integrations. Agents retrieve per-user scoped tokens at runtime. No credentials in agent code. Auto-refresh and rotation.',
  },
  {
    name: 'CIBA',
    short: 'Human-in-the-Loop',
    color: 'oklch(0.40 0.12 55)',
    pillars: ['Protect', 'Govern'],
    description: 'Client-Initiated Backchannel Authentication for explicit per-action human approval. Agent pauses, user approves on device, agent proceeds.',
  },
  {
    name: 'OIG',
    short: 'Governance',
    color: 'oklch(0.40 0.12 55)',
    pillars: ['Govern'],
    description: 'Access certification campaigns for AI agent entitlements. Request-approval workflows. Time-bound access grants. SOX/HIPAA compliance evidence.',
  },
  {
    name: 'ITP',
    short: 'Threat Detection',
    color: 'oklch(0.40 0.12 55)',
    pillars: ['Govern'],
    description: 'Behavioral anomaly detection for AI agent activity. Feeds CAEP signals to Universal Logout for real-time session revocation.',
  },
  {
    name: 'Universal Logout',
    short: 'Kill Switch',
    color: 'oklch(0.45 0.18 25)',
    pillars: ['Govern'],
    description: 'Sub-second agent session termination via CAEP/SSF signal propagation. Revokes tokens, sessions, and credentials across all connected systems.',
  },
];

export default function ProductCoverageMap() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const filteredProducts = selectedPillar
    ? PRODUCTS.filter(p => p.pillars.includes(selectedPillar))
    : PRODUCTS;

  return (
    <div>
      {/* Pillar selector */}
      <div className="flex items-center justify-center gap-2 mb-6">
        <button
          className="px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
          style={{
            background: !selectedPillar ? 'var(--color-primary-700)' : 'var(--color-surface-alt)',
            color: !selectedPillar ? 'white' : 'var(--color-text-muted)',
            border: !selectedPillar ? 'none' : '1px solid var(--color-border)',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedPillar(null)}
        >
          All
        </button>
        {PILLARS.map((pillar, i) => (
          <button
            key={pillar}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all"
            style={{
              background: selectedPillar === pillar ? 'var(--color-primary-700)' : 'var(--color-surface-alt)',
              color: selectedPillar === pillar ? 'white' : 'var(--color-text-muted)',
              border: selectedPillar === pillar ? 'none' : '1px solid var(--color-border)',
              cursor: 'pointer',
            }}
            onClick={() => setSelectedPillar(selectedPillar === pillar ? null : pillar)}
          >
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold"
              style={{
                background: selectedPillar === pillar ? 'oklch(1 0 0 / 0.2)' : 'var(--color-primary-50)',
                color: selectedPillar === pillar ? 'white' : 'var(--color-primary-500)',
              }}
            >
              {i + 1}
            </span>
            {pillar}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-3">
        {filteredProducts.map(product => {
          const isHovered = hoveredProduct === product.name;
          return (
            <div
              key={product.name}
              className="rounded-xl transition-all duration-200 overflow-hidden"
              style={{
                border: isHovered ? `2px solid ${product.color}` : '1px solid var(--color-border)',
                background: 'var(--color-surface)',
                cursor: 'default',
                boxShadow: isHovered ? `0 4px 16px oklch(0.28 0.14 260 / 0.12)` : 'none',
              }}
              onMouseEnter={() => setHoveredProduct(product.name)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="flex items-center gap-2.5 px-3.5 py-2.5" style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: product.color }}
                />
                <span className="text-[13px] font-semibold" style={{ color: 'var(--color-text)' }}>
                  {product.name}
                </span>
                <span
                  className="ml-auto text-[10px] font-bold uppercase px-2 py-0.5 rounded"
                  style={{
                    background: 'var(--color-surface-alt)',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {product.pillars.join(' + ')}
                </span>
              </div>
              <div className="px-3.5 py-2.5">
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {product.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
