'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type {
  TabItem,
  ConceptCard,
  TimelineItem,
  AccordionItem,
  LabeledCallout,
} from '../types';

// ─────────────────────────────────────────────────────────────────────────
// Tab Switcher — pill-style tabs with content panels
// ─────────────────────────────────────────────────────────────────────────

export function TabGroup({
  tabs,
  renderParagraph,
}: {
  tabs: TabItem[];
  renderParagraph: (text: string, key: number) => React.ReactNode;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="my-6 rounded-xl overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
      {/* Tab bar */}
      <div
        className="flex gap-1 px-4 py-3"
        style={{ background: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}
      >
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded-lg text-[13px] font-semibold transition-all"
            style={{
              background: active === i ? 'var(--color-primary-700)' : 'transparent',
              color: active === i ? 'var(--color-surface)' : 'var(--color-text-muted)',
              ...(active !== i ? {} : { boxShadow: '0 1px 3px oklch(0.28 0.14 260 / 0.25)' }),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Content panel */}
      <div className="px-6 py-5" style={{ background: 'var(--color-surface)' }}>
        {tabs[active].content.map((p, pi) => renderParagraph(p, pi))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Concept Grid — 3-column cards with uppercase labels
// ─────────────────────────────────────────────────────────────────────────

const CONCEPT_COLORS = [
  { border: 'var(--color-primary-700)', bg: 'var(--color-primary-50)', label: 'var(--color-primary-700)' },
  { border: 'var(--color-primary-500)', bg: 'var(--color-primary-50)', label: 'var(--color-primary-500)' },
  { border: 'oklch(0.50 0.12 175)', bg: 'oklch(0.97 0.02 175)', label: 'oklch(0.50 0.12 175)' },
  { border: 'oklch(0.55 0.25 300)', bg: 'oklch(0.97 0.04 300)', label: 'oklch(0.55 0.25 300)' },
];

export function ConceptGrid({ cards }: { cards: ConceptCard[] }) {
  return (
    <div className="my-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card, i) => {
        const color = CONCEPT_COLORS[i % CONCEPT_COLORS.length];
        return (
          <div
            key={i}
            className="rounded-xl p-5 flex flex-col"
            style={{
              background: color.bg,
              border: '1px solid var(--color-border)',
              borderTopWidth: '3px',
              borderTopColor: color.border,
            }}
          >
            <span
              className="text-[10px] font-bold uppercase mb-2.5"
              style={{
                color: color.label,
                letterSpacing: '0.08em',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {card.label}
            </span>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--color-text-secondary)' }}>
              {card.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Vertical Timeline / Stepper — dots on a vertical line with cards
// ─────────────────────────────────────────────────────────────────────────

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="my-6 relative pl-8">
      {/* Vertical line */}
      <div
        className="absolute left-[11px] top-2 bottom-2"
        style={{ width: '2px', background: 'linear-gradient(180deg, var(--color-primary-700), var(--color-primary-500), var(--color-border))' }}
      />
      {items.map((item, i) => (
        <div key={i} className="relative mb-5 last:mb-0">
          {/* Dot */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              left: '-25px',
              top: '4px',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: 'var(--color-surface)',
              border: '2.5px solid var(--color-primary-700)',
              boxShadow: '0 0 0 3px oklch(0.28 0.14 260 / 0.1)',
            }}
          />
          {/* Card */}
          <div
            className="rounded-xl p-4"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            <span
              className="text-[10px] font-bold uppercase block mb-1"
              style={{
                color: 'var(--color-primary-700)',
                letterSpacing: '0.06em',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {item.label}
            </span>
            <p
              className="text-[15px] font-semibold mb-1"
              style={{ color: 'var(--color-text)' }}
            >
              {item.title}
            </p>
            <p className="text-[14px] leading-[1.75]" style={{ color: 'var(--color-text-secondary)' }}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Accordion — expandable sections with colored top border
// ─────────────────────────────────────────────────────────────────────────

function AccordionSection({
  item,
  index,
  renderParagraph,
}: {
  item: AccordionItem;
  index: number;
  renderParagraph: (text: string, key: number) => React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colors = ['var(--color-primary-700)', 'var(--color-primary-500)', 'oklch(0.50 0.12 175)', 'oklch(0.55 0.25 300)', 'oklch(0.65 0.16 75)'];
  const borderColor = colors[index % colors.length];

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow"
      style={{
        border: '1px solid var(--color-border)',
        borderTop: `3px solid ${borderColor}`,
        boxShadow: isOpen ? '0 4px 12px rgba(0,0,0,0.06)' : '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between text-left transition-colors"
        style={{ background: isOpen ? 'var(--color-surface-alt)' : 'var(--color-surface)' }}
      >
        <div className="flex items-center gap-3">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold"
            style={{ background: 'var(--color-border-subtle)', color: borderColor, border: '1px solid var(--color-border)' }}
          >
            {index + 1}
          </span>
          <span className="text-[15px] font-semibold" style={{ color: 'var(--color-text)' }}>
            {item.title}
          </span>
        </div>
        <ChevronDown
          className="w-4 h-4 transition-transform flex-shrink-0"
          style={{
            color: 'var(--color-text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--color-border-subtle)' }}>
          {item.content.map((p, pi) => renderParagraph(p, pi))}
        </div>
      )}
    </div>
  );
}

export function AccordionGroup({
  items,
  renderParagraph,
}: {
  items: AccordionItem[];
  renderParagraph: (text: string, key: number) => React.ReactNode;
}) {
  return (
    <div className="my-6 space-y-3">
      {items.map((item, i) => (
        <AccordionSection key={i} item={item} index={i} renderParagraph={renderParagraph} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────
// Labeled Callouts — RISK / MITIGATION style uppercase label blocks
// ─────────────────────────────────────────────────────────────────────────

const CALLOUT_STYLES: Record<string, { bg: string; border: string; labelBg: string; labelText: string; text: string }> = {
  blue:    { bg: 'var(--color-primary-50)', border: 'var(--color-primary-100)', labelBg: 'var(--color-primary-700)', labelText: 'var(--color-surface)', text: 'var(--color-text)' },
  amber:   { bg: 'oklch(0.99 0.03 85)', border: 'oklch(0.90 0.10 85)', labelBg: 'oklch(0.65 0.16 75)', labelText: 'var(--color-surface)', text: 'oklch(0.35 0.10 75)' },
  emerald: { bg: 'oklch(0.98 0.03 160)', border: 'oklch(0.88 0.10 160)', labelBg: 'oklch(0.55 0.16 160)', labelText: 'var(--color-surface)', text: 'oklch(0.35 0.12 160)' },
  rose:    { bg: 'oklch(0.98 0.02 10)', border: 'oklch(0.88 0.10 10)', labelBg: 'oklch(0.45 0.20 10)', labelText: 'var(--color-surface)', text: 'oklch(0.30 0.15 10)' },
};

export function LabeledCallouts({ callouts }: { callouts: LabeledCallout[] }) {
  return (
    <div className="my-6 space-y-3">
      {callouts.map((callout, i) => {
        const style = CALLOUT_STYLES[callout.labelColor ?? 'blue'];
        return (
          <div
            key={i}
            className="rounded-xl p-5"
            style={{ background: style.bg, border: `1px solid ${style.border}` }}
          >
            <span
              className="inline-block text-[10px] font-bold uppercase px-2.5 py-1 rounded-md mb-3"
              style={{
                background: style.labelBg,
                color: style.labelText,
                letterSpacing: '0.08em',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {callout.label}
            </span>
            <p className="text-[14.5px] leading-[1.8]" style={{ color: style.text }}>
              {callout.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
