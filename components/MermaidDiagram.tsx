'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import DOMPurify from 'dompurify';

let mermaidInitialized = false;

function initMermaid() {
  if (mermaidInitialized) return;
  mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      primaryColor: '#e8e5f0',
      primaryTextColor: '#2d2656',
      primaryBorderColor: '#8b80b8',
      secondaryColor: '#f0ede6',
      secondaryTextColor: '#2d2656',
      secondaryBorderColor: '#c4b99a',
      tertiaryColor: '#e6f0eb',
      tertiaryTextColor: '#2d2656',
      tertiaryBorderColor: '#80b89a',
      lineColor: '#8b80b8',
      textColor: '#2d2656',
      mainBkg: '#e8e5f0',
      nodeBorder: '#8b80b8',
      clusterBkg: '#f5f4f8',
      clusterBorder: '#c4bdd8',
      titleColor: '#2d2656',
      edgeLabelBackground: '#ffffff',
      fontSize: '14px',
      fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)',
    },
    flowchart: {
      htmlLabels: true,
      curve: 'basis',
      padding: 16,
      nodeSpacing: 40,
      rankSpacing: 50,
    },
    sequence: {
      actorMargin: 50,
      messageFontSize: 13,
      noteFontSize: 12,
      useMaxWidth: true,
    },
  });
  mermaidInitialized = true;
}

export interface MermaidDiagramData {
  title: string;
  code: string;
  caption?: string;
}

export function MermaidDiagram({ diagram }: { diagram: MermaidDiagramData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rendered, setRendered] = useState(false);
  const idRef = useRef(`mermaid-${Math.random().toString(36).slice(2, 9)}`);

  useEffect(() => {
    initMermaid();

    async function render() {
      if (!containerRef.current) return;
      try {
        const { svg } = await mermaid.render(idRef.current, diagram.code);
        if (containerRef.current) {
          const sanitized = DOMPurify.sanitize(svg, {
            USE_PROFILES: { svg: true, svgFilters: true },
            ADD_TAGS: ['foreignObject'],
          });
          containerRef.current.innerHTML = sanitized;
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.removeAttribute('height');
            svgEl.style.width = '100%';
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
          setRendered(true);
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Failed to render diagram');
      }
    }

    render();
  }, [diagram.code]);

  return (
    <div
      className="my-6 rounded-xl overflow-hidden"
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
        boxShadow: 'var(--shadow-subtle)',
      }}
    >
      <div
        className="px-5 py-3 flex items-center gap-2.5"
        style={{
          borderBottom: '1px solid var(--color-border-subtle)',
          background: 'var(--color-surface-alt)',
        }}
      >
        <span
          className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-[11px]"
          style={{
            background: 'var(--color-primary-50)',
            color: 'var(--color-primary-500)',
            border: '1px solid var(--color-primary-100)',
          }}
        >
          ◇
        </span>
        <h4
          className="text-[13px] font-semibold uppercase"
          style={{ color: 'var(--color-primary-700)', letterSpacing: '0.05em' }}
        >
          {diagram.title}
        </h4>
      </div>

      <div className="p-5">
        {error ? (
          <div
            className="rounded-lg p-4 text-[13px]"
            style={{
              background: 'oklch(0.98 0.02 10)',
              border: '1px solid oklch(0.88 0.10 10)',
              color: 'oklch(0.40 0.15 10)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            Diagram render error: {error}
          </div>
        ) : (
          <div
            ref={containerRef}
            className="flex justify-center transition-opacity duration-300"
            style={{
              opacity: rendered ? 1 : 0,
              minHeight: rendered ? 'auto' : '120px',
            }}
          />
        )}

        {!rendered && !error && (
          <div
            className="shimmer rounded-lg"
            style={{ height: '120px', background: 'var(--color-surface-alt)' }}
          />
        )}
      </div>

      {diagram.caption && (
        <div className="px-5 pb-4" style={{ marginTop: '-8px' }}>
          <p className="text-[12px] italic text-center" style={{ color: 'var(--color-text-muted)' }}>
            {diagram.caption}
          </p>
        </div>
      )}
    </div>
  );
}

export function MermaidDiagramGroup({ diagrams }: { diagrams: MermaidDiagramData[] }) {
  return (
    <div className="space-y-4">
      {diagrams.map((d, i) => (
        <MermaidDiagram key={i} diagram={d} />
      ))}
    </div>
  );
}
