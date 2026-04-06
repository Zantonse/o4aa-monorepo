'use client';

import { useState } from 'react';
import type { FlowStep } from '@/lib/session';

interface Props {
  steps: FlowStep[];
}

function StepItem({ step, index }: { step: FlowStep; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const isError = !!step.error;

  const dotColor    = isError ? 'oklch(0.55 0.18 25)'      : 'var(--color-success-text)';
  const labelColor  = isError ? 'oklch(0.40 0.15 25)'      : 'var(--color-success-text)';
  const borderColor = isError ? 'oklch(0.88 0.08 25)'      : 'var(--color-success-border)';
  const bgColor     = isError ? 'oklch(0.97 0.02 25)'      : 'var(--color-success-bg)';

  const statusLabel = isError ? 'Failed' : 'Success';

  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
      {/* Timeline dot + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '1.75rem', flexShrink: 0, paddingTop: '3px' }}>
        <div
          style={{
            width:          '1.75rem',
            height:         '1.75rem',
            borderRadius:   '9999px',
            background:     dotColor,
            color:          'white',
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            fontSize:       '0.75rem',
            fontWeight:     700,
            flexShrink:     0,
            zIndex:         1,
          }}
        >
          {isError ? '!' : index + 1}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0, paddingBottom: '1.5rem' }}>
        {/* Step label + status */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9375rem' }}>
            {step.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {step.durationMs != null && (
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                {step.durationMs}ms
              </span>
            )}
            <span
              style={{
                background:   bgColor,
                color:        labelColor,
                border:       `1px solid ${borderColor}`,
                borderRadius: '9999px',
                padding:      '0.125rem 0.625rem',
                fontSize:     '0.75rem',
                fontWeight:   600,
              }}
            >
              {statusLabel}
            </span>
          </div>
        </div>

        {/* Endpoint */}
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize:   '0.75rem',
            color:      'var(--color-text-muted)',
            marginBottom: '0.5rem',
            overflow:   'hidden',
            textOverflow:'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={step.endpoint}
        >
          POST {step.endpoint}
        </div>

        {/* Error message */}
        {step.error && (
          <div
            style={{
              background:   'oklch(0.97 0.02 25)',
              border:       '1px solid oklch(0.88 0.08 25)',
              borderRadius: 'var(--radius-sm)',
              padding:      '0.625rem 0.75rem',
              fontSize:     '0.8125rem',
              color:        'oklch(0.40 0.15 25)',
              lineHeight:   1.5,
              marginBottom: '0.5rem',
            }}
          >
            {step.error}
          </div>
        )}

        {/* Expand / collapse details */}
        <button
          onClick={() => setExpanded(v => !v)}
          style={{
            background:   'transparent',
            border:       'none',
            cursor:       'pointer',
            color:        'var(--color-primary-500)',
            fontSize:     '0.8125rem',
            padding:      '0',
            fontFamily:   'var(--font-sans)',
            display:      'flex',
            alignItems:   'center',
            gap:          '0.25rem',
          }}
          aria-expanded={expanded}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            aria-hidden="true"
            style={{ transition: 'transform 150ms', transform: expanded ? 'rotate(90deg)' : 'none' }}
          >
            <path d="M3 2l5 4-5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {expanded ? 'Hide' : 'Show'} request params
        </button>

        {/* Expanded details */}
        {expanded && (
          <div style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {/* Request params */}
            {Object.keys(step.params).length > 0 && (
              <div>
                <div
                  style={{
                    fontSize:       '0.75rem',
                    fontWeight:     600,
                    textTransform:  'uppercase',
                    letterSpacing:  '0.06em',
                    color:          'var(--color-text-muted)',
                    marginBottom:   '0.375rem',
                  }}
                >
                  Request
                </div>
                <div className="code-block">
                  {Object.entries(step.params).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ color: 'oklch(0.78 0.16 85)' }}>{k}</span>
                      <span style={{ color: 'oklch(0.70 0.04 260)' }}>=</span>
                      <span style={{ color: 'oklch(0.85 0.05 160)' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Response metadata */}
            {step.response && Object.keys(step.response).length > 0 && (
              <div>
                <div
                  style={{
                    fontSize:       '0.75rem',
                    fontWeight:     600,
                    textTransform:  'uppercase',
                    letterSpacing:  '0.06em',
                    color:          'var(--color-text-muted)',
                    marginBottom:   '0.375rem',
                  }}
                >
                  Response (metadata only)
                </div>
                <div className="code-block">
                  {Object.entries(step.response).map(([k, v]) => (
                    <div key={k}>
                      <span style={{ color: 'oklch(0.78 0.16 85)' }}>{k}</span>
                      <span style={{ color: 'oklch(0.70 0.04 260)' }}>: </span>
                      <span style={{ color: 'oklch(0.85 0.05 160)' }}>{JSON.stringify(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function StepTimeline({ steps }: Props) {
  if (steps.length === 0) {
    return (
      <div className="card" style={{ padding: '1.5rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
        No steps recorded.
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <div
        style={{
          fontSize:      '0.8125rem',
          fontWeight:    600,
          color:         'var(--color-text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom:  '1.25rem',
        }}
      >
        Step Details
      </div>

      {/* Steps with vertical connector lines */}
      <div style={{ position: 'relative' }}>
        {/* Vertical line */}
        <div
          style={{
            position:   'absolute',
            left:       '0.875rem',
            top:        '1.75rem',
            bottom:     '1.75rem',
            width:      '2px',
            background: 'var(--color-border)',
            transform:  'translateX(-50%)',
          }}
          aria-hidden="true"
        />
        {steps.map((step, idx) => (
          <StepItem key={idx} step={step} index={idx} />
        ))}
      </div>
    </div>
  );
}
