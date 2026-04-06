'use client';

import { useState } from 'react';
import { Copy, Check, ClipboardList } from 'lucide-react';
import { FlowStep } from '@/lib/types';

interface FlowViewProps {
  steps: FlowStep[];
}

const SECTION_COLORS: Record<string, { badge: string; badgeText: string; dot: string }> = {
  Opening: { badge: 'bg-blue-100', badgeText: 'text-blue-700', dot: 'bg-blue-400' },
  'Pain Exploration': { badge: 'bg-rose-100', badgeText: 'text-rose-700', dot: 'bg-rose-400' },
  'Business Impact': { badge: 'bg-amber-100', badgeText: 'text-amber-700', dot: 'bg-amber-400' },
  'Technical Reality': { badge: 'bg-violet-100', badgeText: 'text-violet-700', dot: 'bg-violet-400' },
  'Decision Process': { badge: 'bg-emerald-100', badgeText: 'text-emerald-700', dot: 'bg-emerald-400' },
  'Next Steps': { badge: 'bg-slate-100', badgeText: 'text-slate-700', dot: 'bg-slate-400' },
};

const DEFAULT_COLOR = { badge: 'bg-slate-100', badgeText: 'text-slate-700', dot: 'bg-slate-400' };

export default function FlowView({ steps }: FlowViewProps) {
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copySection = async (step: FlowStep) => {
    const text = step.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSectionId(step.id);
      setTimeout(() => setCopiedSectionId(null), 2000);
    } catch {
      // clipboard write failed silently
    }
  };

  const copyAll = async () => {
    const lines: string[] = [];
    let globalNum = 1;
    steps.forEach((step) => {
      lines.push(`=== ${step.section} ===`);
      step.questions.forEach((q) => {
        lines.push(`${globalNum}. ${q}`);
        globalNum++;
      });
      lines.push('');
    });
    try {
      await navigator.clipboard.writeText(lines.join('\n').trim());
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // clipboard write failed silently
    }
  };

  // Running question number across all sections
  let globalCounter = 0;

  return (
    <div className="flex flex-col gap-6">
      {/* Copy full flow button */}
      <div className="flex justify-end">
        <button
          onClick={copyAll}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg px-4 py-2 transition-colors shadow-sm"
        >
          {copiedAll ? (
            <>
              <Check size={15} className="text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardList size={15} />
              Copy full flow
            </>
          )}
        </button>
      </div>

      {/* Steps */}
      {steps.map((step, stepIdx) => {
        const colors = SECTION_COLORS[step.section] ?? DEFAULT_COLOR;
        const sectionStartNum = globalCounter + 1;
        globalCounter += step.questions.length;
        const isLastStep = stepIdx === steps.length - 1;

        return (
          <div key={step.id} className="relative flex gap-4">
            {/* Timeline line */}
            {!isLastStep && (
              <div className="absolute left-[18px] top-10 bottom-0 w-px bg-slate-200" />
            )}

            {/* Timeline dot */}
            <div className="shrink-0 mt-1">
              <div className={`w-9 h-9 rounded-full ${colors.badge} flex items-center justify-center`}>
                <span className={`text-xs font-bold ${colors.badgeText}`}>{stepIdx + 1}</span>
              </div>
            </div>

            {/* Section content */}
            <div className="flex-1 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-2">
              {/* Section header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold uppercase tracking-wide ${colors.badgeText}`}>
                    {step.section}
                  </span>
                  <span className="text-xs text-slate-400">
                    {step.questions.length} {step.questions.length === 1 ? 'question' : 'questions'}
                  </span>
                </div>
                <button
                  onClick={() => copySection(step)}
                  title="Copy all questions in this section"
                  className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 bg-white border border-slate-200 hover:border-slate-300 rounded-md px-2.5 py-1 transition-colors"
                >
                  {copiedSectionId === step.id ? (
                    <>
                      <Check size={12} className="text-emerald-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      Copy section
                    </>
                  )}
                </button>
              </div>

              {/* Questions */}
              <ol className="divide-y divide-slate-50">
                {step.questions.map((question, qIdx) => {
                  const num = sectionStartNum + qIdx;
                  return (
                    <li key={qIdx} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors">
                      <span className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-slate-100 text-slate-500 text-xs font-semibold flex items-center justify-center">
                        {num}
                      </span>
                      <p className="flex-1 text-sm text-slate-700 leading-relaxed">{question}</p>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        );
      })}
    </div>
  );
}
