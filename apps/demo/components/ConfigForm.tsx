'use client';

import { useState } from 'react';
import { CONFIG_FIELDS, type DemoConfig } from '@/lib/config-shared';

const EMPTY_CONFIG: DemoConfig = {
  clientId: '', clientSecret: '', oktaIssuer: '', redirectUri: '',
  agentClientId: '', agentPrivateKeyJwk: '', agentKeyId: '',
  jagIssuer: '', jagAudience: '', jagTargetAudience: '', jagScope: 'ai_agent',
  resourceAudience: '', resourceTokenEndpoint: '',
};

export default function ConfigForm({ hasExisting }: { hasExisting: boolean }) {
  const [config, setConfig] = useState<DemoConfig>(EMPTY_CONFIG);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(!hasExisting);

  function update(key: keyof DemoConfig, value: string) {
    setConfig(prev => ({ ...prev, [key]: value }));
  }

  // Auto-derive dependent fields from oktaIssuer when it changes
  function onIssuerChange(value: string) {
    const base = value.replace(/\/$/, '');
    setConfig(prev => ({
      ...prev,
      oktaIssuer: base,
      redirectUri: prev.redirectUri || `${window.location.origin}/api/auth/callback`,
      jagIssuer: prev.jagIssuer || `${base}/oauth2`,
      jagAudience: prev.jagAudience || `${base}/oauth2/v1/token`,
    }));
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

    // Auto-fill redirect URI if blank
    if (!config.redirectUri) {
      config.redirectUri = `${window.location.origin}/api/auth/callback`;
    }

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }
      // Redirect to start the flow
      window.location.href = '/api/auth/login';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
      setSaving(false);
    }
  }

  async function handleClear() {
    await fetch('/api/config', { method: 'DELETE' });
    setConfig(EMPTY_CONFIG);
    setExpanded(true);
    window.location.reload();
  }

  if (!expanded) {
    return (
      <div style={{
        display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap',
        background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)',
        borderRadius: 'var(--radius-md)', padding: '0.875rem 1.25rem',
      }}>
        <span style={{ color: 'var(--color-success-text)', fontSize: '0.875rem', fontWeight: 500, flex: 1 }}>
          Configuration saved. Ready to run the flow.
        </span>
        <button
          onClick={() => setExpanded(true)}
          style={{
            background: 'transparent', border: '1px solid var(--color-success-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.75rem',
            fontSize: '0.8125rem', color: 'var(--color-success-text)', cursor: 'pointer',
          }}
        >
          Edit Config
        </button>
        <button
          onClick={handleClear}
          style={{
            background: 'transparent', border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)', padding: '0.375rem 0.75rem',
            fontSize: '0.8125rem', color: 'var(--color-text-muted)', cursor: 'pointer',
          }}
        >
          Clear
        </button>
      </div>
    );
  }

  return (
    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{
          fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>
          Configuration
        </h2>
        {hasExisting && (
          <button
            onClick={() => setExpanded(false)}
            style={{
              background: 'transparent', border: 'none', color: 'var(--color-text-muted)',
              fontSize: '0.8125rem', cursor: 'pointer', textDecoration: 'underline',
            }}
          >
            Collapse
          </button>
        )}
      </div>

      {CONFIG_FIELDS.map(group => (
        <div key={group.group} style={{ marginBottom: '1.25rem' }}>
          <h3 style={{
            fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary-600)',
            textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.75rem',
            fontFamily: 'var(--font-mono)',
          }}>
            {group.group}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.625rem' }}>
            {group.fields.map(field => (
              <div key={field.key} style={{ gridColumn: field.multiline ? '1 / -1' : undefined }}>
                <label style={{
                  display: 'block', fontSize: '0.8125rem', fontWeight: 500,
                  color: 'var(--color-text)', marginBottom: '0.25rem',
                }}>
                  {field.label}
                </label>
                {field.multiline ? (
                  <textarea
                    value={config[field.key]}
                    onChange={e => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    rows={3}
                    style={{
                      width: '100%', padding: '0.5rem 0.625rem',
                      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
                      background: 'var(--color-surface)', color: 'var(--color-text)',
                      resize: 'vertical',
                    }}
                  />
                ) : (
                  <input
                    type={field.key === 'clientSecret' ? 'password' : 'text'}
                    value={config[field.key]}
                    onChange={e => {
                      if (field.key === 'oktaIssuer') onIssuerChange(e.target.value);
                      else update(field.key, e.target.value);
                    }}
                    placeholder={field.placeholder}
                    style={{
                      width: '100%', padding: '0.5rem 0.625rem',
                      border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                      fontSize: '0.8125rem', fontFamily: 'var(--font-mono)',
                      background: 'var(--color-surface)', color: 'var(--color-text)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {error && (
        <div style={{
          background: 'oklch(0.98 0.02 25)', border: '1px solid oklch(0.88 0.10 25)',
          borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem',
          fontSize: '0.8125rem', color: 'oklch(0.40 0.15 25)', marginBottom: '1rem',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={handleSave}
          disabled={saving || !config.clientId || !config.oktaIssuer}
          className="btn-primary"
          style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving...' : 'Save & Start Flow'}
        </button>
        {hasExisting && (
          <button
            onClick={handleClear}
            style={{
              background: 'transparent', border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)', padding: '0.625rem 1rem',
              fontSize: '0.8125rem', color: 'var(--color-text-muted)', cursor: 'pointer',
            }}
          >
            Clear Saved Config
          </button>
        )}
      </div>
    </div>
  );
}
