import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import AiBar from '@/components/AiBar';
import HeaderTabs from '@/components/HeaderTabs';
import GlobalSearch from '@/components/GlobalSearch';

const geistSans = localFont({
  src: './fonts/GeistVF.woff2',
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff2',
  variable: '--font-geist-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'O4AA Knowledge Hub',
  description: 'Okta for AI Agents — SE Internal Reference',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`h-full ${geistSans.variable} ${geistMono.variable}`}>
      <body className="h-full flex flex-col font-sans">
        {/* Skip nav link — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:text-sm focus:font-medium"
          style={{
            background: 'var(--color-primary-700)',
            color: 'white',
          }}
        >
          Skip to main content
        </a>

        <header
          className="flex-shrink-0 flex items-center justify-between px-5"
          style={{
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            height: '54px',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{
                background: 'linear-gradient(135deg, oklch(0.28 0.14 260), oklch(0.38 0.18 260))',
                boxShadow: '0 1px 4px oklch(0.28 0.14 260 / 0.3)',
              }}
            >
              ✦
            </div>
            <div className="flex items-baseline gap-0">
              <span
                className="font-semibold"
                style={{
                  color: 'var(--color-primary-700)',
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  letterSpacing: '-0.02em',
                }}
              >
                O4AA Knowledge Hub
              </span>
              <span
                className="font-light mx-2.5"
                style={{ color: 'var(--color-border)', fontSize: '14px' }}
              >
                |
              </span>
              <span
                className="font-medium"
                style={{
                  color: 'var(--color-text-muted)',
                  fontSize: '13px',
                }}
              >
                Okta for AI Agents
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GlobalSearch />
            <HeaderTabs />
          </div>

          <span
            className="font-mono text-[11px] font-semibold px-3 py-1 rounded-md"
            style={{
              background: 'var(--color-surface-alt)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.06em',
            }}
          >
            SE INTERNAL
          </span>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <main
            id="main-content"
            className="flex-1 overflow-y-auto"
            style={{ background: 'var(--color-canvas)', paddingBottom: '80px' }}
          >
            {children}
          </main>
        </div>

        <AiBar />
      </body>
    </html>
  );
}
