
"use client";
import React, { useState, useMemo } from 'react';
import { Info } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import LoanResultSection from '@/components/LoanResultSection';
import { useRegion } from '@/context/RegionContext';

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Auto Loan Calculator',
      description: 'Calculate your monthly auto loan payments, total interest payable, and view your complete year-by-year amortization schedule.',
      url: 'https://stepupcalculator.com/us/tools/auto-loan-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
    }
  ],
};

export default function AutoLoanCalculator() {
  const { isUS, currencySymbol } = useRegion();
  const [loanAmount, setLoanAmount] = useState(35000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(5);

  const results = useMemo(() => {
    const p = loanAmount;
    const r = (rate / 12) / 100;
    const n = years * 12;

    if (p === 0 || r === 0 || n === 0) {
      return { loanAmount: p, emi: 0, totalInterest: 0, totalPayable: p, amortizationSchedule: [] };
    }

    const emi = p * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - p;

    let balance = p;
    let schedule = [];
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= n; month++) {
      const interestForMonth = balance * r;
      const principalForMonth = emi - interestForMonth;
      
      yearlyInterest += interestForMonth;
      yearlyPrincipal += principalForMonth;
      balance -= principalForMonth;

      if (month % 12 === 0 || month === n) {
        schedule.push({
          year: Math.ceil(month / 12),
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          remainingBalance: Math.max(0, balance)
        });
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }

    return {
      loanAmount,
      emi,
      totalInterest,
      totalPayable,
      amortizationSchedule: schedule
    };
  }, [loanAmount, rate, years]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Auto Loan Calculator' }]} />
          
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              Auto Loan Calculator
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Calculate your monthly auto loan payments, total interest payable, and view your complete year-by-year amortization schedule.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            <div className="lg:col-span-5 glass-panel p-4 lg:p-5 relative">
              <InputSlider label="Loan Amount" value={loanAmount} onChange={setLoanAmount} min={10000} max={parseInt('150000')} step={10000} prefix={currencySymbol} />
              <InputSlider label="Interest Rate (p.a)" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
              <InputSlider label="Loan Tenure" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
            </div>

            <div className="lg:col-span-7 h-full lg:sticky lg:top-8">
              <LoanResultSection results={results} />
            </div>
          </div>
        </div>
      </main>

      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-16 mt-12">
        <section id="how-to-use" aria-label="How to use the calculator" className="w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">1</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Enter Loan Details</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Adjust the loan amount, interest rate, and tenure using the sliders.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">2</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Review Your EMI</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The monthly EMI and total interest payable are calculated instantly.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">3</div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Check Amortization</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">View the chart and table to see how your balance drops to zero over time.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
