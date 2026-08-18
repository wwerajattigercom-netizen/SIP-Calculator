"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import React, { useState } from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight, TrendingUp, CheckCircle, AlertTriangle, HelpCircle, ChevronDown, ChevronUp, Clock, Info } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';
import InputSlider from '@/components/InputSlider';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-black/5 last:border-0 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <h3 className="text-foreground font-medium text-sm md:text-base">{question}</h3>
        {isOpen ? <ChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />}
      </button>
      {isOpen && (
        <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function RetirementSipCalculatorPage() {
  const [currentAge, setCurrentAge] = useState(25);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(4000);
  const [returnRate, setReturnRate] = useState(10);
  const [inflationRate, setInflationRate] = useState(3);

  // Validations & logic
  const yearsToRetire = Math.max(1, retirementAge - currentAge);
  
  // Future expenses (considering inflation)
  const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate / 100, yearsToRetire);
  
  // Required Corpus (using 4% withdrawal rule approx 25x annual expenses)
  const requiredCorpus = futureMonthlyExpenses * 12 * 25;
  
  // DCA required to reach corpus (annuity due)
  const calculateSipForCorpus = (corpus, years, rate) => {
    if (years <= 0) return 0;
    const monthlyRate = rate / 100 / 12;
    const months = years * 12;
    // FV = P * [ ( (1+r)^n - 1 ) / r ] * (1+r)
    // P = FV / [ ( (1+r)^n - 1 ) / r ] * (1+r)
    const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    return corpus / factor;
  };

  const requiredSipNow = calculateSipForCorpus(requiredCorpus, yearsToRetire, returnRate);
  
  // Delay by 5 years
  const yearsToRetireDelayed = Math.max(1, yearsToRetire - 5);
  const requiredSipDelayed = calculateSipForCorpus(requiredCorpus, yearsToRetireDelayed, returnRate);

  const formatToShortWords = (value) => {
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)} M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}k`;
    return `$${value.toFixed(0)}`;
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Retirement DCA Calculator: How Much to Invest?',
    description: 'Calculate the exact DCA amount needed for your retirement globally factoring in inflation and expected returns.',
    author: { '@type': 'Person', name: 'StepupCalculator' },
    publisher: { '@type': 'Organization', name: 'StepupCalculator', url: 'https://stepupcalculator.com/us' },
    url: 'https://stepupcalculator.com/us/tools/retirement-dca-calculator',
    mainEntityOfPage: 'https://stepupcalculator.com/us/tools/retirement-dca-calculator',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much corpus do I need to retire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A common thumb rule is to aim for a corpus that is 25 to 30 times your annual expenses at the time of retirement. This ensures you can safely withdraw enough to cover expenses without depleting the principal prematurely.'
        }
      },
      {
        '@type': 'Question',
        name: 'Is $1 Million enough to retire?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'It depends on your lifestyle, inflation, and retirement age. For a moderate lifestyle in a non-metro city today, it might suffice for a few years, but with 6% inflation, its purchasing power will halve in about 12 years. Always calculate your specific need.'
        }
      },
      {
        '@type': 'Question',
        name: 'At what age should I start investing for retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'As early as possible. Starting in your 20s allows the power of compounding to do most of the heavy lifting. Even a 5-year delay can double the monthly investment required to reach the same goal.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does inflation affect retirement planning?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Inflation reduces purchasing power over time. Expenses of $4,000 today might rise to over $64,000 in 20 years at a 6% inflation rate. Your retirement corpus must account for these inflated future expenses.'
        }
      },
      {
        '@type': 'Question',
        name: 'Should I use DCA or lump sum for retirement?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'For most salaried individuals, a systematic investment plan (DCA) is ideal because it matches monthly income and averages out market volatility (dollar cost averaging). Lump sums can be added whenever you get a bonus or windfall.'
        }
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      
      <main className="py-8 px-2 md:px-4 flex flex-col items-center">
        <article className="max-w-3xl w-full mx-auto space-y-8">
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'Tools', href: '/us' }, { label: 'Retirement DCA Calculator' }]} />

          {/* Hero */}
          <div className="glass-panel p-7 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.05)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-[var(--color-accent)] font-semibold mb-3 block">Interactive Tool</span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight mb-3">
                Retirement  DCA Calculator
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                Find out exactly how much you need to invest every month to maintain your current lifestyle after retirement. We factor in inflation, returns, and the time you have left.
              </p>
            </div>
          </div>

          {/* Interactive Calculator Section */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Plan Your Retirement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <InputSlider
                label="Current Age"
                value={currentAge}
                min={18}
                max={60}
                step={1}
                onChange={setCurrentAge}
                suffix=" Yrs"
              />
              <InputSlider
                label="Retirement Age"
                value={retirementAge}
                min={40}
                max={75}
                step={1}
                onChange={setRetirementAge}
                suffix=" Yrs"
              />
            </div>

            {/* Visual Age Timeline Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                <span>Current Age: {currentAge}</span>
                <span>{yearsToRetire} Years to Invest</span>
                <span>Retirement Age: {retirementAge}</span>
              </div>
              <div className="h-3 w-full bg-[rgba(0,0,0,0.05)] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#1B3A5C] to-[#C4993C]"
                  style={{ width: '100%' }}
                ></div>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <InputSlider
                label="Monthly Expenses Today"
                value={monthlyExpenses}
                min={500}
                max={50000}
                step={100}
                onChange={setMonthlyExpenses}
                formatFn={(v) => formatToShortWords(v)}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputSlider
                  label="Expected Return Rate"
                  value={returnRate}
                  min={1}
                  max={30}
                  step={0.1}
                  onChange={setReturnRate}
                  suffix="%"
                />
                <InputSlider
                  label="Expected Inflation"
                  value={inflationRate}
                  min={1}
                  max={15}
                  step={0.1}
                  onChange={setInflationRate}
                  suffix="%"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[var(--panel-bg)] border border-black/5 rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-semibold mb-1">Required Corpus</div>
                <div className="text-2xl font-bold text-foreground">{formatToShortWords(requiredCorpus)}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">Based on 25x future annual expenses</div>
              </div>
              
              <div className="bg-[rgba(196,153,60,0.1)] border border-[var(--color-accent)]/30 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase">Start Now</div>
                <div className="text-xs text-[var(--color-accent)] uppercase tracking-wide font-semibold mb-1">Required Monthly DCA</div>
                <div className="text-2xl font-bold text-foreground">${Math.round(requiredSipNow).toLocaleString('en-US')}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">Invest for {yearsToRetire} years</div>
              </div>

              <div className="bg-[rgba(153,27,27,0.1)] border border-red-800/30 rounded-xl p-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-800 text-white text-[8px] font-bold px-2 py-1 rounded-bl-lg uppercase">Delay 5 Yrs</div>
                <div className="text-xs text-red-700 uppercase tracking-wide font-semibold mb-1">Cost of Delay</div>
                <div className="text-2xl font-bold text-foreground">${Math.round(requiredSipDelayed).toLocaleString('en-US')}</div>
                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-2">Invest for {yearsToRetireDelayed} years</div>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4 text-[var(--color-returns)]" />
              <span>Delaying your DCA by just 5 years means investing <strong>${Math.round(requiredSipDelayed - requiredSipNow).toLocaleString('en-US')} more</strong> every month!</span>
            </div>
          </div>

          {/* Educational Content */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">The 4% Rule — Why 25× Annual Expenses?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              The calculator aims for a retirement corpus that is 25 times your expected annual expenses at retirement. This is based on the famous <strong>4% Rule</strong> (or Safe Withdrawal Rate).
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              If you withdraw 4% of your total retirement corpus in your first year of retirement, and adjust that amount for inflation in subsequent years, your money is highly likely to last for a 30-year retirement period without running out, assuming a balanced portfolio. (25 × 4% = 100%).
            </p>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Inflation: The Silent Wealth Destroyer</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4">
              Why does your required corpus look so huge? It&apos;s because of inflation. Over decades, the cost of living rises significantly.
            </p>
            <div className="bg-[var(--panel-bg)] border border-[#E8E4DF] rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
              At a {inflationRate}% inflation rate, your current monthly expense of <strong>${monthlyExpenses.toLocaleString('en-US')}</strong> will grow to <strong>${Math.round(futureMonthlyExpenses).toLocaleString('en-US')}</strong> by the time you retire in {yearsToRetire} years. Your corpus must be large enough to support those inflated future expenses!
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

          {/* FAQ */}
          <div className="glass-panel p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" /> Frequently Asked Questions
            </h2>
            <div className="flex flex-col">
              {faqSchema.mainEntity.map((item, index) => (
                <FAQItem key={index} question={item.name} answer={item.acceptedAnswer.text} />
              ))}
            </div>
          </div>

          {/* CTA & Links */}
          <div className="glass-panel p-6 text-center bg-gradient-to-r from-[rgba(27,58,92,0.05)] to-[rgba(27,58,92,0.08)]">
            <h2 className="text-lg font-bold text-foreground mb-2">Want to Reach Your Goal Faster?</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Explore Step-up DCA to start with a lower amount and increase it annually.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/us/dca-calculator" className="inline-flex items-center gap-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm">
                <Calculator className="w-4 h-4" /> Step-Up DCA Calculator <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/us/tools/dca-to-reach-1-million" className="inline-flex items-center gap-2 border border-[var(--color-accent)]/40 text-[var(--color-accent)] hover:border-[var(--color-accent)] px-5 py-2.5 rounded-xl text-sm font-medium transition-all">
                How to reach $1 Million <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="text-center text-xs text-gray-500 dark:text-gray-400">
            <p>For educational purposes only. Consult a financial advisor before investing.</p>
            <Link href="/us/disclaimer" className="text-[var(--color-accent)] hover:underline">Read Disclaimer</Link>
          </div>

        </article>
      </main>
    </>
  );
}
