'use client';

import { Search, UserPlus, Shield, ClipboardCheck } from 'lucide-react';
import type { PhaseGridItem } from '../types';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  search: Search,
  'user-plus': UserPlus,
  shield: Shield,
  'clipboard-check': ClipboardCheck,
};

export function PhaseGrid({ items }: { items: PhaseGridItem[] }) {
  return (
    <div className="my-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((item, i) => {
        const Icon = ICON_MAP[item.icon] ?? Search;
        return (
          <div
            key={i}
            className="group relative rounded-xl overflow-hidden transition-shadow duration-200"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-subtle)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-medium)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-subtle)';
            }}
          >
            {/* Accent top bar */}
            <div style={{ height: '3px', background: item.accent }} />

            <div className="p-5">
              {/* Phase header row */}
              <div className="flex items-start gap-3.5 mb-3">
                {/* Icon circle */}
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: `color-mix(in oklch, ${item.accent} 12%, transparent)`,
                    border: `1px solid color-mix(in oklch, ${item.accent} 20%, transparent)`,
                  }}
                >
                  <Icon className="w-5 h-5" style={{ color: item.accent }} />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Phase number + title */}
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-bold uppercase"
                      style={{
                        color: item.accent,
                        letterSpacing: '0.08em',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      Phase {item.phase}
                    </span>
                  </div>
                  <h4
                    className="text-[17px] font-semibold"
                    style={{ color: 'var(--color-text)', letterSpacing: '-0.01em' }}
                  >
                    {item.title}
                  </h4>
                </div>
              </div>

              {/* Summary */}
              <p
                className="text-[14px] leading-[1.7] mb-3.5"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {item.summary}
              </p>

              {/* Product pills */}
              <div className="flex flex-wrap gap-1.5">
                {item.products.map((product, pi) => (
                  <span
                    key={pi}
                    className="inline-flex items-center text-[11px] font-medium px-2.5 py-1 rounded-md"
                    style={{
                      background: `color-mix(in oklch, ${item.accent} 8%, var(--color-surface-alt))`,
                      color: item.accent,
                      border: `1px solid color-mix(in oklch, ${item.accent} 15%, var(--color-border))`,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {product}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
