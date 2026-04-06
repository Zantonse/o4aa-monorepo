'use client';

import { ArrowLeft } from 'lucide-react';
import type { Industry, ArchetypeUseCase, Confidence } from '@/lib/archetype-types';
import { INDUSTRY_LABELS, ARCHETYPE_USE_CASE_LABELS, CONFIDENCE_CONFIG } from '@/lib/archetype-types';
import type { IndustryColorScheme } from '@/lib/industry-colors';

interface IndustryDetailHeaderProps {
  industry: Industry;
  useCase: ArchetypeUseCase;
  transcriptCount: number;
  confidence: Confidence;
  colors: IndustryColorScheme;
  viewMode: 'cheat-sheet' | 'full-detail';
  onViewModeChange: (mode: 'cheat-sheet' | 'full-detail') => void;
  onBack: () => void;
}

export default function IndustryDetailHeader({
  industry,
  useCase,
  transcriptCount,
  confidence,
  colors,
  viewMode,
  onViewModeChange,
  onBack,
}: IndustryDetailHeaderProps) {
  const confConfig = CONFIDENCE_CONFIG[confidence];

  return (
    <div
      className="rounded-xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      style={{ background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onBack}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors shrink-0"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-white truncate">
            {INDUSTRY_LABELS[industry]} &times; {ARCHETYPE_USE_CASE_LABELS[useCase]}
          </h2>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-white/80">{transcriptCount} transcripts</span>
            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-white/20 text-white">
              {confConfig.label}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white/10 p-1 rounded-lg flex shrink-0">
        <button
          onClick={() => onViewModeChange('cheat-sheet')}
          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
            viewMode === 'cheat-sheet'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Cheat Sheet
        </button>
        <button
          onClick={() => onViewModeChange('full-detail')}
          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
            viewMode === 'full-detail'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-white/80 hover:text-white'
          }`}
        >
          Full Detail
        </button>
      </div>
    </div>
  );
}
