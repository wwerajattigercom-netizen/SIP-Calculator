"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, HelpCircle, Home, TrendingUp } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';

function fmt(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)} K`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much SIP do I need to save for a house down payment?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on your target property price and timeline. If you want a ₹80L house in 7 years, factoring in 7% property appreciation, you\'ll need roughly ₹17,000 to ₹20,000 SIP per month for a 20% down payment.' } },
    { '@type': 'Question', name: 'How much down payment is required for a home loan in India?', acceptedAnswer: { '@type': 'Answer', text: 'Banks typically require a minimum of 10% to 20% down payment depending on the loan amount. For loans above ₹75 Lakhs, at least 25% is often mandated by RBI guidelines.' } },
    { '@type': 'Question', name: 'Should I rent or buy a house in India?', acceptedAnswer: { '@type': 'Answer', text: 'Renting is better for flexibility and when rental yields are low (2-3%). Buying makes sense if you plan to settle in one city for 10+ years and value emotional security.' } },
    { '@type': 'Question', name: 'Can I use SIP returns as a down payment?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, investing in equity mutual funds via SIP is the most effective way to outpace property price appreciation over a 5 to 10-year horizon to accumulate a down payment.' } },
    { '@type': 'Question', name: 'How long should I invest in SIP before buying a house?', acceptedAnswer: { '@type': 'Answer', text: 'Ideally 5 to 7 years. This gives your equity investments enough time to grow and compound, reducing the risk of short-term market volatility.' } },
  ],
};

function getStepUpFvFactor(years, monthlyRate, stepUpRate) {
  let fvFactor = 0;
  for (let y = 1; y <= years; y++) {
    const monthlyContribution = Math.pow(1 + stepUpRate, y - 1);
    const yearFv = monthlyContribution * ((Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate) * (1 + monthlyRate);
    fvFactor += yearFv * Math.pow(1 + monthlyRate, (years - y) * 12);
  }
  return fvFactor;
}

export default function SipForHousePage() {
  const [currentPrice, setCurrentPrice] = useState(8000000);
  const [appreciation, setAppreciation] = useState(7);
  const [yearsToBuy, setYearsToBuy] = useState(7);
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [returnRate, setReturnRate] = useState(12);

  const results = useMemo(() => {
    const months = yearsToBuy * 12;
    const monthlyRate = returnRate / 100 / 12;

    const futurePrice = currentPrice * Math.pow(1 + appreciation / 100, yearsToBuy);
    const requiredDownPayment = futurePrice * (downPaymentPct / 100);

    const fvFactorRegular = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const requiredSip = requiredDownPayment / fvFactorRegular;
    
    const totalInvested = requiredSip * months;
    const gainsFromSip = requiredDownPayment - totalInvested;

    const remainingLoan = futurePrice - requiredDownPayment;
    
    // EMI Calculation (8.5% for 20 years)
    const rEmi = 8.5 / 100 / 12;
    const nEmi = 20 * 12;
    const emi = remainingLoan * rEmi * Math.pow(1 + rEmi, nEmi) / (Math.pow(1 + rEmi, nEmi) - 1);

    const fvFactorStepUp = getStepUpFvFactor(yearsToBuy, monthlyRate, 0.10);
    const initialStepUpSip = requiredDownPayment / fvFactorStepUp;

    return {
      futurePrice,
      requiredDownPayment,
      requiredSip,
      totalInvested,
      gainsFromSip,
      remainingLoan,
      emi,
      initialStepUpSip
    };
  }, [currentPrice, appreciation, yearsToBuy, downPaymentPct, returnRate]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">

          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SIP for House Down Payment' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(59,130,246,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#3B82F6] font-semibold mb-3 block">Goal Planning · Real Estate</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
                <span className="text-gradient">SIP for House Down Payment</span>
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Property prices won't wait for you. Calculate exactly how much you need to invest monthly to comfortably afford the down payment of your dream home.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-white font-bold mb-4">Property & Loan Details</h3>
                <div className="space-y-5">
                  <InputSlider
                    label="Current Property Price"
                    value={currentPrice}
                    min={2000000}
                    max={50000000}
                    step={500000}
                    onChange={setCurrentPrice}
                    formatFn={(v) => fmt(v)}
                  />
                  <InputSlider
                    label="Property Appreciation (p.a.)"
                    value={appreciation}
                    min={4}
                    max={12}
                    step={0.5}
                    onChange={setAppreciation}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Years to Buy"
                    value={yearsToBuy}
                    min={3}
                    max={20}
                    step={1}
                    onChange={setYearsToBuy}
                    formatFn={(v) => `${v} Yr`}
                  />
                  <InputSlider
                    label="Down Payment %"
                    value={downPaymentPct}
                    min={10}
                    max={30}
                    step={5}
                    onChange={setDownPaymentPct}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Expected SIP Return"
                    value={returnRate}
                    min={8}
                    max={20}
                    step={0.1}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 space-y-4">
              <div className="glass-panel p-6 h-full flex flex-col justify-between">
                
                {/* Main Highlight */}
                <div className="text-center mb-6">
                  <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-2">Monthly SIP Required</p>
                  <div className="text-4xl md:text-5xl font-extrabold text-[#3B82F6] drop-shadow-md">
                    {fmt(results.requiredSip)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Future Prop. Price</p>
                    <p className="text-white font-bold text-lg">{fmt(results.futurePrice)}</p>
                  </div>
                  <div className="bg-[rgba(20,184,166,0.1)] border border-[#14B8A6]/30 rounded-xl p-4">
                    <p className="text-[#14B8A6] text-[10px] uppercase tracking-wider mb-1 font-semibold">Down Payment Needed</p>
                    <p className="text-[#14B8A6] font-bold text-lg">{fmt(results.requiredDownPayment)}</p>
                  </div>
                  <div className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-xl p-4">
                    <p className="text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total SIP Invested</p>
                    <p className="text-white font-bold text-lg">{fmt(results.totalInvested)}</p>
                  </div>
                  <div className="bg-[rgba(245,158,11,0.08)] border border-amber-500/20 rounded-xl p-4">
                    <p className="text-amber-400/80 text-[10px] uppercase tracking-wider mb-1">Approx EMI (20 Yrs)</p>
                    <p className="text-amber-400 font-bold text-lg">{fmt(results.emi)}</p>
                  </div>
                </div>

                {/* Property Timeline Visual */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Today's Price: {fmt(currentPrice)}</span>
                    <span>In {yearsToBuy} Years</span>
                  </div>
                  <div className="h-3 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden relative border border-white/5">
                     <div 
                        className="absolute top-0 left-0 h-full bg-[#3B82F6]/50 rounded-full" 
                        style={{ width: `${(currentPrice / results.futurePrice) * 100}%` }}
                     ></div>
                     <div 
                        className="absolute top-0 right-0 h-full bg-[#14B8A6]/80 rounded-r-full" 
                        style={{ width: `${((results.futurePrice - currentPrice) / results.futurePrice) * 100}%` }}
                     ></div>
                  </div>
                  <p className="text-center text-[10px] text-gray-500 mt-2">Teal indicates property price appreciation over time</p>
                </div>

                {/* Step-up Alternative */}
                <div className="bg-[rgba(59,130,246,0.05)] border border-[#3B82F6]/20 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-white text-sm font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#3B82F6]" /> 10% Step-Up SIP</h4>
                    <p className="text-gray-400 text-xs mt-1">Increase SIP yearly as salary grows.</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#60A5FA]">{fmt(results.initialStepUpSip)}</p>
                    <p className="text-[9px] text-gray-500 uppercase tracking-widest">Starting Month</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Reference Table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-4">Down Payment SIP for Top Cities</h2>
            <p className="text-sm text-gray-400 mb-4">Assumes 7 years to buy, 20% down payment, 12% SIP return.</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3 pr-4 text-gray-400 font-semibold">City</th>
                    <th className="py-3 pr-4 text-gray-400 font-semibold">Avg 2BHK Price</th>
                    <th className="py-3 pr-4 text-[#14B8A6] font-semibold">Down Pmt (20%)</th>
                    <th className="py-3 text-[#3B82F6] font-semibold">SIP Needed / mo</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">Mumbai</td>
                    <td className="py-3 pr-4">₹1.5 Cr</td>
                    <td className="py-3 pr-4">₹30 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹24,800</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">Delhi NCR</td>
                    <td className="py-3 pr-4">₹1.2 Cr</td>
                    <td className="py-3 pr-4">₹24 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹19,900</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">Bangalore</td>
                    <td className="py-3 pr-4">₹90 Lakhs</td>
                    <td className="py-3 pr-4">₹18 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹14,900</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">Hyderabad</td>
                    <td className="py-3 pr-4">₹75 Lakhs</td>
                    <td className="py-3 pr-4">₹15 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹12,400</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-3 pr-4 font-medium text-white">Pune</td>
                    <td className="py-3 pr-4">₹70 Lakhs</td>
                    <td className="py-3 pr-4">₹14 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹11,600</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-white">Chennai</td>
                    <td className="py-3 pr-4">₹65 Lakhs</td>
                    <td className="py-3 pr-4">₹13 Lakhs</td>
                    <td className="py-3 font-semibold text-[#60A5FA]">₹10,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">1. Why 20% Down Payment Matters</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Paying a 20% down payment reduces your total loan burden, secures better interest rates from banks, and ensures lower monthly EMIs. 
                Many banks also have a strict LTV (Loan-to-Value) ratio cap of 80% for larger loan amounts, making 20% the sweet spot.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">2. SIP vs RD for Down Payment</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                If your time horizon is less than 3 years, a Bank Recurring Deposit (RD) or Liquid Fund is safer. However, if you plan to buy after 5-7 years, 
                an Equity SIP (10-12% expected return) will help you combat the 5-8% annual property price appreciation much better than a 6% RD.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">3. How Much Home Loan Can You Get?</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                A common rule of thumb is that your Home Loan EMI should not exceed 40% of your net monthly take-home salary. 
                If you earn ₹1 Lakh per month, your EMI shouldn't cross ₹40,000 to maintain financial stability.
              </p>
            </div>
          </div>

          {/* FAQs */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-white/5 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-white font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(59,130,246,0.1)] to-[rgba(139,92,246,0.08)]">
            <h2 className="text-lg font-bold text-white mb-4">More Helpful Calculators</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Main SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lumpsum-calculator" className="inline-flex items-center gap-2 border border-[#3B82F6]/40 text-[#60A5FA] hover:border-[#3B82F6] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Lumpsum Calculator
              </Link>
            </div>
          </div>

        </article>
      </main>
    </>
  );
}
