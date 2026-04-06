'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { ARCHETYPES } from '@/lib/archetype-data';
import { INDUSTRY_LABELS } from '@/lib/archetype-types';
import type { Industry } from '@/lib/archetype-types';
import { INDUSTRY_COLORS } from '@/lib/industry-colors';

interface IndustryBlock {
  industry: Industry;
  label: string;
  transcriptCount: number;
  archetypeCount: number;
}

export default function ArchetypeLandscapeDiagram() {
  const router = useRouter();

  const blocks = useMemo<IndustryBlock[]>(() => {
    const byIndustry = new Map<Industry, { count: number; archetypes: number }>();
    for (const a of ARCHETYPES) {
      const existing = byIndustry.get(a.industry) || { count: 0, archetypes: 0 };
      existing.count += a.transcriptCount;
      existing.archetypes += 1;
      byIndustry.set(a.industry, existing);
    }
    return Array.from(byIndustry.entries())
      .map(([industry, data]) => ({
        industry,
        label: INDUSTRY_LABELS[industry],
        transcriptCount: data.count,
        archetypeCount: data.archetypes,
      }))
      .sort((a, b) => b.transcriptCount - a.transcriptCount);
  }, []);

  const maxCount = blocks[0]?.transcriptCount || 1;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {blocks.map((block) => {
        const colors = INDUSTRY_COLORS[block.industry];
        // Scale min-height between 80px and 160px based on transcript count
        const minHeight = 80 + Math.round((block.transcriptCount / maxCount) * 80);

        return (
          <button
            key={block.industry}
            onClick={() => router.push(`/insights?industry=${block.industry}`)}
            className="rounded-xl p-4 text-left transition-all hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between"
            style={{
              background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})`,
              minHeight: `${minHeight}px`,
            }}
          >
            <div>
              <p className="text-white font-semibold text-sm">{block.label}</p>
              <p className="text-white/70 text-xs mt-0.5">{block.archetypeCount} {block.archetypeCount === 1 ? 'archetype' : 'archetypes'}</p>
            </div>
            <p className="text-white/90 text-lg font-bold tabular-nums">{block.transcriptCount}</p>
          </button>
        );
      })}
    </div>
  );
}
