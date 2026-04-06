import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import NavLinks from '@/components/NavLinks';

export const metadata: Metadata = {
  title: 'O4AA Discovery Planner',
  description: 'AI-powered discovery question planner for Okta for AI Agents',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* Top navbar */}
        <header className="bg-[#00297A] border-b border-[#001d5a] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            {/* Logo / wordmark */}
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-white font-bold text-lg leading-none">Okta</span>
                <span className="text-blue-200 font-normal text-lg leading-none">for AI Agents</span>
              </Link>
              <span className="text-blue-400 mx-1 font-light text-lg leading-none">|</span>
              <NavLinks />
            </div>

            {/* Right side — dark mode toggle hidden until dark: classes are added */}
            <div />
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
