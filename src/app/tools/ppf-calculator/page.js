"use client";
import { useTheme } from 'next-themes';

import React, { useState, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Link from 'next/link';
import { ArrowRight, HelpCircle } from 'lucide-react';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is a Public Provident Fund (PPF)?', acceptedAnswer: { '@type': 'Answer', text: 'PPF is a popular long-term investment scheme backed by the Government of India. It offers guaranteed returns and comes with Exempt-Exempt-Exempt (EEE) tax benefits, meaning the investment, interest earned, and maturity amount are all completely tax-free.' } },
    { '@type': 'Question', name: 'How is PPF different from Equity Mutual Funds?', acceptedAnswer: { '@type': 'Answer', text: 'PPF is a fixed-income instrument with guaranteed returns set by the government (currently ~7.1%), making it virtually risk-free. Equity Mutual Funds invest in the stock market and offer higher potential returns (10-12%+) but come with market risks and taxation on gains.' } },
    { '@type': 'Question', name: 'When can I withdraw money from my PPF?', acceptedAnswer: { '@type': 'Answer', text: 'A PPF account has a strict lock-in period of 15 years. Partial withdrawals are allowed from the 7th financial year onwards under specific conditions. After 15 years, you can withdraw the entire maturity amount tax-free or extend the account in blocks of 5 years.' } },
    { '@type': 'Question', name: 'What is the maximum amount I can invest in PPF?', acceptedAnswer: { '@type': 'Answer', text: 'You can invest a maximum of ₹1.5 Lakhs per financial year in a PPF account. This entire amount is eligible for tax deduction under Section 80C of the Income Tax Act.' } }
  ]
};

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PpfCalculatorPage() {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const isDark = mounted && (theme === 'system' ? systemTheme : theme) === 'dark';
  const accentColor = isDark ? '#1A73E8' : '#1B3A5C';

  const [yearlyInvestment, setYearlyInvestment] = useState(150000);
  const [years, setYears] = useState(15);
  const interestRate = 7.1; // Fixed PPF rate

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
      balance += balance * (interestRate / 100);
    }
    setResults({
      invested: invested,
      returns: balance - invested,
      total: balance
    });
  }, [yearlyInvestment, years]);

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
              label += new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
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
    new Intl.NumberFormat('en-IN', { 
      style: 'currency', 
      currency: 'INR', 
      maximumFractionDigits: 0 
    }).format(val);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">PPF Calculator</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Calculate your maturity amount and returns on your Public Provident Fund (PPF) investment.
          </p>
        </div>

        <div className="glass-panel rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-sm border border-white/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x divide-gray-200">
            
            {/* Input Section */}
            <div className="p-6 md:p-10 space-y-8">
              <InputSlider
                label="Yearly Investment"
                value={yearlyInvestment}
                onChange={setYearlyInvestment}
                min={500}
                max={150000}
                step={500}
                prefix="₹"
                colorTheme="navy"
              />
              
              <InputSlider
                label="Time Period (Years)"
                value={years}
                onChange={setYears}
                min={15}
                max={30}
                step={1}
                suffix=" Yr"
                colorTheme="navy"
              />

              <div className="bg-[var(--background)] p-5 rounded-xl border border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400 font-medium">Interest Rate (Fixed)</span>
                  <span className="text-[var(--foreground)] font-semibold text-lg">{interestRate}%</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  PPF interest rates are set by the government and are subject to change. Current rate is ~7.1%.
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
      </div>

      {/* SEO Educational Content Section */}
      <div className="mt-16 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Maximizing Your PPF Account</h2>
          
          <div className="space-y-6 text-[#6B7280] leading-relaxed">
              <p>
                  The <strong>Public Provident Fund (PPF)</strong> is one of the most powerful wealth-building and tax-saving tools available to Indian investors. Its primary advantage is its EEE status, allowing your investments to compound completely tax-free over a 15-year horizon.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Power of Tax-Free Compounding</h3>
              <p>
                  While an interest rate of ~7.1% might seem lower than equity returns, the fact that PPF interest is <strong>tax-free</strong> makes a massive difference. For someone in the 30% tax bracket, a taxable fixed deposit would need to yield over 10% to match the post-tax returns of a PPF account! Over 15 or 30 years, this tax-free compounding creates a massive wealth snowball.
              </p>

              <h3 className="text-xl font-semibold text-[var(--foreground)] mt-8 mb-4">The Secret: Invest Before the 5th of the Month</h3>
              <p>
                  The most important trick to maximizing your PPF returns is timing your investments. PPF interest is calculated on the minimum balance between the 5th and the last day of every month. To ensure you earn interest for the current month, you must deposit your money <strong>on or before the 5th of the month</strong>.
              </p>
          </div>
      </div>

      {/* How to Use Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
      <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use This Calculator</h2>
      <div className="space-y-4 text-[#6B7280] leading-relaxed">
      <ol className="list-decimal ml-5 space-y-3">
      <li><strong>Adjust the inputs:</strong> Use the sliders or text boxes to enter your specific financial numbers.</li>
      <li><strong>Review the charts:</strong> The interactive charts will update immediately, showing a visual breakdown of your investments and returns.</li>
      <li><strong>Analyze the results:</strong> Look at the summary cards and tables to understand your total invested amount, estimated returns, and final corpus.</li>
      </ol>
      </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-12 glass-panel p-8 max-w-4xl mx-auto rounded-3xl">
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
      <div className="mt-12 glass-panel p-8 text-center bg-gradient-to-r from-[rgba(27,58,92,0.1)] to-[rgba(27,58,92,0.05)] max-w-4xl mx-auto rounded-3xl border border-[var(--color-accent)]/10">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Explore More Tools</h2>
          <div className="flex flex-wrap justify-center gap-3">
              <Link href="/tools/nps-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white shadow-sm px-5 py-2.5 rounded-xl text-sm font-semibold transition-all">
                  NPS Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/tools/fd-vs-sip-calculator" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                  FD vs SIP
              </Link>
          </div>
      </div>

    </div>
  );
}
