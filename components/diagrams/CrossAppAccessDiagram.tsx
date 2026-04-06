'use client';

import { useState } from 'react';

interface FlowStep {
  label: string;
  sublabel: string;
  detail: string;
}

const STEPS: FlowStep[] = [
  { label: 'User', sublabel: 'Authenticated via Okta SSO', detail: 'User holds an Okta session with their granted scopes. They trigger an action in App A that requires cross-app data.' },
  { label: 'Agent (App A)', sublabel: 'Delegated user token', detail: 'App A\'s agent acts on behalf of the user. It holds a scoped access token issued via OAuth 2.0 on-behalf-of flow.' },
  { label: 'Okta Token Exchange', sublabel: 'RFC 8693', detail: 'The agent presents its token to Okta\'s token exchange endpoint (RFC 8693). Okta validates the agent identity, checks FGA policies, and issues a new scoped token for App B.' },
  { label: 'Scoped Token', sublabel: 'Minimal privilege', detail: 'The new token carries only the scopes needed for the specific operation in App B. Token lifetime is short (minutes). Audit trail links back to the original user.' },
  { label: 'App B (API Call)', sublabel: 'Governed access', detail: 'App B validates the scoped token, executes the requested operation, and logs the action with the full identity chain: User → Agent → App B.' },
];

export default function CrossAppAccessDiagram() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-6">
      {/* Flow visualization — horizontal on lg+, vertical on mobile */}
      <div className="hidden lg:flex items-center gap-0 overflow-x-auto pb-4">
        {STEPS.map((step, i) => (
          <div key={i} className="flex items-center shrink-0">
            <button
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl border-2 transition-all w-32 ${
                activeStep === i
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                activeStep === i
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {i + 1}
              </div>
              <span className="text-xs font-medium text-slate-800 text-center leading-tight">{step.label}</span>
              <span className="text-xs text-slate-400 text-center leading-tight">{step.sublabel}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500 shrink-0" />
            )}
          </div>
        ))}
      </div>

      {/* Vertical flow for mobile/tablet */}
      <div className="flex flex-col gap-2 lg:hidden">
        {STEPS.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            <button
              onClick={() => setActiveStep(activeStep === i ? null : i)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                activeStep === i
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-sm'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                activeStep === i
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600'
              }`}>
                {i + 1}
              </div>
              <div className="text-left min-w-0">
                <span className="text-sm font-medium text-slate-800">{step.label}</span>
                <span className="text-xs text-slate-400 ml-2">{step.sublabel}</span>
              </div>
            </button>
            {i < STEPS.length - 1 && (
              <div className="w-0.5 h-4 bg-gradient-to-b from-blue-300 to-blue-500" />
            )}
          </div>
        ))}
      </div>

      {/* Detail panel */}
      {activeStep !== null && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-blue-600">Step {activeStep + 1}:</span>
            <span className="text-sm font-medium text-slate-800">{STEPS[activeStep].label}</span>
          </div>
          <p className="text-sm text-slate-700">{STEPS[activeStep].detail}</p>
        </div>
      )}
    </div>
  );
}
