"use client";
import CalculatorTabs from '@/components/CalculatorTabs';
import Link from 'next/link';
import { BookOpen, Clock, ArrowRight, Calculator, TrendingUp, Target, Layers, Wallet, Shield, BarChart3, Flame, GraduationCap, Home, Zap } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const ARTICLES = [
  {
    href: '/blog/cost-of-delay-calculator',
    tag: 'Cost of Delay',
    tagColor: 'text-[#991B1B] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: 'Cost of Delay Calculator — See What Waiting Costs You',
    excerpt:
      'Discover the devastating impact of delaying your SIP investments. See how much wealth you lose by waiting and find out exactly how much extra you\'ll need to invest to catch up.',
    readTime: '3 min read',
    cta: 'Try Calculator',
    icon: <Clock className="w-5 h-5 text-[#991B1B]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#991B1B]',
  },
  {
    href: '/blog/sip-based-on-salary',
    tag: 'SIP Planning',
    tagColor: 'text-[#1B3A5C] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much SIP Should I Do Based on My Salary?',
    excerpt:
      'Use the 50-30-20 budgeting rule to find your ideal SIP amount. Interactive calculator shows Conservative (10%), Moderate (20%), and Aggressive (30%) plans with 20-year projections.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Wallet className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/blog/retirement-sip-calculator',
    tag: 'Retirement',
    tagColor: 'text-[#1B3A5C] bg-[rgba(27,58,92,0.1)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much SIP Do I Need to Retire in India?',
    excerpt:
      'Enter your age, expenses, and retirement target — get the exact monthly SIP needed. See the devastating cost of delaying by just 5 years.',
    readTime: '6 min read',
    cta: 'Try Calculator',
    icon: <Shield className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/blog/sip-vs-lumpsum',
    tag: 'Comparison',
    tagColor: 'text-[#059669] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'SIP vs Lump Sum — Which Is Better? Interactive Comparison',
    excerpt:
      'Compare SIP and Lumpsum returns under Bull, Bear, and Volatile market scenarios. See which strategy wins — and by how much — with real-time charts.',
    readTime: '5 min read',
    cta: 'Compare Now',
    icon: <BarChart3 className="w-5 h-5 text-[#059669]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#059669]',
  },
  {
    href: '/blog/sip-to-beat-inflation',
    tag: 'Inflation',
    tagColor: 'text-[#059669] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'How Much SIP to Beat Inflation? Real vs Nominal Returns',
    excerpt:
      'See how inflation erodes your SIP returns. Dual-chart comparison of nominal vs real value, purchasing power erosion callout, and year-by-year breakdown.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Flame className="w-5 h-5 text-[#059669]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#059669]',
  },
  {
    href: '/blog/sip-to-reach-1-crore',
    tag: 'SIP Planning',
    tagColor: 'text-[#1B3A5C] bg-[rgba(27,58,92,0.12)] border-[rgba(27,58,92,0.25)]',
    title: 'How Much SIP to Reach ₹1 Crore in 10, 15 & 20 Years?',
    excerpt:
      'Get the exact monthly SIP amount you need at 10%, 12%, and 15% annual returns across different time horizons. Includes step-up SIP comparison showing how you can start with 44% less.',
    readTime: '4 min read',
    cta: 'Read Guide',
    icon: <Calculator className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: '₹1 Crore Goal',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/blog/sip-for-child-education',
    tag: 'Goal Planning',
    tagColor: 'text-[#1B3A5C] bg-[rgba(27,58,92,0.10)] border-[rgba(27,58,92,0.25)]',
    title: 'SIP for Child Education — Education Goal Calculator India',
    excerpt:
      'Education inflation in India runs at 10%+ per year. Find exactly how much SIP you need to fund your child\'s engineering, medical, or MBA degree — before the cost doubles.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <GraduationCap className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/blog/sip-for-house-down-payment',
    tag: 'Goal Planning',
    tagColor: 'text-[#1B3A5C] bg-[rgba(27,58,92,0.10)] border-[rgba(27,58,92,0.25)]',
    title: 'SIP for House Down Payment — Save for Your Dream Home',
    excerpt:
      'Property prices rise 7%+ annually. See the future cost of that ₹80L flat, the down payment you need to save, and the exact monthly SIP to get there — with city-wise reference.',
    readTime: '5 min read',
    cta: 'Try Calculator',
    icon: <Home className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'Interactive',
    highlightColor: 'text-[#1B3A5C]',
  },
  {
    href: '/blog/sip-during-market-crash',
    tag: 'Market Strategy',
    tagColor: 'text-[#991B1B] bg-[rgba(153,27,27,0.1)] border-[rgba(153,27,27,0.25)]',
    title: 'SIP During Market Crash — Should You Stop or Continue?',
    excerpt:
      'Interactive crash simulator. See exactly how much wealth you lose by pausing SIP during a 40% market fall — and why rupee-cost averaging makes crashes the best time to invest.',
    readTime: '6 min read',
    cta: 'Run Simulation',
    icon: <Zap className="w-5 h-5 text-[#991B1B]" />,
    highlight: 'Simulator',
    highlightColor: 'text-[#991B1B]',
  },
  {
    href: '/blog/cagr-vs-xirr-vs-absolute-return',
    tag: 'Return Metrics',
    tagColor: 'text-[#C4993C] bg-[rgba(196,153,60,0.1)] border-[rgba(196,153,60,0.25)]',
    title: 'CAGR vs XIRR vs Absolute Return — What\'s the Difference?',
    excerpt:
      'When Groww shows "XIRR" and a fund shows "CAGR", are they the same? No — and the confusion costs investors bad decisions. This guide explains each clearly with worked examples.',
    readTime: '5 min read',
    cta: 'Read Guide',
    icon: <TrendingUp className="w-5 h-5 text-[#1B3A5C]" />,
    highlight: 'CAGR vs XIRR',
    highlightColor: 'text-[#C4993C]',
  },
];

const CALCULATORS = [
  { href: '/',                        icon: <Calculator className="w-4 h-4 text-[#1B3A5C]" />, label: 'Step-Up SIP Calculator',  desc: 'SIP with step-up, lump sum & inflation' },
  { href: '/lumpsum-calculator',       icon: <Layers     className="w-4 h-4 text-[#059669]" />, label: 'Lumpsum Calculator',       desc: 'One-time investment future value'        },
  { href: '/target-amount-calculator', icon: <Target     className="w-4 h-4 text-[#1B3A5C]"  />, label: 'SIP Goal Calculator',      desc: 'Time to reach ₹1 Crore'                 },
  { href: '/cagr-calculator',          icon: <TrendingUp className="w-4 h-4 text-[#1B3A5C]" />, label: 'CAGR Calculator',          desc: 'Compound annual growth rate'             },
  { href: '/swp-calculator',           icon: <Wallet     className="w-4 h-4 text-[#1B3A5C]" />, label: 'SWP Calculator',           desc: 'Monthly withdrawal planning'             },
  { href: '/cost-of-delay-calculator', icon: <Clock      className="w-4 h-4 text-[#991B1B]" />, label: 'Cost of Delay Calculator', desc: 'See what waiting costs you'              },
];

export default function BlogIndexPage() {
  return (
    <main className="py-8 px-2 md:px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full mx-auto space-y-8">

        <CalculatorTabs />
        <Breadcrumb items={[{ label: 'Guides' }]} />

        {/* Hero */}
        <div className="glass-panel p-7 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgba(27,58,92,0.1)] to-transparent pointer-events-none" />
          <div className="relative z-10 flex items-start gap-4">
            <div className="bg-[rgba(27,58,92,0.2)] border border-[#1B3A5C] p-3 rounded-2xl flex-shrink-0">
              <BookOpen className="w-6 h-6 text-[#1B3A5C]" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#1F2937] mb-2">
                Investment Guides 
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                Free, jargon-free guides with interactive calculators for Indian investors — SIP planning,
                retirement, inflation, market scenarios, and more. Written by Rajat.
              </p>
            </div>
          </div>
        </div>

        {/* Articles */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-[#1F2937] px-1">All Guides</h2>
          {ARTICLES.map(({ href, tag, tagColor, title, excerpt, readTime, cta, icon, highlight, highlightColor }) => (
            <Link
              key={href}
              href={href}
              className="block glass-panel p-6 hover:bg-[rgba(27,58,92,0.06)] hover:border-[rgba(27,58,92,0.25)] border border-[#E8E4DF] transition-all group rounded-2xl"
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="bg-[rgba(0,0,0,0.03)] p-2.5 rounded-xl flex-shrink-0 group-hover:bg-[rgba(27,58,92,0.15)] transition-colors">
                  {icon}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Tag + read time */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${tagColor}`}>
                      {tag}
                    </span>
                    <span className="text-gray-600 text-[10px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />{readTime}
                    </span>
                    <span className={`text-[10px] font-semibold ml-auto ${highlightColor}`}>{highlight}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-[#1F2937] font-bold text-base leading-snug mb-2 group-hover:text-[#6B7280] transition-colors">
                    {title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-3">
                    {excerpt}
                  </p>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-1.5 text-[#1B3A5C] text-xs font-semibold group-hover:gap-2.5 transition-all">
                    {cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-gray-600 text-xs">Free Calculators</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        {/* Calculator cards */}
        <div>
          <h2 className="text-lg font-bold text-[#1F2937] mb-3 px-1">Try Our Free Calculators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CALCULATORS.map(({ href, icon, label, desc }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 glass-panel p-4 hover:bg-[rgba(27,58,92,0.08)] hover:border-[rgba(27,58,92,0.2)] border border-[#E8E4DF] transition-all group rounded-xl"
              >
                <div className="bg-[rgba(0,0,0,0.03)] p-2 rounded-lg flex-shrink-0 group-hover:bg-[rgba(27,58,92,0.15)] transition-colors">
                  {icon}
                </div>
                <div className="flex-1">
                  <p className="text-[#1F2937] font-semibold text-sm group-hover:text-[#1B3A5C] transition-colors">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#1B3A5C] transition-colors flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
