"use client";
import { useTheme } from 'next-themes';

import React, { useState, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowRight, HelpCircle, ShieldCheck, Info } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Roth IRA?', acceptedAnswer: { '@type': 'Answer', text: 'A Roth IRA is an individual retirement account that offers tax-free growth and tax-free withdrawals in retirement. Unlike a Traditional IRA, contributions are made with after-tax dollars, meaning you get no upfront tax deduction, but you owe no taxes when you withdraw the money after age 59½.' } },
    { '@type': 'Question', name: 'What is the maximum I can contribute to a Roth IRA?', acceptedAnswer: { '@type': 'Answer', text: 'For 2024, the contribution limit is $7,000 per year. If you are age 50 or older, you can make an additional $1,000 catch-up contribution, bringing the total limit to $8,000.' } },
    { '@type': 'Question', name: 'Can I withdraw money from my Roth IRA early?', acceptedAnswer: { '@type': 'Answer', text: 'You can withdraw your *contributions* (the money you put in) at any time, tax-free and penalty-free. However, if you withdraw your *earnings* before age 59½ and before the account has been open for at least 5 years, you will typically owe income taxes and a 10% early withdrawal penalty on the earnings.' } },
    { '@type': 'Question', name: 'Are there income limits for a Roth IRA?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. For 2024, if you are single, your ability to contribute directly begins to phase out at a MAGI of $138,000 and is completely phased out at $153,000. For married couples filing jointly, the phase-out range is $230,000 to $240,000.' } }
  ]
};

export default function RothIraCalculatorPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : (typeof isDark !== 'undefined' && isDark ? '#1A73E8' : '#1B3A5C');

  const [yearlyInvestment, setYearlyInvestment] = useState(7000);
  const [years, setYears] = useState(20);
  const [annualReturn, setAnnualReturn] = useState(9);

  const [results, setResults] = useState({
    invested: 0,
    returns: 0,
    total: 0
  });

  useEffect(() => {
    let balance = 0;
    let invested = 0;
    for (let i = 0; i < years; i++) {
      balance += yearlyInvestment;
      invested += yearlyInvestment;
      balance += balance * (annualReturn / 100);
    }
    setResults({
      invested: invested,
      returns: balance - invested,
      total: balance
    });
  }, [yearlyInvestment, years, annualReturn]);

  const chartData = {
    labels: ['Total Invested', 'Total Returns'],
    datasets: [
      {
        data: [results.invested, results.returns],
        backgroundColor: [accentColor, '#C4993C'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#8B95A5',
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 14
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
              }).format(context.parsed);
            }
            return label;
          }
        }
      }
    },
    cutout: '70%',
  };

  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">Roth IRA Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            See how your Roth IRA contributions grow tax-free over time. Adjust your yearly contribution, time horizon, and expected market returns to plan your retirement.
          </p>
        </div>

        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-gray-200">
            
            {/* Input Section */}
            <div className="p-6 md:p-10 space-y-8">
              <InputSlider
                label="Yearly Contribution"
                value={yearlyInvestment}
                onChange={setYearlyInvestment}
                min={500}
                max={7000}
                step={500}
                prefix="$"
                colorTheme="navy"
              />
              
              <InputSlider
                label="Time Period (Years)"
                value={years}
                onChange={setYears}
                min={5}
                max={40}
                step={1}
                suffix=" Yr"
                colorTheme="navy"
              />

              <InputSlider
                label="Expected Annual Return (%)"
                value={annualReturn}
                onChange={setAnnualReturn}
                min={5}
                max={15}
                step={0.5}
                suffix="%"
                colorTheme="navy"
              />

              {/* Tax-Free Advantage Callout to fill empty space */}
              <div className="bg-[rgba(5,150,105,0.05)] border border-[rgba(5,150,105,0.2)] p-5 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[var(--color-returns)]" />
                  <span className="text-[var(--color-returns)] font-bold text-sm">The 100% Tax-Free Advantage</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  In a standard taxable brokerage account, you could owe roughly <strong>{formatCurrency(results.returns * 0.15)}</strong> in long-term capital gains taxes (assuming a 15% rate) on these earnings. 
                  Because you are using a Roth IRA, your entire <strong>{formatCurrency(results.returns)}</strong> in gains is completely tax-free upon withdrawal in retirement.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="p-6 md:p-10 bg-[var(--background)]/50 flex flex-col justify-between">
              <div className="space-y-6 mb-8">
                <div className="bg-[var(--panel-bg)] p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Total Invested</p>
                    <p className="text-xl md:text-2xl font-bold text-[var(--color-accent)]">
                      {formatCurrency(results.invested)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
                    <span className="block w-3 h-3 rounded-full bg-[var(--color-accent)]"></span>
                  </div>
                </div>

                <div className="bg-[var(--panel-bg)] p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Est. Returns</p>
                    <p className="text-xl md:text-2xl font-bold text-[var(--color-returns)]">
                      {formatCurrency(results.returns)}
                    </p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-[#C4993C]/10 flex items-center justify-center">
                    <span className="block w-3 h-3 rounded-full bg-[#C4993C]"></span>
                  </div>
                </div>

                <div className="bg-[var(--color-accent)] p-6 rounded-xl shadow-md text-white">
                  <p className="text-white/80 font-medium mb-1">Total Maturity Value</p>
                  <p className="text-3xl md:text-4xl font-bold">
                    {formatCurrency(results.total)}
                  </p>
                </div>
              </div>

              <div className="relative h-[300px] w-full flex items-center justify-center">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            </div>

          </div>
        </div>

        {/* SEO Educational Content Section */}
        <div className="mt-16 glass-panel p-8 w-full rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Maximizing Your Roth IRA</h2>
          
          <div className="space-y-6 text-[#6B7280] dark:text-[#8B95A5] leading-relaxed">
                <p>
                    A <strong>Roth IRA</strong> (Individual Retirement Account) is one of the most powerful wealth-building tools available to US investors. Its primary advantage is that it allows your investments to compound completely tax-free over time.
                </p>

                <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">Tax-Free Growth and Withdrawals</h3>
                <p>
                    Unlike a Traditional IRA or a 401(k), where you get a tax break now but pay taxes on withdrawals in retirement, a Roth IRA works in reverse. You fund the account with money you&apos;ve already paid taxes on (after-tax dollars). The trade-off is that <em>all future growth, dividends, and withdrawals in retirement are 100% tax-free.</em>
                </p>

                <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Power of Time</h3>
                <p>
                    The Roth IRA is especially beneficial for young investors. Because younger workers are generally in a lower tax bracket now than they will be in retirement, paying taxes upfront is advantageous. More importantly, investing over decades means the vast majority of the account's final balance will consist of investment earnings, not original contributions. Shielding all of that growth from taxes can save you hundreds of thousands of dollars.
                </p>
                <p>
                    Use this calculator to see how a seemingly small annual contribution (like the $7,000 maximum) can grow into a massive, tax-free fortune over 30 or 40 years through the power of compound interest.
                </p>
            </div>
        </div>

        
        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the calculator" className="mt-12 w-full glass-panel p-6 md:p-8 rounded-3xl">
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

        {/* FAQ Section */}
        <div className="mt-12 glass-panel p-8 w-full rounded-3xl">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                {jsonLd.mainEntity.map((faq, i) => (
                    <div key={i} className="border-b border-[#E8E4DF] pb-4 last:border-0 last:pb-0">
                        <h3 className="text-foreground font-medium text-base flex items-start gap-2">
                            <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Cross Links */}
        <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] w-full rounded-3xl border border-[var(--color-accent)]/10">
            <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
            <div className="flex flex-wrap justify-center gap-3">
                <Link href="/us/tools/retirement-account-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                    401k/IRA Calculator <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/us/tools/fire-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                    FIRE Calculator
                </Link>
            </div>
        </div>

      </div>
    </div>
  );
}

