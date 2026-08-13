import Link from 'next/link';
import { Repeat, CheckCircle, ShieldAlert, AlertTriangle, Calculator } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: "SIP vs STP: How to Invest a Lump Sum Safely",
  description: "Got a large bonus or sold a property? Learn what a Systematic Transfer Plan (STP) is, how it differs from a SIP, and why it's the safest way to invest lump sum money.",
  alternates: {
    canonical: 'https://stepupcalculator.com/blog/sip-vs-stp',
  }
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: "SIP vs STP: How to Invest a Lump Sum Safely",
  description: "Got a large bonus or sold a property? Learn what a Systematic Transfer Plan (STP) is, how it differs from a SIP, and why it's the safest way to invest lump sum money.",
  author: { '@type': 'Person', name: 'Rajat' },
  publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com' },
  url: 'https://stepupcalculator.com/blog/sip-vs-stp',
};

export default function SipVsStpPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Guides', href: '/blog' }, { label: 'SIP vs STP' }]} />
          
          {/* Hero Section */}
          <div className="glass-panel p-8 relative overflow-hidden rounded-2xl border border-[rgba(27,58,92,0.15)] shadow-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#C4993C] font-bold mb-4 block">Lump Sum Strategy</span>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-4">
                <span className="text-[var(--color-accent)]">SIP</span> vs <span className="text-[#C4993C]">STP</span>: How to Invest a Massive Bonus Safely
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base md:text-lg leading-relaxed mb-6">
                You just received a ₹10 Lakh bonus, or sold a property. Should you dump it all into the stock market today? No. Enter the Systematic Transfer Plan (STP) — the professional investor's tool for risk-free market entry.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Written by Rajat</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Financial Tool Architect · 5 min read</p>
                </div>
              </div>
            </div>
          </div>

          {/* BLUF */}
          <div className="glass-panel p-6 border-l-4 border-l-[#C4993C] bg-[rgba(196,153,60,0.03)]">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#C4993C]" /> 
              The 10-Second Summary (What is an STP?)
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-2 flex-shrink-0" />
                <span><strong className="text-[var(--color-accent)]">SIP (Systematic Investment Plan):</strong> Moves money from your <strong>Bank Account</strong> to a Mutual Fund every month. Good if you have a regular monthly salary.</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C4993C] mt-2 flex-shrink-0" />
                <span><strong className="text-[#C4993C]">STP (Systematic Transfer Plan):</strong> Moves money from a <strong>Safe Mutual Fund</strong> (Debt) to a Risky Mutual Fund (Equity) every month. Good if you have a large lump sum.</span>
              </li>
            </ul>
          </div>

          {/* Why Question */}
          <div className="glass-panel p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Do I Need an STP? (The Market Timing Risk)</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Imagine you have ₹10 Lakhs. You decide to invest it all as a single lump sum into a Nifty 50 Index Fund on January 1st. 
              On January 5th, a global crisis occurs, and the market crashes by 20%. Your ₹10 Lakhs is instantly reduced to ₹8 Lakhs. You have fallen victim to <strong>Market Timing Risk</strong>.
            </p>
            
            <div className="bg-[rgba(153,27,27,0.05)] border-l-4 border-[#991B1B] p-5 rounded-r-xl mb-6">
              <h3 className="font-bold text-[#991B1B] dark:text-red-400 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> The Lump Sum Dilemma</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                If you wait for a crash, inflation eats your cash in the bank. If you invest immediately, you risk a short-term crash destroying your principal.
              </p>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 font-semibold mb-2">The STP Solution:</p>
            <ol className="list-decimal pl-5 space-y-3 text-gray-600 dark:text-gray-300">
              <li>You park the ₹10 Lakhs in a highly safe <strong>Liquid Fund or Debt Fund</strong> (which gives 6-7% returns and doesn't crash).</li>
              <li>You instruct the fund house to automatically transfer ₹1 Lakh from this safe fund into a risky <strong>Equity Fund</strong> on the 5th of every month.</li>
              <li>You spread your investment over 10 months, successfully averaging out the purchase price (just like a SIP) while earning interest on the uninvested cash!</li>
            </ol>
          </div>

          {/* How Question */}
          <div className="glass-panel p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">How to Set Up an STP (Step-by-Step)</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Choose a Fund House</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    <strong>Crucial Rule:</strong> An STP can only be done between two funds of the <em>same Asset Management Company (AMC)</em>. For example, you can transfer from HDFC Liquid Fund to HDFC Flexi Cap Fund, but NOT from HDFC to SBI.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Invest the Lump Sum</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    Deposit your entire large amount into the "Source Fund" (usually a Liquid, Ultra Short Duration, or Arbitrage fund). This ensures your money is safe and immediately starts earning a small return.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[rgba(27,58,92,0.1)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--color-accent)] font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Configure the Transfer</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
                    Log into your broker (Groww, Zerodha, Kuvera, etc.) or AMC website. Select your Source Fund, click "Start STP", select your Target Equity Fund, and choose a frequency (weekly or monthly) and amount. 
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Warning */}
          <div className="glass-panel p-5 border border-amber-400/20 bg-amber-50 dark:bg-amber-900/10">
            <div className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-700 dark:text-amber-500 block mb-1">Taxation Warning: Every Transfer is a "Sell" Event</strong>
                <p>When money moves from the Debt fund to the Equity fund in an STP, the tax department views it as you selling the Debt fund. You will have to pay Short-Term Capital Gains (STCG) tax on whatever tiny profit the Debt fund made during those few months.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="glass-panel p-8 text-center bg-gradient-to-b from-[rgba(27,58,92,0.05)] to-transparent">
            <h2 className="text-2xl font-bold text-foreground mb-3">Compare SIP vs Lump Sum Returns</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">Want to see the mathematical difference between putting it all in at once versus spreading it out? Run the numbers.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/blog/sip-vs-lumpsum" className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-md px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 active:scale-95">
                <Repeat className="w-5 h-5" /> SIP vs Lumpsum Simulator
              </Link>
              <Link href="/" className="inline-flex items-center justify-center gap-2 border-2 border-[var(--color-accent)]/20 text-[var(--color-accent)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white px-6 py-3 rounded-xl font-semibold transition-all">
                <Calculator className="w-5 h-5" /> Basic SIP Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
