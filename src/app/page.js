"use client";

import React from 'react';
import Link from 'next/link';
import { useCalculator } from '@/hooks/useCalculator';
import InputSlider from '@/components/InputSlider';
import ResultSection from '@/components/ResultSection';
import { Calculator, Mail, Info, HelpCircle, ChevronDown, Target, ArrowRight } from 'lucide-react';

import CalculatorTabs from '@/components/CalculatorTabs';
import Breadcrumb from '@/components/Breadcrumb';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "SIP Calculator with Step Up, Inflation & Lump Sum | Free Online Tool",
      "description": "Free SIP calculator with step-up & inflation. Calculate monthly SIP returns, add lump sum, apply annual step-up and inflation adjustment — real-time. Works for India and globally (DCA / RSP / AIP).",
      "url": "https://stepupcalculator.com",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "featureList": [
        "Monthly SIP calculation",
        "Annual Step-Up SIP calculator",
        "Lump Sum + SIP combined returns",
        "Inflation-adjusted returns",
        "Goal based SIP calculator",
        "Real-time interactive charts",
        "₹1 Crore milestone tracker"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is a Step-Up SIP calculator?",
          "acceptedAnswer": { "@type": "Answer", "text": "A Step-Up SIP calculator lets you increase your monthly SIP by a fixed percentage every year — simulating annual salary hikes. For example, starting ₹10,000/month with 10% annual step-up means ₹11,000 in year 2, ₹12,100 in year 3, etc. It shows the massive compound effect of increasing investments over time." }
        },
        {
          "@type": "Question",
          "name": "How does inflation affect SIP returns?",
          "acceptedAnswer": { "@type": "Answer", "text": "Inflation reduces the purchasing power of your future corpus. ₹1 Crore in 20 years is NOT the same as ₹1 Crore today. Our inflation-adjusted SIP calculator shows what your maturity amount is worth in today's rupees, giving you a realistic financial picture for retirement and goal planning." }
        },
        {
          "@type": "Question",
          "name": "How much will ₹10,000/month SIP grow in 20 years?",
          "acceptedAnswer": { "@type": "Answer", "text": "At 12% annual return with no step-up: ₹10,000/month SIP for 20 years grows to approximately ₹99.9 Lakh (≈₹1 Crore). With 10% annual step-up, the same starting SIP grows to approximately ₹2.5 Crore in 20 years. Use the calculator to see your exact results." }
        },
        {
          "@type": "Question",
          "name": "Can I combine a lump sum with monthly SIP?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Our calculator lets you enter an initial lump sum investment alongside your monthly SIP, and computes the combined future value with step-up and inflation adjustments — all in real time. ₹5 Lakh lump sum at 12% for 20 years becomes ~₹48 Lakh on its own." }
        },
        {
          "@type": "Question",
          "name": "How do I know when I will reach ₹1 Crore with my SIP?",
          "acceptedAnswer": { "@type": "Answer", "text": "The ₹1 Crore Milestone Table on this calculator (the '₹1Cr Table' tab on the chart) shows exactly when your investment will cross each crore milestone — ₹1 Crore, ₹2 Crore, ₹3 Crore, etc. — and how much faster each crore arrives thanks to compounding." }
        },
        {
          "@type": "Question",
          "name": "Which is better: SIP or Lump Sum?",
          "acceptedAnswer": { "@type": "Answer", "text": "Both strategies have merit. SIP offers rupee-cost averaging over market cycles while eliminating market timing risk. Lump sum benefits from maximum early compounding. This calculator lets you combine both — invest a lump sum today and continue monthly SIP with step-up." }
        }
      ]
    }
  ]
};

const HOW_TO_STEPS = [
  { step: "1", title: "Set your Monthly Investment Amount", desc: "Enter how much you plan to invest every month. Use the slider or type directly. Even small amounts create significant wealth over long periods." },
  { step: "2", title: "Choose your Time Period", desc: "Select how many years you plan to stay invested. Longer durations dramatically increase returns due to the power of compounding." },
  { step: "3", title: "Enter the Expected Return Rate", desc: "Equity markets have historically returned 10–15% p.a. over long periods globally. Adjust based on your asset class and market." },
  { step: "4", title: "Add an Initial Lump Sum (optional)", desc: "If you have a one-time amount to invest alongside your monthly SIP, enter it here. It compounds at the same rate from day one." },
  { step: "5", title: "Set your Annual Step-Up", desc: "A step-up increases your monthly investment by a fixed % each year — perfect for anyone whose income grows annually." },
  { step: "6", title: "Factor in Inflation", desc: "Set an expected inflation rate to see the real purchasing power of your future corpus. The yellow bar shows your inflation-adjusted value." },
];

const FAQS = [
  {
    q: "What is a SIP (Systematic Investment Plan)?",
    a: "A SIP is a method of investing a fixed amount in a mutual fund at regular intervals (usually monthly). It enforces discipline, averages out market volatility, and leverages compounding to build long-term wealth."
  },
  {
    q: "What is a Step-Up SIP and why does it matter?",
    a: "A Step-Up SIP (also called Top-Up SIP) increases your monthly investment by a fixed percentage every year. For example, if you start with ₹10,000/month and step up 10% annually, you invest ₹11,000 in year 2, ₹12,100 in year 3, etc. This mirrors natural income growth and significantly boosts your final corpus."
  },
  {
    q: "Why should I use inflation-adjusted returns?",
    a: "₹1 Crore in 30 years is NOT the same as ₹1 Crore today. Inflation erodes purchasing power. Our inflation-adjusted figure shows you what your future corpus is worth in today's money — so you can plan realistically."
  },
  {
    q: "How is the inflation-adjusted value calculated?",
    a: "Real Value = Nominal FV ÷ (1 + Inflation Rate)ⁿ, where n is the number of years. For example, ₹3 Crore after 30 years at 4% inflation is worth about ₹93 Lakh in today's money."
  },
  {
    q: "What makes this calculator different from other SIP calculators?",
    a: "Most calculators handle only one variable at a time. This is the only free calculator that combines all four: monthly SIP + annual step-up + lump sum + inflation — on one page, updating in real time as you move the sliders."
  },
  {
    q: "Can investors outside India use this calculator?",
    a: "Absolutely. The underlying concept — investing a fixed amount monthly, increasing it annually, and adjusting for inflation — is universal. International investors know this as Dollar Cost Averaging (DCA) or a recurring investment plan. Simply enter your currency equivalent amounts. The math is identical worldwide."
  },
  {
    q: "Is this calculator useful for NRI investors?",
    a: "Yes. NRIs (Non-Resident Indians) can invest in mutual funds through NRE or NRO accounts. This calculator is perfect for NRIs planning their SIP investments from the US, UK, Canada, UAE, Singapore, or Australia."
  },
  {
    q: "What is Dollar Cost Averaging (DCA) and how does it relate to SIP?",
    a: "Dollar Cost Averaging (DCA) is the global equivalent of SIP. You invest a fixed amount at regular intervals regardless of market price. When markets are down you buy more units, when up you buy fewer — automatically averaging your cost. This calculator works as a full-featured DCA calculator: enter your monthly amount, expected return, step-up, and inflation."
  },
  {
    q: "Are the results guaranteed?",
    a: "No. This calculator provides illustrative projections based on assumed constant return rates. Actual investment returns vary with market conditions and are not guaranteed. Past performance does not guarantee future results. Please consult a qualified financial advisor before investing."
  },
  {
    q: "What return rate should I use?",
    a: "Equity markets have historically returned ~10–12% p.a. over long periods. The S&P 500 has averaged ~10% annually over decades. Emerging market equities may return higher with more volatility. Bonds and debt instruments typically return 5–8%. Use 10–12% as a conservative baseline for equity. Past performance does not guarantee future results."
  }
];

export default function Home() {
  const { state, setters, results } = useCalculator();
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <>
      {/* JSON-LD Structured Data for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── CALCULATOR ── */}
      <main className="py-6 px-2 md:px-4 flex flex-col items-center">
        <div className="max-w-6xl w-full mx-auto">
          
          {/* Add Calculator Tabs Navigation */}
          <CalculatorTabs />
          <Breadcrumb items={[{ label: 'SIP Calculator' }]} />

          {/* Header */}
          <div className="flex flex-col mb-6 mt-4">
            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-foreground mb-2">
              SIP Calculator with Step Up, Inflation & Lump Sum
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Calculate the future value of your SIP investments with advanced options like step-up and inflation adjustments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* Input Section */}
            <div className="lg:col-span-6 xl:col-span-5 glass-panel p-4 lg:p-5 relative">
              <InputSlider label="Monthly SIP Amount" value={state.monthlySip} onChange={setters.setMonthlySip} min={500} max={1000000} step={500} prefix="₹" />
              <InputSlider label="Time Period" value={state.timePeriod} onChange={setters.setTimePeriod} min={1} max={50} step={1} suffix="Yr" />
              <InputSlider label="Expected Return Rate (p.a)" value={state.returnRate} onChange={setters.setReturnRate} min={1} max={25} step={0.1} suffix="%" />
              <InputSlider label="Initial Investment (Lump sum)" value={state.initialInvestment} onChange={setters.setInitialInvestment} min={0} max={10000000} step={1000} prefix="₹" />
              <InputSlider label="Annual Step Up" value={state.stepUp} onChange={setters.setStepUp} min={0} max={20} step={1} suffix="%" />
              <InputSlider label="Expected Inflation Rate" value={state.inflationRate} onChange={setters.setInflationRate} min={0} max={15} step={0.1} suffix="%" />

              {/* Internal backlink to goal calculator */}
              <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10">
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-2">Also try:</p>
                <Link
                  href="/target-amount-calculator"
                  className="flex items-center gap-2 text-[var(--color-accent)] text-xs hover:text-foreground transition-colors group"
                  id="link-goal-sip-calculator"
                >
                  <Target className="w-3.5 h-3.5" />
                  <span>Goal Based SIP Calculator — How much SIP to reach ₹1 Crore?</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-6 xl:col-span-7 h-full lg:sticky lg:top-8">
              <ResultSection results={results} />
            </div>
          </div>
        </div>
      </main>

      {/* ── BELOW THE FOLD ── */}
      <div className="max-w-4xl w-full mx-auto px-4 pb-16 space-y-16">

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the SIP calculator">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <Info className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">How to Use This Calculator</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HOW_TO_STEPS.map(({ step, title, desc }) => (
              <div key={step} className="glass-panel p-5 flex gap-4">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[var(--color-accent)] flex items-center justify-center text-white shadow-sm font-bold text-sm">
                  {step}
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-1 text-sm">{title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-[11px] text-gray-500 dark:text-gray-400 leading-relaxed border border-black/10 dark:border-white/10 rounded-lg px-4 py-3">
            ⚠️ <strong className="text-gray-500 dark:text-gray-400">Disclaimer:</strong> This calculator provides illustrative projections only. Actual investment returns are subject to market risk and may be higher or lower. Past performance does not guarantee future results. Please read all relevant fund documents carefully and consult a qualified financial advisor before investing.
          </p>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" aria-label="Frequently Asked Questions">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-[var(--color-accent)] bg-opacity-20 dark:bg-opacity-10 border border-[var(--color-accent)] p-2 rounded-xl">
              <HelpCircle className="w-5 h-5 text-[var(--color-accent)]" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <div key={i} className="glass-panel overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-4 text-left group"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  id={`faq-${i}`}
                  aria-expanded={openFaq === i}
                >
                  <span className="text-foreground font-medium text-sm pr-4">{q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--color-accent)] flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed border-t border-black/5 dark:border-white/10 pt-3">
                    {a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
