"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import Link from 'next/link';
import { TrendingUp, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const COMPARISON = [
  {
    metric: 'Absolute Return',
    formula: '(FV − PV) ÷ PV × 100',
    useFor: 'Quick check — how much did I make in total?',
    bestFor: 'Short-term lumpsum investments (<1 year)',
    limitation: 'Ignores time — 50% in 1 year vs 50% in 10 years look the same',
    example: '₹1L → ₹1.5L = 50% (regardless of duration)',
    color: 'text-[#059669]',
    border: 'border-amber-400/20',
  },
  {
    metric: 'CAGR',
    formula: '(FV ÷ PV)^(1÷n) − 1',
    useFor: 'Annualised return for a single lump sum investment',
    bestFor: 'Comparing lumpsum investments of different durations',
    limitation: 'Not accurate for SIP (multiple cash flows at different times)',
    example: '₹1L → ₹2L in 5 years = 14.87% CAGR p.a.',
    color: 'text-[var(--color-accent)]',
    border: 'border-[rgba(27,58,92,0.3)]',
  },
  {
    metric: 'XIRR',
    formula: 'IRR across irregular cash flows (Excel/solver)',
    useFor: 'True annualised return for SIP or multiple investments',
    bestFor: 'SIP returns, lumpsum + SIP combined, partial withdrawals',
    limitation: 'Requires computation — cannot be done manually easily',
    example: '₹5,000/mo SIP for 5 years → ₹4.2L corpus = ~12.3% XIRR',
    color: 'text-[#C4993C]',
    border: 'border-[rgba(196,153,60,0.2)]',
  },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'CAGR vs XIRR vs Absolute Return — Complete Guide for Indian Investors',
  description: 'Understand the difference between CAGR, XIRR, and Absolute Return. Which metric for SIP vs lumpsum? Guide with examples.',
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/cagr-vs-xirr-vs-absolute-return',
};

export default function CAGRvsXIRRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'CAGR vs XIRR vs Absolute Return' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#C4993C] font-semibold mb-3 block">Guide · Return Metrics</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                <span className="text-[var(--color-accent)]">CAGR</span> vs <span className="text-[#C4993C]">XIRR</span> vs Absolute Return — What's the Difference?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                When you look at your mutual fund portfolio on Groww or Zerodha, you see different numbers —
                XIRR, CAGR, and absolute return. They are all measuring returns, but in completely different ways.
                This guide explains each one clearly with examples, and tells you which to use when.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-3">By <span className="text-gray-600 dark:text-gray-400">Rajat</span> · Updated 2024</p>
            </div>
          </div>

          {/* Quick answer */}
          <div className="glass-panel p-5 border border-[rgba(27,58,92,0.25)]">
            <h2 className="text-foreground font-bold mb-3">The One-Line Answer</h2>
            <div className="space-y-2 text-sm">
              {[
                { metric: 'Absolute Return', when: 'Quick total gain % — no time context', color: 'text-[#059669]' },
                { metric: 'CAGR',            when: 'Annualised return for lumpsum investments', color: 'text-[var(--color-accent)]' },
                { metric: 'XIRR',            when: 'Annualised return for SIP / multiple cash flows', color: 'text-[#C4993C]' },
              ].map(({ metric, when, color }) => (
                <div key={metric} className="flex items-start gap-2">
                  <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${color}`} />
                  <span className="text-gray-500 dark:text-gray-400"><span className={`font-bold ${color}`}>{metric}:</span> {when}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep comparison cards */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-foreground">Deep Comparison</h2>
            {COMPARISON.map(({ metric, formula, useFor, bestFor, limitation, example, color, border }) => (
              <div key={metric} className={`glass-panel p-5 border ${border}`}>
                <h3 className={`text-lg font-bold mb-3 ${color}`}>{metric}</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-[rgba(0,0,0,0.3)] rounded-lg px-3 py-2 font-mono text-xs text-gray-600 dark:text-gray-400">{formula}</div>
                  {[
                    { label: 'Use for',    val: useFor },
                    { label: 'Best for',   val: bestFor },
                    { label: 'Limitation', val: limitation },
                    { label: 'Example',    val: example },
                  ].map(({ label, val }) => (
                    <div key={label} className="flex gap-2">
                      <span className="text-gray-600 dark:text-gray-400 w-20 flex-shrink-0 text-xs pt-0.5">{label}:</span>
                      <span className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Which does Groww/Zerodha use? */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Which Metric Do Groww and Zerodha Use?</h2>
            <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              <p>
                When you view your SIP portfolio on <strong className="text-foreground">Groww</strong> or <strong className="text-foreground">Zerodha Coin</strong>,
                the return percentage shown is <strong className="text-[#C4993C]">XIRR</strong> — not CAGR, not absolute return.
                This is the correct metric for SIP because it accounts for the fact that each monthly instalment
                was invested at a different time.
              </p>
              <p>
                When you look at a mutual fund's <strong className="text-foreground">historical performance</strong> (e.g., "Axis Bluechip Fund 5-year returns"),
                that number is <strong className="text-[var(--color-accent)]">CAGR</strong> — assuming a single lumpsum investment at the start.
              </p>
              <div className="bg-[rgba(27,58,92,0.08)] border border-[rgba(27,58,92,0.2)] rounded-xl p-4">
                <p className="text-foreground font-semibold mb-1">⚠️ Common Mistake</p>
                <p>Many investors compare their SIP&apos;s XIRR (e.g., 11%) to a fund&apos;s historical CAGR (e.g., 15%)
                and think they are underperforming. But these metrics are calculated differently. This comparison is misleading.
                Use XIRR vs XIRR or CAGR vs CAGR for fair comparisons.</p>
              </div>
            </div>
          </div>

          {/* Why CAGR can't be used for SIP */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">Why Can&apos;t You Use CAGR for SIP Returns?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
              CAGR assumes a single investment at t=0 and a single withdrawal at t=n. But in a SIP,
              you invest ₹5,000 at month 1, ₹5,000 at month 2, ₹5,000 at month 3 — each at a different time.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
              The ₹5,000 invested in month 1 has been compounding for 5 years. The ₹5,000 in month 60
              has been compounding for just 1 month. CAGR cannot handle this — it was designed for a
              single cash flow. XIRR handles each cash flow's individual timing correctly.
            </p>
            <div className="text-xs text-gray-500 dark:text-gray-400 bg-[rgba(0,0,0,0.04)] border border-[#E8E4DF] rounded-lg p-3">
              <p className="text-gray-600 dark:text-gray-400 mb-1">Rule of thumb:</p>
              <p>Lumpsum investment → use CAGR</p>
              <p>SIP / multiple investments → use XIRR</p>
              <p>Quick eyeball check → use Absolute Return</p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="glass-panel p-5 border border-amber-400/20">
            <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400">
              <AlertTriangle className="w-4 h-4 text-[#059669] flex-shrink-0 mt-0.5" />
              <p>
                <strong className="text-[#059669]">Disclaimer:</strong> This article is for educational purposes only.
                Mutual fund investments are subject to market risks. Past returns are not indicative of future performance.
                <Link href="/disclaimer" className="text-[var(--color-accent)] hover:underline ml-1">Read our methodology →</Link>
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.05)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-2">Calculate CAGR of Any Investment</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Use our free CAGR Calculator — supports lumpsum and lumpsum+SIP combined mode.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/cagr-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                <TrendingUp className="w-4 h-4" /> CAGR Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
