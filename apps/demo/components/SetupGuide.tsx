'use client';

import { useState } from 'react';

interface SectionProps {
  number: number;
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ number, title, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        transition: 'border-color 150ms var(--ease-micro)',
        ...(open ? { borderColor: 'var(--color-primary-200)' } : {}),
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1rem',
          background: open ? 'var(--color-primary-50)' : 'var(--color-surface)',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          fontFamily: 'var(--font-sans)',
          transition: 'background 150ms var(--ease-micro)',
        }}
      >
        <span
          style={{
            width: '1.5rem',
            height: '1.5rem',
            borderRadius: '9999px',
            background: 'var(--color-primary-600)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6875rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {number}
        </span>
        <span style={{ flex: 1, fontWeight: 600, fontSize: '0.9375rem', color: 'var(--color-text)' }}>
          {title}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
          style={{
            transition: 'transform 150ms var(--ease-micro)',
            transform: open ? 'rotate(180deg)' : 'none',
            flexShrink: 0,
          }}
        >
          <path d="M3 5l4 4 4-4" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          style={{
            padding: '1rem 1rem 1.25rem',
            borderTop: '1px solid var(--color-border)',
            fontSize: '0.8125rem',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        background: 'var(--color-surface-alt)',
        border: '1px solid var(--color-border)',
        borderRadius: '3px',
        padding: '0.1rem 0.35rem',
        color: 'var(--color-primary-600)',
      }}
    >
      {children}
    </code>
  );
}

function FieldTable({ rows }: { rows: [string, string][] }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(140px, auto) 1fr',
        gap: '0',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        fontSize: '0.8125rem',
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
      }}
    >
      {rows.map(([field, source], i) => (
        <div key={field} style={{ display: 'contents' }}>
          <div
            style={{
              padding: '0.5rem 0.75rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              fontSize: '0.75rem',
              color: 'var(--color-primary-600)',
              background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-alt)',
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
            }}
          >
            {field}
          </div>
          <div
            style={{
              padding: '0.5rem 0.75rem',
              color: 'var(--color-text-secondary)',
              background: i % 2 === 0 ? 'var(--color-surface)' : 'var(--color-surface-alt)',
              borderBottom: i < rows.length - 1 ? '1px solid var(--color-border-subtle)' : 'none',
            }}
          >
            {source}
          </div>
        </div>
      ))}
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'var(--color-warn-bg)',
        border: '1px solid var(--color-warn-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.625rem 0.75rem',
        fontSize: '0.8125rem',
        color: 'var(--color-warn-text)',
        lineHeight: 1.55,
        marginTop: '0.75rem',
      }}
    >
      {children}
    </div>
  );
}

export default function SetupGuide() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {/* Prerequisites */}
      <Section number={0} title="Prerequisites">
        <p style={{ marginBottom: '0.75rem' }}>
          Before configuring this demo, you need an Okta org with the <strong>Cross App Access (XAA)</strong> Early
          Access feature enabled.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Admin Console &rarr; Settings &rarr; Features</strong>
          </li>
          <li>
            Under <strong>Early Access</strong>, enable <InlineCode>Cross App Access</InlineCode>
          </li>
          <li>
            Verify you have admin rights to create OIDC apps, Authorization Servers, and Workload Principals
          </li>
        </ol>
        <Tip>
          <strong>No preview org?</strong> You can create one at{' '}
          <a href="https://developer.okta.com/signup/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
            developer.okta.com/signup
          </a>. The XAA feature flag is available on all preview orgs during EA.
        </Tip>
      </Section>

      {/* Step 1: OIDC Client */}
      <Section number={1} title="Create the OIDC Client (User Authentication)" defaultOpen>
        <p style={{ marginBottom: '0.5rem' }}>
          This is the web app that authenticates the user via PKCE and receives the initial ID token.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Applications &rarr; Applications &rarr; Create App Integration</strong>
          </li>
          <li>
            Select <strong>OIDC - OpenID Connect</strong>, then <strong>Web Application</strong>
          </li>
          <li>
            Set the <strong>Sign-in redirect URI</strong> to your callback URL
            (e.g. <InlineCode>https://o4aa-demo.vercel.app/api/auth/callback</InlineCode> or <InlineCode>http://localhost:3002/api/auth/callback</InlineCode> for local dev)
          </li>
          <li>
            Under <strong>General Settings</strong>, enable <strong>Federation Broker Mode</strong> &mdash; this
            is required for the OIDC app to participate in cross-app token exchange
          </li>
          <li>
            Under <strong>Assignments</strong>, assign the users who should be able to run the demo
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Client ID', 'General tab → Client ID'],
            ['Client Secret', 'General tab → Client secret (click "Edit" if hidden)'],
            ['Okta Issuer', 'Your org URL — e.g. https://your-domain.okta.com'],
            ['Redirect URI', 'The exact sign-in redirect URI you set above'],
          ]}
        />

        <Tip>
          <strong>Federation Broker Mode</strong> must be ON. Without it, the token exchange in Step 2
          will fail with a <InlineCode>400 invalid_grant</InlineCode> error.
        </Tip>
      </Section>

      {/* Step 2: Agent Identity */}
      <Section number={2} title="Create the AI Agent Identity (Workload Principal)">
        <p style={{ marginBottom: '0.5rem' }}>
          The agent needs its own identity in Okta &mdash; a Workload Principal with an RSA key pair
          for <InlineCode>private_key_jwt</InlineCode> client authentication.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Directory &rarr; People</strong> and switch to the <strong>Workload Identities</strong> tab
          </li>
          <li>
            Click <strong>Add Workload</strong> and give your agent a name (e.g. &quot;JAG Demo Agent&quot;)
          </li>
          <li>
            On the workload&apos;s detail page, go to the <strong>Credentials</strong> tab
          </li>
          <li>
            Click <strong>Generate Key Pair</strong> &mdash; this creates an RSA key pair.
            <strong> Download the private key JWK immediately</strong> &mdash; it is only shown once
          </li>
          <li>
            Note the <strong>Key ID (kid)</strong> displayed after generation
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Agent Client ID', 'The Workload Principal ID (starts with wlp_)'],
            ['Agent Private Key (JWK)', 'The full private JWK JSON you downloaded — paste the entire JSON object'],
            ['Agent Key ID', 'The kid value shown in the Credentials tab'],
          ]}
        />

        <Tip>
          <strong>Save the private key somewhere safe.</strong> Okta does not store the private portion.
          If you lose it, you must generate a new key pair.
        </Tip>
      </Section>

      {/* Step 3: Custom Auth Server */}
      <Section number={3} title="Configure the Custom Authorization Server (JAG Issuer)">
        <p style={{ marginBottom: '0.5rem' }}>
          The JAG token exchange happens at a Custom Authorization Server. This is where the ID token
          gets exchanged for a JAG assertion, and where the JAG is later presented for a scoped access token.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Security &rarr; API &rarr; Authorization Servers</strong>
          </li>
          <li>
            Use an existing Custom Authorization Server or click <strong>Add Authorization Server</strong>
          </li>
          <li>
            Note the <strong>Issuer URI</strong> (e.g. <InlineCode>https://your-domain.okta.com/oauth2/aus...</InlineCode>)
            and the <strong>Authorization Server ID</strong> (the <InlineCode>aus...</InlineCode> portion)
          </li>
          <li>
            Under the <strong>Scopes</strong> tab, add any scopes the agent will request
            (e.g. <InlineCode>ai_agent</InlineCode> or MCP scopes like <InlineCode>mcp:connect</InlineCode>)
          </li>
          <li>
            Under the <strong>Access Policies</strong> tab, create a policy and rule that allows the
            token exchange grant type for the agent identity
          </li>
          <li>
            Set up a <strong>Managed Connection</strong> linking the Workload Principal from Step 2 to this
            Authorization Server &mdash; this authorizes the agent to use this auth server
          </li>
        </ol>

        <FieldTable
          rows={[
            ['JAG Issuer', 'Usually https://your-domain.okta.com/oauth2 (the org-level OAuth endpoint)'],
            ['JAG Audience', 'The token endpoint of the JAG issuer: https://your-domain.okta.com/oauth2/v1/token'],
            ['JAG Target Audience', 'The Custom Auth Server URI: https://your-domain.okta.com/oauth2/<auth-server-id>'],
            ['JAG Scope', 'The scope(s) to request — default: ai_agent'],
          ]}
        />
      </Section>

      {/* Step 4: Resource Server */}
      <Section number={4} title="Configure the Resource Server Endpoint">
        <p style={{ marginBottom: '0.5rem' }}>
          Step 3 of the flow presents the JAG to a token endpoint to get a scoped access token.
          This is typically the same Custom Authorization Server from Step 3, but it can be a different one
          if the resource server has its own auth server.
        </p>

        <FieldTable
          rows={[
            ['Resource Audience', 'Token endpoint of the resource auth server (often same as JAG Target Audience + /v1/token)'],
            ['Resource Token Endpoint', 'Full URL: https://your-domain.okta.com/oauth2/<auth-server-id>/v1/token'],
          ]}
        />

        <Tip>
          <strong>Same auth server for both?</strong> In many setups, the JAG Target Audience and the Resource
          Token Endpoint point to the same Custom Authorization Server. Use the same <InlineCode>aus...</InlineCode> ID
          for both.
        </Tip>
      </Section>

      {/* Common issues */}
      <Section number={5} title="Troubleshooting Common Errors">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              400 invalid_grant on Step 2
            </strong>
            <p style={{ margin: 0 }}>
              Federation Broker Mode is not enabled on the OIDC app, or the Managed Connection between the
              Workload Principal and the Custom Auth Server is not configured.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              400 invalid_client on Step 2 or 3
            </strong>
            <p style={{ margin: 0 }}>
              The <InlineCode>client_assertion</InlineCode> JWT is not valid. Check that the Agent Private Key JWK is
              the complete private key (not just the public key), and that the Key ID matches.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              Redirect URI mismatch
            </strong>
            <p style={{ margin: 0 }}>
              The Redirect URI here must exactly match what is configured in the OIDC app in Okta &mdash;
              including the protocol, host, port, and path. No trailing slash difference.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              State mismatch / CSRF error
            </strong>
            <p style={{ margin: 0 }}>
              The session cookie expired or was cleared between login and callback. Try running the flow again.
              If using Safari, ensure third-party cookies are not blocking the session cookie.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
