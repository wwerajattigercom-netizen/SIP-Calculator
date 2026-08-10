"use client";
import Link from 'next/link';
import { TrendingUp } from 'lucide-react';

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-logo" aria-label="StepupCalculator Home">
          <span className="site-logo-text">
            StepupCalculator
          </span>
        </Link>

        {/* Right side — nav links + tagline */}
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/" className="text-[#1F2937] hover:text-[#1B3A5C] text-sm font-semibold transition-colors">Home</Link>
            <Link href="/blog" className="text-[#1F2937] hover:text-[#1B3A5C] text-sm font-semibold transition-colors">Guides</Link>
            <Link href="/about" className="text-[#1F2937] hover:text-[#1B3A5C] text-sm font-semibold transition-colors">About Us</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
