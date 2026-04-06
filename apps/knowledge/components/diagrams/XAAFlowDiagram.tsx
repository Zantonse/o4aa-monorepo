'use client';

import { useState, useEffect, useCallback } from 'react';

const STEPS = [
  {
    num: 1,
    title: 'Client Credentials Auth',
    from: 'AI Agent',
    to: 'Okta',
    arrow: '→',
    detail: 'Agent authenticates with client ID + secret (or signed JWT). Okta verifies a managed connection exists to the target resource app.',
    gate: 'No managed connection = flow stops here.',
    color: 'oklch(0.35 0.16 260)',
  },
  {
    num: 2,
    title: 'ID-JAG Issuance',
    from: 'Okta',
    to: 'AI Agent',
    arrow: '←',
    detail: 'Okta issues an Identity Assertion JWT — short-lived, RS256-signed. Contains sub (user), aud (resource app), iss (Okta org).',
    gate: 'Not an access token — an assertion that Okta vouches for this delegation.',
    color: 'oklch(0.38 0.12 160)',
  },
  {
    num: 3,
    title: 'JWT Bearer Grant',
    from: 'AI Agent',
    to: 'Resource App',
    arrow: '→',
    detail: 'Agent presents ID-JAG to resource app\'s /token endpoint via RFC 7523 JWT Bearer grant type. Includes requested scopes.',
    gate: 'Agent presents Okta\'s credential, not its own. Trust is delegated to the IdP.',
    color: 'oklch(0.40 0.12 55)',
  },
  {
    num: 4,
    title: 'Validation & Token Issue',
    from: 'Resource App',
    to: 'AI Agent',
    arrow: '←',
    detail: 'Resource app validates ID-JAG against Okta\'s JWKS, checks aud/sub/exp claims. Issues scoped access token.',
    gate: 'Resource app never trusts the agent directly — it trusts only Okta\'s signed assertion.',
    color: 'oklch(0.42 0.18 260)',
  },
];

export default function XAAFlowDiagram() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const advance = useCallback(() => {
    setActiveStep(prev => {
      if (prev >= STEPS.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(advance, 2500);
    return () => clearInterval(timer);
  }, [isPlaying, advance]);

  function play() {
    setActiveStep(0);
    setIsPlaying(true);
  }

  return (
    <div>
      {/* Three parties */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'AI Agent', sub: 'Requesting App', active: [1, 3].includes(STEPS[activeStep]?.num) },
          { label: 'Okta', sub: 'Identity Provider', active: [1, 2].includes(STEPS[activeStep]?.num) },
          { label: 'Resource App', sub: 'Protected API', active: [3, 4].includes(STEPS[activeStep]?.num) },
        ].map(party => (
          <div
            key={party.label}
            className="rounded-xl text-center py-4 transition-all duration-500"
            style={{
              background: party.active
                ? 'linear-gradient(135deg, oklch(0.28 0.14 260), oklch(0.35 0.16 260))'
                : 'var(--color-surface-alt)',
              border: party.active
                ? '2px solid oklch(0.42 0.18 260)'
                : '1px solid var(--color-border)',
              boxShadow: party.active ? '0 4px 20px oklch(0.28 0.14 260 / 0.2)' : 'none',
            }}
          >
            <p
              className="text-[14px] font-bold"
              style={{ color: party.active ? 'white' : 'var(--color-text)' }}
            >
              {party.label}
            </p>
            <p
              className="text-[11px] mt-0.5"
              style={{ color: party.active ? 'oklch(0.85 0.03 260)' : 'var(--color-text-muted)' }}
            >
              {party.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-2 mb-4">
        {STEPS.map((step, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;
          return (
            <button
              key={step.num}
              className="w-full text-left rounded-xl transition-all duration-300 overflow-hidden"
              style={{
                background: isActive ? step.color : isPast ? 'var(--color-surface-alt)' : 'var(--color-surface)',
                border: isActive
                  ? `2px solid ${step.color}`
                  : `1px solid ${isPast ? 'var(--color-success-border)' : 'var(--color-border)'}`,
                opacity: !isActive && !isPast ? 0.5 : 1,
                cursor: 'pointer',
              }}
              onClick={() => { setActiveStep(i); setIsPlaying(false); }}
            >
              <div className="flex items-center gap-3 px-4 py-3">
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[13px] font-bold"
                  style={{
                    background: isActive ? 'oklch(1 0 0 / 0.2)' : isPast ? 'var(--color-success-bg)' : 'var(--color-surface-alt)',
                    color: isActive ? 'white' : isPast ? 'var(--color-success-text)' : 'var(--color-text-muted)',
                    border: isPast ? '1px solid var(--color-success-border)' : 'none',
                  }}
                >
                  {isPast ? '✓' : step.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[13px] font-semibold"
                      style={{ color: isActive ? 'white' : 'var(--color-text)' }}
                    >
                      {step.title}
                    </span>
                    <span
                      className="text-[11px] font-mono"
                      style={{ color: isActive ? 'oklch(1 0 0 / 0.6)' : 'var(--color-text-muted)' }}
                    >
                      {step.from} {step.arrow} {step.to}
                    </span>
                  </div>
                  {isActive && (
                    <div className="mt-2">
                      <p className="text-[12.5px] leading-relaxed" style={{ color: 'oklch(1 0 0 / 0.85)' }}>
                        {step.detail}
                      </p>
                      <p
                        className="text-[11.5px] mt-2 font-medium px-2.5 py-1.5 rounded-md inline-block"
                        style={{ background: 'oklch(1 0 0 / 0.15)', color: 'oklch(1 0 0 / 0.95)' }}
                      >
                        {step.gate}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-3">
        <button
          onClick={play}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
          style={{
            background: 'var(--color-primary-700)',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14"><polygon points="3,1 12,7 3,13" fill="currentColor" /></svg>
          Play Flow
        </button>
        <button
          onClick={() => { setActiveStep(0); setIsPlaying(false); }}
          className="px-4 py-2 rounded-lg text-[13px] font-medium transition-colors"
          style={{
            background: 'var(--color-surface-alt)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
