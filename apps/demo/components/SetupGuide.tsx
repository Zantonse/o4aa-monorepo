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

function GuideImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      style={{
        marginTop: '0.75rem',
        marginBottom: '0.75rem',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid var(--color-border)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        style={{ width: '100%', height: 'auto', display: 'block' }}
      />
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
          Before configuring this demo, you need an Okta org with the{' '}
          <strong>Okta for AI Agents</strong> Early Access feature enabled and a Super Admin role.
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Admin Console &rarr; Settings &rarr; Features</strong>
          </li>
          <li>
            Under <strong>Early Access</strong>, enable{' '}
            <InlineCode>Okta for AI Agents</InlineCode>
          </li>
          <li>
            Verify you have Super Admin rights to create OIDC apps, Authorization Servers, and AI Agents
          </li>
        </ol>
        <Tip>
          <strong>No preview org?</strong> You can create one at{' '}
          <a href="https://developer.okta.com/signup/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
            developer.okta.com/signup
          </a>. The Okta for AI Agents feature flag is available on preview orgs during EA.
        </Tip>
      </Section>

      {/* Step 1: OIDC Client */}
      <Section number={1} title="Create the OIDC Web App (User Authentication)" defaultOpen>
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
            (e.g. <InlineCode>https://o4aa-demo.vercel.app/api/auth/callback</InlineCode> or{' '}
            <InlineCode>http://localhost:3002/api/auth/callback</InlineCode> for local dev)
          </li>
        </ol>

        <GuideImage src="/guide/redirect-uri.png" alt="Sign-in redirect URIs field in Okta admin console" />

        <ol start={4} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Under <strong>Assignments</strong>, select <strong>Allow everyone in your organization to access</strong> and
            check <strong>Enable immediate access with Federation Broker Mode</strong> &mdash; this
            is required for the OIDC app to participate in cross-app token exchange
          </li>
        </ol>

        <GuideImage src="/guide/federation-broker-mode.png" alt="Federation Broker Mode checkbox in Okta admin console Assignments section" />

        <FieldTable
          rows={[
            ['Client ID', 'General tab → Client ID'],
            ['Client Secret', 'General tab → Client secret (click "Edit" if hidden)'],
            ['Okta Issuer', 'Your org URL — e.g. https://your-domain.okta.com'],
            ['Redirect URI', 'The exact sign-in redirect URI you set above'],
          ]}
        />

        <Tip>
          <strong>Federation Broker Mode</strong> must be ON. Without it, the token exchange in Step 3
          will fail with a <InlineCode>400 invalid_grant</InlineCode> error.
        </Tip>
      </Section>

      {/* Step 2: Register the AI Agent */}
      <Section number={2} title="Register the AI Agent">
        <p style={{ marginBottom: '0.5rem' }}>
          The agent needs its own identity in Okta. Register it under{' '}
          <strong>Directory &rarr; AI Agents</strong> and add an RSA key pair for{' '}
          <InlineCode>private_key_jwt</InlineCode> client authentication.{' '}
          <a
            href="https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-register"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Official docs &rarr;
          </a>
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Directory &rarr; AI Agents</strong>
          </li>
          <li>
            Click <strong>Register AI agent</strong>, enter a <strong>Name</strong> and{' '}
            <strong>Description</strong> (e.g. &quot;JAG Demo Agent&quot;)
          </li>
          <li>
            Optionally select a <strong>Linked application</strong> &mdash; choose the OIDC app from
            Step 1. If linked, the agent can only act on a user&apos;s behalf when the user is signed
            in to that app
          </li>
          <li>
            Click <strong>Register</strong>, then assign at least one owner (up to 5 users, or a group
            with at least 2 members)
          </li>
          <li>
            Go to the <strong>Credentials</strong> tab and click <strong>Add public key</strong>
          </li>
          <li>
            Either paste an existing public key, or click <strong>Generate new key</strong> &mdash;
            Okta creates a key pair. <strong>Copy the private key to clipboard immediately and save
            it.</strong> Click <strong>Done</strong>.
          </li>
        </ol>

        <Tip>
          The agent starts in <strong>STAGED</strong> status. It activates automatically once it has
          at least one owner and one credential.
        </Tip>

        <FieldTable
          rows={[
            ['Agent Client ID', 'The AI agent\'s client ID — displayed on the agent\'s General tab'],
            ['Agent Private Key (JWK)', 'The full private key JSON copied during key generation — paste the entire JSON object'],
            ['Agent Key ID', 'The kid value shown in the Credentials tab'],
          ]}
        />

        <Tip>
          <strong>Save the private key somewhere safe.</strong> Okta does not store the private
          portion. If you lose it, you must generate a new key pair.
        </Tip>
      </Section>

      {/* Step 3: Managed Connections */}
      <Section number={3} title="Configure Managed Connections">
        <p style={{ marginBottom: '0.5rem' }}>
          A Managed Connection authorizes the AI agent to use a specific Authorization Server for
          token exchange. Before adding the connection, ensure the Authorization Server has an access
          policy that includes the JWT bearer grant type and the required custom scopes.{' '}
          <a
            href="https://help.okta.com/okta_help.htm?type=oie&id=ai-agent-secure"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Secure AI agents &rarr;
          </a>{' '}
          <a
            href="https://developer.okta.com/docs/guides/ai-agent-token-exchange/authserver/main/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--color-primary-600)' }}
          >
            Token exchange guide &rarr;
          </a>
        </p>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Prerequisite — Create the Custom Authorization Server:</strong>
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <li>
            Go to <strong>Security &rarr; API &rarr; Authorization Servers</strong>
          </li>
          <li>
            Click <strong>Add Authorization Server</strong> and fill in:
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Name', 'JAG Server (or any descriptive name)'],
            ['Audience', 'api://jag-demo (any URI — this appears in the aud claim of issued tokens)'],
            ['Description', 'Custom auth server for JAG token exchange demo'],
          ]}
        />

        <ol start={3} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <li>
            Click <strong>Save</strong>. Note the <strong>Issuer URI</strong> shown on the Settings tab &mdash;
            it contains the <InlineCode>aus...</InlineCode> auth server ID you need for the demo config
          </li>
          <li>
            Go to the <strong>Scopes</strong> tab &rarr; click <strong>Add Scope</strong>:
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Name', 'ai_agent'],
            ['Display phrase', 'AI Agent access (optional — shown on consent screens)'],
            ['Description', 'Scope for AI agent token exchange'],
          ]}
        />

        <ol start={5} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <li>
            Go to the <strong>Access Policies</strong> tab &rarr; click <strong>Add New Access Policy</strong>:
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Name', 'JAG Agent Policy'],
            ['Description', 'Allow AI agent to exchange tokens'],
            ['Assign to', 'The following clients — select your AI agent from the dropdown'],
          ]}
        />

        <ol start={6} style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <li>
            Click <strong>Create Policy</strong>, then click <strong>Add Rule</strong>:
          </li>
        </ol>

        <FieldTable
          rows={[
            ['Name', 'Allow JWT Bearer'],
            ['Grant type', 'Check: JWT Bearer (under Advanced if not visible)'],
            ['Scopes', 'The following scopes: ai_agent'],
          ]}
        />

        <Tip>
          After saving the rule, your auth server is ready. The bookmarklet will auto-extract the{' '}
          <InlineCode>aus...</InlineCode> server ID when you navigate to this auth server&apos;s page.
        </Tip>
        <p style={{ marginBottom: '0.5rem' }}>
          <strong>Add the Managed Connection:</strong>
        </p>
        <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <li>
            Go to <strong>Directory &rarr; AI Agents</strong> and select your agent
          </li>
          <li>
            Click the <strong>Managed Connections</strong> tab, then click <strong>Add connection</strong>
          </li>
          <li>
            Select resource type: <strong>Authorization server</strong>
          </li>
          <li>
            Select the Authorization Server from the dropdown
          </li>
          <li>
            Configure scopes: <strong>Allow all</strong>, <strong>Only allow</strong> specific
            scopes, or <strong>Disallow</strong> specific scopes
          </li>
          <li>
            Click <strong>Add</strong>
          </li>
        </ol>

        <FieldTable
          rows={[
            ['JAG Issuer', 'https://{your-domain}.okta.com/oauth2 (the org-level OAuth endpoint)'],
            ['JAG Audience', 'https://{your-domain}.okta.com/oauth2/v1/token'],
            ['JAG Target Audience', 'The issuer URL of the resource app\'s auth server — e.g. https://{your-domain}.okta.com/oauth2/{auth-server-id}'],
            ['JAG Scope', 'The scope(s) configured in the managed connection — default: ai_agent'],
          ]}
        />
      </Section>

      {/* Step 4: Resource Server */}
      <Section number={4} title="Configure the Resource Server Endpoint">
        <p style={{ marginBottom: '0.5rem' }}>
          The final step of the flow presents the JAG to a token endpoint to get a scoped access
          token for the protected resource. This is typically the same Custom Authorization Server
          configured in Step 3, but it can be a separate one if the resource server has its own
          auth server.
        </p>

        <FieldTable
          rows={[
            ['Resource Token Endpoint', 'https://{your-domain}.okta.com/oauth2/{auth-server-id}/v1/token'],
          ]}
        />

        <Tip>
          <strong>Same auth server for both?</strong> In many setups, the JAG Target Audience and
          the Resource Token Endpoint point to the same Custom Authorization Server. Use the same{' '}
          <InlineCode>aus...</InlineCode> ID for both fields.
        </Tip>
      </Section>

      {/* Common issues */}
      <Section number={5} title="Troubleshooting Common Errors">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              Agent stuck in STAGED status
            </strong>
            <p style={{ margin: 0 }}>
              The AI agent requires at least one owner and one credential to activate. Go to the
              agent&apos;s detail page, confirm an owner is assigned, and verify at least one key
              appears under the <strong>Credentials</strong> tab.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              400 invalid_grant on token exchange
            </strong>
            <p style={{ margin: 0 }}>
              Federation Broker Mode is not enabled on the OIDC app, or the Managed Connection
              between the AI agent and the Custom Authorization Server is not configured. Verify
              both in Steps 1 and 3.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              400 invalid_client on token exchange
            </strong>
            <p style={{ margin: 0 }}>
              The <InlineCode>client_assertion</InlineCode> JWT is not valid. Check that the Agent
              Private Key JWK is the complete private key (not just the public key), and that the
              Key ID matches the <InlineCode>kid</InlineCode> value in the Credentials tab.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              Agent acting on behalf of user fails (linked application)
            </strong>
            <p style={{ margin: 0 }}>
              If the AI agent is linked to an OIDC app, the user must be signed in to that app
              before the agent can act on their behalf. Ensure the user has an active session in
              the linked application from Step 1.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              Redirect URI mismatch
            </strong>
            <p style={{ margin: 0 }}>
              The Redirect URI here must exactly match what is configured in the OIDC app in Okta
              &mdash; including the protocol, host, port, and path. No trailing slash difference.
            </p>
          </div>
          <div>
            <strong style={{ color: 'var(--color-text)', display: 'block', marginBottom: '0.25rem' }}>
              State mismatch / CSRF error
            </strong>
            <p style={{ margin: 0 }}>
              The session cookie expired or was cleared between login and callback. Try running the
              flow again. If using Safari, ensure third-party cookies are not blocking the session
              cookie.
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
