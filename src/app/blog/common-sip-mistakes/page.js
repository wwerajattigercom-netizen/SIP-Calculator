"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { AlertTriangle, XCircle } from 'lucide-react';

export default function MistakesPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SIP Mistakes' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3 flex items-center gap-3">
          <AlertTriangle className="text-[#991B1B] w-8 h-8"/> 7 Common SIP Mistakes
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Are you unknowingly destroying your long-term wealth? Here are the most common pitfalls Indian investors make with their SIPs.
        </p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex gap-3 items-start">
            <XCircle className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-foreground font-bold text-lg">1. Stopping SIPs during a Market Crash</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">This is the worst mistake you can make. A crash is when units are on sale. Stopping your SIP means you miss the recovery.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <XCircle className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-foreground font-bold text-lg">2. Chasing Past Returns</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Investing in a fund just because it gave 40% returns last year is dangerous. Reversion to the mean often guarantees lower returns the following year.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <XCircle className="w-5 h-5 text-[#991B1B] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-foreground font-bold text-lg">3. Over-Diversification</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Having 15 different mutual funds doesn't make you safer. It just dilutes your returns and turns your portfolio into an expensive index fund.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
