"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { ArrowRight, Settings2, TrendingUp, AlertCircle } from 'lucide-react';

export default function FlexiSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Flexi SIP Guide' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Advanced Strategy</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
            What is a Flexi SIP? (And Who Should Use It)
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            Regular SIPs force you to pay the exact same amount every month. But what if your income fluctuates? Enter the Flexi SIP.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. What is a Flexi SIP?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          A Flexible SIP (or Flexi SIP) allows you to change your investment amount every month. You define a <strong>minimum</strong> amount and a <strong>maximum</strong> amount, and you can choose how much to invest depending on your cash flow or market conditions.
        </p>

        <div className="bg-[rgba(27,58,92,0.05)] border border-[var(--color-accent)]/20 rounded-xl p-5 mt-4">
          <h3 className="text-foreground font-bold flex items-center gap-2 mb-2">
            <Settings2 className="w-5 h-5 text-[var(--color-accent)]" /> Perfect for Freelancers
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you are a freelancer or business owner in India, your income isn't fixed. In a good month, you can invest ₹20,000. In a slow month, you might only want to invest ₹5,000. Flexi SIP allows you to do this without cancelling your SIP and ruining your discipline.
          </p>
        </div>

        <h2 className="text-xl font-bold text-foreground mt-8">2. Flexi SIP for Market Timing</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Some advanced investors use Flexi SIPs to "buy the dip". 
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 mt-4">
          <li><strong>When markets are high:</strong> You invest your minimum amount (e.g., ₹5,000) because stocks are expensive.</li>
          <li><strong>When markets crash:</strong> You invest your maximum amount (e.g., ₹25,000) to buy cheap units at a massive discount.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-8">3. How to Set it Up?</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Many major AMCs (Asset Management Companies) and apps in India offer this feature. You typically set your "Regular Amount" and specify a formula or manual trigger for the Flexi amount. Note that some apps refer to this as a "Smart SIP" or "Dynamic SIP" if it's tied automatically to market valuations (P/E ratio).
        </p>
      </div>
    </main>
  );
}
