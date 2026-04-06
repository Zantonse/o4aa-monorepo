'use client';

import { useState } from 'react';
import { DiscoveryPlan, USE_CASE_LABELS, DEAL_STAGE_LABELS } from '@/lib/types';
import CoTMView from './CoTMView';
import FlowView from './FlowView';

interface QuestionPlanProps {
  plan: DiscoveryPlan;
  onRegenerate: () => void;
}

type ActiveTab = 'cotm' | 'flow';

export default function QuestionPlan({ plan }: QuestionPlanProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('cotm');

  return (
    <div className="flex flex-col gap-4">
      {/* Header summary strip */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4">
        <h2 className="text-base font-semibold text-slate-900 truncate">{plan.accountName}</h2>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
            {USE_CASE_LABELS[plan.useCase]}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
            {DEAL_STAGE_LABELS[plan.dealStage]}
          </span>
        </div>
      </div>

      {/* Tab switcher */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setActiveTab('cotm')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'cotm'
              ? 'bg-[var(--color-primary-700)] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          CoTM Framework
        </button>
        <button
          onClick={() => setActiveTab('flow')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'flow'
              ? 'bg-[var(--color-primary-700)] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
          }`}
        >
          Conversation Flow
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'cotm' ? (
        <CoTMView pillars={plan.cotmView} />
      ) : (
        <FlowView steps={plan.flowView} />
      )}
    </div>
  );
}
