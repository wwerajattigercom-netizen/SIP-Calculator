"use client";
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="StepupCalculator Home">
          {/* Icon */}
          <div className="site-logo-icon">
            <TrendingUp size={16} strokeWidth={2.5} />
          </div>
          {/* Wordmark */}
          <span className="site-logo-text">
            Stepup<span className="site-logo-accent">Calculator</span>
          </span>
        </Link>

        {/* Right side — nav links + tagline */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-3">
            <Link href="/about" className="text-gray-500 hover:text-[#a78bfa] text-xs transition-colors">About</Link>
            <Link href="/disclaimer" className="text-gray-500 hover:text-[#a78bfa] text-xs transition-colors">Disclaimer</Link>
          </nav>
          <span className="site-header-tag">Free · No Sign-up · Real-time</span>
        </div>
      </div>
    </header>
  );
}
