'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { search, type SearchResult } from '@/lib/search-index';

export default function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Cmd+K / Ctrl+K to open
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery('');
      setResults([]);
      setSelected(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Search on query change
  useEffect(() => {
    const r = search(query, 15);
    setResults(r);
    setSelected(0);
  }, [query]);

  const navigate = useCallback((result: SearchResult) => {
    setOpen(false);
    router.push(`/section/${result.slug}`);
  }, [router]);

  // Keyboard navigation
  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelected(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelected(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selected]) {
      navigate(results[selected]);
    }
  }

  // Highlight matching text
  function highlight(text: string, q: string) {
    if (!q || q.length < 2) return text;
    const idx = text.toLowerCase().indexOf(q.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark
          style={{
            background: 'oklch(0.92 0.10 85)',
            color: 'inherit',
            borderRadius: '2px',
            padding: '0 1px',
          }}
        >
          {text.slice(idx, idx + q.length)}
        </mark>
        {text.slice(idx + q.length)}
      </>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg transition-colors duration-150"
        style={{
          padding: '6px 12px',
          background: 'var(--color-surface-alt)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-text-muted)',
          fontSize: '13px',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-primary-300)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-border)';
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Search...</span>
        <kbd
          className="font-mono"
          style={{
            fontSize: '11px',
            padding: '1px 5px',
            borderRadius: '4px',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-muted)',
            marginLeft: '8px',
          }}
        >
          {typeof navigator !== 'undefined' && /Mac/.test(navigator.userAgent) ? '⌘' : 'Ctrl+'}K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center"
      style={{ paddingTop: '15vh' }}
      onClick={() => setOpen(false)}
    >
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'oklch(0.13 0.02 260 / 0.5)', backdropFilter: 'blur(4px)' }} />

      {/* Modal */}
      <div
        className="relative rounded-xl overflow-hidden"
        style={{
          width: 'min(640px, 90vw)',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 20px 60px oklch(0.13 0.02 260 / 0.3), 0 0 0 1px oklch(0.90 0.01 260 / 0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4"
          style={{ borderBottom: '1px solid var(--color-border)', height: '52px' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all sections..."
            className="flex-1 outline-none text-[15px]"
            style={{
              background: 'transparent',
              color: 'var(--color-text)',
              fontFamily: 'var(--font-sans)',
            }}
          />
          <kbd
            className="font-mono"
            style={{
              fontSize: '11px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div
          className="overflow-y-auto"
          style={{ maxHeight: '400px' }}
        >
          {query.length >= 2 && results.length === 0 && (
            <div className="px-4 py-8 text-center" style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>
              No results for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.map((result, i) => (
            <button
              key={`${result.slug}-${result.cardHeading}-${i}`}
              className="w-full text-left px-4 py-3 transition-colors duration-100"
              style={{
                background: i === selected ? 'var(--color-primary-50)' : 'transparent',
                borderBottom: '1px solid var(--color-border-subtle)',
                cursor: 'pointer',
              }}
              onClick={() => navigate(result)}
              onMouseEnter={() => setSelected(i)}
            >
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[11px] font-semibold uppercase px-1.5 py-0.5 rounded"
                  style={{
                    background: 'var(--color-primary-50)',
                    color: 'var(--color-primary-600)',
                    letterSpacing: '0.04em',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {result.navLabel}
                </span>
                <span style={{ color: 'var(--color-text-muted)', fontSize: '12px' }}>
                  {result.cardHeading}
                </span>
              </div>
              <p
                className="text-[13px] leading-relaxed line-clamp-2"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {highlight(result.matchContext, query)}
              </p>
            </button>
          ))}

          {query.length < 2 && (
            <div className="px-4 py-6 text-center" style={{ color: 'var(--color-text-muted)', fontSize: '13px' }}>
              Type 2+ characters to search across all sections
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
