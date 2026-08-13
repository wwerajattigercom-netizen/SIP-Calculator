"use client";
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp, ShieldAlert, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export default function SwpVsSipPage() {
  return (
    <main className="py-8 px-4 md:px-8 max-w-4xl mx-auto space-y-8">
      <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SWP vs SIP' }]} />
      
      <div className="glass-panel p-7 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-[#C4993C] font-semibold mb-3 block">Investment Strategy</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
            SWP vs SIP: What's the Difference & Who Should Use Each?
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            SIP and SWP are two sides of the same coin. One builds your wealth over time, and the other pays you a monthly salary when you retire. Here is everything you need to know.
          </p>
        </div>
      </div>

      <div className="glass-panel p-6 space-y-6">
        <h2 className="text-xl font-bold text-foreground">1. The Core Difference</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[rgba(5,150,105,0.05)] border border-[#059669]/20 p-4 rounded-xl">
            <h3 className="text-[#059669] font-bold flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-5 h-5" /> SIP (Systematic Investment Plan)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You invest a fixed amount <strong>into</strong> a mutual fund every month. 
              <br/><br/><strong>Goal:</strong> Wealth Accumulation (Retirement, Education).
            </p>
          </div>
          <div className="bg-[rgba(153,27,27,0.05)] border border-[#991B1B]/20 p-4 rounded-xl">
            <h3 className="text-[#991B1B] font-bold flex items-center gap-2 mb-2">
              <ArrowDownRight className="w-5 h-5" /> SWP (Systematic Withdrawal Plan)
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You withdraw a fixed amount <strong>from</strong> your mutual fund corpus every month.
              <br/><br/><strong>Goal:</strong> Income Generation (Pension, Regular Cash Flow).
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-foreground mt-8">2. Example Scenario: The Lifecycle of an Investor</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          Imagine Rahul, a 30-year-old software engineer in India.
        </p>
        <ul className="list-disc pl-5 space-y-3 text-sm text-gray-600 dark:text-gray-400 mt-4">
          <li><strong>Phase 1 (Age 30 to 55):</strong> Rahul starts a <strong>SIP</strong> of ₹20,000 per month. Over 25 years at 12% CAGR, he builds a massive corpus of ₹3.8 Crores.</li>
          <li><strong>Phase 2 (Age 55+):</strong> Rahul retires. He stops his SIP. He now starts an <strong>SWP</strong> on that ₹3.8 Crore corpus, withdrawing ₹1.5 Lakhs every month to pay for his living expenses.</li>
        </ul>

        <h2 className="text-xl font-bold text-foreground mt-8">3. Taxation: Why SWP Beats Fixed Deposits</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          When you receive interest from an FD, it is fully taxable according to your income slab (up to 30%). 
          <br/><br/>
          However, in an SWP from an equity mutual fund, you only pay Long Term Capital Gains (LTCG) tax on the <em>profit portion</em> of the withdrawal, and you get a ₹1.25 Lakh exemption every year. This makes SWP highly tax-efficient for retirees in India.
        </p>
      </div>

      <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
        <h2 className="text-lg font-bold text-foreground mb-4">Try the Calculators</h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
            SIP Calculator <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/swp-calculator" className="inline-flex items-center gap-2 bg-[#059669] hover:bg-[#047857] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
            SWP Calculator <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
