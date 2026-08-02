"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Calculator } from 'lucide-react';

export default function CalculatorTabs() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-6">
      <div className="glass-panel p-1.5 flex rounded-xl w-full max-w-sm bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)]">
        <Link 
          href="/" 
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${pathname === '/' ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <Calculator className="w-4 h-4 mr-2" />
          SIP Calculator
        </Link>
        <Link 
          href="/target-amount-calculator" 
          className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${pathname === '/target-amount-calculator' ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]' : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'}`}
        >
          <Target className="w-4 h-4 mr-2" />
          Target Goal
        </Link>
      </div>
    </div>
  );
}
