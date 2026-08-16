"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, HelpCircle, ShieldAlert, CheckCircle2, XCircle, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, TrendingDown, HelpCircle, ShieldAlert, CheckCircle2, XCircle, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function formatToShortWords(val) {
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)} M`;
  if (val >= 1000) return `$${(val / 1000).toFixed(2)} K`;
  return `$${Math.round(val).toLocaleString('en-US')}`;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is real return on DCA after inflation?', acceptedAnswer: { '@type': 'Answer', text: 'Real return is the actual growth of your purchasing power. If your DCA gives 12% return and inflation is 6%, your real return is roughly 5.66%.' } },
    { '@type': 'Question', name: 'Does DCA beat inflation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, index fund DCA historically provides 10-15% returns, comfortably beating the US\'s historical inflation rate of 2-4%.' } },
    { '@type': 'Question', name: 'What return rate beats 6% inflation?', acceptedAnswer: { '@type': 'Answer', text: 'Any return rate above 6% beats inflation, but to grow your wealth meaningfully, you should aim for returns of at least 10-12%.' } },
    { '@type': 'Question', name: 'How does inflation reduce my DCA returns?', acceptedAnswer: { '@type': 'Answer', text: 'Inflation doesn\'t reduce the numerical amount of your corpus, but it reduces what you can buy with it in the future.' } },
    { '@type': 'Question', name: 'Should I account for inflation in DCA planning?', acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. If you need $1 Million in 20 years, inflation means $1 Million then will only buy what $30,000-$40,000 buys today. Always target an inflation-adjusted corpus.' } }
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

    // Real Future Value (deflated by inflation)
    const realFV = nominalFV / Math.pow(1 + inflationRate / 100, duration);

    // Total Invested
    const totalInvested = sipAmount * months;

    // Real Return Rate (Fisher equation: (1+R)/(1+I) - 1)
    const realReturnRate = (((1 + returnRate / 100) / (1 + inflationRate / 100)) - 1) * 100;
    const isBeating = returnRate > inflationRate;
    const margin = returnRate - inflationRate; // simple margin for display

    return {
      nominalFV,
      realFV,
      totalInvested,
      powerLost: nominalFV - realFV,
      nominalGains: nominalFV - totalInvested,
      realGains: realFV - totalInvested,
      realReturnRate,
      isBeating,
      margin,
    };
  }, [sipAmount, duration, returnRate, inflationRate]);

  const doughnutOptions = {
    cutout: '75%',
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#1F2937' } },
    borderWidth: 0,
  };

  const nominalChartData = {
    labels: ['Total Invested', 'Nominal Gains'],
    datasets: [{ data: [results.totalInvested, results.nominalGains], backgroundColor: ['#1B3A5C', '#C4993C'] }]
  };

  const realChartData = {
    labels: ['Total Invested', 'Real Gains', 'Inflation Loss'],
    datasets: [{
      data: [
        results.totalInvested,
        Math.max(0, results.realGains),
        results.powerLost,
      ],
      backgroundColor: ['#1B3A5C', '#C4993C', '#991B1B'],
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-4xl w-full mx-auto space-y-8">

          <CalculatorTabs />
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-foreground font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[#991B1B] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(153,27,27,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-4">Explore More Calculators</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[#112740] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Step-Up DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/cagr-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                CAGR Calculator
              </Link>
              <Link href="/us/blog/retirement-dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Retirement DCA Guide
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Disclaimer: All investments involve risk. Past performance does not guarantee future results. Consult a licensed financial advisor before making investment decisions.</p>
          </div>

        </article>
      </main>
    </>
  );
}
