import type { Industry } from './archetype-types';

export interface IndustryColorScheme {
  gradient: { from: string; to: string };
  bg: string;
  border: string;
  text: string;
  badge: string;
  badgeText: string;
}

export const INDUSTRY_COLORS: Record<Industry, IndustryColorScheme> = {
  technology: {
    gradient: { from: '#312e81', to: '#4338ca' },
    bg: '#EEF2FF', border: '#C7D2FE', text: '#4F46E5',
    badge: '#E0E7FF', badgeText: '#3730A3',
  },
  'financial-services': {
    gradient: { from: '#1e3a5f', to: '#1e40af' },
    bg: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8',
    badge: '#DBEAFE', badgeText: '#1E40AF',
  },
  healthcare: {
    gradient: { from: '#166534', to: '#16a34a' },
    bg: '#F0FDF4', border: '#BBF7D0', text: '#16A34A',
    badge: '#DCFCE7', badgeText: '#166534',
  },
  manufacturing: {
    gradient: { from: '#92400e', to: '#d97706' },
    bg: '#FFFBEB', border: '#FDE68A', text: '#D97706',
    badge: '#FEF3C7', badgeText: '#92400E',
  },
  'retail-ecommerce': {
    gradient: { from: '#9f1239', to: '#e11d48' },
    bg: '#FFF1F2', border: '#FECDD3', text: '#E11D48',
    badge: '#FFE4E6', badgeText: '#9F1239',
  },
  insurance: {
    gradient: { from: '#5b21b6', to: '#7c3aed' },
    bg: '#F5F3FF', border: '#DDD6FE', text: '#7C3AED',
    badge: '#EDE9FE', badgeText: '#5B21B6',
  },
  'media-entertainment': {
    gradient: { from: '#86198f', to: '#c026d3' },
    bg: '#FDF4FF', border: '#F5D0FE', text: '#C026D3',
    badge: '#FAE8FF', badgeText: '#86198F',
  },
  'professional-services': {
    gradient: { from: '#115e59', to: '#0d9488' },
    bg: '#F0FDFA', border: '#99F6E4', text: '#0D9488',
    badge: '#CCFBF1', badgeText: '#115E59',
  },
  other: {
    gradient: { from: '#334155', to: '#64748b' },
    bg: '#F8FAFC', border: '#E2E8F0', text: '#64748B',
    badge: '#F1F5F9', badgeText: '#334155',
  },
};

const INDUSTRY_ICON_SLUG: Record<Industry, string> = {
  technology: 'technology',
  'financial-services': 'financial-services',
  healthcare: 'healthcare',
  manufacturing: 'manufacturing',
  'retail-ecommerce': 'retail',
  insurance: 'insurance',
  'media-entertainment': 'media',
  'professional-services': 'professional-services',
  other: 'other',
};

export function getIndustryIcon(industry: Industry): string {
  return `/icons/industry-${INDUSTRY_ICON_SLUG[industry]}.png`;
}

export function getFeatureIcon(feature: 'question-bank' | 'call-wizard' | 'intelligence'): string {
  return `/icons/feature-${feature}.png`;
}

export function getIndustryColorScheme(industry: Industry): IndustryColorScheme {
  return INDUSTRY_COLORS[industry];
}
