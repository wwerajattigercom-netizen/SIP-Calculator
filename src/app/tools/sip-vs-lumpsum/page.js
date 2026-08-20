"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState, useMemo } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { ArrowRight, HelpCircle, TrendingUp, TrendingDown, Minus, Info } from 'lucide-react';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function formatToShortWords(val) {
  if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
  if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(2)} K`;
  return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

/**
 * Build a month-by-month NAV series for the chosen scenario.
 * NAV starts at ₹10.
 *
 * Bull     → Steady growth every month at the entered return rate.
 * Bear     → NAV drops a TRUE 40% from peak over the first 40% of the
 *             period (crash rate computed exactly as 0.60^(1/crashMonths)−1),
 *             then grows at a back-solved recovery rate to reach ~85% of the
 *             bull final NAV. This means on the chart the lumpsum value
 *             visibly falls below the invested amount during the crash.
 * Volatile → Alternates between high-growth and mild-decline 6-month cycles.
 *             The average return is close to the entered rate, but the
 *             NAV swings create opportunities for rupee-cost averaging.
 */
function buildNavSeries(annualReturnPct, totalMonths, scenario) {
  const startNav = 10;
  const nav = [startNav];
  const bullMonthly = Math.pow(1 + annualReturnPct / 100, 1 / 12) - 1;

  if (scenario === 'bull') {
    for (let m = 1; m <= totalMonths; m++) {
      nav.push(nav[nav.length - 1] * (1 + bullMonthly));
    }

  } else if (scenario === 'bear') {
    // ── Crash phase: first 40% of total period ──────────────────────
    const crashMonths    = Math.round(totalMonths * 0.4);
    const recoveryMonths = totalMonths - crashMonths;

    // Exact monthly rate that produces a cumulative −40% drop:
    // (1 + crashRate)^crashMonths = 0.60  →  crashRate = 0.60^(1/crashMonths) − 1
    const DROP = 0.40; // 40% peak-to-trough drop
    const crashRate = Math.pow(1 - DROP, 1 / crashMonths) - 1; // negative

    // NAV at crash bottom
    const bottomNav = startNav * Math.pow(1 + crashRate, crashMonths);

    // ── Recovery phase: back-solve rate to reach target final NAV ───
    // Target ≈ 85% of what a pure bull run would achieve (bear still lags)
    const bullFinalNav    = startNav * Math.pow(1 + bullMonthly, totalMonths);
    const targetFinalNav  = bullFinalNav * 0.85;
    // (1 + recoveryRate)^recoveryMonths = targetFinalNav / bottomNav
    const recoveryRate = Math.pow(targetFinalNav / bottomNav, 1 / recoveryMonths) - 1;

    for (let m = 1; m <= totalMonths; m++) {
      const prev = nav[nav.length - 1];
      nav.push(prev * (1 + (m <= crashMonths ? crashRate : recoveryRate)));
    }

  } else {
    // ── Volatile: alternate 6-month surge / 6-month dip cycles ──────
    // Surge rate is high, dip rate is mildly negative.
    // Net geometric mean stays close to bullMonthly.
    const surgeRate = bullMonthly * 2.2;                // ~high months
    const dipRate   = -(bullMonthly * 0.55);            // ~mild decline months
    for (let m = 1; m <= totalMonths; m++) {
      const prev  = nav[nav.length - 1];
      const cycle = Math.floor((m - 1) / 6) % 2;      // 0 = surge, 1 = dip
      nav.push(prev * (1 + (cycle === 0 ? surgeRate : dipRate)));
    }
  }

  return nav; // length = totalMonths + 1  (index 0 = starting NAV)
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Is SIP better than lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'SIP is generally better for salaried individuals and in volatile or bearish markets due to rupee cost averaging. Lump sum can be better in a consistent bull market.' } },
    { '@type': 'Question', name: 'Should I invest lump sum during a market crash?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — if you already have a large corpus and can time the bottom, a lump sum during a crash can beat SIP. But timing the market reliably is very difficult.' } },
    { '@type': 'Question', name: 'What is rupee cost averaging in SIP?', acceptedAnswer: { '@type': 'Answer', text: 'Rupee cost averaging means you buy more units when prices are low and fewer units when prices are high, averaging out your cost per unit over time.' } },
    { '@type': 'Question', name: 'Can I do both SIP and lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Maintain a regular SIP from your monthly salary and deploy lump sums (like bonuses or tax refunds) during market corrections.' } },
    { '@type': 'Question', name: 'Which is better for long-term — SIP or lump sum?', acceptedAnswer: { '@type': 'Answer', text: 'For 10+ years, lump sum slightly edges out in a steadily rising market, while SIP outperforms in volatile or downward-then-recovery markets.' } },
  ],
};

const SCENARIO_META = {
  bull: {
    label: 'Bull Market',
    color: '#059669',
    icon: TrendingUp,
    desc: 'Steady, consistent growth every month. Lumpsum gets more time in the market.',
    tag: 'Consistent Growth',
  },
  bear: {
    label: 'Bear then Recovery',
    color: '#991B1B',
    icon: TrendingDown,
    desc: 'Market drops for ~40% of the period, then recovers. SIP buys cheap units during the crash.',
    tag: 'Crash + Recovery',
  },
  volatile: {
    label: 'Volatile Market',
    color: '#059669',
    icon: Minus,
    desc: 'Alternating surges and dips every 6 months. SIP benefits from buying more units during dips.',
    tag: 'High Swings',
  },
};

export default function SipVsLumpsumPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  const isDark = mounted && (theme === 'dark' || (theme === 'system' && systemTheme === 'dark'));

  const [totalAmount, setTotalAmount] = useState(500000);
  const [returnRate, setReturnRate] = useState(12);
  const [duration, setDuration] = useState(10);
  const [scenario, setScenario] = useState('bull');

  const { chartConfig, finalSip, finalLumpsum } = useMemo(() => {
    const totalMonths = duration * 12;
    const monthlySip = totalAmount / totalMonths;

    // Build NAV series for this scenario
    const nav = buildNavSeries(returnRate, totalMonths, scenario);

    // Lumpsum: buy all units at NAV[0], value = units × NAV[month]
    const startNav = nav[0];
    const lumpsumUnits = totalAmount / startNav;

    // SIP: each month buy monthlySip / NAV[month] units
    let sipUnits = 0;
    const labels = [];
    const lumpsumData = [];
    const sipData = [];

    for (let year = 1; year <= duration; year++) {
      const monthIdx = year * 12;
      // accumulate SIP units up to this month
      // (we compute year-end snapshot)
      if (year === 1) {
        for (let m = 1; m <= 12; m++) {
          sipUnits += monthlySip / nav[m];
        }
      } else {
        for (let m = (year - 1) * 12 + 1; m <= year * 12; m++) {
          sipUnits += monthlySip / nav[m];
        }
      }
      const currentNav = nav[monthIdx];
      labels.push(`Year ${year}`);
      lumpsumData.push(lumpsumUnits * currentNav);
      sipData.push(sipUnits * currentNav);
    }

    return {
      chartConfig: {
        labels,
        datasets: [
          {
            label: 'Lumpsum Value',
            data: lumpsumData,
            borderColor: '#C4993C',
            backgroundColor: 'rgba(196,153,60,0.08)',
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          },
          {
            label: 'SIP Value',
            data: sipData,
            borderColor: (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C'),
            backgroundColor: (typeof isDark !== 'undefined' && isDark ? 'rgba(26,115,232,0.08)' : 'rgba(27,58,92,0.08)'),
            borderWidth: 2.5,
            pointRadius: 0,
            fill: false,
            tension: 0.4,
          },
        ],
      },
      finalLumpsum: lumpsumData[lumpsumData.length - 1],
      finalSip: sipData[sipData.length - 1],
    };
  }, [totalAmount, returnRate, duration, scenario]);

  const winner = finalLumpsum > finalSip ? 'Lumpsum' : 'SIP';
  const diff = Math.abs(finalLumpsum - finalSip);
  const meta = SCENARIO_META[scenario];
  const ScenarioIcon = meta.icon;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-6xl w-full mx-auto space-y-8">

          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Tools', href: '/tools' }, { label: 'SIP vs Lumpsum' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Comparison · Investing Strategy</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                SIP vs Lumpsum:  Which Investment Strategy is Better?
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Should you invest your money all at once (Lumpsum) or spread it over time (SIP)?
                Test both strategies across Bull, Bear, and Volatile market scenarios — and see which one wins with real NAV-based simulation.
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
                    label="Total Investment Amount"
                    value={totalAmount}
                    min={10000}
                    max={10000000}
                    step={10000}
                    onChange={setTotalAmount}
                    formatFn={(v) => formatToShortWords(v)}
                  />
                  <InputSlider
                    label="Expected Annual Return"
                    value={returnRate}
                    min={4}
                    max={24}
                    step={0.5}
                    onChange={setReturnRate}
                    formatFn={(v) => `${v}%`}
                  />
                  <InputSlider
                    label="Investment Duration"
                    value={duration}
                    min={3}
                    max={30}
                    step={1}
                    onChange={setDuration}
                    formatFn={(v) => `${v} Yr`}
                  />
                </div>

                {/* Market Scenario toggle */}
                <div className="mt-6">
                  <label className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider mb-3 block">Market Scenario</label>
                  <div className="flex gap-2 bg-[var(--panel-bg)] p-1.5 rounded-xl border border-[#E8E4DF]">
                    {Object.entries(SCENARIO_META).map(([key, s]) => (
                      <button
                        key={key}
                        onClick={() => setScenario(key)}
                        style={scenario === key ? { backgroundColor: s.color } : {}}
                        className={`flex-1 py-2 px-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                          scenario === key ? 'text-foreground shadow-lg' : 'text-gray-500 dark:text-gray-400 hover:text-foreground hover:bg-black/5'
                        }`}
                      >
                        {key === 'bull' ? '📈 Bull' : key === 'bear' ? '📉 Bear' : '〰️ Volatile'}
                      </button>
                    ))}
                  </div>

                  {/* Scenario description card */}
                  <div
                    className="mt-3 flex items-start gap-3 rounded-xl border p-3"
                    style={{ borderColor: `${meta.color}30`, backgroundColor: `${meta.color}0D` }}
                  >
                    <ScenarioIcon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: meta.color }} />
                    <div>
                      <p className="text-xs font-semibold" style={{ color: meta.color }}>{meta.label} — {meta.tag}</p>
                      <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">{meta.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="md:col-span-7">
              <div className="glass-panel p-6 flex flex-col gap-5 h-full">

                {/* Result cards */}
                <div className="grid grid-cols-2 gap-4">
                  {/* SIP card */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    winner === 'SIP'
                      ? 'border-[var(--color-accent)] bg-[rgba(27,58,92,0.08)] shadow-[0_0_24px_rgba(27,58,92,0.15)]'
                      : 'border-white/8 bg-white/3'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">SIP</span>
                      {winner === 'SIP' && (
                        <span className="text-[var(--color-accent)] text-[9px] font-bold px-2 py-0.5 bg-[var(--color-accent)]/20 rounded-full border border-[var(--color-accent)]/30">WINNER 🏆</span>
                      )}
                    </div>
                    <div className="text-xl font-bold text-foreground">{formatToShortWords(finalSip)}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Invested: {formatToShortWords(totalAmount)}</div>
                    <div className="text-[10px] text-[var(--color-accent)] mt-0.5">
                      {((finalSip / totalAmount - 1) * 100).toFixed(1)}% total return
                    </div>
                  </div>

                  {/* Lumpsum card */}
                  <div className={`p-5 rounded-2xl border transition-all ${
                    winner === 'Lumpsum'
                      ? 'border-[#C4993C] bg-[rgba(196,153,60,0.08)] shadow-[0_0_24px_rgba(196,153,60,0.15)]'
                      : 'border-white/8 bg-white/3'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold uppercase tracking-wider">Lumpsum</span>
                      {winner === 'Lumpsum' && (
                        <span className="text-[#C4993C] text-[9px] font-bold px-2 py-0.5 bg-[#C4993C]/20 rounded-full border border-[#C4993C]/30">WINNER 🏆</span>
                      )}
                    </div>
                    <div className="text-xl font-bold text-foreground">{formatToShortWords(finalLumpsum)}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Invested: {formatToShortWords(totalAmount)}</div>
                    <div className="text-[10px] text-[#C4993C] mt-0.5">
                      {((finalLumpsum / totalAmount - 1) * 100).toFixed(1)}% total return
                    </div>
                  </div>
                </div>

                {/* Verdict banner */}
                <div className="bg-[var(--panel-bg)] border border-[#E8E4DF] rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    In a <strong className="text-foreground">{meta.label}</strong>,{' '}
                    <strong style={{ color: winner === 'SIP' ? 'var(--color-accent)' : '#C4993C' }}>{winner}</strong>{' '}
                    wins by{' '}
                    <strong className="text-foreground">{formatToShortWords(diff)}</strong>
                    {winner === 'SIP'
                      ? ' — rupee cost averaging locks in cheap units during the downturn.'
                      : ' — more time in the market gives lumpsum a compounding edge.'}
                  </p>
                </div>

                {/* Chart */}
                <div className="w-full h-[240px]">
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
                          ticks: { color: '#8B95A5', callback: (v) => formatToShortWords(v) },
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
                          callbacks: {
                            label: (ctx) => ` ${ctx.dataset.label}: ${formatToShortWords(ctx.parsed.y)}`,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Market Crash Buffer (Dynamic Insight) */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-[#991B1B] bg-opacity-10 border border-[#991B1B]/20 p-2 rounded-xl">
                <TrendingDown className="w-5 h-5 text-[var(--color-loss)]" />
              </div>
              <h2 className="text-xl font-bold text-foreground">Market Crash Buffer Analysis</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Imagine a sudden <strong>20% market crash</strong> tomorrow. If you invested your entire <strong>{formatToShortWords(totalAmount)}</strong> as a lumpsum today, you would immediately face a paper loss of <strong className="text-[var(--color-loss)]">{formatToShortWords(totalAmount * 0.20)}</strong>.
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mt-2">
              However, with a <strong>SIP</strong>, you only expose a small fraction of your capital to the immediate drop. More importantly, your future monthly installments will automatically buy units at the new 20% discount, significantly lowering your average cost per unit and accelerating your recovery when the market rebounds.
            </p>
          </div>

          {/* Hybrid Approach / STP */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-3">The Hybrid Approach: Systematic Transfer Plan (STP)</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              What if you just received a large windfall (like a bonus, inheritance, or property sale)? Leaving it in a low-interest bank account while you slowly SIP over 3 years means losing out to inflation. But investing it all at once (Lumpsum) exposes you to bad market timing.
            </p>
            <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
              <h4 className="text-foreground font-semibold text-sm mb-3">The Solution:</h4>
              <ul className="list-disc list-outside ml-5 text-sm text-gray-500 dark:text-gray-400 space-y-2">
                <li>Park the entire <strong>{formatToShortWords(totalAmount)}</strong> in a relatively safe, interest-bearing asset (like a Liquid Mutual Fund or Arbitrage Fund).</li>
                <li>Set up an automated monthly transfer (STP) to move a fixed amount from this safe asset into your target equity index fund.</li>
                <li><strong>Result:</strong> Your uninvested cash earns 6-7% interest safely, while your equity investments still benefit from Rupee Cost Averaging.</li>
              </ul>
            </div>
          </div>

          {/* Quick-reference table */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">When Does Each Strategy Win?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/5">
                    <th className="py-2 pr-4 text-gray-500 dark:text-gray-400 font-semibold">Market Condition</th>
                    <th className="py-2 pr-4 text-[var(--color-accent)] font-semibold">Lumpsum</th>
                    <th className="py-2 text-[var(--color-accent)] font-semibold">SIP</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 dark:text-gray-400">
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4">📈 Steady Bull Market</td>
                    <td className="py-3 pr-4 text-[var(--color-returns)] font-semibold">Wins ✅</td>
                    <td className="py-3">Good, but lags</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4">📉 Crash then Recovery</td>
                    <td className="py-3 pr-4">Suffers early loss</td>
                    <td className="py-3 text-[var(--color-returns)] font-semibold">Wins ✅ (buys cheap)</td>
                  </tr>
                  <tr className="border-b border-[#E8E4DF]">
                    <td className="py-3 pr-4">〰️ Choppy / Volatile</td>
                    <td className="py-3 pr-4">Inconsistent</td>
                    <td className="py-3 text-[var(--color-returns)] font-semibold">Wins ✅ (rupee-cost avg)</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4">💼 Salaried investor</td>
                    <td className="py-3 pr-4">Requires lump sum upfront</td>
                    <td className="py-3 text-[var(--color-returns)] font-semibold">Natural fit ✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6 space-y-6">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">Rupee Cost Averaging — SIP's Hidden Advantage</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                When the market falls, your fixed monthly SIP buys <em>more</em> units at a lower price. When the market recovers,
                those extra low-cost units multiply in value. This automatic mechanism — called <strong className="text-foreground">Rupee Cost Averaging</strong> — makes
                SIP naturally outperform Lumpsum in volatile or bearish markets, without requiring any market timing.
              </p>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">What Historical Data Shows</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Backtests on the Nifty 50 over 20-year rolling periods show that Lumpsum investments generate slightly higher absolute returns
                in a continuously rising market. However, during periods like 2008 (GFC) or 2020 (COVID crash), SIP investors saw significantly
                better outcomes because they accumulated units at market lows. Most retail investors benefit more from SIP for this reason.
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
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-4">Explore More Calculators</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                SIP Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/lumpsum-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                Lumpsum Calculator
              </Link>
              <Link href="/cagr-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                CAGR Calculator
              </Link>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-6">Disclaimer: Mutual fund investments are subject to market risks. Read all scheme related documents carefully.</p>
          </div>

        </article>
      </main>
    </>
  );
}
