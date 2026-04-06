'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import AgentGatewayDiagram from './diagrams/AgentGatewayDiagram';
import BeforeAfterDiagram from './diagrams/BeforeAfterDiagram';
import CrossAppAccessDiagram from './diagrams/CrossAppAccessDiagram';
import ArchetypeLandscapeDiagram from './diagrams/ArchetypeLandscapeDiagram';

interface DiagramCard {
  id: string;
  title: string;
  description: string;
  badge: string;
  image: string;
  component: React.ComponentType;
}

const DIAGRAMS: DiagramCard[] = [
  {
    id: 'agent-gateway',
    title: 'Agent Gateway',
    description: '7-layer proxy architecture — how every AI agent API call is intercepted, authenticated, authorized, and audited.',
    badge: 'Interactive',
    image: '/illustrations/diagram-agent-gateway.png',
    component: AgentGatewayDiagram,
  },
  {
    id: 'before-after',
    title: 'Before / After Identity Flows',
    description: 'Side-by-side comparison of unmanaged vs. Okta-managed AI agent identity flows.',
    badge: 'Side-by-side',
    image: '/illustrations/diagram-before-after.png',
    component: BeforeAfterDiagram,
  },
  {
    id: 'cross-app-access',
    title: 'Cross-App Access Token Flow',
    description: 'How an AI agent exchanges tokens to access a second application on behalf of a user (RFC 8693).',
    badge: 'Animated',
    image: '/illustrations/diagram-cross-app-access.png',
    component: CrossAppAccessDiagram,
  },
  {
    id: 'archetype-landscape',
    title: 'Archetype Landscape',
    description: 'Visual map of all customer archetypes sized by transcript volume. Click any block to view insights.',
    badge: 'Data-driven',
    image: '/illustrations/diagram-archetype-landscape.png',
    component: ArchetypeLandscapeDiagram,
  },
];

export default function DiagramsPage() {
  const [activeDiagram, setActiveDiagram] = useState<string | null>(null);

  // Handle hash-based navigation (e.g., /diagrams#agent-gateway)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && DIAGRAMS.some(d => d.id === hash)) {
      setActiveDiagram(hash);
    }
  }, []);

  const active = DIAGRAMS.find(d => d.id === activeDiagram);

  if (active) {
    const DiagramComponent = active.component;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveDiagram(null)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            &larr; All Diagrams
          </button>
          <span className="text-slate-300">/</span>
          <span className="text-sm font-medium text-slate-700">{active.title}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
            active.badge === 'Interactive' ? 'bg-blue-100 text-blue-700' :
            active.badge === 'Side-by-side' ? 'bg-emerald-100 text-emerald-700' :
            active.badge === 'Animated' ? 'bg-violet-100 text-violet-700' :
            'bg-amber-100 text-amber-700'
          }`}>
            {active.badge}
          </span>
        </div>
        <p className="text-sm text-slate-500">{active.description}</p>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <DiagramComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Reference Diagrams</h1>
        <p className="text-sm text-slate-500 mt-1">
          Interactive architecture diagrams for demos and customer conversations. Click to explore, right-click to save.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {DIAGRAMS.map((diagram) => (
          <button
            key={diagram.id}
            onClick={() => setActiveDiagram(diagram.id)}
            className="group bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:border-blue-200 transition-all text-left"
          >
            <div className="aspect-video flex items-center justify-center overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)' }}>
              <Image
                src={diagram.image}
                alt={diagram.title}
                width={560}
                height={315}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="px-5 py-4">
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-sm font-semibold text-slate-800">{diagram.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  diagram.badge === 'Interactive' ? 'bg-blue-100 text-blue-700' :
                  diagram.badge === 'Side-by-side' ? 'bg-emerald-100 text-emerald-700' :
                  diagram.badge === 'Animated' ? 'bg-violet-100 text-violet-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {diagram.badge}
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">{diagram.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
