'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Copy, Check, ChevronRight, ChevronLeft, BookOpen, Clock, ArrowRight } from 'lucide-react';
import type { NewsletterIssue } from '@/lib/newsletter-types';
import { NEWSLETTER_SERIES } from '@/lib/newsletter-types';
import { TabGroup, ConceptGrid, Timeline, AccordionGroup, LabeledCallouts } from './NewsletterBlocks';

// Detect special paragraph types (same protocol as ContentCard)
type ParagraphType = 'normal' | 'callout' | 'question' | 'highlight' | 'talktrack';

function detectType(text: string): { type: ParagraphType; content: string } {
  if (text.startsWith('>> ')) return { type: 'callout', content: text.slice(3) };
  if (text.startsWith('?? ')) return { type: 'question', content: text.slice(3) };
  if (text.startsWith('!! ')) return { type: 'highlight', content: text.slice(3) };
  if (text.startsWith('TT ')) return { type: 'talktrack', content: text.slice(3) };
  return { type: 'normal', content: text };
}

function NewsletterParagraph({ text }: { text: string }) {
  const { type, content } = detectType(text);

  if (type === 'callout') {
    return (
      <blockquote
        className="my-5 rounded-lg"
        style={{
          borderLeft: '3px solid #00297A',
          background: '#F0F4FF',
          padding: '16px 20px',
        }}
      >
        <p className="text-[16.5px] leading-[1.85] italic" style={{ color: '#1E293B', fontWeight: 450 }}>
          {content}
        </p>
      </blockquote>
    );
  }

  if (type === 'highlight') {
    return (
      <div
        className="my-4 rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #EFF6FF, #F0F4FF)',
          border: '1px solid #DBEAFE',
          padding: '14px 20px',
        }}
      >
        <p className="text-[16px] leading-[1.85] font-medium" style={{ color: '#1E40AF' }}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'talktrack') {
    return (
      <div
        className="my-5 rounded-lg"
        style={{
          borderLeft: '3px solid #059669',
          background: '#F0FDF4',
          padding: '14px 20px',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
            style={{
              background: '#DCFCE7',
              color: '#166534',
              border: '1px solid #BBF7D0',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.06em',
            }}
          >
            Talk Track
          </span>
        </div>
        <p className="text-[16px] leading-[1.85]" style={{ color: '#1E293B' }}>
          {content}
        </p>
      </div>
    );
  }

  if (type === 'question') {
    return (
      <div
        className="flex gap-3 rounded-lg my-4"
        style={{
          background: '#FFFBEB',
          border: '1px solid #FDE68A',
          padding: '12px 16px',
        }}
      >
        <span className="text-[18px] flex-shrink-0 mt-0.5">?</span>
        <p className="text-[16px] leading-[1.85] italic" style={{ color: '#92400E' }}>
          {content}
        </p>
      </div>
    );
  }

  return (
    <p
      className="text-[16.5px] leading-[1.9] my-4"
      style={{ color: '#334155', letterSpacing: '-0.005em' }}
    >
      {content}
    </p>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="p-1.5 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
      title="Copy"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

export default function NewsletterPage({ issue }: { issue: NewsletterIssue }) {
  const series = NEWSLETTER_SERIES;
  const progressPct = (series.issues.filter(i => i.published).length / series.totalIssues) * 100;

  return (
    <div className="px-10 py-8" style={{ maxWidth: '960px' }}>

      {/* Series header strip */}
      <div className="flex items-center gap-3 mb-6">
        <span
          className="text-[11px] font-bold uppercase px-2.5 py-1 rounded-md"
          style={{
            background: 'linear-gradient(135deg, #00297A, #0041B8)',
            color: '#ffffff',
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: '0.06em',
          }}
        >
          {series.seriesTitle}
        </span>
        <span
          className="text-[12px] font-medium"
          style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}
        >
          Issue {issue.issueNumber} of {series.totalIssues}
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-2 text-[12px]" style={{ color: '#94A3B8' }}>
          <Clock className="w-3.5 h-3.5" />
          <span>{issue.readTimeMinutes} min read</span>
        </div>
      </div>

      {/* Hero section */}
      <div
        className="rounded-2xl overflow-hidden mb-8 relative"
        style={{
          background: 'linear-gradient(135deg, #00297A 0%, #0041B8 40%, #1E40AF 100%)',
          padding: '40px 36px 36px',
        }}
      >
        {/* Hero art background */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/newsletter-0${issue.issueNumber}-hero.png`}
          alt={issue.heroImageAlt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.25, mixBlendMode: 'screen' }}
        />
        <div className="relative z-10 flex items-center gap-2 mb-4">
          <BookOpen className="w-4 h-4 text-blue-300" />
          <span
            className="text-[12px] font-semibold uppercase"
            style={{ color: '#93C5FD', letterSpacing: '0.08em', fontFamily: "'JetBrains Mono', monospace" }}
          >
            Issue #{issue.issueNumber} &middot; {issue.date}
          </span>
        </div>
        <h1
          className="relative z-10 text-[32px] font-bold mb-3"
          style={{ color: '#ffffff', lineHeight: 1.2, letterSpacing: '-0.02em' }}
        >
          {issue.title}
        </h1>
        <p
          className="relative z-10 text-[16.5px] leading-[1.7]"
          style={{ color: '#BFDBFE', maxWidth: '580px' }}
        >
          {issue.subtitle}
        </p>
        <div className="relative z-10 flex flex-wrap gap-1.5 mt-5">
          {issue.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#93C5FD',
                border: '1px solid rgba(255,255,255,0.15)',
                fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: '0.02em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Series progress bar */}
      <div
        className="rounded-xl mb-8 px-5 py-4"
        style={{ background: '#ffffff', border: '1px solid #E2E8F0' }}
      >
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-[12px] font-semibold" style={{ color: '#475569' }}>
            Series Progress
          </span>
          <span
            className="text-[10px] font-medium"
            style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}
          >
            {series.issues.filter(i => i.published).length}/{series.totalIssues}
          </span>
        </div>
        <div
          className="w-full rounded-full overflow-hidden mb-3"
          style={{ height: '4px', background: '#F1F5F9' }}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progressPct}%`,
              background: 'linear-gradient(90deg, #00297A, #1E40AF)',
            }}
          />
        </div>
        <div className="flex flex-wrap gap-x-1 gap-y-1">
          {series.issues.map((iss) => {
            const isCurrent = iss.number === issue.issueNumber;
            const inner = (
              <span
                className="text-[11px] px-2 py-0.5 rounded inline-block transition-all"
                style={{
                  background: isCurrent ? '#EFF6FF' : iss.published ? '#F0FDF4' : '#F8FAFC',
                  color: isCurrent ? '#1E40AF' : iss.published ? '#166534' : '#94A3B8',
                  border: `1px solid ${isCurrent ? '#DBEAFE' : iss.published ? '#BBF7D0' : '#E2E8F0'}`,
                  fontWeight: isCurrent ? 600 : 400,
                  fontFamily: "'JetBrains Mono', monospace",
                  cursor: iss.published && !isCurrent ? 'pointer' : 'default',
                }}
                title={iss.title}
              >
                #{iss.number}
              </span>
            );
            if (iss.published && !isCurrent) {
              return <Link key={iss.number} href={`/section/${iss.slug}`}>{inner}</Link>;
            }
            return <span key={iss.number}>{inner}</span>;
          })}
        </div>
      </div>

      {/* TL;DR box */}
      <div
        className="rounded-xl mb-8 px-6 py-5"
        style={{
          background: 'linear-gradient(135deg, #FFFBEB, #FEF3C7)',
          border: '1px solid #FDE68A',
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span
            className="text-[10px] font-bold uppercase px-2 py-0.5 rounded"
            style={{
              background: '#FEF08A',
              color: '#854D0E',
              border: '1px solid #FDE68A',
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.06em',
            }}
          >
            TL;DR
          </span>
        </div>
        <p className="text-[15.5px] leading-[1.8]" style={{ color: '#78350F' }}>
          {issue.tldr}
        </p>
      </div>

      {/* Article body */}
      {issue.sections.map((section, si) => (
        <div key={si} className="mb-10">
          <h2
            className="text-[20px] font-bold mb-4 pb-3"
            style={{
              color: '#0F172A',
              letterSpacing: '-0.015em',
              borderBottom: '1px solid #F1F5F9',
            }}
          >
            {section.heading}
          </h2>
          {section.paragraphs.map((p, pi) => (
            <NewsletterParagraph key={pi} text={p} />
          ))}

          {/* Rich block types */}
          {section.tabs && (
            <TabGroup
              tabs={section.tabs}
              renderParagraph={(text, key) => <NewsletterParagraph key={key} text={text} />}
            />
          )}
          {section.conceptGrid && <ConceptGrid cards={section.conceptGrid} />}
          {section.timeline && <Timeline items={section.timeline} />}
          {section.accordion && (
            <AccordionGroup
              items={section.accordion}
              renderParagraph={(text, key) => <NewsletterParagraph key={key} text={text} />}
            />
          )}
          {section.labeledCallouts && <LabeledCallouts callouts={section.labeledCallouts} />}

          {/* Inline section image */}
          {section.image && (
            <div
              className="my-6 rounded-xl overflow-hidden"
              style={{ border: '1px solid #E2E8F0' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/${section.image}`}
                alt={section.imageAlt ?? ''}
                className="w-full"
                style={{
                  background: '#0F172A',
                  ...(section.imageBanner ? { height: '200px', objectFit: 'cover' as const } : {}),
                }}
              />
              {section.imageCaption && (
                <div
                  className="px-5 py-3"
                  style={{ background: '#F8FAFC', borderTop: '1px solid #E2E8F0' }}
                >
                  <p
                    className="text-[13px] leading-[1.6] italic"
                    style={{ color: '#64748B' }}
                  >
                    {section.imageCaption}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* Key Takeaways */}
      <div
        className="rounded-xl mb-8 overflow-hidden"
        style={{ border: '1px solid #E2E8F0', background: '#ffffff' }}
      >
        <div
          className="px-6 py-3.5"
          style={{
            background: 'linear-gradient(135deg, #00297A, #0041B8)',
          }}
        >
          <h3 className="text-[14.5px] font-bold uppercase text-white" style={{ letterSpacing: '0.05em' }}>
            Key Takeaways
          </h3>
        </div>
        <div className="px-6 py-5 space-y-4">
          {issue.keyTakeaways.map((kt, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-shrink-0 pt-0.5">
                <span
                  className="inline-flex items-center justify-center w-6 h-6 rounded-md text-[11px] font-bold"
                  style={{ background: '#EFF6FF', color: '#1E40AF', border: '1px solid #DBEAFE' }}
                >
                  {i + 1}
                </span>
              </div>
              <div>
                <span
                  className="text-[12px] font-bold uppercase block mb-1"
                  style={{
                    color: '#00297A',
                    letterSpacing: '0.04em',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  {kt.label}
                </span>
                <div className="flex items-start gap-2">
                  <p className="text-[15.5px] leading-[1.75] flex-1" style={{ color: '#334155' }}>
                    {kt.text}
                  </p>
                  <CopyButton text={kt.text} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pull Quotes */}
      <div className="mb-8 space-y-4">
        {issue.pullQuotes.map((pq, i) => (
          <div
            key={i}
            className="rounded-xl px-6 py-5 flex gap-3"
            style={{
              background: i % 2 === 0 ? '#F8FAFC' : '#FAFCFF',
              border: '1px solid #E2E8F0',
            }}
          >
            <span className="text-[28px] font-bold flex-shrink-0" style={{ color: '#CBD5E1', lineHeight: 1 }}>
              &ldquo;
            </span>
            <div>
              <p className="text-[16.5px] leading-[1.8] italic" style={{ color: '#1E293B' }}>
                {pq.text}
              </p>
              {pq.attribution && (
                <p className="text-[13px] mt-2 font-medium" style={{ color: '#94A3B8' }}>
                  &mdash; {pq.attribution}
                </p>
              )}
            </div>
            <div className="flex-shrink-0 ml-auto">
              <CopyButton text={`"${pq.text}"${pq.attribution ? ` — ${pq.attribution}` : ''}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Next Issue Teaser */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #F8FAFC, #EFF6FF)',
          border: '1px solid #DBEAFE',
        }}
      >
        <div className="px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <ChevronRight className="w-4 h-4" style={{ color: '#1E40AF' }} />
            <span
              className="text-[11px] font-bold uppercase"
              style={{
                color: '#1E40AF',
                letterSpacing: '0.06em',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Coming Next
            </span>
          </div>
          <h3 className="text-[18px] font-bold mb-1.5" style={{ color: '#0F172A' }}>
            {issue.nextIssueTeaser.title}
          </h3>
          <p className="text-[14.5px] leading-[1.7]" style={{ color: '#64748B' }}>
            {issue.nextIssueTeaser.description}
          </p>
          <div className="flex items-center gap-1.5 mt-3">
            <ArrowRight className="w-3.5 h-3.5" style={{ color: '#1E40AF' }} />
            <span className="text-[13px] font-medium" style={{ color: '#1E40AF' }}>
              Stay tuned
            </span>
          </div>
        </div>
      </div>

      {/* Previous / Next navigation */}
      {(() => {
        const prevIssue = series.issues.find(i => i.number === issue.issueNumber - 1 && i.published);
        const nextIssue = series.issues.find(i => i.number === issue.issueNumber + 1 && i.published);
        if (!prevIssue && !nextIssue) return null;
        return (
          <div
            className="flex items-stretch gap-4 mt-8"
            style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}
          >
            {prevIssue ? (
              <Link
                href={`/section/${prevIssue.slug}`}
                className="flex-1 rounded-xl p-5 transition-all"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#BFDBFE'; (e.currentTarget as HTMLElement).style.background = '#FAFCFF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <ChevronLeft className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                  <span className="text-[11px] font-medium" style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}>
                    Previous
                  </span>
                </div>
                <p className="text-[14px] font-semibold" style={{ color: '#0F172A' }}>
                  #{prevIssue.number}: {prevIssue.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
            {nextIssue ? (
              <Link
                href={`/section/${nextIssue.slug}`}
                className="flex-1 rounded-xl p-5 text-right transition-all"
                style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#BFDBFE'; (e.currentTarget as HTMLElement).style.background = '#FAFCFF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#E2E8F0'; (e.currentTarget as HTMLElement).style.background = '#F8FAFC'; }}
              >
                <div className="flex items-center gap-1.5 mb-1.5 justify-end">
                  <span className="text-[11px] font-medium" style={{ color: '#94A3B8', fontFamily: "'JetBrains Mono', monospace" }}>
                    Next
                  </span>
                  <ChevronRight className="w-3.5 h-3.5" style={{ color: '#94A3B8' }} />
                </div>
                <p className="text-[14px] font-semibold" style={{ color: '#0F172A' }}>
                  #{nextIssue.number}: {nextIssue.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
          </div>
        );
      })()}

      <div style={{ height: '40px' }} />
    </div>
  );
}
