'use client';

import type { FlowStep } from '@/lib/session';

interface Props {
  steps:     FlowStep[];
  succeeded: boolean;
}

const STEP_DEFS = [
  {
    number:  1,
    label:   'Step 1',
    title:   'Auth Code\n→ ID Token',
    fromLabel: 'User',
    toLabel:   'Okta /token',
  },
  {
    number:  2,
    label:   'Step 2',
    title:   'ID Token\n→ JAG Token',
    fromLabel: 'Agent',
    toLabel:   'JAG Issuer',
  },
  {
    number:  3,
    label:   'Step 3',
    title:   'JAG Token\n→ Access Token',
    fromLabel: 'Agent',
    toLabel:   'Resource Server',
  },
] as const;

function getStatus(stepNumber: number, steps: FlowStep[], succeeded: boolean) {
  const s = steps[stepNumber - 1];
  if (!s) return 'pending';
  if (s.error) return 'error';
  if (stepNumber === steps.length && !succeeded) return 'error';
  return 'success';
}

type Status = 'pending' | 'success' | 'error';

function statusColors(status: Status) {
  if (status === 'success') return {
    ring:   'var(--color-success-border)',
    bg:     'var(--color-success-bg)',
    text:   'var(--color-success-text)',
    label:  '#16a34a',
  };
  if (status === 'error') return {
    ring:   'oklch(0.88 0.08 25)',
    bg:     'oklch(0.97 0.02 25)',
    text:   'oklch(0.40 0.15 25)',
    label:  'oklch(0.40 0.15 25)',
  };
  return {
    ring:   'var(--color-border)',
    bg:     'var(--color-surface-alt)',
    text:   'var(--color-text-muted)',
    label:  'var(--color-text-muted)',
  };
}

function StatusIcon({ status }: { status: Status }) {
  if (status === 'success') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="8" fill="var(--color-success-text)" />
        <path d="M5.5 9L7.5 11L12.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'error') {
    return (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="8" fill="oklch(0.55 0.18 25)" />
        <path d="M6 6L12 12M12 6L6 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" stroke="var(--color-border)" strokeWidth="1.5" fill="var(--color-surface-alt)" />
    </svg>
  );
}

export default function FlowDiagram({ steps, succeeded }: Props) {
  return (
    <div
      className="card"
      style={{ padding: '1.5rem 2rem' }}
      aria-label="Token exchange flow diagram"
    >
      <div
        style={{
          fontSize: '0.8125rem',
          fontWeight: 600,
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '1.25rem',
        }}
      >
        Token Exchange Flow
      </div>

      {/* Three step boxes with connector arrows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr auto 1fr',
          alignItems: 'center',
          gap: '0',
          overflowX: 'auto',
        }}
      >
        {STEP_DEFS.map((def, idx) => {
          const status = getStatus(def.number, steps, succeeded);
          const colors = statusColors(status);
          const step   = steps[idx];

          return (
            <>
              {/* Step box */}
              <div
                key={`step-${def.number}`}
                style={{
                  border:       `2px solid ${colors.ring}`,
                  background:   colors.bg,
                  borderRadius: 'var(--radius-md)',
                  padding:      '0.875rem 1rem',
                  minWidth:     '140px',
                  textAlign:    'center',
                  position:     'relative',
                }}
              >
                {/* Status icon (top-right) */}
                <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
                  <StatusIcon status={status} />
                </div>

                {/* Step number badge */}
                <div
                  style={{
                    display:         'inline-flex',
                    alignItems:      'center',
                    justifyContent:  'center',
                    width:           '1.5rem',
                    height:          '1.5rem',
                    borderRadius:    '9999px',
                    background:      colors.text,
                    color:           colors.bg,
                    fontSize:        '0.6875rem',
                    fontWeight:      700,
                    marginBottom:    '0.5rem',
                  }}
                >
                  {def.number}
                </div>

                {/* Title (multi-line) */}
                <div
                  style={{
                    fontSize:    '0.8125rem',
                    fontWeight:  600,
                    color:       colors.text,
                    lineHeight:  1.3,
                    whiteSpace:  'pre-line',
                    marginBottom: '0.375rem',
                  }}
                >
                  {def.title}
                </div>

                {/* Duration */}
                {step?.durationMs != null && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {step.durationMs}ms
                  </div>
                )}

                {/* Endpoint label */}
                <div
                  style={{
                    fontSize:     '0.6875rem',
                    color:        'var(--color-text-muted)',
                    marginTop:    '0.5rem',
                    fontFamily:   'var(--font-mono)',
                    overflow:     'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace:   'nowrap',
                    maxWidth:     '100%',
                  }}
                  title={step?.endpoint}
                >
                  {def.fromLabel} → {def.toLabel}
                </div>
              </div>

              {/* Arrow connector (not after last) */}
              {idx < STEP_DEFS.length - 1 && (
                <div
                  key={`arrow-${def.number}`}
                  style={{
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    padding:        '0 0.5rem',
                    color:          'var(--color-text-muted)',
                  }}
                  aria-hidden="true"
                >
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path d="M0 8h28M22 3l7 5-7 5" stroke="var(--color-border)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </>
          );
        })}
      </div>

      {/* Overall status */}
      <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
        {succeeded ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-success-text)', fontSize: '0.875rem', fontWeight: 500 }}>
            <StatusIcon status="success" />
            All 3 steps completed successfully — access token issued
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'oklch(0.40 0.15 25)', fontSize: '0.875rem', fontWeight: 500 }}>
            <StatusIcon status="error" />
            Flow failed — see step details below
          </div>
        )}
      </div>
    </div>
  );
}
