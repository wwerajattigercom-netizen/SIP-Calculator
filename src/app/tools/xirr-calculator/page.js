"use client";

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Calculator, Info, ArrowRight, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// XIRR Calculation logic
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is XIRR?', acceptedAnswer: { '@type': 'Answer', text: 'XIRR stands for Extended Internal Rate of Return. It is a metric used to calculate the annualized return of an investment when cash flows (deposits and withdrawals) occur at irregular intervals.' } },
    { '@type': 'Question', name: 'How is XIRR different from CAGR?', acceptedAnswer: { '@type': 'Answer', text: 'CAGR (Compound Annual Growth Rate) measures the return of a single lump-sum investment over a period of time. XIRR is used when you make multiple investments or withdrawals at different times (like a monthly SIP). XIRR accounts for the specific dates of every transaction.' } },
    { '@type': 'Question', name: 'Why are my investments entered as negative numbers?', acceptedAnswer: { '@type': 'Answer', text: 'In financial calculations like XIRR, cash flow direction matters. Money leaving your pocket (investments or deposits) is considered a negative cash flow. Money coming back to you (current valuation or withdrawals) is a positive cash flow.' } },
    { '@type': 'Question', name: 'What is a good XIRR?', acceptedAnswer: { '@type': 'Answer', text: 'A "good" XIRR depends on the asset class. Historically, a diversified Indian equity portfolio (like the NIFTY 50) has returned roughly 12-14% annualized over the long term. If your portfolio XIRR over 5-10 years is close to or beats that benchmark, you are doing very well.' } }
  ]
};

const xnpv = (rate, cashFlows) => {
  return cashFlows.reduce((acc, curr) => {
    const timeDiff = (curr.date - cashFlows[0].date) / (1000 * 3600 * 24 * 365);
    return acc + curr.amount / Math.pow(1 + rate, timeDiff);
  }, 0);
};

const xirr = (cashFlows, guess = 0.1) => {
  const maxIters = 100;
  const tolerance = 0.0000001;
  let rate = guess;

  for (let i = 0; i < maxIters; i++) {
    const val = xnpv(rate, cashFlows);
    if (Math.abs(val) < tolerance) return rate;

    const derRate = rate + 0.0001;
    const derVal = xnpv(derRate, cashFlows);
    const deriv = (derVal - val) / 0.0001;
    
    if (deriv === 0) break;
    
    rate = rate - val / deriv;
  }
  return rate; // Return approximate if didn't converge within tolerance
};

export default function XirrCalculatorPage() {
  const [cashFlows, setCashFlows] = useState([
    { id: Date.now(), date: new Date(new Date().setFullYear(new Date().getFullYear() - 1)).toISOString().split('T')[0], amount: -100000 },
    { id: Date.now() + 1, date: new Date().toISOString().split('T')[0], amount: 115000 }
  ]);

  const addCashFlow = () => {
    setCashFlows([...cashFlows, { id: Date.now(), date: new Date().toISOString().split('T')[0], amount: 0 }]);
  };

  const removeCashFlow = (id) => {
    if (cashFlows.length > 2) {
      setCashFlows(cashFlows.filter(cf => cf.id !== id));
    }
  };

  const updateCashFlow = (id, field, value) => {
    setCashFlows(cashFlows.map(cf => {
      if (cf.id === id) {
        return { ...cf, [field]: value };
      }
      return cf;
    }));
  };

  const result = useMemo(() => {
    try {
      // Validate cash flows
      const parsedFlows = cashFlows.map(cf => ({
        date: new Date(cf.date),
        amount: parseFloat(cf.amount)
      })).filter(cf => !isNaN(cf.amount) && !isNaN(cf.date.getTime()));

      if (parsedFlows.length < 2) return null;

      // Sort by date
      parsedFlows.sort((a, b) => a.date - b.date);

      // Need at least one positive and one negative cash flow
      const hasPositive = parsedFlows.some(cf => cf.amount > 0);
      const hasNegative = parsedFlows.some(cf => cf.amount < 0);

      if (!hasPositive || !hasNegative) return null;

      const rate = xirr(parsedFlows);
      
      const totalInvested = parsedFlows.filter(cf => cf.amount < 0).reduce((acc, curr) => acc + Math.abs(curr.amount), 0);
      const currentValuation = parsedFlows.filter(cf => cf.amount > 0).reduce((acc, curr) => acc + curr.amount, 0);
      const netGain = currentValuation - totalInvested;

      return {
        xirr: (rate * 100).toFixed(2),
        totalInvested,
        currentValuation,
        netGain
      };
    } catch (e) {
      return null;
    }
  }, [cashFlows]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] text-center mb-8">Mutual Fund XIRR Calculator</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel p-6 rounded-2xl bg-[var(--background)] shadow-lg border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[var(--foreground)] flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[var(--color-accent)]" />
                  Cash Flows
                </h2>
                <button 
                  onClick={addCashFlow}
                  className="flex items-center gap-2 text-sm bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] px-4 py-2 rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-[#6B7280] px-2">
                  <div className="col-span-5 md:col-span-4">Date</div>
                  <div className="col-span-5 md:col-span-6">Amount (₹)</div>
                  <div className="col-span-2 text-center">Action</div>
                </div>

                {cashFlows.map((cf, index) => (
                  <div key={cf.id} className="grid grid-cols-12 gap-4 items-center bg-[var(--background)] p-3 rounded-xl">
                    <div className="col-span-5 md:col-span-4">
                      <input 
                        type="date" 
                        value={cf.date}
                        onChange={(e) => updateCashFlow(cf.id, 'date', e.target.value)}
                        className="w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20"
                      />
                    </div>
                    <div className="col-span-5 md:col-span-6">
                      <input 
                        type="number" 
                        value={cf.amount}
                        onChange={(e) => updateCashFlow(cf.id, 'amount', e.target.value)}
                        placeholder="e.g. -10000 for investment"
                        className={`w-full bg-[var(--panel-bg)] border border-[var(--panel-border)] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1B3A5C]/20 ${parseFloat(cf.amount) < 0 ? 'text-[var(--color-loss)]' : 'text-[var(--color-returns)]'}`}
                      />
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <button 
                        onClick={() => removeCashFlow(cf.id)}
                        disabled={cashFlows.length <= 2}
                        className="p-2 text-gray-400 hover:text-[var(--color-loss)] hover:bg-[#991B1B]/10 rounded-lg transition-colors disabled:opacity-50"
                        title="Remove row"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-[var(--color-accent)]/5 p-4 rounded-xl flex items-start gap-3">
                <Info className="w-5 h-5 text-[var(--color-accent)] shrink-0 mt-0.5" />
                <p className="text-sm text-[#6B7280]">
                  <strong>Tip:</strong> Enter investments as <span className="text-[var(--color-loss)] font-medium">negative</span> numbers (e.g. -10,000) and withdrawals or current valuation as <span className="text-[var(--color-returns)] font-medium">positive</span> numbers (e.g. 15,000).
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel p-6 rounded-2xl bg-[var(--background)] shadow-lg border border-white/20 sticky top-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-6">Investment Summary</h2>
              
              {result ? (
                <div className="space-y-6">
                  <div className="text-center p-6 bg-[var(--background)] rounded-xl border border-[var(--panel-border)]">
                    <p className="text-[#6B7280] text-sm font-medium mb-1">Annualized Return (XIRR)</p>
                    <p className={`text-4xl font-bold ${parseFloat(result.xirr) >= 0 ? 'text-[var(--color-returns)]' : 'text-[var(--color-loss)]'}`}>
                      {result.xirr}%
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--panel-border)]">
                      <span className="text-[#6B7280]">Total Invested</span>
                      <span className="font-bold text-[var(--color-accent)]">{formatCurrency(result.totalInvested)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pb-4 border-b border-[var(--panel-border)]">
                      <span className="text-[#6B7280]">Current Value</span>
                      <span className="font-bold text-[var(--foreground)]">{formatCurrency(result.currentValuation)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-[#6B7280]">Total Returns</span>
                      <span className={`font-bold ${result.netGain >= 0 ? 'text-[var(--color-returns)]' : 'text-[var(--color-loss)]'}`}>
                        {result.netGain > 0 ? '+' : ''}{formatCurrency(result.netGain)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center p-8 bg-[var(--background)] rounded-xl border border-[var(--panel-border)] flex flex-col items-center justify-center min-h-[200px]">
                  <p className="text-[#6B7280]">
                    Enter at least one investment (negative) and one return (positive) amount to calculate XIRR.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO Educational Content Section */}
      <div className="mt-16 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Understanding XIRR in Investing</h2>
          
          <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                  When you invest in mutual funds, you rarely just drop a lump sum into an account and never touch it again. Most people invest a little bit from every paycheck via SIPs, make occasional bonus deposits, and sometimes withdraw money for large purchases. Because these cash flows happen at <strong>irregular intervals</strong>, standard return metrics like absolute return or CAGR are wildly inaccurate.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">Why XIRR is the Gold Standard</h3>
              <p>
                  <strong>Extended Internal Rate of Return (XIRR)</strong> is the most accurate way to measure the performance of a real-world portfolio. It assigns a specific "weight" to each rupee based on exactly how long that rupee has been invested in the market.
              </p>
              <p>
                  For example, if you invested ₹1,00,000 ten years ago, and ₹1,00,000 yesterday, your total investment is ₹2,00,000. If your portfolio is worth ₹3,00,000 today, an absolute return calculation would say you made 50%. But that ignores the fact that half of your money has only been in the market for one day! XIRR solves this by acting like a personalized, time-weighted CAGR.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">How to use this Calculator</h3>
              <ol className="list-decimal ml-6 space-y-2 mt-2">
                  <li>Enter all your deposits as <strong>Negative amounts</strong> (money leaving your bank account).</li>
                  <li>Enter any withdrawals you made as <strong>Positive amounts</strong>.</li>
                  <li>Add a final row with today&apos;s date and the <strong>current total value</strong> of your portfolio as a Positive amount.</li>
              </ol>
          </div>
      </div>

      {/* How to Use Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use This Calculator</h2>
      <div className="space-y-4 text-[#6B7280] leading-relaxed">
      <ol className="list-decimal ml-5 space-y-3">
      <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
      <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
      <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
      </ol>
      </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                  <div key={i} className="border-b border-[var(--color-accent)]/10 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-[var(--foreground)] font-medium text-base flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                      </h3>
                      <p className="text-[#6B7280] text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Cross Links */}
      <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] max-w-4xl mx-auto rounded-3xl border border-[var(--color-accent)]/10">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
              <Link href="/blog/cagr-vs-xirr-vs-absolute-return" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                  CAGR vs XIRR Guide <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cagr-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                  CAGR Calculator
              </Link>
          </div>
      </div>

    </div>
  );
}
