"use client";

import React from 'react';
import Link from 'next/link';
import { useReverseCalculator } from '@/hooks/useReverseCalculator';
import InputSlider from '@/components/InputSlider';
import TargetResultSection from '@/components/TargetResultSection';
import CalculatorTabs from '@/components/CalculatorTabs';
import { Target, Mail, Info, HelpCircle, ChevronDown, ArrowRight, Calculator, Zap } from 'lucide-react';

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Goal Based SIP Calculator — How Much SIP to Reach ₹1 Crore?",
      "description": "Calculate the exact monthly SIP required to reach any financial goal (₹1 Crore, retirement, education fund). Includes step-up SIP, lump sum, and inflation adjustment. Free reverse SIP calculator online.",
      "url": "https://stepupcalculator.com/target-amount-calculator",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
      "featureList": [
        "Reverse SIP calculation",
        "Goal based SIP planning",
        "Required monthly SIP finder",
        "Annual step-up SIP inclusion",
        "Lump sum consideration",
        "Inflation-adjusted goal planning",
        "Works for ₹1 Crore, ₹5 Crore, retirement goals"
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How much SIP is required to reach ₹1 Crore?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To reach ₹1 Crore in 10 years at 12% annual return with no step-up, you need approximately ₹43,000/month SIP. In 15 years, ₹18,000/month. In 20 years, ₹8,500/month. Adding a 10% annual step-up dramatically reduces the required starting SIP — for 15 years with 10% step-up, you only need ₹11,000/month. Use the calculator above to get the exact figure for your inputs."
          }
        },
        {
          "@type": "Question",
          "name": "What is a Goal Based SIP Calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Goal Based SIP Calculator (also called a Reverse SIP Calculator) works backwards from your target — instead of asking 'what will my SIP grow to?', it asks 'how much SIP do I need to reach my goal?'. Enter your target amount (e.g. ₹1 Crore), time period, and expected return, and the calculator tells you the exact monthly SIP to start investing."
          }
        },
        {
          "@type": "Question",
          "name": "How does Step-Up SIP reduce the required monthly investment?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A Step-Up SIP increases your monthly contribution by a fixed percentage every year (e.g. 10% annually). When you commit to increasing your SIP annually (as your income grows), the total amount you contribute in later years is much higher, so your required starting SIP today is significantly lower. This aligns perfectly with typical career income growth."
          }
        },
        {
          "@type": "Question",
          "name": "Can I include a lump sum in my goal planning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. If you already have savings (a lump sum) that you can invest now — say ₹5 Lakh or ₹10 Lakh — the calculator uses it as an initial investment that compounds from day one. This significantly reduces the monthly SIP needed to reach your goal, since the lump sum grows on its own alongside your SIP contributions."
          }
        },
        {
          "@type": "Question",
          "name": "How does inflation affect my financial goal?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Inflation reduces purchasing power. If your goal is ₹1 Crore in 15 years, it will only have the buying power of approximately ₹48 Lakh in today's money (at 5% inflation). The inflation-adjusted figure shown in the calculator tells you what your target goal is actually worth in today's rupees — helping you plan more accurately for retirement or education goals."
          }
        },
        {
          "@type": "Question",
          "name": "What expected return rate should I use for planning?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Indian equity mutual funds have historically returned 12–15% annually over 10+ year periods. For conservative planning, use 10–12%. For large-cap index funds, 11–12% is reasonable. Balanced/hybrid funds typically deliver 9–11%. For debt funds, use 6–8%. Always use a conservative estimate when planning for important financial goals like retirement or a child's education."
          }
        },
        {
          "@type": "Question",
          "name": "How much SIP is needed for ₹1 Crore in 10, 15, and 20 years?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "At 12% annual return with no step-up: ₹1 Crore in 10 years requires ≈₹43,000/month; in 15 years ≈₹18,000/month; in 20 years ≈₹8,500/month. With 10% annual step-up: in 10 years ≈₹30,000/month; in 15 years ≈₹11,000/month; in 20 years ≈₹4,500/month. Use the calculator above for exact figures based on your specific inputs."
          }
        },
        {
          "@type": "Question",
          "name": "Is ₹1 Crore enough for retirement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "₹1 Crore sounds large, but due to inflation, ₹1 Crore in 20 years has the purchasing power of only ₹37–45 Lakh in today's money (at 4–5% inflation). For a comfortable retirement, financial planners suggest a corpus of ₹3–5 Crore or more, depending on your lifestyle. Use the inflation-adjusted result in the calculator to plan your real goal in today's rupees."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between a regular SIP calculator and this goal based calculator?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A regular SIP calculator tells you how much your investment will grow (forward calculation). A goal based SIP calculator works in reverse — you tell it your target and it tells you how much to invest each month (reverse calculation). This calculator uses a binary search algorithm to find the exact SIP amount even when complex parameters like step-up and lump sum are involved."
          }
        }
      ]
    }
  ]
};

// Quick Reference Table Data
const QUICK_REFERENCE = [
  { years: 10, flat: "₹43,000", stepup10: "₹30,000" },
  { years: 15, flat: "₹18,000", stepup10: "₹11,000" },
  { years: 20, flat: "₹8,500",  stepup10: "₹4,500"  },
  { years: 25, flat: "₹4,000",  stepup10: "₹1,900"  },
];

const HOW_TO_STEPS = [
  { step: "1", title: "Set your Target Amount (Goal)", desc: "Enter the final corpus you want to achieve. Default is ₹1 Crore (₹1,00,00,000). The label below shows the amount in words so large numbers are easy to read." },
  { step: "2", title: "Choose your Time Period", desc: "How many years do you have to achieve this goal? Longer periods dramatically reduce the required monthly SIP due to compounding." },
  { step: "3", title: "Enter Expected Annual Return", desc: "Equity mutual funds have historically returned 10–12% in India. Use a conservative rate like 10–12% for long-term goals." },
  { step: "4", title: "Add an Initial Lump Sum (optional)", desc: "If you already have savings you can deploy now, enter it here. A lump sum significantly reduces the required monthly SIP — it compounds from Day 1." },
  { step: "5", title: "Set Annual Step-Up %", desc: "Planning to increase your SIP every year as your income grows? Even a 10% annual step-up massively reduces your starting required SIP today." },
  { step: "6", title: "Factor in Inflation", desc: "See what your target goal is worth in today's purchasing power. Use 5–6% for India. This helps you plan realistic, inflation-proof goals." },
];

const FAQS = [
  {
    q: "How much SIP is required to reach ₹1 Crore?",
    a: "At 12% annual return: ₹1 Crore in 10 years needs ≈₹43,000/month; in 15 years ≈₹18,000/month; in 20 years ≈₹8,500/month. Adding a 10% annual step-up reduces these to ≈₹30,000, ₹11,000, and ₹4,500 respectively. Enter your specific numbers above for exact results."
  },
  {
    q: "What is a Goal Based SIP Calculator and how does it work?",
    a: "A Goal Based SIP Calculator (also called a Reverse SIP Calculator) works backward — you input your target amount and it calculates the exact monthly SIP to invest. This calculator uses a precise binary search algorithm to find the required SIP even when step-up and lump sum are configured, guaranteeing 100% accuracy."
  },
  {
    q: "How does Step-Up SIP lower my required monthly investment?",
    a: "When you commit to increasing your SIP each year (e.g. 10% annually, matching salary hikes), you're agreeing to invest much more in future years. Since future contributions are factored in, the starting SIP you need today is significantly lower — sometimes 30–50% less than a flat SIP."
  },
  {
    q: "How does adding a Lump Sum affect the required SIP?",
    a: "An initial lump sum compounds from Day 1. ₹5 Lakh invested today at 12% becomes ~₹27 Lakh in 15 years — that's ₹27 Lakh you don't need to build through monthly SIPs. The larger your lump sum, the lower your required monthly SIP to reach the same goal."
  },
  {
    q: "What if my required SIP shows ₹0?",
    a: "This means your initial lump sum alone will grow to exceed your target goal within the given time period, at the stated return rate. No monthly SIP contributions are needed — your existing investment will do the work."
  },
  {
    q: "What is a realistic return rate to use for planning?",
    a: "Indian equity mutual funds have historically returned 12–15% over 10+ years. Use 10–12% for conservative equity planning, 6–8% for debt funds, and 9–11% for balanced/hybrid funds. Always plan conservatively for critical goals like retirement."
  },
  {
    q: "Is ₹1 Crore enough for retirement in India?",
    a: "Due to inflation, ₹1 Crore in 20 years has the purchasing power of only ₹37–45 Lakh in today's money (at 4–5% inflation). Financial planners suggest ₹3–5 Crore minimum for a comfortable retirement. Use the 'Inflation Adjusted' figure to understand your goal's real value."
  },
  {
    q: "Can NRI investors use this calculator?",
    a: "Absolutely. NRIs investing in Indian mutual funds through NRE or NRO accounts can use this calculator to plan their SIP goals in INR. International investors can also use it for DCA (Dollar Cost Averaging) goal planning — the math is identical worldwide, just enter your currency amounts."
  },
  {
    q: "How is this different from a regular SIP calculator?",
    a: "A regular SIP calculator answers: 'I invest ₹X/month — what will it become?' This goal based calculator answers: 'I want ₹X Crore — how much should I invest per month?' Two sides of the same coin, both crucial for financial planning."
  },
];

export default function TargetCalculatorPage() {
  const { state, setters, results } = useReverseCalculator();
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

          {/* Tab Navigation — Backlink to main page */}
          <CalculatorTabs />

          {/* Header */}
          <div className="flex items-center justify-center mb-2 lg:mb-4">
            <div className="bg-[#8b5cf6] p-2 rounded-xl mr-3 shadow-[0_0_15px_rgba(139,92,246,0.4)]">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight text-white text-center">
              <span className="text-gradient">Goal Based SIP</span> Calculator
            </h1>
          </div>

          {/* SEO-rich subtitle */}
          <p className="text-center text-gray-400 text-sm mb-6 max-w-xl mx-auto">
            How much SIP do you need to reach <strong className="text-white">₹1 Crore</strong>? Enter your goal, time, and return — get the exact required monthly SIP instantly.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-start">
            {/* Input Section */}
            <div className="lg:col-span-6 xl:col-span-5 glass-panel p-5 lg:p-6 relative">
              {/* Target Amount slider — max 1000 Crore = 10,000,000,000 */}
              <InputSlider label="Target Goal Amount" value={state.targetAmount} onChange={setters.setTargetAmount} min={100000} max={10000000000} step={100000} prefix="₹" />
              <InputSlider label="Time Period" value={state.timePeriod} onChange={setters.setTimePeriod} min={1} max={50} step={1} suffix="Yr" />
              <InputSlider label="Expected Return Rate (p.a.)" value={state.returnRate} onChange={setters.setReturnRate} min={1} max={30} step={0.1} suffix="%" />
              <InputSlider label="Initial Lump Sum (optional)" value={state.initialInvestment} onChange={setters.setInitialInvestment} min={0} max={100000000} step={10000} prefix="₹" />
              <InputSlider label="Annual Step-Up %" value={state.stepUp} onChange={setters.setStepUp} min={0} max={50} step={1} suffix="%" />
              <InputSlider label="Expected Inflation Rate" value={state.inflationRate} onChange={setters.setInflationRate} min={0} max={15} step={0.1} suffix="%" />

              {/* Internal backlink to main calculator */}
              <div className="mt-4 pt-4 border-t border-white border-opacity-10">
                <p className="text-gray-500 text-xs mb-2">Also try:</p>
                <Link
                  href="/"
                  className="flex items-center gap-2 text-[#a78bfa] text-xs hover:text-white transition-colors group"
                  id="link-sip-calculator"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>SIP & Step-Up Calculator with Inflation</span>
                  <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>

            {/* Result Section */}
            <div className="lg:col-span-6 xl:col-span-7 h-full lg:sticky lg:top-8">
              <TargetResultSection results={results} />
            </div>
          </div>
        </div>
      </main>

      {/* ── BELOW THE FOLD — SEO Content ── */}
      <div className="max-w-4xl w-full mx-auto px-4 pb-16 space-y-16">

        {/* ── QUICK REFERENCE TABLE ── */}
        <section id="quick-reference" aria-label="SIP required for 1 Crore">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] p-2 rounded-xl">
              <Zap className="w-5 h-5 text-[#a78bfa]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Monthly SIP Required to Reach ₹1 Crore</h2>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            At <strong className="text-white">12% annual return</strong>. "With 10% Step-Up" means you increase your SIP by 10% every year.
          </p>
          <div className="glass-panel overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[rgba(139,92,246,0.15)] border-b border-white border-opacity-10">
                  <th className="text-left text-[#c4b5fd] font-semibold py-3 px-4">Time Period</th>
                  <th className="text-center text-[#c4b5fd] font-semibold py-3 px-4">Flat SIP (No Step-Up)</th>
                  <th className="text-center text-green-400 font-semibold py-3 px-4">With 10% Annual Step-Up</th>
                </tr>
              </thead>
              <tbody>
                {QUICK_REFERENCE.map(({ years, flat, stepup10 }, i) => (
                  <tr key={years} className={`border-b border-white border-opacity-5 ${i % 2 === 0 ? 'bg-[rgba(255,255,255,0.02)]' : ''}`}>
                    <td className="py-3 px-4 text-white font-medium">{years} Years</td>
                    <td className="py-3 px-4 text-center text-gray-300">{flat}/month</td>
                    <td className="py-3 px-4 text-center text-green-400 font-semibold">{stepup10}/month</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-gray-500 text-xs px-4 py-3">* Approximate values. Use the calculator above for your exact required SIP.</p>
          </div>
          {/* Strong internal backlink */}
          <div className="mt-4 glass-panel p-4 bg-[rgba(139,92,246,0.05)]">
            <p className="text-gray-400 text-sm">
              Want to see how a specific SIP grows over time?{" "}
              <Link href="/" className="text-[#a78bfa] hover:text-white font-semibold underline underline-offset-2 transition-colors" id="link-sip-forward">
                Use our SIP Calculator with Step Up & Inflation →
              </Link>
            </p>
          </div>
        </section>

        {/* ── HOW TO USE ── */}
        <section id="how-to-use" aria-label="How to use the goal based SIP calculator">
          <div className="flex items-center gap-3 mb-8">
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
        <section id="faq" aria-label="Frequently Asked Questions about Goal Based SIP">
          <div className="flex items-center gap-3 mb-8">
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

        {/* ── CTA BACKLINKS — Like reference site ── */}
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
                  <p className="text-white font-semibold text-sm group-hover:text-[#a78bfa] transition-colors">SIP + Step Up Calculator</p>
                  <p className="text-gray-500 text-xs">See how much your monthly SIP grows</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#a78bfa] ml-auto flex-shrink-0 transition-colors" />
              </Link>

              <div className="flex items-center gap-3 glass-panel p-4 opacity-60 rounded-xl">
                <div className="bg-[rgba(59,130,246,0.2)] border border-[rgba(59,130,246,0.3)] p-2 rounded-lg flex-shrink-0">
                  <Zap className="w-4 h-4 text-blue-400" />
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
                A free, no-nonsense tool for Indian investors — combining goal-based planning with step-up SIP, lump sum, and inflation in one place.
              </p>
              <a
                href="mailto:businesswebsitestudio@gmail.com"
                className="inline-flex items-center gap-2 bg-[#8b5cf6] bg-opacity-20 border border-[#8b5cf6] hover:bg-opacity-30 transition-all text-[#c4b5fd] px-5 py-2.5 rounded-xl text-xs font-medium"
              >
                <Mail className="w-4 h-4" />
                businesswebsitestudio@gmail.com
              </a>
              <p className="text-gray-600 text-[10px] mt-4">
                For business queries, collaborations, or feedback
              </p>
              <p className="text-gray-700 text-[10px] mt-2">
                © {new Date().getFullYear()} Rajat
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
