"use client";
import { useTheme } from 'next-themes';

import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import InputSlider from '@/components/InputSlider';
import Link from 'next/link';
import { ArrowRight, HelpCircle, Info } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What does FIRE stand for?', acceptedAnswer: { '@type': 'Answer', text: 'FIRE stands for Financial Independence, Retire Early. It is a movement dedicated to extreme savings and investment that allows proponents to retire far earlier than traditional budgets and retirement plans would allow.' } },
    { '@type': 'Question', name: 'Is the 4% rule still safe?', acceptedAnswer: { '@type': 'Answer', text: 'The 4% rule suggests you can safely withdraw 4% of your portfolio in the first year of retirement, adjusted for inflation subsequently, for 30 years. For extreme early retirees (40+ year horizons), many prefer a more conservative 3.25% to 3.5% safe withdrawal rate.' } },
    { '@type': 'Question', name: 'Do I need to account for taxes in my FIRE number?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The expenses you input into the FIRE calculator should include estimated taxes you will pay on withdrawals from EPF, NPS, or taxable mutual funds. PPF withdrawals are tax-free.' } },
    { '@type': 'Question', name: 'How does inflation affect my FIRE corpus?', acceptedAnswer: { '@type': 'Answer', text: 'The standard FIRE calculation (Expenses / SWR) gives you your target corpus in *today’s dollars*. As you save toward this goal over time, you must increase your target corpus annually to account for inflation, which is why having an expected return rate well above inflation is critical.' } }
  ]
};

export default function FireCalculatorPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = 'var(--color-accent)';

    const [annualExpenses, setAnnualExpenses] = useState(1200000);
    const [swr, setSwr] = useState(4);
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(45);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [inflationRate, setInflationRate] = useState(6);
    const [currentSavings, setCurrentSavings] = useState(0);

    const [results, setResults] = useState({
        targetCorpus: 0,
        sipNeeded: 0,
        totalInvested: 0,
        wealthGained: 0
    });

    useEffect(() => {
        const years = Math.max(0, retirementAge - currentAge);
        const inflatedExpenses = annualExpenses * Math.pow(1 + (inflationRate / 100), years);
        const corpus = inflatedExpenses / (swr / 100);
        
        const months = years * 12;
        const r = expectedReturn / 12 / 100;
        
        let fvSavings = currentSavings * Math.pow(1 + (expectedReturn/100), years);
        let remainingCorpus = Math.max(0, corpus - fvSavings);
        let sip = 0;
        
        if (months > 0 && r > 0) {
            // SIP calculation formula: P = FV / [ ( ( (1 + r)^n - 1 ) / r ) * (1 + r) ]
            sip = remainingCorpus / ( ( (Math.pow(1 + r, months) - 1) / r ) * (1 + r) );
        } else if (months > 0 && r === 0) {
            sip = remainingCorpus / months;
        }

        const invested = currentSavings + (sip * months);
        const gained = corpus - invested;

        setResults({
            targetCorpus: corpus,
            sipNeeded: sip,
            totalInvested: invested,
            wealthGained: gained
        });
    }, [annualExpenses, swr, currentAge, retirementAge, expectedReturn, currentSavings, inflationRate]);

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const chartData = {
        labels: ['Total Invested', 'Wealth Gained'],
        datasets: [
            {
                data: [results.totalInvested, results.wealthGained > 0 ? results.wealthGained : 0],
                backgroundColor: [accentColor, '#C4993C'], // Navy and Gold
                borderWidth: 0,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-[var(--background)] p-4 md:p-8 font-sans">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">FIRE Calculator</h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Calculate the corpus required for Financial Independence and Retire Early (FIRE) and find out the monthly SIP needed to reach your goal.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Inputs Section */}
                    <div className="lg:col-span-7 glass-panel p-6 md:p-8 rounded-2xl bg-[var(--panel-bg)] shadow-xl">
                        <div className="space-y-6">
                            <InputSlider
                                label="Annual Expenses (₹)"
                                value={annualExpenses}
                                onChange={setAnnualExpenses}
                                min={100000}
                                max={10000000}
                                step={10000}
                                prefix="₹"
                            />
                            
                            <InputSlider
                                label="Safe Withdrawal Rate (%)"
                                value={swr}
                                onChange={setSwr}
                                min={1}
                                max={10}
                                step={0.1}
                                suffix="%"
                            />

                            <InputSlider
                                label="Current Age (Years)"
                                value={currentAge}
                                onChange={setCurrentAge}
                                min={18}
                                max={60}
                                step={1}
                            />

                            <InputSlider
                                label="Retirement Age (Years)"
                                value={retirementAge}
                                onChange={setRetirementAge}
                                min={currentAge + 1}
                                max={70}
                                step={1}
                            />

                            <InputSlider
                                label="Expected Return (%)"
                                value={expectedReturn}
                                onChange={setExpectedReturn}
                                min={1}
                                max={30}
                                step={0.5}
                                suffix="%"
                            />

                            <InputSlider
                                label="Expected Inflation (%)"
                                value={inflationRate}
                                onChange={setInflationRate}
                                min={0}
                                max={15}
                                step={0.5}
                                suffix="%"
                            />

                            <InputSlider
                                label="Current Savings (₹)"
                                value={currentSavings}
                                onChange={setCurrentSavings}
                                min={0}
                                max={50000000}
                                step={50000}
                                prefix="₹"
                            />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <div className="p-6 rounded-2xl bg-[var(--color-accent)] text-white shadow-xl">
                            <h3 className="text-lg font-medium opacity-90 mb-2">Target FIRE Corpus</h3>
                            <div className="text-4xl font-bold mb-4">{formatCurrency(results.targetCorpus)}</div>
                            <div className="pt-4 border-t border-white/20">
                                <p className="text-sm opacity-80 mb-1">Required Monthly SIP</p>
                                <p className="text-2xl font-semibold text-[var(--color-returns)] bg-[var(--panel-bg)] inline-block px-3 py-1 rounded-lg">
                                    {formatCurrency(results.sipNeeded)}
                                </p>
                            </div>
                        </div>

                        <div className="glass-panel p-6 rounded-2xl bg-[var(--panel-bg)] shadow-xl">
                            <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">Investment Breakdown</h3>
                            
                            <div className="w-48 h-48 mx-auto mb-6">
                                <Pie 
                                    data={chartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: { display: false }
                                        }
                                    }}
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-[var(--background)] rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[var(--color-accent)]"></div>
                                        <span className="text-gray-600 dark:text-gray-400">Total Invested</span>
                                    </div>
                                    <span className="font-semibold text-[var(--color-accent)]">
                                        {formatCurrency(results.totalInvested)}
                                    </span>
                                </div>
                                
                                <div className="flex justify-between items-center p-3 bg-[var(--background)] rounded-lg">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-[#C4993C]"></div>
                                        <span className="text-gray-600 dark:text-gray-400">Wealth Gained</span>
                                    </div>
                                    <span className="font-semibold text-[var(--color-returns)]">
                                        {formatCurrency(results.wealthGained)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SEO Educational Content Section */}
                <div className="mt-16 glass-panel p-8 w-full rounded-3xl">
                    <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Mastering the FIRE Movement</h2>
                    
                    <div className="space-y-6 text-[#6B7280] dark:text-[#8B95A5] leading-relaxed">
                        <p>
                            <strong>Financial Independence, Retire Early (FIRE)</strong> is more than just a financial goal—it&apos;s a lifestyle shift. By aggressively saving a high percentage of your income (often 50% or more) and investing it in low-cost index funds, you can build a massive portfolio that sustains your living expenses indefinitely.
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Math Behind FIRE: The 4% Rule</h3>
                        <p>
                            The foundation of FIRE is the <em>4% Rule</em>, derived from the famous Trinity Study. It states that if you withdraw 4% of your total portfolio value in your first year of retirement, and adjust that amount for inflation each subsequent year, your portfolio is highly likely to last for at least 30 years without running out. 
                        </p>
                        <p>
                            To find your FIRE number, simply divide your annual expenses by your Safe Withdrawal Rate (SWR). For a 4% SWR, this is equivalent to multiplying your annual expenses by 25. If you spend ₹12 Lakhs a year, you need ₹3 Crores to retire (₹12L × 25).
                        </p>

                        <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">Adjusting for Extreme Early Retirement</h3>
                        <p>
                            If you plan to retire in your 30s or 40s, your money needs to last 40 to 50 years, not just 30. Because of this longer time horizon, many FIRE practitioners opt for a more conservative SWR of <strong>3.25% to 3.5%</strong>. This increases the required target corpus but provides a significantly higher margin of safety against prolonged market downturns.
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
                                <p className="text-[#6B7280] dark:text-[#8B95A5] text-sm mt-2 ml-7 leading-relaxed">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Cross Links */}
                <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] w-full rounded-3xl border border-[var(--color-accent)]/10">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href="/tools/sip-to-reach-1-crore" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                            SIP to reach 1 Crore <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link href="/tools/ppf-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                            PPF Calculator
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
