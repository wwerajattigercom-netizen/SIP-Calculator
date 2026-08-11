"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Calculator, TrendingUp, Layers, Wallet, Clock, BookOpen } from 'lucide-react';

const TABS = [
  { href: '/',                        label: 'SIP',      Icon: Calculator  },
  { href: '/lumpsum-calculator',       label: 'Lumpsum',  Icon: Layers      },
  { href: '/target-amount-calculator', label: 'Goal',     Icon: Target      },
  { href: '/cagr-calculator',          label: 'CAGR',     Icon: TrendingUp  },
  { href: '/swp-calculator',           label: 'SWP',      Icon: Wallet      },
  { href: '/cost-of-delay-calculator', label: 'Delay Cost', Icon: Clock     },
  { href: '/blog',                     label: 'Guides',   Icon: BookOpen    },
];

export default function CalculatorTabs() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-6 w-full overflow-hidden">
      <div className="glass-panel p-1.5 flex rounded-xl w-full max-w-4xl bg-white border-[rgba(0,0,0,0.05)] overflow-x-auto hide-scrollbar gap-1">
        {TABS.map(({ href, label, Icon }) => {
          // Highlight the Guides tab for all /blog/... routes
          const active = href === '/blog' ? pathname.startsWith('/blog') : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 min-w-[105px] sm:min-w-[110px] flex flex-nowrap items-center justify-center py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-[#1B3A5C] text-white shadow-md'
                  : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-[rgba(27,58,92,0.05)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
              <span className="whitespace-nowrap">{label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
