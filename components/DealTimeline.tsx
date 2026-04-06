'use client';

import type { DealProgression } from '@/lib/archetype-types';
import type { IndustryColorScheme } from '@/lib/industry-colors';

interface DealTimelineProps {
  deal: DealProgression;
  colors: IndustryColorScheme;
}

export default function DealTimeline({ deal, colors }: DealTimelineProps) {
  const stages = deal.typicalStages;

  return (
    <div className="flex flex-col gap-6">
      <p className="text-sm font-medium text-slate-700">{deal.typicalTimeline}</p>

      {/* Horizontal pipeline — lg+ */}
      <div className="hidden lg:flex items-start gap-0 overflow-x-auto pb-2">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-start shrink-0">
            <div className="flex flex-col items-center gap-2 w-28">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                style={{ background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
              >
                {i + 1}
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-slate-800 leading-tight">{stage.stage}</p>
                <p className="text-xs text-slate-400 mt-0.5">{stage.typicalDuration}</p>
              </div>
            </div>
            {i < stages.length - 1 && (
              <div className="flex items-center h-9 px-0">
                <div
                  className="w-6 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vertical pipeline — mobile/tablet */}
      <div className="flex flex-col gap-0 lg:hidden">
        {stages.map((stage, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="flex flex-col items-center shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
              >
                {i + 1}
              </div>
              {i < stages.length - 1 && (
                <div
                  className="w-0.5 flex-1 min-h-6"
                  style={{ background: `linear-gradient(180deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
                />
              )}
            </div>
            <div className="pb-4 min-w-0">
              <p className="text-sm font-medium text-slate-800 leading-tight">{stage.stage}</p>
              <p className="text-xs text-slate-400 mt-0.5">{stage.typicalDuration}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-rose-600 uppercase tracking-wide">Common Blockers</span>
          {deal.commonBlockers.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-rose-400 text-xs mt-0.5 shrink-0">&bull;</span>
              <span className="text-xs text-slate-700">{b}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">Accelerators</span>
          {deal.accelerators.map((a, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-emerald-400 text-xs mt-0.5 shrink-0">&bull;</span>
              <span className="text-xs text-slate-700">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
