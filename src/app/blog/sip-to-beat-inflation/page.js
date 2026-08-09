"use client";
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingDown, HelpCircle, ShieldAlert } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function formatToShortWords(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)} K`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is real return on SIP after inflation?', acceptedAnswer: { '@type': 'Answer', text: 'Real return is the actual growth of your purchasing power. If your SIP gives 12% return and inflation is 6%, your real return is roughly 5.66%.' } },
    { '@type': 'Question', name: 'Does SIP beat inflation in India?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, equity mutual fund SIPs historically provide 10-15% returns, comfortably beating India\'s historical inflation rate of 5-7%.' } },
    { '@type': 'Question', name: 'What return rate beats 6% inflation?', acceptedAnswer: { '@type': 'Answer', text: 'Any return rate above 6% beats inflation, but to grow your wealth meaningfully, you should aim for returns of at least 10-12%.' } },
    { '@type': 'Question', name: 'How does inflation reduce my SIP returns?', acceptedAnswer: { '@type': 'Answer', text: 'Inflation doesn\'t reduce the numerical amount of your corpus, but it reduces what you can buy with it in the future.' } },
    { '@type': 'Question', name: 'Should I account for inflation in SIP planning?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. If you need ₹1 Crore in 20 years, inflation means ₹1 Crore then will only buy what ₹30-40 Lakhs buys today. Always target an inflation-adjusted corpus.' } }
  ]
};

export default function SipBeatInflationPage() {
  const [sipAmount, setSipAmount] = useState(10000);
  const [duration, setDuration] = useState(20);
  const [returnRate, setReturnRate] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const results = useMemo(() => {
    const months = duration * 12;
    const monthlyRate = returnRate / 100 / 12;
    
    // Nominal Future Value (Annuity-due)
    const nominalFV = sipAmount * (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)) * (1 + monthlyRate);
    
    // Real Future Value
    const realFV = nominalFV / Math.pow(1 + inflationRate / 100, duration);
    
    // Total Invested
    const totalInvested = sipAmount * months;
    
    // Real Return Rate (Formula: (1+R)/(1+I) - 1)
    const realReturnRate = (((1 + returnRate / 100) / (1 + inflationRate / 100)) - 1) * 100;
    
    return {
      nominalFV,
      realFV,
      totalInvested,
      powerLost: nominalFV - realFV,
      nominalGains: nominalFV - totalInvested,
      realGains: realFV - totalInvested,
      realReturnRate,
    };
  }, [sipAmount, duration, returnRate, inflationRate]);

  // Chart configs
  const doughnutOptions = {
    cutout: '75%',
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1F2937' } },
    borderWidth: 0,
  };

  const nominalChartData = {
    labels: ['Total Invested', 'Nominal Gains'],
    datasets: [{ data: [results.totalInvested, results.nominalGains], backgroundColor: ['#8b5cf6', '#a78bfa'] }]
  };

  const realChartData = {
    labels: ['Total Invested', 'Real Gains'],
    datasets: [{ data: [results.totalInvested, Math.max(0, results.realGains)], backgroundColor: ['#22C55E', '#86efac'] }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">
          
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'SIP to Beat Inflation' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(239,68,68,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[#EF4444] font-semibold mb-3 block">Guide · Real Returns</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white leading-tight mb-3">
                How to Use SIP to Beat <span className="text-gradient">Inflation</span>
              </h1>
              <p className="text-gray-400 text-sm leading-relaxed">
                Inflation is the silent wealth killer. A 12% return is actually only ~5.6% if inflation is 6%. 
                Use this calculator to uncover the <strong className="text-white">real purchasing power</strong> of your future wealth.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-white font-bold mb-4">Calculator Inputs</h3>
                <div className="space-y-5">
                  <InputSlider
                    label="Monthly SIP Amount"
                    value={sipAmount}
                    min={500}
                    max={500000}
                    step={500}
                    onChange={setSipAmount}
                    formatFn={(v) => `₹${v.toLocaleString('en-IN')}`}
                  />
                  <InputSlider
                    label="Duration (Years)"
                    value={duration}
                    min={1}
                    max={40}
                    step={1}
                    onChange={setDuration}
                    formatFn={(v) => `${v} Yr`}
                  />
                  <InputSlider
                    label="Expected Return Rate"
                    value={returnRate}
                    min={1}
                    max={30}
                    step={0.1}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Expected Inflation Rate"
                    value={inflationRate}
                    min={1}
                    max={15}
                    step={0.1}
                    onChange={setInflationRate}
                    formatFn={(v) => `${v}%`}
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-7 space-y-6">
              <div className="glass-panel p-6">
                
                {/* Badges */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 bg-[rgba(239,68,68,0.05)] border border-[#EF4444]/20 p-4 rounded-2xl text-center">
                    <p className="text-gray-400 text-xs mb-1">Real Return Rate</p>
                    <p className="text-[#EF4444] text-xl font-bold">{results.realReturnRate.toFixed(2)}%</p>
                  </div>
                  <div className="flex-1 bg-[rgba(34,197,94,0.05)] border border-[#22C55E]/20 p-4 rounded-2xl text-center">
                    <p className="text-gray-400 text-xs mb-1">To Beat Inflation</p>
                    <p className="text-[#22C55E] text-xl font-bold">&gt; {inflationRate}%</p>
                  </div>
                </div>

                {/* Callout */}
                <div className="bg-[rgba(255,255,255,0.03)] border border-white/5 rounded-xl p-4 mb-6 text-center">
                  <p className="text-sm text-gray-300">
                    Your <strong className="text-white">{formatToShortWords(results.nominalFV)}</strong> corpus in {duration} years will only have the purchasing power of <strong className="text-[#EF4444]">{formatToShortWords(results.realFV)}</strong> in today's money.
                  </p>
                </div>

                {/* Charts */}
                <div className="flex justify-around items-center pt-2">
                  <div className="relative w-32 h-32 flex flex-col items-center">
                    <Doughnut data={nominalChartData} options={doughnutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-gray-400 text-[10px]">Nominal</span>
                      <span className="text-white font-bold text-sm">{formatToShortWords(results.nominalFV)}</span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block text-gray-500">
                    <TrendingDown className="w-6 h-6 mx-auto text-[#EF4444]" />
                    <span className="text-[10px] block mt-1 uppercase tracking-wider">Inflation</span>
                  </div>

                  <div className="relative w-32 h-32 flex flex-col items-center">
                    <Doughnut data={realChartData} options={doughnutOptions} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <span className="text-gray-400 text-[10px]">Real Value</span>
                      <span className="text-white font-bold text-sm">{formatToShortWords(results.realFV)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-around mt-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#8b5cf6]"></span> Invested: {formatToShortWords(results.totalInvested)}</div>
                  <div className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#EF4444]"></span> Power Lost: {formatToShortWords(results.powerLost)}</div>
                </div>

              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-3">What Is Real Return?</h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <strong>Nominal Return</strong> is the raw percentage your investment grows. <strong>Real Return</strong> is what remains after subtracting inflation. If a savings account gives you 4% return and inflation is 6%, your real return is actually negative. You are losing purchasing power over time.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Why 12% Return ≠ 12% Gain
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                A 12% return on equity mutual funds looks great on paper. But with an average inflation of 6%, the cost of living doubles roughly every 12 years. Thus, a significant chunk of your returns just goes towards maintaining your current standard of living, leaving you with a true wealth creation rate of ~5.6%.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-3">How to Choose a SIP to Beat Inflation</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                To truly build wealth, you need an asset class that consistently beats inflation. Historically, Equities (via Mutual Fund SIPs) have delivered 10-15% returns, beating inflation comfortably. Fixed Deposits or traditional insurance policies often struggle to beat inflation post-taxes.
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
                    <HelpCircle className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(239,68,68,0.1)] to-[rgba(139,92,246,0.08)]">
            <h2 className="text-lg font-bold text-white mb-4">Explore More Calculators</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Step-Up SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cagr-calculator" className="inline-flex items-center gap-2 border border-[#8b5cf6]/40 text-[#a78bfa] hover:border-[#8b5cf6] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                CAGR Calculator
              </Link>
              <Link href="/retirement-calculator" className="inline-flex items-center gap-2 border border-[#8b5cf6]/40 text-[#a78bfa] hover:border-[#8b5cf6] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Retirement Guide
              </Link>
            </div>
            <p className="text-xs text-gray-500 mt-6">Disclaimer: Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
          </div>

        </article>
      </main>
    </>
  );
}
