"use client";

import React from 'react';
import { Info } from 'lucide-react';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import USTaxCalculator from '@/components/USTaxCalculator';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Federal Income Tax Calculator (2024)',
      description: 'Calculate your US Federal Income Tax based on the 2024 IRS tax brackets. Find your effective and marginal tax rates.',
      url: 'https://stepupcalculator.com/us/tools/income-tax-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
    }
  ],
};

export default function USIncomeTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Federal Income Tax Calculator' }]} />
          
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              Federal Income Tax Calculator (2024)
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Calculate your estimated US Federal Income Tax based on the 2024 IRS brackets for Single Filers.
            </p>
          </div>

          <USTaxCalculator />
        </div>
      </main>

      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-16 mt-12">
        <section id="how-to-use" aria-label="How to use the calculator" className="w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Understanding US Federal Income Tax</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">1</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Progressive Tax Brackets</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The US uses a progressive tax system. This means you do not pay your highest tax rate on all your income. You only pay the higher rate on the amount of income that falls into that specific bracket.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">2</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Marginal vs Effective Rate</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Your <strong>Marginal Rate</strong> is the highest bracket your income reaches. Your <strong>Effective Rate</strong> is the actual percentage of your total income paid in taxes (which is always lower).</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">3</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Standard Deduction</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">For 2024, the standard deduction for a single filer is $14,600. This amount is subtracted from your gross income before any tax is calculated.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
