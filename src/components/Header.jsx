"use client";
import Link from 'next/link';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === 'system' ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="site-header relative z-[100] dark:bg-background dark:border-b dark:border-white/10">
      <div className="site-header-inner flex justify-between items-center w-full">
        <Link href="/" className="site-logo" aria-label="StepupCalculator Home">
          <span className="site-logo-text dark:text-[#E5E7EB]">
            StepupCalculator
          </span>
        </Link>

        {/* Right side — Desktop nav links and theme toggle */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors">Home</Link>
            <Link href="/about" className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-sm font-semibold transition-colors">About Us</Link>
          </nav>
          
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {currentTheme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="sm:hidden p-1 text-foreground hover:bg-black/5 dark:hover:bg-white/10 rounded-md transition-colors" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-background border-b border-black/10 shadow-xl flex flex-col py-3 px-4 gap-4 animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-base font-semibold block px-2 py-1">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-foreground hover:text-[var(--color-accent)] dark:hover:text-[#3B82F6] text-base font-semibold block px-2 py-1">About Us</Link>
        </div>
      )}
    </header>
  );
}
