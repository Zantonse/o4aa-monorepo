'use client';

import { useState } from 'react';
import { DealContext, UseCase, DealStage, USE_CASE_LABELS, DEAL_STAGE_LABELS } from '@/lib/types';

interface DiscoveryFormProps {
  onSubmit: (context: DealContext) => void;
}

export default function DiscoveryForm({ onSubmit }: DiscoveryFormProps) {
  const [accountName, setAccountName] = useState('');
  const [industry, setIndustry] = useState('');
  const [useCase, setUseCase] = useState<UseCase>('workforce-ai-agents');
  const [dealStage, setDealStage] = useState<DealStage>('initial-discovery');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accountName.trim()) return;
    onSubmit({ accountName: accountName.trim(), industry: industry.trim(), useCase, dealStage });
  };

  const inputClass =
    'w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-slate-900 placeholder:text-slate-400';
  const labelClass = 'block text-sm font-medium text-slate-700 mb-1';

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">Deal Context</h2>
      <p className="text-sm text-slate-500 mb-5">
        Select a use case to load the pre-built discovery question plan.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Account Name */}
        <div>
          <label htmlFor="accountName" className={labelClass}>
            Account Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="accountName"
            type="text"
            required
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="e.g. Acme Corp"
            className={inputClass}
          />
        </div>

        {/* Industry */}
        <div>
          <label htmlFor="industry" className={labelClass}>
            Industry / Vertical
          </label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="e.g. Financial Services, Healthcare..."
            className={inputClass}
          />
        </div>

        {/* Use Case */}
        <div>
          <label htmlFor="useCase" className={labelClass}>
            Use Case
          </label>
          <select
            id="useCase"
            value={useCase}
            onChange={(e) => setUseCase(e.target.value as UseCase)}
            className={inputClass}
          >
            {(Object.entries(USE_CASE_LABELS) as [UseCase, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Deal Stage */}
        <div>
          <label htmlFor="dealStage" className={labelClass}>
            Deal Stage
          </label>
          <select
            id="dealStage"
            value={dealStage}
            onChange={(e) => setDealStage(e.target.value as DealStage)}
            className={inputClass}
          >
            {(Object.entries(DEAL_STAGE_LABELS) as [DealStage, string][]).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!accountName.trim()}
          className="bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full mt-2"
        >
          Load Discovery Questions
        </button>
      </form>
    </div>
  );
}
