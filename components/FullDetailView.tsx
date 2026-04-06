'use client';

import type { CustomerArchetype } from '@/lib/archetype-types';
import { INDUSTRY_COLORS } from '@/lib/industry-colors';
import InsightCard from './InsightCard';
import FrequencyBar from './FrequencyBar';
import StakeholderBadge from './StakeholderBadge';
import DealTimeline from './DealTimeline';
import { Quote, Users, Target, Zap, Shield, Swords, AlertTriangle, HelpCircle, Trophy, TrendingUp } from 'lucide-react';

const CARD_COLORS = {
  stakeholder: { border: 'border-blue-200',    heading: 'text-blue-700',    badge: 'bg-blue-100',    badgeText: 'text-blue-700' },
  pain:        { border: 'border-rose-200',     heading: 'text-rose-700',    badge: 'bg-rose-100',    badgeText: 'text-rose-700' },
  goals:       { border: 'border-emerald-200',  heading: 'text-emerald-700', badge: 'bg-emerald-100', badgeText: 'text-emerald-700' },
  product:     { border: 'border-violet-200',   heading: 'text-violet-700',  badge: 'bg-violet-100',  badgeText: 'text-violet-700' },
  competitive: { border: 'border-amber-200',    heading: 'text-amber-700',   badge: 'bg-amber-100',   badgeText: 'text-amber-700' },
  objections:  { border: 'border-orange-200',   heading: 'text-orange-700',  badge: 'bg-orange-100',  badgeText: 'text-orange-700' },
  questions:   { border: 'border-cyan-200',     heading: 'text-cyan-700',    badge: 'bg-cyan-100',    badgeText: 'text-cyan-700' },
  deal:        { border: 'border-slate-200',    heading: 'text-slate-700',   badge: 'bg-slate-100',   badgeText: 'text-slate-700' },
  quotes:      { border: 'border-purple-200',   heading: 'text-purple-700',  badge: 'bg-purple-100',  badgeText: 'text-purple-700' },
};

interface FullDetailViewProps {
  archetype: CustomerArchetype;
  openSection?: string;
}

export default function FullDetailView({ archetype, openSection }: FullDetailViewProps) {
  const { stakeholders, painPoints, goals, productFit, competitiveContext, objections, discoveryQuestions, proofPoints, dealProgression, realQuotes } = archetype;
  const colors = INDUSTRY_COLORS[archetype.industry];
  const gradientColor = colors.gradient;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* 1. Stakeholder Map */}
      <InsightCard
        title="Stakeholder Map"
        colorScheme={CARD_COLORS.stakeholder}
        badge={`${stakeholders.length} roles`}
        preview={stakeholders.slice(0, 2).map(s => s.role).join(', ') + '...'}
        defaultOpen={openSection === 'stakeholders' || !openSection}
      >
        <div className="flex flex-col gap-3 pt-4">
          {stakeholders.map((s, i) => (
            <div key={i} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StakeholderBadge level={s.influenceLevel} />
                  <span className="text-sm font-medium text-slate-800">{s.role}</span>
                </div>
                <span className="text-xs text-slate-400 tabular-nums">{Math.round(s.frequency * 100)}%</span>
              </div>
              <div className="flex flex-wrap gap-1 pl-9">
                {s.whatTheyCareAbout.map((c, j) => (
                  <span key={j} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full">{c}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 2. Pain Points */}
      <InsightCard
        title="Pain Points"
        colorScheme={CARD_COLORS.pain}
        badge={`${painPoints.length} identified`}
        preview={painPoints[0]?.statement}
        defaultOpen={openSection === 'pain'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {painPoints.map((pp) => (
            <div key={pp.id} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm text-slate-800">{pp.statement}</span>
                <SeverityBadge severity={pp.severity} />
              </div>
              <FrequencyBar frequency={pp.frequency} size="md" color={gradientColor} />
              {pp.exampleQuote && (
                <p className="text-xs text-slate-500 italic pl-3 border-l-2 border-rose-200 mt-1">
                  &ldquo;{pp.exampleQuote}&rdquo;
                </p>
              )}
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 3. Goals & Success Criteria */}
      <InsightCard
        title="Goals & Success Criteria"
        colorScheme={CARD_COLORS.goals}
        badge={`${goals.length} goals`}
        preview={goals[0]?.statement}
        defaultOpen={openSection === 'goals'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {goals.map((g, i) => (
            <div key={i} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <span className="text-sm text-slate-800">{g.statement}</span>
              <FrequencyBar frequency={g.frequency} size="md" color={gradientColor} />
              {g.successMetric && (
                <span className="text-xs text-emerald-600">Metric: {g.successMetric}</span>
              )}
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 4. Product Fit */}
      <InsightCard
        title="Product Fit"
        colorScheme={CARD_COLORS.product}
        badge={`${productFit.length} products`}
        preview={productFit.filter(p => p.relevance === 'primary').map(p => p.product).join(', ')}
        defaultOpen={openSection === 'product'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {productFit.map((p, i) => (
            <div key={i} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800">{p.product}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    p.relevance === 'primary' ? 'bg-violet-100 text-violet-700' :
                    p.relevance === 'secondary' ? 'bg-slate-100 text-slate-600' :
                    'bg-slate-50 text-slate-400'
                  }`}>{p.relevance}</span>
                  <span className="text-xs text-slate-400 tabular-nums">{Math.round(p.frequency * 100)}%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600">{p.rationale}</p>
              <div className="flex flex-wrap gap-1">
                {p.specificFeatures.map((f, j) => (
                  <span key={j} className="text-xs bg-violet-50 text-violet-600 px-2 py-0.5 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 5. Competitive Landscape */}
      <InsightCard
        title="Competitive Landscape"
        colorScheme={CARD_COLORS.competitive}
        badge={`${competitiveContext.length} competitors`}
        preview={competitiveContext[0]?.competitor}
        defaultOpen={openSection === 'competitive'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {competitiveContext.map((c, i) => (
            <div key={i} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-800">{c.competitor}</span>
                <span className="text-xs text-slate-400 tabular-nums">{Math.round(c.frequency * 100)}%</span>
              </div>
              <p className="text-xs text-slate-600">{c.context}</p>
              <div className="flex flex-col gap-1 mt-1">
                {c.differentiators.map((d, j) => (
                  <div key={j} className="flex items-start gap-1.5">
                    <span className="text-amber-500 text-xs mt-0.5">+</span>
                    <span className="text-xs text-slate-700">{d}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 6. Objections & Landmines */}
      <InsightCard
        title="Objections & Landmines"
        colorScheme={CARD_COLORS.objections}
        badge={`${objections.length} objections`}
        preview={objections[0]?.objection}
        defaultOpen={openSection === 'objections'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {objections.map((o, i) => (
            <div key={i} className="flex flex-col gap-1.5 pb-3 border-b border-slate-50 last:border-0 last:pb-0">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-500 mt-0.5 shrink-0" />
                <span className="text-sm text-slate-800">{o.objection}</span>
              </div>
              <FrequencyBar frequency={o.frequency} size="sm" color={gradientColor} />
              <div className="flex items-start gap-2 mt-1 pl-5">
                <span className="text-emerald-500 text-xs font-bold shrink-0">&rarr;</span>
                <span className="text-xs text-emerald-700">{o.counterPosition}</span>
              </div>
              {o.evidenceSupport && (
                <p className="text-xs text-slate-400 pl-5">{o.evidenceSupport}</p>
              )}
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 7. Discovery Questions */}
      <InsightCard
        title="Discovery Questions"
        colorScheme={CARD_COLORS.questions}
        badge={`${discoveryQuestions.length} questions`}
        preview={discoveryQuestions[0]?.question}
        defaultOpen={openSection === 'questions'}
      >
        <div className="flex flex-col gap-3 pt-4">
          {(['opening', 'pain-exploration', 'technical', 'decision-process'] as const).map((phase) => {
            const qs = discoveryQuestions.filter(q => q.callPhase === phase);
            if (qs.length === 0) return null;
            return (
              <div key={phase} className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-cyan-600 uppercase tracking-wide">
                  {phase.replace(/-/g, ' ')}
                </span>
                {qs.map((q, i) => (
                  <div key={i} className="flex flex-col gap-0.5 pl-3 border-l-2 border-cyan-100">
                    <span className="text-sm text-slate-800">{q.question}</span>
                    <span className="text-xs text-slate-400">{q.rationale}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </InsightCard>

      {/* 8. Deal Progression — full width, visual timeline */}
      <InsightCard
        title="Deal Progression"
        colorScheme={CARD_COLORS.deal}
        defaultOpen={openSection === 'deal'}
        fullWidth
      >
        <div className="pt-4">
          <DealTimeline deal={dealProgression} colors={colors} />
        </div>
      </InsightCard>

      {/* 9. Proof Points — full width */}
      <InsightCard
        title="Proof Points"
        colorScheme={CARD_COLORS.deal}
        badge={`${proofPoints.length} points`}
        defaultOpen={openSection === 'proofpoints'}
        fullWidth
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-4">
          {proofPoints.map((pp, i) => (
            <div key={i} className="flex flex-col gap-0.5 pb-2 border-b border-slate-50 last:border-0 last:pb-0">
              <span className="text-sm text-slate-800">{pp.metric}</span>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  pp.confidence === 'hard' ? 'bg-emerald-100 text-emerald-700' :
                  pp.confidence === 'soft' ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-500'
                }`}>{pp.confidence}</span>
                <span className="text-xs text-slate-400">{pp.source}</span>
              </div>
            </div>
          ))}
        </div>
      </InsightCard>

      {/* 10. Real Quotes */}
      {realQuotes.length > 0 && (
        <InsightCard
          title="Real Customer Quotes"
          colorScheme={CARD_COLORS.quotes}
          badge={`${realQuotes.length} quotes`}
          preview={realQuotes[0]?.quote.slice(0, 80) + '...'}
          fullWidth
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-4">
            {realQuotes.map((q, i) => (
              <div key={i} className="flex flex-col gap-1.5 p-3 bg-purple-50/50 rounded-lg">
                <p className="text-sm text-slate-800 italic">&ldquo;{q.quote}&rdquo;</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-purple-700">{q.speakerRole}</span>
                  <span className="text-xs text-slate-400">{q.context}</span>
                </div>
              </div>
            ))}
          </div>
        </InsightCard>
      )}
    </div>
  );
}

// ── Sub-components ──────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const styles: Record<string, string> = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    moderate: 'bg-amber-100 text-amber-700',
  };
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium shrink-0 ${styles[severity] || 'bg-slate-100 text-slate-500'}`}>
      {severity}
    </span>
  );
}
