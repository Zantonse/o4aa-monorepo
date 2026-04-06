import type { SectionContent } from '@/lib/types';
import ContentCard from './ContentCard';
import DiagramCard from './DiagramCard';
import NewBadge from './NewBadge';
import { SLUG_MAP } from '@/lib/sections';

export default function SectionPage({ content }: { content: SectionContent }) {
  const navItem = SLUG_MAP[content.slug];

  return (
    <div className="px-10 py-8" style={{ maxWidth: '960px' }}>
      {/* Section header */}
      <div className="flex items-start gap-5 mb-6">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 overflow-hidden"
          style={{
            background: 'var(--color-primary-50)',
            border: '1px solid var(--color-primary-100)',
            boxShadow: 'var(--shadow-medium)',
          }}
        >
          {navItem?.iconImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`/${navItem.iconImage}`}
              alt=""
              style={{ width: '32px', height: '32px', objectFit: 'contain' }}
            />
          ) : (
            content.icon
          )}
        </div>
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-2.5 mb-2">
            <h1
              className="text-[28px] font-bold"
              style={{ color: 'var(--color-text)', letterSpacing: '-0.025em', lineHeight: 1.2 }}
            >
              {content.title}
            </h1>
            {navItem?.isNew && <NewBadge />}
          </div>
          <p
            className="text-[15.5px] mb-3.5"
            style={{
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
            }}
          >
            {content.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {content.tags.map(tag => (
              <span
                key={tag}
                className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border"
                style={{
                  background: 'var(--color-surface-alt)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.02em',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Divider with section stats */}
      <div className="flex items-center gap-3 mb-7">
        <div className="flex-1" style={{ height: '1px', background: 'var(--color-border)' }} />
        <span
          className="text-[11px] font-medium flex-shrink-0"
          style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {content.cards.length} sections{content.hasDiagram ? ' + diagram' : ''}
        </span>
        <div className="flex-1" style={{ height: '1px', background: 'var(--color-border)' }} />
      </div>

      {/* Content cards with staggered entrance */}
      {content.cards.map((card, i) => (
        <div
          key={i}
          className="card-enter"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <ContentCard card={card} index={i} />
          {/* Per-card image (if card has an image field) */}
          {card.image && (
            <div
              className="rounded-xl mb-5 overflow-hidden card-enter"
              style={{
                background: 'var(--color-surface-alt)',
                border: '1.5px solid var(--color-border)',
                animationDelay: `${(i + 1) * 80}ms`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${card.image}`}
                alt={`${card.heading} diagram`}
                className="w-full"
                style={{ background: 'var(--color-surface-alt)' }}
              />
            </div>
          )}
          {/* Section-level diagram after first card */}
          {content.hasDiagram && i === 0 && (
            <div className="card-enter" style={{ animationDelay: `${(i + 1) * 80}ms` }}>
              <DiagramCard section={content} />
            </div>
          )}
        </div>
      ))}

      {/* Bottom spacer */}
      <div style={{ height: '40px' }} />
    </div>
  );
}
