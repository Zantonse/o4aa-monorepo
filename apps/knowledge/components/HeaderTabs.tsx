'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { label: 'Knowledge Base', href: '/section/ai-agents-101', prefix: '', matchPath: '/section/', excludePrefix: 'newsletter-', iconImage: '/icons/book.png' },
  { label: 'Diagrams', href: '/diagrams', prefix: '', matchPath: '/diagrams', iconImage: '/icons/chart.png' },
  { label: 'Field Guide', href: '/section/newsletter-01', prefix: 'newsletter-', matchPath: '/section/', iconImage: '/icons/newsletter.png' },
];

export default function HeaderTabs() {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith('/section/')
    ? pathname.split('/section/')[1]
    : '';

  return (
    <nav className="flex items-center gap-1" aria-label="Main sections">
      {TABS.map(tab => {
        const isActive = tab.matchPath === '/diagrams'
          ? pathname === '/diagrams'
          : tab.prefix
            ? activeSlug.startsWith(tab.prefix)
            : activeSlug !== '' && !activeSlug.startsWith('newsletter-');

        return (
          <Link
            key={tab.label}
            href={tab.href}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-medium transition-all duration-150"
            style={{
              background: isActive ? 'var(--color-primary-50)' : 'transparent',
              color: isActive ? 'var(--color-primary-700)' : 'var(--color-text-muted)',
              border: isActive
                ? '1px solid var(--color-primary-100)'
                : '1px solid transparent',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tab.iconImage}
              alt=""
              style={{ width: '16px', height: '16px', objectFit: 'contain' }}
            />
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
