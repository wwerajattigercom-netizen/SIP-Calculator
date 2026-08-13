"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowDown, Zap } from 'lucide-react';

export default function TriggerSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Trigger DCA Guide' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-[#991B1B] font-semibold mb-3 block">Tactical Strategy</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
            Trigger DCA: How to Automatically "Buy the Dip"
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Want to invest more money only when the stock market is bleeding? A Trigger DCA allows you to set rules for when your money gets invested.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. What is a Trigger DCA?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Instead of investing on a fixed date (like the 5th of every month), a Trigger DCA executes an investment <em>only</em> when a certain condition is met. 
          <br/><br/>
          For example: "Invest $500 every time the S&P 500 drops by 2%."
        </p>

        <h2 className="text-xl font-bold text-foreground mt-8">2. Pros and Cons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-[rgba(5,150,105,0.05)] border border-[#059669]/20 p-4 rounded-xl">
            <h3 className="text-[#059669] font-bold mb-2 flex items-center gap-2"><Zap className="w-4 h-4"/> Pros</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Guarantees that you buy units at a cheaper NAV, potentially boosting your long-term returns compared to a blind monthly DCA.
            </p>
          </div>
          <div className="bg-[rgba(153,27,27,0.05)] border border-[#991B1B]/20 p-4 rounded-xl">
            <h3 className="text-[#991B1B] font-bold mb-2 flex items-center gap-2"><ArrowDown className="w-4 h-4"/> Cons</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              In a raging bull market, your trigger might not hit for months, leaving your cash sitting idle in a bank account while the market rallies without you.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
