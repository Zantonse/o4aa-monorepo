'use client';

import { useState } from 'react';

interface FlowNode {
  label: string;
  sublabel: string;
}

interface PainPoint {
  label: string;
  mapTo: number; // index into AFTER_FLOW
}

const BEFORE_FLOW: FlowNode[] = [
  { label: 'Employee', sublabel: 'End user' },
  { label: 'Personal OAuth', sublabel: 'No central auth' },
  { label: 'AI Agent', sublabel: 'No identity' },
  { label: 'Hardcoded Key', sublabel: 'Static credential' },
  { label: 'Corporate Systems', sublabel: 'Direct access' },
];

const AFTER_FLOW: FlowNode[] = [
  { label: 'Employee', sublabel: 'Okta SSO' },
  { label: 'Delegated Scope', sublabel: 'On-behalf-of' },
  { label: 'Registered Agent', sublabel: 'Okta Identity' },
  { label: 'Scoped Token', sublabel: 'Token Vault' },
  { label: 'Corporate Systems', sublabel: 'Governed access' },
];

const PAIN_POINTS: PainPoint[] = [
  { label: 'No audit trail', mapTo: 2 },
  { label: 'No revocation', mapTo: 3 },
  { label: 'Over-privileged', mapTo: 4 },
];

const SOLUTIONS = ['Full audit', 'Kill switch', 'Offboard sync'];

export default function BeforeAfterDiagram() {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Before */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-sm font-semibold text-red-700">Before: No Agent Identity</span>
        </div>
        <div className="flex flex-col gap-2">
          {BEFORE_FLOW.map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5">
                <p className="text-sm font-medium text-slate-800">{node.label}</p>
                <p className="text-xs text-red-600">{node.sublabel}</p>
              </div>
              {i < BEFORE_FLOW.length - 1 && (
                <span className="text-red-300 text-lg shrink-0">&darr;</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {PAIN_POINTS.map((pp, i) => (
            <button
              key={i}
              onClick={() => setHighlightIndex(highlightIndex === pp.mapTo ? null : pp.mapTo)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                highlightIndex === pp.mapTo
                  ? 'bg-red-600 text-white'
                  : 'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {pp.label}
            </button>
          ))}
        </div>
      </div>

      {/* After */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="text-sm font-semibold text-emerald-700">After: Okta Agent Identity</span>
        </div>
        <div className="flex flex-col gap-2">
          {AFTER_FLOW.map((node, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`flex-1 rounded-lg border px-4 py-2.5 transition-all ${
                highlightIndex === i
                  ? 'border-emerald-400 bg-emerald-100 ring-2 ring-emerald-300'
                  : 'border-emerald-200 bg-emerald-50'
              }`}>
                <p className="text-sm font-medium text-slate-800">{node.label}</p>
                <p className="text-xs text-emerald-600">{node.sublabel}</p>
              </div>
              {i < AFTER_FLOW.length - 1 && (
                <span className="text-emerald-300 text-lg shrink-0">&darr;</span>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {SOLUTIONS.map((sol, i) => (
            <span key={i} className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full font-medium">
              {sol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
