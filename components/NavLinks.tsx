'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/questions', label: 'Questions' },
  { href: '/wizard', label: 'Wizard' },
  { href: '/insights', label: 'Insights' },
  { href: '/diagrams', label: 'Diagrams' },
] as const;

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 overflow-x-auto shrink min-w-0">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium leading-none px-2.5 py-1 rounded-md transition-colors shrink-0 ${
              isActive
                ? 'text-white bg-white/15'
                : 'text-blue-200 hover:text-white hover:bg-white/10'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
