'use client';

import { Users, Zap, Target, TrendingUp, Shield } from 'lucide-react';
import type { ArchetypeProfile } from '@/lib/archetype-types';
import type { IndustryColorScheme } from '@/lib/industry-colors';

interface ProfileStripProps {
  profile: ArchetypeProfile;
  colors: IndustryColorScheme;
}

const FIELDS: { key: keyof ArchetypeProfile; label: string; icon: typeof Users }[] = [
  { key: 'typicalCompanySize', label: 'Company Size', icon: Users },
  { key: 'aiMaturity', label: 'AI Maturity', icon: Zap },
  { key: 'triggerEvent', label: 'Trigger Event', icon: Target },
  { key: 'buyingMotion', label: 'Buying Motion', icon: TrendingUp },
  { key: 'typicalBudgetHolder', label: 'Budget Holder', icon: Shield },
];

export default function ProfileStrip({ profile, colors }: ProfileStripProps) {
  return (
    <div
      className="rounded-xl px-5 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      style={{ backgroundColor: colors.bg, border: `1px solid ${colors.border}` }}
    >
      {FIELDS.map(({ key, label, icon: Icon }) => (
        <div key={key} className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <Icon className="w-3.5 h-3.5" style={{ color: colors.text }} />
            <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>
          </div>
          <span className="text-sm text-slate-800 leading-snug">{profile[key]}</span>
        </div>
      ))}
    </div>
  );
}
