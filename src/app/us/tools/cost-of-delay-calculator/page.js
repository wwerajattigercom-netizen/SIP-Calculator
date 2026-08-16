"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { AlertTriangle, TrendingUp, Clock, HelpCircle, ChevronDown, ArrowRight, Calculator, Target } from 'lucide-react';
import InputSlider from '@/components/InputSlider';
import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, Tooltip, Legend,
  CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement
} from 'chart.js';

ChartJS.register(Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, BarElement);


// ─── Helpers ─────────────────────────────────────────────────
const fmtUSD = (v) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(v);

function toLabel(v) {
  if (v >= 1e6) return `$${(v / 1e6).toFixed(2)} M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(2)} K`;
  return fmtUSD(v);
}

// ─── JSON-LD ─────────────────────────────────────────────────
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      name: 'Cost of Delay Calculator — DCA Investment Delay Impact',
      description: 'Calculate the devastating impact of delaying your DCA investment. See how much wealth you lose and what it takes to catch up.',
      url: 'https://stepupcalculator.com/us/cost-of-delay-calculator',
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        'DCA cost of delay calculation',
        'Compare Start Now vs Start Late scenarios',
        'Calculate extra DCA needed to catch up',
        'Wealth loss percentage',
        'Year-by-year compounding growth comparison line chart',
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Cost of Delay in DCA?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Cost of Delay refers to the potential wealth you lose by waiting to start your investments. Because of the power of compounding, even a small delay of 1-3 years can result in a massive reduction in your final retirement corpus.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does delaying DCA affect my wealth?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'When you delay, you miss out on the crucial later years of compounding where your money grows the most. For example, delaying a $10,000/month DCA by just 5 years on a 20-year horizon can reduce your final corpus by more than 50%.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can I recover the cost of delay?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To make up for lost time, you must significantly increase your monthly DCA amount. Often, a 5-year delay requires you to invest more than double the original monthly amount to reach the same financial goal.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is it ever too late to start investing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, it is never too late to start. While starting early is ideal, investing now is always better than delaying further. Every year you wait increases the burden on your future finances.',
          },
        },
      ],
    },
  ],
};

const FAQS = [
  {
    q: 'What is the Cost of Delay in DCA?',
    a: 'The Cost of Delay refers to the potential wealth you lose by waiting to start your investments. Because of the power of compounding, even a small delay of 1-3 years can result in a massive reduction in your final wealth corpus.',
  },
  {
    q: 'How does delaying DCA affect my wealth?',
    a: 'When you delay, you miss out on the crucial later years of compounding where your money grows the most. For example, delaying a $10,000/month DCA by just 5 years on a 20-year horizon can reduce your final corpus by more than 50%.',
  },
  {
    q: 'How can I recover the cost of delay?',
    a: 'To make up for lost time, you must significantly increase your monthly DCA amount. Often, a 5-year delay requires you to invest more than double the original monthly amount to reach the same financial goal in the compressed timeframe.',
  },
  {
    q: 'Is it ever too late to start investing?',
    a: 'No, it is never too late to start. While starting early is ideal, investing now is always better than delaying further. Every year you wait increases the burden on your future finances, so starting today is the best action.',
  },
];

// ─── Main Page ───────────────────────────────────────────────
export default function CostOfDelayCalculatorPage() {
  const [monthlySIP, setMonthlySIP] = useState(10000);
  const [rate, setRate]             = useState(12);
  const [years, setYears]           = useState(20);
  const [delay, setDelay]           = useState(5);
  const [openFaq, setOpenFaq]       = useState(null);
  const [chartTab, setChartTab]     = useState('bar');

  // Calculate
  const { fvStartNow, fvStartLate, costOfDelay, extraSIP, wealthLostPct, yearlyData } = useMemo(() => {
    const p = monthlySIP;
    const r = rate / 12 / 100;
    const n1 = years * 12;
    // Delay cannot exceed total years
    const actualDelay = Math.min(delay, years - 1);
    const n2 = (years - actualDelay) * 12;

    const calculateSIP_FV = (pmt, ratePerPeriod, periods) => {
      if (ratePerPeriod === 0) return pmt * periods;
      return pmt * ((Math.pow(1 + ratePerPeriod, periods) - 1) / ratePerPeriod) * (1 + ratePerPeriod);
    };

    const fv1 = calculateSIP_FV(p, r, n1);
    const fv2 = calculateSIP_FV(p, r, n2);

    const lost = fv1 - fv2;
    const lostPct = fv1 > 0 ? (lost / fv1) * 100 : 0;

    // To catch up, what DCA is needed for n2 periods to reach fv1?
    let requiredSIP = 0;
    if (n2 > 0) {
      if (r === 0) {
        requiredSIP = fv1 / n2;
      } else {
        requiredSIP = fv1 / (((Math.pow(1 + r, n2) - 1) / r) * (1 + r));
      }
    }
    const extra = Math.max(0, requiredSIP - p);

    const data = Array.from({ length: years }, (_, i) => {
      const yr = i + 1;
      const m1 = yr * 12;
      const m2 = Math.max(0, (yr - actualDelay) * 12);
      return {
        year: yr,
        startNow: calculateSIP_FV(p, r, m1),
        startLate: m2 > 0 ? calculateSIP_FV(p, r, m2) : 0,
      };
    });

    return { fvStartNow: fv1, fvStartLate: fv2, costOfDelay: lost, extraSIP: extra, wealthLostPct: lostPct, yearlyData: data };
  }, [monthlySIP, rate, years, delay]);

  // ── Charts ──
  const barData = {
    labels: ['Wealth Corpus'],
    datasets: [
      {
        label: 'Start Now',
        data: [fvStartNow],
        backgroundColor: '#1B3A5C',
        borderRadius: 4,
      },
      {
        label: 'Start Late',
        data: [fvStartLate],
        backgroundColor: '#C4993C',
        borderRadius: 4,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${fmtUSD(ctx.raw)}` } },
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { callback: (v) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1e3).toFixed(0)}K` } },
    },
  };

  const lineData = {
    labels: yearlyData.map(d => `Yr ${d.year}`),
    datasets: [
      {
        label: 'Start Now',
        data: yearlyData.map(d => d.startNow),
        borderColor: '#1B3A5C',
        backgroundColor: '#1B3A5C',
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: false,
      },
      {
        label: 'Start Late',
        data: yearlyData.map(d => d.startLate),
        borderColor: '#C4993C',
        backgroundColor: '#C4993C',
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
        pointHitRadius: 10,
        fill: false,
      },
    ],
  };

  const lineOptions = {
    responsive: true, maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { position: 'bottom', labels: { usePointStyle: true, boxWidth: 8 } },
      tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: $${ctx.raw.toLocaleString('en-US')}` } },
    },
    scales: {
      x: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6B7280', maxTicksLimit: 6 } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { color: '#6B7280', callback: (v) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : `$${(v/1e3).toFixed(0)}K` } },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: 'Cost of Delay Calculator' }]} />

          {/* Page heading */}
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              Cost of Delay Calculator — See What Waiting Costs You
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Discover the devastating impact of delaying your DCA investments. See how much wealth you lose by waiting and find out exactly how much extra you'll need to invest to catch up.
            </p>
          </div>

          {/* ── MAIN GRID ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            
            {/* Inputs */}
            <div className="lg:col-span-5 glass-panel p-5 lg:p-6">
              <InputSlider label="Monthly DCA Amount" value={monthlySIP} onChange={setMonthlySIP} min={500} max={500000} step={500} prefix="$" />
              <InputSlider label="Expected Return Rate" value={rate} onChange={setRate} min={6} max={20} step={0.5} suffix="%" />
              <InputSlider label="Investment Duration" value={years} onChange={setYears} min={5} max={40} step={1} suffix="Yr" />
              <InputSlider label="Delay Period" value={delay} onChange={setDelay} min={1} max={15} step={1} suffix="Yr" />

              {/* Summary Labels */}
              <div className="mt-5 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex justify-between border-b border-[#E8E4DF] pb-1">
                  <span>Start Now Horizon</span>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{years} years</span>
                </div>
                <div className="flex justify-between border-b border-[#E8E4DF] pb-1">
                  <span>Start Late Horizon</span>
                  <span className="text-gray-600 dark:text-gray-400 font-medium">{Math.max(0, years - delay)} years</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              
              {/* Dramatic Comparison Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Now Card */}
                <div className="glass-panel p-5 bg-gradient-to-br from-green-50 to-white border-green-100 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center text-green-700 font-semibold mb-2">
                    <TrendingUp className="w-5 h-5 mr-2" /> Start Now
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Corpus</div>
                  <div className="text-3xl font-extrabold text-foreground">{toLabel(fvStartNow)}</div>
                </div>

                {/* Start Late Card */}
                <div className="glass-panel p-5 bg-gradient-to-br from-red-50 to-white border-red-100 flex flex-col justify-center items-center text-center">
                  <div className="flex items-center text-[#991B1B] font-semibold mb-2">
                    <Clock className="w-5 h-5 mr-2" /> Start {delay} Years Late
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Corpus</div>
                  <div className="text-3xl font-extrabold text-[var(--color-accent)]">{toLabel(fvStartLate)}</div>
                </div>
              </div>

              {/* Cost of Delay Highlight */}
              <div className="glass-panel p-6 text-center border-l-4 border-l-[#991B1B] bg-[#fffaf5]">
                <div className="flex justify-center items-center mb-2">
                  <AlertTriangle className="w-6 h-6 text-[#991B1B] mr-2" />
                  <h3 className="text-lg font-bold text-[#991B1B]">Cost of Delay</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">You lose <strong className="text-[#991B1B]">{wealthLostPct.toFixed(1)}%</strong> of your potential wealth.</p>
                <div className="text-4xl md:text-5xl font-extrabold text-[#991B1B] drop-shadow-sm mb-4">
                  {toLabel(costOfDelay)}
                </div>
                <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 inline-block">
                  <p className="text-sm text-gray-500 dark:text-gray-500">
                    To catch up, you'd need to invest <strong className="text-[#059669]">${Math.round(extraSIP + monthlySIP).toLocaleString('en-US')}</strong>/month instead.
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    That's an extra <strong className="text-[#059669]">${Math.round(extraSIP).toLocaleString('en-US')}</strong> every month!
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ── Chart Section ── */}
          <div className="mt-8 glass-panel p-5 lg:p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-foreground">Wealth Trajectory Comparison</h3>
              {/* Chart tab strip */}
              <div className="flex bg-[rgba(0,0,0,0.03)] p-1 rounded-lg w-48">
                {[{ key: 'bar', label: 'Bar' }, { key: 'line', label: 'Line' }].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setChartTab(key)}
                    className={`flex-1 py-1.5 rounded-md text-xs font-medium transition-all ${
                      chartTab === key ? 'bg-[var(--color-accent)] text-white shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-foreground'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full h-[300px]">
              {chartTab === 'bar' && <Bar data={barData} options={barOptions} />}
              {chartTab === 'line' && <Line data={lineData} options={lineOptions} />}
            </div>

            {/* Stat Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Now Corpus</div>
                <div className="text-lg font-bold text-foreground">{toLabel(fvStartNow)}</div>
              </div>
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Start Late Corpus</div>
                <div className="text-lg font-bold text-[var(--color-accent)]">{toLabel(fvStartLate)}</div>
              </div>
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Wealth Lost</div>
                <div className="text-lg font-bold text-[#991B1B]">{toLabel(costOfDelay)}</div>
              </div>
              <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Extra DCA Needed</div>
                <div className="text-lg font-bold text-[#059669]">+{fmtUSD(extraSIP)}/mo</div>
              </div>
            </div>
          </div>

          {/* ── FAQ ── */}
          <section id="faq" aria-label="Cost of delay frequently asked questions" className="mt-10">
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
                    id={`delay-faq-${i}`}
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
                  { href: '/', icon: <Calculator className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Step-Up DCA Calculator', desc: 'Monthly DCA with step-up & inflation' },
                  { href: '/target-amount-calculator', icon: <Target className="w-4 h-4 text-[var(--color-accent)]" />, label: 'DCA Goal Calculator', desc: 'Time to reach $1 Million with DCA' },
                  { href: '/lumpsum-calculator', icon: <TrendingUp className="w-4 h-4 text-[var(--color-accent)]" />, label: 'Lumpsum Calculator', desc: 'One-time investment returns' },
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
