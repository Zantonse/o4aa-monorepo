'use client';

import { useState } from 'react';
import type { SectionContent } from '@/lib/types';

export default function DiagramCard({ section }: { section: SectionContent }) {
  const [imgMissing, setImgMissing] = useState(false);

  return (
    <div
      className="rounded-xl mb-5 overflow-hidden"
      style={{
        background: 'var(--color-surface-alt)',
        border: '1.5px dashed var(--color-border)',
      }}
    >
      <div
        className="px-6 py-3 flex items-center gap-2.5"
        style={{ borderBottom: '1px solid var(--color-border-subtle)' }}
      >
        <span
          className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px]"
          style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-500)', border: '1px solid var(--color-primary-100)' }}
        >
          ✦
        </span>
        <h3
          className="text-[14px] font-semibold uppercase tracking-wide"
          style={{ color: 'var(--color-primary-700)', letterSpacing: '0.05em' }}
        >
          Architecture Diagram
        </h3>
      </div>
      <div className="p-4">
        {imgMissing ? (
          <div
            className="w-full rounded-lg flex items-center justify-center text-[14.5px]"
            style={{
              minHeight: '140px',
              background: 'var(--color-border-subtle)',
              color: 'var(--color-text-muted)',
              fontStyle: 'italic',
            }}
          >
            No diagram available
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/diagrams/${section.slug}.png`}
            alt={`${section.title} architecture diagram`}
            className="w-full rounded-lg"
            style={{ minHeight: '80px', background: 'var(--color-surface-alt)' }}
            onError={() => setImgMissing(true)}
          />
        )}
      </div>
    </div>
  );
}
