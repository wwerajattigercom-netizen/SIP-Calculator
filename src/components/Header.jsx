"use client";
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header relative z-[100]">
      <div className="site-header-inner flex justify-between items-center w-full">
        <Link href="/" className="site-logo" aria-label="StepupCalculator Home">
          <span className="site-logo-text">
            StepupCalculator
          </span>
        </Link>

        {/* Mobile Menu Toggle */}
        <button 
          className="sm:hidden p-1 text-[#1F2937] hover:bg-black/5 rounded-md transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Right side — Desktop nav links */}
        <nav className="hidden sm:flex items-center gap-6">
          <Link href="/" className="text-[#1F2937] hover:text-[#1B3A5C] text-sm font-semibold transition-colors">Home</Link>
          <Link href="/about" className="text-[#1F2937] hover:text-[#1B3A5C] text-sm font-semibold transition-colors">About Us</Link>
        </nav>
      </div>

      {/* Mobile Nav Dropdown */}
      {isOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-[#f8f2ea] border-b border-black/10 shadow-xl flex flex-col py-3 px-4 gap-4 animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-[#1F2937] hover:text-[#1B3A5C] text-base font-semibold block px-2 py-1">Home</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-[#1F2937] hover:text-[#1B3A5C] text-base font-semibold block px-2 py-1">About Us</Link>
        </div>
      )}
    </header>
  );
}
