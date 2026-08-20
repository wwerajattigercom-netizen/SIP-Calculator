"use client";
import { useTheme } from 'next-themes';
import CalculatorTabs from '@/components/CalculatorTabs';
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
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C');

  const [sipAmount, setSipAmount] = useState(1000);
  const [duration, setDuration] = useState(20);
  const [returnRate, setReturnRate] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);

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
    datasets: [{ data: [results.totalInvested, results.nominalGains], backgroundColor: [accentColor, '#C4993C'] }]
  };

  const realChartData = {
    labels: ['Total Invested', 'Real Gains', 'Inflation Loss'],
    datasets: [{
      data: [
        results.totalInvested,
        Math.max(0, results.realGains),
        results.powerLost,
      ],
      backgroundColor: ['var(--color-accent)', '#C4993C', '#991B1B'],
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-6xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Tools', href: '/us' }, { label: 'DCA to Beat Inflation' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(153,27,27,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-loss)] font-semibold mb-3 block">Guide · Real Returns</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                How to Use DCA to Beat Inflation 
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Inflation is the silent wealth killer. A 12% return is actually only ~5.6% if inflation is 6%.
                Use this calculator to uncover the <strong className="text-foreground">real purchasing power</strong> of your future wealth.
              </p>
            </div>
          </div>

          {/* Calculator Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Inputs */}
            <div className="md:col-span-5 space-y-6">
              <div className="glass-panel p-6">
                <h3 className="text-foreground font-bold mb-4">Calculator Inputs</h3>
                <div className="space-y-5">
                  <InputSlider
                    label="Monthly DCA Amount"
                    value={sipAmount}
                    min={500}
                    max={500000}
                    step={500}
                    onChange={setSipAmount}
                    formatFn={(v) => formatToShortWords(v)}
                  />
                  <InputSlider
                    label="Investment Duration"
                    value={duration}
                    min={1}
                    max={40}
                    step={1}
                    onChange={setDuration}
                    formatFn={(v) => `${v} Yr`}
                  />
                  <InputSlider
                    label="Expected Return Rate (p.a.)"
                    value={returnRate}
                    min={1}
                    max={30}
                    step={0.1}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Expected Inflation Rate (p.a.)"
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

            {/* Results */}
            <div className="md:col-span-7 space-y-4">
              <div className="glass-panel p-6 space-y-5">

                {/* ── Status badge: Are you beating inflation? ── */}
                <div className={`flex items-start gap-4 p-4 rounded-2xl border ${results.isBeating ? 'border-[var(--color-accent)]/30 bg-[rgba(27,58,92,0.05)]' : 'border-[#991B1B]/30 bg-[rgba(153,27,27,0.06)]'}`}>
                  <div className={`flex-shrink-0 mt-0.5 ${results.isBeating ? 'text-[var(--color-accent)]' : 'text-[var(--color-loss)]'}`}>
                    {results.isBeating
                      ? <CheckCircle2 className="w-6 h-6" />
                      : <XCircle className="w-6 h-6" />}
                  </div>
                  <div>
                    <p className={`font-bold text-sm ${results.isBeating ? 'text-[var(--color-returns)]' : 'text-[var(--color-loss)]'}`}>
                      {results.isBeating
                        ? `✅ Your DCA is beating inflation by ${results.margin.toFixed(1)}%`
                        : `❌ Your DCA is NOT beating inflation (${Math.abs(results.margin).toFixed(1)}% short)`}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-1 leading-relaxed">
                      {results.isBeating
                        ? `Your ${returnRate}% return beats ${inflationRate}% inflation. Real (inflation-adjusted) return: ${results.realReturnRate.toFixed(2)}% per year — your wealth is genuinely growing.`
                        : `Your ${returnRate}% return is below ${inflationRate}% inflation. You are losing purchasing power every year. Consider switching to index funds targeting 8–10%.`}
                    </p>
                  </div>
                </div>

                {/* ── Quick summary row ── */}
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="bg-[var(--panel-bg)] border border-[#E8E4DF] rounded-xl p-3">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1">Total Invested</p>
                    <p className="text-foreground font-bold text-sm">{formatToShortWords(results.totalInvested)}</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.08)] border border-[var(--color-accent)]/20 rounded-xl p-3">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1">Nominal Corpus</p>
                    <p className="text-[var(--color-accent)] font-bold text-sm">{formatToShortWords(results.nominalFV)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Bank statement value</p>
                  </div>
                  <div className="bg-[rgba(27,58,92,0.05)] border border-[var(--color-accent)]/20 rounded-xl p-3">
                    <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wider mb-1">Real Corpus</p>
                    <p className="text-foreground font-bold text-sm">{formatToShortWords(results.realFV)}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">Buying power today</p>
                  </div>
                </div>

                {/* ── Inflation erosion callout ── */}
                <div className="flex items-start gap-2 bg-[rgba(0,0,0,0.04)] border border-[#E8E4DF] rounded-xl p-4">
                  <Info className="w-4 h-4 text-[var(--color-returns)] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    Inflation will erode <strong className="text-[var(--color-loss)]">{formatToShortWords(results.powerLost)}</strong> of your corpus&apos;s buying power over {duration} years. Your {formatToShortWords(results.nominalFV)} will feel like {formatToShortWords(results.realFV)} in today&apos;s money.
                  </p>
                </div>

                {/* ── Doughnut charts ── */}
                <div className="flex justify-around items-center pt-2">
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-28 h-28">
                      <Doughnut data={nominalChartData} options={doughnutOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 text-[9px]">Nominal</span>
                        <span className="text-foreground font-bold text-xs">{formatToShortWords(results.nominalFV)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" /> Invested</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" /> Gains</span>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <TrendingDown className="w-6 h-6 mx-auto text-[var(--color-loss)]" />
                    <span className="text-[10px] block mt-1 uppercase tracking-wider">Inflation</span>
                    <span className="text-[9px] text-[var(--color-loss)] font-bold">−{formatToShortWords(results.powerLost)}</span>
                  </div>

                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-28 h-28">
                      <Doughnut data={realChartData} options={doughnutOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400 text-[9px]">Real Value</span>
                        <span className="text-foreground font-bold text-xs">{formatToShortWords(results.realFV)}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--color-accent)] inline-block" /> Invested</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#C4993C] inline-block" /> Real Gains</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#991B1B] inline-block" /> Power Lost</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">What Is Real Return?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
                <strong>Nominal Return</strong> is the raw percentage your investment grows — the number you see on your account statement.
                <strong> Real Return</strong> is what remains after subtracting inflation. It represents the true increase in your purchasing power.
                If a savings account gives you 4% return and inflation is 6%, your real return is actually <em>negative</em>. You are silently losing wealth.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-amber-500" /> Why 12% Return ≠ 12% Gain
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                A 12% index fund return looks great. But at 6% inflation, your real (Fisher-adjusted) return is only <strong className="text-foreground">~5.66%</strong>.
                The rest is just your money keeping pace with rising prices — not true wealth creation. This is why parking money in low-yield instruments is financially dangerous.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">How to Choose a DCA to Beat Inflation</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                To truly build wealth, you need an asset class that consistently beats inflation. Index funds (via DCA) have historically delivered 10–15% returns —
                comfortably ahead of the US&apos;s 2–4% inflation. Fixed deposits and traditional savings accounts often fail to beat inflation after tax.
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
                    <HelpCircle className="w-4 h-4 text-[var(--color-loss)] flex-shrink-0 mt-0.5" /> {faq.name}
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
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                Step-Up DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/cagr-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                CAGR Calculator
              </Link>
              <Link href="/us/tools/retirement-dca-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
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
