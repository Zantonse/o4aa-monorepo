'use client';

import { useState } from 'react';

interface Props {
  label:       string;
  token:       string;
  stepNumber:  number;
}

interface JwtParts {
  header:  Record<string, unknown>;
  payload: Record<string, unknown>;
  raw:     string;
}

function parseJwt(token: string): JwtParts | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const decode = (s: string) => JSON.parse(atob(s.replace(/-/g, '+').replace(/_/g, '/'))) as Record<string, unknown>;
    return {
      header:  decode(parts[0]),
      payload: decode(parts[1]),
      raw:     token,
    };
  } catch {
    return null;
  }
}

function formatTimestamp(value: unknown): string {
  if (typeof value !== 'number') return String(value);
  return `${value} (${new Date(value * 1000).toLocaleString()})`;
}

function renderValue(key: string, value: unknown): string {
  const tsKeys = ['iat', 'exp', 'nbf', 'auth_time'];
  if (tsKeys.includes(key) && typeof value === 'number') return formatTimestamp(value);
  if (typeof value === 'object') return JSON.stringify(value, null, 2);
  return String(value);
}

const STEP_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: 'var(--color-info-bg)',    text: 'var(--color-info-text)',    border: 'var(--color-info-border)' },
  2: { bg: 'var(--color-warn-bg)',    text: 'var(--color-warn-text)',    border: 'var(--color-warn-border)' },
  3: { bg: 'var(--color-success-bg)', text: 'var(--color-success-text)', border: 'var(--color-success-border)' },
};

export default function TokenCard({ label, token, stepNumber }: Props) {
  const [activeTab, setActiveTab] = useState<'header' | 'payload' | 'raw'>('payload');
  const [copied, setCopied]       = useState(false);

  const colors = STEP_COLORS[stepNumber] ?? STEP_COLORS[1];
  const parsed = parseJwt(token);

  async function copyToken() {
    try {
      await navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard not available in all environments
    }
  }

  const tabs: Array<{ id: 'header' | 'payload' | 'raw'; label: string }> = [
    { id: 'payload', label: 'Payload' },
    { id: 'header',  label: 'Header' },
    { id: 'raw',     label: 'Raw' },
  ];

  return (
    <div
      className="card"
      style={{ overflow: 'hidden' }}
      aria-label={`${label} token details`}
    >
      {/* Card header */}
      <div
        style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent:'space-between',
          padding:       '0.875rem 1rem',
          background:    colors.bg,
          borderBottom:  `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width:          '1.5rem',
              height:         '1.5rem',
              borderRadius:   '9999px',
              background:     colors.text,
              color:          colors.bg,
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              fontSize:       '0.6875rem',
              fontWeight:     700,
              flexShrink:     0,
            }}
          >
            {stepNumber}
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.9375rem', color: colors.text }}>
            {label}
          </span>
        </div>
        <button
          onClick={copyToken}
          title="Copy raw token"
          style={{
            background:   'transparent',
            border:       `1px solid ${colors.border}`,
            borderRadius: 'var(--radius-sm)',
            padding:      '0.25rem 0.625rem',
            fontSize:     '0.75rem',
            color:        colors.text,
            cursor:       'pointer',
            fontFamily:   'var(--font-sans)',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Tabs */}
      {parsed && (
        <div
          style={{
            display:     'flex',
            gap:         '2px',
            padding:     '0.5rem 1rem 0',
            background:  'var(--color-surface)',
            borderBottom:'1px solid var(--color-border)',
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding:      '0.25rem 0.75rem',
                borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                border:       'none',
                cursor:       'pointer',
                fontSize:     '0.8125rem',
                fontWeight:   activeTab === tab.id ? 600 : 400,
                fontFamily:   'var(--font-sans)',
                background:   activeTab === tab.id ? colors.bg    : 'transparent',
                color:        activeTab === tab.id ? colors.text  : 'var(--color-text-muted)',
                borderBottom: activeTab === tab.id ? `2px solid ${colors.text}` : '2px solid transparent',
                transition:   'color 150ms, background 150ms',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ padding: '1rem' }}>
        {parsed && activeTab !== 'raw' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
            {Object.entries(activeTab === 'header' ? parsed.header : parsed.payload).map(([key, val]) => (
              <div
                key={key}
                style={{
                  display:   'grid',
                  gridTemplateColumns: '6rem 1fr',
                  gap:       '0.5rem',
                  alignItems:'start',
                  fontSize:  '0.8125rem',
                }}
              >
                <span
                  style={{
                    color:      colors.text,
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    wordBreak:  'break-all',
                    paddingTop: '1px',
                  }}
                >
                  {key}
                </span>
                <span
                  style={{
                    color:      'var(--color-text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    wordBreak:  'break-all',
                    lineHeight: 1.5,
                  }}
                >
                  {renderValue(key, val)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="code-block" style={{ fontSize: '0.75rem', wordBreak: 'break-all' }}>
            {token}
          </div>
        )}
      </div>
    </div>
  );
}
