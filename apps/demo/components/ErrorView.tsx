interface Props {
  message: string;
  /** When true, renders a compact banner rather than a full-page card */
  compact?: boolean;
}

export default function ErrorView({ message, compact = false }: Props) {
  if (compact) {
    return (
      <div
        role="alert"
        style={{
          display:      'flex',
          alignItems:   'flex-start',
          gap:          '0.75rem',
          background:   'oklch(0.97 0.02 25)',
          border:       '1px solid oklch(0.88 0.08 25)',
          borderRadius: 'var(--radius-md)',
          padding:      '0.875rem 1rem',
          marginBottom: '1.5rem',
          fontSize:     '0.875rem',
          color:        'oklch(0.35 0.14 25)',
          lineHeight:   1.55,
        }}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          aria-hidden="true"
          style={{ flexShrink: 0, marginTop: '1px' }}
        >
          <circle cx="9" cy="9" r="8" fill="oklch(0.55 0.18 25)" />
          <path d="M9 5v5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="9" cy="12.5" r="0.75" fill="white" />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return (
    <div
      role="alert"
      className="card"
      style={{
        padding:   '2rem',
        maxWidth:  '520px',
        margin:    '0 auto',
      }}
    >
      {/* Icon */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div
          style={{
            display:        'inline-flex',
            alignItems:     'center',
            justifyContent: 'center',
            width:          '3.5rem',
            height:         '3.5rem',
            borderRadius:   '9999px',
            background:     'oklch(0.97 0.02 25)',
            border:         '2px solid oklch(0.88 0.08 25)',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 9v5" stroke="oklch(0.55 0.18 25)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="17" r="1" fill="oklch(0.55 0.18 25)" />
            <path
              d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              stroke="oklch(0.55 0.18 25)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Heading */}
      <h2
        style={{
          fontSize:    '1.1875rem',
          fontWeight:  700,
          color:       'var(--color-text)',
          textAlign:   'center',
          marginBottom:'0.75rem',
        }}
      >
        Flow Failed
      </h2>

      {/* Error message */}
      <p
        style={{
          fontSize:  '0.9375rem',
          color:     'var(--color-text-secondary)',
          textAlign: 'center',
          lineHeight:1.6,
          marginBottom: '1.5rem',
        }}
      >
        {message}
      </p>

      {/* Divider */}
      <hr style={{ border: 'none', borderTop: '1px solid var(--color-border)', marginBottom: '1.25rem' }} />

      {/* Troubleshooting hints */}
      <div
        style={{
          background:   'var(--color-surface-alt)',
          borderRadius: 'var(--radius-sm)',
          padding:      '0.875rem 1rem',
          fontSize:     '0.8125rem',
          color:        'var(--color-text-secondary)',
          lineHeight:   1.6,
        }}
      >
        <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.375rem' }}>
          Troubleshooting tips
        </strong>
        <ul style={{ margin: 0, paddingLeft: '1.125rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <li>Verify all environment variables in <code style={{ fontFamily: 'var(--font-mono)' }}>.env.local</code></li>
          <li>Check that the redirect URI matches exactly in Okta</li>
          <li>Confirm the agent client has token exchange grants enabled</li>
          <li>Ensure AGENT_PRIVATE_KEY_JWK is valid JSON and AGENT_KEY_ID matches</li>
        </ul>
      </div>
    </div>
  );
}
