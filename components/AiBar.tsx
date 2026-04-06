'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { CONTENT_MAP } from '@/lib/content/index';
import { SLUG_MAP } from '@/lib/sections';

export default function AiBar() {
  const pathname = usePathname();
  const slug = pathname.startsWith('/section/') ? pathname.split('/section/')[1] : '';
  const navItem = SLUG_MAP[slug];
  const sectionContent = CONTENT_MAP[slug];

  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [devDocs, setDevDocs] = useState(true);
  const [helpDocs, setHelpDocs] = useState(true);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setResponse(''); }, [slug]);

  useEffect(() => {
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [response]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || streaming) return;

    const q = question.trim();
    setQuestion('');
    setResponse('');
    setStreaming(true);

    const sectionContext = sectionContent
      ? sectionContent.cards
          .map(c => `${c.heading}\n${c.paragraphs.join('\n')}`)
          .join('\n\n')
      : '';

    const sources: string[] = [];
    if (devDocs) sources.push('dev-docs');
    if (helpDocs) sources.push('help-docs');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, sectionSlug: slug, sectionContent: sectionContext, sources }),
      });

      if (!res.ok) {
        setResponse(`Error: ${await res.text()}`);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          setResponse(prev => prev + decoder.decode(value, { stream: true }));
        }
      } catch (e) {
        setResponse(e instanceof Error ? `Error: ${e.message}` : 'Request failed');
      } finally {
        reader.cancel().catch(() => {});
      }
    } catch (e) {
      setResponse(e instanceof Error ? `Error: ${e.message}` : 'Request failed');
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div
      className={`fixed bottom-0 z-50 flex flex-col ${streaming ? 'stream-pulse' : ''}`}
      style={{
        left: '240px',
        right: 0,
        background: 'var(--color-surface)',
        borderTop: streaming ? '2px solid var(--color-primary-200)' : '1px solid var(--color-border)',
        boxShadow: streaming ? '0 -4px 20px oklch(0.28 0.14 260 / 0.06)' : '0 -2px 12px rgba(0,0,0,0.03)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Streaming response panel */}
      {response && (
        <div
          ref={responseRef}
          className="overflow-y-auto"
          style={{
            maxHeight: '240px',
            borderBottom: '1px solid var(--color-border)',
            background: 'var(--color-surface-alt)',
          }}
        >
          <div className="flex items-center justify-between px-6 pt-3 pb-1.5">
            <div className="flex items-center gap-2">
              <span
                className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
                style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary-500)', border: '1px solid var(--color-primary-100)' }}
              >
                ✦
              </span>
              <span
                className="text-[11.5px] font-semibold uppercase"
                style={{ color: 'var(--color-primary-500)', letterSpacing: '0.06em', fontFamily: "'JetBrains Mono', monospace" }}
              >
                Answer
              </span>
            </div>
            <button
              onClick={() => setResponse('')}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md transition-colors"
              style={{ color: 'var(--color-text-muted)', background: 'transparent' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-border-subtle)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              Dismiss ✕
            </button>
          </div>
          <div className="px-6 pb-4">
            <div
              className="text-[15px] leading-[1.75]"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {response.split('\n').map((line, i) => {
                if (!line.trim()) return <br key={i} />;
                // Detect markdown-style headers (## Heading)
                if (line.startsWith('## ')) {
                  return (
                    <p key={i} className="font-semibold mt-3 mb-1 text-[15.5px]" style={{ color: 'var(--color-text)' }}>
                      {line.replace(/^##\s*/, '')}
                    </p>
                  );
                }
                // Detect bold (**text**)
                const parts = line.split(/\*\*(.*?)\*\*/g);
                return (
                  <p key={i} className="mb-1">
                    {parts.map((part, j) =>
                      j % 2 === 1 ? <strong key={j} style={{ color: 'var(--color-text)', fontWeight: 600 }}>{part}</strong> : part
                    )}
                  </p>
                );
              })}
              {streaming && <span className="animate-pulse" style={{ color: 'var(--color-primary-700)' }}>▋</span>}
            </div>
          </div>
        </div>
      )}

      {/* Input row */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 px-5 py-3">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="w-6 h-6 rounded-md flex items-center justify-center text-[11px]"
            style={{ background: 'var(--color-primary-700)', color: 'var(--color-surface)' }}
          >
            ✦
          </span>
          <span className="text-[13px] font-medium whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
            Ask about{' '}
            <span style={{ color: 'var(--color-primary-700)', fontWeight: 600 }}>{navItem?.label ?? 'the docs'}</span>
          </span>
        </div>

        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder={`e.g. How does ${navItem?.label ?? 'this'} work?`}
          className="flex-1 h-9 rounded-lg px-3.5 text-[14.5px] outline-none transition-all"
          style={{
            background: 'var(--color-surface-alt)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text)',
          }}
          onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-700)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 3px oklch(0.28 0.14 260 / 0.08)'; }}
          onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
          disabled={streaming}
        />

        {/* Source toggles */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <span className="text-[9px] font-medium mr-1" style={{ color: 'var(--color-text-muted)' }}>Sources</span>
          {[
            { key: 'dev', label: 'developer.okta.com', short: 'Dev', active: devDocs, toggle: () => setDevDocs(v => !v) },
            { key: 'help', label: 'help.okta.com', short: 'Help', active: helpDocs, toggle: () => setHelpDocs(v => !v) },
          ].map(({ key, short, label, active, toggle }) => (
            <button
              key={key}
              type="button"
              onClick={toggle}
              title={active ? `Searching ${label} — click to disable` : `Click to search ${label}`}
              className="text-[10px] font-semibold px-2.5 py-1 rounded-md border transition-all flex-shrink-0"
              style={{
                background: active ? 'var(--color-primary-50)' : 'transparent',
                borderColor: active ? 'var(--color-primary-200)' : 'var(--color-border)',
                color: active ? 'var(--color-primary-500)' : 'var(--color-border)',
                textDecoration: active ? 'none' : 'line-through',
              }}
            >
              {short}
            </button>
          ))}
        </div>

        <button
          type="submit"
          disabled={!question.trim() || streaming}
          className="h-9 px-5 rounded-lg text-[14px] font-semibold disabled:opacity-30 flex-shrink-0 transition-all"
          style={{ background: 'var(--color-primary-700)', color: 'var(--color-surface)' }}
          onMouseEnter={e => { if (!streaming) (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-800)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-primary-700)'; }}
        >
          {streaming ? '…' : 'Ask'}
        </button>
      </form>
    </div>
  );
}
