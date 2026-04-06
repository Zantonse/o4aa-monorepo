'use client';

import type { ContentCardData } from '@/lib/types';
import { TabGroup, ConceptGrid, Timeline, AccordionGroup, LabeledCallouts } from './NewsletterBlocks';
import { PhaseGrid } from './PhaseGrid';
import { MermaidDiagramGroup } from './MermaidDiagram';

// Detect paragraphs that start with a label pattern like:
// "Step 1:", "Layer 1 —", "okta-cross-app:", "HIPAA:", etc.
const LABEL_PATTERN = /^([A-Za-z0-9][A-Za-z0-9 /().+-]{0,40}?(?::|—))\s*/;

function splitLabel(text: string): { label: string; rest: string } | null {
  const match = text.match(LABEL_PATTERN);
  if (!match) return null;
  const label = match[1].trim();
  const rest = text.slice(match[0].length);
  if (rest.length < 20) return null;
  return { label, rest };
}

// Split long paragraphs into 2-3 sentence visual blocks
function splitIntoBlocks(text: string): string[] {
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z"'])/);
  if (sentences.length <= 3) return [text];
  const blocks: string[] = [];
  let current: string[] = [];
  for (const sentence of sentences) {
    current.push(sentence);
    if (current.length >= 2 && (current.length >= 3 || current.join(' ').length > 200)) {
      blocks.push(current.join(' '));
      current = [];
    }
  }
  if (current.length > 0) blocks.push(current.join(' '));
  return blocks;
}

// Special paragraph types detected by prefix:
// >> = callout/quote (blue left border)
// ?? = discovery question (question icon)
// !! = key insight/highlight (light blue background)
// TT = talk track (green left border)
type ParagraphType = 'normal' | 'callout' | 'question' | 'highlight' | 'talkttrack';

function detectType(text: string): { type: ParagraphType; content: string } {
  if (text.startsWith('>> ')) return { type: 'callout', content: text.slice(3) };
  if (text.startsWith('?? ')) return { type: 'question', content: text.slice(3) };
  if (text.startsWith('!! ')) return { type: 'highlight', content: text.slice(3) };
  if (text.startsWith('TT ')) return { type: 'talkttrack', content: text.slice(3) };
  return { type: 'normal', content: text };
}

function RichParagraph({ text, isFirst }: { text: string; isFirst: boolean }) {
  const { type, content } = detectType(text);

  if (type === 'callout') {
    return (
      <div
        className="rounded-lg my-3"
        style={{
          borderLeft: '3px solid var(--color-primary-700)',
          background: 'var(--color-info-bg)',
          padding: '14px 18px',
        }}
      >
        <p className="text-[15.5px] leading-[1.8]" style={{ color: 'var(--color-text)', fontWeight: 450 }}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'question') {
    return (
      <div
        className="flex gap-3 rounded-lg my-3"
        style={{
          background: 'var(--color-warn-bg)',
          border: '1px solid var(--color-warn-border)',
          padding: '12px 16px',
        }}
      >
        <span className="text-[18px] flex-shrink-0 mt-0.5">?</span>
        <p className="text-[15.5px] leading-[1.8] italic" style={{ color: 'var(--color-warn-text)' }}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'highlight') {
    return (
      <div
        className="rounded-lg my-3"
        style={{
          background: 'var(--color-primary-50)',
          border: '1px solid var(--color-primary-100)',
          padding: '14px 18px',
        }}
      >
        <p className="text-[15.5px] leading-[1.8] font-medium" style={{ color: 'var(--color-primary-500)' }}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'talkttrack') {
    return (
      <div
        className="rounded-lg my-3"
        style={{
          borderLeft: '3px solid var(--color-success-text)',
          background: 'var(--color-success-bg)',
          padding: '14px 18px',
        }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
            style={{
              background: 'var(--color-success-bg)',
              color: 'var(--color-success-text)',
              border: '1px solid var(--color-success-border)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.06em',
            }}
          >
            Talk Track
          </span>
        </div>
        <p className="text-[15.5px] leading-[1.8]" style={{ color: 'var(--color-text)' }}>
          {content}
        </p>
      </div>
    );
  }

  // Normal paragraph — split into visual blocks
  const blocks = splitIntoBlocks(content);
  return (
    <div>
      {blocks.map((block, bi) => (
        <p
          key={bi}
          className="leading-[1.85]"
          style={{
            fontSize: isFirst && bi === 0 ? '16px' : '15.5px',
            color: isFirst && bi === 0 ? 'var(--color-text)' : 'var(--color-text-secondary)',
            fontWeight: isFirst && bi === 0 ? 450 : 400,
            letterSpacing: '-0.005em',
            marginTop: bi > 0 ? '10px' : 0,
          }}
        >
          {block}
        </p>
      ))}
    </div>
  );
}

export default function ContentCard({ card, index }: { card: ContentCardData; index?: number }) {
  return (
    <div
      className="rounded-xl mb-5 overflow-hidden transition-shadow duration-200"
      style={{
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-subtle)',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-medium)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-subtle)'; }}
    >
      {/* Card heading */}
      <div
        className="px-6 py-3.5 flex items-center gap-3"
        style={{ borderBottom: '1px solid var(--color-border-subtle)', background: 'var(--color-surface-alt)' }}
      >
        {typeof index === 'number' && (
          <span
            className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold"
            style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-500)', border: '1px solid var(--color-primary-100)' }}
          >
            {index + 1}
          </span>
        )}
        <h3
          className="text-[14px] font-semibold uppercase"
          style={{ color: 'var(--color-primary-700)', letterSpacing: '0.05em' }}
        >
          {card.heading}
        </h3>
      </div>

      {/* Card body */}
      <div className="px-6 py-5">
        {card.paragraphs.map((p, i) => {
          const parsed = splitLabel(p);
          const { type } = detectType(p);
          const isSpecial = type !== 'normal';

          return (
            <div
              key={i}
              style={{
                marginTop: i > 0 && !isSpecial ? '20px' : i > 0 ? '4px' : 0,
                paddingTop: i > 0 && !isSpecial ? '20px' : 0,
                borderTop: i > 0 && !isSpecial ? '1px solid var(--color-border-subtle)' : 'none',
              }}
            >
              {isSpecial ? (
                <RichParagraph text={p} isFirst={i === 0} />
              ) : parsed ? (
                <div>
                  <span
                    className="inline-block mb-2"
                    style={{
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      background: 'var(--color-border-subtle)',
                      padding: '3px 10px',
                      borderRadius: '5px',
                      border: '1px solid var(--color-border)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {parsed.label}
                  </span>
                  {splitIntoBlocks(parsed.rest).map((block, bi) => (
                    <p
                      key={bi}
                      className="text-[15.5px] leading-[1.85]"
                      style={{ color: 'var(--color-text-secondary)', marginTop: bi === 0 ? '6px' : '10px' }}
                    >
                      {block}
                    </p>
                  ))}
                </div>
              ) : (
                <RichParagraph text={p} isFirst={i === 0} />
              )}
            </div>
          );
        })}

        {/* Rich block types */}
        {card.tabs && (
          <TabGroup
            tabs={card.tabs}
            renderParagraph={(text, key) => <RichParagraph key={key} text={text} isFirst={key === 0} />}
          />
        )}
        {card.conceptGrid && <ConceptGrid cards={card.conceptGrid} />}
        {card.timeline && <Timeline items={card.timeline} />}
        {card.accordion && (
          <AccordionGroup
            items={card.accordion}
            renderParagraph={(text, key) => <RichParagraph key={key} text={text} isFirst={key === 0} />}
          />
        )}
        {card.labeledCallouts && <LabeledCallouts callouts={card.labeledCallouts} />}
        {card.phaseGrid && <PhaseGrid items={card.phaseGrid} />}
        {card.mermaidDiagrams && <MermaidDiagramGroup diagrams={card.mermaidDiagrams} />}
      </div>
    </div>
  );
}
