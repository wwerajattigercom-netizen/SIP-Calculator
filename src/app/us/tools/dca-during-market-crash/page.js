"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ArrowRight, HelpCircle, AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

function fmt(val) {
  if (val >= 1e6) return `$${(val / 1e6).toFixed(2)} M`;
  if (val >= 1e3) return `$${(val / 1e3).toFixed(2)} K`;
  return `$${Math.round(val).toLocaleString('en-US')}`;
}

function buildCrashNav(totalMonths, crashStartMonth, crashDuration, crashSeverity, preCrashAnnual, postCrashAnnual) {
  const nav = [100]; // start at 100
  const preCrashMonthly = Math.pow(1 + preCrashAnnual/100, 1/12) - 1;
  const postCrashMonthly = Math.pow(1 + postCrashAnnual/100, 1/12) - 1;
  const crashEndMonth = crashStartMonth + crashDuration;
  
  for (let m = 1; m <= totalMonths; m++) {
    const prev = nav[m-1];
    if (m <= crashStartMonth) {
      // Pre-crash: normal growth
      nav.push(prev * (1 + preCrashMonthly));
    } else if (m <= crashEndMonth) {
      // During crash: linear NAV decline to (1 - severity) of crash-start NAV
      const crashStartNav = nav[crashStartMonth];
      const crashBottomNav = crashStartNav * (1 - crashSeverity/100);
      const progress = (m - crashStartMonth) / crashDuration;
      nav.push(crashStartNav + progress * (crashBottomNav - crashStartNav));
    } else {
      // Post-crash recovery: high growth rate
      nav.push(prev * (1 + postCrashMonthly));
    }
  }
  return nav;
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Should I stop my DCA during a market crash?', acceptedAnswer: { '@type': 'Answer', text: 'No, stopping DCA during a market crash is often the worst thing you can do. A crash is when you get ETF shares at their cheapest, which maximizes your returns when the market eventually recovers.' } },
    { '@type': 'Question', name: 'What happens to DCA during market crash?', acceptedAnswer: { '@type': 'Answer', text: 'The value of your existing investment will fall, but your ongoing DCA installments will buy more units because the NAV (price per unit) is lower. This is called Dollar Cost Averaging.' } },
    { '@type': 'Question', name: 'Is it good to invest lump sum during a market crash?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, if you have spare cash, a market crash is an excellent time to invest a lump sum, provided you have a long-term horizon (5+ years) to wait for the recovery.' } },
    { '@type': 'Question', name: 'How long does a market recovery take globally?', acceptedAnswer: { '@type': 'Answer', text: 'Historically, major crashes (like 2008) took about 18-24 months to recover, while smaller crashes (like 2020) recovered in 5-9 months. The market has always recovered and gone on to hit new highs.' } },
    { '@type': 'Question', name: 'Should I increase my DCA during a market crash?', acceptedAnswer: { '@type': 'Answer', text: 'If your cash flow allows it, increasing your DCA during a crash (also known as step-up DCA) is a powerful strategy to accumulate more units at lower prices.' } },
  ],
};

export default function SipDuringCrashPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'));

  const [monthlySip, setMonthlySip] = useState(1000);
  const [duration, setDuration] = useState(12);
  
  // Dynamic max for crash start year
  const maxCrashStart = Math.max(2, duration - 2);
  const [crashStartYear, setCrashStartYear] = useState(4);
  const [crashDuration, setCrashDuration] = useState(10);
  const [crashSeverity, setCrashSeverity] = useState(40);
  const [preCrashReturn, setPreCrashReturn] = useState(10);
  const [postCrashReturn, setPostCrashReturn] = useState(12);

  // Ensure crash start is valid if duration changes
  const safeCrashStartYear = Math.min(crashStartYear, maxCrashStart);

  const {
    chartConfig,
    navChartConfig,
    finalA,
    finalB,
    diff,
    missedMonths,
    missedAmount,
    crashStartNav,
    crashBottomNav,
  } = useMemo(() => {
    const totalMonths = duration * 12;
    const crashStartMonth = safeCrashStartYear * 12;
    const crashEndMonth = crashStartMonth + crashDuration;

    const nav = buildCrashNav(totalMonths, crashStartMonth, crashDuration, crashSeverity, preCrashReturn, postCrashReturn);

    let unitsA = 0, unitsB = 0;
    const labels = [];
    const valueAData = [];
    const valueBData = [];
    const navData = [];

    // Monthly simulation
    for (let m = 1; m <= totalMonths; m++) {
      const currentNav = nav[m];
      const isCrash = m > crashStartMonth && m <= crashEndMonth;
      
      // Portfolio A: always buys
      unitsA += monthlySip / currentNav;
      
      // Portfolio B: stops during crash
      if (!isCrash) {
        unitsB += monthlySip / currentNav;
      }
      
      // Record year-end snapshots
      if (m % 12 === 0) {
        const year = m / 12;
        labels.push(`Year ${year}`);
        valueAData.push(unitsA * currentNav);
        valueBData.push(unitsB * currentNav);
        navData.push(currentNav);
      }
    }

    const finalAVal = unitsA * nav[totalMonths];
    const finalBVal = unitsB * nav[totalMonths];

    const cStartNav = nav[crashStartMonth];
    const cBottomNav = nav[crashEndMonth];

    return {
      chartConfig: {
        labels,
        datasets: [
          {
            label: 'Continued DCA',
            data: valueAData,
            borderColor: (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C'),
            backgroundColor: (typeof isDark !== 'undefined' && isDark ? 'rgba(26,115,232,0.08)' : 'rgba(27,58,92,0.08)'),
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Stopped DCA During Crash',
            data: valueBData,
            borderColor: (typeof isDark !== 'undefined' && isDark ? '#EF4444' : '#991B1B'),
            backgroundColor: (typeof isDark !== 'undefined' && isDark ? 'rgba(239,68,68,0.08)' : 'rgba(153,27,27,0.08)'),
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      navChartConfig: {
        labels,
        datasets: [
          {
            label: 'Market NAV',
            data: navData,
            borderColor: '#C4993C',
            backgroundColor: 'rgba(196,153,60,0.08)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          }
        ]
      },
      finalA: finalAVal,
      finalB: finalBVal,
      diff: finalAVal - finalBVal,
      missedMonths: crashDuration,
      missedAmount: crashDuration * monthlySip,
      crashStartNav: cStartNav,
      crashBottomNav: cBottomNav,
    };
  }, [monthlySip, duration, safeCrashStartYear, crashDuration, crashSeverity, preCrashReturn, postCrashReturn]);

  const navRatio = (crashStartNav / crashBottomNav).toFixed(2);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-6xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Tools', href: '/us' }, { label: 'DCA During Market Crash' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,27,27,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-loss)] font-semibold mb-3 block">Simulation · Wealth Strategy</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                DCA During Market Crash:  Should You Stop or Continue?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                When the market bleeds, most investors panic and stop their SIPs. But what happens if you don't?
                Use this interactive NAV-based simulator to see the massive wealth you lose by pausing your DCA during a downturn.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-foreground font-bold mb-4">Investment Details</h3>
                <div className="space-y-5">
                  <InputSlider
                    label="Monthly DCA Amount"
                    value={monthlySip}
                    min={1000}
                    max={100000}
                    step={1000}
                    onChange={setMonthlySip}
                    formatFn={(v) => fmt(v)}
                  />
                  <InputSlider
                    label="Total Investment Period"
                    value={duration}
                    min={5}
                    max={30}
                    step={1}
                    onChange={setDuration}
                    formatFn={(v) => `${v} Yr`}
                  />
                </div>
              </div>

              <div className="glass-panel p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(196,153,60,0.05)] to-transparent pointer-events-none" />
                <h3 className="text-foreground font-bold mb-4 relative z-10 flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-[var(--color-returns)]" /> Crash Scenario
                </h3>
                <div className="space-y-5 relative z-10">
                  <InputSlider
                    label="Crash Starts at Year"
                    value={safeCrashStartYear}
                    min={2}
                    max={maxCrashStart}
                    step={1}
                    onChange={setCrashStartYear}
                    formatFn={(v) => `Year ${v}`}
                  />
                  <InputSlider
                    label="Crash Duration (Months)"
                    value={crashDuration}
                    min={3}
                    max={24}
                    step={1}
                    onChange={setCrashDuration}
                    formatFn={(v) => `${v} Mo`}
                  />
                  <InputSlider
                    label="Crash Severity (% drop)"
                    value={crashSeverity}
                    min={20}
                    max={60}
                    step={5}
                    onChange={setCrashSeverity}
                    formatFn={(v) => `-${v}%`}
                  />
                  <div className="pt-2 border-t border-[#E8E4DF] space-y-5">
                    <InputSlider
                      label="Pre-crash Annual Return"
                      value={preCrashReturn}
                      min={8}
                      max={18}
                      step={0.5}
                      onChange={setPreCrashReturn}
                      formatFn={(v) => `${v}%`}
                    />
                    <InputSlider
                      label="Post-crash Recovery Return"
                      value={postCrashReturn}
                      min={8}
                      max={20}
                      step={0.5}
                      onChange={setPostCrashReturn}
                      formatFn={(v) => `${v}%`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7 space-y-6">
              <div className="glass-panel p-6">
                
                {/* Result cards (2x2 grid) */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {/* Continued DCA */}
                  <div className="p-4 rounded-2xl border border-[var(--color-accent)] bg-[rgba(27,58,92,0.08)] shadow-sm">
                    <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Final Value (Continued)</div>
                    <div className="text-xl font-bold text-foreground">{fmt(finalA)}</div>
                  </div>
                  {/* Stopped DCA */}
                  <div className="p-4 rounded-2xl border border-black/5 bg-black/5">
                    <div className="text-gray-500 dark:text-gray-400 text-[10px] font-semibold uppercase tracking-wider mb-1">Final Value (Stopped)</div>
                    <div className="text-xl font-bold text-gray-600 dark:text-gray-400">{fmt(finalB)}</div>
                  </div>
                  
                  {/* Extra Wealth */}
                  <div className="p-4 rounded-2xl border border-[#991B1B]/30 bg-[#991B1B]/10">
                    <div className="text-[var(--color-loss)] text-[10px] font-semibold uppercase tracking-wider mb-1">Wealth Lost By Stopping</div>
                    <div className="text-xl font-bold text-foreground">{fmt(diff)}</div>
                  </div>
                  {/* Missed Investment */}
                  <div className="p-4 rounded-2xl border border-[#059669]/30 bg-[#059669]/10">
                    <div className="text-[var(--color-returns)] text-[10px] font-semibold uppercase tracking-wider mb-1">Idle Cash (Uninvested)</div>
                    <div className="text-xl font-bold text-foreground">{fmt(missedAmount)} <span className="text-xs font-normal text-gray-500 dark:text-gray-400">over {missedMonths} mo</span></div>
                  </div>
                </div>

                {/* Key Insight Callout */}
                <div className="mb-6 bg-gradient-to-r from-[rgba(196,153,60,0.15)] to-[rgba(196,153,60,0.05)] border border-[#059669]/30 rounded-xl p-4 flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[var(--color-returns)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">The Magic of Continuing</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                      At the crash bottom, your DCA buys units at <strong>{fmt(crashBottomNav)}</strong> NAV instead of the pre-crash peak of <strong>{fmt(crashStartNav)}</strong> NAV. 
                      You get <strong>{navRatio}x more units</strong> for the exact same ${monthlySip} monthly investment. When the market recovers, those extra units cause your wealth to explode.
                    </p>
                  </div>
                </div>

                {/* Wealth Chart */}
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Portfolio Value Over Time</h4>
                <div className="w-full h-[220px] mb-6">
                  <Line
                    data={chartConfig}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: 'index', intersect: false },
                      scales: {
                        y: {
                          border: { display: false },
                          grid: { color: 'rgba(0,0,0,0.03)' },
                          ticks: { color: '#8B95A5', callback: (v) => fmt(v) },
                        },
                        x: {
                          border: { display: false },
                          grid: { display: false },
                          ticks: { color: '#8B95A5' },
                        },
                      },
                      plugins: {
                        legend: { labels: { color: '#8B95A5', usePointStyle: true, boxWidth: 6 } },
                        tooltip: {
                          backgroundColor: '#1F2937',
                          titleColor: '#F3F4F6',
                          bodyColor: '#D1D5DB',
                          borderColor: 'rgba(0,0,0,0.05)',
                          borderWidth: 1,
                          callbacks: { label: (ctx) => ` ${ctx.dataset.label}: ${fmt(ctx.parsed.y)}` },
                        },
                      },
                    }}
                  />
                </div>

                {/* NAV Chart */}
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Market NAV Curve</h4>
                <div className="w-full h-[140px] opacity-80">
                  <Line
                    data={navChartConfig}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      interaction: { mode: 'index', intersect: false },
                      scales: {
                        y: {
                          border: { display: false },
                          grid: { color: 'rgba(0,0,0,0.04)' },
                          ticks: { color: '#8B95A5', font: { size: 10 } },
                        },
                        x: {
                          border: { display: false },
                          grid: { display: false },
                          ticks: { display: false },
                        },
                      },
                      plugins: {
                        legend: { display: false },
                        tooltip: {
                          backgroundColor: '#1F2937',
                          titleColor: '#F3F4F6',
                          bodyColor: '#D1D5DB',
                          borderColor: 'rgba(0,0,0,0.05)',
                          borderWidth: 1,
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Historical crash reference table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Real Historical Crashes & DCA Outcomes</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-2 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Crash Event</th>
                    <th className="py-2 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Year</th>
                    <th className="py-2 pr-4 text-[var(--color-loss)] font-semibold">S&P 500 Drop</th>
                    <th className="py-2 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Recovery Time</th>
                    <th className="py-2 text-[var(--color-accent)] font-semibold">DCA Outcome</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 dark:text-gray-400">
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 text-foreground">Dot-com bust</td>
                    <td className="py-3 pr-4">2000-01</td>
                    <td className="py-3 pr-4 text-[var(--color-loss)] font-semibold">−56%</td>
                    <td className="py-3 pr-4">~3 years</td>
                    <td className="py-3">DCA investors 2.5× wealthier than those who stopped</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 text-foreground">Global Financial Crisis</td>
                    <td className="py-3 pr-4">2008-09</td>
                    <td className="py-3 pr-4 text-[var(--color-loss)] font-semibold">−60%</td>
                    <td className="py-3 pr-4">~18 months</td>
                    <td className="py-3">DCA investors recovered 6 months faster than lumpsum</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4 text-foreground">COVID-19 Crash</td>
                    <td className="py-3 pr-4">2020</td>
                    <td className="py-3 pr-4 text-[var(--color-loss)] font-semibold">−38%</td>
                    <td className="py-3 pr-4">~5 months</td>
                    <td className="py-3">DCA investors reached all-time high portfolio values within 9 months</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">Russia-Ukraine War</td>
                    <td className="py-3 pr-4">2022</td>
                    <td className="py-3 pr-4 text-[var(--color-loss)] font-semibold">−17%</td>
                    <td className="py-3 pr-4">~4 months</td>
                    <td className="py-3">Minimal long-term impact; great accumulation opportunity</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[var(--color-loss)]" /> Why Stopping DCA During a Crash is the Worst Mistake
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                When the stock market crashes, the natural human instinct is to stop investing to "prevent further losses". 
                However, a DCA does not lock in your losses — it simply buys units at the current market price.
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                By stopping your DCA during a crash, you miss out on accumulating ETF shares at their lowest possible price. 
                When the market eventually rebounds (which it historically always has), the investors who continued their DCA contributions 
                see explosive growth because they hold significantly more units bought at discount prices.
              </p>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Time in the Market {">"} Timing the Market</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Nobody can accurately predict when a crash will hit the exact bottom. If you stop your DCA and try to wait 
                for the "perfect time" to re-enter, you will likely miss the sharpest recovery days, which account for the majority 
                of long-term market returns. The best strategy is automation: let your DCA run regardless of market news.
              </p>
            </div>
          </div>

          
        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl mb-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                1
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Adjust the inputs</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Use the sliders or text boxes to enter your specific financial numbers.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                2
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Review the charts</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</p>
              </div>
            </div>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 flex gap-4 shadow-sm">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                3
              </div>
              <div>
                <p className="text-foreground font-semibold mb-1 text-sm">Analyze the results</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</p>
              </div>
            </div>
          </div>
        </section>

          {/* FAQs */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {jsonLd.mainEntity.map((faq, i) => (
                <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                  <h3 className="text-foreground font-medium text-sm flex items-start gap-2">
                    <HelpCircle className="w-4 h-4 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-6">{faq.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cross Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(153,27,27,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-4">Explore More Strategies</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/tools/dca-vs-lumpsum" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                DCA vs Lumpsum <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                DCA Calculator
              </Link>
              <Link href="/us/tools/retirement-dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Retirement Calculator
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Disclaimer: All investments involve risk. Past performance does not guarantee future results. Consult a licensed financial advisor before making investment decisions.</p>
          </div>

        </article>
      </main>
    </>
  );
}
