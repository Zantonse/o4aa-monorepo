import Link from 'next/link';
import { hasConfig } from '@/lib/config';
import ConfigForm from '@/components/ConfigForm';

export default async function SettingsPage() {
  const configured = await hasConfig();

  return (
    <div className="max-w-3xl mx-auto">
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

      <div className="card" style={{ padding: '1.5rem' }}>
        <ConfigForm hasExisting={configured} />
      </div>

      <div style={{
        marginTop: '1.5rem', background: 'var(--color-info-bg)',
        border: '1px solid var(--color-info-border)', borderRadius: 'var(--radius-md)',
        padding: '1rem 1.25rem', fontSize: '0.8125rem', color: 'var(--color-info-text)', lineHeight: 1.6,
      }}>
        <strong>How it works:</strong> Your configuration is encrypted and stored in a browser cookie.
        It never leaves your browser unencrypted. Clear your cookies or click &quot;Clear Saved Config&quot; to remove it.
      </div>
    </div>
  );
}
