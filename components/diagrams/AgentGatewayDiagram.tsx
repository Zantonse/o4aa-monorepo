'use client';

import { useState } from 'react';

const LAYERS = [
  {
    num: 7,
    name: 'Proxy',
    color: 'oklch(0.35 0.16 260)',
    bg: 'oklch(0.97 0.01 260)',
    description: 'Injects credentials into outbound request, forwards JSON-RPC to backend MCP server via httpx async, parses SSE responses, handles 401 retry with cache invalidation, manages MCP session state.',
  },
  {
    num: 6,
    name: 'Cache',
    color: 'oklch(0.42 0.18 260)',
    bg: 'oklch(0.96 0.02 260)',
    description: 'Two-tier caching — L1 memory (30s TTL) + L2 Redis (configurable TTL). Cache key: user_id:resource_name. 60-second early refresh prevents token expiry mid-call.',
  },
  {
    num: 5,
    name: 'Token Exchange',
    color: 'oklch(0.38 0.12 160)',
    bg: 'oklch(0.96 0.03 160)',
    description: 'ResourceTokenResolver dispatches to 1 of 8 auth methods based on resource config. Obtains the correct outbound credential for the backend — the core security layer.',
  },
  {
    num: 4,
    name: 'Routing',
    color: 'oklch(0.42 0.18 260)',
    bg: 'oklch(0.96 0.02 260)',
    description: 'Parses tool namespace ({resource}__{tool}) to determine which backend MCP server handles the call. Resolves resource config from ResourceStore, merging DB config with OktaConnectionSyncer.',
  },
  {
    num: 3,
    name: 'Authorization',
    color: 'oklch(0.40 0.12 55)',
    bg: 'oklch(0.97 0.03 85)',
    description: 'Resolves agent identity from X-MCP-Agent header (or token aud/cid fallback). Enforces the agent\'s resource_access ACL — the list of backends this specific agent may call.',
  },
  {
    num: 2,
    name: 'Authentication',
    color: 'oklch(0.38 0.12 160)',
    bg: 'oklch(0.96 0.03 160)',
    description: 'Validates agent JWT against Okta JWKS. Supports CIMD for token lookup via Confidential Relay. Resolves client through registry (pre-registered, CIMD, or DCR).',
  },
  {
    num: 1,
    name: 'Transport',
    color: 'oklch(0.35 0.16 260)',
    bg: 'oklch(0.97 0.01 260)',
    description: 'Handles Streamable HTTP and MCP JSON-RPC dispatch. Accepts POST requests to unified handler. Routes based on path.',
  },
];

export default function AgentGatewayDiagram() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-0">
      {/* MCP Clients label */}
      <div className="flex items-center justify-center gap-3 mb-4">
        {['Claude Code', 'Cursor', 'Copilot', 'Custom Agents'].map(name => (
          <span
            key={name}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-md"
            style={{
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {name}
          </span>
        ))}
      </div>

      {/* Arrow down */}
      <div className="flex justify-center mb-2">
        <svg width="20" height="24" viewBox="0 0 20 24">
          <path d="M10 0 L10 18 M4 14 L10 20 L16 14" stroke="var(--color-text-muted)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Gateway box */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          border: '2px solid var(--color-primary-300)',
          background: 'var(--color-surface)',
        }}
      >
        <div
          className="px-4 py-2.5 text-center"
          style={{
            background: 'linear-gradient(135deg, oklch(0.28 0.14 260), oklch(0.35 0.16 260))',
          }}
        >
          <span className="text-[13px] font-bold text-white uppercase" style={{ letterSpacing: '0.1em' }}>
            Agent Gateway — 7-Layer Pipeline
          </span>
        </div>

        {LAYERS.map(layer => {
          const isExpanded = expanded === layer.num;
          return (
            <button
              key={layer.num}
              className="w-full text-left transition-all duration-200"
              style={{
                borderBottom: '1px solid var(--color-border-subtle)',
                background: isExpanded ? layer.bg : 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => setExpanded(isExpanded ? null : layer.num)}
            >
              <div className="flex items-center gap-3 px-4 py-2.5">
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[12px] font-bold text-white"
                  style={{ background: layer.color }}
                >
                  {layer.num}
                </span>
                <span
                  className="text-[14px] font-semibold flex-1"
                  style={{ color: isExpanded ? layer.color : 'var(--color-text)' }}
                >
                  {layer.name}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="transition-transform duration-200"
                  style={{
                    transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <path d="M4 6 L8 10 L12 6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </div>
              {isExpanded && (
                <div className="px-4 pb-3 pl-14">
                  <p className="text-[13px] leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {layer.description}
                  </p>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Arrow down */}
      <div className="flex justify-center mt-2 mb-4">
        <svg width="20" height="24" viewBox="0 0 20 24">
          <path d="M10 0 L10 18 M4 14 L10 20 L16 14" stroke="var(--color-text-muted)" strokeWidth="2" fill="none" />
        </svg>
      </div>

      {/* Backend MCP Servers */}
      <div className="flex items-center justify-center gap-3">
        {['HR System', 'GitHub', 'Salesforce', 'Jira', 'Vault'].map(name => (
          <span
            key={name}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-md"
            style={{
              background: 'var(--color-success-bg)',
              border: '1px solid var(--color-success-border)',
              color: 'var(--color-success-text)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
