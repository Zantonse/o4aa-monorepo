import Link from 'next/link';
import { hasConfig } from '@/lib/config';
import ConfigForm from '@/components/ConfigForm';
import SetupGuide from '@/components/SetupGuide';

export default async function SettingsPage() {
  const configured = await hasConfig();

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text)', marginBottom: '0.25rem' }}>
            Settings
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
            Configure your Okta environment for the JAG token exchange flow.
          </p>
        </div>
        <Link
          href="/"
          style={{
            fontSize: '0.8125rem', color: 'var(--color-primary-600)',
            textDecoration: 'none', fontWeight: 500,
          }}
        >
          Back to Home
        </Link>
      </div>

      {/* Side-by-side: guide left, config right (stacks on mobile) */}
      <div className="settings-grid">
        {/* Left: Setup guide */}
        <div>
          <h2 style={sectionHeadingStyle}>Setup Guide</h2>
          <SetupGuide />
        </div>

        {/* Right: Config form (sticky on desktop) */}
        <div>
          <div className="settings-form-sticky">
            <h2 style={sectionHeadingStyle}>Configuration</h2>
            <div className="card" style={{ padding: '1.5rem' }}>
              <ConfigForm hasExisting={configured} />
            </div>

            <div style={{
              marginTop: '1rem', background: 'var(--color-info-bg)',
              border: '1px solid var(--color-info-border)', borderRadius: 'var(--radius-md)',
              padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--color-info-text)', lineHeight: 1.6,
            }}>
              <strong>How it works:</strong> Configuration is encrypted and stored in a browser cookie.
              It never leaves your browser unencrypted.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionHeadingStyle: React.CSSProperties = {
  fontSize: '0.8125rem',
  fontWeight: 600,
  color: 'var(--color-text-muted)',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: '0.875rem',
};
