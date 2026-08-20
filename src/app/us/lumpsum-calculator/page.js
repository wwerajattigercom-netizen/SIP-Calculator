"use client";
import { useTheme } from 'next-themes';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TrendingUp, HelpCircle, ChevronDown, ArrowRight, Calculator, Target, Layers, Coins, CalendarClock, Info, BookOpen } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import YearlyGrowthTable from '@/components/YearlyGrowthTable';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

// ─── helpers ────────────────────────────────────────────────
const currencyCode = 'USD';
const locale = 'en-US';
const currencySymbol = '$';

const fmt = (v) =>
  new Intl.NumberFormat(locale, { style: 'currency', currency: currencyCode, maximumFractionDigits: 0 }).format(v);

function toLabel(v) {
  if (currencyCode === 'INR') {
    if (v >= 1e7) return `₹${(v / 1e7).toFixed(2)} Cr`;
    if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  } else {
    if (v >= 1e6) return `$${(v / 1e6).toFixed(2)} M`;
    if (v >= 1e3) return `$${(v / 1e3).toFixed(1)} K`;
  }
  return fmt(v);
}

// ─── JSON-LD ─────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Lumpsum Calculator — One-Time Investment Returns Calculator',
      description: 'Free lumpsum calculator to calculate future value of a one-time investment. Features annual compounding, year-by-year table, and scenario analysis.',
      url: `https://stepupcalculator.com${true ? '/us' : ''}/lumpsum-calculator`,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: currencyCode },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is a lumpsum investment?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `A lumpsum investment is a single, one-time investment made all at once, as opposed to investing a fixed amount monthly (like a ${true ? 'DCA' : 'SIP'}). It is highly recommended for windfalls like bonuses, inheritances, or asset sales.`,
          },
        },
        {
          '@type': 'Question',
          name: 'How is lumpsum return calculated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Lumpsum future value is calculated using compound interest: P × (1 + r)^n. P is the principal, r is the annual return rate, and n is the number of years.',
          },
        },
        {
          '@type': 'Question',
          name: `Is lumpsum better than ${true ? 'DCA' : 'SIP'}?`,
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mathematically, lumpsum beats monthly investing about 66% of the time because your capital is exposed to the market longer and starts compounding immediately. However, spreading investments out reduces volatility risk.',
          },
        }
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is a lumpsum investment?',
    a: `A lumpsum investment is a single one-time investment — unlike ${true ? 'DCA' : 'SIP'} where you invest monthly. It's ideal for windfalls like bonuses, property sale proceeds, or inheritances. 100% of the capital starts compounding immediately from day one.`,
  },
  {
    q: 'How is lumpsum return calculated?',
    a: `Future Value = P × (1 + r)^n. Where P = principal, r = annual rate, n = years. Example: ${currencySymbol}100,000 at 12% p.a. for 10 years = ${currencySymbol}100,000 × (1.12)^10 = ${currencySymbol}310,585. Simple annual compounding.`,
  },
  {
    q: `Is lumpsum better than ${true ? 'DCA' : 'SIP'}?`,
    a: `Lumpsum mathematically beats ${true ? 'DCA' : 'SIP'} in rising markets because 100% of your capital starts compounding immediately. ${true ? 'DCA' : 'SIP'} is mathematically safer in volatile or falling markets. Most advisors recommend investing windfalls immediately as a lumpsum rather than trying to time the market.`,
  },
  {
    q: 'What is the Rule of 72?',
    a: 'Divide 72 by the annual return rate to estimate how many years it takes for your lumpsum to double. At 12% → 6 years. At 8% → 9 years. At 18% → 4 years. It is a quick mental check.',
  },
];

// ─── Main Page ───────────────────────────────────────────────
export default function LumpsumCalculatorPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C');

  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate]           = useState(10);
  const [years, setYears]         = useState(10);
  const [openFaq, setOpenFaq]     = useState(null);
  const [chartTab, setChartTab]   = useState('pie');

  // Calculate
  const { futureValue, gain, yearlyData, rule72 } = useMemo(() => {
    const r = rate / 100;
    const fv = principal * Math.pow(1 + r, years);
    const g  = fv - principal;
    const r72 = r > 0 ? (72 / rate).toFixed(1) : '∞';
    const data = Array.from({ length: years }, (_, i) => {
      const yearBalance = principal * Math.pow(1 + r, i + 1);
      return {
        year: i + 1,
        invested: principal,
        balance: yearBalance,
        gains: yearBalance - principal,
      };
    });
    return { futureValue: fv, gain: g, yearlyData: data, rule72: r72 };
  }, [principal, rate, years]);

  // Scenario Analysis: Waiting 5 years vs Investing Now
  const scenarioWait = useMemo(() => {
    if (years <= 5) return null;
    const r = rate / 100;
    const fvWait = principal * Math.pow(1 + r, years - 5);
    return futureValue - fvWait;
  }, [principal, rate, years, futureValue]);

  // ── Pie chart ──
  const pieData = {
    labels: ['Invested Amount', 'Est. Returns'],
    datasets: [{
      data: [principal, gain],
      backgroundColor: [accentColor, '#C4993C'],
      borderColor: ['transparent', 'transparent'], borderWidth: 0,
      borderWidth: 4,
      hoverOffset: 0,
    }],
  };
  const pieOptions = {
    responsive: true, maintainAspectRatio: false, cutout: '75%',
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${fmt(ctx.raw)}` } },
    },
  };

  // ── Line chart ──
  const lineData = {
    labels: yearlyData.map(d => `Yr ${d.year}`),
    datasets: [
      { label: 'Invested', data: yearlyData.map(d => d.invested), borderColor: (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C'), backgroundColor: (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C'), tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
      { label: 'Wealth Value', data: yearlyData.map(d => d.balance), borderColor: '#C4993C', backgroundColor: '#C4993C', tension: 0.4, pointRadius: 0, pointHitRadius: 10 },
    ],
  };
  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${fmt(ctx.raw)}` } } },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#e2e8f0', maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#e2e8f0', callback: (v) => toLabel(v) } },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Lumpsum Calculator' }]} />

          {/* Page heading */}
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              Lumpsum Calculator — One-Time Investment Returns
            </h1>
            <p className="text-[#6B7280] dark:text-[#8B95A5] max-w-3xl">
              Calculate the future wealth generated by a one-time investment. Discover how compounding interest turns a single windfall into a massive corpus over time.
            </p>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">

            {/* Inputs */}
            <div className="lg:col-span-5 glass-panel p-4 lg:p-5">
              <InputSlider label="Lumpsum Investment Amount" value={principal} onChange={setPrincipal} min={1000} max={1000000} step={1000} prefix={currencySymbol} />
              <InputSlider label="Expected Annual Return Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
              <InputSlider label="Investment Duration" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Yr" />

              {/* Labels */}
              <div className="mt-5 space-y-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
                {[
                  { label: 'Initial Investment', val: fmt(principal) },
                  { label: 'Time Horizon', val: `${years} years` },
                  { label: 'Assumed Growth', val: `${rate}% p.a.` },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between border-b border-[var(--panel-border)] pb-1">
                    <span>{label}</span>
                    <span className="text-foreground font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {/* ── Scenario Analysis: Cost of Waiting ── */}
              {scenarioWait && (
                <div className="bg-[#C4993C]/5 border border-[#C4993C]/30 rounded-xl p-4 flex flex-col items-start gap-3 mt-auto">
                   <div className="flex items-center gap-2">
                     <div className="bg-[#C4993C]/20 p-1.5 rounded-full flex-shrink-0">
                        <Info className="w-4 h-4 text-[#C4993C]" />
                     </div>
                     <h3 className="text-sm font-bold text-foreground">The Cost of Waiting</h3>
                   </div>
                   <p className="text-xs text-[#6B7280] dark:text-[#8B95A5] leading-relaxed">
                     If you delay investing your {toLabel(principal)} by just <strong>5 years</strong>, you would lose out on <strong className="text-[var(--color-loss)]">{fmt(scenarioWait)}</strong> in compound interest over your {years}-year horizon.
                   </p>
                </div>
              )}
            </div>

            {/* Results */}
            <div className="lg:col-span-7">
              
              {/* Dynamic Result Banner */}
              <div className="glass-panel p-5 mb-6 flex gap-4 items-center bg-[var(--color-accent)]/5 border-[var(--color-accent)]/20">
                <div className="hidden sm:flex bg-[var(--color-accent)]/10 p-3 rounded-full">
                   <TrendingUp className="w-8 h-8 text-[var(--color-accent)]" />
                </div>
                <div>
                   <h3 className="text-lg font-bold text-foreground">
                     Your {toLabel(principal)} will grow to <span className="text-[var(--color-returns)]">{toLabel(futureValue)}</span>
                   </h3>
                   <p className="text-sm text-[#6B7280] dark:text-[#8B95A5]">
                     By investing your capital today and leaving it untouched for {years} years, you will earn <strong>{toLabel(gain)}</strong> in pure compound interest.
                   </p>
                </div>
              </div>

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
                <div className="relative flex-1 min-h-[220px] flex justify-center items-center overflow-hidden relative z-10 mb-4">
                  {chartTab === 'pie' && (
                    <>
                      <Doughnut data={pieData} options={pieOptions} />
                      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-xs text-gray-500 dark:text-gray-400">Total Value</span>
                        <span className="text-lg md:text-xl font-bold text-foreground">{fmt(futureValue)}</span>
                        <span className="text-[10px] text-[#6B7280] dark:text-[#8B95A5]">{toLabel(futureValue)}</span>
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
                      <Coins className="w-3 h-3 mr-1" />Total Value
                    </div>
                    <div className="text-sm font-extrabold text-foreground">{fmt(futureValue)}</div>
                    <div className="text-[9px] text-[#6B7280] dark:text-[#8B95A5] mt-0.5 tracking-wide">{toLabel(futureValue)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[var(--color-accent)] mr-1.5" />Invested</div>
          <div className="text-sm font-extrabold text-[var(--color-accent)]">
                  {fmt(principal)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{toLabel(principal)}</div>
                  </div>

                  <div className="bg-black/5 dark:bg-white/5 rounded-lg p-2 flex flex-col justify-center">
                    <div className="flex items-center text-foreground text-[11px] mb-0.5 font-semibold">
                      <div className="w-2 h-2 rounded-full bg-[#C4993C] mr-1.5" />Total Gains</div>
          <div className="text-sm font-extrabold text-[var(--color-returns)]">+{fmt(gain)}</div>
                    <div className="text-[9px] text-gray-500 dark:text-gray-400 mt-0.5 tracking-wide">{toLabel(gain)}</div>
                  </div>

                  {/* Rule of 72 */}
                  <div className="col-span-3 mt-1 bg-black/5 dark:bg-white/5 rounded-lg px-3 py-2 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                       <TrendingUp className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" />
                       <span className="text-xs text-[#6B7280] dark:text-[#8B95A5]">Wealth Multiplier: <strong className="text-foreground">{Math.max(1, (futureValue/principal)).toFixed(2)}x</strong> your money</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <CalendarClock className="w-3.5 h-3.5 text-[var(--color-accent)] flex-shrink-0" />
                       <span className="text-xs text-[#6B7280] dark:text-[#8B95A5]">Rule of 72: Money doubles every <strong className="text-[var(--color-accent)]">{rule72} years</strong> at {rate}%</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* ── Yearly Growth Table ── */}
          <section className="mt-8">
             <YearlyGrowthTable yearlyData={yearlyData} targetAmount={futureValue} goalTotalMonths={years * 12} />
          </section>

          {/* ── Educational Content ── */}
          <section id="methodology" className="mt-8 glass-panel p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[var(--color-accent)] bg-opacity-20 border border-[var(--color-accent)] p-2 rounded-xl">
                <BookOpen className="w-5 h-5 text-[var(--color-accent)]" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">How Lumpsum Compounding Works</h2>
            </div>
            <div className="space-y-4 text-sm text-[#6B7280] dark:text-[#8B95A5] leading-relaxed">
               <p>
                 A lumpsum investment is simply a single, one-time deposit of capital. When you invest a lumpsum amount into an appreciating asset (like an equity mutual fund, index fund, or stock market portfolio), your money grows through the power of <strong>compound interest</strong>.
               </p>
               <h3 className="text-lg font-bold text-foreground mt-6 mb-2">The Mathematical Formula</h3>
               <p>
                 The future value of a lumpsum is calculated using the standard compound interest formula:
               </p>
               <div className="bg-black/5 dark:bg-white/5 p-4 rounded-xl font-mono text-center text-foreground">
                  FV = P × (1 + r)^n
               </div>
               <ul className="list-disc ml-5 space-y-2 mt-4">
                 <li><strong>FV</strong>: Future Value (Your final corpus)</li>
                 <li><strong>P</strong>: Principal Amount (Your initial {fmt(principal)} deposit)</li>
                 <li><strong>r</strong>: Annual interest rate (Your {rate}% expected return)</li>
                 <li><strong>n</strong>: Number of years (Your {years}-year horizon)</li>
               </ul>
               
               <h3 className="text-lg font-bold text-foreground mt-6 mb-2">Lumpsum vs Dollar Cost Averaging (DCA)</h3>
               <p>
                 A common dilemma is whether to invest a large windfall (like a bonus) all at once (Lumpsum) or spread it out over several months (DCA). 
               </p>
               <p>
                 Mathematically, research shows that <strong>lumpsum investing beats spreading it out roughly 66% of the time</strong>. This is because markets go up more often than they go down. By investing the lumpsum immediately, 100% of your capital begins earning returns on day one. When you spread it out, the uninvested cash sitting in your bank account is experiencing an "opportunity cost" by missing out on potential market gains.
               </p>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" aria-label="Lumpsum calculator frequently asked questions" className="mt-8">
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
                    id={`lumpsum-faq-${i}`}
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-foreground font-medium text-sm pr-4">{q}</span>
                    <ChevronDown className={`w-4 h-4 text-[var(--color-accent)] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-[#6B7280] dark:text-[#8B95A5] text-sm leading-relaxed border-t border-[var(--panel-border)] pt-3">{a}</div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── Related Tools ── */}
          <section id="related-calculators" aria-label="Related free financial calculators" className="mt-8 mb-6">
            <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
              <h2 className="text-lg font-bold text-foreground mb-1 text-center">More Free Financial Calculators</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
                {[
                  { href: `/us/dca-calculator`, icon: <Calculator className="w-4 h-4 text-[var(--color-accent)]" />, label: `Step-Up DCA Calculator`, desc: `Monthly DCA with step-up & inflation` },
                  { href: `/us/target-amount-calculator`, icon: <Target className="w-4 h-4 text-[var(--color-accent)]" />, label: `Goal Calculator`, desc: `Time to reach your goal target` },
                  { href: `/us/cagr-calculator`, icon: <TrendingUp className="w-4 h-4 text-[#0D9488]" />, label: 'CAGR Calculator', desc: 'Compound annual growth rate' },
                ].map(({ href, icon, label, desc }) => (
                  <Link key={href} href={href} className="flex items-start gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.15)] transition-all group rounded-xl">
                    <div className="bg-[rgba(27,58,92,0.15)] p-2 rounded-lg flex-shrink-0">{icon}</div>
                    <div>
                      <p className="text-foreground font-semibold text-sm group-hover:text-[var(--color-accent)] transition-colors">{label}</p>
                      <p className="text-[#6B7280] dark:text-[#8B95A5] text-xs">{desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#6B7280] dark:text-[#8B95A5] group-hover:text-[var(--color-accent)] ml-auto transition-colors flex-shrink-0" />
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
