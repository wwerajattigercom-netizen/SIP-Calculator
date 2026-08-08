"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Calculator, TrendingUp } from 'lucide-react';

const TABS = [
  { href: '/',                        label: 'SIP Calculator', Icon: Calculator },
  { href: '/target-amount-calculator', label: 'Time to Goal',   Icon: Target     },
  { href: '/cagr-calculator',          label: 'CAGR',           Icon: TrendingUp  },
];

export default function CalculatorTabs() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-6">
      <div className="glass-panel p-1.5 flex rounded-xl w-full max-w-xl bg-[rgba(255,255,255,0.03)] border-[rgba(255,255,255,0.1)]">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-[#8b5cf6] text-white shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
