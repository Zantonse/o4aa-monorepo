'use client';

import { useState } from 'react';
import { FileSearch } from 'lucide-react';
import { UseCase, DiscoveryPlan, USE_CASE_LABELS } from '@/lib/types';
import { QUESTION_BANK } from '@/lib/question-bank';
import QuestionPlan from '@/components/QuestionPlan';

export default function QuestionBankPage() {
  const [plan, setPlan] = useState<DiscoveryPlan | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase>('workforce-ai-agents');

  const loadPlan = () => {
    const { cotmView, flowView } = QUESTION_BANK[selectedUseCase];
    setPlan({
      accountName: USE_CASE_LABELS[selectedUseCase],
      useCase: selectedUseCase,
      dealStage: 'initial-discovery',
      cotmView,
      flowView,
      generatedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Use case selector bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-5 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <label htmlFor="useCase" className="text-sm font-medium text-slate-700 shrink-0">
            Use Case
          </label>
          <select
            id="useCase"
            value={selectedUseCase}
            onChange={(e) => setSelectedUseCase(e.target.value as UseCase)}
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900"
          >
            {(Object.entries(USE_CASE_LABELS) as [UseCase, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
          <button
            onClick={loadPlan}
            className="bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-5 py-2 rounded-lg transition-colors text-sm shrink-0"
          >
            Load Questions
          </button>
        </div>
      </div>

      {/* Output */}
      {plan ? (
        <QuestionPlan plan={plan} onRegenerate={loadPlan} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <FileSearch size={28} className="text-slate-400" />
          </div>
          <h3 className="text-base font-semibold text-slate-700 mb-1">
            No plan loaded yet
          </h3>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            Select a use case above and click Load Questions to view the discovery question bank.
          </p>
        </div>
      )}
    </div>
  );
}
