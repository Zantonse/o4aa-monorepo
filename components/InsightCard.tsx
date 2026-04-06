'use client';

import { useState } from 'react';
import { ChevronDown, Copy, Check } from 'lucide-react';
import clsx from 'clsx';

interface InsightCardProps {
  title: string;
  subtitle?: string;
  colorScheme: {
    border: string;
    heading: string;
    badge: string;
    badgeText: string;
  };
  badge?: string;
  preview?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  fullWidth?: boolean;
}

export default function InsightCard({
  title,
  subtitle,
  colorScheme,
  badge,
  preview,
  children,
  defaultOpen = false,
  fullWidth = false,
}: InsightCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    const el = document.getElementById(`card-${title.replace(/\s/g, '-')}`);
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <div
      className={clsx(
        'bg-white border rounded-xl shadow-sm overflow-hidden transition-all',
        colorScheme.border,
        fullWidth && 'col-span-full'
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left hover:bg-slate-50/50 transition-colors"
      >
        <div className="flex items-center gap-3 min-w-0">
          <h3 className={clsx('font-semibold text-sm', colorScheme.heading)}>{title}</h3>
          {badge && (
            <span
              className={clsx(
                'px-2.5 py-0.5 rounded-full text-xs font-medium shrink-0',
                colorScheme.badge,
                colorScheme.badgeText
              )}
            >
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="p-1 rounded hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <ChevronDown
            className={clsx(
              'w-4 h-4 text-slate-400 transition-transform',
              isOpen && 'rotate-180'
            )}
          />
        </div>
      </button>

      {!isOpen && preview && (
        <div className="px-5 pb-3 -mt-1">
          <p className="text-xs text-slate-500 line-clamp-2">{preview}</p>
        </div>
      )}

      {subtitle && !isOpen && (
        <div className="px-5 pb-3 -mt-1">
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      )}

      {isOpen && (
        <div
          id={`card-${title.replace(/\s/g, '-')}`}
          className="px-5 pb-5 border-t border-slate-100"
        >
          {children}
        </div>
      )}
    </div>
  );
}
