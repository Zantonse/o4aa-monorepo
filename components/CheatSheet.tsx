'use client';

import type { CustomerArchetype } from '@/lib/archetype-types';
import { INDUSTRY_COLORS } from '@/lib/industry-colors';
import FrequencyBar from './FrequencyBar';

interface CheatSheetProps {
  archetype: CustomerArchetype;
  onSwitchToDetail: (section?: string) => void;
}

export default function CheatSheet({ archetype, onSwitchToDetail }: CheatSheetProps) {
  const { profile, stakeholders, painPoints, goals, productFit, competitiveContext, objections, discoveryQuestions, dealProgression } = archetype;
  const colors = INDUSTRY_COLORS[archetype.industry];
  const gradientColor = colors.gradient;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Row 1 */}
      <Cell title="Profile" industryColor={colors.text} onDetail={() => onSwitchToDetail('profile')}>
        <KV label="Company Size" value={profile.typicalCompanySize} />
        <KV label="AI Maturity" value={profile.aiMaturity} />
        <KV label="Trigger" value={profile.triggerEvent} />
        <KV label="Buying Motion" value={profile.buyingMotion} />
      </Cell>

      <Cell title="Top Pain Points" industryColor={colors.text} onDetail={() => onSwitchToDetail('pain')}>
        {painPoints.slice(0, 3).map((pp) => (
          <div key={pp.id} className="flex flex-col gap-1">
            <span className="text-xs text-slate-800">{pp.statement}</span>
            <FrequencyBar frequency={pp.frequency} color={gradientColor} />
          </div>
        ))}
      </Cell>

      <Cell title="Top Goals" industryColor={colors.text} onDetail={() => onSwitchToDetail('goals')}>
        {goals.slice(0, 3).map((g, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-xs text-slate-800">{g.statement}</span>
            <FrequencyBar frequency={g.frequency} color={gradientColor} />
          </div>
        ))}
      </Cell>

      {/* Row 2 */}
      <Cell title="Key Stakeholders" industryColor={colors.text} onDetail={() => onSwitchToDetail('stakeholders')}>
        {stakeholders.slice(0, 3).map((s, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-medium text-slate-800 block">{s.role}</span>
              <span className="text-xs text-slate-500">{s.influenceLevel}</span>
            </div>
            <span className="text-xs text-slate-400 tabular-nums shrink-0">{Math.round(s.frequency * 100)}%</span>
          </div>
        ))}
      </Cell>

      <Cell title="Product Fit" industryColor={colors.text} onDetail={() => onSwitchToDetail('product')}>
        {productFit.slice(0, 3).map((p, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-medium text-slate-800 block">{p.product}</span>
              <span className="text-xs text-slate-500 line-clamp-1">{p.rationale}</span>
            </div>
            <span className={`text-xs shrink-0 px-1.5 py-0.5 rounded-full font-medium ${
              p.relevance === 'primary' ? 'bg-violet-100 text-violet-700' :
              p.relevance === 'secondary' ? 'bg-slate-100 text-slate-600' :
              'bg-slate-50 text-slate-400'
            }`}>{p.relevance}</span>
          </div>
        ))}
      </Cell>

      <Cell title="Discovery Questions" industryColor={colors.text} onDetail={() => onSwitchToDetail('questions')}>
        {discoveryQuestions.slice(0, 3).map((q, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="text-xs font-medium shrink-0" style={{ color: colors.text }}>{i + 1}.</span>
            <span className="text-xs text-slate-800">{q.question}</span>
          </div>
        ))}
      </Cell>

      {/* Row 3 */}
      <Cell title="Competitive Landscape" industryColor={colors.text} onDetail={() => onSwitchToDetail('competitive')}>
        {competitiveContext.slice(0, 3).map((c, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <span className="text-xs font-medium text-slate-800 block">{c.competitor}</span>
              <span className="text-xs text-slate-500 line-clamp-1">{c.context}</span>
            </div>
            <span className="text-xs text-slate-400 tabular-nums shrink-0">{Math.round(c.frequency * 100)}%</span>
          </div>
        ))}
      </Cell>

      <Cell title="Top Objections" industryColor={colors.text} onDetail={() => onSwitchToDetail('objections')}>
        {objections.slice(0, 3).map((o, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-slate-800">{o.objection}</span>
            <span className="text-xs text-emerald-600 line-clamp-1">{o.counterPosition}</span>
          </div>
        ))}
      </Cell>

      <Cell title="Deal Progression" industryColor={colors.text} onDetail={() => onSwitchToDetail('deal')}>
        <KV label="Timeline" value={dealProgression.typicalTimeline} />
        <div className="flex flex-col gap-1 mt-1">
          {dealProgression.typicalStages.slice(0, 3).map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                style={{ background: `linear-gradient(135deg, ${colors.gradient.from}, ${colors.gradient.to})` }}
              >
                <span className="text-xs font-medium">{i + 1}</span>
              </div>
              <span className="text-xs text-slate-700">{s.stage}</span>
            </div>
          ))}
        </div>
      </Cell>
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────

function Cell({
  title,
  industryColor,
  onDetail,
  children,
}: {
  title: string;
  industryColor: string;
  onDetail: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      <div className="px-4 py-2.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h4
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: industryColor }}
        >
          {title}
        </h4>
        <button
          onClick={onDetail}
          className="text-xs text-slate-400 hover:text-slate-600 transition-colors"
        >
          Detail &rarr;
        </button>
      </div>
      <div className="px-4 py-3 flex flex-col gap-3">
        {children}
      </div>
    </div>
  );
}

function KV({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-slate-400 uppercase tracking-wide">{label}</span>
      <span className="text-xs text-slate-800 line-clamp-2" title={value}>{value}</span>
    </div>
  );
}
