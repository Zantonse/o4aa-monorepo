'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Layer {
  name: string;
  description: string;
  products: string[];
}

const LAYERS: Layer[] = [
  {
    name: 'Traffic Interception',
    description: 'Intercepts and redirects all AI agent API calls through the gateway. No agent communicates directly with downstream services.',
    products: ['Okta Agent Gateway (Proxy Mode)'],
  },
  {
    name: 'Protocol Mediation',
    description: 'Normalizes diverse agent protocols (REST, gRPC, MCP) into a standard identity-enriched request format.',
    products: ['Okta Agent Gateway (Protocol Adapter)'],
  },
  {
    name: 'Authentication',
    description: 'Validates agent identity using OAuth 2.0 client credentials, mTLS certificates, or delegated user tokens.',
    products: ['Okta Identity Engine', 'Auth0 for AI Agents'],
  },
  {
    name: 'Identity Resolution',
    description: 'Maps the authenticated agent to its registered identity in Universal Directory, resolving the human owner and organizational context.',
    products: ['Okta Universal Directory'],
  },
  {
    name: 'Authorization (FGA/Policy)',
    description: 'Evaluates fine-grained authorization policies — which resources this agent can access, at what scope, under what conditions.',
    products: ['Okta FGA', 'Auth0 Fine-Grained Authorization'],
  },
  {
    name: 'Credential Translation',
    description: 'Translates the agent\'s scoped token into downstream service credentials (API keys, database tokens, SaaS OAuth tokens) via Token Vault.',
    products: ['Auth0 Token Vault'],
  },
  {
    name: 'Observability & Audit',
    description: 'Logs every agent action with full identity context — who, what, when, on whose behalf — for compliance and threat detection.',
    products: ['Okta System Log', 'Okta Identity Threat Protection'],
  },
];

export default function AgentGatewayDiagram() {
  const [expandedLayer, setExpandedLayer] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-1">
      {LAYERS.map((layer, i) => {
        const isExpanded = expandedLayer === i;
        // Gradient from dark navy (top) to lighter blue (bottom)
        const opacity = 1 - (i * 0.08);
        const bgFrom = `rgba(0, 41, 122, ${opacity})`;
        const bgTo = `rgba(59, 130, 246, ${opacity})`;

        return (
          <button
            key={i}
            onClick={() => setExpandedLayer(isExpanded ? null : i)}
            className="text-left rounded-lg overflow-hidden transition-all"
          >
            <div
              className="px-5 py-3.5 flex items-center justify-between"
              style={{ background: `linear-gradient(135deg, ${bgFrom}, ${bgTo})` }}
            >
              <div className="flex items-center gap-3">
                <span className="text-white/60 text-xs font-mono tabular-nums w-4">{i + 1}</span>
                <span className="text-white font-medium text-sm">{layer.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </div>
            {isExpanded && (
              <div className="bg-white px-5 py-4 border-x border-b border-slate-200">
                <p className="text-sm text-slate-700 mb-3">{layer.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {layer.products.map((product, j) => (
                    <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
