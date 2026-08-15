import Link from 'next/link';
import { Layers, Target, TrendingUp, Zap, Infinity, ArrowRight, ShieldCheck } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "5 Types of SIPs Explained: Which One Should You Choose?",
  description: "Learn about the 5 different types of SIPs available in India: Regular, Step-Up, Flexi, Trigger, and Perpetual SIP. Find out which one matches your investment goals.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/types-of-sip',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "5 Types of SIPs Explained: Which One Should You Choose?",
  description: "Learn about the 5 different types of SIPs available in India: Regular, Step-Up, Flexi, Trigger, and Perpetual SIP. Find out which one matches your investment goals.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/types-of-sip',
};

export default function TypesOfSipPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'Types of SIPs' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#1B3A5C] font-bold mb-4 block">Foundational Guide</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                The 5 Types of SIPs: Which Strategy is Best for You?
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                Most beginners only know about the "Regular SIP" where a fixed amount is deducted every month. But modern mutual funds offer 4 advanced variations designed to beat inflation, capitalize on market crashes, and automate wealth building.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Financial Tool Architect · 6 min read</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            
            {/* 1. Regular SIP */}
            <div className="glass-panel p-6 border-l-4 border-l-[#6B7280]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#6B7280]" /> 1. Regular SIP (The Standard)
                </h2>
                <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full">Beginner Friendly</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This is the plain vanilla option. You invest a fixed amount (e.g., ₹5,000) on a fixed date every single month. It enforces discipline and leverages Rupee Cost Averaging across all market conditions.
              </p>
              <div className="bg-[rgba(107,114,128,0.05)] p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                <strong>Best For:</strong> People with a fixed monthly salary who just want to automate their savings and not worry about market timing.
              </div>
            </div>

            {/* 2. Step-Up SIP */}
            <div className="glass-panel p-6 border-l-4 border-l-[#059669]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#059669]" /> 2. Step-Up SIP (Top-Up SIP)
                </h2>
                <span className="text-xs font-bold px-3 py-1 bg-[rgba(5,150,105,0.1)] text-[#059669] rounded-full">Highly Recommended</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                This automates an annual increase in your investment. For example, you start with ₹10,000/month, and tell the AMC to increase it by 10% every year. By Year 2, it becomes ₹11,000.
              </p>
              <div className="bg-[rgba(5,150,105,0.05)] p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>Best For:</strong> Salaried professionals aiming to combat inflation and scale their investments alongside their yearly appraisals.
              </div>
              <Link href="/blog/step-up-sip" className="inline-flex items-center text-sm font-semibold text-[#059669] hover:underline">
                Read the full Step-Up Guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* 3. Flexi SIP */}
            <div className="glass-panel p-6 border-l-4 border-l-[#C4993C]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#C4993C]" /> 3. Flexi SIP
                </h2>
                <span className="text-xs font-bold px-3 py-1 bg-[rgba(196,153,60,0.1)] text-[#C4993C] rounded-full">Advanced</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                A Flexi SIP allows you to change the investment amount every month based on your cash flow. You can set a "minimum" amount to keep the SIP active during lean months, and invest a "maximum" amount during good months.
              </p>
              <div className="bg-[rgba(196,153,60,0.05)] p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>Best For:</strong> Freelancers, business owners, and gig workers who have highly variable monthly incomes.
              </div>
              <Link href="/blog/flexi-sip" className="inline-flex items-center text-sm font-semibold text-[#C4993C] hover:underline">
                Read the full Flexi SIP Guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* 4. Trigger SIP */}
            <div className="glass-panel p-6 border-l-4 border-l-[#991B1B]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Zap className="w-5 h-5 text-[#991B1B]" /> 4. Trigger SIP
                </h2>
                <span className="text-xs font-bold px-3 py-1 bg-[rgba(153,27,27,0.1)] text-[#991B1B] rounded-full">Tactical</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                A Trigger SIP does not invest on a fixed date. Instead, it triggers an investment <em>only when a specific market condition is met</em>. For example: "Buy ₹5,000 worth of Nifty 50 only when the index drops by 2% in a single day."
              </p>
              <div className="bg-[rgba(153,27,27,0.05)] p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300 mb-4">
                <strong>Best For:</strong> Experienced investors who want to automatically "buy the dip" and capitalize on market crashes.
              </div>
              <Link href="/blog/trigger-sip" className="inline-flex items-center text-sm font-semibold text-[#991B1B] hover:underline">
                Read the full Trigger SIP Guide <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* 5. Perpetual SIP */}
            <div className="glass-panel p-6 border-l-4 border-l-[#1B3A5C]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Infinity className="w-5 h-5 text-[#1B3A5C]" /> 5. Perpetual SIP
                </h2>
                <span className="text-xs font-bold px-3 py-1 bg-[rgba(27,58,92,0.1)] text-[#1B3A5C] rounded-full">Standardized</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-3">
                When you start an SIP, you can usually set an end date (e.g., 5 years). A Perpetual SIP is simply an SIP where you do not specify an end date. It continues deducting money indefinitely until you log into the platform and manually issue a "Stop SIP" command. (Note: Most SIPs today default to this option, usually mapping the end date to December 2099).
              </p>
              <div className="bg-[rgba(27,58,92,0.05)] p-4 rounded-lg text-sm text-gray-700 dark:text-gray-300">
                <strong>Best For:</strong> Long-term wealth creation where the investor doesn't want the hassle of renewing the mandate every few years.
              </div>
            </div>

          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Start Planning Today</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">No matter which type of SIP you choose, the math of compounding remains the same. Calculate your potential returns using our tool.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Target className="w-5 h-5" /> Open SIP Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
