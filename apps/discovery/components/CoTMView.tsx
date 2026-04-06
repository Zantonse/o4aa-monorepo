'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CoTMPillar, CoTMPillarId } from '@/lib/types';

interface CoTMViewProps {
  pillars: CoTMPillar[];
}

const PILLAR_COLORS: Record<CoTMPillarId, { border: string; heading: string; badge: string; badgeText: string }> = {
  pbo: {
    border: 'border-indigo-200',
    heading: 'text-indigo-700',
    badge: 'bg-indigo-100',
    badgeText: 'text-indigo-700',
  },
  'required-capabilities': {
    border: 'border-blue-200',
    heading: 'text-blue-700',
    badge: 'bg-blue-100',
    badgeText: 'text-blue-700',
  },
  'success-metrics': {
    border: 'border-emerald-200',
    heading: 'text-emerald-700',
    badge: 'bg-emerald-100',
    badgeText: 'text-emerald-700',
  },
  'before-after': {
    border: 'border-amber-200',
    heading: 'text-amber-700',
    badge: 'bg-amber-100',
    badgeText: 'text-amber-700',
  },
  'decision-process': {
    border: 'border-rose-200',
    heading: 'text-rose-700',
    badge: 'bg-rose-100',
    badgeText: 'text-rose-700',
  },
};

export default function CoTMView({ pillars }: CoTMViewProps) {
  // Track copied state per question: key = `${pillarId}-${index}`
  const [copiedKeys, setCopiedKeys] = useState<Record<string, boolean>>({});

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKeys((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopiedKeys((prev) => ({ ...prev, [key]: false }));
      }, 2000);
    } catch {
      // clipboard write failed silently
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {pillars.map((pillar) => {
        const colors = PILLAR_COLORS[pillar.id] ?? PILLAR_COLORS['pbo'];

        return (
          <div
            key={pillar.id}
            className={`bg-white border ${colors.border} rounded-xl shadow-sm overflow-hidden`}
          >
            {/* Pillar header */}
            <div className="px-5 py-4 border-b border-slate-100">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <h3 className={`text-sm font-semibold ${colors.heading} truncate`}>
                    {pillar.name}
                  </h3>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors.badge} ${colors.badgeText} shrink-0`}
                  >
                    {pillar.questions.length} {pillar.questions.length === 1 ? 'question' : 'questions'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{pillar.description}</p>
            </div>

            {/* Questions */}
            <ul className="divide-y divide-slate-50">
              {pillar.questions.map((question, idx) => {
                const key = `${pillar.id}-${idx}`;
                const isCopied = copiedKeys[key] ?? false;

                return (
                  <li key={key} className="flex items-start gap-3 px-5 py-3 group hover:bg-slate-50 transition-colors">
                    <span className="mt-0.5 shrink-0 text-xs font-semibold text-slate-400 w-5 text-right">
                      {idx + 1}.
                    </span>
                    <p className="flex-1 text-sm text-slate-700 leading-relaxed">{question}</p>
                    <button
                      onClick={() => handleCopy(question, key)}
                      title="Copy question"
                      className="shrink-0 mt-0.5 p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    >
                      {isCopied ? (
                        <Check size={14} className="text-emerald-500" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
