"use client";
import Breadcrumb from '@/components/Breadcrumb';
import { Layers } from 'lucide-react';

export default function TypesSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Types of DCA' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3 flex items-center gap-3">
          <Layers className="text-[var(--color-accent)] w-8 h-8"/> 5 Types of DCAs Explained
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
          Not all DCAs are created equal. Depending on your income stability and market strategy, you can choose a DCA that fits your unique needs.
        </p>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. Regular DCA</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">The classic. A fixed amount is deducted from your bank account on a fixed date every month for a fixed tenure (e.g., $500 every 5th of the month for 5 years).</p>

        <h2 className="text-xl font-bold text-foreground">2. Perpetual DCA</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Exactly like a Regular DCA, but with no end date. It continues indefinitely until you explicitly send a stop instruction to the fund house.</p>

        <h2 className="text-xl font-bold text-foreground">3. Step-Up / Top-Up DCA</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Your investment amount automatically increases by a fixed percentage (e.g., 10%) every year. Best for salaried employees.</p>

        <h2 className="text-xl font-bold text-foreground">4. Flexi DCA</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Allows you to change your monthly installment amount based on your cash flow. Ideal for freelancers and business owners .</p>

        <h2 className="text-xl font-bold text-foreground">5. Trigger DCA</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Invests only when a certain market condition is met (e.g., S&P 500 drops by 2%). Best for tactical investors trying to buy the dip.</p>
      </div>
    </main>
  );
}
