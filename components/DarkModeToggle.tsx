'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function DarkModeToggle({ className }: { className?: string }) {
  const [isDark, setIsDark] = useState(false);

  // On mount, read from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('darkMode');
      if (stored === 'true') {
        document.documentElement.classList.add('dark');
        setIsDark(true);
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    } catch {
      // localStorage not available
    }
  };

  return (
    <button
      onClick={toggle}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`p-2 rounded-lg hover:bg-white/10 transition-colors ${className ?? 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
