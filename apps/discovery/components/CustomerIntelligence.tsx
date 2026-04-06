'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Brain, ChevronDown } from 'lucide-react';
import {
  ARCHETYPES,
  AVAILABLE_INDUSTRIES,
  AVAILABLE_USE_CASES,
  TOTAL_TRANSCRIPTS,
  AI_TRANSCRIPTS,
  getArchetype,
  getArchetypesByIndustry,
} from '@/lib/archetype-data';
import {
  INDUSTRY_LABELS,
  ARCHETYPE_USE_CASE_LABELS,
} from '@/lib/archetype-types';
import type { Industry, ArchetypeUseCase } from '@/lib/archetype-types';
import { INDUSTRY_COLORS } from '@/lib/industry-colors';
import IndustryDetailHeader from './IndustryDetailHeader';
import ProfileStrip from './ProfileStrip';
import CheatSheet from './CheatSheet';
import FullDetailView from './FullDetailView';

type ViewMode = 'cheat-sheet' | 'full-detail';

function CustomerIntelligenceInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | ''>('');
  const [selectedUseCase, setSelectedUseCase] = useState<ArchetypeUseCase | ''>('');
  const [viewMode, setViewMode] = useState<ViewMode>('cheat-sheet');
  const [detailSection, setDetailSection] = useState<string | undefined>();

  // Initialize from URL query params (from landing page "Go" button)
  useEffect(() => {
    const industryParam = searchParams.get('industry') as Industry | null;
    const useCaseParam = searchParams.get('useCase') as ArchetypeUseCase | null;
    if (industryParam && AVAILABLE_INDUSTRIES.includes(industryParam)) {
      setSelectedIndustry(industryParam);
      const industryUseCases = getArchetypesByIndustry(industryParam).map(a => a.useCase);
      if (useCaseParam && industryUseCases.includes(useCaseParam)) {
        setSelectedUseCase(useCaseParam);
      } else if (industryUseCases.length > 0) {
        setSelectedUseCase(industryUseCases[0]);
      }
    }
  }, [searchParams]);

  const availableUseCases = useMemo(() => {
    if (!selectedIndustry) return AVAILABLE_USE_CASES;
    return getArchetypesByIndustry(selectedIndustry).map(a => a.useCase);
  }, [selectedIndustry]);

  const archetype = useMemo(() => {
    if (!selectedIndustry || !selectedUseCase) return undefined;
    return getArchetype(selectedIndustry, selectedUseCase);
  }, [selectedIndustry, selectedUseCase]);

  const industryColors = archetype ? INDUSTRY_COLORS[archetype.industry] : null;

  function handleIndustryChange(industry: Industry | '') {
    setSelectedIndustry(industry);
    if (industry) {
      const useCases = getArchetypesByIndustry(industry).map(a => a.useCase);
      if (useCases.length > 0 && (!selectedUseCase || !useCases.includes(selectedUseCase as ArchetypeUseCase))) {
        setSelectedUseCase(useCases[0]);
      }
    } else {
      setSelectedUseCase('');
    }
  }

  function handleBack() {
    setSelectedIndustry('');
    setSelectedUseCase('');
    setViewMode('cheat-sheet');
    setDetailSection(undefined);
    // Clear URL params so browser back doesn't re-trigger archetype selection
    router.replace('/insights', { scroll: false });
  }

  function handleSwitchToDetail(section?: string) {
    setViewMode('full-detail');
    setDetailSection(section);
  }

  function handleViewModeChange(mode: ViewMode) {
    setViewMode(mode);
    if (mode === 'cheat-sheet') setDetailSection(undefined);
  }

  // Detail view (archetype selected)
  if (archetype && industryColors) {
    return (
      <div className="flex flex-col gap-4">
        <IndustryDetailHeader
          industry={archetype.industry}
          useCase={archetype.useCase}
          transcriptCount={archetype.transcriptCount}
          confidence={archetype.confidence}
          colors={industryColors}
          viewMode={viewMode}
          onViewModeChange={handleViewModeChange}
          onBack={handleBack}
        />
        <ProfileStrip profile={archetype.profile} colors={industryColors} />
        {viewMode === 'cheat-sheet' ? (
          <CheatSheet archetype={archetype} onSwitchToDetail={handleSwitchToDetail} />
        ) : (
          <FullDetailView archetype={archetype} openSection={detailSection} />
        )}
      </div>
    );
  }

  // Selector view (no archetype selected)
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Customer Intelligence</h1>
        <p className="text-sm text-slate-500 mt-1">
          Pre-call prep powered by {AI_TRANSCRIPTS} AI-related Gong transcripts (of {TOTAL_TRANSCRIPTS} total)
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Industry</label>
            <div className="relative">
              <select
                value={selectedIndustry}
                onChange={e => handleIndustryChange(e.target.value as Industry | '')}
                className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-8 text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select industry...</option>
                {AVAILABLE_INDUSTRIES.map(ind => (
                  <option key={ind} value={ind}>{INDUSTRY_LABELS[ind]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Use Case</label>
            <div className="relative">
              <select
                value={selectedUseCase}
                onChange={e => setSelectedUseCase(e.target.value as ArchetypeUseCase)}
                disabled={!selectedIndustry}
                className="w-full appearance-none rounded-lg border border-slate-300 px-3 py-2 pr-8 text-sm bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none disabled:bg-slate-50 disabled:text-slate-400"
              >
                <option value="">Select use case...</option>
                {availableUseCases.map(uc => (
                  <option key={uc} value={uc}>{ARCHETYPE_USE_CASE_LABELS[uc]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <EmptyState hasIndustry={!!selectedIndustry} />
    </div>
  );
}

function EmptyState({ hasIndustry }: { hasIndustry: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <Brain className="w-7 h-7 text-slate-400" />
      </div>
      <div className="text-center">
        <p className="text-slate-600 font-medium">
          {hasIndustry ? 'Select a use case to see insights' : 'Select an industry to get started'}
        </p>
        <p className="text-sm text-slate-400 mt-1">
          {ARCHETYPES.length} archetypes across {AVAILABLE_INDUSTRIES.length} industries
        </p>
      </div>
    </div>
  );
}

export default function CustomerIntelligence() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><span className="text-slate-400">Loading...</span></div>}>
      <CustomerIntelligenceInner />
    </Suspense>
  );
}
