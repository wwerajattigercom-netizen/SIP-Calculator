"use client";

import React from 'react';
import Link from 'next/link';
import { useTimeToGoalCalculator } from '@/hooks/useTimeToGoalCalculator';
import InputSlider from '@/components/InputSlider';
import TimeToGoalDisplay from '@/components/TimeToGoalDisplay';
import YearlyGrowthTable from '@/components/YearlyGrowthTable';
import CalculatorTabs from '@/components/CalculatorTabs';
import { Target, Mail, Info, HelpCircle, ChevronDown, ArrowRight, Calculator } from 'lucide-react';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Goal Based SIP Calculator — How Long to Reach ₹1 Crore?",
      "description": "Find out exactly how long your monthly SIP will take to reach ₹1 Crore or any financial goal. Includes step-up SIP, lump sum, and inflation. Free goal-based SIP duration calculator.",
      "url": "https://stepupcalculator.com/target-amount-calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "featureList": [
        "Time to reach financial goal",
        "Goal based SIP duration calculator",
        "How long to reach 1 crore SIP",
        "Step-up SIP goal timeline",
        "Year-by-year wealth growth table",
        "Inflation-adjusted goal planning"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How long does it take ₹10,000/month SIP to reach ₹1 Crore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At 12% annual return with no step-up, a ₹10,000/month SIP takes approximately 20 years to reach ₹1 Crore. With a 10% annual step-up, the same starting SIP reaches ₹1 Crore in about 16-17 years. Adding a lump sum further reduces the time. Use the calculator above for exact results based on your specific inputs."
          }
        },
        {
          "@type": "Question",
          "name": "How much SIP is required to reach ₹1 Crore in 10 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To reach ₹1 Crore in 10 years at 12% annual return with no step-up, you need approximately ₹43,000/month SIP. With a 10% annual step-up, the required starting SIP drops to about ₹30,000/month. Use the calculator on this page — enter ₹1 Crore as target and slide the monthly SIP to see how the duration changes in real time."
          }
        },
        {
          "@type": "Question",
          "name": "How does step-up SIP reduce the time to reach my goal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A step-up SIP increases your monthly contribution by a fixed % every year (e.g. 10% annually). Higher contributions in later years contribute significantly more to the corpus, helping you reach your financial goal months or even years earlier than a flat SIP. The compounding effect on higher contributions in later years is disproportionately powerful."
          }
        },
        {
          "@type": "Question",
          "name": "How does a lump sum shorten the time to reach my goal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "An initial lump sum compounds from Day 1. For example, ₹5 Lakh invested at 12% grows to ₹16 Lakh in 10 years and ₹27 Lakh in 15 years — entirely on its own. This head-start significantly reduces the number of months your SIP needs to cover, shortening the overall time to reach your goal."
          }
        },
        {
          "@type": "Question",
          "name": "What does 'Goal not reachable in 50 years' mean?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "This means your current monthly SIP is too low relative to the target goal at the given return rate. To fix it: increase your monthly SIP amount, add a lump sum, raise the expected return rate, increase the annual step-up %, or lower the target goal. The calculator simulates up to 50 years."
          }
        },
        {
          "@type": "Question",
          "name": "What is the year-by-year table showing?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The year-by-year table shows how your investment portfolio grows each year — breaking it into Total Invested (what you put in), Gains Earned (returns from market), and Portfolio Value. The row where your goal amount is first reached is highlighted in purple. A progress bar in each row shows how close you are to the target."
          }
        },
        {
          "@type": "Question",
          "name": "How much time does it take to reach 1 crore through SIP with step-up?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At 12% annual return: ₹5,000/month SIP with 15% step-up reaches ₹1 Crore in about 19 years. ₹10,000/month SIP with 10% step-up reaches ₹1 Crore in about 17 years. ₹20,000/month SIP with 10% step-up reaches ₹1 Crore in about 14 years. Use the real-time calculator above to see the exact duration for your specific inputs."
          }
        }
      ]
    }
  ]
};

const HOW_TO_STEPS = [
  { step: "1", title: "Set your Target Goal Amount", desc: "Enter the corpus you want to build — e.g. ₹1 Crore. The label shows the amount in words so large numbers are easy to understand." },
  { step: "2", title: "Enter your Monthly SIP Amount", desc: "How much can you invest every month? Slide this to instantly see how the required time changes. This is the key driver of the result." },
  { step: "3", title: "Set Expected Annual Return", desc: "Equity mutual funds historically return 10–12% in India. Use a conservative rate for long-term goals." },
  { step: "4", title: "Add an Initial Lump Sum (optional)", desc: "Any existing savings you can deploy now? A lump sum gives a powerful head start — it compounds from Day 1 and reduces time to goal." },
  { step: "5", title: "Set Annual Step-Up %", desc: "Planning to increase your SIP every year as your income grows? Even a 10% annual step-up saves several years off your timeline." },
  { step: "6", title: "Adjust Inflation Rate", desc: "See what your goal is actually worth in today's purchasing power. Essential for realistic retirement and education planning." },
];

const FAQS = [
  {
    q: "How long does ₹10,000/month SIP take to reach ₹1 Crore?",
    a: "At 12% annual return with no step-up: ≈20 years. With 10% annual step-up: ≈17 years. Adding a ₹5 Lakh lump sum at start: ≈15 years. Slide the inputs above to see your exact result instantly."
  },
  {
    q: "How much SIP do I need to reach ₹1 Crore in 10 years?",
    a: "At 12% return with no step-up, you need ≈₹43,000/month. With 10% annual step-up, the starting SIP drops to ≈₹30,000/month. Set Target = ₹1 Crore and Time to Goal will tell you the exact duration for any SIP amount you choose."
  },
  {
    q: "Why does adding step-up reduce the time to reach the goal?",
    a: "A step-up SIP increases your monthly contribution by a fixed % every year. This means in years 5–10–15, you're investing significantly more per month. These larger later-year contributions compound powerfully and help you cross your target much faster."
  },
  {
    q: "What does the circular arc on the right represent?",
    a: "The glowing arc fills based on how quickly you're reaching your goal (shorter = more filled for 30 year scale). It turns green for goals reachable in under 10 years, purple for 10–20 years, and amber for over 20 years. The centre shows years + months."
  },
  {
    q: "What is the year-by-year table below?",
    a: "The table shows how your corpus grows each year — Total Invested (what you put in), Gains Earned (returns), and Portfolio Value. The year your goal is first reached is highlighted in purple with a 'GOAL REACHED' badge. A progress bar in each row shows your progress toward the target."
  },
  {
    q: "Is this calculator different from the SIP Calculator on the home page?",
    a: "Yes. The SIP Calculator on the home page answers: 'I invest ₹X/month — what will it grow to?' This calculator answers: 'I invest ₹X/month — how long will it take to reach my goal?' Two perspectives, equally important for financial planning."
  },
];

export default function TargetCalculatorPage() {
  const { state, setters, results } = useTimeToGoalCalculator();
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CALCULATOR ── */}
      <main className="min-h-screen p-2 md:p-4 lg:p-4 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full mx-auto">

          {/* Tab Navigation */}
          <CalculatorTabs />

          {/* Header */}
          <div className="flex items-center justify-center mb-2 lg:mb-3">
            <div className="bg-[#8b5cf6] p-2 rounded-xl mr-3 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
              <span className="text-gradient">Time to Goal</span> SIP Calculator
            </h1>
          </div>

          {/* SEO subtitle */}
          <p className="text-center text-gray-400 text-sm mb-5 max-w-xl mx-auto">
            Enter your monthly SIP & target goal — see <strong className="text-white">exactly how many years</strong> it takes to reach ₹1 Crore or any amount.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* ── INPUT PANEL ── */}
            <div className="lg:col-span-6 xl:col-span-5 glass-panel p-5 lg:p-6 relative">
              <InputSlider
                label="Target Goal Amount"
                value={state.targetAmount}
                onChange={setters.setTargetAmount}
                min={100000}
                max={10000000000}
                step={100000}
                prefix="₹"
              />
              <InputSlider
                label="Monthly SIP Amount"
                value={state.monthlySip}
                onChange={setters.setMonthlySip}
                min={500}
                max={5000000}
                step={500}
                prefix="₹"
              />
              <InputSlider
                label="Expected Return Rate (p.a.)"
                value={state.returnRate}
                onChange={setters.setReturnRate}
                min={1}
                max={30}
                step={0.1}
                suffix="%"
              />
              <InputSlider
                label="Initial Lump Sum (optional)"
                value={state.initialInvestment}
                onChange={setters.setInitialInvestment}
                min={0}
                max={100000000}
                step={10000}
                prefix="₹"
              />
              <InputSlider
                label="Annual Step-Up %"
                value={state.stepUp}
                onChange={setters.setStepUp}
                min={0}
                max={50}
                step={1}
                suffix="%"
              />
              <InputSlider
                label="Expected Inflation Rate"
                value={state.inflationRate}
                onChange={setters.setInflationRate}
                min={0}
                max={15}
                step={0.1}
                suffix="%"
              />

              {/* Internal backlink to main calculator */}
              <div className="mt-4 pt-4 border-t border-white border-opacity-10">
                <p className="text-gray-500 text-xs mb-2">Also try:</p>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#a78bfa] text-xs hover:text-white transition-colors group"
                  id="link-sip-calculator"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>SIP & Step-Up Calculator — See how your SIP grows</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* ── RESULT: Time Display ── */}
            <div className="lg:col-span-6 xl:col-span-7 h-full lg:sticky lg:top-8">
              <TimeToGoalDisplay results={results} />
            </div>
          </div>
        </div>
      </main>

      {/* ── BELOW THE FOLD ── */}
      <div className="max-w-6xl w-full mx-auto px-4 pb-16 space-y-10">

        {/* ── YEAR-BY-YEAR TABLE ── */}
        {results.reachable && (
          <section id="yearly-growth" aria-label="Year by year wealth growth table">
            <YearlyGrowthTable
              yearlyData={results.yearlyData}
              targetAmount={state.targetAmount}
              goalTotalMonths={results.totalMonths}
            />
          </section>
        )}

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the goal based SIP calculator">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[#a78bfa]" />
            </div>
            <h2 className="text-2xl font-bold text-white">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOW_TO_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="glass-panel p-5 flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#8b5cf6] bg-opacity-30 border border-[#8b5cf6] flex items-center justify-center text-[#c4b5fd] font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-white font-semibold mb-1 text-sm">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[11px] text-gray-500 leading-relaxed border border-gray-700 rounded-lg px-4 py-3">
            ⚠️ <strong className="text-gray-400">Disclaimer:</strong> This calculator provides illustrative projections only. Actual mutual fund returns are subject to market risk and are not guaranteed. Please consult a SEBI-registered financial advisor before making investment decisions.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-label="Frequently Asked Questions about time to reach goal SIP">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-xl">
              <HelpCircle className="w-5 h-5 text-[#a78bfa]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="glass-panel overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  id={`goal-faq-${i}`}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-white font-medium text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#a78bfa] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white border-opacity-10 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA BACKLINKS ── */}
        <section id="related-calculators" aria-label="Related financial calculators">
          <div className="glass-panel p-6 bg-gradient-to-r from-[rgba(139,92,246,0.1)] to-[rgba(59,130,246,0.08)]">
            <h2 className="text-lg font-bold text-white mb-4 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/"
                id="cta-sip-calculator"
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(139,92,246,0.15)] transition-all group rounded-xl"
              >
                <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-lg flex-shrink-0">
                  <Calculator className="w-4 h-4 text-[#a78bfa]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">Step-Up SIP Calculator</p>
                  <p className="text-gray-500 text-xs">See how much your monthly SIP grows over time</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] ml-auto flex-shrink-0 transition-colors" />
              </Link>
              <div className="flex items-center gap-3 glass-panel p-4 opacity-50 rounded-xl">
                <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] p-2 rounded-lg flex-shrink-0">
                  <Target className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">CAGR / Returns Calculator</p>
                  <p className="text-gray-500 text-xs">Coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" aria-label="About the creator">
          <div className="glass-panel p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(139,92,246,0.08)] to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#8b5cf6] bg-opacity-20 border-2 border-[#8b5cf6] flex items-center justify-center mx-auto mb-3 text-lg font-bold text-[#c4b5fd]">
                R
              </div>
              <h2 className="text-xs font-semibold text-gray-400 mb-1">Built by <span className="text-gradient font-bold text-sm">Rajat</span></h2>
              <p className="text-gray-400 text-sm max-w-lg mx-auto mb-5 leading-relaxed">
                A free tool built for Indian investors — goal-based SIP planning with step-up, lump sum, and inflation in one place.
              </p>
              <a
                href="mailto:businesswebsitestudio@gmail.com"
                className="inline-flex items-center gap-2 bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] hover:bg-opacity-30 transition-all text-[#c4b5fd] px-5 py-2.5 rounded-xl text-xs font-medium"
              >
                <Mail className="w-4 h-4" />
                businesswebsitestudio@gmail.com
              </a>
              <p className="text-gray-600 text-[10px] mt-4">For business queries, collaborations, or feedback</p>
              <p className="text-gray-700 text-[10px] mt-2">© {new Date().getFullYear()} Rajat</p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
