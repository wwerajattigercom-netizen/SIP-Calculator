"use client";
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { Shield, TrendingUp, Lock, Eye, BarChart3, Calculator, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export default function UlipPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <article className="max-w-3xl w-full mx-auto space-y-8">
        
        <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'SIP vs ULIP' }]} />
        
        {/* Hero Section */}
        <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="text-xs uppercase tracking-widest text-[var(--color-returns)] font-bold mb-4 block">Insurance vs Investment</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
              <span className="text-[var(--color-accent)]">SIP</span> vs <span className="text-[var(--color-loss)]">ULIP</span>: Which is Better?
            </h1>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
              Never mix insurance and investment. Insurance agents love to sell ULIPs because of the massive commissions, pitching them as "the best of both worlds." In reality, they are often the worst of both. Here is the mathematical truth of why pure Mutual Fund SIPs easily beat ULIPs over the long term.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                R
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Founder, StepupCalculator · 3 min read</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          
          {/* 1. The Core Difference */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Scale className="w-6 h-6 text-[var(--color-accent)]" /> 1. The Core Difference
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="border border-[rgba(27,58,92,0.15)] rounded-xl p-5 bg-[rgba(27,58,92,0.02)]">
                <h3 className="font-bold text-[var(--color-accent)] mb-2 flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Mutual Fund SIP</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-300">
                  A pure investment product. <strong>100%</strong> of your money goes directly into the stock market to buy units.
                </p>
              </div>
              <div className="border border-[rgba(153,27,27,0.15)] rounded-xl p-5 bg-[rgba(153,27,27,0.02)]">
                <h3 className="font-bold text-[var(--color-loss)] mb-2 flex items-center gap-2"><Shield className="w-4 h-4"/> ULIP (Unit Linked Insurance Plan)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 dark:text-gray-300">
                  A hybrid product. A portion of your premium goes toward life insurance (mortality charges), and only the <strong>remaining balance</strong> is invested.
                </p>
              </div>
            </div>
          </div>

          {/* 2. Lock-in Period */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Lock className="w-6 h-6 text-[#C4993C]" /> 2. Liquidity & Lock-in Period
            </h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed mb-4">
              Emergencies don't wait for lock-in periods to end.
            </p>
            <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300 bg-[rgba(196,153,60,0.05)] p-5 rounded-lg border border-[rgba(196,153,60,0.15)]">
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C4993C] mt-1.5 flex-shrink-0" /> <strong>SIPs:</strong> Zero lock-in (except 3 years for ELSS tax-savers). You can withdraw your money tomorrow if you need it.</li>
              <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#C4993C] mt-1.5 flex-shrink-0" /> <strong>ULIPs:</strong> A strict mandatory <strong>5-year lock-in</strong> period in India. Even if you surrender the policy early, you cannot touch the money until 5 years are over.</li>
            </ul>
          </div>

          {/* 3. Cost & Transparency */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <Eye className="w-6 h-6 text-[var(--color-accent)]" /> 3. Cost & Hidden Charges
            </h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Mutual Funds</strong> are heavily regulated and transparent. The only cost is the Total Expense Ratio (TER), usually between 0.5% and 1.5% for active funds, and under 0.2% for index funds.
            </p>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed mb-4">
              <strong>ULIPs</strong> are notoriously complex. They deduct money for:
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300 mb-4">
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">Premium Allocation Charges (can be up to 5-8% in year 1)</div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">Mortality Charges (increases as you age)</div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">Policy Administration Charges</div>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border border-gray-100 dark:border-gray-700">Fund Management Charges</div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 text-sm font-semibold">
              Result: Over 10-20 years, these layered charges eat up lakhs of rupees in compounding potential.
            </p>
          </div>

          {/* 4. ROI */}
          <div className="glass-panel p-8 border-l-4 border-l-[#059669]">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-[var(--color-returns)]" /> 4. Wealth Creation & Returns
            </h2>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed mb-4">
              <strong>Equity Mutual Funds</strong> have historically delivered 12% to 15% CAGR over long periods. Because 100% of your capital is compounding, a ₹10,000 monthly SIP can realistically grow to over ₹1 Crore in 20 years.
            </p>
            <p className="text-gray-600 dark:text-gray-400 dark:text-gray-300 leading-relaxed">
              <strong>ULIPs</strong> typically yield 6% to 9% CAGR net of charges. When you account for India's historical inflation rate of ~6%, the real (inflation-adjusted) return on a ULIP is dangerously close to zero.
            </p>
          </div>

          {/* 5. The Mix Fallacy Alert */}
          <div className="bg-[rgba(153,27,27,0.05)] p-6 rounded-2xl border border-[rgba(153,27,27,0.2)] shadow-sm">
            <h3 className="font-bold text-[var(--color-loss)] text-lg flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5" /> The "Mix" Fallacy
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              Agents pitch ULIPs as "the best of both worlds" — you get life cover plus market returns. In reality, you get the worst of both: <strong>inadequate insurance cover</strong> and <strong>subpar returns</strong>. <br/><br/>
              If you combine a cheap, high-cover Term Plan (e.g., ₹1 Crore cover for just ₹10,000/year) with a high-return Mutual Fund SIP, you mathematically beat any ULIP on the market by a massive margin.
            </p>
          </div>

          {/* Final Verdict */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(5,150,105,0.05)] to-transparent">
            <CheckCircle2 className="w-12 h-12 text-[var(--color-returns)] mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-3">The Final Verdict</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto leading-relaxed">
              The golden rule of personal finance is simple: <strong>Never mix insurance with investment.</strong> Buy a pure Term Insurance policy for protection, and use pure Mutual Fund SIPs for wealth creation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Calculator className="w-5 h-5" /> See How Fast a SIP Grows
              </Link>
            </div>
          </div>

        </div>
      </article>
    </main>
  );
}
