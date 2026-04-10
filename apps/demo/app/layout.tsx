import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: 'JAG Token Exchange Demo',
  description: 'Demonstrates the JWT Authorization Grant (JAG) token exchange flow with Okta',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-full flex flex-col">
        {/* Top navbar */}
        <header style={{ background: 'var(--color-primary-700)', borderBottom: '1px solid var(--color-primary-800)' }} className="sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '1.0625rem', lineHeight: 1 }}>
                Okta
              </span>
              <span style={{ color: '#93c5fd', fontWeight: 400, fontSize: '1.0625rem', lineHeight: 1 }}>
                JAG Demo
              </span>
              <span className="hidden sm:inline" style={{ color: '#bfdbfe', fontSize: '0.8125rem', marginLeft: '0.5rem' }}>
                JWT Authorization Grant Token Exchange
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/demo-flow"
                style={{ color: '#93c5fd', fontSize: '0.8125rem', textDecoration: 'none' }}
              >
                Demo Flow
              </Link>
              <Link
                href="/settings"
                style={{ color: '#93c5fd', fontSize: '0.8125rem', textDecoration: 'none' }}
              >
                Settings
              </Link>
              <a
                href="https://developer.okta.com/docs/guides/implement-grant-type/clientcreds/main/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#93c5fd', fontSize: '0.8125rem', textDecoration: 'none' }}
              >
                Docs
              </a>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-6 py-10">
            {children}
          </div>
        </main>

        <footer style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)' }} className="py-6">
          <div className="max-w-6xl mx-auto px-6 text-center" style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>
            O4AA Demo — JWT Authorization Grant (JAG) Token Exchange Flow
          </div>
        </footer>
      </body>
    </html>
  );
}
