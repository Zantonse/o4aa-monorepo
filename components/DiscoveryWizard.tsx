'use client';

import { useState, useMemo } from 'react';
import { Copy, Check, ChevronLeft, ChevronRight, ClipboardList, RotateCcw } from 'lucide-react';
import { UseCase, FlowStep, USE_CASE_LABELS } from '@/lib/types';
import { QUESTION_BANK } from '@/lib/question-bank';

const SECTION_COLORS: Record<string, { bg: string; text: string; border: string; light: string }> = {
  Opening:            { bg: 'bg-blue-600',    text: 'text-blue-700',    border: 'border-blue-200', light: 'bg-blue-50' },
  'Pain Exploration': { bg: 'bg-rose-600',    text: 'text-rose-700',    border: 'border-rose-200', light: 'bg-rose-50' },
  'Business Impact':  { bg: 'bg-amber-600',   text: 'text-amber-700',   border: 'border-amber-200', light: 'bg-amber-50' },
  'Technical Reality':{ bg: 'bg-violet-600',  text: 'text-violet-700',  border: 'border-violet-200', light: 'bg-violet-50' },
  'Decision Process': { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-200', light: 'bg-emerald-50' },
  'Next Steps':       { bg: 'bg-slate-600',   text: 'text-slate-700',   border: 'border-slate-200', light: 'bg-slate-50' },
};
const DEFAULT_COLOR = { bg: 'bg-slate-600', text: 'text-slate-700', border: 'border-slate-200', light: 'bg-slate-50' };

const USE_CASE_DESCRIPTIONS: Record<UseCase, string> = {
  'workforce-ai-agents': 'Securing AI assistants used by employees internally — Copilot, custom bots, productivity agents.',
  'customer-facing-ai-agents': 'Securing AI agents that act on behalf of your customers — chatbots, agentic workflows, delegated actions.',
  '3rd-party-ai-governance': 'Governing AI agents from third-party vendors operating inside your environment.',
  'ai-agent-ciam': 'Managing non-human identities at scale — service accounts, API keys, bot users, AI agent credentials.',
};

export default function DiscoveryWizard() {
  const [useCase, setUseCase] = useState<UseCase | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0 = use case selection, 1-6 = flow steps
  const [copiedKeys, setCopiedKeys] = useState<Record<string, boolean>>({});
  const [copiedAll, setCopiedAll] = useState(false);

  const flowSteps: FlowStep[] = useMemo(() => {
    if (!useCase) return [];
    return QUESTION_BANK[useCase].flowView;
  }, [useCase]);

  const totalSteps = flowSteps.length; // 6 flow steps

  const handleCopy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKeys((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopiedKeys((prev) => ({ ...prev, [key]: false })), 2000);
    } catch { /* clipboard write failed */ }
  };

  const copyAllQuestions = async () => {
    if (!flowSteps.length) return;
    const step = flowSteps[currentStep - 1];
    const text = step.questions.map((q, i) => `${i + 1}. ${q}`).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch { /* clipboard write failed */ }
  };

  const handleSelectUseCase = (uc: UseCase) => {
    setUseCase(uc);
    setCurrentStep(1);
    setCopiedKeys({});
  };

  const handleReset = () => {
    setUseCase(null);
    setCurrentStep(0);
    setCopiedKeys({});
  };

  // Step 0: Use case selection
  if (currentStep === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Discovery Call Wizard</h1>
          <p className="text-slate-500">
            Select the use case that matches your call. The wizard will guide you through
            each phase of the conversation from intro to next steps.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {(Object.entries(USE_CASE_LABELS) as [UseCase, string][]).map(([value, label]) => (
            <button
              key={value}
              onClick={() => handleSelectUseCase(value)}
              className="text-left bg-white border border-slate-200 rounded-xl p-5 hover:border-[#00297A] hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-900 group-hover:text-[#00297A] transition-colors">
                    {label}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">{USE_CASE_DESCRIPTIONS[value]}</p>
                </div>
                <ChevronRight size={20} className="text-slate-300 group-hover:text-[#00297A] transition-colors shrink-0 ml-4" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Steps 1-6: Flow step display
  const step = flowSteps[currentStep - 1];
  const colors = SECTION_COLORS[step.section] ?? DEFAULT_COLOR;
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Top bar: progress + use case label */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors"
            title="Start over"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Start over</span>
          </button>
          <span className="text-slate-300">|</span>
          <span className="text-sm font-medium text-[#00297A]">
            {useCase ? USE_CASE_LABELS[useCase] : ''}
          </span>
        </div>
        <span className="text-sm text-slate-500">
          Step {currentStep} of {totalSteps}
        </span>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 mb-8">
        {flowSteps.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentStep(idx + 1)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              idx + 1 <= currentStep ? 'bg-[#00297A]' : 'bg-slate-200'
            }`}
            title={flowSteps[idx].section}
          />
        ))}
      </div>

      {/* Section header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className={`w-8 h-8 rounded-full ${colors.bg} text-white text-sm font-bold flex items-center justify-center`}>
            {currentStep}
          </span>
          <h2 className="text-xl font-bold text-slate-900">{step.section}</h2>
        </div>
        <p className="text-sm text-slate-500 ml-11">
          {step.questions.length} {step.questions.length === 1 ? 'question' : 'questions'} in this section
        </p>
      </div>

      {/* Copy all button */}
      <div className="flex justify-end mb-3">
        <button
          onClick={copyAllQuestions}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-lg px-3 py-1.5 transition-colors shadow-sm"
        >
          {copiedAll ? (
            <>
              <Check size={14} className="text-emerald-500" />
              Copied!
            </>
          ) : (
            <>
              <ClipboardList size={14} />
              Copy all
            </>
          )}
        </button>
      </div>

      {/* Questions card */}
      <div className={`bg-white border ${colors.border} rounded-xl shadow-sm overflow-hidden mb-8`}>
        <ol className="divide-y divide-slate-50">
          {step.questions.map((question, idx) => {
            const key = `${step.id}-${idx}`;
            const isCopied = copiedKeys[key] ?? false;

            return (
              <li key={idx} className="flex items-start gap-3 px-5 py-4 group hover:bg-slate-50 transition-colors">
                <span className={`shrink-0 mt-0.5 w-7 h-7 rounded-full ${colors.light} ${colors.text} text-xs font-bold flex items-center justify-center`}>
                  {idx + 1}
                </span>
                <p className="flex-1 text-sm text-slate-700 leading-relaxed">{question}</p>
                <button
                  onClick={() => handleCopy(question, key)}
                  title="Copy question"
                  className="shrink-0 mt-0.5 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                >
                  {isCopied ? (
                    <Check size={14} className="text-emerald-500" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentStep((s) => s - 1)}
          disabled={isFirst}
          className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={18} />
          {isFirst ? 'Back' : flowSteps[currentStep - 2].section}
        </button>

        {isLast ? (
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            <RotateCcw size={16} />
            New Discovery
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex items-center gap-2 bg-[#00297A] hover:bg-[#003a9e] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors text-sm"
          >
            {flowSteps[currentStep].section}
            <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
