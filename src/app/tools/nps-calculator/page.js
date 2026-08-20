"use client";
import { useTheme } from 'next-themes';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InputSlider from '@/components/InputSlider';
import Link from 'next/link';
import { ArrowRight, HelpCircle, Info } from 'lucide-react';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is the National Pension System (NPS)?', acceptedAnswer: { '@type': 'Answer', text: 'NPS is a voluntary, long-term retirement savings scheme managed by the PFRDA and Government of India. It allows you to invest in a mix of equity, corporate bonds, and government securities to build a retirement corpus.' } },
    { '@type': 'Question', name: 'How much tax can I save with NPS?', acceptedAnswer: { '@type': 'Answer', text: 'If you opt for the Old Tax Regime, NPS offers an exclusive additional tax deduction of ₹50,000 under Section 80CCD(1B). However, under the default New Tax Regime, this ₹50,000 deduction is no longer available, and only employer contributions remain tax-exempt.' } },
    { '@type': 'Question', name: 'What happens at maturity (Age 60) in NPS?', acceptedAnswer: { '@type': 'Answer', text: 'At age 60, you can withdraw up to 60% of your total accumulated corpus completely tax-free as a lump sum. The remaining 40% MUST be used to purchase an Annuity plan, which provides a regular monthly pension that is taxable as per your income slab.' } },
    { '@type': 'Question', name: 'Can I withdraw money from NPS before age 60?', acceptedAnswer: { '@type': 'Answer', text: 'NPS is highly illiquid by design. You can make partial withdrawals up to 25% of your own contributions for specific reasons (children\'s education, marriage, house purchase, critical illness) after completing 3 years. Premature exit before 60 requires 80% to go to annuity.' } }
  ]
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function NpsCalculatorPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : '#1B3A5C';

  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [annuityReturn, setAnnuityReturn] = useState(6);
  const [expectedInflation, setExpectedInflation] = useState(6);
  
  // Results
  const [totalInvested, setTotalInvested] = useState(0);
  const [totalCorpus, setTotalCorpus] = useState(0);
  const [totalGains, setTotalGains] = useState(0);
  const [lumpSumAmount, setLumpSumAmount] = useState(0);
  const [annuityAmount, setAnnuityAmount] = useState(0);
  const [monthlyPension, setMonthlyPension] = useState(0);
  const [inflationAdjustedPension, setInflationAdjustedPension] = useState(0);
  const [costOfDelay, setCostOfDelay] = useState(0);

  useEffect(() => {
    calculateNps();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthlyContribution, currentAge, expectedReturn, annuityReturn, expectedInflation]);

  const calculateNps = () => {
    const yearsToInvest = 60 - currentAge;
    const monthsToInvest = yearsToInvest * 12;
    const monthlyRate = expectedReturn / 12 / 100;
    
    let futureValue = 0;
    if (monthsToInvest > 0) {
      if (expectedReturn === 0) {
        futureValue = monthlyContribution * monthsToInvest;
      } else {
        futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate) * (1 + monthlyRate);
      }
    }

    // Cost of Delay Calculation (Delaying by 5 years)
    let delayedFutureValue = 0;
    const delayedYears = Math.max(0, yearsToInvest - 5);
    const delayedMonths = delayedYears * 12;
    if (delayedMonths > 0) {
      if (expectedReturn === 0) {
        delayedFutureValue = monthlyContribution * delayedMonths;
      } else {
        delayedFutureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, delayedMonths) - 1) / monthlyRate) * (1 + monthlyRate);
      }
    }
    const wealthLost = Math.max(0, futureValue - delayedFutureValue);
    
    const invested = monthlyContribution * (monthsToInvest > 0 ? monthsToInvest : 0);
    const gains = futureValue - invested;
    const lumpSum = futureValue * 0.6;
    const annuity = futureValue * 0.4;
    const pension = (annuity * (annuityReturn / 100)) / 12;
    
    // Calculate the purchasing power of this pension in today's money
    const adjustedPension = pension / Math.pow(1 + (expectedInflation / 100), yearsToInvest);

    setTotalInvested(Math.round(invested));
    setTotalCorpus(Math.round(futureValue));
    setTotalGains(Math.round(gains));
    setLumpSumAmount(Math.round(lumpSum));
    setAnnuityAmount(Math.round(annuity));
    setMonthlyPension(Math.round(pension));
    setInflationAdjustedPension(Math.round(adjustedPension));
    setCostOfDelay(Math.round(wealthLost));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const chartData = {
    labels: ['Total Invested', 'Estimated Returns'],
    datasets: [
      {
        data: [totalInvested, totalGains],
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
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 14,
          }
        },
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.raw !== null) {
              label += formatCurrency(context.raw);
            }
            return label;
          }
        }
      }
    },
  };

  return (
    <div className="min-h-screen pb-12 bg-[var(--background)] font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">NPS Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Plan your retirement with the National Pension System. Calculate your expected corpus, tax-free lump sum, and monthly pension at age 60.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Input Section */}
          <div className="w-full lg:w-7/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full">
              <div className="space-y-8">
                <InputSlider
                  label="Monthly Investment"
                  value={monthlyContribution}
                  min={500}
                  max={150000}
                  step={500}
                  onChange={setMonthlyContribution}
                  prefix="₹"
                  id="monthly-investment"
                />

                <InputSlider
                  label="Your Current Age"
                  value={currentAge}
                  min={18}
                  max={55}
                  step={1}
                  onChange={setCurrentAge}
                  suffix=" Yrs"
                  id="current-age"
                />

                <InputSlider
                  label="Expected Return (p.a)"
                  value={expectedReturn}
                  min={1}
                  max={15}
                  step={0.5}
                  onChange={setExpectedReturn}
                  suffix="%"
                  id="expected-return"
                />

                <InputSlider
                  label="Expected Return on Annuity"
                  value={annuityReturn}
                  min={4}
                  max={12}
                  step={0.5}
                  onChange={setAnnuityReturn}
                  suffix="%"
                  id="annuity-return"
                />

                <InputSlider
                  label="Expected Inflation Rate"
                  value={expectedInflation}
                  min={2}
                  max={10}
                  step={0.5}
                  onChange={setExpectedInflation}
                  suffix="%"
                  id="expected-inflation"
                />
              </div>

              {/* Dynamic Insight Block */}
              {costOfDelay > 0 && (
                <div className="mt-8 p-5 bg-[#991B1B]/10 border border-[#991B1B]/20 rounded-xl">
                  <h4 className="text-[#991B1B] font-bold mb-2">The Cost of Delay</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    If you delay starting this NPS investment by just <strong>5 years</strong>, you will lose out on <strong className="text-[#991B1B]">{formatCurrency(costOfDelay)}</strong> from your final retirement corpus due to lost compound interest.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Result Section */}
          <div className="w-full lg:w-5/12">
            <div className="glass-panel p-6 md:p-8 rounded-2xl shadow-sm h-full flex flex-col">
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-6">Retirement Corpus (Age 60)</h2>
              
              <div className="flex flex-col gap-6 flex-grow">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[var(--background)] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Invested</p>
                    <p className="text-lg font-bold text-[var(--color-accent)]">{formatCurrency(totalInvested)}</p>
                  </div>
                  <div className="bg-[var(--background)] p-4 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Est. Returns</p>
                    <p className="text-lg font-bold text-[var(--color-returns)]">{formatCurrency(totalGains)}</p>
                  </div>
                  <div className="bg-[var(--background)] p-4 rounded-xl col-span-2 text-center border border-[var(--color-accent)]/10">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Corpus</p>
                    <p className="text-2xl font-bold text-[var(--foreground)]">{formatCurrency(totalCorpus)}</p>
                  </div>
                </div>

                {/* Chart */}
                <div className="relative h-[256px] min-h-[256px] max-h-[256px] w-full my-4 flex-shrink-0">
                  <Pie data={chartData} options={chartOptions} />
                </div>

                {/* Withdrawal Details */}
                <div className="mt-auto space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-[var(--foreground)] text-lg">Withdrawal Plan</h3>
                  
                  <div className="flex justify-between items-center p-3 bg-[var(--panel-bg)] rounded-lg shadow-sm">
                    <div>
                      <p className="text-sm font-medium text-[var(--foreground)]">Tax-free Lump Sum (60%)</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Amount you can withdraw</p>
                    </div>
                    <p className="font-bold text-[var(--foreground)] text-lg">{formatCurrency(lumpSumAmount)}</p>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[var(--panel-bg)] rounded-lg shadow-sm border border-l-4 border-l-[#1B3A5C]">
                    <div>
                      <p className="text-sm font-medium text-[var(--color-accent)]">Nominal Monthly Pension</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Future value at age 60</p>
                    </div>
                    <p className="font-bold text-[var(--color-returns)] text-xl">{formatCurrency(monthlyPension)}</p>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[var(--panel-bg)] rounded-lg shadow-sm border border-l-4 border-l-[#991B1B]">
                    <div>
                      <p className="text-sm font-medium text-[#991B1B]">Inflation-Adjusted Pension</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">True purchasing power in today's money</p>
                    </div>
                    <p className="font-bold text-[#991B1B] text-xl">{formatCurrency(inflationAdjustedPension)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Educational Content Section */}
      <div className="mt-16 glass-panel p-8 w-full rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Mastering NPS Investing</h2>
          
          <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                  Building a secure retirement requires consistent saving and taking advantage of retirement-focused accounts like the <strong>National Pension System (NPS)</strong>. 
                  However, be aware of recent tax changes: If you opt for the <strong>Old Tax Regime</strong>, NPS provides an exclusive ₹50,000 tax deduction under Section 80CCD(1B), saving you up to ₹15,600 annually in the 30% bracket. <strong>If you use the New Tax Regime (the default for most), this ₹50,000 deduction is NO LONGER available.</strong> Only employer contributions (up to 14% of basic salary) remain tax-exempt under the new regime.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">Tier I vs Tier II Accounts</h3>
              <p>
                  The NPS comes with two account types. The <strong>Tier I account</strong> is the mandatory retirement account with strict lock-in rules until age 60. The <strong>Tier II account</strong> is a voluntary investment account with no lock-in (you can withdraw anytime), but it offers no tax benefits whatsoever.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The 60/40 Rule at Maturity</h3>
              <p>
                  NPS is unique because of what happens when you turn 60. You are allowed to withdraw a maximum of <strong>60% of your corpus completely tax-free</strong>. You are forced by law to use the remaining <strong>40% to buy an annuity</strong> (a fixed pension product) from a life insurance company. While the annuity guarantees a monthly payout for life, the returns are typically low (~5.5% to 6.5%), and the monthly pension is taxable as per your income slab.
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
                  <div key={i} className="border-b border-[var(--color-accent)]/10 pb-4 last:border-0 last:pb-0">
                      <h3 className="text-[var(--foreground)] font-medium text-base flex items-start gap-2">
                          <HelpCircle className="w-5 h-5 text-[var(--color-accent)] flex-shrink-0 mt-0.5" /> {faq.name}
                      </h3>
                      <p className="text-[#6B7280] text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                  </div>
              ))}
          </div>
      </div>

      {/* Cross Links */}
      <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] w-full rounded-3xl border border-[var(--color-accent)]/10 mb-8">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/ppf-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                  PPF Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tools/retirement-sip-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                  Retirement SIP
              </Link>
          </div>
      </div>

    </div>
  );
}
