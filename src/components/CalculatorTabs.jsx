"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Target, Calculator, TrendingUp, Layers, Wallet, Clock, BookOpen } from 'lucide-react';

const TABS = [
  { href: '/',                        label: 'SIP',      Icon: Calculator  },
  { href: '/swp-calculator',           label: 'SWP',      Icon: Wallet      },
  { href: '/cagr-calculator',          label: 'CAGR',     Icon: TrendingUp  },
  { href: '/target-amount-calculator', label: 'Goal',     Icon: Target      },
  { href: '/lumpsum-calculator',       label: 'Lumpsum',  Icon: Layers      },
  { href: '/blog',                     label: 'Guides',   Icon: BookOpen    },
];

export default function CalculatorTabs() {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mb-6 w-full overflow-hidden">
      <div className="glass-panel p-1.5 flex rounded-xl w-full max-w-4xl bg-white dark:bg-[var(--panel-bg)] border-black/5 dark:border-white/10 overflow-x-auto hide-scrollbar gap-1">
        {TABS.map(({ href, label, Icon }) => {
          // Highlight the Guides tab for all /blog/... routes
          const active = href === '/blog' ? pathname.startsWith('/blog') : pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 min-w-[105px] sm:min-w-[110px] flex flex-nowrap items-center justify-center py-2 px-2 sm:px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 ${
                active
                  ? 'bg-[var(--color-accent)] text-white shadow-md'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-black/5 dark:hover:bg-white/5'
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
