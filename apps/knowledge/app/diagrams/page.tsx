'use client';

import { useState } from 'react';
import AgentGatewayDiagram from '@/components/diagrams/AgentGatewayDiagram';
import BeforeAfterDiagram from '@/components/diagrams/BeforeAfterDiagram';
import XAAFlowDiagram from '@/components/diagrams/XAAFlowDiagram';
import ProductCoverageMap from '@/components/diagrams/ProductCoverageMap';

const DIAGRAMS = [
  {
    id: 'gateway',
    title: 'Agent Gateway Pipeline',
    subtitle: '7-layer proxy architecture — click each layer to expand',
    icon: '🔌',
  },
  {
    id: 'before-after',
    title: 'Before / After O4AA',
    subtitle: 'Identity posture comparison — the pain vs the solution',
    icon: '⚡',
  },
  {
    id: 'xaa-flow',
    title: 'XAA Token Exchange Flow',
    subtitle: '4-step delegation — animated sequential walkthrough',
    icon: '🔗',
  },
  {
    id: 'coverage',
    title: 'Product Coverage Map',
    subtitle: 'Discover → Onboard → Protect → Govern — which product covers what',
    icon: '🗺️',
  },
];

export default function DiagramsPage() {
  const [activeDiagram, setActiveDiagram] = useState('gateway');

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1
          className="text-[22px] font-bold mb-1"
          style={{ color: 'var(--color-primary-700)', letterSpacing: '-0.02em' }}
        >
          Interactive Diagrams
        </h1>
        <p className="text-[14px]" style={{ color: 'var(--color-text-muted)' }}>
          Visual architecture references for customer conversations and demo prep.
        </p>
      </div>

      {/* Diagram selector tabs */}
      <div
        className="flex gap-2 mb-6 pb-4"
        style={{ borderBottom: '1px solid var(--color-border)' }}
      >
        {DIAGRAMS.map(d => {
          const isActive = activeDiagram === d.id;
          return (
            <button
              key={d.id}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-left transition-all duration-150"
              style={{
                background: isActive ? 'var(--color-primary-50)' : 'transparent',
                border: isActive ? '1px solid var(--color-primary-100)' : '1px solid transparent',
                cursor: 'pointer',
              }}
              onClick={() => setActiveDiagram(d.id)}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-alt)';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              <span className="text-[16px]">{d.icon}</span>
              <div>
                <p
                  className="text-[13px] font-semibold"
                  style={{ color: isActive ? 'var(--color-primary-700)' : 'var(--color-text)' }}
                >
                  {d.title}
                </p>
                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                  {d.subtitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Diagram content */}
      <div
        className="rounded-xl p-6"
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: 'var(--shadow-subtle)',
        }}
      >
        {activeDiagram === 'gateway' && <AgentGatewayDiagram />}
        {activeDiagram === 'before-after' && <BeforeAfterDiagram />}
        {activeDiagram === 'xaa-flow' && <XAAFlowDiagram />}
        {activeDiagram === 'coverage' && <ProductCoverageMap />}
      </div>
    </div>
  );
}
