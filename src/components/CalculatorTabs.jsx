"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Calculator, TrendingUp, Layers, Wallet, Clock } from 'lucide-react';

const TABS = [
  { href: '/',                        label: 'SIP',      Icon: Calculator  },
  { href: '/lumpsum-calculator',       label: 'Lumpsum',  Icon: Layers      },
  { href: '/target-amount-calculator', label: 'Goal',     Icon: Target      },
  { href: '/cagr-calculator',          label: 'CAGR',     Icon: TrendingUp  },
  { href: '/swp-calculator',           label: 'SWP',      Icon: Wallet      },
  { href: '/cost-of-delay-calculator', label: 'Delay Cost', Icon: Clock     },
];

export default function CalculatorTabs() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-6">
      <div className="glass-panel p-1.5 flex rounded-xl w-full max-w-2xl bg-white border-[rgba(0,0,0,0.05)]">
        {TABS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-[#1B3A5C] text-white shadow-md'
                  : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-[rgba(27,58,92,0.05)]'
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
