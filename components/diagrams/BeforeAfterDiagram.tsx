'use client';

const BEFORE_ITEMS = [
  { icon: '🔑', label: 'Static API Keys', detail: 'Hardcoded in .env files, never rotated' },
  { icon: '👤', label: 'Shared Service Accounts', detail: 'Agent acts as itself, not on behalf of a user' },
  { icon: '🕳️', label: 'No Audit Trail', detail: 'Log shows service account, not which user authorized' },
  { icon: '🔓', label: 'Over-Privileged Access', detail: '74% of agents receive more access than necessary' },
  { icon: '👻', label: 'Shadow AI Agents', detail: 'IT doesn\'t know which agents exist or what they access' },
  { icon: '⏳', label: 'No Revocation', detail: 'Compromised agent retains access until manual rotation' },
];

const AFTER_ITEMS = [
  { icon: '🔐', label: 'Short-Lived Tokens', detail: 'Per-request, per-user scoped via Token Vault + XAA' },
  { icon: '👥', label: 'Dual Identity (sub + client_id)', detail: 'Every action traces to user AND agent in audit log' },
  { icon: '📊', label: 'Full Audit Trail', detail: 'System Log: who authorized, which agent, what resource, when' },
  { icon: '🎯', label: 'Least-Privilege via FGA', detail: 'Per-action, per-resource authorization at the moment of access' },
  { icon: '🔍', label: 'ISPM Discovery', detail: 'Every agent inventoried, owned, subject to access review' },
  { icon: '⚡', label: 'Universal Logout', detail: 'Sub-second revocation via CAEP/SSF signal propagation' },
];

export default function BeforeAfterDiagram() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Before */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '2px solid oklch(0.75 0.15 25)' }}
      >
        <div
          className="px-4 py-2.5 text-center"
          style={{ background: 'linear-gradient(135deg, oklch(0.55 0.20 25), oklch(0.45 0.18 25))' }}
        >
          <span className="text-[13px] font-bold text-white uppercase" style={{ letterSpacing: '0.1em' }}>
            Before O4AA
          </span>
        </div>
        <div style={{ background: 'oklch(0.98 0.01 25)' }}>
          {BEFORE_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3"
              style={{ borderBottom: i < BEFORE_ITEMS.length - 1 ? '1px solid oklch(0.92 0.03 25)' : 'none' }}
            >
              <span className="text-[18px] flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: 'oklch(0.40 0.15 25)' }}>
                  {item.label}
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'oklch(0.50 0.08 25)' }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* After */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '2px solid oklch(0.72 0.15 160)' }}
      >
        <div
          className="px-4 py-2.5 text-center"
          style={{ background: 'linear-gradient(135deg, oklch(0.50 0.16 160), oklch(0.40 0.14 160))' }}
        >
          <span className="text-[13px] font-bold text-white uppercase" style={{ letterSpacing: '0.1em' }}>
            After O4AA
          </span>
        </div>
        <div style={{ background: 'oklch(0.98 0.01 160)' }}>
          {AFTER_ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 px-4 py-3"
              style={{ borderBottom: i < AFTER_ITEMS.length - 1 ? '1px solid oklch(0.92 0.03 160)' : 'none' }}
            >
              <span className="text-[18px] flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <p className="text-[13px] font-semibold" style={{ color: 'oklch(0.35 0.14 160)' }}>
                  {item.label}
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: 'oklch(0.45 0.08 160)' }}>
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
