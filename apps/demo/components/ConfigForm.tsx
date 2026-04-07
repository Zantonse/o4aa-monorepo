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
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pasteError, setPasteError] = useState<string | null>(null);
  const [pasteSuccess, setPasteSuccess] = useState(false);

  function update(key: keyof DemoConfig, value: string) {
    setConfig(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function onIssuerChange(value: string) {
    const base = value.replace(/\/$/, '');
    setConfig(prev => ({
      ...prev,
      oktaIssuer: base,
      redirectUri: prev.redirectUri || `${window.location.origin}/api/auth/callback`,
      jagIssuer: prev.jagIssuer || `${base}/oauth2`,
      jagAudience: prev.jagAudience || `${base}/oauth2/v1/token`,
    }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);

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
      setSaved(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save configuration');
    } finally {
      setSaving(false);
    }
  }

  async function handleClear() {
    await fetch('/api/config', { method: 'DELETE' });
    setConfig(EMPTY_CONFIG);
    setSaved(false);
    window.location.reload();
  }

  async function handlePaste() {
    setPasteError(null);
    setPasteSuccess(false);
    try {
      const text = await navigator.clipboard.readText();
      const parsed = JSON.parse(text);
      if (typeof parsed !== 'object' || !parsed.clientId) {
        throw new Error('Invalid config JSON — missing clientId');
      }
      setConfig(prev => {
        const updated = { ...prev };
        for (const key of Object.keys(prev) as Array<keyof DemoConfig>) {
          if (typeof parsed[key] === 'string' && parsed[key]) {
            updated[key] = parsed[key];
          }
        }
        return updated;
      });
      setPasteSuccess(true);
      setSaved(false);
      setTimeout(() => setPasteSuccess(false), 3000);
    } catch (err) {
      setPasteError(err instanceof Error ? err.message : 'Failed to parse clipboard content as config JSON');
    }
  }

  return (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        paddingBottom: '1.25rem', marginBottom: '1.25rem',
        borderBottom: '1px solid var(--color-border)',
      }}>
        <button
          onClick={handlePaste}
          style={{
            background: 'transparent', border: '1px solid var(--color-primary-600)',
            borderRadius: 'var(--radius-sm)', padding: '0.5rem 1rem',
            fontSize: '0.8125rem', color: 'var(--color-primary-600)',
            cursor: 'pointer', fontWeight: 500,
          }}
        >
          Paste Config JSON
        </button>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          from O4AA Config Clipboard extension
        </span>
      </div>

      {pasteSuccess && (
        <div style={{
          background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem',
          fontSize: '0.8125rem', color: 'var(--color-success-text)', marginBottom: '1rem',
        }}>
          Config pasted successfully. Review the values below and click Save.
        </div>
      )}

      {pasteError && (
        <div style={{
          background: 'oklch(0.98 0.02 25)', border: '1px solid oklch(0.88 0.10 25)',
          borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem',
          fontSize: '0.8125rem', color: 'oklch(0.40 0.15 25)', marginBottom: '1rem',
        }}>
          {pasteError}
        </div>
      )}

      {CONFIG_FIELDS.map(group => (
        <div key={group.group} style={{ marginBottom: '1.5rem' }}>
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

      {saved && (
        <div style={{
          background: 'var(--color-success-bg)', border: '1px solid var(--color-success-border)',
          borderRadius: 'var(--radius-sm)', padding: '0.625rem 0.875rem',
          fontSize: '0.8125rem', color: 'var(--color-success-text)', marginBottom: '1rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>Configuration saved. You can now run the flow from the home page.</span>
          <a href="/" style={{ color: 'var(--color-success-text)', fontWeight: 600, textDecoration: 'underline' }}>
            Go to Home
          </a>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          onClick={handleSave}
          disabled={saving || !config.clientId || !config.oktaIssuer}
          className="btn-primary"
          style={{ fontSize: '0.875rem', padding: '0.625rem 1.25rem', opacity: saving ? 0.6 : 1 }}
        >
          {saving ? 'Saving...' : 'Save Configuration'}
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
