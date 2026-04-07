'use client';

import Image from 'next/image';
import type { FlowStep } from '@/lib/session';

interface Props {
  steps:     FlowStep[];
  succeeded: boolean;
}

/**
 * Hotspots positioned over the flow.png sequence diagram.
 * Each maps to a numbered circle on the diagram and scrolls to the
 * corresponding StepTimeline entry on click.
 */
const HOTSPOTS = [
  { id: 1, label: '1. SSO Login',               left: '9.5%',  top: '20%',  step: 1 },
  { id: 2, label: '2. ID Token returned',        left: '52%',   top: '29%',  step: 1 },
  { id: 3, label: '3. Exchange for JAG',          left: '30.5%', top: '46%',  step: 2 },
  { id: 4, label: '4. JAG Assertion returned',    left: '52%',   top: '56.5%', step: 2 },
  { id: 5, label: '5. Present JAG for AT',        left: '30.5%', top: '64%',  step: 3 },
  { id: 6, label: '6. Scoped Access Token',       left: '64%',   top: '71%',  step: 3 },
] as const;

type Status = 'pending' | 'success' | 'error';

function getStepStatus(stepNumber: number, steps: FlowStep[], succeeded: boolean): Status {
  const s = steps[stepNumber - 1];
  if (!s) return 'pending';
  if (s.error) return 'error';
  if (stepNumber === steps.length && !succeeded) return 'error';
  return 'success';
}

function statusColor(status: Status): string {
  if (status === 'success') return 'var(--color-success-text)';
  if (status === 'error')   return 'oklch(0.55 0.18 25)';
  return 'var(--color-text-muted)';
}

function statusBg(status: Status): string {
  if (status === 'success') return 'var(--color-success-bg)';
  if (status === 'error')   return 'oklch(0.97 0.02 25)';
  return 'var(--color-surface-alt)';
}

function scrollToStep(stepNumber: number) {
  const el = document.getElementById(`step-${stepNumber}`);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

      {/* Flow diagram image with clickable hotspots */}
      <div style={{ position: 'relative', width: '100%' }}>
        <Image
          src="/flow.png"
          alt="ID-JAG Token Exchange Flow — RFC 8693 + RFC 7523"
          width={1184}
          height={847}
          style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-sm)' }}
          priority
        />

        {/* Clickable hotspot circles */}
        {HOTSPOTS.map(hotspot => {
          const status = getStepStatus(hotspot.step, steps, succeeded);
          const bg     = statusColor(status);
          const bgFill = statusBg(status);

          return (
            <button
              key={hotspot.id}
              onClick={() => scrollToStep(hotspot.step)}
              title={`${hotspot.label} — click to see Step ${hotspot.step} details`}
              aria-label={hotspot.label}
              style={{
                position:       'absolute',
                left:           hotspot.left,
                top:            hotspot.top,
                transform:      'translate(-50%, -50%)',
                width:          '1.75rem',
                height:         '1.75rem',
                borderRadius:   '9999px',
                border:         `2.5px solid ${bg}`,
                background:     bgFill,
                cursor:         'pointer',
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                fontSize:       '0.6875rem',
                fontWeight:     700,
                color:          bg,
                padding:        0,
                transition:     'transform 150ms, box-shadow 150ms',
                boxShadow:      '0 1px 4px rgba(0,0,0,0.12)',
                zIndex:         2,
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translate(-50%, -50%) scale(1.25)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.transform = 'translate(-50%, -50%) scale(1)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';
              }}
            >
              {hotspot.step}
            </button>
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
