import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--color-info-bg)',
            border: '1px solid var(--color-info-border)',
            borderRadius: '9999px',
            padding: '0.25rem 0.875rem',
            fontSize: '0.8125rem',
            color: 'var(--color-info-text)',
            fontWeight: 500,
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              width: '0.5rem',
              height: '0.5rem',
              borderRadius: '9999px',
              background: 'var(--color-info-text)',
              display: 'inline-block',
            }}
          />
          JWT Authorization Grant (JAG)
        </div>

        <h1
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
            fontWeight: 800,
            color: 'var(--color-text)',
            lineHeight: 1.15,
            marginBottom: '1rem',
            letterSpacing: '-0.02em',
          }}
        >
          3-Step Token Exchange Flow
        </h1>
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
          }}
        >
          Demonstrates how an AI agent bootstraps trust using a user&apos;s identity —
          exchanging an ID token for a scoped access token via the JAG grant type.
        </p>

        <Link href="/api/auth/login" className="btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 1.75rem' }}>
          Start Flow
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Flow overview */}
      <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h2
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--color-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            marginBottom: '1.5rem',
          }}
        >
          Flow Overview
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            {
              step: '1',
              label: 'User Authenticates',
              detail: 'PKCE auth code flow → ID token from Okta',
              color: 'var(--color-primary-500)',
            },
            {
              step: '2',
              label: 'ID Token → JAG Token',
              detail: 'Token exchange with client_assertion at JAG issuer',
              color: 'var(--color-primary-500)',
            },
            {
              step: '3',
              label: 'JAG Token → Access Token',
              detail: 'Scoped access token for the resource server',
              color: 'var(--color-primary-500)',
            },
          ].map((item, idx, arr) => (
            <div key={item.step} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              {/* Connector line column */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '2rem', flexShrink: 0 }}>
                <div
                  style={{
                    width: '2rem',
                    height: '2rem',
                    borderRadius: '9999px',
                    background: item.color,
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    flexShrink: 0,
                    zIndex: 1,
                    position: 'relative',
                  }}
                >
                  {item.step}
                </div>
                {idx < arr.length - 1 && (
                  <div
                    style={{
                      width: '2px',
                      height: '2.5rem',
                      background: 'var(--color-border)',
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div style={{ paddingTop: '0.3rem', paddingBottom: idx < arr.length - 1 ? '0' : '0', flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.9375rem', marginBottom: '0.25rem' }}>
                  {item.label}
                </div>
                <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                  {item.detail}
                </div>
                {idx < arr.length - 1 && <div style={{ height: '1rem' }} />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two-column info cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <h3
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.875rem',
            }}
          >
            Grant Type
          </h3>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-primary-600)', wordBreak: 'break-all' }}>
            urn:ietf:params:oauth:<br />grant-type:token-exchange
          </p>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <h3
            style={{
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              marginBottom: '0.875rem',
            }}
          >
            Auth Method
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
            PKCE + private_key_jwt client assertion
          </p>
        </div>
      </div>

      {/* Prerequisites note */}
      <div
        style={{
          background: 'var(--color-warn-bg)',
          border: '1px solid var(--color-warn-border)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          fontSize: '0.875rem',
          color: 'var(--color-warn-text)',
          lineHeight: 1.6,
        }}
      >
        <strong>Prerequisites:</strong> Configure environment variables in{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>.env.local</code> before
        starting the flow. See{' '}
        <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}>README.md</code> for
        required values.
      </div>
    </div>
  );
}
