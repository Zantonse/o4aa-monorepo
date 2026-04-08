import { cookies } from 'next/headers';
import Link from 'next/link';
import { decrypt, COOKIE_NAME, type FlowSession } from '@/lib/session';
import FlowDiagram from '@/components/FlowDiagram';
import TokenCard from '@/components/TokenCard';
import StepTimeline from '@/components/StepTimeline';
import ErrorView from '@/components/ErrorView';

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function FlowPage({ searchParams }: PageProps) {
  const { error: urlError } = await searchParams;

  // Read + decrypt the session cookie (server-side)
  const cookieStore = await cookies();
  const raw = cookieStore.get(COOKIE_NAME)?.value;
  const session = raw ? (decrypt(raw) as FlowSession | null) : null;

  const displayError = urlError ?? session?.error;

  if (!raw && !urlError) {
    // No session at all — redirect to home
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
          No active flow session. Start from the beginning.
        </p>
        <Link href="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (displayError && !session?.steps?.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <ErrorView message={displayError} />
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/api/auth/login" className="btn-primary">
            Retry Flow
          </Link>
        </div>
      </div>
    );
  }

  const steps      = session?.steps ?? [];
  const succeeded  = !displayError && !!session?.accessToken;

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
              Flow Results
            </h1>
            {session?.completedAt && (
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                Completed {new Date(session.completedAt).toLocaleTimeString()}
              </p>
            )}
          </div>
          <Link href="/api/auth/login" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}>
            Run Again
          </Link>
        </div>
      </div>

      {/* Error banner (partial failure — steps may still exist) */}
      {displayError && <ErrorView message={displayError} compact />}

      {/* Flow Diagram */}
      <div style={{ marginBottom: '2rem' }}>
        <FlowDiagram steps={steps} succeeded={succeeded} />
      </div>

      {/* Two-column: timeline + tokens (stacks on mobile) */}
      <div className="flow-grid">
        {/* Left: Step Timeline */}
        <div>
          <StepTimeline steps={steps} />
        </div>

        {/* Right: Token Cards with flow arrows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Main token flow: ID → JAG → Access with arrows */}
          <div>
            <div
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--color-text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.875rem',
              }}
            >
              Token Chain
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {session?.idToken && (
                <>
                  <TokenCard label="ID Token" token={session.idToken} stepNumber={1} />
                  {session?.jagToken && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 0' }}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M16 6v16M10 16l6 6 6-6" stroke="var(--color-primary-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </>
              )}
              {session?.jagToken && (
                <>
                  <TokenCard label="JAG Token" token={session.jagToken} stepNumber={2} />
                  {session?.accessToken && (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '0.25rem 0' }}>
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                        <path d="M16 6v16M10 16l6 6 6-6" stroke="var(--color-primary-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </>
              )}
              {session?.accessToken && (
                <TokenCard label="Access Token" token={session.accessToken} stepNumber={3} />
              )}
            </div>
          </div>

          {/* Client assertions (secondary — collapsed by default) */}
          {(session?.jagClientAssertion || session?.resourceClientAssertion) && (
            <div>
              <div
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: 'var(--color-text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  marginBottom: '0.875rem',
                }}
              >
                Client Assertions (private_key_jwt)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {session?.jagClientAssertion && (
                  <TokenCard label="Step 2 Client Assertion" token={session.jagClientAssertion} stepNumber={2} />
                )}
                {session?.resourceClientAssertion && (
                  <TokenCard label="Step 3 Client Assertion" token={session.resourceClientAssertion} stepNumber={3} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
