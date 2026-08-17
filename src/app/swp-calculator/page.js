"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, HelpCircle, ChevronDown, ArrowRight, Calculator, Target, Coins, AlertCircle } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);


// ─── helpers ────────────────────────────────────────────────
const fmt = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

function toLabel(v) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return fmt(v);
}

// ─── JSON-LD ─────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'SWP Calculator — Systematic Withdrawal Plan Calculator Online Free',
      description: 'Free SWP calculator to plan your monthly withdrawals from mutual funds. Calculate total withdrawn, remaining corpus, and how long your investment will last.',
      url: 'https://stepupcalculator.com/swp-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      featureList: [
        'SWP withdrawal calculation',
        'Corpus longevity simulation',
        'Total withdrawn vs Remaining corpus chart',
        'Year-by-year balance tracking',
        'Free SWP mutual fund calculator India',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a Systematic Withdrawal Plan (SWP)?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An SWP allows you to withdraw a fixed amount of money regularly (usually monthly) from your mutual fund investments. It is the opposite of a SIP. It is commonly used by retirees to generate a steady pension-like income from their accumulated corpus.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does an SWP work?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you start an SWP, the mutual fund AMC sells a certain number of units from your accumulated corpus every month to generate the fixed withdrawal amount you requested. Meanwhile, your remaining units continue to grow at the market return rate.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is SWP better than Dividend payouts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, SWP is generally considered more tax-efficient and reliable than IDCW (Dividend) options. Dividends are taxed according to your income tax slab, and the amount/frequency is not guaranteed. SWP allows you to set the exact amount you need, and only the capital gains portion of the withdrawal is taxed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is a safe withdrawal rate for SWP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A common rule of thumb is the 4% to 6% annual withdrawal rate. For example, if you have a corpus of ₹1 Crore, withdrawing ₹4 Lakh to ₹6 Lakh per year (₹33k to ₹50k per month) is generally considered sustainable over long periods, assuming your corpus grows at 9-10% annually.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if my withdrawal is higher than the returns?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'If you withdraw more than what your corpus earns in returns, your principal amount will start depleting. Eventually, the entire corpus will reduce to zero. You can use our SWP Calculator to check exactly when your corpus will run out based on your expected rate of return.',
          },
        },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is a Systematic Withdrawal Plan (SWP)?',
    a: 'An SWP allows you to withdraw a fixed amount of money regularly (usually monthly) from your mutual fund investments. It is the opposite of a SIP. It is commonly used by retirees to generate a steady pension-like income from their accumulated corpus.',
  },
  {
    q: 'How does an SWP work?',
    a: 'When you start an SWP, the mutual fund AMC sells a certain number of units from your accumulated corpus every month to generate the fixed withdrawal amount you requested. Meanwhile, your remaining units continue to grow at the market return rate.',
  },
  {
    q: 'Is SWP better than Dividend payouts?',
    a: 'Yes, SWP is generally considered more tax-efficient and reliable than IDCW (Dividend) options. Dividends are taxed according to your income tax slab, and the amount/frequency is not guaranteed. SWP allows you to set the exact amount you need, and only the capital gains portion of the withdrawal is taxed.',
  },
  {
    q: 'What is a safe withdrawal rate for SWP?',
    a: 'A common rule of thumb is the 4% to 6% annual withdrawal rate. For example, if you have a corpus of ₹1 Crore, withdrawing ₹4 Lakh to ₹6 Lakh per year (₹33k to ₹50k per month) is generally considered sustainable over long periods, assuming your corpus grows at 9-10% annually.',
  },
  {
    q: 'What happens if my withdrawal is higher than the returns?',
    a: 'If you withdraw more than what your corpus earns in returns, your principal amount will start depleting. Eventually, the entire corpus will reduce to zero. You can use our SWP Calculator to check exactly when your corpus will run out based on your expected rate of return.',
  },
];

// ─── Main Page ───────────────────────────────────────────────
export default function SWPCalculatorPage() {
  const [corpus, setCorpus] = useState(5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);
  const [openFaq, setOpenFaq] = useState(null);
  const [chartTab, setChartTab] = useState('pie');

  const fmtINR = (v) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

  // Calculate
  const { totalWithdrawn, finalRemaining, totalReturns, yearlyData, depletedMonthTotal } = useMemo(() => {
    let balance = corpus;
    const mRate = rate / 100 / 12;
    let tWithdrawn = 0;
    let depMonth = null;
    const data = [];

    data.push({ year: 0, balance: balance });

    for (let y = 1; y <= years; y++) {
      for (let m = 1; m <= 12; m++) {
        if (balance > 0) {
          balance += balance * mRate;
          if (balance >= monthlyWithdrawal) {
            balance -= monthlyWithdrawal;
            tWithdrawn += monthlyWithdrawal;
          } else {
            tWithdrawn += balance;
            balance = 0;
            if (depMonth === null) {
              depMonth = (y - 1) * 12 + m;
            }
          }
        }
      }
      data.push({ year: y, balance: balance });
    }

    const tReturns = (tWithdrawn + balance) - corpus;

    return { totalWithdrawn: tWithdrawn, finalRemaining: balance, totalReturns: tReturns, yearlyData: data, depletedMonthTotal: depMonth };
  }, [corpus, monthlyWithdrawal, rate, years]);

  // ── Pie chart ──
  // Doughnut/Pie chart: Total Withdrawn (Navy #1B3A5C) vs Remaining Corpus (Gold #C4993C)
  const pieData = {
    labels: ['Total Withdrawn', 'Remaining Corpus'],
    datasets: [{
      data: [totalWithdrawn, finalRemaining],
      backgroundColor: ['#1B3A5C', '#C4993C'],
      borderColor: ['#FFFFFF', '#FFFFFF'],
      borderWidth: 4,
      hoverOffset: 4,
    }],
  };
  const pieOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${fmtINR(ctx.raw)}` } },
    },
  };

  // ── Line chart ──
  const lineData = {
    labels: yearlyData.map(d => `Yr ${d.year}`),
    datasets: [
      { label: 'Corpus Balance', data: yearlyData.map(d => d.balance), borderColor: '#1B3A5C', backgroundColor: 'transparent', tension: 0.4, pointRadius: 0, pointHitRadius: 10, fill: false },
    ],
  };
  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ₹${ctx.raw.toLocaleString('en-IN')}` } } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#e2e8f0', maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#e2e8f0', callback: (v) => `₹${(v/100000).toFixed(1)}L` } },
    },
  };

  let longevityMessage = '';
  if (depletedMonthTotal) {
    const dYears = Math.floor(depletedMonthTotal / 12);
    const dMonths = depletedMonthTotal % 12;
    longevityMessage = `Your corpus will last ${dYears} years ${dMonths} months`;
  } else {
    longevityMessage = `Your corpus survives the full duration with ${fmtINR(finalRemaining)} remaining`;
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'SWP Calculator' }]} />

          {/* Page heading */}
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              SWP Calculator — Systematic Withdrawal Plan
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Plan your monthly withdrawals from your mutual fund corpus. Calculate how much you can withdraw and how long your investment will last.
            </p>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

            {/* Inputs */}
            <div className="lg:col-span-5 glass-panel p-4 lg:p-5">
              <InputSlider label="Total Corpus" value={corpus} onChange={setCorpus} min={500000} max={1000000000} step={10000} prefix="₹" />
              <InputSlider label="Monthly Withdrawal" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} min={5000} max={1000000} step={1000} prefix="₹" />
              <InputSlider label="Expected Return Rate" value={rate} onChange={setRate} min={4} max={18} step={0.1} suffix="%" />
              <InputSlider label="Withdrawal Duration" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />

              {/* Labels */}
              <div className="mt-5 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                {[
                  { label: 'Corpus', val: toLabel(corpus) },
                  { label: 'Withdrawal', val: `${fmtINR(monthlyWithdrawal)}/mo` },
                  { label: 'Duration', val: `${years} years` },
                  { label: 'Return rate', val: `${rate}% p.a.` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between border-b border-[#E8E4DF] pb-1">
                    <span>{label}</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-7">
              <div className="glass-panel p-4 lg:p-5 flex flex-col h-full relative overflow-hidden">

                {/* Chart tab strip */}
                <div className="flex bg-[rgba(0,0,0,0.03)] p-1 rounded-lg mb-3 w-full max-w-[240px] mx-auto relative z-10">
                  {[{ key: 'pie', label: 'Pie Chart' }, { key: 'line', label: 'Line Chart' }].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setChartTab(key)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                        chartTab === key ? 'bg-[var(--color-accent)] text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-foreground'
                      }`}
                    >{label}</button>
                  ))}
                </div>

                {/* Chart area */}
                <div className="relative flex-1 min-h-[180px] flex justify-center items-center overflow-hidden relative z-10 mb-4">
                  {chartTab === 'pie' && (
                    <>
                      <Doughnut data={pieData} options={pieOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total Withdrawn</span>
                        <span className="text-lg md:text-xl font-bold text-foreground">{fmtINR(totalWithdrawn)}</span>
                        <span className="text-[10px] text-[#6B7280]">{toLabel(totalWithdrawn)}</span>
                      </div>
                    </>
                  )}
                  {chartTab === 'line' && (
                    <Line data={lineData} options={lineOptions} />
                  )}
                </div>

                {/* Breakdown cards */}
                <div className="grid grid-cols-3 gap-2 relative z-10">
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold font-medium">
                      <Coins className="w-3 h-3 mr-1" />Total Withdrawn
                    </div>
                    <div className="text-sm font-extrabold text-foreground">{fmtINR(totalWithdrawn)}</div>
                    <div className="text-[9px] text-[#6B7280] mt-0.5 tracking-wide">{toLabel(totalWithdrawn)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5" />Rem. Corpus</div>
                    <div className="text-sm font-extrabold text-[var(--color-accent)]">
                      {fmtINR(finalRemaining)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{toLabel(finalRemaining)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5" />Returns</div>
                    <div className={`text-sm font-extrabold ${totalReturns >= 0 ? 'text-[var(--color-returns)]' : 'text-[var(--color-loss)]'}`}>
                      {totalReturns >= 0 ? '+' : ''}{fmtINR(totalReturns)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{toLabel(totalReturns)}</div>
                  </div>

                  {/* Longevity Indicator */}
                  <div className="col-span-3 mt-1 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    {depletedMonthTotal ? (
                      <AlertCircle className="w-3.5 h-3.5 text-[var(--color-loss)] flex-shrink-0" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" />
                    )}
                    <span className={`text-[11px] font-medium ${depletedMonthTotal ? 'text-[var(--color-loss)]' : 'text-foreground'}`}>
                      {longevityMessage}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── How to Use ── */}
          <section id="how-to-use" aria-label="How to use this calculator" className="mt-8">
          <div className="flex items-center gap-3 mb-4">
          <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-xl">
          <svg className="w-5 h-5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          </div>
          <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="glass-panel p-6">
          <ol className="list-decimal ml-5 space-y-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
          <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
          <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
          <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
          </ol>
          </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" aria-label="SWP calculator frequently asked questions" className="mt-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-xl">
                <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-3">
              {FAQS.map(({ q, a }, i) => (
                <div key={i} className="glass-panel overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-4 text-left"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    id={`swp-faq-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-foreground font-medium text-sm pr-4">{q}</span>
                    <ChevronDown className={`w-4 h-4 text-[var(--color-accent)] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/10 pt-3">{a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Related Tools ── */}
          <section id="related-calculators" aria-label="Related free financial calculators" className="mt-8 mb-6">
            <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
              <h2 className="text-lg font-bold text-foreground mb-1 text-center">More Free Financial Calculators</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs text-center mb-4">All tools free, real-time, no sign-up.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { href: '/lumpsum-calculator', icon: <Calculator className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Lumpsum Calculator', desc: 'One-time investment returns' },
                  { href: '/', icon: <Calculator className="w-4 h-4 text-[var(--color-accent)]" />, label: 'SIP Calculator', desc: 'Monthly SIP returns' },
                  { href: '/cagr-calculator', icon: <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />, label: 'CAGR Calculator', desc: 'Compound annual growth rate' },
                ].map(({ href, icon, label, desc }) => (
                  <Link key={href} href={href} className="flex items-start gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl">
                    <div className="bg-[rgba(27,58,92,0.15)] p-2 rounded-lg flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">{label}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-[var(--color-accent)] ml-auto transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          </section>

        </div>
      </main>
    </>
  );
}
