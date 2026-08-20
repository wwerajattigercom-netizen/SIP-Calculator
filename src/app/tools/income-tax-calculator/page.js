"use client";

import React from 'react';
import { Info } from 'lucide-react';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import IndiaTaxCalculator from '@/components/IndiaTaxCalculator';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Old vs New Tax Regime Calculator',
      description: 'Compare the Old and New Income Tax Regimes for FY 2024-25. Find out which regime saves you more money.',
      url: 'https://stepupcalculator.com/tools/income-tax-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
    }
  ],
};

export default function IncomeTaxCalculatorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Old vs New Tax Regime Calculator' }]} />
          
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              Old vs New Tax Regime Calculator (FY 2025-26)
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Compare both tax regimes side-by-side to find out which one saves you more money on your salary.
            </p>
          </div>

          <IndiaTaxCalculator />
        </div>
      </main>

      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-16 mt-12">
        <section id="how-to-use" aria-label="How to use the calculator" className="w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Choose the Right Tax Regime</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">1</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Understand the New Regime</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The New Regime offers lower tax rates but you must give up almost all exemptions (like HRA) and deductions (like 80C). The standard deduction is ₹75,000 for the New Regime and ₹50,000 for the Old Regime.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">2</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">The 7 Lakh Rebate</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">In the New Regime, if your taxable income is ₹7,000,000 or less, you get a full rebate under Section 87A, meaning you pay zero tax.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">3</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">When to choose Old Regime</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">If you have high deductions (₹1.5L in 80C, ₹50k in NPS, high HRA rent receipts, and a Home Loan), the Old Regime is usually better. Otherwise, the New Regime wins.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── STRATEGY SECTION ── */}
        <section id="strategy-breakeven" aria-label="The Breakeven Threshold" className="w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#059669] bg-opacity-20 dark:bg-opacity-10 border border-[#059669] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-returns)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Strategy: The Breakeven Threshold</h2>
          </div>
          <div className="bg-[var(--background)] p-6 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              Choosing between the Old and New Tax Regimes depends on your salary and eligible deductions. The <strong>Breakeven Threshold</strong> is the exact amount of deductions you need to claim for the Old Regime to be more beneficial.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400 text-sm">
              <li><strong>Up to ₹7,00,000 Salary:</strong> The New Regime is always better because you pay zero tax due to the Section 87A rebate.</li>
              <li><strong>₹10,00,000 Salary:</strong> You need roughly <strong>₹2,62,500</strong> in total deductions (like 80C, HRA, Health Insurance) to make the Old Regime worthwhile.</li>
              <li><strong>₹15,00,000+ Salary:</strong> The breakeven threshold rises to <strong>₹3,75,000</strong>. If your actual deductions exceed this number, choose the Old Regime. Otherwise, stick with the New Regime.</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
