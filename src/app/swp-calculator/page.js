"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, HelpCircle, ChevronDown, ArrowRight, Calculator, Target, Coins, AlertCircle, Info, Layers } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const formatCurrency = (v) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);

function formatToShortWords(v) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return formatCurrency(v);
}

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
      '@type': 'HowTo',
      name: 'How to Calculate SWP Returns Online',
      description: 'Step-by-step guide to calculating Systematic Withdrawal Plan payouts and corpus longevity using the StepupCalculator SWP Calculator.',
      step: [
        { '@type': 'HowToStep', name: 'Enter Total Corpus', text: 'Enter the total accumulated corpus available for withdrawal. Range: ₹5 Lakh to ₹100 Crore.' },
        { '@type': 'HowToStep', name: 'Enter Monthly Withdrawal', text: 'Enter the fixed amount you want to withdraw every month.' },
        { '@type': 'HowToStep', name: 'Set Expected Return Rate', text: 'Enter the realistic annual return rate expected on the remaining corpus.' },
        { '@type': 'HowToStep', name: 'Set Duration', text: 'Enter the number of years you plan to withdraw for (1–40 years).' },
        { '@type': 'HowToStep', name: 'Analyze Longevity', text: 'Check the status message to see if your corpus lasts the entire duration or if it depletes early.' },
        { '@type': 'HowToStep', name: 'Review Year-by-Year Table', text: 'See exactly how the investment balance changes each year after withdrawals and returns.' },
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

const HOW_TO_STEPS = [
  { step: '1', title: 'Enter Total Corpus', desc: 'The accumulated amount you have available for withdrawals. Range: ₹5 Lakh to ₹100 Crore.' },
  { step: '2', title: 'Enter Monthly Withdrawal', desc: 'The fixed amount you wish to withdraw every month.' },
  { step: '3', title: 'Set Return Rate', desc: 'The annual percentage return you expect on the remaining corpus.' },
  { step: '4', title: 'Set Duration', desc: 'The number of years you want to withdraw for (1–40 years).' },
  { step: '5', title: 'Check Longevity', desc: 'The calculator instantly shows if your corpus lasts the full duration or depletes early.' },
  { step: '6', title: 'Review Year-by-Year Table', desc: 'See your end-of-year balance, yearly withdrawals, and returns earned.' },
];

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

export default function SWPCalculatorPage() {
  const [corpus, setCorpus] = useState(5000000);
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(30000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(20);
  const [openFaq, setOpenFaq] = useState(null);
  const [chartTab, setChartTab] = useState('pie');

  // Calculate
  const { totalWithdrawn, finalRemaining, totalReturns, yearlyData, depletedMonthTotal } = useMemo(() => {
    let balance = corpus;
    const mRate = rate / 100 / 12;
    let tWithdrawn = 0;
    let depMonth = null;
    const data = [];

    data.push({ year: 0, balance: balance, yearlyWithdrawn: 0, yearlyReturns: 0 });

    for (let y = 1; y <= years; y++) {
      let yearlyW = 0;
      let yearlyR = 0;
      for (let m = 1; m <= 12; m++) {
        if (balance > 0) {
          const mReturn = balance * mRate;
          yearlyR += mReturn;
          balance += mReturn;
          
          if (balance >= monthlyWithdrawal) {
            balance -= monthlyWithdrawal;
            yearlyW += monthlyWithdrawal;
            tWithdrawn += monthlyWithdrawal;
          } else {
            yearlyW += balance;
            tWithdrawn += balance;
            balance = 0;
            if (depMonth === null) {
              depMonth = (y - 1) * 12 + m;
            }
          }
        }
      }
      data.push({ year: y, balance: balance, yearlyWithdrawn: yearlyW, yearlyReturns: yearlyR });
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
      borderColor: ['transparent', 'transparent'],
      borderWidth: 4,
      hoverOffset: 0,
    }],
  };
  const pieOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${formatCurrency(ctx.raw)}` } },
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
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6B7280', maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6B7280', callback: (v) => `₹${(v/100000).toFixed(1)}L` } },
    },
  };

  let longevityMessage = '';
  if (depletedMonthTotal) {
    const dYears = Math.floor(depletedMonthTotal / 12);
    const dMonths = depletedMonthTotal % 12;
    longevityMessage = `Your corpus will last ${dYears} years ${dMonths} months`;
  } else {
    longevityMessage = `Your corpus survives the full duration with ${formatCurrency(finalRemaining)} remaining`;
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
            <div className="lg:col-span-5 glass-panel p-4 lg:p-5 relative">
              <InputSlider label="Total Corpus" value={corpus} onChange={setCorpus} min={500000} max={1000000000} step={10000} prefix="₹" />
              <InputSlider label="Monthly Withdrawal" value={monthlyWithdrawal} onChange={setMonthlyWithdrawal} min={5000} max={1000000} step={1000} prefix="₹" />
              <InputSlider label="Expected Return Rate" value={rate} onChange={setRate} min={4} max={18} step={0.1} suffix="%" />
              <InputSlider label="Withdrawal Duration" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yr" />

              {/* Labels */}
              <div className="mt-5 space-y-2 text-xs text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-4">
                {[
                  { label: 'Corpus', val: formatToShortWords(corpus) },
                  { label: 'Withdrawal', val: `${formatCurrency(monthlyWithdrawal)}/mo` },
                  { label: 'Duration', val: `${years} years` },
                  { label: 'Return rate', val: `${rate}% p.a.` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between pb-1">
                    <span>{label}</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {/* Internal backlinks */}
              <div className="mt-4 pt-1 space-y-2">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">Also try:</p>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#1B3A5C] text-xs hover:text-foreground transition-colors group"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>SIP + Step-Up Calculator — grow wealth month by month</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/cagr-calculator"
                  className="flex items-center gap-2 text-[#1B3A5C] text-xs hover:text-foreground transition-colors group"
                >
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>CAGR Calculator — calculate effective growth rate</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-7 h-full lg:sticky lg:top-8">
              <div className="glass-panel p-4 lg:p-5 flex flex-col h-full relative overflow-hidden">

                {/* Chart tab strip */}
                <div className="flex bg-[rgba(0,0,0,0.03)] p-1 rounded-lg mb-3 w-full max-w-[240px] mx-auto relative z-10">
                  {[{ key: 'pie', label: 'Pie Chart' }, { key: 'line', label: 'Line Chart' }].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setChartTab(key)}
                      className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                        chartTab === key ? 'bg-[#1B3A5C] text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-foreground'
                      }`}
                    >{label}</button>
                  ))}
                </div>

                {/* Chart area */}
                <div className="relative flex-1 min-h-[220px] flex justify-center items-center overflow-hidden relative z-10 mb-4">
                  {chartTab === 'pie' && (
                    <>
                      <Doughnut data={pieData} options={pieOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total Withdrawn</span>
                        <span className="text-lg md:text-xl font-bold text-[#1F2937]">{formatCurrency(totalWithdrawn)}</span>
                        <span className="text-[10px] text-[#6B7280] dark:text-[#8B95A5]">{formatToShortWords(totalWithdrawn)}</span>
                      </div>
                    </>
                  )}
                  {chartTab === 'line' && (
                    <Line data={lineData} options={lineOptions} />
                  )}
                </div>

                {/* Breakdown cards */}
                <div className="grid grid-cols-3 gap-2 relative z-10 mt-auto">
                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold font-medium">
                      <div className="w-2 h-2 rounded-full bg-[#1B3A5C] mr-1.5" />Withdrawn
                    </div>
                    <div className="text-sm font-extrabold text-[#1B3A5C]">{formatCurrency(totalWithdrawn)}</div>
                    <div className="text-[9px] text-[#6B7280] dark:text-[#8B95A5] mt-0.5 tracking-wide">{formatToShortWords(totalWithdrawn)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5" />Rem. Corpus</div>
                    <div className="text-sm font-extrabold text-[#1F2937]">
                      {formatCurrency(finalRemaining)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(finalRemaining)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-transparent border border-[#059669] mr-1.5" />Returns</div>
                    <div className={`text-sm font-extrabold ${totalReturns >= 0 ? 'text-[#059669]' : 'text-[#991B1B]'}`}>
                      {totalReturns >= 0 ? '+' : ''}{formatCurrency(totalReturns)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{formatToShortWords(totalReturns)}</div>
                  </div>

                  {/* Longevity Indicator */}
                  <div className="col-span-3 mt-1 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 flex items-center gap-2">
                    {depletedMonthTotal ? (
                      <AlertCircle className="w-3.5 h-3.5 text-[#991B1B] flex-shrink-0" />
                    ) : (
                      <TrendingUp className="w-3.5 h-3.5 text-[#059669] flex-shrink-0" />
                    )}
                    <span className={`text-[11px] font-medium ${depletedMonthTotal ? 'text-[#991B1B]' : 'text-[#1F2937]'}`}>
                      {longevityMessage}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── BELOW THE FOLD ── */}
      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-10 mt-6">

        {/* ── YEAR-BY-YEAR TABLE ── */}
        <section id="yearly-table" aria-label="Year by year SWP tracking">
          <div className="glass-panel overflow-hidden">
            <div className="px-5 py-4 border-b border-black/5 dark:border-white/10">
              <h2 className="text-foreground font-bold text-base">Year-by-Year SWP Tracking</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
                Starting corpus {formatCurrency(corpus)} with {formatCurrency(monthlyWithdrawal)}/mo withdrawals at {rate}% p.a.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs min-w-[500px]">
                <thead>
                  <tr className="bg-[rgba(27,58,92,0.12)] border-b border-black/5 dark:border-white/10">
                    <th className="text-left   text-[#6B7280] dark:text-[#8B95A5] font-semibold py-3 px-4">Year</th>
                    <th className="text-right  text-gray-500 dark:text-gray-400 font-semibold py-3 px-3">Yearly Withdrawn</th>
                    <th className="text-right  text-[#059669] font-semibold py-3 px-3">Yearly Returns</th>
                    <th className="text-right  text-[#6B7280] dark:text-[#8B95A5] font-semibold py-3 px-4">End of Year Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyData.map(({ year, balance, yearlyWithdrawn, yearlyReturns }, i) => {
                    const progress = corpus > 0 ? Math.min(100, (balance / corpus) * 100) : 0;
                    const isLast   = year === years;
                    const isDepleted = balance === 0;

                    if (year === 0) return null; // Skip year 0 for table to keep it clean

                    return (
                      <tr
                        key={year}
                        className={`border-b border-black/5 dark:border-white/10 transition-colors ${
                          isLast || isDepleted
                            ? 'bg-[rgba(27,58,92,0.18)]'
                            : i % 2 === 0
                            ? 'bg-[rgba(0,0,0,0.03)]'
                            : ''
                        }`}
                      >
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className={`font-semibold ${isLast ? 'text-[#1B3A5C]' : 'text-gray-600 dark:text-gray-400'}`}>
                              Year {year}
                            </span>
                            {isDepleted && !isLast && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#991B1B] text-white">
                                Depleted
                              </span>
                            )}
                            {isLast && !isDepleted && (
                              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#1B3A5C] text-white">
                                Final
                              </span>
                            )}
                          </div>
                          <div className="mt-1 w-full h-1 bg-[var(--panel-bg)] bg-opacity-10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${progress}%`,
                                background: isDepleted ? '#991B1B' : '#C4993C',
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-gray-500 dark:text-gray-400">
                          <div>{formatCurrency(yearlyWithdrawn)}</div>
                        </td>
                        <td className="py-2.5 px-3 text-right text-[#059669]">
                          {yearlyReturns > 0 ? `+${formatCurrency(yearlyReturns)}` : '—'}
                        </td>
                        <td className="py-2.5 px-4 text-right">
                          <div className={`font-bold ${isDepleted ? 'text-[#991B1B]' : 'text-[#1F2937]'}`}>
                            {formatCurrency(balance)}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the SWP calculator">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C] bg-opacity-20 border border-[#1B3A5C] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[#1B3A5C]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HOW_TO_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="glass-panel p-5 flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#1B3A5C] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">{title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-label="SWP calculator frequently asked questions">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#1B3A5C] bg-opacity-20 border border-[#1B3A5C] p-2 rounded-xl">
              <HelpCircle className="w-5 h-5 text-[#1B3A5C]" />
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
                  <ChevronDown
                    className={`w-4 h-4 text-[#1B3A5C] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/10 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FORMULA SECTION ── */}
        <section id="swp-formula" aria-label="SWP formula and methodology" className="mt-2">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">SWP Calculation Methodology</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Formula */}
              <div>
                <h3 className="text-[#1B3A5C] font-semibold text-sm mb-3 uppercase tracking-wider">The Concept</h3>
                <div className="bg-[rgba(27,58,92,0.1)] border border-[rgba(27,58,92,0.25)] rounded-xl p-4 font-mono text-center">
                  <p className="text-foreground text-sm font-bold mb-1">Remaining = (Previous Bal + Monthly Return) - Withdrawal</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-left space-y-1">
                    <p>Unlike simple interest, the corpus continuously earns returns while you withdraw.</p>
                    <p>If <strong className="text-[#059669]">Monthly Return &gt; Withdrawal</strong>, the corpus grows indefinitely.</p>
                    <p>If <strong className="text-[#991B1B]">Monthly Return &lt; Withdrawal</strong>, the corpus eventually depletes.</p>
                  </div>
                </div>
              </div>
              {/* Worked example */}
              <div>
                <h3 className="text-[#1B3A5C] font-semibold text-sm mb-3 uppercase tracking-wider">Worked Example (Month 1)</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Starting Corpus</span>
                    <span className="text-foreground font-medium">₹50,00,000</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Return (e.g. 12% p.a. = 1% per month)</span>
                    <span className="text-[#059669] font-medium">+ ₹50,000</span>
                  </div>
                  <div className="flex justify-between text-gray-500 dark:text-gray-400 border-b border-[#E8E4DF] pb-1">
                    <span>Withdrawal</span>
                    <span className="text-[#991B1B] font-medium">- ₹30,000</span>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-gray-500 dark:text-gray-400">End of Month 1 Balance</span>
                    <span className="text-[#1F2937] font-bold text-base">₹50,20,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── RELATED TOOLS ── */}
        <section id="related-calculators" aria-label="Related free financial calculators India">
          <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-1 text-center">More Free Financial Calculators</h2>
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center mb-4">All tools are free, real-time, and require no sign-up.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Link href="/" className="flex items-center gap-3 glass-panel p-3 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl">
                <div className="bg-[#1B3A5C] bg-opacity-20 border border-[#1B3A5C] p-2 rounded-lg flex-shrink-0">
                  <Calculator className="w-4 h-4 text-[#1B3A5C]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[#1B3A5C] transition-colors">Step-Up SIP</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Standard Calculator</p>
                </div>
              </Link>
              
              <Link href="/lumpsum-calculator" className="flex items-center gap-3 glass-panel p-3 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl">
                <div className="bg-[#1B3A5C] bg-opacity-20 border border-[#1B3A5C] p-2 rounded-lg flex-shrink-0">
                  <Layers className="w-4 h-4 text-[#1B3A5C]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[#1B3A5C] transition-colors">Lumpsum Returns</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">One-time investments</p>
                </div>
              </Link>

              <Link href="/target-amount-calculator" className="flex items-center gap-3 glass-panel p-3 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl">
                <div className="bg-[rgba(13,148,136,0.2)] border border-[rgba(13,148,136,0.3)] p-2 rounded-lg flex-shrink-0">
                  <Target className="w-4 h-4 text-[#0D9488]" />
                </div>
                <div>
                  <p className="text-foreground font-semibold text-sm group-hover:text-[#0D9488] transition-colors">Goal Calculator</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Time to reach target</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
