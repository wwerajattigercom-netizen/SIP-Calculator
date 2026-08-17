"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AlertTriangle, TrendingUp, HelpCircle, ChevronDown, ArrowRight, BarChart3, Info, Landmark, ShieldCheck, Wallet } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, Tooltip, Legend,
  CategoryScale, LinearScale, Title, BarElement
} from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, Title, BarElement);

const fmtUSD = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

function toLabel(v) {
  if (v >= 1e7) return `$${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `$${(v / 1e5).toFixed(2)} L`;
  return fmtUSD(v);
}

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-lg bg-[var(--panel-bg)] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
      >
        <h3 className="font-semibold text-gray-800 pr-4">{q}</h3>
        <ChevronDown className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-4 pt-0 text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-t border-gray-100 mt-2">
          {a}
        </div>
      )}
    </div>
  );
};

export default function SipVsFdPpfRd() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  
  const [sipRate, setSipRate] = useState(12);
  const [ppfRate, setPpfRate] = useState(7.1);
  const [rdRate, setRdRate] = useState(7);

  const calculateFV = (P, ratePa, y) => {
    const r = ratePa / 12 / 100;
    const n = y * 12;
    if (r === 0) return P * n;
    return Math.round(P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r)));
  };

  const results = useMemo(() => {
    const totalInvested = monthly * 12 * years;
    const sipFv = calculateFV(monthly, sipRate, years);
    const ppfFv = calculateFV(monthly, ppfRate, years);
    const rdFv = calculateFV(monthly, rdRate, years);
    
    return {
      totalInvested,
      sipFv,
      ppfFv,
      rdFv,
      sipGains: sipFv - totalInvested,
      ppfGains: ppfFv - totalInvested,
      rdGains: rdFv - totalInvested,
    };
  }, [monthly, years, sipRate, ppfRate, rdRate]);

  const chartData = {
    labels: ['Total Invested', 'Bank HYSA', '401(k)', 'Equity DCA'],
    datasets: [
      {
        label: 'Corpus Value ($)',
        data: [results.totalInvested, results.rdFv, results.ppfFv, results.sipFv],
        backgroundColor: [
          '#9CA3AF', // Gray for invested
          '#60A5FA', // Light blue for HYSA
          '#C4993C', // Gold for 401(k)
          '#1B3A5C', // Navy for DCA
        ],
        borderRadius: 6,
        borderWidth: 0,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(27,58,92,0.9)',
        padding: 12,
        titleFont: { size: 14, family: 'sans-serif' },
        bodyFont: { size: 14, weight: 'bold', family: 'sans-serif' },
        callbacks: {
          label: (ctx) => `Corpus: ${fmtUSD(ctx.raw)}`
        }
      }
    },
    scales: {
      y: {
        display: true,
        min: 0,
        suggestedMax: Math.max(results.sipFv, results.ppfFv, results.rdFv) * 1.15,
        ticks: {
          callback: function(value) { return toLabel(value); }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { weight: 'bold', size: 12 }, color: '#4B5563' }
      }
    },
    layout: {
      padding: { top: 20 }
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Which is better: DCA, 401(k), or CD/HYSA?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your financial goals. 401(k) offers tax-free guaranteed returns but has a 15-year lock-in. Bank CDs/HYSAs are highly liquid and safe but offer lower returns that are fully taxable. Equity SIPs offer the highest potential returns (beating inflation) but come with market risk and require a long-term horizon."
        }
      },
      {
        "@type": "Question",
        "name": "Can equity DCA beat 401(k) and CD?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Historically, over a period of 10 to 15 years, Equity Mutual Fund SIPs have significantly outperformed 401(k) and Bank CDs, delivering returns between 12% to 15% compared to the 7% guaranteed returns of traditional instruments."
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'DCA vs CD vs 401(k)' }]} />

          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              DCA vs CD vs 401(k) Comparison Tool
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Compare the wealth generated by Equity Mutual Fund Dollar Cost Averaging (DCA) against traditional safe investments like 401(k) and Bank High-Yield Savings Accounts (HYSAs). Many investors struggle to decide where to park their hard-earned money. Should you prioritize the absolute safety and guaranteed returns of a Bank HYSA or a 401(k)? Or should you take on some market risk with an Equity DCA strategy in pursuit of higher long-term growth? The answer largely depends on your time horizon and risk tolerance. While traditional safe investments provide peace of mind and protect your principal, they often fail to outpace inflation, meaning your purchasing power slowly erodes over time. On the other hand, an Equity DCA strategy allows you to harness the power of compound interest and market growth, potentially turning consistent monthly contributions into a multi-million dollar portfolio. By using this comparison tool, you can visualize the dramatic difference in final wealth corpus over periods of 10, 20, or even 30 years. Understanding these differences is the first step toward building a robust, inflation-beating financial plan that secures your future.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            
            {/* INPUT PANEL */}
            <div className="lg:col-span-5 glass-panel p-5 lg:p-6 relative">
              <InputSlider label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={150000} step={500} prefix="$" />
              <InputSlider label="Time Horizon" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />
              
              <div className="mt-8 mb-4 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-bold text-[var(--color-accent)] mb-4 uppercase tracking-wider flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" /> Expected Return Rates
                </h3>
                <InputSlider label="Equity DCA Rate" value={sipRate} onChange={setSipRate} min={5} max={25} step={0.1} suffix="%" />
                <InputSlider label="401(k) Rate" value={ppfRate} onChange={setPpfRate} min={5} max={10} step={0.1} suffix="%" />
                <InputSlider label="Bank HYSA / CD Rate" value={rdRate} onChange={setRdRate} min={3} max={10} step={0.1} suffix="%" />
              </div>
            </div>

            {/* CHART PANEL */}
            <div className="lg:col-span-7 glass-panel p-5 lg:p-6 flex flex-col h-[500px]">
              <div className="text-center mb-4">
                <h2 className="text-[var(--color-accent)] font-bold text-lg md:text-xl">Final Wealth Corpus Comparison</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Over {years} years of monthly investing</p>
              </div>
              
              <div className="flex-1 w-full min-h-0 relative">
                <Bar data={chartData} options={chartOptions} />
              </div>
              
              {/* Note about DCA outperformance */}
              <div className="mt-4 bg-[rgba(5,150,105,0.05)] border border-[#059669]/20 p-4 rounded-xl text-center">
                <p className="text-foreground text-sm">
                  By choosing <strong className="text-[var(--color-accent)]">Equity DCA</strong> over <strong className="text-[#C4993C]">401(k)</strong>, 
                  you generate an additional <strong className="text-[var(--color-returns)] text-base">{fmtUSD(results.sipFv - results.ppfFv)}</strong> in wealth over {years} years.
                </p>
              </div>
            </div>

          </div>

          {/* EDUCATIONAL SECTION */}
          <section className="mt-12 w-full max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-[var(--color-accent)]" />
              Detailed Comparison Guide
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="glass-panel p-6 border-t-4 border-[var(--color-accent)]">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[var(--color-accent)]" /> Equity DCA
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-800">Returns:</strong> Market-linked (High, 12-15%)</li>
                  <li>• <strong className="text-gray-800">Risk:</strong> High in short term, Low in long term</li>
                  <li>• <strong className="text-gray-800">Lock-in:</strong> None (unless ELSS which is 3 years)</li>
                  <li>• <strong className="text-gray-800">Taxation:</strong> 12.5% LTCG on gains above $1.25L</li>
                </ul>
              </div>
              
              <div className="glass-panel p-6 border-t-4 border-[#C4993C]">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-[#C4993C]" /> 401(k)
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-800">Returns:</strong> Fixed by Govt (Moderate, ~7.1%)</li>
                  <li>• <strong className="text-gray-800">Risk:</strong> Zero (Sovereign guarantee)</li>
                  <li>• <strong className="text-gray-800">Lock-in:</strong> 15 years</li>
                  <li>• <strong className="text-gray-800">Taxation:</strong> Completely Tax-Free (EEE)</li>
                </ul>
              </div>
              
              <div className="glass-panel p-6 border-t-4 border-[#60A5FA]">
                <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                  <Landmark className="w-5 h-5 text-[#60A5FA]" /> Bank HYSA
                </h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <li>• <strong className="text-gray-800">Returns:</strong> Fixed by Bank (Low, ~6-7%)</li>
                  <li>• <strong className="text-gray-800">Risk:</strong> Very Low</li>
                  <li>• <strong className="text-gray-800">Lock-in:</strong> Flexible (1-10 years)</li>
                  <li>• <strong className="text-gray-800">Taxation:</strong> Fully taxable at income slab rate</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[var(--color-accent)]" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 mb-10">
              {jsonLd.mainEntity.map((faq, i) => (
                <FAQItem key={i} q={faq.name} a={faq.acceptedAnswer.text} />
              ))}
            </div>
            
          </section>
        </div>
      </main>
    </>
  );
}
