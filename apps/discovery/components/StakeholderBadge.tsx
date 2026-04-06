'use client';

const BADGE_CONFIG: Record<string, { abbr: string; bg: string; text: string }> = {
  'decision-maker': { abbr: 'DM', bg: 'bg-red-100', text: 'text-red-700' },
  'champion':       { abbr: 'CH', bg: 'bg-emerald-100', text: 'text-emerald-700' },
  'evaluator':      { abbr: 'EV', bg: 'bg-blue-100', text: 'text-blue-700' },
  'influencer':     { abbr: 'IN', bg: 'bg-amber-100', text: 'text-amber-700' },
};

interface StakeholderBadgeProps {
  level: string;
}

export default function StakeholderBadge({ level }: StakeholderBadgeProps) {
  const config = BADGE_CONFIG[level] || { abbr: '??', bg: 'bg-slate-100', text: 'text-slate-500' };
  return (
    <span
      className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${config.bg} ${config.text}`}
      title={level}
    >
      {config.abbr}
    </span>
  );
}
