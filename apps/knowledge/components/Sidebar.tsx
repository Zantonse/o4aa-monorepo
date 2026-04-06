'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_GROUPS, NEWSLETTER_GROUPS } from '@/lib/sections';
import NewBadge from './NewBadge';

export default function Sidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.startsWith('/section/')
    ? pathname.split('/section/')[1]
    : '';
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Determine which groups to show based on current route
  const isNewsletter = activeSlug.startsWith('newsletter-');
  const groups = isNewsletter ? NEWSLETTER_GROUPS : NAV_GROUPS;

  useEffect(() => {
    if (activeRef.current) {
      activeRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeSlug]);

  return (
    <aside
      className="flex-shrink-0 overflow-y-auto"
      style={{
        width: '240px',
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      <div className="py-3">
        {groups.map((group, gi) => (
          <div key={group.groupLabel}>
            {gi > 0 && (
              <div className="mx-4 my-1.5" style={{ height: '1px', background: 'var(--color-border-subtle)' }} />
            )}
            <div className="px-3 pt-3 pb-1">
              <p
                className="text-[11px] font-bold uppercase px-2 mb-2"
                style={{
                  color: 'var(--color-text-muted)',
                  letterSpacing: '0.08em',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {group.groupLabel}
              </p>
              {group.items.map(item => {
                const isActive = item.slug === activeSlug;
                return (
                  <Link
                    key={item.slug}
                    ref={isActive ? activeRef : undefined}
                    href={`/section/${item.slug}`}
                    className="flex items-center gap-2.5 rounded-lg mb-0.5 transition-all duration-150"
                    style={{
                      padding: '7px 10px',
                      background: isActive ? 'var(--color-primary-50)' : 'transparent',
                      borderLeft: isActive ? '2.5px solid var(--color-primary-700)' : '2.5px solid transparent',
                      paddingLeft: isActive ? '8px' : '10px',
                    }}
                    onMouseEnter={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = 'var(--color-surface-alt)';
                    }}
                    onMouseLeave={e => {
                      if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
                    }}
                  >
                    {item.iconImage ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`/${item.iconImage}`}
                        alt=""
                        className="flex-shrink-0 rounded"
                        style={{ width: '20px', height: '20px', objectFit: 'contain' }}
                      />
                    ) : (
                      <span className="text-[15px] w-5 text-center flex-shrink-0">{item.icon}</span>
                    )}
                    <span
                      className="text-[14px] leading-tight"
                      style={{
                        color: isActive ? 'var(--color-primary-700)' : 'var(--color-text-secondary)',
                        fontWeight: isActive ? 600 : 450,
                      }}
                    >
                      {item.label}
                    </span>
                    {item.isNew && <NewBadge />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
